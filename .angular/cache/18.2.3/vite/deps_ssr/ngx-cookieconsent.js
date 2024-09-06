import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  CommonModule,
  DOCUMENT
} from "./chunk-M26M6KQO.js";
import {
  Inject,
  Injectable,
  NgModule,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-DH64UGMO.js";
import {
  require_cjs
} from "./chunk-VDZEJD3D.js";
import {
  __toESM
} from "./chunk-NQ4HTGF6.js";

// node_modules/ngx-cookieconsent/fesm2022/ngx-cookieconsent.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var _WindowService = class _WindowService {
  constructor(_doc) {
    this._doc = _doc;
  }
  get nativeWindow() {
    return this._doc?.defaultView || window;
  }
};
_WindowService.ɵfac = function WindowService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WindowService)(ɵɵinject(DOCUMENT));
};
_WindowService.ɵprov = ɵɵdefineInjectable({
  token: _WindowService,
  factory: _WindowService.ɵfac
});
var WindowService = _WindowService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WindowService, [{
    type: Injectable
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var _NgcCookieConsentConfig = class _NgcCookieConsentConfig {
  constructor() {
    this.enabled = true;
    this.whitelistPage = [];
    this.blacklistPage = [];
  }
};
_NgcCookieConsentConfig.ɵfac = function NgcCookieConsentConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgcCookieConsentConfig)();
};
_NgcCookieConsentConfig.ɵprov = ɵɵdefineInjectable({
  token: _NgcCookieConsentConfig,
  factory: _NgcCookieConsentConfig.ɵfac
});
var NgcCookieConsentConfig = _NgcCookieConsentConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgcCookieConsentConfig, [{
    type: Injectable
  }], null, null);
})();
var _NgcCookieConsentService = class _NgcCookieConsentService {
  constructor(windowService, config) {
    this.popupOpenSource = new import_rxjs.Subject();
    this.popupCloseSource = new import_rxjs.Subject();
    this.initializingSource = new import_rxjs.Subject();
    this.initializedSource = new import_rxjs.Subject();
    this.initializationErrorSource = new import_rxjs.Subject();
    this.statusChangeSource = new import_rxjs.Subject();
    this.revokeChoiceSource = new import_rxjs.Subject();
    this.noCookieLawSource = new import_rxjs.Subject();
    this.popupOpen$ = this.popupOpenSource.asObservable();
    this.popupClose$ = this.popupCloseSource.asObservable();
    this.initializing$ = this.initializingSource.asObservable();
    this.initialized$ = this.initializedSource.asObservable();
    this.initializationError$ = this.initializationErrorSource.asObservable();
    this.statusChange$ = this.statusChangeSource.asObservable();
    this.revokeChoice$ = this.revokeChoiceSource.asObservable();
    this.noCookieLaw$ = this.noCookieLawSource.asObservable();
    this.window = windowService.nativeWindow;
    this.init(config);
  }
  checkPopupInstantiated(method) {
    if (this.popupInstance == null) {
      throw new Error(`Cookie popup has not yet been instantiated. Cannot invoke ${method}()`);
    }
  }
  /**
   * Initializes Cookie Consent with the provided configuration.
   * @param config the configuration object
   */
  init(config) {
    if (this.window && this.window.cookieconsent) {
      this.cookieconsent = this.window.cookieconsent;
      this.config = config;
      this.config.onPopupOpen = () => this.popupOpenSource.next();
      this.config.onPopupClose = () => this.popupCloseSource.next();
      this.config.onInitialise = (status) => this.initializingSource.next({
        status
      });
      this.config.onStatusChange = (status, chosenBefore) => {
        this.statusChangeSource.next({
          status,
          chosenBefore
        });
      };
      this.config.onRevokeChoice = () => this.revokeChoiceSource.next();
      this.config.onNoCookieLaw = (countryCode, country) => {
        this.noCookieLawSource.next({
          countryCode,
          country
        });
      };
      this.cookieconsent.initialise(this.config, (popup) => {
        this.popupInstance = popup;
        this.initializedSource.next();
      }, (error, popup) => {
        this.initializationErrorSource.next({
          error
        });
      });
    }
  }
  /**
   * Gets the current configuration  used by the Cookie Consent.
   */
  getConfig() {
    return this.config;
  }
  /**
   * Gets the current cookie status.
   */
  getStatus() {
    return this.cookieconsent.status;
  }
  /**
   * Gets the current browser support for translations
   */
  getTransition() {
    return this.cookieconsent.hasTransition;
  }
  /**
   * Clears the current cookie status.
   */
  clearStatus() {
    this.checkPopupInstantiated("clearStatus");
    return this.popupInstance.clearStatus();
  }
  open() {
    this.checkPopupInstantiated("open");
    return this.popupInstance.open();
  }
  close(showRevoke) {
    this.checkPopupInstantiated("close");
    return this.popupInstance.close(showRevoke);
  }
  destroy() {
    this.checkPopupInstantiated("destroy");
    this.popupInstance.destroy();
  }
  fadeIn() {
    this.checkPopupInstantiated("fadeIn");
    this.popupInstance.fadeIn();
  }
  fadeOut() {
    this.checkPopupInstantiated("fadeOut");
    this.popupInstance.fadeOut();
  }
  isOpen() {
    this.checkPopupInstantiated("isOpen");
    return this.popupInstance.isOpen();
  }
  toggleRevokeButton(show) {
    this.checkPopupInstantiated("toggleRevokeButton");
    this.popupInstance.toggleRevokeButton(show);
  }
  hasAnswered() {
    this.checkPopupInstantiated("hasAnswered");
    return this.popupInstance.hasAnswered();
  }
  hasConsented() {
    this.checkPopupInstantiated("hasConsented");
    return this.popupInstance.hasConsented();
  }
};
_NgcCookieConsentService.ɵfac = function NgcCookieConsentService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgcCookieConsentService)(ɵɵinject(WindowService), ɵɵinject(NgcCookieConsentConfig));
};
_NgcCookieConsentService.ɵprov = ɵɵdefineInjectable({
  token: _NgcCookieConsentService,
  factory: _NgcCookieConsentService.ɵfac
});
var NgcCookieConsentService = _NgcCookieConsentService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgcCookieConsentService, [{
    type: Injectable
  }], function() {
    return [{
      type: WindowService
    }, {
      type: NgcCookieConsentConfig
    }];
  }, null);
})();
function provideNgcCookieConsent(config) {
  return [[WindowService, {
    provide: NgcCookieConsentConfig,
    useValue: config
  }, NgcCookieConsentService]];
}
var _NgcCookieConsentModule = class _NgcCookieConsentModule {
  static forRoot(config) {
    return {
      ngModule: _NgcCookieConsentModule,
      providers: provideNgcCookieConsent(config)
    };
  }
};
_NgcCookieConsentModule.ɵfac = function NgcCookieConsentModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgcCookieConsentModule)();
};
_NgcCookieConsentModule.ɵmod = ɵɵdefineNgModule({
  type: _NgcCookieConsentModule,
  imports: [CommonModule]
});
_NgcCookieConsentModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var NgcCookieConsentModule = _NgcCookieConsentModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgcCookieConsentModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule]
    }]
  }], null, null);
})();
var NgcPaletteOptions = class {
  constructor() {
    this.popup = {
      background: "#000000",
      text: "#fff",
      link: "#fff"
    };
    this.button = {
      background: "transparent",
      border: "#f8e71c",
      text: "#f8e71c"
    };
    this.highlight = {
      background: "#f8e71c",
      border: "#f8e71c",
      text: "#000000"
    };
  }
};
var NgcLocationOptions = class {
  constructor() {
    this.timeout = 5e3;
    this.services = ["freegeoip", "ipinfo", "maxmind"];
  }
};
var NgcLawOptions = class {
  constructor() {
    this.regionalLaw = true;
  }
};
var NgcHTMLElements = class {
  constructor() {
    this.header = '<span class="cc-header">{{header}}</span>&nbsp;';
    this.message = '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>';
    this.messagelink = '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank" rel="noopener">{{link}}</a></span>';
    this.dismiss = '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>';
    this.allow = '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow">{{allow}}</a>';
    this.deny = '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny">{{deny}}</a>';
    this.link = '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank" rel="noopener">{{link}}</a>';
    this.close = '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>';
  }
};
var NgcCookieOptions = class {
  constructor() {
    this.name = "cookieconsent_status";
    this.path = "/";
    this.domain = "";
    this.expiryDays = 365;
    this.secure = false;
  }
};
var NgcContentOptions = class {
  constructor() {
    this.header = "Cookies used on the website!";
    this.message = "This website uses cookies to ensure you get the best experience on our website.";
    this.dismiss = "Got it!";
    this.allow = "Allow cookies";
    this.deny = "Decline";
    this.link = "Learn more";
    this.href = "https://cookiesandyou.com";
    this.close = "&#x274c;";
    this.policy = "Cookie Policy";
    this.target = "_blank";
  }
};
export {
  NgcContentOptions,
  NgcCookieConsentConfig,
  NgcCookieConsentModule,
  NgcCookieConsentService,
  NgcCookieOptions,
  NgcHTMLElements,
  NgcLawOptions,
  NgcLocationOptions,
  NgcPaletteOptions,
  WindowService,
  provideNgcCookieConsent
};
//# sourceMappingURL=ngx-cookieconsent.js.map
