module OrderTheMagnitudes.Form 
  ( Form
  , AppFormF (..)
  , toHtml
  , Option (..)
  ) where

import Prelude

import Data.Array (find)
import Data.Exists (Exists, mkExists, runExists)
import Data.Maybe (Maybe(..))
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Undefined (undefined)

data Option m a = Option String m a

derive instance Functor (Option m)

data Form m a
  = Const a
  | Select 
      { selectLabel :: String 
      , selectOptions :: Array (Option m a)
      }
  | AppForm (Exists (AppFormF m a))

data AppFormF m a x = AppFormF (Form m (x -> a)) (Form m x)

instance Functor (Form m) where
  map :: forall a b. (a -> b) -> Form m a -> Form m b
  map f (Const x) = Const $ f x
  map f (Select s) = Select $ s { selectOptions = map f <$> s.selectOptions }
  map f (AppForm ex) = AppForm $ runExists helper ex
    where
      helper :: forall x. AppFormF m a x -> Exists (AppFormF m b)
      helper (AppFormF g x) = mkExists $ AppFormF (map (\h -> f <<< h) g) x

instance Apply (Form m) where
  apply f x = AppForm $ mkExists $ AppFormF f x

instance Applicative (Form m) where
  pure = Const

toHtml :: forall a m. Form m a -> Array (Html m)
toHtml (Const _) = [HE.text ""]
toHtml (Select s) = 
  [ HE.div_
      [ HE.text s.selectLabel
      , HE.select
          [HA.onSelect $ lookupString s.selectOptions]
          (toOption <$> s.selectOptions)
      ]
  ]
  where
    toOption (Option t _ _) = HE.option_ [t]
    lookupString xs str = case find (\(Option str' _ _) -> str == str') xs of
                            Just (Option _ m _) -> m
                            -- This should be impossible with smart constructors
                            Nothing -> undefined 
toHtml (AppForm ex) = runExists helper ex
  where
    helper :: forall x. AppFormF m a x -> Array (Html m)
    helper (AppFormF g x) = toHtml g <> toHtml x

