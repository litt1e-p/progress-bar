import { reactive, onMounted, onActivated, watch, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, unref, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from "vue";
!function() {
  for (var e6 = 0, t2 = ["webkit", "moz", "ms", "o"], r = 0; r < t2.length && !window.requestAnimationFrame; ++r)
    window.requestAnimationFrame = window[t2[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t2[r] + "CancelAnimationFrame"] || window[t2[r] + "CancelRequestAnimationFrame"];
  window.requestAnimationFrame || (window.requestAnimationFrame = function(t3) {
    var r2 = new Date().getTime(), n = Math.max(0, 16 - (r2 - e6)), a = window.setTimeout(function() {
      return t3(r2 + n);
    }, n);
    return e6 = r2 + n, a;
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e7) {
    clearTimeout(e7);
  });
}();
var __assign = globalThis && globalThis.__assign || function() {
  return (__assign = Object.assign || function(e6) {
    for (var t2, r = 1, n = arguments.length; r < n; r++)
      for (var a in t2 = arguments[r])
        Object.prototype.hasOwnProperty.call(t2, a) && (e6[a] = t2[a]);
    return e6;
  }).apply(this, arguments);
}, CountUp = function() {
  function e6(e7, t2, r) {
    var n = this;
    this.target = e7, this.endVal = t2, this.options = r, this.version = "2.0.8", this.defaults = { startVal: 0, decimalPlaces: 0, duration: 2, useEasing: true, useGrouping: true, smartEasingThreshold: 999, smartEasingAmount: 333, separator: ",", decimal: ".", prefix: "", suffix: "" }, this.finalEndVal = null, this.useEasing = true, this.countDown = false, this.error = "", this.startVal = 0, this.paused = true, this.count = function(e8) {
      n.startTime || (n.startTime = e8);
      var t3 = e8 - n.startTime;
      n.remaining = n.duration - t3, n.useEasing ? n.countDown ? n.frameVal = n.startVal - n.easingFn(t3, 0, n.startVal - n.endVal, n.duration) : n.frameVal = n.easingFn(t3, n.startVal, n.endVal - n.startVal, n.duration) : n.countDown ? n.frameVal = n.startVal - (n.startVal - n.endVal) * (t3 / n.duration) : n.frameVal = n.startVal + (n.endVal - n.startVal) * (t3 / n.duration), n.countDown ? n.frameVal = n.frameVal < n.endVal ? n.endVal : n.frameVal : n.frameVal = n.frameVal > n.endVal ? n.endVal : n.frameVal, n.frameVal = Number(n.frameVal.toFixed(n.options.decimalPlaces)), n.printValue(n.frameVal), t3 < n.duration ? n.rAF = requestAnimationFrame(n.count) : n.finalEndVal !== null ? n.update(n.finalEndVal) : n.callback && n.callback();
    }, this.formatNumber = function(e8) {
      var t3, r2, a, o2, i2 = e8 < 0 ? "-" : "";
      t3 = Math.abs(e8).toFixed(n.options.decimalPlaces);
      var s = (t3 += "").split(".");
      if (r2 = s[0], a = s.length > 1 ? n.options.decimal + s[1] : "", n.options.useGrouping) {
        o2 = "";
        for (var l = 0, u = r2.length; l < u; ++l)
          l !== 0 && l % 3 == 0 && (o2 = n.options.separator + o2), o2 = r2[u - l - 1] + o2;
        r2 = o2;
      }
      return n.options.numerals && n.options.numerals.length && (r2 = r2.replace(/[0-9]/g, function(e9) {
        return n.options.numerals[+e9];
      }), a = a.replace(/[0-9]/g, function(e9) {
        return n.options.numerals[+e9];
      })), i2 + n.options.prefix + r2 + a + n.options.suffix;
    }, this.easeOutExpo = function(e8, t3, r2, n2) {
      return r2 * (1 - Math.pow(2, -10 * e8 / n2)) * 1024 / 1023 + t3;
    }, this.options = __assign(__assign({}, this.defaults), r), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(t2), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, this.options.separator === "" && (this.options.useGrouping = false), this.el = typeof e7 == "string" ? document.getElementById(e7) : e7, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined";
  }
  return e6.prototype.determineDirectionAndSmartEasing = function() {
    var e7 = this.finalEndVal ? this.finalEndVal : this.endVal;
    this.countDown = this.startVal > e7;
    var t2 = e7 - this.startVal;
    if (Math.abs(t2) > this.options.smartEasingThreshold) {
      this.finalEndVal = e7;
      var r = this.countDown ? 1 : -1;
      this.endVal = e7 + r * this.options.smartEasingAmount, this.duration = this.duration / 2;
    } else
      this.endVal = e7, this.finalEndVal = null;
    this.finalEndVal ? this.useEasing = false : this.useEasing = this.options.useEasing;
  }, e6.prototype.start = function(e7) {
    this.error || (this.callback = e7, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = false, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
  }, e6.prototype.pauseResume = function() {
    this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
  }, e6.prototype.reset = function() {
    cancelAnimationFrame(this.rAF), this.paused = true, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
  }, e6.prototype.update = function(e7) {
    cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(e7), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
  }, e6.prototype.printValue = function(e7) {
    var t2 = this.formattingFn(e7);
    this.el.tagName === "INPUT" ? this.el.value = t2 : this.el.tagName === "text" || this.el.tagName === "tspan" ? this.el.textContent = t2 : this.el.innerHTML = t2;
  }, e6.prototype.ensureNumber = function(e7) {
    return typeof e7 == "number" && !isNaN(e7);
  }, e6.prototype.validateValue = function(e7) {
    var t2 = Number(e7);
    return this.ensureNumber(t2) ? t2 : (this.error = "[CountUp] invalid start or end value: " + e7, null);
  }, e6.prototype.resetDuration = function() {
    this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
  }, e6;
}();
function _typeof(e6) {
  return (_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e7) {
    return typeof e7;
  } : function(e7) {
    return e7 && typeof Symbol == "function" && e7.constructor === Symbol && e7 !== Symbol.prototype ? "symbol" : typeof e7;
  })(e6);
}
function _classCallCheck(e6, t2) {
  if (!(e6 instanceof t2))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e6, t2) {
  for (var r = 0; r < t2.length; r++) {
    var n = t2[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e6, n.key, n);
  }
}
function _createClass(e6, t2, r) {
  return t2 && _defineProperties(e6.prototype, t2), r && _defineProperties(e6, r), e6;
}
function _defineProperty(e6, t2, r) {
  return t2 in e6 ? Object.defineProperty(e6, t2, { value: r, enumerable: true, configurable: true, writable: true }) : e6[t2] = r, e6;
}
function _slicedToArray(e6, t2) {
  return _arrayWithHoles(e6) || _iterableToArrayLimit(e6, t2) || _unsupportedIterableToArray(e6, t2) || _nonIterableRest();
}
function _toConsumableArray(e6) {
  return _arrayWithoutHoles(e6) || _iterableToArray(e6) || _unsupportedIterableToArray(e6) || _nonIterableSpread();
}
function _arrayWithoutHoles(e6) {
  if (Array.isArray(e6))
    return _arrayLikeToArray(e6);
}
function _arrayWithHoles(e6) {
  if (Array.isArray(e6))
    return e6;
}
function _iterableToArray(e6) {
  if (typeof Symbol != "undefined" && e6[Symbol.iterator] != null || e6["@@iterator"] != null)
    return Array.from(e6);
}
function _iterableToArrayLimit(e6, t2) {
  var r = e6 == null ? null : typeof Symbol != "undefined" && e6[Symbol.iterator] || e6["@@iterator"];
  if (r != null) {
    var n, a, o2 = [], i2 = true, s = false;
    try {
      for (r = r.call(e6); !(i2 = (n = r.next()).done) && (o2.push(n.value), !t2 || o2.length !== t2); i2 = true)
        ;
    } catch (e7) {
      s = true, a = e7;
    } finally {
      try {
        i2 || r.return == null || r.return();
      } finally {
        if (s)
          throw a;
      }
    }
    return o2;
  }
}
function _unsupportedIterableToArray(e6, t2) {
  if (e6) {
    if (typeof e6 == "string")
      return _arrayLikeToArray(e6, t2);
    var r = Object.prototype.toString.call(e6).slice(8, -1);
    return r === "Object" && e6.constructor && (r = e6.constructor.name), r === "Map" || r === "Set" ? Array.from(e6) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e6, t2) : void 0;
  }
}
function _arrayLikeToArray(e6, t2) {
  (t2 == null || t2 > e6.length) && (t2 = e6.length);
  for (var r = 0, n = new Array(t2); r < t2; r++)
    n[r] = e6[r];
  return n;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(e6, t2) {
  var r = typeof Symbol != "undefined" && e6[Symbol.iterator] || e6["@@iterator"];
  if (!r) {
    if (Array.isArray(e6) || (r = _unsupportedIterableToArray(e6)) || t2 && e6 && typeof e6.length == "number") {
      r && (e6 = r);
      var n = 0, a = function() {
      };
      return { s: a, n: function() {
        return n >= e6.length ? { done: true } : { done: false, value: e6[n++] };
      }, e: function(e7) {
        throw e7;
      }, f: a };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o2, i2 = true, s = false;
  return { s: function() {
    r = r.call(e6);
  }, n: function() {
    var e7 = r.next();
    return i2 = e7.done, e7;
  }, e: function(e7) {
    s = true, o2 = e7;
  }, f: function() {
    try {
      i2 || r.return == null || r.return();
    } finally {
      if (s)
        throw o2;
    }
  } };
}
var stringable = function(e6) {
  var t2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return typeis(e6) === Types.string && (!t2 || e6.length > 0);
}, strLen = function(e6) {
  var t2 = 0;
  if (!stringable(e6))
    return t2;
  for (var r = 0, n = e6.length; r < n; r++)
    t2 += e6.charCodeAt(r) < 256 ? 1 : 3;
  return t2;
}, kRegSignNumberic = new RegExp("^\\d+(\\.|\\.\\d+)?$", "i"), kRegUnSignNumberic = new RegExp("^\\-\\d+(\\.|\\.\\d+)?$", "i"), kRegNumberic = new RegExp("^\\-?\\d+(\\.|\\.\\d+)?$", "i"), kRegStartStrictNumberic = new RegExp("^(\\-?[1-9]|0\\.\\d+|0$)", "i"), kRegEndStrictNumberic = new RegExp("\\.$", "i"), kEmptySpacer = new RegExp("(^$|^\\s+$)", "i"), isNil = function(e6) {
  return isNull(e6) || isUndefined(e6) || typeis(e6) === Types.string && re(kEmptySpacer, e6);
}, isNull = function(e6) {
  return typeis(e6) === Types.null;
}, isUndefined = function(e6) {
  return typeis(e6) === Types.undefined;
}, isNumberic = function(e6, t2) {
  var r = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
  if (isNil(e6))
    return false;
  if (!re(kRegStartStrictNumberic, e6) || re(kRegEndStrictNumberic, e6))
    return false;
  var n = +e6;
  return !isNaN(n) && (r ? typeis(t2) === Types.bool ? re(t2 ? kRegSignNumberic : kRegUnSignNumberic, n) : re(kRegNumberic, n) : typeis(n) === Types.number);
}, objectable = function(e6) {
  var t2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  if (typeis(e6) !== Types.object)
    return false;
  var r = Object.getPrototypeOf(e6);
  if (!r)
    return !t2 || Object.keys(e6).length > 0;
  if (r.constructor === Object)
    return !t2 || Object.keys(e6).length > 0;
  var n = Object.prototype.hasOwnProperty.call(r, "constructor") && r.constructor;
  return typeof n == "function" && Object.prototype.hasOwnProperty.toString.call(n) === Object.prototype.hasOwnProperty.toString.call(Object) && (!t2 || Object.keys(e6).length > 0);
}, optional = function optional(path, obj) {
  var separator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".", rs = void 0, properties;
  if (!stringable(path) || !stringable(separator))
    return rs;
  var p = path, o;
  if (properties = p.indexOf(separator) === -1 ? Array.of(p) : p.split(separator), isNil(obj)) {
    try {
      o = isNumberic(properties[0]) ? eval("this[".concat(properties[0], "]")) : eval("this." + properties[0]);
    } catch (e6) {
      o = Object.prototype.constructor();
    }
    if (properties.shift(), typeis(o) === Types.object)
      o = o;
    else {
      if (typeis(o) !== Types.array)
        return rs;
      o = o;
    }
  } else
    o = obj;
  return rs = properties.reduce(function(e6, t2) {
    return objectable(e6) ? e6[t2] : arrayable(e6) ? isNumberic(t2) ? e6[+t2] : e6[t2] : e6 ? e6[t2] : void 0;
  }, o), rs;
}, extractable = function extractable() {
  for (var rs = Object.prototype.constructor(), _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
    args[_key] = arguments[_key];
  if (!arrayable(args) || args.length < 2)
    return rs;
  var t = Array.prototype.slice.call(args, -1)[0];
  if (typeis(t) === Types.string)
    try {
      t = eval("this." + t);
    } catch (e6) {
      t = void 0;
    }
  if (!objectable(t))
    return rs;
  var o = Array.prototype.slice.apply(args, [0, -1]), _iterator = _createForOfIteratorHelper(o), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var i = _step.value;
      typeis(i) === Types.string ? rs[i] = optional(i, t) || String.prototype.constructor() : typeis(i) === Types.array ? i.length === 2 ? rs[i[0]] = (typeis(i[1]) === Types.string ? optional(i[1], t) : i[1]) || String.prototype.constructor() : i.length === 3 && (rs[i[0]] = objectable(i[2]) || arrayable(i[2]) ? optional(i[1], i[2]) : String.prototype.constructor()) : typeis(i) === Types.object && (rs = Object.assign(rs, i));
    }
  } catch (e6) {
    _iterator.e(e6);
  } finally {
    _iterator.f();
  }
  return rs;
}, assign = function e2(t2, r, n) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".";
  typeis(r) !== Types.object && typeis(r) !== Types.array && typeis(r) !== Types.unknown || (stringable(t2) || arrayable(t2)) && (stringable(t2) && (t2 = t2.split(a)), t2.length > 1 ? e2(t2, r[t2.shift()], n) : r[t2[0]] = n);
}, objReverse = function(e6) {
  if (!objectable(e6))
    return e6;
  var t2 = e6, r = Object.keys(t2).reduce(function(e7, r2) {
    var n2 = String(t2[r2]), a = [];
    return arrayable(e7[n2], false) && (a = e7[n2]), Object.assign(e7, _defineProperty({}, n2, a.concat(r2)));
  }, {});
  for (var n in r)
    r.hasOwnProperty(n) && (r[n] = Array.isArray(r[n]) && r[n].length === 1 ? r[n][0] : r[n]);
  return r;
}, TypesDesc, Types, e;
e = TypesDesc || (TypesDesc = {}), e["[object Number]"] = "number", e["[object String]"] = "string", e["[object Boolean]"] = "bool", e["[object Undefined]"] = "undefined", e["[object Null]"] = "null", e["[object Array]"] = "array", e["[object Uint8Array]"] = "uint8Array", e["[object Object]"] = "object", e["[object Function]"] = "function", e["[object BigInt]"] = "bigInt", e["[object Date]"] = "date", e["[object WeakMap]"] = "weakMap", e["[object Map]"] = "map", e["[object WeakSet]"] = "weakSet", e["[object ArrayBuffer]"] = "arrayBuffer", e["[object Set]"] = "set", e["[object Symbol]"] = "symbol", e["[object DataView]"] = "dataView", e["[object Float32Array]"] = "float32Array", e["[object Float64Array]"] = "float64Array", e["[object Int8Array]"] = "int8Array", e["[object Int16Array]"] = "int16Array", e["[object Int32Array]"] = "int32Array", e["[object Uint8ClampedArray]"] = "uint8ClampedArray", e["[object Uint16Array]"] = "uint16Array", e["[object Uint32Array]"] = "uint32Array", e["[object BigInt64Array]"] = "bigInt64Array", e["[object BigUint64Array]"] = "bigUint64Array", e["[object RegExp]"] = "regExp", function(e6) {
  e6.number = "number", e6.string = "string", e6.bool = "bool", e6[void 0] = "undefined", e6.null = "null", e6.bigInt = "bigInt", e6.object = "object", e6.function = "function", e6.symbol = "symbol", e6.arrayBuffer = "arrayBuffer", e6.regExp = "regExp", e6.date = "date", e6.dataView = "dataView", e6.weakMap = "weakMap", e6.map = "map", e6.weakSet = "weakSet", e6.set = "set", e6.array = "array", e6.uint8Array = "uint8Array", e6.float32Array = "float32Array", e6.float64Array = "float64Array", e6.int8Array = "int8Array", e6.int16Array = "int16Array", e6.int32Array = "int32Array", e6.uint8ClampedArray = "uint8ClampedArray", e6.uint16Array = "uint16Array", e6.uint32Array = "uint32Array", e6.bigInt64Array = "bigInt64Array", e6.bigUint64Array = "bigUint64Array", e6.unknown = "";
}(Types || (Types = {}));
var inEnum = function(e6, t2) {
  return !(!objectable(e6) || e6 !== Object(e6)) && (Object.prototype.hasOwnProperty.call(e6, t2) || Object.values(e6).indexOf(t2) > -1);
}, typeis = function(e6) {
  var t2 = Object.prototype.toString.call(e6);
  if (t2 === "[object Object]") {
    var r = Object.getPrototypeOf(e6);
    if (r && r.constructor !== Object)
      return Types.unknown;
  }
  var n = Types.unknown;
  return Object.keys(TypesDesc).includes(t2) && (n = Types[TypesDesc[t2]]), n;
}, re = function(e6, t2) {
  return e6.test(t2.toString());
}, arrayable = function(e6) {
  var t2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return (typeis(e6) === Types.array || typeis(e6) === Types.uint8Array) && (!t2 || e6.length > 0);
}, arrayUnique = function(e6) {
  var t2 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
  if (!arrayable(e6))
    return e6;
  if (t2) {
    var r = e6.map(function(e7) {
      return JSON.stringify(e7);
    });
    return Array.from(new Set(r)).map(function(e7) {
      return JSON.parse(e7);
    });
  }
  return Array.from(new Set(e6));
}, arrValsCount = function(e6) {
  var t2 = {};
  return arrayable(e6) ? e6.reduce(function(e7, t3) {
    var r = t3 + "";
    return e7[r] ? e7[r]++ : e7[r] = 1, e7;
  }, t2) : t2;
}, arrValCount = function(e6, t2) {
  if (!arrayable(e6) || !e6.includes(t2))
    return 0;
  var r = arrValsCount(e6), n = t2 + "";
  return r.hasOwnProperty(n) ? r[n] : 0;
}, flat = function e3(t2) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0, n = Array.prototype.constructor();
  if (!arrayable(t2, false))
    return t2;
  var a = isNaN(r) ? 1 : Number(r);
  if (!a)
    return Array.prototype.slice.call(t2);
  for (var o2 = 0, i2 = t2.length >>> 0; o2 < i2; o2++)
    n = n.concat(e3(t2[o2], a - 1));
  return n;
}, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", InvalidCharacterError = function e4(t2) {
  _classCallCheck(this, e4), _defineProperty(this, "name", void 0), _defineProperty(this, "message", void 0), this.message = t2, this.name = "InvalidCharacterError";
}, _btoa, _atob;
_btoa = typeof window != "undefined" && window.btoa ? window.btoa : function(e6) {
  for (var t2 = String(e6), r = "", n = 0, a = 0, o2 = 0, i2 = chars; t2.charAt(0 | o2) || (i2 = "=", o2 % 1); r += i2.charAt(63 & n >> 8 - o2 % 1 * 8)) {
    if ((a = t2.charCodeAt(o2 += 3 / 4)) > 255)
      throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    n = n << 8 | a;
  }
  return r;
}, _atob = typeof window != "undefined" && window.atob ? window.atob : function(e6) {
  var t2 = String(e6).replace(/[=]+$/, "");
  if (t2.length % 4 == 1)
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var r, n = "", a = 0, o2 = 0, i2 = 0; r = t2.charAt(i2++); ~r && (o2 = a % 4 ? 64 * o2 + r : r, a++ % 4) ? n += String.fromCharCode(255 & o2 >> (-2 * a & 6)) : 0)
    r = chars.indexOf(r);
  return n;
};
var url2Blob = function(e6) {
  if (typeof window == "undefined")
    throw new Error("url2Blob only works in browser environment");
  if (!stringable(e6))
    throw new TypeError(e6 + " can not be null");
  var t2 = e6.split(",");
  if (!arrayable(t2))
    throw new ReferenceError("invalid data url");
  var r = t2[0].match(/:(.*?);/);
  if (!arrayable(r) || r.length < 2)
    throw new ReferenceError("invalid data format");
  for (var n = r, a = _atob(t2[1]), o2 = a.length, i2 = new Uint8Array(o2); o2--; )
    i2[o2] = a.charCodeAt(o2);
  return new Blob([i2], { type: n[1] });
}, str2Buffer = function(e6) {
  if (stringable(e6))
    return e6 = _btoa(unescape(encodeURIComponent(e6))), new Uint8Array(Array.prototype.map.call(e6, function(e7) {
      return e7.charCodeAt(0);
    }));
}, buffer2Str = function(e6) {
  if (arrayable(e6) || objectable(e6) || stringable(e6)) {
    typeis(e6) === Types.string && (e6 = JSON.parse.call(null, e6));
    var t2 = Object.values(e6);
    if (arrayable(t2))
      return decodeURIComponent(escape(_atob(String.fromCharCode.apply(null, Array.prototype.map.call(new Uint8Array(t2), function(e7) {
        return e7;
      })))));
  }
}, formatNumber = function(e6) {
  return (e6 = e6.toString())[1] ? e6 : "0" + e6;
}, formatDate = function(e6) {
  var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "yyyy-MM-dd hh:mm:ss", r = String.prototype.constructor();
  if (typeis(e6) !== Types.date && !stringable(e6))
    return r;
  if (typeis(e6) === Types.string && (e6 = new Date(e6)), e6.toString() === "Invalid Date")
    return r;
  for (var n = e6, a = { Y: n.getFullYear(), M: n.getMonth() + 1, D: n.getDate(), h: n.getHours(), m: n.getMinutes(), s: n.getSeconds() }, o2 = 0, i2 = Object.keys(a).length >>> 0; o2 < i2; o2++)
    if (a.hasOwnProperty(a[o2]) && isNaN(a[a[o2]]))
      return r;
  var s = { Y: a.Y.toString(), yyyy: a.Y.toString(), M: a.M.toString(), MM: formatNumber(a.M), d: a.D.toString(), dd: formatNumber(a.D), h: a.h.toString(), hh: formatNumber(a.h), m: a.m.toString(), mm: formatNumber(a.m), s: a.s.toString(), ss: formatNumber(a.s) }, l = t2.split(/-| |:|\//);
  r = t2;
  for (var u = 0; u < l.length; u++) {
    var c = l[u];
    r = r.replace(c, s[c]);
  }
  return r;
}, timezoneDate = function() {
  var e6 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0, i2 = arguments.length > 6 ? arguments[6] : void 0;
  if ([e6, t2, r, n, a, o2].every(function(e7) {
    return typeis(e7) === Types.number && e7 >= 0;
  })) {
    var s = new Date(Date.UTC(e6, t2 - 1, r, n, a, o2)), l = new Date(s.toLocaleString("en-US", { timeZone: "UTC" })), u = s;
    if (stringable(i2))
      u = new Date(s.toLocaleString("en-US", { timeZone: i2 }));
    else if ((u = new Date("".concat(t2, "/").concat(r, "/").concat(e6, " ").concat(n, ":").concat(a, ":").concat(o2))).toString() === "Invalid Date")
      return;
    var c = l.getTime() - u.getTime();
    return s.setTime(s.getTime() + c), s;
  }
}, quarterable = function(e6) {
  var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "Q", n = Array(2).fill(String.prototype.constructor()), a = new RegExp("^\\d{4}".concat(r, "\\d$"), "g");
  if (stringable(e6) && a.test(e6)) {
    var o2 = e6.split(r), i2 = _slicedToArray(o2, 2), s = i2[0], l = i2[1];
    if (isNumberic(s) && isNumberic(l)) {
      var u = +l + +t2, c = 4 * +s + u;
      return u % 4 == 0 ? (n[0] = u === 0 ? s - 1 : +s + u / 4 - 1, n[1] = 4) : (n[1] = c % 4, n[0] = (c - n[1]) / 4), n.join(r);
    }
  }
}, mappable = function(e6) {
  var t2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return typeis(e6) === Types.map && (!t2 || e6.size > 0);
}, rangeRandom = function(e6, t2) {
  return !isNumberic(e6) || !isNumberic(t2) || e6 > t2 ? Math.random() : Math.random() * (t2 - e6) + e6;
}, numberic = function(e6) {
  var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, r = arguments.length > 2 ? arguments[2] : void 0;
  if (isNumberic(e6, void 0, false)) {
    var n = +e6, a = Math.sign(n);
    n = Math.abs(n);
    var o2 = isNumberic(t2, true) ? +(1 + Array(t2).fill(0).join("")) : 100, i2 = Math.round((n + Number.EPSILON) * o2) / o2;
    return a * ((r = isNumberic(r, true) ? r : t2) > 0 ? +i2.toFixed(r) : i2);
  }
}, guid = function() {
  var e6 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8, t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "abcdefghijklmnopqrstuvwxyz0123456789", r = t2.split("");
  return r.length || (r = "abcdefghijklmnopqrstuvwxyz0123456789".split("")), _toConsumableArray(Array(e6)).map(function(e7) {
    return r[Math.random() * r.length | 0];
  }).join("");
}, hash = function() {
  return (16777215 * Math.random() << 7).toString(16);
}, sleep = function() {
  var e6 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 16;
  return new Promise(function(t2) {
    return setTimeout(t2, e6);
  });
}, settable = function(e6) {
  var t2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return typeis(e6) === Types.set && (!t2 || e6.size > 0);
}, PromiseStatus;
!function(e6) {
  e6.pending = "pending", e6.fulfilled = "fulfilled", e6.rejected = "rejected";
}(PromiseStatus || (PromiseStatus = {}));
var PromisePolyfill = function() {
  function e6(t2) {
    var r = this;
    _classCallCheck(this, e6), _defineProperty(this, "status", void 0), _defineProperty(this, "value", void 0), _defineProperty(this, "reason", void 0), _defineProperty(this, "onResolvedClosures", void 0), _defineProperty(this, "onRejectedClosures", void 0), this.status = PromiseStatus.pending, this.value = void 0, this.reason = void 0, this.onResolvedClosures = [], this.onRejectedClosures = [];
    var n = function(e7) {
      r.status === PromiseStatus.pending && (r.status = PromiseStatus.rejected, r.reason = e7, r.onRejectedClosures.forEach(function(e8) {
        return e8();
      }));
    };
    try {
      t2(function(e7) {
        r.status === PromiseStatus.pending && (r.status = PromiseStatus.fulfilled, r.value = e7, r.onResolvedClosures.forEach(function(e8) {
          return e8();
        }));
      }, n);
    } catch (e7) {
      n(e7);
    }
  }
  return _createClass(e6, [{ key: "then", value: function(t2, r) {
    var n = this;
    t2 = typeof t2 == "function" ? t2 : function(e7) {
      return e7;
    }, r = typeof r == "function" ? r : function(e7) {
      throw e7;
    };
    var a = new e6(function(e7, o2) {
      n.status === PromiseStatus.fulfilled && micro(function() {
        try {
          var r2, i2 = (r2 = t2) === null || r2 === void 0 ? void 0 : r2(n.value);
          resolvePromise(a, i2, e7, o2);
        } catch (e8) {
          o2(e8);
        }
      }), n.status === PromiseStatus.rejected && micro(function() {
        try {
          var t3, i2 = (t3 = r) === null || t3 === void 0 ? void 0 : t3(n.reason);
          resolvePromise(a, i2, e7, o2);
        } catch (e8) {
          o2(e8);
        }
      }), n.status === PromiseStatus.pending && (n.onResolvedClosures.push(function() {
        micro(function() {
          try {
            var r2, i2 = (r2 = t2) === null || r2 === void 0 ? void 0 : r2(n.value);
            resolvePromise(a, i2, e7, o2);
          } catch (e8) {
            o2(e8);
          }
        });
      }), n.onRejectedClosures.push(function() {
        micro(function() {
          try {
            var t3, i2 = (t3 = r) === null || t3 === void 0 ? void 0 : t3(n.reason);
            resolvePromise(a, i2, e7, o2);
          } catch (e8) {
            o2(e8);
          }
        });
      }));
    });
    return a;
  } }, { key: "catch", value: function(e7) {
    return this.then(void 0, e7);
  } }]), e6;
}();
function micro(e6) {
  return typeof window != "undefined" ? window.queueMicrotask(e6) : process.nextTick(e6);
}
function resolvePromise(e6, t2, r, n) {
  if (t2 === e6)
    return n(new TypeError("Chaining cycle detected for promise"));
  var a = false;
  if (t2 === null || _typeof(t2) !== "object" && typeof t2 != "function")
    r(t2);
  else
    try {
      var o2 = t2.then;
      typeof o2 == "function" ? o2.call(t2, function(t3) {
        a || (a = true, resolvePromise(e6, t3, r, n));
      }, function(e7) {
        a || (a = true, n(e7));
      }) : r(t2);
    } catch (e7) {
      if (a)
        return;
      a = true, n(e7);
    }
}
_defineProperty(PromisePolyfill, "resolve", void 0), _defineProperty(PromisePolyfill, "reject", void 0), _defineProperty(PromisePolyfill, "race", void 0), _defineProperty(PromisePolyfill, "all", void 0), _defineProperty(PromisePolyfill, "deferred", void 0), PromisePolyfill.resolve = function(e6) {
  return new PromisePolyfill(function(t2, r) {
    return t2(e6);
  });
}, PromisePolyfill.reject = function(e6) {
  return new PromisePolyfill(function(t2, r) {
    return r(e6);
  });
}, PromisePolyfill.race = function(e6) {
  return new PromisePolyfill(function(t2, r) {
    for (var n = 0; n < e6.length; n++)
      e6[n].then(t2, r);
  });
}, PromisePolyfill.all = function(e6) {
  var t2 = Array(), r = 0;
  return new PromisePolyfill(function(n, a) {
    for (var o2 = function(o3) {
      e6[o3].then(function(a2) {
        !function(n2, a3, o4) {
          t2[n2] = a3, ++r === e6.length && o4(t2);
        }(o3, a2, n);
      }, a);
    }, i2 = 0; i2 < e6.length; i2++)
      o2(i2);
  });
}, PromisePolyfill.deferred = function() {
  var e6 = {};
  return e6.promise = new PromisePolyfill(function(t2, r) {
    e6.resolve = t2, e6.reject = r;
  }), e6;
};
var debounce = function(e6, t2) {
  var r, n, a = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  if (typeis(e6) !== Types.function)
    throw new TypeError("Expected a function");
  if (!isNumberic(t2, true))
    throw new TypeError("Expected a numberic time");
  var o2 = function() {
    for (var o3 = arguments.length, i2 = new Array(o3), s = 0; s < o3; s++)
      i2[s] = arguments[s];
    var l = this;
    if (r && clearTimeout(r), a) {
      var u = !r;
      r = setTimeout(function() {
        r = null;
      }, +t2), u && (n = e6.apply(l, i2));
    }
    return r = setTimeout(function() {
      e6.apply(l, i2);
    }, +t2), n;
  };
  return o2.cancel = function() {
    r && clearTimeout(r), r = null;
  }, o2;
}, throttle = function(e6, t2, r) {
  if (typeis(e6) !== Types.function)
    throw new TypeError("Expected a function");
  if (!isNumberic(t2, true))
    throw new TypeError("Expected a numberic time");
  var n, a;
  if (r && (r.leading = (n = r.leading) === null || n === void 0 || n, r.trailing = (a = r.trailing) === null || a === void 0 || a, r.leading === false && r.trailing === false))
    throw new Error("Expected one of leading and trailing to be assigned to false");
  var o2, i2, s = +t2, l = 0, u = function() {
    for (var t3 = arguments.length, n2 = new Array(t3), a2 = 0; a2 < t3; a2++)
      n2[a2] = arguments[a2];
    var u2 = this, c = new Date().getTime();
    l || (r == null ? void 0 : r.leading) !== false || (l = c);
    var p2 = s - (c - l);
    return p2 <= 0 || p2 > s ? (o2 && (clearTimeout(o2), o2 = null), l = c, e6.apply(u2, n2)) : o2 || (r == null ? void 0 : r.trailing) === false || (o2 = setTimeout(function() {
      l = (r == null ? void 0 : r.leading) === false ? 0 : new Date().getTime(), o2 = null, e6.apply(u2, n2);
    }, p2)), i2;
  };
  return u.cancel = function() {
    o2 && clearTimeout(o2), l = 0, o2 = null;
  }, u;
}, _TypedCopyMap, TypedArrayMap = { "[object Float32Array]": Float32Array, "[object Float64Array]": Float64Array, "[object Int8Array]": Int8Array, "[object Int16Array]": Int16Array, "[object Int32Array]": Int32Array, "[object Uint8Array]": Uint8Array, "[object Uint16Array]": Uint16Array, "[object Uint32Array]": Uint32Array, "[object Uint8ClampedArray]": Uint8ClampedArray }, TypedCopyMap = (_TypedCopyMap = {}, _defineProperty(_TypedCopyMap, Types.date, copyDate), _defineProperty(_TypedCopyMap, Types.arrayBuffer, copyArrayBuffer), _defineProperty(_TypedCopyMap, Types.dataView, copyDataView), _defineProperty(_TypedCopyMap, Types.float32Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.float64Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.int8Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.int16Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.int32Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.uint8Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.uint8ClampedArray, copyTypedArray), _defineProperty(_TypedCopyMap, Types.uint16Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.uint32Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.bigInt64Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.bigUint64Array, copyTypedArray), _defineProperty(_TypedCopyMap, Types.regExp, copyRegExp), _TypedCopyMap), copy = function e5(t2) {
  var r = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1], n = t2;
  if (isNull(n))
    return n;
  if (TypedCopyMap[typeis(n)])
    return TypedCopyMap[typeis(n)](t2);
  if (arrayable(t2)) {
    var a = Array.prototype.constructor();
    return t2.map(function(e6) {
      return a.push(e6);
    }), r ? a.map(function(t3) {
      return e5(t3);
    }) : a;
  }
  if (objectable(t2)) {
    var o2 = Object.prototype.constructor();
    for (var i2 in t2)
      Object.prototype.hasOwnProperty.call(t2, i2) && (o2[i2] = t2[i2]);
    if (!r)
      return o2;
    for (var s in o2)
      Object.prototype.hasOwnProperty.call(o2, s) && (o2[s] = e5(o2[s]));
    return o2;
  }
  return t2;
};
function copyArrayBuffer(e6) {
  var t2 = new ArrayBuffer(e6.byteLength);
  return new Uint8Array(t2).set(new Uint8Array(e6)), t2;
}
function copyDataView(e6) {
  var t2 = copyArrayBuffer(e6.buffer);
  return new DataView(t2, e6.byteOffset, e6.byteLength);
}
function copyDate(e6) {
  return new Date(e6.getTime());
}
function copyRegExp(e6) {
  var t2 = new RegExp(e6.source, e6.flags);
  return t2.lastIndex = e6.lastIndex, t2;
}
function copyTypedArray(e6) {
  try {
    TypedArrayMap["[object BigInt64Array]"] = BigInt64Array, TypedArrayMap["[object BigUint64Array]"] = BigUint64Array;
  } catch (e7) {
  }
  var t2 = copyArrayBuffer(e6.buffer);
  return new TypedArrayMap[Object.prototype.toString.call(e6)](t2, e6.byteOffset, e6.length);
}
Object.freeze({ __proto__: null, arrayable, arrayUnique, arrValsCount, arrValCount, flat, get _btoa() {
  return _btoa;
}, get _atob() {
  return _atob;
}, url2Blob, str2Buffer, buffer2Str, typeis, re, formatDate, timezoneDate, quarterable, get Types() {
  return Types;
}, get TypesDesc() {
  return TypesDesc;
}, inEnum, mappable, rangeRandom, numberic, guid, hash, objectable, optional, extractable, assign, objReverse, isNil, isNull, isUndefined, isNumberic, sleep, settable, stringable, strLen, PromisePolyfill, debounce, throttle, copy, copyArrayBuffer, copyDataView, copyDate, copyRegExp, copyTypedArray });
var index_vue_vue_type_style_index_0_scoped_true_lang = "", _export_sfc = (e6, t2) => {
  for (const [r, n] of t2)
    e6[r] = n;
  return e6;
};
const _hoisted_1 = { key: 0 }, _hoisted_2 = ["id"], _hoisted_3 = { key: 1 }, _hoisted_4 = ["id"], __default__ = { name: "progressBar" };
function setup(e6) {
  const t2 = e6, r = reactive({ val: "0", cu: void 0, id: void 0 });
  onMounted(() => {
    n();
  }), onActivated(() => {
    a(t2.percent);
  });
  const n = () => {
    r.id = hash(), a(t2.percent);
  }, a = (e7, t3 = 0) => {
    isNumberic(e7) && setTimeout(() => {
      r.cu = new CountUp(r.id, e7, { startVal: t3, suffix: "%", duration: 0.25 }), o2(e7 <= 0 ? 1e-3 : e7 > 100 ? 100 : e7);
    }, 500);
  }, o2 = (e7) => {
    r.cu && !r.cu.error && t2.showCountUp && r.cu.start(), r.val = e7;
  };
  return watch(() => t2.percent, (e7, t3) => {
    var r2, n2;
    r2 = e7, n2 = t3, o2(0), a(r2, n2);
  }), (t3, n2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["pb-main", { "pb-main-vt": e6.mode === "vertical" }]) }, [createElementVNode("div", { class: "bar", style: normalizeStyle({ background: e6.bgColor }) }, [e6.mode === "horizontal" ? (openBlock(), createElementBlock("div", { key: 0, class: "current", style: normalizeStyle({ width: unref(r).val + "%", background: e6.tintColor }) }, null, 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "current", style: normalizeStyle({ height: unref(r).val + "%", background: e6.tintColor }) }, null, 4))], 4), e6.mode === "horizontal" ? (openBlock(), createElementBlock("div", _hoisted_1, [createElementVNode("div", { id: unref(r).id, class: "percent-mirror", style: normalizeStyle({ display: e6.showCountUp ? "block" : "none", color: e6.textColor }) }, null, 12, _hoisted_2), e6.showCountUp ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: "percent", style: normalizeStyle({ color: e6.textColor }) }, [renderSlot(t3.$slots, "percent", { percent: e6.percent }, () => [createTextVNode(toDisplayString((e6.percent || 0) + "%"), 1)], true)], 4))])) : (openBlock(), createElementBlock("div", _hoisted_3, [createElementVNode("div", { id: unref(r).id, class: "percent-mirror", style: normalizeStyle({ display: e6.showCountUp ? "block" : "none", color: e6.textColor }) }, null, 12, _hoisted_4), e6.showCountUp ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: "percent", style: normalizeStyle({ color: e6.textColor }) }, [renderSlot(t3.$slots, "percent", { percent: e6.percent }, () => [createTextVNode(toDisplayString((e6.percent || 0) + "%"), 1)], true)], 4))]))], 2));
}
const _sfc_main = Object.assign(__default__, { props: { percent: { type: [String, Number], required: true, default: "0" }, tintColor: { type: String, default: "rgb(0, 130, 251)" }, bgColor: { type: String, default: "rgba(0, 138, 251, 0.102)" }, textColor: { type: String, default: "#999" }, showCountUp: { type: Boolean, default: true }, mode: { type: String, default: "horizontal" } }, setup });
var ProgressBar = _export_sfc(_sfc_main, [["__scopeId", "data-v-6fe519c8"]]);
const components = [ProgressBar], install = function(e6) {
  components.forEach((t2) => {
    e6.component(t2.name, t2);
  });
};
typeof window != "undefined" && window.Vue && install(window.Vue);
export { ProgressBar, install as default };
