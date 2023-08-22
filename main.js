// output/Control.Bind/foreign.js
var arrayBind = function(arr) {
  return function(f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

// output/Control.Apply/foreign.js
var arrayApply = function(fs) {
  return function(xs) {
    var l = fs.length;
    var k = xs.length;
    var result = new Array(l * k);
    var n = 0;
    for (var i = 0; i < l; i++) {
      var f = fs[i];
      for (var j = 0; j < k; j++) {
        result[n++] = f(xs[j]);
      }
    }
    return result;
  };
};

// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};
var compose = function(dict) {
  return dict.compose;
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {
  }
  ;
  $$Proxy2.value = new $$Proxy2();
  return $$Proxy2;
}();

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map14 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map14(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidRight = function(dictFunctor) {
  var map14 = map(dictFunctor);
  return function(x) {
    return map14($$const(x));
  };
};
var functorArray = {
  map: arrayMap
};

// output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var applyArray = {
  apply: arrayApply,
  Functor0: function() {
    return functorArray;
  }
};
var apply = function(dict) {
  return dict.apply;
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map8 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map8($$const(identity2))(a))(b);
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var when = function(dictApplicative) {
  var pure1 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      ;
      if (!v) {
        return pure1(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  var apply2 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply2(pure1(f))(a);
    };
  };
};

// output/Control.Bind/index.js
var discard = function(dict) {
  return dict.discard;
};
var bindArray = {
  bind: arrayBind,
  Apply0: function() {
    return applyArray;
  }
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var composeKleisliFlipped = function(dictBind) {
  var bindFlipped1 = bindFlipped(dictBind);
  return function(f) {
    return function(g) {
      return function(a) {
        return bindFlipped1(f)(g(a));
      };
    };
  };
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind6 = bind(dictMonad.Bind1());
  var pure8 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind6(f)(function(f$prime) {
        return bind6(a)(function(a$prime) {
          return pure8(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
var unsafeSet = function(label) {
  return function(value) {
    return function(rec) {
      var copy = {};
      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy[key] = rec[key];
        }
      }
      copy[label] = value;
      return copy;
    };
  };
};
var unsafeDelete = function(label) {
  return function(rec) {
    var copy = {};
    for (var key in rec) {
      if (key !== label && {}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }
    return copy;
  };
};

// output/Data.Semigroup/index.js
var semigroupString = {
  append: concatString
};
var semigroupArray = {
  append: concatArray
};
var append = function(dict) {
  return dict.append;
};

// output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// output/Data.Bounded/foreign.js
var topInt = 2147483647;
var bottomInt = -2147483648;
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq2) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq2 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordNumberImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqStringImpl = refEq;

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqNumber = {
  eq: eqNumberImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eq = function(dict) {
  return dict.eq;
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();
var eqOrdering = {
  eq: function(v) {
    return function(v1) {
      if (v instanceof LT && v1 instanceof LT) {
        return true;
      }
      ;
      if (v instanceof GT && v1 instanceof GT) {
        return true;
      }
      ;
      if (v instanceof EQ && v1 instanceof EQ) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/Data.Ring/foreign.js
var intSub = function(x) {
  return function(y) {
    return x - y | 0;
  };
};

// output/Data.Semiring/foreign.js
var intAdd = function(x) {
  return function(y) {
    return x + y | 0;
  };
};
var intMul = function(x) {
  return function(y) {
    return x * y | 0;
  };
};
var numAdd = function(n1) {
  return function(n2) {
    return n1 + n2;
  };
};
var numMul = function(n1) {
  return function(n2) {
    return n1 * n2;
  };
};

// output/Data.Semiring/index.js
var semiringNumber = {
  add: numAdd,
  zero: 0,
  mul: numMul,
  one: 1
};
var semiringInt = {
  add: intAdd,
  zero: 0,
  mul: intMul,
  one: 1
};
var mul = function(dict) {
  return dict.mul;
};
var add = function(dict) {
  return dict.add;
};

// output/Data.Ring/index.js
var sub = function(dict) {
  return dict.sub;
};
var ringInt = {
  sub: intSub,
  Semiring0: function() {
    return semiringInt;
  }
};

// output/Data.Ord/index.js
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordNumber = /* @__PURE__ */ function() {
  return {
    compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqNumber;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var compare = function(dict) {
  return dict.compare;
};
var comparing = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(f) {
    return function(x) {
      return function(y) {
        return compare32(f(x))(f(y));
      };
    };
  };
};
var greaterThan = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(a1) {
    return function(a2) {
      var v = compare32(a1)(a2);
      if (v instanceof GT) {
        return true;
      }
      ;
      return false;
    };
  };
};
var lessThan = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(a1) {
    return function(a2) {
      var v = compare32(a1)(a2);
      if (v instanceof LT) {
        return true;
      }
      ;
      return false;
    };
  };
};
var between = function(dictOrd) {
  var lessThan1 = lessThan(dictOrd);
  var greaterThan1 = greaterThan(dictOrd);
  return function(low) {
    return function(hi) {
      return function(x) {
        if (lessThan1(x)(low)) {
          return false;
        }
        ;
        if (greaterThan1(x)(hi)) {
          return false;
        }
        ;
        return true;
      };
    };
  };
};

// output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedInt = {
  top: topInt,
  bottom: bottomInt,
  Ord0: function() {
    return ordInt;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showNumberImpl = function(n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};
var showStringImpl = function(s) {
  var l = s.length;
  return '"' + s.replace(/[\0-\x1F\x7F"\\]/g, function(c, i) {
    switch (c) {
      case '"':
      case "\\":
        return "\\" + c;
      case "\x07":
        return "\\a";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
    }
    var k = i + 1;
    var empty5 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
    return "\\" + c.charCodeAt(0).toString(10) + empty5;
  }) + '"';
};
var showArrayImpl = function(f) {
  return function(xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

// output/Data.Show/index.js
var showUnit = {
  show: function(v) {
    return "unit";
  }
};
var showString = {
  show: showStringImpl
};
var showRecordFields = function(dict) {
  return dict.showRecordFields;
};
var showRecord = function() {
  return function() {
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return {
        show: function(record) {
          return "{" + (showRecordFields1($$Proxy.value)(record) + "}");
        }
      };
    };
  };
};
var showNumber = {
  show: showNumberImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};
var showArray = function(dictShow) {
  return {
    show: showArrayImpl(show(dictShow))
  };
};
var showRecordFieldsCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictShowRecordFields) {
    var showRecordFields1 = showRecordFields(dictShowRecordFields);
    return function(dictShow) {
      var show13 = show(dictShow);
      return {
        showRecordFields: function(v) {
          return function(record) {
            var tail3 = showRecordFields1($$Proxy.value)(record);
            var key = reflectSymbol2($$Proxy.value);
            var focus = unsafeGet(key)(record);
            return " " + (key + (": " + (show13(focus) + ("," + tail3))));
          };
        }
      };
    };
  };
};
var showRecordFieldsConsNil = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictShow) {
    var show13 = show(dictShow);
    return {
      showRecordFields: function(v) {
        return function(record) {
          var key = reflectSymbol2($$Proxy.value);
          var focus = unsafeGet(key)(record);
          return " " + (key + (": " + (show13(focus) + " ")));
        };
      }
    };
  };
};

// output/Data.Maybe/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe$prime = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v(unit);
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var fromMaybe$prime = function(a) {
  return maybe$prime(a)(identity3);
};
var fromMaybe = function(a) {
  return maybe(a)(identity3);
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};
var altMaybe = {
  alt: function(v) {
    return function(v1) {
      if (v instanceof Nothing) {
        return v1;
      }
      ;
      return v;
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var hush = /* @__PURE__ */ function() {
  return either($$const(Nothing.value))(Just.create);
}();

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// output/Data.EuclideanRing/foreign.js
var intDegree = function(x) {
  return Math.min(Math.abs(x), 2147483647);
};
var intDiv = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

// output/Data.CommutativeRing/index.js
var commutativeRingInt = {
  Ring0: function() {
    return ringInt;
  }
};

// output/Data.EuclideanRing/index.js
var mod = function(dict) {
  return dict.mod;
};
var euclideanRingInt = {
  degree: intDegree,
  div: intDiv,
  mod: intMod,
  CommutativeRing0: function() {
    return commutativeRingInt;
  }
};

// output/Data.Monoid/index.js
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var monoidArray = {
  mempty: [],
  Semigroup0: function() {
    return semigroupArray;
  }
};
var mempty = function(dict) {
  return dict.mempty;
};

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name2, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

// output/Effect.Ref/foreign.js
var _new = function(val) {
  return function() {
    return { value: val };
  };
};
var read = function(ref) {
  return function() {
    return ref.value;
  };
};
var write = function(val) {
  return function(ref) {
    return function() {
      ref.value = val;
    };
  };
};

// output/Effect.Ref/index.js
var $$new = _new;

// output/Control.Monad.Rec.Class/index.js
var Loop = /* @__PURE__ */ function() {
  function Loop2(value0) {
    this.value0 = value0;
  }
  ;
  Loop2.create = function(value0) {
    return new Loop2(value0);
  };
  return Loop2;
}();
var Done = /* @__PURE__ */ function() {
  function Done2(value0) {
    this.value0 = value0;
  }
  ;
  Done2.create = function(value0) {
    return new Done2(value0);
  };
  return Done2;
}();
var tailRecM = function(dict) {
  return dict.tailRecM;
};
var tailRec = function(f) {
  var go = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v instanceof Loop) {
        $copy_v = f(v.value0);
        return;
      }
      ;
      if (v instanceof Done) {
        $tco_done = true;
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 103, column 3 - line 103, column 25): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  return function($85) {
    return go(f($85));
  };
};
var monadRecIdentity = {
  tailRecM: function(f) {
    var runIdentity = function(v) {
      return v;
    };
    var $86 = tailRec(function($88) {
      return runIdentity(f($88));
    });
    return function($87) {
      return Identity($86($87));
    };
  },
  Monad0: function() {
    return monadIdentity;
  }
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var snd = function(v) {
  return v.value1;
};
var functorTuple = {
  map: function(f) {
    return function(m) {
      return new Tuple(m.value0, f(m.value1));
    };
  }
};
var fst = function(v) {
  return v.value0;
};

// output/Control.Monad.State.Class/index.js
var state = function(dict) {
  return dict.state;
};

// output/Effect.Exception/foreign.js
function error(msg) {
  return new Error(msg);
}
function message(e) {
  return e.message;
}
function throwException(e) {
  return function() {
    throw e;
  };
}

// output/Effect.Exception/index.js
var $$throw = function($4) {
  return throwException(error($4));
};

// output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};
var catchError = function(dict) {
  return dict.catchError;
};
var $$try = function(dictMonadError) {
  var catchError1 = catchError(dictMonadError);
  var Monad0 = dictMonadError.MonadThrow0().Monad0();
  var map8 = map(Monad0.Bind1().Apply0().Functor0());
  var pure8 = pure(Monad0.Applicative0());
  return function(a) {
    return catchError1(map8(Right.create)(a))(function($52) {
      return pure8(Left.create($52));
    });
  };
};

// output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};

// output/Effect.Class/index.js
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Control.Monad.State.Trans/index.js
var functorStateT = function(dictFunctor) {
  var map8 = map(dictFunctor);
  return {
    map: function(f) {
      return function(v) {
        return function(s) {
          return map8(function(v1) {
            return new Tuple(f(v1.value0), v1.value1);
          })(v(s));
        };
      };
    }
  };
};
var monadStateT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeStateT(dictMonad);
    },
    Bind1: function() {
      return bindStateT(dictMonad);
    }
  };
};
var bindStateT = function(dictMonad) {
  var bind6 = bind(dictMonad.Bind1());
  return {
    bind: function(v) {
      return function(f) {
        return function(s) {
          return bind6(v(s))(function(v1) {
            var v3 = f(v1.value0);
            return v3(v1.value1);
          });
        };
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var applyStateT = function(dictMonad) {
  var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadStateT(dictMonad)),
    Functor0: function() {
      return functorStateT1;
    }
  };
};
var applicativeStateT = function(dictMonad) {
  var pure8 = pure(dictMonad.Applicative0());
  return {
    pure: function(a) {
      return function(s) {
        return pure8(new Tuple(a, s));
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var monadRecStateT = function(dictMonadRec) {
  var Monad0 = dictMonadRec.Monad0();
  var bind6 = bind(Monad0.Bind1());
  var pure8 = pure(Monad0.Applicative0());
  var tailRecM3 = tailRecM(dictMonadRec);
  var monadStateT1 = monadStateT(Monad0);
  return {
    tailRecM: function(f) {
      return function(a) {
        var f$prime = function(v) {
          var v1 = f(v.value0);
          return bind6(v1(v.value1))(function(v2) {
            return pure8(function() {
              if (v2.value0 instanceof Loop) {
                return new Loop(new Tuple(v2.value0.value0, v2.value1));
              }
              ;
              if (v2.value0 instanceof Done) {
                return new Done(new Tuple(v2.value0.value0, v2.value1));
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.State.Trans (line 87, column 16 - line 89, column 40): " + [v2.value0.constructor.name]);
            }());
          });
        };
        return function(s) {
          return tailRecM3(f$prime)(new Tuple(a, s));
        };
      };
    },
    Monad0: function() {
      return monadStateT1;
    }
  };
};
var monadStateStateT = function(dictMonad) {
  var pure8 = pure(dictMonad.Applicative0());
  var monadStateT1 = monadStateT(dictMonad);
  return {
    state: function(f) {
      return function($200) {
        return pure8(f($200));
      };
    },
    Monad0: function() {
      return monadStateT1;
    }
  };
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var unwrap = function() {
  return coerce2;
};

// output/Control.Monad.State/index.js
var evalState = function(v) {
  return function(s) {
    var v1 = v(s);
    return v1.value0;
  };
};

// output/Data.Array/foreign.js
var replicateFill = function(count, value) {
  if (count < 1) {
    return [];
  }
  var result = new Array(count);
  return result.fill(value);
};
var replicatePolyfill = function(count, value) {
  var result = [];
  var n = 0;
  for (var i = 0; i < count; i++) {
    result[n++] = value;
  }
  return result;
};
var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons3(head4, tail3) {
    this.head = head4;
    this.tail = tail3;
  }
  var emptyList = {};
  function curryCons(head4) {
    return function(tail3) {
      return new Cons3(head4, tail3);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr3, xs) {
    return listToArray(foldr3(curryCons)(emptyList)(xs));
  };
}();
var length = function(xs) {
  return xs.length;
};
var unconsImpl = function(empty5, next, xs) {
  return xs.length === 0 ? empty5({}) : next(xs[0])(xs.slice(1));
};
var indexImpl = function(just, nothing, xs, i) {
  return i < 0 || i >= xs.length ? nothing : just(xs[i]);
};
var findLastIndexImpl = function(just, nothing, f, xs) {
  for (var i = xs.length - 1; i >= 0; i--) {
    if (f(xs[i]))
      return just(i);
  }
  return nothing;
};
var _insertAt = function(just, nothing, i, a, l) {
  if (i < 0 || i > l.length)
    return nothing;
  var l1 = l.slice();
  l1.splice(i, 0, a);
  return just(l1);
};
var sortByImpl = function() {
  function mergeFromTo(compare4, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare4, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare4(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare4, fromOrdering, xs) {
    var out;
    if (xs.length < 2)
      return xs;
    out = xs.slice(0);
    mergeFromTo(compare4, fromOrdering, out, xs.slice(0), 0, xs.length);
    return out;
  };
}();
var zipWithImpl = function(f, xs, ys) {
  var l = xs.length < ys.length ? xs.length : ys.length;
  var result = new Array(l);
  for (var i = 0; i < l; i++) {
    result[i] = f(xs[i])(ys[i]);
  }
  return result;
};

// output/Control.Monad.ST.Internal/foreign.js
var map_ = function(f) {
  return function(a) {
    return function() {
      return f(a());
    };
  };
};
var pure_ = function(a) {
  return function() {
    return a;
  };
};
var bind_ = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Monad.ST.Internal/index.js
var $runtime_lazy2 = function(name2, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var functorST = {
  map: map_
};
var monadST = {
  Applicative0: function() {
    return applicativeST;
  },
  Bind1: function() {
    return bindST;
  }
};
var bindST = {
  bind: bind_,
  Apply0: function() {
    return $lazy_applyST(0);
  }
};
var applicativeST = {
  pure: pure_,
  Apply0: function() {
    return $lazy_applyST(0);
  }
};
var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
  return {
    apply: ap(monadST),
    Functor0: function() {
      return functorST;
    }
  };
});

// output/Data.Array.ST/foreign.js
var sortByImpl2 = function() {
  function mergeFromTo(compare4, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare4, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare4(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare4, fromOrdering, xs) {
    if (xs.length < 2)
      return xs;
    mergeFromTo(compare4, fromOrdering, xs, xs.slice(0), 0, xs.length);
    return xs;
  };
}();

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init4) {
    return function(xs) {
      var acc = init4;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init4) {
    return function(xs) {
      var acc = init4;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Data.Bifunctor/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var bimap = function(dict) {
  return dict.bimap;
};
var lmap = function(dictBifunctor) {
  var bimap1 = bimap(dictBifunctor);
  return function(f) {
    return bimap1(f)(identity4);
  };
};
var bifunctorTuple = {
  bimap: function(f) {
    return function(g) {
      return function(v) {
        return new Tuple(f(v.value0), g(v.value1));
      };
    };
  }
};

// output/Data.Foldable/index.js
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond2 = applySecond(dictApplicative.Apply0());
  var pure8 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(f) {
      return foldr22(function($454) {
        return applySecond2(f($454));
      })(pure8(unit));
    };
  };
};
var for_ = function(dictApplicative) {
  var traverse_1 = traverse_(dictApplicative);
  return function(dictFoldable) {
    return flip(traverse_1(dictFoldable));
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate = function(dictFoldable) {
  var foldl2 = foldl(dictFoldable);
  return function(dictMonoid) {
    var append3 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(v1) {
            if (v.init) {
              return {
                init: false,
                acc: v1
              };
            }
            ;
            return {
              init: false,
              acc: append3(v.acc)(append3(sep)(v1))
            };
          };
        };
        return foldl2(go)({
          init: true,
          acc: mempty4
        })(xs).acc;
      };
    };
  };
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append3 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append3(f(x))(acc);
        };
      })(mempty4);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};

// output/Data.Function.Uncurried/foreign.js
var runFn2 = function(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
};
var runFn3 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return fn(a, b, c);
      };
    };
  };
};
var runFn4 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};
var runFn5 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return function(e) {
            return fn(a, b, c, d, e);
          };
        };
      };
    };
  };
};

// output/Data.FunctorWithIndex/foreign.js
var mapWithIndexArray = function(f) {
  return function(xs) {
    var l = xs.length;
    var result = Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(i)(xs[i]);
    }
    return result;
  };
};

// output/Data.FunctorWithIndex/index.js
var mapWithIndex = function(dict) {
  return dict.mapWithIndex;
};
var functorWithIndexArray = {
  mapWithIndex: mapWithIndexArray,
  Functor0: function() {
    return functorArray;
  }
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply2) {
    return function(map8) {
      return function(pure8) {
        return function(f) {
          return function(array) {
            function go(bot, top4) {
              switch (top4 - bot) {
                case 0:
                  return pure8([]);
                case 1:
                  return map8(array1)(f(array[bot]));
                case 2:
                  return apply2(map8(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply2(apply2(map8(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top4 - bot) / 4) * 2;
                  return apply2(map8(concat2)(go(bot, pivot)))(go(pivot, top4));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse2 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse2(dictApplicative)(identity5);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};
var sequence = function(dict) {
  return dict.sequence;
};

// output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust7) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe2 = f(value);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust7(maybe2);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust7) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value = fromJust7(maybe2);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/index.js
var fromJust2 = /* @__PURE__ */ fromJust();
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
};

// output/Data.Unfoldable/index.js
var fromJust3 = /* @__PURE__ */ fromJust();
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// output/Data.Array/index.js
var fromJust4 = /* @__PURE__ */ fromJust();
var eq12 = /* @__PURE__ */ eq(eqOrdering);
var append2 = /* @__PURE__ */ append(semigroupArray);
var zipWith = /* @__PURE__ */ runFn3(zipWithImpl);
var zip = /* @__PURE__ */ function() {
  return zipWith(Tuple.create);
}();
var tail = /* @__PURE__ */ function() {
  return runFn3(unconsImpl)($$const(Nothing.value))(function(v) {
    return function(xs) {
      return new Just(xs);
    };
  });
}();
var sortBy = function(comp) {
  return runFn3(sortByImpl)(comp)(function(v) {
    if (v instanceof GT) {
      return 1;
    }
    ;
    if (v instanceof EQ) {
      return 0;
    }
    ;
    if (v instanceof LT) {
      return -1 | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 897, column 38 - line 900, column 11): " + [v.constructor.name]);
  });
};
var singleton2 = function(a) {
  return [a];
};
var insertAt = /* @__PURE__ */ function() {
  return runFn5(_insertAt)(Just.create)(Nothing.value);
}();
var index = /* @__PURE__ */ function() {
  return runFn4(indexImpl)(Just.create)(Nothing.value);
}();
var head = function(xs) {
  return index(xs)(0);
};
var findLastIndex = /* @__PURE__ */ function() {
  return runFn4(findLastIndexImpl)(Just.create)(Nothing.value);
}();
var insertBy = function(cmp) {
  return function(x) {
    return function(ys) {
      var i = maybe(0)(function(v) {
        return v + 1 | 0;
      })(findLastIndex(function(y) {
        return eq12(cmp(x)(y))(GT.value);
      })(ys));
      return fromJust4(insertAt(i)(x)(ys));
    };
  };
};
var cons = function(x) {
  return function(xs) {
    return append2([x])(xs);
  };
};
var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head4, tail3) {
    this.head = head4;
    this.tail = tail3;
  };
  function finalCell(head4) {
    return new ConsCell(head4, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply2, map8, f) {
    var buildFrom = function(x, ys) {
      return apply2(map8(consList)(f(x)))(ys);
    };
    var go = function(acc, currentLen, xs) {
      if (currentLen === 0) {
        return acc;
      } else {
        var last3 = xs[currentLen - 1];
        return new Cont(function() {
          var built = go(buildFrom(last3, acc), currentLen - 1, xs);
          return built;
        });
      }
    };
    return function(array) {
      var acc = map8(finalCell)(f(array[array.length - 1]));
      var result = go(acc, array.length - 1, array);
      while (result instanceof Cont) {
        result = result.fn();
      }
      return map8(listToArray)(result);
    };
  };
}();

// output/Data.FoldableWithIndex/index.js
var foldr8 = /* @__PURE__ */ foldr(foldableArray);
var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
var foldl8 = /* @__PURE__ */ foldl(foldableArray);
var foldrWithIndex = function(dict) {
  return dict.foldrWithIndex;
};
var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
  var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
  return function(dictMonoid) {
    var append3 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return foldrWithIndex1(function(i) {
        return function(x) {
          return function(acc) {
            return append3(f(i)(x))(acc);
          };
        };
      })(mempty4);
    };
  };
};
var foldableWithIndexArray = {
  foldrWithIndex: function(f) {
    return function(z) {
      var $291 = foldr8(function(v) {
        return function(y) {
          return f(v.value0)(v.value1)(y);
        };
      })(z);
      var $292 = mapWithIndex2(Tuple.create);
      return function($293) {
        return $291($292($293));
      };
    };
  },
  foldlWithIndex: function(f) {
    return function(z) {
      var $294 = foldl8(function(y) {
        return function(v) {
          return f(v.value0)(y)(v.value1);
        };
      })(z);
      var $295 = mapWithIndex2(Tuple.create);
      return function($296) {
        return $294($295($296));
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
  },
  Foldable0: function() {
    return foldableArray;
  }
};

// output/Data.TraversableWithIndex/index.js
var traverseWithIndexDefault = function(dictTraversableWithIndex) {
  var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
  var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
  return function(dictApplicative) {
    var sequence12 = sequence2(dictApplicative);
    return function(f) {
      var $174 = mapWithIndex4(f);
      return function($175) {
        return sequence12($174($175));
      };
    };
  };
};
var traverseWithIndex = function(dict) {
  return dict.traverseWithIndex;
};
var traversableWithIndexArray = {
  traverseWithIndex: function(dictApplicative) {
    return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
  },
  FunctorWithIndex0: function() {
    return functorWithIndexArray;
  },
  FoldableWithIndex1: function() {
    return foldableWithIndexArray;
  },
  Traversable2: function() {
    return traversableArray;
  }
};

// output/Data.Array.NonEmpty.Internal/index.js
var NonEmptyArray = function(x) {
  return x;
};
var showNonEmptyArray = function(dictShow) {
  var show4 = show(showArray(dictShow));
  return {
    show: function(v) {
      return "(NonEmptyArray " + (show4(v) + ")");
    }
  };
};

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton3 = function(dictPlus) {
  var empty5 = empty(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty5);
  };
};
var showNonEmpty = function(dictShow) {
  var show4 = show(dictShow);
  return function(dictShow1) {
    var show13 = show(dictShow1);
    return {
      show: function(v) {
        return "(NonEmpty " + (show4(v.value0) + (" " + (show13(v.value1) + ")")));
      }
    };
  };
};
var functorNonEmpty = function(dictFunctor) {
  var map23 = map(dictFunctor);
  return {
    map: function(f) {
      return function(m) {
        return new NonEmpty(f(m.value0), map23(f)(m.value1));
      };
    }
  };
};

// output/Data.Array.NonEmpty/index.js
var fromJust5 = /* @__PURE__ */ fromJust();
var unsafeFromArray = NonEmptyArray;
var toArray = function(v) {
  return v;
};
var fromArray = function(xs) {
  if (length(xs) > 0) {
    return new Just(unsafeFromArray(xs));
  }
  ;
  if (otherwise) {
    return Nothing.value;
  }
  ;
  throw new Error("Failed pattern match at Data.Array.NonEmpty (line 161, column 1 - line 161, column 58): " + [xs.constructor.name]);
};
var adaptMaybe = function(f) {
  return function($126) {
    return fromJust5(f(toArray($126)));
  };
};
var head2 = /* @__PURE__ */ adaptMaybe(head);
var tail2 = /* @__PURE__ */ adaptMaybe(tail);

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};

// output/Data.Number/foreign.js
var infinity = Infinity;
var isFiniteImpl = isFinite;
var floor = Math.floor;
var remainder = function(n) {
  return function(m) {
    return n % m;
  };
};

// output/Data.Int/index.js
var top2 = /* @__PURE__ */ top(boundedInt);
var bottom2 = /* @__PURE__ */ bottom(boundedInt);
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();
var unsafeClamp = function(x) {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  ;
  if (x >= toNumber(top2)) {
    return top2;
  }
  ;
  if (x <= toNumber(bottom2)) {
    return bottom2;
  }
  ;
  if (otherwise) {
    return fromMaybe(0)(fromNumber(x));
  }
  ;
  throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
};
var floor2 = function($39) {
  return unsafeClamp(floor($39));
};

// output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil3() {
  }
  ;
  Nil3.value = new Nil3();
  return Nil3;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons3.create = function(value0) {
    return function(value1) {
      return new Cons3(value0, value1);
    };
  };
  return Cons3;
}();
var NonEmptyList = function(x) {
  return x;
};
var toList = function(v) {
  return new Cons(v.value0, v.value1);
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
          $tco_var_v = new Cons(v1, v);
          $copy_v1 = v1.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
            return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
          }
          ;
          if (v2 instanceof Cons && v2.value1 instanceof Nil) {
            return new Cons(f(v2.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v2) {
          return function($copy_v3) {
            var $tco_var_v2 = $copy_v2;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v2, v3) {
              if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                $tco_var_v2 = v2.value1;
                $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                return;
              }
              ;
              $tco_done1 = true;
              return v3;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(v)(unrolledMap(v1));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var map2 = /* @__PURE__ */ map(functorList);
var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $284 = foldl(foldableList)(flip(f))(b);
      return function($285) {
        return $284(rev($285));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append22 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $286 = append22(acc);
        return function($287) {
          return $286(f($287));
        };
      })(mempty4);
    };
  }
};
var foldr2 = /* @__PURE__ */ foldr(foldableList);
var intercalate3 = /* @__PURE__ */ intercalate(foldableList)(monoidString);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr2(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var semigroupNonEmptyList = {
  append: function(v) {
    return function(as$prime) {
      return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
    };
  }
};
var showList = function(dictShow) {
  var show4 = show(dictShow);
  return {
    show: function(v) {
      if (v instanceof Nil) {
        return "Nil";
      }
      ;
      return "(" + (intercalate3(" : ")(map2(show4)(v)) + " : Nil)");
    }
  };
};
var showNonEmptyList = function(dictShow) {
  var show4 = show(showNonEmpty(dictShow)(showList(dictShow)));
  return {
    show: function(v) {
      return "(NonEmptyList " + (show4(v) + ")");
    }
  };
};
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();

// output/Data.List/index.js
var map3 = /* @__PURE__ */ map(functorMaybe);
var uncons2 = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just({
      head: v.value0,
      tail: v.value1
    });
  }
  ;
  throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
};
var toUnfoldable2 = function(dictUnfoldable) {
  return unfoldr(dictUnfoldable)(function(xs) {
    return map3(function(rec) {
      return new Tuple(rec.head, rec.tail);
    })(uncons2(xs));
  });
};

// output/Effect.Random/foreign.js
var random = Math.random;

// output/Effect.Random/index.js
var randomInt = function(low) {
  return function(high) {
    return function __do() {
      var n = random();
      var asNumber = (toNumber(high) - toNumber(low) + 1) * n + toNumber(low);
      return floor2(asNumber);
    };
  };
};

// output/Random.LCG/index.js
var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
var fromJust6 = /* @__PURE__ */ fromJust();
var unSeed = function(v) {
  return v;
};
var seedMin = 1;
var lcgM = 2147483647;
var seedMax = /* @__PURE__ */ function() {
  return lcgM - 1 | 0;
}();
var mkSeed = function(x) {
  var ensureBetween = function(min3) {
    return function(max3) {
      return function(n) {
        var rangeSize = max3 - min3 | 0;
        var n$prime = mod2(n)(rangeSize);
        var $25 = n$prime < min3;
        if ($25) {
          return n$prime + max3 | 0;
        }
        ;
        return n$prime;
      };
    };
  };
  return ensureBetween(seedMin)(seedMax)(x);
};
var randomSeed = /* @__PURE__ */ map(functorEffect)(mkSeed)(/* @__PURE__ */ randomInt(seedMin)(seedMax));
var lcgC = 0;
var lcgA = 48271;
var lcgPerturb = function(d) {
  return function(v) {
    return fromJust6(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
  };
};
var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

// output/Control.Monad.Gen.Trans/index.js
var toUnfoldable3 = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
var add2 = /* @__PURE__ */ add(semiringNumber);
var mul2 = /* @__PURE__ */ mul(semiringNumber);
var top3 = /* @__PURE__ */ top(boundedInt);
var map1 = /* @__PURE__ */ map(functorArray);
var comparing2 = /* @__PURE__ */ comparing(ordInt);
var monadRecGenT = function(dictMonadRec) {
  return monadRecStateT(dictMonadRec);
};
var functorGenT = function(dictFunctor) {
  return functorStateT(dictFunctor);
};
var bindGenT = function(dictMonad) {
  return bindStateT(dictMonad);
};
var applyGenT = function(dictMonad) {
  return applyStateT(dictMonad);
};
var applicativeGenT = function(dictMonad) {
  return applicativeStateT(dictMonad);
};
var runGenT$prime = function(v) {
  return v;
};
var replicateMRec = function(dictMonadRec) {
  var Monad0 = dictMonadRec.Monad0();
  var pure8 = pure(Monad0.Applicative0());
  var mapFlipped2 = mapFlipped(Monad0.Bind1().Apply0().Functor0());
  var tailRecM3 = tailRecM(dictMonadRec);
  return function(v) {
    return function(v1) {
      if (v <= 0) {
        return pure8(Nil.value);
      }
      ;
      var go = function(v2) {
        if (v2.value1 === 0) {
          return pure8(new Done(v2.value0));
        }
        ;
        return mapFlipped2(v1)(function(x) {
          return new Loop(new Tuple(new Cons(x, v2.value0), v2.value1 - 1 | 0));
        });
      };
      return tailRecM3(go)(new Tuple(Nil.value, v));
    };
  };
};
var listOf = function(dictMonadRec) {
  return replicateMRec(monadRecGenT(dictMonadRec));
};
var vectorOf = function(dictMonadRec) {
  var map23 = map(functorGenT(dictMonadRec.Monad0().Bind1().Apply0().Functor0()));
  var listOf1 = listOf(dictMonadRec);
  return function(k) {
    return function(g) {
      return map23(toUnfoldable3)(listOf1(k)(g));
    };
  };
};
var lcgStep = function(dictMonad) {
  var f = function(s) {
    return new Tuple(unSeed(s.newSeed), function() {
      var $297 = {};
      for (var $298 in s) {
        if ({}.hasOwnProperty.call(s, $298)) {
          $297[$298] = s[$298];
        }
        ;
      }
      ;
      $297.newSeed = lcgNext(s.newSeed);
      return $297;
    }());
  };
  return state(monadStateStateT(dictMonad))(f);
};
var evalGen = function($319) {
  return evalState(runGenT$prime($319));
};
var chooseInt$prime = function(dictMonad) {
  var map23 = map(functorGenT(dictMonad.Bind1().Apply0().Functor0()));
  var lcgStep1 = lcgStep(dictMonad);
  var apply2 = apply(applyGenT(dictMonad));
  return function(a) {
    return function(b) {
      var numB = toNumber(b);
      var numA = toNumber(a);
      var clamp = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map23(toNumber)(lcgStep1);
      var choose32BitPosNumber = apply2(map23(add2)(choose31BitPosNumber))(map23(mul2(2))(choose31BitPosNumber));
      return map23(function($320) {
        return floor2(clamp($320));
      })(choose32BitPosNumber);
    };
  };
};
var chooseInt = function(dictMonad) {
  var chooseInt$prime1 = chooseInt$prime(dictMonad);
  return function(a) {
    return function(b) {
      var $300 = a <= b;
      if ($300) {
        return chooseInt$prime1(a)(b);
      }
      ;
      return chooseInt$prime1(b)(a);
    };
  };
};
var shuffle = function(dictMonadRec) {
  var Monad0 = dictMonadRec.Monad0();
  var bind6 = bind(bindGenT(Monad0));
  var vectorOf1 = vectorOf(dictMonadRec);
  var chooseInt1 = chooseInt(Monad0);
  var pure8 = pure(applicativeGenT(Monad0));
  return function(xs) {
    return bind6(vectorOf1(length(xs))(chooseInt1(0)(top3)))(function(ns) {
      return pure8(map1(snd)(sortBy(comparing2(fst))(zip(ns)(xs))));
    });
  };
};

// output/Data.Profunctor/index.js
var identity6 = /* @__PURE__ */ identity(categoryFn);
var profunctorFn = {
  dimap: function(a2b) {
    return function(c2d) {
      return function(b2c) {
        return function($18) {
          return c2d(b2c(a2b($18)));
        };
      };
    };
  }
};
var dimap = function(dict) {
  return dict.dimap;
};
var rmap = function(dictProfunctor) {
  var dimap1 = dimap(dictProfunctor);
  return function(b2c) {
    return dimap1(identity6)(b2c);
  };
};

// output/Data.Profunctor.Choice/index.js
var right = function(dict) {
  return dict.right;
};
var choiceFn = {
  left: function(v) {
    return function(v1) {
      if (v1 instanceof Left) {
        return new Left(v(v1.value0));
      }
      ;
      if (v1 instanceof Right) {
        return new Right(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Profunctor.Choice (line 32, column 1 - line 35, column 16): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  right: /* @__PURE__ */ map(functorEither),
  Profunctor0: function() {
    return profunctorFn;
  }
};

// output/Data.Profunctor.Strong/index.js
var strongFn = {
  first: function(a2b) {
    return function(v) {
      return new Tuple(a2b(v.value0), v.value1);
    };
  },
  second: /* @__PURE__ */ map(functorTuple),
  Profunctor0: function() {
    return profunctorFn;
  }
};
var first = function(dict) {
  return dict.first;
};

// output/Data.Lens.Prism/index.js
var identity7 = /* @__PURE__ */ identity(categoryFn);
var prism = function(to2) {
  return function(fro) {
    return function(dictChoice) {
      var Profunctor0 = dictChoice.Profunctor0();
      var dimap2 = dimap(Profunctor0);
      var right2 = right(dictChoice);
      var rmap2 = rmap(Profunctor0);
      return function(pab) {
        return dimap2(fro)(either(identity7)(identity7))(right2(rmap2(to2)(pab)));
      };
    };
  };
};

// output/Data.Lens.Prism.Maybe/index.js
var _Just = function(dictChoice) {
  return prism(Just.create)(maybe(new Left(Nothing.value))(Right.create))(dictChoice);
};

// output/Data.Lens.Lens/index.js
var lens$prime = function(to2) {
  return function(dictStrong) {
    var dimap2 = dimap(dictStrong.Profunctor0());
    var first2 = first(dictStrong);
    return function(pab) {
      return dimap2(to2)(function(v) {
        return v.value1(v.value0);
      })(first2(pab));
    };
  };
};
var lens = function(get3) {
  return function(set3) {
    return function(dictStrong) {
      return lens$prime(function(s) {
        return new Tuple(get3(s), function(b) {
          return set3(s)(b);
        });
      })(dictStrong);
    };
  };
};

// output/Record/index.js
var set = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function() {
      return function(l) {
        return function(b) {
          return function(r) {
            return unsafeSet(reflectSymbol2(l))(b)(r);
          };
        };
      };
    };
  };
};
var insert2 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function() {
      return function(l) {
        return function(a) {
          return function(r) {
            return unsafeSet(reflectSymbol2(l))(a)(r);
          };
        };
      };
    };
  };
};
var get2 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function(l) {
      return function(r) {
        return unsafeGet(reflectSymbol2(l))(r);
      };
    };
  };
};
var $$delete2 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function() {
      return function(l) {
        return function(r) {
          return unsafeDelete(reflectSymbol2(l))(r);
        };
      };
    };
  };
};

// output/Data.Lens.Record/index.js
var prop = function(dictIsSymbol) {
  var get3 = get2(dictIsSymbol)();
  var set3 = set(dictIsSymbol)()();
  return function() {
    return function() {
      return function(l) {
        return function(dictStrong) {
          return lens(get3(l))(flip(set3(l)))(dictStrong);
        };
      };
    };
  };
};

// output/Data.Lens.Setter/index.js
var over = function(l) {
  return l;
};
var set2 = function(l) {
  return function(b) {
    return over(l)($$const(b));
  };
};

// output/Debug/foreign.js
var req = typeof module === "undefined" ? void 0 : module.require;
var util = function() {
  try {
    return req === void 0 ? void 0 : req("util");
  } catch (e) {
    return void 0;
  }
}();
function _trace(x, k) {
  if (util !== void 0) {
    console.log(util.inspect(x, { depth: null, colors: true }));
  } else {
    console.log(x);
  }
  return k({});
}
var now = function() {
  var perf;
  if (typeof performance !== "undefined") {
    perf = performance;
  } else if (req) {
    try {
      perf = req("perf_hooks").performance;
    } catch (e) {
    }
  }
  return function() {
    return (perf || Date).now();
  };
}();

// output/Debug/index.js
var discard2 = /* @__PURE__ */ discard(discardUnit);
var trace = function() {
  return function(a) {
    return function(k) {
      return _trace(a, k);
    };
  };
};
var trace1 = /* @__PURE__ */ trace();
var traceM = function() {
  return function(dictMonad) {
    var discard1 = discard2(dictMonad.Bind1());
    var pure8 = pure(dictMonad.Applicative0());
    return function(s) {
      return discard1(pure8(unit))(function() {
        return trace1(s)(function(v) {
          return pure8(unit);
        });
      });
    };
  };
};

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler2(error3) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error3) {
      setTimeout(function() {
        throw error3;
      }, 0);
    }
  }
  function runSync(left2, right2, eff) {
    try {
      return right2(eff());
    } catch (error3) {
      return left2(error3);
    }
  }
  function runAsync(left2, eff, k) {
    try {
      return eff(k)();
    } catch (error3) {
      k(left2(error3))();
      return nonCanceler2;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size3 = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size3 !== 0) {
        size3--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size3 === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size3) % limit] = cb;
        size3++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util2) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util2.isLeft(result) && util2.fromLeft(result)) {
                  setTimeout(function() {
                    throw util2.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error3) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util2, supervisor, aff) {
    var runTick = 0;
    var status2 = SUSPENDED;
    var step2 = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run4(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status2) {
          case STEP_BIND:
            status2 = CONTINUE;
            try {
              step2 = bhead(step2);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status2 = RETURN;
              fail2 = util2.left(e);
              step2 = null;
            }
            break;
          case STEP_RESULT:
            if (util2.isLeft(step2)) {
              status2 = RETURN;
              fail2 = step2;
              step2 = null;
            } else if (bhead === null) {
              status2 = RETURN;
            } else {
              status2 = STEP_BIND;
              step2 = util2.fromRight(step2);
            }
            break;
          case CONTINUE:
            switch (step2.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step2._2;
                status2 = CONTINUE;
                step2 = step2._1;
                break;
              case PURE:
                if (bhead === null) {
                  status2 = RETURN;
                  step2 = util2.right(step2._1);
                } else {
                  status2 = STEP_BIND;
                  step2 = step2._1;
                }
                break;
              case SYNC:
                status2 = STEP_RESULT;
                step2 = runSync(util2.left, util2.right, step2._1);
                break;
              case ASYNC:
                status2 = PENDING;
                step2 = runAsync(util2.left, step2._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status2 = STEP_RESULT;
                      step2 = result2;
                      run4(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status2 = RETURN;
                fail2 = util2.left(step2._1);
                step2 = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step2, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status2 = CONTINUE;
                step2 = step2._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step2, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status2 = CONTINUE;
                step2 = step2._1;
                break;
              case FORK:
                status2 = STEP_RESULT;
                tmp = Fiber(util2, supervisor, step2._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step2._1) {
                  tmp.run();
                }
                step2 = util2.right(tmp);
                break;
              case SEQ:
                status2 = CONTINUE;
                step2 = sequential2(util2, supervisor, step2._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status2 = COMPLETED;
              step2 = interrupt || fail2 || step2;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status2 = RETURN;
                  } else if (fail2) {
                    status2 = CONTINUE;
                    step2 = attempt._2(util2.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status2 = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status2 = STEP_BIND;
                    step2 = util2.fromRight(step2);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util2.fromRight(step2);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status2 = CONTINUE;
                      step2 = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                  status2 = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step2 = attempt._1.killed(util2.fromLeft(interrupt))(attempt._2);
                  } else if (fail2) {
                    step2 = attempt._1.failed(util2.fromLeft(fail2))(attempt._2);
                  } else {
                    step2 = attempt._1.completed(util2.fromRight(step2))(attempt._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                  status2 = CONTINUE;
                  step2 = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status2 = RETURN;
                  step2 = attempt._1;
                  fail2 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step2));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util2.fromLeft(fail2);
              }, 0);
            } else if (util2.isLeft(step2) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util2.fromLeft(step2);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status2 = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join3) {
      return function() {
        if (status2 === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step2)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error3, cb) {
      return function() {
        if (status2 === COMPLETED) {
          cb(util2.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util2.right(void 0));
          }
        })();
        switch (status2) {
          case SUSPENDED:
            interrupt = util2.left(error3);
            status2 = COMPLETED;
            step2 = interrupt;
            run4(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util2.left(error3);
            }
            if (bracketCount === 0) {
              if (status2 === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error3)), attempts, interrupt);
              }
              status2 = RETURN;
              step2 = null;
              fail2 = null;
              run4(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util2.left(error3);
            }
            if (bracketCount === 0) {
              status2 = RETURN;
              step2 = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status2 === SUSPENDED) {
          run4(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join: join2,
      onComplete,
      isSuspended: function() {
        return status2 === SUSPENDED;
      },
      run: function() {
        if (status2 === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run4(runTick);
            });
          } else {
            run4(runTick);
          }
        }
      }
    };
  }
  function runPar(util2, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error3, par2, cb2) {
      var step2 = par2;
      var head4 = null;
      var tail3 = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step2.tag) {
            case FORKED:
              if (step2._3 === EMPTY) {
                tmp = fibers[step2._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head4 === null) {
                break loop;
              }
              step2 = head4._2;
              if (tail3 === null) {
                head4 = null;
              } else {
                head4 = tail3._1;
                tail3 = tail3._2;
              }
              break;
            case MAP:
              step2 = step2._2;
              break;
            case APPLY:
            case ALT:
              if (head4) {
                tail3 = new Aff2(CONS, head4, tail3);
              }
              head4 = step2;
              step2 = step2._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util2.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join2(result, head4, tail3) {
      var fail2, step2, lhs, rhs, tmp, kid;
      if (util2.isLeft(result)) {
        fail2 = result;
        step2 = null;
      } else {
        step2 = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head4 === null) {
            cb(fail2 || step2)();
            return;
          }
          if (head4._3 !== EMPTY) {
            return;
          }
          switch (head4.tag) {
            case MAP:
              if (fail2 === null) {
                head4._3 = util2.right(head4._1(util2.fromRight(step2)));
                step2 = head4._3;
              } else {
                head4._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (fail2) {
                head4._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail2 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail3 === null) {
                      join2(fail2, null, null);
                    } else {
                      join2(fail2, tail3._1, tail3._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step2 = util2.right(util2.fromRight(lhs)(util2.fromRight(rhs)));
                head4._3 = step2;
              }
              break;
            case ALT:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (lhs === EMPTY && util2.isLeft(rhs) || rhs === EMPTY && util2.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util2.isLeft(lhs) && rhs !== EMPTY && util2.isLeft(rhs)) {
                fail2 = step2 === lhs ? rhs : lhs;
                step2 = null;
                head4._3 = fail2;
              } else {
                head4._3 = step2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step2 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail3 === null) {
                      join2(step2, null, null);
                    } else {
                      join2(step2, tail3._1, tail3._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail3 === null) {
            head4 = null;
          } else {
            head4 = tail3._1;
            tail3 = tail3._2;
          }
        }
    }
    function resolve4(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join2(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run4() {
      var status2 = CONTINUE;
      var step2 = par;
      var head4 = null;
      var tail3 = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status2) {
            case CONTINUE:
              switch (step2.tag) {
                case MAP:
                  if (head4) {
                    tail3 = new Aff2(CONS, head4, tail3);
                  }
                  head4 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                  step2 = step2._2;
                  break;
                case APPLY:
                  if (head4) {
                    tail3 = new Aff2(CONS, head4, tail3);
                  }
                  head4 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                  step2 = step2._1;
                  break;
                case ALT:
                  if (head4) {
                    tail3 = new Aff2(CONS, head4, tail3);
                  }
                  head4 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                  step2 = step2._1;
                  break;
                default:
                  fid = fiberId++;
                  status2 = RETURN;
                  tmp = step2;
                  step2 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail3), EMPTY);
                  tmp = Fiber(util2, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve4(step2)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head4 === null) {
                break loop;
              }
              if (head4._1 === EMPTY) {
                head4._1 = step2;
                status2 = CONTINUE;
                step2 = head4._2;
                head4._2 = EMPTY;
              } else {
                head4._2 = step2;
                step2 = head4;
                if (tail3 === null) {
                  head4 = null;
                } else {
                  head4 = tail3._1;
                  tail3 = tail3._2;
                }
              }
          }
        }
      root = step2;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error3, cb2) {
      interrupt = util2.left(error3);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error3, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler2;
          };
        });
      };
    }
    run4();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential2(util2, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util2, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler2;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _catchError(aff) {
  return function(k) {
    return Aff.Catch(aff, k);
  };
}
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
function _parAffMap(f) {
  return function(aff) {
    return Aff.ParMap(f, aff);
  };
}
function _parAffApply(aff1) {
  return function(aff2) {
    return Aff.ParApply(aff1, aff2);
  };
}
var makeAff = Aff.Async;
function _makeFiber(util2, aff) {
  return function() {
    return Aff.Fiber(util2, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right2, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right2()));
        return function() {
          return Aff.Sync(function() {
            return right2(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output/Control.Monad.Except.Trans/index.js
var map4 = /* @__PURE__ */ map(functorEither);
var ExceptT = function(x) {
  return x;
};
var withExceptT = function(dictFunctor) {
  var map14 = map(dictFunctor);
  return function(f) {
    return function(v) {
      var mapLeft = function(v1) {
        return function(v2) {
          if (v2 instanceof Right) {
            return new Right(v2.value0);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [v1.constructor.name, v2.constructor.name]);
        };
      };
      return map14(mapLeft(f))(v);
    };
  };
};
var runExceptT = function(v) {
  return v;
};
var mapExceptT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorExceptT = function(dictFunctor) {
  var map14 = map(dictFunctor);
  return {
    map: function(f) {
      return mapExceptT(map14(map4(f)));
    }
  };
};
var monadExceptT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeExceptT(dictMonad);
    },
    Bind1: function() {
      return bindExceptT(dictMonad);
    }
  };
};
var bindExceptT = function(dictMonad) {
  var bind6 = bind(dictMonad.Bind1());
  var pure8 = pure(dictMonad.Applicative0());
  return {
    bind: function(v) {
      return function(k) {
        return bind6(v)(either(function($187) {
          return pure8(Left.create($187));
        })(function(a) {
          var v1 = k(a);
          return v1;
        }));
      };
    },
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var applyExceptT = function(dictMonad) {
  var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadExceptT(dictMonad)),
    Functor0: function() {
      return functorExceptT1;
    }
  };
};
var applicativeExceptT = function(dictMonad) {
  return {
    pure: function() {
      var $188 = pure(dictMonad.Applicative0());
      return function($189) {
        return ExceptT($188(Right.create($189)));
      };
    }(),
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var monadThrowExceptT = function(dictMonad) {
  var monadExceptT1 = monadExceptT(dictMonad);
  return {
    throwError: function() {
      var $198 = pure(dictMonad.Applicative0());
      return function($199) {
        return ExceptT($198(Left.create($199)));
      };
    }(),
    Monad0: function() {
      return monadExceptT1;
    }
  };
};

// output/Control.Parallel.Class/index.js
var sequential = function(dict) {
  return dict.sequential;
};
var parallel = function(dict) {
  return dict.parallel;
};

// output/Control.Parallel/index.js
var identity8 = /* @__PURE__ */ identity(categoryFn);
var parTraverse_ = function(dictParallel) {
  var sequential2 = sequential(dictParallel);
  var traverse_3 = traverse_(dictParallel.Applicative1());
  var parallel2 = parallel(dictParallel);
  return function(dictFoldable) {
    var traverse_1 = traverse_3(dictFoldable);
    return function(f) {
      var $48 = traverse_1(function($50) {
        return parallel2(f($50));
      });
      return function($49) {
        return sequential2($48($49));
      };
    };
  };
};
var parSequence_ = function(dictParallel) {
  var parTraverse_1 = parTraverse_(dictParallel);
  return function(dictFoldable) {
    return parTraverse_1(dictFoldable)(identity8);
  };
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Effect.Aff/index.js
var $runtime_lazy3 = function(name2, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var functorParAff = {
  map: _parAffMap
};
var functorAff = {
  map: _map
};
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    ;
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    ;
    if (v instanceof Right) {
      return false;
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var launchAff_ = function($74) {
  return $$void2(launchAff($74));
};
var applyParAff = {
  apply: _parAffApply,
  Functor0: function() {
    return functorParAff;
  }
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var pure2 = /* @__PURE__ */ pure(applicativeAff);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var monadErrorAff = {
  catchError: _catchError,
  MonadThrow0: function() {
    return monadThrowAff;
  }
};
var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
var runAff = function(k) {
  return function(aff) {
    return launchAff(bindFlipped2(function($80) {
      return liftEffect2(k($80));
    })($$try2(aff)));
  };
};
var runAff_ = function(k) {
  return function(aff) {
    return $$void2(runAff(k)(aff));
  };
};
var parallelAff = {
  parallel: unsafeCoerce2,
  sequential: _sequential,
  Monad0: function() {
    return monadAff;
  },
  Applicative1: function() {
    return $lazy_applicativeParAff(0);
  }
};
var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy3("applicativeParAff", "Effect.Aff", function() {
  return {
    pure: function() {
      var $82 = parallel(parallelAff);
      return function($83) {
        return $82(pure2($83));
      };
    }(),
    Apply0: function() {
      return applyParAff;
    }
  };
});
var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
var semigroupCanceler = {
  append: function(v) {
    return function(v1) {
      return function(err) {
        return parSequence_2([v(err), v1(err)]);
      };
    };
  }
};
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));
var monoidCanceler = {
  mempty: nonCanceler,
  Semigroup0: function() {
    return semigroupCanceler;
  }
};

// output/Effect.Console/foreign.js
var log2 = function(s) {
  return function() {
    console.log(s);
  };
};

// output/Data.String.Common/foreign.js
var toLower = function(s) {
  return s.toLowerCase();
};

// output/Fetch.Core/foreign.js
function _fetch(a, b) {
  return fetch(a, b);
}

// output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};
var runEffectFn1 = function runEffectFn12(fn) {
  return function(a) {
    return function() {
      return fn(a);
    };
  };
};
var runEffectFn2 = function runEffectFn22(fn) {
  return function(a) {
    return function(b) {
      return function() {
        return fn(a, b);
      };
    };
  };
};
var runEffectFn4 = function runEffectFn42(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return function() {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };
};

// output/Fetch.Core/index.js
var fetch2 = function(req2) {
  return function() {
    return _fetch(req2, {});
  };
};

// output/Data.Map.Internal/index.js
var Leaf = /* @__PURE__ */ function() {
  function Leaf2() {
  }
  ;
  Leaf2.value = new Leaf2();
  return Leaf2;
}();
var Two = /* @__PURE__ */ function() {
  function Two2(value0, value1, value2, value3) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }
  ;
  Two2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return new Two2(value0, value1, value2, value3);
        };
      };
    };
  };
  return Two2;
}();
var Three = /* @__PURE__ */ function() {
  function Three2(value0, value1, value2, value3, value4, value5, value6) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }
  ;
  Three2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return function(value6) {
                return new Three2(value0, value1, value2, value3, value4, value5, value6);
              };
            };
          };
        };
      };
    };
  };
  return Three2;
}();
var TwoLeft = /* @__PURE__ */ function() {
  function TwoLeft2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  TwoLeft2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new TwoLeft2(value0, value1, value2);
      };
    };
  };
  return TwoLeft2;
}();
var TwoRight = /* @__PURE__ */ function() {
  function TwoRight2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  TwoRight2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new TwoRight2(value0, value1, value2);
      };
    };
  };
  return TwoRight2;
}();
var ThreeLeft = /* @__PURE__ */ function() {
  function ThreeLeft2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeLeft2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeLeft2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeLeft2;
}();
var ThreeMiddle = /* @__PURE__ */ function() {
  function ThreeMiddle2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeMiddle2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeMiddle2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeMiddle2;
}();
var ThreeRight = /* @__PURE__ */ function() {
  function ThreeRight2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeRight2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeRight2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeRight2;
}();
var KickUp = /* @__PURE__ */ function() {
  function KickUp2(value0, value1, value2, value3) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }
  ;
  KickUp2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return new KickUp2(value0, value1, value2, value3);
        };
      };
    };
  };
  return KickUp2;
}();
var fromZipper = function($copy_dictOrd) {
  return function($copy_v) {
    return function($copy_v1) {
      var $tco_var_dictOrd = $copy_dictOrd;
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(dictOrd, v, v1) {
        if (v instanceof Nil) {
          $tco_done = true;
          return v1;
        }
        ;
        if (v instanceof Cons) {
          if (v.value0 instanceof TwoLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
            return;
          }
          ;
          if (v.value0 instanceof TwoRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
            return;
          }
          ;
          if (v.value0 instanceof ThreeLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeMiddle) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
};
var insert3 = function(dictOrd) {
  var fromZipper1 = fromZipper(dictOrd);
  var compare4 = compare(dictOrd);
  return function(k) {
    return function(v) {
      var up = function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v1 = $copy_v1;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v1, v2) {
            if (v1 instanceof Nil) {
              $tco_done = true;
              return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
            }
            ;
            if (v1 instanceof Cons) {
              if (v1.value0 instanceof TwoLeft) {
                $tco_done = true;
                return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
              }
              ;
              if (v1.value0 instanceof TwoRight) {
                $tco_done = true;
                return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
              }
              ;
              if (v1.value0 instanceof ThreeLeft) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeMiddle) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeRight) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_v1, $copy_v2);
          }
          ;
          return $tco_result;
        };
      };
      var down = function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v1 = $copy_v1;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(v1, v2) {
            if (v2 instanceof Leaf) {
              $tco_done1 = true;
              return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
            }
            ;
            if (v2 instanceof Two) {
              var v3 = compare4(k)(v2.value1);
              if (v3 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                $copy_v2 = v2.value0;
                return;
              }
              ;
              $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
              $copy_v2 = v2.value3;
              return;
            }
            ;
            if (v2 instanceof Three) {
              var v3 = compare4(k)(v2.value1);
              if (v3 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
              }
              ;
              var v4 = compare4(k)(v2.value4);
              if (v4 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                $copy_v2 = v2.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v4 instanceof LT) {
                $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
              $copy_v2 = v2.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_v1, $copy_v2);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
};
var empty2 = /* @__PURE__ */ function() {
  return Leaf.value;
}();
var fromFoldable2 = function(dictOrd) {
  var insert1 = insert3(dictOrd);
  return function(dictFoldable) {
    return foldl(dictFoldable)(function(m) {
      return function(v) {
        return insert1(v.value0)(v.value1)(m);
      };
    })(empty2);
  };
};

// output/Data.String.CaseInsensitive/index.js
var compare2 = /* @__PURE__ */ compare(ordString);
var CaseInsensitiveString = function(x) {
  return x;
};
var eqCaseInsensitiveString = {
  eq: function(v) {
    return function(v1) {
      return toLower(v) === toLower(v1);
    };
  }
};
var ordCaseInsensitiveString = {
  compare: function(v) {
    return function(v1) {
      return compare2(toLower(v))(toLower(v1));
    };
  },
  Eq0: function() {
    return eqCaseInsensitiveString;
  }
};

// output/Fetch.Core.Headers/foreign.js
function unsafeFromRecord(r) {
  return new Headers(r);
}
function _toArray(tuple, headers2) {
  return Array.from(headers2.entries(), function(pair) {
    return tuple(pair[0])(pair[1]);
  });
}

// output/Fetch.Core.Headers/index.js
var toArray2 = /* @__PURE__ */ function() {
  return runFn2(_toArray)(Tuple.create);
}();
var fromRecord = function() {
  return unsafeFromRecord;
};

// output/Fetch.Internal.Headers/index.js
var toHeaders = /* @__PURE__ */ function() {
  var $7 = fromFoldable2(ordCaseInsensitiveString)(foldableArray);
  var $8 = map(functorArray)(lmap(bifunctorTuple)(CaseInsensitiveString));
  return function($9) {
    return $7($8(toArray2($9)));
  };
}();

// output/Fetch.Core.Request/foreign.js
function _unsafeNew(url2, options) {
  try {
    return new Request(url2, options);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// output/Fetch.Internal.Request/index.js
var fromRecord2 = /* @__PURE__ */ fromRecord();
var toCoreRequestOptionsHelpe = {
  convertHelper: function(v) {
    return function(v1) {
      return {};
    };
  }
};
var toCoreRequestOptionsConve8 = function() {
  return {
    convertImpl: function(v) {
      return fromRecord2;
    }
  };
};
var $$new2 = function() {
  return function(url2) {
    return function(options) {
      return function() {
        return _unsafeNew(url2, options);
      };
    };
  };
};
var convertImpl = function(dict) {
  return dict.convertImpl;
};
var convertHelper = function(dict) {
  return dict.convertHelper;
};
var toCoreRequestOptionsHelpe1 = function(dictToCoreRequestOptionsConverter) {
  var convertImpl1 = convertImpl(dictToCoreRequestOptionsConverter);
  return function() {
    return function() {
      return function() {
        return function(dictIsSymbol) {
          var $$delete4 = $$delete2(dictIsSymbol)()();
          var get3 = get2(dictIsSymbol)();
          var insert7 = insert2(dictIsSymbol)()();
          return function(dictToCoreRequestOptionsHelper) {
            var convertHelper1 = convertHelper(dictToCoreRequestOptionsHelper);
            return function() {
              return function() {
                return {
                  convertHelper: function(v) {
                    return function(r) {
                      var tail3 = convertHelper1($$Proxy.value)($$delete4($$Proxy.value)(r));
                      var head4 = convertImpl1($$Proxy.value)(get3($$Proxy.value)(r));
                      return insert7($$Proxy.value)(head4)(tail3);
                    };
                  }
                };
              };
            };
          };
        };
      };
    };
  };
};
var toCoreRequestOptionsRowRo = function() {
  return function() {
    return function(dictToCoreRequestOptionsHelper) {
      return {
        convert: convertHelper(dictToCoreRequestOptionsHelper)($$Proxy.value)
      };
    };
  };
};
var convert = function(dict) {
  return dict.convert;
};

// output/Fetch.Core.Response/foreign.js
function headers(resp) {
  return resp.headers;
}
function ok(resp) {
  return resp.ok;
}
function redirected(resp) {
  return resp.redirected;
}
function status(resp) {
  return resp.status;
}
function statusText(resp) {
  return resp.statusText;
}
function url(resp) {
  return resp.url;
}
function body(resp) {
  return function() {
    return resp.body;
  };
}
function arrayBuffer(resp) {
  return function() {
    return resp.arrayBuffer();
  };
}
function blob(resp) {
  return function() {
    return resp.blob();
  };
}
function text(resp) {
  return function() {
    return resp.text();
  };
}
function json(resp) {
  return function() {
    return resp.json();
  };
}

// output/Control.Monad.Except/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var withExcept = /* @__PURE__ */ withExceptT(functorIdentity);
var runExcept = function($3) {
  return unwrap2(runExceptT($3));
};

// output/Foreign/foreign.js
function typeOf(value) {
  return typeof value;
}
function tagOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

// output/Data.List.NonEmpty/index.js
var singleton4 = /* @__PURE__ */ function() {
  var $200 = singleton3(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();

// output/Foreign/index.js
var show2 = /* @__PURE__ */ show(showString);
var show1 = /* @__PURE__ */ show(showInt);
var ForeignError = /* @__PURE__ */ function() {
  function ForeignError2(value0) {
    this.value0 = value0;
  }
  ;
  ForeignError2.create = function(value0) {
    return new ForeignError2(value0);
  };
  return ForeignError2;
}();
var TypeMismatch = /* @__PURE__ */ function() {
  function TypeMismatch3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  TypeMismatch3.create = function(value0) {
    return function(value1) {
      return new TypeMismatch3(value0, value1);
    };
  };
  return TypeMismatch3;
}();
var ErrorAtIndex = /* @__PURE__ */ function() {
  function ErrorAtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtIndex2.create = function(value0) {
    return function(value1) {
      return new ErrorAtIndex2(value0, value1);
    };
  };
  return ErrorAtIndex2;
}();
var ErrorAtProperty = /* @__PURE__ */ function() {
  function ErrorAtProperty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtProperty2.create = function(value0) {
    return function(value1) {
      return new ErrorAtProperty2(value0, value1);
    };
  };
  return ErrorAtProperty2;
}();
var unsafeToForeign = unsafeCoerce2;
var unsafeFromForeign = unsafeCoerce2;
var showForeignError = {
  show: function(v) {
    if (v instanceof ForeignError) {
      return "(ForeignError " + (show2(v.value0) + ")");
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "(ErrorAtIndex " + (show1(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "(ErrorAtProperty " + (show2(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "(TypeMismatch " + (show2(v.value0) + (" " + (show2(v.value1) + ")")));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 69, column 1 - line 73, column 89): " + [v.constructor.name]);
  }
};
var fail = function(dictMonad) {
  var $153 = throwError(monadThrowExceptT(dictMonad));
  return function($154) {
    return $153(singleton4($154));
  };
};
var readArray = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(value) {
    if (isArray(value)) {
      return pure1(unsafeFromForeign(value));
    }
    ;
    if (otherwise) {
      return fail1(new TypeMismatch("array", tagOf(value)));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 164, column 1 - line 164, column 99): " + [value.constructor.name]);
  };
};
var unsafeReadTagged = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(tag) {
    return function(value) {
      if (tagOf(value) === tag) {
        return pure1(unsafeFromForeign(value));
      }
      ;
      if (otherwise) {
        return fail1(new TypeMismatch(tag, tagOf(value)));
      }
      ;
      throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value.constructor.name]);
    };
  };
};
var readNumber = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("Number");
};
var readString = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("String");
};

// output/Promise.Internal/foreign.js
function thenOrCatch(k, c, p) {
  return p.then(k, c);
}
function resolve(a) {
  return Promise.resolve(a);
}

// output/Promise.Rejection/foreign.js
function _toError(just, nothing, ref) {
  if (ref instanceof Error) {
    return just(ref);
  }
  return nothing;
}

// output/Promise.Rejection/index.js
var toError = /* @__PURE__ */ function() {
  return runFn3(_toError)(Just.create)(Nothing.value);
}();

// output/Promise/index.js
var thenOrCatch2 = function() {
  return function(k) {
    return function(c) {
      return function(p) {
        return function() {
          return thenOrCatch(mkEffectFn1(k), mkEffectFn1(c), p);
        };
      };
    };
  };
};
var resolve2 = function() {
  return resolve;
};

// output/Promise.Aff/index.js
var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
var map5 = /* @__PURE__ */ map(functorEffect);
var resolve3 = /* @__PURE__ */ resolve2();
var alt2 = /* @__PURE__ */ alt(altMaybe);
var map12 = /* @__PURE__ */ map(functorMaybe);
var readString2 = /* @__PURE__ */ readString(monadIdentity);
var bind2 = /* @__PURE__ */ bind(bindAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var toAff$prime = function(customCoerce) {
  return function(p) {
    return makeAff(function(cb) {
      return voidRight2(mempty2)(thenOrCatch3(function(a) {
        return map5(resolve3)(cb(new Right(a)));
      })(function(e) {
        return map5(resolve3)(cb(new Left(customCoerce(e))));
      })(p));
    });
  };
};
var coerce3 = function(rej) {
  return fromMaybe$prime(function(v) {
    return error("Promise failed, couldn't extract JS Error or String");
  })(alt2(toError(rej))(map12(error)(hush(runExcept(readString2(unsafeToForeign(rej)))))));
};
var toAff = /* @__PURE__ */ toAff$prime(coerce3);
var toAffE = function(f) {
  return bind2(liftEffect3(f))(toAff);
};

// output/Fetch.Internal.Response/index.js
var text2 = function(response) {
  return toAffE(text(response));
};
var json2 = function(response) {
  return toAffE(json(response));
};
var blob2 = function(response) {
  return toAffE(blob(response));
};
var arrayBuffer2 = function(response) {
  return toAffE(arrayBuffer(response));
};
var convert2 = function(response) {
  return {
    headers: toHeaders(headers(response)),
    ok: ok(response),
    redirected: redirected(response),
    status: status(response),
    statusText: statusText(response),
    url: url(response),
    text: text2(response),
    json: json2(response),
    body: body(response),
    arrayBuffer: arrayBuffer2(response),
    blob: blob2(response)
  };
};

// output/Fetch/index.js
var bind3 = /* @__PURE__ */ bind(bindAff);
var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
var $$new4 = /* @__PURE__ */ $$new2();
var pure3 = /* @__PURE__ */ pure(applicativeAff);
var fetch3 = function() {
  return function() {
    return function(dictToCoreRequestOptions) {
      var convert3 = convert(dictToCoreRequestOptions);
      return function(url2) {
        return function(r) {
          return bind3(liftEffect4($$new4(url2)(convert3(r))))(function(request) {
            return bind3(toAffE(fetch2(request)))(function(cResponse) {
              return pure3(convert2(cResponse));
            });
          });
        };
      };
    };
  };
};

// output/Flame.Application.Internal.Dom/foreign.js
function querySelector_(selector) {
  return document.querySelector(selector);
}
function createWindowListener_(eventName, updater) {
  window.addEventListener(eventName, function(event) {
    updater(event)();
  });
}
function createDocumentListener_(eventName, updater) {
  document.addEventListener(eventName, function(event) {
    updater(event)();
  });
}
function createCustomListener_(eventName, updater) {
  document.addEventListener(eventName, function(event) {
    updater(event.detail)();
  });
}

// output/Data.Nullable/foreign.js
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output/Data.Nullable/index.js
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};

// output/Flame.Application.Internal.Dom/index.js
var querySelector = function(selector) {
  return function __do() {
    var selected = querySelector_(selector);
    return toMaybe(selected);
  };
};
var createWindowListener = /* @__PURE__ */ runEffectFn2(createWindowListener_);
var createDocumentListener = /* @__PURE__ */ runEffectFn2(createDocumentListener_);
var createCustomListener = /* @__PURE__ */ runEffectFn2(createCustomListener_);

// output/Flame.Html.Attribute.Internal/foreign.js
var styleData = 1;
function createStyle(object) {
  return [styleData, object];
}

// output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";

// output/Foreign.Object/foreign.js
function runST(f) {
  return f();
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output/Foreign.Object.ST/foreign.js
var newImpl2 = function() {
  return {};
};
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}

// output/Foreign.Object/index.js
var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindST);
var singleton6 = function(k) {
  return function(v) {
    return runST(bindFlipped3(poke2(k)(v))(newImpl2));
  };
};

// output/Flame.Html.Attribute.Internal/index.js
var style1 = function(a) {
  return function(b) {
    return createStyle(singleton6(a)(b));
  };
};

// output/Flame.Html.Element/foreign.js
var textNode = 1;
var elementNode = 2;
var svgNode = 3;
var styleData2 = 1;
var classData = 2;
var propertyData = 3;
var attributeData = 4;
var keyData = 7;
function createElementNode(tag) {
  return function(nodeData) {
    return function(potentialChildren) {
      let children = potentialChildren, text4 = void 0;
      if (potentialChildren.length === 1 && potentialChildren[0].nodeType == textNode) {
        children = void 0;
        text4 = potentialChildren[0].text;
      }
      return {
        nodeType: elementNode,
        node: void 0,
        tag,
        nodeData: fromNodeData(nodeData),
        children,
        text: text4
      };
    };
  };
}
function createDatalessElementNode(tag) {
  return function(potentialChildren) {
    let children = potentialChildren, text4 = void 0;
    if (potentialChildren.length === 1 && potentialChildren[0].nodeType == textNode) {
      children = void 0;
      text4 = potentialChildren[0].text;
    }
    return {
      nodeType: elementNode,
      node: void 0,
      tag,
      nodeData: {},
      children,
      text: text4
    };
  };
}
function createEmptyElement(tag) {
  return {
    nodeType: tag.trim().toLowerCase() === "svg" ? svgNode : elementNode,
    node: void 0,
    tag,
    nodeData: {}
  };
}
function text3(value) {
  return {
    nodeType: textNode,
    node: void 0,
    text: value
  };
}
function fromNodeData(allData) {
  let nodeData = {};
  if (allData !== void 0)
    for (let data of allData) {
      let dataOne = data[1];
      switch (data[0]) {
        case styleData2:
          if (nodeData.styles === void 0)
            nodeData.styles = {};
          for (let key in dataOne)
            nodeData.styles[key] = dataOne[key];
          break;
        case classData:
          if (nodeData.classes === void 0)
            nodeData.classes = [];
          nodeData.classes = nodeData.classes.concat(dataOne);
          break;
        case propertyData:
          if (nodeData.properties === void 0)
            nodeData.properties = {};
          nodeData.properties[dataOne] = data[2];
          break;
        case attributeData:
          if (nodeData.attributes === void 0)
            nodeData.attributes = {};
          nodeData.attributes[dataOne] = data[2];
          break;
        case keyData:
          nodeData.key = dataOne;
          break;
        default:
          if (nodeData.events === void 0)
            nodeData.events = {};
          if (nodeData.events[dataOne] === void 0)
            nodeData.events[dataOne] = [];
          nodeData.events[dataOne].push(data[2]);
      }
    }
  return nodeData;
}

// output/Flame.Html.Element/index.js
var toNodeStringHtml = {
  toNode: function($777) {
    return singleton2(text3($777));
  }
};
var toNodeNodeDataNodeData = {
  toNode: singleton2
};
var toNodeHtmlHtml = {
  toNode: singleton2
};
var toNode = function(dict) {
  return dict.toNode;
};
var toNodeArray = function(dictToNode) {
  return {
    toNode: concatMap(toNode(dictToNode))
  };
};
var hr = /* @__PURE__ */ createEmptyElement("hr");
var createElement_ = function(tag) {
  return function(dictToNode) {
    var toNode1 = toNode(dictToNode);
    return function(children) {
      return createDatalessElementNode(tag)(toNode1(children));
    };
  };
};
var div_ = function(dictToNode) {
  return createElement_("div")(dictToNode);
};
var createElement = function(tag) {
  return function(dictToNode) {
    var toNode1 = toNode(dictToNode);
    return function(dictToNode1) {
      var toNode2 = toNode(dictToNode1);
      return function(nodeData) {
        return function(children) {
          return createElementNode(tag)(toNode1(nodeData))(toNode2(children));
        };
      };
    };
  };
};
var div2 = function(dictToNode) {
  return function(dictToNode1) {
    return createElement("div")(dictToNode)(dictToNode1);
  };
};
var h1 = function(dictToNode) {
  return function(dictToNode1) {
    return createElement("h1")(dictToNode)(dictToNode1);
  };
};
var h2 = function(dictToNode) {
  return function(dictToNode1) {
    return createElement("h2")(dictToNode)(dictToNode1);
  };
};
var main = function(dictToNode) {
  return function(dictToNode1) {
    return createElement("main")(dictToNode)(dictToNode1);
  };
};

// output/Flame.Renderer.String/foreign.js
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

// output/Flame.Internal.Equality/foreign.js
function compareReference(a) {
  return function(b) {
    return a === b;
  };
}

// output/Flame.Internal.Equality/index.js
var modelHasChanged = function(old) {
  return function($$new5) {
    return !compareReference(old)($$new5);
  };
};

// output/Flame.Renderer.Internal.Dom/foreign.js
var namespace = "http://www.w3.org/2000/svg";
var eventPrefix = "__flame_";
var eventPostfix = "updater";
var textNode2 = 1;
var elementNode2 = 2;
var svgNode2 = 3;
var fragmentNode = 4;
var lazyNode = 5;
var managedNode = 6;
var nonBubblingEvents = ["focus", "blur", "scroll", "load", "unload"];
function start_(eventWrapper, root, updater, html) {
  return new F(eventWrapper, root, updater, html, false);
}
function startFrom_(eventWrapper, root, updater, html) {
  return new F(eventWrapper, root, updater, html, true);
}
function resume_(f, html) {
  f.resume(html);
}
function F(eventWrapper, root, updater, html, isDry) {
  this.eventWrapper = eventWrapper;
  this.applicationEvents = /* @__PURE__ */ new Map();
  this.root = root;
  this.updater = updater;
  this.cachedHtml = html.node === void 0 ? html : shallowCopy(html);
  if (isDry)
    this.hydrate(this.root, this.cachedHtml);
  else
    this.createAllNodes(this.root, this.cachedHtml);
}
F.prototype.hydrate = function(parent, html, referenceNode) {
  switch (html.nodeType) {
    case lazyNode:
      html.node = parent;
      html.rendered = html.render(html.arg);
      html.render = void 0;
      this.hydrate(parent, html.rendered);
      break;
    case textNode2:
      html.node = parent;
      break;
    case managedNode:
      this.createAllNodes(parent, html, referenceNode);
      break;
    default:
      if (html.nodeType === fragmentNode)
        html.node = document.createDocumentFragment();
      else {
        html.node = parent;
        if (html.nodeData.events !== void 0)
          this.createAllEvents(parent, html);
      }
      let htmlChildrenLength;
      if (html.text === void 0 && html.children !== void 0 && (htmlChildrenLength = html.children.length) > 0) {
        let childNodes = parent.childNodes;
        for (let i = 0, cni = 0; i < htmlChildrenLength; ++i, ++cni) {
          let c = html.children[i] = html.children[i].node === void 0 ? html.children[i] : shallowCopy(html.children[i]);
          if (childNodes[cni] === void 0)
            this.createAllNodes(parent, c);
          else {
            if (c.nodeType === fragmentNode) {
              let fragmentChildrenLength = c.children.length;
              c.node = document.createDocumentFragment();
              for (let j = 0; j < fragmentChildrenLength; ++j) {
                let cf = c.children[j] = c.children[j].node === void 0 ? c.children[j] : shallowCopy(c.children[j]);
                this.hydrate(childNodes[cni++], cf);
              }
              cni--;
            } else if (c.nodeType === managedNode)
              this.hydrate(parent, c, childNodes[cni]);
            else
              this.hydrate(childNodes[cni], c);
          }
        }
      }
  }
};
function shallowCopy(origin) {
  switch (origin.nodeType) {
    case textNode2:
      return {
        nodeType: textNode2,
        node: void 0,
        text: origin.text
      };
    case fragmentNode:
      return {
        nodeType: fragmentNode,
        node: void 0,
        children: origin.children
      };
    case lazyNode:
      return {
        nodeType: lazyNode,
        node: void 0,
        nodeData: origin.nodeData,
        render: origin.render,
        arg: origin.arg,
        rendered: void 0,
        messageMapper: origin.messageMapper
      };
    case managedNode:
      return {
        nodeType: managedNode,
        node: void 0,
        nodeData: origin.nodeData,
        createNode: origin.createNode,
        updateNode: origin.updateNode,
        arg: origin.arg,
        messageMapper: origin.messageMapper
      };
    default:
      return {
        nodeType: origin.nodeType,
        node: void 0,
        tag: origin.tag,
        nodeData: origin.nodeData,
        children: origin.children,
        text: origin.text,
        messageMapper: origin.messageMapper
      };
  }
}
F.prototype.createAllNodes = function(parent, html, referenceNode) {
  let node = this.createNode(html);
  if (html.text !== void 0)
    node.textContent = html.text;
  else {
    if (html.children !== void 0)
      this.createChildrenNodes(node, html.children);
    else if (html.rendered !== void 0) {
      if (html.messageMapper !== void 0)
        lazyMessageMap(html.messageMapper, html.rendered);
      if (html.rendered.text !== void 0) {
        node.textContent = html.rendered.text;
      } else if (html.rendered.children !== void 0)
        this.createChildrenNodes(node, html.rendered.children);
    }
  }
  parent.insertBefore(node, referenceNode);
};
F.prototype.checkCreateAllNodes = function(parent, html, referenceNode) {
  if (html.node !== void 0)
    html = shallowCopy(html);
  this.createAllNodes(parent, html, referenceNode);
  return html;
};
F.prototype.createChildrenNodes = function(parent, children) {
  let childrenLength = children.length;
  for (let i = 0; i < childrenLength; ++i) {
    let html = children[i] = children[i].node === void 0 ? children[i] : shallowCopy(children[i]);
    this.checkCreateAllNodes(parent, html, null);
  }
};
F.prototype.createNode = function(html) {
  switch (html.nodeType) {
    case lazyNode:
      html.rendered = html.render(html.arg);
      html.render = void 0;
      return html.node = this.createNode(html.rendered);
    case textNode2:
      return html.node = document.createTextNode(html.text);
    case elementNode2:
      return html.node = this.createElement(html);
    case svgNode2:
      return html.node = this.createSvg(html);
    case fragmentNode:
      return html.node = document.createDocumentFragment();
    case managedNode:
      return html.node = this.createManagedNode(html);
  }
};
F.prototype.createElement = function(html) {
  let element = document.createElement(html.tag);
  this.createNodeData(element, html, false);
  return element;
};
F.prototype.createSvg = function(html) {
  let svg = document.createElementNS(namespace, html.tag);
  this.createNodeData(svg, html, true);
  return svg;
};
F.prototype.createManagedNode = function(html) {
  let node = html.createNode(html.arg)();
  html.createNode = void 0;
  this.createNodeData(node, html, node instanceof SVGElement || node.nodeName.toLowerCase() === "svg");
  return node;
};
F.prototype.createNodeData = function(node, html, isSvg) {
  if (html.nodeData.styles !== void 0)
    createStyles(node, html.nodeData.styles);
  if (html.nodeData.classes !== void 0 && html.nodeData.classes.length > 0)
    createClasses(node, html.nodeData.classes, isSvg);
  if (html.nodeData.attributes !== void 0)
    createAttributes(node, html.nodeData.attributes);
  if (html.nodeData.properties !== void 0)
    for (let key in html.nodeData.properties)
      node[key] = html.nodeData.properties[key];
  if (html.nodeData.events !== void 0)
    this.createAllEvents(node, html);
};
function createStyles(node, styles) {
  for (let key in styles)
    node.style.setProperty(key, styles[key]);
}
function createClasses(node, classes, isSvg) {
  let joined = classes.join(" ");
  if (isSvg)
    node.setAttribute("class", joined);
  else
    node.className = joined;
}
function createAttributes(node, attributes) {
  for (let key in attributes)
    node.setAttribute(key, attributes[key]);
}
F.prototype.createAllEvents = function(node, html) {
  for (let key in html.nodeData.events)
    this.createEvent(node, key, html);
};
F.prototype.createEvent = function(node, name2, html) {
  let handlers = html.nodeData.events[name2], eventKey = eventPrefix + name2;
  if (nonBubblingEvents.includes(name2)) {
    let runNonBubblingEvent = this.runNonBubblingEvent(handlers, html.messageMapper);
    node[eventKey] = runNonBubblingEvent;
    node.addEventListener(name2, runNonBubblingEvent, false);
  } else {
    node[eventKey] = handlers;
    if (html.messageMapper !== void 0)
      node[eventKey + eventPostfix] = html.messageMapper;
    let synthetic = this.applicationEvents.get(name2);
    if (synthetic === void 0) {
      let runEvent = this.runEvent.bind(this);
      this.root.addEventListener(name2, runEvent, false);
      this.applicationEvents.set(name2, {
        count: 1,
        handler: runEvent
      });
    } else
      synthetic.count++;
  }
};
F.prototype.runNonBubblingEvent = function(handlers, messageMapper2) {
  return function(event) {
    this.runHandlers(handlers, messageMapper2, event);
  }.bind(this);
};
F.prototype.runEvent = function(event) {
  let node = event.target, eventKey = eventPrefix + event.type;
  while (node !== this.root) {
    let handlers = node[eventKey];
    if (handlers !== void 0) {
      this.runHandlers(handlers, node[eventKey + eventPostfix], event);
      return;
    }
    node = node.parentNode;
  }
};
F.prototype.runHandlers = function(handlers, messageMapper2, event) {
  let handlersLength = handlers.length;
  for (let i = 0; i < handlersLength; ++i) {
    let h = handlers[i], maybeMessage = typeof h === "function" ? h(event)() : this.eventWrapper(h);
    this.updater(messageMapper2 === void 0 ? maybeMessage : messageMapper2(maybeMessage))();
  }
  event.stopPropagation();
};
F.prototype.resume = function(updatedHtml) {
  this.cachedHtml = this.updateAllNodes(this.root, this.cachedHtml, updatedHtml);
};
F.prototype.updateAllNodes = function(parent, currentHtml2, updatedHtml) {
  if (updatedHtml.node !== void 0)
    updatedHtml = shallowCopy(updatedHtml);
  if (currentHtml2.tag !== updatedHtml.tag || currentHtml2.nodeType !== updatedHtml.nodeType) {
    if (currentHtml2.nodeType === fragmentNode) {
      this.createAllNodes(parent, updatedHtml, firstFragmentChildNode(currentHtml2.children));
      removeFragmentChildren(parent, currentHtml2.children);
    } else {
      this.createAllNodes(parent, updatedHtml, currentHtml2.node);
      parent.removeChild(currentHtml2.node);
    }
  } else {
    updatedHtml.node = currentHtml2.node;
    switch (updatedHtml.nodeType) {
      case lazyNode:
        if (updatedHtml.arg !== currentHtml2.arg) {
          updatedHtml.rendered = updatedHtml.render(updatedHtml.arg);
          if (updatedHtml.messageMapper !== void 0)
            lazyMessageMap(updatedHtml.messageMapper, updatedHtml.rendered);
          this.updateAllNodes(parent, currentHtml2.rendered, updatedHtml.rendered);
        } else
          updatedHtml.rendered = currentHtml2.rendered;
        updatedHtml.render = void 0;
        break;
      case managedNode:
        let node = updatedHtml.updateNode(currentHtml2.node)(currentHtml2.arg)(updatedHtml.arg)(), isSvg = node instanceof SVGElement || node.nodeName.toLowerCase() === "svg";
        if (node !== currentHtml2.node || node.nodeType !== currentHtml2.node.nodeType || node.nodeName !== currentHtml2.node.nodeName) {
          this.createNodeData(node, updatedHtml, isSvg);
          parent.insertBefore(node, currentHtml2.node);
          parent.removeChild(currentHtml2.node);
        } else
          this.updateNodeData(node, currentHtml2.nodeData, updatedHtml, isSvg);
        updatedHtml.node = node;
        break;
      case textNode2:
        if (updatedHtml.text !== currentHtml2.text)
          updatedHtml.node.textContent = updatedHtml.text;
        break;
      case fragmentNode:
        this.updateChildrenNodes(parent, currentHtml2, updatedHtml);
        break;
      default:
        this.updateNodeData(currentHtml2.node, currentHtml2.nodeData, updatedHtml, updatedHtml.nodeType == svgNode2);
        if ((updatedHtml.text !== void 0 || updatedHtml.children === void 0 && currentHtml2.text != void 0) && !hasInnerHtml(updatedHtml.nodeData) && updatedHtml.text != currentHtml2.node.textContent)
          currentHtml2.node.textContent = updatedHtml.text;
        else
          this.updateChildrenNodes(currentHtml2.node, currentHtml2, updatedHtml);
    }
  }
  return updatedHtml;
};
function firstFragmentChildNode(children) {
  let childrenLength = children.length;
  for (let i = 0; i < childrenLength; ++i) {
    if (children[i].nodeType === fragmentNode)
      return firstFragmentChildNode(children[i].children);
    return children[i].node;
  }
  return void 0;
}
function removeFragmentChildren(parent, children) {
  let childrenLength = children.length;
  for (let i = 0; i < childrenLength; ++i)
    if (children[i].nodeType === fragmentNode)
      removeFragmentChildren(children[i].children);
    else
      parent.removeChild(children[i].node);
}
function clearNode(node) {
  node.textContent = "";
}
F.prototype.updateChildrenNodes = function(parent, currentHtml2, updatedHtml) {
  let currentChildren = currentHtml2.children, updatedChildren = updatedHtml.children;
  if (currentChildren === void 0 || currentChildren.length === 0) {
    let updatedChildrenLength;
    if (updatedChildren !== void 0 && (updatedChildrenLength = updatedChildren.length) > 0) {
      if (currentHtml2.text !== void 0 || hasInnerHtml(currentHtml2.nodeData))
        clearNode(parent);
      for (let i = 0; i < updatedChildrenLength; ++i)
        updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
    }
  } else if (updatedChildren === void 0 || updatedChildren.length === 0) {
    if (currentChildren !== void 0 && (currentChildren.length > 0 || currentHtml2.text !== void 0) && !hasInnerHtml(updatedHtml.nodeData))
      clearNode(parent);
  } else if (currentChildren[0].nodeData !== void 0 && currentChildren[0].nodeData.key !== void 0 && updatedChildren[0].nodeData !== void 0 && updatedChildren[0].nodeData.key !== void 0)
    this.updateKeyedChildrenNodes(parent, currentChildren, updatedChildren);
  else
    this.updateNonKeyedChildrenNodes(parent, currentChildren, updatedChildren);
};
function hasInnerHtml(parentNodeData) {
  return parentNodeData !== void 0 && parentNodeData.properties !== void 0 && parentNodeData.properties.innerHTML !== void 0;
}
F.prototype.updateKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
  let currentStart = 0, updatedStart = 0, currentEnd = currentChildren.length - 1, updatedEnd = updatedChildren.length - 1;
  let afterNode, currentStartNode = currentChildren[currentStart].node, updatedStartNode = currentStartNode, currentEndNode = currentChildren[currentEnd].node;
  let loop = true;
  fixes:
    while (loop) {
      loop = false;
      let currentHtml2 = currentChildren[currentStart], updatedHtml = updatedChildren[updatedStart];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        updatedStartNode = currentStartNode = currentHtml2.node.nextSibling;
        currentStart++;
        updatedStart++;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentStart];
        updatedHtml = updatedChildren[updatedStart];
      }
      currentHtml2 = currentChildren[currentEnd];
      updatedHtml = updatedChildren[updatedEnd];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        afterNode = currentEndNode;
        currentEndNode = currentEndNode.previousSibling;
        currentEnd--;
        updatedEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedEnd];
      }
      currentHtml2 = currentChildren[currentEnd];
      updatedHtml = updatedChildren[updatedStart];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        loop = true;
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        currentEndNode = currentHtml2.node.previousSibling;
        parent.insertBefore(currentHtml2.node, updatedStartNode);
        updatedStart++;
        currentEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedStart];
      }
      currentHtml2 = currentChildren[currentStart];
      updatedHtml = updatedChildren[updatedEnd];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        loop = true;
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        parent.insertBefore(currentHtml2.node, afterNode);
        afterNode = currentHtml2.node;
        currentStart++;
        updatedEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentStart];
        updatedHtml = updatedChildren[updatedEnd];
      }
    }
  if (updatedEnd < updatedStart)
    while (currentStart <= currentEnd) {
      parent.removeChild(currentChildren[currentEnd].node);
      currentEnd--;
    }
  else if (currentEnd < currentStart)
    while (updatedStart <= updatedEnd) {
      updatedChildren[updatedStart] = this.checkCreateAllNodes(parent, updatedChildren[updatedStart], afterNode);
      updatedStart++;
    }
  else {
    let P = new Int32Array(updatedEnd + 1 - updatedStart);
    let I = /* @__PURE__ */ new Map();
    for (let i = updatedStart; i <= updatedEnd; i++) {
      P[i] = -1;
      I.set(updatedChildren[i].nodeData.key, i);
    }
    let reusingNodes = updatedStart + updatedChildren.length - 1 - updatedEnd, toRemove = [];
    for (let i = currentStart; i <= currentEnd; i++)
      if (I.has(currentChildren[i].nodeData.key)) {
        P[I.get(currentChildren[i].nodeData.key)] = i;
        reusingNodes++;
      } else
        toRemove.push(i);
    if (reusingNodes === 0) {
      parent.textContent = "";
      for (let i = updatedStart; i <= updatedEnd; i++)
        updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
    } else {
      let toRemoveLength = toRemove.length;
      for (let i = 0; i < toRemoveLength; i++)
        parent.removeChild(currentChildren[toRemove[i]].node);
      let longestSeq = longestSubsequence(P, updatedStart), seqIndex = longestSeq.length - 1;
      for (let i = updatedEnd; i >= updatedStart; i--) {
        if (longestSeq[seqIndex] === i) {
          currentHtml = currentChildren[P[longestSeq[seqIndex]]];
          updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
          afterNode = currentHtml.node;
          seqIndex--;
        } else {
          if (P[i] === -1) {
            updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i], afterNode);
            afterNode = updatedChildren[i].node;
          } else {
            currentHtml = currentChildren[P[i]];
            updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
            parent.insertBefore(currentHtml.node, afterNode);
            afterNode = currentHtml.node;
          }
        }
      }
    }
  }
};
function longestSubsequence(ns, updatedStart) {
  let seq = [], is = [], l = -1, i, len, pre = new Int32Array(ns.length);
  for (i = updatedStart, len = ns.length; i < len; i++) {
    let n = ns[i];
    if (n < 0)
      continue;
    let j = findGreatestIndex(seq, n);
    if (j !== -1)
      pre[i] = is[j];
    if (j === l) {
      l++;
      seq[l] = n;
      is[l] = i;
    } else if (n < seq[j + 1]) {
      seq[j + 1] = n;
      is[j + 1] = i;
    }
  }
  for (i = is[l]; l >= 0; i = pre[i], l--)
    seq[l] = i;
  return seq;
}
function findGreatestIndex(seq, n) {
  let lo = -1, hi = seq.length;
  if (hi > 0 && seq[hi - 1] <= n)
    return hi - 1;
  while (hi - lo > 1) {
    let mid = Math.floor((lo + hi) / 2);
    if (seq[mid] > n)
      hi = mid;
    else
      lo = mid;
  }
  return lo;
}
F.prototype.updateNonKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
  let currentChildrenLength = currentChildren.length, updatedChildrenLength = updatedChildren.length, commonLength = Math.min(currentChildrenLength, updatedChildrenLength);
  for (let i = 0; i < commonLength; ++i)
    updatedChildren[i] = this.updateAllNodes(parent, currentChildren[i], updatedChildren[i]);
  if (currentChildrenLength < updatedChildrenLength)
    for (let i = commonLength; i < updatedChildrenLength; ++i)
      updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
  else if (currentChildrenLength > updatedChildrenLength)
    for (let i = commonLength; i < currentChildrenLength; ++i)
      parent.removeChild(currentChildren[i].node);
};
F.prototype.updateNodeData = function(node, currentNodeData, updatedHtml, isSvg) {
  updateStyles(node, currentNodeData.styles, updatedHtml.nodeData.styles);
  updateAttributes(node, currentNodeData.attributes, updatedHtml.nodeData.attributes);
  updateClasses(node, currentNodeData.classes, updatedHtml.nodeData.classes, isSvg);
  updateProperties(node, currentNodeData.properties, updatedHtml.nodeData.properties);
  this.updateEvents(node, currentNodeData.events, updatedHtml);
};
function updateStyles(node, currentStyles, updatedStyles) {
  if (currentStyles === void 0) {
    if (updatedStyles !== void 0)
      createStyles(node, updatedStyles);
  } else if (updatedStyles === void 0) {
    if (currentStyles !== void 0)
      node.removeAttribute("style");
  } else {
    let matchCount = 0;
    for (let key in currentStyles) {
      let current = currentStyles[key], updated = updatedStyles[key], hasUpdated = updatedStyles[key] !== void 0;
      if (hasUpdated)
        matchCount++;
      if (current !== updated)
        if (hasUpdated)
          node.style.setProperty(key, updated);
        else
          node.style.removeProperty(key);
    }
    let newKeys = Object.keys(updatedStyles), newKeysLength = newKeys.length;
    for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
      let key = newKeys[i];
      if (currentStyles[key] === void 0) {
        let updated = updatedStyles[key];
        ++matchCount;
        node.style.setProperty(key, updated);
      }
    }
  }
}
function updateClasses(node, currentClasses, updatedClasses, isSvg) {
  let classUpdated = updatedClasses !== void 0 && updatedClasses.length > 0;
  if (currentClasses !== void 0 && currentClasses.length > 0 && !classUpdated)
    createClasses(node, [], isSvg);
  else if (classUpdated)
    createClasses(node, updatedClasses, isSvg);
}
function updateAttributes(node, currentAttributes, updatedAttributes) {
  if (currentAttributes === void 0) {
    if (updatedAttributes !== void 0)
      createAttributes(node, updatedAttributes);
  } else if (updatedAttributes === void 0) {
    if (currentAttributes !== void 0)
      for (let key in currentAttributes)
        node.removeAttribute(key);
  } else {
    let matchCount = 0;
    for (let key in currentAttributes) {
      let current = currentAttributes[key], updated = updatedAttributes[key], hasUpdated = updated !== void 0;
      if (hasUpdated)
        matchCount++;
      if (current !== updated)
        if (hasUpdated)
          node.setAttribute(key, updated);
        else
          node.removeAttribute(key);
    }
    let newKeys = Object.keys(updatedAttributes), newKeysLength = newKeys.length;
    for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
      let key = newKeys[i];
      if (currentAttributes[key] === void 0) {
        let updated = updatedAttributes[key];
        ++matchCount;
        node.setAttribute(key, updated);
      }
    }
  }
}
function updateProperties(node, currentProperties, updatedProperties) {
  let addAll = currentProperties === void 0, removeAll = updatedProperties === void 0;
  if (addAll) {
    if (!removeAll)
      for (let key in updatedProperties)
        node[key] = updatedProperties[key];
  } else if (removeAll) {
    if (!addAll)
      for (let key in currentProperties)
        node.removeAttribute(key);
  } else {
    let matchCount = 0;
    for (let key in currentProperties) {
      let current = currentProperties[key], updated = updatedProperties[key], hasUpdated = updated !== void 0;
      if (hasUpdated)
        matchCount++;
      if (current !== updated)
        if (hasUpdated)
          node[key] = updated;
        else
          node.removeAttribute(key);
    }
    let newKeys = Object.keys(updatedProperties), newKeysLength = newKeys.length;
    for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
      let key = newKeys[i];
      if (currentProperties[key] === void 0) {
        let updated = updatedProperties[key];
        ++matchCount;
        node[key] = updated;
      }
    }
  }
}
F.prototype.updateEvents = function(node, currentEvents, updatedHtml) {
  let updatedEvents = updatedHtml.nodeData.events;
  if (currentEvents === void 0) {
    if (updatedEvents !== void 0)
      this.createAllEvents(node, updatedHtml);
  } else if (updatedEvents === void 0) {
    if (currentEvents !== void 0)
      for (let key in currentEvents)
        this.removeEvent(node, key);
  } else {
    let matchCount = 0;
    for (let key in currentEvents) {
      let current = currentEvents[key], updated = updatedEvents[key], hasUpdated = false;
      if (updated === void 0)
        this.removeEvent(node, key);
      else {
        let currentLength = current.length, updatedLength = updated.length;
        if (currentLength != updatedLength)
          hasUpdated = true;
        else {
          for (let i = 0; i < currentLength; ++i)
            if (current[i] != updated[i]) {
              hasUpdated = true;
              break;
            }
        }
      }
      if (hasUpdated) {
        matchCount++;
        this.removeEvent(node, key);
        this.createEvent(node, key, updatedHtml);
      }
    }
    let newKeys = Object.keys(updatedEvents), newKeysLength = newKeys.length;
    for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
      let key = newKeys[i];
      if (currentEvents[key] === void 0) {
        ++matchCount;
        this.createEvent(node, key, updatedHtml);
      }
    }
  }
};
F.prototype.removeEvent = function(node, name2) {
  let eventKey = eventPrefix + name2;
  if (nonBubblingEvents.includes(name2)) {
    let runNonBubblingEvent = node[eventKey];
    node.removeEventListener(name2, runNonBubblingEvent, false);
  } else {
    let count = --this.applicationEvents.get(name2).count;
    if (count === 0) {
      this.root.removeEventListener(name2, this.applicationEvents.get(name2).handler, false);
      this.applicationEvents.delete(name2);
    }
  }
  node[eventKey + eventPostfix] = void 0;
  node[eventKey] = void 0;
};
function lazyMessageMap(mapper, html) {
  html.messageMapper = mapper;
  if (html.children !== void 0 && html.children.length > 0)
    for (let i = 0; i < html.children.length; ++i)
      lazyMessageMap(mapper, html.children[i]);
}

