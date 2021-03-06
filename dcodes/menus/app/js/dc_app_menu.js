﻿/* dCodes Framework: (c) Daenu Probst, TemplateAccess */
(function (f) {
    if (!f || !(f.toJSON || Object.toJSON || window.JSON)) {
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!")
    }
    var g = {}, d = {jStorage: "{}"}, h = null, j = 0, l = f.toJSON || Object.toJSON || (window.JSON && (JSON.encode || JSON.stringify)), e = f.evalJSON || (window.JSON && (JSON.decode || JSON.parse)) || function (m) {
            return String(m).evalJSON()
        }, i = false;
    _XMLService = {
        isXML: function (n) {
            var m = (n ? n.ownerDocument || n : 0).documentElement;
            return m ? m.nodeName !== "HTML" : false
        }, encode: function (n) {
            if (!this.isXML(n)) {
                return false
            }
            try {
                return new XMLSerializer().serializeToString(n)
            } catch (m) {
                try {
                    return n.xml
                } catch (o) {
                }
            }
            return false
        }, decode: function (n) {
            var m = ("DOMParser" in window && (new DOMParser()).parseFromString) || (window.ActiveXObject && function (p) {
                    var q = new ActiveXObject("Microsoft.XMLDOM");
                    q.async = "false";
                    q.loadXML(p);
                    return q
                }), o;
            if (!m) {
                return false
            }
            o = m.call("DOMParser" in window && (new DOMParser()) || window, n, "text/xml");
            return this.isXML(o) ? o : false
        }
    };
    function k() {
        if ("localStorage" in window) {
            try {
                if (window.localStorage) {
                    d = window.localStorage;
                    i = "localStorage"
                }
            } catch (p) {
            }
        } else {
            if ("globalStorage" in window) {
                try {
                    if (window.globalStorage) {
                        d = window.globalStorage[window.location.hostname];
                        i = "globalStorage"
                    }
                } catch (o) {
                }
            } else {
                h = document.createElement("link");
                if (h.addBehavior) {
                    h.style.behavior = "url(#default#userData)";
                    document.getElementsByTagName("head")[0].appendChild(h);
                    h.load("jStorage");
                    var n = "{}";
                    try {
                        n = h.getAttribute("jStorage")
                    } catch (m) {
                    }
                    d.jStorage = n;
                    i = "userDataBehavior"
                } else {
                    h = null;
                    return
                }
            }
        }
        b()
    }

    function b() {
        if (d.jStorage) {
            try {
                g = e(String(d.jStorage))
            } catch (m) {
                d.jStorage = "{}"
            }
        } else {
            d.jStorage = "{}"
        }
        j = d.jStorage ? String(d.jStorage).length : 0
    }

    function c() {
        try {
            d.jStorage = l(g);
            if (h) {
                h.setAttribute("jStorage", d.jStorage);
                h.save("jStorage")
            }
            j = d.jStorage ? String(d.jStorage).length : 0
        } catch (m) {
        }
    }

    function a(m) {
        if (!m || (typeof m != "string" && typeof m != "number")) {
            throw new TypeError("Key name must be string or numeric")
        }
        return true
    }

    f.jStorage = {
        version: "0.1.5.0", set: function (m, n) {
            a(m);
            if (_XMLService.isXML(n)) {
                n = {_is_xml: true, xml: _XMLService.encode(n)}
            }
            g[m] = n;
            c();
            return n
        }, get: function (m, n) {
            a(m);
            if (m in g) {
                if (typeof g[m] == "object" && g[m]._is_xml && g[m]._is_xml) {
                    return _XMLService.decode(g[m].xml)
                } else {
                    return g[m]
                }
            }
            return typeof(n) == "undefined" ? null : n
        }, deleteKey: function (m) {
            a(m);
            if (m in g) {
                delete g[m];
                c();
                return true
            }
            return false
        }, flush: function () {
            g = {};
            c();
            try {
                window.localStorage.clear()
            } catch (m) {
            }
            return true
        }, storageObj: function () {
            function m() {
            }

            m.prototype = g;
            return new m()
        }, index: function () {
            var m = [], n;
            for (n in g) {
                if (g.hasOwnProperty(n)) {
                    m.push(n)
                }
            }
            return m
        }, storageSize: function () {
            return j
        }, currentBackend: function () {
            return i
        }, storageAvailable: function () {
            return !!i
        }, reInit: function () {
            var m, o;
            if (h && h.addBehavior) {
                m = document.createElement("link");
                h.parentNode.replaceChild(m, h);
                h = m;
                h.style.behavior = "url(#default#userData)";
                document.getElementsByTagName("head")[0].appendChild(h);
                h.load("jStorage");
                o = "{}";
                try {
                    o = h.getAttribute("jStorage")
                } catch (n) {
                }
                d.jStorage = o;
                i = "userDataBehavior"
            }
            b()
        }
    };
    k()
})(window.jQuery || window.$);
(function ($) {
    $.fn.memu = function (options) {
        var opts = $.extend({}, $.fn.memu.defaults, options);
        return this.each(function () {
            var original = $(this);
            original.find('a').each(function (i) {
                var a = $(this);
                if (a.children('div').length < 1 && opts.icon.inset) {
                    a.append($('<div class="memu-icon" />'));
                }
                a.addClass('memu-item-' + i);
            });
            var currentItem = $.jStorage.get('memuCurrent');
            $.jStorage.deleteKey('memuCurrent');
            $.jStorage.deleteKey('memuCurrent');
            if (currentItem != null)original.find('.' + currentItem).addClass('memu-current');
            original.find('li').each(function () {
                var li = $(this);
                if (li.children('ul').length > 0) {
                    li.addClass('has-children');
                }
            });
            original.find('a').click(function () {
                original.find('a').removeClass('memu-current');
                $(this).addClass('memu-current');
                $.jStorage.set('memuCurrent', 'memu-item-' + getLast('memu-item-', $(this)));
            });
            original.find('ul').width(opts.width);
            original.find('a').width(opts.width - 11);
            original.find('a').css('line-height', opts.height + 'px');
            original.find('li.has-children > a').css('background-position', (opts.width - 20) + 'px center');
            original.find('ul ul').css('margin-left', (opts.subMenuOffset.left + opts.width - 150) + 'px');
            original.find('ul ul').css('margin-top', opts.subMenuOffset.top + 'px');
            original.find('li > ul').css('top', (opts.height + 1) + 'px');
            original.find('ul ul').css('top', '0px');
            if (opts.icon.margin.top == null)opts.icon.margin.top = 0;
            if (opts.icon.margin.right == null)opts.icon.margin.right = 0;
            if (opts.icon.margin.bottom == null)opts.icon.margin.bottom = 0;
            if (opts.icon.margin.left == null)opts.icon.margin.left = 0;
            original.find('.memu-icon').css('margin', opts.icon.margin.top + 'px ' + opts.icon.margin.right + 'px ' + opts.icon.margin.bottom + 'px ' + opts.icon.margin.left + 'px');
            if (opts.rootWidth > 0) {
                original.find('li.memu-root > a').width(opts.rootWidth);
                original.find('li.memu-root').width(opts.rootWidth);
            }
        });
        function getLast(part, element) {
            var classes = element.attr('class').split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].indexOf(part) > -1) {
                    var parts = classes[i].split('-');
                    return parts[parts.length - 1];
                }
            }
            return null;
        };
    };
    $.fn.memu.defaults = {
        icon: {inset: false, margin: {left: 0, top: 4, right: 10, bottom: 0}},
        width: 100,
        rootWidth: 0,
        height: 22,
        subMenuOffset: {left: 0, top: 0}
    };
})(jQuery);