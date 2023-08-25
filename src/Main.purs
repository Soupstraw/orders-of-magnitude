module Main where

import Prelude

import Control.Monad.Error.Class (throwError)
import Control.Monad.Gen.Trans (evalGen, shuffle)
import Data.Array (drop, index, insertBy, length, reverse, take, (:))
import Data.Array.NonEmpty (fromArray, head, tail)
import Data.Either (Either(..))
import Data.Enum (succ)
import Data.FoldableWithIndex (foldrWithIndex)
import Data.Int (toNumber)
import Data.Lens (_Just, (.~))
import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..), maybe)
import Data.Natural (Natural, intToNat, natToInt)
import Data.Number (infinity)
import Data.Tuple (Tuple(..), fst)
import Debug (trace)
import Effect (Effect)
import Effect.Aff (Aff, error, launchAff_)
import Effect.Class (liftEffect)
import Fetch (fetch)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.EffectList as FAN
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Flame.Types (NodeData)
import OrderTheMagnitudes.Card (Card, cardUnitlessValue)
import OrderTheMagnitudes.Foreign (scrollBy)
import Random.LCG (randomSeed)
import Simple.JSON as JSON
import Type.Proxy (Proxy(..))
import Web.CSSOMView.HTMLElement (offsetHeight)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (getBoundingClientRect)
import Web.DOM.NonElementParentNode (getElementById)
import Web.Event.Event (Event)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.Window (document)
import Web.UIEvent.MouseEvent (clientY)
import Web.UIEvent.MouseEvent as MouseEvent

class Measure :: forall k. k -> Constraint
class Measure a where
  measureSymbol :: Proxy a -> String

type DragState =
  { dragStartPos :: Pos
  , dragOverIdx :: Maybe Natural
  }

-- | The model represents the state of the app
type Model = 
  { modelCurrentCard :: Card
  , modelCards :: Array (Tuple Card Boolean)
  , modelDeck :: Array Card
  , modelMousePos :: Pos
  , modelDragState :: Maybe DragState
  , modelLives :: Int
  , modelBestScore :: Int
  , modelCardsOrder :: CardsOrder
  }

-- | Data type used to represent events
data Message 
  = StartDragging
  | StopDragging
  | MouseMove Event
  | MouseMoveCardStack Event
  | MouseOver (Maybe Natural)
  | RestartGame
  | GameReady Model
  | NoOp

data CardsOrder
  = Ascending
  | Descending

data Pos = Pos Int Int

instance Show Pos where
  show (Pos x y) = "Pos " <> show x <> " " <> show y

instance Semiring Pos where
  zero = Pos zero zero
  one = Pos one one
  add (Pos x1 y1) (Pos x2 y2) = Pos (add x1 x2) (add y1 y2)
  mul (Pos x1 y1) (Pos x2 y2) = Pos (mul x1 x2) (mul y1 y2)

instance Ring Pos where
  sub (Pos x1 y1) (Pos x2 y2) = Pos (sub x1 x2) (sub y1 y2)

-- | Initial state of the app
initModel :: Card -> Card -> Array Card -> Model
initModel curCard placedCard deck =
  { modelCurrentCard: curCard
  , modelDeck: deck
  , modelCards: [Tuple placedCard true]
  , modelMousePos: Pos 0 0
  , modelDragState: Nothing
  , modelLives: totalLives
  , modelBestScore: 0
  , modelCardsOrder: Descending
  }

-- | `update` is called to handle events
update :: Model -> Message -> Tuple Model (Array (Aff (Maybe Message)))
update model NoOp = Tuple model []
update model StartDragging = Tuple newModel []
  where
    newModel = model
      { modelDragState = Just 
          { dragStartPos: model.modelMousePos
          , dragOverIdx: Nothing
          }
      }
