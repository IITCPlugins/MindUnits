// ==UserScript==
// @name            IITC plugin: MindUnits
// @id              iitc_plugin_mindunits
// @category        Misc
// @version         1.3.2
// @namespace       https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL       https://github.com/IITCPlugins/MindUnits/raw/main/dist/iitc_plugin_mindunits.meta.js
// @downloadURL     https://github.com/IITCPlugins/MindUnits/raw/main/dist/iitc_plugin_mindunits.user.js
// @description     Estimate field MUs (and log existing fields)
// @match           https://intel.ingress.com/*
// @author          McBen
// @icon64          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA2xSURBVHic3Zt5cJ3VecZ/3/3urrtfyZK1WF4kS5YsSw4QswbGmBBDCI4JbUJpyzAQmGba0jS0TOiStklaQgJkUloomaZpghmGYYgxNkmcmIFaGDtEkq3Fi2RL8qJdutLV3b+tf3y+17rSlaUrXUltnhmPR0dnec+j8z7nPee8H6ws3Cs8/oqhGPhvQAU+BD65suYsH6zA00AI0Kb8U4EfoxPzO4v7gW4uT7qwsFDbvn27VlFRoQmCkCRiEvg6OlHLAmEZxtgKvAB8CsDhcFBXV0dZWVmqwuTkJC0tLfT39yeLLqKvlJ+gE7NkWEoC/MDfAV8BRKPRSFVVFZs2bcJgMGRsMDg4SHNzM8FgMFl0FPjzy/8vCZaCABPwJ8A/AG5BEFizZg319fVYrVdWdqxgC6NVf4wp2EP+qR9jSOiTVlWVs2fP0tbWhiRJoOvDq8CTwGCujc01ATuA7wM1AH6/n4aGBvx+f6qCZF/N6OZHiTnXXTFClfB2v42z910ETQEgkUjQ3t5OV1cXmqaBLpzfA/4ZiOfK4FwRUAU8B9wFYLPZqKurY+3atakKqsnO+MYvMVl0IxqZXUCUgvjO7CFv4MqKDwQCtLS0MDw8nCzqQhfKN3Jh+GIJ8ALfQF/yRlEUqa6uprq6GlEUL49gIFi+k/F1n0M1mNMai0oUVbSiTTPDGuzG3/FDTOG+VFlfXx/Nzc2Ew+Fk0SHgCaB1MRNYKAFG4GHgm0ABQFlZGfX19djt9lSlWH4dI9UPI1s86YNqCq5L7+HpfB3ZXsho7ZeJOdZMG0Ijb+g3+E+/OkMfWltbkWUZQAb+E/gbYJgFYCEE3A48D9QB+Hw+GhoayM/PT1WQ7UWM1jxE1F01ramGffwk/taXERPBtN9Ei65ntOoPkI2OdANVCXfvAdw9+xFUSa8bjdLe3k53d3dSHwLAM5ftSmQzmWwIqAS+hR7QYLPZqK2tZd26dQiC3o0mWglU/h6TJbfO8HNLdBB/28uYg92zDqAhENywi4nyu1AFY9rvjIkJvJ2vpenD2NgYLS0tjIyMJItOA38J7J/vpOZDgAP4GvAUYBFFkcrKSmpqajAajSnDQ2XbCWy4H1W0pDUWlSi+06+S1984X5tQjDYCmx8h5N86w0TLZC/5HT/EFLqYKrtw4QLHjx8nEokki36Frg/tc411NQIMwIPAd4BCgOLiYrZu3UpeXl6qku7nDyFbfOkdT/FzQZXnsiMjJEfJvPVBURQ6Ozvp6OhI6oME/Dt6MDYx2xizEXAbevhaD+D1emloaKCgoCBVQc4rYnTTVfy87T8Q47OOmxUiRdsYq3pwFn3Yj7vnQJo+nDhxgt7e3mS1UeCfgH8FlOl9ZyLgu+h+hNVqTe3n8/Fzc2wIf+tLWK7i5wuFhkCw4j4m1tyZWR/OvEbe4BV9GB4epqWlhUAgkCw6CtyCvjJSyERAp9VqrSgtLaWurg6TyZQy4Kp+3rmHvEuHFznNuZGNPmiaRnd3N01NTaiqCrAGuDC1TUYCVq9eXbF+/Xr8fj9Wq5WYv46RTUvj5wuF5ChltPbRzPoweAz/mT0pfXjrrbeS54oZBBiZBaqqMjExwaRjA+GGr84YxDHaiq/9FQxSaPGzWQBMoYsUHf17IsU3MbrxARQxGYAJhAu3ITnLKD7y9Jz9zEpAEjJi2s+CpuDp3ou7e9+CDM817H2N2IaaGWx4gpi7MlWuTQu7Z8OcBEyFgIYmiATW7ybqq8V7eg+W0PnsLM4hNNFCqORWAuV3o5pdun1ZBrdZEYCmYv7gm8jXPkbMU0X/J79B3vDHeDtfxxgbzaqrxUATRMLFtxBYdy+KxQOaHhcIaIRWZXe/mh0BgHjpKOJAM3LVvcibv0h41XVE/HW4ew7gPv8LBHX+obhidiEoCQxKbF71NQQiq64lsOE+ZHshALaxDrxn38Ac7CFQ81C208meAACUBMaONxDPHUTa8ocoG+5kfMNuQqW34e16Q9+Ptdmv8iR7EcE1nyG0+kYEVcZ56T1cFw4ixsdnbRP11RCo+H0STl31LRNdeM++iTVwakFTSGJhBFyGEBvHfOwHaGf2IX3iy8hFDQzXPkaw7A58Z17DMtGVVj/u3kCwfCeRgk+gISBoCqpoZaL8LoJlnyZv8CPcve+m3QPEPRsJbNhNzKNHnObwJdzn9pI39JvFmJ7CoghIQhjvwXzo6yhFDcjXPEbcvZ7+a5/GPnIc75k9yLZ8Jss+TSS/HgCDEsPZ9z9ECrYixiewBM8xWfwpQqtvJlR0E7bASayjrcS91ak2xtgInp795F16HyGHF8U5ISAJcaAF8d0/Ra68G2nzA0Ty64n4t8DlMNoYG8V1/pc4+z5AUGJE/HUIqoTvzB7c3W8zWbaDydLbifpqiPpq9DbxMTzn9uLobwRtRii/aOSUAABUGePpvRh7DiFtfRR5/Q7E2Bi+c29iHziauvSEy2GooJ8nRCmE59zPcPe+S7DkNgKVX0RMBCn58KnUQWcpkPl2MheIT2LoOQSAZbyTvP4P0yYP6EIppO/bghLHMXBEN04KL+nkYSkJmA80NevAJddYFgK0WbdELeUCK4UVISDhKGV48+PIjhLizrWM1DyCbM2fpfXSIvcimAFJAuKu9Yyv/SzR/AZAxTHwEZpgIFR0I+HCbTj63sfT8w5o6nKYBSwTAarZyVD9E0Ty6xE0hbyBI3h69mGKDADgznubifW7mCy9ndDqm3EMfrQcZgHLRIBUUIesJnBdOIir9+cY42NpvzeH+yho/Tec7krGN+xmsvjW5TALWGINEORYajlrGsiKijDL0ziAJprBcOVvIkrBWevmCku6Agwjp7Due0Q/OVbsJLL2TiJrbsc+cBTv+QOpmH96vC9GR/BcPIjj4ntLaR6wDC4ghAYw/fZljCffRK7+PErFTiLFNxEtvhHbUBOKxU3cXaEbEx3C072PvIEjM4OmrAeeX3yxLBoAIERGMDW9grH9deSNn0Ou3kVk1TW6EbmceJZYNgKSEOJBTK0/xTjwMbE7nsMU7qfk6N8uyUFnPli5MEzWkzzExMSKTR5W+iywpJifBmRHgCCgWf/vZrcq094O54OsCNAwEN/1E+StD4NoynqwpULCWU7/Dd8mVHBN1m3nFsHQIAYlnnoP1AxGpE1fQKm4E9PHL2HoXvq9ejaoJgejmx8l7Ktj+pI3B8/Nq485V4Bh4jzmN7+EqfuXaYcU1eQkfsOTJO55BdVXeZUelgCCyETFF7hwy/OEfVuYOnmjFGTV8R9QcOLFeXWVaQVIkiQxNDSE3+/HZrMhyDGMR15APLEH+aYnkfNrU5UVZwnqZ76POHQc4+FnEGKzX23nApHCaxmt+iMUkzOtXFAlPL37cXe/k9pVQqEQLS0tyYdRmPY0Dkx7+NNxPhKJ3BqLxZySJCHLMlarFYPBgCCFEc8exDjcjlZYh2a6kimi5hUhV9+LYPMiDLQgzHWktXmRK+/GGBvRLzznQMJRyvDWrzJRegda2vO8Rt7wbyls+g620VZAQ5Ik2traOHbsWDLtNgr8I3BgPgScAV6SZVkOhULb4vG4KR6Po6oqVqsVQRAQQgOIp/dikKNoq2rRkgcYwYDq34hSdQ+G+ARC4OyiCVCNeYzWPcbYxgeQzenpdpbQBQqbn8V14dcY1ASaptHb20tjYyODg4PJe4h3gHuAtzP1P9dmWQp8WxTFB91ut+ByufB6vbhcrlQFzWhFue5xpLU7ZlxviZMXMTY+i2Gsc0bHmncdsZ0vYg2coqjpmQyWiUysu4fxtXehCek7jlGaxHfyv7APN6XKhoeHaW5uZnw85YLN6IlSH1xtgvO9kdwGvGA2m69PEuDz+dKSnzVHIfKNX0vTh+QAmfThagRk4+fZ5gRNRyYXyIRLwI8URTkXDodviEajjkQika4Picv6MNKBWrRlFn3wIAwc1/Uhgwtc3c+bKGx6JuXniqJw8uRJjhw5kswDkoAXgc8D7zPP7wzmSwCXOzyOrg9SKBS6IZFIGDPpg/H0XgxyLIM+VKFs/CyGeBAhOpYiwD7SMrufhy9S2PQsrou6n4OeF3j48GH6+vqSfv4rYBf6BxZZZZIv5lK+Al0f7ne73Xg8HjweD07nlGVrsiFd9xXk8ttm6IMxMohsL8QUG0W2uNGmZ35JE/hP/gjb8PFUWYbM0FPoGW0z1H2+yMWrxHbgebPZvCWpD36/H4tlyhJ2lSDd/FfInrkDJoMq4e7+Ge7en6cCrwy5wWPo29qL6AnTC0aunmWSWaXP2u32VR6PB7fbjd/vv5I2D6gl25C2/Rmq1TvTEE3FMfQR3tOvYpD0lNcM2Z+Lzg6fMW4uOpkCL/DXgiD8hdPpNLvdbrxeLx6PJ5VoiSCgbNqNXPdg6nxhCV/E3/oS5vClVEcZvg/4Nfq21pZLg5fqYW4j8Jwoincn9cHr9eJwTDmummxo1z2Oa6IN+8iJVHGGL0Q60b8gy8kXItOx1C+TO9Djh9pM+mA2m/F6dXeIx+N0dHRM/UZoHPgX9JzlnH0jNB3ZbIMLwTngFUVRRsPh8PWxWMw6dds0m82YzWa6urpobGxM/tVV4KfAvcAvmEcw8/8FBcDLgiDILpdLKy8v12prazWHwzH1E9pDXM5Q/11GPfCe0WjUnE5ncuJngd0ra9by4z70v/hTLOO3wtPxv8EA3YCUDCjNAAAAAElFTkSuQmCC
// ==/UserScript==

/**
 * Changelog:
 * 
 * v1.3.2
 * - docs and github action (no functional change)
 * 
 * v1.3.1
 * - fixed link-message detection 
 * a additional check was still testing for the old chat format
 * 
 * v1.3
 * - recognize new intel log messages
 * - increase cell details
 * 
 * v1.2
 * - show message if training is still running
 * - prevent multiple training runs
 * 
 * v1.1
 * - log double fields
 * - improved training routine
 * - debug: update debug-dialog on open
 * - debug: show stored fields
 * 
 * v1.0
 * - first release
 * 
 */