// output/Flame.Renderer.Internal.Dom/index.js
var pure4 = /* @__PURE__ */ pure(applicativeEffect);
var resume = /* @__PURE__ */ runEffectFn2(resume_);
var maybeUpdater = function(updater) {
  return function(v) {
    if (v instanceof Just) {
      return updater(v.value0);
    }
    ;
    return pure4(unit);
  };
};
var start = function(parent) {
  return function(updater) {
    return runEffectFn4(start_)(Just.create)(parent)(maybeUpdater(updater));
  };
};
var startFrom = function(parent) {
  return function(updater) {
    return runEffectFn4(startFrom_)(Just.create)(parent)(maybeUpdater(updater));
  };
};

// output/Flame.Subscription.Internal.Listener/foreign.js
var applicationIds = /* @__PURE__ */ new Set();
function checkApplicationId_(id3) {
  if (applicationIds.has(id3))
    throw `Error mounting application: id ${id3} already registered!`;
  applicationIds.add(id3);
}

// output/Flame.Types/index.js
var Window = /* @__PURE__ */ function() {
  function Window2() {
  }
  ;
  Window2.value = new Window2();
  return Window2;
}();
var Document = /* @__PURE__ */ function() {
  function Document2() {
  }
  ;
  Document2.value = new Document2();
  return Document2;
}();
var Custom = /* @__PURE__ */ function() {
  function Custom2() {
  }
  ;
  Custom2.value = new Custom2();
  return Custom2;
}();

