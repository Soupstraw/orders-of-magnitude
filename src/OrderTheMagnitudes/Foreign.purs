module OrderTheMagnitudes.Foreign where

import Data.Unit (Unit)
import Effect (Effect)
import Web.DOM (Element)

foreign import scrollBy :: Number -> Element -> Effect Unit