function wrapper(SCRIPT_INFO) {
/*! For license information please see iitc_plugin_mindunits.user.js.LICENSE.txt */
(() => {
    var __webpack_modules__ = {
        576: (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                Z: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(667), _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__), ___CSS_LOADER_URL_IMPORT_0___ = new URL(__webpack_require__(223), __webpack_require__.b), ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()), ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
            ___CSS_LOADER_EXPORT___.push([ module.id, `.plugin-logfields-numbers{color:#121230;font-family:monospace;font-size:12px;pointer-events:none;text-align:center}.plugin-logfields-icon a{background-image:url(${___CSS_LOADER_URL_REPLACEMENT_0___});background-size:24px}.plugin-logfields-icon.active a{background-color:#bbb}.logfield-tooltip{background:#363636;background:rgba(0,0,0,.5);border:1px solid transparent;border-radius:4px;color:#fff;font:12px/18px Helvetica Neue,Arial,Helvetica,sans-serif;margin-left:20px;margin-top:-21px;padding:4px 8px;position:absolute;white-space:nowrap;z-index:700}.logfield-tooltip:before{border-bottom:6px solid transparent;border-right:6px solid rgba(0,0,0,.5);border-top:6px solid transparent;content:"";left:-7px;position:absolute;top:7px}`, "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        645: module => {
            "use strict";
            module.exports = function(cssWithMappingToString) {
                var list = [];
                return list.toString = function toString() {
                    return this.map((function(item) {
                        var content = "", needLayer = void 0 !== item[5];
                        return item[4] && (content += "@supports (".concat(item[4], ") {")), item[2] && (content += "@media ".concat(item[2], " {")), 
                        needLayer && (content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {")), 
                        content += cssWithMappingToString(item), needLayer && (content += "}"), item[2] && (content += "}"), 
                        item[4] && (content += "}"), content;
                    })).join("");
                }, list.i = function i(modules, media, dedupe, supports, layer) {
                    "string" == typeof modules && (modules = [ [ null, modules, void 0 ] ]);
                    var alreadyImportedModules = {};
                    if (dedupe) for (var k = 0; k < this.length; k++) {
                        var id = this[k][0];
                        null != id && (alreadyImportedModules[id] = !0);
                    }
                    for (var _k = 0; _k < modules.length; _k++) {
                        var item = [].concat(modules[_k]);
                        dedupe && alreadyImportedModules[item[0]] || (void 0 !== layer && (void 0 === item[5] || (item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}")), 
                        item[5] = layer), media && (item[2] ? (item[1] = "@media ".concat(item[2], " {").concat(item[1], "}"), 
                        item[2] = media) : item[2] = media), supports && (item[4] ? (item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}"), 
                        item[4] = supports) : item[4] = "".concat(supports)), list.push(item));
                    }
                }, list;
            };
        },
        667: module => {
            "use strict";
            module.exports = function(url, options) {
                return options || (options = {}), url ? (url = String(url.__esModule ? url.default : url), 
                /^['"].*['"]$/.test(url) && (url = url.slice(1, -1)), options.hash && (url += options.hash), 
                /["'() \t\n]|(%20)/.test(url) || options.needQuotes ? '"'.concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : url) : url;
            };
        },
        81: module => {
            "use strict";
            module.exports = function(i) {
                return i[1];
            };
        },
        162: function(module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            __WEBPACK_AMD_DEFINE_ARRAY__ = [], void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = function() {
                "use strict";
                function b(a, b) {
                    return void 0 === b ? b = {
                        autoBom: !1
                    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), 
                    b = {
                        autoBom: !b
                    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([ "\ufeff", a ], {
                        type: a.type
                    }) : a;
                }
                function c(a, b, c) {
                    var d = new XMLHttpRequest;
                    d.open("GET", a), d.responseType = "blob", d.onload = function() {
                        g(d.response, b, c);
                    }, d.onerror = function() {
                        console.error("could not download file");
                    }, d.send();
                }
                function d(a) {
                    var b = new XMLHttpRequest;
                    b.open("HEAD", a, !1);
                    try {
                        b.send();
                    } catch (a) {}
                    return 200 <= b.status && 299 >= b.status;
                }
                function e(a) {
                    try {
                        a.dispatchEvent(new MouseEvent("click"));
                    } catch (c) {
                        var b = document.createEvent("MouseEvents");
                        b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), 
                        a.dispatchEvent(b);
                    }
                }
                var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof __webpack_require__.g && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {} : "download" in HTMLAnchorElement.prototype && !a ? function(b, g, h) {
                    var i = f.URL || f.webkitURL, j = document.createElement("a");
                    g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, 
                    j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), 
                    setTimeout((function() {
                        i.revokeObjectURL(j.href);
                    }), 4e4), setTimeout((function() {
                        e(j);
                    }), 0));
                } : "msSaveOrOpenBlob" in navigator ? function(f, g, h) {
                    if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g); else if (d(f)) c(f, g, h); else {
                        var i = document.createElement("a");
                        i.href = f, i.target = "_blank", setTimeout((function() {
                            e(i);
                        }));
                    }
                } : function(b, d, e, g) {
                    if ((g = g || open("", "_blank")) && (g.document.title = g.document.body.innerText = "downloading..."), 
                    "string" == typeof b) return c(b, d, e);
                    var h = "application/octet-stream" === b.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
                    if ((j || h && i || a) && "undefined" != typeof FileReader) {
                        var k = new FileReader;
                        k.onloadend = function() {
                            var a = k.result;
                            a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, 
                            g = null;
                        }, k.readAsDataURL(b);
                    } else {
                        var l = f.URL || f.webkitURL, m = l.createObjectURL(b);
                        g ? g.location = m : location.href = m, g = null, setTimeout((function() {
                            l.revokeObjectURL(m);
                        }), 4e4);
                    }
                });
                f.saveAs = g.saveAs = g, module.exports = g;
            }) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
        },
        483: (module, __unused_webpack_exports, __webpack_require__) => {
            module.exports = function e(t, n, r) {
                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            if (i) return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND", f;
                        }
                        var l = n[o] = {
                            exports: {}
                        };
                        t[o][0].call(l.exports, (function(e) {
                            var n = t[o][1][e];
                            return s(n || e);
                        }), l, l.exports, e, t, n, r);
                    }
                    return n[o].exports;
                }
                for (var i = void 0, o = 0; o < r.length; o++) s(r[o]);
                return s;
            }({
                1: [ function(_dereq_, module, exports) {
                    (function(global) {
                        "use strict";
                        var scheduleDrain, draining, Mutation = global.MutationObserver || global.WebKitMutationObserver;
                        if (Mutation) {
                            var called = 0, observer = new Mutation(nextTick), element = global.document.createTextNode("");
                            observer.observe(element, {
                                characterData: !0
                            }), scheduleDrain = function() {
                                element.data = called = ++called % 2;
                            };
                        } else if (global.setImmediate || void 0 === global.MessageChannel) scheduleDrain = "document" in global && "onreadystatechange" in global.document.createElement("script") ? function() {
                            var scriptEl = global.document.createElement("script");
                            scriptEl.onreadystatechange = function() {
                                nextTick(), scriptEl.onreadystatechange = null, scriptEl.parentNode.removeChild(scriptEl), 
                                scriptEl = null;
                            }, global.document.documentElement.appendChild(scriptEl);
                        } : function() {
                            setTimeout(nextTick, 0);
                        }; else {
                            var channel = new global.MessageChannel;
                            channel.port1.onmessage = nextTick, scheduleDrain = function() {
                                channel.port2.postMessage(0);
                            };
                        }
                        var queue = [];
                        function nextTick() {
                            var i, oldQueue;
                            draining = !0;
                            for (var len = queue.length; len; ) {
                                for (oldQueue = queue, queue = [], i = -1; ++i < len; ) oldQueue[i]();
                                len = queue.length;
                            }
                            draining = !1;
                        }
                        function immediate(task) {
                            1 !== queue.push(task) || draining || scheduleDrain();
                        }
                        module.exports = immediate;
                    }).call(this, void 0 !== __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                }, {} ],
                2: [ function(_dereq_, module, exports) {
                    "use strict";
                    var immediate = _dereq_(1);
                    function INTERNAL() {}
                    var handlers = {}, REJECTED = [ "REJECTED" ], FULFILLED = [ "FULFILLED" ], PENDING = [ "PENDING" ];
                    function Promise(resolver) {
                        if ("function" != typeof resolver) throw new TypeError("resolver must be a function");
                        this.state = PENDING, this.queue = [], this.outcome = void 0, resolver !== INTERNAL && safelyResolveThenable(this, resolver);
                    }
                    function QueueItem(promise, onFulfilled, onRejected) {
                        this.promise = promise, "function" == typeof onFulfilled && (this.onFulfilled = onFulfilled, 
                        this.callFulfilled = this.otherCallFulfilled), "function" == typeof onRejected && (this.onRejected = onRejected, 
                        this.callRejected = this.otherCallRejected);
                    }
                    function unwrap(promise, func, value) {
                        immediate((function() {
                            var returnValue;
                            try {
                                returnValue = func(value);
                            } catch (e) {
                                return handlers.reject(promise, e);
                            }
                            returnValue === promise ? handlers.reject(promise, new TypeError("Cannot resolve promise with itself")) : handlers.resolve(promise, returnValue);
                        }));
                    }
                    function getThen(obj) {
                        var then = obj && obj.then;
                        if (obj && ("object" == typeof obj || "function" == typeof obj) && "function" == typeof then) return function appyThen() {
                            then.apply(obj, arguments);
                        };
                    }
                    function safelyResolveThenable(self, thenable) {
                        var called = !1;
                        function onError(value) {
                            called || (called = !0, handlers.reject(self, value));
                        }
                        function onSuccess(value) {
                            called || (called = !0, handlers.resolve(self, value));
                        }
                        function tryToUnwrap() {
                            thenable(onSuccess, onError);
                        }
                        var result = tryCatch(tryToUnwrap);
                        "error" === result.status && onError(result.value);
                    }
                    function tryCatch(func, value) {
                        var out = {};
                        try {
                            out.value = func(value), out.status = "success";
                        } catch (e) {
                            out.status = "error", out.value = e;
                        }
                        return out;
                    }
                    function resolve(value) {
                        return value instanceof this ? value : handlers.resolve(new this(INTERNAL), value);
                    }
                    function reject(reason) {
                        var promise = new this(INTERNAL);
                        return handlers.reject(promise, reason);
                    }
                    function all(iterable) {
                        var self = this;
                        if ("[object Array]" !== Object.prototype.toString.call(iterable)) return this.reject(new TypeError("must be an array"));
                        var len = iterable.length, called = !1;
                        if (!len) return this.resolve([]);
                        for (var values = new Array(len), resolved = 0, i = -1, promise = new this(INTERNAL); ++i < len; ) allResolver(iterable[i], i);
                        return promise;
                        function allResolver(value, i) {
                            function resolveFromAll(outValue) {
                                values[i] = outValue, ++resolved !== len || called || (called = !0, handlers.resolve(promise, values));
                            }
                            self.resolve(value).then(resolveFromAll, (function(error) {
                                called || (called = !0, handlers.reject(promise, error));
                            }));
                        }
                    }
                    function race(iterable) {
                        var self = this;
                        if ("[object Array]" !== Object.prototype.toString.call(iterable)) return this.reject(new TypeError("must be an array"));
                        var len = iterable.length, called = !1;
                        if (!len) return this.resolve([]);
                        for (var i = -1, promise = new this(INTERNAL); ++i < len; ) resolver(iterable[i]);
                        return promise;
                        function resolver(value) {
                            self.resolve(value).then((function(response) {
                                called || (called = !0, handlers.resolve(promise, response));
                            }), (function(error) {
                                called || (called = !0, handlers.reject(promise, error));
                            }));
                        }
                    }
                    module.exports = Promise, Promise.prototype.catch = function(onRejected) {
                        return this.then(null, onRejected);
                    }, Promise.prototype.then = function(onFulfilled, onRejected) {
                        if ("function" != typeof onFulfilled && this.state === FULFILLED || "function" != typeof onRejected && this.state === REJECTED) return this;
                        var promise = new this.constructor(INTERNAL);
                        return this.state !== PENDING ? unwrap(promise, this.state === FULFILLED ? onFulfilled : onRejected, this.outcome) : this.queue.push(new QueueItem(promise, onFulfilled, onRejected)), 
                        promise;
                    }, QueueItem.prototype.callFulfilled = function(value) {
                        handlers.resolve(this.promise, value);
                    }, QueueItem.prototype.otherCallFulfilled = function(value) {
                        unwrap(this.promise, this.onFulfilled, value);
                    }, QueueItem.prototype.callRejected = function(value) {
                        handlers.reject(this.promise, value);
                    }, QueueItem.prototype.otherCallRejected = function(value) {
                        unwrap(this.promise, this.onRejected, value);
                    }, handlers.resolve = function(self, value) {
                        var result = tryCatch(getThen, value);
                        if ("error" === result.status) return handlers.reject(self, result.value);
                        var thenable = result.value;
                        if (thenable) safelyResolveThenable(self, thenable); else {
                            self.state = FULFILLED, self.outcome = value;
                            for (var i = -1, len = self.queue.length; ++i < len; ) self.queue[i].callFulfilled(value);
                        }
                        return self;
                    }, handlers.reject = function(self, error) {
                        self.state = REJECTED, self.outcome = error;
                        for (var i = -1, len = self.queue.length; ++i < len; ) self.queue[i].callRejected(error);
                        return self;
                    }, Promise.resolve = resolve, Promise.reject = reject, Promise.all = all, Promise.race = race;
                }, {
                    1: 1
                } ],
                3: [ function(_dereq_, module, exports) {
                    (function(global) {
                        "use strict";
                        "function" != typeof global.Promise && (global.Promise = _dereq_(2));
                    }).call(this, void 0 !== __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                }, {
                    2: 2
                } ],
                4: [ function(_dereq_, module, exports) {
                    "use strict";
                    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                        return typeof obj;
                    } : function(obj) {
                        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    function getIDB() {
                        try {
                            if ("undefined" != typeof indexedDB) return indexedDB;
                            if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                            if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                            if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                            if ("undefined" != typeof msIndexedDB) return msIndexedDB;
                        } catch (e) {
                            return;
                        }
                    }
                    var idb = getIDB();
                    function isIndexedDBValid() {
                        try {
                            if (!idb || !idb.open) return !1;
                            var isSafari = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), hasFetch = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                            return (!isSafari || hasFetch) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange;
                        } catch (e) {
                            return !1;
                        }
                    }
                    function createBlob(parts, properties) {
                        parts = parts || [], properties = properties || {};
                        try {
                            return new Blob(parts, properties);
                        } catch (e) {
                            if ("TypeError" !== e.name) throw e;
                            for (var builder = new ("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), i = 0; i < parts.length; i += 1) builder.append(parts[i]);
                            return builder.getBlob(properties.type);
                        }
                    }
                    "undefined" == typeof Promise && _dereq_(3);
                    var Promise$1 = Promise;
                    function executeCallback(promise, callback) {
                        callback && promise.then((function(result) {
                            callback(null, result);
                        }), (function(error) {
                            callback(error);
                        }));
                    }
                    function executeTwoCallbacks(promise, callback, errorCallback) {
                        "function" == typeof callback && promise.then(callback), "function" == typeof errorCallback && promise.catch(errorCallback);
                    }
                    function normalizeKey(key) {
                        return "string" != typeof key && (console.warn(key + " used as a key, but it is not a string."), 
                        key = String(key)), key;
                    }
                    function getCallback() {
                        if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1];
                    }
                    var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support", supportsBlobs = void 0, dbContexts = {}, toString = Object.prototype.toString, READ_ONLY = "readonly", READ_WRITE = "readwrite";
                    function _binStringToArrayBuffer(bin) {
                        for (var length = bin.length, buf = new ArrayBuffer(length), arr = new Uint8Array(buf), i = 0; i < length; i++) arr[i] = bin.charCodeAt(i);
                        return buf;
                    }
                    function _checkBlobSupportWithoutCaching(idb) {
                        return new Promise$1((function(resolve) {
                            var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE), blob = createBlob([ "" ]);
                            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key"), txn.onabort = function(e) {
                                e.preventDefault(), e.stopPropagation(), resolve(!1);
                            }, txn.oncomplete = function() {
                                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/), matchedEdge = navigator.userAgent.match(/Edge\//);
                                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                            };
                        })).catch((function() {
                            return !1;
                        }));
                    }
                    function _checkBlobSupport(idb) {
                        return "boolean" == typeof supportsBlobs ? Promise$1.resolve(supportsBlobs) : _checkBlobSupportWithoutCaching(idb).then((function(value) {
                            return supportsBlobs = value;
                        }));
                    }
                    function _deferReadiness(dbInfo) {
                        var dbContext = dbContexts[dbInfo.name], deferredOperation = {};
                        deferredOperation.promise = new Promise$1((function(resolve, reject) {
                            deferredOperation.resolve = resolve, deferredOperation.reject = reject;
                        })), dbContext.deferredOperations.push(deferredOperation), dbContext.dbReady ? dbContext.dbReady = dbContext.dbReady.then((function() {
                            return deferredOperation.promise;
                        })) : dbContext.dbReady = deferredOperation.promise;
                    }
                    function _advanceReadiness(dbInfo) {
                        var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
                        if (deferredOperation) return deferredOperation.resolve(), deferredOperation.promise;
                    }
                    function _rejectReadiness(dbInfo, err) {
                        var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
                        if (deferredOperation) return deferredOperation.reject(err), deferredOperation.promise;
                    }
                    function _getConnection(dbInfo, upgradeNeeded) {
                        return new Promise$1((function(resolve, reject) {
                            if (dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext(), dbInfo.db) {
                                if (!upgradeNeeded) return resolve(dbInfo.db);
                                _deferReadiness(dbInfo), dbInfo.db.close();
                            }
                            var dbArgs = [ dbInfo.name ];
                            upgradeNeeded && dbArgs.push(dbInfo.version);
                            var openreq = idb.open.apply(idb, dbArgs);
                            upgradeNeeded && (openreq.onupgradeneeded = function(e) {
                                var db = openreq.result;
                                try {
                                    db.createObjectStore(dbInfo.storeName), e.oldVersion <= 1 && db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                                } catch (ex) {
                                    if ("ConstraintError" !== ex.name) throw ex;
                                    console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                                }
                            }), openreq.onerror = function(e) {
                                e.preventDefault(), reject(openreq.error);
                            }, openreq.onsuccess = function() {
                                var db = openreq.result;
                                db.onversionchange = function(e) {
                                    e.target.close();
                                }, resolve(db), _advanceReadiness(dbInfo);
                            };
                        }));
                    }
                    function _getOriginalConnection(dbInfo) {
                        return _getConnection(dbInfo, !1);
                    }
                    function _getUpgradedConnection(dbInfo) {
                        return _getConnection(dbInfo, !0);
                    }
                    function _isUpgradeNeeded(dbInfo, defaultVersion) {
                        if (!dbInfo.db) return !0;
                        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName), isDowngrade = dbInfo.version < dbInfo.db.version, isUpgrade = dbInfo.version > dbInfo.db.version;
                        if (isDowngrade && (dbInfo.version !== defaultVersion && console.warn('The database "' + dbInfo.name + "\" can't be downgraded from version " + dbInfo.db.version + " to version " + dbInfo.version + "."), 
                        dbInfo.version = dbInfo.db.version), isUpgrade || isNewStore) {
                            if (isNewStore) {
                                var incVersion = dbInfo.db.version + 1;
                                incVersion > dbInfo.version && (dbInfo.version = incVersion);
                            }
                            return !0;
                        }
                        return !1;
                    }
                    function _encodeBlob(blob) {
                        return new Promise$1((function(resolve, reject) {
                            var reader = new FileReader;
                            reader.onerror = reject, reader.onloadend = function(e) {
                                var base64 = btoa(e.target.result || "");
                                resolve({
                                    __local_forage_encoded_blob: !0,
                                    data: base64,
                                    type: blob.type
                                });
                            }, reader.readAsBinaryString(blob);
                        }));
                    }
                    function _decodeBlob(encodedBlob) {
                        return createBlob([ _binStringToArrayBuffer(atob(encodedBlob.data)) ], {
                            type: encodedBlob.type
                        });
                    }
                    function _isEncodedBlob(value) {
                        return value && value.__local_forage_encoded_blob;
                    }
                    function _fullyReady(callback) {
                        var self = this, promise = self._initReady().then((function() {
                            var dbContext = dbContexts[self._dbInfo.name];
                            if (dbContext && dbContext.dbReady) return dbContext.dbReady;
                        }));
                        return executeTwoCallbacks(promise, callback, callback), promise;
                    }
                    function _tryReconnect(dbInfo) {
                        _deferReadiness(dbInfo);
                        for (var dbContext = dbContexts[dbInfo.name], forages = dbContext.forages, i = 0; i < forages.length; i++) {
                            var forage = forages[i];
                            forage._dbInfo.db && (forage._dbInfo.db.close(), forage._dbInfo.db = null);
                        }
                        return dbInfo.db = null, _getOriginalConnection(dbInfo).then((function(db) {
                            return dbInfo.db = db, _isUpgradeNeeded(dbInfo) ? _getUpgradedConnection(dbInfo) : db;
                        })).then((function(db) {
                            dbInfo.db = dbContext.db = db;
                            for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
                        })).catch((function(err) {
                            throw _rejectReadiness(dbInfo, err), err;
                        }));
                    }
                    function createTransaction(dbInfo, mode, callback, retries) {
                        void 0 === retries && (retries = 1);
                        try {
                            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                            callback(null, tx);
                        } catch (err) {
                            if (retries > 0 && (!dbInfo.db || "InvalidStateError" === err.name || "NotFoundError" === err.name)) return Promise$1.resolve().then((function() {
                                if (!dbInfo.db || "NotFoundError" === err.name && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) return dbInfo.db && (dbInfo.version = dbInfo.db.version + 1), 
                                _getUpgradedConnection(dbInfo);
                            })).then((function() {
                                return _tryReconnect(dbInfo).then((function() {
                                    createTransaction(dbInfo, mode, callback, retries - 1);
                                }));
                            })).catch(callback);
                            callback(err);
                        }
                    }
                    function createDbContext() {
                        return {
                            forages: [],
                            db: null,
                            dbReady: null,
                            deferredOperations: []
                        };
                    }
                    function _initStorage(options) {
                        var self = this, dbInfo = {
                            db: null
                        };
                        if (options) for (var i in options) dbInfo[i] = options[i];
                        var dbContext = dbContexts[dbInfo.name];
                        dbContext || (dbContext = createDbContext(), dbContexts[dbInfo.name] = dbContext), 
                        dbContext.forages.push(self), self._initReady || (self._initReady = self.ready, 
                        self.ready = _fullyReady);
                        var initPromises = [];
                        function ignoreErrors() {
                            return Promise$1.resolve();
                        }
                        for (var j = 0; j < dbContext.forages.length; j++) {
                            var forage = dbContext.forages[j];
                            forage !== self && initPromises.push(forage._initReady().catch(ignoreErrors));
                        }
                        var forages = dbContext.forages.slice(0);
                        return Promise$1.all(initPromises).then((function() {
                            return dbInfo.db = dbContext.db, _getOriginalConnection(dbInfo);
                        })).then((function(db) {
                            return dbInfo.db = db, _isUpgradeNeeded(dbInfo, self._defaultConfig.version) ? _getUpgradedConnection(dbInfo) : db;
                        })).then((function(db) {
                            dbInfo.db = dbContext.db = db, self._dbInfo = dbInfo;
                            for (var k = 0; k < forages.length; k++) {
                                var forage = forages[k];
                                forage !== self && (forage._dbInfo.db = dbInfo.db, forage._dbInfo.version = dbInfo.version);
                            }
                        }));
                    }
                    function getItem(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_ONLY, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).get(key);
                                        req.onsuccess = function() {
                                            var value = req.result;
                                            void 0 === value && (value = null), _isEncodedBlob(value) && (value = _decodeBlob(value)), 
                                            resolve(value);
                                        }, req.onerror = function() {
                                            reject(req.error);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function iterate(iterator, callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_ONLY, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).openCursor(), iterationNumber = 1;
                                        req.onsuccess = function() {
                                            var cursor = req.result;
                                            if (cursor) {
                                                var value = cursor.value;
                                                _isEncodedBlob(value) && (value = _decodeBlob(value));
                                                var result = iterator(value, cursor.key, iterationNumber++);
                                                void 0 !== result ? resolve(result) : cursor.continue();
                                            } else resolve();
                                        }, req.onerror = function() {
                                            reject(req.error);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function setItem(key, value, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            var dbInfo;
                            self.ready().then((function() {
                                return dbInfo = self._dbInfo, "[object Blob]" === toString.call(value) ? _checkBlobSupport(dbInfo.db).then((function(blobSupport) {
                                    return blobSupport ? value : _encodeBlob(value);
                                })) : value;
                            })).then((function(value) {
                                createTransaction(self._dbInfo, READ_WRITE, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var store = transaction.objectStore(self._dbInfo.storeName);
                                        null === value && (value = void 0);
                                        var req = store.put(value, key);
                                        transaction.oncomplete = function() {
                                            void 0 === value && (value = null), resolve(value);
                                        }, transaction.onabort = transaction.onerror = function() {
                                            var err = req.error ? req.error : req.transaction.error;
                                            reject(err);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function removeItem(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_WRITE, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).delete(key);
                                        transaction.oncomplete = function() {
                                            resolve();
                                        }, transaction.onerror = function() {
                                            reject(req.error);
                                        }, transaction.onabort = function() {
                                            var err = req.error ? req.error : req.transaction.error;
                                            reject(err);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function clear(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_WRITE, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).clear();
                                        transaction.oncomplete = function() {
                                            resolve();
                                        }, transaction.onabort = transaction.onerror = function() {
                                            var err = req.error ? req.error : req.transaction.error;
                                            reject(err);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function length(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_ONLY, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).count();
                                        req.onsuccess = function() {
                                            resolve(req.result);
                                        }, req.onerror = function() {
                                            reject(req.error);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function key(n, callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            n < 0 ? resolve(null) : self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_ONLY, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var store = transaction.objectStore(self._dbInfo.storeName), advanced = !1, req = store.openKeyCursor();
                                        req.onsuccess = function() {
                                            var cursor = req.result;
                                            cursor ? 0 === n || advanced ? resolve(cursor.key) : (advanced = !0, cursor.advance(n)) : resolve(null);
                                        }, req.onerror = function() {
                                            reject(req.error);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function keys(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                createTransaction(self._dbInfo, READ_ONLY, (function(err, transaction) {
                                    if (err) return reject(err);
                                    try {
                                        var req = transaction.objectStore(self._dbInfo.storeName).openKeyCursor(), keys = [];
                                        req.onsuccess = function() {
                                            var cursor = req.result;
                                            cursor ? (keys.push(cursor.key), cursor.continue()) : resolve(keys);
                                        }, req.onerror = function() {
                                            reject(req.error);
                                        };
                                    } catch (e) {
                                        reject(e);
                                    }
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function dropInstance(options, callback) {
                        callback = getCallback.apply(this, arguments);
                        var currentConfig = this.config();
                        (options = "function" != typeof options && options || {}).name || (options.name = options.name || currentConfig.name, 
                        options.storeName = options.storeName || currentConfig.storeName);
                        var promise, self = this;
                        if (options.name) {
                            var dbPromise = options.name === currentConfig.name && self._dbInfo.db ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then((function(db) {
                                var dbContext = dbContexts[options.name], forages = dbContext.forages;
                                dbContext.db = db;
                                for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
                                return db;
                            }));
                            promise = options.storeName ? dbPromise.then((function(db) {
                                if (db.objectStoreNames.contains(options.storeName)) {
                                    var newVersion = db.version + 1;
                                    _deferReadiness(options);
                                    var dbContext = dbContexts[options.name], forages = dbContext.forages;
                                    db.close();
                                    for (var i = 0; i < forages.length; i++) {
                                        var forage = forages[i];
                                        forage._dbInfo.db = null, forage._dbInfo.version = newVersion;
                                    }
                                    var dropObjectPromise = new Promise$1((function(resolve, reject) {
                                        var req = idb.open(options.name, newVersion);
                                        req.onerror = function(err) {
                                            req.result.close(), reject(err);
                                        }, req.onupgradeneeded = function() {
                                            req.result.deleteObjectStore(options.storeName);
                                        }, req.onsuccess = function() {
                                            var db = req.result;
                                            db.close(), resolve(db);
                                        };
                                    }));
                                    return dropObjectPromise.then((function(db) {
                                        dbContext.db = db;
                                        for (var j = 0; j < forages.length; j++) {
                                            var _forage2 = forages[j];
                                            _forage2._dbInfo.db = db, _advanceReadiness(_forage2._dbInfo);
                                        }
                                    })).catch((function(err) {
                                        throw (_rejectReadiness(options, err) || Promise$1.resolve()).catch((function() {})), 
                                        err;
                                    }));
                                }
                            })) : dbPromise.then((function(db) {
                                _deferReadiness(options);
                                var dbContext = dbContexts[options.name], forages = dbContext.forages;
                                db.close();
                                for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = null;
                                var dropDBPromise = new Promise$1((function(resolve, reject) {
                                    var req = idb.deleteDatabase(options.name);
                                    req.onerror = function() {
                                        var db = req.result;
                                        db && db.close(), reject(req.error);
                                    }, req.onblocked = function() {
                                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                                    }, req.onsuccess = function() {
                                        var db = req.result;
                                        db && db.close(), resolve(db);
                                    };
                                }));
                                return dropDBPromise.then((function(db) {
                                    dbContext.db = db;
                                    for (var i = 0; i < forages.length; i++) _advanceReadiness(forages[i]._dbInfo);
                                })).catch((function(err) {
                                    throw (_rejectReadiness(options, err) || Promise$1.resolve()).catch((function() {})), 
                                    err;
                                }));
                            }));
                        } else promise = Promise$1.reject("Invalid arguments");
                        return executeCallback(promise, callback), promise;
                    }
                    var asyncStorage = {
                        _driver: "asyncStorage",
                        _initStorage,
                        _support: isIndexedDBValid(),
                        iterate,
                        getItem,
                        setItem,
                        removeItem,
                        clear,
                        length,
                        key,
                        keys,
                        dropInstance
                    };
                    function isWebSQLValid() {
                        return "function" == typeof openDatabase;
                    }
                    var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", BLOB_TYPE_PREFIX = "~~local_forage_type~", BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/, SERIALIZED_MARKER = "__lfsc__:", SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length, TYPE_ARRAYBUFFER = "arbf", TYPE_BLOB = "blob", TYPE_INT8ARRAY = "si08", TYPE_UINT8ARRAY = "ui08", TYPE_UINT8CLAMPEDARRAY = "uic8", TYPE_INT16ARRAY = "si16", TYPE_INT32ARRAY = "si32", TYPE_UINT16ARRAY = "ur16", TYPE_UINT32ARRAY = "ui32", TYPE_FLOAT32ARRAY = "fl32", TYPE_FLOAT64ARRAY = "fl64", TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length, toString$1 = Object.prototype.toString;
                    function stringToBuffer(serializedString) {
                        var i, encoded1, encoded2, encoded3, encoded4, bufferLength = .75 * serializedString.length, len = serializedString.length, p = 0;
                        "=" === serializedString[serializedString.length - 1] && (bufferLength--, "=" === serializedString[serializedString.length - 2] && bufferLength--);
                        var buffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(buffer);
                        for (i = 0; i < len; i += 4) encoded1 = BASE_CHARS.indexOf(serializedString[i]), 
                        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]), encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]), 
                        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]), bytes[p++] = encoded1 << 2 | encoded2 >> 4, 
                        bytes[p++] = (15 & encoded2) << 4 | encoded3 >> 2, bytes[p++] = (3 & encoded3) << 6 | 63 & encoded4;
                        return buffer;
                    }
                    function bufferToString(buffer) {
                        var i, bytes = new Uint8Array(buffer), base64String = "";
                        for (i = 0; i < bytes.length; i += 3) base64String += BASE_CHARS[bytes[i] >> 2], 
                        base64String += BASE_CHARS[(3 & bytes[i]) << 4 | bytes[i + 1] >> 4], base64String += BASE_CHARS[(15 & bytes[i + 1]) << 2 | bytes[i + 2] >> 6], 
                        base64String += BASE_CHARS[63 & bytes[i + 2]];
                        return bytes.length % 3 == 2 ? base64String = base64String.substring(0, base64String.length - 1) + "=" : bytes.length % 3 == 1 && (base64String = base64String.substring(0, base64String.length - 2) + "=="), 
                        base64String;
                    }
                    function serialize(value, callback) {
                        var valueType = "";
                        if (value && (valueType = toString$1.call(value)), value && ("[object ArrayBuffer]" === valueType || value.buffer && "[object ArrayBuffer]" === toString$1.call(value.buffer))) {
                            var buffer, marker = SERIALIZED_MARKER;
                            value instanceof ArrayBuffer ? (buffer = value, marker += TYPE_ARRAYBUFFER) : (buffer = value.buffer, 
                            "[object Int8Array]" === valueType ? marker += TYPE_INT8ARRAY : "[object Uint8Array]" === valueType ? marker += TYPE_UINT8ARRAY : "[object Uint8ClampedArray]" === valueType ? marker += TYPE_UINT8CLAMPEDARRAY : "[object Int16Array]" === valueType ? marker += TYPE_INT16ARRAY : "[object Uint16Array]" === valueType ? marker += TYPE_UINT16ARRAY : "[object Int32Array]" === valueType ? marker += TYPE_INT32ARRAY : "[object Uint32Array]" === valueType ? marker += TYPE_UINT32ARRAY : "[object Float32Array]" === valueType ? marker += TYPE_FLOAT32ARRAY : "[object Float64Array]" === valueType ? marker += TYPE_FLOAT64ARRAY : callback(new Error("Failed to get type for BinaryArray"))), 
                            callback(marker + bufferToString(buffer));
                        } else if ("[object Blob]" === valueType) {
                            var fileReader = new FileReader;
                            fileReader.onload = function() {
                                var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                            }, fileReader.readAsArrayBuffer(value);
                        } else try {
                            callback(JSON.stringify(value));
                        } catch (e) {
                            console.error("Couldn't convert value into a JSON string: ", value), callback(null, e);
                        }
                    }
                    function deserialize(value) {
                        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) return JSON.parse(value);
                        var blobType, serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH), type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
                        if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                            blobType = matcher[1], serializedString = serializedString.substring(matcher[0].length);
                        }
                        var buffer = stringToBuffer(serializedString);
                        switch (type) {
                          case TYPE_ARRAYBUFFER:
                            return buffer;

                          case TYPE_BLOB:
                            return createBlob([ buffer ], {
                                type: blobType
                            });

                          case TYPE_INT8ARRAY:
                            return new Int8Array(buffer);

                          case TYPE_UINT8ARRAY:
                            return new Uint8Array(buffer);

                          case TYPE_UINT8CLAMPEDARRAY:
                            return new Uint8ClampedArray(buffer);

                          case TYPE_INT16ARRAY:
                            return new Int16Array(buffer);

                          case TYPE_UINT16ARRAY:
                            return new Uint16Array(buffer);

                          case TYPE_INT32ARRAY:
                            return new Int32Array(buffer);

                          case TYPE_UINT32ARRAY:
                            return new Uint32Array(buffer);

                          case TYPE_FLOAT32ARRAY:
                            return new Float32Array(buffer);

                          case TYPE_FLOAT64ARRAY:
                            return new Float64Array(buffer);

                          default:
                            throw new Error("Unkown type: " + type);
                        }
                    }
                    var localforageSerializer = {
                        serialize,
                        deserialize,
                        stringToBuffer,
                        bufferToString
                    };
                    function createDbTable(t, dbInfo, callback, errorCallback) {
                        t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
                    }
                    function _initStorage$1(options) {
                        var self = this, dbInfo = {
                            db: null
                        };
                        if (options) for (var i in options) dbInfo[i] = "string" != typeof options[i] ? options[i].toString() : options[i];
                        var dbInfoPromise = new Promise$1((function(resolve, reject) {
                            try {
                                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                            } catch (e) {
                                return reject(e);
                            }
                            dbInfo.db.transaction((function(t) {
                                createDbTable(t, dbInfo, (function() {
                                    self._dbInfo = dbInfo, resolve();
                                }), (function(t, error) {
                                    reject(error);
                                }));
                            }), reject);
                        }));
                        return dbInfo.serializer = localforageSerializer, dbInfoPromise;
                    }
                    function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
                        t.executeSql(sqlStatement, args, callback, (function(t, error) {
                            error.code === error.SYNTAX_ERR ? t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [ dbInfo.storeName ], (function(t, results) {
                                results.rows.length ? errorCallback(t, error) : createDbTable(t, dbInfo, (function() {
                                    t.executeSql(sqlStatement, args, callback, errorCallback);
                                }), errorCallback);
                            }), errorCallback) : errorCallback(t, error);
                        }), errorCallback);
                    }
                    function getItem$1(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [ key ], (function(t, results) {
                                        var result = results.rows.length ? results.rows.item(0).value : null;
                                        result && (result = dbInfo.serializer.deserialize(result)), resolve(result);
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function iterate$1(iterator, callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], (function(t, results) {
                                        for (var rows = results.rows, length = rows.length, i = 0; i < length; i++) {
                                            var item = rows.item(i), result = item.value;
                                            if (result && (result = dbInfo.serializer.deserialize(result)), void 0 !== (result = iterator(result, item.key, i + 1))) return void resolve(result);
                                        }
                                        resolve();
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function _setItem(key, value, callback, retriesLeft) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                void 0 === value && (value = null);
                                var originalValue = value, dbInfo = self._dbInfo;
                                dbInfo.serializer.serialize(value, (function(value, error) {
                                    error ? reject(error) : dbInfo.db.transaction((function(t) {
                                        tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [ key, value ], (function() {
                                            resolve(originalValue);
                                        }), (function(t, error) {
                                            reject(error);
                                        }));
                                    }), (function(sqlError) {
                                        if (sqlError.code === sqlError.QUOTA_ERR) {
                                            if (retriesLeft > 0) return void resolve(_setItem.apply(self, [ key, originalValue, callback, retriesLeft - 1 ]));
                                            reject(sqlError);
                                        }
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function setItem$1(key, value, callback) {
                        return _setItem.apply(this, [ key, value, callback, 1 ]);
                    }
                    function removeItem$1(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [ key ], (function() {
                                        resolve();
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function clear$1(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], (function() {
                                        resolve();
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function length$1(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], (function(t, results) {
                                        var result = results.rows.item(0).c;
                                        resolve(result);
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function key$1(n, callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [ n + 1 ], (function(t, results) {
                                        var result = results.rows.length ? results.rows.item(0).key : null;
                                        resolve(result);
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function keys$1(callback) {
                        var self = this, promise = new Promise$1((function(resolve, reject) {
                            self.ready().then((function() {
                                var dbInfo = self._dbInfo;
                                dbInfo.db.transaction((function(t) {
                                    tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], (function(t, results) {
                                        for (var keys = [], i = 0; i < results.rows.length; i++) keys.push(results.rows.item(i).key);
                                        resolve(keys);
                                    }), (function(t, error) {
                                        reject(error);
                                    }));
                                }));
                            })).catch(reject);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function getAllStoreNames(db) {
                        return new Promise$1((function(resolve, reject) {
                            db.transaction((function(t) {
                                t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], (function(t, results) {
                                    for (var storeNames = [], i = 0; i < results.rows.length; i++) storeNames.push(results.rows.item(i).name);
                                    resolve({
                                        db,
                                        storeNames
                                    });
                                }), (function(t, error) {
                                    reject(error);
                                }));
                            }), (function(sqlError) {
                                reject(sqlError);
                            }));
                        }));
                    }
                    function dropInstance$1(options, callback) {
                        callback = getCallback.apply(this, arguments);
                        var currentConfig = this.config();
                        (options = "function" != typeof options && options || {}).name || (options.name = options.name || currentConfig.name, 
                        options.storeName = options.storeName || currentConfig.storeName);
                        var promise, self = this;
                        return executeCallback(promise = options.name ? new Promise$1((function(resolve) {
                            var db;
                            db = options.name === currentConfig.name ? self._dbInfo.db : openDatabase(options.name, "", "", 0), 
                            options.storeName ? resolve({
                                db,
                                storeNames: [ options.storeName ]
                            }) : resolve(getAllStoreNames(db));
                        })).then((function(operationInfo) {
                            return new Promise$1((function(resolve, reject) {
                                operationInfo.db.transaction((function(t) {
                                    function dropTable(storeName) {
                                        return new Promise$1((function(resolve, reject) {
                                            t.executeSql("DROP TABLE IF EXISTS " + storeName, [], (function() {
                                                resolve();
                                            }), (function(t, error) {
                                                reject(error);
                                            }));
                                        }));
                                    }
                                    for (var operations = [], i = 0, len = operationInfo.storeNames.length; i < len; i++) operations.push(dropTable(operationInfo.storeNames[i]));
                                    Promise$1.all(operations).then((function() {
                                        resolve();
                                    })).catch((function(e) {
                                        reject(e);
                                    }));
                                }), (function(sqlError) {
                                    reject(sqlError);
                                }));
                            }));
                        })) : Promise$1.reject("Invalid arguments"), callback), promise;
                    }
                    var webSQLStorage = {
                        _driver: "webSQLStorage",
                        _initStorage: _initStorage$1,
                        _support: isWebSQLValid(),
                        iterate: iterate$1,
                        getItem: getItem$1,
                        setItem: setItem$1,
                        removeItem: removeItem$1,
                        clear: clear$1,
                        length: length$1,
                        key: key$1,
                        keys: keys$1,
                        dropInstance: dropInstance$1
                    };
                    function isLocalStorageValid() {
                        try {
                            return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem;
                        } catch (e) {
                            return !1;
                        }
                    }
                    function _getKeyPrefix(options, defaultConfig) {
                        var keyPrefix = options.name + "/";
                        return options.storeName !== defaultConfig.storeName && (keyPrefix += options.storeName + "/"), 
                        keyPrefix;
                    }
                    function checkIfLocalStorageThrows() {
                        var localStorageTestKey = "_localforage_support_test";
                        try {
                            return localStorage.setItem(localStorageTestKey, !0), localStorage.removeItem(localStorageTestKey), 
                            !1;
                        } catch (e) {
                            return !0;
                        }
                    }
                    function _isLocalStorageUsable() {
                        return !checkIfLocalStorageThrows() || localStorage.length > 0;
                    }
                    function _initStorage$2(options) {
                        var self = this, dbInfo = {};
                        if (options) for (var i in options) dbInfo[i] = options[i];
                        return dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig), _isLocalStorageUsable() ? (self._dbInfo = dbInfo, 
                        dbInfo.serializer = localforageSerializer, Promise$1.resolve()) : Promise$1.reject();
                    }
                    function clear$2(callback) {
                        var self = this, promise = self.ready().then((function() {
                            for (var keyPrefix = self._dbInfo.keyPrefix, i = localStorage.length - 1; i >= 0; i--) {
                                var key = localStorage.key(i);
                                0 === key.indexOf(keyPrefix) && localStorage.removeItem(key);
                            }
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function getItem$2(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = self.ready().then((function() {
                            var dbInfo = self._dbInfo, result = localStorage.getItem(dbInfo.keyPrefix + key);
                            return result && (result = dbInfo.serializer.deserialize(result)), result;
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function iterate$2(iterator, callback) {
                        var self = this, promise = self.ready().then((function() {
                            for (var dbInfo = self._dbInfo, keyPrefix = dbInfo.keyPrefix, keyPrefixLength = keyPrefix.length, length = localStorage.length, iterationNumber = 1, i = 0; i < length; i++) {
                                var key = localStorage.key(i);
                                if (0 === key.indexOf(keyPrefix)) {
                                    var value = localStorage.getItem(key);
                                    if (value && (value = dbInfo.serializer.deserialize(value)), void 0 !== (value = iterator(value, key.substring(keyPrefixLength), iterationNumber++))) return value;
                                }
                            }
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function key$2(n, callback) {
                        var self = this, promise = self.ready().then((function() {
                            var result, dbInfo = self._dbInfo;
                            try {
                                result = localStorage.key(n);
                            } catch (error) {
                                result = null;
                            }
                            return result && (result = result.substring(dbInfo.keyPrefix.length)), result;
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function keys$2(callback) {
                        var self = this, promise = self.ready().then((function() {
                            for (var dbInfo = self._dbInfo, length = localStorage.length, keys = [], i = 0; i < length; i++) {
                                var itemKey = localStorage.key(i);
                                0 === itemKey.indexOf(dbInfo.keyPrefix) && keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                            }
                            return keys;
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function length$2(callback) {
                        var promise = this.keys().then((function(keys) {
                            return keys.length;
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function removeItem$2(key, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = self.ready().then((function() {
                            var dbInfo = self._dbInfo;
                            localStorage.removeItem(dbInfo.keyPrefix + key);
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function setItem$2(key, value, callback) {
                        var self = this;
                        key = normalizeKey(key);
                        var promise = self.ready().then((function() {
                            void 0 === value && (value = null);
                            var originalValue = value;
                            return new Promise$1((function(resolve, reject) {
                                var dbInfo = self._dbInfo;
                                dbInfo.serializer.serialize(value, (function(value, error) {
                                    if (error) reject(error); else try {
                                        localStorage.setItem(dbInfo.keyPrefix + key, value), resolve(originalValue);
                                    } catch (e) {
                                        "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || reject(e), 
                                        reject(e);
                                    }
                                }));
                            }));
                        }));
                        return executeCallback(promise, callback), promise;
                    }
                    function dropInstance$2(options, callback) {
                        if (callback = getCallback.apply(this, arguments), !(options = "function" != typeof options && options || {}).name) {
                            var currentConfig = this.config();
                            options.name = options.name || currentConfig.name, options.storeName = options.storeName || currentConfig.storeName;
                        }
                        var promise, self = this;
                        return promise = options.name ? new Promise$1((function(resolve) {
                            options.storeName ? resolve(_getKeyPrefix(options, self._defaultConfig)) : resolve(options.name + "/");
                        })).then((function(keyPrefix) {
                            for (var i = localStorage.length - 1; i >= 0; i--) {
                                var key = localStorage.key(i);
                                0 === key.indexOf(keyPrefix) && localStorage.removeItem(key);
                            }
                        })) : Promise$1.reject("Invalid arguments"), executeCallback(promise, callback), 
                        promise;
                    }
                    var localStorageWrapper = {
                        _driver: "localStorageWrapper",
                        _initStorage: _initStorage$2,
                        _support: isLocalStorageValid(),
                        iterate: iterate$2,
                        getItem: getItem$2,
                        setItem: setItem$2,
                        removeItem: removeItem$2,
                        clear: clear$2,
                        length: length$2,
                        key: key$2,
                        keys: keys$2,
                        dropInstance: dropInstance$2
                    }, sameValue = function sameValue(x, y) {
                        return x === y || "number" == typeof x && "number" == typeof y && isNaN(x) && isNaN(y);
                    }, includes = function includes(array, searchElement) {
                        for (var len = array.length, i = 0; i < len; ) {
                            if (sameValue(array[i], searchElement)) return !0;
                            i++;
                        }
                        return !1;
                    }, isArray = Array.isArray || function(arg) {
                        return "[object Array]" === Object.prototype.toString.call(arg);
                    }, DefinedDrivers = {}, DriverSupport = {}, DefaultDrivers = {
                        INDEXEDDB: asyncStorage,
                        WEBSQL: webSQLStorage,
                        LOCALSTORAGE: localStorageWrapper
                    }, DefaultDriverOrder = [ DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver ], OptionalDriverMethods = [ "dropInstance" ], LibraryMethods = [ "clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem" ].concat(OptionalDriverMethods), DefaultConfig = {
                        description: "",
                        driver: DefaultDriverOrder.slice(),
                        name: "localforage",
                        size: 4980736,
                        storeName: "keyvaluepairs",
                        version: 1
                    };
                    function callWhenReady(localForageInstance, libraryMethod) {
                        localForageInstance[libraryMethod] = function() {
                            var _args = arguments;
                            return localForageInstance.ready().then((function() {
                                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
                            }));
                        };
                    }
                    function extend() {
                        for (var i = 1; i < arguments.length; i++) {
                            var arg = arguments[i];
                            if (arg) for (var _key in arg) arg.hasOwnProperty(_key) && (isArray(arg[_key]) ? arguments[0][_key] = arg[_key].slice() : arguments[0][_key] = arg[_key]);
                        }
                        return arguments[0];
                    }
                    var LocalForage = function() {
                        function LocalForage(options) {
                            for (var driverTypeKey in _classCallCheck(this, LocalForage), DefaultDrivers) if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                                var driver = DefaultDrivers[driverTypeKey], driverName = driver._driver;
                                this[driverTypeKey] = driverName, DefinedDrivers[driverName] || this.defineDriver(driver);
                            }
                            this._defaultConfig = extend({}, DefaultConfig), this._config = extend({}, this._defaultConfig, options), 
                            this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, 
                            this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch((function() {}));
                        }
                        return LocalForage.prototype.config = function config(options) {
                            if ("object" === (void 0 === options ? "undefined" : _typeof(options))) {
                                if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                for (var i in options) {
                                    if ("storeName" === i && (options[i] = options[i].replace(/\W/g, "_")), "version" === i && "number" != typeof options[i]) return new Error("Database version must be a number.");
                                    this._config[i] = options[i];
                                }
                                return !("driver" in options) || !options.driver || this.setDriver(this._config.driver);
                            }
                            return "string" == typeof options ? this._config[options] : this._config;
                        }, LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
                            var promise = new Promise$1((function(resolve, reject) {
                                try {
                                    var driverName = driverObject._driver, complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                    if (!driverObject._driver) return void reject(complianceError);
                                    for (var driverMethods = LibraryMethods.concat("_initStorage"), i = 0, len = driverMethods.length; i < len; i++) {
                                        var driverMethodName = driverMethods[i];
                                        if ((!includes(OptionalDriverMethods, driverMethodName) || driverObject[driverMethodName]) && "function" != typeof driverObject[driverMethodName]) return void reject(complianceError);
                                    }
                                    var configureMissingMethods = function configureMissingMethods() {
                                        for (var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                                            return function() {
                                                var error = new Error("Method " + methodName + " is not implemented by the current driver"), promise = Promise$1.reject(error);
                                                return executeCallback(promise, arguments[arguments.length - 1]), promise;
                                            };
                                        }, _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                                            var optionalDriverMethod = OptionalDriverMethods[_i];
                                            driverObject[optionalDriverMethod] || (driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod));
                                        }
                                    };
                                    configureMissingMethods();
                                    var setDriverSupport = function setDriverSupport(support) {
                                        DefinedDrivers[driverName], DefinedDrivers[driverName] = driverObject, DriverSupport[driverName] = support, 
                                        resolve();
                                    };
                                    "_support" in driverObject ? driverObject._support && "function" == typeof driverObject._support ? driverObject._support().then(setDriverSupport, reject) : setDriverSupport(!!driverObject._support) : setDriverSupport(!0);
                                } catch (e) {
                                    reject(e);
                                }
                            }));
                            return executeTwoCallbacks(promise, callback, errorCallback), promise;
                        }, LocalForage.prototype.driver = function driver() {
                            return this._driver || null;
                        }, LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
                            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
                            return executeTwoCallbacks(getDriverPromise, callback, errorCallback), getDriverPromise;
                        }, LocalForage.prototype.getSerializer = function getSerializer(callback) {
                            var serializerPromise = Promise$1.resolve(localforageSerializer);
                            return executeTwoCallbacks(serializerPromise, callback), serializerPromise;
                        }, LocalForage.prototype.ready = function ready(callback) {
                            var self = this, promise = self._driverSet.then((function() {
                                return null === self._ready && (self._ready = self._initDriver()), self._ready;
                            }));
                            return executeTwoCallbacks(promise, callback, callback), promise;
                        }, LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
                            var self = this;
                            isArray(drivers) || (drivers = [ drivers ]);
                            var supportedDrivers = this._getSupportedDrivers(drivers);
                            function setDriverToConfig() {
                                self._config.driver = self.driver();
                            }
                            function extendSelfWithDriver(driver) {
                                return self._extend(driver), setDriverToConfig(), self._ready = self._initStorage(self._config), 
                                self._ready;
                            }
                            function initDriver(supportedDrivers) {
                                return function() {
                                    var currentDriverIndex = 0;
                                    function driverPromiseLoop() {
                                        for (;currentDriverIndex < supportedDrivers.length; ) {
                                            var driverName = supportedDrivers[currentDriverIndex];
                                            return currentDriverIndex++, self._dbInfo = null, self._ready = null, self.getDriver(driverName).then(extendSelfWithDriver).catch(driverPromiseLoop);
                                        }
                                        setDriverToConfig();
                                        var error = new Error("No available storage method found.");
                                        return self._driverSet = Promise$1.reject(error), self._driverSet;
                                    }
                                    return driverPromiseLoop();
                                };
                            }
                            var oldDriverSetDone = null !== this._driverSet ? this._driverSet.catch((function() {
                                return Promise$1.resolve();
                            })) : Promise$1.resolve();
                            return this._driverSet = oldDriverSetDone.then((function() {
                                var driverName = supportedDrivers[0];
                                return self._dbInfo = null, self._ready = null, self.getDriver(driverName).then((function(driver) {
                                    self._driver = driver._driver, setDriverToConfig(), self._wrapLibraryMethodsWithReady(), 
                                    self._initDriver = initDriver(supportedDrivers);
                                }));
                            })).catch((function() {
                                setDriverToConfig();
                                var error = new Error("No available storage method found.");
                                return self._driverSet = Promise$1.reject(error), self._driverSet;
                            })), executeTwoCallbacks(this._driverSet, callback, errorCallback), this._driverSet;
                        }, LocalForage.prototype.supports = function supports(driverName) {
                            return !!DriverSupport[driverName];
                        }, LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
                            extend(this, libraryMethodsAndProperties);
                        }, LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
                            for (var supportedDrivers = [], i = 0, len = drivers.length; i < len; i++) {
                                var driverName = drivers[i];
                                this.supports(driverName) && supportedDrivers.push(driverName);
                            }
                            return supportedDrivers;
                        }, LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
                            for (var i = 0, len = LibraryMethods.length; i < len; i++) callWhenReady(this, LibraryMethods[i]);
                        }, LocalForage.prototype.createInstance = function createInstance(options) {
                            return new LocalForage(options);
                        }, LocalForage;
                    }(), localforage_js = new LocalForage;
                    module.exports = localforage_js;
                }, {
                    3: 3
                } ]
            }, {}, [ 4 ])(4);
        },
        239: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(795), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(569), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(565), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(589), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__), _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(576), options = {};
            options.styleTagTransform = _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(), 
            options.setAttributes = _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(), 
            options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head"), 
            options.domAPI = _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(), 
            options.insertStyleElement = _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.Z, options);
            const __WEBPACK_DEFAULT_EXPORT__ = _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.Z.locals : void 0;
        },
        379: module => {
            "use strict";
            var stylesInDOM = [];
            function getIndexByIdentifier(identifier) {
                for (var result = -1, i = 0; i < stylesInDOM.length; i++) if (stylesInDOM[i].identifier === identifier) {
                    result = i;
                    break;
                }
                return result;
            }
            function modulesToDom(list, options) {
                for (var idCountMap = {}, identifiers = [], i = 0; i < list.length; i++) {
                    var item = list[i], id = options.base ? item[0] + options.base : item[0], count = idCountMap[id] || 0, identifier = "".concat(id, " ").concat(count);
                    idCountMap[id] = count + 1;
                    var indexByIdentifier = getIndexByIdentifier(identifier), obj = {
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3],
                        supports: item[4],
                        layer: item[5]
                    };
                    if (-1 !== indexByIdentifier) stylesInDOM[indexByIdentifier].references++, stylesInDOM[indexByIdentifier].updater(obj); else {
                        var updater = addElementStyle(obj, options);
                        options.byIndex = i, stylesInDOM.splice(i, 0, {
                            identifier,
                            updater,
                            references: 1
                        });
                    }
                    identifiers.push(identifier);
                }
                return identifiers;
            }
            function addElementStyle(obj, options) {
                var api = options.domAPI(options);
                api.update(obj);
                return function updater(newObj) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) return;
                        api.update(obj = newObj);
                    } else api.remove();
                };
            }
            module.exports = function(list, options) {
                var lastIdentifiers = modulesToDom(list = list || [], options = options || {});
                return function update(newList) {
                    newList = newList || [];
                    for (var i = 0; i < lastIdentifiers.length; i++) {
                        var index = getIndexByIdentifier(lastIdentifiers[i]);
                        stylesInDOM[index].references--;
                    }
                    for (var newLastIdentifiers = modulesToDom(newList, options), _i = 0; _i < lastIdentifiers.length; _i++) {
                        var _index = getIndexByIdentifier(lastIdentifiers[_i]);
                        0 === stylesInDOM[_index].references && (stylesInDOM[_index].updater(), stylesInDOM.splice(_index, 1));
                    }
                    lastIdentifiers = newLastIdentifiers;
                };
            };
        },
        569: module => {
            "use strict";
            var memo = {};
            module.exports = function insertBySelector(insert, style) {
                var target = function getTarget(target) {
                    if (void 0 === memo[target]) {
                        var styleTarget = document.querySelector(target);
                        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
                            styleTarget = styleTarget.contentDocument.head;
                        } catch (e) {
                            styleTarget = null;
                        }
                        memo[target] = styleTarget;
                    }
                    return memo[target];
                }(insert);
                if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                target.appendChild(style);
            };
        },
        216: module => {
            "use strict";
            module.exports = function insertStyleElement(options) {
                var element = document.createElement("style");
                return options.setAttributes(element, options.attributes), options.insert(element, options.options), 
                element;
            };
        },
        565: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            module.exports = function setAttributesWithoutAttributes(styleElement) {
                var nonce = __webpack_require__.nc;
                nonce && styleElement.setAttribute("nonce", nonce);
            };
        },
        795: module => {
            "use strict";
            module.exports = function domAPI(options) {
                if ("undefined" == typeof document) return {
                    update: function update() {},
                    remove: function remove() {}
                };
                var styleElement = options.insertStyleElement(options);
                return {
                    update: function update(obj) {
                        !function apply(styleElement, options, obj) {
                            var css = "";
                            obj.supports && (css += "@supports (".concat(obj.supports, ") {")), obj.media && (css += "@media ".concat(obj.media, " {"));
                            var needLayer = void 0 !== obj.layer;
                            needLayer && (css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {")), 
                            css += obj.css, needLayer && (css += "}"), obj.media && (css += "}"), obj.supports && (css += "}");
                            var sourceMap = obj.sourceMap;
                            sourceMap && "undefined" != typeof btoa && (css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */")), 
                            options.styleTagTransform(css, styleElement, options.options);
                        }(styleElement, options, obj);
                    },
                    remove: function remove() {
                        !function removeStyleElement(styleElement) {
                            if (null === styleElement.parentNode) return !1;
                            styleElement.parentNode.removeChild(styleElement);
                        }(styleElement);
                    }
                };
            };
        },
        589: module => {
            "use strict";
            module.exports = function styleTagTransform(css, styleElement) {
                if (styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                    for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                    styleElement.appendChild(document.createTextNode(css));
                }
            };
        },
        723: module => {
            module.exports = "data:image/svg+xml,%3csvg width='48' height='48' viewBox='0 0 12.7 12.7' xmlns='http://www.w3.org/2000/svg'%3e%3cpath style='fill:%23ccc;fill-opacity:1;stroke:%23000;stroke-width:.265;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1' d='M.672 12.07 6.435.8l5.422 11.254Z'/%3e%3cpath style='opacity:.800431;fill:%23fefefe;stroke:%23000;stroke-width:.374564;stroke-linejoin:round' d='M3.95 1.011c-1.945 0-3.521 1.147-3.521 2.56 0 1.385.925 2.465 2.788 2.51l-.012.001c.796.226 1.537 1.784 2.395 3.089-.075-1.611-.748-2.699.292-3.464.95-.459 1.578-1.244 1.578-2.136 0-1.413-1.576-2.56-3.52-2.56Z'/%3e%3ctext xml:space='preserve' style='font-size:4.93889px;line-height:1.25;font-family:sans-serif;letter-spacing:0;word-spacing:0;stroke-width:.264583' x='2.786' y='5.26'%3e%3ctspan style='font-size:4.93889px;stroke-width:.264583' x='2.786' y='5.26'%3e?%3c/tspan%3e%3c/text%3e%3c/svg%3e";
        },
        223: module => {
            "use strict";
            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAACS1JREFUaIHVmntMVNkdx7+/e+/MvfOAYbgM0vLIOLBAUygqCz52retqlJBSkXUJLBJ8oI5DJIhp4qvuq7Ssj0032sRINPpHo40xMQZJXNJoYqKp64tugk2gwBJGsER5P4Y7957+sYCAMMwI2u03Of/M/f3O+X7OvXPOub8ZYozh/1ncmx6AiOhN9v9GAYjIDODoGx3Dn0eIiEIApIy2WJ1OZ+U4LgSApmlat6IoLwD8C8D3AOoYY4MAIIrip4qiHGGMxTHGmt8qwOitXyEIwkeqqr7PGOPCwsLUtLQ0zmazkSzL8Hq9ePHiBTo6OrR79+6xvr4+nuf5EVVVvwVwQxTFb1euXCndvXv3r/39/VveGgARxfE8f0BV1ZSEhATV6XTyWVlZcDgcM3bEGEN9fT2uXLmCqqoq9enTpzELFy6Ujx07pisoKBgaHh5+hzHmfuMARJRNRAftdjs7efIkn5mZOX7t+fPn/MWLF0MaGhrEzs5OXWRk5EhBQUHXokWLhif2oSgKX1lZ+atr165xjDFYrVbl7t27VQMDAyXzDQDG2HgDsB3A/e3bt383ODh4X9O08eZ2ux8bjUYVALNYLIrD4RjS6/WqIAhaVVXVvyfGtrS0dDQ2Nqrt7e1sy5YtLDExkel0umEAtonjzUebaP7XAL47fPjwJOMT2zfffNNcX1///USo+Pj4QavVqqiqel/TtPsej+fxo0eP1K6uLtbf38+6u7tZWVkZk2VZFUWxar4BiDEGIjLxPF+9bt06U3V1NRfI0n3w4MGIysrKyKampn/a7XalpaUlhjEmL1iwYHyJHh4eRn5+Pm7duqUqimJjjHXN1xM0NkgWAPPp06cDMg8Azc3NoiAIzGq1qiMjI7ru7m45NDR00v4iSRIOHz4MSZKI5/lj8+QdwCiATqf7bVZWFqKjowNKvnjxouXy5ctyYWFhp8Vi0dxu988tFgvpdLpXYlNTU5Gens4BKBzd4OZFHABomhazbNmygKa+qqoqtKioKPbDDz/sOXXqVNvIyIiut7c3VJblGftJS0uDzWbjBUHYPVfjY+KIyKyqqhQZGel30vXr14NcLpd948aNz2tqapoMBgNra2uLtFgsJAjCjHnh4eGw2Ww8z/MHicgwLwAABolI6+3t9TvpxIkTC5KSkgYvXbr0gyAIzOPx6Pv6+qy+Zh8Aenp6YLPZkJycLHAct2WO3gEAHGNMEwShu6mpye+k1tZWce3atT1jX/i2trZIq9VKPM/7zHv48CHsdjtKSkrMoih+QUT6ObnH6HdAUZR/1NTUqP4m3bhxo2H//v3/AYChoSGxv78/xGq1+pz9x48fo7GxEenp6UhOTkZsbKzE8/wnc7P/chm9+eTJE/727dt+JT148MDQ2NioBwC32x0VGhrqc/YVRcHRo0cRFRWFJUuWAABcLpdZFMUviWhOR/qx5Fs6na5p79692sjIiM+EmzdvmvLy8uLWr1+fMDg4KA0MDAT7mn1VVfH555+jpaUFxcXF4Lgfh0xPT0d0dLQFwEdzBmCMaYqifFlXV6du3bqVKYoyY4LNZvPq9XoWHh4+8vTp0yhZlmnM1FT19PRg3759qK2txc6dOxEbGzvputPpDDKbzX+ay1vbpNMoEWUQ0RfLly/H+fPnubi4uGmTOjs7eY7jRLfbneBwOLipAIwx1NTU4OTJkxgaGoLT6cTixYun7WvTpk19LS0tnzDGqucMMAqxRBCESsaYNTc3F7m5ubR69WoEBwdPimtoaHjHYDAEh4aGTvrc6/XiyJEjqK2tRWpqKgoLCyHL8owGamtrUVFRUd/X1/fLeQEYhZAA5AiCUOD1ehfwPM/CwsLUqKgopKWlCSUlJUZVVaed/a+++gpXr17F7t27kZ6ePqsBTdOwYcOGvvb29o2Msb/PC8AUmBgAaQAiAIQLgrBSEIR3z5w5E5STkzMptrW1Fbm5ucjLy0NGRobfJqqrq3HixIn7vb29aYECzLqEMcZaGWNXGGN/YYx96vV6jxCRVFlZianL7p07d0BEWLNmTUAmMjIyoNfrf0FE7wVm/zXKKiaT6Xh5ebmwaNEiHDhwABN38NbWVkRERGC606gvCYKA4uJiY1BQ0B8D9RMQABG9bzAYkrKyssjlcsFqteLQoUMY2zvmUsPasGEDcRz3LhGlBpIXEEBQUNCfS0tLjYIgQJIklJSUoLm5GefOnQMAhISEoKvr9V629Ho9tm3bJgUHB/8hkDy/AYhordFoTFy/fv34NNvtdmRmZuLChQtobm5GdHQ0BgYGEMjJdqJycnI4VVVXEZHfS6rfACaT6euysjLj1DNPdnY2ZFlGRUUFYmJiAAAdHR3+djtJBoMBhYWFOrPZ/Jm/OX4BEFGmxWJxrFmz5pWHXK/Xo6ioCHV1dXj06BGA1wcAgPz8fMHr9f6GiKY/BkyRXwBms/n43r17TTOdeZKTk7FixQqcPXsWoiiivb09AMuTZTKZkJ+fz5tMpt/7Ez8rABFlh4WFRX3wwQc+4woKCqBpGjweD549e+af2xm0efNmnaqqHxPRrO+5PgGIiMxm8/GysrKg2ZbI4OBg5ObmAvjxFDoXWSwWZGdn80aj8dBssbPdgY/Dw8MXvPeefxvk6tWrkZCQgP7+fr/ifWnr1q16VVWLiCjcV9yMAETEG43G4/v27TP7u0EREfbs2YNdu3YFaPdVybKMjIwMzmAw/M5XnK87kB8dHW1dunRpQANbLBafZfhAtGPHDknTtN1EZJ0pZloAIuJNJlNleXn5vFXQXkcRERFYtWoVJ0lS2Uwx0wLwPL/F4XBYUlMDOpa8Ee3cudPAGCufqRz5CgAR6URRrNizZ8//dPbHZLfbsXTpUk6v17umu/4KAMdxxYmJicax8sdPQU6n00hEB6YrR04CICJRFMUvS0tLg96evdkVHx+PlJQUHcdx26ZemwTAcZwzJSVFTEpKenvu/JTL5TKJovjZ1HLkOAARSZIkfVpaWvqTePanKikpCXFxcRLP8wUTPx8HEAShNDU1VR8fH//23fmp0XJkBRGNn+nHfiMz8zz/gyiKRlEUfdcWX4qGhobmXF32JTZNycTj8UgA8hhjfwNeAhgA/CzA/j0ABudu87XkGfs7g1//lfgp67/ZKuaHe8ljUQAAAABJRU5ErkJggg==";
        }
    }, __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            exports: {}
        };
        return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.exports;
    }
    __webpack_require__.m = __webpack_modules__, __webpack_require__.n = module => {
        var getter = module && module.__esModule ? () => module.default : () => module;
        return __webpack_require__.d(getter, {
            a: getter
        }), getter;
    }, __webpack_require__.d = (exports, definition) => {
        for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        });
    }, __webpack_require__.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
    __webpack_require__.r = exports => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.b = document.baseURI || self.location.href, __webpack_require__.nc = void 0;
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        function _wrapRegExp() {
            _wrapRegExp = function(e, r) {
                return new BabelRegExp(e, void 0, r);
            };
            var e = RegExp.prototype, r = new WeakMap;
            function BabelRegExp(e, t, p) {
                var o = new RegExp(e, t);
                return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
            }
            function buildGroups(e, t) {
                var p = r.get(t);
                return Object.keys(p).reduce((function(r, t) {
                    var o = p[t];
                    if ("number" == typeof o) r[t] = e[o]; else {
                        for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length; ) i++;
                        r[t] = e[o[i]];
                    }
                    return r;
                }), Object.create(null));
            }
            return function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(subClass, "prototype", {
                    writable: !1
                }), superClass && _setPrototypeOf(subClass, superClass);
            }(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r) {
                var t = e.exec.call(this, r);
                if (t) {
                    t.groups = buildGroups(t, this);
                    var p = t.indices;
                    p && (p.groups = buildGroups(p, this));
                }
                return t;
            }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
                if ("string" == typeof p) {
                    var o = r.get(this);
                    return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, (function(e, r) {
                        var t = o[r];
                        return "$" + (Array.isArray(t) ? t.join("$") : t);
                    })));
                }
                if ("function" == typeof p) {
                    var i = this;
                    return e[Symbol.replace].call(this, t, (function() {
                        var e = arguments;
                        return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(buildGroups(e, i)), 
                        p.apply(this, e);
                    }));
                }
                return e[Symbol.replace].call(this, t, p);
            }, _wrapRegExp.apply(this, arguments);
        }
        function _setPrototypeOf(o, p) {
            return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
                return o.__proto__ = p, o;
            }, _setPrototypeOf(o, p);
        }
        __webpack_require__.d(__webpack_exports__, {
            D: () => main
        });
        const LatLngToXYZ = latLng => {
            const d2r = Math.PI / 180, phi = latLng.lat * d2r, theta = latLng.lng * d2r, cosphi = Math.cos(phi);
            return [ Math.cos(theta) * cosphi, Math.sin(theta) * cosphi, Math.sin(phi) ];
        }, XYZToLatLng = xyz => {
            const r2d = 180 / Math.PI;
            return {
                lat: Math.atan2(xyz[2], Math.sqrt(xyz[0] * xyz[0] + xyz[1] * xyz[1])) * r2d,
                lng: Math.atan2(xyz[1], xyz[0]) * r2d
            };
        }, XYZToFaceUV = xyz => {
            let face = (xyz => {
                const abs = [ Math.abs(xyz[0]), Math.abs(xyz[1]), Math.abs(xyz[2]) ];
                return abs[0] > abs[1] ? abs[0] > abs[2] ? 0 : 2 : abs[1] > abs[2] ? 1 : 2;
            })(xyz);
            xyz[face] < 0 && (face += 3);
            const uv = ((face, xyz) => {
                let u, v;
                switch (face) {
                  case 0:
                    u = xyz[1] / xyz[0], v = xyz[2] / xyz[0];
                    break;

                  case 1:
                    u = -xyz[0] / xyz[1], v = xyz[2] / xyz[1];
                    break;

                  case 2:
                    u = -xyz[0] / xyz[2], v = -xyz[1] / xyz[2];
                    break;

                  case 3:
                    u = xyz[2] / xyz[0], v = xyz[1] / xyz[0];
                    break;

                  case 4:
                    u = xyz[2] / xyz[1], v = -xyz[0] / xyz[1];
                    break;

                  case 5:
                    u = -xyz[1] / xyz[2], v = -xyz[0] / xyz[2];
                    break;

                  default:
                    throw new Error("Invalid face");
                }
                return [ u, v ];
            })(face, xyz);
            return [ face, uv ];
        }, FaceUVToXYZ = (face, uv) => {
            const u = uv[0], v = uv[1];
            switch (face) {
              case 0:
                return [ 1, u, v ];

              case 1:
                return [ -u, 1, v ];

              case 2:
                return [ -u, -v, 1 ];

              case 3:
                return [ -1, -v, -u ];

              case 4:
                return [ v, -1, -u ];

              case 5:
                return [ v, u, -1 ];

              default:
                throw new Error("Invalid face");
            }
        }, STToUV = st => {
            const quadSTtoUV = stn => stn >= .5 ? 1 / 3 * (4 * stn * stn - 1) : 1 / 3 * (1 - 4 * (1 - stn) * (1 - stn));
            return [ quadSTtoUV(st[0]), quadSTtoUV(st[1]) ];
        }, UVToST = uv => {
            const quadUVtoST = uvn => uvn >= 0 ? .5 * Math.sqrt(1 + 3 * uvn) : 1 - .5 * Math.sqrt(1 - 3 * uvn);
            return [ quadUVtoST(uv[0]), quadUVtoST(uv[1]) ];
        }, STToIJ = (st, order) => {
            const maxSize = 1 << order, singleSTtoIJ = stn => {
                const ij = Math.floor(stn * maxSize);
                return Math.max(0, Math.min(maxSize - 1, ij));
            };
            return [ singleSTtoIJ(st[0]), singleSTtoIJ(st[1]) ];
        }, IJToST = (ij, order, offsets) => {
            const maxSize = 1 << order;
            return [ (ij[0] + offsets[0]) / maxSize, (ij[1] + offsets[1]) / maxSize ];
        }, cross = (a, b) => [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], det = (a, b, c) => dot(cross(a, b), c), simple_crossing = (a, b, c, d) => {
            const ab = cross(a, b), acb = -dot(ab, c);
            if (acb * dot(ab, d) <= 0) return !1;
            const cd = cross(c, d), cbd = -dot(cd, b), dac = dot(cd, a);
            return acb * cbd > 0 && acb * dac > 0;
        };
        class S2Polyline {
            constructor(points) {
                this.points = points || [];
            }
            empty() {
                return 0 === this.points.length;
            }
            contains(_s) {
                return !1;
            }
            mayIntersect(s) {
                if (this.empty()) return !1;
                for (const point of this.points) if (s.contains(point)) return !0;
                const corners = s.getCornerXYZ();
                for (let i = this.points.length - 1; i > 0; i--) if (corners.some(((p, j) => simple_crossing(this.points[i], this.points[i - 1], p, corners[(j + 1) % 4])))) return !0;
                return !1;
            }
        }
        class S2Triangle extends S2Polyline {
            constructor(a, b, c) {
                super([ a, b, c, a ]), this.center = [ a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2] ], 
                this.centerSides = [ det(this.center, a, b), det(this.center, b, c), det(this.center, c, a) ];
            }
            empty() {
                return !1;
            }
            contains(s) {
                return s.getCornerXYZ().every((p => this.containsPoint(p)));
            }
            containsPoint(xyz) {
                return !(det(xyz, this.points[0], this.points[1]) * this.centerSides[0] < 0) && (!(det(xyz, this.points[1], this.points[2]) * this.centerSides[1] < 0) && !(det(xyz, this.points[2], this.points[0]) * this.centerSides[2] < 0));
            }
            mayIntersect(s) {
                if (super.mayIntersect(s)) return !0;
                const corners = s.getCornerXYZ();
                for (const p of corners) if (this.containsPoint(p)) return !0;
                return !1;
            }
        }
        class S2RegionCover {
            getCoveringPoint(point, level) {
                const [face, uv] = XYZToFaceUV(point), st = UVToST(uv), ij = STToIJ(st, level);
                return S2Cell.FromFaceIJ(face, ij, level);
            }
            getCoveringFromCell(start) {
                const cells = [], frontier = new Set, stack = [ start ];
                for (frontier.add(start.toString()); stack.length > 0; ) {
                    const s = stack.pop();
                    if (this.region.mayIntersect(s)) {
                        cells.push(s);
                        for (const ns of s.getNeighbors()) frontier.has(ns.toString()) || (frontier.add(ns.toString()), 
                        stack.push(ns));
                    }
                }
                return cells;
            }
            getCovering(region, level_min, level_max) {
                if (level_min > level_max && ([level_min, level_max] = [ level_min, level_max ], 
                console.warn("s2.getCovering: level-min > level-max")), this.region = region, this.region.empty()) return [];
                let currentCells = this.getCoveringFromCell(this.getCoveringPoint(this.region.points[0], level_min));
                const final = [];
                for (;level_min < level_max && currentCells.length > 0; ) {
                    const newCells = [];
                    currentCells.forEach((cell => {
                        if (region.contains(cell)) final.push(cell); else {
                            const inside = cell.getChildren().filter((c => this.region.mayIntersect(c)));
                            newCells.push(...inside);
                        }
                    })), level_min++, currentCells = newCells;
                }
                return final.push(...currentCells), final;
            }
            howManyIntersect(region, cell, level) {
                let total = 0;
                return level <= cell.level ? 1 : region.contains(cell) ? Math.pow(4, level - cell.level) : (cell.getChildren().filter((c => this.region.mayIntersect(c))).forEach((c => total += this.howManyIntersect(region, c, level))), 
                total);
            }
        }
        class S2Cell {
            static FromLatLng(latLng, level) {
                const xyz = LatLngToXYZ(latLng), faceuv = XYZToFaceUV(xyz), st = UVToST(faceuv[1]), ij = STToIJ(st, level);
                return S2Cell.FromFaceIJ(faceuv[0], ij, level);
            }
            static FromFaceIJ(face, ij, level) {
                const cell = new S2Cell;
                cell.face = face, cell.ij = ij, cell.level = level;
                const uv0 = STToUV(IJToST(cell.ij, cell.level, [ 0, 0 ])), uv1 = STToUV(IJToST(cell.ij, cell.level, [ 1, 1 ]));
                return cell.uvBound = [ uv0, uv1 ], cell;
            }
            static FromFacePosition(face, position) {
                const ij = ((face, positions) => {
                    const hilbertMapReverse = {
                        a: [ [ 0, "d" ], [ 1, "a" ], [ 3, "a" ], [ 2, "b" ] ],
                        b: [ [ 3, "c" ], [ 1, "b" ], [ 0, "b" ], [ 2, "a" ] ],
                        c: [ [ 3, "b" ], [ 2, "c" ], [ 0, "c" ], [ 1, "d" ] ],
                        d: [ [ 0, "a" ], [ 2, "d" ], [ 3, "d" ], [ 1, "c" ] ]
                    };
                    let currentSquare = 1 & face ? "d" : "a", i = 0, j = 0;
                    return positions.forEach((v => {
                        const t = hilbertMapReverse[currentSquare][v];
                        i <<= 1, j <<= 1, 2 & t[0] && (i |= 1), 1 & t[0] && (j |= 1), currentSquare = t[1];
                    })), [ i, j ];
                })(face, position);
                return S2Cell.FromFaceIJ(face, ij, position.length);
            }
            static fromString(code) {
                const m = code.match(_wrapRegExp(/(\d+)\[(\d+),(\d+)\](\d+)/, {
                    face: 1,
                    i: 2,
                    j: 3,
                    level: 4
                }));
                if (!m || !m.groups) throw new Error(`Invalid cell code: ${code}`);
                const g = m.groups;
                return S2Cell.FromFaceIJ(Number(g.face), [ Number(g.i), Number(g.j) ], Number(g.level));
            }
            toString() {
                return `${this.face}[${this.ij[0]},${this.ij[1]}]${this.level}`;
            }
            contains(xyz) {
                const [face, uv] = XYZToFaceUV(xyz);
                if (face !== this.face) return !1;
                const [uv0, uv1] = this.uvBound;
                return uv0[0] <= uv[0] && uv[0] <= uv1[0] && uv0[1] <= uv[1] && uv[1] <= uv1[1];
            }
            getLatLng() {
                const st = IJToST(this.ij, this.level, [ .5, .5 ]), uv = STToUV(st), xyz = FaceUVToXYZ(this.face, uv);
                return XYZToLatLng(xyz);
            }
            getCornerXYZ() {
                const result = [], offsets = [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ];
                for (let i = 0; i < 4; i++) {
                    const st = IJToST(this.ij, this.level, offsets[i]), uv = STToUV(st);
                    result.push(FaceUVToXYZ(this.face, uv));
                }
                return result;
            }
            getCornerLatLngs() {
                return this.getCornerXYZ().map(XYZToLatLng);
            }
            getFaceAndQuads() {
                const quads = ((face, x, y, order) => {
                    const hilbertMap = {
                        a: [ [ 0, "d" ], [ 1, "a" ], [ 3, "b" ], [ 2, "a" ] ],
                        b: [ [ 2, "b" ], [ 1, "b" ], [ 3, "a" ], [ 0, "c" ] ],
                        c: [ [ 2, "c" ], [ 3, "d" ], [ 1, "c" ], [ 0, "b" ] ],
                        d: [ [ 0, "a" ], [ 3, "c" ], [ 1, "d" ], [ 2, "d" ] ]
                    };
                    let currentSquare = 1 & face ? "d" : "a";
                    const positions = [];
                    for (let i = order - 1; i >= 0; i--) {
                        const mask = 1 << i, t = hilbertMap[currentSquare][2 * (x & mask ? 1 : 0) + (y & mask ? 1 : 0)];
                        positions.push(t[0]), currentSquare = t[1];
                    }
                    return positions;
                })(this.face, this.ij[0], this.ij[1], this.level);
                return [ this.face, quads ];
            }
            getNeighbors() {
                const face = this.face, i = this.ij[0], j = this.ij[1], level = this.level;
                return [ this.fromFaceIJWrap(face, [ i - 1, j ], level), this.fromFaceIJWrap(face, [ i, j - 1 ], level), this.fromFaceIJWrap(face, [ i + 1, j ], level), this.fromFaceIJWrap(face, [ i, j + 1 ], level) ];
            }
            fromFaceIJWrap(face, ij, level) {
                const maxSize = 1 << level;
                if (ij[0] >= 0 && ij[1] >= 0 && ij[0] < maxSize && ij[1] < maxSize) return S2Cell.FromFaceIJ(face, ij, level);
                {
                    let st = IJToST(ij, level, [ .5, .5 ]), uv = STToUV(st);
                    const xyz = FaceUVToXYZ(face, uv), faceuv = XYZToFaceUV(xyz);
                    return face = faceuv[0], uv = faceuv[1], st = UVToST(uv), ij = STToIJ(st, level), 
                    S2Cell.FromFaceIJ(face, ij, level);
                }
            }
            getChildren() {
                const face = this.face, i = 2 * this.ij[0], j = 2 * this.ij[1], level = this.level + 1;
                return [ S2Cell.FromFaceIJ(face, [ i, j ], level), S2Cell.FromFaceIJ(face, [ i, j + 1 ], level), S2Cell.FromFaceIJ(face, [ i + 1, j ], level), S2Cell.FromFaceIJ(face, [ i + 1, j + 1 ], level) ];
            }
            getParent() {
                if (this.level <= 1) return;
                const face = this.face, i = this.ij[0] >> 1, j = this.ij[1] >> 1, level = this.level - 1;
                return S2Cell.FromFaceIJ(face, [ i, j ], level);
            }
        }
        var localforage = __webpack_require__(483), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : function adopt(value) {
                        return value instanceof P ? value : new P((function(resolve) {
                            resolve(value);
                        }));
                    }(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        class FieldLogger {
            constructor() {
                this.onChatData = chatEvent => {
                    const fullChat = chatEvent.result;
                    fullChat.forEach(((chatLine, index) => {
                        if ("SYSTEM_BROADCAST" !== chatLine[2].plext.plextType) return;
                        const isField = this.isControlFieldMessage(chatLine[2].plext.markup);
                        if (isField) {
                            const guid = chatLine[0], time = chatLine[1], atPosition = isField.position, mindunits = isField.mindunits, processed = new Set([ guid ]), relatedChats = fullChat.filter((chat => {
                                const isRelated = chat[1] === time && "SYSTEM_BROADCAST" === chat[2].plext.plextType && !processed.has(chat[0]);
                                return isRelated && processed.add(chat[0]), isRelated;
                            }));
                            this.onCreatedFieldMsg(relatedChats, time, mindunits, atPosition, isField.agent);
                        }
                    }));
                };
            }
            init() {
                window.addHook("publicChatDataAvailable", this.onChatData), this.store = localforage.createInstance({
                    name: "FieldDB",
                    driver: [ localforage.WEBSQL, localforage.INDEXEDDB ]
                });
            }
            getFieldMUS(field) {
                return __awaiter(this, void 0, void 0, (function*() {
                    const p = field.options.data.points.map((p => [ p.latE6, p.lngE6 ])), myguid = this.pos2guid(p), old = yield this.store.getItem(myguid);
                    if (old) return old.mus;
                }));
            }
            forEach(callback) {
                return this.store.iterate(((data, guid) => {
                    const latlngs = this.guid2pos(guid).map((p => L.latLng(1e-6 * p[0], 1e-6 * p[1])));
                    3 === latlngs.length && callback(latlngs, data.mus);
                }));
            }
            isControlFieldMessage(markup) {
                if (markup.length > 5 && "PLAYER" === markup[2][0] && " created a Control Field @" === markup[3][1].plain && "PORTAL" === markup[4][0]) {
                    const portal_raw = markup[4][1];
                    return {
                        position: [ portal_raw.latE6, portal_raw.lngE6 ],
                        mindunits: "TEXT" === markup[6][0] ? parseInt(markup[6][1].plain) : 0,
                        agent: markup[2][1].plain
                    };
                }
                if (markup.length > 4 && "PLAYER" === markup[0][0] && " created a Control Field @" === markup[1][1].plain && "PORTAL" === markup[2][0]) {
                    const portal_raw = markup[2][1];
                    return {
                        position: [ portal_raw.latE6, portal_raw.lngE6 ],
                        mindunits: "TEXT" === markup[4][0] ? parseInt(markup[4][1].plain) : 0,
                        agent: markup[0][1].plain
                    };
                }
            }
            onCreatedFieldMsg(relatedChats, time, mindunits, pos1, agent) {
                return __awaiter(this, void 0, void 0, (function*() {
                    if (mindunits < 100) return;
                    const pos2 = this.findSecondPortal(relatedChats, pos1, agent);
                    if (!pos2) return void console.error("LogField: no link msg found", relatedChats);
                    const fields = this.findLinkFields(pos1, pos2);
                    let secondFieldMindunits = this.getSecondFieldMU(relatedChats);
                    switch (fields.length) {
                      case 0:
                        break;

                      case 1:
                        if (secondFieldMindunits) return;
                        return void this.storeIITCField(time, pos1, pos2, fields[0], mindunits);

                      case 2:
                        if (!secondFieldMindunits) return;
                        if (secondFieldMindunits <= 0) return;
                        if (secondFieldMindunits > mindunits && ([mindunits, secondFieldMindunits] = [ secondFieldMindunits, mindunits ]), 
                        secondFieldMindunits / mindunits > .7) return;
                        return this.storeIITCField(time, pos1, pos2, fields[0], mindunits), void this.storeIITCField(time, pos1, pos2, fields[1], secondFieldMindunits);

                      default:
                        return;
                    }
                    const pos3 = this.findThirdPortal(pos1, pos2);
                    if (!pos3) return;
                    const positions = [ pos1, pos2, pos3 ];
                    this.storeField(time, positions, mindunits, this.findField(positions));
                }));
            }
            storeIITCField(time, pos1, pos2, field, mindunits) {
                if (mindunits < 100) return;
                const fp = field.options.data.points, positions = [ pos1, pos2, [ fp[2].latE6, fp[2].lngE6 ] ];
                this.storeField(time, positions, mindunits, field);
            }
            findLinkFields(pos1, pos2) {
                const allFields = [];
                for (const guid in window.fields) {
                    const field = window.fields[guid], fp = field.options.data.points, match = this.compFieldLink(fp, pos1, pos2);
                    match >= 0 && ([fp[match], fp[2]] = [ fp[2], fp[match] ], allFields.push(field));
                }
                const px1 = pos1[0], py1 = pos1[1], px2 = pos2[0], py2 = pos2[1];
                let left, right, left_dist = 0, right_dist = 0;
                return allFields.forEach((field => {
                    const fp = field.options.data.points, x = fp[2].latE6, y = fp[2].lngE6;
                    let distance = (py1 - py2) * x + (px2 - px1) * y + px1 * py2 - px2 * py1;
                    distance < 0 ? distance < left_dist && (left_dist = distance, left = field) : distance > right_dist && (right_dist = distance, 
                    right = field);
                })), left ? right ? -left_dist > right_dist ? [ left, right ] : [ right, left ] : [ left ] : right ? [ right ] : [];
            }
            compFieldLink(fp, p1, p2) {
                return this.equal(fp[0], p1) ? this.equal(fp[1], p2) ? 2 : this.equal(fp[2], p2) ? 1 : -1 : this.equal(fp[1], p1) ? this.equal(fp[0], p2) ? 2 : this.equal(fp[2], p2) ? 0 : -1 : this.equal(fp[2], p1) ? this.equal(fp[1], p2) ? 0 : this.equal(fp[0], p2) ? 1 : -1 : -1;
            }
            findSecondPortal(relatedChats, pos1, agent) {
                let result;
                return relatedChats.some((chatLine => {
                    const markup = chatLine[2].plext.markup;
                    if (7 === markup.length && "PLAYER" === markup[2][0] && markup[2][1].plain === agent && " linked from " === markup[3][1].plain && "PORTAL" === markup[4][0] && "PORTAL" === markup[6][0]) {
                        const portal1 = markup[4][1], portal2 = markup[6][1];
                        if (portal1.latE6 === pos1[0] && portal1.lngE6 === pos1[1]) return result = [ portal2.latE6, portal2.lngE6 ], 
                        !0;
                        if (portal2.latE6 === pos1[0] && portal2.lngE6 === pos1[1]) return result = [ portal1.latE6, portal1.lngE6 ], 
                        !0;
                    }
                    if (markup.length > 3 && "PLAYER" === markup[0][0] && markup[0][1].plain === agent && markup[1][1].plain.startsWith(" linked") && "PORTAL" === markup[2][0] && "PORTAL" === markup[4][0]) {
                        const portal1 = markup[2][1], portal2 = markup[4][1];
                        if (portal1.latE6 === pos1[0] && portal1.lngE6 === pos1[1]) return result = [ portal2.latE6, portal2.lngE6 ], 
                        !0;
                        if (portal2.latE6 === pos1[0] && portal2.lngE6 === pos1[1]) return result = [ portal1.latE6, portal1.lngE6 ], 
                        !0;
                    }
                    return !1;
                })), result;
            }
            findThirdPortal(pos1, pos2) {
                const portal1 = this.findPortalGuidByPositionE6(pos1[0], pos1[1]), portal2 = this.findPortalGuidByPositionE6(pos2[0], pos2[1]);
                if (!portal1 || !portal2) return;
                const canidates1 = this.getLinkedPortalguids(portal1), canidates2 = this.getLinkedPortalguids(portal2), canidates = canidates1.filter((l => canidates2.includes(l)));
                if (0 !== canidates.length && 1 === canidates.length) {
                    const portal3 = window.portals[canidates[0]];
                    if (!portal3) return;
                    return [ portal3.options.data.latE6, portal3.options.data.lngE6 ];
                }
            }
            storeField(time, position, mindunits, field) {
                return __awaiter(this, void 0, void 0, (function*() {
                    const myguid = this.pos2guid(position), old = yield this.store.getItem(myguid);
                    old && (old.mus, old.time >= time) || (field && this.onNewField && this.onNewField(field, mindunits), 
                    this.store.setItem(myguid, {
                        time,
                        mus: mindunits
                    }));
                }));
            }
            pos2guid(pos_in) {
                const pos = this.posOrder(pos_in);
                return [ ...pos[0], ...pos[1], ...pos[2] ].map((v => v.toString())).join(",");
            }
            guid2pos(guid) {
                const params = guid.split(",");
                return 6 !== params.length ? (console.error("wrong guid:", guid), []) : [ [ Number(params[0]), Number(params[1]) ], [ Number(params[2]), Number(params[3]) ], [ Number(params[4]), Number(params[5]) ] ];
            }
            posOrder(pos) {
                return pos.sort(((a, b) => {
                    const d = b[0] - a[0];
                    return 0 == d ? b[1] - a[1] : d;
                }));
            }
            findField(p) {
                for (const guid in window.fields) {
                    const field = window.fields[guid], fp = field.options.data.points;
                    if (this.compField(fp, p)) return field;
                }
            }
            compField(fp, p) {
                return this.equal(fp[0], p[0]) && (this.equal(fp[1], p[1]) && this.equal(fp[2], p[2]) || this.equal(fp[1], p[2]) && this.equal(fp[2], p[1])) || this.equal(fp[0], p[1]) && (this.equal(fp[1], p[0]) && this.equal(fp[2], p[2]) || this.equal(fp[1], p[2]) && this.equal(fp[2], p[0])) || this.equal(fp[0], p[2]) && (this.equal(fp[1], p[1]) && this.equal(fp[2], p[0]) || this.equal(fp[1], p[0]) && this.equal(fp[2], p[1]));
            }
            equal(a, b) {
                return a.latE6 === b[0] && a.lngE6 === b[1];
            }
            getSecondFieldMU(relatedChats) {
                const otherCreateFieldLines = relatedChats.filter((chatline => " created a Control Field @" === chatline[2].plext.markup[1][1].plain));
                if (0 === otherCreateFieldLines.length) return;
                if (otherCreateFieldLines.length > 1) return void console.error("tripel CREATED FIELD line", relatedChats);
                const markup = otherCreateFieldLines[0][2].plext.markup;
                return "TEXT" === markup[4][0] ? parseInt(markup[4][1].plain) : -1;
            }
            findPortalGuidByPositionE6(latE6, lngE6) {
                for (const guid in window.portals) {
                    const data = window.portals[guid].options.data;
                    if (data.latE6 == latE6 && data.lngE6 == lngE6) return guid;
                }
                for (const fguid in window.fields) {
                    const points = window.fields[fguid].options.data.points;
                    for (var i in points) {
                        var point = points[i];
                        if (point.latE6 == latE6 && point.lngE6 == lngE6) return point.guid;
                    }
                }
                for (const lguid in window.links) {
                    const l = window.links[lguid].options.data;
                    if (l.oLatE6 == latE6 && l.oLngE6 == lngE6) return l.oGuid;
                    if (l.dLatE6 == latE6 && l.dLngE6 == lngE6) return l.dGuid;
                }
            }
            getLinkedPortalguids(guid) {
                const guids = [];
                return $.each(window.links, (function(g, l) {
                    var d = l.options.data;
                    d.oGuid == guid ? guids.push(d.dGuid) : d.dGuid == guid && guids.push(d.oGuid);
                })), guids;
            }
            getFieldCount() {
                return __awaiter(this, void 0, void 0, (function*() {
                    return yield this.store.length();
                }));
            }
        }
        var mindunitsDB_awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : function adopt(value) {
                        return value instanceof P ? value : new P((function(resolve) {
                            resolve(value);
                        }));
                    }(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        const S2MUDetailFactor = Math.pow(4, 6);
        class MindunitsDB {
            constructor() {
                this.muDB = new Map, this.muDBParents = new Map;
            }
            train(fieldLog) {
                return mindunitsDB_awaiter(this, void 0, void 0, (function*() {
                    let count = 0, skip = 2;
                    skip = 1, yield fieldLog.forEach(((latlngs, mindunits) => {
                        count++ % 1 == 0 && this.trainField(latlngs, mindunits);
                    })), this.calculateParents(this.muDB);
                }));
            }
            trainField(ll, mindunits) {
                const cover = new S2RegionCover, region = new S2Triangle(LatLngToXYZ(ll[0]), LatLngToXYZ(ll[1]), LatLngToXYZ(ll[2])), cells = cover.getCovering(region, 11, 11), detailCells = cells.map((cell => cover.howManyIntersect(region, cell, 17))), total = detailCells.reduce(((sum, x) => sum + x), 0), mu_per_detail = mindunits / total;
                cells.forEach(((cell, i) => {
                    const id = cell.toString(), mu = mu_per_detail * S2MUDetailFactor;
                    if (this.muDB.has(id)) {
                        const current = this.muDB.get(id);
                        if (current !== mu) {
                            let w = detailCells[i] / total;
                            w = Math.min(w, .9), this.muDB.set(id, (1 - w) * current + w * mu);
                        }
                    } else this.muDB.set(id, mu);
                }));
            }
            calculateParents(fields) {
                if (0 === fields.size) return void console.error("no parent fields?");
                const firstCellID = fields.keys().next().value, cell = S2Cell.fromString(firstCellID);
                if (1 === cell.level) return;
                const parents = new Map;
                fields.forEach(((mindunits, id) => {
                    const parent_id = S2Cell.fromString(id).getParent().toString(), inParents = parents.get(parent_id);
                    inParents ? inParents.push(mindunits) : parents.set(parent_id, [ mindunits ]);
                }));
                const parentValues = new Map;
                parents.forEach(((munits, id) => {
                    const approx = munits.reduce(((s, x) => s + x), 0) / munits.length * 4;
                    parentValues.set(id, approx), 10 === cell.level && 4 === munits.length || (this.muDBParents.set(id, approx), 
                    cell.level);
                })), this.calculateParents(parentValues);
            }
            calcMU(ll) {
                const cover = new S2RegionCover, region = new S2Triangle(LatLngToXYZ(ll[0]), LatLngToXYZ(ll[1]), LatLngToXYZ(ll[2])), cells = cover.getCovering(region, 11, 11), result = {
                    mindunits: 0,
                    cells: 0,
                    missing: 0,
                    approx: 0
                };
                return cells.forEach((cell => {
                    const id = cell.toString(), details = cover.howManyIntersect(region, cell, 17);
                    result.cells += details;
                    const cellMU = this.muDB.get(id);
                    if (cellMU) result.mindunits += cellMU * details / S2MUDetailFactor; else {
                        const parentUnits = this.findParentUnits(cell);
                        parentUnits ? (result.mindunits += parentUnits * details / S2MUDetailFactor, result.approx += details) : result.missing += details;
                    }
                })), result.mindunits = Math.ceil(result.mindunits), result;
            }
            findParentUnits(cell) {
                const parent = cell.getParent();
                if (!parent) return;
                let parentUnits = this.muDBParents.get(parent.toString());
                return parentUnits || (parentUnits = this.findParentUnits(parent)), parentUnits && parentUnits / 4;
            }
            forEach(callback) {
                this.muDB.forEach(((mindunits, guid) => {
                    const cell = S2Cell.fromString(guid);
                    callback(cell, mindunits);
                }));
            }
            getNumberOfCells() {
                return this.muDB.size;
            }
        }
        const solid_sharedConfig = {
            context: void 0,
            registry: void 0
        };
        function setHydrateContext(context) {
            solid_sharedConfig.context = context;
        }
        const equalFn = (a, b) => a === b, signalOptions = (Symbol("solid-proxy"), Symbol("solid-track"), 
        Symbol("solid-dev-component"), {
            equals: equalFn
        });
        let ERROR = null, runEffects = runQueue;
        const STALE = 1, PENDING = 2, UNOWNED = {
            owned: null,
            cleanups: null,
            context: null,
            owner: null
        };
        var Owner = null;
        let Transition = null, Scheduler = null, ExternalSourceConfig = null, Listener = null, Updates = null, Effects = null, ExecCount = 0;
        function solid_createRoot(fn, detachedOwner) {
            const listener = Listener, owner = Owner, unowned = 0 === fn.length, current = void 0 === detachedOwner ? owner : detachedOwner, root = unowned ? UNOWNED : {
                owned: null,
                cleanups: null,
                context: current ? current.context : null,
                owner: current
            }, updateFn = unowned ? fn : () => fn((() => solid_untrack((() => cleanNode(root)))));
            Owner = root, Listener = null;
            try {
                return runUpdates(updateFn, !0);
            } finally {
                Listener = listener, Owner = owner;
            }
        }
        function solid_createSignal(value, options) {
            const s = {
                value,
                observers: null,
                observerSlots: null,
                comparator: (options = options ? Object.assign({}, signalOptions, options) : signalOptions).equals || void 0
            };
            return [ readSignal.bind(s), value => ("function" == typeof value && (value = Transition && Transition.running && Transition.sources.has(s) ? value(s.tValue) : value(s.value)), 
            writeSignal(s, value)) ];
        }
        function solid_createRenderEffect(fn, value, options) {
            const c = createComputation(fn, value, !1, STALE);
            Scheduler && Transition && Transition.running ? Updates.push(c) : updateComputation(c);
        }
        function solid_createMemo(fn, value, options) {
            options = options ? Object.assign({}, signalOptions, options) : signalOptions;
            const c = createComputation(fn, value, !0, 0);
            return c.observers = null, c.observerSlots = null, c.comparator = options.equals || void 0, 
            Scheduler && Transition && Transition.running ? (c.tState = STALE, Updates.push(c)) : updateComputation(c), 
            readSignal.bind(c);
        }
        function solid_untrack(fn) {
            if (!ExternalSourceConfig && null === Listener) return fn();
            const listener = Listener;
            Listener = null;
            try {
                return ExternalSourceConfig ? ExternalSourceConfig.untrack(fn) : fn();
            } finally {
                Listener = listener;
            }
        }
        function solid_onCleanup(fn) {
            return null === Owner || (null === Owner.cleanups ? Owner.cleanups = [ fn ] : Owner.cleanups.push(fn)), 
            fn;
        }
        function startTransition(fn) {
            if (Transition && Transition.running) return fn(), Transition.done;
            const l = Listener, o = Owner;
            return Promise.resolve().then((() => {
                let t;
                return Listener = l, Owner = o, (Scheduler || SuspenseContext) && (t = Transition || (Transition = {
                    sources: new Set,
                    effects: [],
                    promises: new Set,
                    disposed: new Set,
                    queue: new Set,
                    running: !0
                }), t.done || (t.done = new Promise((res => t.resolve = res))), t.running = !0), 
                runUpdates(fn, !1), Listener = Owner = null, t ? t.done : void 0;
            }));
        }
        const [transPending, setTransPending] = solid_createSignal(!1);
        function createContext(defaultValue, options) {
            const id = Symbol("context");
            return {
                id,
                Provider: createProvider(id),
                defaultValue
            };
        }
        function children(fn) {
            const children = solid_createMemo(fn), memo = solid_createMemo((() => resolveChildren(children())));
            return memo.toArray = () => {
                const c = memo();
                return Array.isArray(c) ? c : null != c ? [ c ] : [];
            }, memo;
        }
        let SuspenseContext;
        function readSignal() {
            const runningTransition = Transition && Transition.running;
            if (this.sources && (runningTransition ? this.tState : this.state)) if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this); else {
                const updates = Updates;
                Updates = null, runUpdates((() => lookUpstream(this)), !1), Updates = updates;
            }
            if (Listener) {
                const sSlot = this.observers ? this.observers.length : 0;
                Listener.sources ? (Listener.sources.push(this), Listener.sourceSlots.push(sSlot)) : (Listener.sources = [ this ], 
                Listener.sourceSlots = [ sSlot ]), this.observers ? (this.observers.push(Listener), 
                this.observerSlots.push(Listener.sources.length - 1)) : (this.observers = [ Listener ], 
                this.observerSlots = [ Listener.sources.length - 1 ]);
            }
            return runningTransition && Transition.sources.has(this) ? this.tValue : this.value;
        }
        function writeSignal(node, value, isComp) {
            let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
            if (!node.comparator || !node.comparator(current, value)) {
                if (Transition) {
                    const TransitionRunning = Transition.running;
                    (TransitionRunning || !isComp && Transition.sources.has(node)) && (Transition.sources.add(node), 
                    node.tValue = value), TransitionRunning || (node.value = value);
                } else node.value = value;
                node.observers && node.observers.length && runUpdates((() => {
                    for (let i = 0; i < node.observers.length; i += 1) {
                        const o = node.observers[i], TransitionRunning = Transition && Transition.running;
                        TransitionRunning && Transition.disposed.has(o) || ((TransitionRunning ? o.tState : o.state) || (o.pure ? Updates.push(o) : Effects.push(o), 
                        o.observers && markDownstream(o)), TransitionRunning ? o.tState = STALE : o.state = STALE);
                    }
                    if (Updates.length > 1e6) throw Updates = [], new Error;
                }), !1);
            }
            return value;
        }
        function updateComputation(node) {
            if (!node.fn) return;
            cleanNode(node);
            const time = ExecCount;
            runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time), 
            Transition && !Transition.running && Transition.sources.has(node) && queueMicrotask((() => {
                runUpdates((() => {
                    Transition && (Transition.running = !0), Listener = Owner = node, runComputation(node, node.tValue, time), 
                    Listener = Owner = null;
                }), !1);
            }));
        }
        function runComputation(node, value, time) {
            let nextValue;
            const owner = Owner, listener = Listener;
            Listener = Owner = node;
            try {
                nextValue = node.fn(value);
            } catch (err) {
                return node.pure && (Transition && Transition.running ? (node.tState = STALE, node.tOwned && node.tOwned.forEach(cleanNode), 
                node.tOwned = void 0) : (node.state = STALE, node.owned && node.owned.forEach(cleanNode), 
                node.owned = null)), node.updatedAt = time + 1, handleError(err);
            } finally {
                Listener = listener, Owner = owner;
            }
            (!node.updatedAt || node.updatedAt <= time) && (null != node.updatedAt && "observers" in node ? writeSignal(node, nextValue, !0) : Transition && Transition.running && node.pure ? (Transition.sources.add(node), 
            node.tValue = nextValue) : node.value = nextValue, node.updatedAt = time);
        }
        function createComputation(fn, init, pure, state = STALE, options) {
            const c = {
                fn,
                state,
                updatedAt: null,
                owned: null,
                sources: null,
                sourceSlots: null,
                cleanups: null,
                value: init,
                owner: Owner,
                context: Owner ? Owner.context : null,
                pure
            };
            if (Transition && Transition.running && (c.state = 0, c.tState = state), null === Owner || Owner !== UNOWNED && (Transition && Transition.running && Owner.pure ? Owner.tOwned ? Owner.tOwned.push(c) : Owner.tOwned = [ c ] : Owner.owned ? Owner.owned.push(c) : Owner.owned = [ c ]), 
            ExternalSourceConfig && c.fn) {
                const [track, trigger] = solid_createSignal(void 0, {
                    equals: !1
                }), ordinary = ExternalSourceConfig.factory(c.fn, trigger);
                solid_onCleanup((() => ordinary.dispose()));
                const triggerInTransition = () => startTransition(trigger).then((() => inTransition.dispose())), inTransition = ExternalSourceConfig.factory(c.fn, triggerInTransition);
                c.fn = x => (track(), Transition && Transition.running ? inTransition.track(x) : ordinary.track(x));
            }
            return c;
        }
        function runTop(node) {
            const runningTransition = Transition && Transition.running;
            if (0 === (runningTransition ? node.tState : node.state)) return;
            if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
            if (node.suspense && solid_untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
            const ancestors = [ node ];
            for (;(node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount); ) {
                if (runningTransition && Transition.disposed.has(node)) return;
                (runningTransition ? node.tState : node.state) && ancestors.push(node);
            }
            for (let i = ancestors.length - 1; i >= 0; i--) {
                if (node = ancestors[i], runningTransition) {
                    let top = node, prev = ancestors[i + 1];
                    for (;(top = top.owner) && top !== prev; ) if (Transition.disposed.has(top)) return;
                }
                if ((runningTransition ? node.tState : node.state) === STALE) updateComputation(node); else if ((runningTransition ? node.tState : node.state) === PENDING) {
                    const updates = Updates;
                    Updates = null, runUpdates((() => lookUpstream(node, ancestors[0])), !1), Updates = updates;
                }
            }
        }
        function runUpdates(fn, init) {
            if (Updates) return fn();
            let wait = !1;
            init || (Updates = []), Effects ? wait = !0 : Effects = [], ExecCount++;
            try {
                const res = fn();
                return function completeUpdates(wait) {
                    Updates && (Scheduler && Transition && Transition.running ? function scheduleQueue(queue) {
                        for (let i = 0; i < queue.length; i++) {
                            const item = queue[i], tasks = Transition.queue;
                            tasks.has(item) || (tasks.add(item), Scheduler((() => {
                                tasks.delete(item), runUpdates((() => {
                                    Transition.running = !0, runTop(item);
                                }), !1), Transition && (Transition.running = !1);
                            })));
                        }
                    }(Updates) : runQueue(Updates), Updates = null);
                    if (wait) return;
                    let res;
                    if (Transition) if (Transition.promises.size || Transition.queue.size) {
                        if (Transition.running) return Transition.running = !1, Transition.effects.push.apply(Transition.effects, Effects), 
                        Effects = null, void setTransPending(!0);
                    } else {
                        const sources = Transition.sources, disposed = Transition.disposed;
                        Effects.push.apply(Effects, Transition.effects), res = Transition.resolve;
                        for (const e of Effects) "tState" in e && (e.state = e.tState), delete e.tState;
                        Transition = null, runUpdates((() => {
                            for (const d of disposed) cleanNode(d);
                            for (const v of sources) {
                                if (v.value = v.tValue, v.owned) for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
                                v.tOwned && (v.owned = v.tOwned), delete v.tValue, delete v.tOwned, v.tState = 0;
                            }
                            setTransPending(!1);
                        }), !1);
                    }
                    const e = Effects;
                    Effects = null, e.length && runUpdates((() => runEffects(e)), !1);
                    res && res();
                }(wait), res;
            } catch (err) {
                wait || (Effects = null), Updates = null, handleError(err);
            }
        }
        function runQueue(queue) {
            for (let i = 0; i < queue.length; i++) runTop(queue[i]);
        }
        function lookUpstream(node, ignore) {
            const runningTransition = Transition && Transition.running;
            runningTransition ? node.tState = 0 : node.state = 0;
            for (let i = 0; i < node.sources.length; i += 1) {
                const source = node.sources[i];
                if (source.sources) {
                    const state = runningTransition ? source.tState : source.state;
                    state === STALE ? source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount) && runTop(source) : state === PENDING && lookUpstream(source, ignore);
                }
            }
        }
        function markDownstream(node) {
            const runningTransition = Transition && Transition.running;
            for (let i = 0; i < node.observers.length; i += 1) {
                const o = node.observers[i];
                (runningTransition ? o.tState : o.state) || (runningTransition ? o.tState = PENDING : o.state = PENDING, 
                o.pure ? Updates.push(o) : Effects.push(o), o.observers && markDownstream(o));
            }
        }
        function cleanNode(node) {
            let i;
            if (node.sources) for (;node.sources.length; ) {
                const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
                if (obs && obs.length) {
                    const n = obs.pop(), s = source.observerSlots.pop();
                    index < obs.length && (n.sourceSlots[s] = index, obs[index] = n, source.observerSlots[index] = s);
                }
            }
            if (Transition && Transition.running && node.pure) {
                if (node.tOwned) {
                    for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
                    delete node.tOwned;
                }
                solid_reset(node, !0);
            } else if (node.owned) {
                for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
                node.owned = null;
            }
            if (node.cleanups) {
                for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
                node.cleanups = null;
            }
            Transition && Transition.running ? node.tState = 0 : node.state = 0;
        }
        function solid_reset(node, top) {
            if (top || (node.tState = 0, Transition.disposed.add(node)), node.owned) for (let i = 0; i < node.owned.length; i++) solid_reset(node.owned[i]);
        }
        function castError(err) {
            return err instanceof Error ? err : new Error("string" == typeof err ? err : "Unknown error", {
                cause: err
            });
        }
        function runErrors(err, fns, owner) {
            try {
                for (const f of fns) f(err);
            } catch (e) {
                handleError(e, owner && owner.owner || null);
            }
        }
        function handleError(err, owner = Owner) {
            const fns = ERROR && owner && owner.context && owner.context[ERROR], error = castError(err);
            if (!fns) throw error;
            Effects ? Effects.push({
                fn() {
                    runErrors(error, fns, owner);
                },
                state: STALE
            }) : runErrors(error, fns, owner);
        }
        function resolveChildren(children) {
            if ("function" == typeof children && !children.length) return resolveChildren(children());
            if (Array.isArray(children)) {
                const results = [];
                for (let i = 0; i < children.length; i++) {
                    const result = resolveChildren(children[i]);
                    Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
                }
                return results;
            }
            return children;
        }
        function createProvider(id, options) {
            return function provider(props) {
                let res;
                return solid_createRenderEffect((() => res = solid_untrack((() => (Owner.context = {
                    ...Owner.context,
                    [id]: props.value
                }, children((() => props.children)))))), void 0), res;
            };
        }
        Symbol("fallback");
        let hydrationEnabled = !1;
        function createComponent(Comp, props) {
            if (hydrationEnabled && solid_sharedConfig.context) {
                const c = solid_sharedConfig.context;
                setHydrateContext(function nextHydrateContext() {
                    return {
                        ...solid_sharedConfig.context,
                        id: `${solid_sharedConfig.context.id}${solid_sharedConfig.context.count++}-`,
                        count: 0
                    };
                }());
                const r = solid_untrack((() => Comp(props || {})));
                return setHydrateContext(c), r;
            }
            return solid_untrack((() => Comp(props || {})));
        }
        const narrowedError = name => `Stale read from <${name}>.`;
        function Show(props) {
            const keyed = props.keyed, condition = solid_createMemo((() => props.when), void 0, {
                equals: (a, b) => keyed ? a === b : !a == !b
            });
            return solid_createMemo((() => {
                const c = condition();
                if (c) {
                    const child = props.children;
                    return "function" == typeof child && child.length > 0 ? solid_untrack((() => child(keyed ? c : () => {
                        if (!solid_untrack(condition)) throw narrowedError("Show");
                        return props.when;
                    }))) : child;
                }
                return props.fallback;
            }), void 0, void 0);
        }
        createContext();
        Object.create(null), Object.create(null);
        const $$EVENTS = "_$DX_DELEGATE";
        function render(code, element, init, options = {}) {
            let disposer;
            return solid_createRoot((dispose => {
                disposer = dispose, element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
            }), options.owner), () => {
                disposer(), element.textContent = "";
            };
        }
        function template(html, isCE, isSVG) {
            let node;
            const create = () => {
                const t = document.createElement("template");
                return t.innerHTML = html, isSVG ? t.content.firstChild.firstChild : t.content.firstChild;
            }, fn = isCE ? () => solid_untrack((() => document.importNode(node || (node = create()), !0))) : () => (node || (node = create())).cloneNode(!0);
            return fn.cloneNode = fn, fn;
        }
        function delegateEvents(eventNames, document = window.document) {
            const e = document[$$EVENTS] || (document[$$EVENTS] = new Set);
            for (let i = 0, l = eventNames.length; i < l; i++) {
                const name = eventNames[i];
                e.has(name) || (e.add(name), document.addEventListener(name, eventHandler));
            }
        }
        function insert(parent, accessor, marker, initial) {
            if (void 0 === marker || initial || (initial = []), "function" != typeof accessor) return insertExpression(parent, accessor, initial, marker);
            solid_createRenderEffect((current => insertExpression(parent, accessor(), current, marker)), initial);
        }
        function eventHandler(e) {
            const key = `$$${e.type}`;
            let node = e.composedPath && e.composedPath()[0] || e.target;
            for (e.target !== node && Object.defineProperty(e, "target", {
                configurable: !0,
                value: node
            }), Object.defineProperty(e, "currentTarget", {
                configurable: !0,
                get: () => node || document
            }), solid_sharedConfig.registry && !solid_sharedConfig.done && (solid_sharedConfig.done = _$HY.done = !0); node; ) {
                const handler = node[key];
                if (handler && !node.disabled) {
                    const data = node[`${key}Data`];
                    if (void 0 !== data ? handler.call(node, data, e) : handler.call(node, e), e.cancelBubble) return;
                }
                node = node._$host || node.parentNode || node.host;
            }
        }
        function insertExpression(parent, value, current, marker, unwrapArray) {
            if (solid_sharedConfig.context) {
                !current && (current = [ ...parent.childNodes ]);
                let cleaned = [];
                for (let i = 0; i < current.length; i++) {
                    const node = current[i];
                    8 === node.nodeType && "!$" === node.data.slice(0, 2) ? node.remove() : cleaned.push(node);
                }
                current = cleaned;
            }
            for (;"function" == typeof current; ) current = current();
            if (value === current) return current;
            const t = typeof value, multi = void 0 !== marker;
            if (parent = multi && current[0] && current[0].parentNode || parent, "string" === t || "number" === t) {
                if (solid_sharedConfig.context) return current;
                if ("number" === t && (value = value.toString()), multi) {
                    let node = current[0];
                    node && 3 === node.nodeType ? node.data = value : node = document.createTextNode(value), 
                    current = cleanChildren(parent, current, marker, node);
                } else current = "" !== current && "string" == typeof current ? parent.firstChild.data = value : parent.textContent = value;
            } else if (null == value || "boolean" === t) {
                if (solid_sharedConfig.context) return current;
                current = cleanChildren(parent, current, marker);
            } else {
                if ("function" === t) return solid_createRenderEffect((() => {
                    let v = value();
                    for (;"function" == typeof v; ) v = v();
                    current = insertExpression(parent, v, current, marker);
                })), () => current;
                if (Array.isArray(value)) {
                    const array = [], currentArray = current && Array.isArray(current);
                    if (normalizeIncomingArray(array, value, current, unwrapArray)) return solid_createRenderEffect((() => current = insertExpression(parent, array, current, marker, !0))), 
                    () => current;
                    if (solid_sharedConfig.context) {
                        if (!array.length) return current;
                        if (void 0 === marker) return [ ...parent.childNodes ];
                        let node = array[0], nodes = [ node ];
                        for (;(node = node.nextSibling) !== marker; ) nodes.push(node);
                        return current = nodes;
                    }
                    if (0 === array.length) {
                        if (current = cleanChildren(parent, current, marker), multi) return current;
                    } else currentArray ? 0 === current.length ? appendNodes(parent, array, marker) : function reconcileArrays(parentNode, a, b) {
                        let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
                        for (;aStart < aEnd || bStart < bEnd; ) if (a[aStart] !== b[bStart]) {
                            for (;a[aEnd - 1] === b[bEnd - 1]; ) aEnd--, bEnd--;
                            if (aEnd === aStart) {
                                const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
                                for (;bStart < bEnd; ) parentNode.insertBefore(b[bStart++], node);
                            } else if (bEnd === bStart) for (;aStart < aEnd; ) map && map.has(a[aStart]) || a[aStart].remove(), 
                            aStart++; else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                                const node = a[--aEnd].nextSibling;
                                parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling), parentNode.insertBefore(b[--bEnd], node), 
                                a[aEnd] = b[bEnd];
                            } else {
                                if (!map) {
                                    map = new Map;
                                    let i = bStart;
                                    for (;i < bEnd; ) map.set(b[i], i++);
                                }
                                const index = map.get(a[aStart]);
                                if (null != index) if (bStart < index && index < bEnd) {
                                    let t, i = aStart, sequence = 1;
                                    for (;++i < aEnd && i < bEnd && null != (t = map.get(a[i])) && t === index + sequence; ) sequence++;
                                    if (sequence > index - bStart) {
                                        const node = a[aStart];
                                        for (;bStart < index; ) parentNode.insertBefore(b[bStart++], node);
                                    } else parentNode.replaceChild(b[bStart++], a[aStart++]);
                                } else aStart++; else a[aStart++].remove();
                            }
                        } else aStart++, bStart++;
                    }(parent, current, array) : (current && cleanChildren(parent), appendNodes(parent, array));
                    current = array;
                } else if (value.nodeType) {
                    if (solid_sharedConfig.context && value.parentNode) return current = multi ? [ value ] : value;
                    if (Array.isArray(current)) {
                        if (multi) return current = cleanChildren(parent, current, marker, value);
                        cleanChildren(parent, current, null, value);
                    } else null != current && "" !== current && parent.firstChild ? parent.replaceChild(value, parent.firstChild) : parent.appendChild(value);
                    current = value;
                }
            }
            return current;
        }
        function normalizeIncomingArray(normalized, array, current, unwrap) {
            let dynamic = !1;
            for (let i = 0, len = array.length; i < len; i++) {
                let t, item = array[i], prev = current && current[i];
                if (null == item || !0 === item || !1 === item) ; else if ("object" == (t = typeof item) && item.nodeType) normalized.push(item); else if (Array.isArray(item)) dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic; else if ("function" === t) if (unwrap) {
                    for (;"function" == typeof item; ) item = item();
                    dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [ item ], Array.isArray(prev) ? prev : [ prev ]) || dynamic;
                } else normalized.push(item), dynamic = !0; else {
                    const value = String(item);
                    prev && 3 === prev.nodeType && prev.data === value ? normalized.push(prev) : normalized.push(document.createTextNode(value));
                }
            }
            return dynamic;
        }
        function appendNodes(parent, array, marker = null) {
            for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
        }
        function cleanChildren(parent, current, marker, replacement) {
            if (void 0 === marker) return parent.textContent = "";
            const node = replacement || document.createTextNode("");
            if (current.length) {
                let inserted = !1;
                for (let i = current.length - 1; i >= 0; i--) {
                    const el = current[i];
                    if (node !== el) {
                        const isParent = el.parentNode === parent;
                        inserted || i ? isParent && el.remove() : isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
                    } else inserted = !0;
                }
            } else parent.insertBefore(node, marker);
            return [ node ];
        }
        Symbol();
        const renderCells = new class RenderCells {
            constructor() {
                [this.areVisible, this.setVisible] = solid_createSignal(!1);
            }
            show() {
                this.hide(), this.layer = new L.LayerGroup, main.muDB.forEach(((cell, mindunits) => {
                    const cornersLL = cell.getCornerXYZ().map((c => XYZToLatLng(c)));
                    cornersLL.push(cornersLL[0]), this.layer.addLayer(new L.GeodesicPolyline(cornersLL, {
                        color: "#CCCC00"
                    }));
                    const center = L.latLng((cornersLL[0].lat + cornersLL[2].lat) / 2, (cornersLL[0].lng + cornersLL[2].lng) / 2), marker = L.marker(center, {
                        icon: L.divIcon({
                            iconSize: [ 48, 12 ],
                            html: Math.ceil(mindunits).toString()
                        }),
                        interactive: !1
                    });
                    this.layer.addLayer(marker);
                })), window.map.addLayer(this.layer), this.setVisible(!0);
            }
            hide() {
                this.layer && (window.map.removeLayer(this.layer), this.layer = void 0, this.setVisible(!1));
            }
        };
        const renderFields = new class RenderFields {
            constructor() {
                [this.areVisible, this.setVisible] = solid_createSignal(!1);
            }
            show() {
                this.hide(), this.layer = new L.LayerGroup, main.fieldLog.forEach(((latlngs, mindunits) => {
                    latlngs.push(latlngs[0]), this.layer.addLayer(new L.GeodesicPolyline(latlngs, {
                        color: "#f0CC00"
                    }));
                    const center = L.latLng((latlngs[0].lat + latlngs[2].lat) / 2, (latlngs[0].lng + latlngs[2].lng) / 2), marker = L.marker(center, {
                        icon: L.divIcon({
                            iconSize: [ 48, 12 ],
                            html: Math.ceil(mindunits).toString()
                        }),
                        interactive: !1
                    });
                    this.layer.addLayer(marker);
                })), window.map.addLayer(this.layer), this.setVisible(!0);
            }
            hide() {
                this.layer && (window.map.removeLayer(this.layer), this.layer = void 0, this.setVisible(!1));
            }
        };
        var _tmpl$ = template('<div style="border:solid 1px yellow">Known Fields: <br>Trained Cells: <br>Avg.Error: '), _tmpl$2 = template("<button>Show trained cells"), _tmpl$3 = template("<br>"), _tmpl$4 = template("<button>Show known fields"), _tmpl$5 = template("<button>Train"), _tmpl$6 = template("<hr>"), _tmpl$7 = template("<button>Export ErrorList"), _tmpl$8 = template("<button>Export FieldList"), _tmpl$9 = template("<button>Hide trained cells"), _tmpl$10 = template("<button>Hide known fields");
        const [count, setCount] = solid_createSignal(), [MUerror, setMUError] = solid_createSignal(), DBStatus = () => (main.getStatLogFieldCount().then((c => setCount(c))), 
        main.getMUError().then((c => setMUError(c))), (() => {
            var _c$, _c$2, _el$ = _tmpl$(), _el$3 = _el$.firstChild.nextSibling, _el$5 = _el$3.nextSibling.nextSibling;
            _el$5.nextSibling;
            return insert(_el$, (_c$ = solid_createMemo((() => !!count())), () => _c$() ? count() : "?"), _el$3), 
            insert(_el$, (() => main.getCellCount()), _el$5), insert(_el$, (_c$2 = solid_createMemo((() => !!MUerror())), 
            () => _c$2() ? MUerror() : "?"), null), _el$;
        })()), DebugDialogContent = () => {
            return [ createComponent(DBStatus, {}), createComponent(Show, {
                get when() {
                    return !renderCells.areVisible();
                },
                get fallback() {
                    return (_el$18 = _tmpl$9()).$$click = () => renderCells.hide(), _el$18;
                    var _el$18;
                },
                get children() {
                    var _el$7 = _tmpl$2();
                    return _el$7.$$click = () => renderCells.show(), _el$7;
                }
            }), _tmpl$3(), createComponent(Show, {
                get when() {
                    return !renderFields.areVisible();
                },
                get fallback() {
                    return (_el$19 = _tmpl$10()).$$click = () => renderFields.hide(), _el$19;
                    var _el$19;
                },
                get children() {
                    var _el$9 = _tmpl$4();
                    return _el$9.$$click = () => renderFields.show(), _el$9;
                }
            }), _tmpl$3(), (_el$11 = _tmpl$5(), _el$11.$$click = () => main.train(!0), _el$11), _tmpl$3(), _tmpl$6(), (_el$14 = _tmpl$7(), 
            _el$14.$$click = () => main.exportError(), _el$14), _tmpl$3(), (_el$16 = _tmpl$8(), 
            _el$16.$$click = () => main.exportFields(), _el$16), _tmpl$3() ];
            var _el$16, _el$14, _el$11;
        };
        class DebugDialog {
            show() {
                render((() => createComponent(DebugDialogContent, {})), window.dialog({
                    title: "Mindunits Debug Dialog",
                    html: "."
                })[0]);
            }
        }
        delegateEvents([ "click" ]);
        var icon = __webpack_require__(723), icon_default = __webpack_require__.n(icon), FileSaver_min = __webpack_require__(162);
        class CSVExport {
            constructor(lines, options) {
                this.FIELD_SEPARATOR = ",", this.filename = options.filename || "export.csv", options.name && !options.filename && this.setFileNameWithDate(options.name), 
                this.lines = lines, this.fields = options.fields || [], 0 === this.fields.length && this.lines.length > 0 && (this.fields = Object.keys(lines[0])), 
                options.optionalFields && this.removeFieldsIfUnused(options.optionalFields);
            }
            setFileNameWithDate(name) {
                const time = window.unixTimeToDateTimeString(new Date).replace(/\-/g, "_").replace(/:/g, "");
                this.filename = `${name}_${time}.csv`;
            }
            save() {
                const content = this.createContent();
                if ("undefined" != typeof android && android && android.saveFile) android.saveFile(this.filename, "text/comma-separated-values", content); else {
                    const blob = new Blob([ content ], {
                        type: "text/comma-separated-values;charset=UTF-8"
                    });
                    (0, FileSaver_min.saveAs)(blob, this.filename);
                }
            }
            createContent() {
                const head = this.fields.map((name => this.toCSVField(name))).join(this.FIELD_SEPARATOR), body = this.lines.map((data => this.line(data)));
                return body.splice(0, 0, head), body.join("\n");
            }
            line(data) {
                return this.fields.map((field => this.toCSVField(data[field]))).join(this.FIELD_SEPARATOR);
            }
            toCSVField(text) {
                if ("function" == typeof text && (text = text()), void 0 === text) return "";
                if ("number" == typeof text) return text.toString();
                if ("string" != typeof text) return "";
                let asStr = (text || "").replace(/"/g, '""');
                return (asStr.includes(",") || asStr.includes("\n") || asStr.includes("\r") || asStr.includes('"')) && (asStr = '"' + asStr + '"'), 
                asStr;
            }
            removeFieldsIfUnused(fields) {
                fields || (fields = this.fields.slice(0)), fields.forEach((field => {
                    if (this.lines.some((line => line[field]))) return;
                    const index = this.fields.indexOf(field);
                    index >= 0 && this.fields.splice(index, 1);
                }));
            }
        }
        var Main_awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : function adopt(value) {
                        return value instanceof P ? value : new P((function(resolve) {
                            resolve(value);
                        }));
                    }(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        const main = new class LogFields {
            constructor() {
                this.mustrings = new Map, this.onFieldAdd = fieldEvent => Main_awaiter(this, void 0, void 0, (function*() {
                    const mindunits = yield this.fieldLog.getFieldMUS(fieldEvent.field);
                    mindunits && this.showFieldMus(fieldEvent.field, mindunits);
                })), this.onFieldRemoved = fieldEvent => {
                    const guid = fieldEvent.field.options.guid, text = this.mustrings.get(guid);
                    text && (this.layer.removeLayer(text), this.mustrings.delete(guid));
                }, this.onMouseMove = ev => {
                    window.clearTimeout(this.mouseDelayTimer), this.mouseDelayTimer = window.setTimeout((() => this.checkForTooltip(ev)), 100), 
                    this.hideTooltip();
                };
            }
            init() {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    __webpack_require__(239), this.fieldLog = new FieldLogger, this.fieldLog.init(), 
                    this.fieldLog.onNewField = (iitcField, mindunits) => this.showFieldMus(iitcField, mindunits), 
                    window.addHook("fieldAdded", this.onFieldAdd), window.addHook("fieldRemoved", this.onFieldRemoved), 
                    this.layer = new L.LayerGroup, window.addLayerGroup("Field MUs", this.layer, !1), 
                    this.muDB = new MindunitsDB, this.hasTrained = !1, $("#toolbox").append($("<a>", {
                        text: "Mindunits",
                        click: () => {
                            this.hasTrained || this.train(), (new DebugDialog).show();
                        }
                    }));
                    const toolbarGroup = $("<div>", {
                        class: "leaflet-bar leaflet-control plugin-logfields-icon",
                        id: "logfieldbutton"
                    }).append($("<a>", {
                        class: "leaflet-bar-part"
                    }).css("background-image", icon_default()).on("click", (event => this.toggleTracking(event))));
                    $(".leaflet-top.leaflet-left", window.map.getContainer()).first().append(toolbarGroup);
                }));
            }
            getStatLogFieldCount() {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    return yield this.fieldLog.getFieldCount();
                }));
            }
            getCellCount() {
                return this.muDB.getNumberOfCells();
            }
            showFieldMus(field, mindunits) {
                const guid = field.options.guid;
                if (this.mustrings.get(guid)) return;
                const marker = L.marker(this.fieldCenter(field), {
                    icon: L.divIcon({
                        className: "plugin-logfields-numbers",
                        iconSize: [ 48, 12 ],
                        html: mindunits.toString()
                    }),
                    interactive: !1
                });
                this.mustrings.set(guid, marker), this.layer.addLayer(marker);
            }
            fieldCenter(field) {
                const p = field.options.data.points;
                return L.latLng((p[0].latE6 + p[1].latE6 + p[2].latE6) / 3 * 1e-6, (p[0].lngE6 + p[1].lngE6 + p[2].lngE6) / 3 * 1e-6);
            }
            checkForTooltip(ev) {
                const point = ev.layerPoint, fields = [], drawTools = [];
                for (var guid in window.fields) {
                    const field = window.fields[guid], positions = field._rings;
                    positions && this.pnpoly(positions[0], point) && fields.push(field);
                }
                const dt = window.plugin.drawTools && window.plugin.drawTools.drawnItems;
                dt && dt.eachLayer((layer => {
                    if (layer instanceof L.GeodesicPolygon || layer instanceof L.Polygon) {
                        const positions = layer._rings;
                        positions && this.pnpoly(positions[0], point) && drawTools.push(layer);
                    }
                })), fields.length > 0 || drawTools.length > 0 ? this.createTooltip(ev.latlng, fields, drawTools) : this.hideTooltip();
            }
            pnpoly(polygon, point) {
                for (var inside = 0, i = 0, j = polygon.length - 1; i < polygon.length; j = i++) inside ^= polygon[i].y > point.y != polygon[j].y > point.y && point.x - polygon[i].x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y);
                return !!inside;
            }
            createTooltip(pos, fields, drawTools) {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    fields = fields.sort(((a, b) => this.triangleArea(b.getLatLngs()) - this.triangleArea(a.getLatLngs())));
                    let total = 0, text = yield Promise.all(fields.map((f => Main_awaiter(this, void 0, void 0, (function*() {
                        const {text, mindunits} = yield this.getFieldMUText(f);
                        return total += mindunits, text;
                    }))))), dttotal = 0;
                    const text2 = yield Promise.all(drawTools.map((p => Main_awaiter(this, void 0, void 0, (function*() {
                        const {text, mindunits} = yield this.getDTPolygonText(p);
                        return dttotal += mindunits, text;
                    })))));
                    if (text2.length > 0 && (text = [ ...text, "DrawTools:", ...text2 ]), total > 0 && text.push(`<hr>${fields.length} Fields = ${window.digits(total)} Mu`), 
                    dttotal > 0) {
                        const sep = total > 0 ? "" : "<hr>";
                        text.push(`${sep}DrawTools = ${window.digits(dttotal)} Mu`);
                    }
                    total > 0 && dttotal > 0 && text.push(`Total ${window.digits(total + dttotal)} Mu`), 
                    text.length > 15 && text.splice(5, text.length - 15, "..."), this.showTooltip(pos, text.join("<br>"));
                }));
            }
            getFieldMUText(field) {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    const calcMU = this.muDB.calcMU(field.getLatLngs()), calcMUStr = this.resultToString(calcMU), mindunits = yield this.fieldLog.getFieldMUS(field);
                    return mindunits ? {
                        text: `${window.digits(mindunits)} Mus (${calcMUStr})`,
                        mindunits
                    } : {
                        text: calcMUStr,
                        mindunits: calcMU.mindunits
                    };
                }));
            }
            getDTPolygonText(polygon) {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    let total = {
                        mindunits: 0,
                        cells: 0,
                        missing: 0,
                        approx: 0
                    };
                    const ll = polygon.getLatLngs();
                    for (let i = 2; i < ll.length; i++) {
                        const latLngs = [ ll[0], ll[i - 1], ll[i] ], calcMU = this.muDB.calcMU(latLngs);
                        total.mindunits += calcMU.mindunits, total.cells += calcMU.cells, total.missing += calcMU.missing, 
                        total.approx += calcMU.approx;
                    }
                    return {
                        text: this.resultToString(total),
                        mindunits: total.mindunits
                    };
                }));
            }
            resultToString(result) {
                if (this.isTraining) return "(train, plz wait)";
                if (!this.hasTrained) return "(err: not trained)";
                const mu = window.digits(result.mindunits), errStr = (100 * (1 - (result.missing + result.approx) / result.cells)).toFixed();
                return 0 !== result.missing && 0 !== result.approx ? `~ ?${mu} Mu (e=${errStr}%)` : result.missing > 0 && 0 === result.approx ? `~ >${mu} Mu` : 0 === result.missing && result.approx > 0 ? `~ ~${mu} Mu` : result.missing + result.approx === result.cells ? `~ ? (${mu} Mu)` : `~${mu} Mu`;
            }
            triangleArea(p) {
                return Math.abs(.5 * ((p[1].lat - p[0].lat) * (p[2].lng - p[0].lng) - (p[2].lat - p[0].lat) * (p[1].lng - p[0].lng)));
            }
            showS2Cells(field) {
                this.clearS2Cells();
                const ll = field.getLatLngs(), cover = new S2RegionCover, region = new S2Triangle(LatLngToXYZ(ll[0]), LatLngToXYZ(ll[1]), LatLngToXYZ(ll[2])), cells = cover.getCovering(region, 11, 17);
                if (0 === cells.length) return void console.error("no S2 Cells for field?!?");
                const theCells = cells.map((s2 => {
                    const cornersLL = s2.getCornerXYZ().map((c => XYZToLatLng(c)));
                    return cornersLL.push(cornersLL[0]), new L.GeodesicPolyline(cornersLL, {});
                }));
                this.s2Cells = new L.LayerGroup(theCells), window.map.addLayer(this.s2Cells);
            }
            clearS2Cells() {
                this.s2Cells && (window.map.removeLayer(this.s2Cells), this.s2Cells = void 0);
            }
            train(force = !1) {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    this.isTraining || this.hasTrained && !force || (this.isTraining = !0, yield this.muDB.train(this.fieldLog), 
                    this.hasTrained = !0, this.isTraining = !1);
                }));
            }
            toggleTracking(event) {
                event.preventDefault(), this.trackingActive ? this.disableTracking() : this.enableTracking();
            }
            disableTracking() {
                this.trackingActive = !1, this.hideTooltip(), window.clearTimeout(this.mouseDelayTimer), 
                window.map.off("mousemove", this.onMouseMove), $("#logfieldbutton").removeClass("active");
            }
            enableTracking() {
                this.train(), this.trackingActive = !0, window.map.on("mousemove", this.onMouseMove), 
                $("#logfieldbutton").addClass("active");
            }
            showTooltip(latlng, text) {
                if (!this.tooltip) {
                    this.tooltip = $("<div>", {
                        class: "logfield-tooltip"
                    });
                    const pane = window.map.getPanes().popupPane;
                    this.tooltip.appendTo(pane);
                }
                this.tooltip.html(text);
                const point = window.map.latLngToLayerPoint(latlng);
                L.DomUtil.setPosition(this.tooltip[0], point.add(L.point(12, 0)));
            }
            hideTooltip() {
                this.tooltip && (this.tooltip.remove(), this.tooltip = void 0, this.clearS2Cells());
            }
            exportError() {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    const data = [];
                    yield this.fieldLog.forEach(((ll, mindunits) => {
                        const calc = this.muDB.calcMU(ll), diff = Math.abs(calc.mindunits - mindunits);
                        data.push({
                            mu: mindunits,
                            calculated: calc.mindunits,
                            cells: calc.cells,
                            missing: calc.missing,
                            approx: calc.approx,
                            difference: diff
                        });
                    }));
                    new CSVExport(data, {
                        name: "field_error"
                    }).save();
                }));
            }
            exportFields() {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    const data = [];
                    yield this.fieldLog.forEach(((ll, mindunits) => {
                        data.push({
                            lat1: ll[0].lat,
                            lng1: ll[0].lng,
                            lat2: ll[1].lat,
                            lng2: ll[1].lng,
                            lat3: ll[2].lat,
                            lng3: ll[2].lng,
                            mindunits
                        });
                    }));
                    new CSVExport(data, {
                        name: "fields"
                    }).save();
                }));
            }
            getMUError() {
                return Main_awaiter(this, void 0, void 0, (function*() {
                    let error = 0, count = 0;
                    return yield this.fieldLog.forEach(((ll, mindunits) => {
                        const calc = this.muDB.calcMU(ll), diff = Math.abs(calc.mindunits - mindunits);
                        error += diff, count++;
                    })), 0 === count ? 100 : Math.ceil(error / count);
                }));
            }
        };
        !function Register(plugin, name) {
            const setup = () => {
                window.plugin[name] = plugin, window.plugin[name].init();
            };
            setup.info = SCRIPT_INFO, window.bootPlugins || (window.bootPlugins = []), window.bootPlugins.push(setup), 
            window.iitcLoaded && setup();
        }(main, "LogFields");
    })();
})();
};
(function () {
  const info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script)
    info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode( '('+ wrapper +')('+JSON.stringify(info)+');'));
    document.head.appendChild(script);} 
  else wrapper(info);
})();