// output/Flame.Subscription.Internal.Listener/index.js
var createSubscription = function(updater) {
  return function(v) {
    if (v.value0 instanceof Window) {
      return createWindowListener(v.value1.value0)(function($13) {
        return updater(v.value1.value1.value0($13));
      });
    }
    ;
    if (v.value0 instanceof Document) {
      return createDocumentListener(v.value1.value0)(function($14) {
        return updater(v.value1.value1.value0($14));
      });
    }
    ;
    if (v.value0 instanceof Custom) {
      return createCustomListener(v.value1.value0)(function($15) {
        return updater(v.value1.value1.value0($15));
      });
    }
    ;
    throw new Error("Failed pattern match at Flame.Subscription.Internal.Listener (line 31, column 83 - line 34, column 75): " + [v.value0.constructor.name]);
  };
};
var checkApplicationId = /* @__PURE__ */ runEffectFn1(checkApplicationId_);
var createMessageListener = function(appId) {
  return function(updater) {
    return function __do() {
      checkApplicationId(appId)();
      return createCustomListener(appId)(function($16) {
        return updater(unsafeFromForeign($16));
      })();
    };
  };
};

// output/Flame.Application.EffectList/index.js
var when2 = /* @__PURE__ */ when(applicativeEffect);
var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableArray);
var pure5 = /* @__PURE__ */ pure(applicativeEffect);
var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
var map6 = /* @__PURE__ */ map(functorMaybe);
var showId = function(dictShow) {
  var show4 = show(dictShow);
  return function(v) {
    return show4(v);
  };
};
var run3 = function(parent) {
  return function(isResumed) {
    return function(appId) {
      return function(v) {
        return function __do() {
          var modelState = $$new(v.init.value0)();
          var renderingState = $$new(21)();
          var render2 = function(model) {
            return function __do2() {
              var rendering2 = read(renderingState)();
              resume(rendering2)(v.view(model))();
              return write(model)(modelState)();
            };
          };
          var runUpdate = function(message2) {
            return function __do2() {
              var currentModel = read(modelState)();
              var v1 = v.update(currentModel)(message2);
              when2(modelHasChanged(currentModel)(v1.value0))(render2(v1.value0))();
              return runMessages(v1.value1)();
            };
          };
          var runMessages = function(affs) {
            return for_2(affs)(runAff_(function(v1) {
              if (v1 instanceof Left) {
                return log2(message(v1.value0));
              }
              ;
              if (v1 instanceof Right && v1.value0 instanceof Just) {
                return runUpdate(v1.value0.value0);
              }
              ;
              return pure5(unit);
            }));
          };
          var rendering = function() {
            if (isResumed) {
              return startFrom(parent)(runUpdate)(v.view(v.init.value0))();
            }
            ;
            return start(parent)(runUpdate)(v.view(v.init.value0))();
          }();
          write(rendering)(renderingState)();
          runMessages(v.init.value1)();
          (function() {
            if (appId instanceof Nothing) {
              return unit;
            }
            ;
            if (appId instanceof Just) {
              return createMessageListener(appId.value0)(runUpdate)();
            }
            ;
            throw new Error("Failed pattern match at Flame.Application.EffectList (line 142, column 7 - line 144, column 62): " + [appId.constructor.name]);
          })();
          return traverse_2(createSubscription(runUpdate))(v.subscribe)();
        };
      };
    };
  };
};
var noAppId = /* @__PURE__ */ function() {
  return Nothing.value;
}();
var mountWith = function(dictShow) {
  var showId1 = showId(dictShow);
  return function(v) {
    return function(appId) {
      return function(application) {
        return function __do() {
          var maybeElement = querySelector(v)();
          if (maybeElement instanceof Just) {
            return run3(maybeElement.value0)(false)(map6(showId1)(appId))(application)();
          }
          ;
          if (maybeElement instanceof Nothing) {
            return $$throw("Error mounting application")();
          }
          ;
          throw new Error("Failed pattern match at Flame.Application.EffectList (line 101, column 7 - line 103, column 62): " + [maybeElement.constructor.name]);
        };
      };
    };
  };
};
var mountWith1 = /* @__PURE__ */ mountWith(showUnit);
var mount_ = function(selector) {
  return mountWith1(selector)(noAppId);
};

