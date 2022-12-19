!function () {
    "use strict";
    var e = "top", t = "bottom", n = "right", r = "left", o = "auto", i = [e, t, n, r], a = "start", s = "end",
        c = "viewport", f = "popper", l = i.reduce((function (e, t) {
            return e.concat([t + "-" + a, t + "-" + s])
        }), []), d = [].concat(i, [o]).reduce((function (e, t) {
            return e.concat([t, t + "-" + a, t + "-" + s])
        }), []),
        u = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function p(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function m(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function h(e) {
        return e instanceof m(e).Element || e instanceof Element
    }

    function v(e) {
        return e instanceof m(e).HTMLElement || e instanceof HTMLElement
    }

    function w(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof m(e).ShadowRoot || e instanceof ShadowRoot)
    }

    var g = {
        name: "applyStyles", enabled: !0, phase: "write", fn: function (e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function (e) {
                var n = t.styles[e] || {}, r = t.attributes[e] || {}, o = t.elements[e];
                v(o) && p(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function (e) {
                    var t = r[e];
                    !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                })))
            }))
        }, effect: function (e) {
            var t = e.state, n = {
                popper: {position: t.options.strategy, left: "0", top: "0", margin: "0"},
                arrow: {position: "absolute"},
                reference: {}
            };
            return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function () {
                Object.keys(t.elements).forEach((function (e) {
                    var r = t.elements[e], o = t.attributes[e] || {},
                        i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function (e, t) {
                            return e[t] = "", e
                        }), {});
                    v(r) && p(r) && (Object.assign(r.style, i), Object.keys(o).forEach((function (e) {
                        r.removeAttribute(e)
                    })))
                }))
            }
        }, requires: ["computeStyles"]
    };

    function b(e) {
        return e.split("-")[0]
    }

    var y = Math.round;

    function x(e, t) {
        void 0 === t && (t = !1);
        var n = e.getBoundingClientRect(), r = 1, o = 1;
        return v(e) && t && (r = n.width / e.offsetWidth || 1, o = n.height / e.offsetHeight || 1), {
            width: y(n.width / r),
            height: y(n.height / o),
            top: y(n.top / o),
            right: y(n.right / r),
            bottom: y(n.bottom / o),
            left: y(n.left / r),
            x: y(n.left / r),
            y: y(n.top / o)
        }
    }

    function O(e) {
        var t = x(e), n = e.offsetWidth, r = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: r
        }
    }

    function E(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && w(n)) {
            var r = t;
            do {
                if (r && e.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function L(e) {
        return m(e).getComputedStyle(e)
    }

    function M(e) {
        return ["table", "td", "th"].indexOf(p(e)) >= 0
    }

    function D(e) {
        return ((h(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function j(e) {
        return "html" === p(e) ? e : e.assignedSlot || e.parentNode || (w(e) ? e.host : null) || D(e)
    }

    function k(e) {
        return v(e) && "fixed" !== L(e).position ? e.offsetParent : null
    }

    function T(e) {
        for (var t = m(e), n = k(e); n && M(n) && "static" === L(n).position;) n = k(n);
        return n && ("html" === p(n) || "body" === p(n) && "static" === L(n).position) ? t : n || function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && v(e) && "fixed" === L(e).position) return null;
            for (var n = j(e); v(n) && ["html", "body"].indexOf(p(n)) < 0;) {
                var r = L(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
                n = n.parentNode
            }
            return null
        }(e) || t
    }

    function B(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    var C = Math.max, A = Math.min, I = Math.round;

    function W(e, t, n) {
        return C(e, A(t, n))
    }

    function H(e) {
        return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, e)
    }

    function P(e, t) {
        return t.reduce((function (t, n) {
            return t[n] = e, t
        }), {})
    }

    var R = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

    function S(o) {
        var i, a = o.popper, s = o.popperRect, c = o.placement, f = o.offsets, l = o.position, d = o.gpuAcceleration,
            u = o.adaptive, p = o.roundOffsets, h = !0 === p ? function (e) {
                var t = e.x, n = e.y, r = window.devicePixelRatio || 1;
                return {x: I(I(t * r) / r) || 0, y: I(I(n * r) / r) || 0}
            }(f) : "function" == typeof p ? p(f) : f, v = h.x, w = void 0 === v ? 0 : v, g = h.y, b = void 0 === g ? 0 : g,
            y = f.hasOwnProperty("x"), x = f.hasOwnProperty("y"), O = r, E = e, M = window;
        if (u) {
            var j = T(a), k = "clientHeight", B = "clientWidth";
            j === m(a) && "static" !== L(j = D(a)).position && (k = "scrollHeight", B = "scrollWidth"), j = j, c === e && (E = t, b -= j[k] - s.height, b *= d ? 1 : -1), c === r && (O = n, w -= j[B] - s.width, w *= d ? 1 : -1)
        }
        var C, A = Object.assign({position: l}, u && R);
        return d ? Object.assign({}, A, ((C = {})[E] = x ? "0" : "", C[O] = y ? "0" : "", C.transform = (M.devicePixelRatio || 1) < 2 ? "translate(" + w + "px, " + b + "px)" : "translate3d(" + w + "px, " + b + "px, 0)", C)) : Object.assign({}, A, ((i = {})[E] = x ? b + "px" : "", i[O] = y ? w + "px" : "", i.transform = "", i))
    }

    var z = {passive: !0};
    var q = {left: "right", right: "left", bottom: "top", top: "bottom"};

    function N(e) {
        return e.replace(/left|right|bottom|top/g, (function (e) {
            return q[e]
        }))
    }

    var V = {start: "end", end: "start"};

    function _(e) {
        return e.replace(/start|end/g, (function (e) {
            return V[e]
        }))
    }

    function F(e) {
        var t = m(e);
        return {scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset}
    }

    function U(e) {
        return x(D(e)).left + F(e).scrollLeft
    }

    function X(e) {
        var t = L(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r)
    }

    function Y(e) {
        return ["html", "body", "#document"].indexOf(p(e)) >= 0 ? e.ownerDocument.body : v(e) && X(e) ? e : Y(j(e))
    }

    function $(e, t) {
        var n;
        void 0 === t && (t = []);
        var r = Y(e), o = r === (null == (n = e.ownerDocument) ? void 0 : n.body), i = m(r),
            a = o ? [i].concat(i.visualViewport || [], X(r) ? r : []) : r, s = t.concat(a);
        return o ? s : s.concat($(j(a)))
    }

    function K(e) {
        return Object.assign({}, e, {left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height})
    }

    function G(e, t) {
        return t === c ? K(function (e) {
            var t = m(e), n = D(e), r = t.visualViewport, o = n.clientWidth, i = n.clientHeight, a = 0, s = 0;
            return r && (o = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, s = r.offsetTop)), {
                width: o,
                height: i,
                x: a + U(e),
                y: s
            }
        }(e)) : v(t) ? function (e) {
            var t = x(e);
            return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t
        }(t) : K(function (e) {
            var t, n = D(e), r = F(e), o = null == (t = e.ownerDocument) ? void 0 : t.body,
                i = C(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                a = C(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
                s = -r.scrollLeft + U(e), c = -r.scrollTop;
            return "rtl" === L(o || n).direction && (s += C(n.clientWidth, o ? o.clientWidth : 0) - i), {
                width: i,
                height: a,
                x: s,
                y: c
            }
        }(D(e)))
    }

    function J(e, t, n) {
        var r = "clippingParents" === t ? function (e) {
            var t = $(j(e)), n = ["absolute", "fixed"].indexOf(L(e).position) >= 0 && v(e) ? T(e) : e;
            return h(n) ? t.filter((function (e) {
                return h(e) && E(e, n) && "body" !== p(e)
            })) : []
        }(e) : [].concat(t), o = [].concat(r, [n]), i = o[0], a = o.reduce((function (t, n) {
            var r = G(e, n);
            return t.top = C(r.top, t.top), t.right = A(r.right, t.right), t.bottom = A(r.bottom, t.bottom), t.left = C(r.left, t.left), t
        }), G(e, i));
        return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
    }

    function Q(e) {
        return e.split("-")[1]
    }

    function Z(o) {
        var i, c = o.reference, f = o.element, l = o.placement, d = l ? b(l) : null, u = l ? Q(l) : null,
            p = c.x + c.width / 2 - f.width / 2, m = c.y + c.height / 2 - f.height / 2;
        switch (d) {
            case e:
                i = {x: p, y: c.y - f.height};
                break;
            case t:
                i = {x: p, y: c.y + c.height};
                break;
            case n:
                i = {x: c.x + c.width, y: m};
                break;
            case r:
                i = {x: c.x - f.width, y: m};
                break;
            default:
                i = {x: c.x, y: c.y}
        }
        var h = d ? B(d) : null;
        if (null != h) {
            var v = "y" === h ? "height" : "width";
            switch (u) {
                case a:
                    i[h] = i[h] - (c[v] / 2 - f[v] / 2);
                    break;
                case s:
                    i[h] = i[h] + (c[v] / 2 - f[v] / 2)
            }
        }
        return i
    }

    function ee(r, o) {
        void 0 === o && (o = {});
        var a = o, s = a.placement, l = void 0 === s ? r.placement : s, d = a.boundary,
            u = void 0 === d ? "clippingParents" : d, p = a.rootBoundary, m = void 0 === p ? c : p,
            v = a.elementContext, w = void 0 === v ? f : v, g = a.altBoundary, b = void 0 !== g && g, y = a.padding,
            O = void 0 === y ? 0 : y, E = H("number" != typeof O ? O : P(O, i)), L = w === f ? "reference" : f,
            M = r.elements.reference, j = r.rects.popper, k = r.elements[b ? L : w],
            T = J(h(k) ? k : k.contextElement || D(r.elements.popper), u, m), B = x(M),
            C = Z({reference: B, element: j, strategy: "absolute", placement: l}), A = K(Object.assign({}, j, C)),
            I = w === f ? A : B, W = {
                top: T.top - I.top + E.top,
                bottom: I.bottom - T.bottom + E.bottom,
                left: T.left - I.left + E.left,
                right: I.right - T.right + E.right
            }, R = r.modifiersData.offset;
        if (w === f && R) {
            var S = R[l];
            Object.keys(W).forEach((function (r) {
                var o = [n, t].indexOf(r) >= 0 ? 1 : -1, i = [e, t].indexOf(r) >= 0 ? "y" : "x";
                W[r] += S[i] * o
            }))
        }
        return W
    }

    function te(e, t) {
        void 0 === t && (t = {});
        var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, c = n.flipVariations,
            f = n.allowedAutoPlacements, u = void 0 === f ? d : f, p = Q(r), m = p ? c ? l : l.filter((function (e) {
                return Q(e) === p
            })) : i, h = m.filter((function (e) {
                return u.indexOf(e) >= 0
            }));
        0 === h.length && (h = m);
        var v = h.reduce((function (t, n) {
            return t[n] = ee(e, {placement: n, boundary: o, rootBoundary: a, padding: s})[b(n)], t
        }), {});
        return Object.keys(v).sort((function (e, t) {
            return v[e] - v[t]
        }))
    }

    function ne(e, t, n) {
        return void 0 === n && (n = {x: 0, y: 0}), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function re(o) {
        return [e, n, t, r].some((function (e) {
            return o[e] >= 0
        }))
    }

    function oe(e, t, n) {
        void 0 === n && (n = !1);
        var r, o, i = v(t), a = v(t) && function (e) {
            var t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
            return 1 !== n || 1 !== r
        }(t), s = D(t), c = x(e, a), f = {scrollLeft: 0, scrollTop: 0}, l = {x: 0, y: 0};
        return (i || !i && !n) && (("body" !== p(t) || X(s)) && (f = (r = t) !== m(r) && v(r) ? {
            scrollLeft: (o = r).scrollLeft,
            scrollTop: o.scrollTop
        } : F(r)), v(t) ? ((l = x(t, !0)).x += t.clientLeft, l.y += t.clientTop) : s && (l.x = U(s))), {
            x: c.left + f.scrollLeft - l.x,
            y: c.top + f.scrollTop - l.y,
            width: c.width,
            height: c.height
        }
    }

    function ie(e) {
        var t = new Map, n = new Set, r = [];

        function o(e) {
            n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function (e) {
                if (!n.has(e)) {
                    var r = t.get(e);
                    r && o(r)
                }
            })), r.push(e)
        }

        return e.forEach((function (e) {
            t.set(e.name, e)
        })), e.forEach((function (e) {
            n.has(e.name) || o(e)
        })), r
    }

    var ae = {placement: "bottom", modifiers: [], strategy: "absolute"};

    function se() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function ce(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, r = void 0 === n ? [] : n, o = t.defaultOptions, i = void 0 === o ? ae : o;
        return function (e, t, n) {
            void 0 === n && (n = i);
            var o, a, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, ae, i),
                modifiersData: {},
                elements: {reference: e, popper: t},
                attributes: {},
                styles: {}
            }, c = [], f = !1, l = {
                state: s, setOptions: function (n) {
                    d(), s.options = Object.assign({}, i, s.options, n), s.scrollParents = {
                        reference: h(e) ? $(e) : e.contextElement ? $(e.contextElement) : [],
                        popper: $(t)
                    };
                    var o, a, f = function (e) {
                        var t = ie(e);
                        return u.reduce((function (e, n) {
                            return e.concat(t.filter((function (e) {
                                return e.phase === n
                            })))
                        }), [])
                    }((o = [].concat(r, s.options.modifiers), a = o.reduce((function (e, t) {
                        var n = e[t.name];
                        return e[t.name] = n ? Object.assign({}, n, t, {
                            options: Object.assign({}, n.options, t.options),
                            data: Object.assign({}, n.data, t.data)
                        }) : t, e
                    }), {}), Object.keys(a).map((function (e) {
                        return a[e]
                    }))));
                    return s.orderedModifiers = f.filter((function (e) {
                        return e.enabled
                    })), s.orderedModifiers.forEach((function (e) {
                        var t = e.name, n = e.options, r = void 0 === n ? {} : n, o = e.effect;
                        if ("function" == typeof o) {
                            var i = o({state: s, name: t, instance: l, options: r}), a = function () {
                            };
                            c.push(i || a)
                        }
                    })), l.update()
                }, forceUpdate: function () {
                    if (!f) {
                        var e = s.elements, t = e.reference, n = e.popper;
                        if (se(t, n)) {
                            s.rects = {
                                reference: oe(t, T(n), "fixed" === s.options.strategy),
                                popper: O(n)
                            }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function (e) {
                                return s.modifiersData[e.name] = Object.assign({}, e.data)
                            }));
                            for (var r = 0; r < s.orderedModifiers.length; r++) if (!0 !== s.reset) {
                                var o = s.orderedModifiers[r], i = o.fn, a = o.options, c = void 0 === a ? {} : a,
                                    d = o.name;
                                "function" == typeof i && (s = i({state: s, options: c, name: d, instance: l}) || s)
                            } else s.reset = !1, r = -1
                        }
                    }
                }, update: (o = function () {
                    return new Promise((function (e) {
                        l.forceUpdate(), e(s)
                    }))
                }, function () {
                    return a || (a = new Promise((function (e) {
                        Promise.resolve().then((function () {
                            a = void 0, e(o())
                        }))
                    }))), a
                }), destroy: function () {
                    d(), f = !0
                }
            };
            if (!se(e, t)) return l;

            function d() {
                c.forEach((function (e) {
                    return e()
                })), c = []
            }

            return l.setOptions(n).then((function (e) {
                !f && n.onFirstUpdate && n.onFirstUpdate(e)
            })), l
        }
    }

    var fe = ce({
        defaultModifiers: [{
            name: "eventListeners", enabled: !0, phase: "write", fn: function () {
            }, effect: function (e) {
                var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = void 0 === o || o, a = r.resize,
                    s = void 0 === a || a, c = m(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function (e) {
                    e.addEventListener("scroll", n.update, z)
                })), s && c.addEventListener("resize", n.update, z), function () {
                    i && f.forEach((function (e) {
                        e.removeEventListener("scroll", n.update, z)
                    })), s && c.removeEventListener("resize", n.update, z)
                }
            }, data: {}
        }, {
            name: "popperOffsets", enabled: !0, phase: "read", fn: function (e) {
                var t = e.state, n = e.name;
                t.modifiersData[n] = Z({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            }, data: {}
        }, {
            name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (e) {
                var t = e.state, n = e.options, r = n.gpuAcceleration, o = void 0 === r || r, i = n.adaptive,
                    a = void 0 === i || i, s = n.roundOffsets, c = void 0 === s || s, f = {
                        placement: b(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: o
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, S(Object.assign({}, f, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a,
                    roundOffsets: c
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, S(Object.assign({}, f, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {"data-popper-placement": t.placement})
            }, data: {}
        }, g, {
            name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (t) {
                var o = t.state, i = t.options, a = t.name, s = i.offset, c = void 0 === s ? [0, 0] : s,
                    f = d.reduce((function (t, i) {
                        return t[i] = function (t, o, i) {
                            var a = b(t), s = [r, e].indexOf(a) >= 0 ? -1 : 1,
                                c = "function" == typeof i ? i(Object.assign({}, o, {placement: t})) : i, f = c[0],
                                l = c[1];
                            return f = f || 0, l = (l || 0) * s, [r, n].indexOf(a) >= 0 ? {x: l, y: f} : {x: f, y: l}
                        }(i, o.rects, c), t
                    }), {}), l = f[o.placement], u = l.x, p = l.y;
                null != o.modifiersData.popperOffsets && (o.modifiersData.popperOffsets.x += u, o.modifiersData.popperOffsets.y += p), o.modifiersData[a] = f
            }
        }, {
            name: "flip", enabled: !0, phase: "main", fn: function (i) {
                var s = i.state, c = i.options, f = i.name;
                if (!s.modifiersData[f]._skip) {
                    for (var l = c.mainAxis, d = void 0 === l || l, u = c.altAxis, p = void 0 === u || u, m = c.fallbackPlacements, h = c.padding, v = c.boundary, w = c.rootBoundary, g = c.altBoundary, y = c.flipVariations, x = void 0 === y || y, O = c.allowedAutoPlacements, E = s.options.placement, L = b(E), M = m || (L === E || !x ? [N(E)] : function (e) {
                        if (b(e) === o) return [];
                        var t = N(e);
                        return [_(e), t, _(t)]
                    }(E)), D = [E].concat(M).reduce((function (e, t) {
                        return e.concat(b(t) === o ? te(s, {
                            placement: t,
                            boundary: v,
                            rootBoundary: w,
                            padding: h,
                            flipVariations: x,
                            allowedAutoPlacements: O
                        }) : t)
                    }), []), j = s.rects.reference, k = s.rects.popper, T = new Map, B = !0, C = D[0], A = 0; A < D.length; A++) {
                        var I = D[A], W = b(I), H = Q(I) === a, P = [e, t].indexOf(W) >= 0, R = P ? "width" : "height",
                            S = ee(s, {placement: I, boundary: v, rootBoundary: w, altBoundary: g, padding: h}),
                            z = P ? H ? n : r : H ? t : e;
                        j[R] > k[R] && (z = N(z));
                        var q = N(z), V = [];
                        if (d && V.push(S[W] <= 0), p && V.push(S[z] <= 0, S[q] <= 0), V.every((function (e) {
                            return e
                        }))) {
                            C = I, B = !1;
                            break
                        }
                        T.set(I, V)
                    }
                    if (B) for (var F = function (e) {
                        var t = D.find((function (t) {
                            var n = T.get(t);
                            if (n) return n.slice(0, e).every((function (e) {
                                return e
                            }))
                        }));
                        if (t) return C = t, "break"
                    }, U = x ? 3 : 1; U > 0; U--) {
                        if ("break" === F(U)) break
                    }
                    s.placement !== C && (s.modifiersData[f]._skip = !0, s.placement = C, s.reset = !0)
                }
            }, requiresIfExists: ["offset"], data: {_skip: !1}
        }, {
            name: "preventOverflow", enabled: !0, phase: "main", fn: function (o) {
                var i = o.state, s = o.options, c = o.name, f = s.mainAxis, l = void 0 === f || f, d = s.altAxis,
                    u = void 0 !== d && d, p = s.boundary, m = s.rootBoundary, h = s.altBoundary, v = s.padding,
                    w = s.tether, g = void 0 === w || w, y = s.tetherOffset, x = void 0 === y ? 0 : y,
                    E = ee(i, {boundary: p, rootBoundary: m, padding: v, altBoundary: h}), L = b(i.placement),
                    M = Q(i.placement), D = !M, j = B(L), k = "x" === j ? "y" : "x", I = i.modifiersData.popperOffsets,
                    H = i.rects.reference, P = i.rects.popper,
                    R = "function" == typeof x ? x(Object.assign({}, i.rects, {placement: i.placement})) : x,
                    S = {x: 0, y: 0};
                if (I) {
                    if (l || u) {
                        var z = "y" === j ? e : r, q = "y" === j ? t : n, N = "y" === j ? "height" : "width", V = I[j],
                            _ = I[j] + E[z], F = I[j] - E[q], U = g ? -P[N] / 2 : 0, X = M === a ? H[N] : P[N],
                            Y = M === a ? -P[N] : -H[N], $ = i.elements.arrow,
                            K = g && $ ? O($) : {width: 0, height: 0},
                            G = i.modifiersData["arrow#persistent"] ? i.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }, J = G[z], Z = G[q], te = W(0, H[N], K[N]),
                            ne = D ? H[N] / 2 - U - te - J - R : X - te - J - R,
                            re = D ? -H[N] / 2 + U + te + Z + R : Y + te + Z + R,
                            oe = i.elements.arrow && T(i.elements.arrow),
                            ie = oe ? "y" === j ? oe.clientTop || 0 : oe.clientLeft || 0 : 0,
                            ae = i.modifiersData.offset ? i.modifiersData.offset[i.placement][j] : 0,
                            se = I[j] + ne - ae - ie, ce = I[j] + re - ae;
                        if (l) {
                            var fe = W(g ? A(_, se) : _, V, g ? C(F, ce) : F);
                            I[j] = fe, S[j] = fe - V
                        }
                        if (u) {
                            var le = "x" === j ? e : r, de = "x" === j ? t : n, ue = I[k], pe = ue + E[le],
                                me = ue - E[de], he = W(g ? A(pe, se) : pe, ue, g ? C(me, ce) : me);
                            I[k] = he, S[k] = he - ue
                        }
                    }
                    i.modifiersData[c] = S
                }
            }, requiresIfExists: ["offset"]
        }, {
            name: "arrow", enabled: !0, phase: "main", fn: function (o) {
                var a, s = o.state, c = o.name, f = o.options, l = s.elements.arrow, d = s.modifiersData.popperOffsets,
                    u = b(s.placement), p = B(u), m = [r, n].indexOf(u) >= 0 ? "height" : "width";
                if (l && d) {
                    var h = function (e, t) {
                            return H("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {placement: t.placement})) : e) ? e : P(e, i))
                        }(f.padding, s), v = O(l), w = "y" === p ? e : r, g = "y" === p ? t : n,
                        y = s.rects.reference[m] + s.rects.reference[p] - d[p] - s.rects.popper[m],
                        x = d[p] - s.rects.reference[p], E = T(l),
                        L = E ? "y" === p ? E.clientHeight || 0 : E.clientWidth || 0 : 0, M = y / 2 - x / 2, D = h[w],
                        j = L - v[m] - h[g], k = L / 2 - v[m] / 2 + M, C = W(D, k, j), A = p;
                    s.modifiersData[c] = ((a = {})[A] = C, a.centerOffset = C - k, a)
                }
            }, effect: function (e) {
                var t = e.state, n = e.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
                null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && E(t.elements.popper, r) && (t.elements.arrow = r)
            }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
        }, {
            name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (e) {
                var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper,
                    i = t.modifiersData.preventOverflow, a = ee(t, {elementContext: "reference"}),
                    s = ee(t, {altBoundary: !0}), c = ne(a, r), f = ne(s, o, i), l = re(c), d = re(f);
                t.modifiersData[n] = {
                    referenceClippingOffsets: c,
                    popperEscapeOffsets: f,
                    isReferenceHidden: l,
                    hasPopperEscaped: d
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": l,
                    "data-popper-escaped": d
                })
            }
        }]
    });
    if (window.isFirefox = "undefined" != typeof InstallTrigger, !window.browser && !window.INTAB_DEMO_MODE && window.isFirefox) try {
        browser && (window.browser = browser)
    } catch (e) {
    }
    let le, de;
    const ue = e => {
        document.querySelectorAll("[intabEditVisuallyTarget]").forEach((t => {
            !e && t.removeAttribute("intabEditVisuallyTarget"), t.attributeStyleMap ? t.attributeStyleMap.delete("outline") : t.style.outline = ""
        })), window.InTabRigtClickContextMenuinstance && window.InTabRigtClickContextMenuinstance.destroy();
        const t = document.getElementById("intab-context-menu");
        t && t.remove()
    }, pe = e => ue(!1), me = e => {
        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault()
    }, he = () => {
        try {
            le && (le.removeEventListener("click", pe), le.removeEventListener("blur", pe)), document.removeEventListener("click", pe), window.removeEventListener("blur", pe), window.removeEventListener("scroll", pe), window.removeEventListener("mousewheel", pe), window.removeEventListener("wheel", pe)
        } catch (e) {
            console.warn(e)
        }
    }, ve = e => {
        if (window.InTabDocument) e.preventDefault(); else {
            if (e.target && e.target.classList.contains("intab-context-menu")) return void pe();
            le = e.target, ue(), le.style.outline = "1px solid rgba(255, 0, 0, 0.5)", le.setAttribute("intabEditVisuallyTarget", !0), window.InTab_Context_Menu_Target = le, document.body.appendChild(de), we(e), document.getElementById("intab-context-menu-edit-css").addEventListener("click", (e => {
                me(e), he(), ue(!0);
                try {
                    window.browser.runtime && window.browser.runtime.sendMessage({rightClickEditWithInTab: !0})
                } catch (e) {
                    console.warn(e)
                }
            })), document.getElementById("intab-context-menu-scan-css").addEventListener("click", (e => {
                me(e), he(), ue(!0);
                try {
                    window.browser.runtime && window.browser.runtime.sendMessage({rightClickInspectWithInTab: !0})
                } catch (e) {
                    console.warn(e)
                }
            })), le.addEventListener("click", pe), le.addEventListener("blur", pe)
        }
    }, we = e => {
        if (le && de && fe) {
            const t = e.y || e.offsetY || e.clientY, n = e.x || e.offsetX || e.clientX, r = {
                getBoundingClientRect: (() => () => ({
                    top: t,
                    right: n,
                    bottom: t,
                    left: n,
                    height: 0,
                    width: 0
                }))(), contextElement: document.body
            };
            let o = 95, i = -35;
            const a = window.innerHeight / 2, s = window.innerWidth;
            n < 200 && t > a ? o = 425 : n > s - 325 && (t > a || t < 50) ? o = -(100 + Math.abs(n - (s - 325))) : t < 50 ? o = 425 : t > a && (o = -100), window.InTabRigtClickContextMenuinstance = fe(r, de, {
                modifiers: [{
                    name: "preventOverflow",
                    options: {altAxis: !0, altBoundary: !0, padding: 20}
                }, {name: "offset", options: {offset: [o, i]}}]
            })
        }
    };
    (() => {
        de = document.createElement("section"), de.setAttribute("id", "intab-context-menu"), de.oncontextmenu = "return false;", de.style = 'display: flex; \n                            cursor: pointer;\n                            user-select: none;\n                            align-items: center;\n                               font-family: "Intab", sans-serif;\n                            font-size: 11px;\n                            color: white; \n                            font-weight: normal;\n                            padding: 0;\n                            margin: 0;\n                            max-width: 283px;\n                            z-index: 9999999999999999999999999999999999999999999999999';
        const e = "\n                 font-family: sans-serif;\n                 font-weight: normal;\n                 height: 25px;\n                 font-size: 11px;\n                 overflow: hidden;\n                 text-align: center;\n                 border-radius: 5px;\n                 color: white;\n                 box-shadow: 0 0 10px rgba(0,0,0,0.2);\n                 background: rgba(0,0,0,0.75);\n                 border-radius: 3px;\n                 width: 90px;\n                 display: flex;\n                 align-items: center;\n                 padding: 0;\n                 cursor: pointer;".trim(),
            t = `\n    <div id="intab-context-menu-edit-css"  style="${e}" oncontextmenu="return false" class="intab-context-menu" >\n<svg fill="white" style="margin: 0 5px; min-width: 20px;" oncontextmenu="return false" class="intab-context-menu" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="none" d="M16.589 9L15.003 7.414 5.906 16.511 5.377 18.625 7.491 18.097z"/><path transform="rotate(134.999 18.003 6)" fill="none" d="M16.882 4.879H19.125V7.122H16.882z"/><path d="M4.003,21c0.081,0,0.162-0.01,0.242-0.03l4-1c0.176-0.044,0.337-0.135,0.465-0.263L21.003,7.414 c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414L19.417,3c-0.756-0.756-2.072-0.756-2.828,0L4.296,15.293 c-0.128,0.128-0.219,0.289-0.263,0.464l-1,4c-0.086,0.341,0.015,0.701,0.263,0.95C3.485,20.897,3.741,21,4.003,21z M18.003,4.414 L19.589,6l-1.586,1.586L16.417,6L18.003,4.414z M5.906,16.511l9.097-9.097L16.589,9l-9.098,9.097l-2.114,0.528L5.906,16.511z"/></svg>\n        \n            <span oncontextmenu="return false" class="intab-context-menu" style="color:white;width: calc(100% - 40px);">Edit</span>\n    </div>\n    \n    <div id="intab-context-menu-scan-css" style="${e + "margin-left: 5px;"}" oncontextmenu="return false" class="intab-context-menu" >\n<svg fill="white" style="margin: 0 5px; min-width: 20px;" oncontextmenu="return false" class="intab-context-menu" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"/></svg>\n            <span oncontextmenu="return false" class="intab-context-menu" style="color:white;width: calc(100% - 40px);">Inspect</span>\n    </div>\n    \n\n\n`;
        de.innerHTML = t
    })(), document.addEventListener("contextmenu", ve), document.addEventListener("click", pe), window.addEventListener("blur", pe), window.addEventListener("scroll", pe), window.addEventListener("mousewheel", pe), window.addEventListener("wheel", pe), window.addEventListener("keypress", pe);
    let ge = !1;
    (async () => {
        if ("https://intab.io/license/" === window.location.href && window.browser && window.browser.storage && window.browser.storage.local) {
            const e = await window.browser.storage.local.get(["deviceID"]);
            let t = e && e.deviceID ? e.deviceID : "";
            if (t = t.substring(t.indexOf("_") + 1), t && t.length) {
                MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
                new MutationObserver(((e, n) => {
                    ge || document.querySelectorAll(".device-id").forEach((e => {
                        ge = !0, e.innerHTML.toString().replace("id: ", "") === t && e.parentNode && e.parentNode.classList.add("active")
                    }))
                })).observe(document, {subtree: !0, attributes: !0})
            }
        }
    })()
}();