update model StopDragging = 
  Tuple newModel []
  where
    newModel = 
      case model.modelDragState of 
          Just {dragOverIdx: Just idx'} -> 
            case fromArray model.modelDeck of
              Just nonEmptyDeck -> 
                trace ("idx: " <> show idx) $ \_ ->
                  model
                    { modelDragState = Nothing
                    , modelCards = newModelCards
                    , modelLives = model.modelLives - if correct then 0 else 1
                    , modelCurrentCard = head nonEmptyDeck
                    , modelDeck = tail nonEmptyDeck
                    }
              Nothing -> model
              where
                idx = case model.modelCardsOrder of
                        Ascending -> natToInt idx'
                        Descending -> length model.modelCards - natToInt idx'
                getCard i = fst <$> index (reverse model.modelCards) i
                prevCard = 
                  maybe 
                    (-infinity) 
                    cardUnitlessValue
                    (getCard $ idx - 1)
                nextCard = 
                  maybe 
                    infinity 
                    cardUnitlessValue
                    (getCard $ idx)
                correct = 
                  between 
                    prevCard
                    nextCard
                    (cardUnitlessValue model.modelCurrentCard)
                newCurCard = model.modelCurrentCard
                newModelCards = 
                  insertBy 
                    (\(Tuple x _) 
                      (Tuple y _) -> 
                        (flip compare)
                          (cardUnitlessValue x) 
                          (cardUnitlessValue y)
                    )
                    (Tuple newCurCard correct)
                    model.modelCards
          _ -> model
                 { modelDragState = Nothing
                 }
update model (MouseMove event) = Tuple newModel []
  where
    newModel = 
      maybe 
        model 
        (\mouseEvent -> model
          { modelMousePos = Pos 
            (MouseEvent.clientX mouseEvent) 
            (MouseEvent.clientY mouseEvent)
          }
        )
        (MouseEvent.fromEvent event)
update model (MouseOver mbyIdx) = Tuple newModel []
  where
    newModel = model 
      # prop (Proxy :: Proxy "modelDragState") 
        <<< _Just 
        <<< prop (Proxy :: Proxy "dragOverIdx") 
        .~ mbyIdx
update model RestartGame = Tuple model 
  [ pure <<< Just <<< GameReady =<< setupGame
  ]
update oldModel (GameReady freshModel) = Tuple newModel []
  where
    newModel = freshModel
      { modelBestScore = 
          max 
            oldModel.modelBestScore 
            (length oldModel.modelCards)
      }
update model (MouseMoveCardStack ev) = 
  case model.modelDragState of
    Nothing -> Tuple model []
    Just _ -> Tuple model [ Just <$> scrollCards ev ]

scrollMargin :: Number
scrollMargin = 50.0

scrollCards :: Event -> Aff Message
scrollCards ev = case MouseEvent.fromEvent ev of
  Just mouseEv -> do
    win <- liftEffect window
    doc <- liftEffect $ toDocument <$> document win
    cardsBox <- liftEffect 
      <<< getElementById "cardsBox" 
      $ toNonElementParentNode doc
    case cardsBox of
      Just elem -> do
         {top, bottom} <- liftEffect $ getBoundingClientRect elem
         let mouseY = toNumber $ clientY mouseEv
         let scrollAmt
               | bottom - scrollMargin < mouseY = 
                   10.0 * (mouseY - bottom + scrollMargin) / scrollMargin
               | between (top - scrollMargin) (top + scrollMargin) mouseY = 
                   -10.0 * (top + scrollMargin - mouseY) / (2.0 * scrollMargin)
               | otherwise = 0.0
         liftEffect $ scrollBy scrollAmt elem
      Nothing -> do
         pure unit
    pure $ MouseMove ev
  Nothing -> pure $ MouseMove ev

card :: Model -> Card -> Boolean -> Maybe Natural -> Html Message
card model c correct mbyIdx = 
    HE.div 
      cardOuterStyle
      [ HE.div
          ( [ HA.style1 "border-width" "1px"
            , HA.style1 "padding" "5px"
            , HA.style1 "margin" "5px"
            , HA.style1 "width" "50vw"
            , HA.style1 "min-width" "500pt"
            , HA.style1 "user-select" "none"
            , HA.style1 "display" "table"
            , HA.style1 "margin-left" "auto"
            , HA.style1 "margin-right" "auto"
            , HA.style1 "box-shadow" "3px 3px 2px 1px rgba(0, 0, 128, .2)"
            , HA.style1 "background-color" "#fefae0"
            , HA.style1 "font-size" "20pt"
            ] <> placedAttrs
          ) $
          [ HE.div_ [HE.text c.cardDescription ]
          , HE.div [HA.style1 "float" "right"] [HE.text magText]
          ]
      ]
  where
    magText = case mbyIdx of
      Just _ -> show c.cardMagnitude <> " " <> c.cardUnit
      Nothing -> "?"
    posAttr =  case model.modelDragState of
      Just {dragStartPos} ->
        let Pos x y = model.modelMousePos - dragStartPos
        in
          [ HA.style1 
              "transform"
              ("translate(" <> show x <> "px," <> show y <> "px)")
          , HA.style1 "pointer-events" "none"
          , HA.style1 "background-color" "#fefae055"
          ]
      Nothing -> []
    placedAttrs = 
      case mbyIdx of
        Just idx ->
          [ HA.onMouseover $ case model.modelDragState of
              Just {dragOverIdx: Just dragIdx} 
                | dragIdx == idx -> MouseOver $ succ idx
                | otherwise -> MouseOver $ Just idx
              Just {dragOverIdx: Nothing} -> MouseOver $ Just idx
              _ -> NoOp
          , HA.style1 "background-color" $ 
              if correct
                then "#b8bb26"
                else "#cc241d"
          ]
        Nothing ->
          [ HA.onMousedown StartDragging
          , HA.style1 "cursor" "grab"
          , HA.style1 "background-color" "#ebdbb2"
          ] <> posAttr
    cardOuterStyle = 
      [ HA.style1 "width" "100%"
      , HA.style1 "margin" "0 auto"
      ] <>
      case mbyIdx of
        Just idx ->
          [ HA.onMouseover (MouseOver $ Just idx) 
          ] <> case model.modelDragState of
            Just {dragOverIdx: Just dragIdx}
              | idx == dragIdx -> 
                [ HA.style1 "margin-top" "48pt"
                ]
            _ -> []
        _ -> []

totalLives :: Int
totalLives = 3

renderLives :: Int -> String
renderLives n = helper n totalLives
  where
    helper 0 0 = " "
    helper 0 t = " 🖤" <> helper 0 (t - 1)
    helper a t = " ❤️" <> helper (a - 1) (t - 1)

gameOverPopup :: Html Message
gameOverPopup = HE.div
        [ HA.style1 "display" "flex"
        , HA.style1 "flex-direction" "column"
        , HA.style1 "background-color" "#928374cc"
        ]
        [ HE.h1 [HA.style1 "text-align" "center"] "Game over"
        , HE.button 
            [ HA.onClick RestartGame
            , HA.style1 "width" "25%"
            , HA.style1 "height" "42pt"
            , HA.style1 "margin" "0 auto"
            , HA.style1 "padding-bottom" "10px"
            ]
            "New game"
        ]

cardCapStyle :: Array (NodeData Message)
cardCapStyle =
  [ HA.style1 "text-align" "center" 
  , HA.style1 "user-select" "none"
  , HA.style1 "color" "#ebdbb2"
  , HA.style1 "font-size" "18pt"
  , HA.style1 "border-width" "1px"
  , HA.style1 "padding" "12px 5px 12px 5px"
  , HA.style1 "margin" "0"
  , HA.style1 "width" "50vw"
  , HA.style1 "min-width" "500pt"
  , HA.style1 "user-select" "none"
  , HA.style1 "display" "table"
  , HA.style1 "margin-left" "auto"
  , HA.style1 "margin-right" "auto"
  , HA.style1 "box-shadow" "3px 3px 2px 1px rgba(0, 0, 128, .2)"
  , HA.style1 "background-color" "#928374"
  ]

-- | `view` is called whenever the model is updated
view :: Model -> Html Message
view model = HE.main 
  [ HA.style1 "position" "fixed"
  , HA.style1 "inset" "0px"
  , HA.style1 "background-color" "#282828"
  , HA.onMousemove' MouseMove
  , HA.onMouseup StopDragging
  , HA.style1 "display" "flex"
  , HA.style1 "flex-direction" "column"
  , HA.style1 "height" "100vh"
  ] $
  [ HE.div
      [ HA.onMouseover $ MouseOver Nothing
      ]
      --[ HE.h1
      --    [ HA.style1 "text-align" "center" 
      --    , HA.style1 "color" "#ebdbb2"
      --    ]
      --    "Orders of magnitude"
      [ HE.h2 
          [ HA.style1 "text-align" "center" 
          , HA.style1 "color" "#ebdbb2"
          , HA.style1 "font-size" "16pt"
          ]
          [ HE.text $ 
              "Score: " <> show (length model.modelCards) <>
              " | Best: " <> show model.modelBestScore
          ]
      , HE.h2
          [ HA.style1 "text-align" "center" 
          , HA.style1 "user-select" "none"
          , HA.style1 "font-size" "32pt"
          ]
          [ HE.text $ renderLives model.modelLives ]
      , HE.div_ 
          [ if model.modelLives > 0
              then card model model.modelCurrentCard false Nothing 
              else gameOverPopup
          ]
      ]
  , HE.hr
  , HE.div
      [ HA.onMousemove' $ MouseMoveCardStack
      , HA.style1 "margin" "0 auto"
      , HA.style1 "height" "50%"
      , HA.style1 "display" "flex"
      , HA.style1 "flex-direction" "column"
      ]
      [ HE.div
          (cardCapStyle <> [HA.style1 "border-radius" "20px 20px 0px 0px"])
          [ HE.text $ 
              case model.modelCardsOrder of 
                Ascending -> "smaller" 
                Descending -> "bigger"
          ]
      , HE.div
          [ HA.style1 "overflow-y" "scroll"
          , HA.style1 "overflow-x" "visible"
          , HA.style1 "margin" "0 auto"
          , HA.id "cardsBox"
          , HA.class' "hide-scrollbar"
          ] $
          foldrWithIndex 
            (\idx (Tuple d corr) arr -> card model d corr (Just $ intToNat idx) : arr) 
            mempty
            (case model.modelCardsOrder of
               Descending -> model.modelCards
               Ascending -> reverse model.modelCards
            ) <>
          [ HE.div
              [ HA.style1 "margin-top" case model.modelDragState of
                  Just {dragOverIdx} 
                    | map natToInt dragOverIdx 
                        == Just (length model.modelCards) -> "48pt"
                  _ -> "0"
              ]
              [ HE.text ""
              ]
          ]
      , HE.div
          ( cardCapStyle <> 
              [ HA.style1 "border-radius" "0px 0px 20px 20px"
              ]
          )
          [ HE.text $ case model.modelCardsOrder of
                        Ascending -> "bigger" 
                        Descending -> "smaller"
          ]
      ]
  ]

-- | Events that come from outside the `view`
subscribe :: Array (Subscription Message)
subscribe = []

setupGame :: Aff Model
setupGame = do
  -- TODO cache the deck so we don't have to fetch it every time the game is
  -- restarted
  {json} <- fetch 
    "http://localhost:8000/data/output.json"
    { headers: { "Accept": "application/json" }}

  gameDataJson <- json
  case JSON.read gameDataJson of
    Left err -> throwError <<< error $ "Error: " <> show err
    Right gameData -> do
      newSeed <- liftEffect randomSeed
      let shuffledDeck = evalGen (shuffle gameData)
            { newSeed
            , size: 100
            }
      Tuple placedCard curCard <- 
        case take 2 shuffledDeck of
          [x, y] -> pure $ Tuple x y
          _ -> throwError $ error "Not enough cards in the deck"
      let deckNE = drop 2 shuffledDeck
      pure $ initModel curCard placedCard deckNE

-- | Mount the application on the given selector
main :: Effect Unit
main = launchAff_ $ do 
  model <- setupGame
  liftEffect $ FAN.mount_ (QuerySelector "body") 
    { init: Tuple model []
    , view
    , update
    , subscribe
    }