// output/Flame.Html.Event/foreign.js
var messageEventData = 5;
var rawEventData = 6;
function createEvent_(name2) {
  return function(message2) {
    return [messageEventData, name2, message2];
  };
}
function createRawEvent_(name2) {
  return function(handler) {
    return [rawEventData, name2, handler];
  };
}

// output/Flame.Html.Event/index.js
var pure6 = /* @__PURE__ */ pure(applicativeEffect);
var createRawEvent = function(name2) {
  return function(handler) {
    return createRawEvent_(name2)(handler);
  };
};
var createEventMessage = function(eventName) {
  return function(constructor) {
    return createRawEvent(eventName)(function($8) {
      return pure6(Just.create(constructor($8)));
    });
  };
};
var onMousemove$prime = /* @__PURE__ */ createEventMessage("mousemove");
var createEvent = function(name2) {
  return function(message2) {
    return createEvent_(name2)(message2);
  };
};
var onMousedown = /* @__PURE__ */ createEvent("mousedown");
var onMouseover = /* @__PURE__ */ createEvent("mouseover");
var onMouseup = /* @__PURE__ */ createEvent("mouseup");

// output/Simple.JSON/foreign.js
var _parseJSON = JSON.parse;
var _unsafeStringify = JSON.stringify;

// output/Foreign.Index/foreign.js
function unsafeReadPropImpl(f, s, key, value) {
  return value == null ? f : s(value[key]);
}

