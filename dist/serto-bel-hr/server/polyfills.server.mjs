import { createRequire } from "node:module";
globalThis["require"] ??= createRequire(import.meta.url);
var zr = ((_) =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
      ? new Proxy(_, { get: (E, h) => (typeof require < "u" ? require : E)[h] })
      : _)(function (_) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + _ + '" is not supported');
});
var lt = globalThis;
function ut(_) {
  return (lt.__Zone_symbol_prefix || "__zone_symbol__") + _;
}
function Ui() {
  let _ = lt.performance;
  function E(L) {
    _ && _.mark && _.mark(L);
  }
  function h(L, v) {
    _ && _.measure && _.measure(L, v);
  }
  E("Zone");
  let m = class m {
    static assertZonePatched() {
      if (lt.Promise !== D.ZoneAwarePromise)
        throw new Error(
          "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)",
        );
    }
    static get root() {
      let v = m.current;
      for (; v.parent; ) v = v.parent;
      return v;
    }
    static get current() {
      return W.zone;
    }
    static get currentTask() {
      return u;
    }
    static __load_patch(v, C, M = !1) {
      if (D.hasOwnProperty(v)) {
        let z = lt[ut("forceDuplicateZoneCheck")] === !0;
        if (!M && z) throw Error("Already loaded patch: " + v);
      } else if (!lt["__Zone_disable_" + v]) {
        let z = "Zone:" + v;
        E(z), (D[v] = C(lt, m, B)), h(z, z);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    constructor(v, C) {
      (this._parent = v),
        (this._name = C ? C.name || "unnamed" : "<root>"),
        (this._properties = (C && C.properties) || {}),
        (this._zoneDelegate = new a(
          this,
          this._parent && this._parent._zoneDelegate,
          C,
        ));
    }
    get(v) {
      let C = this.getZoneWith(v);
      if (C) return C._properties[v];
    }
    getZoneWith(v) {
      let C = this;
      for (; C; ) {
        if (C._properties.hasOwnProperty(v)) return C;
        C = C._parent;
      }
      return null;
    }
    fork(v) {
      if (!v) throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, v);
    }
    wrap(v, C) {
      if (typeof v != "function")
        throw new Error("Expecting function got: " + v);
      let M = this._zoneDelegate.intercept(this, v, C),
        z = this;
      return function () {
        return z.runGuarded(M, this, arguments, C);
      };
    }
    run(v, C, M, z) {
      W = { parent: W, zone: this };
      try {
        return this._zoneDelegate.invoke(this, v, C, M, z);
      } finally {
        W = W.parent;
      }
    }
    runGuarded(v, C = null, M, z) {
      W = { parent: W, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, v, C, M, z);
        } catch (y) {
          if (this._zoneDelegate.handleError(this, y)) throw y;
        }
      } finally {
        W = W.parent;
      }
    }
    runTask(v, C, M) {
      if (v.zone != this)
        throw new Error(
          "A task can only be run in the zone of creation! (Creation: " +
            (v.zone || ee).name +
            "; Execution: " +
            this.name +
            ")",
        );
      let z = v,
        { type: y, data: { isPeriodic: A = !1, isRefreshable: K = !1 } = {} } =
          v;
      if (v.state === U && (y === G || y === Q)) return;
      let me = v.state != S;
      me && z._transitionTo(S, p);
      let Ie = u;
      (u = z), (W = { parent: W, zone: this });
      try {
        y == Q && v.data && !A && !K && (v.cancelFn = void 0);
        try {
          return this._zoneDelegate.invokeTask(this, z, C, M);
        } catch ($e) {
          if (this._zoneDelegate.handleError(this, $e)) throw $e;
        }
      } finally {
        let $e = v.state;
        if ($e !== U && $e !== ae)
          if (y == G || A || (K && $e === T)) me && z._transitionTo(p, S, T);
          else {
            let Y = z._zoneDelegates;
            this._updateTaskCount(z, -1),
              me && z._transitionTo(U, S, U),
              K && (z._zoneDelegates = Y);
          }
        (W = W.parent), (u = Ie);
      }
    }
    scheduleTask(v) {
      if (v.zone && v.zone !== this) {
        let M = this;
        for (; M; ) {
          if (M === v.zone)
            throw Error(
              `can not reschedule task to ${this.name} which is descendants of the original zone ${v.zone.name}`,
            );
          M = M.parent;
        }
      }
      v._transitionTo(T, U);
      let C = [];
      (v._zoneDelegates = C), (v._zone = this);
      try {
        v = this._zoneDelegate.scheduleTask(this, v);
      } catch (M) {
        throw (
          (v._transitionTo(ae, T, U),
          this._zoneDelegate.handleError(this, M),
          M)
        );
      }
      return (
        v._zoneDelegates === C && this._updateTaskCount(v, 1),
        v.state == T && v._transitionTo(p, T),
        v
      );
    }
    scheduleMicroTask(v, C, M, z) {
      return this.scheduleTask(new c(ne, v, C, M, z, void 0));
    }
    scheduleMacroTask(v, C, M, z, y) {
      return this.scheduleTask(new c(Q, v, C, M, z, y));
    }
    scheduleEventTask(v, C, M, z, y) {
      return this.scheduleTask(new c(G, v, C, M, z, y));
    }
    cancelTask(v) {
      if (v.zone != this)
        throw new Error(
          "A task can only be cancelled in the zone of creation! (Creation: " +
            (v.zone || ee).name +
            "; Execution: " +
            this.name +
            ")",
        );
      if (!(v.state !== p && v.state !== S)) {
        v._transitionTo(g, p, S);
        try {
          this._zoneDelegate.cancelTask(this, v);
        } catch (C) {
          throw (
            (v._transitionTo(ae, g), this._zoneDelegate.handleError(this, C), C)
          );
        }
        return (
          this._updateTaskCount(v, -1),
          v._transitionTo(U, g),
          (v.runCount = -1),
          v
        );
      }
    }
    _updateTaskCount(v, C) {
      let M = v._zoneDelegates;
      C == -1 && (v._zoneDelegates = null);
      for (let z = 0; z < M.length; z++) M[z]._updateTaskCount(v.type, C);
    }
  };
  m.__symbol__ = ut;
  let s = m,
    t = {
      name: "",
      onHasTask: (L, v, C, M) => L.hasTask(C, M),
      onScheduleTask: (L, v, C, M) => L.scheduleTask(C, M),
      onInvokeTask: (L, v, C, M, z, y) => L.invokeTask(C, M, z, y),
      onCancelTask: (L, v, C, M) => L.cancelTask(C, M),
    };
  class a {
    get zone() {
      return this._zone;
    }
    constructor(v, C, M) {
      (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
        (this._zone = v),
        (this._parentDelegate = C),
        (this._forkZS = M && (M && M.onFork ? M : C._forkZS)),
        (this._forkDlgt = M && (M.onFork ? C : C._forkDlgt)),
        (this._forkCurrZone = M && (M.onFork ? this._zone : C._forkCurrZone)),
        (this._interceptZS = M && (M.onIntercept ? M : C._interceptZS)),
        (this._interceptDlgt = M && (M.onIntercept ? C : C._interceptDlgt)),
        (this._interceptCurrZone =
          M && (M.onIntercept ? this._zone : C._interceptCurrZone)),
        (this._invokeZS = M && (M.onInvoke ? M : C._invokeZS)),
        (this._invokeDlgt = M && (M.onInvoke ? C : C._invokeDlgt)),
        (this._invokeCurrZone =
          M && (M.onInvoke ? this._zone : C._invokeCurrZone)),
        (this._handleErrorZS = M && (M.onHandleError ? M : C._handleErrorZS)),
        (this._handleErrorDlgt =
          M && (M.onHandleError ? C : C._handleErrorDlgt)),
        (this._handleErrorCurrZone =
          M && (M.onHandleError ? this._zone : C._handleErrorCurrZone)),
        (this._scheduleTaskZS =
          M && (M.onScheduleTask ? M : C._scheduleTaskZS)),
        (this._scheduleTaskDlgt =
          M && (M.onScheduleTask ? C : C._scheduleTaskDlgt)),
        (this._scheduleTaskCurrZone =
          M && (M.onScheduleTask ? this._zone : C._scheduleTaskCurrZone)),
        (this._invokeTaskZS = M && (M.onInvokeTask ? M : C._invokeTaskZS)),
        (this._invokeTaskDlgt = M && (M.onInvokeTask ? C : C._invokeTaskDlgt)),
        (this._invokeTaskCurrZone =
          M && (M.onInvokeTask ? this._zone : C._invokeTaskCurrZone)),
        (this._cancelTaskZS = M && (M.onCancelTask ? M : C._cancelTaskZS)),
        (this._cancelTaskDlgt = M && (M.onCancelTask ? C : C._cancelTaskDlgt)),
        (this._cancelTaskCurrZone =
          M && (M.onCancelTask ? this._zone : C._cancelTaskCurrZone)),
        (this._hasTaskZS = null),
        (this._hasTaskDlgt = null),
        (this._hasTaskDlgtOwner = null),
        (this._hasTaskCurrZone = null);
      let z = M && M.onHasTask,
        y = C && C._hasTaskZS;
      (z || y) &&
        ((this._hasTaskZS = z ? M : t),
        (this._hasTaskDlgt = C),
        (this._hasTaskDlgtOwner = this),
        (this._hasTaskCurrZone = this._zone),
        M.onScheduleTask ||
          ((this._scheduleTaskZS = t),
          (this._scheduleTaskDlgt = C),
          (this._scheduleTaskCurrZone = this._zone)),
        M.onInvokeTask ||
          ((this._invokeTaskZS = t),
          (this._invokeTaskDlgt = C),
          (this._invokeTaskCurrZone = this._zone)),
        M.onCancelTask ||
          ((this._cancelTaskZS = t),
          (this._cancelTaskDlgt = C),
          (this._cancelTaskCurrZone = this._zone)));
    }
    fork(v, C) {
      return this._forkZS
        ? this._forkZS.onFork(this._forkDlgt, this.zone, v, C)
        : new s(v, C);
    }
    intercept(v, C, M) {
      return this._interceptZS
        ? this._interceptZS.onIntercept(
            this._interceptDlgt,
            this._interceptCurrZone,
            v,
            C,
            M,
          )
        : C;
    }
    invoke(v, C, M, z, y) {
      return this._invokeZS
        ? this._invokeZS.onInvoke(
            this._invokeDlgt,
            this._invokeCurrZone,
            v,
            C,
            M,
            z,
            y,
          )
        : C.apply(M, z);
    }
    handleError(v, C) {
      return this._handleErrorZS
        ? this._handleErrorZS.onHandleError(
            this._handleErrorDlgt,
            this._handleErrorCurrZone,
            v,
            C,
          )
        : !0;
    }
    scheduleTask(v, C) {
      let M = C;
      if (this._scheduleTaskZS)
        this._hasTaskZS && M._zoneDelegates.push(this._hasTaskDlgtOwner),
          (M = this._scheduleTaskZS.onScheduleTask(
            this._scheduleTaskDlgt,
            this._scheduleTaskCurrZone,
            v,
            C,
          )),
          M || (M = C);
      else if (C.scheduleFn) C.scheduleFn(C);
      else if (C.type == ne) q(C);
      else throw new Error("Task is missing scheduleFn.");
      return M;
    }
    invokeTask(v, C, M, z) {
      return this._invokeTaskZS
        ? this._invokeTaskZS.onInvokeTask(
            this._invokeTaskDlgt,
            this._invokeTaskCurrZone,
            v,
            C,
            M,
            z,
          )
        : C.callback.apply(M, z);
    }
    cancelTask(v, C) {
      let M;
      if (this._cancelTaskZS)
        M = this._cancelTaskZS.onCancelTask(
          this._cancelTaskDlgt,
          this._cancelTaskCurrZone,
          v,
          C,
        );
      else {
        if (!C.cancelFn) throw Error("Task is not cancelable");
        M = C.cancelFn(C);
      }
      return M;
    }
    hasTask(v, C) {
      try {
        this._hasTaskZS &&
          this._hasTaskZS.onHasTask(
            this._hasTaskDlgt,
            this._hasTaskCurrZone,
            v,
            C,
          );
      } catch (M) {
        this.handleError(v, M);
      }
    }
    _updateTaskCount(v, C) {
      let M = this._taskCounts,
        z = M[v],
        y = (M[v] = z + C);
      if (y < 0) throw new Error("More tasks executed then were scheduled.");
      if (z == 0 || y == 0) {
        let A = {
          microTask: M.microTask > 0,
          macroTask: M.macroTask > 0,
          eventTask: M.eventTask > 0,
          change: v,
        };
        this.hasTask(this._zone, A);
      }
    }
  }
  class c {
    constructor(v, C, M, z, y, A) {
      if (
        ((this._zone = null),
        (this.runCount = 0),
        (this._zoneDelegates = null),
        (this._state = "notScheduled"),
        (this.type = v),
        (this.source = C),
        (this.data = z),
        (this.scheduleFn = y),
        (this.cancelFn = A),
        !M)
      )
        throw new Error("callback is not defined");
      this.callback = M;
      let K = this;
      v === G && z && z.useG
        ? (this.invoke = c.invokeTask)
        : (this.invoke = function () {
            return c.invokeTask.call(lt, K, this, arguments);
          });
    }
    static invokeTask(v, C, M) {
      v || (v = this), o++;
      try {
        return v.runCount++, v.zone.runTask(v, C, M);
      } finally {
        o == 1 && O(), o--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(U, T);
    }
    _transitionTo(v, C, M) {
      if (this._state === C || this._state === M)
        (this._state = v), v == U && (this._zoneDelegates = null);
      else
        throw new Error(
          `${this.type} '${this.source}': can not transition to '${v}', expecting state '${C}'${M ? " or '" + M + "'" : ""}, was '${this._state}'.`,
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
  let l = ut("setTimeout"),
    f = ut("Promise"),
    i = ut("then"),
    b = [],
    d = !1,
    w;
  function R(L) {
    if ((w || (lt[f] && (w = lt[f].resolve(0))), w)) {
      let v = w[i];
      v || (v = w.then), v.call(w, L);
    } else lt[l](L, 0);
  }
  function q(L) {
    o === 0 && b.length === 0 && R(O), L && b.push(L);
  }
  function O() {
    if (!d) {
      for (d = !0; b.length; ) {
        let L = b;
        b = [];
        for (let v = 0; v < L.length; v++) {
          let C = L[v];
          try {
            C.zone.runTask(C, null, null);
          } catch (M) {
            B.onUnhandledError(M);
          }
        }
      }
      B.microtaskDrainDone(), (d = !1);
    }
  }
  let ee = { name: "NO ZONE" },
    U = "notScheduled",
    T = "scheduling",
    p = "scheduled",
    S = "running",
    g = "canceling",
    ae = "unknown",
    ne = "microTask",
    Q = "macroTask",
    G = "eventTask",
    D = {},
    B = {
      symbol: ut,
      currentZoneFrame: () => W,
      onUnhandledError: n,
      microtaskDrainDone: n,
      scheduleMicroTask: q,
      showUncaughtError: () => !s[ut("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: n,
      patchMethod: () => n,
      bindArguments: () => [],
      patchThen: () => n,
      patchMacroTask: () => n,
      patchEventPrototype: () => n,
      isIEOrEdge: () => !1,
      getGlobalObjects: () => {},
      ObjectDefineProperty: () => n,
      ObjectGetOwnPropertyDescriptor: () => {},
      ObjectCreate: () => {},
      ArraySlice: () => [],
      patchClass: () => n,
      wrapWithCurrentZone: () => n,
      filterProperties: () => [],
      attachOriginToPatched: () => n,
      _redefineProperty: () => n,
      patchCallbacks: () => n,
      nativeScheduleMicroTask: R,
    },
    W = { parent: null, zone: new s(null, null) },
    u = null,
    o = 0;
  function n() {}
  return h("Zone", "Zone"), s;
}
var yn = Object.getOwnPropertyDescriptor,
  Fi = Object.defineProperty,
  sa = Object.getPrototypeOf,
  ji = Array.prototype.slice,
  Vi = "addEventListener",
  Gi = "removeEventListener",
  Ht = "true",
  qt = "false",
  Wr = ut("");
function zi(_, E) {
  return Zone.current.wrap(_, E);
}
function oa(_, E, h, s, t) {
  return Zone.current.scheduleMacroTask(_, E, h, s, t);
}
var Fe = ut,
  Xr = typeof window < "u",
  Yr = Xr ? window : void 0,
  tt = (Xr && Yr) || globalThis,
  Zi = "removeAttribute";
function Wi(_, E) {
  for (let h = _.length - 1; h >= 0; h--)
    typeof _[h] == "function" && (_[h] = zi(_[h], E + "_" + h));
  return _;
}
function $i(_) {
  return _
    ? _.writable === !1
      ? !1
      : !(typeof _.get == "function" && typeof _.set > "u")
    : !0;
}
var ca = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  la =
    !("nw" in tt) &&
    typeof tt.process < "u" &&
    tt.process.toString() === "[object process]",
  Ki = !la && !ca && !!(Xr && Yr.HTMLElement),
  ta =
    typeof tt.process < "u" &&
    tt.process.toString() === "[object process]" &&
    !ca &&
    !!(Xr && Yr.HTMLElement),
  $r = {},
  Xi = Fe("enable_beforeunload"),
  ra = function (_) {
    if (((_ = _ || tt.event), !_)) return;
    let E = $r[_.type];
    E || (E = $r[_.type] = Fe("ON_PROPERTY" + _.type));
    let h = this || _.target || tt,
      s = h[E],
      t;
    if (Ki && h === Yr && _.type === "error") {
      let a = _;
      (t =
        s && s.call(this, a.message, a.filename, a.lineno, a.colno, a.error)),
        t === !0 && _.preventDefault();
    } else
      (t = s && s.apply(this, arguments)),
        _.type === "beforeunload" && tt[Xi] && typeof t == "string"
          ? (_.returnValue = t)
          : t != null && !t && _.preventDefault();
    return t;
  };
function na(_, E, h) {
  let s = yn(_, E);
  if (
    (!s && h && yn(h, E) && (s = { enumerable: !0, configurable: !0 }),
    !s || !s.configurable)
  )
    return;
  let t = Fe("on" + E + "patched");
  if (_.hasOwnProperty(t) && _[t]) return;
  delete s.writable, delete s.value;
  let a = s.get,
    c = s.set,
    l = E.slice(2),
    f = $r[l];
  f || (f = $r[l] = Fe("ON_PROPERTY" + l)),
    (s.set = function (i) {
      let b = this;
      if ((!b && _ === tt && (b = tt), !b)) return;
      typeof b[f] == "function" && b.removeEventListener(l, ra),
        c && c.call(b, null),
        (b[f] = i),
        typeof i == "function" && b.addEventListener(l, ra, !1);
    }),
    (s.get = function () {
      let i = this;
      if ((!i && _ === tt && (i = tt), !i)) return null;
      let b = i[f];
      if (b) return b;
      if (a) {
        let d = a.call(this);
        if (d)
          return (
            s.set.call(this, d),
            typeof i[Zi] == "function" && i.removeAttribute(E),
            d
          );
      }
      return null;
    }),
    Fi(_, E, s),
    (_[t] = !0);
}
function Yi(_, E, h) {
  if (E) for (let s = 0; s < E.length; s++) na(_, "on" + E[s], h);
  else {
    let s = [];
    for (let t in _) t.slice(0, 2) == "on" && s.push(t);
    for (let t = 0; t < s.length; t++) na(_, s[t], h);
  }
}
function Qi(_, E) {
  if (typeof Object.getOwnPropertySymbols != "function") return;
  Object.getOwnPropertySymbols(_).forEach((s) => {
    let t = Object.getOwnPropertyDescriptor(_, s);
    Object.defineProperty(E, s, {
      get: function () {
        return _[s];
      },
      set: function (a) {
        (t && (!t.writable || typeof t.set != "function")) || (_[s] = a);
      },
      enumerable: t ? t.enumerable : !0,
      configurable: t ? t.configurable : !0,
    });
  });
}
var ua = !1;
function Ji(_) {
  ua = _;
}
function nr(_, E, h) {
  let s = _;
  for (; s && !s.hasOwnProperty(E); ) s = sa(s);
  !s && _[E] && (s = _);
  let t = Fe(E),
    a = null;
  if (s && (!(a = s[t]) || !s.hasOwnProperty(t))) {
    a = s[t] = s[E];
    let c = s && yn(s, E);
    if ($i(c)) {
      let l = h(a, t, E);
      (s[E] = function () {
        return l(this, arguments);
      }),
        _r(s[E], a),
        ua && Qi(a, s[E]);
    }
  }
  return a;
}
function Kr(_, E, h) {
  let s = null;
  function t(a) {
    let c = a.data;
    return (
      (c.args[c.cbIdx] = function () {
        a.invoke.apply(this, arguments);
      }),
      s.apply(c.target, c.args),
      a
    );
  }
  s = nr(
    _,
    E,
    (a) =>
      function (c, l) {
        let f = h(c, l);
        return f.cbIdx >= 0 && typeof l[f.cbIdx] == "function"
          ? oa(f.name, l[f.cbIdx], f, t)
          : a.apply(c, l);
      },
  );
}
function es(_, E, h) {
  let s = null;
  function t(a) {
    let c = a.data;
    return (
      (c.args[c.cbIdx] = function () {
        a.invoke.apply(this, arguments);
      }),
      s.apply(c.target, c.args),
      a
    );
  }
  s = nr(
    _,
    E,
    (a) =>
      function (c, l) {
        let f = h(c, l);
        return f.cbIdx >= 0 && typeof l[f.cbIdx] == "function"
          ? Zone.current.scheduleMicroTask(f.name, l[f.cbIdx], f, t)
          : a.apply(c, l);
      },
  );
}
function _r(_, E) {
  _[Fe("OriginalDelegate")] = E;
}
function aa(_) {
  return typeof _ == "function";
}
function ia(_) {
  return typeof _ == "number";
}
function ts(_) {
  _.__load_patch("ZoneAwarePromise", (E, h, s) => {
    let t = Object.getOwnPropertyDescriptor,
      a = Object.defineProperty;
    function c(Y) {
      if (Y && Y.toString === Object.prototype.toString) {
        let Z = Y.constructor && Y.constructor.name;
        return (Z || "") + ": " + JSON.stringify(Y);
      }
      return Y ? Y.toString() : Object.prototype.toString.call(Y);
    }
    let l = s.symbol,
      f = [],
      i = E[l("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
      b = l("Promise"),
      d = l("then"),
      w = "__creationTrace__";
    (s.onUnhandledError = (Y) => {
      if (s.showUncaughtError()) {
        let Z = Y && Y.rejection;
        Z
          ? console.error(
              "Unhandled Promise rejection:",
              Z instanceof Error ? Z.message : Z,
              "; Zone:",
              Y.zone.name,
              "; Task:",
              Y.task && Y.task.source,
              "; Value:",
              Z,
              Z instanceof Error ? Z.stack : void 0,
            )
          : console.error(Y);
      }
    }),
      (s.microtaskDrainDone = () => {
        for (; f.length; ) {
          let Y = f.shift();
          try {
            Y.zone.runGuarded(() => {
              throw Y.throwOriginal ? Y.rejection : Y;
            });
          } catch (Z) {
            q(Z);
          }
        }
      });
    let R = l("unhandledPromiseRejectionHandler");
    function q(Y) {
      s.onUnhandledError(Y);
      try {
        let Z = h[R];
        typeof Z == "function" && Z.call(this, Y);
      } catch {}
    }
    function O(Y) {
      return Y && Y.then;
    }
    function ee(Y) {
      return Y;
    }
    function U(Y) {
      return A.reject(Y);
    }
    let T = l("state"),
      p = l("value"),
      S = l("finally"),
      g = l("parentPromiseValue"),
      ae = l("parentPromiseState"),
      ne = "Promise.then",
      Q = null,
      G = !0,
      D = !1,
      B = 0;
    function W(Y, Z) {
      return (H) => {
        try {
          m(Y, Z, H);
        } catch ($) {
          m(Y, !1, $);
        }
      };
    }
    let u = function () {
        let Y = !1;
        return function (H) {
          return function () {
            Y || ((Y = !0), H.apply(null, arguments));
          };
        };
      },
      o = "Promise resolved with itself",
      n = l("currentTaskTrace");
    function m(Y, Z, H) {
      let $ = u();
      if (Y === H) throw new TypeError(o);
      if (Y[T] === Q) {
        let ce = null;
        try {
          (typeof H == "object" || typeof H == "function") &&
            (ce = H && H.then);
        } catch (he) {
          return (
            $(() => {
              m(Y, !1, he);
            })(),
            Y
          );
        }
        if (
          Z !== D &&
          H instanceof A &&
          H.hasOwnProperty(T) &&
          H.hasOwnProperty(p) &&
          H[T] !== Q
        )
          v(H), m(Y, H[T], H[p]);
        else if (Z !== D && typeof ce == "function")
          try {
            ce.call(H, $(W(Y, Z)), $(W(Y, !1)));
          } catch (he) {
            $(() => {
              m(Y, !1, he);
            })();
          }
        else {
          Y[T] = Z;
          let he = Y[p];
          if (
            ((Y[p] = H),
            Y[S] === S && Z === G && ((Y[T] = Y[ae]), (Y[p] = Y[g])),
            Z === D && H instanceof Error)
          ) {
            let ie =
              h.currentTask && h.currentTask.data && h.currentTask.data[w];
            ie &&
              a(H, n, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: ie,
              });
          }
          for (let ie = 0; ie < he.length; )
            C(Y, he[ie++], he[ie++], he[ie++], he[ie++]);
          if (he.length == 0 && Z == D) {
            Y[T] = B;
            let ie = H;
            try {
              throw new Error(
                "Uncaught (in promise): " +
                  c(H) +
                  (H && H.stack
                    ? `
` + H.stack
                    : ""),
              );
            } catch (ge) {
              ie = ge;
            }
            i && (ie.throwOriginal = !0),
              (ie.rejection = H),
              (ie.promise = Y),
              (ie.zone = h.current),
              (ie.task = h.currentTask),
              f.push(ie),
              s.scheduleMicroTask();
          }
        }
      }
      return Y;
    }
    let L = l("rejectionHandledHandler");
    function v(Y) {
      if (Y[T] === B) {
        try {
          let Z = h[L];
          Z &&
            typeof Z == "function" &&
            Z.call(this, { rejection: Y[p], promise: Y });
        } catch {}
        Y[T] = D;
        for (let Z = 0; Z < f.length; Z++) Y === f[Z].promise && f.splice(Z, 1);
      }
    }
    function C(Y, Z, H, $, ce) {
      v(Y);
      let he = Y[T],
        ie = he
          ? typeof $ == "function"
            ? $
            : ee
          : typeof ce == "function"
            ? ce
            : U;
      Z.scheduleMicroTask(
        ne,
        () => {
          try {
            let ge = Y[p],
              be = !!H && S === H[S];
            be && ((H[g] = ge), (H[ae] = he));
            let _e = Z.run(ie, void 0, be && ie !== U && ie !== ee ? [] : [ge]);
            m(H, !0, _e);
          } catch (ge) {
            m(H, !1, ge);
          }
        },
        H,
      );
    }
    let M = "function ZoneAwarePromise() { [native code] }",
      z = function () {},
      y = E.AggregateError;
    class A {
      static toString() {
        return M;
      }
      static resolve(Z) {
        return Z instanceof A ? Z : m(new this(null), G, Z);
      }
      static reject(Z) {
        return m(new this(null), D, Z);
      }
      static withResolvers() {
        let Z = {};
        return (
          (Z.promise = new A((H, $) => {
            (Z.resolve = H), (Z.reject = $);
          })),
          Z
        );
      }
      static any(Z) {
        if (!Z || typeof Z[Symbol.iterator] != "function")
          return Promise.reject(new y([], "All promises were rejected"));
        let H = [],
          $ = 0;
        try {
          for (let ie of Z) $++, H.push(A.resolve(ie));
        } catch {
          return Promise.reject(new y([], "All promises were rejected"));
        }
        if ($ === 0)
          return Promise.reject(new y([], "All promises were rejected"));
        let ce = !1,
          he = [];
        return new A((ie, ge) => {
          for (let be = 0; be < H.length; be++)
            H[be].then(
              (_e) => {
                ce || ((ce = !0), ie(_e));
              },
              (_e) => {
                he.push(_e),
                  $--,
                  $ === 0 &&
                    ((ce = !0), ge(new y(he, "All promises were rejected")));
              },
            );
        });
      }
      static race(Z) {
        let H,
          $,
          ce = new this((ge, be) => {
            (H = ge), ($ = be);
          });
        function he(ge) {
          H(ge);
        }
        function ie(ge) {
          $(ge);
        }
        for (let ge of Z) O(ge) || (ge = this.resolve(ge)), ge.then(he, ie);
        return ce;
      }
      static all(Z) {
        return A.allWithCallback(Z);
      }
      static allSettled(Z) {
        return (this && this.prototype instanceof A ? this : A).allWithCallback(
          Z,
          {
            thenCallback: ($) => ({ status: "fulfilled", value: $ }),
            errorCallback: ($) => ({ status: "rejected", reason: $ }),
          },
        );
      }
      static allWithCallback(Z, H) {
        let $,
          ce,
          he = new this((_e, Ae) => {
            ($ = _e), (ce = Ae);
          }),
          ie = 2,
          ge = 0,
          be = [];
        for (let _e of Z) {
          O(_e) || (_e = this.resolve(_e));
          let Ae = ge;
          try {
            _e.then(
              (Se) => {
                (be[Ae] = H ? H.thenCallback(Se) : Se), ie--, ie === 0 && $(be);
              },
              (Se) => {
                H
                  ? ((be[Ae] = H.errorCallback(Se)), ie--, ie === 0 && $(be))
                  : ce(Se);
              },
            );
          } catch (Se) {
            ce(Se);
          }
          ie++, ge++;
        }
        return (ie -= 2), ie === 0 && $(be), he;
      }
      constructor(Z) {
        let H = this;
        if (!(H instanceof A))
          throw new Error("Must be an instanceof Promise.");
        (H[T] = Q), (H[p] = []);
        try {
          let $ = u();
          Z && Z($(W(H, G)), $(W(H, D)));
        } catch ($) {
          m(H, !1, $);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return A;
      }
      then(Z, H) {
        let $ = this.constructor?.[Symbol.species];
        (!$ || typeof $ != "function") && ($ = this.constructor || A);
        let ce = new $(z),
          he = h.current;
        return (
          this[T] == Q ? this[p].push(he, ce, Z, H) : C(this, he, ce, Z, H), ce
        );
      }
      catch(Z) {
        return this.then(null, Z);
      }
      finally(Z) {
        let H = this.constructor?.[Symbol.species];
        (!H || typeof H != "function") && (H = A);
        let $ = new H(z);
        $[S] = S;
        let ce = h.current;
        return (
          this[T] == Q ? this[p].push(ce, $, Z, Z) : C(this, ce, $, Z, Z), $
        );
      }
    }
    (A.resolve = A.resolve),
      (A.reject = A.reject),
      (A.race = A.race),
      (A.all = A.all);
    let K = (E[b] = E.Promise);
    E.Promise = A;
    let me = l("thenPatched");
    function Ie(Y) {
      let Z = Y.prototype,
        H = t(Z, "then");
      if (H && (H.writable === !1 || !H.configurable)) return;
      let $ = Z.then;
      (Z[d] = $),
        (Y.prototype.then = function (ce, he) {
          return new A((ge, be) => {
            $.call(this, ge, be);
          }).then(ce, he);
        }),
        (Y[me] = !0);
    }
    s.patchThen = Ie;
    function $e(Y) {
      return function (Z, H) {
        let $ = Y.apply(Z, H);
        if ($ instanceof A) return $;
        let ce = $.constructor;
        return ce[me] || Ie(ce), $;
      };
    }
    return (
      K && (Ie(K), nr(E, "fetch", (Y) => $e(Y))),
      (Promise[h.__symbol__("uncaughtPromiseErrors")] = f),
      A
    );
  });
}
function rs(_) {
  _.__load_patch("toString", (E) => {
    let h = Function.prototype.toString,
      s = Fe("OriginalDelegate"),
      t = Fe("Promise"),
      a = Fe("Error"),
      c = function () {
        if (typeof this == "function") {
          let b = this[s];
          if (b)
            return typeof b == "function"
              ? h.call(b)
              : Object.prototype.toString.call(b);
          if (this === Promise) {
            let d = E[t];
            if (d) return h.call(d);
          }
          if (this === Error) {
            let d = E[a];
            if (d) return h.call(d);
          }
        }
        return h.call(this);
      };
    (c[s] = h), (Function.prototype.toString = c);
    let l = Object.prototype.toString,
      f = "[object Promise]";
    Object.prototype.toString = function () {
      return typeof Promise == "function" && this instanceof Promise
        ? f
        : l.call(this);
    };
  });
}
function ns() {
  let _ = globalThis,
    E = _[ut("forceDuplicateZoneCheck")] === !0;
  if (_.Zone && (E || typeof _.Zone.__symbol__ != "function"))
    throw new Error("Zone already loaded.");
  return (_.Zone ??= Ui()), _.Zone;
}
var rr = !1;
if (typeof window < "u")
  try {
    let _ = Object.defineProperty({}, "passive", {
      get: function () {
        rr = !0;
      },
    });
    window.addEventListener("test", _, _),
      window.removeEventListener("test", _, _);
  } catch {
    rr = !1;
  }
var as = { useG: !0 },
  at = {},
  is = {},
  fa = new RegExp("^" + Wr + "(\\w+)(true|false)$"),
  ss = Fe("propagationStopped");
function ha(_, E) {
  let h = (E ? E(_) : _) + qt,
    s = (E ? E(_) : _) + Ht,
    t = Wr + h,
    a = Wr + s;
  (at[_] = {}), (at[_][qt] = t), (at[_][Ht] = a);
}
function os(_, E, h, s) {
  let t = (s && s.add) || Vi,
    a = (s && s.rm) || Gi,
    c = (s && s.listeners) || "eventListeners",
    l = (s && s.rmAll) || "removeAllListeners",
    f = Fe(t),
    i = "." + t + ":",
    b = "prependListener",
    d = "." + b + ":",
    w = function (T, p, S) {
      if (T.isRemoved) return;
      let g = T.callback;
      typeof g == "object" &&
        g.handleEvent &&
        ((T.callback = (Q) => g.handleEvent(Q)), (T.originalDelegate = g));
      let ae;
      try {
        T.invoke(T, p, [S]);
      } catch (Q) {
        ae = Q;
      }
      let ne = T.options;
      if (ne && typeof ne == "object" && ne.once) {
        let Q = T.originalDelegate ? T.originalDelegate : T.callback;
        p[a].call(p, S.type, Q, ne);
      }
      return ae;
    };
  function R(T, p, S) {
    if (((p = p || _.event), !p)) return;
    let g = T || p.target || _,
      ae = g[at[p.type][S ? Ht : qt]];
    if (ae) {
      let ne = [];
      if (ae.length === 1) {
        let Q = w(ae[0], g, p);
        Q && ne.push(Q);
      } else {
        let Q = ae.slice();
        for (let G = 0; G < Q.length && !(p && p[ss] === !0); G++) {
          let D = w(Q[G], g, p);
          D && ne.push(D);
        }
      }
      if (ne.length === 1) throw ne[0];
      for (let Q = 0; Q < ne.length; Q++) {
        let G = ne[Q];
        E.nativeScheduleMicroTask(() => {
          throw G;
        });
      }
    }
  }
  let q = function (T) {
      return R(this, T, !1);
    },
    O = function (T) {
      return R(this, T, !0);
    };
  function ee(T, p) {
    if (!T) return !1;
    let S = !0;
    p && p.useG !== void 0 && (S = p.useG);
    let g = p && p.vh,
      ae = !0;
    p && p.chkDup !== void 0 && (ae = p.chkDup);
    let ne = !1;
    p && p.rt !== void 0 && (ne = p.rt);
    let Q = T;
    for (; Q && !Q.hasOwnProperty(t); ) Q = sa(Q);
    if ((!Q && T[t] && (Q = T), !Q || Q[f])) return !1;
    let G = p && p.eventNameToString,
      D = {},
      B = (Q[f] = Q[t]),
      W = (Q[Fe(a)] = Q[a]),
      u = (Q[Fe(c)] = Q[c]),
      o = (Q[Fe(l)] = Q[l]),
      n;
    p && p.prepend && (n = Q[Fe(p.prepend)] = Q[p.prepend]);
    function m(H, $) {
      return !rr && typeof H == "object" && H
        ? !!H.capture
        : !rr || !$
          ? H
          : typeof H == "boolean"
            ? { capture: H, passive: !0 }
            : H
              ? typeof H == "object" && H.passive !== !1
                ? { ...H, passive: !0 }
                : H
              : { passive: !0 };
    }
    let L = function (H) {
        if (!D.isExisting)
          return B.call(D.target, D.eventName, D.capture ? O : q, D.options);
      },
      v = function (H) {
        if (!H.isRemoved) {
          let $ = at[H.eventName],
            ce;
          $ && (ce = $[H.capture ? Ht : qt]);
          let he = ce && H.target[ce];
          if (he) {
            for (let ie = 0; ie < he.length; ie++)
              if (he[ie] === H) {
                he.splice(ie, 1),
                  (H.isRemoved = !0),
                  H.removeAbortListener &&
                    (H.removeAbortListener(), (H.removeAbortListener = null)),
                  he.length === 0 &&
                    ((H.allRemoved = !0), (H.target[ce] = null));
                break;
              }
          }
        }
        if (H.allRemoved)
          return W.call(H.target, H.eventName, H.capture ? O : q, H.options);
      },
      C = function (H) {
        return B.call(D.target, D.eventName, H.invoke, D.options);
      },
      M = function (H) {
        return n.call(D.target, D.eventName, H.invoke, D.options);
      },
      z = function (H) {
        return W.call(H.target, H.eventName, H.invoke, H.options);
      },
      y = S ? L : C,
      A = S ? v : z,
      K = function (H, $) {
        let ce = typeof $;
        return (
          (ce === "function" && H.callback === $) ||
          (ce === "object" && H.originalDelegate === $)
        );
      },
      me = p && p.diff ? p.diff : K,
      Ie = Zone[Fe("UNPATCHED_EVENTS")],
      $e = _[Fe("PASSIVE_EVENTS")];
    function Y(H) {
      if (typeof H == "object" && H !== null) {
        let $ = { ...H };
        return H.signal && ($.signal = H.signal), $;
      }
      return H;
    }
    let Z = function (H, $, ce, he, ie = !1, ge = !1) {
      return function () {
        let be = this || _,
          _e = arguments[0];
        p && p.transferEventName && (_e = p.transferEventName(_e));
        let Ae = arguments[1];
        if (!Ae) return H.apply(this, arguments);
        if (la && _e === "uncaughtException") return H.apply(this, arguments);
        let Se = !1;
        if (typeof Ae != "function") {
          if (!Ae.handleEvent) return H.apply(this, arguments);
          Se = !0;
        }
        if (g && !g(H, Ae, be, arguments)) return;
        let Xe = rr && !!$e && $e.indexOf(_e) !== -1,
          Ye = Y(m(arguments[2], Xe)),
          ze = Ye?.signal;
        if (ze?.aborted) return;
        if (Ie) {
          for (let F = 0; F < Ie.length; F++)
            if (_e === Ie[F])
              return Xe ? H.call(be, _e, Ae, Ye) : H.apply(this, arguments);
        }
        let Et = Ye ? (typeof Ye == "boolean" ? !0 : Ye.capture) : !1,
          Ue = Ye && typeof Ye == "object" ? Ye.once : !1,
          rn = Zone.current,
          Ne = at[_e];
        Ne || (ha(_e, G), (Ne = at[_e]));
        let ir = Ne[Et ? Ht : qt],
          ft = be[ir],
          vr = !1;
        if (ft) {
          if (((vr = !0), ae)) {
            for (let F = 0; F < ft.length; F++) if (me(ft[F], Ae)) return;
          }
        } else ft = be[ir] = [];
        let Pt,
          sr = be.constructor.name,
          Kt = is[sr];
        Kt && (Pt = Kt[_e]),
          Pt || (Pt = sr + $ + (G ? G(_e) : _e)),
          (D.options = Ye),
          Ue && (D.options.once = !1),
          (D.target = be),
          (D.capture = Et),
          (D.eventName = _e),
          (D.isExisting = vr);
        let vt = S ? as : void 0;
        vt && (vt.taskData = D), ze && (D.options.signal = void 0);
        let de = rn.scheduleEventTask(Pt, Ae, vt, ce, he);
        if (ze) {
          D.options.signal = ze;
          let F = () => de.zone.cancelTask(de);
          H.call(ze, "abort", F, { once: !0 }),
            (de.removeAbortListener = () => ze.removeEventListener("abort", F));
        }
        if (
          ((D.target = null),
          vt && (vt.taskData = null),
          Ue && (D.options.once = !0),
          (!rr && typeof de.options == "boolean") || (de.options = Ye),
          (de.target = be),
          (de.capture = Et),
          (de.eventName = _e),
          Se && (de.originalDelegate = Ae),
          ge ? ft.unshift(de) : ft.push(de),
          ie)
        )
          return be;
      };
    };
    return (
      (Q[t] = Z(B, i, y, A, ne)),
      n && (Q[b] = Z(n, d, M, A, ne, !0)),
      (Q[a] = function () {
        let H = this || _,
          $ = arguments[0];
        p && p.transferEventName && ($ = p.transferEventName($));
        let ce = arguments[2],
          he = ce ? (typeof ce == "boolean" ? !0 : ce.capture) : !1,
          ie = arguments[1];
        if (!ie) return W.apply(this, arguments);
        if (g && !g(W, ie, H, arguments)) return;
        let ge = at[$],
          be;
        ge && (be = ge[he ? Ht : qt]);
        let _e = be && H[be];
        if (_e)
          for (let Ae = 0; Ae < _e.length; Ae++) {
            let Se = _e[Ae];
            if (me(Se, ie)) {
              if (
                (_e.splice(Ae, 1),
                (Se.isRemoved = !0),
                _e.length === 0 &&
                  ((Se.allRemoved = !0),
                  (H[be] = null),
                  !he && typeof $ == "string"))
              ) {
                let Xe = Wr + "ON_PROPERTY" + $;
                H[Xe] = null;
              }
              return Se.zone.cancelTask(Se), ne ? H : void 0;
            }
          }
        return W.apply(this, arguments);
      }),
      (Q[c] = function () {
        let H = this || _,
          $ = arguments[0];
        p && p.transferEventName && ($ = p.transferEventName($));
        let ce = [],
          he = da(H, G ? G($) : $);
        for (let ie = 0; ie < he.length; ie++) {
          let ge = he[ie],
            be = ge.originalDelegate ? ge.originalDelegate : ge.callback;
          ce.push(be);
        }
        return ce;
      }),
      (Q[l] = function () {
        let H = this || _,
          $ = arguments[0];
        if ($) {
          p && p.transferEventName && ($ = p.transferEventName($));
          let ce = at[$];
          if (ce) {
            let he = ce[qt],
              ie = ce[Ht],
              ge = H[he],
              be = H[ie];
            if (ge) {
              let _e = ge.slice();
              for (let Ae = 0; Ae < _e.length; Ae++) {
                let Se = _e[Ae],
                  Xe = Se.originalDelegate ? Se.originalDelegate : Se.callback;
                this[a].call(this, $, Xe, Se.options);
              }
            }
            if (be) {
              let _e = be.slice();
              for (let Ae = 0; Ae < _e.length; Ae++) {
                let Se = _e[Ae],
                  Xe = Se.originalDelegate ? Se.originalDelegate : Se.callback;
                this[a].call(this, $, Xe, Se.options);
              }
            }
          }
        } else {
          let ce = Object.keys(H);
          for (let he = 0; he < ce.length; he++) {
            let ie = ce[he],
              ge = fa.exec(ie),
              be = ge && ge[1];
            be && be !== "removeListener" && this[l].call(this, be);
          }
          this[l].call(this, "removeListener");
        }
        if (ne) return this;
      }),
      _r(Q[t], B),
      _r(Q[a], W),
      o && _r(Q[l], o),
      u && _r(Q[c], u),
      !0
    );
  }
  let U = [];
  for (let T = 0; T < h.length; T++) U[T] = ee(h[T], s);
  return U;
}
function da(_, E) {
  if (!E) {
    let a = [];
    for (let c in _) {
      let l = fa.exec(c),
        f = l && l[1];
      if (f && (!E || f === E)) {
        let i = _[c];
        if (i) for (let b = 0; b < i.length; b++) a.push(i[b]);
      }
    }
    return a;
  }
  let h = at[E];
  h || (ha(E), (h = at[E]));
  let s = _[h[qt]],
    t = _[h[Ht]];
  return s ? (t ? s.concat(t) : s.slice()) : t ? t.slice() : [];
}
function cs(_, E) {
  E.patchMethod(
    _,
    "queueMicrotask",
    (h) =>
      function (s, t) {
        Zone.current.scheduleMicroTask("queueMicrotask", t[0]);
      },
  );
}
var Zr = Fe("zoneTask");
function Jt(_, E, h, s) {
  let t = null,
    a = null;
  (E += s), (h += s);
  let c = {};
  function l(i) {
    let b = i.data;
    b.args[0] = function () {
      return i.invoke.apply(this, arguments);
    };
    let d = t.apply(_, b.args);
    return (
      ia(d)
        ? (b.handleId = d)
        : ((b.handle = d), (b.isRefreshable = aa(d.refresh))),
      i
    );
  }
  function f(i) {
    let { handle: b, handleId: d } = i.data;
    return a.call(_, b ?? d);
  }
  (t = nr(
    _,
    E,
    (i) =>
      function (b, d) {
        if (aa(d[0])) {
          let w = {
              isRefreshable: !1,
              isPeriodic: s === "Interval",
              delay: s === "Timeout" || s === "Interval" ? d[1] || 0 : void 0,
              args: d,
            },
            R = d[0];
          d[0] = function () {
            try {
              return R.apply(this, arguments);
            } finally {
              let {
                handle: S,
                handleId: g,
                isPeriodic: ae,
                isRefreshable: ne,
              } = w;
              !ae && !ne && (g ? delete c[g] : S && (S[Zr] = null));
            }
          };
          let q = oa(E, d[0], w, l, f);
          if (!q) return q;
          let {
            handleId: O,
            handle: ee,
            isRefreshable: U,
            isPeriodic: T,
          } = q.data;
          if (O) c[O] = q;
          else if (ee && ((ee[Zr] = q), U && !T)) {
            let p = ee.refresh;
            ee.refresh = function () {
              let { zone: S, state: g } = q;
              return (
                g === "notScheduled"
                  ? ((q._state = "scheduled"), S._updateTaskCount(q, 1))
                  : g === "running" && (q._state = "scheduling"),
                p.call(this)
              );
            };
          }
          return ee ?? O ?? q;
        } else return i.apply(_, d);
      },
  )),
    (a = nr(
      _,
      h,
      (i) =>
        function (b, d) {
          let w = d[0],
            R;
          ia(w)
            ? ((R = c[w]), delete c[w])
            : ((R = w?.[Zr]), R ? (w[Zr] = null) : (R = w)),
            R?.type ? R.cancelFn && R.zone.cancelTask(R) : i.apply(_, d);
        },
    ));
}
function ls(_) {
  _.__load_patch("EventEmitter", (E, h, s) => {
    let t = "addListener",
      a = "prependListener",
      c = "removeListener",
      l = "removeAllListeners",
      f = "listeners",
      i = "on",
      b = "off",
      d = function (O, ee) {
        return O.callback === ee || O.callback.listener === ee;
      },
      w = function (O) {
        return typeof O == "string"
          ? O
          : O
            ? O.toString().replace("(", "_").replace(")", "_")
            : "";
      };
    function R(O) {
      let ee = os(E, s, [O], {
        useG: !1,
        add: t,
        rm: c,
        prepend: a,
        rmAll: l,
        listeners: f,
        chkDup: !1,
        rt: !0,
        diff: d,
        eventNameToString: w,
      });
      ee && ee[0] && ((O[i] = O[t]), (O[b] = O[c]));
    }
    let q;
    try {
      q = zr("events");
    } catch {}
    q && q.EventEmitter && R(q.EventEmitter.prototype);
  });
}
function us(_) {
  _.__load_patch("fs", (E, h, s) => {
    let t;
    try {
      t = zr("fs");
    } catch {}
    if (!t) return;
    [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "exists",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "read",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "write",
      "writeFile",
      "writev",
    ]
      .filter((l) => !!t[l] && typeof t[l] == "function")
      .forEach((l) => {
        Kr(t, l, (f, i) => ({
          name: "fs." + l,
          args: i,
          cbIdx: i.length > 0 ? i.length - 1 : -1,
          target: f,
        }));
      });
    let c = t.realpath?.[s.symbol("OriginalDelegate")];
    c?.native &&
      ((t.realpath.native = c.native),
      Kr(t.realpath, "native", (l, f) => ({
        args: f,
        target: l,
        cbIdx: f.length > 0 ? f.length - 1 : -1,
        name: "fs.realpath.native",
      })));
  });
}
function fs(_) {
  _.__load_patch("node_util", (E, h, s) => {
    (s.patchOnProperties = Yi),
      (s.patchMethod = nr),
      (s.bindArguments = Wi),
      (s.patchMacroTask = Kr),
      Ji(!0);
  });
}
var er = "set",
  tr = "clear";
function hs(_) {
  fs(_),
    ls(_),
    us(_),
    _.__load_patch("node_timers", (E, h) => {
      let s = !1;
      try {
        let t = zr("timers");
        if (!(E.setTimeout === t.setTimeout) && !ta) {
          let c = t.setTimeout;
          t.setTimeout = function () {
            return (s = !0), c.apply(this, arguments);
          };
          let l = E.setTimeout(() => {}, 100);
          clearTimeout(l), (t.setTimeout = c);
        }
        Jt(t, er, tr, "Timeout"),
          Jt(t, er, tr, "Interval"),
          Jt(t, er, tr, "Immediate");
      } catch {}
      ta ||
        (s
          ? ((E[h.__symbol__("setTimeout")] = E.setTimeout),
            (E[h.__symbol__("setInterval")] = E.setInterval),
            (E[h.__symbol__("setImmediate")] = E.setImmediate))
          : (Jt(E, er, tr, "Timeout"),
            Jt(E, er, tr, "Interval"),
            Jt(E, er, tr, "Immediate")));
    }),
    _.__load_patch("nextTick", () => {
      es(process, "nextTick", (E, h) => ({
        name: "process.nextTick",
        args: h,
        cbIdx: h.length > 0 && typeof h[0] == "function" ? 0 : -1,
        target: process,
      }));
    }),
    _.__load_patch("handleUnhandledPromiseRejection", (E, h, s) => {
      (h[s.symbol("unhandledPromiseRejectionHandler")] =
        t("unhandledRejection")),
        (h[s.symbol("rejectionHandledHandler")] = t("rejectionHandled"));
      function t(a) {
        return function (c) {
          da(process, a).forEach((f) => {
            a === "unhandledRejection"
              ? f.invoke(c.rejection, c.promise)
              : a === "rejectionHandled" && f.invoke(c.promise);
          });
        };
      }
    }),
    _.__load_patch("crypto", () => {
      let E;
      try {
        E = zr("crypto");
      } catch {}
      E &&
        ["randomBytes", "pbkdf2"].forEach((s) => {
          Kr(E, s, (t, a) => ({
            name: "crypto." + s,
            args: a,
            cbIdx:
              a.length > 0 && typeof a[a.length - 1] == "function"
                ? a.length - 1
                : -1,
            target: E,
          }));
        });
    }),
    _.__load_patch("console", (E, h) => {
      [
        "dir",
        "log",
        "info",
        "error",
        "warn",
        "assert",
        "debug",
        "timeEnd",
        "trace",
      ].forEach((t) => {
        let a = (console[h.__symbol__(t)] = console[t]);
        a &&
          (console[t] = function () {
            let c = ji.call(arguments);
            return h.current === h.root
              ? a.apply(this, c)
              : h.root.run(a, this, c);
          });
      });
    }),
    _.__load_patch("queueMicrotask", (E, h, s) => {
      cs(E, s);
    });
}
function ds() {
  let _ = ns();
  return hs(_), ts(_), rs(_), _;
}
ds();
var ps = ":";
var Nn = class {
    visitText(E, h) {
      return E.value;
    }
    visitContainer(E, h) {
      return `[${E.children.map((s) => s.visit(this)).join(", ")}]`;
    }
    visitIcu(E, h) {
      let s = Object.keys(E.cases).map(
        (t) => `${t} {${E.cases[t].visit(this)}}`,
      );
      return `{${E.expression}, ${E.type}, ${s.join(", ")}}`;
    }
    visitTagPlaceholder(E, h) {
      return E.isVoid
        ? `<ph tag name="${E.startName}"/>`
        : `<ph tag name="${E.startName}">${E.children.map((s) => s.visit(this)).join(", ")}</ph name="${E.closeName}">`;
    }
    visitPlaceholder(E, h) {
      return E.value
        ? `<ph name="${E.name}">${E.value}</ph>`
        : `<ph name="${E.name}"/>`;
    }
    visitIcuPlaceholder(E, h) {
      return `<ph icu name="${E.name}">${E.value.visit(this)}</ph>`;
    }
    visitBlockPlaceholder(E, h) {
      return `<ph block name="${E.startName}">${E.children.map((s) => s.visit(this)).join(", ")}</ph name="${E.closeName}">`;
    }
  },
  xs = new Nn();
var pa;
(function (_) {
  (_[(_.Little = 0)] = "Little"), (_[(_.Big = 1)] = "Big");
})(pa || (pa = {}));
function ms(_, E) {
  for (let h = 1, s = 1; h < _.length; h++, s++)
    if (E[s] === "\\") s++;
    else if (_[h] === ps) return h;
  throw new Error(`Unterminated $localize metadata block in "${E}".`);
}
var Qr = function (_, ...E) {
    if (Qr.translate) {
      let s = Qr.translate(_, E);
      (_ = s[0]), (E = s[1]);
    }
    let h = ma(_[0], _.raw[0]);
    for (let s = 1; s < _.length; s++) h += E[s - 1] + ma(_[s], _.raw[s]);
    return h;
  },
  gs = ":";
function ma(_, E) {
  return E.charAt(0) === gs ? _.substring(ms(_, E) + 1) : _;
}
globalThis.$localize = Qr;
var _s = Object.getOwnPropertyNames,
  le = (_, E) =>
    function () {
      return E || (0, _[_s(_)[0]])((E = { exports: {} }).exports, E), E.exports;
    },
  br = le({
    "external/npm/node_modules/domino/lib/Event.js"(_, E) {
      "use strict";
      (E.exports = h),
        (h.CAPTURING_PHASE = 1),
        (h.AT_TARGET = 2),
        (h.BUBBLING_PHASE = 3);
      function h(s, t) {
        if (
          ((this.type = ""),
          (this.target = null),
          (this.currentTarget = null),
          (this.eventPhase = h.AT_TARGET),
          (this.bubbles = !1),
          (this.cancelable = !1),
          (this.isTrusted = !1),
          (this.defaultPrevented = !1),
          (this.timeStamp = Date.now()),
          (this._propagationStopped = !1),
          (this._immediatePropagationStopped = !1),
          (this._initialized = !0),
          (this._dispatching = !1),
          s && (this.type = s),
          t)
        )
          for (var a in t) this[a] = t[a];
      }
      h.prototype = Object.create(Object.prototype, {
        constructor: { value: h },
        stopPropagation: {
          value: function () {
            this._propagationStopped = !0;
          },
        },
        stopImmediatePropagation: {
          value: function () {
            (this._propagationStopped = !0),
              (this._immediatePropagationStopped = !0);
          },
        },
        preventDefault: {
          value: function () {
            this.cancelable && (this.defaultPrevented = !0);
          },
        },
        initEvent: {
          value: function (t, a, c) {
            (this._initialized = !0),
              !this._dispatching &&
                ((this._propagationStopped = !1),
                (this._immediatePropagationStopped = !1),
                (this.defaultPrevented = !1),
                (this.isTrusted = !1),
                (this.target = null),
                (this.type = t),
                (this.bubbles = a),
                (this.cancelable = c));
          },
        },
      });
    },
  }),
  _a = le({
    "external/npm/node_modules/domino/lib/UIEvent.js"(_, E) {
      "use strict";
      var h = br();
      E.exports = s;
      function s() {
        h.call(this), (this.view = null), (this.detail = 0);
      }
      s.prototype = Object.create(h.prototype, {
        constructor: { value: s },
        initUIEvent: {
          value: function (t, a, c, l, f) {
            this.initEvent(t, a, c), (this.view = l), (this.detail = f);
          },
        },
      });
    },
  }),
  ba = le({
    "external/npm/node_modules/domino/lib/MouseEvent.js"(_, E) {
      "use strict";
      var h = _a();
      E.exports = s;
      function s() {
        h.call(this),
          (this.screenX = this.screenY = this.clientX = this.clientY = 0),
          (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1),
          (this.button = 0),
          (this.buttons = 1),
          (this.relatedTarget = null);
      }
      s.prototype = Object.create(h.prototype, {
        constructor: { value: s },
        initMouseEvent: {
          value: function (t, a, c, l, f, i, b, d, w, R, q, O, ee, U, T) {
            switch (
              (this.initEvent(t, a, c, l, f),
              (this.screenX = i),
              (this.screenY = b),
              (this.clientX = d),
              (this.clientY = w),
              (this.ctrlKey = R),
              (this.altKey = q),
              (this.shiftKey = O),
              (this.metaKey = ee),
              (this.button = U),
              U)
            ) {
              case 0:
                this.buttons = 1;
                break;
              case 1:
                this.buttons = 4;
                break;
              case 2:
                this.buttons = 2;
                break;
              default:
                this.buttons = 0;
                break;
            }
            this.relatedTarget = T;
          },
        },
        getModifierState: {
          value: function (t) {
            switch (t) {
              case "Alt":
                return this.altKey;
              case "Control":
                return this.ctrlKey;
              case "Shift":
                return this.shiftKey;
              case "Meta":
                return this.metaKey;
              default:
                return !1;
            }
          },
        },
      });
    },
  }),
  wn = le({
    "external/npm/node_modules/domino/lib/DOMException.js"(_, E) {
      "use strict";
      E.exports = D;
      var h = 1,
        s = 3,
        t = 4,
        a = 5,
        c = 7,
        l = 8,
        f = 9,
        i = 11,
        b = 12,
        d = 13,
        w = 14,
        R = 15,
        q = 17,
        O = 18,
        ee = 19,
        U = 20,
        T = 21,
        p = 22,
        S = 23,
        g = 24,
        ae = 25,
        ne = [
          null,
          "INDEX_SIZE_ERR",
          null,
          "HIERARCHY_REQUEST_ERR",
          "WRONG_DOCUMENT_ERR",
          "INVALID_CHARACTER_ERR",
          null,
          "NO_MODIFICATION_ALLOWED_ERR",
          "NOT_FOUND_ERR",
          "NOT_SUPPORTED_ERR",
          "INUSE_ATTRIBUTE_ERR",
          "INVALID_STATE_ERR",
          "SYNTAX_ERR",
          "INVALID_MODIFICATION_ERR",
          "NAMESPACE_ERR",
          "INVALID_ACCESS_ERR",
          null,
          "TYPE_MISMATCH_ERR",
          "SECURITY_ERR",
          "NETWORK_ERR",
          "ABORT_ERR",
          "URL_MISMATCH_ERR",
          "QUOTA_EXCEEDED_ERR",
          "TIMEOUT_ERR",
          "INVALID_NODE_TYPE_ERR",
          "DATA_CLONE_ERR",
        ],
        Q = [
          null,
          "INDEX_SIZE_ERR (1): the index is not in the allowed range",
          null,
          "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model",
          "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required",
          "INVALID_CHARACTER_ERR (5): the string contains invalid characters",
          null,
          "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified",
          "NOT_FOUND_ERR (8): the object can not be found here",
          "NOT_SUPPORTED_ERR (9): this operation is not supported",
          "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute",
          "INVALID_STATE_ERR (11): the object is in an invalid state",
          "SYNTAX_ERR (12): the string did not match the expected pattern",
          "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way",
          "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML",
          "INVALID_ACCESS_ERR (15): the object does not support the operation or argument",
          null,
          "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type",
          "SECURITY_ERR (18): the operation is insecure",
          "NETWORK_ERR (19): a network error occurred",
          "ABORT_ERR (20): the user aborted an operation",
          "URL_MISMATCH_ERR (21): the given URL does not match another URL",
          "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded",
          "TIMEOUT_ERR (23): a timeout occurred",
          "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation",
          "DATA_CLONE_ERR (25): the object can not be cloned.",
        ],
        G = {
          INDEX_SIZE_ERR: h,
          DOMSTRING_SIZE_ERR: 2,
          HIERARCHY_REQUEST_ERR: s,
          WRONG_DOCUMENT_ERR: t,
          INVALID_CHARACTER_ERR: a,
          NO_DATA_ALLOWED_ERR: 6,
          NO_MODIFICATION_ALLOWED_ERR: c,
          NOT_FOUND_ERR: l,
          NOT_SUPPORTED_ERR: f,
          INUSE_ATTRIBUTE_ERR: 10,
          INVALID_STATE_ERR: i,
          SYNTAX_ERR: b,
          INVALID_MODIFICATION_ERR: d,
          NAMESPACE_ERR: w,
          INVALID_ACCESS_ERR: R,
          VALIDATION_ERR: 16,
          TYPE_MISMATCH_ERR: q,
          SECURITY_ERR: O,
          NETWORK_ERR: ee,
          ABORT_ERR: U,
          URL_MISMATCH_ERR: T,
          QUOTA_EXCEEDED_ERR: p,
          TIMEOUT_ERR: S,
          INVALID_NODE_TYPE_ERR: g,
          DATA_CLONE_ERR: ae,
        };
      function D(u) {
        Error.call(this),
          Error.captureStackTrace(this, this.constructor),
          (this.code = u),
          (this.message = Q[u]),
          (this.name = ne[u]);
      }
      D.prototype.__proto__ = Error.prototype;
      for (W in G)
        (B = { value: G[W] }),
          Object.defineProperty(D, W, B),
          Object.defineProperty(D.prototype, W, B);
      var B, W;
    },
  }),
  Sn = le({
    "external/npm/node_modules/domino/lib/config.js"(_) {
      _.isApiWritable = !globalThis.__domino_frozen__;
    },
  }),
  Be = le({
    "external/npm/node_modules/domino/lib/utils.js"(_) {
      "use strict";
      var E = wn(),
        h = E,
        s = Sn().isApiWritable;
      (_.NAMESPACE = {
        HTML: "http://www.w3.org/1999/xhtml",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink",
      }),
        (_.IndexSizeError = function () {
          throw new E(h.INDEX_SIZE_ERR);
        }),
        (_.HierarchyRequestError = function () {
          throw new E(h.HIERARCHY_REQUEST_ERR);
        }),
        (_.WrongDocumentError = function () {
          throw new E(h.WRONG_DOCUMENT_ERR);
        }),
        (_.InvalidCharacterError = function () {
          throw new E(h.INVALID_CHARACTER_ERR);
        }),
        (_.NoModificationAllowedError = function () {
          throw new E(h.NO_MODIFICATION_ALLOWED_ERR);
        }),
        (_.NotFoundError = function () {
          throw new E(h.NOT_FOUND_ERR);
        }),
        (_.NotSupportedError = function () {
          throw new E(h.NOT_SUPPORTED_ERR);
        }),
        (_.InvalidStateError = function () {
          throw new E(h.INVALID_STATE_ERR);
        }),
        (_.SyntaxError = function () {
          throw new E(h.SYNTAX_ERR);
        }),
        (_.InvalidModificationError = function () {
          throw new E(h.INVALID_MODIFICATION_ERR);
        }),
        (_.NamespaceError = function () {
          throw new E(h.NAMESPACE_ERR);
        }),
        (_.InvalidAccessError = function () {
          throw new E(h.INVALID_ACCESS_ERR);
        }),
        (_.TypeMismatchError = function () {
          throw new E(h.TYPE_MISMATCH_ERR);
        }),
        (_.SecurityError = function () {
          throw new E(h.SECURITY_ERR);
        }),
        (_.NetworkError = function () {
          throw new E(h.NETWORK_ERR);
        }),
        (_.AbortError = function () {
          throw new E(h.ABORT_ERR);
        }),
        (_.UrlMismatchError = function () {
          throw new E(h.URL_MISMATCH_ERR);
        }),
        (_.QuotaExceededError = function () {
          throw new E(h.QUOTA_EXCEEDED_ERR);
        }),
        (_.TimeoutError = function () {
          throw new E(h.TIMEOUT_ERR);
        }),
        (_.InvalidNodeTypeError = function () {
          throw new E(h.INVALID_NODE_TYPE_ERR);
        }),
        (_.DataCloneError = function () {
          throw new E(h.DATA_CLONE_ERR);
        }),
        (_.nyi = function () {
          throw new Error("NotYetImplemented");
        }),
        (_.shouldOverride = function () {
          throw new Error(
            "Abstract function; should be overriding in subclass.",
          );
        }),
        (_.assert = function (t, a) {
          if (!t)
            throw new Error(
              "Assertion failed: " +
                (a || "") +
                `
` +
                new Error().stack,
            );
        }),
        (_.expose = function (t, a) {
          for (var c in t)
            Object.defineProperty(a.prototype, c, { value: t[c], writable: s });
        }),
        (_.merge = function (t, a) {
          for (var c in a) t[c] = a[c];
        }),
        (_.documentOrder = function (t, a) {
          return 3 - (t.compareDocumentPosition(a) & 6);
        }),
        (_.toASCIILowerCase = function (t) {
          return t.replace(/[A-Z]+/g, function (a) {
            return a.toLowerCase();
          });
        }),
        (_.toASCIIUpperCase = function (t) {
          return t.replace(/[a-z]+/g, function (a) {
            return a.toUpperCase();
          });
        });
    },
  }),
  Ea = le({
    "external/npm/node_modules/domino/lib/EventTarget.js"(_, E) {
      "use strict";
      var h = br(),
        s = ba(),
        t = Be();
      E.exports = a;
      function a() {}
      a.prototype = {
        addEventListener: function (l, f, i) {
          if (f) {
            i === void 0 && (i = !1),
              this._listeners || (this._listeners = Object.create(null)),
              this._listeners[l] || (this._listeners[l] = []);
            for (var b = this._listeners[l], d = 0, w = b.length; d < w; d++) {
              var R = b[d];
              if (R.listener === f && R.capture === i) return;
            }
            var q = { listener: f, capture: i };
            typeof f == "function" && (q.f = f), b.push(q);
          }
        },
        removeEventListener: function (l, f, i) {
          if ((i === void 0 && (i = !1), this._listeners)) {
            var b = this._listeners[l];
            if (b)
              for (var d = 0, w = b.length; d < w; d++) {
                var R = b[d];
                if (R.listener === f && R.capture === i) {
                  b.length === 1
                    ? (this._listeners[l] = void 0)
                    : b.splice(d, 1);
                  return;
                }
              }
          }
        },
        dispatchEvent: function (l) {
          return this._dispatchEvent(l, !1);
        },
        _dispatchEvent: function (l, f) {
          typeof f != "boolean" && (f = !1);
          function i(O, ee) {
            var U = ee.type,
              T = ee.eventPhase;
            if (
              ((ee.currentTarget = O),
              T !== h.CAPTURING_PHASE && O._handlers && O._handlers[U])
            ) {
              var p = O._handlers[U],
                S;
              if (typeof p == "function") S = p.call(ee.currentTarget, ee);
              else {
                var g = p.handleEvent;
                if (typeof g != "function")
                  throw new TypeError(
                    "handleEvent property of event handler object isnot a function.",
                  );
                S = g.call(p, ee);
              }
              switch (ee.type) {
                case "mouseover":
                  S === !0 && ee.preventDefault();
                  break;
                case "beforeunload":
                default:
                  S === !1 && ee.preventDefault();
                  break;
              }
            }
            var ae = O._listeners && O._listeners[U];
            if (ae) {
              ae = ae.slice();
              for (var ne = 0, Q = ae.length; ne < Q; ne++) {
                if (ee._immediatePropagationStopped) return;
                var G = ae[ne];
                if (
                  !(
                    (T === h.CAPTURING_PHASE && !G.capture) ||
                    (T === h.BUBBLING_PHASE && G.capture)
                  )
                )
                  if (G.f) G.f.call(ee.currentTarget, ee);
                  else {
                    var D = G.listener.handleEvent;
                    if (typeof D != "function")
                      throw new TypeError(
                        "handleEvent property of event listener object is not a function.",
                      );
                    D.call(G.listener, ee);
                  }
              }
            }
          }
          (!l._initialized || l._dispatching) && t.InvalidStateError(),
            (l.isTrusted = f),
            (l._dispatching = !0),
            (l.target = this);
          for (var b = [], d = this.parentNode; d; d = d.parentNode) b.push(d);
          l.eventPhase = h.CAPTURING_PHASE;
          for (
            var w = b.length - 1;
            w >= 0 && (i(b[w], l), !l._propagationStopped);
            w--
          );
          if (
            (l._propagationStopped ||
              ((l.eventPhase = h.AT_TARGET), i(this, l)),
            l.bubbles && !l._propagationStopped)
          ) {
            l.eventPhase = h.BUBBLING_PHASE;
            for (
              var R = 0, q = b.length;
              R < q && (i(b[R], l), !l._propagationStopped);
              R++
            );
          }
          if (
            ((l._dispatching = !1),
            (l.eventPhase = h.AT_TARGET),
            (l.currentTarget = null),
            f && !l.defaultPrevented && l instanceof s)
          )
            switch (l.type) {
              case "mousedown":
                this._armed = { x: l.clientX, y: l.clientY, t: l.timeStamp };
                break;
              case "mouseout":
              case "mouseover":
                this._armed = null;
                break;
              case "mouseup":
                this._isClick(l) && this._doClick(l), (this._armed = null);
                break;
            }
          return !l.defaultPrevented;
        },
        _isClick: function (c) {
          return (
            this._armed !== null &&
            c.type === "mouseup" &&
            c.isTrusted &&
            c.button === 0 &&
            c.timeStamp - this._armed.t < 1e3 &&
            Math.abs(c.clientX - this._armed.x) < 10 &&
            Math.abs(c.clientY - this._armed.Y) < 10
          );
        },
        _doClick: function (c) {
          if (!this._click_in_progress) {
            this._click_in_progress = !0;
            for (var l = this; l && !l._post_click_activation_steps; )
              l = l.parentNode;
            l &&
              l._pre_click_activation_steps &&
              l._pre_click_activation_steps();
            var f = this.ownerDocument.createEvent("MouseEvent");
            f.initMouseEvent(
              "click",
              !0,
              !0,
              this.ownerDocument.defaultView,
              1,
              c.screenX,
              c.screenY,
              c.clientX,
              c.clientY,
              c.ctrlKey,
              c.altKey,
              c.shiftKey,
              c.metaKey,
              c.button,
              null,
            );
            var i = this._dispatchEvent(f, !0);
            l &&
              (i
                ? l._post_click_activation_steps &&
                  l._post_click_activation_steps(f)
                : l._cancelled_activation_steps &&
                  l._cancelled_activation_steps());
          }
        },
        _setEventHandler: function (l, f) {
          this._handlers || (this._handlers = Object.create(null)),
            (this._handlers[l] = f);
        },
        _getEventHandler: function (l) {
          return (this._handlers && this._handlers[l]) || null;
        },
      };
    },
  }),
  va = le({
    "external/npm/node_modules/domino/lib/LinkedList.js"(_, E) {
      "use strict";
      var h = Be(),
        s = (E.exports = {
          valid: function (t) {
            return (
              h.assert(t, "list falsy"),
              h.assert(t._previousSibling, "previous falsy"),
              h.assert(t._nextSibling, "next falsy"),
              !0
            );
          },
          insertBefore: function (t, a) {
            h.assert(s.valid(t) && s.valid(a));
            var c = t,
              l = t._previousSibling,
              f = a,
              i = a._previousSibling;
            (c._previousSibling = i),
              (l._nextSibling = f),
              (i._nextSibling = c),
              (f._previousSibling = l),
              h.assert(s.valid(t) && s.valid(a));
          },
          replace: function (t, a) {
            h.assert(s.valid(t) && (a === null || s.valid(a))),
              a !== null && s.insertBefore(a, t),
              s.remove(t),
              h.assert(s.valid(t) && (a === null || s.valid(a)));
          },
          remove: function (t) {
            h.assert(s.valid(t));
            var a = t._previousSibling;
            if (a !== t) {
              var c = t._nextSibling;
              (a._nextSibling = c),
                (c._previousSibling = a),
                (t._previousSibling = t._nextSibling = t),
                h.assert(s.valid(t));
            }
          },
        });
    },
  }),
  Ta = le({
    "external/npm/node_modules/domino/lib/NodeUtils.js"(_, E) {
      "use strict";
      E.exports = {
        serializeOne: ee,
        ɵescapeMatchingClosingTag: w,
        ɵescapeClosingCommentTag: q,
        ɵescapeProcessingInstructionContent: O,
      };
      var h = Be(),
        s = h.NAMESPACE,
        t = {
          STYLE: !0,
          SCRIPT: !0,
          XMP: !0,
          IFRAME: !0,
          NOEMBED: !0,
          NOFRAMES: !0,
          PLAINTEXT: !0,
        },
        a = {
          area: !0,
          base: !0,
          basefont: !0,
          bgsound: !0,
          br: !0,
          col: !0,
          embed: !0,
          frame: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
        c = {},
        l = /[&<>\u00A0]/g,
        f = /[&"<>\u00A0]/g;
      function i(U) {
        return l.test(U)
          ? U.replace(l, (T) => {
              switch (T) {
                case "&":
                  return "&amp;";
                case "<":
                  return "&lt;";
                case ">":
                  return "&gt;";
                case "\xA0":
                  return "&nbsp;";
              }
            })
          : U;
      }
      function b(U) {
        return f.test(U)
          ? U.replace(f, (T) => {
              switch (T) {
                case "<":
                  return "&lt;";
                case ">":
                  return "&gt;";
                case "&":
                  return "&amp;";
                case '"':
                  return "&quot;";
                case "\xA0":
                  return "&nbsp;";
              }
            })
          : U;
      }
      function d(U) {
        var T = U.namespaceURI;
        return T
          ? T === s.XML
            ? "xml:" + U.localName
            : T === s.XLINK
              ? "xlink:" + U.localName
              : T === s.XMLNS
                ? U.localName === "xmlns"
                  ? "xmlns"
                  : "xmlns:" + U.localName
                : U.name
          : U.localName;
      }
      function w(U, T) {
        let p = "</" + T;
        if (!U.toLowerCase().includes(p)) return U;
        let S = [...U],
          g = U.matchAll(new RegExp(p, "ig"));
        for (let ae of g) S[ae.index] = "&lt;";
        return S.join("");
      }
      var R = /--!?>/;
      function q(U) {
        return R.test(U) ? U.replace(/(--\!?)>/g, "$1&gt;") : U;
      }
      function O(U) {
        return U.includes(">") ? U.replaceAll(">", "&gt;") : U;
      }
      function ee(U, T) {
        var p = "";
        switch (U.nodeType) {
          case 1:
            var S = U.namespaceURI,
              g = S === s.HTML,
              ae = g || S === s.SVG || S === s.MATHML ? U.localName : U.tagName;
            p += "<" + ae;
            for (var ne = 0, Q = U._numattrs; ne < Q; ne++) {
              var G = U._attr(ne);
              (p += " " + d(G)),
                G.value !== void 0 && (p += '="' + b(G.value) + '"');
            }
            if (((p += ">"), !(g && a[ae]))) {
              var D = U.serialize();
              t[ae.toUpperCase()] && (D = w(D, ae)),
                g &&
                  c[ae] &&
                  D.charAt(0) ===
                    `
` &&
                  (p += `
`),
                (p += D),
                (p += "</" + ae + ">");
            }
            break;
          case 3:
          case 4:
            var B;
            T.nodeType === 1 && T.namespaceURI === s.HTML
              ? (B = T.tagName)
              : (B = ""),
              t[B] || (B === "NOSCRIPT" && T.ownerDocument._scripting_enabled)
                ? (p += U.data)
                : (p += i(U.data));
            break;
          case 8:
            p += "<!--" + q(U.data) + "-->";
            break;
          case 7:
            let W = O(U.data);
            p += "<?" + U.target + " " + W + "?>";
            break;
          case 10:
            (p += "<!DOCTYPE " + U.name), (p += ">");
            break;
          default:
            h.InvalidStateError();
        }
        return p;
      }
    },
  }),
  Ve = le({
    "external/npm/node_modules/domino/lib/Node.js"(_, E) {
      "use strict";
      E.exports = c;
      var h = Ea(),
        s = va(),
        t = Ta(),
        a = Be();
      function c() {
        h.call(this),
          (this.parentNode = null),
          (this._nextSibling = this._previousSibling = this),
          (this._index = void 0);
      }
      var l = (c.ELEMENT_NODE = 1),
        f = (c.ATTRIBUTE_NODE = 2),
        i = (c.TEXT_NODE = 3),
        b = (c.CDATA_SECTION_NODE = 4),
        d = (c.ENTITY_REFERENCE_NODE = 5),
        w = (c.ENTITY_NODE = 6),
        R = (c.PROCESSING_INSTRUCTION_NODE = 7),
        q = (c.COMMENT_NODE = 8),
        O = (c.DOCUMENT_NODE = 9),
        ee = (c.DOCUMENT_TYPE_NODE = 10),
        U = (c.DOCUMENT_FRAGMENT_NODE = 11),
        T = (c.NOTATION_NODE = 12),
        p = (c.DOCUMENT_POSITION_DISCONNECTED = 1),
        S = (c.DOCUMENT_POSITION_PRECEDING = 2),
        g = (c.DOCUMENT_POSITION_FOLLOWING = 4),
        ae = (c.DOCUMENT_POSITION_CONTAINS = 8),
        ne = (c.DOCUMENT_POSITION_CONTAINED_BY = 16),
        Q = (c.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32);
      c.prototype = Object.create(h.prototype, {
        baseURI: { get: a.nyi },
        parentElement: {
          get: function () {
            return this.parentNode && this.parentNode.nodeType === l
              ? this.parentNode
              : null;
          },
        },
        hasChildNodes: { value: a.shouldOverride },
        firstChild: { get: a.shouldOverride },
        lastChild: { get: a.shouldOverride },
        isConnected: {
          get: function () {
            let G = this;
            for (; G != null; ) {
              if (G.nodeType === c.DOCUMENT_NODE) return !0;
              (G = G.parentNode),
                G != null &&
                  G.nodeType === c.DOCUMENT_FRAGMENT_NODE &&
                  (G = G.host);
            }
            return !1;
          },
        },
        previousSibling: {
          get: function () {
            var G = this.parentNode;
            return !G || this === G.firstChild ? null : this._previousSibling;
          },
        },
        nextSibling: {
          get: function () {
            var G = this.parentNode,
              D = this._nextSibling;
            return !G || D === G.firstChild ? null : D;
          },
        },
        textContent: {
          get: function () {
            return null;
          },
          set: function (G) {},
        },
        innerText: {
          get: function () {
            return null;
          },
          set: function (G) {},
        },
        _countChildrenOfType: {
          value: function (G) {
            for (var D = 0, B = this.firstChild; B !== null; B = B.nextSibling)
              B.nodeType === G && D++;
            return D;
          },
        },
        _ensureInsertValid: {
          value: function (D, B, W) {
            var u = this,
              o,
              n;
            if (!D.nodeType) throw new TypeError("not a node");
            switch (u.nodeType) {
              case O:
              case U:
              case l:
                break;
              default:
                a.HierarchyRequestError();
            }
            switch (
              (D.isAncestor(u) && a.HierarchyRequestError(),
              (B !== null || !W) && B.parentNode !== u && a.NotFoundError(),
              D.nodeType)
            ) {
              case U:
              case ee:
              case l:
              case i:
              case R:
              case q:
                break;
              default:
                a.HierarchyRequestError();
            }
            if (u.nodeType === O)
              switch (D.nodeType) {
                case i:
                  a.HierarchyRequestError();
                  break;
                case U:
                  switch (
                    (D._countChildrenOfType(i) > 0 && a.HierarchyRequestError(),
                    D._countChildrenOfType(l))
                  ) {
                    case 0:
                      break;
                    case 1:
                      if (B !== null)
                        for (
                          W && B.nodeType === ee && a.HierarchyRequestError(),
                            n = B.nextSibling;
                          n !== null;
                          n = n.nextSibling
                        )
                          n.nodeType === ee && a.HierarchyRequestError();
                      (o = u._countChildrenOfType(l)),
                        W
                          ? o > 0 && a.HierarchyRequestError()
                          : (o > 1 || (o === 1 && B.nodeType !== l)) &&
                            a.HierarchyRequestError();
                      break;
                    default:
                      a.HierarchyRequestError();
                  }
                  break;
                case l:
                  if (B !== null)
                    for (
                      W && B.nodeType === ee && a.HierarchyRequestError(),
                        n = B.nextSibling;
                      n !== null;
                      n = n.nextSibling
                    )
                      n.nodeType === ee && a.HierarchyRequestError();
                  (o = u._countChildrenOfType(l)),
                    W
                      ? o > 0 && a.HierarchyRequestError()
                      : (o > 1 || (o === 1 && B.nodeType !== l)) &&
                        a.HierarchyRequestError();
                  break;
                case ee:
                  if (B === null)
                    u._countChildrenOfType(l) && a.HierarchyRequestError();
                  else
                    for (
                      n = u.firstChild;
                      n !== null && n !== B;
                      n = n.nextSibling
                    )
                      n.nodeType === l && a.HierarchyRequestError();
                  (o = u._countChildrenOfType(ee)),
                    W
                      ? o > 0 && a.HierarchyRequestError()
                      : (o > 1 || (o === 1 && B.nodeType !== ee)) &&
                        a.HierarchyRequestError();
                  break;
              }
            else D.nodeType === ee && a.HierarchyRequestError();
          },
        },
        insertBefore: {
          value: function (D, B) {
            var W = this;
            W._ensureInsertValid(D, B, !0);
            var u = B;
            return (
              u === D && (u = D.nextSibling),
              W.doc.adoptNode(D),
              D._insertOrReplace(W, u, !1),
              D
            );
          },
        },
        appendChild: {
          value: function (G) {
            return this.insertBefore(G, null);
          },
        },
        _appendChild: {
          value: function (G) {
            G._insertOrReplace(this, null, !1);
          },
        },
        removeChild: {
          value: function (D) {
            var B = this;
            if (!D.nodeType) throw new TypeError("not a node");
            return D.parentNode !== B && a.NotFoundError(), D.remove(), D;
          },
        },
        replaceChild: {
          value: function (D, B) {
            var W = this;
            return (
              W._ensureInsertValid(D, B, !1),
              D.doc !== W.doc && W.doc.adoptNode(D),
              D._insertOrReplace(W, B, !0),
              B
            );
          },
        },
        contains: {
          value: function (D) {
            return D === null
              ? !1
              : this === D
                ? !0
                : (this.compareDocumentPosition(D) & ne) !== 0;
          },
        },
        compareDocumentPosition: {
          value: function (D) {
            if (this === D) return 0;
            if (this.doc !== D.doc || this.rooted !== D.rooted) return p + Q;
            for (var B = [], W = [], u = this; u !== null; u = u.parentNode)
              B.push(u);
            for (u = D; u !== null; u = u.parentNode) W.push(u);
            if ((B.reverse(), W.reverse(), B[0] !== W[0])) return p + Q;
            u = Math.min(B.length, W.length);
            for (var o = 1; o < u; o++)
              if (B[o] !== W[o]) return B[o].index < W[o].index ? g : S;
            return B.length < W.length ? g + ne : S + ae;
          },
        },
        isSameNode: {
          value: function (D) {
            return this === D;
          },
        },
        isEqualNode: {
          value: function (D) {
            if (!D || D.nodeType !== this.nodeType || !this.isEqual(D))
              return !1;
            for (
              var B = this.firstChild, W = D.firstChild;
              B && W;
              B = B.nextSibling, W = W.nextSibling
            )
              if (!B.isEqualNode(W)) return !1;
            return B === null && W === null;
          },
        },
        cloneNode: {
          value: function (G) {
            var D = this.clone();
            if (G)
              for (var B = this.firstChild; B !== null; B = B.nextSibling)
                D._appendChild(B.cloneNode(!0));
            return D;
          },
        },
        lookupPrefix: {
          value: function (D) {
            var B;
            if (D === "" || D === null || D === void 0) return null;
            switch (this.nodeType) {
              case l:
                return this._lookupNamespacePrefix(D, this);
              case O:
                return (B = this.documentElement), B ? B.lookupPrefix(D) : null;
              case w:
              case T:
              case U:
              case ee:
                return null;
              case f:
                return (B = this.ownerElement), B ? B.lookupPrefix(D) : null;
              default:
                return (B = this.parentElement), B ? B.lookupPrefix(D) : null;
            }
          },
        },
        lookupNamespaceURI: {
          value: function (D) {
            (D === "" || D === void 0) && (D = null);
            var B;
            switch (this.nodeType) {
              case l:
                return a.shouldOverride();
              case O:
                return (
                  (B = this.documentElement), B ? B.lookupNamespaceURI(D) : null
                );
              case w:
              case T:
              case ee:
              case U:
                return null;
              case f:
                return (
                  (B = this.ownerElement), B ? B.lookupNamespaceURI(D) : null
                );
              default:
                return (
                  (B = this.parentElement), B ? B.lookupNamespaceURI(D) : null
                );
            }
          },
        },
        isDefaultNamespace: {
          value: function (D) {
            (D === "" || D === void 0) && (D = null);
            var B = this.lookupNamespaceURI(null);
            return B === D;
          },
        },
        index: {
          get: function () {
            var G = this.parentNode;
            if (this === G.firstChild) return 0;
            var D = G.childNodes;
            if (this._index === void 0 || D[this._index] !== this) {
              for (var B = 0; B < D.length; B++) D[B]._index = B;
              a.assert(D[this._index] === this);
            }
            return this._index;
          },
        },
        isAncestor: {
          value: function (G) {
            if (this.doc !== G.doc || this.rooted !== G.rooted) return !1;
            for (var D = G; D; D = D.parentNode) if (D === this) return !0;
            return !1;
          },
        },
        ensureSameDoc: {
          value: function (G) {
            G.ownerDocument === null
              ? (G.ownerDocument = this.doc)
              : G.ownerDocument !== this.doc && a.WrongDocumentError();
          },
        },
        removeChildren: { value: a.shouldOverride },
        _insertOrReplace: {
          value: function (D, B, W) {
            var u = this,
              o,
              n;
            if (
              (u.nodeType === U && u.rooted && a.HierarchyRequestError(),
              D._childNodes &&
                ((o = B === null ? D._childNodes.length : B.index),
                u.parentNode === D))
            ) {
              var m = u.index;
              m < o && o--;
            }
            W && (B.rooted && B.doc.mutateRemove(B), (B.parentNode = null));
            var L = B;
            L === null && (L = D.firstChild);
            var v = u.rooted && D.rooted;
            if (u.nodeType === U) {
              for (
                var C = [0, W ? 1 : 0], M, z = u.firstChild;
                z !== null;
                z = M
              )
                (M = z.nextSibling), C.push(z), (z.parentNode = D);
              var y = C.length;
              if (
                (W
                  ? s.replace(L, y > 2 ? C[2] : null)
                  : y > 2 && L !== null && s.insertBefore(C[2], L),
                D._childNodes)
              )
                for (
                  C[0] = B === null ? D._childNodes.length : B._index,
                    D._childNodes.splice.apply(D._childNodes, C),
                    n = 2;
                  n < y;
                  n++
                )
                  C[n]._index = C[0] + (n - 2);
              else
                D._firstChild === B &&
                  (y > 2
                    ? (D._firstChild = C[2])
                    : W && (D._firstChild = null));
              if (
                (u._childNodes
                  ? (u._childNodes.length = 0)
                  : (u._firstChild = null),
                D.rooted)
              )
                for (D.modify(), n = 2; n < y; n++) D.doc.mutateInsert(C[n]);
            } else {
              if (B === u) return;
              v ? u._remove() : u.parentNode && u.remove(),
                (u.parentNode = D),
                W
                  ? (s.replace(L, u),
                    D._childNodes
                      ? ((u._index = o), (D._childNodes[o] = u))
                      : D._firstChild === B && (D._firstChild = u))
                  : (L !== null && s.insertBefore(u, L),
                    D._childNodes
                      ? ((u._index = o), D._childNodes.splice(o, 0, u))
                      : D._firstChild === B && (D._firstChild = u)),
                v
                  ? (D.modify(), D.doc.mutateMove(u))
                  : D.rooted && (D.modify(), D.doc.mutateInsert(u));
            }
          },
        },
        lastModTime: {
          get: function () {
            return (
              this._lastModTime || (this._lastModTime = this.doc.modclock),
              this._lastModTime
            );
          },
        },
        modify: {
          value: function () {
            if (this.doc.modclock)
              for (
                var G = ++this.doc.modclock, D = this;
                D;
                D = D.parentElement
              )
                D._lastModTime && (D._lastModTime = G);
          },
        },
        doc: {
          get: function () {
            return this.ownerDocument || this;
          },
        },
        rooted: {
          get: function () {
            return !!this._nid;
          },
        },
        normalize: {
          value: function () {
            for (var G, D = this.firstChild; D !== null; D = G)
              if (
                ((G = D.nextSibling),
                D.normalize && D.normalize(),
                D.nodeType === c.TEXT_NODE)
              ) {
                if (D.nodeValue === "") {
                  this.removeChild(D);
                  continue;
                }
                var B = D.previousSibling;
                B !== null &&
                  B.nodeType === c.TEXT_NODE &&
                  (B.appendData(D.nodeValue), this.removeChild(D));
              }
          },
        },
        serialize: {
          value: function () {
            if (this._innerHTML) return this._innerHTML;
            for (var G = "", D = this.firstChild; D !== null; D = D.nextSibling)
              G += t.serializeOne(D, this);
            return G;
          },
        },
        outerHTML: {
          get: function () {
            return t.serializeOne(this, { nodeType: 0 });
          },
          set: a.nyi,
        },
        ELEMENT_NODE: { value: l },
        ATTRIBUTE_NODE: { value: f },
        TEXT_NODE: { value: i },
        CDATA_SECTION_NODE: { value: b },
        ENTITY_REFERENCE_NODE: { value: d },
        ENTITY_NODE: { value: w },
        PROCESSING_INSTRUCTION_NODE: { value: R },
        COMMENT_NODE: { value: q },
        DOCUMENT_NODE: { value: O },
        DOCUMENT_TYPE_NODE: { value: ee },
        DOCUMENT_FRAGMENT_NODE: { value: U },
        NOTATION_NODE: { value: T },
        DOCUMENT_POSITION_DISCONNECTED: { value: p },
        DOCUMENT_POSITION_PRECEDING: { value: S },
        DOCUMENT_POSITION_FOLLOWING: { value: g },
        DOCUMENT_POSITION_CONTAINS: { value: ae },
        DOCUMENT_POSITION_CONTAINED_BY: { value: ne },
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: Q },
      });
    },
  }),
  bs = le({
    "external/npm/node_modules/domino/lib/NodeList.es6.js"(_, E) {
      "use strict";
      E.exports = class extends Array {
        constructor(s) {
          if ((super((s && s.length) || 0), s)) for (var t in s) this[t] = s[t];
        }
        item(s) {
          return this[s] || null;
        }
      };
    },
  }),
  Es = le({
    "external/npm/node_modules/domino/lib/NodeList.es5.js"(_, E) {
      "use strict";
      function h(t) {
        return this[t] || null;
      }
      function s(t) {
        return t || (t = []), (t.item = h), t;
      }
      E.exports = s;
    },
  }),
  ar = le({
    "external/npm/node_modules/domino/lib/NodeList.js"(_, E) {
      "use strict";
      var h;
      try {
        h = bs();
      } catch {
        h = Es();
      }
      E.exports = h;
    },
  }),
  kn = le({
    "external/npm/node_modules/domino/lib/ContainerNode.js"(_, E) {
      "use strict";
      E.exports = t;
      var h = Ve(),
        s = ar();
      function t() {
        h.call(this), (this._firstChild = this._childNodes = null);
      }
      t.prototype = Object.create(h.prototype, {
        hasChildNodes: {
          value: function () {
            return this._childNodes
              ? this._childNodes.length > 0
              : this._firstChild !== null;
          },
        },
        childNodes: {
          get: function () {
            return this._ensureChildNodes(), this._childNodes;
          },
        },
        firstChild: {
          get: function () {
            return this._childNodes
              ? this._childNodes.length === 0
                ? null
                : this._childNodes[0]
              : this._firstChild;
          },
        },
        lastChild: {
          get: function () {
            var a = this._childNodes,
              c;
            return a
              ? a.length === 0
                ? null
                : a[a.length - 1]
              : ((c = this._firstChild),
                c === null ? null : c._previousSibling);
          },
        },
        _ensureChildNodes: {
          value: function () {
            if (!this._childNodes) {
              var a = this._firstChild,
                c = a,
                l = (this._childNodes = new s());
              if (a)
                do l.push(c), (c = c._nextSibling);
                while (c !== a);
              this._firstChild = null;
            }
          },
        },
        removeChildren: {
          value: function () {
            for (
              var c = this.rooted ? this.ownerDocument : null,
                l = this.firstChild,
                f;
              l !== null;

            )
              (f = l),
                (l = f.nextSibling),
                c && c.mutateRemove(f),
                (f.parentNode = null);
            this._childNodes
              ? (this._childNodes.length = 0)
              : (this._firstChild = null),
              this.modify();
          },
        },
      });
    },
  }),
  Ln = le({
    "external/npm/node_modules/domino/lib/xmlnames.js"(_) {
      "use strict";
      (_.isValidName = O), (_.isValidQName = ee);
      var E = /^[_:A-Za-z][-.:\w]+$/,
        h = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
        s =
          "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        t =
          "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        a = "[" + s + "][" + t + "]*",
        c = s + ":",
        l = t + ":",
        f = new RegExp("^[" + c + "][" + l + "]*$"),
        i = new RegExp("^(" + a + "|" + a + ":" + a + ")$"),
        b = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
        d = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
        w = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
      (s += "\uD800-\u{EFC00}-\uDFFF"),
        (t += "\uD800-\u{EFC00}-\uDFFF"),
        (a = "[" + s + "][" + t + "]*"),
        (c = s + ":"),
        (l = t + ":");
      var R = new RegExp("^[" + c + "][" + l + "]*$"),
        q = new RegExp("^(" + a + "|" + a + ":" + a + ")$");
      function O(U) {
        if (E.test(U) || f.test(U)) return !0;
        if (!b.test(U) || !R.test(U)) return !1;
        var T = U.match(d),
          p = U.match(w);
        return p !== null && 2 * p.length === T.length;
      }
      function ee(U) {
        if (h.test(U) || i.test(U)) return !0;
        if (!b.test(U) || !q.test(U)) return !1;
        var T = U.match(d),
          p = U.match(w);
        return p !== null && 2 * p.length === T.length;
      }
    },
  }),
  ya = le({
    "external/npm/node_modules/domino/lib/attributes.js"(_) {
      "use strict";
      var E = Be();
      _.property = function (s) {
        if (Array.isArray(s.type)) {
          var t = Object.create(null);
          s.type.forEach(function (l) {
            t[l.value || l] = l.alias || l;
          });
          var a = s.missing;
          a === void 0 && (a = null);
          var c = s.invalid;
          return (
            c === void 0 && (c = a),
            {
              get: function () {
                var l = this._getattr(s.name);
                return l === null
                  ? a
                  : ((l = t[l.toLowerCase()]),
                    l !== void 0 ? l : c !== null ? c : l);
              },
              set: function (l) {
                this._setattr(s.name, l);
              },
            }
          );
        } else {
          if (s.type === Boolean)
            return {
              get: function () {
                return this.hasAttribute(s.name);
              },
              set: function (l) {
                l ? this._setattr(s.name, "") : this.removeAttribute(s.name);
              },
            };
          if (
            s.type === Number ||
            s.type === "long" ||
            s.type === "unsigned long" ||
            s.type === "limited unsigned long with fallback"
          )
            return h(s);
          if (!s.type || s.type === String)
            return {
              get: function () {
                return this._getattr(s.name) || "";
              },
              set: function (l) {
                s.treatNullAsEmptyString && l === null && (l = ""),
                  this._setattr(s.name, l);
              },
            };
          if (typeof s.type == "function") return s.type(s.name, s);
        }
        throw new Error("Invalid attribute definition");
      };
      function h(s) {
        var t;
        typeof s.default == "function"
          ? (t = s.default)
          : typeof s.default == "number"
            ? (t = function () {
                return s.default;
              })
            : (t = function () {
                E.assert(!1, typeof s.default);
              });
        var a = s.type === "unsigned long",
          c = s.type === "long",
          l = s.type === "limited unsigned long with fallback",
          f = s.min,
          i = s.max,
          b = s.setmin;
        return (
          f === void 0 && (a && (f = 0), c && (f = -2147483648), l && (f = 1)),
          i === void 0 && (a || c || l) && (i = 2147483647),
          {
            get: function () {
              var d = this._getattr(s.name),
                w = s.float ? parseFloat(d) : parseInt(d, 10);
              if (
                d === null ||
                !isFinite(w) ||
                (f !== void 0 && w < f) ||
                (i !== void 0 && w > i)
              )
                return t.call(this);
              if (a || c || l) {
                if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(d)) return t.call(this);
                w = w | 0;
              }
              return w;
            },
            set: function (d) {
              s.float || (d = Math.floor(d)),
                b !== void 0 &&
                  d < b &&
                  E.IndexSizeError(s.name + " set to " + d),
                a
                  ? (d = d < 0 || d > 2147483647 ? t.call(this) : d | 0)
                  : l
                    ? (d = d < 1 || d > 2147483647 ? t.call(this) : d | 0)
                    : c &&
                      (d =
                        d < -2147483648 || d > 2147483647
                          ? t.call(this)
                          : d | 0),
                this._setattr(s.name, String(d));
            },
          }
        );
      }
      _.registerChangeHandler = function (s, t, a) {
        var c = s.prototype;
        Object.prototype.hasOwnProperty.call(c, "_attributeChangeHandlers") ||
          (c._attributeChangeHandlers = Object.create(
            c._attributeChangeHandlers || null,
          )),
          (c._attributeChangeHandlers[t] = a);
      };
    },
  }),
  vs = le({
    "external/npm/node_modules/domino/lib/FilteredElementList.js"(_, E) {
      "use strict";
      E.exports = s;
      var h = Ve();
      function s(t, a) {
        (this.root = t),
          (this.filter = a),
          (this.lastModTime = t.lastModTime),
          (this.done = !1),
          (this.cache = []),
          this.traverse();
      }
      s.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return (
              this.checkcache(), this.done || this.traverse(), this.cache.length
            );
          },
        },
        item: {
          value: function (t) {
            return (
              this.checkcache(),
              !this.done && t >= this.cache.length && this.traverse(),
              this.cache[t]
            );
          },
        },
        checkcache: {
          value: function () {
            if (this.lastModTime !== this.root.lastModTime) {
              for (var t = this.cache.length - 1; t >= 0; t--) this[t] = void 0;
              (this.cache.length = 0),
                (this.done = !1),
                (this.lastModTime = this.root.lastModTime);
            }
          },
        },
        traverse: {
          value: function (t) {
            t !== void 0 && t++;
            for (var a; (a = this.next()) !== null; )
              if (
                ((this[this.cache.length] = a),
                this.cache.push(a),
                t && this.cache.length === t)
              )
                return;
            this.done = !0;
          },
        },
        next: {
          value: function () {
            var t =
                this.cache.length === 0
                  ? this.root
                  : this.cache[this.cache.length - 1],
              a;
            for (
              t.nodeType === h.DOCUMENT_NODE
                ? (a = t.documentElement)
                : (a = t.nextElement(this.root));
              a;

            ) {
              if (this.filter(a)) return a;
              a = a.nextElement(this.root);
            }
            return null;
          },
        },
      });
    },
  }),
  Na = le({
    "external/npm/node_modules/domino/lib/DOMTokenList.js"(_, E) {
      "use strict";
      var h = Be();
      E.exports = s;
      function s(f, i) {
        (this._getString = f),
          (this._setString = i),
          (this._length = 0),
          (this._lastStringValue = ""),
          this._update();
      }
      Object.defineProperties(s.prototype, {
        length: {
          get: function () {
            return this._length;
          },
        },
        item: {
          value: function (f) {
            var i = l(this);
            return f < 0 || f >= i.length ? null : i[f];
          },
        },
        contains: {
          value: function (f) {
            f = String(f);
            var i = l(this);
            return i.indexOf(f) > -1;
          },
        },
        add: {
          value: function () {
            for (var f = l(this), i = 0, b = arguments.length; i < b; i++) {
              var d = a(arguments[i]);
              f.indexOf(d) < 0 && f.push(d);
            }
            this._update(f);
          },
        },
        remove: {
          value: function () {
            for (var f = l(this), i = 0, b = arguments.length; i < b; i++) {
              var d = a(arguments[i]),
                w = f.indexOf(d);
              w > -1 && f.splice(w, 1);
            }
            this._update(f);
          },
        },
        toggle: {
          value: function (i, b) {
            return (
              (i = a(i)),
              this.contains(i)
                ? b === void 0 || b === !1
                  ? (this.remove(i), !1)
                  : !0
                : b === void 0 || b === !0
                  ? (this.add(i), !0)
                  : !1
            );
          },
        },
        replace: {
          value: function (i, b) {
            String(b) === "" && h.SyntaxError(), (i = a(i)), (b = a(b));
            var d = l(this),
              w = d.indexOf(i);
            if (w < 0) return !1;
            var R = d.indexOf(b);
            return (
              R < 0
                ? (d[w] = b)
                : w < R
                  ? ((d[w] = b), d.splice(R, 1))
                  : d.splice(w, 1),
              this._update(d),
              !0
            );
          },
        },
        toString: {
          value: function () {
            return this._getString();
          },
        },
        value: {
          get: function () {
            return this._getString();
          },
          set: function (f) {
            this._setString(f), this._update();
          },
        },
        _update: {
          value: function (f) {
            f
              ? (t(this, f), this._setString(f.join(" ").trim()))
              : t(this, l(this)),
              (this._lastStringValue = this._getString());
          },
        },
      });
      function t(f, i) {
        var b = f._length,
          d;
        for (f._length = i.length, d = 0; d < i.length; d++) f[d] = i[d];
        for (; d < b; d++) f[d] = void 0;
      }
      function a(f) {
        return (
          (f = String(f)),
          f === "" && h.SyntaxError(),
          /[ \t\r\n\f]/.test(f) && h.InvalidCharacterError(),
          f
        );
      }
      function c(f) {
        for (var i = f._length, b = Array(i), d = 0; d < i; d++) b[d] = f[d];
        return b;
      }
      function l(f) {
        var i = f._getString();
        if (i === f._lastStringValue) return c(f);
        var b = i.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
        if (b === "") return [];
        var d = Object.create(null);
        return b.split(/[ \t\r\n\f]+/g).filter(function (w) {
          var R = "$" + w;
          return d[R] ? !1 : ((d[R] = !0), !0);
        });
      }
    },
  }),
  Cn = le({
    "external/npm/node_modules/domino/lib/select.js"(_, E) {
      "use strict";
      var h = Object.create(null, {
          location: {
            get: function () {
              throw new Error("window.location is not supported.");
            },
          },
        }),
        s = function (u, o) {
          return u.compareDocumentPosition(o);
        },
        t = function (u, o) {
          return s(u, o) & 2 ? 1 : -1;
        },
        a = function (u) {
          for (; (u = u.nextSibling) && u.nodeType !== 1; );
          return u;
        },
        c = function (u) {
          for (; (u = u.previousSibling) && u.nodeType !== 1; );
          return u;
        },
        l = function (u) {
          if ((u = u.firstChild))
            for (; u.nodeType !== 1 && (u = u.nextSibling); );
          return u;
        },
        f = function (u) {
          if ((u = u.lastChild))
            for (; u.nodeType !== 1 && (u = u.previousSibling); );
          return u;
        },
        i = function (u) {
          if (!u.parentNode) return !1;
          var o = u.parentNode.nodeType;
          return o === 1 || o === 9;
        },
        b = function (u) {
          if (!u) return u;
          var o = u[0];
          return o === '"' || o === "'"
            ? (u[u.length - 1] === o ? (u = u.slice(1, -1)) : (u = u.slice(1)),
              u.replace(g.str_escape, function (n) {
                var m = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(n);
                if (!m) return n.slice(1);
                if (m[2]) return "";
                var L = parseInt(m[1], 16);
                return String.fromCodePoint
                  ? String.fromCodePoint(L)
                  : String.fromCharCode(L);
              }))
            : g.ident.test(u)
              ? d(u)
              : u;
        },
        d = function (u) {
          return u.replace(g.escape, function (o) {
            var n = /^\\([0-9A-Fa-f]+)/.exec(o);
            if (!n) return o[1];
            var m = parseInt(n[1], 16);
            return String.fromCodePoint
              ? String.fromCodePoint(m)
              : String.fromCharCode(m);
          });
        },
        w = (function () {
          return Array.prototype.indexOf
            ? Array.prototype.indexOf
            : function (u, o) {
                for (var n = this.length; n--; ) if (this[n] === o) return n;
                return -1;
              };
        })(),
        R = function (u, o) {
          var n = g.inside.source.replace(/</g, u).replace(/>/g, o);
          return new RegExp(n);
        },
        q = function (u, o, n) {
          return (
            (u = u.source), (u = u.replace(o, n.source || n)), new RegExp(u)
          );
        },
        O = function (u, o) {
          return u
            .replace(/^(?:\w+:\/\/|\/+)/, "")
            .replace(/(?:\/+|\/*#.*?)$/, "")
            .split("/", o)
            .join("/");
        },
        ee = function (u, o) {
          var n = u.replace(/\s+/g, ""),
            m;
          return (
            n === "even"
              ? (n = "2n+0")
              : n === "odd"
                ? (n = "2n+1")
                : n.indexOf("n") === -1 && (n = "0n" + n),
            (m = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(n)),
            {
              group: m[1] === "-" ? -(m[2] || 1) : +(m[2] || 1),
              offset: m[4] ? (m[3] === "-" ? -m[4] : +m[4]) : 0,
            }
          );
        },
        U = function (u, o, n) {
          var m = ee(u),
            L = m.group,
            v = m.offset,
            C = n ? f : l,
            M = n ? c : a;
          return function (z) {
            if (i(z))
              for (var y = C(z.parentNode), A = 0; y; ) {
                if ((o(y, z) && A++, y === z))
                  return (A -= v), L && A ? A % L === 0 && A < 0 == L < 0 : !A;
                y = M(y);
              }
          };
        },
        T = {
          "*": (function () {
            return function () {
              return !0;
            };
          })(),
          type: function (u) {
            return (
              (u = u.toLowerCase()),
              function (o) {
                return o.nodeName.toLowerCase() === u;
              }
            );
          },
          attr: function (u, o, n, m) {
            return (
              (o = p[o]),
              function (L) {
                var v;
                switch (u) {
                  case "for":
                    v = L.htmlFor;
                    break;
                  case "class":
                    (v = L.className),
                      v === "" && L.getAttribute("class") == null && (v = null);
                    break;
                  case "href":
                  case "src":
                    v = L.getAttribute(u, 2);
                    break;
                  case "title":
                    v = L.getAttribute("title") || null;
                    break;
                  case "id":
                  case "lang":
                  case "dir":
                  case "accessKey":
                  case "hidden":
                  case "tabIndex":
                  case "style":
                    if (L.getAttribute) {
                      v = L.getAttribute(u);
                      break;
                    }
                  default:
                    if (L.hasAttribute && !L.hasAttribute(u)) break;
                    v =
                      L[u] != null ? L[u] : L.getAttribute && L.getAttribute(u);
                    break;
                }
                if (v != null)
                  return (
                    (v = v + ""),
                    m && ((v = v.toLowerCase()), (n = n.toLowerCase())),
                    o(v, n)
                  );
              }
            );
          },
          ":first-child": function (u) {
            return !c(u) && i(u);
          },
          ":last-child": function (u) {
            return !a(u) && i(u);
          },
          ":only-child": function (u) {
            return !c(u) && !a(u) && i(u);
          },
          ":nth-child": function (u, o) {
            return U(
              u,
              function () {
                return !0;
              },
              o,
            );
          },
          ":nth-last-child": function (u) {
            return T[":nth-child"](u, !0);
          },
          ":root": function (u) {
            return u.ownerDocument.documentElement === u;
          },
          ":empty": function (u) {
            return !u.firstChild;
          },
          ":not": function (u) {
            var o = B(u);
            return function (n) {
              return !o(n);
            };
          },
          ":first-of-type": function (u) {
            if (i(u)) {
              for (var o = u.nodeName; (u = c(u)); )
                if (u.nodeName === o) return;
              return !0;
            }
          },
          ":last-of-type": function (u) {
            if (i(u)) {
              for (var o = u.nodeName; (u = a(u)); )
                if (u.nodeName === o) return;
              return !0;
            }
          },
          ":only-of-type": function (u) {
            return T[":first-of-type"](u) && T[":last-of-type"](u);
          },
          ":nth-of-type": function (u, o) {
            return U(
              u,
              function (n, m) {
                return n.nodeName === m.nodeName;
              },
              o,
            );
          },
          ":nth-last-of-type": function (u) {
            return T[":nth-of-type"](u, !0);
          },
          ":checked": function (u) {
            return !!(u.checked || u.selected);
          },
          ":indeterminate": function (u) {
            return !T[":checked"](u);
          },
          ":enabled": function (u) {
            return !u.disabled && u.type !== "hidden";
          },
          ":disabled": function (u) {
            return !!u.disabled;
          },
          ":target": function (u) {
            return u.id === h.location.hash.substring(1);
          },
          ":focus": function (u) {
            return u === u.ownerDocument.activeElement;
          },
          ":is": function (u) {
            return B(u);
          },
          ":matches": function (u) {
            return T[":is"](u);
          },
          ":nth-match": function (u, o) {
            var n = u.split(/\s*,\s*/),
              m = n.shift(),
              L = B(n.join(","));
            return U(m, L, o);
          },
          ":nth-last-match": function (u) {
            return T[":nth-match"](u, !0);
          },
          ":links-here": function (u) {
            return u + "" == h.location + "";
          },
          ":lang": function (u) {
            return function (o) {
              for (; o; ) {
                if (o.lang) return o.lang.indexOf(u) === 0;
                o = o.parentNode;
              }
            };
          },
          ":dir": function (u) {
            return function (o) {
              for (; o; ) {
                if (o.dir) return o.dir === u;
                o = o.parentNode;
              }
            };
          },
          ":scope": function (u, o) {
            var n = o || u.ownerDocument;
            return n.nodeType === 9 ? u === n.documentElement : u === n;
          },
          ":any-link": function (u) {
            return typeof u.href == "string";
          },
          ":local-link": function (u) {
            if (u.nodeName) return u.href && u.host === h.location.host;
            var o = +u + 1;
            return function (n) {
              if (n.href) {
                var m = h.location + "",
                  L = n + "";
                return O(m, o) === O(L, o);
              }
            };
          },
          ":default": function (u) {
            return !!u.defaultSelected;
          },
          ":valid": function (u) {
            return u.willValidate || (u.validity && u.validity.valid);
          },
          ":invalid": function (u) {
            return !T[":valid"](u);
          },
          ":in-range": function (u) {
            return u.value > u.min && u.value <= u.max;
          },
          ":out-of-range": function (u) {
            return !T[":in-range"](u);
          },
          ":required": function (u) {
            return !!u.required;
          },
          ":optional": function (u) {
            return !u.required;
          },
          ":read-only": function (u) {
            if (u.readOnly) return !0;
            var o = u.getAttribute("contenteditable"),
              n = u.contentEditable,
              m = u.nodeName.toLowerCase();
            return (
              (m = m !== "input" && m !== "textarea"),
              (m || u.disabled) && o == null && n !== "true"
            );
          },
          ":read-write": function (u) {
            return !T[":read-only"](u);
          },
          ":hover": function () {
            throw new Error(":hover is not supported.");
          },
          ":active": function () {
            throw new Error(":active is not supported.");
          },
          ":link": function () {
            throw new Error(":link is not supported.");
          },
          ":visited": function () {
            throw new Error(":visited is not supported.");
          },
          ":column": function () {
            throw new Error(":column is not supported.");
          },
          ":nth-column": function () {
            throw new Error(":nth-column is not supported.");
          },
          ":nth-last-column": function () {
            throw new Error(":nth-last-column is not supported.");
          },
          ":current": function () {
            throw new Error(":current is not supported.");
          },
          ":past": function () {
            throw new Error(":past is not supported.");
          },
          ":future": function () {
            throw new Error(":future is not supported.");
          },
          ":contains": function (u) {
            return function (o) {
              var n = o.innerText || o.textContent || o.value || "";
              return n.indexOf(u) !== -1;
            };
          },
          ":has": function (u) {
            return function (o) {
              return W(u, o).length > 0;
            };
          },
        },
        p = {
          "-": function () {
            return !0;
          },
          "=": function (u, o) {
            return u === o;
          },
          "*=": function (u, o) {
            return u.indexOf(o) !== -1;
          },
          "~=": function (u, o) {
            var n, m, L, v;
            for (m = 0; ; m = n + 1) {
              if (((n = u.indexOf(o, m)), n === -1)) return !1;
              if (
                ((L = u[n - 1]),
                (v = u[n + o.length]),
                (!L || L === " ") && (!v || v === " "))
              )
                return !0;
            }
          },
          "|=": function (u, o) {
            var n = u.indexOf(o),
              m;
            if (n === 0) return (m = u[n + o.length]), m === "-" || !m;
          },
          "^=": function (u, o) {
            return u.indexOf(o) === 0;
          },
          "$=": function (u, o) {
            var n = u.lastIndexOf(o);
            return n !== -1 && n + o.length === u.length;
          },
          "!=": function (u, o) {
            return u !== o;
          },
        },
        S = {
          " ": function (u) {
            return function (o) {
              for (; (o = o.parentNode); ) if (u(o)) return o;
            };
          },
          ">": function (u) {
            return function (o) {
              if ((o = o.parentNode)) return u(o) && o;
            };
          },
          "+": function (u) {
            return function (o) {
              if ((o = c(o))) return u(o) && o;
            };
          },
          "~": function (u) {
            return function (o) {
              for (; (o = c(o)); ) if (u(o)) return o;
            };
          },
          noop: function (u) {
            return function (o) {
              return u(o) && o;
            };
          },
          ref: function (u, o) {
            var n;
            function m(L) {
              for (
                var v = L.ownerDocument,
                  C = v.getElementsByTagName("*"),
                  M = C.length;
                M--;

              )
                if (((n = C[M]), m.test(L))) return (n = null), !0;
              n = null;
            }
            return (
              (m.combinator = function (L) {
                if (!(!n || !n.getAttribute)) {
                  var v = n.getAttribute(o) || "";
                  if (
                    (v[0] === "#" && (v = v.substring(1)), v === L.id && u(n))
                  )
                    return n;
                }
              }),
              m
            );
          },
        },
        g = {
          escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
          str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
          nonascii: /[\u00A0-\uFFFF]/,
          cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
          qname: /^ *(cssid|\*)/,
          simple: /^(?:([.#]cssid)|pseudo|attr)/,
          ref: /^ *\/(cssid)\/ */,
          combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
          attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
          pseudo: /^(:cssid)(?:\((inside)\))?/,
          inside:
            /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
          ident: /^(cssid)$/,
        };
      (g.cssid = q(g.cssid, "nonascii", g.nonascii)),
        (g.cssid = q(g.cssid, "escape", g.escape)),
        (g.qname = q(g.qname, "cssid", g.cssid)),
        (g.simple = q(g.simple, "cssid", g.cssid)),
        (g.ref = q(g.ref, "cssid", g.cssid)),
        (g.attr = q(g.attr, "cssid", g.cssid)),
        (g.pseudo = q(g.pseudo, "cssid", g.cssid)),
        (g.inside = q(g.inside, `[^"'>]*`, g.inside)),
        (g.attr = q(g.attr, "inside", R("\\[", "\\]"))),
        (g.pseudo = q(g.pseudo, "inside", R("\\(", "\\)"))),
        (g.simple = q(g.simple, "pseudo", g.pseudo)),
        (g.simple = q(g.simple, "attr", g.attr)),
        (g.ident = q(g.ident, "cssid", g.cssid)),
        (g.str_escape = q(g.str_escape, "escape", g.escape));
      var ae = function (u) {
          for (
            var o = u.replace(/^\s+|\s+$/g, ""),
              n,
              m = [],
              L = [],
              v,
              C,
              M,
              z,
              y;
            o;

          ) {
            if ((M = g.qname.exec(o)))
              (o = o.substring(M[0].length)), (C = d(M[1])), L.push(ne(C, !0));
            else if ((M = g.simple.exec(o)))
              (o = o.substring(M[0].length)),
                (C = "*"),
                L.push(ne(C, !0)),
                L.push(ne(M));
            else throw new SyntaxError("Invalid selector.");
            for (; (M = g.simple.exec(o)); )
              (o = o.substring(M[0].length)), L.push(ne(M));
            if (
              (o[0] === "!" &&
                ((o = o.substring(1)),
                (v = D()),
                (v.qname = C),
                L.push(v.simple)),
              (M = g.ref.exec(o)))
            ) {
              (o = o.substring(M[0].length)),
                (y = S.ref(Q(L), d(M[1]))),
                m.push(y.combinator),
                (L = []);
              continue;
            }
            if ((M = g.combinator.exec(o))) {
              if (
                ((o = o.substring(M[0].length)),
                (z = M[1] || M[2] || M[3]),
                z === ",")
              ) {
                m.push(S.noop(Q(L)));
                break;
              }
            } else z = "noop";
            if (!S[z]) throw new SyntaxError("Bad combinator.");
            m.push(S[z](Q(L))), (L = []);
          }
          return (
            (n = G(m)),
            (n.qname = C),
            (n.sel = o),
            v &&
              ((v.lname = n.qname),
              (v.test = n),
              (v.qname = v.qname),
              (v.sel = n.sel),
              (n = v)),
            y && ((y.test = n), (y.qname = n.qname), (y.sel = n.sel), (n = y)),
            n
          );
        },
        ne = function (u, o) {
          if (o) return u === "*" ? T["*"] : T.type(u);
          if (u[1])
            return u[1][0] === "."
              ? T.attr("class", "~=", d(u[1].substring(1)), !1)
              : T.attr("id", "=", d(u[1].substring(1)), !1);
          if (u[2]) return u[3] ? T[d(u[2])](b(u[3])) : T[d(u[2])];
          if (u[4]) {
            var n = u[6],
              m = /["'\s]\s*I$/i.test(n);
            return (
              m && (n = n.replace(/\s*I$/i, "")),
              T.attr(d(u[4]), u[5] || "-", b(n), m)
            );
          }
          throw new SyntaxError("Unknown Selector.");
        },
        Q = function (u) {
          var o = u.length,
            n;
          return o < 2
            ? u[0]
            : function (m) {
                if (m) {
                  for (n = 0; n < o; n++) if (!u[n](m)) return;
                  return !0;
                }
              };
        },
        G = function (u) {
          return u.length < 2
            ? function (o) {
                return !!u[0](o);
              }
            : function (o) {
                for (var n = u.length; n--; ) if (!(o = u[n](o))) return;
                return !0;
              };
        },
        D = function () {
          var u;
          function o(n) {
            for (
              var m = n.ownerDocument,
                L = m.getElementsByTagName(o.lname),
                v = L.length;
              v--;

            )
              if (o.test(L[v]) && u === n) return (u = null), !0;
            u = null;
          }
          return (
            (o.simple = function (n) {
              return (u = n), !0;
            }),
            o
          );
        },
        B = function (u) {
          for (var o = ae(u), n = [o]; o.sel; ) (o = ae(o.sel)), n.push(o);
          return n.length < 2
            ? o
            : function (m) {
                for (var L = n.length, v = 0; v < L; v++)
                  if (n[v](m)) return !0;
              };
        },
        W = function (u, o) {
          for (
            var n = [],
              m = ae(u),
              L = o.getElementsByTagName(m.qname),
              v = 0,
              C;
            (C = L[v++]);

          )
            m(C) && n.push(C);
          if (m.sel) {
            for (; m.sel; )
              for (
                m = ae(m.sel), L = o.getElementsByTagName(m.qname), v = 0;
                (C = L[v++]);

              )
                m(C) && w.call(n, C) === -1 && n.push(C);
            n.sort(t);
          }
          return n;
        };
      (E.exports = _ =
        function (u, o) {
          var n, m;
          if (o.nodeType !== 11 && u.indexOf(" ") === -1) {
            if (
              u[0] === "#" &&
              o.rooted &&
              /^#[A-Z_][-A-Z0-9_]*$/i.test(u) &&
              o.doc._hasMultipleElementsWithId &&
              ((n = u.substring(1)), !o.doc._hasMultipleElementsWithId(n))
            )
              return (m = o.doc.getElementById(n)), m ? [m] : [];
            if (u[0] === "." && /^\.\w+$/.test(u))
              return o.getElementsByClassName(u.substring(1));
            if (/^\w+$/.test(u)) return o.getElementsByTagName(u);
          }
          return W(u, o);
        }),
        (_.selectors = T),
        (_.operators = p),
        (_.combinators = S),
        (_.matches = function (u, o) {
          var n = { sel: o };
          do if (((n = ae(n.sel)), n(u))) return !0;
          while (n.sel);
          return !1;
        });
    },
  }),
  Dn = le({
    "external/npm/node_modules/domino/lib/ChildNode.js"(_, E) {
      "use strict";
      var h = Ve(),
        s = va(),
        t = function (c, l) {
          for (var f = c.createDocumentFragment(), i = 0; i < l.length; i++) {
            var b = l[i],
              d = b instanceof h;
            f.appendChild(d ? b : c.createTextNode(String(b)));
          }
          return f;
        },
        a = {
          after: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.nextSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (d) {
                    return d === i;
                  });

                )
                  i = i.nextSibling;
                var b = t(this.doc, l);
                f.insertBefore(b, i);
              }
            },
          },
          before: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.previousSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (w) {
                    return w === i;
                  });

                )
                  i = i.previousSibling;
                var b = t(this.doc, l),
                  d = i ? i.nextSibling : f.firstChild;
                f.insertBefore(b, d);
              }
            },
          },
          remove: {
            value: function () {
              this.parentNode !== null &&
                (this.doc &&
                  (this.doc._preremoveNodeIterators(this),
                  this.rooted && this.doc.mutateRemove(this)),
                this._remove(),
                (this.parentNode = null));
            },
          },
          _remove: {
            value: function () {
              var l = this.parentNode;
              l !== null &&
                (l._childNodes
                  ? l._childNodes.splice(this.index, 1)
                  : l._firstChild === this &&
                    (this._nextSibling === this
                      ? (l._firstChild = null)
                      : (l._firstChild = this._nextSibling)),
                s.remove(this),
                l.modify());
            },
          },
          replaceWith: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.nextSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (d) {
                    return d === i;
                  });

                )
                  i = i.nextSibling;
                var b = t(this.doc, l);
                this.parentNode === f
                  ? f.replaceChild(b, this)
                  : f.insertBefore(b, i);
              }
            },
          },
        };
      E.exports = a;
    },
  }),
  wa = le({
    "external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js"(_, E) {
      "use strict";
      var h = Ve(),
        s = {
          nextElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (var t = this.nextSibling; t !== null; t = t.nextSibling)
                  if (t.nodeType === h.ELEMENT_NODE) return t;
              }
              return null;
            },
          },
          previousElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (
                  var t = this.previousSibling;
                  t !== null;
                  t = t.previousSibling
                )
                  if (t.nodeType === h.ELEMENT_NODE) return t;
              }
              return null;
            },
          },
        };
      E.exports = s;
    },
  }),
  Sa = le({
    "external/npm/node_modules/domino/lib/NamedNodeMap.js"(_, E) {
      "use strict";
      E.exports = s;
      var h = Be();
      function s(t) {
        this.element = t;
      }
      Object.defineProperties(s.prototype, {
        length: { get: h.shouldOverride },
        item: { value: h.shouldOverride },
        getNamedItem: {
          value: function (a) {
            return this.element.getAttributeNode(a);
          },
        },
        getNamedItemNS: {
          value: function (a, c) {
            return this.element.getAttributeNodeNS(a, c);
          },
        },
        setNamedItem: { value: h.nyi },
        setNamedItemNS: { value: h.nyi },
        removeNamedItem: {
          value: function (a) {
            var c = this.element.getAttributeNode(a);
            if (c) return this.element.removeAttribute(a), c;
            h.NotFoundError();
          },
        },
        removeNamedItemNS: {
          value: function (a, c) {
            var l = this.element.getAttributeNodeNS(a, c);
            if (l) return this.element.removeAttributeNS(a, c), l;
            h.NotFoundError();
          },
        },
      });
    },
  }),
  Er = le({
    "external/npm/node_modules/domino/lib/Element.js"(_, E) {
      "use strict";
      E.exports = T;
      var h = Ln(),
        s = Be(),
        t = s.NAMESPACE,
        a = ya(),
        c = Ve(),
        l = ar(),
        f = Ta(),
        i = vs(),
        b = wn(),
        d = Na(),
        w = Cn(),
        R = kn(),
        q = Dn(),
        O = wa(),
        ee = Sa(),
        U = Object.create(null);
      function T(o, n, m, L) {
        R.call(this),
          (this.nodeType = c.ELEMENT_NODE),
          (this.ownerDocument = o),
          (this.localName = n),
          (this.namespaceURI = m),
          (this.prefix = L),
          (this._tagName = void 0),
          (this._attrsByQName = Object.create(null)),
          (this._attrsByLName = Object.create(null)),
          (this._attrKeys = []);
      }
      function p(o, n) {
        if (o.nodeType === c.TEXT_NODE) n.push(o._data);
        else
          for (var m = 0, L = o.childNodes.length; m < L; m++)
            p(o.childNodes[m], n);
      }
      (T.prototype = Object.create(R.prototype, {
        isHTML: {
          get: function () {
            return this.namespaceURI === t.HTML && this.ownerDocument.isHTML;
          },
        },
        tagName: {
          get: function () {
            if (this._tagName === void 0) {
              var n;
              if (
                (this.prefix === null
                  ? (n = this.localName)
                  : (n = this.prefix + ":" + this.localName),
                this.isHTML)
              ) {
                var m = U[n];
                m || (U[n] = m = s.toASCIIUpperCase(n)), (n = m);
              }
              this._tagName = n;
            }
            return this._tagName;
          },
        },
        nodeName: {
          get: function () {
            return this.tagName;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: {
          get: function () {
            var o = [];
            return p(this, o), o.join("");
          },
          set: function (o) {
            this.removeChildren(),
              o != null &&
                o !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(o));
          },
        },
        innerText: {
          get: function () {
            var o = [];
            return (
              p(this, o),
              o
                .join("")
                .replace(/[ \t\n\f\r]+/g, " ")
                .trim()
            );
          },
          set: function (o) {
            this.removeChildren(),
              o != null &&
                o !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(o));
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: s.nyi,
        },
        outerHTML: {
          get: function () {
            return f.serializeOne(this, { nodeType: 0 });
          },
          set: function (o) {
            var n = this.ownerDocument,
              m = this.parentNode;
            if (m !== null) {
              m.nodeType === c.DOCUMENT_NODE && s.NoModificationAllowedError(),
                m.nodeType === c.DOCUMENT_FRAGMENT_NODE &&
                  (m = m.ownerDocument.createElement("body"));
              var L = n.implementation.mozHTMLParser(n._address, m);
              L.parse(o === null ? "" : String(o), !0),
                this.replaceWith(L._asDocumentFragment());
            }
          },
        },
        _insertAdjacent: {
          value: function (n, m) {
            var L = !1;
            switch (n) {
              case "beforebegin":
                L = !0;
              case "afterend":
                var v = this.parentNode;
                return v === null
                  ? null
                  : v.insertBefore(m, L ? this : this.nextSibling);
              case "afterbegin":
                L = !0;
              case "beforeend":
                return this.insertBefore(m, L ? this.firstChild : null);
              default:
                return s.SyntaxError();
            }
          },
        },
        insertAdjacentElement: {
          value: function (n, m) {
            if (m.nodeType !== c.ELEMENT_NODE)
              throw new TypeError("not an element");
            return (
              (n = s.toASCIILowerCase(String(n))), this._insertAdjacent(n, m)
            );
          },
        },
        insertAdjacentText: {
          value: function (n, m) {
            var L = this.ownerDocument.createTextNode(m);
            (n = s.toASCIILowerCase(String(n))), this._insertAdjacent(n, L);
          },
        },
        insertAdjacentHTML: {
          value: function (n, m) {
            (n = s.toASCIILowerCase(String(n))), (m = String(m));
            var L;
            switch (n) {
              case "beforebegin":
              case "afterend":
                (L = this.parentNode),
                  (L === null || L.nodeType === c.DOCUMENT_NODE) &&
                    s.NoModificationAllowedError();
                break;
              case "afterbegin":
              case "beforeend":
                L = this;
                break;
              default:
                s.SyntaxError();
            }
            (!(L instanceof T) ||
              (L.ownerDocument.isHTML &&
                L.localName === "html" &&
                L.namespaceURI === t.HTML)) &&
              (L = L.ownerDocument.createElementNS(t.HTML, "body"));
            var v = this.ownerDocument.implementation.mozHTMLParser(
              this.ownerDocument._address,
              L,
            );
            v.parse(m, !0), this._insertAdjacent(n, v._asDocumentFragment());
          },
        },
        children: {
          get: function () {
            return (
              this._children || (this._children = new ne(this)), this._children
            );
          },
        },
        attributes: {
          get: function () {
            return (
              this._attributes || (this._attributes = new g(this)),
              this._attributes
            );
          },
        },
        firstElementChild: {
          get: function () {
            for (var o = this.firstChild; o !== null; o = o.nextSibling)
              if (o.nodeType === c.ELEMENT_NODE) return o;
            return null;
          },
        },
        lastElementChild: {
          get: function () {
            for (var o = this.lastChild; o !== null; o = o.previousSibling)
              if (o.nodeType === c.ELEMENT_NODE) return o;
            return null;
          },
        },
        childElementCount: {
          get: function () {
            return this.children.length;
          },
        },
        nextElement: {
          value: function (o) {
            o || (o = this.ownerDocument.documentElement);
            var n = this.firstElementChild;
            if (!n) {
              if (this === o) return null;
              n = this.nextElementSibling;
            }
            if (n) return n;
            for (var m = this.parentElement; m && m !== o; m = m.parentElement)
              if (((n = m.nextElementSibling), n)) return n;
            return null;
          },
        },
        getElementsByTagName: {
          value: function (n) {
            var m;
            return n
              ? (n === "*"
                  ? (m = function () {
                      return !0;
                    })
                  : this.isHTML
                    ? (m = G(n))
                    : (m = Q(n)),
                new i(this, m))
              : new l();
          },
        },
        getElementsByTagNameNS: {
          value: function (n, m) {
            var L;
            return (
              n === "*" && m === "*"
                ? (L = function () {
                    return !0;
                  })
                : n === "*"
                  ? (L = Q(m))
                  : m === "*"
                    ? (L = D(n))
                    : (L = B(n, m)),
              new i(this, L)
            );
          },
        },
        getElementsByClassName: {
          value: function (n) {
            if (((n = String(n).trim()), n === "")) {
              var m = new l();
              return m;
            }
            return (n = n.split(/[ \t\r\n\f]+/)), new i(this, W(n));
          },
        },
        getElementsByName: {
          value: function (n) {
            return new i(this, u(String(n)));
          },
        },
        clone: {
          value: function () {
            var n;
            this.namespaceURI !== t.HTML ||
            this.prefix ||
            !this.ownerDocument.isHTML
              ? (n = this.ownerDocument.createElementNS(
                  this.namespaceURI,
                  this.prefix !== null
                    ? this.prefix + ":" + this.localName
                    : this.localName,
                ))
              : (n = this.ownerDocument.createElement(this.localName));
            for (var m = 0, L = this._attrKeys.length; m < L; m++) {
              var v = this._attrKeys[m],
                C = this._attrsByLName[v],
                M = C.cloneNode();
              M._setOwnerElement(n), (n._attrsByLName[v] = M), n._addQName(M);
            }
            return (n._attrKeys = this._attrKeys.concat()), n;
          },
        },
        isEqual: {
          value: function (n) {
            if (
              this.localName !== n.localName ||
              this.namespaceURI !== n.namespaceURI ||
              this.prefix !== n.prefix ||
              this._numattrs !== n._numattrs
            )
              return !1;
            for (var m = 0, L = this._numattrs; m < L; m++) {
              var v = this._attr(m);
              if (
                !n.hasAttributeNS(v.namespaceURI, v.localName) ||
                n.getAttributeNS(v.namespaceURI, v.localName) !== v.value
              )
                return !1;
            }
            return !0;
          },
        },
        _lookupNamespacePrefix: {
          value: function (n, m) {
            if (
              this.namespaceURI &&
              this.namespaceURI === n &&
              this.prefix !== null &&
              m.lookupNamespaceURI(this.prefix) === n
            )
              return this.prefix;
            for (var L = 0, v = this._numattrs; L < v; L++) {
              var C = this._attr(L);
              if (
                C.prefix === "xmlns" &&
                C.value === n &&
                m.lookupNamespaceURI(C.localName) === n
              )
                return C.localName;
            }
            var M = this.parentElement;
            return M ? M._lookupNamespacePrefix(n, m) : null;
          },
        },
        lookupNamespaceURI: {
          value: function (n) {
            if (
              ((n === "" || n === void 0) && (n = null),
              this.namespaceURI !== null && this.prefix === n)
            )
              return this.namespaceURI;
            for (var m = 0, L = this._numattrs; m < L; m++) {
              var v = this._attr(m);
              if (
                v.namespaceURI === t.XMLNS &&
                ((v.prefix === "xmlns" && v.localName === n) ||
                  (n === null && v.prefix === null && v.localName === "xmlns"))
              )
                return v.value || null;
            }
            var C = this.parentElement;
            return C ? C.lookupNamespaceURI(n) : null;
          },
        },
        getAttribute: {
          value: function (n) {
            var m = this.getAttributeNode(n);
            return m ? m.value : null;
          },
        },
        getAttributeNS: {
          value: function (n, m) {
            var L = this.getAttributeNodeNS(n, m);
            return L ? L.value : null;
          },
        },
        getAttributeNode: {
          value: function (n) {
            (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var m = this._attrsByQName[n];
            return m ? (Array.isArray(m) && (m = m[0]), m) : null;
          },
        },
        getAttributeNodeNS: {
          value: function (n, m) {
            (n = n == null ? "" : String(n)), (m = String(m));
            var L = this._attrsByLName[n + "|" + m];
            return L || null;
          },
        },
        hasAttribute: {
          value: function (n) {
            return (
              (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n)),
              this._attrsByQName[n] !== void 0
            );
          },
        },
        hasAttributeNS: {
          value: function (n, m) {
            (n = n == null ? "" : String(n)), (m = String(m));
            var L = n + "|" + m;
            return this._attrsByLName[L] !== void 0;
          },
        },
        hasAttributes: {
          value: function () {
            return this._numattrs > 0;
          },
        },
        toggleAttribute: {
          value: function (n, m) {
            (n = String(n)),
              h.isValidName(n) || s.InvalidCharacterError(),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var L = this._attrsByQName[n];
            return L === void 0
              ? m === void 0 || m === !0
                ? (this._setAttribute(n, ""), !0)
                : !1
              : m === void 0 || m === !1
                ? (this.removeAttribute(n), !1)
                : !0;
          },
        },
        _setAttribute: {
          value: function (n, m) {
            var L = this._attrsByQName[n],
              v;
            L
              ? Array.isArray(L) && (L = L[0])
              : ((L = this._newattr(n)), (v = !0)),
              (L.value = m),
              this._attributes && (this._attributes[n] = L),
              v && this._newattrhook && this._newattrhook(n, m);
          },
        },
        setAttribute: {
          value: function (n, m) {
            (n = String(n)),
              h.isValidName(n) || s.InvalidCharacterError(),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n)),
              this._setAttribute(n, String(m));
          },
        },
        _setAttributeNS: {
          value: function (n, m, L) {
            var v = m.indexOf(":"),
              C,
              M;
            v < 0
              ? ((C = null), (M = m))
              : ((C = m.substring(0, v)), (M = m.substring(v + 1))),
              (n === "" || n === void 0) && (n = null);
            var z = (n === null ? "" : n) + "|" + M,
              y = this._attrsByLName[z],
              A;
            y ||
              ((y = new S(this, M, C, n)),
              (A = !0),
              (this._attrsByLName[z] = y),
              this._attributes && (this._attributes[this._attrKeys.length] = y),
              this._attrKeys.push(z),
              this._addQName(y)),
              (y.value = L),
              A && this._newattrhook && this._newattrhook(m, L);
          },
        },
        setAttributeNS: {
          value: function (n, m, L) {
            (n = n == null || n === "" ? null : String(n)),
              (m = String(m)),
              h.isValidQName(m) || s.InvalidCharacterError();
            var v = m.indexOf(":"),
              C = v < 0 ? null : m.substring(0, v);
            ((C !== null && n === null) ||
              (C === "xml" && n !== t.XML) ||
              ((m === "xmlns" || C === "xmlns") && n !== t.XMLNS) ||
              (n === t.XMLNS && !(m === "xmlns" || C === "xmlns"))) &&
              s.NamespaceError(),
              this._setAttributeNS(n, m, String(L));
          },
        },
        setAttributeNode: {
          value: function (n) {
            if (n.ownerElement !== null && n.ownerElement !== this)
              throw new b(b.INUSE_ATTRIBUTE_ERR);
            var m = null,
              L = this._attrsByQName[n.name];
            if (L) {
              if (
                (Array.isArray(L) || (L = [L]),
                L.some(function (v) {
                  return v === n;
                }))
              )
                return n;
              if (n.ownerElement !== null) throw new b(b.INUSE_ATTRIBUTE_ERR);
              L.forEach(function (v) {
                this.removeAttributeNode(v);
              }, this),
                (m = L[0]);
            }
            return this.setAttributeNodeNS(n), m;
          },
        },
        setAttributeNodeNS: {
          value: function (n) {
            if (n.ownerElement !== null) throw new b(b.INUSE_ATTRIBUTE_ERR);
            var m = n.namespaceURI,
              L = (m === null ? "" : m) + "|" + n.localName,
              v = this._attrsByLName[L];
            return (
              v && this.removeAttributeNode(v),
              n._setOwnerElement(this),
              (this._attrsByLName[L] = n),
              this._attributes && (this._attributes[this._attrKeys.length] = n),
              this._attrKeys.push(L),
              this._addQName(n),
              this._newattrhook && this._newattrhook(n.name, n.value),
              v || null
            );
          },
        },
        removeAttribute: {
          value: function (n) {
            (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var m = this._attrsByQName[n];
            if (m) {
              Array.isArray(m)
                ? m.length > 2
                  ? (m = m.shift())
                  : ((this._attrsByQName[n] = m[1]), (m = m[0]))
                : (this._attrsByQName[n] = void 0);
              var L = m.namespaceURI,
                v = (L === null ? "" : L) + "|" + m.localName;
              this._attrsByLName[v] = void 0;
              var C = this._attrKeys.indexOf(v);
              this._attributes &&
                (Array.prototype.splice.call(this._attributes, C, 1),
                (this._attributes[n] = void 0)),
                this._attrKeys.splice(C, 1);
              var M = m.onchange;
              m._setOwnerElement(null),
                M && M.call(m, this, m.localName, m.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(m);
            }
          },
        },
        removeAttributeNS: {
          value: function (n, m) {
            (n = n == null ? "" : String(n)), (m = String(m));
            var L = n + "|" + m,
              v = this._attrsByLName[L];
            if (v) {
              this._attrsByLName[L] = void 0;
              var C = this._attrKeys.indexOf(L);
              this._attributes &&
                Array.prototype.splice.call(this._attributes, C, 1),
                this._attrKeys.splice(C, 1),
                this._removeQName(v);
              var M = v.onchange;
              v._setOwnerElement(null),
                M && M.call(v, this, v.localName, v.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(v);
            }
          },
        },
        removeAttributeNode: {
          value: function (n) {
            var m = n.namespaceURI,
              L = (m === null ? "" : m) + "|" + n.localName;
            return (
              this._attrsByLName[L] !== n && s.NotFoundError(),
              this.removeAttributeNS(m, n.localName),
              n
            );
          },
        },
        getAttributeNames: {
          value: function () {
            var n = this;
            return this._attrKeys.map(function (m) {
              return n._attrsByLName[m].name;
            });
          },
        },
        _getattr: {
          value: function (n) {
            var m = this._attrsByQName[n];
            return m ? m.value : null;
          },
        },
        _setattr: {
          value: function (n, m) {
            var L = this._attrsByQName[n],
              v;
            L || ((L = this._newattr(n)), (v = !0)),
              (L.value = String(m)),
              this._attributes && (this._attributes[n] = L),
              v && this._newattrhook && this._newattrhook(n, m);
          },
        },
        _newattr: {
          value: function (n) {
            var m = new S(this, n, null, null),
              L = "|" + n;
            return (
              (this._attrsByQName[n] = m),
              (this._attrsByLName[L] = m),
              this._attributes && (this._attributes[this._attrKeys.length] = m),
              this._attrKeys.push(L),
              m
            );
          },
        },
        _addQName: {
          value: function (o) {
            var n = o.name,
              m = this._attrsByQName[n];
            m
              ? Array.isArray(m)
                ? m.push(o)
                : (this._attrsByQName[n] = [m, o])
              : (this._attrsByQName[n] = o),
              this._attributes && (this._attributes[n] = o);
          },
        },
        _removeQName: {
          value: function (o) {
            var n = o.name,
              m = this._attrsByQName[n];
            if (Array.isArray(m)) {
              var L = m.indexOf(o);
              s.assert(L !== -1),
                m.length === 2
                  ? ((this._attrsByQName[n] = m[1 - L]),
                    this._attributes &&
                      (this._attributes[n] = this._attrsByQName[n]))
                  : (m.splice(L, 1),
                    this._attributes &&
                      this._attributes[n] === o &&
                      (this._attributes[n] = m[0]));
            } else
              s.assert(m === o),
                (this._attrsByQName[n] = void 0),
                this._attributes && (this._attributes[n] = void 0);
          },
        },
        _numattrs: {
          get: function () {
            return this._attrKeys.length;
          },
        },
        _attr: {
          value: function (o) {
            return this._attrsByLName[this._attrKeys[o]];
          },
        },
        id: a.property({ name: "id" }),
        className: a.property({ name: "class" }),
        classList: {
          get: function () {
            var o = this;
            if (this._classList) return this._classList;
            var n = new d(
              function () {
                return o.className || "";
              },
              function (m) {
                o.className = m;
              },
            );
            return (this._classList = n), n;
          },
          set: function (o) {
            this.className = o;
          },
        },
        matches: {
          value: function (o) {
            return w.matches(this, o);
          },
        },
        closest: {
          value: function (o) {
            var n = this;
            do {
              if (n.matches && n.matches(o)) return n;
              n = n.parentElement || n.parentNode;
            } while (n !== null && n.nodeType === c.ELEMENT_NODE);
            return null;
          },
        },
        querySelector: {
          value: function (o) {
            return w(o, this)[0];
          },
        },
        querySelectorAll: {
          value: function (o) {
            var n = w(o, this);
            return n.item ? n : new l(n);
          },
        },
      })),
        Object.defineProperties(T.prototype, q),
        Object.defineProperties(T.prototype, O),
        a.registerChangeHandler(T, "id", function (o, n, m, L) {
          o.rooted &&
            (m && o.ownerDocument.delId(m, o),
            L && o.ownerDocument.addId(L, o));
        }),
        a.registerChangeHandler(T, "class", function (o, n, m, L) {
          o._classList && o._classList._update();
        });
      function S(o, n, m, L, v) {
        (this.localName = n),
          (this.prefix = m === null || m === "" ? null : "" + m),
          (this.namespaceURI = L === null || L === "" ? null : "" + L),
          (this.data = v),
          this._setOwnerElement(o);
      }
      (S.prototype = Object.create(Object.prototype, {
        ownerElement: {
          get: function () {
            return this._ownerElement;
          },
        },
        _setOwnerElement: {
          value: function (n) {
            (this._ownerElement = n),
              this.prefix === null && this.namespaceURI === null && n
                ? (this.onchange = n._attributeChangeHandlers[this.localName])
                : (this.onchange = null);
          },
        },
        name: {
          get: function () {
            return this.prefix
              ? this.prefix + ":" + this.localName
              : this.localName;
          },
        },
        specified: {
          get: function () {
            return !0;
          },
        },
        value: {
          get: function () {
            return this.data;
          },
          set: function (o) {
            var n = this.data;
            (o = o === void 0 ? "" : o + ""),
              o !== n &&
                ((this.data = o),
                this.ownerElement &&
                  (this.onchange &&
                    this.onchange(this.ownerElement, this.localName, n, o),
                  this.ownerElement.rooted &&
                    this.ownerElement.ownerDocument.mutateAttr(this, n)));
          },
        },
        cloneNode: {
          value: function (n) {
            return new S(
              null,
              this.localName,
              this.prefix,
              this.namespaceURI,
              this.data,
            );
          },
        },
        nodeType: {
          get: function () {
            return c.ATTRIBUTE_NODE;
          },
        },
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return this.value;
          },
          set: function (o) {
            this.value = o;
          },
        },
        textContent: {
          get: function () {
            return this.value;
          },
          set: function (o) {
            o == null && (o = ""), (this.value = o);
          },
        },
        innerText: {
          get: function () {
            return this.value;
          },
          set: function (o) {
            o == null && (o = ""), (this.value = o);
          },
        },
      })),
        (T._Attr = S);
      function g(o) {
        ee.call(this, o);
        for (var n in o._attrsByQName) this[n] = o._attrsByQName[n];
        for (var m = 0; m < o._attrKeys.length; m++)
          this[m] = o._attrsByLName[o._attrKeys[m]];
      }
      g.prototype = Object.create(ee.prototype, {
        length: {
          get: function () {
            return this.element._attrKeys.length;
          },
          set: function () {},
        },
        item: {
          value: function (o) {
            return (
              (o = o >>> 0),
              o >= this.length
                ? null
                : this.element._attrsByLName[this.element._attrKeys[o]]
            );
          },
        },
      });
      var ae;
      (ae = globalThis.Symbol) != null &&
        ae.iterator &&
        (g.prototype[globalThis.Symbol.iterator] = function () {
          var o = 0,
            n = this.length,
            m = this;
          return {
            next: function () {
              return o < n ? { value: m.item(o++) } : { done: !0 };
            },
          };
        });
      function ne(o) {
        (this.element = o), this.updateCache();
      }
      ne.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return this.updateCache(), this.childrenByNumber.length;
          },
        },
        item: {
          value: function (n) {
            return this.updateCache(), this.childrenByNumber[n] || null;
          },
        },
        namedItem: {
          value: function (n) {
            return this.updateCache(), this.childrenByName[n] || null;
          },
        },
        namedItems: {
          get: function () {
            return this.updateCache(), this.childrenByName;
          },
        },
        updateCache: {
          value: function () {
            var n =
              /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
            if (this.lastModTime !== this.element.lastModTime) {
              this.lastModTime = this.element.lastModTime;
              for (
                var m =
                    (this.childrenByNumber && this.childrenByNumber.length) ||
                    0,
                  L = 0;
                L < m;
                L++
              )
                this[L] = void 0;
              (this.childrenByNumber = []),
                (this.childrenByName = Object.create(null));
              for (
                var v = this.element.firstChild;
                v !== null;
                v = v.nextSibling
              )
                if (v.nodeType === c.ELEMENT_NODE) {
                  (this[this.childrenByNumber.length] = v),
                    this.childrenByNumber.push(v);
                  var C = v.getAttribute("id");
                  C && !this.childrenByName[C] && (this.childrenByName[C] = v);
                  var M = v.getAttribute("name");
                  M &&
                    this.element.namespaceURI === t.HTML &&
                    n.test(this.element.localName) &&
                    !this.childrenByName[M] &&
                    (this.childrenByName[C] = v);
                }
            }
          },
        },
      });
      function Q(o) {
        return function (n) {
          return n.localName === o;
        };
      }
      function G(o) {
        var n = s.toASCIILowerCase(o);
        return n === o
          ? Q(o)
          : function (m) {
              return m.isHTML ? m.localName === n : m.localName === o;
            };
      }
      function D(o) {
        return function (n) {
          return n.namespaceURI === o;
        };
      }
      function B(o, n) {
        return function (m) {
          return m.namespaceURI === o && m.localName === n;
        };
      }
      function W(o) {
        return function (n) {
          return o.every(function (m) {
            return n.classList.contains(m);
          });
        };
      }
      function u(o) {
        return function (n) {
          return n.namespaceURI !== t.HTML ? !1 : n.getAttribute("name") === o;
        };
      }
    },
  }),
  ka = le({
    "external/npm/node_modules/domino/lib/Leaf.js"(_, E) {
      "use strict";
      E.exports = l;
      var h = Ve(),
        s = ar(),
        t = Be(),
        a = t.HierarchyRequestError,
        c = t.NotFoundError;
      function l() {
        h.call(this);
      }
      l.prototype = Object.create(h.prototype, {
        hasChildNodes: {
          value: function () {
            return !1;
          },
        },
        firstChild: { value: null },
        lastChild: { value: null },
        insertBefore: {
          value: function (f, i) {
            if (!f.nodeType) throw new TypeError("not a node");
            a();
          },
        },
        replaceChild: {
          value: function (f, i) {
            if (!f.nodeType) throw new TypeError("not a node");
            a();
          },
        },
        removeChild: {
          value: function (f) {
            if (!f.nodeType) throw new TypeError("not a node");
            c();
          },
        },
        removeChildren: { value: function () {} },
        childNodes: {
          get: function () {
            return (
              this._childNodes || (this._childNodes = new s()), this._childNodes
            );
          },
        },
      });
    },
  }),
  Jr = le({
    "external/npm/node_modules/domino/lib/CharacterData.js"(_, E) {
      "use strict";
      E.exports = c;
      var h = ka(),
        s = Be(),
        t = Dn(),
        a = wa();
      function c() {
        h.call(this);
      }
      (c.prototype = Object.create(h.prototype, {
        substringData: {
          value: function (f, i) {
            if (arguments.length < 2)
              throw new TypeError("Not enough arguments");
            return (
              (f = f >>> 0),
              (i = i >>> 0),
              (f > this.data.length || f < 0 || i < 0) && s.IndexSizeError(),
              this.data.substring(f, f + i)
            );
          },
        },
        appendData: {
          value: function (f) {
            if (arguments.length < 1)
              throw new TypeError("Not enough arguments");
            this.data += String(f);
          },
        },
        insertData: {
          value: function (f, i) {
            return this.replaceData(f, 0, i);
          },
        },
        deleteData: {
          value: function (f, i) {
            return this.replaceData(f, i, "");
          },
        },
        replaceData: {
          value: function (f, i, b) {
            var d = this.data,
              w = d.length;
            (f = f >>> 0),
              (i = i >>> 0),
              (b = String(b)),
              (f > w || f < 0) && s.IndexSizeError(),
              f + i > w && (i = w - f);
            var R = d.substring(0, f),
              q = d.substring(f + i);
            this.data = R + b + q;
          },
        },
        isEqual: {
          value: function (f) {
            return this._data === f._data;
          },
        },
        length: {
          get: function () {
            return this.data.length;
          },
        },
      })),
        Object.defineProperties(c.prototype, t),
        Object.defineProperties(c.prototype, a);
    },
  }),
  La = le({
    "external/npm/node_modules/domino/lib/Text.js"(_, E) {
      "use strict";
      E.exports = a;
      var h = Be(),
        s = Ve(),
        t = Jr();
      function a(l, f) {
        t.call(this),
          (this.nodeType = s.TEXT_NODE),
          (this.ownerDocument = l),
          (this._data = f),
          (this._index = void 0);
      }
      var c = {
        get: function () {
          return this._data;
        },
        set: function (l) {
          l == null ? (l = "") : (l = String(l)),
            l !== this._data &&
              ((this._data = l),
              this.rooted && this.ownerDocument.mutateValue(this),
              this.parentNode &&
                this.parentNode._textchangehook &&
                this.parentNode._textchangehook(this));
        },
      };
      a.prototype = Object.create(t.prototype, {
        nodeName: { value: "#text" },
        nodeValue: c,
        textContent: c,
        innerText: c,
        data: {
          get: c.get,
          set: function (l) {
            c.set.call(this, l === null ? "" : String(l));
          },
        },
        splitText: {
          value: function (f) {
            (f > this._data.length || f < 0) && h.IndexSizeError();
            var i = this._data.substring(f),
              b = this.ownerDocument.createTextNode(i);
            this.data = this.data.substring(0, f);
            var d = this.parentNode;
            return d !== null && d.insertBefore(b, this.nextSibling), b;
          },
        },
        wholeText: {
          get: function () {
            for (
              var f = this.textContent, i = this.nextSibling;
              i && i.nodeType === s.TEXT_NODE;
              i = i.nextSibling
            )
              f += i.textContent;
            return f;
          },
        },
        replaceWholeText: { value: h.nyi },
        clone: {
          value: function () {
            return new a(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Ca = le({
    "external/npm/node_modules/domino/lib/Comment.js"(_, E) {
      "use strict";
      E.exports = t;
      var h = Ve(),
        s = Jr();
      function t(c, l) {
        s.call(this),
          (this.nodeType = h.COMMENT_NODE),
          (this.ownerDocument = c),
          (this._data = l);
      }
      var a = {
        get: function () {
          return this._data;
        },
        set: function (c) {
          c == null ? (c = "") : (c = String(c)),
            (this._data = c),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      t.prototype = Object.create(s.prototype, {
        nodeName: { value: "#comment" },
        nodeValue: a,
        textContent: a,
        innerText: a,
        data: {
          get: a.get,
          set: function (c) {
            a.set.call(this, c === null ? "" : String(c));
          },
        },
        clone: {
          value: function () {
            return new t(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Da = le({
    "external/npm/node_modules/domino/lib/DocumentFragment.js"(_, E) {
      "use strict";
      E.exports = f;
      var h = Ve(),
        s = ar(),
        t = kn(),
        a = Er(),
        c = Cn(),
        l = Be();
      function f(i) {
        t.call(this),
          (this.nodeType = h.DOCUMENT_FRAGMENT_NODE),
          (this.ownerDocument = i);
      }
      f.prototype = Object.create(t.prototype, {
        nodeName: { value: "#document-fragment" },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: Object.getOwnPropertyDescriptor(
          a.prototype,
          "textContent",
        ),
        innerText: Object.getOwnPropertyDescriptor(a.prototype, "innerText"),
        querySelector: {
          value: function (i) {
            var b = this.querySelectorAll(i);
            return b.length ? b[0] : null;
          },
        },
        querySelectorAll: {
          value: function (i) {
            var b = Object.create(this);
            (b.isHTML = !0),
              (b.getElementsByTagName = a.prototype.getElementsByTagName),
              (b.nextElement = Object.getOwnPropertyDescriptor(
                a.prototype,
                "firstElementChild",
              ).get);
            var d = c(i, b);
            return d.item ? d : new s(d);
          },
        },
        clone: {
          value: function () {
            return new f(this.ownerDocument);
          },
        },
        isEqual: {
          value: function (b) {
            return !0;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: l.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: l.nyi,
        },
      });
    },
  }),
  Aa = le({
    "external/npm/node_modules/domino/lib/ProcessingInstruction.js"(_, E) {
      "use strict";
      E.exports = t;
      var h = Ve(),
        s = Jr();
      function t(c, l, f) {
        s.call(this),
          (this.nodeType = h.PROCESSING_INSTRUCTION_NODE),
          (this.ownerDocument = c),
          (this.target = l),
          (this._data = f);
      }
      var a = {
        get: function () {
          return this._data;
        },
        set: function (c) {
          c == null ? (c = "") : (c = String(c)),
            (this._data = c),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      t.prototype = Object.create(s.prototype, {
        nodeName: {
          get: function () {
            return this.target;
          },
        },
        nodeValue: a,
        textContent: a,
        innerText: a,
        data: {
          get: a.get,
          set: function (c) {
            a.set.call(this, c === null ? "" : String(c));
          },
        },
        clone: {
          value: function () {
            return new t(this.ownerDocument, this.target, this._data);
          },
        },
        isEqual: {
          value: function (l) {
            return this.target === l.target && this._data === l._data;
          },
        },
      });
    },
  }),
  en = le({
    "external/npm/node_modules/domino/lib/NodeFilter.js"(_, E) {
      "use strict";
      var h = {
        FILTER_ACCEPT: 1,
        FILTER_REJECT: 2,
        FILTER_SKIP: 3,
        SHOW_ALL: 4294967295,
        SHOW_ELEMENT: 1,
        SHOW_ATTRIBUTE: 2,
        SHOW_TEXT: 4,
        SHOW_CDATA_SECTION: 8,
        SHOW_ENTITY_REFERENCE: 16,
        SHOW_ENTITY: 32,
        SHOW_PROCESSING_INSTRUCTION: 64,
        SHOW_COMMENT: 128,
        SHOW_DOCUMENT: 256,
        SHOW_DOCUMENT_TYPE: 512,
        SHOW_DOCUMENT_FRAGMENT: 1024,
        SHOW_NOTATION: 2048,
      };
      E.exports = h.constructor = h.prototype = h;
    },
  }),
  Ma = le({
    "external/npm/node_modules/domino/lib/NodeTraversal.js"(_, E) {
      "use strict";
      var h = (E.exports = {
        nextSkippingChildren: s,
        nextAncestorSibling: t,
        next: a,
        previous: l,
        deepLastChild: c,
      });
      function s(f, i) {
        return f === i
          ? null
          : f.nextSibling !== null
            ? f.nextSibling
            : t(f, i);
      }
      function t(f, i) {
        for (f = f.parentNode; f !== null; f = f.parentNode) {
          if (f === i) return null;
          if (f.nextSibling !== null) return f.nextSibling;
        }
        return null;
      }
      function a(f, i) {
        var b;
        return (
          (b = f.firstChild),
          b !== null
            ? b
            : f === i
              ? null
              : ((b = f.nextSibling), b !== null ? b : t(f, i))
        );
      }
      function c(f) {
        for (; f.lastChild; ) f = f.lastChild;
        return f;
      }
      function l(f, i) {
        var b;
        return (
          (b = f.previousSibling),
          b !== null ? c(b) : ((b = f.parentNode), b === i ? null : b)
        );
      }
    },
  }),
  Ts = le({
    "external/npm/node_modules/domino/lib/TreeWalker.js"(_, E) {
      "use strict";
      E.exports = b;
      var h = Ve(),
        s = en(),
        t = Ma(),
        a = Be(),
        c = {
          first: "firstChild",
          last: "lastChild",
          next: "firstChild",
          previous: "lastChild",
        },
        l = {
          first: "nextSibling",
          last: "previousSibling",
          next: "nextSibling",
          previous: "previousSibling",
        };
      function f(d, w) {
        var R, q, O, ee, U;
        for (q = d._currentNode[c[w]]; q !== null; ) {
          if (((ee = d._internalFilter(q)), ee === s.FILTER_ACCEPT))
            return (d._currentNode = q), q;
          if (ee === s.FILTER_SKIP && ((R = q[c[w]]), R !== null)) {
            q = R;
            continue;
          }
          for (; q !== null; ) {
            if (((U = q[l[w]]), U !== null)) {
              q = U;
              break;
            }
            if (
              ((O = q.parentNode),
              O === null || O === d.root || O === d._currentNode)
            )
              return null;
            q = O;
          }
        }
        return null;
      }
      function i(d, w) {
        var R, q, O;
        if (((R = d._currentNode), R === d.root)) return null;
        for (;;) {
          for (O = R[l[w]]; O !== null; ) {
            if (((R = O), (q = d._internalFilter(R)), q === s.FILTER_ACCEPT))
              return (d._currentNode = R), R;
            (O = R[c[w]]),
              (q === s.FILTER_REJECT || O === null) && (O = R[l[w]]);
          }
          if (
            ((R = R.parentNode),
            R === null ||
              R === d.root ||
              d._internalFilter(R) === s.FILTER_ACCEPT)
          )
            return null;
        }
      }
      function b(d, w, R) {
        (!d || !d.nodeType) && a.NotSupportedError(),
          (this._root = d),
          (this._whatToShow = Number(w) || 0),
          (this._filter = R || null),
          (this._active = !1),
          (this._currentNode = d);
      }
      Object.defineProperties(b.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        currentNode: {
          get: function () {
            return this._currentNode;
          },
          set: function (w) {
            if (!(w instanceof h)) throw new TypeError("Not a Node");
            this._currentNode = w;
          },
        },
        _internalFilter: {
          value: function (w) {
            var R, q;
            if (
              (this._active && a.InvalidStateError(),
              !((1 << (w.nodeType - 1)) & this._whatToShow))
            )
              return s.FILTER_SKIP;
            if (((q = this._filter), q === null)) R = s.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof q == "function" ? (R = q(w)) : (R = q.acceptNode(w));
              } finally {
                this._active = !1;
              }
            }
            return +R;
          },
        },
        parentNode: {
          value: function () {
            for (var w = this._currentNode; w !== this.root; ) {
              if (((w = w.parentNode), w === null)) return null;
              if (this._internalFilter(w) === s.FILTER_ACCEPT)
                return (this._currentNode = w), w;
            }
            return null;
          },
        },
        firstChild: {
          value: function () {
            return f(this, "first");
          },
        },
        lastChild: {
          value: function () {
            return f(this, "last");
          },
        },
        previousSibling: {
          value: function () {
            return i(this, "previous");
          },
        },
        nextSibling: {
          value: function () {
            return i(this, "next");
          },
        },
        previousNode: {
          value: function () {
            var w, R, q, O;
            for (w = this._currentNode; w !== this._root; ) {
              for (q = w.previousSibling; q; q = w.previousSibling)
                if (
                  ((w = q),
                  (R = this._internalFilter(w)),
                  R !== s.FILTER_REJECT)
                ) {
                  for (
                    O = w.lastChild;
                    O &&
                    ((w = O),
                    (R = this._internalFilter(w)),
                    R !== s.FILTER_REJECT);
                    O = w.lastChild
                  );
                  if (R === s.FILTER_ACCEPT) return (this._currentNode = w), w;
                }
              if (w === this.root || w.parentNode === null) return null;
              if (
                ((w = w.parentNode),
                this._internalFilter(w) === s.FILTER_ACCEPT)
              )
                return (this._currentNode = w), w;
            }
            return null;
          },
        },
        nextNode: {
          value: function () {
            var w, R, q, O;
            (w = this._currentNode), (R = s.FILTER_ACCEPT);
            e: for (;;) {
              for (q = w.firstChild; q; q = w.firstChild) {
                if (
                  ((w = q),
                  (R = this._internalFilter(w)),
                  R === s.FILTER_ACCEPT)
                )
                  return (this._currentNode = w), w;
                if (R === s.FILTER_REJECT) break;
              }
              for (
                O = t.nextSkippingChildren(w, this.root);
                O;
                O = t.nextSkippingChildren(w, this.root)
              ) {
                if (
                  ((w = O),
                  (R = this._internalFilter(w)),
                  R === s.FILTER_ACCEPT)
                )
                  return (this._currentNode = w), w;
                if (R === s.FILTER_SKIP) continue e;
              }
              return null;
            }
          },
        },
        toString: {
          value: function () {
            return "[object TreeWalker]";
          },
        },
      });
    },
  }),
  ys = le({
    "external/npm/node_modules/domino/lib/NodeIterator.js"(_, E) {
      "use strict";
      E.exports = f;
      var h = en(),
        s = Ma(),
        t = Be();
      function a(i, b, d) {
        return d ? s.next(i, b) : i === b ? null : s.previous(i, null);
      }
      function c(i, b) {
        for (; b; b = b.parentNode) if (i === b) return !0;
        return !1;
      }
      function l(i, b) {
        var d, w;
        for (d = i._referenceNode, w = i._pointerBeforeReferenceNode; ; ) {
          if (w === b) w = !w;
          else if (((d = a(d, i._root, b)), d === null)) return null;
          var R = i._internalFilter(d);
          if (R === h.FILTER_ACCEPT) break;
        }
        return (i._referenceNode = d), (i._pointerBeforeReferenceNode = w), d;
      }
      function f(i, b, d) {
        (!i || !i.nodeType) && t.NotSupportedError(),
          (this._root = i),
          (this._referenceNode = i),
          (this._pointerBeforeReferenceNode = !0),
          (this._whatToShow = Number(b) || 0),
          (this._filter = d || null),
          (this._active = !1),
          i.doc._attachNodeIterator(this);
      }
      Object.defineProperties(f.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        referenceNode: {
          get: function () {
            return this._referenceNode;
          },
        },
        pointerBeforeReferenceNode: {
          get: function () {
            return this._pointerBeforeReferenceNode;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        _internalFilter: {
          value: function (b) {
            var d, w;
            if (
              (this._active && t.InvalidStateError(),
              !((1 << (b.nodeType - 1)) & this._whatToShow))
            )
              return h.FILTER_SKIP;
            if (((w = this._filter), w === null)) d = h.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof w == "function" ? (d = w(b)) : (d = w.acceptNode(b));
              } finally {
                this._active = !1;
              }
            }
            return +d;
          },
        },
        _preremove: {
          value: function (b) {
            if (!c(b, this._root) && c(b, this._referenceNode)) {
              if (this._pointerBeforeReferenceNode) {
                for (var d = b; d.lastChild; ) d = d.lastChild;
                if (((d = s.next(d, this.root)), d)) {
                  this._referenceNode = d;
                  return;
                }
                this._pointerBeforeReferenceNode = !1;
              }
              if (b.previousSibling === null)
                this._referenceNode = b.parentNode;
              else {
                this._referenceNode = b.previousSibling;
                var w;
                for (
                  w = this._referenceNode.lastChild;
                  w;
                  w = this._referenceNode.lastChild
                )
                  this._referenceNode = w;
              }
            }
          },
        },
        nextNode: {
          value: function () {
            return l(this, !0);
          },
        },
        previousNode: {
          value: function () {
            return l(this, !1);
          },
        },
        detach: { value: function () {} },
        toString: {
          value: function () {
            return "[object NodeIterator]";
          },
        },
      });
    },
  }),
  An = le({
    "external/npm/node_modules/domino/lib/URL.js"(_, E) {
      "use strict";
      E.exports = h;
      function h(s) {
        if (!s) return Object.create(h.prototype);
        this.url = s.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
        var t = h.pattern.exec(this.url);
        if (t) {
          if ((t[2] && (this.scheme = t[2]), t[4])) {
            var a = t[4].match(h.userinfoPattern);
            if (
              (a &&
                ((this.username = a[1]),
                (this.password = a[3]),
                (t[4] = t[4].substring(a[0].length))),
              t[4].match(h.portPattern))
            ) {
              var c = t[4].lastIndexOf(":");
              (this.host = t[4].substring(0, c)),
                (this.port = t[4].substring(c + 1));
            } else this.host = t[4];
          }
          t[5] && (this.path = t[5]),
            t[6] && (this.query = t[7]),
            t[8] && (this.fragment = t[9]);
        }
      }
      (h.pattern =
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
        (h.userinfoPattern = /^([^@:]*)(:([^@]*))?@/),
        (h.portPattern = /:\d+$/),
        (h.authorityPattern = /^[^:\/?#]+:\/\//),
        (h.hierarchyPattern = /^[^:\/?#]+:\//),
        (h.percentEncode = function (t) {
          var a = t.charCodeAt(0);
          if (a < 256) return "%" + a.toString(16);
          throw Error("can't percent-encode codepoints > 255 yet");
        }),
        (h.prototype = {
          constructor: h,
          isAbsolute: function () {
            return !!this.scheme;
          },
          isAuthorityBased: function () {
            return h.authorityPattern.test(this.url);
          },
          isHierarchical: function () {
            return h.hierarchyPattern.test(this.url);
          },
          toString: function () {
            var s = "";
            return (
              this.scheme !== void 0 && (s += this.scheme + ":"),
              this.isAbsolute() &&
                ((s += "//"),
                (this.username || this.password) &&
                  ((s += this.username || ""),
                  this.password && (s += ":" + this.password),
                  (s += "@")),
                this.host && (s += this.host)),
              this.port !== void 0 && (s += ":" + this.port),
              this.path !== void 0 && (s += this.path),
              this.query !== void 0 && (s += "?" + this.query),
              this.fragment !== void 0 && (s += "#" + this.fragment),
              s
            );
          },
          resolve: function (s) {
            var t = this,
              a = new h(s),
              c = new h();
            return (
              a.scheme !== void 0
                ? ((c.scheme = a.scheme),
                  (c.username = a.username),
                  (c.password = a.password),
                  (c.host = a.host),
                  (c.port = a.port),
                  (c.path = f(a.path)),
                  (c.query = a.query))
                : ((c.scheme = t.scheme),
                  a.host !== void 0
                    ? ((c.username = a.username),
                      (c.password = a.password),
                      (c.host = a.host),
                      (c.port = a.port),
                      (c.path = f(a.path)),
                      (c.query = a.query))
                    : ((c.username = t.username),
                      (c.password = t.password),
                      (c.host = t.host),
                      (c.port = t.port),
                      a.path
                        ? (a.path.charAt(0) === "/"
                            ? (c.path = f(a.path))
                            : ((c.path = l(t.path, a.path)),
                              (c.path = f(c.path))),
                          (c.query = a.query))
                        : ((c.path = t.path),
                          a.query !== void 0
                            ? (c.query = a.query)
                            : (c.query = t.query)))),
              (c.fragment = a.fragment),
              c.toString()
            );
            function l(i, b) {
              if (t.host !== void 0 && !t.path) return "/" + b;
              var d = i.lastIndexOf("/");
              return d === -1 ? b : i.substring(0, d + 1) + b;
            }
            function f(i) {
              if (!i) return i;
              for (var b = ""; i.length > 0; ) {
                if (i === "." || i === "..") {
                  i = "";
                  break;
                }
                var d = i.substring(0, 2),
                  w = i.substring(0, 3),
                  R = i.substring(0, 4);
                if (w === "../") i = i.substring(3);
                else if (d === "./") i = i.substring(2);
                else if (w === "/./") i = "/" + i.substring(3);
                else if (d === "/." && i.length === 2) i = "/";
                else if (R === "/../" || (w === "/.." && i.length === 3))
                  (i = "/" + i.substring(4)), (b = b.replace(/\/?[^\/]*$/, ""));
                else {
                  var q = i.match(/(\/?([^\/]*))/)[0];
                  (b += q), (i = i.substring(q.length));
                }
              }
              return b;
            }
          },
        });
    },
  }),
  Ns = le({
    "external/npm/node_modules/domino/lib/CustomEvent.js"(_, E) {
      "use strict";
      E.exports = s;
      var h = br();
      function s(t, a) {
        h.call(this, t, a);
      }
      s.prototype = Object.create(h.prototype, { constructor: { value: s } });
    },
  }),
  xa = le({
    "external/npm/node_modules/domino/lib/events.js"(_, E) {
      "use strict";
      E.exports = {
        Event: br(),
        UIEvent: _a(),
        MouseEvent: ba(),
        CustomEvent: Ns(),
      };
    },
  }),
  ws = le({
    "external/npm/node_modules/domino/lib/style_parser.js"(_) {
      "use strict";
      Object.defineProperty(_, "__esModule", { value: !0 }),
        (_.hyphenate = _.parse = void 0);
      function E(s) {
        let t = [],
          a = 0,
          c = 0,
          l = 0,
          f = 0,
          i = 0,
          b = null;
        for (; a < s.length; )
          switch (s.charCodeAt(a++)) {
            case 40:
              c++;
              break;
            case 41:
              c--;
              break;
            case 39:
              l === 0
                ? (l = 39)
                : l === 39 && s.charCodeAt(a - 1) !== 92 && (l = 0);
              break;
            case 34:
              l === 0
                ? (l = 34)
                : l === 34 && s.charCodeAt(a - 1) !== 92 && (l = 0);
              break;
            case 58:
              !b &&
                c === 0 &&
                l === 0 &&
                ((b = h(s.substring(i, a - 1).trim())), (f = a));
              break;
            case 59:
              if (b && f > 0 && c === 0 && l === 0) {
                let w = s.substring(f, a - 1).trim();
                t.push(b, w), (i = a), (f = 0), (b = null);
              }
              break;
          }
        if (b && f) {
          let d = s.slice(f).trim();
          t.push(b, d);
        }
        return t;
      }
      _.parse = E;
      function h(s) {
        return s
          .replace(/[a-z][A-Z]/g, (t) => t.charAt(0) + "-" + t.charAt(1))
          .toLowerCase();
      }
      _.hyphenate = h;
    },
  }),
  Mn = le({
    "external/npm/node_modules/domino/lib/CSSStyleDeclaration.js"(_, E) {
      "use strict";
      var { parse: h } = ws();
      E.exports = function (f) {
        let i = new t(f),
          b = {
            get: function (d, w) {
              return w in d ? d[w] : d.getPropertyValue(s(w));
            },
            has: function (d, w) {
              return !0;
            },
            set: function (d, w, R) {
              return w in d ? (d[w] = R) : d.setProperty(s(w), R ?? void 0), !0;
            },
          };
        return new Proxy(i, b);
      };
      function s(f) {
        return f.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function t(f) {
        this._element = f;
      }
      var a = "!important";
      function c(f) {
        let i = { property: {}, priority: {} };
        if (!f) return i;
        let b = h(f);
        if (b.length < 2) return i;
        for (let d = 0; d < b.length; d += 2) {
          let w = b[d],
            R = b[d + 1];
          R.endsWith(a) &&
            ((i.priority[w] = "important"), (R = R.slice(0, -a.length).trim())),
            (i.property[w] = R);
        }
        return i;
      }
      var l = {};
      t.prototype = Object.create(Object.prototype, {
        _parsed: {
          get: function () {
            if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
              var f = this.cssText;
              (this._parsedStyles = c(f)),
                (this._lastParsedText = f),
                delete this._names;
            }
            return this._parsedStyles;
          },
        },
        _serialize: {
          value: function () {
            var f = this._parsed,
              i = "";
            for (var b in f.property)
              i && (i += " "),
                (i += b + ": " + f.property[b]),
                f.priority[b] && (i += " !" + f.priority[b]),
                (i += ";");
            (this.cssText = i), (this._lastParsedText = i), delete this._names;
          },
        },
        cssText: {
          get: function () {
            return this._element.getAttribute("style");
          },
          set: function (f) {
            this._element.setAttribute("style", f);
          },
        },
        length: {
          get: function () {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property,
                )),
              this._names.length
            );
          },
        },
        item: {
          value: function (f) {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property,
                )),
              this._names[f]
            );
          },
        },
        getPropertyValue: {
          value: function (f) {
            return (f = f.toLowerCase()), this._parsed.property[f] || "";
          },
        },
        getPropertyPriority: {
          value: function (f) {
            return (f = f.toLowerCase()), this._parsed.priority[f] || "";
          },
        },
        setProperty: {
          value: function (f, i, b) {
            if (
              ((f = f.toLowerCase()),
              i == null && (i = ""),
              b == null && (b = ""),
              i !== l && (i = "" + i),
              (i = i.trim()),
              i === "")
            ) {
              this.removeProperty(f);
              return;
            }
            if (!(b !== "" && b !== l && !/^important$/i.test(b))) {
              var d = this._parsed;
              if (i === l) {
                if (!d.property[f]) return;
                b !== "" ? (d.priority[f] = "important") : delete d.priority[f];
              } else {
                if (i.includes(";") && !i.includes("data:")) return;
                var w = c(f + ":" + i);
                if (
                  Object.getOwnPropertyNames(w.property).length === 0 ||
                  Object.getOwnPropertyNames(w.priority).length !== 0
                )
                  return;
                for (var R in w.property)
                  (d.property[R] = w.property[R]),
                    b !== l &&
                      (b !== ""
                        ? (d.priority[R] = "important")
                        : d.priority[R] && delete d.priority[R]);
              }
              this._serialize();
            }
          },
        },
        setPropertyValue: {
          value: function (f, i) {
            return this.setProperty(f, i, l);
          },
        },
        setPropertyPriority: {
          value: function (f, i) {
            return this.setProperty(f, l, i);
          },
        },
        removeProperty: {
          value: function (f) {
            f = f.toLowerCase();
            var i = this._parsed;
            f in i.property &&
              (delete i.property[f], delete i.priority[f], this._serialize());
          },
        },
      });
    },
  }),
  Ia = le({
    "external/npm/node_modules/domino/lib/URLUtils.js"(_, E) {
      "use strict";
      var h = An();
      E.exports = s;
      function s() {}
      (s.prototype = Object.create(Object.prototype, {
        _url: {
          get: function () {
            return new h(this.href);
          },
        },
        protocol: {
          get: function () {
            var t = this._url;
            return t && t.scheme ? t.scheme + ":" : ":";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              ((t = t.replace(/:+$/, "")),
              (t = t.replace(/[^-+\.a-zA-Z0-9]/g, h.percentEncode)),
              t.length > 0 && ((c.scheme = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        host: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased()
              ? t.host + (t.port ? ":" + t.port : "")
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = t.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                h.percentEncode,
              )),
              t.length > 0 &&
                ((c.host = t), delete c.port, (a = c.toString()))),
              (this.href = a);
          },
        },
        hostname: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased() ? t.host : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = t.replace(/^\/+/, "")),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                h.percentEncode,
              )),
              t.length > 0 && ((c.host = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        port: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased() && t.port !== void 0
              ? t.port
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = "" + t),
              (t = t.replace(/[^0-9].*$/, "")),
              (t = t.replace(/^0+/, "")),
              t.length === 0 && (t = "0"),
              parseInt(t, 10) <= 65535 && ((c.port = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        pathname: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isHierarchical() ? t.path : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isHierarchical() &&
              (t.charAt(0) !== "/" && (t = "/" + t),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g,
                h.percentEncode,
              )),
              (c.path = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        search: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isHierarchical() && t.query !== void 0
              ? "?" + t.query
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isHierarchical() &&
              (t.charAt(0) === "?" && (t = t.substring(1)),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                h.percentEncode,
              )),
              (c.query = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        hash: {
          get: function () {
            var t = this._url;
            return t == null || t.fragment == null || t.fragment === ""
              ? ""
              : "#" + t.fragment;
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            t.charAt(0) === "#" && (t = t.substring(1)),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                h.percentEncode,
              )),
              (c.fragment = t),
              (a = c.toString()),
              (this.href = a);
          },
        },
        username: {
          get: function () {
            var t = this._url;
            return t.username || "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              ((t = t.replace(
                /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g,
                h.percentEncode,
              )),
              (c.username = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        password: {
          get: function () {
            var t = this._url;
            return t.password || "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              (t === ""
                ? (c.password = null)
                : ((t = t.replace(
                    /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g,
                    h.percentEncode,
                  )),
                  (c.password = t)),
              (a = c.toString())),
              (this.href = a);
          },
        },
        origin: {
          get: function () {
            var t = this._url;
            if (t == null) return "";
            var a = function (c) {
              var l = [t.scheme, t.host, +t.port || c];
              return l[0] + "://" + l[1] + (l[2] === c ? "" : ":" + l[2]);
            };
            switch (t.scheme) {
              case "ftp":
                return a(21);
              case "gopher":
                return a(70);
              case "http":
              case "ws":
                return a(80);
              case "https":
              case "wss":
                return a(443);
              default:
                return t.scheme + "://";
            }
          },
        },
      })),
        (s._inherit = function (t) {
          Object.getOwnPropertyNames(s.prototype).forEach(function (a) {
            if (!(a === "constructor" || a === "href")) {
              var c = Object.getOwnPropertyDescriptor(s.prototype, a);
              Object.defineProperty(t, a, c);
            }
          });
        });
    },
  }),
  Ra = le({
    "external/npm/node_modules/domino/lib/defineElement.js"(_, E) {
      "use strict";
      var h = ya(),
        s = Sn().isApiWritable;
      E.exports = function (l, f, i, b) {
        var d = l.ctor;
        if (d) {
          var w = l.props || {};
          if (l.attributes)
            for (var R in l.attributes) {
              var q = l.attributes[R];
              (typeof q != "object" || Array.isArray(q)) && (q = { type: q }),
                q.name || (q.name = R.toLowerCase()),
                (w[R] = h.property(q));
            }
          (w.constructor = { value: d, writable: s }),
            (d.prototype = Object.create((l.superclass || f).prototype, w)),
            l.events && c(d, l.events),
            (i[l.name] = d);
        } else d = f;
        return (
          (l.tags || (l.tag && [l.tag]) || []).forEach(function (O) {
            b[O] = d;
          }),
          d
        );
      };
      function t(l, f, i, b) {
        (this.body = l),
          (this.document = f),
          (this.form = i),
          (this.element = b);
      }
      t.prototype.build = function () {
        return () => {};
      };
      function a(l, f, i, b) {
        var d = l.ownerDocument || Object.create(null),
          w = l.form || Object.create(null);
        l[f] = new t(b, d, w, l).build();
      }
      function c(l, f) {
        var i = l.prototype;
        f.forEach(function (b) {
          Object.defineProperty(i, "on" + b, {
            get: function () {
              return this._getEventHandler(b);
            },
            set: function (d) {
              this._setEventHandler(b, d);
            },
          }),
            h.registerChangeHandler(l, "on" + b, a);
        });
      }
    },
  }),
  xn = le({
    "external/npm/node_modules/domino/lib/htmlelts.js"(_) {
      "use strict";
      var E = Ve(),
        h = Er(),
        s = Mn(),
        t = Be(),
        a = Ia(),
        c = Ra(),
        l = (_.elements = {}),
        f = Object.create(null);
      _.createElement = function (T, p, S) {
        var g = f[p] || ee;
        return new g(T, p, S);
      };
      function i(T) {
        return c(T, O, l, f);
      }
      function b(T) {
        return {
          get: function () {
            var p = this._getattr(T);
            if (p === null) return "";
            var S = this.doc._resolve(p);
            return S === null ? p : S;
          },
          set: function (p) {
            this._setattr(T, p);
          },
        };
      }
      function d(T) {
        return {
          get: function () {
            var p = this._getattr(T);
            return p === null
              ? null
              : p.toLowerCase() === "use-credentials"
                ? "use-credentials"
                : "anonymous";
          },
          set: function (p) {
            p == null ? this.removeAttribute(T) : this._setattr(T, p);
          },
        };
      }
      var w = {
          type: [
            "",
            "no-referrer",
            "no-referrer-when-downgrade",
            "same-origin",
            "origin",
            "strict-origin",
            "origin-when-cross-origin",
            "strict-origin-when-cross-origin",
            "unsafe-url",
          ],
          missing: "",
        },
        R = {
          A: !0,
          LINK: !0,
          BUTTON: !0,
          INPUT: !0,
          SELECT: !0,
          TEXTAREA: !0,
          COMMAND: !0,
        },
        q = function (T, p, S) {
          O.call(this, T, p, S), (this._form = null);
        },
        O = (_.HTMLElement = i({
          superclass: h,
          name: "HTMLElement",
          ctor: function (p, S, g) {
            h.call(this, p, S, t.NAMESPACE.HTML, g);
          },
          props: {
            dangerouslySetInnerHTML: {
              set: function (T) {
                this._innerHTML = T;
              },
            },
            innerHTML: {
              get: function () {
                return this.serialize();
              },
              set: function (T) {
                var p = this.ownerDocument.implementation.mozHTMLParser(
                  this.ownerDocument._address,
                  this,
                );
                p.parse(T === null ? "" : String(T), !0);
                for (
                  var S = this instanceof f.template ? this.content : this;
                  S.hasChildNodes();

                )
                  S.removeChild(S.firstChild);
                S.appendChild(p._asDocumentFragment());
              },
            },
            style: {
              get: function () {
                return this._style || (this._style = new s(this)), this._style;
              },
              set: function (T) {
                T == null && (T = ""), this._setattr("style", String(T));
              },
            },
            blur: { value: function () {} },
            focus: { value: function () {} },
            forceSpellCheck: { value: function () {} },
            click: {
              value: function () {
                if (!this._click_in_progress) {
                  this._click_in_progress = !0;
                  try {
                    this._pre_click_activation_steps &&
                      this._pre_click_activation_steps();
                    var T = this.ownerDocument.createEvent("MouseEvent");
                    T.initMouseEvent(
                      "click",
                      !0,
                      !0,
                      this.ownerDocument.defaultView,
                      1,
                      0,
                      0,
                      0,
                      0,
                      !1,
                      !1,
                      !1,
                      !1,
                      0,
                      null,
                    );
                    var p = this.dispatchEvent(T);
                    p
                      ? this._post_click_activation_steps &&
                        this._post_click_activation_steps(T)
                      : this._cancelled_activation_steps &&
                        this._cancelled_activation_steps();
                  } finally {
                    this._click_in_progress = !1;
                  }
                }
              },
            },
            submit: { value: t.nyi },
          },
          attributes: {
            title: String,
            lang: String,
            dir: { type: ["ltr", "rtl", "auto"], missing: "" },
            draggable: { type: ["true", "false"], treatNullAsEmptyString: !0 },
            spellcheck: { type: ["true", "false"], missing: "" },
            enterKeyHint: {
              type: [
                "enter",
                "done",
                "go",
                "next",
                "previous",
                "search",
                "send",
              ],
              missing: "",
            },
            autoCapitalize: {
              type: ["off", "on", "none", "sentences", "words", "characters"],
              missing: "",
            },
            autoFocus: Boolean,
            accessKey: String,
            nonce: String,
            hidden: Boolean,
            translate: { type: ["no", "yes"], missing: "" },
            tabIndex: {
              type: "long",
              default: function () {
                return this.tagName in R || this.contentEditable ? 0 : -1;
              },
            },
          },
          events: [
            "abort",
            "canplay",
            "canplaythrough",
            "change",
            "click",
            "contextmenu",
            "cuechange",
            "dblclick",
            "drag",
            "dragend",
            "dragenter",
            "dragleave",
            "dragover",
            "dragstart",
            "drop",
            "durationchange",
            "emptied",
            "ended",
            "input",
            "invalid",
            "keydown",
            "keypress",
            "keyup",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "mousewheel",
            "pause",
            "play",
            "playing",
            "progress",
            "ratechange",
            "readystatechange",
            "reset",
            "seeked",
            "seeking",
            "select",
            "show",
            "stalled",
            "submit",
            "suspend",
            "timeupdate",
            "volumechange",
            "waiting",
            "blur",
            "error",
            "focus",
            "load",
            "scroll",
          ],
        })),
        ee = i({
          name: "HTMLUnknownElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        U = {
          form: {
            get: function () {
              return this._form;
            },
          },
        };
      i({
        tag: "a",
        name: "HTMLAnchorElement",
        ctor: function (p, S, g) {
          O.call(this, p, S, g);
        },
        props: {
          _post_click_activation_steps: {
            value: function (T) {
              this.href &&
                (this.ownerDocument.defaultView.location = this.href);
            },
          },
        },
        attributes: {
          href: b,
          ping: String,
          download: String,
          target: String,
          rel: String,
          media: String,
          hreflang: String,
          type: String,
          referrerPolicy: w,
          coords: String,
          charset: String,
          name: String,
          rev: String,
          shape: String,
        },
      }),
        a._inherit(f.a.prototype),
        i({
          tag: "area",
          name: "HTMLAreaElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            alt: String,
            target: String,
            download: String,
            rel: String,
            media: String,
            href: b,
            hreflang: String,
            type: String,
            shape: String,
            coords: String,
            ping: String,
            referrerPolicy: w,
            noHref: Boolean,
          },
        }),
        a._inherit(f.area.prototype),
        i({
          tag: "br",
          name: "HTMLBRElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { clear: String },
        }),
        i({
          tag: "base",
          name: "HTMLBaseElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { target: String },
        }),
        i({
          tag: "body",
          name: "HTMLBodyElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          events: [
            "afterprint",
            "beforeprint",
            "beforeunload",
            "blur",
            "error",
            "focus",
            "hashchange",
            "load",
            "message",
            "offline",
            "online",
            "pagehide",
            "pageshow",
            "popstate",
            "resize",
            "scroll",
            "storage",
            "unload",
          ],
          attributes: {
            text: { type: String, treatNullAsEmptyString: !0 },
            link: { type: String, treatNullAsEmptyString: !0 },
            vLink: { type: String, treatNullAsEmptyString: !0 },
            aLink: { type: String, treatNullAsEmptyString: !0 },
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            background: String,
          },
        }),
        i({
          tag: "button",
          name: "HTMLButtonElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: {
            name: String,
            value: String,
            disabled: Boolean,
            autofocus: Boolean,
            type: {
              type: ["submit", "reset", "button", "menu"],
              missing: "submit",
            },
            formTarget: String,
            formAction: b,
            formNoValidate: Boolean,
            formMethod: {
              type: ["get", "post", "dialog"],
              invalid: "get",
              missing: "",
            },
            formEnctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "",
            },
          },
        }),
        i({
          tag: "dl",
          name: "HTMLDListElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { compact: Boolean },
        }),
        i({
          tag: "data",
          name: "HTMLDataElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { value: String },
        }),
        i({
          tag: "datalist",
          name: "HTMLDataListElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        i({
          tag: "details",
          name: "HTMLDetailsElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { open: Boolean },
        }),
        i({
          tag: "div",
          name: "HTMLDivElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { align: String },
        }),
        i({
          tag: "embed",
          name: "HTMLEmbedElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            src: b,
            type: String,
            width: String,
            height: String,
            align: String,
            name: String,
          },
        }),
        i({
          tag: "fieldset",
          name: "HTMLFieldSetElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: { disabled: Boolean, name: String },
        }),
        i({
          tag: "form",
          name: "HTMLFormElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            action: String,
            autocomplete: { type: ["on", "off"], missing: "on" },
            name: String,
            acceptCharset: { name: "accept-charset" },
            target: String,
            noValidate: Boolean,
            method: {
              type: ["get", "post", "dialog"],
              invalid: "get",
              missing: "get",
            },
            enctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "application/x-www-form-urlencoded",
            },
            encoding: {
              name: "enctype",
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "application/x-www-form-urlencoded",
            },
          },
        }),
        i({
          tag: "hr",
          name: "HTMLHRElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            align: String,
            color: String,
            noShade: Boolean,
            size: String,
            width: String,
          },
        }),
        i({
          tag: "head",
          name: "HTMLHeadElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        i({
          tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
          name: "HTMLHeadingElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { align: String },
        }),
        i({
          tag: "html",
          name: "HTMLHtmlElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { xmlns: b, version: String },
        }),
        i({
          tag: "iframe",
          name: "HTMLIFrameElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            src: b,
            srcdoc: String,
            name: String,
            width: String,
            height: String,
            seamless: Boolean,
            allow: Boolean,
            allowFullscreen: Boolean,
            allowUserMedia: Boolean,
            allowPaymentRequest: Boolean,
            referrerPolicy: w,
            loading: { type: ["eager", "lazy"], treatNullAsEmptyString: !0 },
            align: String,
            scrolling: String,
            frameBorder: String,
            longDesc: b,
            marginHeight: { type: String, treatNullAsEmptyString: !0 },
            marginWidth: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "img",
          name: "HTMLImageElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            alt: String,
            src: b,
            srcset: String,
            crossOrigin: d,
            useMap: String,
            isMap: Boolean,
            sizes: String,
            height: { type: "unsigned long", default: 0 },
            width: { type: "unsigned long", default: 0 },
            referrerPolicy: w,
            loading: { type: ["eager", "lazy"], missing: "" },
            name: String,
            lowsrc: b,
            align: String,
            hspace: { type: "unsigned long", default: 0 },
            vspace: { type: "unsigned long", default: 0 },
            longDesc: b,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "input",
          name: "HTMLInputElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: {
            form: U.form,
            _post_click_activation_steps: {
              value: function (T) {
                if (this.type === "checkbox") this.checked = !this.checked;
                else if (this.type === "radio")
                  for (
                    var p = this.form.getElementsByName(this.name),
                      S = p.length - 1;
                    S >= 0;
                    S--
                  ) {
                    var g = p[S];
                    g.checked = g === this;
                  }
              },
            },
          },
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            accept: String,
            alt: String,
            max: String,
            min: String,
            pattern: String,
            placeholder: String,
            step: String,
            dirName: String,
            defaultValue: { name: "value" },
            multiple: Boolean,
            required: Boolean,
            readOnly: Boolean,
            checked: Boolean,
            value: String,
            src: b,
            defaultChecked: { name: "checked", type: Boolean },
            size: { type: "unsigned long", default: 20, min: 1, setmin: 1 },
            width: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
            height: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
            minLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            maxLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            autocomplete: String,
            type: {
              type: [
                "text",
                "hidden",
                "search",
                "tel",
                "url",
                "email",
                "password",
                "datetime",
                "date",
                "month",
                "week",
                "time",
                "datetime-local",
                "number",
                "range",
                "color",
                "checkbox",
                "radio",
                "file",
                "submit",
                "image",
                "reset",
                "button",
              ],
              missing: "text",
            },
            formTarget: String,
            formNoValidate: Boolean,
            formMethod: { type: ["get", "post"], invalid: "get", missing: "" },
            formEnctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "",
            },
            inputMode: {
              type: [
                "verbatim",
                "latin",
                "latin-name",
                "latin-prose",
                "full-width-latin",
                "kana",
                "kana-name",
                "katakana",
                "numeric",
                "tel",
                "email",
                "url",
              ],
              missing: "",
            },
            align: String,
            useMap: String,
          },
        }),
        i({
          tag: "keygen",
          name: "HTMLKeygenElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            challenge: String,
            keytype: { type: ["rsa"], missing: "" },
          },
        }),
        i({
          tag: "li",
          name: "HTMLLIElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { value: { type: "long", default: 0 }, type: String },
        }),
        i({
          tag: "label",
          name: "HTMLLabelElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: { htmlFor: { name: "for", type: String } },
        }),
        i({
          tag: "legend",
          name: "HTMLLegendElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { align: String },
        }),
        i({
          tag: "link",
          name: "HTMLLinkElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            href: b,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            crossOrigin: d,
            nonce: String,
            integrity: String,
            referrerPolicy: w,
            imageSizes: String,
            imageSrcset: String,
            charset: String,
            rev: String,
            target: String,
          },
        }),
        i({
          tag: "map",
          name: "HTMLMapElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { name: String },
        }),
        i({
          tag: "menu",
          name: "HTMLMenuElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
            label: String,
            compact: Boolean,
          },
        }),
        i({
          tag: "meta",
          name: "HTMLMetaElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            name: String,
            content: String,
            httpEquiv: { name: "http-equiv", type: String },
            scheme: String,
          },
        }),
        i({
          tag: "meter",
          name: "HTMLMeterElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
        }),
        i({
          tags: ["ins", "del"],
          name: "HTMLModElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { cite: b, dateTime: String },
        }),
        i({
          tag: "ol",
          name: "HTMLOListElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            _numitems: {
              get: function () {
                var T = 0;
                return (
                  this.childNodes.forEach(function (p) {
                    p.nodeType === E.ELEMENT_NODE && p.tagName === "LI" && T++;
                  }),
                  T
                );
              },
            },
          },
          attributes: {
            type: String,
            reversed: Boolean,
            start: {
              type: "long",
              default: function () {
                return this.reversed ? this._numitems : 1;
              },
            },
            compact: Boolean,
          },
        }),
        i({
          tag: "object",
          name: "HTMLObjectElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: {
            data: b,
            type: String,
            name: String,
            useMap: String,
            typeMustMatch: Boolean,
            width: String,
            height: String,
            align: String,
            archive: String,
            code: String,
            declare: Boolean,
            hspace: { type: "unsigned long", default: 0 },
            standby: String,
            vspace: { type: "unsigned long", default: 0 },
            codeBase: b,
            codeType: String,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "optgroup",
          name: "HTMLOptGroupElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { disabled: Boolean, label: String },
        }),
        i({
          tag: "option",
          name: "HTMLOptionElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            form: {
              get: function () {
                for (
                  var T = this.parentNode;
                  T && T.nodeType === E.ELEMENT_NODE;

                ) {
                  if (T.localName === "select") return T.form;
                  T = T.parentNode;
                }
              },
            },
            value: {
              get: function () {
                return this._getattr("value") || this.text;
              },
              set: function (T) {
                this._setattr("value", T);
              },
            },
            text: {
              get: function () {
                return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
              },
              set: function (T) {
                this.textContent = T;
              },
            },
          },
          attributes: {
            disabled: Boolean,
            defaultSelected: { name: "selected", type: Boolean },
            label: String,
          },
        }),
        i({
          tag: "output",
          name: "HTMLOutputElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: { name: String },
        }),
        i({
          tag: "p",
          name: "HTMLParagraphElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { align: String },
        }),
        i({
          tag: "param",
          name: "HTMLParamElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            name: String,
            value: String,
            type: String,
            valueType: String,
          },
        }),
        i({
          tags: ["pre", "listing", "xmp"],
          name: "HTMLPreElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { width: { type: "long", default: 0 } },
        }),
        i({
          tag: "progress",
          name: "HTMLProgressElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: U,
          attributes: { max: { type: Number, float: !0, default: 1, min: 0 } },
        }),
        i({
          tags: ["q", "blockquote"],
          name: "HTMLQuoteElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { cite: b },
        }),
        i({
          tag: "script",
          name: "HTMLScriptElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            text: {
              get: function () {
                for (
                  var T = "", p = 0, S = this.childNodes.length;
                  p < S;
                  p++
                ) {
                  var g = this.childNodes[p];
                  g.nodeType === E.TEXT_NODE && (T += g._data);
                }
                return T;
              },
              set: function (T) {
                this.removeChildren(),
                  T !== null &&
                    T !== "" &&
                    this.appendChild(this.ownerDocument.createTextNode(T));
              },
            },
          },
          attributes: {
            src: b,
            type: String,
            charset: String,
            referrerPolicy: w,
            defer: Boolean,
            async: Boolean,
            nomodule: Boolean,
            crossOrigin: d,
            nonce: String,
            integrity: String,
          },
        }),
        i({
          tag: "select",
          name: "HTMLSelectElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: {
            form: U.form,
            options: {
              get: function () {
                return this.getElementsByTagName("option");
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            multiple: Boolean,
            required: Boolean,
            size: { type: "unsigned long", default: 0 },
          },
        }),
        i({
          tag: "span",
          name: "HTMLSpanElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        i({
          tag: "style",
          name: "HTMLStyleElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { media: String, type: String, scoped: Boolean },
        }),
        i({
          tag: "caption",
          name: "HTMLTableCaptionElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { align: String },
        }),
        i({
          name: "HTMLTableCellElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            colSpan: { type: "unsigned long", default: 1 },
            rowSpan: { type: "unsigned long", default: 1 },
            scope: {
              type: ["row", "col", "rowgroup", "colgroup"],
              missing: "",
            },
            abbr: String,
            align: String,
            axis: String,
            height: String,
            width: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            noWrap: Boolean,
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tags: ["col", "colgroup"],
          name: "HTMLTableColElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            span: {
              type: "limited unsigned long with fallback",
              default: 1,
              min: 1,
            },
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
            width: String,
          },
        }),
        i({
          tag: "table",
          name: "HTMLTableElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName("tr");
              },
            },
          },
          attributes: {
            align: String,
            border: String,
            frame: String,
            rules: String,
            summary: String,
            width: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            cellPadding: { type: String, treatNullAsEmptyString: !0 },
            cellSpacing: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "template",
          name: "HTMLTemplateElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g),
              (this._contentFragment = p._templateDoc.createDocumentFragment());
          },
          props: {
            content: {
              get: function () {
                return this._contentFragment;
              },
            },
            serialize: {
              value: function () {
                return this.content.serialize();
              },
            },
          },
        }),
        i({
          tag: "tr",
          name: "HTMLTableRowElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            cells: {
              get: function () {
                return this.querySelectorAll("td,th");
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tags: ["thead", "tfoot", "tbody"],
          name: "HTMLTableSectionElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName("tr");
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
          },
        }),
        i({
          tag: "textarea",
          name: "HTMLTextAreaElement",
          ctor: function (p, S, g) {
            q.call(this, p, S, g);
          },
          props: {
            form: U.form,
            type: {
              get: function () {
                return "textarea";
              },
            },
            defaultValue: {
              get: function () {
                return this.textContent;
              },
              set: function (T) {
                this.textContent = T;
              },
            },
            value: {
              get: function () {
                return this.defaultValue;
              },
              set: function (T) {
                this.defaultValue = T;
              },
            },
            textLength: {
              get: function () {
                return this.value.length;
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            placeholder: String,
            wrap: String,
            dirName: String,
            required: Boolean,
            readOnly: Boolean,
            rows: { type: "limited unsigned long with fallback", default: 2 },
            cols: { type: "limited unsigned long with fallback", default: 20 },
            maxLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            minLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            inputMode: {
              type: [
                "verbatim",
                "latin",
                "latin-name",
                "latin-prose",
                "full-width-latin",
                "kana",
                "kana-name",
                "katakana",
                "numeric",
                "tel",
                "email",
                "url",
              ],
              missing: "",
            },
          },
        }),
        i({
          tag: "time",
          name: "HTMLTimeElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { dateTime: String, pubDate: Boolean },
        }),
        i({
          tag: "title",
          name: "HTMLTitleElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            text: {
              get: function () {
                return this.textContent;
              },
            },
          },
        }),
        i({
          tag: "ul",
          name: "HTMLUListElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { type: String, compact: Boolean },
        }),
        i({
          name: "HTMLMediaElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            src: b,
            crossOrigin: d,
            preload: {
              type: ["metadata", "none", "auto", { value: "", alias: "auto" }],
              missing: "auto",
            },
            loop: Boolean,
            autoplay: Boolean,
            mediaGroup: String,
            controls: Boolean,
            defaultMuted: { name: "muted", type: Boolean },
          },
        }),
        i({
          name: "HTMLAudioElement",
          tag: "audio",
          superclass: l.HTMLMediaElement,
          ctor: function (p, S, g) {
            l.HTMLMediaElement.call(this, p, S, g);
          },
        }),
        i({
          name: "HTMLVideoElement",
          tag: "video",
          superclass: l.HTMLMediaElement,
          ctor: function (p, S, g) {
            l.HTMLMediaElement.call(this, p, S, g);
          },
          attributes: {
            poster: b,
            width: { type: "unsigned long", min: 0, default: 0 },
            height: { type: "unsigned long", min: 0, default: 0 },
          },
        }),
        i({
          tag: "td",
          name: "HTMLTableDataCellElement",
          superclass: l.HTMLTableCellElement,
          ctor: function (p, S, g) {
            l.HTMLTableCellElement.call(this, p, S, g);
          },
        }),
        i({
          tag: "th",
          name: "HTMLTableHeaderCellElement",
          superclass: l.HTMLTableCellElement,
          ctor: function (p, S, g) {
            l.HTMLTableCellElement.call(this, p, S, g);
          },
        }),
        i({
          tag: "frameset",
          name: "HTMLFrameSetElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        i({
          tag: "frame",
          name: "HTMLFrameElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
        }),
        i({
          tag: "canvas",
          name: "HTMLCanvasElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            getContext: { value: t.nyi },
            probablySupportsContext: { value: t.nyi },
            setContext: { value: t.nyi },
            transferControlToProxy: { value: t.nyi },
            toDataURL: { value: t.nyi },
            toBlob: { value: t.nyi },
          },
          attributes: {
            width: { type: "unsigned long", default: 300 },
            height: { type: "unsigned long", default: 150 },
          },
        }),
        i({
          tag: "dialog",
          name: "HTMLDialogElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            show: { value: t.nyi },
            showModal: { value: t.nyi },
            close: { value: t.nyi },
          },
          attributes: { open: Boolean, returnValue: String },
        }),
        i({
          tag: "menuitem",
          name: "HTMLMenuItemElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          props: {
            _label: {
              get: function () {
                var T = this._getattr("label");
                return T !== null && T !== ""
                  ? T
                  : ((T = this.textContent),
                    T.replace(/[ \t\n\f\r]+/g, " ").trim());
              },
            },
            label: {
              get: function () {
                var T = this._getattr("label");
                return T !== null ? T : this._label;
              },
              set: function (T) {
                this._setattr("label", T);
              },
            },
          },
          attributes: {
            type: {
              type: ["command", "checkbox", "radio"],
              missing: "command",
            },
            icon: b,
            disabled: Boolean,
            checked: Boolean,
            radiogroup: String,
            default: Boolean,
          },
        }),
        i({
          tag: "source",
          name: "HTMLSourceElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            srcset: String,
            sizes: String,
            media: String,
            src: b,
            type: String,
            width: String,
            height: String,
          },
        }),
        i({
          tag: "track",
          name: "HTMLTrackElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            src: b,
            srclang: String,
            label: String,
            default: Boolean,
            kind: {
              type: [
                "subtitles",
                "captions",
                "descriptions",
                "chapters",
                "metadata",
              ],
              missing: "subtitles",
              invalid: "metadata",
            },
          },
          props: {
            NONE: {
              get: function () {
                return 0;
              },
            },
            LOADING: {
              get: function () {
                return 1;
              },
            },
            LOADED: {
              get: function () {
                return 2;
              },
            },
            ERROR: {
              get: function () {
                return 3;
              },
            },
            readyState: { get: t.nyi },
            track: { get: t.nyi },
          },
        }),
        i({
          tag: "font",
          name: "HTMLFontElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: {
            color: { type: String, treatNullAsEmptyString: !0 },
            face: { type: String },
            size: { type: String },
          },
        }),
        i({
          tag: "dir",
          name: "HTMLDirectoryElement",
          ctor: function (p, S, g) {
            O.call(this, p, S, g);
          },
          attributes: { compact: Boolean },
        }),
        i({
          tags: [
            "abbr",
            "address",
            "article",
            "aside",
            "b",
            "bdi",
            "bdo",
            "cite",
            "content",
            "code",
            "dd",
            "dfn",
            "dt",
            "em",
            "figcaption",
            "figure",
            "footer",
            "header",
            "hgroup",
            "i",
            "kbd",
            "main",
            "mark",
            "nav",
            "noscript",
            "rb",
            "rp",
            "rt",
            "rtc",
            "ruby",
            "s",
            "samp",
            "section",
            "small",
            "strong",
            "sub",
            "summary",
            "sup",
            "u",
            "var",
            "wbr",
            "acronym",
            "basefont",
            "big",
            "center",
            "nobr",
            "noembed",
            "noframes",
            "plaintext",
            "strike",
            "tt",
          ],
        });
    },
  }),
  Oa = le({
    "external/npm/node_modules/domino/lib/svg.js"(_) {
      "use strict";
      var E = Er(),
        h = Ra(),
        s = Be(),
        t = Mn(),
        a = (_.elements = {}),
        c = Object.create(null);
      _.createElement = function (i, b, d) {
        var w = c[b] || f;
        return new w(i, b, d);
      };
      function l(i) {
        return h(i, f, a, c);
      }
      var f = l({
        superclass: E,
        name: "SVGElement",
        ctor: function (b, d, w) {
          E.call(this, b, d, s.NAMESPACE.SVG, w);
        },
        props: {
          style: {
            get: function () {
              return this._style || (this._style = new t(this)), this._style;
            },
          },
        },
      });
      l({
        name: "SVGSVGElement",
        ctor: function (b, d, w) {
          f.call(this, b, d, w);
        },
        tag: "svg",
        props: {
          createSVGRect: {
            value: function () {
              return _.createElement(this.ownerDocument, "rect", null);
            },
          },
        },
      }),
        l({
          tags: [
            "a",
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animate",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "circle",
            "clipPath",
            "color-profile",
            "cursor",
            "defs",
            "desc",
            "ellipse",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "filter",
            "font",
            "font-face",
            "font-face-format",
            "font-face-name",
            "font-face-src",
            "font-face-uri",
            "foreignObject",
            "g",
            "glyph",
            "glyphRef",
            "hkern",
            "image",
            "line",
            "linearGradient",
            "marker",
            "mask",
            "metadata",
            "missing-glyph",
            "mpath",
            "path",
            "pattern",
            "polygon",
            "polyline",
            "radialGradient",
            "rect",
            "script",
            "set",
            "stop",
            "style",
            "switch",
            "symbol",
            "text",
            "textPath",
            "title",
            "tref",
            "tspan",
            "use",
            "view",
            "vkern",
          ],
        });
    },
  }),
  Ss = le({
    "external/npm/node_modules/domino/lib/MutationConstants.js"(_, E) {
      "use strict";
      E.exports = {
        VALUE: 1,
        ATTR: 2,
        REMOVE_ATTR: 3,
        REMOVE: 4,
        MOVE: 5,
        INSERT: 6,
      };
    },
  }),
  In = le({
    "external/npm/node_modules/domino/lib/Document.js"(_, E) {
      "use strict";
      E.exports = G;
      var h = Ve(),
        s = ar(),
        t = kn(),
        a = Er(),
        c = La(),
        l = Ca(),
        f = br(),
        i = Da(),
        b = Aa(),
        d = tn(),
        w = Ts(),
        R = ys(),
        q = en(),
        O = An(),
        ee = Cn(),
        U = xa(),
        T = Ln(),
        p = xn(),
        S = Oa(),
        g = Be(),
        ae = Ss(),
        ne = g.NAMESPACE,
        Q = Sn().isApiWritable;
      function G(y, A) {
        t.call(this),
          (this.nodeType = h.DOCUMENT_NODE),
          (this.isHTML = y),
          (this._address = A || "about:blank"),
          (this.readyState = "loading"),
          (this.implementation = new d(this)),
          (this.ownerDocument = null),
          (this._contentType = y ? "text/html" : "application/xml"),
          (this.doctype = null),
          (this.documentElement = null),
          (this._templateDocCache = null),
          (this._nodeIterators = null),
          (this._nid = 1),
          (this._nextnid = 2),
          (this._nodes = [null, this]),
          (this.byId = Object.create(null)),
          (this.modclock = 0);
      }
      var D = {
          event: "Event",
          customevent: "CustomEvent",
          uievent: "UIEvent",
          mouseevent: "MouseEvent",
        },
        B = {
          events: "event",
          htmlevents: "event",
          mouseevents: "mouseevent",
          mutationevents: "mutationevent",
          uievents: "uievent",
        },
        W = function (y, A, K) {
          return {
            get: function () {
              var me = y.call(this);
              return me ? me[A] : K;
            },
            set: function (me) {
              var Ie = y.call(this);
              Ie && (Ie[A] = me);
            },
          };
        };
      function u(y, A) {
        var K, me, Ie;
        return (
          y === "" && (y = null),
          T.isValidQName(A) || g.InvalidCharacterError(),
          (K = null),
          (me = A),
          (Ie = A.indexOf(":")),
          Ie >= 0 && ((K = A.substring(0, Ie)), (me = A.substring(Ie + 1))),
          K !== null && y === null && g.NamespaceError(),
          K === "xml" && y !== ne.XML && g.NamespaceError(),
          (K === "xmlns" || A === "xmlns") &&
            y !== ne.XMLNS &&
            g.NamespaceError(),
          y === ne.XMLNS &&
            !(K === "xmlns" || A === "xmlns") &&
            g.NamespaceError(),
          { namespace: y, prefix: K, localName: me }
        );
      }
      G.prototype = Object.create(t.prototype, {
        _setMutationHandler: {
          value: function (y) {
            this.mutationHandler = y;
          },
        },
        _dispatchRendererEvent: {
          value: function (y, A, K) {
            var me = this._nodes[y];
            me && me._dispatchEvent(new f(A, K), !0);
          },
        },
        nodeName: { value: "#document" },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        documentURI: {
          get: function () {
            return this._address;
          },
          set: g.nyi,
        },
        compatMode: {
          get: function () {
            return this._quirks ? "BackCompat" : "CSS1Compat";
          },
        },
        createTextNode: {
          value: function (y) {
            return new c(this, String(y));
          },
        },
        createComment: {
          value: function (y) {
            return new l(this, y);
          },
        },
        createDocumentFragment: {
          value: function () {
            return new i(this);
          },
        },
        createProcessingInstruction: {
          value: function (y, A) {
            return (
              (!T.isValidName(y) || A.indexOf("?>") !== -1) &&
                g.InvalidCharacterError(),
              new b(this, y, A)
            );
          },
        },
        createAttribute: {
          value: function (y) {
            return (
              (y = String(y)),
              T.isValidName(y) || g.InvalidCharacterError(),
              this.isHTML && (y = g.toASCIILowerCase(y)),
              new a._Attr(null, y, null, null, "")
            );
          },
        },
        createAttributeNS: {
          value: function (y, A) {
            (y = y == null || y === "" ? null : String(y)), (A = String(A));
            var K = u(y, A);
            return new a._Attr(null, K.localName, K.prefix, K.namespace, "");
          },
        },
        createElement: {
          value: function (y) {
            return (
              (y = String(y)),
              T.isValidName(y) || g.InvalidCharacterError(),
              this.isHTML
                ? (/[A-Z]/.test(y) && (y = g.toASCIILowerCase(y)),
                  p.createElement(this, y, null))
                : this.contentType === "application/xhtml+xml"
                  ? p.createElement(this, y, null)
                  : new a(this, y, null, null)
            );
          },
          writable: Q,
        },
        createElementNS: {
          value: function (y, A) {
            (y = y == null || y === "" ? null : String(y)), (A = String(A));
            var K = u(y, A);
            return this._createElementNS(K.localName, K.namespace, K.prefix);
          },
          writable: Q,
        },
        _createElementNS: {
          value: function (y, A, K) {
            return A === ne.HTML
              ? p.createElement(this, y, K)
              : A === ne.SVG
                ? S.createElement(this, y, K)
                : new a(this, y, A, K);
          },
        },
        createEvent: {
          value: function (A) {
            A = A.toLowerCase();
            var K = B[A] || A,
              me = U[D[K]];
            if (me) {
              var Ie = new me();
              return (Ie._initialized = !1), Ie;
            } else g.NotSupportedError();
          },
        },
        createTreeWalker: {
          value: function (y, A, K) {
            if (!y) throw new TypeError("root argument is required");
            if (!(y instanceof h)) throw new TypeError("root not a node");
            return (
              (A = A === void 0 ? q.SHOW_ALL : +A),
              (K = K === void 0 ? null : K),
              new w(y, A, K)
            );
          },
        },
        createNodeIterator: {
          value: function (y, A, K) {
            if (!y) throw new TypeError("root argument is required");
            if (!(y instanceof h)) throw new TypeError("root not a node");
            return (
              (A = A === void 0 ? q.SHOW_ALL : +A),
              (K = K === void 0 ? null : K),
              new R(y, A, K)
            );
          },
        },
        _attachNodeIterator: {
          value: function (y) {
            this._nodeIterators || (this._nodeIterators = []),
              this._nodeIterators.push(y);
          },
        },
        _detachNodeIterator: {
          value: function (y) {
            var A = this._nodeIterators.indexOf(y);
            this._nodeIterators.splice(A, 1);
          },
        },
        _preremoveNodeIterators: {
          value: function (y) {
            this._nodeIterators &&
              this._nodeIterators.forEach(function (A) {
                A._preremove(y);
              });
          },
        },
        _updateDocTypeElement: {
          value: function () {
            this.doctype = this.documentElement = null;
            for (var A = this.firstChild; A !== null; A = A.nextSibling)
              A.nodeType === h.DOCUMENT_TYPE_NODE
                ? (this.doctype = A)
                : A.nodeType === h.ELEMENT_NODE && (this.documentElement = A);
          },
        },
        insertBefore: {
          value: function (A, K) {
            return (
              h.prototype.insertBefore.call(this, A, K),
              this._updateDocTypeElement(),
              A
            );
          },
        },
        replaceChild: {
          value: function (A, K) {
            return (
              h.prototype.replaceChild.call(this, A, K),
              this._updateDocTypeElement(),
              K
            );
          },
        },
        removeChild: {
          value: function (A) {
            return (
              h.prototype.removeChild.call(this, A),
              this._updateDocTypeElement(),
              A
            );
          },
        },
        getElementById: {
          value: function (y) {
            var A = this.byId[y];
            return A ? (A instanceof z ? A.getFirst() : A) : null;
          },
        },
        _hasMultipleElementsWithId: {
          value: function (y) {
            return this.byId[y] instanceof z;
          },
        },
        getElementsByName: { value: a.prototype.getElementsByName },
        getElementsByTagName: { value: a.prototype.getElementsByTagName },
        getElementsByTagNameNS: { value: a.prototype.getElementsByTagNameNS },
        getElementsByClassName: { value: a.prototype.getElementsByClassName },
        adoptNode: {
          value: function (A) {
            return (
              A.nodeType === h.DOCUMENT_NODE && g.NotSupportedError(),
              A.nodeType === h.ATTRIBUTE_NODE ||
                (A.parentNode && A.parentNode.removeChild(A),
                A.ownerDocument !== this && M(A, this)),
              A
            );
          },
        },
        importNode: {
          value: function (A, K) {
            return this.adoptNode(A.cloneNode(K));
          },
          writable: Q,
        },
        origin: {
          get: function () {
            return null;
          },
        },
        characterSet: {
          get: function () {
            return "UTF-8";
          },
        },
        contentType: {
          get: function () {
            return this._contentType;
          },
        },
        URL: {
          get: function () {
            return this._address;
          },
        },
        domain: { get: g.nyi, set: g.nyi },
        referrer: { get: g.nyi },
        cookie: { get: g.nyi, set: g.nyi },
        lastModified: { get: g.nyi },
        location: {
          get: function () {
            return this.defaultView ? this.defaultView.location : null;
          },
          set: g.nyi,
        },
        _titleElement: {
          get: function () {
            return this.getElementsByTagName("title").item(0) || null;
          },
        },
        title: {
          get: function () {
            var y = this._titleElement,
              A = y ? y.textContent : "";
            return A.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
          },
          set: function (y) {
            var A = this._titleElement,
              K = this.head;
            (!A && !K) ||
              (A || ((A = this.createElement("title")), K.appendChild(A)),
              (A.textContent = y));
          },
        },
        dir: W(
          function () {
            var y = this.documentElement;
            if (y && y.tagName === "HTML") return y;
          },
          "dir",
          "",
        ),
        fgColor: W(
          function () {
            return this.body;
          },
          "text",
          "",
        ),
        linkColor: W(
          function () {
            return this.body;
          },
          "link",
          "",
        ),
        vlinkColor: W(
          function () {
            return this.body;
          },
          "vLink",
          "",
        ),
        alinkColor: W(
          function () {
            return this.body;
          },
          "aLink",
          "",
        ),
        bgColor: W(
          function () {
            return this.body;
          },
          "bgColor",
          "",
        ),
        charset: {
          get: function () {
            return this.characterSet;
          },
        },
        inputEncoding: {
          get: function () {
            return this.characterSet;
          },
        },
        scrollingElement: {
          get: function () {
            return this._quirks ? this.body : this.documentElement;
          },
        },
        body: {
          get: function () {
            return n(this.documentElement, "body");
          },
          set: g.nyi,
        },
        head: {
          get: function () {
            return n(this.documentElement, "head");
          },
        },
        images: { get: g.nyi },
        embeds: { get: g.nyi },
        plugins: { get: g.nyi },
        links: { get: g.nyi },
        forms: { get: g.nyi },
        scripts: { get: g.nyi },
        applets: {
          get: function () {
            return [];
          },
        },
        activeElement: {
          get: function () {
            return null;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: g.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: g.nyi,
        },
        write: {
          value: function (y) {
            if ((this.isHTML || g.InvalidStateError(), !!this._parser)) {
              this._parser;
              var A = arguments.join("");
              this._parser.parse(A);
            }
          },
        },
        writeln: {
          value: function (A) {
            this.write(
              Array.prototype.join.call(arguments, "") +
                `
`,
            );
          },
        },
        open: {
          value: function () {
            this.documentElement = null;
          },
        },
        close: {
          value: function () {
            (this.readyState = "interactive"),
              this._dispatchEvent(new f("readystatechange"), !0),
              this._dispatchEvent(new f("DOMContentLoaded"), !0),
              (this.readyState = "complete"),
              this._dispatchEvent(new f("readystatechange"), !0),
              this.defaultView &&
                this.defaultView._dispatchEvent(new f("load"), !0);
          },
        },
        clone: {
          value: function () {
            var A = new G(this.isHTML, this._address);
            return (
              (A._quirks = this._quirks),
              (A._contentType = this._contentType),
              A
            );
          },
        },
        cloneNode: {
          value: function (A) {
            var K = h.prototype.cloneNode.call(this, !1);
            if (A)
              for (var me = this.firstChild; me !== null; me = me.nextSibling)
                K._appendChild(K.importNode(me, !0));
            return K._updateDocTypeElement(), K;
          },
        },
        isEqual: {
          value: function (A) {
            return !0;
          },
        },
        mutateValue: {
          value: function (y) {
            this.mutationHandler &&
              this.mutationHandler({ type: ae.VALUE, target: y, data: y.data });
          },
        },
        mutateAttr: {
          value: function (y, A) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.ATTR,
                target: y.ownerElement,
                attr: y,
              });
          },
        },
        mutateRemoveAttr: {
          value: function (y) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.REMOVE_ATTR,
                target: y.ownerElement,
                attr: y,
              });
          },
        },
        mutateRemove: {
          value: function (y) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.REMOVE,
                target: y.parentNode,
                node: y,
              }),
              C(y);
          },
        },
        mutateInsert: {
          value: function (y) {
            v(y),
              this.mutationHandler &&
                this.mutationHandler({
                  type: ae.INSERT,
                  target: y.parentNode,
                  node: y,
                });
          },
        },
        mutateMove: {
          value: function (y) {
            this.mutationHandler &&
              this.mutationHandler({ type: ae.MOVE, target: y });
          },
        },
        addId: {
          value: function (A, K) {
            var me = this.byId[A];
            me
              ? (me instanceof z || ((me = new z(me)), (this.byId[A] = me)),
                me.add(K))
              : (this.byId[A] = K);
          },
        },
        delId: {
          value: function (A, K) {
            var me = this.byId[A];
            g.assert(me),
              me instanceof z
                ? (me.del(K),
                  me.length === 1 && (this.byId[A] = me.downgrade()))
                : (this.byId[A] = void 0);
          },
        },
        _resolve: {
          value: function (y) {
            return new O(this._documentBaseURL).resolve(y);
          },
        },
        _documentBaseURL: {
          get: function () {
            var y = this._address;
            y === "about:blank" && (y = "/");
            var A = this.querySelector("base[href]");
            return A ? new O(y).resolve(A.getAttribute("href")) : y;
          },
        },
        _templateDoc: {
          get: function () {
            if (!this._templateDocCache) {
              var y = new G(this.isHTML, this._address);
              this._templateDocCache = y._templateDocCache = y;
            }
            return this._templateDocCache;
          },
        },
        querySelector: {
          value: function (y) {
            return ee(y, this)[0];
          },
        },
        querySelectorAll: {
          value: function (y) {
            var A = ee(y, this);
            return A.item ? A : new s(A);
          },
        },
      });
      var o = [
        "abort",
        "canplay",
        "canplaythrough",
        "change",
        "click",
        "contextmenu",
        "cuechange",
        "dblclick",
        "drag",
        "dragend",
        "dragenter",
        "dragleave",
        "dragover",
        "dragstart",
        "drop",
        "durationchange",
        "emptied",
        "ended",
        "input",
        "invalid",
        "keydown",
        "keypress",
        "keyup",
        "loadeddata",
        "loadedmetadata",
        "loadstart",
        "mousedown",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "mousewheel",
        "pause",
        "play",
        "playing",
        "progress",
        "ratechange",
        "readystatechange",
        "reset",
        "seeked",
        "seeking",
        "select",
        "show",
        "stalled",
        "submit",
        "suspend",
        "timeupdate",
        "volumechange",
        "waiting",
        "blur",
        "error",
        "focus",
        "load",
        "scroll",
      ];
      o.forEach(function (y) {
        Object.defineProperty(G.prototype, "on" + y, {
          get: function () {
            return this._getEventHandler(y);
          },
          set: function (A) {
            this._setEventHandler(y, A);
          },
        });
      });
      function n(y, A) {
        if (y && y.isHTML) {
          for (var K = y.firstChild; K !== null; K = K.nextSibling)
            if (
              K.nodeType === h.ELEMENT_NODE &&
              K.localName === A &&
              K.namespaceURI === ne.HTML
            )
              return K;
        }
        return null;
      }
      function m(y) {
        if (
          ((y._nid = y.ownerDocument._nextnid++),
          (y.ownerDocument._nodes[y._nid] = y),
          y.nodeType === h.ELEMENT_NODE)
        ) {
          var A = y.getAttribute("id");
          A && y.ownerDocument.addId(A, y), y._roothook && y._roothook();
        }
      }
      function L(y) {
        if (y.nodeType === h.ELEMENT_NODE) {
          var A = y.getAttribute("id");
          A && y.ownerDocument.delId(A, y);
        }
        (y.ownerDocument._nodes[y._nid] = void 0), (y._nid = void 0);
      }
      function v(y) {
        if ((m(y), y.nodeType === h.ELEMENT_NODE))
          for (var A = y.firstChild; A !== null; A = A.nextSibling) v(A);
      }
      function C(y) {
        L(y);
        for (var A = y.firstChild; A !== null; A = A.nextSibling) C(A);
      }
      function M(y, A) {
        (y.ownerDocument = A),
          (y._lastModTime = void 0),
          Object.prototype.hasOwnProperty.call(y, "_tagName") &&
            (y._tagName = void 0);
        for (var K = y.firstChild; K !== null; K = K.nextSibling) M(K, A);
      }
      function z(y) {
        (this.nodes = Object.create(null)),
          (this.nodes[y._nid] = y),
          (this.length = 1),
          (this.firstNode = void 0);
      }
      (z.prototype.add = function (y) {
        this.nodes[y._nid] ||
          ((this.nodes[y._nid] = y), this.length++, (this.firstNode = void 0));
      }),
        (z.prototype.del = function (y) {
          this.nodes[y._nid] &&
            (delete this.nodes[y._nid],
            this.length--,
            (this.firstNode = void 0));
        }),
        (z.prototype.getFirst = function () {
          if (!this.firstNode) {
            var y;
            for (y in this.nodes)
              (this.firstNode === void 0 ||
                this.firstNode.compareDocumentPosition(this.nodes[y]) &
                  h.DOCUMENT_POSITION_PRECEDING) &&
                (this.firstNode = this.nodes[y]);
          }
          return this.firstNode;
        }),
        (z.prototype.downgrade = function () {
          if (this.length === 1) {
            var y;
            for (y in this.nodes) return this.nodes[y];
          }
          return this;
        });
    },
  }),
  Rn = le({
    "external/npm/node_modules/domino/lib/DocumentType.js"(_, E) {
      "use strict";
      E.exports = a;
      var h = Ve(),
        s = ka(),
        t = Dn();
      function a(c, l, f, i) {
        s.call(this),
          (this.nodeType = h.DOCUMENT_TYPE_NODE),
          (this.ownerDocument = c || null),
          (this.name = l),
          (this.publicId = f || ""),
          (this.systemId = i || "");
      }
      (a.prototype = Object.create(s.prototype, {
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        clone: {
          value: function () {
            return new a(
              this.ownerDocument,
              this.name,
              this.publicId,
              this.systemId,
            );
          },
        },
        isEqual: {
          value: function (l) {
            return (
              this.name === l.name &&
              this.publicId === l.publicId &&
              this.systemId === l.systemId
            );
          },
        },
      })),
        Object.defineProperties(a.prototype, t);
    },
  }),
  On = le({
    "external/npm/node_modules/domino/lib/HTMLParser.js"(_, E) {
      "use strict";
      E.exports = de;
      var h = In(),
        s = Rn(),
        t = Ve(),
        a = Be().NAMESPACE,
        c = xn(),
        l = c.elements,
        f = Function.prototype.apply.bind(Array.prototype.push),
        i = -1,
        b = 1,
        d = 2,
        w = 3,
        R = 4,
        q = 5,
        O = [],
        ee =
          /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i,
        U = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
        T =
          /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i,
        p =
          /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i,
        S = Object.create(null);
      (S[a.HTML] = {
        __proto__: null,
        address: !0,
        applet: !0,
        area: !0,
        article: !0,
        aside: !0,
        base: !0,
        basefont: !0,
        bgsound: !0,
        blockquote: !0,
        body: !0,
        br: !0,
        button: !0,
        caption: !0,
        center: !0,
        col: !0,
        colgroup: !0,
        dd: !0,
        details: !0,
        dir: !0,
        div: !0,
        dl: !0,
        dt: !0,
        embed: !0,
        fieldset: !0,
        figcaption: !0,
        figure: !0,
        footer: !0,
        form: !0,
        frame: !0,
        frameset: !0,
        h1: !0,
        h2: !0,
        h3: !0,
        h4: !0,
        h5: !0,
        h6: !0,
        head: !0,
        header: !0,
        hgroup: !0,
        hr: !0,
        html: !0,
        iframe: !0,
        img: !0,
        input: !0,
        li: !0,
        link: !0,
        listing: !0,
        main: !0,
        marquee: !0,
        menu: !0,
        meta: !0,
        nav: !0,
        noembed: !0,
        noframes: !0,
        noscript: !0,
        object: !0,
        ol: !0,
        p: !0,
        param: !0,
        plaintext: !0,
        pre: !0,
        script: !0,
        section: !0,
        select: !0,
        source: !0,
        style: !0,
        summary: !0,
        table: !0,
        tbody: !0,
        td: !0,
        template: !0,
        textarea: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        title: !0,
        tr: !0,
        track: !0,
        ul: !0,
        wbr: !0,
        xmp: !0,
      }),
        (S[a.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        }),
        (S[a.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        });
      var g = Object.create(null);
      g[a.HTML] = { __proto__: null, address: !0, div: !0, p: !0 };
      var ae = Object.create(null);
      ae[a.HTML] = { __proto__: null, dd: !0, dt: !0 };
      var ne = Object.create(null);
      ne[a.HTML] = {
        __proto__: null,
        table: !0,
        thead: !0,
        tbody: !0,
        tfoot: !0,
        tr: !0,
      };
      var Q = Object.create(null);
      Q[a.HTML] = {
        __proto__: null,
        dd: !0,
        dt: !0,
        li: !0,
        menuitem: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
      };
      var G = Object.create(null);
      G[a.HTML] = {
        __proto__: null,
        caption: !0,
        colgroup: !0,
        dd: !0,
        dt: !0,
        li: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
        tbody: !0,
        td: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        tr: !0,
      };
      var D = Object.create(null);
      D[a.HTML] = { __proto__: null, table: !0, template: !0, html: !0 };
      var B = Object.create(null);
      B[a.HTML] = {
        __proto__: null,
        tbody: !0,
        tfoot: !0,
        thead: !0,
        template: !0,
        html: !0,
      };
      var W = Object.create(null);
      W[a.HTML] = { __proto__: null, tr: !0, template: !0, html: !0 };
      var u = Object.create(null);
      u[a.HTML] = {
        __proto__: null,
        button: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        object: !0,
        output: !0,
        select: !0,
        textarea: !0,
        img: !0,
      };
      var o = Object.create(null);
      (o[a.HTML] = {
        __proto__: null,
        applet: !0,
        caption: !0,
        html: !0,
        table: !0,
        td: !0,
        th: !0,
        marquee: !0,
        object: !0,
        template: !0,
      }),
        (o[a.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        }),
        (o[a.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        });
      var n = Object.create(o);
      (n[a.HTML] = Object.create(o[a.HTML])),
        (n[a.HTML].ol = !0),
        (n[a.HTML].ul = !0);
      var m = Object.create(o);
      (m[a.HTML] = Object.create(o[a.HTML])), (m[a.HTML].button = !0);
      var L = Object.create(null);
      L[a.HTML] = { __proto__: null, html: !0, table: !0, template: !0 };
      var v = Object.create(null);
      v[a.HTML] = { __proto__: null, optgroup: !0, option: !0 };
      var C = Object.create(null);
      C[a.MATHML] = {
        __proto__: null,
        mi: !0,
        mo: !0,
        mn: !0,
        ms: !0,
        mtext: !0,
      };
      var M = Object.create(null);
      M[a.SVG] = { __proto__: null, foreignObject: !0, desc: !0, title: !0 };
      var z = {
          __proto__: null,
          "xlink:actuate": a.XLINK,
          "xlink:arcrole": a.XLINK,
          "xlink:href": a.XLINK,
          "xlink:role": a.XLINK,
          "xlink:show": a.XLINK,
          "xlink:title": a.XLINK,
          "xlink:type": a.XLINK,
          "xml:base": a.XML,
          "xml:lang": a.XML,
          "xml:space": a.XML,
          xmlns: a.XMLNS,
          "xmlns:xlink": a.XMLNS,
        },
        y = {
          __proto__: null,
          attributename: "attributeName",
          attributetype: "attributeType",
          basefrequency: "baseFrequency",
          baseprofile: "baseProfile",
          calcmode: "calcMode",
          clippathunits: "clipPathUnits",
          diffuseconstant: "diffuseConstant",
          edgemode: "edgeMode",
          filterunits: "filterUnits",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          limitingconeangle: "limitingConeAngle",
          markerheight: "markerHeight",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          numoctaves: "numOctaves",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          refx: "refX",
          refy: "refY",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stitchtiles: "stitchTiles",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textlength: "textLength",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          xchannelselector: "xChannelSelector",
          ychannelselector: "yChannelSelector",
          zoomandpan: "zoomAndPan",
        },
        A = {
          __proto__: null,
          altglyph: "altGlyph",
          altglyphdef: "altGlyphDef",
          altglyphitem: "altGlyphItem",
          animatecolor: "animateColor",
          animatemotion: "animateMotion",
          animatetransform: "animateTransform",
          clippath: "clipPath",
          feblend: "feBlend",
          fecolormatrix: "feColorMatrix",
          fecomponenttransfer: "feComponentTransfer",
          fecomposite: "feComposite",
          feconvolvematrix: "feConvolveMatrix",
          fediffuselighting: "feDiffuseLighting",
          fedisplacementmap: "feDisplacementMap",
          fedistantlight: "feDistantLight",
          feflood: "feFlood",
          fefunca: "feFuncA",
          fefuncb: "feFuncB",
          fefuncg: "feFuncG",
          fefuncr: "feFuncR",
          fegaussianblur: "feGaussianBlur",
          feimage: "feImage",
          femerge: "feMerge",
          femergenode: "feMergeNode",
          femorphology: "feMorphology",
          feoffset: "feOffset",
          fepointlight: "fePointLight",
          fespecularlighting: "feSpecularLighting",
          fespotlight: "feSpotLight",
          fetile: "feTile",
          feturbulence: "feTurbulence",
          foreignobject: "foreignObject",
          glyphref: "glyphRef",
          lineargradient: "linearGradient",
          radialgradient: "radialGradient",
          textpath: "textPath",
        },
        K = {
          __proto__: null,
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        },
        me = {
          __proto__: null,
          AElig: 198,
          "AElig;": 198,
          AMP: 38,
          "AMP;": 38,
          Aacute: 193,
          "Aacute;": 193,
          "Abreve;": 258,
          Acirc: 194,
          "Acirc;": 194,
          "Acy;": 1040,
          "Afr;": [55349, 56580],
          Agrave: 192,
          "Agrave;": 192,
          "Alpha;": 913,
          "Amacr;": 256,
          "And;": 10835,
          "Aogon;": 260,
          "Aopf;": [55349, 56632],
          "ApplyFunction;": 8289,
          Aring: 197,
          "Aring;": 197,
          "Ascr;": [55349, 56476],
          "Assign;": 8788,
          Atilde: 195,
          "Atilde;": 195,
          Auml: 196,
          "Auml;": 196,
          "Backslash;": 8726,
          "Barv;": 10983,
          "Barwed;": 8966,
          "Bcy;": 1041,
          "Because;": 8757,
          "Bernoullis;": 8492,
          "Beta;": 914,
          "Bfr;": [55349, 56581],
          "Bopf;": [55349, 56633],
          "Breve;": 728,
          "Bscr;": 8492,
          "Bumpeq;": 8782,
          "CHcy;": 1063,
          COPY: 169,
          "COPY;": 169,
          "Cacute;": 262,
          "Cap;": 8914,
          "CapitalDifferentialD;": 8517,
          "Cayleys;": 8493,
          "Ccaron;": 268,
          Ccedil: 199,
          "Ccedil;": 199,
          "Ccirc;": 264,
          "Cconint;": 8752,
          "Cdot;": 266,
          "Cedilla;": 184,
          "CenterDot;": 183,
          "Cfr;": 8493,
          "Chi;": 935,
          "CircleDot;": 8857,
          "CircleMinus;": 8854,
          "CirclePlus;": 8853,
          "CircleTimes;": 8855,
          "ClockwiseContourIntegral;": 8754,
          "CloseCurlyDoubleQuote;": 8221,
          "CloseCurlyQuote;": 8217,
          "Colon;": 8759,
          "Colone;": 10868,
          "Congruent;": 8801,
          "Conint;": 8751,
          "ContourIntegral;": 8750,
          "Copf;": 8450,
          "Coproduct;": 8720,
          "CounterClockwiseContourIntegral;": 8755,
          "Cross;": 10799,
          "Cscr;": [55349, 56478],
          "Cup;": 8915,
          "CupCap;": 8781,
          "DD;": 8517,
          "DDotrahd;": 10513,
          "DJcy;": 1026,
          "DScy;": 1029,
          "DZcy;": 1039,
          "Dagger;": 8225,
          "Darr;": 8609,
          "Dashv;": 10980,
          "Dcaron;": 270,
          "Dcy;": 1044,
          "Del;": 8711,
          "Delta;": 916,
          "Dfr;": [55349, 56583],
          "DiacriticalAcute;": 180,
          "DiacriticalDot;": 729,
          "DiacriticalDoubleAcute;": 733,
          "DiacriticalGrave;": 96,
          "DiacriticalTilde;": 732,
          "Diamond;": 8900,
          "DifferentialD;": 8518,
          "Dopf;": [55349, 56635],
          "Dot;": 168,
          "DotDot;": 8412,
          "DotEqual;": 8784,
          "DoubleContourIntegral;": 8751,
          "DoubleDot;": 168,
          "DoubleDownArrow;": 8659,
          "DoubleLeftArrow;": 8656,
          "DoubleLeftRightArrow;": 8660,
          "DoubleLeftTee;": 10980,
          "DoubleLongLeftArrow;": 10232,
          "DoubleLongLeftRightArrow;": 10234,
          "DoubleLongRightArrow;": 10233,
          "DoubleRightArrow;": 8658,
          "DoubleRightTee;": 8872,
          "DoubleUpArrow;": 8657,
          "DoubleUpDownArrow;": 8661,
          "DoubleVerticalBar;": 8741,
          "DownArrow;": 8595,
          "DownArrowBar;": 10515,
          "DownArrowUpArrow;": 8693,
          "DownBreve;": 785,
          "DownLeftRightVector;": 10576,
          "DownLeftTeeVector;": 10590,
          "DownLeftVector;": 8637,
          "DownLeftVectorBar;": 10582,
          "DownRightTeeVector;": 10591,
          "DownRightVector;": 8641,
          "DownRightVectorBar;": 10583,
          "DownTee;": 8868,
          "DownTeeArrow;": 8615,
          "Downarrow;": 8659,
          "Dscr;": [55349, 56479],
          "Dstrok;": 272,
          "ENG;": 330,
          ETH: 208,
          "ETH;": 208,
          Eacute: 201,
          "Eacute;": 201,
          "Ecaron;": 282,
          Ecirc: 202,
          "Ecirc;": 202,
          "Ecy;": 1069,
          "Edot;": 278,
          "Efr;": [55349, 56584],
          Egrave: 200,
          "Egrave;": 200,
          "Element;": 8712,
          "Emacr;": 274,
          "EmptySmallSquare;": 9723,
          "EmptyVerySmallSquare;": 9643,
          "Eogon;": 280,
          "Eopf;": [55349, 56636],
          "Epsilon;": 917,
          "Equal;": 10869,
          "EqualTilde;": 8770,
          "Equilibrium;": 8652,
          "Escr;": 8496,
          "Esim;": 10867,
          "Eta;": 919,
          Euml: 203,
          "Euml;": 203,
          "Exists;": 8707,
          "ExponentialE;": 8519,
          "Fcy;": 1060,
          "Ffr;": [55349, 56585],
          "FilledSmallSquare;": 9724,
          "FilledVerySmallSquare;": 9642,
          "Fopf;": [55349, 56637],
          "ForAll;": 8704,
          "Fouriertrf;": 8497,
          "Fscr;": 8497,
          "GJcy;": 1027,
          GT: 62,
          "GT;": 62,
          "Gamma;": 915,
          "Gammad;": 988,
          "Gbreve;": 286,
          "Gcedil;": 290,
          "Gcirc;": 284,
          "Gcy;": 1043,
          "Gdot;": 288,
          "Gfr;": [55349, 56586],
          "Gg;": 8921,
          "Gopf;": [55349, 56638],
          "GreaterEqual;": 8805,
          "GreaterEqualLess;": 8923,
          "GreaterFullEqual;": 8807,
          "GreaterGreater;": 10914,
          "GreaterLess;": 8823,
          "GreaterSlantEqual;": 10878,
          "GreaterTilde;": 8819,
          "Gscr;": [55349, 56482],
          "Gt;": 8811,
          "HARDcy;": 1066,
          "Hacek;": 711,
          "Hat;": 94,
          "Hcirc;": 292,
          "Hfr;": 8460,
          "HilbertSpace;": 8459,
          "Hopf;": 8461,
          "HorizontalLine;": 9472,
          "Hscr;": 8459,
          "Hstrok;": 294,
          "HumpDownHump;": 8782,
          "HumpEqual;": 8783,
          "IEcy;": 1045,
          "IJlig;": 306,
          "IOcy;": 1025,
          Iacute: 205,
          "Iacute;": 205,
          Icirc: 206,
          "Icirc;": 206,
          "Icy;": 1048,
          "Idot;": 304,
          "Ifr;": 8465,
          Igrave: 204,
          "Igrave;": 204,
          "Im;": 8465,
          "Imacr;": 298,
          "ImaginaryI;": 8520,
          "Implies;": 8658,
          "Int;": 8748,
          "Integral;": 8747,
          "Intersection;": 8898,
          "InvisibleComma;": 8291,
          "InvisibleTimes;": 8290,
          "Iogon;": 302,
          "Iopf;": [55349, 56640],
          "Iota;": 921,
          "Iscr;": 8464,
          "Itilde;": 296,
          "Iukcy;": 1030,
          Iuml: 207,
          "Iuml;": 207,
          "Jcirc;": 308,
          "Jcy;": 1049,
          "Jfr;": [55349, 56589],
          "Jopf;": [55349, 56641],
          "Jscr;": [55349, 56485],
          "Jsercy;": 1032,
          "Jukcy;": 1028,
          "KHcy;": 1061,
          "KJcy;": 1036,
          "Kappa;": 922,
          "Kcedil;": 310,
          "Kcy;": 1050,
          "Kfr;": [55349, 56590],
          "Kopf;": [55349, 56642],
          "Kscr;": [55349, 56486],
          "LJcy;": 1033,
          LT: 60,
          "LT;": 60,
          "Lacute;": 313,
          "Lambda;": 923,
          "Lang;": 10218,
          "Laplacetrf;": 8466,
          "Larr;": 8606,
          "Lcaron;": 317,
          "Lcedil;": 315,
          "Lcy;": 1051,
          "LeftAngleBracket;": 10216,
          "LeftArrow;": 8592,
          "LeftArrowBar;": 8676,
          "LeftArrowRightArrow;": 8646,
          "LeftCeiling;": 8968,
          "LeftDoubleBracket;": 10214,
          "LeftDownTeeVector;": 10593,
          "LeftDownVector;": 8643,
          "LeftDownVectorBar;": 10585,
          "LeftFloor;": 8970,
          "LeftRightArrow;": 8596,
          "LeftRightVector;": 10574,
          "LeftTee;": 8867,
          "LeftTeeArrow;": 8612,
          "LeftTeeVector;": 10586,
          "LeftTriangle;": 8882,
          "LeftTriangleBar;": 10703,
          "LeftTriangleEqual;": 8884,
          "LeftUpDownVector;": 10577,
          "LeftUpTeeVector;": 10592,
          "LeftUpVector;": 8639,
          "LeftUpVectorBar;": 10584,
          "LeftVector;": 8636,
          "LeftVectorBar;": 10578,
          "Leftarrow;": 8656,
          "Leftrightarrow;": 8660,
          "LessEqualGreater;": 8922,
          "LessFullEqual;": 8806,
          "LessGreater;": 8822,
          "LessLess;": 10913,
          "LessSlantEqual;": 10877,
          "LessTilde;": 8818,
          "Lfr;": [55349, 56591],
          "Ll;": 8920,
          "Lleftarrow;": 8666,
          "Lmidot;": 319,
          "LongLeftArrow;": 10229,
          "LongLeftRightArrow;": 10231,
          "LongRightArrow;": 10230,
          "Longleftarrow;": 10232,
          "Longleftrightarrow;": 10234,
          "Longrightarrow;": 10233,
          "Lopf;": [55349, 56643],
          "LowerLeftArrow;": 8601,
          "LowerRightArrow;": 8600,
          "Lscr;": 8466,
          "Lsh;": 8624,
          "Lstrok;": 321,
          "Lt;": 8810,
          "Map;": 10501,
          "Mcy;": 1052,
          "MediumSpace;": 8287,
          "Mellintrf;": 8499,
          "Mfr;": [55349, 56592],
          "MinusPlus;": 8723,
          "Mopf;": [55349, 56644],
          "Mscr;": 8499,
          "Mu;": 924,
          "NJcy;": 1034,
          "Nacute;": 323,
          "Ncaron;": 327,
          "Ncedil;": 325,
          "Ncy;": 1053,
          "NegativeMediumSpace;": 8203,
          "NegativeThickSpace;": 8203,
          "NegativeThinSpace;": 8203,
          "NegativeVeryThinSpace;": 8203,
          "NestedGreaterGreater;": 8811,
          "NestedLessLess;": 8810,
          "NewLine;": 10,
          "Nfr;": [55349, 56593],
          "NoBreak;": 8288,
          "NonBreakingSpace;": 160,
          "Nopf;": 8469,
          "Not;": 10988,
          "NotCongruent;": 8802,
          "NotCupCap;": 8813,
          "NotDoubleVerticalBar;": 8742,
          "NotElement;": 8713,
          "NotEqual;": 8800,
          "NotEqualTilde;": [8770, 824],
          "NotExists;": 8708,
          "NotGreater;": 8815,
          "NotGreaterEqual;": 8817,
          "NotGreaterFullEqual;": [8807, 824],
          "NotGreaterGreater;": [8811, 824],
          "NotGreaterLess;": 8825,
          "NotGreaterSlantEqual;": [10878, 824],
          "NotGreaterTilde;": 8821,
          "NotHumpDownHump;": [8782, 824],
          "NotHumpEqual;": [8783, 824],
          "NotLeftTriangle;": 8938,
          "NotLeftTriangleBar;": [10703, 824],
          "NotLeftTriangleEqual;": 8940,
          "NotLess;": 8814,
          "NotLessEqual;": 8816,
          "NotLessGreater;": 8824,
          "NotLessLess;": [8810, 824],
          "NotLessSlantEqual;": [10877, 824],
          "NotLessTilde;": 8820,
          "NotNestedGreaterGreater;": [10914, 824],
          "NotNestedLessLess;": [10913, 824],
          "NotPrecedes;": 8832,
          "NotPrecedesEqual;": [10927, 824],
          "NotPrecedesSlantEqual;": 8928,
          "NotReverseElement;": 8716,
          "NotRightTriangle;": 8939,
          "NotRightTriangleBar;": [10704, 824],
          "NotRightTriangleEqual;": 8941,
          "NotSquareSubset;": [8847, 824],
          "NotSquareSubsetEqual;": 8930,
          "NotSquareSuperset;": [8848, 824],
          "NotSquareSupersetEqual;": 8931,
          "NotSubset;": [8834, 8402],
          "NotSubsetEqual;": 8840,
          "NotSucceeds;": 8833,
          "NotSucceedsEqual;": [10928, 824],
          "NotSucceedsSlantEqual;": 8929,
          "NotSucceedsTilde;": [8831, 824],
          "NotSuperset;": [8835, 8402],
          "NotSupersetEqual;": 8841,
          "NotTilde;": 8769,
          "NotTildeEqual;": 8772,
          "NotTildeFullEqual;": 8775,
          "NotTildeTilde;": 8777,
          "NotVerticalBar;": 8740,
          "Nscr;": [55349, 56489],
          Ntilde: 209,
          "Ntilde;": 209,
          "Nu;": 925,
          "OElig;": 338,
          Oacute: 211,
          "Oacute;": 211,
          Ocirc: 212,
          "Ocirc;": 212,
          "Ocy;": 1054,
          "Odblac;": 336,
          "Ofr;": [55349, 56594],
          Ograve: 210,
          "Ograve;": 210,
          "Omacr;": 332,
          "Omega;": 937,
          "Omicron;": 927,
          "Oopf;": [55349, 56646],
          "OpenCurlyDoubleQuote;": 8220,
          "OpenCurlyQuote;": 8216,
          "Or;": 10836,
          "Oscr;": [55349, 56490],
          Oslash: 216,
          "Oslash;": 216,
          Otilde: 213,
          "Otilde;": 213,
          "Otimes;": 10807,
          Ouml: 214,
          "Ouml;": 214,
          "OverBar;": 8254,
          "OverBrace;": 9182,
          "OverBracket;": 9140,
          "OverParenthesis;": 9180,
          "PartialD;": 8706,
          "Pcy;": 1055,
          "Pfr;": [55349, 56595],
          "Phi;": 934,
          "Pi;": 928,
          "PlusMinus;": 177,
          "Poincareplane;": 8460,
          "Popf;": 8473,
          "Pr;": 10939,
          "Precedes;": 8826,
          "PrecedesEqual;": 10927,
          "PrecedesSlantEqual;": 8828,
          "PrecedesTilde;": 8830,
          "Prime;": 8243,
          "Product;": 8719,
          "Proportion;": 8759,
          "Proportional;": 8733,
          "Pscr;": [55349, 56491],
          "Psi;": 936,
          QUOT: 34,
          "QUOT;": 34,
          "Qfr;": [55349, 56596],
          "Qopf;": 8474,
          "Qscr;": [55349, 56492],
          "RBarr;": 10512,
          REG: 174,
          "REG;": 174,
          "Racute;": 340,
          "Rang;": 10219,
          "Rarr;": 8608,
          "Rarrtl;": 10518,
          "Rcaron;": 344,
          "Rcedil;": 342,
          "Rcy;": 1056,
          "Re;": 8476,
          "ReverseElement;": 8715,
          "ReverseEquilibrium;": 8651,
          "ReverseUpEquilibrium;": 10607,
          "Rfr;": 8476,
          "Rho;": 929,
          "RightAngleBracket;": 10217,
          "RightArrow;": 8594,
          "RightArrowBar;": 8677,
          "RightArrowLeftArrow;": 8644,
          "RightCeiling;": 8969,
          "RightDoubleBracket;": 10215,
          "RightDownTeeVector;": 10589,
          "RightDownVector;": 8642,
          "RightDownVectorBar;": 10581,
          "RightFloor;": 8971,
          "RightTee;": 8866,
          "RightTeeArrow;": 8614,
          "RightTeeVector;": 10587,
          "RightTriangle;": 8883,
          "RightTriangleBar;": 10704,
          "RightTriangleEqual;": 8885,
          "RightUpDownVector;": 10575,
          "RightUpTeeVector;": 10588,
          "RightUpVector;": 8638,
          "RightUpVectorBar;": 10580,
          "RightVector;": 8640,
          "RightVectorBar;": 10579,
          "Rightarrow;": 8658,
          "Ropf;": 8477,
          "RoundImplies;": 10608,
          "Rrightarrow;": 8667,
          "Rscr;": 8475,
          "Rsh;": 8625,
          "RuleDelayed;": 10740,
          "SHCHcy;": 1065,
          "SHcy;": 1064,
          "SOFTcy;": 1068,
          "Sacute;": 346,
          "Sc;": 10940,
          "Scaron;": 352,
          "Scedil;": 350,
          "Scirc;": 348,
          "Scy;": 1057,
          "Sfr;": [55349, 56598],
          "ShortDownArrow;": 8595,
          "ShortLeftArrow;": 8592,
          "ShortRightArrow;": 8594,
          "ShortUpArrow;": 8593,
          "Sigma;": 931,
          "SmallCircle;": 8728,
          "Sopf;": [55349, 56650],
          "Sqrt;": 8730,
          "Square;": 9633,
          "SquareIntersection;": 8851,
          "SquareSubset;": 8847,
          "SquareSubsetEqual;": 8849,
          "SquareSuperset;": 8848,
          "SquareSupersetEqual;": 8850,
          "SquareUnion;": 8852,
          "Sscr;": [55349, 56494],
          "Star;": 8902,
          "Sub;": 8912,
          "Subset;": 8912,
          "SubsetEqual;": 8838,
          "Succeeds;": 8827,
          "SucceedsEqual;": 10928,
          "SucceedsSlantEqual;": 8829,
          "SucceedsTilde;": 8831,
          "SuchThat;": 8715,
          "Sum;": 8721,
          "Sup;": 8913,
          "Superset;": 8835,
          "SupersetEqual;": 8839,
          "Supset;": 8913,
          THORN: 222,
          "THORN;": 222,
          "TRADE;": 8482,
          "TSHcy;": 1035,
          "TScy;": 1062,
          "Tab;": 9,
          "Tau;": 932,
          "Tcaron;": 356,
          "Tcedil;": 354,
          "Tcy;": 1058,
          "Tfr;": [55349, 56599],
          "Therefore;": 8756,
          "Theta;": 920,
          "ThickSpace;": [8287, 8202],
          "ThinSpace;": 8201,
          "Tilde;": 8764,
          "TildeEqual;": 8771,
          "TildeFullEqual;": 8773,
          "TildeTilde;": 8776,
          "Topf;": [55349, 56651],
          "TripleDot;": 8411,
          "Tscr;": [55349, 56495],
          "Tstrok;": 358,
          Uacute: 218,
          "Uacute;": 218,
          "Uarr;": 8607,
          "Uarrocir;": 10569,
          "Ubrcy;": 1038,
          "Ubreve;": 364,
          Ucirc: 219,
          "Ucirc;": 219,
          "Ucy;": 1059,
          "Udblac;": 368,
          "Ufr;": [55349, 56600],
          Ugrave: 217,
          "Ugrave;": 217,
          "Umacr;": 362,
          "UnderBar;": 95,
          "UnderBrace;": 9183,
          "UnderBracket;": 9141,
          "UnderParenthesis;": 9181,
          "Union;": 8899,
          "UnionPlus;": 8846,
          "Uogon;": 370,
          "Uopf;": [55349, 56652],
          "UpArrow;": 8593,
          "UpArrowBar;": 10514,
          "UpArrowDownArrow;": 8645,
          "UpDownArrow;": 8597,
          "UpEquilibrium;": 10606,
          "UpTee;": 8869,
          "UpTeeArrow;": 8613,
          "Uparrow;": 8657,
          "Updownarrow;": 8661,
          "UpperLeftArrow;": 8598,
          "UpperRightArrow;": 8599,
          "Upsi;": 978,
          "Upsilon;": 933,
          "Uring;": 366,
          "Uscr;": [55349, 56496],
          "Utilde;": 360,
          Uuml: 220,
          "Uuml;": 220,
          "VDash;": 8875,
          "Vbar;": 10987,
          "Vcy;": 1042,
          "Vdash;": 8873,
          "Vdashl;": 10982,
          "Vee;": 8897,
          "Verbar;": 8214,
          "Vert;": 8214,
          "VerticalBar;": 8739,
          "VerticalLine;": 124,
          "VerticalSeparator;": 10072,
          "VerticalTilde;": 8768,
          "VeryThinSpace;": 8202,
          "Vfr;": [55349, 56601],
          "Vopf;": [55349, 56653],
          "Vscr;": [55349, 56497],
          "Vvdash;": 8874,
          "Wcirc;": 372,
          "Wedge;": 8896,
          "Wfr;": [55349, 56602],
          "Wopf;": [55349, 56654],
          "Wscr;": [55349, 56498],
          "Xfr;": [55349, 56603],
          "Xi;": 926,
          "Xopf;": [55349, 56655],
          "Xscr;": [55349, 56499],
          "YAcy;": 1071,
          "YIcy;": 1031,
          "YUcy;": 1070,
          Yacute: 221,
          "Yacute;": 221,
          "Ycirc;": 374,
          "Ycy;": 1067,
          "Yfr;": [55349, 56604],
          "Yopf;": [55349, 56656],
          "Yscr;": [55349, 56500],
          "Yuml;": 376,
          "ZHcy;": 1046,
          "Zacute;": 377,
          "Zcaron;": 381,
          "Zcy;": 1047,
          "Zdot;": 379,
          "ZeroWidthSpace;": 8203,
          "Zeta;": 918,
          "Zfr;": 8488,
          "Zopf;": 8484,
          "Zscr;": [55349, 56501],
          aacute: 225,
          "aacute;": 225,
          "abreve;": 259,
          "ac;": 8766,
          "acE;": [8766, 819],
          "acd;": 8767,
          acirc: 226,
          "acirc;": 226,
          acute: 180,
          "acute;": 180,
          "acy;": 1072,
          aelig: 230,
          "aelig;": 230,
          "af;": 8289,
          "afr;": [55349, 56606],
          agrave: 224,
          "agrave;": 224,
          "alefsym;": 8501,
          "aleph;": 8501,
          "alpha;": 945,
          "amacr;": 257,
          "amalg;": 10815,
          amp: 38,
          "amp;": 38,
          "and;": 8743,
          "andand;": 10837,
          "andd;": 10844,
          "andslope;": 10840,
          "andv;": 10842,
          "ang;": 8736,
          "ange;": 10660,
          "angle;": 8736,
          "angmsd;": 8737,
          "angmsdaa;": 10664,
          "angmsdab;": 10665,
          "angmsdac;": 10666,
          "angmsdad;": 10667,
          "angmsdae;": 10668,
          "angmsdaf;": 10669,
          "angmsdag;": 10670,
          "angmsdah;": 10671,
          "angrt;": 8735,
          "angrtvb;": 8894,
          "angrtvbd;": 10653,
          "angsph;": 8738,
          "angst;": 197,
          "angzarr;": 9084,
          "aogon;": 261,
          "aopf;": [55349, 56658],
          "ap;": 8776,
          "apE;": 10864,
          "apacir;": 10863,
          "ape;": 8778,
          "apid;": 8779,
          "apos;": 39,
          "approx;": 8776,
          "approxeq;": 8778,
          aring: 229,
          "aring;": 229,
          "ascr;": [55349, 56502],
          "ast;": 42,
          "asymp;": 8776,
          "asympeq;": 8781,
          atilde: 227,
          "atilde;": 227,
          auml: 228,
          "auml;": 228,
          "awconint;": 8755,
          "awint;": 10769,
          "bNot;": 10989,
          "backcong;": 8780,
          "backepsilon;": 1014,
          "backprime;": 8245,
          "backsim;": 8765,
          "backsimeq;": 8909,
          "barvee;": 8893,
          "barwed;": 8965,
          "barwedge;": 8965,
          "bbrk;": 9141,
          "bbrktbrk;": 9142,
          "bcong;": 8780,
          "bcy;": 1073,
          "bdquo;": 8222,
          "becaus;": 8757,
          "because;": 8757,
          "bemptyv;": 10672,
          "bepsi;": 1014,
          "bernou;": 8492,
          "beta;": 946,
          "beth;": 8502,
          "between;": 8812,
          "bfr;": [55349, 56607],
          "bigcap;": 8898,
          "bigcirc;": 9711,
          "bigcup;": 8899,
          "bigodot;": 10752,
          "bigoplus;": 10753,
          "bigotimes;": 10754,
          "bigsqcup;": 10758,
          "bigstar;": 9733,
          "bigtriangledown;": 9661,
          "bigtriangleup;": 9651,
          "biguplus;": 10756,
          "bigvee;": 8897,
          "bigwedge;": 8896,
          "bkarow;": 10509,
          "blacklozenge;": 10731,
          "blacksquare;": 9642,
          "blacktriangle;": 9652,
          "blacktriangledown;": 9662,
          "blacktriangleleft;": 9666,
          "blacktriangleright;": 9656,
          "blank;": 9251,
          "blk12;": 9618,
          "blk14;": 9617,
          "blk34;": 9619,
          "block;": 9608,
          "bne;": [61, 8421],
          "bnequiv;": [8801, 8421],
          "bnot;": 8976,
          "bopf;": [55349, 56659],
          "bot;": 8869,
          "bottom;": 8869,
          "bowtie;": 8904,
          "boxDL;": 9559,
          "boxDR;": 9556,
          "boxDl;": 9558,
          "boxDr;": 9555,
          "boxH;": 9552,
          "boxHD;": 9574,
          "boxHU;": 9577,
          "boxHd;": 9572,
          "boxHu;": 9575,
          "boxUL;": 9565,
          "boxUR;": 9562,
          "boxUl;": 9564,
          "boxUr;": 9561,
          "boxV;": 9553,
          "boxVH;": 9580,
          "boxVL;": 9571,
          "boxVR;": 9568,
          "boxVh;": 9579,
          "boxVl;": 9570,
          "boxVr;": 9567,
          "boxbox;": 10697,
          "boxdL;": 9557,
          "boxdR;": 9554,
          "boxdl;": 9488,
          "boxdr;": 9484,
          "boxh;": 9472,
          "boxhD;": 9573,
          "boxhU;": 9576,
          "boxhd;": 9516,
          "boxhu;": 9524,
          "boxminus;": 8863,
          "boxplus;": 8862,
          "boxtimes;": 8864,
          "boxuL;": 9563,
          "boxuR;": 9560,
          "boxul;": 9496,
          "boxur;": 9492,
          "boxv;": 9474,
          "boxvH;": 9578,
          "boxvL;": 9569,
          "boxvR;": 9566,
          "boxvh;": 9532,
          "boxvl;": 9508,
          "boxvr;": 9500,
          "bprime;": 8245,
          "breve;": 728,
          brvbar: 166,
          "brvbar;": 166,
          "bscr;": [55349, 56503],
          "bsemi;": 8271,
          "bsim;": 8765,
          "bsime;": 8909,
          "bsol;": 92,
          "bsolb;": 10693,
          "bsolhsub;": 10184,
          "bull;": 8226,
          "bullet;": 8226,
          "bump;": 8782,
          "bumpE;": 10926,
          "bumpe;": 8783,
          "bumpeq;": 8783,
          "cacute;": 263,
          "cap;": 8745,
          "capand;": 10820,
          "capbrcup;": 10825,
          "capcap;": 10827,
          "capcup;": 10823,
          "capdot;": 10816,
          "caps;": [8745, 65024],
          "caret;": 8257,
          "caron;": 711,
          "ccaps;": 10829,
          "ccaron;": 269,
          ccedil: 231,
          "ccedil;": 231,
          "ccirc;": 265,
          "ccups;": 10828,
          "ccupssm;": 10832,
          "cdot;": 267,
          cedil: 184,
          "cedil;": 184,
          "cemptyv;": 10674,
          cent: 162,
          "cent;": 162,
          "centerdot;": 183,
          "cfr;": [55349, 56608],
          "chcy;": 1095,
          "check;": 10003,
          "checkmark;": 10003,
          "chi;": 967,
          "cir;": 9675,
          "cirE;": 10691,
          "circ;": 710,
          "circeq;": 8791,
          "circlearrowleft;": 8634,
          "circlearrowright;": 8635,
          "circledR;": 174,
          "circledS;": 9416,
          "circledast;": 8859,
          "circledcirc;": 8858,
          "circleddash;": 8861,
          "cire;": 8791,
          "cirfnint;": 10768,
          "cirmid;": 10991,
          "cirscir;": 10690,
          "clubs;": 9827,
          "clubsuit;": 9827,
          "colon;": 58,
          "colone;": 8788,
          "coloneq;": 8788,
          "comma;": 44,
          "commat;": 64,
          "comp;": 8705,
          "compfn;": 8728,
          "complement;": 8705,
          "complexes;": 8450,
          "cong;": 8773,
          "congdot;": 10861,
          "conint;": 8750,
          "copf;": [55349, 56660],
          "coprod;": 8720,
          copy: 169,
          "copy;": 169,
          "copysr;": 8471,
          "crarr;": 8629,
          "cross;": 10007,
          "cscr;": [55349, 56504],
          "csub;": 10959,
          "csube;": 10961,
          "csup;": 10960,
          "csupe;": 10962,
          "ctdot;": 8943,
          "cudarrl;": 10552,
          "cudarrr;": 10549,
          "cuepr;": 8926,
          "cuesc;": 8927,
          "cularr;": 8630,
          "cularrp;": 10557,
          "cup;": 8746,
          "cupbrcap;": 10824,
          "cupcap;": 10822,
          "cupcup;": 10826,
          "cupdot;": 8845,
          "cupor;": 10821,
          "cups;": [8746, 65024],
          "curarr;": 8631,
          "curarrm;": 10556,
          "curlyeqprec;": 8926,
          "curlyeqsucc;": 8927,
          "curlyvee;": 8910,
          "curlywedge;": 8911,
          curren: 164,
          "curren;": 164,
          "curvearrowleft;": 8630,
          "curvearrowright;": 8631,
          "cuvee;": 8910,
          "cuwed;": 8911,
          "cwconint;": 8754,
          "cwint;": 8753,
          "cylcty;": 9005,
          "dArr;": 8659,
          "dHar;": 10597,
          "dagger;": 8224,
          "daleth;": 8504,
          "darr;": 8595,
          "dash;": 8208,
          "dashv;": 8867,
          "dbkarow;": 10511,
          "dblac;": 733,
          "dcaron;": 271,
          "dcy;": 1076,
          "dd;": 8518,
          "ddagger;": 8225,
          "ddarr;": 8650,
          "ddotseq;": 10871,
          deg: 176,
          "deg;": 176,
          "delta;": 948,
          "demptyv;": 10673,
          "dfisht;": 10623,
          "dfr;": [55349, 56609],
          "dharl;": 8643,
          "dharr;": 8642,
          "diam;": 8900,
          "diamond;": 8900,
          "diamondsuit;": 9830,
          "diams;": 9830,
          "die;": 168,
          "digamma;": 989,
          "disin;": 8946,
          "div;": 247,
          divide: 247,
          "divide;": 247,
          "divideontimes;": 8903,
          "divonx;": 8903,
          "djcy;": 1106,
          "dlcorn;": 8990,
          "dlcrop;": 8973,
          "dollar;": 36,
          "dopf;": [55349, 56661],
          "dot;": 729,
          "doteq;": 8784,
          "doteqdot;": 8785,
          "dotminus;": 8760,
          "dotplus;": 8724,
          "dotsquare;": 8865,
          "doublebarwedge;": 8966,
          "downarrow;": 8595,
          "downdownarrows;": 8650,
          "downharpoonleft;": 8643,
          "downharpoonright;": 8642,
          "drbkarow;": 10512,
          "drcorn;": 8991,
          "drcrop;": 8972,
          "dscr;": [55349, 56505],
          "dscy;": 1109,
          "dsol;": 10742,
          "dstrok;": 273,
          "dtdot;": 8945,
          "dtri;": 9663,
          "dtrif;": 9662,
          "duarr;": 8693,
          "duhar;": 10607,
          "dwangle;": 10662,
          "dzcy;": 1119,
          "dzigrarr;": 10239,
          "eDDot;": 10871,
          "eDot;": 8785,
          eacute: 233,
          "eacute;": 233,
          "easter;": 10862,
          "ecaron;": 283,
          "ecir;": 8790,
          ecirc: 234,
          "ecirc;": 234,
          "ecolon;": 8789,
          "ecy;": 1101,
          "edot;": 279,
          "ee;": 8519,
          "efDot;": 8786,
          "efr;": [55349, 56610],
          "eg;": 10906,
          egrave: 232,
          "egrave;": 232,
          "egs;": 10902,
          "egsdot;": 10904,
          "el;": 10905,
          "elinters;": 9191,
          "ell;": 8467,
          "els;": 10901,
          "elsdot;": 10903,
          "emacr;": 275,
          "empty;": 8709,
          "emptyset;": 8709,
          "emptyv;": 8709,
          "emsp13;": 8196,
          "emsp14;": 8197,
          "emsp;": 8195,
          "eng;": 331,
          "ensp;": 8194,
          "eogon;": 281,
          "eopf;": [55349, 56662],
          "epar;": 8917,
          "eparsl;": 10723,
          "eplus;": 10865,
          "epsi;": 949,
          "epsilon;": 949,
          "epsiv;": 1013,
          "eqcirc;": 8790,
          "eqcolon;": 8789,
          "eqsim;": 8770,
          "eqslantgtr;": 10902,
          "eqslantless;": 10901,
          "equals;": 61,
          "equest;": 8799,
          "equiv;": 8801,
          "equivDD;": 10872,
          "eqvparsl;": 10725,
          "erDot;": 8787,
          "erarr;": 10609,
          "escr;": 8495,
          "esdot;": 8784,
          "esim;": 8770,
          "eta;": 951,
          eth: 240,
          "eth;": 240,
          euml: 235,
          "euml;": 235,
          "euro;": 8364,
          "excl;": 33,
          "exist;": 8707,
          "expectation;": 8496,
          "exponentiale;": 8519,
          "fallingdotseq;": 8786,
          "fcy;": 1092,
          "female;": 9792,
          "ffilig;": 64259,
          "fflig;": 64256,
          "ffllig;": 64260,
          "ffr;": [55349, 56611],
          "filig;": 64257,
          "fjlig;": [102, 106],
          "flat;": 9837,
          "fllig;": 64258,
          "fltns;": 9649,
          "fnof;": 402,
          "fopf;": [55349, 56663],
          "forall;": 8704,
          "fork;": 8916,
          "forkv;": 10969,
          "fpartint;": 10765,
          frac12: 189,
          "frac12;": 189,
          "frac13;": 8531,
          frac14: 188,
          "frac14;": 188,
          "frac15;": 8533,
          "frac16;": 8537,
          "frac18;": 8539,
          "frac23;": 8532,
          "frac25;": 8534,
          frac34: 190,
          "frac34;": 190,
          "frac35;": 8535,
          "frac38;": 8540,
          "frac45;": 8536,
          "frac56;": 8538,
          "frac58;": 8541,
          "frac78;": 8542,
          "frasl;": 8260,
          "frown;": 8994,
          "fscr;": [55349, 56507],
          "gE;": 8807,
          "gEl;": 10892,
          "gacute;": 501,
          "gamma;": 947,
          "gammad;": 989,
          "gap;": 10886,
          "gbreve;": 287,
          "gcirc;": 285,
          "gcy;": 1075,
          "gdot;": 289,
          "ge;": 8805,
          "gel;": 8923,
          "geq;": 8805,
          "geqq;": 8807,
          "geqslant;": 10878,
          "ges;": 10878,
          "gescc;": 10921,
          "gesdot;": 10880,
          "gesdoto;": 10882,
          "gesdotol;": 10884,
          "gesl;": [8923, 65024],
          "gesles;": 10900,
          "gfr;": [55349, 56612],
          "gg;": 8811,
          "ggg;": 8921,
          "gimel;": 8503,
          "gjcy;": 1107,
          "gl;": 8823,
          "glE;": 10898,
          "gla;": 10917,
          "glj;": 10916,
          "gnE;": 8809,
          "gnap;": 10890,
          "gnapprox;": 10890,
          "gne;": 10888,
          "gneq;": 10888,
          "gneqq;": 8809,
          "gnsim;": 8935,
          "gopf;": [55349, 56664],
          "grave;": 96,
          "gscr;": 8458,
          "gsim;": 8819,
          "gsime;": 10894,
          "gsiml;": 10896,
          gt: 62,
          "gt;": 62,
          "gtcc;": 10919,
          "gtcir;": 10874,
          "gtdot;": 8919,
          "gtlPar;": 10645,
          "gtquest;": 10876,
          "gtrapprox;": 10886,
          "gtrarr;": 10616,
          "gtrdot;": 8919,
          "gtreqless;": 8923,
          "gtreqqless;": 10892,
          "gtrless;": 8823,
          "gtrsim;": 8819,
          "gvertneqq;": [8809, 65024],
          "gvnE;": [8809, 65024],
          "hArr;": 8660,
          "hairsp;": 8202,
          "half;": 189,
          "hamilt;": 8459,
          "hardcy;": 1098,
          "harr;": 8596,
          "harrcir;": 10568,
          "harrw;": 8621,
          "hbar;": 8463,
          "hcirc;": 293,
          "hearts;": 9829,
          "heartsuit;": 9829,
          "hellip;": 8230,
          "hercon;": 8889,
          "hfr;": [55349, 56613],
          "hksearow;": 10533,
          "hkswarow;": 10534,
          "hoarr;": 8703,
          "homtht;": 8763,
          "hookleftarrow;": 8617,
          "hookrightarrow;": 8618,
          "hopf;": [55349, 56665],
          "horbar;": 8213,
          "hscr;": [55349, 56509],
          "hslash;": 8463,
          "hstrok;": 295,
          "hybull;": 8259,
          "hyphen;": 8208,
          iacute: 237,
          "iacute;": 237,
          "ic;": 8291,
          icirc: 238,
          "icirc;": 238,
          "icy;": 1080,
          "iecy;": 1077,
          iexcl: 161,
          "iexcl;": 161,
          "iff;": 8660,
          "ifr;": [55349, 56614],
          igrave: 236,
          "igrave;": 236,
          "ii;": 8520,
          "iiiint;": 10764,
          "iiint;": 8749,
          "iinfin;": 10716,
          "iiota;": 8489,
          "ijlig;": 307,
          "imacr;": 299,
          "image;": 8465,
          "imagline;": 8464,
          "imagpart;": 8465,
          "imath;": 305,
          "imof;": 8887,
          "imped;": 437,
          "in;": 8712,
          "incare;": 8453,
          "infin;": 8734,
          "infintie;": 10717,
          "inodot;": 305,
          "int;": 8747,
          "intcal;": 8890,
          "integers;": 8484,
          "intercal;": 8890,
          "intlarhk;": 10775,
          "intprod;": 10812,
          "iocy;": 1105,
          "iogon;": 303,
          "iopf;": [55349, 56666],
          "iota;": 953,
          "iprod;": 10812,
          iquest: 191,
          "iquest;": 191,
          "iscr;": [55349, 56510],
          "isin;": 8712,
          "isinE;": 8953,
          "isindot;": 8949,
          "isins;": 8948,
          "isinsv;": 8947,
          "isinv;": 8712,
          "it;": 8290,
          "itilde;": 297,
          "iukcy;": 1110,
          iuml: 239,
          "iuml;": 239,
          "jcirc;": 309,
          "jcy;": 1081,
          "jfr;": [55349, 56615],
          "jmath;": 567,
          "jopf;": [55349, 56667],
          "jscr;": [55349, 56511],
          "jsercy;": 1112,
          "jukcy;": 1108,
          "kappa;": 954,
          "kappav;": 1008,
          "kcedil;": 311,
          "kcy;": 1082,
          "kfr;": [55349, 56616],
          "kgreen;": 312,
          "khcy;": 1093,
          "kjcy;": 1116,
          "kopf;": [55349, 56668],
          "kscr;": [55349, 56512],
          "lAarr;": 8666,
          "lArr;": 8656,
          "lAtail;": 10523,
          "lBarr;": 10510,
          "lE;": 8806,
          "lEg;": 10891,
          "lHar;": 10594,
          "lacute;": 314,
          "laemptyv;": 10676,
          "lagran;": 8466,
          "lambda;": 955,
          "lang;": 10216,
          "langd;": 10641,
          "langle;": 10216,
          "lap;": 10885,
          laquo: 171,
          "laquo;": 171,
          "larr;": 8592,
          "larrb;": 8676,
          "larrbfs;": 10527,
          "larrfs;": 10525,
          "larrhk;": 8617,
          "larrlp;": 8619,
          "larrpl;": 10553,
          "larrsim;": 10611,
          "larrtl;": 8610,
          "lat;": 10923,
          "latail;": 10521,
          "late;": 10925,
          "lates;": [10925, 65024],
          "lbarr;": 10508,
          "lbbrk;": 10098,
          "lbrace;": 123,
          "lbrack;": 91,
          "lbrke;": 10635,
          "lbrksld;": 10639,
          "lbrkslu;": 10637,
          "lcaron;": 318,
          "lcedil;": 316,
          "lceil;": 8968,
          "lcub;": 123,
          "lcy;": 1083,
          "ldca;": 10550,
          "ldquo;": 8220,
          "ldquor;": 8222,
          "ldrdhar;": 10599,
          "ldrushar;": 10571,
          "ldsh;": 8626,
          "le;": 8804,
          "leftarrow;": 8592,
          "leftarrowtail;": 8610,
          "leftharpoondown;": 8637,
          "leftharpoonup;": 8636,
          "leftleftarrows;": 8647,
          "leftrightarrow;": 8596,
          "leftrightarrows;": 8646,
          "leftrightharpoons;": 8651,
          "leftrightsquigarrow;": 8621,
          "leftthreetimes;": 8907,
          "leg;": 8922,
          "leq;": 8804,
          "leqq;": 8806,
          "leqslant;": 10877,
          "les;": 10877,
          "lescc;": 10920,
          "lesdot;": 10879,
          "lesdoto;": 10881,
          "lesdotor;": 10883,
          "lesg;": [8922, 65024],
          "lesges;": 10899,
          "lessapprox;": 10885,
          "lessdot;": 8918,
          "lesseqgtr;": 8922,
          "lesseqqgtr;": 10891,
          "lessgtr;": 8822,
          "lesssim;": 8818,
          "lfisht;": 10620,
          "lfloor;": 8970,
          "lfr;": [55349, 56617],
          "lg;": 8822,
          "lgE;": 10897,
          "lhard;": 8637,
          "lharu;": 8636,
          "lharul;": 10602,
          "lhblk;": 9604,
          "ljcy;": 1113,
          "ll;": 8810,
          "llarr;": 8647,
          "llcorner;": 8990,
          "llhard;": 10603,
          "lltri;": 9722,
          "lmidot;": 320,
          "lmoust;": 9136,
          "lmoustache;": 9136,
          "lnE;": 8808,
          "lnap;": 10889,
          "lnapprox;": 10889,
          "lne;": 10887,
          "lneq;": 10887,
          "lneqq;": 8808,
          "lnsim;": 8934,
          "loang;": 10220,
          "loarr;": 8701,
          "lobrk;": 10214,
          "longleftarrow;": 10229,
          "longleftrightarrow;": 10231,
          "longmapsto;": 10236,
          "longrightarrow;": 10230,
          "looparrowleft;": 8619,
          "looparrowright;": 8620,
          "lopar;": 10629,
          "lopf;": [55349, 56669],
          "loplus;": 10797,
          "lotimes;": 10804,
          "lowast;": 8727,
          "lowbar;": 95,
          "loz;": 9674,
          "lozenge;": 9674,
          "lozf;": 10731,
          "lpar;": 40,
          "lparlt;": 10643,
          "lrarr;": 8646,
          "lrcorner;": 8991,
          "lrhar;": 8651,
          "lrhard;": 10605,
          "lrm;": 8206,
          "lrtri;": 8895,
          "lsaquo;": 8249,
          "lscr;": [55349, 56513],
          "lsh;": 8624,
          "lsim;": 8818,
          "lsime;": 10893,
          "lsimg;": 10895,
          "lsqb;": 91,
          "lsquo;": 8216,
          "lsquor;": 8218,
          "lstrok;": 322,
          lt: 60,
          "lt;": 60,
          "ltcc;": 10918,
          "ltcir;": 10873,
          "ltdot;": 8918,
          "lthree;": 8907,
          "ltimes;": 8905,
          "ltlarr;": 10614,
          "ltquest;": 10875,
          "ltrPar;": 10646,
          "ltri;": 9667,
          "ltrie;": 8884,
          "ltrif;": 9666,
          "lurdshar;": 10570,
          "luruhar;": 10598,
          "lvertneqq;": [8808, 65024],
          "lvnE;": [8808, 65024],
          "mDDot;": 8762,
          macr: 175,
          "macr;": 175,
          "male;": 9794,
          "malt;": 10016,
          "maltese;": 10016,
          "map;": 8614,
          "mapsto;": 8614,
          "mapstodown;": 8615,
          "mapstoleft;": 8612,
          "mapstoup;": 8613,
          "marker;": 9646,
          "mcomma;": 10793,
          "mcy;": 1084,
          "mdash;": 8212,
          "measuredangle;": 8737,
          "mfr;": [55349, 56618],
          "mho;": 8487,
          micro: 181,
          "micro;": 181,
          "mid;": 8739,
          "midast;": 42,
          "midcir;": 10992,
          middot: 183,
          "middot;": 183,
          "minus;": 8722,
          "minusb;": 8863,
          "minusd;": 8760,
          "minusdu;": 10794,
          "mlcp;": 10971,
          "mldr;": 8230,
          "mnplus;": 8723,
          "models;": 8871,
          "mopf;": [55349, 56670],
          "mp;": 8723,
          "mscr;": [55349, 56514],
          "mstpos;": 8766,
          "mu;": 956,
          "multimap;": 8888,
          "mumap;": 8888,
          "nGg;": [8921, 824],
          "nGt;": [8811, 8402],
          "nGtv;": [8811, 824],
          "nLeftarrow;": 8653,
          "nLeftrightarrow;": 8654,
          "nLl;": [8920, 824],
          "nLt;": [8810, 8402],
          "nLtv;": [8810, 824],
          "nRightarrow;": 8655,
          "nVDash;": 8879,
          "nVdash;": 8878,
          "nabla;": 8711,
          "nacute;": 324,
          "nang;": [8736, 8402],
          "nap;": 8777,
          "napE;": [10864, 824],
          "napid;": [8779, 824],
          "napos;": 329,
          "napprox;": 8777,
          "natur;": 9838,
          "natural;": 9838,
          "naturals;": 8469,
          nbsp: 160,
          "nbsp;": 160,
          "nbump;": [8782, 824],
          "nbumpe;": [8783, 824],
          "ncap;": 10819,
          "ncaron;": 328,
          "ncedil;": 326,
          "ncong;": 8775,
          "ncongdot;": [10861, 824],
          "ncup;": 10818,
          "ncy;": 1085,
          "ndash;": 8211,
          "ne;": 8800,
          "neArr;": 8663,
          "nearhk;": 10532,
          "nearr;": 8599,
          "nearrow;": 8599,
          "nedot;": [8784, 824],
          "nequiv;": 8802,
          "nesear;": 10536,
          "nesim;": [8770, 824],
          "nexist;": 8708,
          "nexists;": 8708,
          "nfr;": [55349, 56619],
          "ngE;": [8807, 824],
          "nge;": 8817,
          "ngeq;": 8817,
          "ngeqq;": [8807, 824],
          "ngeqslant;": [10878, 824],
          "nges;": [10878, 824],
          "ngsim;": 8821,
          "ngt;": 8815,
          "ngtr;": 8815,
          "nhArr;": 8654,
          "nharr;": 8622,
          "nhpar;": 10994,
          "ni;": 8715,
          "nis;": 8956,
          "nisd;": 8954,
          "niv;": 8715,
          "njcy;": 1114,
          "nlArr;": 8653,
          "nlE;": [8806, 824],
          "nlarr;": 8602,
          "nldr;": 8229,
          "nle;": 8816,
          "nleftarrow;": 8602,
          "nleftrightarrow;": 8622,
          "nleq;": 8816,
          "nleqq;": [8806, 824],
          "nleqslant;": [10877, 824],
          "nles;": [10877, 824],
          "nless;": 8814,
          "nlsim;": 8820,
          "nlt;": 8814,
          "nltri;": 8938,
          "nltrie;": 8940,
          "nmid;": 8740,
          "nopf;": [55349, 56671],
          not: 172,
          "not;": 172,
          "notin;": 8713,
          "notinE;": [8953, 824],
          "notindot;": [8949, 824],
          "notinva;": 8713,
          "notinvb;": 8951,
          "notinvc;": 8950,
          "notni;": 8716,
          "notniva;": 8716,
          "notnivb;": 8958,
          "notnivc;": 8957,
          "npar;": 8742,
          "nparallel;": 8742,
          "nparsl;": [11005, 8421],
          "npart;": [8706, 824],
          "npolint;": 10772,
          "npr;": 8832,
          "nprcue;": 8928,
          "npre;": [10927, 824],
          "nprec;": 8832,
          "npreceq;": [10927, 824],
          "nrArr;": 8655,
          "nrarr;": 8603,
          "nrarrc;": [10547, 824],
          "nrarrw;": [8605, 824],
          "nrightarrow;": 8603,
          "nrtri;": 8939,
          "nrtrie;": 8941,
          "nsc;": 8833,
          "nsccue;": 8929,
          "nsce;": [10928, 824],
          "nscr;": [55349, 56515],
          "nshortmid;": 8740,
          "nshortparallel;": 8742,
          "nsim;": 8769,
          "nsime;": 8772,
          "nsimeq;": 8772,
          "nsmid;": 8740,
          "nspar;": 8742,
          "nsqsube;": 8930,
          "nsqsupe;": 8931,
          "nsub;": 8836,
          "nsubE;": [10949, 824],
          "nsube;": 8840,
          "nsubset;": [8834, 8402],
          "nsubseteq;": 8840,
          "nsubseteqq;": [10949, 824],
          "nsucc;": 8833,
          "nsucceq;": [10928, 824],
          "nsup;": 8837,
          "nsupE;": [10950, 824],
          "nsupe;": 8841,
          "nsupset;": [8835, 8402],
          "nsupseteq;": 8841,
          "nsupseteqq;": [10950, 824],
          "ntgl;": 8825,
          ntilde: 241,
          "ntilde;": 241,
          "ntlg;": 8824,
          "ntriangleleft;": 8938,
          "ntrianglelefteq;": 8940,
          "ntriangleright;": 8939,
          "ntrianglerighteq;": 8941,
          "nu;": 957,
          "num;": 35,
          "numero;": 8470,
          "numsp;": 8199,
          "nvDash;": 8877,
          "nvHarr;": 10500,
          "nvap;": [8781, 8402],
          "nvdash;": 8876,
          "nvge;": [8805, 8402],
          "nvgt;": [62, 8402],
          "nvinfin;": 10718,
          "nvlArr;": 10498,
          "nvle;": [8804, 8402],
          "nvlt;": [60, 8402],
          "nvltrie;": [8884, 8402],
          "nvrArr;": 10499,
          "nvrtrie;": [8885, 8402],
          "nvsim;": [8764, 8402],
          "nwArr;": 8662,
          "nwarhk;": 10531,
          "nwarr;": 8598,
          "nwarrow;": 8598,
          "nwnear;": 10535,
          "oS;": 9416,
          oacute: 243,
          "oacute;": 243,
          "oast;": 8859,
          "ocir;": 8858,
          ocirc: 244,
          "ocirc;": 244,
          "ocy;": 1086,
          "odash;": 8861,
          "odblac;": 337,
          "odiv;": 10808,
          "odot;": 8857,
          "odsold;": 10684,
          "oelig;": 339,
          "ofcir;": 10687,
          "ofr;": [55349, 56620],
          "ogon;": 731,
          ograve: 242,
          "ograve;": 242,
          "ogt;": 10689,
          "ohbar;": 10677,
          "ohm;": 937,
          "oint;": 8750,
          "olarr;": 8634,
          "olcir;": 10686,
          "olcross;": 10683,
          "oline;": 8254,
          "olt;": 10688,
          "omacr;": 333,
          "omega;": 969,
          "omicron;": 959,
          "omid;": 10678,
          "ominus;": 8854,
          "oopf;": [55349, 56672],
          "opar;": 10679,
          "operp;": 10681,
          "oplus;": 8853,
          "or;": 8744,
          "orarr;": 8635,
          "ord;": 10845,
          "order;": 8500,
          "orderof;": 8500,
          ordf: 170,
          "ordf;": 170,
          ordm: 186,
          "ordm;": 186,
          "origof;": 8886,
          "oror;": 10838,
          "orslope;": 10839,
          "orv;": 10843,
          "oscr;": 8500,
          oslash: 248,
          "oslash;": 248,
          "osol;": 8856,
          otilde: 245,
          "otilde;": 245,
          "otimes;": 8855,
          "otimesas;": 10806,
          ouml: 246,
          "ouml;": 246,
          "ovbar;": 9021,
          "par;": 8741,
          para: 182,
          "para;": 182,
          "parallel;": 8741,
          "parsim;": 10995,
          "parsl;": 11005,
          "part;": 8706,
          "pcy;": 1087,
          "percnt;": 37,
          "period;": 46,
          "permil;": 8240,
          "perp;": 8869,
          "pertenk;": 8241,
          "pfr;": [55349, 56621],
          "phi;": 966,
          "phiv;": 981,
          "phmmat;": 8499,
          "phone;": 9742,
          "pi;": 960,
          "pitchfork;": 8916,
          "piv;": 982,
          "planck;": 8463,
          "planckh;": 8462,
          "plankv;": 8463,
          "plus;": 43,
          "plusacir;": 10787,
          "plusb;": 8862,
          "pluscir;": 10786,
          "plusdo;": 8724,
          "plusdu;": 10789,
          "pluse;": 10866,
          plusmn: 177,
          "plusmn;": 177,
          "plussim;": 10790,
          "plustwo;": 10791,
          "pm;": 177,
          "pointint;": 10773,
          "popf;": [55349, 56673],
          pound: 163,
          "pound;": 163,
          "pr;": 8826,
          "prE;": 10931,
          "prap;": 10935,
          "prcue;": 8828,
          "pre;": 10927,
          "prec;": 8826,
          "precapprox;": 10935,
          "preccurlyeq;": 8828,
          "preceq;": 10927,
          "precnapprox;": 10937,
          "precneqq;": 10933,
          "precnsim;": 8936,
          "precsim;": 8830,
          "prime;": 8242,
          "primes;": 8473,
          "prnE;": 10933,
          "prnap;": 10937,
          "prnsim;": 8936,
          "prod;": 8719,
          "profalar;": 9006,
          "profline;": 8978,
          "profsurf;": 8979,
          "prop;": 8733,
          "propto;": 8733,
          "prsim;": 8830,
          "prurel;": 8880,
          "pscr;": [55349, 56517],
          "psi;": 968,
          "puncsp;": 8200,
          "qfr;": [55349, 56622],
          "qint;": 10764,
          "qopf;": [55349, 56674],
          "qprime;": 8279,
          "qscr;": [55349, 56518],
          "quaternions;": 8461,
          "quatint;": 10774,
          "quest;": 63,
          "questeq;": 8799,
          quot: 34,
          "quot;": 34,
          "rAarr;": 8667,
          "rArr;": 8658,
          "rAtail;": 10524,
          "rBarr;": 10511,
          "rHar;": 10596,
          "race;": [8765, 817],
          "racute;": 341,
          "radic;": 8730,
          "raemptyv;": 10675,
          "rang;": 10217,
          "rangd;": 10642,
          "range;": 10661,
          "rangle;": 10217,
          raquo: 187,
          "raquo;": 187,
          "rarr;": 8594,
          "rarrap;": 10613,
          "rarrb;": 8677,
          "rarrbfs;": 10528,
          "rarrc;": 10547,
          "rarrfs;": 10526,
          "rarrhk;": 8618,
          "rarrlp;": 8620,
          "rarrpl;": 10565,
          "rarrsim;": 10612,
          "rarrtl;": 8611,
          "rarrw;": 8605,
          "ratail;": 10522,
          "ratio;": 8758,
          "rationals;": 8474,
          "rbarr;": 10509,
          "rbbrk;": 10099,
          "rbrace;": 125,
          "rbrack;": 93,
          "rbrke;": 10636,
          "rbrksld;": 10638,
          "rbrkslu;": 10640,
          "rcaron;": 345,
          "rcedil;": 343,
          "rceil;": 8969,
          "rcub;": 125,
          "rcy;": 1088,
          "rdca;": 10551,
          "rdldhar;": 10601,
          "rdquo;": 8221,
          "rdquor;": 8221,
          "rdsh;": 8627,
          "real;": 8476,
          "realine;": 8475,
          "realpart;": 8476,
          "reals;": 8477,
          "rect;": 9645,
          reg: 174,
          "reg;": 174,
          "rfisht;": 10621,
          "rfloor;": 8971,
          "rfr;": [55349, 56623],
          "rhard;": 8641,
          "rharu;": 8640,
          "rharul;": 10604,
          "rho;": 961,
          "rhov;": 1009,
          "rightarrow;": 8594,
          "rightarrowtail;": 8611,
          "rightharpoondown;": 8641,
          "rightharpoonup;": 8640,
          "rightleftarrows;": 8644,
          "rightleftharpoons;": 8652,
          "rightrightarrows;": 8649,
          "rightsquigarrow;": 8605,
          "rightthreetimes;": 8908,
          "ring;": 730,
          "risingdotseq;": 8787,
          "rlarr;": 8644,
          "rlhar;": 8652,
          "rlm;": 8207,
          "rmoust;": 9137,
          "rmoustache;": 9137,
          "rnmid;": 10990,
          "roang;": 10221,
          "roarr;": 8702,
          "robrk;": 10215,
          "ropar;": 10630,
          "ropf;": [55349, 56675],
          "roplus;": 10798,
          "rotimes;": 10805,
          "rpar;": 41,
          "rpargt;": 10644,
          "rppolint;": 10770,
          "rrarr;": 8649,
          "rsaquo;": 8250,
          "rscr;": [55349, 56519],
          "rsh;": 8625,
          "rsqb;": 93,
          "rsquo;": 8217,
          "rsquor;": 8217,
          "rthree;": 8908,
          "rtimes;": 8906,
          "rtri;": 9657,
          "rtrie;": 8885,
          "rtrif;": 9656,
          "rtriltri;": 10702,
          "ruluhar;": 10600,
          "rx;": 8478,
          "sacute;": 347,
          "sbquo;": 8218,
          "sc;": 8827,
          "scE;": 10932,
          "scap;": 10936,
          "scaron;": 353,
          "sccue;": 8829,
          "sce;": 10928,
          "scedil;": 351,
          "scirc;": 349,
          "scnE;": 10934,
          "scnap;": 10938,
          "scnsim;": 8937,
          "scpolint;": 10771,
          "scsim;": 8831,
          "scy;": 1089,
          "sdot;": 8901,
          "sdotb;": 8865,
          "sdote;": 10854,
          "seArr;": 8664,
          "searhk;": 10533,
          "searr;": 8600,
          "searrow;": 8600,
          sect: 167,
          "sect;": 167,
          "semi;": 59,
          "seswar;": 10537,
          "setminus;": 8726,
          "setmn;": 8726,
          "sext;": 10038,
          "sfr;": [55349, 56624],
          "sfrown;": 8994,
          "sharp;": 9839,
          "shchcy;": 1097,
          "shcy;": 1096,
          "shortmid;": 8739,
          "shortparallel;": 8741,
          shy: 173,
          "shy;": 173,
          "sigma;": 963,
          "sigmaf;": 962,
          "sigmav;": 962,
          "sim;": 8764,
          "simdot;": 10858,
          "sime;": 8771,
          "simeq;": 8771,
          "simg;": 10910,
          "simgE;": 10912,
          "siml;": 10909,
          "simlE;": 10911,
          "simne;": 8774,
          "simplus;": 10788,
          "simrarr;": 10610,
          "slarr;": 8592,
          "smallsetminus;": 8726,
          "smashp;": 10803,
          "smeparsl;": 10724,
          "smid;": 8739,
          "smile;": 8995,
          "smt;": 10922,
          "smte;": 10924,
          "smtes;": [10924, 65024],
          "softcy;": 1100,
          "sol;": 47,
          "solb;": 10692,
          "solbar;": 9023,
          "sopf;": [55349, 56676],
          "spades;": 9824,
          "spadesuit;": 9824,
          "spar;": 8741,
          "sqcap;": 8851,
          "sqcaps;": [8851, 65024],
          "sqcup;": 8852,
          "sqcups;": [8852, 65024],
          "sqsub;": 8847,
          "sqsube;": 8849,
          "sqsubset;": 8847,
          "sqsubseteq;": 8849,
          "sqsup;": 8848,
          "sqsupe;": 8850,
          "sqsupset;": 8848,
          "sqsupseteq;": 8850,
          "squ;": 9633,
          "square;": 9633,
          "squarf;": 9642,
          "squf;": 9642,
          "srarr;": 8594,
          "sscr;": [55349, 56520],
          "ssetmn;": 8726,
          "ssmile;": 8995,
          "sstarf;": 8902,
          "star;": 9734,
          "starf;": 9733,
          "straightepsilon;": 1013,
          "straightphi;": 981,
          "strns;": 175,
          "sub;": 8834,
          "subE;": 10949,
          "subdot;": 10941,
          "sube;": 8838,
          "subedot;": 10947,
          "submult;": 10945,
          "subnE;": 10955,
          "subne;": 8842,
          "subplus;": 10943,
          "subrarr;": 10617,
          "subset;": 8834,
          "subseteq;": 8838,
          "subseteqq;": 10949,
          "subsetneq;": 8842,
          "subsetneqq;": 10955,
          "subsim;": 10951,
          "subsub;": 10965,
          "subsup;": 10963,
          "succ;": 8827,
          "succapprox;": 10936,
          "succcurlyeq;": 8829,
          "succeq;": 10928,
          "succnapprox;": 10938,
          "succneqq;": 10934,
          "succnsim;": 8937,
          "succsim;": 8831,
          "sum;": 8721,
          "sung;": 9834,
          sup1: 185,
          "sup1;": 185,
          sup2: 178,
          "sup2;": 178,
          sup3: 179,
          "sup3;": 179,
          "sup;": 8835,
          "supE;": 10950,
          "supdot;": 10942,
          "supdsub;": 10968,
          "supe;": 8839,
          "supedot;": 10948,
          "suphsol;": 10185,
          "suphsub;": 10967,
          "suplarr;": 10619,
          "supmult;": 10946,
          "supnE;": 10956,
          "supne;": 8843,
          "supplus;": 10944,
          "supset;": 8835,
          "supseteq;": 8839,
          "supseteqq;": 10950,
          "supsetneq;": 8843,
          "supsetneqq;": 10956,
          "supsim;": 10952,
          "supsub;": 10964,
          "supsup;": 10966,
          "swArr;": 8665,
          "swarhk;": 10534,
          "swarr;": 8601,
          "swarrow;": 8601,
          "swnwar;": 10538,
          szlig: 223,
          "szlig;": 223,
          "target;": 8982,
          "tau;": 964,
          "tbrk;": 9140,
          "tcaron;": 357,
          "tcedil;": 355,
          "tcy;": 1090,
          "tdot;": 8411,
          "telrec;": 8981,
          "tfr;": [55349, 56625],
          "there4;": 8756,
          "therefore;": 8756,
          "theta;": 952,
          "thetasym;": 977,
          "thetav;": 977,
          "thickapprox;": 8776,
          "thicksim;": 8764,
          "thinsp;": 8201,
          "thkap;": 8776,
          "thksim;": 8764,
          thorn: 254,
          "thorn;": 254,
          "tilde;": 732,
          times: 215,
          "times;": 215,
          "timesb;": 8864,
          "timesbar;": 10801,
          "timesd;": 10800,
          "tint;": 8749,
          "toea;": 10536,
          "top;": 8868,
          "topbot;": 9014,
          "topcir;": 10993,
          "topf;": [55349, 56677],
          "topfork;": 10970,
          "tosa;": 10537,
          "tprime;": 8244,
          "trade;": 8482,
          "triangle;": 9653,
          "triangledown;": 9663,
          "triangleleft;": 9667,
          "trianglelefteq;": 8884,
          "triangleq;": 8796,
          "triangleright;": 9657,
          "trianglerighteq;": 8885,
          "tridot;": 9708,
          "trie;": 8796,
          "triminus;": 10810,
          "triplus;": 10809,
          "trisb;": 10701,
          "tritime;": 10811,
          "trpezium;": 9186,
          "tscr;": [55349, 56521],
          "tscy;": 1094,
          "tshcy;": 1115,
          "tstrok;": 359,
          "twixt;": 8812,
          "twoheadleftarrow;": 8606,
          "twoheadrightarrow;": 8608,
          "uArr;": 8657,
          "uHar;": 10595,
          uacute: 250,
          "uacute;": 250,
          "uarr;": 8593,
          "ubrcy;": 1118,
          "ubreve;": 365,
          ucirc: 251,
          "ucirc;": 251,
          "ucy;": 1091,
          "udarr;": 8645,
          "udblac;": 369,
          "udhar;": 10606,
          "ufisht;": 10622,
          "ufr;": [55349, 56626],
          ugrave: 249,
          "ugrave;": 249,
          "uharl;": 8639,
          "uharr;": 8638,
          "uhblk;": 9600,
          "ulcorn;": 8988,
          "ulcorner;": 8988,
          "ulcrop;": 8975,
          "ultri;": 9720,
          "umacr;": 363,
          uml: 168,
          "uml;": 168,
          "uogon;": 371,
          "uopf;": [55349, 56678],
          "uparrow;": 8593,
          "updownarrow;": 8597,
          "upharpoonleft;": 8639,
          "upharpoonright;": 8638,
          "uplus;": 8846,
          "upsi;": 965,
          "upsih;": 978,
          "upsilon;": 965,
          "upuparrows;": 8648,
          "urcorn;": 8989,
          "urcorner;": 8989,
          "urcrop;": 8974,
          "uring;": 367,
          "urtri;": 9721,
          "uscr;": [55349, 56522],
          "utdot;": 8944,
          "utilde;": 361,
          "utri;": 9653,
          "utrif;": 9652,
          "uuarr;": 8648,
          uuml: 252,
          "uuml;": 252,
          "uwangle;": 10663,
          "vArr;": 8661,
          "vBar;": 10984,
          "vBarv;": 10985,
          "vDash;": 8872,
          "vangrt;": 10652,
          "varepsilon;": 1013,
          "varkappa;": 1008,
          "varnothing;": 8709,
          "varphi;": 981,
          "varpi;": 982,
          "varpropto;": 8733,
          "varr;": 8597,
          "varrho;": 1009,
          "varsigma;": 962,
          "varsubsetneq;": [8842, 65024],
          "varsubsetneqq;": [10955, 65024],
          "varsupsetneq;": [8843, 65024],
          "varsupsetneqq;": [10956, 65024],
          "vartheta;": 977,
          "vartriangleleft;": 8882,
          "vartriangleright;": 8883,
          "vcy;": 1074,
          "vdash;": 8866,
          "vee;": 8744,
          "veebar;": 8891,
          "veeeq;": 8794,
          "vellip;": 8942,
          "verbar;": 124,
          "vert;": 124,
          "vfr;": [55349, 56627],
          "vltri;": 8882,
          "vnsub;": [8834, 8402],
          "vnsup;": [8835, 8402],
          "vopf;": [55349, 56679],
          "vprop;": 8733,
          "vrtri;": 8883,
          "vscr;": [55349, 56523],
          "vsubnE;": [10955, 65024],
          "vsubne;": [8842, 65024],
          "vsupnE;": [10956, 65024],
          "vsupne;": [8843, 65024],
          "vzigzag;": 10650,
          "wcirc;": 373,
          "wedbar;": 10847,
          "wedge;": 8743,
          "wedgeq;": 8793,
          "weierp;": 8472,
          "wfr;": [55349, 56628],
          "wopf;": [55349, 56680],
          "wp;": 8472,
          "wr;": 8768,
          "wreath;": 8768,
          "wscr;": [55349, 56524],
          "xcap;": 8898,
          "xcirc;": 9711,
          "xcup;": 8899,
          "xdtri;": 9661,
          "xfr;": [55349, 56629],
          "xhArr;": 10234,
          "xharr;": 10231,
          "xi;": 958,
          "xlArr;": 10232,
          "xlarr;": 10229,
          "xmap;": 10236,
          "xnis;": 8955,
          "xodot;": 10752,
          "xopf;": [55349, 56681],
          "xoplus;": 10753,
          "xotime;": 10754,
          "xrArr;": 10233,
          "xrarr;": 10230,
          "xscr;": [55349, 56525],
          "xsqcup;": 10758,
          "xuplus;": 10756,
          "xutri;": 9651,
          "xvee;": 8897,
          "xwedge;": 8896,
          yacute: 253,
          "yacute;": 253,
          "yacy;": 1103,
          "ycirc;": 375,
          "ycy;": 1099,
          yen: 165,
          "yen;": 165,
          "yfr;": [55349, 56630],
          "yicy;": 1111,
          "yopf;": [55349, 56682],
          "yscr;": [55349, 56526],
          "yucy;": 1102,
          yuml: 255,
          "yuml;": 255,
          "zacute;": 378,
          "zcaron;": 382,
          "zcy;": 1079,
          "zdot;": 380,
          "zeetrf;": 8488,
          "zeta;": 950,
          "zfr;": [55349, 56631],
          "zhcy;": 1078,
          "zigrarr;": 8669,
          "zopf;": [55349, 56683],
          "zscr;": [55349, 56527],
          "zwj;": 8205,
          "zwnj;": 8204,
        },
        Ie =
          /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g,
        $e = 32,
        Y = /[^\r"&\u0000]+/g,
        Z = /[^\r'&\u0000]+/g,
        H = /[^\r\t\n\f &>\u0000]+/g,
        $ = /[^\r\t\n\f \/>A-Z\u0000]+/g,
        ce = /[^\r\t\n\f \/=>A-Z\u0000]+/g,
        he = /[^\]\r\u0000\uffff]*/g,
        ie = /[^&<\r\u0000\uffff]*/g,
        ge = /[^<\r\u0000\uffff]*/g,
        be = /[^\r\u0000\uffff]*/g,
        _e = /(?:(\/)?([a-z]+)>)|[\s\S]/g,
        Ae =
          /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g,
        Se = /[^\x09\x0A\x0C\x0D\x20]/,
        Xe = /[^\x09\x0A\x0C\x0D\x20]/g,
        Ye = /[^\x00\x09\x0A\x0C\x0D\x20]/,
        ze = /^[\x09\x0A\x0C\x0D\x20]+/,
        Et = /\x00/g;
      function Ue(F) {
        var V = 16384;
        if (F.length < V) return String.fromCharCode.apply(String, F);
        for (var oe = "", te = 0; te < F.length; te += V)
          oe += String.fromCharCode.apply(String, F.slice(te, te + V));
        return oe;
      }
      function rn(F) {
        for (var V = [], oe = 0; oe < F.length; oe++) V[oe] = F.charCodeAt(oe);
        return V;
      }
      function Ne(F, V) {
        if (typeof V == "string")
          return F.namespaceURI === a.HTML && F.localName === V;
        var oe = V[F.namespaceURI];
        return oe && oe[F.localName];
      }
      function ir(F) {
        return Ne(F, C);
      }
      function ft(F) {
        if (Ne(F, M)) return !0;
        if (F.namespaceURI === a.MATHML && F.localName === "annotation-xml") {
          var V = F.getAttribute("encoding");
          if (
            (V && (V = V.toLowerCase()),
            V === "text/html" || V === "application/xhtml+xml")
          )
            return !0;
        }
        return !1;
      }
      function vr(F) {
        return F in A ? A[F] : F;
      }
      function Pt(F) {
        for (var V = 0, oe = F.length; V < oe; V++)
          F[V][0] in y && (F[V][0] = y[F[V][0]]);
      }
      function sr(F) {
        for (var V = 0, oe = F.length; V < oe; V++)
          if (F[V][0] === "definitionurl") {
            F[V][0] = "definitionURL";
            break;
          }
      }
      function Kt(F) {
        for (var V = 0, oe = F.length; V < oe; V++)
          F[V][0] in z && F[V].push(z[F[V][0]]);
      }
      function vt(F, V) {
        for (var oe = 0, te = F.length; oe < te; oe++) {
          var xe = F[oe][0],
            re = F[oe][1];
          V.hasAttribute(xe) || V._setAttribute(xe, re);
        }
      }
      (de.ElementStack = function () {
        (this.elements = []), (this.top = null);
      }),
        (de.ElementStack.prototype.push = function (F) {
          this.elements.push(F), (this.top = F);
        }),
        (de.ElementStack.prototype.pop = function (F) {
          this.elements.pop(),
            (this.top = this.elements[this.elements.length - 1]);
        }),
        (de.ElementStack.prototype.popTag = function (F) {
          for (var V = this.elements.length - 1; V > 0; V--) {
            var oe = this.elements[V];
            if (Ne(oe, F)) break;
          }
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.popElementType = function (F) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !(this.elements[V] instanceof F);
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.popElement = function (F) {
          for (
            var V = this.elements.length - 1;
            V > 0 && this.elements[V] !== F;
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.removeElement = function (F) {
          if (this.top === F) this.pop();
          else {
            var V = this.elements.lastIndexOf(F);
            V !== -1 && this.elements.splice(V, 1);
          }
        }),
        (de.ElementStack.prototype.clearToContext = function (F) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !Ne(this.elements[V], F);
            V--
          );
          (this.elements.length = V + 1), (this.top = this.elements[V]);
        }),
        (de.ElementStack.prototype.contains = function (F) {
          return this.inSpecificScope(F, Object.create(null));
        }),
        (de.ElementStack.prototype.inSpecificScope = function (F, V) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var te = this.elements[oe];
            if (Ne(te, F)) return !0;
            if (Ne(te, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementInSpecificScope = function (F, V) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var te = this.elements[oe];
            if (te === F) return !0;
            if (Ne(te, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementTypeInSpecificScope = function (
          F,
          V,
        ) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var te = this.elements[oe];
            if (te instanceof F) return !0;
            if (Ne(te, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.inScope = function (F) {
          return this.inSpecificScope(F, o);
        }),
        (de.ElementStack.prototype.elementInScope = function (F) {
          return this.elementInSpecificScope(F, o);
        }),
        (de.ElementStack.prototype.elementTypeInScope = function (F) {
          return this.elementTypeInSpecificScope(F, o);
        }),
        (de.ElementStack.prototype.inButtonScope = function (F) {
          return this.inSpecificScope(F, m);
        }),
        (de.ElementStack.prototype.inListItemScope = function (F) {
          return this.inSpecificScope(F, n);
        }),
        (de.ElementStack.prototype.inTableScope = function (F) {
          return this.inSpecificScope(F, L);
        }),
        (de.ElementStack.prototype.inSelectScope = function (F) {
          for (var V = this.elements.length - 1; V >= 0; V--) {
            var oe = this.elements[V];
            if (oe.namespaceURI !== a.HTML) return !1;
            var te = oe.localName;
            if (te === F) return !0;
            if (te !== "optgroup" && te !== "option") return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.generateImpliedEndTags = function (F, V) {
          for (
            var oe = V ? G : Q, te = this.elements.length - 1;
            te >= 0;
            te--
          ) {
            var xe = this.elements[te];
            if ((F && Ne(xe, F)) || !Ne(this.elements[te], oe)) break;
          }
          (this.elements.length = te + 1), (this.top = this.elements[te]);
        }),
        (de.ActiveFormattingElements = function () {
          (this.list = []), (this.attrs = []);
        }),
        (de.ActiveFormattingElements.prototype.MARKER = { localName: "|" }),
        (de.ActiveFormattingElements.prototype.insertMarker = function () {
          this.list.push(this.MARKER), this.attrs.push(this.MARKER);
        }),
        (de.ActiveFormattingElements.prototype.push = function (F, V) {
          for (
            var oe = 0, te = this.list.length - 1;
            te >= 0 && this.list[te] !== this.MARKER;
            te--
          )
            if (Bt(F, this.list[te], this.attrs[te]) && (oe++, oe === 3)) {
              this.list.splice(te, 1), this.attrs.splice(te, 1);
              break;
            }
          this.list.push(F);
          for (var xe = [], re = 0; re < V.length; re++) xe[re] = V[re];
          this.attrs.push(xe);
          function Bt(Tt, Ut, ht) {
            if (Tt.localName !== Ut.localName || Tt._numattrs !== ht.length)
              return !1;
            for (var Ze = 0, Tr = ht.length; Ze < Tr; Ze++) {
              var Ft = ht[Ze][0],
                x = ht[Ze][1];
              if (!Tt.hasAttribute(Ft) || Tt.getAttribute(Ft) !== x) return !1;
            }
            return !0;
          }
        }),
        (de.ActiveFormattingElements.prototype.clearToMarker = function () {
          for (
            var F = this.list.length - 1;
            F >= 0 && this.list[F] !== this.MARKER;
            F--
          );
          F < 0 && (F = 0), (this.list.length = F), (this.attrs.length = F);
        }),
        (de.ActiveFormattingElements.prototype.findElementByTag = function (F) {
          for (var V = this.list.length - 1; V >= 0; V--) {
            var oe = this.list[V];
            if (oe === this.MARKER) break;
            if (oe.localName === F) return oe;
          }
          return null;
        }),
        (de.ActiveFormattingElements.prototype.indexOf = function (F) {
          return this.list.lastIndexOf(F);
        }),
        (de.ActiveFormattingElements.prototype.remove = function (F) {
          var V = this.list.lastIndexOf(F);
          V !== -1 && (this.list.splice(V, 1), this.attrs.splice(V, 1));
        }),
        (de.ActiveFormattingElements.prototype.replace = function (F, V, oe) {
          var te = this.list.lastIndexOf(F);
          te !== -1 && ((this.list[te] = V), (this.attrs[te] = oe));
        }),
        (de.ActiveFormattingElements.prototype.insertAfter = function (F, V) {
          var oe = this.list.lastIndexOf(F);
          oe !== -1 &&
            (this.list.splice(oe, 0, V), this.attrs.splice(oe, 0, V));
        });
      function de(F, V, oe) {
        var te = null,
          xe = 0,
          re = 0,
          Bt = !1,
          Tt = !1,
          Ut = 0,
          ht = [],
          Ze = "",
          Tr = !0,
          Ft = 0,
          x = Te,
          yt,
          Oe,
          Ce = "",
          yr = "",
          De = [],
          Ke = "",
          We = "",
          Me = [],
          Nt = [],
          wt = [],
          St = [],
          rt = [],
          Nr = !1,
          j = Ri,
          dt = null,
          pt = [],
          k = new de.ElementStack(),
          ve = new de.ActiveFormattingElements(),
          jt = V !== void 0,
          wr = null,
          mt = null,
          Sr = !0;
        V && (Sr = V.ownerDocument._scripting_enabled),
          oe && oe.scripting_enabled === !1 && (Sr = !1);
        var He = !0,
          nn = !1,
          kr,
          an,
          X = [],
          kt = !1,
          Vt = !1,
          Lr = {
            document: function () {
              return we;
            },
            _asDocumentFragment: function () {
              for (
                var e = we.createDocumentFragment(), r = we.firstChild;
                r.hasChildNodes();

              )
                e.appendChild(r.firstChild);
              return e;
            },
            pause: function () {
              Ft++;
            },
            resume: function () {
              Ft--, this.parse("");
            },
            parse: function (e, r, N) {
              var I;
              return Ft > 0
                ? ((Ze += e), !0)
                : (Ut === 0
                    ? (Ze && ((e = Ze + e), (Ze = "")),
                      r && ((e += "\uFFFF"), (Bt = !0)),
                      (te = e),
                      (xe = e.length),
                      (re = 0),
                      Tr && ((Tr = !1), te.charCodeAt(0) === 65279 && (re = 1)),
                      Ut++,
                      (I = qn(N)),
                      (Ze = te.substring(re, xe)),
                      Ut--)
                    : (Ut++,
                      ht.push(te, xe, re),
                      (te = e),
                      (xe = e.length),
                      (re = 0),
                      qn(),
                      (I = !1),
                      (Ze = te.substring(re, xe)),
                      (re = ht.pop()),
                      (xe = ht.pop()),
                      (te = ht.pop()),
                      Ze &&
                        ((te = Ze + te.substring(re)),
                        (xe = te.length),
                        (re = 0),
                        (Ze = "")),
                      Ut--),
                  I);
            },
          },
          we = new h(!0, F);
        if (((we._parser = Lr), (we._scripting_enabled = Sr), V)) {
          if (
            (V.ownerDocument._quirks && (we._quirks = !0),
            V.ownerDocument._limitedQuirks && (we._limitedQuirks = !0),
            V.namespaceURI === a.HTML)
          )
            switch (V.localName) {
              case "title":
              case "textarea":
                x = At;
                break;
              case "style":
              case "xmp":
              case "iframe":
              case "noembed":
              case "noframes":
              case "script":
              case "plaintext":
                x = un;
                break;
            }
          var Hn = we.createElement("html");
          we._appendChild(Hn),
            k.push(Hn),
            V instanceof l.HTMLTemplateElement && pt.push(vn),
            hr();
          for (var or = V; or !== null; or = or.parentElement)
            if (or instanceof l.HTMLFormElement) {
              mt = or;
              break;
            }
        }
        function qn(e) {
          for (var r, N, I, P; re < xe; ) {
            if (Ft > 0 || (e && e())) return !0;
            switch (typeof x.lookahead) {
              case "undefined":
                if (((r = te.charCodeAt(re++)), Tt && ((Tt = !1), r === 10))) {
                  re++;
                  continue;
                }
                switch (r) {
                  case 13:
                    re < xe ? te.charCodeAt(re) === 10 && re++ : (Tt = !0),
                      x(10);
                    break;
                  case 65535:
                    if (Bt && re === xe) {
                      x(i);
                      break;
                    }
                  default:
                    x(r);
                    break;
                }
                break;
              case "number":
                r = te.charCodeAt(re);
                var J = x.lookahead,
                  fe = !0;
                if ((J < 0 && ((fe = !1), (J = -J)), J < xe - re))
                  (N = fe ? te.substring(re, re + J) : null), (P = !1);
                else if (Bt)
                  (N = fe ? te.substring(re, xe) : null),
                    (P = !0),
                    r === 65535 && re === xe - 1 && (r = i);
                else return !0;
                x(r, N, P);
                break;
              case "string":
                (r = te.charCodeAt(re)), (I = x.lookahead);
                var ye = te.indexOf(I, re);
                if (ye !== -1) (N = te.substring(re, ye + I.length)), (P = !1);
                else {
                  if (!Bt) return !0;
                  (N = te.substring(re, xe)),
                    r === 65535 && re === xe - 1 && (r = i),
                    (P = !0);
                }
                x(r, N, P);
                break;
            }
          }
          return !1;
        }
        function Lt(e, r) {
          for (var N = 0; N < rt.length; N++) if (rt[N][0] === e) return;
          r !== void 0 ? rt.push([e, r]) : rt.push([e]);
        }
        function Pa() {
          Ae.lastIndex = re - 1;
          var e = Ae.exec(te);
          if (!e) throw new Error("should never happen");
          var r = e[1];
          if (!r) return !1;
          var N = e[2],
            I = N.length;
          switch (N[0]) {
            case '"':
            case "'":
              (N = N.substring(1, I - 1)), (re += e[0].length - 1), (x = pn);
              break;
            default:
              (x = ct), (re += e[0].length - 1), (N = N.substring(0, I - 1));
              break;
          }
          for (var P = 0; P < rt.length; P++) if (rt[P][0] === r) return !0;
          return rt.push([r, N]), !0;
        }
        function Ba() {
          (Nr = !1), (Ce = ""), (rt.length = 0);
        }
        function cr() {
          (Nr = !0), (Ce = ""), (rt.length = 0);
        }
        function gt() {
          De.length = 0;
        }
        function sn() {
          Ke = "";
        }
        function on() {
          We = "";
        }
        function Pn() {
          Me.length = 0;
        }
        function Xt() {
          (Nt.length = 0), (wt = null), (St = null);
        }
        function Cr() {
          wt = [];
        }
        function Ct() {
          St = [];
        }
        function ke() {
          nn = !0;
        }
        function Ua() {
          return k.top && k.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
        }
        function Qe(e) {
          return yr === e;
        }
        function Yt() {
          if (X.length > 0) {
            var e = Ue(X);
            if (
              ((X.length = 0),
              Vt &&
                ((Vt = !1),
                e[0] ===
                  `
` && (e = e.substring(1)),
                e.length === 0))
            )
              return;
            Pe(b, e), (kt = !1);
          }
          Vt = !1;
        }
        function lr(e) {
          e.lastIndex = re - 1;
          var r = e.exec(te);
          if (r && r.index === re - 1)
            return (
              (r = r[0]),
              (re += r.length - 1),
              Bt && re === xe && ((r = r.slice(0, -1)), re--),
              r
            );
          throw new Error("should never happen");
        }
        function ur(e) {
          e.lastIndex = re - 1;
          var r = e.exec(te)[0];
          return r ? (Fa(r), (re += r.length - 1), !0) : !1;
        }
        function Fa(e) {
          X.length > 0 && Yt(),
            !(
              Vt &&
              ((Vt = !1),
              e[0] ===
                `
` && (e = e.substring(1)),
              e.length === 0)
            ) && Pe(b, e);
        }
        function _t() {
          if (Nr) Pe(w, Ce);
          else {
            var e = Ce;
            (Ce = ""), (yr = e), Pe(d, e, rt);
          }
        }
        function ja() {
          if (re === xe) return !1;
          _e.lastIndex = re;
          var e = _e.exec(te);
          if (!e) throw new Error("should never happen");
          var r = e[2];
          if (!r) return !1;
          var N = e[1];
          return (
            N
              ? ((re += r.length + 2), Pe(w, r))
              : ((re += r.length + 1), (yr = r), Pe(d, r, O)),
            !0
          );
        }
        function Va() {
          Nr ? Pe(w, Ce, null, !0) : Pe(d, Ce, rt, !0);
        }
        function Le() {
          Pe(q, Ue(Nt), wt ? Ue(wt) : void 0, St ? Ue(St) : void 0);
        }
        function Ee() {
          Yt(), j(i), (we.modclock = 1);
        }
        var Pe = (Lr.insertToken = function (r, N, I, P) {
          Yt();
          var J = k.top;
          !J || J.namespaceURI === a.HTML
            ? j(r, N, I, P)
            : r !== d && r !== b
              ? ea(r, N, I, P)
              : (ir(J) &&
                    (r === b ||
                      (r === d && N !== "mglyph" && N !== "malignmark"))) ||
                  (r === d &&
                    N === "svg" &&
                    J.namespaceURI === a.MATHML &&
                    J.localName === "annotation-xml") ||
                  ft(J)
                ? ((an = !0), j(r, N, I, P), (an = !1))
                : ea(r, N, I, P);
        });
        function it(e) {
          var r = k.top;
          Dt && Ne(r, ne)
            ? Ar(function (N) {
                return N.createComment(e);
              })
            : (r instanceof l.HTMLTemplateElement && (r = r.content),
              r._appendChild(r.ownerDocument.createComment(e)));
        }
        function st(e) {
          var r = k.top;
          if (Dt && Ne(r, ne))
            Ar(function (I) {
              return I.createTextNode(e);
            });
          else {
            r instanceof l.HTMLTemplateElement && (r = r.content);
            var N = r.lastChild;
            N && N.nodeType === t.TEXT_NODE
              ? N.appendData(e)
              : r._appendChild(r.ownerDocument.createTextNode(e));
          }
        }
        function fr(e, r, N) {
          var I = c.createElement(e, r, null);
          if (N)
            for (var P = 0, J = N.length; P < J; P++)
              I._setAttribute(N[P][0], N[P][1]);
          return I;
        }
        var Dt = !1;
        function pe(e, r) {
          var N = Dr(function (I) {
            return fr(I, e, r);
          });
          return Ne(N, u) && (N._form = mt), N;
        }
        function Dr(e) {
          var r;
          return (
            Dt && Ne(k.top, ne)
              ? (r = Ar(e))
              : k.top instanceof l.HTMLTemplateElement
                ? ((r = e(k.top.content.ownerDocument)),
                  k.top.content._appendChild(r))
                : ((r = e(k.top.ownerDocument)), k.top._appendChild(r)),
            k.push(r),
            r
          );
        }
        function cn(e, r, N) {
          return Dr(function (I) {
            var P = I._createElementNS(e, N, null);
            if (r)
              for (var J = 0, fe = r.length; J < fe; J++) {
                var ye = r[J];
                ye.length === 2
                  ? P._setAttribute(ye[0], ye[1])
                  : P._setAttributeNS(ye[2], ye[0], ye[1]);
              }
            return P;
          });
        }
        function Bn(e) {
          for (var r = k.elements.length - 1; r >= 0; r--)
            if (k.elements[r] instanceof e) return r;
          return -1;
        }
        function Ar(e) {
          var r,
            N,
            I = -1,
            P = -1,
            J;
          if (
            ((I = Bn(l.HTMLTableElement)),
            (P = Bn(l.HTMLTemplateElement)),
            P >= 0 && (I < 0 || P > I)
              ? (r = k.elements[P])
              : I >= 0 &&
                ((r = k.elements[I].parentNode),
                r ? (N = k.elements[I]) : (r = k.elements[I - 1])),
            r || (r = k.elements[0]),
            r instanceof l.HTMLTemplateElement && (r = r.content),
            (J = e(r.ownerDocument)),
            J.nodeType === t.TEXT_NODE)
          ) {
            var fe;
            if (
              (N ? (fe = N.previousSibling) : (fe = r.lastChild),
              fe && fe.nodeType === t.TEXT_NODE)
            )
              return fe.appendData(J.data), J;
          }
          return N ? r.insertBefore(J, N) : r._appendChild(J), J;
        }
        function hr() {
          for (var e = !1, r = k.elements.length - 1; r >= 0; r--) {
            var N = k.elements[r];
            if (
              (r === 0 && ((e = !0), jt && (N = V)), N.namespaceURI === a.HTML)
            ) {
              var I = N.localName;
              switch (I) {
                case "select":
                  for (var P = r; P > 0; ) {
                    var J = k.elements[--P];
                    if (J instanceof l.HTMLTemplateElement) break;
                    if (J instanceof l.HTMLTableElement) {
                      j = Gr;
                      return;
                    }
                  }
                  j = bt;
                  return;
                case "tr":
                  j = mr;
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  j = Wt;
                  return;
                case "caption":
                  j = En;
                  return;
                case "colgroup":
                  j = Vr;
                  return;
                case "table":
                  j = Je;
                  return;
                case "template":
                  j = pt[pt.length - 1];
                  return;
                case "body":
                  j = ue;
                  return;
                case "frameset":
                  j = Tn;
                  return;
                case "html":
                  wr === null ? (j = Fr) : (j = bn);
                  return;
                default:
                  if (!e) {
                    if (I === "head") {
                      j = qe;
                      return;
                    }
                    if (I === "td" || I === "th") {
                      j = Qt;
                      return;
                    }
                  }
              }
            }
            if (e) {
              j = ue;
              return;
            }
          }
        }
        function Mr(e, r) {
          pe(e, r), (x = dr), (dt = j), (j = jr);
        }
        function Ga(e, r) {
          pe(e, r), (x = At), (dt = j), (j = jr);
        }
        function ln(e, r) {
          return {
            elt: fr(e, ve.list[r].localName, ve.attrs[r]),
            attrs: ve.attrs[r],
          };
        }
        function Ge() {
          if (ve.list.length !== 0) {
            var e = ve.list[ve.list.length - 1];
            if (e !== ve.MARKER && k.elements.lastIndexOf(e) === -1) {
              for (
                var r = ve.list.length - 2;
                r >= 0 &&
                ((e = ve.list[r]),
                !(e === ve.MARKER || k.elements.lastIndexOf(e) !== -1));
                r--
              );
              for (r = r + 1; r < ve.list.length; r++) {
                var N = Dr(function (I) {
                  return ln(I, r).elt;
                });
                ve.list[r] = N;
              }
            }
          }
        }
        var xr = { localName: "BM" };
        function za(e) {
          if (Ne(k.top, e) && ve.indexOf(k.top) === -1) return k.pop(), !0;
          for (var r = 0; r < 8; ) {
            r++;
            var N = ve.findElementByTag(e);
            if (!N) return !1;
            var I = k.elements.lastIndexOf(N);
            if (I === -1) return ve.remove(N), !0;
            if (!k.elementInScope(N)) return !0;
            for (var P = null, J, fe = I + 1; fe < k.elements.length; fe++)
              if (Ne(k.elements[fe], S)) {
                (P = k.elements[fe]), (J = fe);
                break;
              }
            if (P) {
              var ye = k.elements[I - 1];
              ve.insertAfter(N, xr);
              for (
                var Re = P, je = P, et = J, nt, $t = 0;
                $t++, (Re = k.elements[--et]), Re !== N;

              ) {
                if (
                  ((nt = ve.indexOf(Re)),
                  $t > 3 && nt !== -1 && (ve.remove(Re), (nt = -1)),
                  nt === -1)
                ) {
                  k.removeElement(Re);
                  continue;
                }
                var Ot = ln(ye.ownerDocument, nt);
                ve.replace(Re, Ot.elt, Ot.attrs),
                  (k.elements[et] = Ot.elt),
                  (Re = Ot.elt),
                  je === P && (ve.remove(xr), ve.insertAfter(Ot.elt, xr)),
                  Re._appendChild(je),
                  (je = Re);
              }
              Dt && Ne(ye, ne)
                ? Ar(function () {
                    return je;
                  })
                : ye instanceof l.HTMLTemplateElement
                  ? ye.content._appendChild(je)
                  : ye._appendChild(je);
              for (
                var gr = ln(P.ownerDocument, ve.indexOf(N));
                P.hasChildNodes();

              )
                gr.elt._appendChild(P.firstChild);
              P._appendChild(gr.elt),
                ve.remove(N),
                ve.replace(xr, gr.elt, gr.attrs),
                k.removeElement(N);
              var Bi = k.elements.lastIndexOf(P);
              k.elements.splice(Bi + 1, 0, gr.elt);
            } else return k.popElement(N), ve.remove(N), !0;
          }
          return !0;
        }
        function Za() {
          k.pop(), (j = dt);
        }
        function Gt() {
          delete we._parser,
            (k.elements.length = 0),
            we.defaultView &&
              we.defaultView.dispatchEvent(new l.Event("load", {}));
        }
        function se(e, r) {
          (x = r), re--;
        }
        function Te(e) {
          switch (e) {
            case 38:
              (yt = Te), (x = pr);
              break;
            case 60:
              if (ja()) break;
              x = Wa;
              break;
            case 0:
              X.push(e), (kt = !0);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(ie) || X.push(e);
              break;
          }
        }
        function At(e) {
          switch (e) {
            case 38:
              (yt = At), (x = pr);
              break;
            case 60:
              x = Ka;
              break;
            case 0:
              X.push(65533), (kt = !0);
              break;
            case -1:
              Ee();
              break;
            default:
              X.push(e);
              break;
          }
        }
        function dr(e) {
          switch (e) {
            case 60:
              x = Qa;
              break;
            case 0:
              X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(ge) || X.push(e);
              break;
          }
        }
        function Mt(e) {
          switch (e) {
            case 60:
              x = ti;
              break;
            case 0:
              X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(ge) || X.push(e);
              break;
          }
        }
        function un(e) {
          switch (e) {
            case 0:
              X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(be) || X.push(e);
              break;
          }
        }
        function Wa(e) {
          switch (e) {
            case 33:
              x = Vn;
              break;
            case 47:
              x = $a;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ba(), se(e, Un);
              break;
            case 63:
              se(e, Hr);
              break;
            default:
              X.push(60), se(e, Te);
              break;
          }
        }
        function $a(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              cr(), se(e, Un);
              break;
            case 62:
              x = Te;
              break;
            case -1:
              X.push(60), X.push(47), Ee();
              break;
            default:
              se(e, Hr);
              break;
          }
        }
        function Un(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = ct;
              break;
            case 47:
              x = It;
              break;
            case 62:
              (x = Te), _t();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Ce += String.fromCharCode(e + 32);
              break;
            case 0:
              Ce += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            default:
              Ce += lr($);
              break;
          }
        }
        function Ka(e) {
          e === 47 ? (gt(), (x = Xa)) : (X.push(60), se(e, At));
        }
        function Xa(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              cr(), se(e, Ya);
              break;
            default:
              X.push(60), X.push(47), se(e, At);
              break;
          }
        }
        function Ya(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Qe(Ce)) {
                x = ct;
                return;
              }
              break;
            case 47:
              if (Qe(Ce)) {
                x = It;
                return;
              }
              break;
            case 62:
              if (Qe(Ce)) {
                (x = Te), _t();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Ce += String.fromCharCode(e + 32)), De.push(e);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          X.push(60), X.push(47), f(X, De), se(e, At);
        }
        function Qa(e) {
          e === 47 ? (gt(), (x = Ja)) : (X.push(60), se(e, dr));
        }
        function Ja(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              cr(), se(e, ei);
              break;
            default:
              X.push(60), X.push(47), se(e, dr);
              break;
          }
        }
        function ei(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Qe(Ce)) {
                x = ct;
                return;
              }
              break;
            case 47:
              if (Qe(Ce)) {
                x = It;
                return;
              }
              break;
            case 62:
              if (Qe(Ce)) {
                (x = Te), _t();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Ce += String.fromCharCode(e + 32)), De.push(e);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          X.push(60), X.push(47), f(X, De), se(e, dr);
        }
        function ti(e) {
          switch (e) {
            case 47:
              gt(), (x = ri);
              break;
            case 33:
              (x = ai), X.push(60), X.push(33);
              break;
            default:
              X.push(60), se(e, Mt);
              break;
          }
        }
        function ri(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              cr(), se(e, ni);
              break;
            default:
              X.push(60), X.push(47), se(e, Mt);
              break;
          }
        }
        function ni(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Qe(Ce)) {
                x = ct;
                return;
              }
              break;
            case 47:
              if (Qe(Ce)) {
                x = It;
                return;
              }
              break;
            case 62:
              if (Qe(Ce)) {
                (x = Te), _t();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Ce += String.fromCharCode(e + 32)), De.push(e);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          X.push(60), X.push(47), f(X, De), se(e, Mt);
        }
        function ai(e) {
          e === 45 ? ((x = ii), X.push(45)) : se(e, Mt);
        }
        function ii(e) {
          e === 45 ? ((x = Fn), X.push(45)) : se(e, Mt);
        }
        function ot(e) {
          switch (e) {
            case 45:
              (x = si), X.push(45);
              break;
            case 60:
              x = fn;
              break;
            case 0:
              X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              X.push(e);
              break;
          }
        }
        function si(e) {
          switch (e) {
            case 45:
              (x = Fn), X.push(45);
              break;
            case 60:
              x = fn;
              break;
            case 0:
              (x = ot), X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (x = ot), X.push(e);
              break;
          }
        }
        function Fn(e) {
          switch (e) {
            case 45:
              X.push(45);
              break;
            case 60:
              x = fn;
              break;
            case 62:
              (x = Mt), X.push(62);
              break;
            case 0:
              (x = ot), X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (x = ot), X.push(e);
              break;
          }
        }
        function fn(e) {
          switch (e) {
            case 47:
              gt(), (x = oi);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              gt(), X.push(60), se(e, li);
              break;
            default:
              X.push(60), se(e, ot);
              break;
          }
        }
        function oi(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              cr(), se(e, ci);
              break;
            default:
              X.push(60), X.push(47), se(e, ot);
              break;
          }
        }
        function ci(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Qe(Ce)) {
                x = ct;
                return;
              }
              break;
            case 47:
              if (Qe(Ce)) {
                x = It;
                return;
              }
              break;
            case 62:
              if (Qe(Ce)) {
                (x = Te), _t();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Ce += String.fromCharCode(e + 32)), De.push(e);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          X.push(60), X.push(47), f(X, De), se(e, ot);
        }
        function li(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Ue(De) === "script" ? (x = xt) : (x = ot), X.push(e);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              De.push(e + 32), X.push(e);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              De.push(e), X.push(e);
              break;
            default:
              se(e, ot);
              break;
          }
        }
        function xt(e) {
          switch (e) {
            case 45:
              (x = ui), X.push(45);
              break;
            case 60:
              (x = hn), X.push(60);
              break;
            case 0:
              X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              X.push(e);
              break;
          }
        }
        function ui(e) {
          switch (e) {
            case 45:
              (x = fi), X.push(45);
              break;
            case 60:
              (x = hn), X.push(60);
              break;
            case 0:
              (x = xt), X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (x = xt), X.push(e);
              break;
          }
        }
        function fi(e) {
          switch (e) {
            case 45:
              X.push(45);
              break;
            case 60:
              (x = hn), X.push(60);
              break;
            case 62:
              (x = Mt), X.push(62);
              break;
            case 0:
              (x = xt), X.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (x = xt), X.push(e);
              break;
          }
        }
        function hn(e) {
          e === 47 ? (gt(), (x = hi), X.push(47)) : se(e, xt);
        }
        function hi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Ue(De) === "script" ? (x = ot) : (x = xt), X.push(e);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              De.push(e + 32), X.push(e);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              De.push(e), X.push(e);
              break;
            default:
              se(e, xt);
              break;
          }
        }
        function ct(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              x = It;
              break;
            case 62:
              (x = Te), _t();
              break;
            case -1:
              Ee();
              break;
            case 61:
              sn(), (Ke += String.fromCharCode(e)), (x = dn);
              break;
            default:
              if (Pa()) break;
              sn(), se(e, dn);
              break;
          }
        }
        function dn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
            case -1:
              se(e, di);
              break;
            case 61:
              x = jn;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Ke += String.fromCharCode(e + 32);
              break;
            case 0:
              Ke += "\uFFFD";
              break;
            case 34:
            case 39:
            case 60:
            default:
              Ke += lr(ce);
              break;
          }
        }
        function di(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              Lt(Ke), (x = It);
              break;
            case 61:
              x = jn;
              break;
            case 62:
              (x = Te), Lt(Ke), _t();
              break;
            case -1:
              Lt(Ke), Ee();
              break;
            default:
              Lt(Ke), sn(), se(e, dn);
              break;
          }
        }
        function jn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              on(), (x = Ir);
              break;
            case 39:
              on(), (x = Rr);
              break;
            case 62:
            default:
              on(), se(e, Or);
              break;
          }
        }
        function Ir(e) {
          switch (e) {
            case 34:
              Lt(Ke, We), (x = pn);
              break;
            case 38:
              (yt = Ir), (x = pr);
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            case 10:
              We += String.fromCharCode(e);
              break;
            default:
              We += lr(Y);
              break;
          }
        }
        function Rr(e) {
          switch (e) {
            case 39:
              Lt(Ke, We), (x = pn);
              break;
            case 38:
              (yt = Rr), (x = pr);
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            case 10:
              We += String.fromCharCode(e);
              break;
            default:
              We += lr(Z);
              break;
          }
        }
        function Or(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              Lt(Ke, We), (x = ct);
              break;
            case 38:
              (yt = Or), (x = pr);
              break;
            case 62:
              Lt(Ke, We), (x = Te), _t();
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              re--, (x = Te);
              break;
            case 34:
            case 39:
            case 60:
            case 61:
            case 96:
            default:
              We += lr(H);
              break;
          }
        }
        function pn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = ct;
              break;
            case 47:
              x = It;
              break;
            case 62:
              (x = Te), _t();
              break;
            case -1:
              Ee();
              break;
            default:
              se(e, ct);
              break;
          }
        }
        function It(e) {
          switch (e) {
            case 62:
              (x = Te), Va(!0);
              break;
            case -1:
              Ee();
              break;
            default:
              se(e, ct);
              break;
          }
        }
        function Hr(e, r, N) {
          var I = r.length;
          N ? (re += I - 1) : (re += I);
          var P = r.substring(0, I - 1);
          (P = P.replace(/\u0000/g, "\uFFFD")),
            (P = P.replace(
              /\u000D\u000A/g,
              `
`,
            )),
            (P = P.replace(
              /\u000D/g,
              `
`,
            )),
            Pe(R, P),
            (x = Te);
        }
        Hr.lookahead = ">";
        function Vn(e, r, N) {
          if (r[0] === "-" && r[1] === "-") {
            (re += 2), Pn(), (x = pi);
            return;
          }
          r.toUpperCase() === "DOCTYPE"
            ? ((re += 7), (x = Ti))
            : r === "[CDATA[" && Ua()
              ? ((re += 7), (x = _n))
              : (x = Hr);
        }
        Vn.lookahead = 7;
        function pi(e) {
          switch ((Pn(), e)) {
            case 45:
              x = mi;
              break;
            case 62:
              (x = Te), Pe(R, Ue(Me));
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function mi(e) {
          switch (e) {
            case 45:
              x = qr;
              break;
            case 62:
              (x = Te), Pe(R, Ue(Me));
              break;
            case -1:
              Pe(R, Ue(Me)), Ee();
              break;
            default:
              Me.push(45), se(e, zt);
              break;
          }
        }
        function zt(e) {
          switch (e) {
            case 60:
              Me.push(e), (x = gi);
              break;
            case 45:
              x = mn;
              break;
            case 0:
              Me.push(65533);
              break;
            case -1:
              Pe(R, Ue(Me)), Ee();
              break;
            default:
              Me.push(e);
              break;
          }
        }
        function gi(e) {
          switch (e) {
            case 33:
              Me.push(e), (x = _i);
              break;
            case 60:
              Me.push(e);
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function _i(e) {
          switch (e) {
            case 45:
              x = bi;
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function bi(e) {
          switch (e) {
            case 45:
              x = Ei;
              break;
            default:
              se(e, mn);
              break;
          }
        }
        function Ei(e) {
          switch (e) {
            case 62:
            case -1:
              se(e, qr);
              break;
            default:
              se(e, qr);
              break;
          }
        }
        function mn(e) {
          switch (e) {
            case 45:
              x = qr;
              break;
            case -1:
              Pe(R, Ue(Me)), Ee();
              break;
            default:
              Me.push(45), se(e, zt);
              break;
          }
        }
        function qr(e) {
          switch (e) {
            case 62:
              (x = Te), Pe(R, Ue(Me));
              break;
            case 33:
              x = vi;
              break;
            case 45:
              Me.push(45);
              break;
            case -1:
              Pe(R, Ue(Me)), Ee();
              break;
            default:
              Me.push(45), Me.push(45), se(e, zt);
              break;
          }
        }
        function vi(e) {
          switch (e) {
            case 45:
              Me.push(45), Me.push(45), Me.push(33), (x = mn);
              break;
            case 62:
              (x = Te), Pe(R, Ue(Me));
              break;
            case -1:
              Pe(R, Ue(Me)), Ee();
              break;
            default:
              Me.push(45), Me.push(45), Me.push(33), se(e, zt);
              break;
          }
        }
        function Ti(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = Gn;
              break;
            case -1:
              Xt(), ke(), Le(), Ee();
              break;
            default:
              se(e, Gn);
              break;
          }
        }
        function Gn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Xt(), Nt.push(e + 32), (x = gn);
              break;
            case 0:
              Xt(), Nt.push(65533), (x = gn);
              break;
            case 62:
              Xt(), ke(), (x = Te), Le();
              break;
            case -1:
              Xt(), ke(), Le(), Ee();
              break;
            default:
              Xt(), Nt.push(e), (x = gn);
              break;
          }
        }
        function gn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = zn;
              break;
            case 62:
              (x = Te), Le();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Nt.push(e + 32);
              break;
            case 0:
              Nt.push(65533);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              Nt.push(e);
              break;
          }
        }
        function zn(e, r, N) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              re += 1;
              break;
            case 62:
              (x = Te), (re += 1), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              (r = r.toUpperCase()),
                r === "PUBLIC"
                  ? ((re += 6), (x = yi))
                  : r === "SYSTEM"
                    ? ((re += 6), (x = Si))
                    : (ke(), (x = Rt));
              break;
          }
        }
        zn.lookahead = 6;
        function yi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = Ni;
              break;
            case 34:
              Cr(), (x = Zn);
              break;
            case 39:
              Cr(), (x = Wn);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function Ni(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Cr(), (x = Zn);
              break;
            case 39:
              Cr(), (x = Wn);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function Zn(e) {
          switch (e) {
            case 34:
              x = $n;
              break;
            case 0:
              wt.push(65533);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              wt.push(e);
              break;
          }
        }
        function Wn(e) {
          switch (e) {
            case 39:
              x = $n;
              break;
            case 0:
              wt.push(65533);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              wt.push(e);
              break;
          }
        }
        function $n(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = wi;
              break;
            case 62:
              (x = Te), Le();
              break;
            case 34:
              Ct(), (x = Pr);
              break;
            case 39:
              Ct(), (x = Br);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function wi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (x = Te), Le();
              break;
            case 34:
              Ct(), (x = Pr);
              break;
            case 39:
              Ct(), (x = Br);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function Si(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              x = ki;
              break;
            case 34:
              Ct(), (x = Pr);
              break;
            case 39:
              Ct(), (x = Br);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function ki(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Ct(), (x = Pr);
              break;
            case 39:
              Ct(), (x = Br);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (x = Rt);
              break;
          }
        }
        function Pr(e) {
          switch (e) {
            case 34:
              x = Kn;
              break;
            case 0:
              St.push(65533);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              St.push(e);
              break;
          }
        }
        function Br(e) {
          switch (e) {
            case 39:
              x = Kn;
              break;
            case 0:
              St.push(65533);
              break;
            case 62:
              ke(), (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              St.push(e);
              break;
          }
        }
        function Kn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (x = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              x = Rt;
              break;
          }
        }
        function Rt(e) {
          switch (e) {
            case 62:
              (x = Te), Le();
              break;
            case -1:
              Le(), Ee();
              break;
            default:
              break;
          }
        }
        function _n(e) {
          switch (e) {
            case 93:
              x = Li;
              break;
            case -1:
              Ee();
              break;
            case 0:
              kt = !0;
            default:
              ur(he) || X.push(e);
              break;
          }
        }
        function Li(e) {
          switch (e) {
            case 93:
              x = Ci;
              break;
            default:
              X.push(93), se(e, _n);
              break;
          }
        }
        function Ci(e) {
          switch (e) {
            case 93:
              X.push(93);
              break;
            case 62:
              Yt(), (x = Te);
              break;
            default:
              X.push(93), X.push(93), se(e, _n);
              break;
          }
        }
        function pr(e) {
          switch ((gt(), De.push(38), e)) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 60:
            case 38:
            case -1:
              se(e, Zt);
              break;
            case 35:
              De.push(e), (x = Di);
              break;
            default:
              se(e, Xn);
              break;
          }
        }
        function Xn(e) {
          Ie.lastIndex = re;
          var r = Ie.exec(te);
          if (!r) throw new Error("should never happen");
          var N = r[1];
          if (!N) {
            x = Zt;
            return;
          }
          switch (((re += N.length), f(De, rn(N)), yt)) {
            case Ir:
            case Rr:
            case Or:
              if (N[N.length - 1] !== ";" && /[=A-Za-z0-9]/.test(te[re])) {
                x = Zt;
                return;
              }
              break;
            default:
              break;
          }
          gt();
          var I = me[N];
          typeof I == "number" ? De.push(I) : f(De, I), (x = Zt);
        }
        Xn.lookahead = -$e;
        function Di(e) {
          switch (((Oe = 0), e)) {
            case 120:
            case 88:
              De.push(e), (x = Ai);
              break;
            default:
              se(e, Mi);
              break;
          }
        }
        function Ai(e) {
          switch (e) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              se(e, xi);
              break;
            default:
              se(e, Zt);
              break;
          }
        }
        function Mi(e) {
          switch (e) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              se(e, Ii);
              break;
            default:
              se(e, Zt);
              break;
          }
        }
        function xi(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
              (Oe *= 16), (Oe += e - 55);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              (Oe *= 16), (Oe += e - 87);
              break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (Oe *= 16), (Oe += e - 48);
              break;
            case 59:
              x = Ur;
              break;
            default:
              se(e, Ur);
              break;
          }
        }
        function Ii(e) {
          switch (e) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (Oe *= 10), (Oe += e - 48);
              break;
            case 59:
              x = Ur;
              break;
            default:
              se(e, Ur);
              break;
          }
        }
        function Ur(e) {
          Oe in K
            ? (Oe = K[Oe])
            : (Oe > 1114111 || (Oe >= 55296 && Oe < 57344)) && (Oe = 65533),
            gt(),
            Oe <= 65535
              ? De.push(Oe)
              : ((Oe = Oe - 65536),
                De.push(55296 + (Oe >> 10)),
                De.push(56320 + (Oe & 1023))),
            se(e, Zt);
        }
        function Zt(e) {
          switch (yt) {
            case Ir:
            case Rr:
            case Or:
              We += Ue(De);
              break;
            default:
              f(X, De);
              break;
          }
          se(e, yt);
        }
        function Ri(e, r, N, I) {
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              var P = r,
                J = N,
                fe = I;
              we.appendChild(new s(we, P, J, fe)),
                nn ||
                P.toLowerCase() !== "html" ||
                ee.test(J) ||
                (fe && fe.toLowerCase() === U) ||
                (fe === void 0 && T.test(J))
                  ? (we._quirks = !0)
                  : (p.test(J) || (fe !== void 0 && T.test(J))) &&
                    (we._limitedQuirks = !0),
                (j = Yn);
              return;
          }
          (we._quirks = !0), (j = Yn), j(e, r, N, I);
        }
        function Yn(e, r, N, I) {
          var P;
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 2:
              if (r === "html") {
                (P = fr(we, r, N)), k.push(P), we.appendChild(P), (j = Fr);
                return;
              }
              break;
            case 3:
              switch (r) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          (P = fr(we, "html", null)),
            k.push(P),
            we.appendChild(P),
            (j = Fr),
            j(e, r, N, I);
        }
        function Fr(e, r, N, I) {
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              it(r);
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "head":
                  var P = pe(r, N);
                  (wr = P), (j = qe);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          Fr(d, "head", null), j(e, r, N, I);
        }
        function qe(e, r, N, I) {
          switch (e) {
            case 1:
              var P = r.match(ze);
              if (
                (P && (st(P[0]), (r = r.substring(P[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "meta":
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                  pe(r, N), k.pop();
                  return;
                case "title":
                  Ga(r, N);
                  return;
                case "noscript":
                  if (!Sr) {
                    pe(r, N), (j = Qn);
                    return;
                  }
                case "noframes":
                case "style":
                  Mr(r, N);
                  return;
                case "script":
                  Dr(function (J) {
                    var fe = fr(J, r, N);
                    return (
                      (fe._parser_inserted = !0),
                      (fe._force_async = !1),
                      jt && (fe._already_started = !0),
                      Yt(),
                      fe
                    );
                  }),
                    (x = Mt),
                    (dt = j),
                    (j = jr);
                  return;
                case "template":
                  pe(r, N), ve.insertMarker(), (He = !1), (j = vn), pt.push(j);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "head":
                  k.pop(), (j = bn);
                  return;
                case "body":
                case "html":
                case "br":
                  break;
                case "template":
                  if (!k.contains("template")) return;
                  k.generateImpliedEndTags(null, "thorough"),
                    k.popTag("template"),
                    ve.clearToMarker(),
                    pt.pop(),
                    hr();
                  return;
                default:
                  return;
              }
              break;
          }
          qe(w, "head", null), j(e, r, N, I);
        }
        function Qn(e, r, N, I) {
          switch (e) {
            case 5:
              return;
            case 4:
              qe(e, r);
              return;
            case 1:
              var P = r.match(ze);
              if (
                (P && (qe(e, P[0]), (r = r.substring(P[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "style":
                  qe(e, r, N);
                  return;
                case "head":
                case "noscript":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "noscript":
                  k.pop(), (j = qe);
                  return;
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          Qn(w, "noscript", null), j(e, r, N, I);
        }
        function bn(e, r, N, I) {
          switch (e) {
            case 1:
              var P = r.match(ze);
              if (
                (P && (st(P[0]), (r = r.substring(P[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "body":
                  pe(r, N), (He = !1), (j = ue);
                  return;
                case "frameset":
                  pe(r, N), (j = Tn);
                  return;
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  k.push(wr), qe(d, r, N), k.removeElement(wr);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "template":
                  return qe(e, r, N, I);
                case "body":
                case "html":
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          bn(d, "body", null), (He = !0), j(e, r, N, I);
        }
        function ue(e, r, N, I) {
          var P, J, fe, ye;
          switch (e) {
            case 1:
              if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
              He && Se.test(r) && (He = !1), Ge(), st(r);
              return;
            case 5:
              return;
            case 4:
              it(r);
              return;
            case -1:
              if (pt.length) return vn(e);
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  if (k.contains("template")) return;
                  vt(N, k.elements[0]);
                  return;
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  qe(d, r, N);
                  return;
                case "body":
                  if (
                    ((P = k.elements[1]),
                    !P ||
                      !(P instanceof l.HTMLBodyElement) ||
                      k.contains("template"))
                  )
                    return;
                  (He = !1), vt(N, P);
                  return;
                case "frameset":
                  if (
                    !He ||
                    ((P = k.elements[1]),
                    !P || !(P instanceof l.HTMLBodyElement))
                  )
                    return;
                  for (
                    P.parentNode && P.parentNode.removeChild(P);
                    !(k.top instanceof l.HTMLHtmlElement);

                  )
                    k.pop();
                  pe(r, N), (j = Tn);
                  return;
                case "address":
                case "article":
                case "aside":
                case "blockquote":
                case "center":
                case "details":
                case "dialog":
                case "dir":
                case "div":
                case "dl":
                case "fieldset":
                case "figcaption":
                case "figure":
                case "footer":
                case "header":
                case "hgroup":
                case "main":
                case "nav":
                case "ol":
                case "p":
                case "section":
                case "summary":
                case "ul":
                  k.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "menu":
                  k.inButtonScope("p") && ue(w, "p"),
                    Ne(k.top, "menuitem") && k.pop(),
                    pe(r, N);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  k.inButtonScope("p") && ue(w, "p"),
                    k.top instanceof l.HTMLHeadingElement && k.pop(),
                    pe(r, N);
                  return;
                case "pre":
                case "listing":
                  k.inButtonScope("p") && ue(w, "p"),
                    pe(r, N),
                    (Vt = !0),
                    (He = !1);
                  return;
                case "form":
                  if (mt && !k.contains("template")) return;
                  k.inButtonScope("p") && ue(w, "p"),
                    (ye = pe(r, N)),
                    k.contains("template") || (mt = ye);
                  return;
                case "li":
                  for (He = !1, J = k.elements.length - 1; J >= 0; J--) {
                    if (((fe = k.elements[J]), fe instanceof l.HTMLLIElement)) {
                      ue(w, "li");
                      break;
                    }
                    if (Ne(fe, S) && !Ne(fe, g)) break;
                  }
                  k.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "dd":
                case "dt":
                  for (He = !1, J = k.elements.length - 1; J >= 0; J--) {
                    if (((fe = k.elements[J]), Ne(fe, ae))) {
                      ue(w, fe.localName);
                      break;
                    }
                    if (Ne(fe, S) && !Ne(fe, g)) break;
                  }
                  k.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "plaintext":
                  k.inButtonScope("p") && ue(w, "p"), pe(r, N), (x = un);
                  return;
                case "button":
                  k.inScope("button")
                    ? (ue(w, "button"), j(e, r, N, I))
                    : (Ge(), pe(r, N), (He = !1));
                  return;
                case "a":
                  var Re = ve.findElementByTag("a");
                  Re && (ue(w, r), ve.remove(Re), k.removeElement(Re));
                case "b":
                case "big":
                case "code":
                case "em":
                case "font":
                case "i":
                case "s":
                case "small":
                case "strike":
                case "strong":
                case "tt":
                case "u":
                  Ge(), ve.push(pe(r, N), N);
                  return;
                case "nobr":
                  Ge(), k.inScope(r) && (ue(w, r), Ge()), ve.push(pe(r, N), N);
                  return;
                case "applet":
                case "marquee":
                case "object":
                  Ge(), pe(r, N), ve.insertMarker(), (He = !1);
                  return;
                case "table":
                  !we._quirks && k.inButtonScope("p") && ue(w, "p"),
                    pe(r, N),
                    (He = !1),
                    (j = Je);
                  return;
                case "area":
                case "br":
                case "embed":
                case "img":
                case "keygen":
                case "wbr":
                  Ge(), pe(r, N), k.pop(), (He = !1);
                  return;
                case "input":
                  Ge(), (ye = pe(r, N)), k.pop();
                  var je = ye.getAttribute("type");
                  (!je || je.toLowerCase() !== "hidden") && (He = !1);
                  return;
                case "param":
                case "source":
                case "track":
                  pe(r, N), k.pop();
                  return;
                case "hr":
                  k.inButtonScope("p") && ue(w, "p"),
                    Ne(k.top, "menuitem") && k.pop(),
                    pe(r, N),
                    k.pop(),
                    (He = !1);
                  return;
                case "image":
                  ue(d, "img", N, I);
                  return;
                case "textarea":
                  pe(r, N), (Vt = !0), (He = !1), (x = At), (dt = j), (j = jr);
                  return;
                case "xmp":
                  k.inButtonScope("p") && ue(w, "p"), Ge(), (He = !1), Mr(r, N);
                  return;
                case "iframe":
                  (He = !1), Mr(r, N);
                  return;
                case "noembed":
                  Mr(r, N);
                  return;
                case "select":
                  Ge(),
                    pe(r, N),
                    (He = !1),
                    j === Je || j === En || j === Wt || j === mr || j === Qt
                      ? (j = Gr)
                      : (j = bt);
                  return;
                case "optgroup":
                case "option":
                  k.top instanceof l.HTMLOptionElement && ue(w, "option"),
                    Ge(),
                    pe(r, N);
                  return;
                case "menuitem":
                  Ne(k.top, "menuitem") && k.pop(), Ge(), pe(r, N);
                  return;
                case "rb":
                case "rtc":
                  k.inScope("ruby") && k.generateImpliedEndTags(), pe(r, N);
                  return;
                case "rp":
                case "rt":
                  k.inScope("ruby") && k.generateImpliedEndTags("rtc"),
                    pe(r, N);
                  return;
                case "math":
                  Ge(), sr(N), Kt(N), cn(r, N, a.MATHML), I && k.pop();
                  return;
                case "svg":
                  Ge(), Pt(N), Kt(N), cn(r, N, a.SVG), I && k.pop();
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "frame":
                case "head":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
              }
              Ge(), pe(r, N);
              return;
            case 3:
              switch (r) {
                case "template":
                  qe(w, r, N);
                  return;
                case "body":
                  if (!k.inScope("body")) return;
                  j = Jn;
                  return;
                case "html":
                  if (!k.inScope("body")) return;
                  (j = Jn), j(e, r, N);
                  return;
                case "address":
                case "article":
                case "aside":
                case "blockquote":
                case "button":
                case "center":
                case "details":
                case "dialog":
                case "dir":
                case "div":
                case "dl":
                case "fieldset":
                case "figcaption":
                case "figure":
                case "footer":
                case "header":
                case "hgroup":
                case "listing":
                case "main":
                case "menu":
                case "nav":
                case "ol":
                case "pre":
                case "section":
                case "summary":
                case "ul":
                  if (!k.inScope(r)) return;
                  k.generateImpliedEndTags(), k.popTag(r);
                  return;
                case "form":
                  if (k.contains("template")) {
                    if (!k.inScope("form")) return;
                    k.generateImpliedEndTags(), k.popTag("form");
                  } else {
                    var et = mt;
                    if (((mt = null), !et || !k.elementInScope(et))) return;
                    k.generateImpliedEndTags(), k.removeElement(et);
                  }
                  return;
                case "p":
                  k.inButtonScope(r)
                    ? (k.generateImpliedEndTags(r), k.popTag(r))
                    : (ue(d, r, null), j(e, r, N, I));
                  return;
                case "li":
                  if (!k.inListItemScope(r)) return;
                  k.generateImpliedEndTags(r), k.popTag(r);
                  return;
                case "dd":
                case "dt":
                  if (!k.inScope(r)) return;
                  k.generateImpliedEndTags(r), k.popTag(r);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  if (!k.elementTypeInScope(l.HTMLHeadingElement)) return;
                  k.generateImpliedEndTags(),
                    k.popElementType(l.HTMLHeadingElement);
                  return;
                case "sarcasm":
                  break;
                case "a":
                case "b":
                case "big":
                case "code":
                case "em":
                case "font":
                case "i":
                case "nobr":
                case "s":
                case "small":
                case "strike":
                case "strong":
                case "tt":
                case "u":
                  var nt = za(r);
                  if (nt) return;
                  break;
                case "applet":
                case "marquee":
                case "object":
                  if (!k.inScope(r)) return;
                  k.generateImpliedEndTags(), k.popTag(r), ve.clearToMarker();
                  return;
                case "br":
                  ue(d, r, null);
                  return;
              }
              for (J = k.elements.length - 1; J >= 0; J--)
                if (((fe = k.elements[J]), Ne(fe, r))) {
                  k.generateImpliedEndTags(r), k.popElement(fe);
                  break;
                } else if (Ne(fe, S)) return;
              return;
          }
        }
        function jr(e, r, N, I) {
          switch (e) {
            case 1:
              st(r);
              return;
            case -1:
              k.top instanceof l.HTMLScriptElement &&
                (k.top._already_started = !0),
                k.pop(),
                (j = dt),
                j(e);
              return;
            case 3:
              r === "script" ? Za() : (k.pop(), (j = dt));
              return;
            default:
              return;
          }
        }
        function Je(e, r, N, I) {
          function P(fe) {
            for (var ye = 0, Re = fe.length; ye < Re; ye++)
              if (fe[ye][0] === "type") return fe[ye][1].toLowerCase();
            return null;
          }
          switch (e) {
            case 1:
              if (an) {
                ue(e, r, N, I);
                return;
              } else if (Ne(k.top, ne)) {
                (kr = []), (dt = j), (j = Oi), j(e, r, N, I);
                return;
              }
              break;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "caption":
                  k.clearToContext(D), ve.insertMarker(), pe(r, N), (j = En);
                  return;
                case "colgroup":
                  k.clearToContext(D), pe(r, N), (j = Vr);
                  return;
                case "col":
                  Je(d, "colgroup", null), j(e, r, N, I);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  k.clearToContext(D), pe(r, N), (j = Wt);
                  return;
                case "td":
                case "th":
                case "tr":
                  Je(d, "tbody", null), j(e, r, N, I);
                  return;
                case "table":
                  if (!k.inTableScope(r)) return;
                  Je(w, r), j(e, r, N, I);
                  return;
                case "style":
                case "script":
                case "template":
                  qe(e, r, N, I);
                  return;
                case "input":
                  var J = P(N);
                  if (J !== "hidden") break;
                  pe(r, N), k.pop();
                  return;
                case "form":
                  if (mt || k.contains("template")) return;
                  (mt = pe(r, N)), k.popElement(mt);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "table":
                  if (!k.inTableScope(r)) return;
                  k.popTag(r), hr();
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
                case "template":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case -1:
              ue(e, r, N, I);
              return;
          }
          (Dt = !0), ue(e, r, N, I), (Dt = !1);
        }
        function Oi(e, r, N, I) {
          if (e === b) {
            if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
            kr.push(r);
          } else {
            var P = kr.join("");
            (kr.length = 0),
              Se.test(P) ? ((Dt = !0), ue(b, P), (Dt = !1)) : st(P),
              (j = dt),
              j(e, r, N, I);
          }
        }
        function En(e, r, N, I) {
          function P() {
            return k.inTableScope("caption")
              ? (k.generateImpliedEndTags(),
                k.popTag("caption"),
                ve.clearToMarker(),
                (j = Je),
                !0)
              : !1;
          }
          switch (e) {
            case 2:
              switch (r) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  P() && j(e, r, N, I);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "caption":
                  P();
                  return;
                case "table":
                  P() && j(e, r, N, I);
                  return;
                case "body":
                case "col":
                case "colgroup":
                case "html":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
              }
              break;
          }
          ue(e, r, N, I);
        }
        function Vr(e, r, N, I) {
          switch (e) {
            case 1:
              var P = r.match(ze);
              if (
                (P && (st(P[0]), (r = r.substring(P[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "col":
                  pe(r, N), k.pop();
                  return;
                case "template":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "colgroup":
                  if (!Ne(k.top, "colgroup")) return;
                  k.pop(), (j = Je);
                  return;
                case "col":
                  return;
                case "template":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case -1:
              ue(e, r, N, I);
              return;
          }
          Ne(k.top, "colgroup") && (Vr(w, "colgroup"), j(e, r, N, I));
        }
        function Wt(e, r, N, I) {
          function P() {
            (!k.inTableScope("tbody") &&
              !k.inTableScope("thead") &&
              !k.inTableScope("tfoot")) ||
              (k.clearToContext(B),
              Wt(w, k.top.localName, null),
              j(e, r, N, I));
          }
          switch (e) {
            case 2:
              switch (r) {
                case "tr":
                  k.clearToContext(B), pe(r, N), (j = mr);
                  return;
                case "th":
                case "td":
                  Wt(d, "tr", null), j(e, r, N, I);
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  P();
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "table":
                  P();
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  k.inTableScope(r) && (k.clearToContext(B), k.pop(), (j = Je));
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "td":
                case "th":
                case "tr":
                  return;
              }
              break;
          }
          Je(e, r, N, I);
        }
        function mr(e, r, N, I) {
          function P() {
            return k.inTableScope("tr")
              ? (k.clearToContext(W), k.pop(), (j = Wt), !0)
              : !1;
          }
          switch (e) {
            case 2:
              switch (r) {
                case "th":
                case "td":
                  k.clearToContext(W), pe(r, N), (j = Qt), ve.insertMarker();
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                case "tr":
                  P() && j(e, r, N, I);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "tr":
                  P();
                  return;
                case "table":
                  P() && j(e, r, N, I);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  k.inTableScope(r) && P() && j(e, r, N, I);
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "td":
                case "th":
                  return;
              }
              break;
          }
          Je(e, r, N, I);
        }
        function Qt(e, r, N, I) {
          switch (e) {
            case 2:
              switch (r) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  k.inTableScope("td")
                    ? (Qt(w, "td"), j(e, r, N, I))
                    : k.inTableScope("th") && (Qt(w, "th"), j(e, r, N, I));
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "td":
                case "th":
                  if (!k.inTableScope(r)) return;
                  k.generateImpliedEndTags(),
                    k.popTag(r),
                    ve.clearToMarker(),
                    (j = mr);
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                  return;
                case "table":
                case "tbody":
                case "tfoot":
                case "thead":
                case "tr":
                  if (!k.inTableScope(r)) return;
                  Qt(w, k.inTableScope("td") ? "td" : "th"), j(e, r, N, I);
                  return;
              }
              break;
          }
          ue(e, r, N, I);
        }
        function bt(e, r, N, I) {
          switch (e) {
            case 1:
              if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
              st(r);
              return;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case -1:
              ue(e, r, N, I);
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "option":
                  k.top instanceof l.HTMLOptionElement && bt(w, r), pe(r, N);
                  return;
                case "optgroup":
                  k.top instanceof l.HTMLOptionElement && bt(w, "option"),
                    k.top instanceof l.HTMLOptGroupElement && bt(w, r),
                    pe(r, N);
                  return;
                case "select":
                  bt(w, r);
                  return;
                case "input":
                case "keygen":
                case "textarea":
                  if (!k.inSelectScope("select")) return;
                  bt(w, "select"), j(e, r, N, I);
                  return;
                case "script":
                case "template":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "optgroup":
                  k.top instanceof l.HTMLOptionElement &&
                    k.elements[k.elements.length - 2] instanceof
                      l.HTMLOptGroupElement &&
                    bt(w, "option"),
                    k.top instanceof l.HTMLOptGroupElement && k.pop();
                  return;
                case "option":
                  k.top instanceof l.HTMLOptionElement && k.pop();
                  return;
                case "select":
                  if (!k.inSelectScope(r)) return;
                  k.popTag(r), hr();
                  return;
                case "template":
                  qe(e, r, N, I);
                  return;
              }
              break;
          }
        }
        function Gr(e, r, N, I) {
          switch (r) {
            case "caption":
            case "table":
            case "tbody":
            case "tfoot":
            case "thead":
            case "tr":
            case "td":
            case "th":
              switch (e) {
                case 2:
                  Gr(w, "select"), j(e, r, N, I);
                  return;
                case 3:
                  k.inTableScope(r) && (Gr(w, "select"), j(e, r, N, I));
                  return;
              }
          }
          bt(e, r, N, I);
        }
        function vn(e, r, N, I) {
          function P(J) {
            (j = J), (pt[pt.length - 1] = j), j(e, r, N, I);
          }
          switch (e) {
            case 1:
            case 4:
            case 5:
              ue(e, r, N, I);
              return;
            case -1:
              k.contains("template")
                ? (k.popTag("template"),
                  ve.clearToMarker(),
                  pt.pop(),
                  hr(),
                  j(e, r, N, I))
                : Gt();
              return;
            case 2:
              switch (r) {
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  qe(e, r, N, I);
                  return;
                case "caption":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  P(Je);
                  return;
                case "col":
                  P(Vr);
                  return;
                case "tr":
                  P(Wt);
                  return;
                case "td":
                case "th":
                  P(mr);
                  return;
              }
              P(ue);
              return;
            case 3:
              switch (r) {
                case "template":
                  qe(e, r, N, I);
                  return;
                default:
                  return;
              }
          }
        }
        function Jn(e, r, N, I) {
          switch (e) {
            case 1:
              if (Se.test(r)) break;
              ue(e, r);
              return;
            case 4:
              k.elements[0]._appendChild(we.createComment(r));
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              if (r === "html") {
                ue(e, r, N, I);
                return;
              }
              break;
            case 3:
              if (r === "html") {
                if (jt) return;
                j = qi;
                return;
              }
              break;
          }
          (j = ue), j(e, r, N, I);
        }
        function Tn(e, r, N, I) {
          switch (e) {
            case 1:
              (r = r.replace(Xe, "")), r.length > 0 && st(r);
              return;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "frameset":
                  pe(r, N);
                  return;
                case "frame":
                  pe(r, N), k.pop();
                  return;
                case "noframes":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case 3:
              if (r === "frameset") {
                if (jt && k.top instanceof l.HTMLHtmlElement) return;
                k.pop(),
                  !jt && !(k.top instanceof l.HTMLFrameSetElement) && (j = Hi);
                return;
              }
              break;
          }
        }
        function Hi(e, r, N, I) {
          switch (e) {
            case 1:
              (r = r.replace(Xe, "")), r.length > 0 && st(r);
              return;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "noframes":
                  qe(e, r, N, I);
                  return;
              }
              break;
            case 3:
              if (r === "html") {
                j = Pi;
                return;
              }
              break;
          }
        }
        function qi(e, r, N, I) {
          switch (e) {
            case 1:
              if (Se.test(r)) break;
              ue(e, r, N, I);
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              ue(e, r, N, I);
              return;
            case -1:
              Gt();
              return;
            case 2:
              if (r === "html") {
                ue(e, r, N, I);
                return;
              }
              break;
          }
          (j = ue), j(e, r, N, I);
        }
        function Pi(e, r, N, I) {
          switch (e) {
            case 1:
              (r = r.replace(Xe, "")), r.length > 0 && ue(e, r, N, I);
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              ue(e, r, N, I);
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, I);
                  return;
                case "noframes":
                  qe(e, r, N, I);
                  return;
              }
              break;
          }
        }
        function ea(e, r, N, I) {
          function P(Re) {
            for (var je = 0, et = Re.length; je < et; je++)
              switch (Re[je][0]) {
                case "color":
                case "face":
                case "size":
                  return !0;
              }
            return !1;
          }
          var J;
          switch (e) {
            case 1:
              He && Ye.test(r) && (He = !1),
                kt && (r = r.replace(Et, "\uFFFD")),
                st(r);
              return;
            case 4:
              it(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "font":
                  if (!P(N)) break;
                case "b":
                case "big":
                case "blockquote":
                case "body":
                case "br":
                case "center":
                case "code":
                case "dd":
                case "div":
                case "dl":
                case "dt":
                case "em":
                case "embed":
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "head":
                case "hr":
                case "i":
                case "img":
                case "li":
                case "listing":
                case "menu":
                case "meta":
                case "nobr":
                case "ol":
                case "p":
                case "pre":
                case "ruby":
                case "s":
                case "small":
                case "span":
                case "strong":
                case "strike":
                case "sub":
                case "sup":
                case "table":
                case "tt":
                case "u":
                case "ul":
                case "var":
                  if (jt) break;
                  do k.pop(), (J = k.top);
                  while (J.namespaceURI !== a.HTML && !ir(J) && !ft(J));
                  Pe(e, r, N, I);
                  return;
              }
              (J = k.elements.length === 1 && jt ? V : k.top),
                J.namespaceURI === a.MATHML
                  ? sr(N)
                  : J.namespaceURI === a.SVG && ((r = vr(r)), Pt(N)),
                Kt(N),
                cn(r, N, J.namespaceURI),
                I && (r === "script" && (J.namespaceURI, a.SVG), k.pop());
              return;
            case 3:
              if (
                ((J = k.top),
                r === "script" &&
                  J.namespaceURI === a.SVG &&
                  J.localName === "script")
              )
                k.pop();
              else
                for (var fe = k.elements.length - 1, ye = k.elements[fe]; ; ) {
                  if (ye.localName.toLowerCase() === r) {
                    k.popElement(ye);
                    break;
                  }
                  if (((ye = k.elements[--fe]), ye.namespaceURI === a.HTML)) {
                    j(e, r, N, I);
                    break;
                  }
                }
              return;
          }
        }
        return (
          (Lr.testTokenizer = function (e, r, N, I) {
            var P = [];
            switch (r) {
              case "PCDATA state":
                x = Te;
                break;
              case "RCDATA state":
                x = At;
                break;
              case "RAWTEXT state":
                x = dr;
                break;
              case "PLAINTEXT state":
                x = un;
                break;
            }
            if (
              (N && (yr = N),
              (Pe = function (fe, ye, Re, je) {
                switch ((Yt(), fe)) {
                  case 1:
                    P.length > 0 && P[P.length - 1][0] === "Character"
                      ? (P[P.length - 1][1] += ye)
                      : P.push(["Character", ye]);
                    break;
                  case 4:
                    P.push(["Comment", ye]);
                    break;
                  case 5:
                    P.push([
                      "DOCTYPE",
                      ye,
                      Re === void 0 ? null : Re,
                      je === void 0 ? null : je,
                      !nn,
                    ]);
                    break;
                  case 2:
                    for (
                      var et = Object.create(null), nt = 0;
                      nt < Re.length;
                      nt++
                    ) {
                      var $t = Re[nt];
                      $t.length === 1 ? (et[$t[0]] = "") : (et[$t[0]] = $t[1]);
                    }
                    var Ot = ["StartTag", ye, et];
                    je && Ot.push(!0), P.push(Ot);
                    break;
                  case 3:
                    P.push(["EndTag", ye]);
                    break;
                  case -1:
                    break;
                }
              }),
              !I)
            )
              this.parse(e, !0);
            else {
              for (var J = 0; J < e.length; J++) this.parse(e[J]);
              this.parse("", !0);
            }
            return P;
          }),
          Lr
        );
      }
    },
  }),
  tn = le({
    "external/npm/node_modules/domino/lib/DOMImplementation.js"(_, E) {
      "use strict";
      E.exports = l;
      var h = In(),
        s = Rn(),
        t = On(),
        a = Be(),
        c = Ln();
      function l(i) {
        this.contextObject = i;
      }
      var f = {
        xml: { "": !0, "1.0": !0, "2.0": !0 },
        core: { "": !0, "2.0": !0 },
        html: { "": !0, "1.0": !0, "2.0": !0 },
        xhtml: { "": !0, "1.0": !0, "2.0": !0 },
      };
      l.prototype = {
        hasFeature: function (b, d) {
          var w = f[(b || "").toLowerCase()];
          return (w && w[d || ""]) || !1;
        },
        createDocumentType: function (b, d, w) {
          return (
            c.isValidQName(b) || a.InvalidCharacterError(),
            new s(this.contextObject, b, d, w)
          );
        },
        createDocument: function (b, d, w) {
          var R = new h(!1, null),
            q;
          return (
            d ? (q = R.createElementNS(b, d)) : (q = null),
            w && R.appendChild(w),
            q && R.appendChild(q),
            b === a.NAMESPACE.HTML
              ? (R._contentType = "application/xhtml+xml")
              : b === a.NAMESPACE.SVG
                ? (R._contentType = "image/svg+xml")
                : (R._contentType = "application/xml"),
            R
          );
        },
        createHTMLDocument: function (b) {
          var d = new h(!0, null);
          d.appendChild(new s(d, "html"));
          var w = d.createElement("html");
          d.appendChild(w);
          var R = d.createElement("head");
          if ((w.appendChild(R), b !== void 0)) {
            var q = d.createElement("title");
            R.appendChild(q), q.appendChild(d.createTextNode(b));
          }
          return w.appendChild(d.createElement("body")), (d.modclock = 1), d;
        },
        mozSetOutputMutationHandler: function (i, b) {
          i.mutationHandler = b;
        },
        mozGetInputMutationHandler: function (i) {
          a.nyi();
        },
        mozHTMLParser: t,
      };
    },
  }),
  ks = le({
    "external/npm/node_modules/domino/lib/Location.js"(_, E) {
      "use strict";
      var h = An(),
        s = Ia();
      E.exports = t;
      function t(a, c) {
        (this._window = a), (this._href = c);
      }
      t.prototype = Object.create(s.prototype, {
        constructor: { value: t },
        href: {
          get: function () {
            return this._href;
          },
          set: function (a) {
            this.assign(a);
          },
        },
        assign: {
          value: function (a) {
            var c = new h(this._href),
              l = c.resolve(a);
            this._href = l;
          },
        },
        replace: {
          value: function (a) {
            this.assign(a);
          },
        },
        reload: {
          value: function () {
            this.assign(this.href);
          },
        },
        toString: {
          value: function () {
            return this.href;
          },
        },
      });
    },
  }),
  Ls = le({
    "external/npm/node_modules/domino/lib/NavigatorID.js"(_, E) {
      "use strict";
      var h = Object.create(null, {
        appCodeName: { value: "Mozilla" },
        appName: { value: "Netscape" },
        appVersion: { value: "4.0" },
        platform: { value: "" },
        product: { value: "Gecko" },
        productSub: { value: "20100101" },
        userAgent: { value: "" },
        vendor: { value: "" },
        vendorSub: { value: "" },
        taintEnabled: {
          value: function () {
            return !1;
          },
        },
      });
      E.exports = h;
    },
  }),
  Cs = le({
    "external/npm/node_modules/domino/lib/WindowTimers.js"(_, E) {
      "use strict";
      var h = { setTimeout, clearTimeout, setInterval, clearInterval };
      E.exports = h;
    },
  }),
  Ha = le({
    "external/npm/node_modules/domino/lib/impl.js"(_, E) {
      "use strict";
      var h = Be();
      (_ = E.exports =
        {
          CSSStyleDeclaration: Mn(),
          CharacterData: Jr(),
          Comment: Ca(),
          DOMException: wn(),
          DOMImplementation: tn(),
          DOMTokenList: Na(),
          Document: In(),
          DocumentFragment: Da(),
          DocumentType: Rn(),
          Element: Er(),
          HTMLParser: On(),
          NamedNodeMap: Sa(),
          Node: Ve(),
          NodeList: ar(),
          NodeFilter: en(),
          ProcessingInstruction: Aa(),
          Text: La(),
          Window: qa(),
        }),
        h.merge(_, xa()),
        h.merge(_, xn().elements),
        h.merge(_, Oa().elements);
    },
  }),
  qa = le({
    "external/npm/node_modules/domino/lib/Window.js"(_, E) {
      "use strict";
      var h = tn(),
        s = Ea(),
        t = ks(),
        a = Be();
      E.exports = c;
      function c(l) {
        (this.document = l || new h(null).createHTMLDocument("")),
          (this.document._scripting_enabled = !0),
          (this.document.defaultView = this),
          (this.location = new t(
            this,
            this.document._address || "about:blank",
          ));
      }
      (c.prototype = Object.create(s.prototype, {
        console: { value: console },
        history: { value: { back: a.nyi, forward: a.nyi, go: a.nyi } },
        navigator: { value: Ls() },
        window: {
          get: function () {
            return this;
          },
        },
        self: {
          get: function () {
            return this;
          },
        },
        frames: {
          get: function () {
            return this;
          },
        },
        parent: {
          get: function () {
            return this;
          },
        },
        top: {
          get: function () {
            return this;
          },
        },
        length: { value: 0 },
        frameElement: { value: null },
        opener: { value: null },
        onload: {
          get: function () {
            return this._getEventHandler("load");
          },
          set: function (l) {
            this._setEventHandler("load", l);
          },
        },
        getComputedStyle: {
          value: function (f) {
            return f.style;
          },
        },
      })),
        a.expose(Cs(), c),
        a.expose(Ha(), c);
    },
  }),
  Ds = le({
    "external/npm/node_modules/domino/lib/index.js"(_) {
      var E = tn(),
        h = On(),
        s = qa(),
        t = Ha();
      (_.createDOMImplementation = function () {
        return new E(null);
      }),
        (_.createDocument = function (a, c) {
          if (a || c) {
            var l = new h();
            return l.parse(a || "", !0), l.document();
          }
          return new E(null).createHTMLDocument("");
        }),
        (_.createIncrementalHTMLParser = function () {
          var a = new h();
          return {
            write: function (c) {
              c.length > 0 &&
                a.parse(c, !1, function () {
                  return !0;
                });
            },
            end: function (c) {
              a.parse(c || "", !0, function () {
                return !0;
              });
            },
            process: function (c) {
              return a.parse("", !1, c);
            },
            document: function () {
              return a.document();
            },
          };
        }),
        (_.createWindow = function (a, c) {
          var l = _.createDocument(a);
          return c !== void 0 && (l._address = c), new t.Window(l);
        }),
        (_.impl = t);
    },
  }),
  ga = Ds();
function As() {
  Object.assign(globalThis, ga.impl),
    (globalThis.KeyboardEvent = ga.impl.Event);
}
As();
