module Main where

import Prelude

import Control.Monad.Gen.Trans (evalGen, evalGenT, shuffle)
import Data.Array (index, insertBy, (:))
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray(..), fromArray, fromNonEmpty, head, tail)
import Data.Array.NonEmpty.Internal (NonEmptyArray(..))
import Data.Either (Either(..), either)
import Data.Enum (succ)
import Data.FoldableWithIndex (foldrWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Lens (_Just, (.~))
import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Data.NonEmpty (NonEmpty(..))
import Data.Number (infinity)
import Data.Tuple (Tuple(..), fst)
import Debug (trace, traceM)
import Effect (Effect)
import Effect.Aff (Aff, error, launchAff_, runAff_)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Fetch (Method(..), Referrer(..), fetch)
import Fetch as RequestMode
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.EffectList as FAN
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Partial (crash, crashWith)
import Random.LCG (mkSeed, randomSeed)
import Simple.JSON (readJSON)
import Simple.JSON as JSON
import Type.Proxy (Proxy(..))
import Undefined (undefined)
import Web.Event.Event (Event)
import Web.HTML.HTMLElement (offsetHeight)
import Web.UIEvent.MouseEvent as MouseEvent

class Measure :: forall k. k -> Constraint
class Measure a where
  measureSymbol :: Proxy a -> String

type DragState =
  { dragStartPos :: Pos
  , dragOverIdx :: Int
  }

-- | The model represents the state of the app
type Model = 
  { modelCurrentCard :: Card
  , modelCards :: Array (Tuple Card Boolean)
  , modelDeck :: Array Card
  , modelMousePos :: Pos
  , modelDragState :: Maybe DragState
  , modelLives :: Int
  }

-- | Data type used to represent events
data Message 
  = StartDragging
  | StopDragging
  | MouseMove Event
  | MouseOver Int

type Card =
  { cardDescription :: String
  , cardMagnitude :: Number
  }

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
init :: NonEmptyArray Card -> Model
init deck =
  { modelCurrentCard: head deck
  , modelDeck: tail deck
  , modelCards: 
      ( ( Tuple 
            { cardDescription: "width of a chloroplast"
            , cardMagnitude: 7.5e-6
            }
            false
        )
      : ( Tuple
            { cardDescription: "approximate diameter of 2008 TS26, a meteoroid"
            , cardMagnitude: 8.4e-1
            }
            true
        )
      : ( Tuple
            { cardDescription: "width of a typical association football field"
            , cardMagnitude: 7.0e1
            }
            true
        )
      : mempty
      )
  , modelMousePos: Pos 0 0
  , modelDragState: Nothing
  , modelLives: totalLives
  }

-- | `update` is called to handle events
update :: Model -> Message -> Tuple Model (Array (Aff (Maybe Message)))
update model StartDragging = Tuple newModel []
  where
    newModel = model
      { modelDragState = Just 
          { dragStartPos: model.modelMousePos
          , dragOverIdx: 0
          }
      }
update model StopDragging = Tuple newModel []
  where
    newModel = 
      case model.modelDragState of 
          Nothing -> model
          Just {dragOverIdx} -> model
            { modelDragState = Nothing
            , modelCards = 
                insertBy 
                  (\(Tuple {cardMagnitude: x} _) 
                    (Tuple {cardMagnitude: y} _) -> compare x y)
                  (Tuple newCurCard correct)
                  model.modelCards
            , modelLives = model.modelLives - if correct then 0 else 1
            }
            where
              prevCard = 
                maybe 
                  (-infinity) 
                  _.cardMagnitude 
                  (fst <$> index model.modelCards (dragOverIdx - 1))
              nextCard = 
                maybe 
                  infinity 
                  _.cardMagnitude 
                  (fst <$> index model.modelCards dragOverIdx)
              correct = 
                between 
                  prevCard
                  nextCard
                  model.modelCurrentCard.cardMagnitude
              newCurCard = model.modelCurrentCard
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
update model (MouseOver idx) = Tuple newModel []
  where
    newModel = model 
      # prop (Proxy :: Proxy "modelDragState") 
        <<< _Just 
        <<< prop (Proxy :: Proxy "dragOverIdx") 
        .~ idx

card :: Model -> Card -> Boolean -> Maybe Int -> Html Message
card model c correct mbyIdx = 
    HE.div 
      cardOuterStyle
      [ HE.div
          ( [ HA.style1 "border" "solid"
            , HA.style1 "border-width" "1px"
            , HA.style1 "border-radius" "5px"
            , HA.style1 "padding" "5px"
            , HA.style1 "margin" "5px"
            , HA.style1 "width" "50%"
            , HA.style1 "min-width" "500pt"
            , HA.style1 "user-select" "none"
            , HA.style1 "display" "table"
            , HA.style1 "margin-left" "auto"
            , HA.style1 "margin-right" "auto"
            , HA.style1 "box-shadow" "3px 3px 2px 1px rgba(0, 0, 128, .2)"
            , HA.style1 "background-color" "#fefae0"
            ] <> placedAttrs
          ) $
          [ HE.div_ [HE.text c.cardDescription ]
          , HE.div [HA.style1 "float" "right"] [HE.text magText]
          ]
      ]
  where
    magText = case mbyIdx of
      Just _ -> show c.cardMagnitude
      Nothing -> "?"
    posAttr =  case model.modelDragState of
      Just {dragStartPos} ->
        let Pos x y = model.modelMousePos - dragStartPos
        in
          [ HA.style1 
              "transform"
              ("translate(" <> show x <> "px," <> show y <> "px)")
          , HA.style1 "pointer-events" "none"
          ]
      Nothing -> []
    placedAttrs = 
      case mbyIdx of
        Just idx ->
          [ HA.onMouseover (MouseOver $ idx + 1)
          , HA.style1 "background-color" $ if correct
                                             then "#a7c957"
                                             else "#bc4749"
          ]
        Nothing ->
          [ HA.onMousedown StartDragging
          , HA.style1 "cursor" "grab"
          ] <> posAttr
    cardOuterStyle = 
      case mbyIdx of
        Just idx ->
          [ HA.onMouseover (MouseOver idx) 
          ] <> case model.modelDragState of
            Just {dragOverIdx}
              | idx == dragOverIdx -> 
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

-- | `view` is called whenever the model is updated
view :: Model -> Html Message
view model = HE.main 
  [ HA.style1 "position" "fixed"
  , HA.style1 "top" "0px"
  , HA.style1 "bottom" "0px"
  , HA.style1 "left" "0px"
  , HA.style1 "right" "0px"
  , HA.style1 "background-color" "#faedcd"
  , HA.onMousemove' MouseMove
  , HA.onMouseup StopDragging
  ]
  [ HE.h1
      [ HA.style1 "text-align" "center" ]
      "Orders of magnitude"
  , HE.h2
      [ HA.style1 "text-align" "center" 
      , HA.style1 "user-select" "none"
      , HA.style1 "font-size" "32pt"
      ]
      [ HE.text $ renderLives model.modelLives ]
  , HE.div_ [ card model model.modelCurrentCard false Nothing ]
  , HE.hr
  , HE.div
      [ HA.style1 "overflow-y" "scroll"
      , HA.style1 "height" "100%"
      ] $
      foldrWithIndex 
        (\idx (Tuple d corr) arr -> card model d corr (Just idx) : arr) 
        mempty
        model.modelCards
  ]

-- | Events that come from outside the `view`
subscribe :: Array (Subscription Message)
subscribe = []

-- | Mount the application on the given selector
main :: Effect Unit
main = launchAff_ $
  do
    {json} <- fetch 
      "http://localhost:8000/data/output.json"
      { headers: { "Accept": "application/json" }}

    gameDataJson <- json
    case JSON.read gameDataJson of
        Left err -> liftEffect <<< log $ "Error: " <> show err
        Right gameData -> do
          newSeed <- liftEffect randomSeed
          let shuffledDeck = evalGen (shuffle gameData)
                { newSeed
                , size: 100
                }
          case fromArray shuffledDeck of
              Just shuffledDeckNE -> do
                traceM $ show shuffledDeckNE
                liftEffect $ FAN.mount_ (QuerySelector "body") 
                  { init: Tuple (init shuffledDeckNE) []
                  , view
                  , update
                  , subscribe
                  }
              Nothing -> liftEffect <<< log $ "Deck is empty!"