// output/Foreign.Index/index.js
var unsafeReadProp = function(dictMonad) {
  var fail2 = fail(dictMonad);
  var pure8 = pure(applicativeExceptT(dictMonad));
  return function(k) {
    return function(value) {
      return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value))), pure8, k, value);
    };
  };
};
var readProp = function(dictMonad) {
  return unsafeReadProp(dictMonad);
};

// output/Record.Builder/foreign.js
function copyRecord(rec) {
  var copy = {};
  for (var key in rec) {
    if ({}.hasOwnProperty.call(rec, key)) {
      copy[key] = rec[key];
    }
  }
  return copy;
}
function unsafeInsert(l) {
  return function(a) {
    return function(rec) {
      rec[l] = a;
      return rec;
    };
  };
}

// output/Record.Builder/index.js
var semigroupoidBuilder = semigroupoidFn;
var insert5 = function() {
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(l) {
        return function(a) {
          return function(r1) {
            return unsafeInsert(reflectSymbol2(l))(a)(r1);
          };
        };
      };
    };
  };
};
var categoryBuilder = categoryFn;
var build = function(v) {
  return function(r1) {
    return v(copyRecord(r1));
  };
};

// output/Simple.JSON/index.js
var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
var pure7 = /* @__PURE__ */ pure(applicativeExceptT2);
var map13 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
var map22 = /* @__PURE__ */ map(functorNonEmptyList);
var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindExceptT2);
var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindExceptT2);
var identity9 = /* @__PURE__ */ identity(categoryBuilder);
var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeExceptT2);
var readArray1 = /* @__PURE__ */ readArray(monadIdentity);
var bind4 = /* @__PURE__ */ bind(bindExceptT2);
var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
var insert6 = /* @__PURE__ */ insert5()();
var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
var readString3 = {
  readImpl: /* @__PURE__ */ readString(monadIdentity)
};
var readNumber2 = {
  readImpl: /* @__PURE__ */ readNumber(monadIdentity)
};
var readImpl = function(dict) {
  return dict.readImpl;
};
var readFieldsNil = {
  getFields: function(v) {
    return function(v1) {
      return pure7(identity9);
    };
  }
};
var readArray2 = function(dictReadForeign) {
  var readImpl2 = readImpl(dictReadForeign);
  return {
    readImpl: function() {
      var readAtIdx = function(i) {
        return function(f) {
          return withExcept(map22(ErrorAtIndex.create(i)))(readImpl2(f));
        };
      };
      return composeKleisliFlipped2(traverseWithIndex2(readAtIdx))(readArray1);
    }()
  };
};
var read3 = function(dictReadForeign) {
  var $199 = readImpl(dictReadForeign);
  return function($200) {
    return runExcept($199($200));
  };
};
var getFields = function(dict) {
  return dict.getFields;
};
var readRecord = function() {
  return function(dictReadForeignFields) {
    var getFields1 = getFields(dictReadForeignFields);
    return {
      readImpl: function(o) {
        return map13(flip(build)({}))(getFields1($$Proxy.value)(o));
      }
    };
  };
};
var applyEither2 = function(dictSemigroup) {
  var append13 = append(dictSemigroup);
  return function(v) {
    return function(v1) {
      if (v instanceof Left && v1 instanceof Right) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Left && v1 instanceof Left) {
        return new Left(append13(v.value0)(v1.value0));
      }
      ;
      if (v instanceof Right && v1 instanceof Left) {
        return new Left(v1.value0);
      }
      ;
      if (v instanceof Right && v1 instanceof Right) {
        return new Right(v.value0(v1.value0));
      }
      ;
      throw new Error("Failed pattern match at Simple.JSON (line 241, column 1 - line 241, column 90): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var exceptTApply = function(dictSemigroup) {
  var applyEither1 = applyEither2(dictSemigroup);
  return function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    var apply2 = apply(Apply0);
    var map42 = map(Apply0.Functor0());
    return function(fun) {
      return function(a) {
        return apply2(map42(applyEither1)(runExceptT(fun)))(runExceptT(a));
      };
    };
  };
};
var exceptTApply1 = /* @__PURE__ */ exceptTApply(semigroupNonEmptyList)(applicativeIdentity);
var readFieldsCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  var insert1 = insert6(dictIsSymbol);
  return function(dictReadForeign) {
    var readImpl2 = readImpl(dictReadForeign);
    return function(dictReadForeignFields) {
      var getFields1 = getFields(dictReadForeignFields);
      return function() {
        return function() {
          return {
            getFields: function(v) {
              return function(obj) {
                var rest = getFields1($$Proxy.value)(obj);
                var name2 = reflectSymbol2($$Proxy.value);
                var withExcept$prime = withExcept(map22(ErrorAtProperty.create(name2)));
                var first2 = bind4(withExcept$prime(bindFlipped4(readImpl2)(readProp2(name2)(obj))))(function(value) {
                  return pure7(insert1($$Proxy.value)(value));
                });
                return exceptTApply1(map13(compose1)(first2))(rest);
              };
            }
          };
        };
      };
    };
  };
};

