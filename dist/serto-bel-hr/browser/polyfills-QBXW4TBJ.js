var ae = globalThis;
function ee(e) {
  return (ae.__Zone_symbol_prefix || "__zone_symbol__") + e;
}
function Et() {
  let e = ae.performance;
  function t(x) {
    e && e.mark && e.mark(x);
  }
  function c(x, i) {
    e && e.measure && e.measure(x, i);
  }
  t("Zone");
  let X = class X {
    static assertZonePatched() {
      if (ae.Promise !== O.ZoneAwarePromise)
        throw new Error(
          "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)",
        );
    }
    static get root() {
      let i = X.current;
      for (; i.parent; ) i = i.parent;
      return i;
    }
    static get current() {
      return b.zone;
    }
    static get currentTask() {
      return S;
    }
    static __load_patch(i, s, o = !1) {
      if (O.hasOwnProperty(i)) {
        let y = ae[ee("forceDuplicateZoneCheck")] === !0;
        if (!o && y) throw Error("Already loaded patch: " + i);
      } else if (!ae["__Zone_disable_" + i]) {
        let y = "Zone:" + i;
        t(y), (O[i] = s(ae, X, P)), c(y, y);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    constructor(i, s) {
      (this._parent = i),
        (this._name = s ? s.name || "unnamed" : "<root>"),
        (this._properties = (s && s.properties) || {}),
        (this._zoneDelegate = new f(
          this,
          this._parent && this._parent._zoneDelegate,
          s,
        ));
    }
    get(i) {
      let s = this.getZoneWith(i);
      if (s) return s._properties[i];
    }
    getZoneWith(i) {
      let s = this;
      for (; s; ) {
        if (s._properties.hasOwnProperty(i)) return s;
        s = s._parent;
      }
      return null;
    }
    fork(i) {
      if (!i) throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, i);
    }
    wrap(i, s) {
      if (typeof i != "function")
        throw new Error("Expecting function got: " + i);
      let o = this._zoneDelegate.intercept(this, i, s),
        y = this;
      return function () {
        return y.runGuarded(o, this, arguments, s);
      };
    }
    run(i, s, o, y) {
      b = { parent: b, zone: this };
      try {
        return this._zoneDelegate.invoke(this, i, s, o, y);
      } finally {
        b = b.parent;
      }
    }
    runGuarded(i, s = null, o, y) {
      b = { parent: b, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, i, s, o, y);
        } catch (Z) {
          if (this._zoneDelegate.handleError(this, Z)) throw Z;
        }
      } finally {
        b = b.parent;
      }
    }
    runTask(i, s, o) {
      if (i.zone != this)
        throw new Error(
          "A task can only be run in the zone of creation! (Creation: " +
            (i.zone || J).name +
            "; Execution: " +
            this.name +
            ")",
        );
      let y = i,
        { type: Z, data: { isPeriodic: L = !1, isRefreshable: se = !1 } = {} } =
          i;
      if (i.state === W && (Z === G || Z === E)) return;
      let le = i.state != A;
      le && y._transitionTo(A, d);
      let ue = S;
      (S = y), (b = { parent: b, zone: this });
      try {
        Z == E && i.data && !L && !se && (i.cancelFn = void 0);
        try {
          return this._zoneDelegate.invokeTask(this, y, s, o);
        } catch (ne) {
          if (this._zoneDelegate.handleError(this, ne)) throw ne;
        }
      } finally {
        let ne = i.state;
        if (ne !== W && ne !== q)
          if (Z == G || L || (se && ne === k)) le && y._transitionTo(d, A, k);
          else {
            let h = y._zoneDelegates;
            this._updateTaskCount(y, -1),
              le && y._transitionTo(W, A, W),
              se && (y._zoneDelegates = h);
          }
        (b = b.parent), (S = ue);
      }
    }
    scheduleTask(i) {
      if (i.zone && i.zone !== this) {
        let o = this;
        for (; o; ) {
          if (o === i.zone)
            throw Error(
              `can not reschedule task to ${this.name} which is descendants of the original zone ${i.zone.name}`,
            );
          o = o.parent;
        }
      }
      i._transitionTo(k, W);
      let s = [];
      (i._zoneDelegates = s), (i._zone = this);
      try {
        i = this._zoneDelegate.scheduleTask(this, i);
      } catch (o) {
        throw (
          (i._transitionTo(q, k, W), this._zoneDelegate.handleError(this, o), o)
        );
      }
      return (
        i._zoneDelegates === s && this._updateTaskCount(i, 1),
        i.state == k && i._transitionTo(d, k),
        i
      );
    }
    scheduleMicroTask(i, s, o, y) {
      return this.scheduleTask(new T(B, i, s, o, y, void 0));
    }
    scheduleMacroTask(i, s, o, y, Z) {
      return this.scheduleTask(new T(E, i, s, o, y, Z));
    }
    scheduleEventTask(i, s, o, y, Z) {
      return this.scheduleTask(new T(G, i, s, o, y, Z));
    }
    cancelTask(i) {
      if (i.zone != this)
        throw new Error(
          "A task can only be cancelled in the zone of creation! (Creation: " +
            (i.zone || J).name +
            "; Execution: " +
            this.name +
            ")",
        );
      if (!(i.state !== d && i.state !== A)) {
        i._transitionTo(H, d, A);
        try {
          this._zoneDelegate.cancelTask(this, i);
        } catch (s) {
          throw (
            (i._transitionTo(q, H), this._zoneDelegate.handleError(this, s), s)
          );
        }
        return (
          this._updateTaskCount(i, -1),
          i._transitionTo(W, H),
          (i.runCount = -1),
          i
        );
      }
    }
    _updateTaskCount(i, s) {
      let o = i._zoneDelegates;
      s == -1 && (i._zoneDelegates = null);
      for (let y = 0; y < o.length; y++) o[y]._updateTaskCount(i.type, s);
    }
  };
  X.__symbol__ = ee;
  let n = X,
    a = {
      name: "",
      onHasTask: (x, i, s, o) => x.hasTask(s, o),
      onScheduleTask: (x, i, s, o) => x.scheduleTask(s, o),
      onInvokeTask: (x, i, s, o, y, Z) => x.invokeTask(s, o, y, Z),
      onCancelTask: (x, i, s, o) => x.cancelTask(s, o),
    };
  class f {
    get zone() {
      return this._zone;
    }
    constructor(i, s, o) {
      (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
        (this._zone = i),
        (this._parentDelegate = s),
        (this._forkZS = o && (o && o.onFork ? o : s._forkZS)),
        (this._forkDlgt = o && (o.onFork ? s : s._forkDlgt)),
        (this._forkCurrZone = o && (o.onFork ? this._zone : s._forkCurrZone)),
        (this._interceptZS = o && (o.onIntercept ? o : s._interceptZS)),
        (this._interceptDlgt = o && (o.onIntercept ? s : s._interceptDlgt)),
        (this._interceptCurrZone =
          o && (o.onIntercept ? this._zone : s._interceptCurrZone)),
        (this._invokeZS = o && (o.onInvoke ? o : s._invokeZS)),
        (this._invokeDlgt = o && (o.onInvoke ? s : s._invokeDlgt)),
        (this._invokeCurrZone =
          o && (o.onInvoke ? this._zone : s._invokeCurrZone)),
        (this._handleErrorZS = o && (o.onHandleError ? o : s._handleErrorZS)),
        (this._handleErrorDlgt =
          o && (o.onHandleError ? s : s._handleErrorDlgt)),
        (this._handleErrorCurrZone =
          o && (o.onHandleError ? this._zone : s._handleErrorCurrZone)),
        (this._scheduleTaskZS =
          o && (o.onScheduleTask ? o : s._scheduleTaskZS)),
        (this._scheduleTaskDlgt =
          o && (o.onScheduleTask ? s : s._scheduleTaskDlgt)),
        (this._scheduleTaskCurrZone =
          o && (o.onScheduleTask ? this._zone : s._scheduleTaskCurrZone)),
        (this._invokeTaskZS = o && (o.onInvokeTask ? o : s._invokeTaskZS)),
        (this._invokeTaskDlgt = o && (o.onInvokeTask ? s : s._invokeTaskDlgt)),
        (this._invokeTaskCurrZone =
          o && (o.onInvokeTask ? this._zone : s._invokeTaskCurrZone)),
        (this._cancelTaskZS = o && (o.onCancelTask ? o : s._cancelTaskZS)),
        (this._cancelTaskDlgt = o && (o.onCancelTask ? s : s._cancelTaskDlgt)),
        (this._cancelTaskCurrZone =
          o && (o.onCancelTask ? this._zone : s._cancelTaskCurrZone)),
        (this._hasTaskZS = null),
        (this._hasTaskDlgt = null),
        (this._hasTaskDlgtOwner = null),
        (this._hasTaskCurrZone = null);
      let y = o && o.onHasTask,
        Z = s && s._hasTaskZS;
      (y || Z) &&
        ((this._hasTaskZS = y ? o : a),
        (this._hasTaskDlgt = s),
        (this._hasTaskDlgtOwner = this),
        (this._hasTaskCurrZone = this._zone),
        o.onScheduleTask ||
          ((this._scheduleTaskZS = a),
          (this._scheduleTaskDlgt = s),
          (this._scheduleTaskCurrZone = this._zone)),
        o.onInvokeTask ||
          ((this._invokeTaskZS = a),
          (this._invokeTaskDlgt = s),
          (this._invokeTaskCurrZone = this._zone)),
        o.onCancelTask ||
          ((this._cancelTaskZS = a),
          (this._cancelTaskDlgt = s),
          (this._cancelTaskCurrZone = this._zone)));
    }
    fork(i, s) {
      return this._forkZS
        ? this._forkZS.onFork(this._forkDlgt, this.zone, i, s)
        : new n(i, s);
    }
    intercept(i, s, o) {
      return this._interceptZS
        ? this._interceptZS.onIntercept(
            this._interceptDlgt,
            this._interceptCurrZone,
            i,
            s,
            o,
          )
        : s;
    }
    invoke(i, s, o, y, Z) {
      return this._invokeZS
        ? this._invokeZS.onInvoke(
            this._invokeDlgt,
            this._invokeCurrZone,
            i,
            s,
            o,
            y,
            Z,
          )
        : s.apply(o, y);
    }
    handleError(i, s) {
      return this._handleErrorZS
        ? this._handleErrorZS.onHandleError(
            this._handleErrorDlgt,
            this._handleErrorCurrZone,
            i,
            s,
          )
        : !0;
    }
    scheduleTask(i, s) {
      let o = s;
      if (this._scheduleTaskZS)
        this._hasTaskZS && o._zoneDelegates.push(this._hasTaskDlgtOwner),
          (o = this._scheduleTaskZS.onScheduleTask(
            this._scheduleTaskDlgt,
            this._scheduleTaskCurrZone,
            i,
            s,
          )),
          o || (o = s);
      else if (s.scheduleFn) s.scheduleFn(s);
      else if (s.type == B) V(s);
      else throw new Error("Task is missing scheduleFn.");
      return o;
    }
    invokeTask(i, s, o, y) {
      return this._invokeTaskZS
        ? this._invokeTaskZS.onInvokeTask(
            this._invokeTaskDlgt,
            this._invokeTaskCurrZone,
            i,
            s,
            o,
            y,
          )
        : s.callback.apply(o, y);
    }
    cancelTask(i, s) {
      let o;
      if (this._cancelTaskZS)
        o = this._cancelTaskZS.onCancelTask(
          this._cancelTaskDlgt,
          this._cancelTaskCurrZone,
          i,
          s,
        );
      else {
        if (!s.cancelFn) throw Error("Task is not cancelable");
        o = s.cancelFn(s);
      }
      return o;
    }
    hasTask(i, s) {
      try {
        this._hasTaskZS &&
          this._hasTaskZS.onHasTask(
            this._hasTaskDlgt,
            this._hasTaskCurrZone,
            i,
            s,
          );
      } catch (o) {
        this.handleError(i, o);
      }
    }
    _updateTaskCount(i, s) {
      let o = this._taskCounts,
        y = o[i],
        Z = (o[i] = y + s);
      if (Z < 0) throw new Error("More tasks executed then were scheduled.");
      if (y == 0 || Z == 0) {
        let L = {
          microTask: o.microTask > 0,
          macroTask: o.macroTask > 0,
          eventTask: o.eventTask > 0,
          change: i,
        };
        this.hasTask(this._zone, L);
      }
    }
  }
  class T {
    constructor(i, s, o, y, Z, L) {
      if (
        ((this._zone = null),
        (this.runCount = 0),
        (this._zoneDelegates = null),
        (this._state = "notScheduled"),
        (this.type = i),
        (this.source = s),
        (this.data = y),
        (this.scheduleFn = Z),
        (this.cancelFn = L),
        !o)
      )
        throw new Error("callback is not defined");
      this.callback = o;
      let se = this;
      i === G && y && y.useG
        ? (this.invoke = T.invokeTask)
        : (this.invoke = function () {
            return T.invokeTask.call(ae, se, this, arguments);
          });
    }
    static invokeTask(i, s, o) {
      i || (i = this), Q++;
      try {
        return i.runCount++, i.zone.runTask(i, s, o);
      } finally {
        Q == 1 && K(), Q--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(W, k);
    }
    _transitionTo(i, s, o) {
      if (this._state === s || this._state === o)
        (this._state = i), i == W && (this._zoneDelegates = null);
      else
        throw new Error(
          `${this.type} '${this.source}': can not transition to '${i}', expecting state '${s}'${o ? " or '" + o + "'" : ""}, was '${this._state}'.`,
        );
    }
    toString() {
      return this.data && typeof this.data.handleId < "u"
        ? this.data.handleId.toString()
        : Object.prototype.toString.call(this);
    }
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount,
      };
    }
  }
  let g = ee("setTimeout"),
    p = ee("Promise"),
    N = ee("then"),
    _ = [],
    w = !1,
    M;
  function $(x) {
    if ((M || (ae[p] && (M = ae[p].resolve(0))), M)) {
      let i = M[N];
      i || (i = M.then), i.call(M, x);
    } else ae[g](x, 0);
  }
  function V(x) {
    Q === 0 && _.length === 0 && $(K), x && _.push(x);
  }
  function K() {
    if (!w) {
      for (w = !0; _.length; ) {
        let x = _;
        _ = [];
        for (let i = 0; i < x.length; i++) {
          let s = x[i];
          try {
            s.zone.runTask(s, null, null);
          } catch (o) {
            P.onUnhandledError(o);
          }
        }
      }
      P.microtaskDrainDone(), (w = !1);
    }
  }
  let J = { name: "NO ZONE" },
    W = "notScheduled",
    k = "scheduling",
    d = "scheduled",
    A = "running",
    H = "canceling",
    q = "unknown",
    B = "microTask",
    E = "macroTask",
    G = "eventTask",
    O = {},
    P = {
      symbol: ee,
      currentZoneFrame: () => b,
      onUnhandledError: F,
      microtaskDrainDone: F,
      scheduleMicroTask: V,
      showUncaughtError: () => !n[ee("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: F,
      patchMethod: () => F,
      bindArguments: () => [],
      patchThen: () => F,
      patchMacroTask: () => F,
      patchEventPrototype: () => F,
      isIEOrEdge: () => !1,
      getGlobalObjects: () => {},
      ObjectDefineProperty: () => F,
      ObjectGetOwnPropertyDescriptor: () => {},
      ObjectCreate: () => {},
      ArraySlice: () => [],
      patchClass: () => F,
      wrapWithCurrentZone: () => F,
      filterProperties: () => [],
      attachOriginToPatched: () => F,
      _redefineProperty: () => F,
      patchCallbacks: () => F,
      nativeScheduleMicroTask: $,
    },
    b = { parent: null, zone: new n(null, null) },
    S = null,
    Q = 0;
  function F() {}
  return c("Zone", "Zone"), n;
}
function mt() {
  let e = globalThis,
    t = e[ee("forceDuplicateZoneCheck")] === !0;
  if (e.Zone && (t || typeof e.Zone.__symbol__ != "function"))
    throw new Error("Zone already loaded.");
  return (e.Zone ??= Et()), e.Zone;
}
var be = Object.getOwnPropertyDescriptor,
  xe = Object.defineProperty,
  Ze = Object.getPrototypeOf,
  pt = Object.create,
  yt = Array.prototype.slice,
  $e = "addEventListener",
  He = "removeEventListener",
  Me = ee($e),
  Le = ee(He),
  fe = "true",
  he = "false",
  we = ee("");
function Be(e, t) {
  return Zone.current.wrap(e, t);
}
function Ue(e, t, c, n, a) {
  return Zone.current.scheduleMacroTask(e, t, c, n, a);
}
var j = ee,
  Se = typeof window < "u",
  ye = Se ? window : void 0,
  Y = (Se && ye) || globalThis,
  kt = "removeAttribute";
function ze(e, t) {
  for (let c = e.length - 1; c >= 0; c--)
    typeof e[c] == "function" && (e[c] = Be(e[c], t + "_" + c));
  return e;
}
function vt(e, t) {
  let c = e.constructor.name;
  for (let n = 0; n < t.length; n++) {
    let a = t[n],
      f = e[a];
    if (f) {
      let T = be(e, a);
      if (!rt(T)) continue;
      e[a] = ((g) => {
        let p = function () {
          return g.apply(this, ze(arguments, c + "." + a));
        };
        return _e(p, g), p;
      })(f);
    }
  }
}
function rt(e) {
  return e
    ? e.writable === !1
      ? !1
      : !(typeof e.get == "function" && typeof e.set > "u")
    : !0;
}
var ot = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  Oe =
    !("nw" in Y) &&
    typeof Y.process < "u" &&
    Y.process.toString() === "[object process]",
  Ve = !Oe && !ot && !!(Se && ye.HTMLElement),
  st =
    typeof Y.process < "u" &&
    Y.process.toString() === "[object process]" &&
    !ot &&
    !!(Se && ye.HTMLElement),
  Ne = {},
  bt = j("enable_beforeunload"),
  Ke = function (e) {
    if (((e = e || Y.event), !e)) return;
    let t = Ne[e.type];
    t || (t = Ne[e.type] = j("ON_PROPERTY" + e.type));
    let c = this || e.target || Y,
      n = c[t],
      a;
    if (Ve && c === ye && e.type === "error") {
      let f = e;
      (a =
        n && n.call(this, f.message, f.filename, f.lineno, f.colno, f.error)),
        a === !0 && e.preventDefault();
    } else
      (a = n && n.apply(this, arguments)),
        e.type === "beforeunload" && Y[bt] && typeof a == "string"
          ? (e.returnValue = a)
          : a != null && !a && e.preventDefault();
    return a;
  };
function Je(e, t, c) {
  let n = be(e, t);
  if (
    (!n && c && be(c, t) && (n = { enumerable: !0, configurable: !0 }),
    !n || !n.configurable)
  )
    return;
  let a = j("on" + t + "patched");
  if (e.hasOwnProperty(a) && e[a]) return;
  delete n.writable, delete n.value;
  let f = n.get,
    T = n.set,
    g = t.slice(2),
    p = Ne[g];
  p || (p = Ne[g] = j("ON_PROPERTY" + g)),
    (n.set = function (N) {
      let _ = this;
      if ((!_ && e === Y && (_ = Y), !_)) return;
      typeof _[p] == "function" && _.removeEventListener(g, Ke),
        T && T.call(_, null),
        (_[p] = N),
        typeof N == "function" && _.addEventListener(g, Ke, !1);
    }),
    (n.get = function () {
      let N = this;
      if ((!N && e === Y && (N = Y), !N)) return null;
      let _ = N[p];
      if (_) return _;
      if (f) {
        let w = f.call(this);
        if (w)
          return (
            n.set.call(this, w),
            typeof N[kt] == "function" && N.removeAttribute(t),
            w
          );
      }
      return null;
    }),
    xe(e, t, n),
    (e[a] = !0);
}
function it(e, t, c) {
  if (t) for (let n = 0; n < t.length; n++) Je(e, "on" + t[n], c);
  else {
    let n = [];
    for (let a in e) a.slice(0, 2) == "on" && n.push(a);
    for (let a = 0; a < n.length; a++) Je(e, n[a], c);
  }
}
var oe = j("originalInstance");
function ve(e) {
  let t = Y[e];
  if (!t) return;
  (Y[j(e)] = t),
    (Y[e] = function () {
      let a = ze(arguments, e);
      switch (a.length) {
        case 0:
          this[oe] = new t();
          break;
        case 1:
          this[oe] = new t(a[0]);
          break;
        case 2:
          this[oe] = new t(a[0], a[1]);
          break;
        case 3:
          this[oe] = new t(a[0], a[1], a[2]);
          break;
        case 4:
          this[oe] = new t(a[0], a[1], a[2], a[3]);
          break;
        default:
          throw new Error("Arg list too long.");
      }
    }),
    _e(Y[e], t);
  let c = new t(function () {}),
    n;
  for (n in c)
    (e === "XMLHttpRequest" && n === "responseBlob") ||
      (function (a) {
        typeof c[a] == "function"
          ? (Y[e].prototype[a] = function () {
              return this[oe][a].apply(this[oe], arguments);
            })
          : xe(Y[e].prototype, a, {
              set: function (f) {
                typeof f == "function"
                  ? ((this[oe][a] = Be(f, e + "." + a)), _e(this[oe][a], f))
                  : (this[oe][a] = f);
              },
              get: function () {
                return this[oe][a];
              },
            });
      })(n);
  for (n in t) n !== "prototype" && t.hasOwnProperty(n) && (Y[e][n] = t[n]);
}
function de(e, t, c) {
  let n = e;
  for (; n && !n.hasOwnProperty(t); ) n = Ze(n);
  !n && e[t] && (n = e);
  let a = j(t),
    f = null;
  if (n && (!(f = n[a]) || !n.hasOwnProperty(a))) {
    f = n[a] = n[t];
    let T = n && be(n, t);
    if (rt(T)) {
      let g = c(f, a, t);
      (n[t] = function () {
        return g(this, arguments);
      }),
        _e(n[t], f);
    }
  }
  return f;
}
function wt(e, t, c) {
  let n = null;
  function a(f) {
    let T = f.data;
    return (
      (T.args[T.cbIdx] = function () {
        f.invoke.apply(this, arguments);
      }),
      n.apply(T.target, T.args),
      f
    );
  }
  n = de(
    e,
    t,
    (f) =>
      function (T, g) {
        let p = c(T, g);
        return p.cbIdx >= 0 && typeof g[p.cbIdx] == "function"
          ? Ue(p.name, g[p.cbIdx], p, a)
          : f.apply(T, g);
      },
  );
}
function _e(e, t) {
  e[j("OriginalDelegate")] = t;
}
var Qe = !1,
  Ae = !1;
function Pt() {
  try {
    let e = ye.navigator.userAgent;
    if (e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1) return !0;
  } catch {}
  return !1;
}
function Rt() {
  if (Qe) return Ae;
  Qe = !0;
  try {
    let e = ye.navigator.userAgent;
    (e.indexOf("MSIE ") !== -1 ||
      e.indexOf("Trident/") !== -1 ||
      e.indexOf("Edge/") !== -1) &&
      (Ae = !0);
  } catch {}
  return Ae;
}
function et(e) {
  return typeof e == "function";
}
function tt(e) {
  return typeof e == "number";
}
var pe = !1;
if (typeof window < "u")
  try {
    let e = Object.defineProperty({}, "passive", {
      get: function () {
        pe = !0;
      },
    });
    window.addEventListener("test", e, e),
      window.removeEventListener("test", e, e);
  } catch {
    pe = !1;
  }
var Nt = { useG: !0 },
  te = {},
  ct = {},
  at = new RegExp("^" + we + "(\\w+)(true|false)$"),
  lt = j("propagationStopped");
function ut(e, t) {
  let c = (t ? t(e) : e) + he,
    n = (t ? t(e) : e) + fe,
    a = we + c,
    f = we + n;
  (te[e] = {}), (te[e][he] = a), (te[e][fe] = f);
}
function St(e, t, c, n) {
  let a = (n && n.add) || $e,
    f = (n && n.rm) || He,
    T = (n && n.listeners) || "eventListeners",
    g = (n && n.rmAll) || "removeAllListeners",
    p = j(a),
    N = "." + a + ":",
    _ = "prependListener",
    w = "." + _ + ":",
    M = function (k, d, A) {
      if (k.isRemoved) return;
      let H = k.callback;
      typeof H == "object" &&
        H.handleEvent &&
        ((k.callback = (E) => H.handleEvent(E)), (k.originalDelegate = H));
      let q;
      try {
        k.invoke(k, d, [A]);
      } catch (E) {
        q = E;
      }
      let B = k.options;
      if (B && typeof B == "object" && B.once) {
        let E = k.originalDelegate ? k.originalDelegate : k.callback;
        d[f].call(d, A.type, E, B);
      }
      return q;
    };
  function $(k, d, A) {
    if (((d = d || e.event), !d)) return;
    let H = k || d.target || e,
      q = H[te[d.type][A ? fe : he]];
    if (q) {
      let B = [];
      if (q.length === 1) {
        let E = M(q[0], H, d);
        E && B.push(E);
      } else {
        let E = q.slice();
        for (let G = 0; G < E.length && !(d && d[lt] === !0); G++) {
          let O = M(E[G], H, d);
          O && B.push(O);
        }
      }
      if (B.length === 1) throw B[0];
      for (let E = 0; E < B.length; E++) {
        let G = B[E];
        t.nativeScheduleMicroTask(() => {
          throw G;
        });
      }
    }
  }
  let V = function (k) {
      return $(this, k, !1);
    },
    K = function (k) {
      return $(this, k, !0);
    };
  function J(k, d) {
    if (!k) return !1;
    let A = !0;
    d && d.useG !== void 0 && (A = d.useG);
    let H = d && d.vh,
      q = !0;
    d && d.chkDup !== void 0 && (q = d.chkDup);
    let B = !1;
    d && d.rt !== void 0 && (B = d.rt);
    let E = k;
    for (; E && !E.hasOwnProperty(a); ) E = Ze(E);
    if ((!E && k[a] && (E = k), !E || E[p])) return !1;
    let G = d && d.eventNameToString,
      O = {},
      P = (E[p] = E[a]),
      b = (E[j(f)] = E[f]),
      S = (E[j(T)] = E[T]),
      Q = (E[j(g)] = E[g]),
      F;
    d && d.prepend && (F = E[j(d.prepend)] = E[d.prepend]);
    function X(r, u) {
      return !pe && typeof r == "object" && r
        ? !!r.capture
        : !pe || !u
          ? r
          : typeof r == "boolean"
            ? { capture: r, passive: !0 }
            : r
              ? typeof r == "object" && r.passive !== !1
                ? { ...r, passive: !0 }
                : r
              : { passive: !0 };
    }
    let x = function (r) {
        if (!O.isExisting)
          return P.call(O.target, O.eventName, O.capture ? K : V, O.options);
      },
      i = function (r) {
        if (!r.isRemoved) {
          let u = te[r.eventName],
            v;
          u && (v = u[r.capture ? fe : he]);
          let R = v && r.target[v];
          if (R) {
            for (let m = 0; m < R.length; m++)
              if (R[m] === r) {
                R.splice(m, 1),
                  (r.isRemoved = !0),
                  r.removeAbortListener &&
                    (r.removeAbortListener(), (r.removeAbortListener = null)),
                  R.length === 0 && ((r.allRemoved = !0), (r.target[v] = null));
                break;
              }
          }
        }
        if (r.allRemoved)
          return b.call(r.target, r.eventName, r.capture ? K : V, r.options);
      },
      s = function (r) {
        return P.call(O.target, O.eventName, r.invoke, O.options);
      },
      o = function (r) {
        return F.call(O.target, O.eventName, r.invoke, O.options);
      },
      y = function (r) {
        return b.call(r.target, r.eventName, r.invoke, r.options);
      },
      Z = A ? x : s,
      L = A ? i : y,
      se = function (r, u) {
        let v = typeof u;
        return (
          (v === "function" && r.callback === u) ||
          (v === "object" && r.originalDelegate === u)
        );
      },
      le = d && d.diff ? d.diff : se,
      ue = Zone[j("UNPATCHED_EVENTS")],
      ne = e[j("PASSIVE_EVENTS")];
    function h(r) {
      if (typeof r == "object" && r !== null) {
        let u = { ...r };
        return r.signal && (u.signal = r.signal), u;
      }
      return r;
    }
    let l = function (r, u, v, R, m = !1, C = !1) {
      return function () {
        let I = this || e,
          D = arguments[0];
        d && d.transferEventName && (D = d.transferEventName(D));
        let U = arguments[1];
        if (!U) return r.apply(this, arguments);
        if (Oe && D === "uncaughtException") return r.apply(this, arguments);
        let z = !1;
        if (typeof U != "function") {
          if (!U.handleEvent) return r.apply(this, arguments);
          z = !0;
        }
        if (H && !H(r, U, I, arguments)) return;
        let Te = pe && !!ne && ne.indexOf(D) !== -1,
          ie = h(X(arguments[2], Te)),
          ge = ie?.signal;
        if (ge?.aborted) return;
        if (ue) {
          for (let ce = 0; ce < ue.length; ce++)
            if (D === ue[ce])
              return Te ? r.call(I, D, U, ie) : r.apply(this, arguments);
        }
        let Ie = ie ? (typeof ie == "boolean" ? !0 : ie.capture) : !1,
          Fe = ie && typeof ie == "object" ? ie.once : !1,
          gt = Zone.current,
          De = te[D];
        De || (ut(D, G), (De = te[D]));
        let We = De[Ie ? fe : he],
          Ee = I[We],
          qe = !1;
        if (Ee) {
          if (((qe = !0), q)) {
            for (let ce = 0; ce < Ee.length; ce++) if (le(Ee[ce], U)) return;
          }
        } else Ee = I[We] = [];
        let Pe,
          Xe = I.constructor.name,
          Ye = ct[Xe];
        Ye && (Pe = Ye[D]),
          Pe || (Pe = Xe + u + (G ? G(D) : D)),
          (O.options = ie),
          Fe && (O.options.once = !1),
          (O.target = I),
          (O.capture = Ie),
          (O.eventName = D),
          (O.isExisting = qe);
        let ke = A ? Nt : void 0;
        ke && (ke.taskData = O), ge && (O.options.signal = void 0);
        let re = gt.scheduleEventTask(Pe, U, ke, v, R);
        if (ge) {
          O.options.signal = ge;
          let ce = () => re.zone.cancelTask(re);
          r.call(ge, "abort", ce, { once: !0 }),
            (re.removeAbortListener = () =>
              ge.removeEventListener("abort", ce));
        }
        if (
          ((O.target = null),
          ke && (ke.taskData = null),
          Fe && (O.options.once = !0),
          (!pe && typeof re.options == "boolean") || (re.options = ie),
          (re.target = I),
          (re.capture = Ie),
          (re.eventName = D),
          z && (re.originalDelegate = U),
          C ? Ee.unshift(re) : Ee.push(re),
          m)
        )
          return I;
      };
    };
    return (
      (E[a] = l(P, N, Z, L, B)),
      F && (E[_] = l(F, w, o, L, B, !0)),
      (E[f] = function () {
        let r = this || e,
          u = arguments[0];
        d && d.transferEventName && (u = d.transferEventName(u));
        let v = arguments[2],
          R = v ? (typeof v == "boolean" ? !0 : v.capture) : !1,
          m = arguments[1];
        if (!m) return b.apply(this, arguments);
        if (H && !H(b, m, r, arguments)) return;
        let C = te[u],
          I;
        C && (I = C[R ? fe : he]);
        let D = I && r[I];
        if (D)
          for (let U = 0; U < D.length; U++) {
            let z = D[U];
            if (le(z, m)) {
              if (
                (D.splice(U, 1),
                (z.isRemoved = !0),
                D.length === 0 &&
                  ((z.allRemoved = !0),
                  (r[I] = null),
                  !R && typeof u == "string"))
              ) {
                let Te = we + "ON_PROPERTY" + u;
                r[Te] = null;
              }
              return z.zone.cancelTask(z), B ? r : void 0;
            }
          }
        return b.apply(this, arguments);
      }),
      (E[T] = function () {
        let r = this || e,
          u = arguments[0];
        d && d.transferEventName && (u = d.transferEventName(u));
        let v = [],
          R = ft(r, G ? G(u) : u);
        for (let m = 0; m < R.length; m++) {
          let C = R[m],
            I = C.originalDelegate ? C.originalDelegate : C.callback;
          v.push(I);
        }
        return v;
      }),
      (E[g] = function () {
        let r = this || e,
          u = arguments[0];
        if (u) {
          d && d.transferEventName && (u = d.transferEventName(u));
          let v = te[u];
          if (v) {
            let R = v[he],
              m = v[fe],
              C = r[R],
              I = r[m];
            if (C) {
              let D = C.slice();
              for (let U = 0; U < D.length; U++) {
                let z = D[U],
                  Te = z.originalDelegate ? z.originalDelegate : z.callback;
                this[f].call(this, u, Te, z.options);
              }
            }
            if (I) {
              let D = I.slice();
              for (let U = 0; U < D.length; U++) {
                let z = D[U],
                  Te = z.originalDelegate ? z.originalDelegate : z.callback;
                this[f].call(this, u, Te, z.options);
              }
            }
          }
        } else {
          let v = Object.keys(r);
          for (let R = 0; R < v.length; R++) {
            let m = v[R],
              C = at.exec(m),
              I = C && C[1];
            I && I !== "removeListener" && this[g].call(this, I);
          }
          this[g].call(this, "removeListener");
        }
        if (B) return this;
      }),
      _e(E[a], P),
      _e(E[f], b),
      Q && _e(E[g], Q),
      S && _e(E[T], S),
      !0
    );
  }
  let W = [];
  for (let k = 0; k < c.length; k++) W[k] = J(c[k], n);
  return W;
}
function ft(e, t) {
  if (!t) {
    let f = [];
    for (let T in e) {
      let g = at.exec(T),
        p = g && g[1];
      if (p && (!t || p === t)) {
        let N = e[T];
        if (N) for (let _ = 0; _ < N.length; _++) f.push(N[_]);
      }
    }
    return f;
  }
  let c = te[t];
  c || (ut(t), (c = te[t]));
  let n = e[c[he]],
    a = e[c[fe]];
  return n ? (a ? n.concat(a) : n.slice()) : a ? a.slice() : [];
}
function Ot(e, t) {
  let c = e.Event;
  c &&
    c.prototype &&
    t.patchMethod(
      c.prototype,
      "stopImmediatePropagation",
      (n) =>
        function (a, f) {
          (a[lt] = !0), n && n.apply(a, f);
        },
    );
}
function Ct(e, t) {
  t.patchMethod(
    e,
    "queueMicrotask",
    (c) =>
      function (n, a) {
        Zone.current.scheduleMicroTask("queueMicrotask", a[0]);
      },
  );
}
var Re = j("zoneTask");
function me(e, t, c, n) {
  let a = null,
    f = null;
  (t += n), (c += n);
  let T = {};
  function g(N) {
    let _ = N.data;
    _.args[0] = function () {
      return N.invoke.apply(this, arguments);
    };
    let w = a.apply(e, _.args);
    return (
      tt(w)
        ? (_.handleId = w)
        : ((_.handle = w), (_.isRefreshable = et(w.refresh))),
      N
    );
  }
  function p(N) {
    let { handle: _, handleId: w } = N.data;
    return f.call(e, _ ?? w);
  }
  (a = de(
    e,
    t,
    (N) =>
      function (_, w) {
        if (et(w[0])) {
          let M = {
              isRefreshable: !1,
              isPeriodic: n === "Interval",
              delay: n === "Timeout" || n === "Interval" ? w[1] || 0 : void 0,
              args: w,
            },
            $ = w[0];
          w[0] = function () {
            try {
              return $.apply(this, arguments);
            } finally {
              let {
                handle: A,
                handleId: H,
                isPeriodic: q,
                isRefreshable: B,
              } = M;
              !q && !B && (H ? delete T[H] : A && (A[Re] = null));
            }
          };
          let V = Ue(t, w[0], M, g, p);
          if (!V) return V;
          let {
            handleId: K,
            handle: J,
            isRefreshable: W,
            isPeriodic: k,
          } = V.data;
          if (K) T[K] = V;
          else if (J && ((J[Re] = V), W && !k)) {
            let d = J.refresh;
            J.refresh = function () {
              let { zone: A, state: H } = V;
              return (
                H === "notScheduled"
                  ? ((V._state = "scheduled"), A._updateTaskCount(V, 1))
                  : H === "running" && (V._state = "scheduling"),
                d.call(this)
              );
            };
          }
          return J ?? K ?? V;
        } else return N.apply(e, w);
      },
  )),
    (f = de(
      e,
      c,
      (N) =>
        function (_, w) {
          let M = w[0],
            $;
          tt(M)
            ? (($ = T[M]), delete T[M])
            : (($ = M?.[Re]), $ ? (M[Re] = null) : ($ = M)),
            $?.type ? $.cancelFn && $.zone.cancelTask($) : N.apply(e, w);
        },
    ));
}
function It(e, t) {
  let { isBrowser: c, isMix: n } = t.getGlobalObjects();
  if ((!c && !n) || !e.customElements || !("customElements" in e)) return;
  let a = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback",
  ];
  t.patchCallbacks(t, e.customElements, "customElements", "define", a);
}
function Dt(e, t) {
  if (Zone[t.symbol("patchEventTarget")]) return;
  let {
    eventNames: c,
    zoneSymbolEventNames: n,
    TRUE_STR: a,
    FALSE_STR: f,
    ZONE_SYMBOL_PREFIX: T,
  } = t.getGlobalObjects();
  for (let p = 0; p < c.length; p++) {
    let N = c[p],
      _ = N + f,
      w = N + a,
      M = T + _,
      $ = T + w;
    (n[N] = {}), (n[N][f] = M), (n[N][a] = $);
  }
  let g = e.EventTarget;
  if (!(!g || !g.prototype))
    return t.patchEventTarget(e, t, [g && g.prototype]), !0;
}
function Mt(e, t) {
  t.patchEventPrototype(e, t);
}
function ht(e, t, c) {
  if (!c || c.length === 0) return t;
  let n = c.filter((f) => f.target === e);
  if (!n || n.length === 0) return t;
  let a = n[0].ignoreProperties;
  return t.filter((f) => a.indexOf(f) === -1);
}
function nt(e, t, c, n) {
  if (!e) return;
  let a = ht(e, t, c);
  it(e, a, n);
}
function je(e) {
  return Object.getOwnPropertyNames(e)
    .filter((t) => t.startsWith("on") && t.length > 2)
    .map((t) => t.substring(2));
}
function Lt(e, t) {
  if ((Oe && !st) || Zone[e.symbol("patchEvents")]) return;
  let c = t.__Zone_ignore_on_properties,
    n = [];
  if (Ve) {
    let a = window;
    n = n.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker",
    ]);
    let f = Pt() ? [{ target: a, ignoreProperties: ["error"] }] : [];
    nt(a, je(a), c && c.concat(f), Ze(a));
  }
  n = n.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket",
  ]);
  for (let a = 0; a < n.length; a++) {
    let f = t[n[a]];
    f && f.prototype && nt(f.prototype, je(f.prototype), c);
  }
}
function At(e) {
  e.__load_patch("legacy", (t) => {
    let c = t[e.__symbol__("legacyPatch")];
    c && c();
  }),
    e.__load_patch("timers", (t) => {
      let c = "set",
        n = "clear";
      me(t, c, n, "Timeout"), me(t, c, n, "Interval"), me(t, c, n, "Immediate");
    }),
    e.__load_patch("requestAnimationFrame", (t) => {
      me(t, "request", "cancel", "AnimationFrame"),
        me(t, "mozRequest", "mozCancel", "AnimationFrame"),
        me(t, "webkitRequest", "webkitCancel", "AnimationFrame");
    }),
    e.__load_patch("blocking", (t, c) => {
      let n = ["alert", "prompt", "confirm"];
      for (let a = 0; a < n.length; a++) {
        let f = n[a];
        de(
          t,
          f,
          (T, g, p) =>
            function (N, _) {
              return c.current.run(T, t, _, p);
            },
        );
      }
    }),
    e.__load_patch("EventTarget", (t, c, n) => {
      Mt(t, n), Dt(t, n);
      let a = t.XMLHttpRequestEventTarget;
      a && a.prototype && n.patchEventTarget(t, n, [a.prototype]);
    }),
    e.__load_patch("MutationObserver", (t, c, n) => {
      ve("MutationObserver"), ve("WebKitMutationObserver");
    }),
    e.__load_patch("IntersectionObserver", (t, c, n) => {
      ve("IntersectionObserver");
    }),
    e.__load_patch("FileReader", (t, c, n) => {
      ve("FileReader");
    }),
    e.__load_patch("on_property", (t, c, n) => {
      Lt(n, t);
    }),
    e.__load_patch("customElements", (t, c, n) => {
      It(t, n);
    }),
    e.__load_patch("XHR", (t, c) => {
      N(t);
      let n = j("xhrTask"),
        a = j("xhrSync"),
        f = j("xhrListener"),
        T = j("xhrScheduled"),
        g = j("xhrURL"),
        p = j("xhrErrorBeforeScheduled");
      function N(_) {
        let w = _.XMLHttpRequest;
        if (!w) return;
        let M = w.prototype;
        function $(P) {
          return P[n];
        }
        let V = M[Me],
          K = M[Le];
        if (!V) {
          let P = _.XMLHttpRequestEventTarget;
          if (P) {
            let b = P.prototype;
            (V = b[Me]), (K = b[Le]);
          }
        }
        let J = "readystatechange",
          W = "scheduled";
        function k(P) {
          let b = P.data,
            S = b.target;
          (S[T] = !1), (S[p] = !1);
          let Q = S[f];
          V || ((V = S[Me]), (K = S[Le])), Q && K.call(S, J, Q);
          let F = (S[f] = () => {
            if (S.readyState === S.DONE)
              if (!b.aborted && S[T] && P.state === W) {
                let x = S[c.__symbol__("loadfalse")];
                if (S.status !== 0 && x && x.length > 0) {
                  let i = P.invoke;
                  (P.invoke = function () {
                    let s = S[c.__symbol__("loadfalse")];
                    for (let o = 0; o < s.length; o++)
                      s[o] === P && s.splice(o, 1);
                    !b.aborted && P.state === W && i.call(P);
                  }),
                    x.push(P);
                } else P.invoke();
              } else !b.aborted && S[T] === !1 && (S[p] = !0);
          });
          return (
            V.call(S, J, F),
            S[n] || (S[n] = P),
            G.apply(S, b.args),
            (S[T] = !0),
            P
          );
        }
        function d() {}
        function A(P) {
          let b = P.data;
          return (b.aborted = !0), O.apply(b.target, b.args);
        }
        let H = de(
            M,
            "open",
            () =>
              function (P, b) {
                return (P[a] = b[2] == !1), (P[g] = b[1]), H.apply(P, b);
              },
          ),
          q = "XMLHttpRequest.send",
          B = j("fetchTaskAborting"),
          E = j("fetchTaskScheduling"),
          G = de(
            M,
            "send",
            () =>
              function (P, b) {
                if (c.current[E] === !0 || P[a]) return G.apply(P, b);
                {
                  let S = {
                      target: P,
                      url: P[g],
                      isPeriodic: !1,
                      args: b,
                      aborted: !1,
                    },
                    Q = Ue(q, d, S, k, A);
                  P && P[p] === !0 && !S.aborted && Q.state === W && Q.invoke();
                }
              },
          ),
          O = de(
            M,
            "abort",
            () =>
              function (P, b) {
                let S = $(P);
                if (S && typeof S.type == "string") {
                  if (S.cancelFn == null || (S.data && S.data.aborted)) return;
                  S.zone.cancelTask(S);
                } else if (c.current[B] === !0) return O.apply(P, b);
              },
          );
      }
    }),
    e.__load_patch("geolocation", (t) => {
      t.navigator &&
        t.navigator.geolocation &&
        vt(t.navigator.geolocation, ["getCurrentPosition", "watchPosition"]);
    }),
    e.__load_patch("PromiseRejectionEvent", (t, c) => {
      function n(a) {
        return function (f) {
          ft(t, a).forEach((g) => {
            let p = t.PromiseRejectionEvent;
            if (p) {
              let N = new p(a, { promise: f.promise, reason: f.rejection });
              g.invoke(N);
            }
          });
        };
      }
      t.PromiseRejectionEvent &&
        ((c[j("unhandledPromiseRejectionHandler")] = n("unhandledrejection")),
        (c[j("rejectionHandledHandler")] = n("rejectionhandled")));
    }),
    e.__load_patch("queueMicrotask", (t, c, n) => {
      Ct(t, n);
    });
}
function jt(e) {
  e.__load_patch("ZoneAwarePromise", (t, c, n) => {
    let a = Object.getOwnPropertyDescriptor,
      f = Object.defineProperty;
    function T(h) {
      if (h && h.toString === Object.prototype.toString) {
        let l = h.constructor && h.constructor.name;
        return (l || "") + ": " + JSON.stringify(h);
      }
      return h ? h.toString() : Object.prototype.toString.call(h);
    }
    let g = n.symbol,
      p = [],
      N = t[g("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
      _ = g("Promise"),
      w = g("then"),
      M = "__creationTrace__";
    (n.onUnhandledError = (h) => {
      if (n.showUncaughtError()) {
        let l = h && h.rejection;
        l
          ? console.error(
              "Unhandled Promise rejection:",
              l instanceof Error ? l.message : l,
              "; Zone:",
              h.zone.name,
              "; Task:",
              h.task && h.task.source,
              "; Value:",
              l,
              l instanceof Error ? l.stack : void 0,
            )
          : console.error(h);
      }
    }),
      (n.microtaskDrainDone = () => {
        for (; p.length; ) {
          let h = p.shift();
          try {
            h.zone.runGuarded(() => {
              throw h.throwOriginal ? h.rejection : h;
            });
          } catch (l) {
            V(l);
          }
        }
      });
    let $ = g("unhandledPromiseRejectionHandler");
    function V(h) {
      n.onUnhandledError(h);
      try {
        let l = c[$];
        typeof l == "function" && l.call(this, h);
      } catch {}
    }
    function K(h) {
      return h && h.then;
    }
    function J(h) {
      return h;
    }
    function W(h) {
      return L.reject(h);
    }
    let k = g("state"),
      d = g("value"),
      A = g("finally"),
      H = g("parentPromiseValue"),
      q = g("parentPromiseState"),
      B = "Promise.then",
      E = null,
      G = !0,
      O = !1,
      P = 0;
    function b(h, l) {
      return (r) => {
        try {
          X(h, l, r);
        } catch (u) {
          X(h, !1, u);
        }
      };
    }
    let S = function () {
        let h = !1;
        return function (r) {
          return function () {
            h || ((h = !0), r.apply(null, arguments));
          };
        };
      },
      Q = "Promise resolved with itself",
      F = g("currentTaskTrace");
    function X(h, l, r) {
      let u = S();
      if (h === r) throw new TypeError(Q);
      if (h[k] === E) {
        let v = null;
        try {
          (typeof r == "object" || typeof r == "function") && (v = r && r.then);
        } catch (R) {
          return (
            u(() => {
              X(h, !1, R);
            })(),
            h
          );
        }
        if (
          l !== O &&
          r instanceof L &&
          r.hasOwnProperty(k) &&
          r.hasOwnProperty(d) &&
          r[k] !== E
        )
          i(r), X(h, r[k], r[d]);
        else if (l !== O && typeof v == "function")
          try {
            v.call(r, u(b(h, l)), u(b(h, !1)));
          } catch (R) {
            u(() => {
              X(h, !1, R);
            })();
          }
        else {
          h[k] = l;
          let R = h[d];
          if (
            ((h[d] = r),
            h[A] === A && l === G && ((h[k] = h[q]), (h[d] = h[H])),
            l === O && r instanceof Error)
          ) {
            let m =
              c.currentTask && c.currentTask.data && c.currentTask.data[M];
            m &&
              f(r, F, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: m,
              });
          }
          for (let m = 0; m < R.length; ) s(h, R[m++], R[m++], R[m++], R[m++]);
          if (R.length == 0 && l == O) {
            h[k] = P;
            let m = r;
            try {
              throw new Error(
                "Uncaught (in promise): " +
                  T(r) +
                  (r && r.stack
                    ? `
` + r.stack
                    : ""),
              );
            } catch (C) {
              m = C;
            }
            N && (m.throwOriginal = !0),
              (m.rejection = r),
              (m.promise = h),
              (m.zone = c.current),
              (m.task = c.currentTask),
              p.push(m),
              n.scheduleMicroTask();
          }
        }
      }
      return h;
    }
    let x = g("rejectionHandledHandler");
    function i(h) {
      if (h[k] === P) {
        try {
          let l = c[x];
          l &&
            typeof l == "function" &&
            l.call(this, { rejection: h[d], promise: h });
        } catch {}
        h[k] = O;
        for (let l = 0; l < p.length; l++) h === p[l].promise && p.splice(l, 1);
      }
    }
    function s(h, l, r, u, v) {
      i(h);
      let R = h[k],
        m = R
          ? typeof u == "function"
            ? u
            : J
          : typeof v == "function"
            ? v
            : W;
      l.scheduleMicroTask(
        B,
        () => {
          try {
            let C = h[d],
              I = !!r && A === r[A];
            I && ((r[H] = C), (r[q] = R));
            let D = l.run(m, void 0, I && m !== W && m !== J ? [] : [C]);
            X(r, !0, D);
          } catch (C) {
            X(r, !1, C);
          }
        },
        r,
      );
    }
    let o = "function ZoneAwarePromise() { [native code] }",
      y = function () {},
      Z = t.AggregateError;
    class L {
      static toString() {
        return o;
      }
      static resolve(l) {
        return l instanceof L ? l : X(new this(null), G, l);
      }
      static reject(l) {
        return X(new this(null), O, l);
      }
      static withResolvers() {
        let l = {};
        return (
          (l.promise = new L((r, u) => {
            (l.resolve = r), (l.reject = u);
          })),
          l
        );
      }
      static any(l) {
        if (!l || typeof l[Symbol.iterator] != "function")
          return Promise.reject(new Z([], "All promises were rejected"));
        let r = [],
          u = 0;
        try {
          for (let m of l) u++, r.push(L.resolve(m));
        } catch {
          return Promise.reject(new Z([], "All promises were rejected"));
        }
        if (u === 0)
          return Promise.reject(new Z([], "All promises were rejected"));
        let v = !1,
          R = [];
        return new L((m, C) => {
          for (let I = 0; I < r.length; I++)
            r[I].then(
              (D) => {
                v || ((v = !0), m(D));
              },
              (D) => {
                R.push(D),
                  u--,
                  u === 0 &&
                    ((v = !0), C(new Z(R, "All promises were rejected")));
              },
            );
        });
      }
      static race(l) {
        let r,
          u,
          v = new this((C, I) => {
            (r = C), (u = I);
          });
        function R(C) {
          r(C);
        }
        function m(C) {
          u(C);
        }
        for (let C of l) K(C) || (C = this.resolve(C)), C.then(R, m);
        return v;
      }
      static all(l) {
        return L.allWithCallback(l);
      }
      static allSettled(l) {
        return (this && this.prototype instanceof L ? this : L).allWithCallback(
          l,
          {
            thenCallback: (u) => ({ status: "fulfilled", value: u }),
            errorCallback: (u) => ({ status: "rejected", reason: u }),
          },
        );
      }
      static allWithCallback(l, r) {
        let u,
          v,
          R = new this((D, U) => {
            (u = D), (v = U);
          }),
          m = 2,
          C = 0,
          I = [];
        for (let D of l) {
          K(D) || (D = this.resolve(D));
          let U = C;
          try {
            D.then(
              (z) => {
                (I[U] = r ? r.thenCallback(z) : z), m--, m === 0 && u(I);
              },
              (z) => {
                r ? ((I[U] = r.errorCallback(z)), m--, m === 0 && u(I)) : v(z);
              },
            );
          } catch (z) {
            v(z);
          }
          m++, C++;
        }
        return (m -= 2), m === 0 && u(I), R;
      }
      constructor(l) {
        let r = this;
        if (!(r instanceof L))
          throw new Error("Must be an instanceof Promise.");
        (r[k] = E), (r[d] = []);
        try {
          let u = S();
          l && l(u(b(r, G)), u(b(r, O)));
        } catch (u) {
          X(r, !1, u);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return L;
      }
      then(l, r) {
        let u = this.constructor?.[Symbol.species];
        (!u || typeof u != "function") && (u = this.constructor || L);
        let v = new u(y),
          R = c.current;
        return this[k] == E ? this[d].push(R, v, l, r) : s(this, R, v, l, r), v;
      }
      catch(l) {
        return this.then(null, l);
      }
      finally(l) {
        let r = this.constructor?.[Symbol.species];
        (!r || typeof r != "function") && (r = L);
        let u = new r(y);
        u[A] = A;
        let v = c.current;
        return this[k] == E ? this[d].push(v, u, l, l) : s(this, v, u, l, l), u;
      }
    }
    (L.resolve = L.resolve),
      (L.reject = L.reject),
      (L.race = L.race),
      (L.all = L.all);
    let se = (t[_] = t.Promise);
    t.Promise = L;
    let le = g("thenPatched");
    function ue(h) {
      let l = h.prototype,
        r = a(l, "then");
      if (r && (r.writable === !1 || !r.configurable)) return;
      let u = l.then;
      (l[w] = u),
        (h.prototype.then = function (v, R) {
          return new L((C, I) => {
            u.call(this, C, I);
          }).then(v, R);
        }),
        (h[le] = !0);
    }
    n.patchThen = ue;
    function ne(h) {
      return function (l, r) {
        let u = h.apply(l, r);
        if (u instanceof L) return u;
        let v = u.constructor;
        return v[le] || ue(v), u;
      };
    }
    return (
      se && (ue(se), de(t, "fetch", (h) => ne(h))),
      (Promise[c.__symbol__("uncaughtPromiseErrors")] = p),
      L
    );
  });
}
function xt(e) {
  e.__load_patch("toString", (t) => {
    let c = Function.prototype.toString,
      n = j("OriginalDelegate"),
      a = j("Promise"),
      f = j("Error"),
      T = function () {
        if (typeof this == "function") {
          let _ = this[n];
          if (_)
            return typeof _ == "function"
              ? c.call(_)
              : Object.prototype.toString.call(_);
          if (this === Promise) {
            let w = t[a];
            if (w) return c.call(w);
          }
          if (this === Error) {
            let w = t[f];
            if (w) return c.call(w);
          }
        }
        return c.call(this);
      };
    (T[n] = c), (Function.prototype.toString = T);
    let g = Object.prototype.toString,
      p = "[object Promise]";
    Object.prototype.toString = function () {
      return typeof Promise == "function" && this instanceof Promise
        ? p
        : g.call(this);
    };
  });
}
function Zt(e, t, c, n, a) {
  let f = Zone.__symbol__(n);
  if (t[f]) return;
  let T = (t[f] = t[n]);
  (t[n] = function (g, p, N) {
    return (
      p &&
        p.prototype &&
        a.forEach(function (_) {
          let w = `${c}.${n}::` + _,
            M = p.prototype;
          try {
            if (M.hasOwnProperty(_)) {
              let $ = e.ObjectGetOwnPropertyDescriptor(M, _);
              $ && $.value
                ? (($.value = e.wrapWithCurrentZone($.value, w)),
                  e._redefineProperty(p.prototype, _, $))
                : M[_] && (M[_] = e.wrapWithCurrentZone(M[_], w));
            } else M[_] && (M[_] = e.wrapWithCurrentZone(M[_], w));
          } catch {}
        }),
      T.call(t, g, p, N)
    );
  }),
    e.attachOriginToPatched(t[n], T);
}
function $t(e) {
  e.__load_patch("util", (t, c, n) => {
    let a = je(t);
    (n.patchOnProperties = it),
      (n.patchMethod = de),
      (n.bindArguments = ze),
      (n.patchMacroTask = wt);
    let f = c.__symbol__("BLACK_LISTED_EVENTS"),
      T = c.__symbol__("UNPATCHED_EVENTS");
    t[T] && (t[f] = t[T]),
      t[f] && (c[f] = c[T] = t[f]),
      (n.patchEventPrototype = Ot),
      (n.patchEventTarget = St),
      (n.isIEOrEdge = Rt),
      (n.ObjectDefineProperty = xe),
      (n.ObjectGetOwnPropertyDescriptor = be),
      (n.ObjectCreate = pt),
      (n.ArraySlice = yt),
      (n.patchClass = ve),
      (n.wrapWithCurrentZone = Be),
      (n.filterProperties = ht),
      (n.attachOriginToPatched = _e),
      (n._redefineProperty = Object.defineProperty),
      (n.patchCallbacks = Zt),
      (n.getGlobalObjects = () => ({
        globalSources: ct,
        zoneSymbolEventNames: te,
        eventNames: a,
        isBrowser: Ve,
        isMix: st,
        isNode: Oe,
        TRUE_STR: fe,
        FALSE_STR: he,
        ZONE_SYMBOL_PREFIX: we,
        ADD_EVENT_LISTENER_STR: $e,
        REMOVE_EVENT_LISTENER_STR: He,
      }));
  });
}
function Ht(e) {
  jt(e), xt(e), $t(e);
}
var dt = mt();
Ht(dt);
At(dt);
var Bt = ":";
var Ge = class {
    visitText(t, c) {
      return t.value;
    }
    visitContainer(t, c) {
      return `[${t.children.map((n) => n.visit(this)).join(", ")}]`;
    }
    visitIcu(t, c) {
      let n = Object.keys(t.cases).map(
        (a) => `${a} {${t.cases[a].visit(this)}}`,
      );
      return `{${t.expression}, ${t.type}, ${n.join(", ")}}`;
    }
    visitTagPlaceholder(t, c) {
      return t.isVoid
        ? `<ph tag name="${t.startName}"/>`
        : `<ph tag name="${t.startName}">${t.children.map((n) => n.visit(this)).join(", ")}</ph name="${t.closeName}">`;
    }
    visitPlaceholder(t, c) {
      return t.value
        ? `<ph name="${t.name}">${t.value}</ph>`
        : `<ph name="${t.name}"/>`;
    }
    visitIcuPlaceholder(t, c) {
      return `<ph icu name="${t.name}">${t.value.visit(this)}</ph>`;
    }
    visitBlockPlaceholder(t, c) {
      return `<ph block name="${t.startName}">${t.children.map((n) => n.visit(this)).join(", ")}</ph name="${t.closeName}">`;
    }
  },
  Vt = new Ge();
var _t;
(function (e) {
  (e[(e.Little = 0)] = "Little"), (e[(e.Big = 1)] = "Big");
})(_t || (_t = {}));
function Ut(e, t) {
  for (let c = 1, n = 1; c < e.length; c++, n++)
    if (t[n] === "\\") n++;
    else if (e[c] === Bt) return c;
  throw new Error(`Unterminated $localize metadata block in "${t}".`);
}
var Ce = function (e, ...t) {
    if (Ce.translate) {
      let n = Ce.translate(e, t);
      (e = n[0]), (t = n[1]);
    }
    let c = Tt(e[0], e.raw[0]);
    for (let n = 1; n < e.length; n++) c += t[n - 1] + Tt(e[n], e.raw[n]);
    return c;
  },
  zt = ":";
function Tt(e, t) {
  return t.charAt(0) === zt ? e.substring(Ut(e, t) + 1) : e;
}
globalThis.$localize = Ce;
