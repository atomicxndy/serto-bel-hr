/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */ (function (
  A,
  R,
) {
  "use strict";
  typeof module == "object" && typeof module.exports == "object"
    ? (module.exports = A.document
        ? R(A, !0)
        : function (ye) {
            if (!ye.document)
              throw new Error("jQuery requires a window with a document");
            return R(ye);
          })
    : R(A);
})(typeof window < "u" ? window : this, function (A, R) {
  "use strict";
  var ye = [],
    S = Object.getPrototypeOf,
    E = ye.slice,
    H = ye.flat
      ? function (e) {
          return ye.flat.call(e);
        }
      : function (e) {
          return ye.concat.apply([], e);
        },
    ae = ye.push,
    he = ye.indexOf,
    L = {},
    M = L.toString,
    Y = L.hasOwnProperty,
    O = Y.toString,
    F = O.call(Object),
    D = {},
    q = function (e) {
      return (
        typeof e == "function" &&
        typeof e.nodeType != "number" &&
        typeof e.item != "function"
      );
    },
    Z = function (e) {
      return e != null && e === e.window;
    },
    j = A.document,
    ie = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function le(e, t, i) {
    var o,
      r,
      l = (i = i || j).createElement("script");
    if (((l.text = e), t))
      for (o in ie)
        (r = t[o] || (t.getAttribute && t.getAttribute(o))) &&
          l.setAttribute(o, r);
    i.head.appendChild(l).parentNode.removeChild(l);
  }
  function oe(e) {
    return e == null
      ? e + ""
      : typeof e == "object" || typeof e == "function"
        ? L[M.call(e)] || "object"
        : typeof e;
  }
  var De = "3.7.1",
    Oe = /HTML$/i,
    s = function (e, t) {
      return new s.fn.init(e, t);
    };
  function Je(e) {
    var t = !!e && "length" in e && e.length,
      i = oe(e);
    return (
      !q(e) &&
      !Z(e) &&
      (i === "array" ||
        t === 0 ||
        (typeof t == "number" && 0 < t && t - 1 in e))
    );
  }
  function ne(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  (s.fn = s.prototype =
    {
      jquery: De,
      constructor: s,
      length: 0,
      toArray: function () {
        return E.call(this);
      },
      get: function (e) {
        return e == null
          ? E.call(this)
          : e < 0
            ? this[e + this.length]
            : this[e];
      },
      pushStack: function (e) {
        var t = s.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return s.each(this, e);
      },
      map: function (e) {
        return this.pushStack(
          s.map(this, function (t, i) {
            return e.call(t, i, t);
          }),
        );
      },
      slice: function () {
        return this.pushStack(E.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      even: function () {
        return this.pushStack(
          s.grep(this, function (e, t) {
            return (t + 1) % 2;
          }),
        );
      },
      odd: function () {
        return this.pushStack(
          s.grep(this, function (e, t) {
            return t % 2;
          }),
        );
      },
      eq: function (e) {
        var t = this.length,
          i = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= i && i < t ? [this[i]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: ae,
      sort: ye.sort,
      splice: ye.splice,
    }),
    (s.extend = s.fn.extend =
      function () {
        var e,
          t,
          i,
          o,
          r,
          l,
          c = arguments[0] || {},
          d = 1,
          h = arguments.length,
          m = !1;
        for (
          typeof c == "boolean" && ((m = c), (c = arguments[d] || {}), d++),
            typeof c == "object" || q(c) || (c = {}),
            d === h && ((c = this), d--);
          d < h;
          d++
        )
          if ((e = arguments[d]) != null)
            for (t in e)
              (o = e[t]),
                t !== "__proto__" &&
                  c !== o &&
                  (m && o && (s.isPlainObject(o) || (r = Array.isArray(o)))
                    ? ((i = c[t]),
                      (l =
                        r && !Array.isArray(i)
                          ? []
                          : r || s.isPlainObject(i)
                            ? i
                            : {}),
                      (r = !1),
                      (c[t] = s.extend(m, l, o)))
                    : o !== void 0 && (c[t] = o));
        return c;
      }),
    s.extend({
      expando: "jQuery" + (De + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, i;
        return (
          !(!e || M.call(e) !== "[object Object]") &&
          (!(t = S(e)) ||
            (typeof (i = Y.call(t, "constructor") && t.constructor) ==
              "function" &&
              O.call(i) === F))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t, i) {
        le(e, { nonce: t && t.nonce }, i);
      },
      each: function (e, t) {
        var i,
          o = 0;
        if (Je(e))
          for (i = e.length; o < i && t.call(e[o], o, e[o]) !== !1; o++);
        else for (o in e) if (t.call(e[o], o, e[o]) === !1) break;
        return e;
      },
      text: function (e) {
        var t,
          i = "",
          o = 0,
          r = e.nodeType;
        if (!r) for (; (t = e[o++]); ) i += s.text(t);
        return r === 1 || r === 11
          ? e.textContent
          : r === 9
            ? e.documentElement.textContent
            : r === 3 || r === 4
              ? e.nodeValue
              : i;
      },
      makeArray: function (e, t) {
        var i = t || [];
        return (
          e != null &&
            (Je(Object(e))
              ? s.merge(i, typeof e == "string" ? [e] : e)
              : ae.call(i, e)),
          i
        );
      },
      inArray: function (e, t, i) {
        return t == null ? -1 : he.call(t, e, i);
      },
      isXMLDoc: function (e) {
        var t = e && e.namespaceURI,
          i = e && (e.ownerDocument || e).documentElement;
        return !Oe.test(t || (i && i.nodeName) || "HTML");
      },
      merge: function (e, t) {
        for (var i = +t.length, o = 0, r = e.length; o < i; o++) e[r++] = t[o];
        return (e.length = r), e;
      },
      grep: function (e, t, i) {
        for (var o = [], r = 0, l = e.length, c = !i; r < l; r++)
          !t(e[r], r) !== c && o.push(e[r]);
        return o;
      },
      map: function (e, t, i) {
        var o,
          r,
          l = 0,
          c = [];
        if (Je(e))
          for (o = e.length; l < o; l++)
            (r = t(e[l], l, i)) != null && c.push(r);
        else for (l in e) (r = t(e[l], l, i)) != null && c.push(r);
        return H(c);
      },
      guid: 1,
      support: D,
    }),
    typeof Symbol == "function" &&
      (s.fn[Symbol.iterator] = ye[Symbol.iterator]),
    s.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " ",
      ),
      function (e, t) {
        L["[object " + t + "]"] = t.toLowerCase();
      },
    );
  var Se = ye.pop,
    Ce = ye.sort,
    ge = ye.splice,
    ee = "[\\x20\\t\\r\\n\\f]",
    it = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g");
  s.contains = function (e, t) {
    var i = t && t.parentNode;
    return (
      e === i ||
      !(
        !i ||
        i.nodeType !== 1 ||
        !(e.contains
          ? e.contains(i)
          : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i))
      )
    );
  };
  var dn = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function qt(e, t) {
    return t
      ? e === "\0"
        ? "\uFFFD"
        : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " "
      : "\\" + e;
  }
  s.escapeSelector = function (e) {
    return (e + "").replace(dn, qt);
  };
  var ot = j,
    pn = ae;
  (function () {
    var e,
      t,
      i,
      o,
      r,
      l,
      c,
      d,
      h,
      m,
      b = pn,
      w = s.expando,
      v = 0,
      T = 0,
      U = ve(),
      G = ve(),
      J = ve(),
      we = ve(),
      Ee = function (u, g) {
        return u === g && (r = !0), 0;
      },
      ut =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ht =
        "(?:\\\\[\\da-fA-F]{1,6}" +
        ee +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      se =
        "\\[" +
        ee +
        "*(" +
        ht +
        ")(?:" +
        ee +
        "*([*^$|!~]?=)" +
        ee +
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` +
        ht +
        "))|)" +
        ee +
        "*\\]",
      dt =
        ":(" +
        ht +
        `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` +
        se +
        ")*)|.*)\\)|)",
      ce = new RegExp(ee + "+", "g"),
      me = new RegExp("^" + ee + "*," + ee + "*"),
      wt = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
      an = new RegExp(ee + "|>"),
      pt = new RegExp(dt),
      ln = new RegExp("^" + ht + "$"),
      xt = {
        ID: new RegExp("^#(" + ht + ")"),
        CLASS: new RegExp("^\\.(" + ht + ")"),
        TAG: new RegExp("^(" + ht + "|[*])"),
        ATTR: new RegExp("^" + se),
        PSEUDO: new RegExp("^" + dt),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            ee +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            ee +
            "*(?:([+-]|)" +
            ee +
            "*(\\d+)|))" +
            ee +
            "*\\)|)",
          "i",
        ),
        bool: new RegExp("^(?:" + ut + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            ee +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            ee +
            "*((?:-\\d)?\\d*)" +
            ee +
            "*\\)|)(?=[^-]|$)",
          "i",
        ),
      },
      qe = /^(?:input|select|textarea|button)$/i,
      Xt = /^h\d$/i,
      Ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      xe = /[+~]/,
      be = new RegExp(
        "\\\\[\\da-fA-F]{1,6}" + ee + "?|\\\\([^\\r\\n\\f])",
        "g",
      ),
      je = function (u, g) {
        var y = "0x" + u.slice(1) - 65536;
        return (
          g ||
          (y < 0
            ? String.fromCharCode(y + 65536)
            : String.fromCharCode((y >> 10) | 55296, (1023 & y) | 56320))
        );
      },
      Tt = function () {
        Nt();
      },
      Pe = kn(
        function (u) {
          return u.disabled === !0 && ne(u, "fieldset");
        },
        { dir: "parentNode", next: "legend" },
      );
    try {
      b.apply((ye = E.call(ot.childNodes)), ot.childNodes),
        ye[ot.childNodes.length].nodeType;
    } catch {
      b = {
        apply: function (g, y) {
          pn.apply(g, E.call(y));
        },
        call: function (g) {
          pn.apply(g, E.call(arguments, 1));
        },
      };
    }
    function X(u, g, y, _) {
      var x,
        P,
        I,
        B,
        $,
        re,
        K,
        te = g && g.ownerDocument,
        ue = g ? g.nodeType : 9;
      if (
        ((y = y || []),
        typeof u != "string" || !u || (ue !== 1 && ue !== 9 && ue !== 11))
      )
        return y;
      if (!_ && (Nt(g), (g = g || l), d)) {
        if (ue !== 11 && ($ = Ye.exec(u)))
          if ((x = $[1])) {
            if (ue === 9) {
              if (!(I = g.getElementById(x))) return y;
              if (I.id === x) return b.call(y, I), y;
            } else if (
              te &&
              (I = te.getElementById(x)) &&
              X.contains(g, I) &&
              I.id === x
            )
              return b.call(y, I), y;
          } else {
            if ($[2]) return b.apply(y, g.getElementsByTagName(u)), y;
            if ((x = $[3]) && g.getElementsByClassName)
              return b.apply(y, g.getElementsByClassName(x)), y;
          }
        if (!(we[u + " "] || (h && h.test(u)))) {
          if (((K = u), (te = g), ue === 1 && (an.test(u) || wt.test(u)))) {
            for (
              ((te = (xe.test(u) && oi(g.parentNode)) || g) == g && D.scope) ||
                ((B = g.getAttribute("id"))
                  ? (B = s.escapeSelector(B))
                  : g.setAttribute("id", (B = w))),
                P = (re = cn(u)).length;
              P--;

            )
              re[P] = (B ? "#" + B : ":scope") + " " + Cn(re[P]);
            K = re.join(",");
          }
          try {
            return b.apply(y, te.querySelectorAll(K)), y;
          } catch {
            we(u, !0);
          } finally {
            B === w && g.removeAttribute("id");
          }
        }
      }
      return On(u.replace(it, "$1"), g, y, _);
    }
    function ve() {
      var u = [];
      return function g(y, _) {
        return (
          u.push(y + " ") > t.cacheLength && delete g[u.shift()],
          (g[y + " "] = _)
        );
      };
    }
    function _e(u) {
      return (u[w] = !0), u;
    }
    function fe(u) {
      var g = l.createElement("fieldset");
      try {
        return !!u(g);
      } catch {
        return !1;
      } finally {
        g.parentNode && g.parentNode.removeChild(g), (g = null);
      }
    }
    function ft(u) {
      return function (g) {
        return ne(g, "input") && g.type === u;
      };
    }
    function Vt(u) {
      return function (g) {
        return (ne(g, "input") || ne(g, "button")) && g.type === u;
      };
    }
    function Dt(u) {
      return function (g) {
        return "form" in g
          ? g.parentNode && g.disabled === !1
            ? "label" in g
              ? "label" in g.parentNode
                ? g.parentNode.disabled === u
                : g.disabled === u
              : g.isDisabled === u || (g.isDisabled !== !u && Pe(g) === u)
            : g.disabled === u
          : "label" in g && g.disabled === u;
      };
    }
    function Be(u) {
      return _e(function (g) {
        return (
          (g = +g),
          _e(function (y, _) {
            for (var x, P = u([], y.length, g), I = P.length; I--; )
              y[(x = P[I])] && (y[x] = !(_[x] = y[x]));
          })
        );
      });
    }
    function oi(u) {
      return u && typeof u.getElementsByTagName < "u" && u;
    }
    function Nt(u) {
      var g,
        y = u ? u.ownerDocument || u : ot;
      return (
        y != l &&
          y.nodeType === 9 &&
          y.documentElement &&
          ((c = (l = y).documentElement),
          (d = !s.isXMLDoc(l)),
          (m = c.matches || c.webkitMatchesSelector || c.msMatchesSelector),
          c.msMatchesSelector &&
            ot != l &&
            (g = l.defaultView) &&
            g.top !== g &&
            g.addEventListener("unload", Tt),
          (D.getById = fe(function (_) {
            return (
              (c.appendChild(_).id = s.expando),
              !l.getElementsByName || !l.getElementsByName(s.expando).length
            );
          })),
          (D.disconnectedMatch = fe(function (_) {
            return m.call(_, "*");
          })),
          (D.scope = fe(function () {
            return l.querySelectorAll(":scope");
          })),
          (D.cssHas = fe(function () {
            try {
              return l.querySelector(":has(*,:jqfake)"), !1;
            } catch {
              return !0;
            }
          })),
          D.getById
            ? ((t.filter.ID = function (_) {
                var x = _.replace(be, je);
                return function (P) {
                  return P.getAttribute("id") === x;
                };
              }),
              (t.find.ID = function (_, x) {
                if (typeof x.getElementById < "u" && d) {
                  var P = x.getElementById(_);
                  return P ? [P] : [];
                }
              }))
            : ((t.filter.ID = function (_) {
                var x = _.replace(be, je);
                return function (P) {
                  var I =
                    typeof P.getAttributeNode < "u" && P.getAttributeNode("id");
                  return I && I.value === x;
                };
              }),
              (t.find.ID = function (_, x) {
                if (typeof x.getElementById < "u" && d) {
                  var P,
                    I,
                    B,
                    $ = x.getElementById(_);
                  if ($) {
                    if ((P = $.getAttributeNode("id")) && P.value === _)
                      return [$];
                    for (B = x.getElementsByName(_), I = 0; ($ = B[I++]); )
                      if ((P = $.getAttributeNode("id")) && P.value === _)
                        return [$];
                  }
                  return [];
                }
              })),
          (t.find.TAG = function (_, x) {
            return typeof x.getElementsByTagName < "u"
              ? x.getElementsByTagName(_)
              : x.querySelectorAll(_);
          }),
          (t.find.CLASS = function (_, x) {
            if (typeof x.getElementsByClassName < "u" && d)
              return x.getElementsByClassName(_);
          }),
          (h = []),
          fe(function (_) {
            var x;
            (c.appendChild(_).innerHTML =
              "<a id='" +
              w +
              "' href='' disabled='disabled'></a><select id='" +
              w +
              "-\r\\' disabled='disabled'><option selected=''></option></select>"),
              _.querySelectorAll("[selected]").length ||
                h.push("\\[" + ee + "*(?:value|" + ut + ")"),
              _.querySelectorAll("[id~=" + w + "-]").length || h.push("~="),
              _.querySelectorAll("a#" + w + "+*").length || h.push(".#.+[+~]"),
              _.querySelectorAll(":checked").length || h.push(":checked"),
              (x = l.createElement("input")).setAttribute("type", "hidden"),
              _.appendChild(x).setAttribute("name", "D"),
              (c.appendChild(_).disabled = !0),
              _.querySelectorAll(":disabled").length !== 2 &&
                h.push(":enabled", ":disabled"),
              (x = l.createElement("input")).setAttribute("name", ""),
              _.appendChild(x),
              _.querySelectorAll("[name='']").length ||
                h.push("\\[" + ee + "*name" + ee + "*=" + ee + `*(?:''|"")`);
          }),
          D.cssHas || h.push(":has"),
          (h = h.length && new RegExp(h.join("|"))),
          (Ee = function (_, x) {
            if (_ === x) return (r = !0), 0;
            var P = !_.compareDocumentPosition - !x.compareDocumentPosition;
            return (
              P ||
              (1 &
                (P =
                  (_.ownerDocument || _) == (x.ownerDocument || x)
                    ? _.compareDocumentPosition(x)
                    : 1) ||
              (!D.sortDetached && x.compareDocumentPosition(_) === P)
                ? _ === l || (_.ownerDocument == ot && X.contains(ot, _))
                  ? -1
                  : x === l || (x.ownerDocument == ot && X.contains(ot, x))
                    ? 1
                    : o
                      ? he.call(o, _) - he.call(o, x)
                      : 0
                : 4 & P
                  ? -1
                  : 1)
            );
          })),
        l
      );
    }
    for (e in ((X.matches = function (u, g) {
      return X(u, null, null, g);
    }),
    (X.matchesSelector = function (u, g) {
      if ((Nt(u), d && !we[g + " "] && (!h || !h.test(g))))
        try {
          var y = m.call(u, g);
          if (
            y ||
            D.disconnectedMatch ||
            (u.document && u.document.nodeType !== 11)
          )
            return y;
        } catch {
          we(g, !0);
        }
      return 0 < X(g, l, null, [u]).length;
    }),
    (X.contains = function (u, g) {
      return (u.ownerDocument || u) != l && Nt(u), s.contains(u, g);
    }),
    (X.attr = function (u, g) {
      (u.ownerDocument || u) != l && Nt(u);
      var y = t.attrHandle[g.toLowerCase()],
        _ = y && Y.call(t.attrHandle, g.toLowerCase()) ? y(u, g, !d) : void 0;
      return _ !== void 0 ? _ : u.getAttribute(g);
    }),
    (X.error = function (u) {
      throw new Error("Syntax error, unrecognized expression: " + u);
    }),
    (s.uniqueSort = function (u) {
      var g,
        y = [],
        _ = 0,
        x = 0;
      if (
        ((r = !D.sortStable),
        (o = !D.sortStable && E.call(u, 0)),
        Ce.call(u, Ee),
        r)
      ) {
        for (; (g = u[x++]); ) g === u[x] && (_ = y.push(x));
        for (; _--; ) ge.call(u, y[_], 1);
      }
      return (o = null), u;
    }),
    (s.fn.uniqueSort = function () {
      return this.pushStack(s.uniqueSort(E.apply(this)));
    }),
    ((t = s.expr =
      {
        cacheLength: 50,
        createPseudo: _e,
        match: xt,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (u) {
            return (
              (u[1] = u[1].replace(be, je)),
              (u[3] = (u[3] || u[4] || u[5] || "").replace(be, je)),
              u[2] === "~=" && (u[3] = " " + u[3] + " "),
              u.slice(0, 4)
            );
          },
          CHILD: function (u) {
            return (
              (u[1] = u[1].toLowerCase()),
              u[1].slice(0, 3) === "nth"
                ? (u[3] || X.error(u[0]),
                  (u[4] = +(u[4]
                    ? u[5] + (u[6] || 1)
                    : 2 * (u[3] === "even" || u[3] === "odd"))),
                  (u[5] = +(u[7] + u[8] || u[3] === "odd")))
                : u[3] && X.error(u[0]),
              u
            );
          },
          PSEUDO: function (u) {
            var g,
              y = !u[6] && u[2];
            return xt.CHILD.test(u[0])
              ? null
              : (u[3]
                  ? (u[2] = u[4] || u[5] || "")
                  : y &&
                    pt.test(y) &&
                    (g = cn(y, !0)) &&
                    (g = y.indexOf(")", y.length - g) - y.length) &&
                    ((u[0] = u[0].slice(0, g)), (u[2] = y.slice(0, g))),
                u.slice(0, 3));
          },
        },
        filter: {
          TAG: function (u) {
            var g = u.replace(be, je).toLowerCase();
            return u === "*"
              ? function () {
                  return !0;
                }
              : function (y) {
                  return ne(y, g);
                };
          },
          CLASS: function (u) {
            var g = U[u + " "];
            return (
              g ||
              ((g = new RegExp("(^|" + ee + ")" + u + "(" + ee + "|$)")) &&
                U(u, function (y) {
                  return g.test(
                    (typeof y.className == "string" && y.className) ||
                      (typeof y.getAttribute < "u" &&
                        y.getAttribute("class")) ||
                      "",
                  );
                }))
            );
          },
          ATTR: function (u, g, y) {
            return function (_) {
              var x = X.attr(_, u);
              return x == null
                ? g === "!="
                : !g ||
                    ((x += ""),
                    g === "="
                      ? x === y
                      : g === "!="
                        ? x !== y
                        : g === "^="
                          ? y && x.indexOf(y) === 0
                          : g === "*="
                            ? y && -1 < x.indexOf(y)
                            : g === "$="
                              ? y && x.slice(-y.length) === y
                              : g === "~="
                                ? -1 <
                                  (" " + x.replace(ce, " ") + " ").indexOf(y)
                                : g === "|=" &&
                                  (x === y ||
                                    x.slice(0, y.length + 1) === y + "-"));
            };
          },
          CHILD: function (u, g, y, _, x) {
            var P = u.slice(0, 3) !== "nth",
              I = u.slice(-4) !== "last",
              B = g === "of-type";
            return _ === 1 && x === 0
              ? function ($) {
                  return !!$.parentNode;
                }
              : function ($, re, K) {
                  var te,
                    ue,
                    Q,
                    ke,
                    Le,
                    Ae = P !== I ? "nextSibling" : "previousSibling",
                    Re = $.parentNode,
                    We = B && $.nodeName.toLowerCase(),
                    Qe = !K && !B,
                    pe = !1;
                  if (Re) {
                    if (P) {
                      for (; Ae; ) {
                        for (Q = $; (Q = Q[Ae]); )
                          if (B ? ne(Q, We) : Q.nodeType === 1) return !1;
                        Le = Ae = u === "only" && !Le && "nextSibling";
                      }
                      return !0;
                    }
                    if (((Le = [I ? Re.firstChild : Re.lastChild]), I && Qe)) {
                      for (
                        pe =
                          (ke =
                            (te = (ue = Re[w] || (Re[w] = {}))[u] || [])[0] ===
                              v && te[1]) && te[2],
                          Q = ke && Re.childNodes[ke];
                        (Q = (++ke && Q && Q[Ae]) || (pe = ke = 0) || Le.pop());

                      )
                        if (Q.nodeType === 1 && ++pe && Q === $) {
                          ue[u] = [v, ke, pe];
                          break;
                        }
                    } else if (
                      (Qe &&
                        (pe = ke =
                          (te = (ue = $[w] || ($[w] = {}))[u] || [])[0] === v &&
                          te[1]),
                      pe === !1)
                    )
                      for (
                        ;
                        (Q =
                          (++ke && Q && Q[Ae]) || (pe = ke = 0) || Le.pop()) &&
                        !(
                          (B ? ne(Q, We) : Q.nodeType === 1) &&
                          ++pe &&
                          (Qe && ((ue = Q[w] || (Q[w] = {}))[u] = [v, pe]),
                          Q === $)
                        );

                      );
                    return (pe -= x) === _ || (pe % _ == 0 && 0 <= pe / _);
                  }
                };
          },
          PSEUDO: function (u, g) {
            var y,
              _ =
                t.pseudos[u] ||
                t.setFilters[u.toLowerCase()] ||
                X.error("unsupported pseudo: " + u);
            return _[w]
              ? _(g)
              : 1 < _.length
                ? ((y = [u, u, "", g]),
                  t.setFilters.hasOwnProperty(u.toLowerCase())
                    ? _e(function (x, P) {
                        for (var I, B = _(x, g), $ = B.length; $--; )
                          x[(I = he.call(x, B[$]))] = !(P[I] = B[$]);
                      })
                    : function (x) {
                        return _(x, 0, y);
                      })
                : _;
          },
        },
        pseudos: {
          not: _e(function (u) {
            var g = [],
              y = [],
              _ = Sn(u.replace(it, "$1"));
            return _[w]
              ? _e(function (x, P, I, B) {
                  for (var $, re = _(x, null, B, []), K = x.length; K--; )
                    ($ = re[K]) && (x[K] = !(P[K] = $));
                })
              : function (x, P, I) {
                  return (g[0] = x), _(g, null, I, y), (g[0] = null), !y.pop();
                };
          }),
          has: _e(function (u) {
            return function (g) {
              return 0 < X(u, g).length;
            };
          }),
          contains: _e(function (u) {
            return (
              (u = u.replace(be, je)),
              function (g) {
                return -1 < (g.textContent || s.text(g)).indexOf(u);
              }
            );
          }),
          lang: _e(function (u) {
            return (
              ln.test(u || "") || X.error("unsupported lang: " + u),
              (u = u.replace(be, je).toLowerCase()),
              function (g) {
                var y;
                do
                  if (
                    (y = d
                      ? g.lang
                      : g.getAttribute("xml:lang") || g.getAttribute("lang"))
                  )
                    return (
                      (y = y.toLowerCase()) === u || y.indexOf(u + "-") === 0
                    );
                while ((g = g.parentNode) && g.nodeType === 1);
                return !1;
              }
            );
          }),
          target: function (u) {
            var g = A.location && A.location.hash;
            return g && g.slice(1) === u.id;
          },
          root: function (u) {
            return u === c;
          },
          focus: function (u) {
            return (
              u ===
                (function () {
                  try {
                    return l.activeElement;
                  } catch {}
                })() &&
              l.hasFocus() &&
              !!(u.type || u.href || ~u.tabIndex)
            );
          },
          enabled: Dt(!1),
          disabled: Dt(!0),
          checked: function (u) {
            return (
              (ne(u, "input") && !!u.checked) ||
              (ne(u, "option") && !!u.selected)
            );
          },
          selected: function (u) {
            return (
              u.parentNode && u.parentNode.selectedIndex, u.selected === !0
            );
          },
          empty: function (u) {
            for (u = u.firstChild; u; u = u.nextSibling)
              if (u.nodeType < 6) return !1;
            return !0;
          },
          parent: function (u) {
            return !t.pseudos.empty(u);
          },
          header: function (u) {
            return Xt.test(u.nodeName);
          },
          input: function (u) {
            return qe.test(u.nodeName);
          },
          button: function (u) {
            return (ne(u, "input") && u.type === "button") || ne(u, "button");
          },
          text: function (u) {
            var g;
            return (
              ne(u, "input") &&
              u.type === "text" &&
              ((g = u.getAttribute("type")) == null ||
                g.toLowerCase() === "text")
            );
          },
          first: Be(function () {
            return [0];
          }),
          last: Be(function (u, g) {
            return [g - 1];
          }),
          eq: Be(function (u, g, y) {
            return [y < 0 ? y + g : y];
          }),
          even: Be(function (u, g) {
            for (var y = 0; y < g; y += 2) u.push(y);
            return u;
          }),
          odd: Be(function (u, g) {
            for (var y = 1; y < g; y += 2) u.push(y);
            return u;
          }),
          lt: Be(function (u, g, y) {
            var _;
            for (_ = y < 0 ? y + g : g < y ? g : y; 0 <= --_; ) u.push(_);
            return u;
          }),
          gt: Be(function (u, g, y) {
            for (var _ = y < 0 ? y + g : y; ++_ < g; ) u.push(_);
            return u;
          }),
        },
      }).pseudos.nth = t.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      t.pseudos[e] = ft(e);
    for (e in { submit: !0, reset: !0 }) t.pseudos[e] = Vt(e);
    function Pi() {}
    function cn(u, g) {
      var y,
        _,
        x,
        P,
        I,
        B,
        $,
        re = G[u + " "];
      if (re) return g ? 0 : re.slice(0);
      for (I = u, B = [], $ = t.preFilter; I; ) {
        for (P in ((y && !(_ = me.exec(I))) ||
          (_ && (I = I.slice(_[0].length) || I), B.push((x = []))),
        (y = !1),
        (_ = wt.exec(I)) &&
          ((y = _.shift()),
          x.push({ value: y, type: _[0].replace(it, " ") }),
          (I = I.slice(y.length))),
        t.filter))
          !(_ = xt[P].exec(I)) ||
            ($[P] && !(_ = $[P](_))) ||
            ((y = _.shift()),
            x.push({ value: y, type: P, matches: _ }),
            (I = I.slice(y.length)));
        if (!y) break;
      }
      return g ? I.length : I ? X.error(u) : G(u, B).slice(0);
    }
    function Cn(u) {
      for (var g = 0, y = u.length, _ = ""; g < y; g++) _ += u[g].value;
      return _;
    }
    function kn(u, g, y) {
      var _ = g.dir,
        x = g.next,
        P = x || _,
        I = y && P === "parentNode",
        B = T++;
      return g.first
        ? function ($, re, K) {
            for (; ($ = $[_]); ) if ($.nodeType === 1 || I) return u($, re, K);
            return !1;
          }
        : function ($, re, K) {
            var te,
              ue,
              Q = [v, B];
            if (K) {
              for (; ($ = $[_]); )
                if (($.nodeType === 1 || I) && u($, re, K)) return !0;
            } else
              for (; ($ = $[_]); )
                if ($.nodeType === 1 || I)
                  if (((ue = $[w] || ($[w] = {})), x && ne($, x)))
                    $ = $[_] || $;
                  else {
                    if ((te = ue[P]) && te[0] === v && te[1] === B)
                      return (Q[2] = te[2]);
                    if (((ue[P] = Q)[2] = u($, re, K))) return !0;
                  }
            return !1;
          };
    }
    function si(u) {
      return 1 < u.length
        ? function (g, y, _) {
            for (var x = u.length; x--; ) if (!u[x](g, y, _)) return !1;
            return !0;
          }
        : u[0];
    }
    function En(u, g, y, _, x) {
      for (var P, I = [], B = 0, $ = u.length, re = g != null; B < $; B++)
        (P = u[B]) && ((y && !y(P, _, x)) || (I.push(P), re && g.push(B)));
      return I;
    }
    function An(u, g, y, _, x, P) {
      return (
        _ && !_[w] && (_ = An(_)),
        x && !x[w] && (x = An(x, P)),
        _e(function (I, B, $, re) {
          var K,
            te,
            ue,
            Q,
            ke = [],
            Le = [],
            Ae = B.length,
            Re =
              I ||
              (function (Qe, pe, gt) {
                for (var tt = 0, Ln = pe.length; tt < Ln; tt++)
                  X(Qe, pe[tt], gt);
                return gt;
              })(g || "*", $.nodeType ? [$] : $, []),
            We = !u || (!I && g) ? Re : En(Re, ke, u, $, re);
          if (
            (y ? y(We, (Q = x || (I ? u : Ae || _) ? [] : B), $, re) : (Q = We),
            _)
          )
            for (K = En(Q, Le), _(K, [], $, re), te = K.length; te--; )
              (ue = K[te]) && (Q[Le[te]] = !(We[Le[te]] = ue));
          if (I) {
            if (x || u) {
              if (x) {
                for (K = [], te = Q.length; te--; )
                  (ue = Q[te]) && K.push((We[te] = ue));
                x(null, (Q = []), K, re);
              }
              for (te = Q.length; te--; )
                (ue = Q[te]) &&
                  -1 < (K = x ? he.call(I, ue) : ke[te]) &&
                  (I[K] = !(B[K] = ue));
            }
          } else
            (Q = En(Q === B ? Q.splice(Ae, Q.length) : Q)),
              x ? x(null, B, Q, re) : b.apply(B, Q);
        })
      );
    }
    function ri(u) {
      for (
        var g,
          y,
          _,
          x = u.length,
          P = t.relative[u[0].type],
          I = P || t.relative[" "],
          B = P ? 1 : 0,
          $ = kn(
            function (te) {
              return te === g;
            },
            I,
            !0,
          ),
          re = kn(
            function (te) {
              return -1 < he.call(g, te);
            },
            I,
            !0,
          ),
          K = [
            function (te, ue, Q) {
              var ke =
                (!P && (Q || ue != i)) ||
                ((g = ue).nodeType ? $(te, ue, Q) : re(te, ue, Q));
              return (g = null), ke;
            },
          ];
        B < x;
        B++
      )
        if ((y = t.relative[u[B].type])) K = [kn(si(K), y)];
        else {
          if ((y = t.filter[u[B].type].apply(null, u[B].matches))[w]) {
            for (_ = ++B; _ < x && !t.relative[u[_].type]; _++);
            return An(
              1 < B && si(K),
              1 < B &&
                Cn(
                  u
                    .slice(0, B - 1)
                    .concat({ value: u[B - 2].type === " " ? "*" : "" }),
                ).replace(it, "$1"),
              y,
              B < _ && ri(u.slice(B, _)),
              _ < x && ri((u = u.slice(_))),
              _ < x && Cn(u),
            );
          }
          K.push(y);
        }
      return si(K);
    }
    function Sn(u, g) {
      var y,
        _,
        x,
        P,
        I,
        B,
        $ = [],
        re = [],
        K = J[u + " "];
      if (!K) {
        for (g || (g = cn(u)), y = g.length; y--; )
          (K = ri(g[y]))[w] ? $.push(K) : re.push(K);
        (K = J(
          u,
          ((_ = re),
          (P = 0 < (x = $).length),
          (I = 0 < _.length),
          (B = function (te, ue, Q, ke, Le) {
            var Ae,
              Re,
              We,
              Qe = 0,
              pe = "0",
              gt = te && [],
              tt = [],
              Ln = i,
              Kt = te || (I && t.find.TAG("*", Le)),
              p = (v += Ln == null ? 1 : Math.random() || 0.1),
              n = Kt.length;
            for (
              Le && (i = ue == l || ue || Le);
              pe !== n && (Ae = Kt[pe]) != null;
              pe++
            ) {
              if (I && Ae) {
                for (
                  Re = 0, ue || Ae.ownerDocument == l || (Nt(Ae), (Q = !d));
                  (We = _[Re++]);

                )
                  if (We(Ae, ue || l, Q)) {
                    b.call(ke, Ae);
                    break;
                  }
                Le && (v = p);
              }
              P && ((Ae = !We && Ae) && Qe--, te && gt.push(Ae));
            }
            if (((Qe += pe), P && pe !== Qe)) {
              for (Re = 0; (We = x[Re++]); ) We(gt, tt, ue, Q);
              if (te) {
                if (0 < Qe)
                  for (; pe--; ) gt[pe] || tt[pe] || (tt[pe] = Se.call(ke));
                tt = En(tt);
              }
              b.apply(ke, tt),
                Le &&
                  !te &&
                  0 < tt.length &&
                  1 < Qe + x.length &&
                  s.uniqueSort(ke);
            }
            return Le && ((v = p), (i = Ln)), gt;
          }),
          P ? _e(B) : B),
        )).selector = u;
      }
      return K;
    }
    function On(u, g, y, _) {
      var x,
        P,
        I,
        B,
        $,
        re = typeof u == "function" && u,
        K = !_ && cn((u = re.selector || u));
      if (((y = y || []), K.length === 1)) {
        if (
          2 < (P = K[0] = K[0].slice(0)).length &&
          (I = P[0]).type === "ID" &&
          g.nodeType === 9 &&
          d &&
          t.relative[P[1].type]
        ) {
          if (!(g = (t.find.ID(I.matches[0].replace(be, je), g) || [])[0]))
            return y;
          re && (g = g.parentNode), (u = u.slice(P.shift().value.length));
        }
        for (
          x = xt.needsContext.test(u) ? 0 : P.length;
          x-- && ((I = P[x]), !t.relative[(B = I.type)]);

        )
          if (
            ($ = t.find[B]) &&
            (_ = $(
              I.matches[0].replace(be, je),
              (xe.test(P[0].type) && oi(g.parentNode)) || g,
            ))
          ) {
            if ((P.splice(x, 1), !(u = _.length && Cn(P))))
              return b.apply(y, _), y;
            break;
          }
      }
      return (
        (re || Sn(u, K))(
          _,
          g,
          !d,
          y,
          !g || (xe.test(u) && oi(g.parentNode)) || g,
        ),
        y
      );
    }
    (Pi.prototype = t.filters = t.pseudos),
      (t.setFilters = new Pi()),
      (D.sortStable = w.split("").sort(Ee).join("") === w),
      Nt(),
      (D.sortDetached = fe(function (u) {
        return 1 & u.compareDocumentPosition(l.createElement("fieldset"));
      })),
      (s.find = X),
      (s.expr[":"] = s.expr.pseudos),
      (s.unique = s.uniqueSort),
      (X.compile = Sn),
      (X.select = On),
      (X.setDocument = Nt),
      (X.tokenize = cn),
      (X.escape = s.escapeSelector),
      (X.getText = s.text),
      (X.isXML = s.isXMLDoc),
      (X.selectors = s.expr),
      (X.support = s.support),
      (X.uniqueSort = s.uniqueSort);
  })();
  var Et = function (e, t, i) {
      for (var o = [], r = i !== void 0; (e = e[t]) && e.nodeType !== 9; )
        if (e.nodeType === 1) {
          if (r && s(e).is(i)) break;
          o.push(e);
        }
      return o;
    },
    li = function (e, t) {
      for (var i = []; e; e = e.nextSibling)
        e.nodeType === 1 && e !== t && i.push(e);
      return i;
    },
    Dn = s.expr.match.needsContext,
    k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function Yt(e, t, i) {
    return q(t)
      ? s.grep(e, function (o, r) {
          return !!t.call(o, r, o) !== i;
        })
      : t.nodeType
        ? s.grep(e, function (o) {
            return (o === t) !== i;
          })
        : typeof t != "string"
          ? s.grep(e, function (o) {
              return -1 < he.call(t, o) !== i;
            })
          : s.filter(t, e, i);
  }
  (s.filter = function (e, t, i) {
    var o = t[0];
    return (
      i && (e = ":not(" + e + ")"),
      t.length === 1 && o.nodeType === 1
        ? s.find.matchesSelector(o, e)
          ? [o]
          : []
        : s.find.matches(
            e,
            s.grep(t, function (r) {
              return r.nodeType === 1;
            }),
          )
    );
  }),
    s.fn.extend({
      find: function (e) {
        var t,
          i,
          o = this.length,
          r = this;
        if (typeof e != "string")
          return this.pushStack(
            s(e).filter(function () {
              for (t = 0; t < o; t++) if (s.contains(r[t], this)) return !0;
            }),
          );
        for (i = this.pushStack([]), t = 0; t < o; t++) s.find(e, r[t], i);
        return 1 < o ? s.uniqueSort(i) : i;
      },
      filter: function (e) {
        return this.pushStack(Yt(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(Yt(this, e || [], !0));
      },
      is: function (e) {
        return !!Yt(
          this,
          typeof e == "string" && Dn.test(e) ? s(e) : e || [],
          !1,
        ).length;
      },
    });
  var Nn,
    jn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((s.fn.init = function (e, t, i) {
    var o, r;
    if (!e) return this;
    if (((i = i || Nn), typeof e == "string")) {
      if (
        !(o =
          e[0] === "<" && e[e.length - 1] === ">" && 3 <= e.length
            ? [null, e, null]
            : jn.exec(e)) ||
        (!o[1] && t)
      )
        return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
      if (o[1]) {
        if (
          ((t = t instanceof s ? t[0] : t),
          s.merge(
            this,
            s.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : j, !0),
          ),
          k.test(o[1]) && s.isPlainObject(t))
        )
          for (o in t) q(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
        return this;
      }
      return (
        (r = j.getElementById(o[2])) && ((this[0] = r), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : q(e)
        ? i.ready !== void 0
          ? i.ready(e)
          : e(s)
        : s.makeArray(e, this);
  }).prototype = s.fn),
    (Nn = s(j));
  var mt = /^(?:parents|prev(?:Until|All))/,
    Qt = { children: !0, contents: !0, next: !0, prev: !0 };
  function ze(e, t) {
    for (; (e = e[t]) && e.nodeType !== 1; );
    return e;
  }
  s.fn.extend({
    has: function (e) {
      var t = s(e, this),
        i = t.length;
      return this.filter(function () {
        for (var o = 0; o < i; o++) if (s.contains(this, t[o])) return !0;
      });
    },
    closest: function (e, t) {
      var i,
        o = 0,
        r = this.length,
        l = [],
        c = typeof e != "string" && s(e);
      if (!Dn.test(e)) {
        for (; o < r; o++)
          for (i = this[o]; i && i !== t; i = i.parentNode)
            if (
              i.nodeType < 11 &&
              (c
                ? -1 < c.index(i)
                : i.nodeType === 1 && s.find.matchesSelector(i, e))
            ) {
              l.push(i);
              break;
            }
      }
      return this.pushStack(1 < l.length ? s.uniqueSort(l) : l);
    },
    index: function (e) {
      return e
        ? typeof e == "string"
          ? he.call(s(e), this[0])
          : he.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
    },
    add: function (e, t) {
      return this.pushStack(s.uniqueSort(s.merge(this.get(), s(e, t))));
    },
    addBack: function (e) {
      return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    s.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && t.nodeType !== 11 ? t : null;
        },
        parents: function (e) {
          return Et(e, "parentNode");
        },
        parentsUntil: function (e, t, i) {
          return Et(e, "parentNode", i);
        },
        next: function (e) {
          return ze(e, "nextSibling");
        },
        prev: function (e) {
          return ze(e, "previousSibling");
        },
        nextAll: function (e) {
          return Et(e, "nextSibling");
        },
        prevAll: function (e) {
          return Et(e, "previousSibling");
        },
        nextUntil: function (e, t, i) {
          return Et(e, "nextSibling", i);
        },
        prevUntil: function (e, t, i) {
          return Et(e, "previousSibling", i);
        },
        siblings: function (e) {
          return li((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return li(e.firstChild);
        },
        contents: function (e) {
          return e.contentDocument != null && S(e.contentDocument)
            ? e.contentDocument
            : (ne(e, "template") && (e = e.content || e),
              s.merge([], e.childNodes));
        },
      },
      function (e, t) {
        s.fn[e] = function (i, o) {
          var r = s.map(this, t, i);
          return (
            e.slice(-5) !== "Until" && (o = i),
            o && typeof o == "string" && (r = s.filter(o, r)),
            1 < this.length &&
              (Qt[e] || s.uniqueSort(r), mt.test(e) && r.reverse()),
            this.pushStack(r)
          );
        };
      },
    );
  var Ue = /[^\x20\t\r\n\f]+/g;
  function z(e) {
    return e;
  }
  function jt(e) {
    throw e;
  }
  function Pn(e, t, i, o) {
    var r;
    try {
      e && q((r = e.promise))
        ? r.call(e).done(t).fail(i)
        : e && q((r = e.then))
          ? r.call(e, t, i)
          : t.apply(void 0, [e].slice(o));
    } catch (l) {
      i.apply(void 0, [l]);
    }
  }
  (s.Callbacks = function (e) {
    var t, i;
    e =
      typeof e == "string"
        ? ((t = e),
          (i = {}),
          s.each(t.match(Ue) || [], function (v, T) {
            i[T] = !0;
          }),
          i)
        : s.extend({}, e);
    var o,
      r,
      l,
      c,
      d = [],
      h = [],
      m = -1,
      b = function () {
        for (c = c || e.once, l = o = !0; h.length; m = -1)
          for (r = h.shift(); ++m < d.length; )
            d[m].apply(r[0], r[1]) === !1 &&
              e.stopOnFalse &&
              ((m = d.length), (r = !1));
        e.memory || (r = !1), (o = !1), c && (d = r ? [] : "");
      },
      w = {
        add: function () {
          return (
            d &&
              (r && !o && ((m = d.length - 1), h.push(r)),
              (function v(T) {
                s.each(T, function (U, G) {
                  q(G)
                    ? (e.unique && w.has(G)) || d.push(G)
                    : G && G.length && oe(G) !== "string" && v(G);
                });
              })(arguments),
              r && !o && b()),
            this
          );
        },
        remove: function () {
          return (
            s.each(arguments, function (v, T) {
              for (var U; -1 < (U = s.inArray(T, d, U)); )
                d.splice(U, 1), U <= m && m--;
            }),
            this
          );
        },
        has: function (v) {
          return v ? -1 < s.inArray(v, d) : 0 < d.length;
        },
        empty: function () {
          return d && (d = []), this;
        },
        disable: function () {
          return (c = h = []), (d = r = ""), this;
        },
        disabled: function () {
          return !d;
        },
        lock: function () {
          return (c = h = []), r || o || (d = r = ""), this;
        },
        locked: function () {
          return !!c;
        },
        fireWith: function (v, T) {
          return (
            c ||
              ((T = [v, (T = T || []).slice ? T.slice() : T]),
              h.push(T),
              o || b()),
            this
          );
        },
        fire: function () {
          return w.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!l;
        },
      };
    return w;
  }),
    s.extend({
      Deferred: function (e) {
        var t = [
            [
              "notify",
              "progress",
              s.Callbacks("memory"),
              s.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              s.Callbacks("once memory"),
              s.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              s.Callbacks("once memory"),
              s.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          i = "pending",
          o = {
            state: function () {
              return i;
            },
            always: function () {
              return r.done(arguments).fail(arguments), this;
            },
            catch: function (l) {
              return o.then(null, l);
            },
            pipe: function () {
              var l = arguments;
              return s
                .Deferred(function (c) {
                  s.each(t, function (d, h) {
                    var m = q(l[h[4]]) && l[h[4]];
                    r[h[1]](function () {
                      var b = m && m.apply(this, arguments);
                      b && q(b.promise)
                        ? b
                            .promise()
                            .progress(c.notify)
                            .done(c.resolve)
                            .fail(c.reject)
                        : c[h[0] + "With"](this, m ? [b] : arguments);
                    });
                  }),
                    (l = null);
                })
                .promise();
            },
            then: function (l, c, d) {
              var h = 0;
              function m(b, w, v, T) {
                return function () {
                  var U = this,
                    G = arguments,
                    J = function () {
                      var Ee, ut;
                      if (!(b < h)) {
                        if ((Ee = v.apply(U, G)) === w.promise())
                          throw new TypeError("Thenable self-resolution");
                        (ut =
                          Ee &&
                          (typeof Ee == "object" || typeof Ee == "function") &&
                          Ee.then),
                          q(ut)
                            ? T
                              ? ut.call(Ee, m(h, w, z, T), m(h, w, jt, T))
                              : (h++,
                                ut.call(
                                  Ee,
                                  m(h, w, z, T),
                                  m(h, w, jt, T),
                                  m(h, w, z, w.notifyWith),
                                ))
                            : (v !== z && ((U = void 0), (G = [Ee])),
                              (T || w.resolveWith)(U, G));
                      }
                    },
                    we = T
                      ? J
                      : function () {
                          try {
                            J();
                          } catch (Ee) {
                            s.Deferred.exceptionHook &&
                              s.Deferred.exceptionHook(Ee, we.error),
                              h <= b + 1 &&
                                (v !== jt && ((U = void 0), (G = [Ee])),
                                w.rejectWith(U, G));
                          }
                        };
                  b
                    ? we()
                    : (s.Deferred.getErrorHook
                        ? (we.error = s.Deferred.getErrorHook())
                        : s.Deferred.getStackHook &&
                          (we.error = s.Deferred.getStackHook()),
                      A.setTimeout(we));
                };
              }
              return s
                .Deferred(function (b) {
                  t[0][3].add(m(0, b, q(d) ? d : z, b.notifyWith)),
                    t[1][3].add(m(0, b, q(l) ? l : z)),
                    t[2][3].add(m(0, b, q(c) ? c : jt));
                })
                .promise();
            },
            promise: function (l) {
              return l != null ? s.extend(l, o) : o;
            },
          },
          r = {};
        return (
          s.each(t, function (l, c) {
            var d = c[2],
              h = c[5];
            (o[c[1]] = d.add),
              h &&
                d.add(
                  function () {
                    i = h;
                  },
                  t[3 - l][2].disable,
                  t[3 - l][3].disable,
                  t[0][2].lock,
                  t[0][3].lock,
                ),
              d.add(c[3].fire),
              (r[c[0]] = function () {
                return (
                  r[c[0] + "With"](this === r ? void 0 : this, arguments), this
                );
              }),
              (r[c[0] + "With"] = d.fireWith);
          }),
          o.promise(r),
          e && e.call(r, r),
          r
        );
      },
      when: function (e) {
        var t = arguments.length,
          i = t,
          o = Array(i),
          r = E.call(arguments),
          l = s.Deferred(),
          c = function (d) {
            return function (h) {
              (o[d] = this),
                (r[d] = 1 < arguments.length ? E.call(arguments) : h),
                --t || l.resolveWith(o, r);
            };
          };
        if (
          t <= 1 &&
          (Pn(e, l.done(c(i)).resolve, l.reject, !t),
          l.state() === "pending" || q(r[i] && r[i].then))
        )
          return l.then();
        for (; i--; ) Pn(r[i], c(i), l.reject);
        return l.promise();
      },
    });
  var $i = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (s.Deferred.exceptionHook = function (e, t) {
    A.console &&
      A.console.warn &&
      e &&
      $i.test(e.name) &&
      A.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }),
    (s.readyException = function (e) {
      A.setTimeout(function () {
        throw e;
      });
    });
  var In = s.Deferred();
  function At() {
    j.removeEventListener("DOMContentLoaded", At),
      A.removeEventListener("load", At),
      s.ready();
  }
  (s.fn.ready = function (e) {
    return (
      In.then(e).catch(function (t) {
        s.readyException(t);
      }),
      this
    );
  }),
    s.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (e === !0 ? --s.readyWait : s.isReady) ||
          ((s.isReady = !0) !== e && 0 < --s.readyWait) ||
          In.resolveWith(j, [s]);
      },
    }),
    (s.ready.then = In.then),
    j.readyState === "complete" ||
    (j.readyState !== "loading" && !j.documentElement.doScroll)
      ? A.setTimeout(s.ready)
      : (j.addEventListener("DOMContentLoaded", At),
        A.addEventListener("load", At));
  var st = function (e, t, i, o, r, l, c) {
      var d = 0,
        h = e.length,
        m = i == null;
      if (oe(i) === "object")
        for (d in ((r = !0), i)) st(e, t, d, i[d], !0, l, c);
      else if (
        o !== void 0 &&
        ((r = !0),
        q(o) || (c = !0),
        m &&
          (c
            ? (t.call(e, o), (t = null))
            : ((m = t),
              (t = function (b, w, v) {
                return m.call(s(b), v);
              }))),
        t)
      )
        for (; d < h; d++) t(e[d], i, c ? o : o.call(e[d], d, t(e[d], i)));
      return r ? e : m ? t.call(e) : h ? t(e[0], i) : l;
    },
    Gt = /^-ms-/,
    Rt = /-([a-z])/g;
  function Mi(e, t) {
    return t.toUpperCase();
  }
  function rt(e) {
    return e.replace(Gt, "ms-").replace(Rt, Mi);
  }
  var Jt = function (e) {
    return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType;
  };
  function Zt() {
    this.expando = s.expando + Zt.uid++;
  }
  (Zt.uid = 1),
    (Zt.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            Jt(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, i) {
        var o,
          r = this.cache(e);
        if (typeof t == "string") r[rt(t)] = i;
        else for (o in t) r[rt(o)] = t[o];
        return r;
      },
      get: function (e, t) {
        return t === void 0
          ? this.cache(e)
          : e[this.expando] && e[this.expando][rt(t)];
      },
      access: function (e, t, i) {
        return t === void 0 || (t && typeof t == "string" && i === void 0)
          ? this.get(e, t)
          : (this.set(e, t, i), i !== void 0 ? i : t);
      },
      remove: function (e, t) {
        var i,
          o = e[this.expando];
        if (o !== void 0) {
          if (t !== void 0)
            for (
              i = (t = Array.isArray(t)
                ? t.map(rt)
                : ((t = rt(t)) in o)
                  ? [t]
                  : t.match(Ue) || []).length;
              i--;

            )
              delete o[t[i]];
          (t === void 0 || s.isEmptyObject(o)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return t !== void 0 && !s.isEmptyObject(t);
      },
    });
  var V = new Zt(),
    Ie = new Zt(),
    Hi = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    fn = /[A-Z]/g;
  function vt(e, t, i) {
    var o, r;
    if (i === void 0 && e.nodeType === 1)
      if (
        ((o = "data-" + t.replace(fn, "-$&").toLowerCase()),
        typeof (i = e.getAttribute(o)) == "string")
      ) {
        try {
          i =
            (r = i) === "true" ||
            (r !== "false" &&
              (r === "null"
                ? null
                : r === +r + ""
                  ? +r
                  : Hi.test(r)
                    ? JSON.parse(r)
                    : r));
        } catch {}
        Ie.set(e, t, i);
      } else i = void 0;
    return i;
  }
  s.extend({
    hasData: function (e) {
      return Ie.hasData(e) || V.hasData(e);
    },
    data: function (e, t, i) {
      return Ie.access(e, t, i);
    },
    removeData: function (e, t) {
      Ie.remove(e, t);
    },
    _data: function (e, t, i) {
      return V.access(e, t, i);
    },
    _removeData: function (e, t) {
      V.remove(e, t);
    },
  }),
    s.fn.extend({
      data: function (e, t) {
        var i,
          o,
          r,
          l = this[0],
          c = l && l.attributes;
        if (e === void 0) {
          if (
            this.length &&
            ((r = Ie.get(l)), l.nodeType === 1 && !V.get(l, "hasDataAttrs"))
          ) {
            for (i = c.length; i--; )
              c[i] &&
                (o = c[i].name).indexOf("data-") === 0 &&
                ((o = rt(o.slice(5))), vt(l, o, r[o]));
            V.set(l, "hasDataAttrs", !0);
          }
          return r;
        }
        return typeof e == "object"
          ? this.each(function () {
              Ie.set(this, e);
            })
          : st(
              this,
              function (d) {
                var h;
                if (l && d === void 0)
                  return (h = Ie.get(l, e)) !== void 0 ||
                    (h = vt(l, e)) !== void 0
                    ? h
                    : void 0;
                this.each(function () {
                  Ie.set(this, e, d);
                });
              },
              null,
              t,
              1 < arguments.length,
              null,
              !0,
            );
      },
      removeData: function (e) {
        return this.each(function () {
          Ie.remove(this, e);
        });
      },
    }),
    s.extend({
      queue: function (e, t, i) {
        var o;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (o = V.get(e, t)),
            i &&
              (!o || Array.isArray(i)
                ? (o = V.access(e, t, s.makeArray(i)))
                : o.push(i)),
            o || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var i = s.queue(e, t),
          o = i.length,
          r = i.shift(),
          l = s._queueHooks(e, t);
        r === "inprogress" && ((r = i.shift()), o--),
          r &&
            (t === "fx" && i.unshift("inprogress"),
            delete l.stop,
            r.call(
              e,
              function () {
                s.dequeue(e, t);
              },
              l,
            )),
          !o && l && l.empty.fire();
      },
      _queueHooks: function (e, t) {
        var i = t + "queueHooks";
        return (
          V.get(e, i) ||
          V.access(e, i, {
            empty: s.Callbacks("once memory").add(function () {
              V.remove(e, [t + "queue", i]);
            }),
          })
        );
      },
    }),
    s.fn.extend({
      queue: function (e, t) {
        var i = 2;
        return (
          typeof e != "string" && ((t = e), (e = "fx"), i--),
          arguments.length < i
            ? s.queue(this[0], e)
            : t === void 0
              ? this
              : this.each(function () {
                  var o = s.queue(this, e, t);
                  s._queueHooks(this, e),
                    e === "fx" && o[0] !== "inprogress" && s.dequeue(this, e);
                })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          s.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var i,
          o = 1,
          r = s.Deferred(),
          l = this,
          c = this.length,
          d = function () {
            --o || r.resolveWith(l, [l]);
          };
        for (
          typeof e != "string" && ((t = e), (e = void 0)), e = e || "fx";
          c--;

        )
          (i = V.get(l[c], e + "queueHooks")) &&
            i.empty &&
            (o++, i.empty.add(d));
        return d(), r.promise(t);
      },
    });
  var $n = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    yt = new RegExp("^(?:([+-])=|)(" + $n + ")([a-z%]*)$", "i"),
    $e = ["Top", "Right", "Bottom", "Left"],
    Xe = j.documentElement,
    bt = function (e) {
      return s.contains(e.ownerDocument, e);
    },
    qi = { composed: !0 };
  Xe.getRootNode &&
    (bt = function (e) {
      return (
        s.contains(e.ownerDocument, e) || e.getRootNode(qi) === e.ownerDocument
      );
    });
  var Ft = function (e, t) {
    return (
      (e = t || e).style.display === "none" ||
      (e.style.display === "" && bt(e) && s.css(e, "display") === "none")
    );
  };
  function ci(e, t, i, o) {
    var r,
      l,
      c = 20,
      d = o
        ? function () {
            return o.cur();
          }
        : function () {
            return s.css(e, t, "");
          },
      h = d(),
      m = (i && i[3]) || (s.cssNumber[t] ? "" : "px"),
      b =
        e.nodeType &&
        (s.cssNumber[t] || (m !== "px" && +h)) &&
        yt.exec(s.css(e, t));
    if (b && b[3] !== m) {
      for (h /= 2, m = m || b[3], b = +h || 1; c--; )
        s.style(e, t, b + m),
          (1 - l) * (1 - (l = d() / h || 0.5)) <= 0 && (c = 0),
          (b /= l);
      (b *= 2), s.style(e, t, b + m), (i = i || []);
    }
    return (
      i &&
        ((b = +b || +h || 0),
        (r = i[1] ? b + (i[1] + 1) * i[2] : +i[2]),
        o && ((o.unit = m), (o.start = b), (o.end = r))),
      r
    );
  }
  var ui = {};
  function Bt(e, t) {
    for (var i, o, r, l, c, d, h, m = [], b = 0, w = e.length; b < w; b++)
      (o = e[b]).style &&
        ((i = o.style.display),
        t
          ? (i === "none" &&
              ((m[b] = V.get(o, "display") || null),
              m[b] || (o.style.display = "")),
            o.style.display === "" &&
              Ft(o) &&
              (m[b] =
                ((h = c = l = void 0),
                (c = (r = o).ownerDocument),
                (d = r.nodeName),
                (h = ui[d]) ||
                  ((l = c.body.appendChild(c.createElement(d))),
                  (h = s.css(l, "display")),
                  l.parentNode.removeChild(l),
                  h === "none" && (h = "block"),
                  (ui[d] = h)))))
          : i !== "none" && ((m[b] = "none"), V.set(o, "display", i)));
    for (b = 0; b < w; b++) m[b] != null && (e[b].style.display = m[b]);
    return e;
  }
  s.fn.extend({
    show: function () {
      return Bt(this, !0);
    },
    hide: function () {
      return Bt(this);
    },
    toggle: function (e) {
      return typeof e == "boolean"
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            Ft(this) ? s(this).show() : s(this).hide();
          });
    },
  });
  var Pt,
    gn,
    en = /^(?:checkbox|radio)$/i,
    Mn = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    tn = /^$|^module$|\/(?:java|ecma)script/i;
  (Pt = j.createDocumentFragment().appendChild(j.createElement("div"))),
    (gn = j.createElement("input")).setAttribute("type", "radio"),
    gn.setAttribute("checked", "checked"),
    gn.setAttribute("name", "t"),
    Pt.appendChild(gn),
    (D.checkClone = Pt.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (Pt.innerHTML = "<textarea>x</textarea>"),
    (D.noCloneChecked = !!Pt.cloneNode(!0).lastChild.defaultValue),
    (Pt.innerHTML = "<option></option>"),
    (D.option = !!Pt.lastChild);
  var Fe = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  function Ne(e, t) {
    var i;
    return (
      (i =
        typeof e.getElementsByTagName < "u"
          ? e.getElementsByTagName(t || "*")
          : typeof e.querySelectorAll < "u"
            ? e.querySelectorAll(t || "*")
            : []),
      t === void 0 || (t && ne(e, t)) ? s.merge([e], i) : i
    );
  }
  function Hn(e, t) {
    for (var i = 0, o = e.length; i < o; i++)
      V.set(e[i], "globalEval", !t || V.get(t[i], "globalEval"));
  }
  (Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead),
    (Fe.th = Fe.td),
    D.option ||
      (Fe.optgroup = Fe.option =
        [1, "<select multiple='multiple'>", "</select>"]);
  var Ri = /<|&#?\w+;/;
  function hi(e, t, i, o, r) {
    for (
      var l,
        c,
        d,
        h,
        m,
        b,
        w = t.createDocumentFragment(),
        v = [],
        T = 0,
        U = e.length;
      T < U;
      T++
    )
      if ((l = e[T]) || l === 0)
        if (oe(l) === "object") s.merge(v, l.nodeType ? [l] : l);
        else if (Ri.test(l)) {
          for (
            c = c || w.appendChild(t.createElement("div")),
              d = (Mn.exec(l) || ["", ""])[1].toLowerCase(),
              h = Fe[d] || Fe._default,
              c.innerHTML = h[1] + s.htmlPrefilter(l) + h[2],
              b = h[0];
            b--;

          )
            c = c.lastChild;
          s.merge(v, c.childNodes), ((c = w.firstChild).textContent = "");
        } else v.push(t.createTextNode(l));
    for (w.textContent = "", T = 0; (l = v[T++]); )
      if (o && -1 < s.inArray(l, o)) r && r.push(l);
      else if (
        ((m = bt(l)), (c = Ne(w.appendChild(l), "script")), m && Hn(c), i)
      )
        for (b = 0; (l = c[b++]); ) tn.test(l.type || "") && i.push(l);
    return w;
  }
  var di = /^([^.]*)(?:\.(.+)|)/;
  function Ze() {
    return !0;
  }
  function at() {
    return !1;
  }
  function qn(e, t, i, o, r, l) {
    var c, d;
    if (typeof t == "object") {
      for (d in (typeof i != "string" && ((o = o || i), (i = void 0)), t))
        qn(e, d, i, o, t[d], l);
      return e;
    }
    if (
      (o == null && r == null
        ? ((r = i), (o = i = void 0))
        : r == null &&
          (typeof i == "string"
            ? ((r = o), (o = void 0))
            : ((r = o), (o = i), (i = void 0))),
      r === !1)
    )
      r = at;
    else if (!r) return e;
    return (
      l === 1 &&
        ((c = r),
        ((r = function (h) {
          return s().off(h), c.apply(this, arguments);
        }).guid = c.guid || (c.guid = s.guid++))),
      e.each(function () {
        s.event.add(this, t, r, o, i);
      })
    );
  }
  function mn(e, t, i) {
    i
      ? (V.set(e, t, !1),
        s.event.add(e, t, {
          namespace: !1,
          handler: function (o) {
            var r,
              l = V.get(this, t);
            if (1 & o.isTrigger && this[t]) {
              if (l)
                (s.event.special[t] || {}).delegateType && o.stopPropagation();
              else if (
                ((l = E.call(arguments)),
                V.set(this, t, l),
                this[t](),
                (r = V.get(this, t)),
                V.set(this, t, !1),
                l !== r)
              )
                return o.stopImmediatePropagation(), o.preventDefault(), r;
            } else
              l &&
                (V.set(this, t, s.event.trigger(l[0], l.slice(1), this)),
                o.stopPropagation(),
                (o.isImmediatePropagationStopped = Ze));
          },
        }))
      : V.get(e, t) === void 0 && s.event.add(e, t, Ze);
  }
  (s.event = {
    global: {},
    add: function (e, t, i, o, r) {
      var l,
        c,
        d,
        h,
        m,
        b,
        w,
        v,
        T,
        U,
        G,
        J = V.get(e);
      if (Jt(e))
        for (
          i.handler && ((i = (l = i).handler), (r = l.selector)),
            r && s.find.matchesSelector(Xe, r),
            i.guid || (i.guid = s.guid++),
            (h = J.events) || (h = J.events = Object.create(null)),
            (c = J.handle) ||
              (c = J.handle =
                function (we) {
                  return typeof s < "u" && s.event.triggered !== we.type
                    ? s.event.dispatch.apply(e, arguments)
                    : void 0;
                }),
            m = (t = (t || "").match(Ue) || [""]).length;
          m--;

        )
          (T = G = (d = di.exec(t[m]) || [])[1]),
            (U = (d[2] || "").split(".").sort()),
            T &&
              ((w = s.event.special[T] || {}),
              (T = (r ? w.delegateType : w.bindType) || T),
              (w = s.event.special[T] || {}),
              (b = s.extend(
                {
                  type: T,
                  origType: G,
                  data: o,
                  handler: i,
                  guid: i.guid,
                  selector: r,
                  needsContext: r && s.expr.match.needsContext.test(r),
                  namespace: U.join("."),
                },
                l,
              )),
              (v = h[T]) ||
                (((v = h[T] = []).delegateCount = 0),
                (w.setup && w.setup.call(e, o, U, c) !== !1) ||
                  (e.addEventListener && e.addEventListener(T, c))),
              w.add &&
                (w.add.call(e, b), b.handler.guid || (b.handler.guid = i.guid)),
              r ? v.splice(v.delegateCount++, 0, b) : v.push(b),
              (s.event.global[T] = !0));
    },
    remove: function (e, t, i, o, r) {
      var l,
        c,
        d,
        h,
        m,
        b,
        w,
        v,
        T,
        U,
        G,
        J = V.hasData(e) && V.get(e);
      if (J && (h = J.events)) {
        for (m = (t = (t || "").match(Ue) || [""]).length; m--; )
          if (
            ((T = G = (d = di.exec(t[m]) || [])[1]),
            (U = (d[2] || "").split(".").sort()),
            T)
          ) {
            for (
              w = s.event.special[T] || {},
                v = h[(T = (o ? w.delegateType : w.bindType) || T)] || [],
                d =
                  d[2] &&
                  new RegExp("(^|\\.)" + U.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                c = l = v.length;
              l--;

            )
              (b = v[l]),
                (!r && G !== b.origType) ||
                  (i && i.guid !== b.guid) ||
                  (d && !d.test(b.namespace)) ||
                  (o && o !== b.selector && (o !== "**" || !b.selector)) ||
                  (v.splice(l, 1),
                  b.selector && v.delegateCount--,
                  w.remove && w.remove.call(e, b));
            c &&
              !v.length &&
              ((w.teardown && w.teardown.call(e, U, J.handle) !== !1) ||
                s.removeEvent(e, T, J.handle),
              delete h[T]);
          } else for (T in h) s.event.remove(e, T + t[m], i, o, !0);
        s.isEmptyObject(h) && V.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        i,
        o,
        r,
        l,
        c,
        d = new Array(arguments.length),
        h = s.event.fix(e),
        m = (V.get(this, "events") || Object.create(null))[h.type] || [],
        b = s.event.special[h.type] || {};
      for (d[0] = h, t = 1; t < arguments.length; t++) d[t] = arguments[t];
      if (
        ((h.delegateTarget = this),
        !b.preDispatch || b.preDispatch.call(this, h) !== !1)
      ) {
        for (
          c = s.event.handlers.call(this, h, m), t = 0;
          (r = c[t++]) && !h.isPropagationStopped();

        )
          for (
            h.currentTarget = r.elem, i = 0;
            (l = r.handlers[i++]) && !h.isImmediatePropagationStopped();

          )
            (h.rnamespace &&
              l.namespace !== !1 &&
              !h.rnamespace.test(l.namespace)) ||
              ((h.handleObj = l),
              (h.data = l.data),
              (o = (
                (s.event.special[l.origType] || {}).handle || l.handler
              ).apply(r.elem, d)) !== void 0 &&
                (h.result = o) === !1 &&
                (h.preventDefault(), h.stopPropagation()));
        return b.postDispatch && b.postDispatch.call(this, h), h.result;
      }
    },
    handlers: function (e, t) {
      var i,
        o,
        r,
        l,
        c,
        d = [],
        h = t.delegateCount,
        m = e.target;
      if (h && m.nodeType && !(e.type === "click" && 1 <= e.button)) {
        for (; m !== this; m = m.parentNode || this)
          if (m.nodeType === 1 && (e.type !== "click" || m.disabled !== !0)) {
            for (l = [], c = {}, i = 0; i < h; i++)
              c[(r = (o = t[i]).selector + " ")] === void 0 &&
                (c[r] = o.needsContext
                  ? -1 < s(r, this).index(m)
                  : s.find(r, this, null, [m]).length),
                c[r] && l.push(o);
            l.length && d.push({ elem: m, handlers: l });
          }
      }
      return (
        (m = this), h < t.length && d.push({ elem: m, handlers: t.slice(h) }), d
      );
    },
    addProp: function (e, t) {
      Object.defineProperty(s.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: q(t)
          ? function () {
              if (this.originalEvent) return t(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[e];
            },
        set: function (i) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: i,
          });
        },
      });
    },
    fix: function (e) {
      return e[s.expando] ? e : new s.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            en.test(t.type) && t.click && ne(t, "input") && mn(t, "click", !0),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            en.test(t.type) && t.click && ne(t, "input") && mn(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (en.test(t.type) &&
              t.click &&
              ne(t, "input") &&
              V.get(t, "click")) ||
            ne(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          e.result !== void 0 &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (s.removeEvent = function (e, t, i) {
      e.removeEventListener && e.removeEventListener(t, i);
    }),
    (s.Event = function (e, t) {
      if (!(this instanceof s.Event)) return new s.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (e.defaultPrevented === void 0 && e.returnValue === !1)
              ? Ze
              : at),
          (this.target =
            e.target && e.target.nodeType === 3
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && s.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[s.expando] = !0);
    }),
    (s.Event.prototype = {
      constructor: s.Event,
      isDefaultPrevented: at,
      isPropagationStopped: at,
      isImmediatePropagationStopped: at,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = Ze),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = Ze),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = Ze),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    s.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      s.event.addProp,
    ),
    s.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      function i(o) {
        if (j.documentMode) {
          var r = V.get(this, "handle"),
            l = s.event.fix(o);
          (l.type = o.type === "focusin" ? "focus" : "blur"),
            (l.isSimulated = !0),
            r(o),
            l.target === l.currentTarget && r(l);
        } else s.event.simulate(t, o.target, s.event.fix(o));
      }
      (s.event.special[e] = {
        setup: function () {
          var o;
          if ((mn(this, e, !0), !j.documentMode)) return !1;
          (o = V.get(this, t)) || this.addEventListener(t, i),
            V.set(this, t, (o || 0) + 1);
        },
        trigger: function () {
          return mn(this, e), !0;
        },
        teardown: function () {
          var o;
          if (!j.documentMode) return !1;
          (o = V.get(this, t) - 1)
            ? V.set(this, t, o)
            : (this.removeEventListener(t, i), V.remove(this, t));
        },
        _default: function (o) {
          return V.get(o.target, e);
        },
        delegateType: t,
      }),
        (s.event.special[t] = {
          setup: function () {
            var o = this.ownerDocument || this.document || this,
              r = j.documentMode ? this : o,
              l = V.get(r, t);
            l ||
              (j.documentMode
                ? this.addEventListener(t, i)
                : o.addEventListener(e, i, !0)),
              V.set(r, t, (l || 0) + 1);
          },
          teardown: function () {
            var o = this.ownerDocument || this.document || this,
              r = j.documentMode ? this : o,
              l = V.get(r, t) - 1;
            l
              ? V.set(r, t, l)
              : (j.documentMode
                  ? this.removeEventListener(t, i)
                  : o.removeEventListener(e, i, !0),
                V.remove(r, t));
          },
        });
    }),
    s.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, t) {
        s.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (i) {
            var o,
              r = i.relatedTarget,
              l = i.handleObj;
            return (
              (r && (r === this || s.contains(this, r))) ||
                ((i.type = l.origType),
                (o = l.handler.apply(this, arguments)),
                (i.type = t)),
              o
            );
          },
        };
      },
    ),
    s.fn.extend({
      on: function (e, t, i, o) {
        return qn(this, e, t, i, o);
      },
      one: function (e, t, i, o) {
        return qn(this, e, t, i, o, 1);
      },
      off: function (e, t, i) {
        var o, r;
        if (e && e.preventDefault && e.handleObj)
          return (
            (o = e.handleObj),
            s(e.delegateTarget).off(
              o.namespace ? o.origType + "." + o.namespace : o.origType,
              o.selector,
              o.handler,
            ),
            this
          );
        if (typeof e == "object") {
          for (r in e) this.off(r, t, e[r]);
          return this;
        }
        return (
          (t !== !1 && typeof t != "function") || ((i = t), (t = void 0)),
          i === !1 && (i = at),
          this.each(function () {
            s.event.remove(this, e, i, t);
          })
        );
      },
    });
  var Fi = /<script|<style|<link/i,
    Bi = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Wi = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function vn(e, t) {
    return (
      (ne(e, "table") &&
        ne(t.nodeType !== 11 ? t : t.firstChild, "tr") &&
        s(e).children("tbody")[0]) ||
      e
    );
  }
  function Wt(e) {
    return (e.type = (e.getAttribute("type") !== null) + "/" + e.type), e;
  }
  function yn(e) {
    return (
      (e.type || "").slice(0, 5) === "true/"
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function pi(e, t) {
    var i, o, r, l, c, d;
    if (t.nodeType === 1) {
      if (V.hasData(e) && (d = V.get(e).events))
        for (r in (V.remove(t, "handle events"), d))
          for (i = 0, o = d[r].length; i < o; i++) s.event.add(t, r, d[r][i]);
      Ie.hasData(e) &&
        ((l = Ie.access(e)), (c = s.extend({}, l)), Ie.set(t, c));
    }
  }
  function St(e, t, i, o) {
    t = H(t);
    var r,
      l,
      c,
      d,
      h,
      m,
      b = 0,
      w = e.length,
      v = w - 1,
      T = t[0],
      U = q(T);
    if (U || (1 < w && typeof T == "string" && !D.checkClone && Bi.test(T)))
      return e.each(function (G) {
        var J = e.eq(G);
        U && (t[0] = T.call(this, G, J.html())), St(J, t, i, o);
      });
    if (
      w &&
      ((l = (r = hi(t, e[0].ownerDocument, !1, e, o)).firstChild),
      r.childNodes.length === 1 && (r = l),
      l || o)
    ) {
      for (d = (c = s.map(Ne(r, "script"), Wt)).length; b < w; b++)
        (h = r),
          b !== v &&
            ((h = s.clone(h, !0, !0)), d && s.merge(c, Ne(h, "script"))),
          i.call(e[b], h, b);
      if (d)
        for (m = c[c.length - 1].ownerDocument, s.map(c, yn), b = 0; b < d; b++)
          (h = c[b]),
            tn.test(h.type || "") &&
              !V.access(h, "globalEval") &&
              s.contains(m, h) &&
              (h.src && (h.type || "").toLowerCase() !== "module"
                ? s._evalUrl &&
                  !h.noModule &&
                  s._evalUrl(
                    h.src,
                    { nonce: h.nonce || h.getAttribute("nonce") },
                    m,
                  )
                : le(h.textContent.replace(Wi, ""), h, m));
    }
    return e;
  }
  function fi(e, t, i) {
    for (var o, r = t ? s.filter(t, e) : e, l = 0; (o = r[l]) != null; l++)
      i || o.nodeType !== 1 || s.cleanData(Ne(o)),
        o.parentNode &&
          (i && bt(o) && Hn(Ne(o, "script")), o.parentNode.removeChild(o));
    return e;
  }
  s.extend({
    htmlPrefilter: function (e) {
      return e;
    },
    clone: function (e, t, i) {
      var o,
        r,
        l,
        c,
        d,
        h,
        m,
        b = e.cloneNode(!0),
        w = bt(e);
      if (
        !(
          D.noCloneChecked ||
          (e.nodeType !== 1 && e.nodeType !== 11) ||
          s.isXMLDoc(e)
        )
      )
        for (c = Ne(b), o = 0, r = (l = Ne(e)).length; o < r; o++)
          (d = l[o]),
            (h = c[o]),
            (m = h.nodeName.toLowerCase()) === "input" && en.test(d.type)
              ? (h.checked = d.checked)
              : (m !== "input" && m !== "textarea") ||
                (h.defaultValue = d.defaultValue);
      if (t)
        if (i)
          for (l = l || Ne(e), c = c || Ne(b), o = 0, r = l.length; o < r; o++)
            pi(l[o], c[o]);
        else pi(e, b);
      return (
        0 < (c = Ne(b, "script")).length && Hn(c, !w && Ne(e, "script")), b
      );
    },
    cleanData: function (e) {
      for (var t, i, o, r = s.event.special, l = 0; (i = e[l]) !== void 0; l++)
        if (Jt(i)) {
          if ((t = i[V.expando])) {
            if (t.events)
              for (o in t.events)
                r[o] ? s.event.remove(i, o) : s.removeEvent(i, o, t.handle);
            i[V.expando] = void 0;
          }
          i[Ie.expando] && (i[Ie.expando] = void 0);
        }
    },
  }),
    s.fn.extend({
      detach: function (e) {
        return fi(this, e, !0);
      },
      remove: function (e) {
        return fi(this, e);
      },
      text: function (e) {
        return st(
          this,
          function (t) {
            return t === void 0
              ? s.text(this)
              : this.empty().each(function () {
                  (this.nodeType !== 1 &&
                    this.nodeType !== 11 &&
                    this.nodeType !== 9) ||
                    (this.textContent = t);
                });
          },
          null,
          e,
          arguments.length,
        );
      },
      append: function () {
        return St(this, arguments, function (e) {
          (this.nodeType !== 1 &&
            this.nodeType !== 11 &&
            this.nodeType !== 9) ||
            vn(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return St(this, arguments, function (e) {
          if (
            this.nodeType === 1 ||
            this.nodeType === 11 ||
            this.nodeType === 9
          ) {
            var t = vn(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return St(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return St(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; (e = this[t]) != null; t++)
          e.nodeType === 1 && (s.cleanData(Ne(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = e != null && e),
          (t = t ?? e),
          this.map(function () {
            return s.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return st(
          this,
          function (t) {
            var i = this[0] || {},
              o = 0,
              r = this.length;
            if (t === void 0 && i.nodeType === 1) return i.innerHTML;
            if (
              typeof t == "string" &&
              !Fi.test(t) &&
              !Fe[(Mn.exec(t) || ["", ""])[1].toLowerCase()]
            ) {
              t = s.htmlPrefilter(t);
              try {
                for (; o < r; o++)
                  (i = this[o] || {}).nodeType === 1 &&
                    (s.cleanData(Ne(i, !1)), (i.innerHTML = t));
                i = 0;
              } catch {}
            }
            i && this.empty().append(t);
          },
          null,
          e,
          arguments.length,
        );
      },
      replaceWith: function () {
        var e = [];
        return St(
          this,
          arguments,
          function (t) {
            var i = this.parentNode;
            s.inArray(this, e) < 0 &&
              (s.cleanData(Ne(this)), i && i.replaceChild(t, this));
          },
          e,
        );
      },
    }),
    s.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        s.fn[e] = function (i) {
          for (var o, r = [], l = s(i), c = l.length - 1, d = 0; d <= c; d++)
            (o = d === c ? this : this.clone(!0)),
              s(l[d])[t](o),
              ae.apply(r, o.get());
          return this.pushStack(r);
        };
      },
    );
  var Rn = new RegExp("^(" + $n + ")(?!px)[a-z%]+$", "i"),
    Ot = /^--/,
    nn = function (e) {
      var t = e.ownerDocument.defaultView;
      return (t && t.opener) || (t = A), t.getComputedStyle(e);
    },
    Lt = function (e, t, i) {
      var o,
        r,
        l = {};
      for (r in t) (l[r] = e.style[r]), (e.style[r] = t[r]);
      for (r in ((o = i.call(e)), t)) e.style[r] = l[r];
      return o;
    },
    Fn = new RegExp($e.join("|"), "i");
  function on(e, t, i) {
    var o,
      r,
      l,
      c,
      d = Ot.test(t),
      h = e.style;
    return (
      (i = i || nn(e)) &&
        ((c = i.getPropertyValue(t) || i[t]),
        d && c && (c = c.replace(it, "$1") || void 0),
        c !== "" || bt(e) || (c = s.style(e, t)),
        !D.pixelBoxStyles() &&
          Rn.test(c) &&
          Fn.test(t) &&
          ((o = h.width),
          (r = h.minWidth),
          (l = h.maxWidth),
          (h.minWidth = h.maxWidth = h.width = c),
          (c = i.width),
          (h.width = o),
          (h.minWidth = r),
          (h.maxWidth = l))),
      c !== void 0 ? c + "" : c
    );
  }
  function Bn(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  (function () {
    function e() {
      if (m) {
        (h.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (m.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          Xe.appendChild(h).appendChild(m);
        var b = A.getComputedStyle(m);
        (i = b.top !== "1%"),
          (d = t(b.marginLeft) === 12),
          (m.style.right = "60%"),
          (l = t(b.right) === 36),
          (o = t(b.width) === 36),
          (m.style.position = "absolute"),
          (r = t(m.offsetWidth / 3) === 12),
          Xe.removeChild(h),
          (m = null);
      }
    }
    function t(b) {
      return Math.round(parseFloat(b));
    }
    var i,
      o,
      r,
      l,
      c,
      d,
      h = j.createElement("div"),
      m = j.createElement("div");
    m.style &&
      ((m.style.backgroundClip = "content-box"),
      (m.cloneNode(!0).style.backgroundClip = ""),
      (D.clearCloneStyle = m.style.backgroundClip === "content-box"),
      s.extend(D, {
        boxSizingReliable: function () {
          return e(), o;
        },
        pixelBoxStyles: function () {
          return e(), l;
        },
        pixelPosition: function () {
          return e(), i;
        },
        reliableMarginLeft: function () {
          return e(), d;
        },
        scrollboxSize: function () {
          return e(), r;
        },
        reliableTrDimensions: function () {
          var b, w, v, T;
          return (
            c == null &&
              ((b = j.createElement("table")),
              (w = j.createElement("tr")),
              (v = j.createElement("div")),
              (b.style.cssText =
                "position:absolute;left:-11111px;border-collapse:separate"),
              (w.style.cssText = "box-sizing:content-box;border:1px solid"),
              (w.style.height = "1px"),
              (v.style.height = "9px"),
              (v.style.display = "block"),
              Xe.appendChild(b).appendChild(w).appendChild(v),
              (T = A.getComputedStyle(w)),
              (c =
                parseInt(T.height, 10) +
                  parseInt(T.borderTopWidth, 10) +
                  parseInt(T.borderBottomWidth, 10) ===
                w.offsetHeight),
              Xe.removeChild(b)),
            c
          );
        },
      }));
  })();
  var gi = ["Webkit", "Moz", "ms"],
    mi = j.createElement("div").style,
    vi = {};
  function Wn(e) {
    var t = s.cssProps[e] || vi[e];
    return (
      t ||
      (e in mi
        ? e
        : (vi[e] =
            (function (i) {
              for (
                var o = i[0].toUpperCase() + i.slice(1), r = gi.length;
                r--;

              )
                if ((i = gi[r] + o) in mi) return i;
            })(e) || e))
    );
  }
  var yi = /^(none|table(?!-c[ea]).+)/,
    bi = { position: "absolute", visibility: "hidden", display: "block" },
    _i = { letterSpacing: "0", fontWeight: "400" };
  function It(e, t, i) {
    var o = yt.exec(t);
    return o ? Math.max(0, o[2] - (i || 0)) + (o[3] || "px") : t;
  }
  function _t(e, t, i, o, r, l) {
    var c = t === "width" ? 1 : 0,
      d = 0,
      h = 0,
      m = 0;
    if (i === (o ? "border" : "content")) return 0;
    for (; c < 4; c += 2)
      i === "margin" && (m += s.css(e, i + $e[c], !0, r)),
        o
          ? (i === "content" && (h -= s.css(e, "padding" + $e[c], !0, r)),
            i !== "margin" &&
              (h -= s.css(e, "border" + $e[c] + "Width", !0, r)))
          : ((h += s.css(e, "padding" + $e[c], !0, r)),
            i !== "padding"
              ? (h += s.css(e, "border" + $e[c] + "Width", !0, r))
              : (d += s.css(e, "border" + $e[c] + "Width", !0, r)));
    return (
      !o &&
        0 <= l &&
        (h +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - l - h - d - 0.5,
            ),
          ) || 0),
      h + m
    );
  }
  function wi(e, t, i) {
    var o = nn(e),
      r =
        (!D.boxSizingReliable() || i) &&
        s.css(e, "boxSizing", !1, o) === "border-box",
      l = r,
      c = on(e, t, o),
      d = "offset" + t[0].toUpperCase() + t.slice(1);
    if (Rn.test(c)) {
      if (!i) return c;
      c = "auto";
    }
    return (
      ((!D.boxSizingReliable() && r) ||
        (!D.reliableTrDimensions() && ne(e, "tr")) ||
        c === "auto" ||
        (!parseFloat(c) && s.css(e, "display", !1, o) === "inline")) &&
        e.getClientRects().length &&
        ((r = s.css(e, "boxSizing", !1, o) === "border-box"),
        (l = d in e) && (c = e[d])),
      (c = parseFloat(c) || 0) +
        _t(e, t, i || (r ? "border" : "content"), l, o, c) +
        "px"
    );
  }
  function Me(e, t, i, o, r) {
    return new Me.prototype.init(e, t, i, o, r);
  }
  s.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var i = on(e, "opacity");
            return i === "" ? "1" : i;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageSlice: !0,
      columnCount: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      scale: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
    },
    cssProps: {},
    style: function (e, t, i, o) {
      if (e && e.nodeType !== 3 && e.nodeType !== 8 && e.style) {
        var r,
          l,
          c,
          d = rt(t),
          h = Ot.test(t),
          m = e.style;
        if (
          (h || (t = Wn(d)), (c = s.cssHooks[t] || s.cssHooks[d]), i === void 0)
        )
          return c && "get" in c && (r = c.get(e, !1, o)) !== void 0 ? r : m[t];
        (l = typeof i) == "string" &&
          (r = yt.exec(i)) &&
          r[1] &&
          ((i = ci(e, t, r)), (l = "number")),
          i != null &&
            i == i &&
            (l !== "number" ||
              h ||
              (i += (r && r[3]) || (s.cssNumber[d] ? "" : "px")),
            D.clearCloneStyle ||
              i !== "" ||
              t.indexOf("background") !== 0 ||
              (m[t] = "inherit"),
            (c && "set" in c && (i = c.set(e, i, o)) === void 0) ||
              (h ? m.setProperty(t, i) : (m[t] = i)));
      }
    },
    css: function (e, t, i, o) {
      var r,
        l,
        c,
        d = rt(t);
      return (
        Ot.test(t) || (t = Wn(d)),
        (c = s.cssHooks[t] || s.cssHooks[d]) &&
          "get" in c &&
          (r = c.get(e, !0, i)),
        r === void 0 && (r = on(e, t, o)),
        r === "normal" && t in _i && (r = _i[t]),
        i === "" || i
          ? ((l = parseFloat(r)), i === !0 || isFinite(l) ? l || 0 : r)
          : r
      );
    },
  }),
    s.each(["height", "width"], function (e, t) {
      s.cssHooks[t] = {
        get: function (i, o, r) {
          if (o)
            return !yi.test(s.css(i, "display")) ||
              (i.getClientRects().length && i.getBoundingClientRect().width)
              ? wi(i, t, r)
              : Lt(i, bi, function () {
                  return wi(i, t, r);
                });
        },
        set: function (i, o, r) {
          var l,
            c = nn(i),
            d = !D.scrollboxSize() && c.position === "absolute",
            h = (d || r) && s.css(i, "boxSizing", !1, c) === "border-box",
            m = r ? _t(i, t, r, h, c) : 0;
          return (
            h &&
              d &&
              (m -= Math.ceil(
                i["offset" + t[0].toUpperCase() + t.slice(1)] -
                  parseFloat(c[t]) -
                  _t(i, t, "border", !1, c) -
                  0.5,
              )),
            m &&
              (l = yt.exec(o)) &&
              (l[3] || "px") !== "px" &&
              ((i.style[t] = o), (o = s.css(i, t))),
            It(0, o, m)
          );
        },
      };
    }),
    (s.cssHooks.marginLeft = Bn(D.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(on(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              Lt(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    s.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (s.cssHooks[e + t] = {
        expand: function (i) {
          for (
            var o = 0, r = {}, l = typeof i == "string" ? i.split(" ") : [i];
            o < 4;
            o++
          )
            r[e + $e[o] + t] = l[o] || l[o - 2] || l[0];
          return r;
        },
      }),
        e !== "margin" && (s.cssHooks[e + t].set = It);
    }),
    s.fn.extend({
      css: function (e, t) {
        return st(
          this,
          function (i, o, r) {
            var l,
              c,
              d = {},
              h = 0;
            if (Array.isArray(o)) {
              for (l = nn(i), c = o.length; h < c; h++)
                d[o[h]] = s.css(i, o[h], !1, l);
              return d;
            }
            return r !== void 0 ? s.style(i, o, r) : s.css(i, o);
          },
          e,
          t,
          1 < arguments.length,
        );
      },
    }),
    (((s.Tween = Me).prototype = {
      constructor: Me,
      init: function (e, t, i, o, r, l) {
        (this.elem = e),
          (this.prop = i),
          (this.easing = r || s.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = o),
          (this.unit = l || (s.cssNumber[i] ? "" : "px"));
      },
      cur: function () {
        var e = Me.propHooks[this.prop];
        return e && e.get ? e.get(this) : Me.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          i = Me.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                s.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration,
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          i && i.set ? i.set(this) : Me.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = Me.prototype),
    ((Me.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return e.elem.nodeType !== 1 ||
            (e.elem[e.prop] != null && e.elem.style[e.prop] == null)
            ? e.elem[e.prop]
            : (t = s.css(e.elem, e.prop, "")) && t !== "auto"
              ? t
              : 0;
        },
        set: function (e) {
          s.fx.step[e.prop]
            ? s.fx.step[e.prop](e)
            : e.elem.nodeType !== 1 ||
                (!s.cssHooks[e.prop] && e.elem.style[Wn(e.prop)] == null)
              ? (e.elem[e.prop] = e.now)
              : s.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }).scrollTop = Me.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (s.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (s.fx = Me.prototype.init),
    (s.fx.step = {});
  var zt,
    bn,
    Ut,
    xi,
    zi = /^(?:toggle|show|hide)$/,
    Ui = /queueHooks$/;
  function zn() {
    bn &&
      (j.hidden === !1 && A.requestAnimationFrame
        ? A.requestAnimationFrame(zn)
        : A.setTimeout(zn, s.fx.interval),
      s.fx.tick());
  }
  function Ti() {
    return (
      A.setTimeout(function () {
        zt = void 0;
      }),
      (zt = Date.now())
    );
  }
  function He(e, t) {
    var i,
      o = 0,
      r = { height: e };
    for (t = t ? 1 : 0; o < 4; o += 2 - t)
      r["margin" + (i = $e[o])] = r["padding" + i] = e;
    return t && (r.opacity = r.width = e), r;
  }
  function Un(e, t, i) {
    for (
      var o,
        r = (Ve.tweeners[t] || []).concat(Ve.tweeners["*"]),
        l = 0,
        c = r.length;
      l < c;
      l++
    )
      if ((o = r[l].call(i, t, e))) return o;
  }
  function Ve(e, t, i) {
    var o,
      r,
      l = 0,
      c = Ve.prefilters.length,
      d = s.Deferred().always(function () {
        delete h.elem;
      }),
      h = function () {
        if (r) return !1;
        for (
          var w = zt || Ti(),
            v = Math.max(0, m.startTime + m.duration - w),
            T = 1 - (v / m.duration || 0),
            U = 0,
            G = m.tweens.length;
          U < G;
          U++
        )
          m.tweens[U].run(T);
        return (
          d.notifyWith(e, [m, T, v]),
          T < 1 && G
            ? v
            : (G || d.notifyWith(e, [m, 1, 0]), d.resolveWith(e, [m]), !1)
        );
      },
      m = d.promise({
        elem: e,
        props: s.extend({}, t),
        opts: s.extend(!0, { specialEasing: {}, easing: s.easing._default }, i),
        originalProperties: t,
        originalOptions: i,
        startTime: zt || Ti(),
        duration: i.duration,
        tweens: [],
        createTween: function (w, v) {
          var T = s.Tween(
            e,
            m.opts,
            w,
            v,
            m.opts.specialEasing[w] || m.opts.easing,
          );
          return m.tweens.push(T), T;
        },
        stop: function (w) {
          var v = 0,
            T = w ? m.tweens.length : 0;
          if (r) return this;
          for (r = !0; v < T; v++) m.tweens[v].run(1);
          return (
            w
              ? (d.notifyWith(e, [m, 1, 0]), d.resolveWith(e, [m, w]))
              : d.rejectWith(e, [m, w]),
            this
          );
        },
      }),
      b = m.props;
    for (
      !(function (w, v) {
        var T, U, G, J, we;
        for (T in w)
          if (
            ((G = v[(U = rt(T))]),
            (J = w[T]),
            Array.isArray(J) && ((G = J[1]), (J = w[T] = J[0])),
            T !== U && ((w[U] = J), delete w[T]),
            (we = s.cssHooks[U]) && ("expand" in we))
          )
            for (T in ((J = we.expand(J)), delete w[U], J))
              (T in w) || ((w[T] = J[T]), (v[T] = G));
          else v[U] = G;
      })(b, m.opts.specialEasing);
      l < c;
      l++
    )
      if ((o = Ve.prefilters[l].call(m, e, b, m.opts)))
        return (
          q(o.stop) &&
            (s._queueHooks(m.elem, m.opts.queue).stop = o.stop.bind(o)),
          o
        );
    return (
      s.map(b, Un, m),
      q(m.opts.start) && m.opts.start.call(e, m),
      m
        .progress(m.opts.progress)
        .done(m.opts.done, m.opts.complete)
        .fail(m.opts.fail)
        .always(m.opts.always),
      s.fx.timer(s.extend(h, { elem: e, anim: m, queue: m.opts.queue })),
      m
    );
  }
  (s.Animation = s.extend(Ve, {
    tweeners: {
      "*": [
        function (e, t) {
          var i = this.createTween(e, t);
          return ci(i.elem, e, yt.exec(t), i), i;
        },
      ],
    },
    tweener: function (e, t) {
      q(e) ? ((t = e), (e = ["*"])) : (e = e.match(Ue));
      for (var i, o = 0, r = e.length; o < r; o++)
        (i = e[o]),
          (Ve.tweeners[i] = Ve.tweeners[i] || []),
          Ve.tweeners[i].unshift(t);
    },
    prefilters: [
      function (e, t, i) {
        var o,
          r,
          l,
          c,
          d,
          h,
          m,
          b,
          w = "width" in t || "height" in t,
          v = this,
          T = {},
          U = e.style,
          G = e.nodeType && Ft(e),
          J = V.get(e, "fxshow");
        for (o in (i.queue ||
          ((c = s._queueHooks(e, "fx")).unqueued == null &&
            ((c.unqueued = 0),
            (d = c.empty.fire),
            (c.empty.fire = function () {
              c.unqueued || d();
            })),
          c.unqueued++,
          v.always(function () {
            v.always(function () {
              c.unqueued--, s.queue(e, "fx").length || c.empty.fire();
            });
          })),
        t))
          if (((r = t[o]), zi.test(r))) {
            if (
              (delete t[o],
              (l = l || r === "toggle"),
              r === (G ? "hide" : "show"))
            ) {
              if (r !== "show" || !J || J[o] === void 0) continue;
              G = !0;
            }
            T[o] = (J && J[o]) || s.style(e, o);
          }
        if ((h = !s.isEmptyObject(t)) || !s.isEmptyObject(T))
          for (o in (w &&
            e.nodeType === 1 &&
            ((i.overflow = [U.overflow, U.overflowX, U.overflowY]),
            (m = J && J.display) == null && (m = V.get(e, "display")),
            (b = s.css(e, "display")) === "none" &&
              (m
                ? (b = m)
                : (Bt([e], !0),
                  (m = e.style.display || m),
                  (b = s.css(e, "display")),
                  Bt([e]))),
            (b === "inline" || (b === "inline-block" && m != null)) &&
              s.css(e, "float") === "none" &&
              (h ||
                (v.done(function () {
                  U.display = m;
                }),
                m == null && ((b = U.display), (m = b === "none" ? "" : b))),
              (U.display = "inline-block"))),
          i.overflow &&
            ((U.overflow = "hidden"),
            v.always(function () {
              (U.overflow = i.overflow[0]),
                (U.overflowX = i.overflow[1]),
                (U.overflowY = i.overflow[2]);
            })),
          (h = !1),
          T))
            h ||
              (J
                ? "hidden" in J && (G = J.hidden)
                : (J = V.access(e, "fxshow", { display: m })),
              l && (J.hidden = !G),
              G && Bt([e], !0),
              v.done(function () {
                for (o in (G || Bt([e]), V.remove(e, "fxshow"), T))
                  s.style(e, o, T[o]);
              })),
              (h = Un(G ? J[o] : 0, o, v)),
              o in J ||
                ((J[o] = h.start), G && ((h.end = h.start), (h.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? Ve.prefilters.unshift(e) : Ve.prefilters.push(e);
    },
  })),
    (s.speed = function (e, t, i) {
      var o =
        e && typeof e == "object"
          ? s.extend({}, e)
          : {
              complete: i || (!i && t) || (q(e) && e),
              duration: e,
              easing: (i && t) || (t && !q(t) && t),
            };
      return (
        s.fx.off
          ? (o.duration = 0)
          : typeof o.duration != "number" &&
            (o.duration in s.fx.speeds
              ? (o.duration = s.fx.speeds[o.duration])
              : (o.duration = s.fx.speeds._default)),
        (o.queue != null && o.queue !== !0) || (o.queue = "fx"),
        (o.old = o.complete),
        (o.complete = function () {
          q(o.old) && o.old.call(this), o.queue && s.dequeue(this, o.queue);
        }),
        o
      );
    }),
    s.fn.extend({
      fadeTo: function (e, t, i, o) {
        return this.filter(Ft)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, i, o);
      },
      animate: function (e, t, i, o) {
        var r = s.isEmptyObject(e),
          l = s.speed(t, i, o),
          c = function () {
            var d = Ve(this, s.extend({}, e), l);
            (r || V.get(this, "finish")) && d.stop(!0);
          };
        return (
          (c.finish = c),
          r || l.queue === !1 ? this.each(c) : this.queue(l.queue, c)
        );
      },
      stop: function (e, t, i) {
        var o = function (r) {
          var l = r.stop;
          delete r.stop, l(i);
        };
        return (
          typeof e != "string" && ((i = t), (t = e), (e = void 0)),
          t && this.queue(e || "fx", []),
          this.each(function () {
            var r = !0,
              l = e != null && e + "queueHooks",
              c = s.timers,
              d = V.get(this);
            if (l) d[l] && d[l].stop && o(d[l]);
            else for (l in d) d[l] && d[l].stop && Ui.test(l) && o(d[l]);
            for (l = c.length; l--; )
              c[l].elem !== this ||
                (e != null && c[l].queue !== e) ||
                (c[l].anim.stop(i), (r = !1), c.splice(l, 1));
            (!r && i) || s.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          e !== !1 && (e = e || "fx"),
          this.each(function () {
            var t,
              i = V.get(this),
              o = i[e + "queue"],
              r = i[e + "queueHooks"],
              l = s.timers,
              c = o ? o.length : 0;
            for (
              i.finish = !0,
                s.queue(this, e, []),
                r && r.stop && r.stop.call(this, !0),
                t = l.length;
              t--;

            )
              l[t].elem === this &&
                l[t].queue === e &&
                (l[t].anim.stop(!0), l.splice(t, 1));
            for (t = 0; t < c; t++)
              o[t] && o[t].finish && o[t].finish.call(this);
            delete i.finish;
          })
        );
      },
    }),
    s.each(["toggle", "show", "hide"], function (e, t) {
      var i = s.fn[t];
      s.fn[t] = function (o, r, l) {
        return o == null || typeof o == "boolean"
          ? i.apply(this, arguments)
          : this.animate(He(t, !0), o, r, l);
      };
    }),
    s.each(
      {
        slideDown: He("show"),
        slideUp: He("hide"),
        slideToggle: He("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        s.fn[e] = function (i, o, r) {
          return this.animate(t, i, o, r);
        };
      },
    ),
    (s.timers = []),
    (s.fx.tick = function () {
      var e,
        t = 0,
        i = s.timers;
      for (zt = Date.now(); t < i.length; t++)
        (e = i[t])() || i[t] !== e || i.splice(t--, 1);
      i.length || s.fx.stop(), (zt = void 0);
    }),
    (s.fx.timer = function (e) {
      s.timers.push(e), s.fx.start();
    }),
    (s.fx.interval = 13),
    (s.fx.start = function () {
      bn || ((bn = !0), zn());
    }),
    (s.fx.stop = function () {
      bn = null;
    }),
    (s.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (s.fn.delay = function (e, t) {
      return (
        (e = (s.fx && s.fx.speeds[e]) || e),
        (t = t || "fx"),
        this.queue(t, function (i, o) {
          var r = A.setTimeout(i, e);
          o.stop = function () {
            A.clearTimeout(r);
          };
        })
      );
    }),
    (Ut = j.createElement("input")),
    (xi = j.createElement("select").appendChild(j.createElement("option"))),
    (Ut.type = "checkbox"),
    (D.checkOn = Ut.value !== ""),
    (D.optSelected = xi.selected),
    ((Ut = j.createElement("input")).value = "t"),
    (Ut.type = "radio"),
    (D.radioValue = Ut.value === "t");
  var Xn,
    sn = s.expr.attrHandle;
  s.fn.extend({
    attr: function (e, t) {
      return st(this, s.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        s.removeAttr(this, e);
      });
    },
  }),
    s.extend({
      attr: function (e, t, i) {
        var o,
          r,
          l = e.nodeType;
        if (l !== 3 && l !== 8 && l !== 2)
          return typeof e.getAttribute > "u"
            ? s.prop(e, t, i)
            : ((l === 1 && s.isXMLDoc(e)) ||
                (r =
                  s.attrHooks[t.toLowerCase()] ||
                  (s.expr.match.bool.test(t) ? Xn : void 0)),
              i !== void 0
                ? i === null
                  ? void s.removeAttr(e, t)
                  : r && "set" in r && (o = r.set(e, i, t)) !== void 0
                    ? o
                    : (e.setAttribute(t, i + ""), i)
                : r && "get" in r && (o = r.get(e, t)) !== null
                  ? o
                  : (o = s.find.attr(e, t)) == null
                    ? void 0
                    : o);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!D.radioValue && t === "radio" && ne(e, "input")) {
              var i = e.value;
              return e.setAttribute("type", t), i && (e.value = i), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var i,
          o = 0,
          r = t && t.match(Ue);
        if (r && e.nodeType === 1) for (; (i = r[o++]); ) e.removeAttribute(i);
      },
    }),
    (Xn = {
      set: function (e, t, i) {
        return t === !1 ? s.removeAttr(e, i) : e.setAttribute(i, i), i;
      },
    }),
    s.each(s.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var i = sn[t] || s.find.attr;
      sn[t] = function (o, r, l) {
        var c,
          d,
          h = r.toLowerCase();
        return (
          l ||
            ((d = sn[h]),
            (sn[h] = c),
            (c = i(o, r, l) != null ? h : null),
            (sn[h] = d)),
          c
        );
      };
    });
  var Xi = /^(?:input|select|textarea|button)$/i,
    Ci = /^(?:a|area)$/i;
  function lt(e) {
    return (e.match(Ue) || []).join(" ");
  }
  function $t(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function Vn(e) {
    return Array.isArray(e) ? e : (typeof e == "string" && e.match(Ue)) || [];
  }
  s.fn.extend({
    prop: function (e, t) {
      return st(this, s.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[s.propFix[e] || e];
      });
    },
  }),
    s.extend({
      prop: function (e, t, i) {
        var o,
          r,
          l = e.nodeType;
        if (l !== 3 && l !== 8 && l !== 2)
          return (
            (l === 1 && s.isXMLDoc(e)) ||
              ((t = s.propFix[t] || t), (r = s.propHooks[t])),
            i !== void 0
              ? r && "set" in r && (o = r.set(e, i, t)) !== void 0
                ? o
                : (e[t] = i)
              : r && "get" in r && (o = r.get(e, t)) !== null
                ? o
                : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = s.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : Xi.test(e.nodeName) || (Ci.test(e.nodeName) && e.href)
                ? 0
                : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    D.optSelected ||
      (s.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    s.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        s.propFix[this.toLowerCase()] = this;
      },
    ),
    s.fn.extend({
      addClass: function (e) {
        var t, i, o, r, l, c;
        return q(e)
          ? this.each(function (d) {
              s(this).addClass(e.call(this, d, $t(this)));
            })
          : (t = Vn(e)).length
            ? this.each(function () {
                if (
                  ((o = $t(this)),
                  (i = this.nodeType === 1 && " " + lt(o) + " "))
                ) {
                  for (l = 0; l < t.length; l++)
                    (r = t[l]), i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                  (c = lt(i)), o !== c && this.setAttribute("class", c);
                }
              })
            : this;
      },
      removeClass: function (e) {
        var t, i, o, r, l, c;
        return q(e)
          ? this.each(function (d) {
              s(this).removeClass(e.call(this, d, $t(this)));
            })
          : arguments.length
            ? (t = Vn(e)).length
              ? this.each(function () {
                  if (
                    ((o = $t(this)),
                    (i = this.nodeType === 1 && " " + lt(o) + " "))
                  ) {
                    for (l = 0; l < t.length; l++)
                      for (r = t[l]; -1 < i.indexOf(" " + r + " "); )
                        i = i.replace(" " + r + " ", " ");
                    (c = lt(i)), o !== c && this.setAttribute("class", c);
                  }
                })
              : this
            : this.attr("class", "");
      },
      toggleClass: function (e, t) {
        var i,
          o,
          r,
          l,
          c = typeof e,
          d = c === "string" || Array.isArray(e);
        return q(e)
          ? this.each(function (h) {
              s(this).toggleClass(e.call(this, h, $t(this), t), t);
            })
          : typeof t == "boolean" && d
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : ((i = Vn(e)),
              this.each(function () {
                if (d)
                  for (l = s(this), r = 0; r < i.length; r++)
                    (o = i[r]),
                      l.hasClass(o) ? l.removeClass(o) : l.addClass(o);
                else
                  (e !== void 0 && c !== "boolean") ||
                    ((o = $t(this)) && V.set(this, "__className__", o),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        o || e === !1 ? "" : V.get(this, "__className__") || "",
                      ));
              }));
      },
      hasClass: function (e) {
        var t,
          i,
          o = 0;
        for (t = " " + e + " "; (i = this[o++]); )
          if (i.nodeType === 1 && -1 < (" " + lt($t(i)) + " ").indexOf(t))
            return !0;
        return !1;
      },
    });
  var ki = /\r/g;
  s.fn.extend({
    val: function (e) {
      var t,
        i,
        o,
        r = this[0];
      return arguments.length
        ? ((o = q(e)),
          this.each(function (l) {
            var c;
            this.nodeType === 1 &&
              ((c = o ? e.call(this, l, s(this).val()) : e) == null
                ? (c = "")
                : typeof c == "number"
                  ? (c += "")
                  : Array.isArray(c) &&
                    (c = s.map(c, function (d) {
                      return d == null ? "" : d + "";
                    })),
              ((t =
                s.valHooks[this.type] ||
                s.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in t &&
                t.set(this, c, "value") !== void 0) ||
                (this.value = c));
          }))
        : r
          ? (t = s.valHooks[r.type] || s.valHooks[r.nodeName.toLowerCase()]) &&
            "get" in t &&
            (i = t.get(r, "value")) !== void 0
            ? i
            : typeof (i = r.value) == "string"
              ? i.replace(ki, "")
              : (i ?? "")
          : void 0;
    },
  }),
    s.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = s.find.attr(e, "value");
            return t ?? lt(s.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              i,
              o,
              r = e.options,
              l = e.selectedIndex,
              c = e.type === "select-one",
              d = c ? null : [],
              h = c ? l + 1 : r.length;
            for (o = l < 0 ? h : c ? l : 0; o < h; o++)
              if (
                ((i = r[o]).selected || o === l) &&
                !i.disabled &&
                (!i.parentNode.disabled || !ne(i.parentNode, "optgroup"))
              ) {
                if (((t = s(i).val()), c)) return t;
                d.push(t);
              }
            return d;
          },
          set: function (e, t) {
            for (
              var i, o, r = e.options, l = s.makeArray(t), c = r.length;
              c--;

            )
              ((o = r[c]).selected =
                -1 < s.inArray(s.valHooks.option.get(o), l)) && (i = !0);
            return i || (e.selectedIndex = -1), l;
          },
        },
      },
    }),
    s.each(["radio", "checkbox"], function () {
      (s.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = -1 < s.inArray(s(e).val(), t));
        },
      }),
        D.checkOn ||
          (s.valHooks[this].get = function (e) {
            return e.getAttribute("value") === null ? "on" : e.value;
          });
    });
  var rn = A.location,
    Ei = { guid: Date.now() },
    _n = /\?/;
  s.parseXML = function (e) {
    var t, i;
    if (!e || typeof e != "string") return null;
    try {
      t = new A.DOMParser().parseFromString(e, "text/xml");
    } catch {}
    return (
      (i = t && t.getElementsByTagName("parsererror")[0]),
      (t && !i) ||
        s.error(
          "Invalid XML: " +
            (i
              ? s.map(i.childNodes, function (o) {
                  return o.textContent;
                }).join(`
`)
              : e),
        ),
      t
    );
  };
  var Kn = /^(?:focusinfocus|focusoutblur)$/,
    Yn = function (e) {
      e.stopPropagation();
    };
  s.extend(s.event, {
    trigger: function (e, t, i, o) {
      var r,
        l,
        c,
        d,
        h,
        m,
        b,
        w,
        v = [i || j],
        T = Y.call(e, "type") ? e.type : e,
        U = Y.call(e, "namespace") ? e.namespace.split(".") : [];
      if (
        ((l = w = c = i = i || j),
        i.nodeType !== 3 &&
          i.nodeType !== 8 &&
          !Kn.test(T + s.event.triggered) &&
          (-1 < T.indexOf(".") && ((T = (U = T.split(".")).shift()), U.sort()),
          (h = T.indexOf(":") < 0 && "on" + T),
          ((e = e[s.expando]
            ? e
            : new s.Event(T, typeof e == "object" && e)).isTrigger = o ? 2 : 3),
          (e.namespace = U.join(".")),
          (e.rnamespace = e.namespace
            ? new RegExp("(^|\\.)" + U.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (e.result = void 0),
          e.target || (e.target = i),
          (t = t == null ? [e] : s.makeArray(t, [e])),
          (b = s.event.special[T] || {}),
          o || !b.trigger || b.trigger.apply(i, t) !== !1))
      ) {
        if (!o && !b.noBubble && !Z(i)) {
          for (
            d = b.delegateType || T, Kn.test(d + T) || (l = l.parentNode);
            l;
            l = l.parentNode
          )
            v.push(l), (c = l);
          c === (i.ownerDocument || j) &&
            v.push(c.defaultView || c.parentWindow || A);
        }
        for (r = 0; (l = v[r++]) && !e.isPropagationStopped(); )
          (w = l),
            (e.type = 1 < r ? d : b.bindType || T),
            (m =
              (V.get(l, "events") || Object.create(null))[e.type] &&
              V.get(l, "handle")) && m.apply(l, t),
            (m = h && l[h]) &&
              m.apply &&
              Jt(l) &&
              ((e.result = m.apply(l, t)),
              e.result === !1 && e.preventDefault());
        return (
          (e.type = T),
          o ||
            e.isDefaultPrevented() ||
            (b._default && b._default.apply(v.pop(), t) !== !1) ||
            !Jt(i) ||
            (h &&
              q(i[T]) &&
              !Z(i) &&
              ((c = i[h]) && (i[h] = null),
              (s.event.triggered = T),
              e.isPropagationStopped() && w.addEventListener(T, Yn),
              i[T](),
              e.isPropagationStopped() && w.removeEventListener(T, Yn),
              (s.event.triggered = void 0),
              c && (i[h] = c))),
          e.result
        );
      }
    },
    simulate: function (e, t, i) {
      var o = s.extend(new s.Event(), i, { type: e, isSimulated: !0 });
      s.event.trigger(o, null, t);
    },
  }),
    s.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          s.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var i = this[0];
        if (i) return s.event.trigger(e, t, i, !0);
      },
    });
  var wn = /\[\]$/,
    Qn = /\r?\n/g,
    Gn = /^(?:submit|button|image|reset|file)$/i,
    Ke = /^(?:input|select|textarea|keygen)/i;
  function Jn(e, t, i, o) {
    var r;
    if (Array.isArray(t))
      s.each(t, function (l, c) {
        i || wn.test(e)
          ? o(e, c)
          : Jn(
              e + "[" + (typeof c == "object" && c != null ? l : "") + "]",
              c,
              i,
              o,
            );
      });
    else if (i || oe(t) !== "object") o(e, t);
    else for (r in t) Jn(e + "[" + r + "]", t[r], i, o);
  }
  (s.param = function (e, t) {
    var i,
      o = [],
      r = function (l, c) {
        var d = q(c) ? c() : c;
        o[o.length] = encodeURIComponent(l) + "=" + encodeURIComponent(d ?? "");
      };
    if (e == null) return "";
    if (Array.isArray(e) || (e.jquery && !s.isPlainObject(e)))
      s.each(e, function () {
        r(this.name, this.value);
      });
    else for (i in e) Jn(i, e[i], t, r);
    return o.join("&");
  }),
    s.fn.extend({
      serialize: function () {
        return s.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = s.prop(this, "elements");
          return e ? s.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !s(this).is(":disabled") &&
              Ke.test(this.nodeName) &&
              !Gn.test(e) &&
              (this.checked || !en.test(e))
            );
          })
          .map(function (e, t) {
            var i = s(this).val();
            return i == null
              ? null
              : Array.isArray(i)
                ? s.map(i, function (o) {
                    return {
                      name: t.name,
                      value: o.replace(
                        Qn,
                        `\r
`,
                      ),
                    };
                  })
                : {
                    name: t.name,
                    value: i.replace(
                      Qn,
                      `\r
`,
                    ),
                  };
          })
          .get();
      },
    });
  var Vi = /%20/g,
    Ai = /#.*$/,
    Si = /([?&])_=[^&]*/,
    Ki = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Yi = /^(?:GET|HEAD)$/,
    Qi = /^\/\//,
    Oi = {},
    Zn = {},
    Li = "*/".concat("*"),
    xn = j.createElement("a");
  function ei(e) {
    return function (t, i) {
      typeof t != "string" && ((i = t), (t = "*"));
      var o,
        r = 0,
        l = t.toLowerCase().match(Ue) || [];
      if (q(i))
        for (; (o = l[r++]); )
          o[0] === "+"
            ? ((o = o.slice(1) || "*"), (e[o] = e[o] || []).unshift(i))
            : (e[o] = e[o] || []).push(i);
    };
  }
  function Tn(e, t, i, o) {
    var r = {},
      l = e === Zn;
    function c(d) {
      var h;
      return (
        (r[d] = !0),
        s.each(e[d] || [], function (m, b) {
          var w = b(t, i, o);
          return typeof w != "string" || l || r[w]
            ? l
              ? !(h = w)
              : void 0
            : (t.dataTypes.unshift(w), c(w), !1);
        }),
        h
      );
    }
    return c(t.dataTypes[0]) || (!r["*"] && c("*"));
  }
  function ti(e, t) {
    var i,
      o,
      r = s.ajaxSettings.flatOptions || {};
    for (i in t) t[i] !== void 0 && ((r[i] ? e : o || (o = {}))[i] = t[i]);
    return o && s.extend(!0, e, o), e;
  }
  (xn.href = rn.href),
    s.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: rn.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            rn.protocol,
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Li,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": s.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? ti(ti(e, s.ajaxSettings), t) : ti(s.ajaxSettings, e);
      },
      ajaxPrefilter: ei(Oi),
      ajaxTransport: ei(Zn),
      ajax: function (e, t) {
        typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
        var i,
          o,
          r,
          l,
          c,
          d,
          h,
          m,
          b,
          w,
          v = s.ajaxSetup({}, t),
          T = v.context || v,
          U = v.context && (T.nodeType || T.jquery) ? s(T) : s.event,
          G = s.Deferred(),
          J = s.Callbacks("once memory"),
          we = v.statusCode || {},
          Ee = {},
          ut = {},
          ht = "canceled",
          se = {
            readyState: 0,
            getResponseHeader: function (ce) {
              var me;
              if (h) {
                if (!l)
                  for (l = {}; (me = Ki.exec(r)); )
                    l[me[1].toLowerCase() + " "] = (
                      l[me[1].toLowerCase() + " "] || []
                    ).concat(me[2]);
                me = l[ce.toLowerCase() + " "];
              }
              return me == null ? null : me.join(", ");
            },
            getAllResponseHeaders: function () {
              return h ? r : null;
            },
            setRequestHeader: function (ce, me) {
              return (
                h == null &&
                  ((ce = ut[ce.toLowerCase()] = ut[ce.toLowerCase()] || ce),
                  (Ee[ce] = me)),
                this
              );
            },
            overrideMimeType: function (ce) {
              return h == null && (v.mimeType = ce), this;
            },
            statusCode: function (ce) {
              var me;
              if (ce)
                if (h) se.always(ce[se.status]);
                else for (me in ce) we[me] = [we[me], ce[me]];
              return this;
            },
            abort: function (ce) {
              var me = ce || ht;
              return i && i.abort(me), dt(0, me), this;
            },
          };
        if (
          (G.promise(se),
          (v.url = ((e || v.url || rn.href) + "").replace(
            Qi,
            rn.protocol + "//",
          )),
          (v.type = t.method || t.type || v.method || v.type),
          (v.dataTypes = (v.dataType || "*").toLowerCase().match(Ue) || [""]),
          v.crossDomain == null)
        ) {
          d = j.createElement("a");
          try {
            (d.href = v.url),
              (d.href = d.href),
              (v.crossDomain =
                xn.protocol + "//" + xn.host != d.protocol + "//" + d.host);
          } catch {
            v.crossDomain = !0;
          }
        }
        if (
          (v.data &&
            v.processData &&
            typeof v.data != "string" &&
            (v.data = s.param(v.data, v.traditional)),
          Tn(Oi, v, t, se),
          h)
        )
          return se;
        for (b in ((m = s.event && v.global) &&
          s.active++ == 0 &&
          s.event.trigger("ajaxStart"),
        (v.type = v.type.toUpperCase()),
        (v.hasContent = !Yi.test(v.type)),
        (o = v.url.replace(Ai, "")),
        v.hasContent
          ? v.data &&
            v.processData &&
            (v.contentType || "").indexOf(
              "application/x-www-form-urlencoded",
            ) === 0 &&
            (v.data = v.data.replace(Vi, "+"))
          : ((w = v.url.slice(o.length)),
            v.data &&
              (v.processData || typeof v.data == "string") &&
              ((o += (_n.test(o) ? "&" : "?") + v.data), delete v.data),
            v.cache === !1 &&
              ((o = o.replace(Si, "$1")),
              (w = (_n.test(o) ? "&" : "?") + "_=" + Ei.guid++ + w)),
            (v.url = o + w)),
        v.ifModified &&
          (s.lastModified[o] &&
            se.setRequestHeader("If-Modified-Since", s.lastModified[o]),
          s.etag[o] && se.setRequestHeader("If-None-Match", s.etag[o])),
        ((v.data && v.hasContent && v.contentType !== !1) || t.contentType) &&
          se.setRequestHeader("Content-Type", v.contentType),
        se.setRequestHeader(
          "Accept",
          v.dataTypes[0] && v.accepts[v.dataTypes[0]]
            ? v.accepts[v.dataTypes[0]] +
                (v.dataTypes[0] !== "*" ? ", " + Li + "; q=0.01" : "")
            : v.accepts["*"],
        ),
        v.headers))
          se.setRequestHeader(b, v.headers[b]);
        if (v.beforeSend && (v.beforeSend.call(T, se, v) === !1 || h))
          return se.abort();
        if (
          ((ht = "abort"),
          J.add(v.complete),
          se.done(v.success),
          se.fail(v.error),
          (i = Tn(Zn, v, t, se)))
        ) {
          if (((se.readyState = 1), m && U.trigger("ajaxSend", [se, v]), h))
            return se;
          v.async &&
            0 < v.timeout &&
            (c = A.setTimeout(function () {
              se.abort("timeout");
            }, v.timeout));
          try {
            (h = !1), i.send(Ee, dt);
          } catch (ce) {
            if (h) throw ce;
            dt(-1, ce);
          }
        } else dt(-1, "No Transport");
        function dt(ce, me, wt, an) {
          var pt,
            ln,
            xt,
            qe,
            Xt,
            Ye = me;
          h ||
            ((h = !0),
            c && A.clearTimeout(c),
            (i = void 0),
            (r = an || ""),
            (se.readyState = 0 < ce ? 4 : 0),
            (pt = (200 <= ce && ce < 300) || ce === 304),
            wt &&
              (qe = (function (xe, be, je) {
                for (
                  var Tt, Pe, X, ve, _e = xe.contents, fe = xe.dataTypes;
                  fe[0] === "*";

                )
                  fe.shift(),
                    Tt === void 0 &&
                      (Tt =
                        xe.mimeType || be.getResponseHeader("Content-Type"));
                if (Tt) {
                  for (Pe in _e)
                    if (_e[Pe] && _e[Pe].test(Tt)) {
                      fe.unshift(Pe);
                      break;
                    }
                }
                if (fe[0] in je) X = fe[0];
                else {
                  for (Pe in je) {
                    if (!fe[0] || xe.converters[Pe + " " + fe[0]]) {
                      X = Pe;
                      break;
                    }
                    ve || (ve = Pe);
                  }
                  X = X || ve;
                }
                if (X) return X !== fe[0] && fe.unshift(X), je[X];
              })(v, se, wt)),
            !pt &&
              -1 < s.inArray("script", v.dataTypes) &&
              s.inArray("json", v.dataTypes) < 0 &&
              (v.converters["text script"] = function () {}),
            (qe = (function (xe, be, je, Tt) {
              var Pe,
                X,
                ve,
                _e,
                fe,
                ft = {},
                Vt = xe.dataTypes.slice();
              if (Vt[1])
                for (ve in xe.converters)
                  ft[ve.toLowerCase()] = xe.converters[ve];
              for (X = Vt.shift(); X; )
                if (
                  (xe.responseFields[X] && (je[xe.responseFields[X]] = be),
                  !fe &&
                    Tt &&
                    xe.dataFilter &&
                    (be = xe.dataFilter(be, xe.dataType)),
                  (fe = X),
                  (X = Vt.shift()))
                ) {
                  if (X === "*") X = fe;
                  else if (fe !== "*" && fe !== X) {
                    if (!(ve = ft[fe + " " + X] || ft["* " + X])) {
                      for (Pe in ft)
                        if (
                          (_e = Pe.split(" "))[1] === X &&
                          (ve = ft[fe + " " + _e[0]] || ft["* " + _e[0]])
                        ) {
                          ve === !0
                            ? (ve = ft[Pe])
                            : ft[Pe] !== !0 && ((X = _e[0]), Vt.unshift(_e[1]));
                          break;
                        }
                    }
                    if (ve !== !0)
                      if (ve && xe.throws) be = ve(be);
                      else
                        try {
                          be = ve(be);
                        } catch (Dt) {
                          return {
                            state: "parsererror",
                            error: ve
                              ? Dt
                              : "No conversion from " + fe + " to " + X,
                          };
                        }
                  }
                }
              return { state: "success", data: be };
            })(v, qe, se, pt)),
            pt
              ? (v.ifModified &&
                  ((Xt = se.getResponseHeader("Last-Modified")) &&
                    (s.lastModified[o] = Xt),
                  (Xt = se.getResponseHeader("etag")) && (s.etag[o] = Xt)),
                ce === 204 || v.type === "HEAD"
                  ? (Ye = "nocontent")
                  : ce === 304
                    ? (Ye = "notmodified")
                    : ((Ye = qe.state),
                      (ln = qe.data),
                      (pt = !(xt = qe.error))))
              : ((xt = Ye),
                (!ce && Ye) || ((Ye = "error"), ce < 0 && (ce = 0))),
            (se.status = ce),
            (se.statusText = (me || Ye) + ""),
            pt ? G.resolveWith(T, [ln, Ye, se]) : G.rejectWith(T, [se, Ye, xt]),
            se.statusCode(we),
            (we = void 0),
            m &&
              U.trigger(pt ? "ajaxSuccess" : "ajaxError", [
                se,
                v,
                pt ? ln : xt,
              ]),
            J.fireWith(T, [se, Ye]),
            m &&
              (U.trigger("ajaxComplete", [se, v]),
              --s.active || s.event.trigger("ajaxStop")));
        }
        return se;
      },
      getJSON: function (e, t, i) {
        return s.get(e, t, i, "json");
      },
      getScript: function (e, t) {
        return s.get(e, void 0, t, "script");
      },
    }),
    s.each(["get", "post"], function (e, t) {
      s[t] = function (i, o, r, l) {
        return (
          q(o) && ((l = l || r), (r = o), (o = void 0)),
          s.ajax(
            s.extend(
              { url: i, type: t, dataType: l, data: o, success: r },
              s.isPlainObject(i) && i,
            ),
          )
        );
      };
    }),
    s.ajaxPrefilter(function (e) {
      var t;
      for (t in e.headers)
        t.toLowerCase() === "content-type" &&
          (e.contentType = e.headers[t] || "");
    }),
    (s._evalUrl = function (e, t, i) {
      return s.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (o) {
          s.globalEval(o, t, i);
        },
      });
    }),
    s.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (q(e) && (e = e.call(this[0])),
            (t = s(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (var i = this; i.firstElementChild; )
                  i = i.firstElementChild;
                return i;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (e) {
        return q(e)
          ? this.each(function (t) {
              s(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = s(this),
                i = t.contents();
              i.length ? i.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = q(e);
        return this.each(function (i) {
          s(this).wrapAll(t ? e.call(this, i) : e);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              s(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (s.expr.pseudos.hidden = function (e) {
      return !s.expr.pseudos.visible(e);
    }),
    (s.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (s.ajaxSettings.xhr = function () {
      try {
        return new A.XMLHttpRequest();
      } catch {}
    });
  var Gi = { 0: 200, 1223: 204 },
    et = s.ajaxSettings.xhr();
  (D.cors = !!et && "withCredentials" in et),
    (D.ajax = et = !!et),
    s.ajaxTransport(function (e) {
      var t, i;
      if (D.cors || (et && !e.crossDomain))
        return {
          send: function (o, r) {
            var l,
              c = e.xhr();
            if (
              (c.open(e.type, e.url, e.async, e.username, e.password),
              e.xhrFields)
            )
              for (l in e.xhrFields) c[l] = e.xhrFields[l];
            for (l in (e.mimeType &&
              c.overrideMimeType &&
              c.overrideMimeType(e.mimeType),
            e.crossDomain ||
              o["X-Requested-With"] ||
              (o["X-Requested-With"] = "XMLHttpRequest"),
            o))
              c.setRequestHeader(l, o[l]);
            (t = function (d) {
              return function () {
                t &&
                  ((t =
                    i =
                    c.onload =
                    c.onerror =
                    c.onabort =
                    c.ontimeout =
                    c.onreadystatechange =
                      null),
                  d === "abort"
                    ? c.abort()
                    : d === "error"
                      ? typeof c.status != "number"
                        ? r(0, "error")
                        : r(c.status, c.statusText)
                      : r(
                          Gi[c.status] || c.status,
                          c.statusText,
                          (c.responseType || "text") !== "text" ||
                            typeof c.responseText != "string"
                            ? { binary: c.response }
                            : { text: c.responseText },
                          c.getAllResponseHeaders(),
                        ));
              };
            }),
              (c.onload = t()),
              (i = c.onerror = c.ontimeout = t("error")),
              c.onabort !== void 0
                ? (c.onabort = i)
                : (c.onreadystatechange = function () {
                    c.readyState === 4 &&
                      A.setTimeout(function () {
                        t && i();
                      });
                  }),
              (t = t("abort"));
            try {
              c.send((e.hasContent && e.data) || null);
            } catch (d) {
              if (t) throw d;
            }
          },
          abort: function () {
            t && t();
          },
        };
    }),
    s.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    s.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return s.globalEval(e), e;
        },
      },
    }),
    s.ajaxPrefilter("script", function (e) {
      e.cache === void 0 && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    s.ajaxTransport("script", function (e) {
      var t, i;
      if (e.crossDomain || e.scriptAttrs)
        return {
          send: function (o, r) {
            (t = s("<script>")
              .attr(e.scriptAttrs || {})
              .prop({ charset: e.scriptCharset, src: e.url })
              .on(
                "load error",
                (i = function (l) {
                  t.remove(),
                    (i = null),
                    l && r(l.type === "error" ? 404 : 200, l.type);
                }),
              )),
              j.head.appendChild(t[0]);
          },
          abort: function () {
            i && i();
          },
        };
    });
  var ct,
    ni = [],
    ii = /(=)\?(?=&|$)|\?\?/;
  s.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = ni.pop() || s.expando + "_" + Ei.guid++;
      return (this[e] = !0), e;
    },
  }),
    s.ajaxPrefilter("json jsonp", function (e, t, i) {
      var o,
        r,
        l,
        c =
          e.jsonp !== !1 &&
          (ii.test(e.url)
            ? "url"
            : typeof e.data == "string" &&
              (e.contentType || "").indexOf(
                "application/x-www-form-urlencoded",
              ) === 0 &&
              ii.test(e.data) &&
              "data");
      if (c || e.dataTypes[0] === "jsonp")
        return (
          (o = e.jsonpCallback =
            q(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
          c
            ? (e[c] = e[c].replace(ii, "$1" + o))
            : e.jsonp !== !1 &&
              (e.url += (_n.test(e.url) ? "&" : "?") + e.jsonp + "=" + o),
          (e.converters["script json"] = function () {
            return l || s.error(o + " was not called"), l[0];
          }),
          (e.dataTypes[0] = "json"),
          (r = A[o]),
          (A[o] = function () {
            l = arguments;
          }),
          i.always(function () {
            r === void 0 ? s(A).removeProp(o) : (A[o] = r),
              e[o] && ((e.jsonpCallback = t.jsonpCallback), ni.push(o)),
              l && q(r) && r(l[0]),
              (l = r = void 0);
          }),
          "script"
        );
    }),
    (D.createHTMLDocument =
      (((ct = j.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      ct.childNodes.length === 2)),
    (s.parseHTML = function (e, t, i) {
      return typeof e != "string"
        ? []
        : (typeof t == "boolean" && ((i = t), (t = !1)),
          t ||
            (D.createHTMLDocument
              ? (((o = (t =
                  j.implementation.createHTMLDocument("")).createElement(
                  "base",
                )).href = j.location.href),
                t.head.appendChild(o))
              : (t = j)),
          (l = !i && []),
          (r = k.exec(e))
            ? [t.createElement(r[1])]
            : ((r = hi([e], t, l)),
              l && l.length && s(l).remove(),
              s.merge([], r.childNodes)));
      var o, r, l;
    }),
    (s.fn.load = function (e, t, i) {
      var o,
        r,
        l,
        c = this,
        d = e.indexOf(" ");
      return (
        -1 < d && ((o = lt(e.slice(d))), (e = e.slice(0, d))),
        q(t)
          ? ((i = t), (t = void 0))
          : t && typeof t == "object" && (r = "POST"),
        0 < c.length &&
          s
            .ajax({ url: e, type: r || "GET", dataType: "html", data: t })
            .done(function (h) {
              (l = arguments),
                c.html(o ? s("<div>").append(s.parseHTML(h)).find(o) : h);
            })
            .always(
              i &&
                function (h, m) {
                  c.each(function () {
                    i.apply(this, l || [h.responseText, m, h]);
                  });
                },
            ),
        this
      );
    }),
    (s.expr.pseudos.animated = function (e) {
      return s.grep(s.timers, function (t) {
        return e === t.elem;
      }).length;
    }),
    (s.offset = {
      setOffset: function (e, t, i) {
        var o,
          r,
          l,
          c,
          d,
          h,
          m = s.css(e, "position"),
          b = s(e),
          w = {};
        m === "static" && (e.style.position = "relative"),
          (d = b.offset()),
          (l = s.css(e, "top")),
          (h = s.css(e, "left")),
          (m === "absolute" || m === "fixed") && -1 < (l + h).indexOf("auto")
            ? ((c = (o = b.position()).top), (r = o.left))
            : ((c = parseFloat(l) || 0), (r = parseFloat(h) || 0)),
          q(t) && (t = t.call(e, i, s.extend({}, d))),
          t.top != null && (w.top = t.top - d.top + c),
          t.left != null && (w.left = t.left - d.left + r),
          "using" in t ? t.using.call(e, w) : b.css(w);
      },
    }),
    s.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return e === void 0
            ? this
            : this.each(function (r) {
                s.offset.setOffset(this, e, r);
              });
        var t,
          i,
          o = this[0];
        return o
          ? o.getClientRects().length
            ? ((t = o.getBoundingClientRect()),
              (i = o.ownerDocument.defaultView),
              { top: t.top + i.pageYOffset, left: t.left + i.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            i,
            o = this[0],
            r = { top: 0, left: 0 };
          if (s.css(o, "position") === "fixed") t = o.getBoundingClientRect();
          else {
            for (
              t = this.offset(),
                i = o.ownerDocument,
                e = o.offsetParent || i.documentElement;
              e &&
              (e === i.body || e === i.documentElement) &&
              s.css(e, "position") === "static";

            )
              e = e.parentNode;
            e &&
              e !== o &&
              e.nodeType === 1 &&
              (((r = s(e).offset()).top += s.css(e, "borderTopWidth", !0)),
              (r.left += s.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - r.top - s.css(o, "marginTop", !0),
            left: t.left - r.left - s.css(o, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && s.css(e, "position") === "static";

          )
            e = e.offsetParent;
          return e || Xe;
        });
      },
    }),
    s.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, t) {
        var i = t === "pageYOffset";
        s.fn[e] = function (o) {
          return st(
            this,
            function (r, l, c) {
              var d;
              if (
                (Z(r) ? (d = r) : r.nodeType === 9 && (d = r.defaultView),
                c === void 0)
              )
                return d ? d[t] : r[l];
              d
                ? d.scrollTo(i ? d.pageXOffset : c, i ? c : d.pageYOffset)
                : (r[l] = c);
            },
            e,
            o,
            arguments.length,
          );
        };
      },
    ),
    s.each(["top", "left"], function (e, t) {
      s.cssHooks[t] = Bn(D.pixelPosition, function (i, o) {
        if (o)
          return (o = on(i, t)), Rn.test(o) ? s(i).position()[t] + "px" : o;
      });
    }),
    s.each({ Height: "height", Width: "width" }, function (e, t) {
      s.each(
        { padding: "inner" + e, content: t, "": "outer" + e },
        function (i, o) {
          s.fn[o] = function (r, l) {
            var c = arguments.length && (i || typeof r != "boolean"),
              d = i || (r === !0 || l === !0 ? "margin" : "border");
            return st(
              this,
              function (h, m, b) {
                var w;
                return Z(h)
                  ? o.indexOf("outer") === 0
                    ? h["inner" + e]
                    : h.document.documentElement["client" + e]
                  : h.nodeType === 9
                    ? ((w = h.documentElement),
                      Math.max(
                        h.body["scroll" + e],
                        w["scroll" + e],
                        h.body["offset" + e],
                        w["offset" + e],
                        w["client" + e],
                      ))
                    : b === void 0
                      ? s.css(h, m, d)
                      : s.style(h, m, b, d);
              },
              t,
              c ? r : void 0,
              c,
            );
          };
        },
      );
    }),
    s.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        s.fn[t] = function (i) {
          return this.on(t, i);
        };
      },
    ),
    s.fn.extend({
      bind: function (e, t, i) {
        return this.on(e, null, t, i);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, i, o) {
        return this.on(t, e, i, o);
      },
      undelegate: function (e, t, i) {
        return arguments.length === 1
          ? this.off(e, "**")
          : this.off(t, e || "**", i);
      },
      hover: function (e, t) {
        return this.on("mouseenter", e).on("mouseleave", t || e);
      },
    }),
    s.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " ",
      ),
      function (e, t) {
        s.fn[t] = function (i, o) {
          return 0 < arguments.length
            ? this.on(t, null, i, o)
            : this.trigger(t);
        };
      },
    );
  var Di = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  (s.proxy = function (e, t) {
    var i, o, r;
    if ((typeof t == "string" && ((i = e[t]), (t = e), (e = i)), q(e)))
      return (
        (o = E.call(arguments, 2)),
        ((r = function () {
          return e.apply(t || this, o.concat(E.call(arguments)));
        }).guid = e.guid =
          e.guid || s.guid++),
        r
      );
  }),
    (s.holdReady = function (e) {
      e ? s.readyWait++ : s.ready(!0);
    }),
    (s.isArray = Array.isArray),
    (s.parseJSON = JSON.parse),
    (s.nodeName = ne),
    (s.isFunction = q),
    (s.isWindow = Z),
    (s.camelCase = rt),
    (s.type = oe),
    (s.now = Date.now),
    (s.isNumeric = function (e) {
      var t = s.type(e);
      return (t === "number" || t === "string") && !isNaN(e - parseFloat(e));
    }),
    (s.trim = function (e) {
      return e == null ? "" : (e + "").replace(Di, "$1");
    }),
    typeof define == "function" &&
      define.amd &&
      define("jquery", [], function () {
        return s;
      });
  var Ni = A.jQuery,
    ji = A.$;
  return (
    (s.noConflict = function (e) {
      return A.$ === s && (A.$ = ji), e && A.jQuery === s && (A.jQuery = Ni), s;
    }),
    typeof R > "u" && (A.jQuery = A.$ = s),
    s
  );
});
/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ (function (A, R) {
  typeof exports == "object" && typeof module < "u"
    ? (module.exports = R(require("@popperjs/core")))
    : typeof define == "function" && define.amd
      ? define(["@popperjs/core"], R)
      : ((A = typeof globalThis < "u" ? globalThis : A || self).bootstrap = R(
          A.Popper,
        ));
})(this, function (A) {
  "use strict";
  function R(p) {
    const n = Object.create(null, {
      [Symbol.toStringTag]: { value: "Module" },
    });
    if (p) {
      for (const a in p)
        if (a !== "default") {
          const f = Object.getOwnPropertyDescriptor(p, a);
          Object.defineProperty(
            n,
            a,
            f.get ? f : { enumerable: !0, get: () => p[a] },
          );
        }
    }
    return (n.default = p), Object.freeze(n);
  }
  const ye = R(A),
    S = new Map(),
    E = {
      set(p, n, a) {
        S.has(p) || S.set(p, new Map());
        const f = S.get(p);
        f.has(n) || f.size === 0
          ? f.set(n, a)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(f.keys())[0]}.`,
            );
      },
      get: (p, n) => (S.has(p) && S.get(p).get(n)) || null,
      remove(p, n) {
        if (!S.has(p)) return;
        const a = S.get(p);
        a.delete(n), a.size === 0 && S.delete(p);
      },
    },
    H = "transitionend",
    ae = (p) => (
      p &&
        window.CSS &&
        window.CSS.escape &&
        (p = p.replace(/#([^\s"#']+)/g, (n, a) => `#${CSS.escape(a)}`)),
      p
    ),
    he = (p) => {
      p.dispatchEvent(new Event(H));
    },
    L = (p) =>
      !(!p || typeof p != "object") &&
      (p.jquery !== void 0 && (p = p[0]), p.nodeType !== void 0),
    M = (p) =>
      L(p)
        ? p.jquery
          ? p[0]
          : p
        : typeof p == "string" && p.length > 0
          ? document.querySelector(ae(p))
          : null,
    Y = (p) => {
      if (!L(p) || p.getClientRects().length === 0) return !1;
      const n =
          getComputedStyle(p).getPropertyValue("visibility") === "visible",
        a = p.closest("details:not([open])");
      if (!a) return n;
      if (a !== p) {
        const f = p.closest("summary");
        if ((f && f.parentNode !== a) || f === null) return !1;
      }
      return n;
    },
    O = (p) =>
      !p ||
      p.nodeType !== Node.ELEMENT_NODE ||
      !!p.classList.contains("disabled") ||
      (p.disabled !== void 0
        ? p.disabled
        : p.hasAttribute("disabled") && p.getAttribute("disabled") !== "false"),
    F = (p) => {
      if (!document.documentElement.attachShadow) return null;
      if (typeof p.getRootNode == "function") {
        const n = p.getRootNode();
        return n instanceof ShadowRoot ? n : null;
      }
      return p instanceof ShadowRoot
        ? p
        : p.parentNode
          ? F(p.parentNode)
          : null;
    },
    D = () => {},
    q = (p) => {
      p.offsetHeight;
    },
    Z = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    j = [],
    ie = () => document.documentElement.dir === "rtl",
    le = (p) => {
      var n;
      (n = () => {
        const a = Z();
        if (a) {
          const f = p.NAME,
            C = a.fn[f];
          (a.fn[f] = p.jQueryInterface),
            (a.fn[f].Constructor = p),
            (a.fn[f].noConflict = () => ((a.fn[f] = C), p.jQueryInterface));
        }
      }),
        document.readyState === "loading"
          ? (j.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const a of j) a();
              }),
            j.push(n))
          : n();
    },
    oe = (p, n = [], a = p) => (typeof p == "function" ? p(...n) : a),
    De = (p, n, a = !0) => {
      if (!a) return void oe(p);
      const f =
        ((W) => {
          if (!W) return 0;
          let { transitionDuration: de, transitionDelay: Te } =
            window.getComputedStyle(W);
          const Ge = Number.parseFloat(de),
            nt = Number.parseFloat(Te);
          return Ge || nt
            ? ((de = de.split(",")[0]),
              (Te = Te.split(",")[0]),
              1e3 * (Number.parseFloat(de) + Number.parseFloat(Te)))
            : 0;
        })(n) + 5;
      let C = !1;
      const N = ({ target: W }) => {
        W === n && ((C = !0), n.removeEventListener(H, N), oe(p));
      };
      n.addEventListener(H, N),
        setTimeout(() => {
          C || he(n);
        }, f);
    },
    Oe = (p, n, a, f) => {
      const C = p.length;
      let N = p.indexOf(n);
      return N === -1
        ? !a && f
          ? p[C - 1]
          : p[0]
        : ((N += a ? 1 : -1),
          f && (N = (N + C) % C),
          p[Math.max(0, Math.min(N, C - 1))]);
    },
    s = /[^.]*(?=\..*)\.|.*/,
    Je = /\..*/,
    ne = /::\d+$/,
    Se = {};
  let Ce = 1;
  const ge = { mouseenter: "mouseover", mouseleave: "mouseout" },
    ee = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function it(p, n) {
    return (n && `${n}::${Ce++}`) || p.uidEvent || Ce++;
  }
  function dn(p) {
    const n = it(p);
    return (p.uidEvent = n), (Se[n] = Se[n] || {}), Se[n];
  }
  function qt(p, n, a = null) {
    return Object.values(p).find(
      (f) => f.callable === n && f.delegationSelector === a,
    );
  }
  function ot(p, n, a) {
    const f = typeof n == "string",
      C = f ? a : n || a;
    let N = Dn(p);
    return ee.has(N) || (N = p), [f, C, N];
  }
  function pn(p, n, a, f, C) {
    if (typeof n != "string" || !p) return;
    let [N, W, de] = ot(n, a, f);
    n in ge &&
      (W = ((un) =>
        function (kt) {
          if (
            !kt.relatedTarget ||
            (kt.relatedTarget !== kt.delegateTarget &&
              !kt.delegateTarget.contains(kt.relatedTarget))
          )
            return un.call(this, kt);
        })(W));
    const Te = dn(p),
      Ge = Te[de] || (Te[de] = {}),
      nt = qt(Ge, W, N ? a : null);
    if (nt) return void (nt.oneOff = nt.oneOff && C);
    const Ct = it(W, n.replace(s, "")),
      Mt = N
        ? (function (Ht, un, kt) {
            return function ai(Ii) {
              const Ji = Ht.querySelectorAll(un);
              for (
                let { target: hn } = Ii;
                hn && hn !== this;
                hn = hn.parentNode
              )
                for (const Zi of Ji)
                  if (Zi === hn)
                    return (
                      Yt(Ii, { delegateTarget: hn }),
                      ai.oneOff && k.off(Ht, Ii.type, un, kt),
                      kt.apply(hn, [Ii])
                    );
            };
          })(p, a, W)
        : (function (Ht, un) {
            return function kt(ai) {
              return (
                Yt(ai, { delegateTarget: Ht }),
                kt.oneOff && k.off(Ht, ai.type, un),
                un.apply(Ht, [ai])
              );
            };
          })(p, W);
    (Mt.delegationSelector = N ? a : null),
      (Mt.callable = W),
      (Mt.oneOff = C),
      (Mt.uidEvent = Ct),
      (Ge[Ct] = Mt),
      p.addEventListener(de, Mt, N);
  }
  function Et(p, n, a, f, C) {
    const N = qt(n[a], f, C);
    N && (p.removeEventListener(a, N, !!C), delete n[a][N.uidEvent]);
  }
  function li(p, n, a, f) {
    const C = n[a] || {};
    for (const [N, W] of Object.entries(C))
      N.includes(f) && Et(p, n, a, W.callable, W.delegationSelector);
  }
  function Dn(p) {
    return (p = p.replace(Je, "")), ge[p] || p;
  }
  const k = {
    on(p, n, a, f) {
      pn(p, n, a, f, !1);
    },
    one(p, n, a, f) {
      pn(p, n, a, f, !0);
    },
    off(p, n, a, f) {
      if (typeof n != "string" || !p) return;
      const [C, N, W] = ot(n, a, f),
        de = W !== n,
        Te = dn(p),
        Ge = Te[W] || {},
        nt = n.startsWith(".");
      if (N === void 0) {
        if (nt) for (const Ct of Object.keys(Te)) li(p, Te, Ct, n.slice(1));
        for (const [Ct, Mt] of Object.entries(Ge)) {
          const Ht = Ct.replace(ne, "");
          (de && !n.includes(Ht)) ||
            Et(p, Te, W, Mt.callable, Mt.delegationSelector);
        }
      } else {
        if (!Object.keys(Ge).length) return;
        Et(p, Te, W, N, C ? a : null);
      }
    },
    trigger(p, n, a) {
      if (typeof n != "string" || !p) return null;
      const f = Z();
      let C = null,
        N = !0,
        W = !0,
        de = !1;
      n !== Dn(n) &&
        f &&
        ((C = f.Event(n, a)),
        f(p).trigger(C),
        (N = !C.isPropagationStopped()),
        (W = !C.isImmediatePropagationStopped()),
        (de = C.isDefaultPrevented()));
      const Te = Yt(new Event(n, { bubbles: N, cancelable: !0 }), a);
      return (
        de && Te.preventDefault(),
        W && p.dispatchEvent(Te),
        Te.defaultPrevented && C && C.preventDefault(),
        Te
      );
    },
  };
  function Yt(p, n = {}) {
    for (const [a, f] of Object.entries(n))
      try {
        p[a] = f;
      } catch {
        Object.defineProperty(p, a, { configurable: !0, get: () => f });
      }
    return p;
  }
  function Nn(p) {
    if (p === "true") return !0;
    if (p === "false") return !1;
    if (p === Number(p).toString()) return Number(p);
    if (p === "" || p === "null") return null;
    if (typeof p != "string") return p;
    try {
      return JSON.parse(decodeURIComponent(p));
    } catch {
      return p;
    }
  }
  function jn(p) {
    return p.replace(/[A-Z]/g, (n) => `-${n.toLowerCase()}`);
  }
  const mt = {
    setDataAttribute(p, n, a) {
      p.setAttribute(`data-bs-${jn(n)}`, a);
    },
    removeDataAttribute(p, n) {
      p.removeAttribute(`data-bs-${jn(n)}`);
    },
    getDataAttributes(p) {
      if (!p) return {};
      const n = {},
        a = Object.keys(p.dataset).filter(
          (f) => f.startsWith("bs") && !f.startsWith("bsConfig"),
        );
      for (const f of a) {
        let C = f.replace(/^bs/, "");
        (C = C.charAt(0).toLowerCase() + C.slice(1, C.length)),
          (n[C] = Nn(p.dataset[f]));
      }
      return n;
    },
    getDataAttribute: (p, n) => Nn(p.getAttribute(`data-bs-${jn(n)}`)),
  };
  class Qt {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!',
      );
    }
    _getConfig(n) {
      return (
        (n = this._mergeConfigObj(n)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    _configAfterMerge(n) {
      return n;
    }
    _mergeConfigObj(n, a) {
      const f = L(a) ? mt.getDataAttribute(a, "config") : {};
      return {
        ...this.constructor.Default,
        ...(typeof f == "object" ? f : {}),
        ...(L(a) ? mt.getDataAttributes(a) : {}),
        ...(typeof n == "object" ? n : {}),
      };
    }
    _typeCheckConfig(n, a = this.constructor.DefaultType) {
      for (const [C, N] of Object.entries(a)) {
        const W = n[C],
          de = L(W)
            ? "element"
            : (f = W) == null
              ? `${f}`
              : Object.prototype.toString
                  .call(f)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
        if (!new RegExp(N).test(de))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${C}" provided type "${de}" but expected type "${N}".`,
          );
      }
      var f;
    }
  }
  class ze extends Qt {
    constructor(n, a) {
      super(),
        (n = M(n)) &&
          ((this._element = n),
          (this._config = this._getConfig(a)),
          E.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      E.remove(this._element, this.constructor.DATA_KEY),
        k.off(this._element, this.constructor.EVENT_KEY);
      for (const n of Object.getOwnPropertyNames(this)) this[n] = null;
    }
    _queueCallback(n, a, f = !0) {
      De(n, a, f);
    }
    _getConfig(n) {
      return (
        (n = this._mergeConfigObj(n, this._element)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    static getInstance(n) {
      return E.get(M(n), this.DATA_KEY);
    }
    static getOrCreateInstance(n, a = {}) {
      return (
        this.getInstance(n) || new this(n, typeof a == "object" ? a : null)
      );
    }
    static get VERSION() {
      return "5.3.3";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(n) {
      return `${n}${this.EVENT_KEY}`;
    }
  }
  const Ue = (p) => {
      let n = p.getAttribute("data-bs-target");
      if (!n || n === "#") {
        let a = p.getAttribute("href");
        if (!a || (!a.includes("#") && !a.startsWith("."))) return null;
        a.includes("#") && !a.startsWith("#") && (a = `#${a.split("#")[1]}`),
          (n = a && a !== "#" ? a.trim() : null);
      }
      return n
        ? n
            .split(",")
            .map((a) => ae(a))
            .join(",")
        : null;
    },
    z = {
      find: (p, n = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(n, p)),
      findOne: (p, n = document.documentElement) =>
        Element.prototype.querySelector.call(n, p),
      children: (p, n) => [].concat(...p.children).filter((a) => a.matches(n)),
      parents(p, n) {
        const a = [];
        let f = p.parentNode.closest(n);
        for (; f; ) a.push(f), (f = f.parentNode.closest(n));
        return a;
      },
      prev(p, n) {
        let a = p.previousElementSibling;
        for (; a; ) {
          if (a.matches(n)) return [a];
          a = a.previousElementSibling;
        }
        return [];
      },
      next(p, n) {
        let a = p.nextElementSibling;
        for (; a; ) {
          if (a.matches(n)) return [a];
          a = a.nextElementSibling;
        }
        return [];
      },
      focusableChildren(p) {
        const n = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((a) => `${a}:not([tabindex^="-"])`)
          .join(",");
        return this.find(n, p).filter((a) => !O(a) && Y(a));
      },
      getSelectorFromElement(p) {
        const n = Ue(p);
        return n && z.findOne(n) ? n : null;
      },
      getElementFromSelector(p) {
        const n = Ue(p);
        return n ? z.findOne(n) : null;
      },
      getMultipleElementsFromSelector(p) {
        const n = Ue(p);
        return n ? z.find(n) : [];
      },
    },
    jt = (p, n = "hide") => {
      const a = `click.dismiss${p.EVENT_KEY}`,
        f = p.NAME;
      k.on(document, a, `[data-bs-dismiss="${f}"]`, function (C) {
        if (
          (["A", "AREA"].includes(this.tagName) && C.preventDefault(), O(this))
        )
          return;
        const N = z.getElementFromSelector(this) || this.closest(`.${f}`);
        p.getOrCreateInstance(N)[n]();
      });
    },
    Pn = ".bs.alert",
    $i = `close${Pn}`,
    In = `closed${Pn}`;
  class At extends ze {
    static get NAME() {
      return "alert";
    }
    close() {
      if (k.trigger(this._element, $i).defaultPrevented) return;
      this._element.classList.remove("show");
      const n = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, n);
    }
    _destroyElement() {
      this._element.remove(), k.trigger(this._element, In), this.dispose();
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = At.getOrCreateInstance(this);
        if (typeof n == "string") {
          if (a[n] === void 0 || n.startsWith("_") || n === "constructor")
            throw new TypeError(`No method named "${n}"`);
          a[n](this);
        }
      });
    }
  }
  jt(At, "close"), le(At);
  const st = '[data-bs-toggle="button"]';
  class Gt extends ze {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active"),
      );
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = Gt.getOrCreateInstance(this);
        n === "toggle" && a[n]();
      });
    }
  }
  k.on(document, "click.bs.button.data-api", st, (p) => {
    p.preventDefault();
    const n = p.target.closest(st);
    Gt.getOrCreateInstance(n).toggle();
  }),
    le(Gt);
  const Rt = ".bs.swipe",
    Mi = `touchstart${Rt}`,
    rt = `touchmove${Rt}`,
    Jt = `touchend${Rt}`,
    Zt = `pointerdown${Rt}`,
    V = `pointerup${Rt}`,
    Ie = { endCallback: null, leftCallback: null, rightCallback: null },
    Hi = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class fn extends Qt {
    constructor(n, a) {
      super(),
        (this._element = n),
        n &&
          fn.isSupported() &&
          ((this._config = this._getConfig(a)),
          (this._deltaX = 0),
          (this._supportPointerEvents = !!window.PointerEvent),
          this._initEvents());
    }
    static get Default() {
      return Ie;
    }
    static get DefaultType() {
      return Hi;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      k.off(this._element, Rt);
    }
    _start(n) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(n) && (this._deltaX = n.clientX)
        : (this._deltaX = n.touches[0].clientX);
    }
    _end(n) {
      this._eventIsPointerPenTouch(n) &&
        (this._deltaX = n.clientX - this._deltaX),
        this._handleSwipe(),
        oe(this._config.endCallback);
    }
    _move(n) {
      this._deltaX =
        n.touches && n.touches.length > 1
          ? 0
          : n.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const n = Math.abs(this._deltaX);
      if (n <= 40) return;
      const a = n / this._deltaX;
      (this._deltaX = 0),
        a && oe(a > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (k.on(this._element, Zt, (n) => this._start(n)),
          k.on(this._element, V, (n) => this._end(n)),
          this._element.classList.add("pointer-event"))
        : (k.on(this._element, Mi, (n) => this._start(n)),
          k.on(this._element, rt, (n) => this._move(n)),
          k.on(this._element, Jt, (n) => this._end(n)));
    }
    _eventIsPointerPenTouch(n) {
      return (
        this._supportPointerEvents &&
        (n.pointerType === "pen" || n.pointerType === "touch")
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const vt = ".bs.carousel",
    $n = ".data-api",
    yt = "next",
    $e = "prev",
    Xe = "left",
    bt = "right",
    qi = `slide${vt}`,
    Ft = `slid${vt}`,
    ci = `keydown${vt}`,
    ui = `mouseenter${vt}`,
    Bt = `mouseleave${vt}`,
    Pt = `dragstart${vt}`,
    gn = `load${vt}${$n}`,
    en = `click${vt}${$n}`,
    Mn = "carousel",
    tn = "active",
    Fe = ".active",
    Ne = ".carousel-item",
    Hn = Fe + Ne,
    Ri = { ArrowLeft: bt, ArrowRight: Xe },
    hi = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    di = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class Ze extends ze {
    constructor(n, a) {
      super(n, a),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = z.findOne(
          ".carousel-indicators",
          this._element,
        )),
        this._addEventListeners(),
        this._config.ride === Mn && this.cycle();
    }
    static get Default() {
      return hi;
    }
    static get DefaultType() {
      return di;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(yt);
    }
    nextWhenVisible() {
      !document.hidden && Y(this._element) && this.next();
    }
    prev() {
      this._slide($e);
    }
    pause() {
      this._isSliding && he(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval,
        ));
    }
    _maybeEnableCycle() {
      this._config.ride &&
        (this._isSliding
          ? k.one(this._element, Ft, () => this.cycle())
          : this.cycle());
    }
    to(n) {
      const a = this._getItems();
      if (n > a.length - 1 || n < 0) return;
      if (this._isSliding)
        return void k.one(this._element, Ft, () => this.to(n));
      const f = this._getItemIndex(this._getActive());
      if (f === n) return;
      const C = n > f ? yt : $e;
      this._slide(C, a[n]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(n) {
      return (n.defaultInterval = n.interval), n;
    }
    _addEventListeners() {
      this._config.keyboard && k.on(this._element, ci, (n) => this._keydown(n)),
        this._config.pause === "hover" &&
          (k.on(this._element, ui, () => this.pause()),
          k.on(this._element, Bt, () => this._maybeEnableCycle())),
        this._config.touch &&
          fn.isSupported() &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const a of z.find(".carousel-item img", this._element))
        k.on(a, Pt, (f) => f.preventDefault());
      const n = {
        leftCallback: () => this._slide(this._directionToOrder(Xe)),
        rightCallback: () => this._slide(this._directionToOrder(bt)),
        endCallback: () => {
          this._config.pause === "hover" &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval,
            )));
        },
      };
      this._swipeHelper = new fn(this._element, n);
    }
    _keydown(n) {
      if (/input|textarea/i.test(n.target.tagName)) return;
      const a = Ri[n.key];
      a && (n.preventDefault(), this._slide(this._directionToOrder(a)));
    }
    _getItemIndex(n) {
      return this._getItems().indexOf(n);
    }
    _setActiveIndicatorElement(n) {
      if (!this._indicatorsElement) return;
      const a = z.findOne(Fe, this._indicatorsElement);
      a.classList.remove(tn), a.removeAttribute("aria-current");
      const f = z.findOne(`[data-bs-slide-to="${n}"]`, this._indicatorsElement);
      f && (f.classList.add(tn), f.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const n = this._activeElement || this._getActive();
      if (!n) return;
      const a = Number.parseInt(n.getAttribute("data-bs-interval"), 10);
      this._config.interval = a || this._config.defaultInterval;
    }
    _slide(n, a = null) {
      if (this._isSliding) return;
      const f = this._getActive(),
        C = n === yt,
        N = a || Oe(this._getItems(), f, C, this._config.wrap);
      if (N === f) return;
      const W = this._getItemIndex(N),
        de = (Ct) =>
          k.trigger(this._element, Ct, {
            relatedTarget: N,
            direction: this._orderToDirection(n),
            from: this._getItemIndex(f),
            to: W,
          });
      if (de(qi).defaultPrevented || !f || !N) return;
      const Te = !!this._interval;
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(W),
        (this._activeElement = N);
      const Ge = C ? "carousel-item-start" : "carousel-item-end",
        nt = C ? "carousel-item-next" : "carousel-item-prev";
      N.classList.add(nt),
        q(N),
        f.classList.add(Ge),
        N.classList.add(Ge),
        this._queueCallback(
          () => {
            N.classList.remove(Ge, nt),
              N.classList.add(tn),
              f.classList.remove(tn, nt, Ge),
              (this._isSliding = !1),
              de(Ft);
          },
          f,
          this._isAnimated(),
        ),
        Te && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return z.findOne(Hn, this._element);
    }
    _getItems() {
      return z.find(Ne, this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(n) {
      return ie() ? (n === Xe ? $e : yt) : n === Xe ? yt : $e;
    }
    _orderToDirection(n) {
      return ie() ? (n === $e ? Xe : bt) : n === $e ? bt : Xe;
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = Ze.getOrCreateInstance(this, n);
        if (typeof n != "number") {
          if (typeof n == "string") {
            if (a[n] === void 0 || n.startsWith("_") || n === "constructor")
              throw new TypeError(`No method named "${n}"`);
            a[n]();
          }
        } else a.to(n);
      });
    }
  }
  k.on(document, en, "[data-bs-slide], [data-bs-slide-to]", function (p) {
    const n = z.getElementFromSelector(this);
    if (!n || !n.classList.contains(Mn)) return;
    p.preventDefault();
    const a = Ze.getOrCreateInstance(n),
      f = this.getAttribute("data-bs-slide-to");
    return f
      ? (a.to(f), void a._maybeEnableCycle())
      : mt.getDataAttribute(this, "slide") === "next"
        ? (a.next(), void a._maybeEnableCycle())
        : (a.prev(), void a._maybeEnableCycle());
  }),
    k.on(window, gn, () => {
      const p = z.find('[data-bs-ride="carousel"]');
      for (const n of p) Ze.getOrCreateInstance(n);
    }),
    le(Ze);
  const at = ".bs.collapse",
    qn = `show${at}`,
    mn = `shown${at}`,
    Fi = `hide${at}`,
    Bi = `hidden${at}`,
    Wi = `click${at}.data-api`,
    vn = "show",
    Wt = "collapse",
    yn = "collapsing",
    pi = `:scope .${Wt} .${Wt}`,
    St = '[data-bs-toggle="collapse"]',
    fi = { parent: null, toggle: !0 },
    Rn = { parent: "(null|element)", toggle: "boolean" };
  class Ot extends ze {
    constructor(n, a) {
      super(n, a), (this._isTransitioning = !1), (this._triggerArray = []);
      const f = z.find(St);
      for (const C of f) {
        const N = z.getSelectorFromElement(C),
          W = z.find(N).filter((de) => de === this._element);
        N !== null && W.length && this._triggerArray.push(C);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return fi;
    }
    static get DefaultType() {
      return Rn;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let n = [];
      if (
        (this._config.parent &&
          (n = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing",
          )
            .filter((C) => C !== this._element)
            .map((C) => Ot.getOrCreateInstance(C, { toggle: !1 }))),
        (n.length && n[0]._isTransitioning) ||
          k.trigger(this._element, qn).defaultPrevented)
      )
        return;
      for (const C of n) C.hide();
      const a = this._getDimension();
      this._element.classList.remove(Wt),
        this._element.classList.add(yn),
        (this._element.style[a] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const f = `scroll${a[0].toUpperCase() + a.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(yn),
            this._element.classList.add(Wt, vn),
            (this._element.style[a] = ""),
            k.trigger(this._element, mn);
        },
        this._element,
        !0,
      ),
        (this._element.style[a] = `${this._element[f]}px`);
    }
    hide() {
      if (
        this._isTransitioning ||
        !this._isShown() ||
        k.trigger(this._element, Fi).defaultPrevented
      )
        return;
      const n = this._getDimension();
      (this._element.style[n] =
        `${this._element.getBoundingClientRect()[n]}px`),
        q(this._element),
        this._element.classList.add(yn),
        this._element.classList.remove(Wt, vn);
      for (const a of this._triggerArray) {
        const f = z.getElementFromSelector(a);
        f && !this._isShown(f) && this._addAriaAndCollapsedClass([a], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[n] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(yn),
              this._element.classList.add(Wt),
              k.trigger(this._element, Bi);
          },
          this._element,
          !0,
        );
    }
    _isShown(n = this._element) {
      return n.classList.contains(vn);
    }
    _configAfterMerge(n) {
      return (n.toggle = !!n.toggle), (n.parent = M(n.parent)), n;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const n = this._getFirstLevelChildren(St);
      for (const a of n) {
        const f = z.getElementFromSelector(a);
        f && this._addAriaAndCollapsedClass([a], this._isShown(f));
      }
    }
    _getFirstLevelChildren(n) {
      const a = z.find(pi, this._config.parent);
      return z.find(n, this._config.parent).filter((f) => !a.includes(f));
    }
    _addAriaAndCollapsedClass(n, a) {
      if (n.length)
        for (const f of n)
          f.classList.toggle("collapsed", !a),
            f.setAttribute("aria-expanded", a);
    }
    static jQueryInterface(n) {
      const a = {};
      return (
        typeof n == "string" && /show|hide/.test(n) && (a.toggle = !1),
        this.each(function () {
          const f = Ot.getOrCreateInstance(this, a);
          if (typeof n == "string") {
            if (f[n] === void 0) throw new TypeError(`No method named "${n}"`);
            f[n]();
          }
        })
      );
    }
  }
  k.on(document, Wi, St, function (p) {
    (p.target.tagName === "A" ||
      (p.delegateTarget && p.delegateTarget.tagName === "A")) &&
      p.preventDefault();
    for (const n of z.getMultipleElementsFromSelector(this))
      Ot.getOrCreateInstance(n, { toggle: !1 }).toggle();
  }),
    le(Ot);
  const nn = "dropdown",
    Lt = ".bs.dropdown",
    Fn = ".data-api",
    on = "ArrowUp",
    Bn = "ArrowDown",
    gi = `hide${Lt}`,
    mi = `hidden${Lt}`,
    vi = `show${Lt}`,
    Wn = `shown${Lt}`,
    yi = `click${Lt}${Fn}`,
    bi = `keydown${Lt}${Fn}`,
    _i = `keyup${Lt}${Fn}`,
    It = "show",
    _t = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    wi = `${_t}.${It}`,
    Me = ".dropdown-menu",
    zt = ie() ? "top-end" : "top-start",
    bn = ie() ? "top-start" : "top-end",
    Ut = ie() ? "bottom-end" : "bottom-start",
    xi = ie() ? "bottom-start" : "bottom-end",
    zi = ie() ? "left-start" : "right-start",
    Ui = ie() ? "right-start" : "left-start",
    zn = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    Ti = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class He extends ze {
    constructor(n, a) {
      super(n, a),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          z.next(this._element, Me)[0] ||
          z.prev(this._element, Me)[0] ||
          z.findOne(Me, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return zn;
    }
    static get DefaultType() {
      return Ti;
    }
    static get NAME() {
      return nn;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (O(this._element) || this._isShown()) return;
      const n = { relatedTarget: this._element };
      if (!k.trigger(this._element, vi, n).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const a of [].concat(...document.body.children))
            k.on(a, "mouseover", D);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(It),
          this._element.classList.add(It),
          k.trigger(this._element, Wn, n);
      }
    }
    hide() {
      if (O(this._element) || !this._isShown()) return;
      const n = { relatedTarget: this._element };
      this._completeHide(n);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(n) {
      if (!k.trigger(this._element, gi, n).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const a of [].concat(...document.body.children))
            k.off(a, "mouseover", D);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(It),
          this._element.classList.remove(It),
          this._element.setAttribute("aria-expanded", "false"),
          mt.removeDataAttribute(this._menu, "popper"),
          k.trigger(this._element, mi, n);
      }
    }
    _getConfig(n) {
      if (
        typeof (n = super._getConfig(n)).reference == "object" &&
        !L(n.reference) &&
        typeof n.reference.getBoundingClientRect != "function"
      )
        throw new TypeError(
          `${nn.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
        );
      return n;
    }
    _createPopper() {
      if (ye === void 0)
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)",
        );
      let n = this._element;
      this._config.reference === "parent"
        ? (n = this._parent)
        : L(this._config.reference)
          ? (n = M(this._config.reference))
          : typeof this._config.reference == "object" &&
            (n = this._config.reference);
      const a = this._getPopperConfig();
      this._popper = ye.createPopper(n, this._menu, a);
    }
    _isShown() {
      return this._menu.classList.contains(It);
    }
    _getPlacement() {
      const n = this._parent;
      if (n.classList.contains("dropend")) return zi;
      if (n.classList.contains("dropstart")) return Ui;
      if (n.classList.contains("dropup-center")) return "top";
      if (n.classList.contains("dropdown-center")) return "bottom";
      const a =
        getComputedStyle(this._menu)
          .getPropertyValue("--bs-position")
          .trim() === "end";
      return n.classList.contains("dropup") ? (a ? bn : zt) : a ? xi : Ut;
    }
    _detectNavbar() {
      return this._element.closest(".navbar") !== null;
    }
    _getOffset() {
      const { offset: n } = this._config;
      return typeof n == "string"
        ? n.split(",").map((a) => Number.parseInt(a, 10))
        : typeof n == "function"
          ? (a) => n(a, this._element)
          : n;
    }
    _getPopperConfig() {
      const n = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || this._config.display === "static") &&
          (mt.setDataAttribute(this._menu, "popper", "static"),
          (n.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...n, ...oe(this._config.popperConfig, [n]) }
      );
    }
    _selectMenuItem({ key: n, target: a }) {
      const f = z
        .find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu,
        )
        .filter((C) => Y(C));
      f.length && Oe(f, a, n === Bn, !f.includes(a)).focus();
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = He.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0) throw new TypeError(`No method named "${n}"`);
          a[n]();
        }
      });
    }
    static clearMenus(n) {
      if (n.button === 2 || (n.type === "keyup" && n.key !== "Tab")) return;
      const a = z.find(wi);
      for (const f of a) {
        const C = He.getInstance(f);
        if (!C || C._config.autoClose === !1) continue;
        const N = n.composedPath(),
          W = N.includes(C._menu);
        if (
          N.includes(C._element) ||
          (C._config.autoClose === "inside" && !W) ||
          (C._config.autoClose === "outside" && W) ||
          (C._menu.contains(n.target) &&
            ((n.type === "keyup" && n.key === "Tab") ||
              /input|select|option|textarea|form/i.test(n.target.tagName)))
        )
          continue;
        const de = { relatedTarget: C._element };
        n.type === "click" && (de.clickEvent = n), C._completeHide(de);
      }
    }
    static dataApiKeydownHandler(n) {
      const a = /input|textarea/i.test(n.target.tagName),
        f = n.key === "Escape",
        C = [on, Bn].includes(n.key);
      if ((!C && !f) || (a && !f)) return;
      n.preventDefault();
      const N = this.matches(_t)
          ? this
          : z.prev(this, _t)[0] ||
            z.next(this, _t)[0] ||
            z.findOne(_t, n.delegateTarget.parentNode),
        W = He.getOrCreateInstance(N);
      if (C) return n.stopPropagation(), W.show(), void W._selectMenuItem(n);
      W._isShown() && (n.stopPropagation(), W.hide(), N.focus());
    }
  }
  k.on(document, bi, _t, He.dataApiKeydownHandler),
    k.on(document, bi, Me, He.dataApiKeydownHandler),
    k.on(document, yi, He.clearMenus),
    k.on(document, _i, He.clearMenus),
    k.on(document, yi, _t, function (p) {
      p.preventDefault(), He.getOrCreateInstance(this).toggle();
    }),
    le(He);
  const Un = "backdrop",
    Ve = "show",
    Xn = `mousedown.bs.${Un}`,
    sn = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    Xi = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class Ci extends Qt {
    constructor(n) {
      super(),
        (this._config = this._getConfig(n)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return sn;
    }
    static get DefaultType() {
      return Xi;
    }
    static get NAME() {
      return Un;
    }
    show(n) {
      if (!this._config.isVisible) return void oe(n);
      this._append();
      const a = this._getElement();
      this._config.isAnimated && q(a),
        a.classList.add(Ve),
        this._emulateAnimation(() => {
          oe(n);
        });
    }
    hide(n) {
      this._config.isVisible
        ? (this._getElement().classList.remove(Ve),
          this._emulateAnimation(() => {
            this.dispose(), oe(n);
          }))
        : oe(n);
    }
    dispose() {
      this._isAppended &&
        (k.off(this._element, Xn),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const n = document.createElement("div");
        (n.className = this._config.className),
          this._config.isAnimated && n.classList.add("fade"),
          (this._element = n);
      }
      return this._element;
    }
    _configAfterMerge(n) {
      return (n.rootElement = M(n.rootElement)), n;
    }
    _append() {
      if (this._isAppended) return;
      const n = this._getElement();
      this._config.rootElement.append(n),
        k.on(n, Xn, () => {
          oe(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(n) {
      De(n, this._getElement(), this._config.isAnimated);
    }
  }
  const lt = ".bs.focustrap",
    $t = `focusin${lt}`,
    Vn = `keydown.tab${lt}`,
    ki = "backward",
    rn = { autofocus: !0, trapElement: null },
    Ei = { autofocus: "boolean", trapElement: "element" };
  class _n extends Qt {
    constructor(n) {
      super(),
        (this._config = this._getConfig(n)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return rn;
    }
    static get DefaultType() {
      return Ei;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        k.off(document, lt),
        k.on(document, $t, (n) => this._handleFocusin(n)),
        k.on(document, Vn, (n) => this._handleKeydown(n)),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), k.off(document, lt));
    }
    _handleFocusin(n) {
      const { trapElement: a } = this._config;
      if (n.target === document || n.target === a || a.contains(n.target))
        return;
      const f = z.focusableChildren(a);
      f.length === 0
        ? a.focus()
        : this._lastTabNavDirection === ki
          ? f[f.length - 1].focus()
          : f[0].focus();
    }
    _handleKeydown(n) {
      n.key === "Tab" &&
        (this._lastTabNavDirection = n.shiftKey ? ki : "forward");
    }
  }
  const Kn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Yn = ".sticky-top",
    wn = "padding-right",
    Qn = "margin-right";
  class Gn {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const n = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - n);
    }
    hide() {
      const n = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, wn, (a) => a + n),
        this._setElementAttributes(Kn, wn, (a) => a + n),
        this._setElementAttributes(Yn, Qn, (a) => a - n);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, wn),
        this._resetElementAttributes(Kn, wn),
        this._resetElementAttributes(Yn, Qn);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(n, a, f) {
      const C = this.getWidth();
      this._applyManipulationCallback(n, (N) => {
        if (N !== this._element && window.innerWidth > N.clientWidth + C)
          return;
        this._saveInitialAttribute(N, a);
        const W = window.getComputedStyle(N).getPropertyValue(a);
        N.style.setProperty(a, `${f(Number.parseFloat(W))}px`);
      });
    }
    _saveInitialAttribute(n, a) {
      const f = n.style.getPropertyValue(a);
      f && mt.setDataAttribute(n, a, f);
    }
    _resetElementAttributes(n, a) {
      this._applyManipulationCallback(n, (f) => {
        const C = mt.getDataAttribute(f, a);
        C !== null
          ? (mt.removeDataAttribute(f, a), f.style.setProperty(a, C))
          : f.style.removeProperty(a);
      });
    }
    _applyManipulationCallback(n, a) {
      if (L(n)) a(n);
      else for (const f of z.find(n, this._element)) a(f);
    }
  }
  const Ke = ".bs.modal",
    Jn = `hide${Ke}`,
    Vi = `hidePrevented${Ke}`,
    Ai = `hidden${Ke}`,
    Si = `show${Ke}`,
    Ki = `shown${Ke}`,
    Yi = `resize${Ke}`,
    Qi = `click.dismiss${Ke}`,
    Oi = `mousedown.dismiss${Ke}`,
    Zn = `keydown.dismiss${Ke}`,
    Li = `click${Ke}.data-api`,
    xn = "modal-open",
    ei = "show",
    Tn = "modal-static",
    ti = { backdrop: !0, focus: !0, keyboard: !0 },
    Gi = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class et extends ze {
    constructor(n, a) {
      super(n, a),
        (this._dialog = z.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new Gn()),
        this._addEventListeners();
    }
    static get Default() {
      return ti;
    }
    static get DefaultType() {
      return Gi;
    }
    static get NAME() {
      return "modal";
    }
    toggle(n) {
      return this._isShown ? this.hide() : this.show(n);
    }
    show(n) {
      this._isShown ||
        this._isTransitioning ||
        k.trigger(this._element, Si, { relatedTarget: n }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(xn),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(n)));
    }
    hide() {
      this._isShown &&
        !this._isTransitioning &&
        (k.trigger(this._element, Jn).defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove(ei),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated(),
          )));
    }
    dispose() {
      k.off(window, Ke),
        k.off(this._dialog, Ke),
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Ci({
        isVisible: !!this._config.backdrop,
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new _n({ trapElement: this._element });
    }
    _showElement(n) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const a = z.findOne(".modal-body", this._dialog);
      a && (a.scrollTop = 0),
        q(this._element),
        this._element.classList.add(ei),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              k.trigger(this._element, Ki, { relatedTarget: n });
          },
          this._dialog,
          this._isAnimated(),
        );
    }
    _addEventListeners() {
      k.on(this._element, Zn, (n) => {
        n.key === "Escape" &&
          (this._config.keyboard
            ? this.hide()
            : this._triggerBackdropTransition());
      }),
        k.on(window, Yi, () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        k.on(this._element, Oi, (n) => {
          k.one(this._element, Qi, (a) => {
            this._element === n.target &&
              this._element === a.target &&
              (this._config.backdrop !== "static"
                ? this._config.backdrop && this.hide()
                : this._triggerBackdropTransition());
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(xn),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            k.trigger(this._element, Ai);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (k.trigger(this._element, Vi).defaultPrevented) return;
      const n =
          this._element.scrollHeight > document.documentElement.clientHeight,
        a = this._element.style.overflowY;
      a === "hidden" ||
        this._element.classList.contains(Tn) ||
        (n || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(Tn),
        this._queueCallback(() => {
          this._element.classList.remove(Tn),
            this._queueCallback(() => {
              this._element.style.overflowY = a;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const n =
          this._element.scrollHeight > document.documentElement.clientHeight,
        a = this._scrollBar.getWidth(),
        f = a > 0;
      if (f && !n) {
        const C = ie() ? "paddingLeft" : "paddingRight";
        this._element.style[C] = `${a}px`;
      }
      if (!f && n) {
        const C = ie() ? "paddingRight" : "paddingLeft";
        this._element.style[C] = `${a}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(n, a) {
      return this.each(function () {
        const f = et.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (f[n] === void 0) throw new TypeError(`No method named "${n}"`);
          f[n](a);
        }
      });
    }
  }
  k.on(document, Li, '[data-bs-toggle="modal"]', function (p) {
    const n = z.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && p.preventDefault(),
      k.one(n, Si, (f) => {
        f.defaultPrevented ||
          k.one(n, Ai, () => {
            Y(this) && this.focus();
          });
      });
    const a = z.findOne(".modal.show");
    a && et.getInstance(a).hide(), et.getOrCreateInstance(n).toggle(this);
  }),
    jt(et),
    le(et);
  const ct = ".bs.offcanvas",
    ni = ".data-api",
    ii = `load${ct}${ni}`,
    Di = "show",
    Ni = "showing",
    ji = "hiding",
    e = ".offcanvas.show",
    t = `show${ct}`,
    i = `shown${ct}`,
    o = `hide${ct}`,
    r = `hidePrevented${ct}`,
    l = `hidden${ct}`,
    c = `resize${ct}`,
    d = `click${ct}${ni}`,
    h = `keydown.dismiss${ct}`,
    m = { backdrop: !0, keyboard: !0, scroll: !1 },
    b = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class w extends ze {
    constructor(n, a) {
      super(n, a),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return m;
    }
    static get DefaultType() {
      return b;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(n) {
      return this._isShown ? this.hide() : this.show(n);
    }
    show(n) {
      this._isShown ||
        k.trigger(this._element, t, { relatedTarget: n }).defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new Gn().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(Ni),
        this._queueCallback(
          () => {
            (this._config.scroll && !this._config.backdrop) ||
              this._focustrap.activate(),
              this._element.classList.add(Di),
              this._element.classList.remove(Ni),
              k.trigger(this._element, i, { relatedTarget: n });
          },
          this._element,
          !0,
        ));
    }
    hide() {
      this._isShown &&
        (k.trigger(this._element, o).defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add(ji),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.classList.remove(Di, ji),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || new Gn().reset(),
                k.trigger(this._element, l);
            },
            this._element,
            !0,
          )));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const n = !!this._config.backdrop;
      return new Ci({
        className: "offcanvas-backdrop",
        isVisible: n,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: n
          ? () => {
              this._config.backdrop !== "static"
                ? this.hide()
                : k.trigger(this._element, r);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new _n({ trapElement: this._element });
    }
    _addEventListeners() {
      k.on(this._element, h, (n) => {
        n.key === "Escape" &&
          (this._config.keyboard ? this.hide() : k.trigger(this._element, r));
      });
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = w.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0 || n.startsWith("_") || n === "constructor")
            throw new TypeError(`No method named "${n}"`);
          a[n](this);
        }
      });
    }
  }
  k.on(document, d, '[data-bs-toggle="offcanvas"]', function (p) {
    const n = z.getElementFromSelector(this);
    if ((["A", "AREA"].includes(this.tagName) && p.preventDefault(), O(this)))
      return;
    k.one(n, l, () => {
      Y(this) && this.focus();
    });
    const a = z.findOne(e);
    a && a !== n && w.getInstance(a).hide(),
      w.getOrCreateInstance(n).toggle(this);
  }),
    k.on(window, ii, () => {
      for (const p of z.find(e)) w.getOrCreateInstance(p).show();
    }),
    k.on(window, c, () => {
      for (const p of z.find("[aria-modal][class*=show][class*=offcanvas-]"))
        getComputedStyle(p).position !== "fixed" &&
          w.getOrCreateInstance(p).hide();
    }),
    jt(w),
    le(w);
  const v = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      dd: [],
      div: [],
      dl: [],
      dt: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    T = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    U = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    G = (p, n) => {
      const a = p.nodeName.toLowerCase();
      return n.includes(a)
        ? !T.has(a) || !!U.test(p.nodeValue)
        : n.filter((f) => f instanceof RegExp).some((f) => f.test(a));
    },
    J = {
      allowList: v,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    we = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    Ee = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class ut extends Qt {
    constructor(n) {
      super(), (this._config = this._getConfig(n));
    }
    static get Default() {
      return J;
    }
    static get DefaultType() {
      return we;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((n) => this._resolvePossibleFunction(n))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(n) {
      return (
        this._checkContent(n),
        (this._config.content = { ...this._config.content, ...n }),
        this
      );
    }
    toHtml() {
      const n = document.createElement("div");
      n.innerHTML = this._maybeSanitize(this._config.template);
      for (const [C, N] of Object.entries(this._config.content))
        this._setContent(n, N, C);
      const a = n.children[0],
        f = this._resolvePossibleFunction(this._config.extraClass);
      return f && a.classList.add(...f.split(" ")), a;
    }
    _typeCheckConfig(n) {
      super._typeCheckConfig(n), this._checkContent(n.content);
    }
    _checkContent(n) {
      for (const [a, f] of Object.entries(n))
        super._typeCheckConfig({ selector: a, entry: f }, Ee);
    }
    _setContent(n, a, f) {
      const C = z.findOne(f, n);
      C &&
        ((a = this._resolvePossibleFunction(a))
          ? L(a)
            ? this._putElementInTemplate(M(a), C)
            : this._config.html
              ? (C.innerHTML = this._maybeSanitize(a))
              : (C.textContent = a)
          : C.remove());
    }
    _maybeSanitize(n) {
      return this._config.sanitize
        ? (function (a, f, C) {
            if (!a.length) return a;
            if (C && typeof C == "function") return C(a);
            const N = new window.DOMParser().parseFromString(a, "text/html"),
              W = [].concat(...N.body.querySelectorAll("*"));
            for (const de of W) {
              const Te = de.nodeName.toLowerCase();
              if (!Object.keys(f).includes(Te)) {
                de.remove();
                continue;
              }
              const Ge = [].concat(...de.attributes),
                nt = [].concat(f["*"] || [], f[Te] || []);
              for (const Ct of Ge) G(Ct, nt) || de.removeAttribute(Ct.nodeName);
            }
            return N.body.innerHTML;
          })(n, this._config.allowList, this._config.sanitizeFn)
        : n;
    }
    _resolvePossibleFunction(n) {
      return oe(n, [this]);
    }
    _putElementInTemplate(n, a) {
      if (this._config.html) return (a.innerHTML = ""), void a.append(n);
      a.textContent = n.textContent;
    }
  }
  const ht = new Set(["sanitize", "allowList", "sanitizeFn"]),
    se = "fade",
    dt = "show",
    ce = ".modal",
    me = "hide.bs.modal",
    wt = "hover",
    an = "focus",
    pt = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: ie() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: ie() ? "right" : "left",
    },
    ln = {
      allowList: v,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 6],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    xt = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class qe extends ze {
    constructor(n, a) {
      if (ye === void 0)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)",
        );
      super(n, a),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return ln;
    }
    static get DefaultType() {
      return xt;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled &&
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout),
        k.off(this._element.closest(ce), me, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title"),
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if (this._element.style.display === "none")
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const n = k.trigger(this._element, this.constructor.eventName("show")),
        a = (
          F(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (n.defaultPrevented || !a) return;
      this._disposePopper();
      const f = this._getTipElement();
      this._element.setAttribute("aria-describedby", f.getAttribute("id"));
      const { container: C } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (C.append(f),
          k.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(f)),
        f.classList.add(dt),
        "ontouchstart" in document.documentElement)
      )
        for (const N of [].concat(...document.body.children))
          k.on(N, "mouseover", D);
      this._queueCallback(
        () => {
          k.trigger(this._element, this.constructor.eventName("shown")),
            this._isHovered === !1 && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated(),
      );
    }
    hide() {
      if (
        this._isShown() &&
        !k.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(dt),
          "ontouchstart" in document.documentElement)
        )
          for (const n of [].concat(...document.body.children))
            k.off(n, "mouseover", D);
        (this._activeTrigger.click = !1),
          (this._activeTrigger[an] = !1),
          (this._activeTrigger[wt] = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                k.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated(),
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return !!this._getTitle();
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate(),
          )),
        this.tip
      );
    }
    _createTipElement(n) {
      const a = this._getTemplateFactory(n).toHtml();
      if (!a) return null;
      a.classList.remove(se, dt),
        a.classList.add(`bs-${this.constructor.NAME}-auto`);
      const f = ((C) => {
        do C += Math.floor(1e6 * Math.random());
        while (document.getElementById(C));
        return C;
      })(this.constructor.NAME).toString();
      return (
        a.setAttribute("id", f), this._isAnimated() && a.classList.add(se), a
      );
    }
    setContent(n) {
      (this._newContent = n),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(n) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(n)
          : (this._templateFactory = new ut({
              ...this._config,
              content: n,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass,
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(n) {
      return this.constructor.getOrCreateInstance(
        n.delegateTarget,
        this._getDelegateConfig(),
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(se))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(dt);
    }
    _createPopper(n) {
      const a = oe(this._config.placement, [this, n, this._element]),
        f = pt[a.toUpperCase()];
      return ye.createPopper(this._element, n, this._getPopperConfig(f));
    }
    _getOffset() {
      const { offset: n } = this._config;
      return typeof n == "string"
        ? n.split(",").map((a) => Number.parseInt(a, 10))
        : typeof n == "function"
          ? (a) => n(a, this._element)
          : n;
    }
    _resolvePossibleFunction(n) {
      return oe(n, [this._element]);
    }
    _getPopperConfig(n) {
      const a = {
        placement: n,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (f) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                f.state.placement,
              );
            },
          },
        ],
      };
      return { ...a, ...oe(this._config.popperConfig, [a]) };
    }
    _setListeners() {
      const n = this._config.trigger.split(" ");
      for (const a of n)
        if (a === "click")
          k.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (f) => {
              this._initializeOnDelegatedTarget(f).toggle();
            },
          );
        else if (a !== "manual") {
          const f =
              a === wt
                ? this.constructor.eventName("mouseenter")
                : this.constructor.eventName("focusin"),
            C =
              a === wt
                ? this.constructor.eventName("mouseleave")
                : this.constructor.eventName("focusout");
          k.on(this._element, f, this._config.selector, (N) => {
            const W = this._initializeOnDelegatedTarget(N);
            (W._activeTrigger[N.type === "focusin" ? an : wt] = !0), W._enter();
          }),
            k.on(this._element, C, this._config.selector, (N) => {
              const W = this._initializeOnDelegatedTarget(N);
              (W._activeTrigger[N.type === "focusout" ? an : wt] =
                W._element.contains(N.relatedTarget)),
                W._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        k.on(this._element.closest(ce), me, this._hideModalHandler);
    }
    _fixTitle() {
      const n = this._element.getAttribute("title");
      n &&
        (this._element.getAttribute("aria-label") ||
          this._element.textContent.trim() ||
          this._element.setAttribute("aria-label", n),
        this._element.setAttribute("data-bs-original-title", n),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(n, a) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(n, a));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(n) {
      const a = mt.getDataAttributes(this._element);
      for (const f of Object.keys(a)) ht.has(f) && delete a[f];
      return (
        (n = { ...a, ...(typeof n == "object" && n ? n : {}) }),
        (n = this._mergeConfigObj(n)),
        (n = this._configAfterMerge(n)),
        this._typeCheckConfig(n),
        n
      );
    }
    _configAfterMerge(n) {
      return (
        (n.container = n.container === !1 ? document.body : M(n.container)),
        typeof n.delay == "number" &&
          (n.delay = { show: n.delay, hide: n.delay }),
        typeof n.title == "number" && (n.title = n.title.toString()),
        typeof n.content == "number" && (n.content = n.content.toString()),
        n
      );
    }
    _getDelegateConfig() {
      const n = {};
      for (const [a, f] of Object.entries(this._config))
        this.constructor.Default[a] !== f && (n[a] = f);
      return (n.selector = !1), (n.trigger = "manual"), n;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = qe.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0) throw new TypeError(`No method named "${n}"`);
          a[n]();
        }
      });
    }
  }
  le(qe);
  const Xt = {
      ...qe.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    Ye = { ...qe.DefaultType, content: "(null|string|element|function)" };
  class xe extends qe {
    static get Default() {
      return Xt;
    }
    static get DefaultType() {
      return Ye;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = xe.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0) throw new TypeError(`No method named "${n}"`);
          a[n]();
        }
      });
    }
  }
  le(xe);
  const be = ".bs.scrollspy",
    je = `activate${be}`,
    Tt = `click${be}`,
    Pe = `load${be}.data-api`,
    X = "active",
    ve = "[href]",
    _e = ".nav-link",
    fe = `${_e}, .nav-item > ${_e}, .list-group-item`,
    ft = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    Vt = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class Dt extends ze {
    constructor(n, a) {
      super(n, a),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          getComputedStyle(this._element).overflowY === "visible"
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return ft;
    }
    static get DefaultType() {
      return Vt;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const n of this._observableSections.values())
        this._observer.observe(n);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(n) {
      return (
        (n.target = M(n.target) || document.body),
        (n.rootMargin = n.offset ? `${n.offset}px 0px -30%` : n.rootMargin),
        typeof n.threshold == "string" &&
          (n.threshold = n.threshold
            .split(",")
            .map((a) => Number.parseFloat(a))),
        n
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (k.off(this._config.target, Tt),
        k.on(this._config.target, Tt, ve, (n) => {
          const a = this._observableSections.get(n.target.hash);
          if (a) {
            n.preventDefault();
            const f = this._rootElement || window,
              C = a.offsetTop - this._element.offsetTop;
            if (f.scrollTo)
              return void f.scrollTo({ top: C, behavior: "smooth" });
            f.scrollTop = C;
          }
        }));
    }
    _getNewObserver() {
      const n = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      };
      return new IntersectionObserver((a) => this._observerCallback(a), n);
    }
    _observerCallback(n) {
      const a = (W) => this._targetLinks.get(`#${W.target.id}`),
        f = (W) => {
          (this._previousScrollData.visibleEntryTop = W.target.offsetTop),
            this._process(a(W));
        },
        C = (this._rootElement || document.documentElement).scrollTop,
        N = C >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = C;
      for (const W of n) {
        if (!W.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(a(W));
          continue;
        }
        const de =
          W.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (N && de) {
          if ((f(W), !C)) return;
        } else N || de || f(W);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const n = z.find(ve, this._config.target);
      for (const a of n) {
        if (!a.hash || O(a)) continue;
        const f = z.findOne(decodeURI(a.hash), this._element);
        Y(f) &&
          (this._targetLinks.set(decodeURI(a.hash), a),
          this._observableSections.set(a.hash, f));
      }
    }
    _process(n) {
      this._activeTarget !== n &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = n),
        n.classList.add(X),
        this._activateParents(n),
        k.trigger(this._element, je, { relatedTarget: n }));
    }
    _activateParents(n) {
      if (n.classList.contains("dropdown-item"))
        z.findOne(".dropdown-toggle", n.closest(".dropdown")).classList.add(X);
      else
        for (const a of z.parents(n, ".nav, .list-group"))
          for (const f of z.prev(a, fe)) f.classList.add(X);
    }
    _clearActiveClass(n) {
      n.classList.remove(X);
      const a = z.find(`${ve}.${X}`, n);
      for (const f of a) f.classList.remove(X);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = Dt.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0 || n.startsWith("_") || n === "constructor")
            throw new TypeError(`No method named "${n}"`);
          a[n]();
        }
      });
    }
  }
  k.on(window, Pe, () => {
    for (const p of z.find('[data-bs-spy="scroll"]')) Dt.getOrCreateInstance(p);
  }),
    le(Dt);
  const Be = ".bs.tab",
    oi = `hide${Be}`,
    Nt = `hidden${Be}`,
    Pi = `show${Be}`,
    cn = `shown${Be}`,
    Cn = `click${Be}`,
    kn = `keydown${Be}`,
    si = `load${Be}`,
    En = "ArrowLeft",
    An = "ArrowRight",
    ri = "ArrowUp",
    Sn = "ArrowDown",
    On = "Home",
    u = "End",
    g = "active",
    y = "fade",
    _ = "show",
    x = ".dropdown-toggle",
    P = `:not(${x})`,
    I =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    B = `.nav-link${P}, .list-group-item${P}, [role="tab"]${P}, ${I}`,
    $ = `.${g}[data-bs-toggle="tab"], .${g}[data-bs-toggle="pill"], .${g}[data-bs-toggle="list"]`;
  class re extends ze {
    constructor(n) {
      super(n),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]',
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          k.on(this._element, kn, (a) => this._keydown(a)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const n = this._element;
      if (this._elemIsActive(n)) return;
      const a = this._getActiveElem(),
        f = a ? k.trigger(a, oi, { relatedTarget: n }) : null;
      k.trigger(n, Pi, { relatedTarget: a }).defaultPrevented ||
        (f && f.defaultPrevented) ||
        (this._deactivate(a, n), this._activate(n, a));
    }
    _activate(n, a) {
      n &&
        (n.classList.add(g),
        this._activate(z.getElementFromSelector(n)),
        this._queueCallback(
          () => {
            n.getAttribute("role") === "tab"
              ? (n.removeAttribute("tabindex"),
                n.setAttribute("aria-selected", !0),
                this._toggleDropDown(n, !0),
                k.trigger(n, cn, { relatedTarget: a }))
              : n.classList.add(_);
          },
          n,
          n.classList.contains(y),
        ));
    }
    _deactivate(n, a) {
      n &&
        (n.classList.remove(g),
        n.blur(),
        this._deactivate(z.getElementFromSelector(n)),
        this._queueCallback(
          () => {
            n.getAttribute("role") === "tab"
              ? (n.setAttribute("aria-selected", !1),
                n.setAttribute("tabindex", "-1"),
                this._toggleDropDown(n, !1),
                k.trigger(n, Nt, { relatedTarget: a }))
              : n.classList.remove(_);
          },
          n,
          n.classList.contains(y),
        ));
    }
    _keydown(n) {
      if (![En, An, ri, Sn, On, u].includes(n.key)) return;
      n.stopPropagation(), n.preventDefault();
      const a = this._getChildren().filter((C) => !O(C));
      let f;
      if ([On, u].includes(n.key)) f = a[n.key === On ? 0 : a.length - 1];
      else {
        const C = [An, Sn].includes(n.key);
        f = Oe(a, n.target, C, !0);
      }
      f && (f.focus({ preventScroll: !0 }), re.getOrCreateInstance(f).show());
    }
    _getChildren() {
      return z.find(B, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((n) => this._elemIsActive(n)) || null;
    }
    _setInitialAttributes(n, a) {
      this._setAttributeIfNotExists(n, "role", "tablist");
      for (const f of a) this._setInitialAttributesOnChild(f);
    }
    _setInitialAttributesOnChild(n) {
      n = this._getInnerElement(n);
      const a = this._elemIsActive(n),
        f = this._getOuterElement(n);
      n.setAttribute("aria-selected", a),
        f !== n && this._setAttributeIfNotExists(f, "role", "presentation"),
        a || n.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(n, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(n);
    }
    _setInitialAttributesOnTargetPanel(n) {
      const a = z.getElementFromSelector(n);
      a &&
        (this._setAttributeIfNotExists(a, "role", "tabpanel"),
        n.id && this._setAttributeIfNotExists(a, "aria-labelledby", `${n.id}`));
    }
    _toggleDropDown(n, a) {
      const f = this._getOuterElement(n);
      if (!f.classList.contains("dropdown")) return;
      const C = (N, W) => {
        const de = z.findOne(N, f);
        de && de.classList.toggle(W, a);
      };
      C(x, g), C(".dropdown-menu", _), f.setAttribute("aria-expanded", a);
    }
    _setAttributeIfNotExists(n, a, f) {
      n.hasAttribute(a) || n.setAttribute(a, f);
    }
    _elemIsActive(n) {
      return n.classList.contains(g);
    }
    _getInnerElement(n) {
      return n.matches(B) ? n : z.findOne(B, n);
    }
    _getOuterElement(n) {
      return n.closest(".nav-item, .list-group-item") || n;
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = re.getOrCreateInstance(this);
        if (typeof n == "string") {
          if (a[n] === void 0 || n.startsWith("_") || n === "constructor")
            throw new TypeError(`No method named "${n}"`);
          a[n]();
        }
      });
    }
  }
  k.on(document, Cn, I, function (p) {
    ["A", "AREA"].includes(this.tagName) && p.preventDefault(),
      O(this) || re.getOrCreateInstance(this).show();
  }),
    k.on(window, si, () => {
      for (const p of z.find($)) re.getOrCreateInstance(p);
    }),
    le(re);
  const K = ".bs.toast",
    te = `mouseover${K}`,
    ue = `mouseout${K}`,
    Q = `focusin${K}`,
    ke = `focusout${K}`,
    Le = `hide${K}`,
    Ae = `hidden${K}`,
    Re = `show${K}`,
    We = `shown${K}`,
    Qe = "hide",
    pe = "show",
    gt = "showing",
    tt = { animation: "boolean", autohide: "boolean", delay: "number" },
    Ln = { animation: !0, autohide: !0, delay: 5e3 };
  class Kt extends ze {
    constructor(n, a) {
      super(n, a),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return Ln;
    }
    static get DefaultType() {
      return tt;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      k.trigger(this._element, Re).defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove(Qe),
        q(this._element),
        this._element.classList.add(pe, gt),
        this._queueCallback(
          () => {
            this._element.classList.remove(gt),
              k.trigger(this._element, We),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation,
        ));
    }
    hide() {
      this.isShown() &&
        (k.trigger(this._element, Le).defaultPrevented ||
          (this._element.classList.add(gt),
          this._queueCallback(
            () => {
              this._element.classList.add(Qe),
                this._element.classList.remove(gt, pe),
                k.trigger(this._element, Ae);
            },
            this._element,
            this._config.animation,
          )));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(pe),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(pe);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(n, a) {
      switch (n.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = a;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = a;
      }
      if (a) return void this._clearTimeout();
      const f = n.relatedTarget;
      this._element === f ||
        this._element.contains(f) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      k.on(this._element, te, (n) => this._onInteraction(n, !0)),
        k.on(this._element, ue, (n) => this._onInteraction(n, !1)),
        k.on(this._element, Q, (n) => this._onInteraction(n, !0)),
        k.on(this._element, ke, (n) => this._onInteraction(n, !1));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(n) {
      return this.each(function () {
        const a = Kt.getOrCreateInstance(this, n);
        if (typeof n == "string") {
          if (a[n] === void 0) throw new TypeError(`No method named "${n}"`);
          a[n](this);
        }
      });
    }
  }
  return (
    jt(Kt),
    le(Kt),
    {
      Alert: At,
      Button: Gt,
      Carousel: Ze,
      Collapse: Ot,
      Dropdown: He,
      Modal: et,
      Offcanvas: w,
      Popover: xe,
      ScrollSpy: Dt,
      Tab: re,
      Toast: Kt,
      Tooltip: qe,
    }
  );
}),
  (function (A) {
    if (!A.hasInitialised) {
      var R = {
        escapeRegExp: function (S) {
          return S.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        hasClass: function (S, E) {
          var H = " ";
          return (
            S.nodeType === 1 &&
            (H + S.className + H).replace(/[\n\t]/g, H).indexOf(H + E + H) >= 0
          );
        },
        addClass: function (S, E) {
          S.className += " " + E;
        },
        removeClass: function (S, E) {
          var H = new RegExp("\\b" + this.escapeRegExp(E) + "\\b");
          S.className = S.className.replace(H, "");
        },
        interpolateString: function (S, E) {
          return S.replace(/{{([a-z][a-z0-9\-_]*)}}/gi, function (H) {
            return E(arguments[1]) || "";
          });
        },
        getCookie: function (S) {
          var E = ("; " + document.cookie).split("; " + S + "=");
          return E.length < 2 ? void 0 : E.pop().split(";").shift();
        },
        setCookie: function (S, E, H, ae, he, L) {
          var M = new Date();
          M.setHours(M.getHours() + 24 * (H || 365));
          var Y = [
            S + "=" + E,
            "expires=" + M.toUTCString(),
            "path=" + (he || "/"),
          ];
          ae && Y.push("domain=" + ae),
            L && Y.push("secure"),
            (document.cookie = Y.join(";"));
        },
        deepExtend: function (S, E) {
          for (var H in E)
            E.hasOwnProperty(H) &&
              (H in S && this.isPlainObject(S[H]) && this.isPlainObject(E[H])
                ? this.deepExtend(S[H], E[H])
                : (S[H] = E[H]));
          return S;
        },
        throttle: function (S, E) {
          var H = !1;
          return function () {
            H ||
              (S.apply(this, arguments),
              (H = !0),
              setTimeout(function () {
                H = !1;
              }, E));
          };
        },
        hash: function (S) {
          var E,
            H,
            ae = 0;
          if (S.length === 0) return ae;
          for (E = 0, H = S.length; E < H; ++E)
            (ae = (ae << 5) - ae + S.charCodeAt(E)), (ae |= 0);
          return ae;
        },
        normaliseHex: function (S) {
          return (
            S[0] == "#" && (S = S.substr(1)),
            S.length == 3 && (S = S[0] + S[0] + S[1] + S[1] + S[2] + S[2]),
            S
          );
        },
        getContrast: function (S) {
          return (
            (S = this.normaliseHex(S)),
            (299 * parseInt(S.substr(0, 2), 16) +
              587 * parseInt(S.substr(2, 2), 16) +
              114 * parseInt(S.substr(4, 2), 16)) /
              1e3 >=
            128
              ? "#000"
              : "#fff"
          );
        },
        getLuminance: function (S) {
          var E = parseInt(this.normaliseHex(S), 16),
            H = 38 + (E >> 16),
            ae = 38 + ((E >> 8) & 255),
            he = 38 + (255 & E);
          return (
            "#" +
            (
              16777216 +
              65536 * (H < 255 ? (H < 1 ? 0 : H) : 255) +
              256 * (ae < 255 ? (ae < 1 ? 0 : ae) : 255) +
              (he < 255 ? (he < 1 ? 0 : he) : 255)
            )
              .toString(16)
              .slice(1)
          );
        },
        isMobile: function () {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          );
        },
        isPlainObject: function (S) {
          return typeof S == "object" && S !== null && S.constructor == Object;
        },
        traverseDOMPath: function (S, E) {
          return S && S.parentNode
            ? R.hasClass(S, E)
              ? S
              : this.traverseDOMPath(S.parentNode, E)
            : null;
        },
      };
      (A.status = { deny: "deny", allow: "allow", dismiss: "dismiss" }),
        (A.transitionEnd = (function () {
          var S = document.createElement("div"),
            E = {
              t: "transitionend",
              OT: "oTransitionEnd",
              msT: "MSTransitionEnd",
              MozT: "transitionend",
              WebkitT: "webkitTransitionEnd",
            };
          for (var H in E)
            if (E.hasOwnProperty(H) && S.style[H + "ransition"] !== void 0)
              return E[H];
          return "";
        })()),
        (A.hasTransition = !!A.transitionEnd);
      var ye = Object.keys(A.status).map(R.escapeRegExp);
      (A.customStyles = {}),
        (A.Popup = (function () {
          var S = {
            enabled: !0,
            container: null,
            cookie: {
              name: "cookieconsent_status",
              path: "/",
              domain: "",
              expiryDays: 365,
              secure: !1,
            },
            onPopupOpen: function () {},
            onPopupClose: function () {},
            onInitialise: function (O) {},
            onStatusChange: function (O, F) {},
            onRevokeChoice: function () {},
            onNoCookieLaw: function (O, F) {},
            content: {
              header: "Cookies used on the website!",
              message:
                "This website uses cookies to ensure you get the best experience on our website.",
              dismiss: "Got it!",
              allow: "Allow cookies",
              deny: "Decline",
              link: "Learn more",
              href: "https://www.cookiesandyou.com",
              close: "&#x274c;",
              target: "_blank",
              policy: "Cookie Policy",
            },
            elements: {
              header: '<span class="cc-header">{{header}}</span>&nbsp;',
              message:
                '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
              messagelink:
                '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
              dismiss:
                '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
              allow:
                '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
              deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
              link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>',
              close:
                '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>',
            },
            window:
              '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',
            revokeBtn: '<div class="cc-revoke {{classes}}">{{policy}}</div>',
            compliance: {
              info: '<div class="cc-compliance">{{dismiss}}</div>',
              "opt-in":
                '<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>',
              "opt-out":
                '<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>',
            },
            type: "info",
            layouts: {
              basic: "{{messagelink}}{{compliance}}",
              "basic-close": "{{messagelink}}{{compliance}}{{close}}",
              "basic-header": "{{header}}{{message}}{{link}}{{compliance}}",
            },
            layout: "basic",
            position: "bottom",
            theme: "block",
            static: !1,
            palette: null,
            revokable: !1,
            animateRevokable: !0,
            showLink: !0,
            dismissOnScroll: !1,
            dismissOnTimeout: !1,
            dismissOnWindowClick: !1,
            ignoreClicksFrom: ["cc-revoke", "cc-btn"],
            autoOpen: !0,
            autoAttach: !0,
            whitelistPage: [],
            blacklistPage: [],
            overrideHTML: null,
          };
          function E() {
            this.initialise.apply(this, arguments);
          }
          function H(O) {
            (this.openingTimeout = null), R.removeClass(O, "cc-invisible");
          }
          function ae(O) {
            (O.style.display = "none"),
              O.removeEventListener(A.transitionEnd, this.afterTransition),
              (this.afterTransition = null);
          }
          function he() {
            var O = this.options.position.split("-"),
              F = [];
            return (
              O.forEach(function (D) {
                F.push("cc-" + D);
              }),
              F
            );
          }
          function L(O) {
            var F = this.options,
              D = document.createElement("div"),
              q =
                F.container && F.container.nodeType === 1
                  ? F.container
                  : document.body;
            D.innerHTML = O;
            var Z = D.children[0];
            return (
              (Z.style.display = "none"),
              R.hasClass(Z, "cc-window") &&
                A.hasTransition &&
                R.addClass(Z, "cc-invisible"),
              (this.onButtonClick = function (j) {
                var ie = R.traverseDOMPath(j.target, "cc-btn") || j.target;
                if (R.hasClass(ie, "cc-btn")) {
                  var le = ie.className.match(
                      new RegExp("\\bcc-(" + ye.join("|") + ")\\b"),
                    ),
                    oe = (le && le[1]) || !1;
                  oe && (this.setStatus(oe), this.close(!0));
                }
                R.hasClass(ie, "cc-close") &&
                  (this.setStatus(A.status.dismiss), this.close(!0)),
                  R.hasClass(ie, "cc-revoke") && this.revokeChoice();
              }.bind(this)),
              Z.addEventListener("click", this.onButtonClick),
              F.autoAttach &&
                (q.firstChild
                  ? q.insertBefore(Z, q.firstChild)
                  : q.appendChild(Z)),
              Z
            );
          }
          function M(O) {
            return (O = R.normaliseHex(O)) == "000000"
              ? "#222"
              : R.getLuminance(O);
          }
          function Y(O, F) {
            for (var D = 0, q = O.length; D < q; ++D) {
              var Z = O[D];
              if (
                (Z instanceof RegExp && Z.test(F)) ||
                (typeof Z == "string" && Z.length && Z === F)
              )
                return !0;
            }
            return !1;
          }
          return (
            (E.prototype.initialise = function (O) {
              this.options && this.destroy(),
                R.deepExtend((this.options = {}), S),
                R.isPlainObject(O) && R.deepExtend(this.options, O),
                function () {
                  var Z = this.options.onInitialise.bind(this);
                  if (!window.navigator.cookieEnabled)
                    return Z(A.status.deny), !0;
                  if (window.CookiesOK || window.navigator.CookiesOK)
                    return Z(A.status.allow), !0;
                  var j = Object.keys(A.status),
                    ie = this.getStatus(),
                    le = j.indexOf(ie) >= 0;
                  return le && Z(ie), le;
                }.call(this) && (this.options.enabled = !1),
                Y(this.options.blacklistPage, location.pathname) &&
                  (this.options.enabled = !1),
                Y(this.options.whitelistPage, location.pathname) &&
                  (this.options.enabled = !0);
              var F = this.options.window
                  .replace(
                    "{{classes}}",
                    function () {
                      var Z = this.options,
                        j =
                          Z.position == "top" || Z.position == "bottom"
                            ? "banner"
                            : "floating";
                      R.isMobile() && (j = "floating");
                      var ie = [
                        "cc-" + j,
                        "cc-type-" + Z.type,
                        "cc-theme-" + Z.theme,
                      ];
                      return (
                        Z.static && ie.push("cc-static"),
                        ie.push.apply(ie, he.call(this)),
                        function (le) {
                          var oe = R.hash(JSON.stringify(le)),
                            De = "cc-color-override-" + oe,
                            Oe = R.isPlainObject(le);
                          return (
                            (this.customStyleSelector = Oe ? De : null),
                            Oe &&
                              (function (s, Je, ne) {
                                if (A.customStyles[s])
                                  return void ++A.customStyles[s].references;
                                var Se = {},
                                  Ce = Je.popup,
                                  ge = Je.button,
                                  ee = Je.highlight;
                                Ce &&
                                  ((Ce.text = Ce.text
                                    ? Ce.text
                                    : R.getContrast(Ce.background)),
                                  (Ce.link = Ce.link ? Ce.link : Ce.text),
                                  (Se[ne + ".cc-window"] = [
                                    "color: " + Ce.text,
                                    "background-color: " + Ce.background,
                                  ]),
                                  (Se[ne + ".cc-revoke"] = [
                                    "color: " + Ce.text,
                                    "background-color: " + Ce.background,
                                  ]),
                                  (Se[
                                    ne +
                                      " .cc-link," +
                                      ne +
                                      " .cc-link:active," +
                                      ne +
                                      " .cc-link:visited"
                                  ] = ["color: " + Ce.link]),
                                  ge &&
                                    ((ge.text = ge.text
                                      ? ge.text
                                      : R.getContrast(ge.background)),
                                    (ge.border = ge.border
                                      ? ge.border
                                      : "transparent"),
                                    (Se[ne + " .cc-btn"] = [
                                      "color: " + ge.text,
                                      "border-color: " + ge.border,
                                      "background-color: " + ge.background,
                                    ]),
                                    ge.padding &&
                                      Se[ne + " .cc-btn"].push(
                                        "padding: " + ge.padding,
                                      ),
                                    ge.background != "transparent" &&
                                      (Se[
                                        ne +
                                          " .cc-btn:hover, " +
                                          ne +
                                          " .cc-btn:focus"
                                      ] = [
                                        "background-color: " +
                                          (ge.hover || M(ge.background)),
                                      ]),
                                    ee
                                      ? ((ee.text = ee.text
                                          ? ee.text
                                          : R.getContrast(ee.background)),
                                        (ee.border = ee.border
                                          ? ee.border
                                          : "transparent"),
                                        (Se[
                                          ne +
                                            " .cc-highlight .cc-btn:first-child"
                                        ] = [
                                          "color: " + ee.text,
                                          "border-color: " + ee.border,
                                          "background-color: " + ee.background,
                                        ]))
                                      : (Se[
                                          ne +
                                            " .cc-highlight .cc-btn:first-child"
                                        ] = ["color: " + Ce.text])));
                                var it = document.createElement("style");
                                document.head.appendChild(it),
                                  (A.customStyles[s] = {
                                    references: 1,
                                    element: it.sheet,
                                  });
                                var dn = -1;
                                for (var qt in Se)
                                  Se.hasOwnProperty(qt) &&
                                    it.sheet.insertRule(
                                      qt + "{" + Se[qt].join(";") + "}",
                                      ++dn,
                                    );
                              })(oe, le, "." + De),
                            Oe
                          );
                        }.call(this, this.options.palette),
                        this.customStyleSelector &&
                          ie.push(this.customStyleSelector),
                        ie
                      );
                    }
                      .call(this)
                      .join(" "),
                  )
                  .replace(
                    "{{children}}",
                    function () {
                      var Z = {},
                        j = this.options;
                      j.showLink ||
                        ((j.elements.link = ""),
                        (j.elements.messagelink = j.elements.message)),
                        Object.keys(j.elements).forEach(function (oe) {
                          Z[oe] = R.interpolateString(
                            j.elements[oe],
                            function (De) {
                              var Oe = j.content[De];
                              return De && typeof Oe == "string" && Oe.length
                                ? Oe
                                : "";
                            },
                          );
                        });
                      var ie = j.compliance[j.type];
                      ie || (ie = j.compliance.info),
                        (Z.compliance = R.interpolateString(ie, function (oe) {
                          return Z[oe];
                        }));
                      var le = j.layouts[j.layout];
                      return (
                        le || (le = j.layouts.basic),
                        R.interpolateString(le, function (oe) {
                          return Z[oe];
                        })
                      );
                    }.call(this),
                  ),
                D = this.options.overrideHTML;
              if (
                (typeof D == "string" && D.length && (F = D),
                this.options.static)
              ) {
                var q = L.call(this, '<div class="cc-grower">' + F + "</div>");
                (q.style.display = ""),
                  (this.element = q.firstChild),
                  (this.element.style.display = "none"),
                  R.addClass(this.element, "cc-invisible");
              } else this.element = L.call(this, F);
              (function () {
                var Z = this.setStatus.bind(this),
                  j = this.close.bind(this),
                  ie = this.options.dismissOnTimeout;
                typeof ie == "number" &&
                  ie >= 0 &&
                  (this.dismissTimeout = window.setTimeout(function () {
                    Z(A.status.dismiss), j(!0);
                  }, Math.floor(ie)));
                var le = this.options.dismissOnScroll;
                if (typeof le == "number" && le >= 0) {
                  var oe = function (Je) {
                    window.pageYOffset > Math.floor(le) &&
                      (Z(A.status.dismiss),
                      j(!0),
                      window.removeEventListener("scroll", oe),
                      (this.onWindowScroll = null));
                  };
                  this.options.enabled &&
                    ((this.onWindowScroll = oe),
                    window.addEventListener("scroll", oe));
                }
                var De = this.options.dismissOnWindowClick,
                  Oe = this.options.ignoreClicksFrom;
                if (De) {
                  var s = function (Je) {
                    for (
                      var ne = !1, Se = Je.path.length, Ce = Oe.length, ge = 0;
                      ge < Se;
                      ge++
                    )
                      if (!ne)
                        for (var ee = 0; ee < Ce; ee++)
                          ne || (ne = R.hasClass(Je.path[ge], Oe[ee]));
                    ne ||
                      (Z(A.status.dismiss),
                      j(!0),
                      window.removeEventListener("click", s),
                      window.removeEventListener("touchend", s),
                      (this.onWindowClick = null));
                  }.bind(this);
                  this.options.enabled &&
                    ((this.onWindowClick = s),
                    window.addEventListener("click", s),
                    window.addEventListener("touchend", s));
                }
              }).call(this),
                function () {
                  if (
                    (this.options.type != "info" &&
                      (this.options.revokable = !0),
                    R.isMobile() && (this.options.animateRevokable = !1),
                    this.options.revokable)
                  ) {
                    var Z = he.call(this);
                    this.options.animateRevokable && Z.push("cc-animate"),
                      this.customStyleSelector &&
                        Z.push(this.customStyleSelector);
                    var j = this.options.revokeBtn
                      .replace("{{classes}}", Z.join(" "))
                      .replace("{{policy}}", this.options.content.policy);
                    this.revokeBtn = L.call(this, j);
                    var ie = this.revokeBtn;
                    if (this.options.animateRevokable) {
                      var le = R.throttle(function (oe) {
                        var De = !1,
                          Oe = window.innerHeight - 20;
                        R.hasClass(ie, "cc-top") &&
                          oe.clientY < 20 &&
                          (De = !0),
                          R.hasClass(ie, "cc-bottom") &&
                            oe.clientY > Oe &&
                            (De = !0),
                          De
                            ? R.hasClass(ie, "cc-active") ||
                              R.addClass(ie, "cc-active")
                            : R.hasClass(ie, "cc-active") &&
                              R.removeClass(ie, "cc-active");
                      }, 200);
                      (this.onMouseMove = le),
                        window.addEventListener("mousemove", le);
                    }
                  }
                }.call(this),
                this.options.autoOpen && this.autoOpen();
            }),
            (E.prototype.destroy = function () {
              this.onButtonClick &&
                this.element &&
                (this.element.removeEventListener("click", this.onButtonClick),
                (this.onButtonClick = null)),
                this.dismissTimeout &&
                  (clearTimeout(this.dismissTimeout),
                  (this.dismissTimeout = null)),
                this.onWindowScroll &&
                  (window.removeEventListener("scroll", this.onWindowScroll),
                  (this.onWindowScroll = null)),
                this.onWindowClick &&
                  (window.removeEventListener("click", this.onWindowClick),
                  (this.onWindowClick = null)),
                this.onMouseMove &&
                  (window.removeEventListener("mousemove", this.onMouseMove),
                  (this.onMouseMove = null)),
                this.element &&
                  this.element.parentNode &&
                  this.element.parentNode.removeChild(this.element),
                (this.element = null),
                this.revokeBtn &&
                  this.revokeBtn.parentNode &&
                  this.revokeBtn.parentNode.removeChild(this.revokeBtn),
                (this.revokeBtn = null),
                (function (O) {
                  if (R.isPlainObject(O)) {
                    var F = R.hash(JSON.stringify(O)),
                      D = A.customStyles[F];
                    if (D && !--D.references) {
                      var q = D.element.ownerNode;
                      q && q.parentNode && q.parentNode.removeChild(q),
                        (A.customStyles[F] = null);
                    }
                  }
                })(this.options.palette),
                (this.options = null);
            }),
            (E.prototype.open = function (O) {
              if (this.element)
                return (
                  this.isOpen() ||
                    (A.hasTransition
                      ? this.fadeIn()
                      : (this.element.style.display = ""),
                    this.options.revokable && this.toggleRevokeButton(),
                    this.options.onPopupOpen.call(this)),
                  this
                );
            }),
            (E.prototype.close = function (O) {
              if (this.element)
                return (
                  this.isOpen() &&
                    (A.hasTransition
                      ? this.fadeOut()
                      : (this.element.style.display = "none"),
                    O && this.options.revokable && this.toggleRevokeButton(!0),
                    this.options.onPopupClose.call(this)),
                  this
                );
            }),
            (E.prototype.fadeIn = function () {
              var O = this.element;
              if (
                A.hasTransition &&
                O &&
                (this.afterTransition && ae.call(this, O),
                R.hasClass(O, "cc-invisible"))
              ) {
                if (((O.style.display = ""), this.options.static)) {
                  var F = this.element.clientHeight;
                  this.element.parentNode.style.maxHeight = F + "px";
                }
                this.openingTimeout = setTimeout(H.bind(this, O), 20);
              }
            }),
            (E.prototype.fadeOut = function () {
              var O = this.element;
              A.hasTransition &&
                O &&
                (this.openingTimeout &&
                  (clearTimeout(this.openingTimeout), H.bind(this, O)),
                R.hasClass(O, "cc-invisible") ||
                  (this.options.static &&
                    (this.element.parentNode.style.maxHeight = ""),
                  (this.afterTransition = ae.bind(this, O)),
                  O.addEventListener(A.transitionEnd, this.afterTransition),
                  R.addClass(O, "cc-invisible")));
            }),
            (E.prototype.isOpen = function () {
              return (
                this.element &&
                this.element.style.display == "" &&
                (!A.hasTransition || !R.hasClass(this.element, "cc-invisible"))
              );
            }),
            (E.prototype.toggleRevokeButton = function (O) {
              this.revokeBtn &&
                (this.revokeBtn.style.display = O ? "" : "none");
            }),
            (E.prototype.revokeChoice = function (O) {
              (this.options.enabled = !0),
                this.clearStatus(),
                this.options.onRevokeChoice.call(this),
                O || this.autoOpen();
            }),
            (E.prototype.hasAnswered = function (O) {
              return Object.keys(A.status).indexOf(this.getStatus()) >= 0;
            }),
            (E.prototype.hasConsented = function (O) {
              var F = this.getStatus();
              return F == A.status.allow || F == A.status.dismiss;
            }),
            (E.prototype.autoOpen = function (O) {
              !this.hasAnswered() && this.options.enabled
                ? this.open()
                : this.hasAnswered() &&
                  this.options.revokable &&
                  this.toggleRevokeButton(!0);
            }),
            (E.prototype.setStatus = function (O) {
              var F = this.options.cookie,
                D = R.getCookie(F.name),
                q = Object.keys(A.status).indexOf(D) >= 0;
              Object.keys(A.status).indexOf(O) >= 0
                ? (R.setCookie(
                    F.name,
                    O,
                    F.expiryDays,
                    F.domain,
                    F.path,
                    F.secure,
                  ),
                  this.options.onStatusChange.call(this, O, q))
                : this.clearStatus();
            }),
            (E.prototype.getStatus = function () {
              return R.getCookie(this.options.cookie.name);
            }),
            (E.prototype.clearStatus = function () {
              var O = this.options.cookie;
              R.setCookie(O.name, "", -1, O.domain, O.path);
            }),
            E
          );
        })()),
        (A.Location = (function () {
          var S = {
            timeout: 5e3,
            services: ["ipinfo"],
            serviceDefinitions: {
              ipinfo: function () {
                return {
                  url: "//ipinfo.io",
                  headers: ["Accept: application/json"],
                  callback: function (L, M) {
                    try {
                      var Y = JSON.parse(M);
                      return Y.error ? he(Y) : { code: Y.country };
                    } catch (O) {
                      return he({ error: "Invalid response (" + O + ")" });
                    }
                  },
                };
              },
              ipinfodb: function (L) {
                return {
                  url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
                  isScript: !0,
                  callback: function (M, Y) {
                    try {
                      var O = JSON.parse(Y);
                      return O.statusCode == "ERROR"
                        ? he({ error: O.statusMessage })
                        : { code: O.countryCode };
                    } catch (F) {
                      return he({ error: "Invalid response (" + F + ")" });
                    }
                  },
                };
              },
              maxmind: function () {
                return {
                  url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
                  isScript: !0,
                  callback: function (L) {
                    window.geoip2
                      ? geoip2.country(
                          function (M) {
                            try {
                              L({ code: M.country.iso_code });
                            } catch (Y) {
                              L(he(Y));
                            }
                          },
                          function (M) {
                            L(he(M));
                          },
                        )
                      : L(
                          new Error(
                            "Unexpected response format. The downloaded script should have exported `geoip2` to the global scope",
                          ),
                        );
                  },
                };
              },
            },
          };
          function E(L) {
            R.deepExtend((this.options = {}), S),
              R.isPlainObject(L) && R.deepExtend(this.options, L),
              (this.currentServiceIndex = -1);
          }
          function H(L, M, Y) {
            var O,
              F = document.createElement("script");
            (F.type = "text/" + (L.type || "javascript")),
              (F.src = L.src || L),
              (F.async = !1),
              (F.onreadystatechange = F.onload =
                function () {
                  var D = F.readyState;
                  clearTimeout(O),
                    M.done ||
                      (D && !/loaded|complete/.test(D)) ||
                      ((M.done = !0),
                      M(),
                      (F.onreadystatechange = F.onload = null));
                }),
              document.body.appendChild(F),
              (O = setTimeout(function () {
                (M.done = !0), M(), (F.onreadystatechange = F.onload = null);
              }, Y));
          }
          function ae(L, M, Y, O, F) {
            var D = new (window.XMLHttpRequest || window.ActiveXObject)(
              "MSXML2.XMLHTTP.3.0",
            );
            if (
              (D.open(O ? "POST" : "GET", L, 1),
              D.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded",
              ),
              Array.isArray(F))
            )
              for (var q = 0, Z = F.length; q < Z; ++q) {
                var j = F[q].split(":", 2);
                D.setRequestHeader(
                  j[0].replace(/^\s+|\s+$/g, ""),
                  j[1].replace(/^\s+|\s+$/g, ""),
                );
              }
            typeof M == "function" &&
              (D.onreadystatechange = function () {
                D.readyState > 3 && M(D);
              }),
              D.send(O);
          }
          function he(L) {
            return new Error(
              "Error [" + (L.code || "UNKNOWN") + "]: " + L.error,
            );
          }
          return (
            (E.prototype.getNextService = function () {
              var L;
              do L = this.getServiceByIdx(++this.currentServiceIndex);
              while (
                this.currentServiceIndex < this.options.services.length &&
                !L
              );
              return L;
            }),
            (E.prototype.getServiceByIdx = function (L) {
              var M = this.options.services[L];
              if (typeof M == "function") {
                var Y = M();
                return (
                  Y.name &&
                    R.deepExtend(Y, this.options.serviceDefinitions[Y.name](Y)),
                  Y
                );
              }
              return typeof M == "string"
                ? this.options.serviceDefinitions[M]()
                : R.isPlainObject(M)
                  ? this.options.serviceDefinitions[M.name](M)
                  : null;
            }),
            (E.prototype.locate = function (L, M) {
              var Y = this.getNextService();
              Y
                ? ((this.callbackComplete = L),
                  (this.callbackError = M),
                  this.runService(Y, this.runNextServiceOnError.bind(this)))
                : M(new Error("No services to run"));
            }),
            (E.prototype.setupUrl = function (L) {
              var M = this.getCurrentServiceOpts();
              return L.url.replace(/\{(.*?)\}/g, function (Y, O) {
                if (O === "callback") {
                  var F = "callback" + Date.now();
                  return (
                    (window[F] = function (D) {
                      L.__JSONP_DATA = JSON.stringify(D);
                    }),
                    F
                  );
                }
                if (O in M.interpolateUrl) return M.interpolateUrl[O];
              });
            }),
            (E.prototype.runService = function (L, M) {
              var Y = this;
              L &&
                L.url &&
                L.callback &&
                (L.isScript ? H : ae)(
                  this.setupUrl(L),
                  function (O) {
                    var F = O ? O.responseText : "";
                    L.__JSONP_DATA &&
                      ((F = L.__JSONP_DATA), delete L.__JSONP_DATA),
                      Y.runServiceCallback.call(Y, M, L, F);
                  },
                  this.options.timeout,
                  L.data,
                  L.headers,
                );
            }),
            (E.prototype.runServiceCallback = function (L, M, Y) {
              var O = this,
                F = M.callback(function (D) {
                  F || O.onServiceResult.call(O, L, D);
                }, Y);
              F && this.onServiceResult.call(this, L, F);
            }),
            (E.prototype.onServiceResult = function (L, M) {
              M instanceof Error || (M && M.error)
                ? L.call(this, M, null)
                : L.call(this, null, M);
            }),
            (E.prototype.runNextServiceOnError = function (L, M) {
              if (L) {
                this.logError(L);
                var Y = this.getNextService();
                Y
                  ? this.runService(Y, this.runNextServiceOnError.bind(this))
                  : this.completeService.call(
                      this,
                      this.callbackError,
                      new Error("All services failed"),
                    );
              } else this.completeService.call(this, this.callbackComplete, M);
            }),
            (E.prototype.getCurrentServiceOpts = function () {
              var L = this.options.services[this.currentServiceIndex];
              return typeof L == "string"
                ? { name: L }
                : typeof L == "function"
                  ? L()
                  : R.isPlainObject(L)
                    ? L
                    : {};
            }),
            (E.prototype.completeService = function (L, M) {
              (this.currentServiceIndex = -1), L && L(M);
            }),
            (E.prototype.logError = function (L) {
              var M = this.currentServiceIndex,
                Y = this.getServiceByIdx(M);
              console.warn(
                "The service[" +
                  M +
                  "] (" +
                  Y.url +
                  ") responded with the following error",
                L,
              );
            }),
            E
          );
        })()),
        (A.Law = (function () {
          var S = {
            regionalLaw: !0,
            hasLaw: [
              "AT",
              "BE",
              "BG",
              "HR",
              "CZ",
              "CY",
              "DK",
              "EE",
              "FI",
              "FR",
              "DE",
              "EL",
              "HU",
              "IE",
              "IT",
              "LV",
              "LT",
              "LU",
              "MT",
              "NL",
              "PL",
              "PT",
              "SK",
              "ES",
              "SE",
              "GB",
              "UK",
              "GR",
              "EU",
            ],
            revokable: [
              "HR",
              "CY",
              "DK",
              "EE",
              "FR",
              "DE",
              "LV",
              "LT",
              "NL",
              "PT",
              "ES",
            ],
            explicitAction: ["HR", "IT", "ES"],
          };
          function E(H) {
            this.initialise.apply(this, arguments);
          }
          return (
            (E.prototype.initialise = function (H) {
              R.deepExtend((this.options = {}), S),
                R.isPlainObject(H) && R.deepExtend(this.options, H);
            }),
            (E.prototype.get = function (H) {
              var ae = this.options;
              return {
                hasLaw: ae.hasLaw.indexOf(H) >= 0,
                revokable: ae.revokable.indexOf(H) >= 0,
                explicitAction: ae.explicitAction.indexOf(H) >= 0,
              };
            }),
            (E.prototype.applyLaw = function (H, ae) {
              var he = this.get(ae);
              return (
                he.hasLaw ||
                  ((H.enabled = !1),
                  typeof H.onNoCookieLaw == "function" &&
                    H.onNoCookieLaw(ae, he)),
                this.options.regionalLaw &&
                  (he.revokable && (H.revokable = !0),
                  he.explicitAction &&
                    ((H.dismissOnScroll = !1), (H.dismissOnTimeout = !1))),
                H
              );
            }),
            E
          );
        })()),
        (A.initialise = function (S, E, H) {
          var ae = new A.Law(S.law);
          E || (E = function () {}), H || (H = function () {});
          var he = Object.keys(A.status),
            L = R.getCookie("cookieconsent_status");
          he.indexOf(L) >= 0
            ? E(new A.Popup(S))
            : A.getCountryCode(
                S,
                function (M) {
                  delete S.law,
                    delete S.location,
                    M.code && (S = ae.applyLaw(S, M.code)),
                    E(new A.Popup(S));
                },
                function (M) {
                  delete S.law, delete S.location, H(M, new A.Popup(S));
                },
              );
        }),
        (A.getCountryCode = function (S, E, H) {
          S.law && S.law.countryCode
            ? E({ code: S.law.countryCode })
            : S.location
              ? new A.Location(S.location).locate(function (ae) {
                  E(ae || {});
                }, H)
              : E({});
        }),
        (A.utils = R),
        (A.hasInitialised = !0),
        (window.cookieconsent = A);
    }
  })(window.cookieconsent || {});