// output/Web.UIEvent.MouseEvent/foreign.js
function clientX(e) {
  return e.clientX;
}
function clientY(e) {
  return e.clientY;
}

// output/Web.Internal.FFI/foreign.js
function _unsafeReadProtoTagged(nothing, just, name2, value) {
  if (typeof window !== "undefined") {
    var ty = window[name2];
    if (ty != null && value instanceof ty) {
      return just(value);
    }
  }
  var obj = value;
  while (obj != null) {
    var proto = Object.getPrototypeOf(obj);
    var constructorName = proto.constructor.name;
    if (constructorName === name2) {
      return just(value);
    } else if (constructorName === "Object") {
      return nothing;
    }
    obj = proto;
  }
  return nothing;
}

// output/Web.Internal.FFI/index.js
var unsafeReadProtoTagged = function(name2) {
  return function(value) {
    return _unsafeReadProtoTagged(Nothing.value, Just.create, name2, value);
  };
};

// output/Web.UIEvent.MouseEvent/index.js
var fromEvent = /* @__PURE__ */ unsafeReadProtoTagged("MouseEvent");

// output/Main/index.js
var show3 = /* @__PURE__ */ show(showInt);
var map7 = /* @__PURE__ */ map(functorMaybe);
var between2 = /* @__PURE__ */ between(ordNumber);
var compare3 = /* @__PURE__ */ compare(ordNumber);
var prop2 = /* @__PURE__ */ prop({
  reflectSymbol: function() {
    return "modelDragState";
  }
})()();
var _Just2 = /* @__PURE__ */ _Just(choiceFn);
var prop1 = /* @__PURE__ */ prop({
  reflectSymbol: function() {
    return "dragOverIdx";
  }
})()();
var mempty3 = /* @__PURE__ */ mempty(monoidArray);
var append12 = /* @__PURE__ */ append(semigroupArray);
var show12 = /* @__PURE__ */ show(showNumber);
var toNodeArray2 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
var toNodeArray1 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
var div3 = /* @__PURE__ */ div2(toNodeArray2)(toNodeArray1);
var div_2 = /* @__PURE__ */ div_(toNodeArray1);
var main1 = /* @__PURE__ */ main(toNodeArray2)(toNodeArray1);
var h12 = /* @__PURE__ */ h1(toNodeArray2)(toNodeStringHtml);
var h22 = /* @__PURE__ */ h2(toNodeArray2)(toNodeArray1);
var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexArray);
var bind5 = /* @__PURE__ */ bind(bindAff);
var cardDescriptionIsSymbol = {
  reflectSymbol: function() {
    return "cardDescription";
  }
};
var cardMagnitudeIsSymbol = {
  reflectSymbol: function() {
    return "cardMagnitude";
  }
};
var read4 = /* @__PURE__ */ read3(/* @__PURE__ */ readArray2(/* @__PURE__ */ readRecord()(/* @__PURE__ */ readFieldsCons(cardDescriptionIsSymbol)(readString3)(/* @__PURE__ */ readFieldsCons(cardMagnitudeIsSymbol)(readNumber2)(readFieldsNil)()())()())));
var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
var show22 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var shuffle2 = /* @__PURE__ */ shuffle(monadRecIdentity);
var discard3 = /* @__PURE__ */ discard(discardUnit)(bindAff);
var traceM2 = /* @__PURE__ */ traceM()(monadAff);
var show32 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyArray(/* @__PURE__ */ showRecord()()(/* @__PURE__ */ showRecordFieldsCons(cardDescriptionIsSymbol)(/* @__PURE__ */ showRecordFieldsConsNil(cardMagnitudeIsSymbol)(showNumber))(showString))));
var Pos = /* @__PURE__ */ function() {
  function Pos2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Pos2.create = function(value0) {
    return function(value1) {
      return new Pos2(value0, value1);
    };
  };
  return Pos2;
}();
var StartDragging = /* @__PURE__ */ function() {
  function StartDragging2() {
  }
  ;
  StartDragging2.value = new StartDragging2();
  return StartDragging2;
}();
var StopDragging = /* @__PURE__ */ function() {
  function StopDragging2() {
  }
  ;
  StopDragging2.value = new StopDragging2();
  return StopDragging2;
}();
var MouseMove = /* @__PURE__ */ function() {
  function MouseMove2(value0) {
    this.value0 = value0;
  }
  ;
  MouseMove2.create = function(value0) {
    return new MouseMove2(value0);
  };
  return MouseMove2;
}();
var MouseOver = /* @__PURE__ */ function() {
  function MouseOver2(value0) {
    this.value0 = value0;
  }
  ;
  MouseOver2.create = function(value0) {
    return new MouseOver2(value0);
  };
  return MouseOver2;
}();
var semiringPos = /* @__PURE__ */ function() {
  return {
    zero: new Pos(0, 0),
    one: new Pos(1, 1),
    add: function(v) {
      return function(v1) {
        return new Pos(v.value0 + v1.value0 | 0, v.value1 + v1.value1 | 0);
      };
    },
    mul: function(v) {
      return function(v1) {
        return new Pos(v.value0 * v1.value0 | 0, v.value1 * v1.value1 | 0);
      };
    }
  };
}();
var ringPos = {
  sub: function(v) {
    return function(v1) {
      return new Pos(v.value0 - v1.value0 | 0, v.value1 - v1.value1 | 0);
    };
  },
  Semiring0: function() {
    return semiringPos;
  }
};
var sub1 = /* @__PURE__ */ sub(ringPos);
var update = function(v) {
  return function(v1) {
    if (v1 instanceof StartDragging) {
      var newModel = {
        modelDragState: new Just({
          dragStartPos: v.modelMousePos,
          dragOverIdx: 0
        }),
        modelCards: v.modelCards,
        modelCurrentCard: v.modelCurrentCard,
        modelDeck: v.modelDeck,
        modelLives: v.modelLives,
        modelMousePos: v.modelMousePos
      };
      return new Tuple(newModel, []);
    }
    ;
    if (v1 instanceof StopDragging) {
      var newModel = function() {
        if (v.modelDragState instanceof Nothing) {
          return v;
        }
        ;
        if (v.modelDragState instanceof Just) {
          var prevCard = maybe(-infinity)(function(v2) {
            return v2.cardMagnitude;
          })(map7(fst)(index(v.modelCards)(v.modelDragState.value0.dragOverIdx - 1 | 0)));
          var nextCard = maybe(infinity)(function(v2) {
            return v2.cardMagnitude;
          })(map7(fst)(index(v.modelCards)(v.modelDragState.value0.dragOverIdx)));
          var correct = between2(prevCard)(nextCard)(v.modelCurrentCard.cardMagnitude);
          return {
            modelDragState: Nothing.value,
            modelCards: insertBy(function(v3) {
              return function(v4) {
                return compare3(v3.value0.cardMagnitude)(v4.value0.cardMagnitude);
              };
            })(new Tuple(v.modelCurrentCard, correct))(v.modelCards),
            modelLives: v.modelLives - function() {
              if (correct) {
                return 0;
              }
              ;
              return 1;
            }() | 0,
            modelCurrentCard: v.modelCurrentCard,
            modelDeck: v.modelDeck,
            modelMousePos: v.modelMousePos
          };
        }
        ;
        throw new Error("Failed pattern match at Main (line 131, column 7 - line 159, column 50): " + [v.modelDragState.constructor.name]);
      }();
      return new Tuple(newModel, []);
    }
    ;
    if (v1 instanceof MouseMove) {
      var newModel = maybe(v)(function(mouseEvent) {
        return {
          modelCurrentCard: v.modelCurrentCard,
          modelCards: v.modelCards,
          modelDeck: v.modelDeck,
          modelMousePos: new Pos(clientX(mouseEvent), clientY(mouseEvent)),
          modelDragState: v.modelDragState,
          modelLives: v.modelLives
        };
      })(fromEvent(v1.value0));
      return new Tuple(newModel, []);
    }
    ;
    if (v1 instanceof MouseOver) {
      var newModel = set2(function() {
        var $181 = prop2($$Proxy.value)(strongFn);
        var $182 = prop1($$Proxy.value)(strongFn);
        return function($183) {
          return $181(_Just2($182($183)));
        };
      }())(v1.value0)(v);
      return new Tuple(newModel, []);
    }
    ;
    throw new Error("Failed pattern match at Main (line 119, column 1 - line 119, column 72): " + [v.constructor.name, v1.constructor.name]);
  };
};
var totalLives = 3;
var subscribe = [];
var renderLives = function(n) {
  var helper = function(v) {
    return function(v1) {
      if (v === 0 && v1 === 0) {
        return " ";
      }
      ;
      if (v === 0) {
        return " \u{1F5A4}" + helper(0)(v1 - 1 | 0);
      }
      ;
      return " \u2764\uFE0F" + helper(v - 1 | 0)(v1 - 1 | 0);
    };
  };
  return helper(n)(totalLives);
};
var init3 = function(deck) {
  return {
    modelCurrentCard: head2(deck),
    modelDeck: tail2(deck),
    modelCards: cons(new Tuple({
      cardDescription: "width of a chloroplast",
      cardMagnitude: 75e-7
    }, false))(cons(new Tuple({
      cardDescription: "approximate diameter of 2008 TS26, a meteoroid",
      cardMagnitude: 0.84
    }, true))(cons(new Tuple({
      cardDescription: "width of a typical association football field",
      cardMagnitude: 70
    }, true))(mempty3))),
    modelMousePos: new Pos(0, 0),
    modelDragState: Nothing.value,
    modelLives: totalLives
  };
};
var card = function(model) {
  return function(c) {
    return function(correct) {
      return function(mbyIdx) {
        var posAttr = function() {
          if (model.modelDragState instanceof Just) {
            var v = sub1(model.modelMousePos)(model.modelDragState.value0.dragStartPos);
            return [style1("transform")("translate(" + (show3(v.value0) + ("px," + (show3(v.value1) + "px)")))), style1("pointer-events")("none")];
          }
          ;
          if (model.modelDragState instanceof Nothing) {
            return [];
          }
          ;
          throw new Error("Failed pattern match at Main (line 208, column 16 - line 217, column 20): " + [model.modelDragState.constructor.name]);
        }();
        var placedAttrs = function() {
          if (mbyIdx instanceof Just) {
            return [onMouseover(new MouseOver(mbyIdx.value0 + 1 | 0)), style1("background-color")(function() {
              if (correct) {
                return "#a7c957";
              }
              ;
              return "#bc4749";
            }())];
          }
          ;
          if (mbyIdx instanceof Nothing) {
            return append12([onMousedown(StartDragging.value), style1("cursor")("grab")])(posAttr);
          }
          ;
          throw new Error("Failed pattern match at Main (line 219, column 7 - line 229, column 23): " + [mbyIdx.constructor.name]);
        }();
        var magText = function() {
          if (mbyIdx instanceof Just) {
            return show12(c.cardMagnitude);
          }
          ;
          if (mbyIdx instanceof Nothing) {
            return "?";
          }
          ;
          throw new Error("Failed pattern match at Main (line 205, column 15 - line 207, column 21): " + [mbyIdx.constructor.name]);
        }();
        var cardOuterStyle = function() {
          if (mbyIdx instanceof Just) {
            return append12([onMouseover(new MouseOver(mbyIdx.value0))])(function() {
              if (model.modelDragState instanceof Just && mbyIdx.value0 === model.modelDragState.value0.dragOverIdx) {
                return [style1("margin-top")("48pt")];
              }
              ;
              return [];
            }());
          }
          ;
          return [];
        }();
        return div3(cardOuterStyle)([div3(append12([style1("border")("solid"), style1("border-width")("1px"), style1("border-radius")("5px"), style1("padding")("5px"), style1("margin")("5px"), style1("width")("50%"), style1("min-width")("500pt"), style1("user-select")("none"), style1("display")("table"), style1("margin-left")("auto"), style1("margin-right")("auto"), style1("box-shadow")("3px 3px 2px 1px rgba(0, 0, 128, .2)"), style1("background-color")("#fefae0")])(placedAttrs))([div_2([text3(c.cardDescription)]), div3([style1("float")("right")])([text3(magText)])])]);
      };
    };
  };
};
var view = function(model) {
  return main1([style1("position")("fixed"), style1("top")("0px"), style1("bottom")("0px"), style1("left")("0px"), style1("right")("0px"), style1("background-color")("#faedcd"), onMousemove$prime(MouseMove.create), onMouseup(StopDragging.value)])([h12([style1("text-align")("center")])("Orders of magnitude"), h22([style1("text-align")("center"), style1("user-select")("none"), style1("font-size")("32pt")])([text3(renderLives(model.modelLives))]), div_2([card(model)(model.modelCurrentCard)(false)(Nothing.value)]), hr, div3([style1("overflow-y")("scroll"), style1("height")("100%")])(foldrWithIndex2(function(idx) {
    return function(v) {
      return function(arr) {
        return cons(card(model)(v.value0)(v.value1)(new Just(idx)))(arr);
      };
    };
  })(mempty3)(model.modelCards))]);
};
var main2 = /* @__PURE__ */ launchAff_(/* @__PURE__ */ bind5(/* @__PURE__ */ fetch3()()(/* @__PURE__ */ toCoreRequestOptionsRowRo()()(/* @__PURE__ */ toCoreRequestOptionsHelpe1(/* @__PURE__ */ toCoreRequestOptionsConve8())()()()({
  reflectSymbol: function() {
    return "headers";
  }
})(toCoreRequestOptionsHelpe)()()))("http://localhost:8000/data/output.json")({
  headers: {
    Accept: "application/json"
  }
}))(function(v) {
  return bind5(v.json)(function(gameDataJson) {
    var v1 = read4(gameDataJson);
    if (v1 instanceof Left) {
      return liftEffect5(log2("Error: " + show22(v1.value0)));
    }
    ;
    if (v1 instanceof Right) {
      return bind5(liftEffect5(randomSeed))(function(newSeed) {
        var shuffledDeck = evalGen(shuffle2(v1.value0))({
          newSeed,
          size: 100
        });
        var v2 = fromArray(shuffledDeck);
        if (v2 instanceof Just) {
          return discard3(traceM2(show32(v2.value0)))(function() {
            return liftEffect5(mount_("body")({
              init: new Tuple(init3(v2.value0), []),
              view,
              update,
              subscribe
            }));
          });
        }
        ;
        if (v2 instanceof Nothing) {
          return liftEffect5(log2("Deck is empty!"));
        }
        ;
        throw new Error("Failed pattern match at Main (line 306, column 11 - line 315, column 63): " + [v2.constructor.name]);
      });
    }
    ;
    throw new Error("Failed pattern match at Main (line 298, column 5 - line 315, column 63): " + [v1.constructor.name]);
  });
}));

// <stdin>
main2();
