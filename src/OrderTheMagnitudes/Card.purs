module OrderTheMagnitudes.Card 
  ( Card (..)
  , cardUnitlessValue
  ) where

import Prelude

import Debug (trace)

type Card =
  { cardDescription :: String
  , cardMagnitude :: Number
  , cardUnit :: String
  }

cardUnitlessValue :: Card -> Number
cardUnitlessValue {cardMagnitude, cardUnit} = case cardUnit of
  "qm" -> cardMagnitude * 1.0e-30
  "rm" -> cardMagnitude * 1.0e-27
  "ym" -> cardMagnitude * 1.0e-24
  "zm" -> cardMagnitude * 1.0e-21
  "am" -> cardMagnitude * 1.0e-18
  "fm" -> cardMagnitude * 1.0e-15
  "pm" -> cardMagnitude * 1.0e-12
  "nm" -> cardMagnitude * 1.0e-9
  "μm" -> cardMagnitude * 1.0e-6
  "mm" -> cardMagnitude * 1.0e-3
  "cm" -> cardMagnitude * 1.0e-2
  "dm" -> cardMagnitude * 1.0e-1
  "m"  -> cardMagnitude
  "metres" -> cardMagnitude
  "km" -> cardMagnitude * 1.0e3
  "Mm" -> cardMagnitude * 1.0e6
  "Gm" -> cardMagnitude * 1.0e9
  "Tm" -> cardMagnitude * 1.0e12
  "Pm" -> cardMagnitude * 1.0e15
  "Em" -> cardMagnitude * 1.0e18
  "Zm" -> cardMagnitude * 1.0e21
  "Ym" -> cardMagnitude * 1.0e24
  "Rm" -> cardMagnitude * 1.0e27
  u    -> trace ("Unknown unit: " <> u) $ \_ -> 0.0

