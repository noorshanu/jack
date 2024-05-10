(() => {
  "use strict";
  const t = {};
  function e() {
    if (location.hash) return location.hash.replace("#", "");
  }
  let o = !0,
    s = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < s.length; t++) {
            s[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    },
    n = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let s = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < s.length; t++) {
          s[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    };
  function i() {
    s(), document.documentElement.classList.remove("menu-open");
  }
  function a(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function r(t) {
    return t.filter(function (t, e, o) {
      return o.indexOf(t) === e;
    });
  }
  t.popup = new (class {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-popup-youtube",
        youtubePlaceAttribute: "data-popup-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      this.youTubeCode,
        (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        (this.bodyLock = !1),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Прокинувся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              (this.youTubeCode = e.getAttribute(this.options.youtubeAttribute)
                ? e.getAttribute(this.options.youtubeAttribute)
                : null),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Йой, не заповнено атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (o)
        if (
          ((this.bodyLock = !(
            !document.documentElement.classList.contains("lock") || this.isOpen
          )),
          t &&
            "string" == typeof t &&
            "" !== t.trim() &&
            ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector
          )),
          this.targetOpen.element)
        ) {
          if (this.youTubeCode) {
            const t = `https://www.youtube.com/embed/${this.youTubeCode}?rel=0&showinfo=0&autoplay=1`,
              e = document.createElement("iframe");
            e.setAttribute("allowfullscreen", "");
            const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
            if (
              (e.setAttribute("allow", `${o}; encrypted-media`),
              e.setAttribute("src", t),
              !this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ))
            ) {
              this.targetOpen.element
                .querySelector(".popup__text")
                .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
            }
            this.targetOpen.element
              .querySelector(`[${this.options.youtubePlaceAttribute}]`)
              .appendChild(e);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            document.dispatchEvent(
              new CustomEvent("beforePopupOpen", { detail: { popup: this } })
            ),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive
            ),
            document.documentElement.classList.add(
              this.options.classes.bodyActive
            ),
            this._reopen ? (this._reopen = !1) : !this.bodyLock && n(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.options.on.afterOpen(this),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } })
            ),
            this.popupLogging("Відкрив попап");
        } else
          this.popupLogging(
            "Йой, такого попапу немає. Перевірте коректність введення. "
          );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          o &&
          (this.options.on.beforeClose(this),
          document.dispatchEvent(
            new CustomEvent("beforePopupClose", { detail: { popup: this } })
          ),
          this.youTubeCode &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.documentElement.classList.remove(
              this.options.classes.bodyActive
            ),
            !this.bodyLock && s(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          document.dispatchEvent(
            new CustomEvent("afterPopupClose", { detail: { popup: this } })
          ),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрив попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      const e = document.querySelector(
        `[${this.options.attributeOpenButton} = "${t}"]`
      )
        ? document.querySelector(
            `[${this.options.attributeOpenButton} = "${t}"]`
          )
        : document.querySelector(
            `[${this.options.attributeOpenButton} = "${t.replace(".", "#")}"]`
          );
      (this.youTubeCode = e.getAttribute(this.options.youtubeAttribute)
        ? e.getAttribute(this.options.youtubeAttribute)
        : null),
        e && t && this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        o = Array.prototype.slice.call(e),
        s = o.indexOf(document.activeElement);
      t.shiftKey && 0 === s && (o[o.length - 1].focus(), t.preventDefault()),
        t.shiftKey || s !== o.length - 1 || (o[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && a(`[Попапос]: ${t}`);
    }
  })({});
  let c = (t, e = !1, o = 500, s = 0) => {
    const n = document.querySelector(t);
    if (n) {
      let r = "",
        c = 0;
      if (e) {
        r = "header.header";
        const t = document.querySelector(r);
        t.classList.contains("_header-scroll")
          ? (c = t.offsetHeight)
          : ((t.style.cssText = "transition-duration: 0s;"),
            t.classList.add("_header-scroll"),
            (c = t.offsetHeight),
            t.classList.remove("_header-scroll"),
            setTimeout(() => {
              t.style.cssText = "";
            }, 0));
      }
      let l = {
        speedAsDuration: !0,
        speed: o,
        header: r,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") && i(),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", l);
      else {
        let t = n.getBoundingClientRect().top + scrollY;
        (t = c ? t - c : t),
          (t = s ? t - s : t),
          window.scrollTo({ top: t, behavior: "smooth" });
      }
      a(`[gotoBlock]: Юхуу...їдемо до ${t}`);
    } else a(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${t}`);
  };
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Прокинувся, стежу за об'єктами (${t.length})...`
        ),
          r(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let o = e.split("|"),
              s = { root: o[0], margin: o[1], threshold: o[2] },
              n = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  n = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === s.root &&
                  String(o) === s.margin &&
                  String(n) === s.threshold
                )
                  return t;
              }),
              i = this.getScrollWatcherConfig(s);
            this.scrollWatcherInit(n, i);
          });
      } else
        this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... батьківського об'єкта ${t.root} немає на сторінці`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "йой, налаштування data-watch-margin потрібно задавати в PX або %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я бачу ${e.classList}, додав клас _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не бачу ${e.classList}, прибрав клас _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестав стежити за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && a(`[Спостерігач]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const o = t.target;
      this.scrollWatcherIntersecting(t, o),
        o.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(o, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  class l {
    constructor(t) {
      t.length &&
        (this.elements = Array.from(t).map((t) => new l.Each(t, this.options)));
    }
    destroyEvents() {
      this.elements.forEach((t) => {
        t.destroyEvents();
      });
    }
    setEvents() {
      this.elements.forEach((t) => {
        t.setEvents();
      });
    }
  }
  (l.Each = class {
    constructor(t) {
      (this.parent = t),
        (this.elements = this.parent.querySelectorAll("[data-prlx]")),
        (this.animation = this.animationFrame.bind(this)),
        (this.offset = 0),
        (this.value = 0),
        (this.smooth = t.dataset.prlxSmooth
          ? Number(t.dataset.prlxSmooth)
          : 15),
        this.setEvents();
    }
    setEvents() {
      this.animationID = window.requestAnimationFrame(this.animation);
    }
    destroyEvents() {
      window.cancelAnimationFrame(this.animationID);
    }
    animationFrame() {
      const t = this.parent.getBoundingClientRect().top,
        e = this.parent.offsetHeight,
        o = window.innerHeight,
        s = t - o,
        n = t + e,
        i = this.parent.dataset.prlxCenter
          ? this.parent.dataset.prlxCenter
          : "center";
      if (s < 30 && n > -30)
        switch (i) {
          case "top":
            this.offset = -1 * t;
            break;
          case "center":
            this.offset = o / 2 - (t + e / 2);
            break;
          case "bottom":
            this.offset = o - (t + e);
        }
      (this.value += (this.offset - this.value) / this.smooth),
        (this.animationID = window.requestAnimationFrame(this.animation)),
        this.elements.forEach((t) => {
          const e = {
            axis: t.dataset.axis ? t.dataset.axis : "v",
            direction: t.dataset.direction ? t.dataset.direction + "1" : "-1",
            coefficient: t.dataset.coefficient
              ? Number(t.dataset.coefficient)
              : 5,
            additionalProperties: t.dataset.properties
              ? t.dataset.properties
              : "",
          };
          this.parameters(t, e);
        });
    }
    parameters(t, e) {
      "v" == e.axis
        ? (t.style.transform = `translate3D(0, ${(
            e.direction *
            (this.value / e.coefficient)
          ).toFixed(2)}px,0) ${e.additionalProperties}`)
        : "h" == e.axis &&
          (t.style.transform = `translate3D(${(
            e.direction *
            (this.value / e.coefficient)
          ).toFixed(2)}px,0,0) ${e.additionalProperties}`);
    }
  }),
    document.querySelectorAll("[data-prlx-parent]") &&
      (t.parallax = new l(document.querySelectorAll("[data-prlx-parent]")));
  let h = !1;
  setTimeout(() => {
    if (h) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  const u = document.querySelectorAll(
      ".book-top-how-to-buy__item--front .book-top-how-to-buy__item-button"
    ),
    d = document.querySelectorAll(
      ".book-top-how-to-buy__item--back .book-top-how-to-buy__item-button"
    ),
    p = window.innerWidth;
  u.forEach((t) => {
    t.addEventListener("click", () => {
      p > 767.98
        ? ((t.parentElement.parentElement.style.transformOrigin = "left"),
          (t.parentElement.parentElement.style.transform = "rotateY(-180deg)"),
          t.parentElement.parentElement.classList.add("open"))
        : ((t.parentElement.parentElement.style.transformOrigin = "top"),
          (t.parentElement.parentElement.style.transform = "rotateX(180deg)"),
          t.parentElement.parentElement.classList.add("open"));
    });
  }),
    d.forEach((t) => {
      t.addEventListener("click", () => {
        p > 767.98
          ? ((t.parentElement.parentElement.style.transformOrigin = "left"),
            (t.parentElement.parentElement.style.transform = "rotateY(0)"),
            t.parentElement.parentElement.classList.remove("open"))
          : ((t.parentElement.parentElement.style.transformOrigin = "top"),
            (t.parentElement.parentElement.style.transform = "rotateX(0)"),
            t.parentElement.parentElement.classList.remove("open"));
      });
    });
  const m = document.querySelectorAll(".top-how-to-buy__button"),
    g = document.querySelectorAll(".top-how-to-buy__book");
  m.forEach((t, e) => {
    t.addEventListener("click", () => {
      g.forEach((t) => {
        t.classList.remove("active"), t === g[e] && t.classList.add("active");
      }),
        m.forEach((t) => {
          t.classList.remove("active");
        }),
        t.classList.add("active");
    });
  });
  const f = document.querySelectorAll(".bottom-how-to-buy__button"),
    b = document.querySelectorAll(".bottom-how-to-buy__item");
  f.forEach((t, e) => {
    t.addEventListener("click", () => {
      b.forEach((t) => {
        t.classList.remove("active"), t === b[e] && t.classList.add("active");
      }),
        f.forEach((t) => {
          t.classList.remove("active");
        }),
        t.classList.add("active");
    });
  });
  const w = document.querySelector(".line__cloud-button");
  var y, v, E, L, A, O;
  w &&
    (w.onclick = async function () {
      try {
        const t = "GwDx5WdbweDVrBsj98Vf1e65RSe1xPecgqzZLhpcAY1w";
        await navigator.clipboard.writeText(t),
          (document.location.href = window.location.href + "#popup");
      } catch (t) {
        console.error(t.message);
      }
    }),
    (y = window),
    (v = document),
    (E = "script"),
    y.twq ||
      (((L = y.twq =
        function () {
          L.exe ? L.exe.apply(L, arguments) : L.queue.push(arguments);
        }).version = "1.1"),
      (L.queue = []),
      ((A = v.createElement(E)).async = !0),
      (A.src = "https://static.ads-twitter.com/uwt.js"),
      (O = v.getElementsByTagName(E)[0]).parentNode.insertBefore(A, O)),
    twq("config", "oiwln"),
    (window.FLS = !1),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    document.documentElement.classList.contains("loading") ||
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (t) {
        o &&
          t.target.closest(".icon-menu") &&
          (((t = 500) => {
            document.documentElement.classList.contains("lock") ? s(t) : n(t);
          })(),
          document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      function o(e) {
        if ("click" === e.type) {
          const o = e.target;
          if (o.closest("[data-goto]")) {
            const s = o.closest("[data-goto]"),
              n = s.dataset.goto ? s.dataset.goto : "",
              a = !!s.hasAttribute("data-goto-header"),
              r = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : 500,
              l = s.dataset.gotoTop ? parseInt(s.dataset.gotoTop) : 0;
            if (t.fullpage) {
              const e = document
                  .querySelector(`${n}`)
                  .closest("[data-fp-section]"),
                o = e ? +e.dataset.fpId : null;
              null !== o &&
                (t.fullpage.switchingSection(o),
                document.documentElement.classList.contains("menu-open") &&
                  i());
            } else c(n, a, r, l);
            e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            o = t.target;
          if ("navigator" === o.dataset.watch) {
            document.querySelector("[data-goto]._navigator-active");
            let e;
            if (o.id && document.querySelector(`[data-goto="#${o.id}"]`))
              e = document.querySelector(`[data-goto="#${o.id}"]`);
            else if (o.classList.length)
              for (let t = 0; t < o.classList.length; t++) {
                const s = o.classList[t];
                if (document.querySelector(`[data-goto=".${s}"]`)) {
                  e = document.querySelector(`[data-goto=".${s}"]`);
                  break;
                }
              }
            t.isIntersecting
              ? e && e.classList.add("_navigator-active")
              : e && e.classList.remove("_navigator-active");
          }
        }
      }
      if (
        (document.addEventListener("click", o),
        document.addEventListener("watcherCallback", o),
        e())
      ) {
        let t;
        document.querySelector(`#${e()}`)
          ? (t = `#${e()}`)
          : document.querySelector(`.${e()}`) && (t = `.${e()}`),
          t && c(t, !0, 500, 20);
      }
    })();
})();
