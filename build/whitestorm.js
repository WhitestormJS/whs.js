/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

'use strict';

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function Events(n) {
    var t = {},
        f = [];
    n = n || this, n.on = function(n, f, i) {
        (t[n] = t[n] || []).push([f, i]);
    }, n.off = function(n, i) {
        n || (t = {});
        for (var o = t[n] || f, c = o.length = i ? o.length : 0; c--;) {
            i == o[c][0] && o.splice(c, 1);
        }
    }, n.emit = function(n) {
        for (var i, o = t[n] || f, c = 0; i = o[c++];) {
            i[0].apply(i[1], f.slice.call(arguments, 1));
        }
    };
}
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function(object, domElement) {

    this.object = object;
    this.domElement = domElement !== undefined ? domElement : document;

    // WHS.API

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the control orbits around
    // and where it pans with respect to.
    this.target = new THREE.Vector3();
    // center is old, deprecated; use "target" instead
    this.center = this.target;

    // This option actually enables dollying in and out; left as "zoom" for
    // backwards compatibility
    this.noZoom = false;
    this.zoomSpeed = 1.0;
    // Limits to how far you can dolly in and out
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // Set to true to disable this control
    this.noRotate = false;
    this.rotateSpeed = 1.0;

    // Set to true to disable this control
    this.noPan = false;
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Set to true to disable use of the keys
    this.noKeys = false;
    // The four arrow keys
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };

    ////////////
    // internals

    var scope = this;

    var EPS = 0.000001;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();

    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();

    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var pan = new THREE.Vector3();

    var lastPosition = new THREE.Vector3();

    var STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
    };
    var state = STATE.NONE;

    // events

    var changeEvent = {
        type: 'change'
    };

    this.rotateLeft = function(angle) {

        if (angle === undefined) {

            angle = getAutoRotationAngle();
        }

        thetaDelta -= angle;
    };

    this.rotateUp = function(angle) {

        if (angle === undefined) {

            angle = getAutoRotationAngle();
        }

        phiDelta -= angle;
    };

    // pass in distance in world space to move left
    this.panLeft = function(distance) {

        var panOffset = new THREE.Vector3();
        var te = this.object.matrix.elements;
        // get X column of matrix
        panOffset.set(te[0], te[1], te[2]);
        panOffset.multiplyScalar(-distance);

        pan.add(panOffset);
    };

    // pass in distance in world space to move up
    this.panUp = function(distance) {

        var panOffset = new THREE.Vector3();
        var te = this.object.matrix.elements;
        // get Y column of matrix
        panOffset.set(te[4], te[5], te[6]);
        panOffset.multiplyScalar(distance);

        pan.add(panOffset);
    };

    // main entry point; pass in Vector2 of change desired in pixel space,
    // right and down are positive
    this.pan = function(delta) {

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (scope.object.fov !== undefined) {

            // perspective
            var position = scope.object.position;
            var offset = position.clone().sub(scope.target);
            var targetDistance = offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);
            // we actually don't use screenWidth, since perspective camera is fixed to screen height
            scope.panLeft(2 * delta.x * targetDistance / element.clientHeight);
            scope.panUp(2 * delta.y * targetDistance / element.clientHeight);
        } else if (scope.object.top !== undefined) {

            // orthographic
            scope.panLeft(delta.x * (scope.object.right - scope.object.left) / element.clientWidth);
            scope.panUp(delta.y * (scope.object.top - scope.object.bottom) / element.clientHeight);
        } else {

            // camera neither orthographic or perspective - warn user
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
        }
    };

    this.dollyIn = function(dollyScale) {

        if (dollyScale === undefined) {

            dollyScale = getZoomScale();
        }

        scale /= dollyScale;
    };

    this.dollyOut = function(dollyScale) {

        if (dollyScale === undefined) {

            dollyScale = getZoomScale();
        }

        scale *= dollyScale;
    };

    this.update = function() {

        var position = this.object.position;
        var offset = position.clone().sub(this.target);

        // angle from z-axis around y-axis

        var theta = Math.atan2(offset.x, offset.z);

        // angle from y-axis

        var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

        if (this.autoRotate) {

            this.rotateLeft(getAutoRotationAngle());
        }

        theta += thetaDelta;
        phi += phiDelta;

        // restrict phi to be between desired limits
        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

        // restrict phi to be betwee EPS and PI-EPS
        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

        var radius = offset.length() * scale;

        // restrict radius to be between desired limits
        radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

        // move target to panned location
        this.target.add(pan);

        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);

        position.copy(this.target).add(offset);

        this.object.lookAt(this.target);

        thetaDelta = 0;
        phiDelta = 0;
        scale = 1;
        pan.set(0, 0, 0);

        if (lastPosition.distanceTo(this.object.position) > 0) {

            this.dispatchEvent(changeEvent);

            lastPosition.copy(this.object.position);
        }
    };

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }

    function getZoomScale() {

        return Math.pow(0.95, scope.zoomSpeed);
    }

    function onMouseDown(event) {

        if (scope.enabled === false) {
            return;
        }
        event.preventDefault();

        if (event.button === 0) {
            if (scope.noRotate === true) {
                return;
            }

            state = STATE.ROTATE;

            rotateStart.set(event.clientX, event.clientY);
        } else if (event.button === 1) {
            if (scope.noZoom === true) {
                return;
            }

            state = STATE.DOLLY;

            dollyStart.set(event.clientX, event.clientY);
        } else if (event.button === 2) {
            if (scope.noPan === true) {
                return;
            }

            state = STATE.PAN;

            panStart.set(event.clientX, event.clientY);
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.domElement.addEventListener('mousemove', onMouseMove, false);
        scope.domElement.addEventListener('mouseup', onMouseUp, false);
    }

    function onMouseMove(event) {

        if (scope.enabled === false) return;

        event.preventDefault();

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (state === STATE.ROTATE) {

            if (scope.noRotate === true) return;

            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart);

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

            rotateStart.copy(rotateEnd);
        } else if (state === STATE.DOLLY) {

            if (scope.noZoom === true) return;

            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);

            if (dollyDelta.y > 0) {

                scope.dollyIn();
            } else {

                scope.dollyOut();
            }

            dollyStart.copy(dollyEnd);
        } else if (state === STATE.PAN) {

            if (scope.noPan === true) return;

            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart);

            scope.pan(panDelta);

            panStart.copy(panEnd);
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.update();
    }

    function onMouseUp() /* event */ {

        if (scope.enabled === false) return;

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.domElement.removeEventListener('mousemove', onMouseMove, false);
        scope.domElement.removeEventListener('mouseup', onMouseUp, false);

        state = STATE.NONE;
    }

    function onMouseWheel(event) {

        if (scope.enabled === false || scope.noZoom === true) return;

        var delta = 0;

        if (event.wheelDelta) {
            // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;
        } else if (event.detail) {
            // Firefox

            delta = -event.detail;
        }

        if (delta > 0) {

            scope.dollyOut();
        } else {

            scope.dollyIn();
        }
    }

    function onKeyDown(event) {

        if (scope.enabled === false) {
            return;
        }
        if (scope.noKeys === true) {
            return;
        }
        if (scope.noPan === true) {
            return;
        }

        // pan a pixel - I guess for precise positioning?
        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        var needUpdate = false;

        switch (event.keyCode) {

            case scope.keys.UP:
                scope.pan(new THREE.Vector2(0, scope.keyPanSpeed));
                needUpdate = true;
                break;
            case scope.keys.BOTTOM:
                scope.pan(new THREE.Vector2(0, -scope.keyPanSpeed));
                needUpdate = true;
                break;
            case scope.keys.LEFT:
                scope.pan(new THREE.Vector2(scope.keyPanSpeed, 0));
                needUpdate = true;
                break;
            case scope.keys.RIGHT:
                scope.pan(new THREE.Vector2(-scope.keyPanSpeed, 0));
                needUpdate = true;
                break;
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        if (needUpdate) {

            scope.update();
        }
    }

    function touchstart(event) {

        if (scope.enabled === false) {
            return;
        }

        switch (event.touches.length) {

            case 1:
                // one-fingered touch: rotate
                if (scope.noRotate === true) {
                    return;
                }

                state = STATE.TOUCH_ROTATE;

                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;

            case 2:
                // two-fingered touch: dolly
                if (scope.noZoom === true) {
                    return;
                }

                state = STATE.TOUCH_DOLLY;

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;

            case 3:
                // three-fingered touch: pan
                if (scope.noPan === true) {
                    return;
                }

                state = STATE.TOUCH_PAN;

                panStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;

            default:
                state = STATE.NONE;

        }
    }

    function touchmove(event) {

        if (scope.enabled === false) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        switch (event.touches.length) {

            case 1:
                // one-fingered touch: rotate
                if (scope.noRotate === true) {
                    return;
                }
                if (state !== STATE.TOUCH_ROTATE) {
                    return;
                }

                rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                rotateDelta.subVectors(rotateEnd, rotateStart);

                // rotating across whole screen goes 360 degrees around
                scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
                // rotating up and down along whole screen attempts to go 360, but limited to 180
                scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

                rotateStart.copy(rotateEnd);
                break;

            case 2:
                // two-fingered touch: dolly
                if (scope.noZoom === true) {
                    return;
                }
                if (state !== STATE.TOUCH_DOLLY) {
                    return;
                }

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);

                dollyEnd.set(0, distance);
                dollyDelta.subVectors(dollyEnd, dollyStart);

                if (dollyDelta.y > 0) {

                    scope.dollyOut();
                } else {

                    scope.dollyIn();
                }

                dollyStart.copy(dollyEnd);
                break;

            case 3:
                // three-fingered touch: pan
                if (scope.noPan === true) {
                    return;
                }
                if (state !== STATE.TOUCH_PAN) {
                    return;
                }

                panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                panDelta.subVectors(panEnd, panStart);

                scope.pan(panDelta);

                panStart.copy(panEnd);
                break;

            default:
                state = STATE.NONE;

        }
    }

    function touchend() /* event */ {

        if (scope.enabled === false) {
            return;
        }

        state = STATE.NONE;
    }

    this.domElement.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    }, false);
    this.domElement.addEventListener('mousedown', onMouseDown, false);
    this.domElement.addEventListener('mousewheel', onMouseWheel, false);
    this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox

    this.domElement.addEventListener('keydown', onKeyDown, false);

    this.domElement.addEventListener('touchstart', touchstart, false);
    this.domElement.addEventListener('touchend', touchend, false);
    this.domElement.addEventListener('touchmove', touchmove, false);
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);

// stats.js - http://github.com/mrdoob/stats.js
var Stats = function Stats() {
    function f(a, e, b) {
        a = document.createElement(a);
        a.id = e;
        a.style.cssText = b;
        return a;
    }

    function l(a, e, b) {
        var c = f("div", a, "padding:0 0 3px 3px;text-align:left;background:" + b),
            d = f("div", a + "Text", "font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:" + e);
        d.innerHTML = a.toUpperCase();
        c.appendChild(d);
        a = f("div", a + "Graph", "width:74px;height:30px;background:" + e);
        c.appendChild(a);
        for (e = 0; 74 > e; e++) {
            a.appendChild(f("span", "", "width:1px;height:30px;float:left;opacity:0.9;background:" + b));
        }
        return c;
    }

    function m(a) {
        for (var b = c.children, d = 0; d < b.length; d++) {
            b[d].style.display = d === a ? "block" : "none";
        }
        n = a;
    }

    function p(a, b) {
        a.appendChild(a.firstChild).style.height = Math.min(30, 30 - 30 * b) + "px";
    }
    var q = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now,
        k = q(),
        r = k,
        t = 0,
        n = 0,
        c = f("div", "stats", "width:80px;opacity:0.9;cursor:pointer");
    c.addEventListener("mousedown", function(a) {
        a.preventDefault();
        m(++n % c.children.length);
    }, !1);
    var d = 0,
        u = Infinity,
        v = 0,
        b = l("fps", "#0ff", "#002"),
        A = b.children[0],
        B = b.children[1];
    c.appendChild(b);
    var g = 0,
        w = Infinity,
        x = 0,
        b = l("ms", "#0f0", "#020"),
        C = b.children[0],
        D = b.children[1];
    c.appendChild(b);
    if (self.performance && self.performance.memory) {
        var h = 0,
            y = Infinity,
            z = 0,
            b = l("mb", "#f08", "#201"),
            E = b.children[0],
            F = b.children[1];
        c.appendChild(b);
    }
    m(n);
    return {
        REVISION: 14,
        domElement: c,
        setMode: m,
        begin: function begin() {
            k = q();
        },
        end: function end() {
            var a = q();
            g = a - k;
            w = Math.min(w, g);
            x = Math.max(x, g);
            C.textContent = (g | 0) + " MS (" + (w | 0) + "-" + (x | 0) + ")";
            p(D, g / 200);
            t++;
            if (a > r + 1E3 && (d = Math.round(1E3 * t / (a - r)), u = Math.min(u, d), v = Math.max(v, d), A.textContent = d + " FPS (" + u + "-" + v + ")", p(B, d / 100), r = a, t = 0, void 0 !== h)) {
                var b = performance.memory.usedJSHeapSize,
                    c = performance.memory.jsHeapSizeLimit;
                h = Math.round(9.54E-7 * b);
                y = Math.min(y, h);
                z = Math.max(z, h);
                E.textContent = h + " MB (" + y + "-" + z + ")";
                p(F, b / c);
            }
            return a;
        },
        update: function update() {
            k = this.end();
        }
    };
};
"object" === (typeof module === 'undefined' ? 'undefined' : _typeof(module)) && (module.exports = Stats);

/*
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	Subdivision Geometry Modifier
 *		using Loop Subdivision Scheme
 *
 *	References:
 *		http://graphics.stanford.edu/~mdfisher/subdivision.html
 *		http://www.holmes3d.net/graphics/subdivision/
 *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
 *
 *	Known Issues:
 *		- currently doesn't handle UVs
 *		- currently doesn't handle "Sharp Edges"
 *
 */

THREE.SubdivisionModifier = function(subdivisions) {
    'use strict';

    this.subdivisions = subdivisions === undefined ? 1 : subdivisions;
};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function(geometry) {

    var repeats = this.subdivisions;

    while (repeats-- > 0) {

        this.smooth(geometry);
    }

    delete geometry.__tmpVertices;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
};

(function() {

    // Some constants
    var WARNINGS = !true; // Set to true for development
    var ABC = ['a', 'b', 'c'];

    function getEdge(a, b, map) {

        var vertexIndexA = Math.min(a, b);
        var vertexIndexB = Math.max(a, b);

        var key = vertexIndexA + "_" + vertexIndexB;

        return map[key];
    }

    function processEdge(a, b, vertices, map, face, metaVertices) {

        var vertexIndexA = Math.min(a, b);
        var vertexIndexB = Math.max(a, b);

        var key = vertexIndexA + "_" + vertexIndexB;

        var edge;

        if (key in map) {

            edge = map[key];
        } else {

            var vertexA = vertices[vertexIndexA];
            var vertexB = vertices[vertexIndexB];

            edge = {

                a: vertexA, // pointer reference
                b: vertexB,
                newEdge: null,
                // aIndex: a, // numbered reference
                // bIndex: b,
                faces: [] // pointers to face

            };

            map[key] = edge;
        }

        edge.faces.push(face);

        metaVertices[a].edges.push(edge);
        metaVertices[b].edges.push(edge);
    }

    function generateLookups(vertices, faces, metaVertices, edges) {

        var i, il, face, edge;

        for (i = 0, il = vertices.length; i < il; i++) {

            metaVertices[i] = {
                edges: []
            };
        }

        for (i = 0, il = faces.length; i < il; i++) {

            face = faces[i];

            processEdge(face.a, face.b, vertices, edges, face, metaVertices);
            processEdge(face.b, face.c, vertices, edges, face, metaVertices);
            processEdge(face.c, face.a, vertices, edges, face, metaVertices);
        }
    }

    function newFace(newFaces, a, b, c) {

        newFaces.push(new THREE.Face3(a, b, c));
    }

    /////////////////////////////

    // Performs one iteration of Subdivision
    THREE.SubdivisionModifier.prototype.smooth = function(geometry) {

        var tmp = new THREE.Vector3();

        var oldVertices, oldFaces;
        var newVertices, newFaces; // newUVs = [];

        var n, l, i, il, j, k;
        var metaVertices, sourceEdges;

        // new stuff.
        var sourceEdges, newEdgeVertices, newSourceVertices;

        oldVertices = geometry.vertices; // { x, y, z}
        oldFaces = geometry.faces; // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }

        /******************************************************
         *
         * Step 0: Preprocess Geometry to Generate edges Lookup
         *
         *******************************************************/

        metaVertices = new Array(oldVertices.length);
        sourceEdges = {}; // Edge => { oldVertex1, oldVertex2, faces[]  }

        generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges);

        /******************************************************
         *
         *	Step 1.
         *	For each edge, create a new Edge Vertex,
         *	then position it.
         *
         *******************************************************/

        newEdgeVertices = [];
        var other, currentEdge, newEdge, face;
        var edgeVertexWeight, adjacentVertexWeight, connectedFaces;

        for (i in sourceEdges) {

            currentEdge = sourceEdges[i];
            newEdge = new THREE.Vector3();

            edgeVertexWeight = 3 / 8;
            adjacentVertexWeight = 1 / 8;

            connectedFaces = currentEdge.faces.length;

            // check how many linked faces. 2 should be correct.
            if (connectedFaces != 2) {

                // if length is not 2, handle condition
                edgeVertexWeight = 0.5;
                adjacentVertexWeight = 0;

                if (connectedFaces != 1) {

                    if (WARNINGS) console.warn('Subdivision Modifier: Number of connected faces != 2, is: ', connectedFaces, currentEdge);
                }
            }

            newEdge.addVectors(currentEdge.a, currentEdge.b).multiplyScalar(edgeVertexWeight);

            tmp.set(0, 0, 0);

            for (j = 0; j < connectedFaces; j++) {

                face = currentEdge.faces[j];

                for (k = 0; k < 3; k++) {

                    other = oldVertices[face[ABC[k]]];
                    if (other !== currentEdge.a && other !== currentEdge.b) break;
                }

                tmp.add(other);
            }

            tmp.multiplyScalar(adjacentVertexWeight);
            newEdge.add(tmp);

            currentEdge.newEdge = newEdgeVertices.length;
            newEdgeVertices.push(newEdge);

            // console.log(currentEdge, newEdge);
        }

        /******************************************************
         *
         *	Step 2.
         *	Reposition each source vertices.
         *
         *******************************************************/

        var beta, sourceVertexWeight, connectingVertexWeight;
        var connectingEdge, connectingEdges, oldVertex, newSourceVertex;
        newSourceVertices = [];

        for (i = 0, il = oldVertices.length; i < il; i++) {

            oldVertex = oldVertices[i];

            // find all connecting edges (using lookupTable)
            connectingEdges = metaVertices[i].edges;
            n = connectingEdges.length;
            beta;

            if (n == 3) {

                beta = 3 / 16;
            } else if (n > 3) {

                beta = 3 / (8 * n); // Warren's modified formula
            }

            // Loop's original beta formula
            // beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );

            sourceVertexWeight = 1 - n * beta;
            connectingVertexWeight = beta;

            if (n <= 2) {

                // crease and boundary rules
                // console.warn('crease and boundary rules');

                if (n == 2) {

                    if (WARNINGS) console.warn('2 connecting edges', connectingEdges);
                    sourceVertexWeight = 3 / 4;
                    connectingVertexWeight = 1 / 8;

                    // sourceVertexWeight = 1;
                    // connectingVertexWeight = 0;
                } else if (n == 1) {

                    if (WARNINGS) console.warn('only 1 connecting edge');
                } else if (n == 0) {

                    if (WARNINGS) console.warn('0 connecting edges');
                }
            }

            newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight);

            tmp.set(0, 0, 0);

            for (j = 0; j < n; j++) {

                connectingEdge = connectingEdges[j];
                other = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
                tmp.add(other);
            }

            tmp.multiplyScalar(connectingVertexWeight);
            newSourceVertex.add(tmp);

            newSourceVertices.push(newSourceVertex);
        }

        /******************************************************
         *
         *	Step 3.
         *	Generate Faces between source vertecies
         *	and edge vertices.
         *
         *******************************************************/

        newVertices = newSourceVertices.concat(newEdgeVertices);
        var sl = newSourceVertices.length,
            edge1,
            edge2,
            edge3;
        newFaces = [];

        for (i = 0, il = oldFaces.length; i < il; i++) {

            face = oldFaces[i];

            // find the 3 new edges vertex of each old face

            edge1 = getEdge(face.a, face.b, sourceEdges).newEdge + sl;
            edge2 = getEdge(face.b, face.c, sourceEdges).newEdge + sl;
            edge3 = getEdge(face.c, face.a, sourceEdges).newEdge + sl;

            // create 4 faces.

            newFace(newFaces, edge1, edge2, edge3);
            newFace(newFaces, face.a, edge1, edge3);
            newFace(newFaces, face.b, edge2, edge1);
            newFace(newFaces, face.c, edge3, edge2);
        }

        // Overwrite old arrays
        geometry.vertices = newVertices;
        geometry.faces = newFaces;

        // console.log('done');
    };
})();

/* ================ MODERNIZING BROWSER WHS.API IF NOT EXIST ==================== */

//Replacing jQuery fadeIn and fadeOut
function addCSSRule(sheet, selector, rules, index) {

    if (sheet.insertRule) sheet.insertRule(selector + '{' + rules + '}', index);
    else if (sheet.addRule) sheet.addRule(selector, rules, index);
}

//Adds CSS style sheets
addCSSRule(document.styleSheets[0], '@keyframes fadeOut', 'to {opacity: 0}', 0);

addCSSRule(document.styleSheets[0], '@keyframes fadeIn', 'from {opacity: 0} to {opacity: 1}', 0);

//Adds function to triggers animation
Element.prototype.fadeOut = function(t) {

    this.style.webkitAnimationDuration = (t || 1) + 's';
    this.style.webkitAnimationName = "fadeOut";
    this.style.webkitAnimationPlayState = 'running';

    this.addEventListener('animationend', function() {
        this.style.display = 'none';
        this.style.webkitAnimationPlayState = 'paused';
    });
};

Element.prototype.fadeIn = function(t, display) {

    this.style.display = display || 'block';

    this.style.webkitAnimationDuration = (t || 1) + 's';
    this.style.webkitAnimationName = "fadeIn";
    this.style.webkitAnimationPlayState = 'running';

    this.addEventListener('animationend', function() {
        this.style.display = display || 'block';
    });
};

// Array.isArray;
if (typeof Array.isArray === 'undefined') {

    Array.isArray = function(obj) {

        'use strict';

        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

// event.movementX and event.movementY kind of polyfill
(function() {

    if (!MouseEvent.prototype.hasOwnProperty('movementX') || !MouseEvent.prototype.hasOwnProperty('mozMovementX')) {
        //Checks for support

        // If movementX and ... are not supported, an object Mouse is added to the WHS
        // that contains information about last coords of the mouse.
        var mouse = {
            lastX: 0,
            lastY: 0
        };

        MouseEvent.prototype.getMovementX = function() {
            'use strict';

            var value = this.clientX - mouse.lastX;
            mouse.lastX = this.clientX;

            return value;
        };

        MouseEvent.prototype.getMovementY = function() {
            'use strict';

            var value = this.clientY - mouse.lastY;
            mouse.lastY = this.clientY;

            return value;
        };
    }
})();

// Object.assign|es6+;
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target) {
            'use strict';

            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

// [x]#TODO:130 RESTRUCTURIZE.
// [x]#TODO:120 RESTRUCTURIZE threejs and cannonjs library calling.
// [x]#DONE:30 Add stats.
// #TODO:10 Add http://underscorejs.org/.
// DONE:20 clean all console.logs.
// DOING:0 Wagner.base.js is not a part of library.
// FIXME: Fix fog.
// DOING:10 improve libraries support.

/* ================ WHITESTORM|JS ==================== */
var WHS = {
    REVISION: "r8",

    loader: {
        JSON: new THREE.JSONLoader(),
        Texture: new THREE.TextureLoader(),
        Font: new THREE.FontLoader()
    },

    API: {},

    _settings: {

        assets: "./assets",

        path_worker: '../libs/physijs_worker.js',
        path_ammo: '../libs/ammo.js'

    },

    debug: false,

    loops: []
};

console.log('WhitestormJS', WHS.REVISION);

WHS.API.loadJSON = function(url, callback, texturePath) {
    return WHS.loader.JSON.load(url, callback, texturePath);
};

WHS.API.loadTexture = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Texture.load(url, onLoad, onProgress, onError);
};

WHS.API.loadFont = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Font.load(url, onLoad, onProgress, onError);
};

if (typeof define === 'function' && define.amd) {

    define('whitestorm', WHS);
} else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {

    module.exports = WHS;
}

/* Global WhitestormJS (WHS) object class */
WHS.Object = function() {
    /**
     * Constructing WHS.Shape object.
     * 
     * @param {Boolean} structurable - true if object has parents and children.
     * @param {String} type - Shape type.
     * @return {WHS.Object}
     */

    function _class() {
        var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var structurable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, _class);

        var scope = structurable ? Object.assign(this, {
            __whsobject: true,
            __releaseTime: new Date().getTime(),
            __params: {},
            __defaults: defaults,

            parent: null,
            children: []
        }, new Events()) : Object.assign(this, {
            __whsobject: true,
            __releaseTime: new Date().getTime(),
            __params: {}
        }, new Events());

        return scope;
    }

    _createClass(_class, [{
        key: 'setParams',
        value: function setParams() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.__params = WHS.API.extend(params, this.__defaults);
        }
    }, {
        key: 'updateParams',
        value: function updateParams() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.__params = WHS.API.extend(params, this.__params);
        }
    }]);

    return _class;
}();

/** Camera super class */
WHS.Camera = function(_WHS$Object) {
    _inherits(_class2, _WHS$Object);

    /**
     * Constructing WHS.Camera object.
     * 
     * @param {Object} params - Inputed parameters.
     * @param {String} type - Camera type.
     * @return {WHS.Camera}
     */

    function _class2(params, type) {
        var _ret;

        _classCallCheck(this, _class2);

        if (!type) console.error("@constructor: Please specify \" type \".");

        var _set = function _set(x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;
        };

        params.useTarget = !!params.target;

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this, {
            camera: {
                fov: 45,
                aspect: window.innerWidth / window.innerHeight,
                near: 1,
                far: 1000,

                left: window.innerWidth / -2,
                right: window.innerWidth / 2,
                top: window.innerHeight / 2,
                bottom: window.innerHeight / -2,

                cubeResolution: 128
            },

            helper: false,

            pos: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            rot: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            target: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            }
        }));

        _get(Object.getPrototypeOf(_class2.prototype), 'setParams', _this).call(_this, params);

        var scope = Object.assign(_this, {
            _type: type,
            helper: false
        });

        if (WHS.debug) console.debug("@WHS.Camera: Camera " + scope._type + " found.", scope);

        return _ret = scope, _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Applying position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with light 
     * additionally.
     */

    _createClass(_class2, [{
        key: 'wrap',
        value: function wrap() {

            'use strict';

            for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
                tags[_key] = arguments[_key];
            }

            var camera = this.camera,
                _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

                    _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

                    if (_scope.__params.useTarget) _scope.lookAt(_scope.__params.target);

                    if (_scope.__params.helper) _scope.helper = new THREE.CameraHelper(_scope.camera);

                    tags.forEach(function(tag) {
                        _scope[tag] = true;
                    });

                    if (WHS.debug) console.debug("@WHS.Camera: Camera " + _scope._type + " is ready.", _scope);

                    _scope.emit("ready");

                    resolve(_scope);
                } catch (err) {

                    console.error(err.message);

                    reject();
                }
            });
        }

        /**
         * Add light to WHS.World object.
         *
         * @param {WHS.World} root - World, were this light will be. 
         * @param {...String} tags - Tags for compiling. 
         */

    }, {
        key: 'addTo',
        value: function addTo(parent) {

            'use strict';

            this.parent = parent;

            var _camera = this.camera,
                _helper = this.helper,
                _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    _scope.parent.scene.add(_camera);
                    _scope.parent.children.push(_scope);

                    if (_helper) _scope.parent.scene.add(_helper);
                } catch (err) {

                    console.error(err.message);
                    reject();
                } finally {

                    if (WHS.debug) console.debug("@WHS.Camera: Camera " + _scope._type + " was added to world.", [_scope, _scope.parent]);

                    resolve(_scope);

                    _scope.emit("ready");
                }
            });
        }

        /**
         * Clone camera.
         */

    }, {
        key: 'clone',
        value: function clone() {

            return new WHS.Shape(this.__params, this._type).copy(this);
        }

        /**
         * Copy camera.
         *
         * @param {WHS.Camera} source - Source object, that will be applied to this.
         */

    }, {
        key: 'copy',
        value: function copy(source) {

            this.mesh = source.mesh.clone();

            this.wrap();

            this.position = source.position.clone();
            this.rotation = source.rotation.clone();

            this._type = source._type;

            return this;
        }
    }, {
        key: 'setPosition',

        /**
         * Overwriting camera position values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Camera} - this.
         */
        value: function setPosition(x, y, z) {
            this.position.set(x, y, z);

            return this;
        }

        /**
         * Overwriting camera rotation values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Camera} - this.
         */

    }, {
        key: 'setRotation',
        value: function setRotation(x, y, z) {
            this.rotation.set(x, y, z);

            return this;
        }
    }, {
        key: 'follow',
        value: function follow(curve) {
            var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
            var loop = arguments[2];
            var lookAt = arguments[3];

            var _scope = this,
                gEnd = time;

            var animation = new WHS.loop(function(clock) {

                var u = clock.getElapsedTime() * 1000 / gEnd;
                var vec1 = curve.getPoint(u);
                var vec2 = curve.getPoint((u + 0.01) % 1);

                _scope.setPosition(vec1.x, vec1.y, vec1.z);

                if (!lookAt) _scope.lookAt(vec2);
                else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
                else if (lookAt instanceof THREE.Curve || lookAt instanceof THREE.CurvePath) {

                    _scope.lookAt(lookAt.getPoint(u));
                }
            });

            animation.start();

            if (loop) setInterval(function() {
                animation.stop();

                animation = new WHS.loop(function(clock) {

                    var u = clock.getElapsedTime() * 1000 / gEnd;
                    var vec1 = curve.getPoint(u);
                    var vec2 = curve.getPoint((u + 0.01) % 1);

                    _scope.setPosition(vec1.x, vec1.y, vec1.z);

                    if (!lookAt) _scope.lookAt(vec2);
                    else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
                    else if (lookAt instanceof THREE.Curve || lookAt instanceof THREE.CurvePath) {

                        _scope.lookAt(lookAt.getPoint(u));
                    }
                });

                animation.start();
            }, time);
            else setTimeout(function() {
                animation.stop();
            }, time);
        }

        /* =========== POLYFILL =========== */

    }, {
        key: 'lookAt',
        value: function lookAt(vector3) {
            return this.camera.lookAt(vector3);
        }
    }, {
        key: 'getWorldDirection',
        value: function getWorldDirection(vector3) {
            return this.camera.getWorldDirection(vector3);
        }
    }, {
        key: 'position',
        get: function get() {
            return this.camera.position;
        },
        set: function set(vector3) {
            return this.camera.position.copy(vector3);
        }
    }, {
        key: 'rotation',
        get: function get() {
            return this.camera.rotation;
        },
        set: function set(euler) {
            return this.camera.rotation.copy(euler);
        }
    }]);

    return _class2;
}(WHS.Object);

/**
 * Whitestormjs curve.
 */
WHS.Curve = function(_WHS$Object2) {
    _inherits(Curve, _WHS$Object2);

    /**
     * Create curve.
     *
     * Todo
     */

    function Curve(params) {
        var _ret2;

        _classCallCheck(this, Curve);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Curve).call(this, {
            geometry: {
                curve: false,
                points: 50
            }
        }));

        _get(Object.getPrototypeOf(Curve.prototype), 'setParams', _this2).call(_this2, params);

        var geometry = new THREE.Geometry();

        geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

        var mesh = new THREE.Line(geometry, WHS.API.loadMaterial(params.material, false)._material);

        var scope = Object.assign(_this2, {
            _type: "curve",
            curve: mesh,
            __path: params.geometry.curve
        });

        return _ret2 = scope, _possibleConstructorReturn(_this2, _ret2);
    }

    /**
     * Add curve to scene.
     */

    _createClass(Curve, [{
        key: 'addTo',
        value: function addTo(parent) {

            'use strict';

            this.parent = parent;

            var _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    _scope.parent.scene.add(_scope.curve);
                    _scope.parent.children.push(_scope);
                } catch (err) {

                    console.error(err.message);
                    reject();
                } finally {

                    if (WHS.debug) console.debug("@WHS.Curve: Curve " + _scope._type + " was added to world.", [_scope, _scope.parent]);

                    resolve(_scope);
                }
            });
        }

        /**
         * Clone curve.
         */

    }, {
        key: 'clone',
        value: function clone() {

            return new WHS.Curve(this.__params).copy(this);
        }

        /**
         * Copy curve.
         *
         * @param {WHS.Curve} source - Source object, that will be applied to this.
         */

    }, {
        key: 'copy',
        value: function copy(source) {

            this.curve = source.curve.clone();

            this._type = source._type;

            return this;
        }

        /**
         * Remove this curve from world.
         *
         * @return {THREE.Curve} - this.
         */

    }, {
        key: 'remove',
        value: function remove() {

            this.parent.scene.remove(this.curve);

            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent = null;

            this.emit("remove");

            if (WHS.debug) console.debug("@WHS.Curve: Curve " + this._type + " was removed from world", [_scope]);

            return this;
        }
    }]);

    return Curve;
}(WHS.Object);

/** Light super class */
WHS.Light = function(_WHS$Object3) {
    _inherits(_class3, _WHS$Object3);

    /**
     * Constructing WHS.Light object.
     * 
     * @param {Object} params - Inputed parameters.
     * @param {String} type - Light type.
     * @return {WHS.Light}
     */

    function _class3(params, type) {
        var _ret3;

        _classCallCheck(this, _class3);

        if (!type) console.error("@constructor: Please specify \" type \".");

        var _set = function _set(x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;
        };

        // Polyfill for 3D.

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this, {

            light: {
                color: 0xffffff,
                skyColor: 0xffffff,
                groundColor: 0xffffff,

                intensity: 1,
                distance: 100,
                angle: Math.PI / 3,
                exponent: 0,
                decay: 1
            },

            helper: false,

            shadowmap: {
                cast: true,

                bias: 0,

                width: 1024,
                height: 1024,

                near: true,
                far: 400,
                fov: 60,
                darkness: 0.3,

                top: 200,
                bottom: -200,
                left: -200,
                right: 200
            },

            pos: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            rot: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            target: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            }

        }));

        _get(Object.getPrototypeOf(_class3.prototype), 'setParams', _this3).call(_this3, params);

        var scope = Object.assign(_this3, {
            _type: type,

            _light: _this3.__params.light,
            _shadowmap: _this3.__params.shadowmap
        });

        if (WHS.debug) console.debug("@WHS.Light: Light " + scope._type + " found.", scope);

        return _ret3 = scope, _possibleConstructorReturn(_this3, _ret3);
    }

    /**
     * Applying shadow & position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with light 
     * additionally.
     */

    _createClass(_class3, [{
        key: 'wrap',
        value: function wrap() {

            'use strict';

            for (var _len2 = arguments.length, tags = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                tags[_key2] = arguments[_key2];
            }

            var light = this.light,
                _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    if (tags.indexOf("noshadows") < 0) {

                        light.castShadow = true;
                        light.receiveShadow = true;
                    }

                    _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

                    _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

                    tags.forEach(function(tag) {
                        _scope[tag] = true;
                    });

                    if (WHS.debug) console.debug("@WHS.Light: Light " + _scope._type + " is ready.", _scope);

                    _scope.emit("ready");

                    resolve(_scope);
                } catch (err) {

                    console.error(err.message);

                    reject();
                }
            });
        }

        /**
         * Add light to WHS.World object.
         *
         * @param {WHS.World} root - World, were this light will be. 
         * @param {...String} tags - Tags for compiling. 
         */

    }, {
        key: 'addTo',
        value: function addTo(parent) {

            'use strict';

            this.parent = parent;

            var _light = this.light,
                _helper = this.helper,
                _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    _scope.parent.scene.add(_light);
                    _scope.parent.children.push(_scope);

                    if (_helper) _scope.parent.scene.add(_helper);
                } catch (err) {

                    console.error(err.message);
                    reject();
                } finally {

                    if (WHS.debug) console.debug("@WHS.Camera: Camera " + _scope._type + " was added to world.", [_scope, _scope.parent]);

                    resolve(_scope);

                    _scope.emit("ready");
                }
            });
        }

        /** 
         * Set shadow properties for light.
         */

    }, {
        key: 'wrapShadow',
        value: function wrapShadow() {
            var _this4 = this;

            var _scope = this;

            return new Promise(function(resolve, reject) {

                try {

                    _this4.light.shadow.mapSize.width = _this4._shadowmap.width;
                    _this4.light.shadow.mapSize.height = _this4._shadowmap.height;
                    _this4.light.shadow.bias = _this4._shadowmap.bias;

                    _this4.light.shadow.camera.near = _this4._shadowmap.near;
                    _this4.light.shadow.camera.far = _this4._shadowmap.far;
                    _this4.light.shadow.camera.fov = _this4._shadowmap.fov;

                    _this4.light.shadow.camera.Left = _this4._shadowmap.left;
                    _this4.light.shadow.camera.right = _this4._shadowmap.right;
                    _this4.light.shadow.camera.top = _this4._shadowmap.top;
                    _this4.light.shadow.camera.bottom = _this4._shadowmap.bottom;
                } catch (err) {

                    console.error(err.message);
                    reject();
                } finally {

                    resolve(_scope);
                }
            });
        }

        /**
         * Clone light.
         */

    }, {
        key: 'clone',
        value: function clone() {

            return new WHS.Light(this.__params, this._type).copy(this);
        }

        /**
         * Copy light.
         *
         * @param {WHS.Light} source - Source object, that will be applied to this.
         */

    }, {
        key: 'copy',
        value: function copy(source) {

            this.light = source.light.clone();
            if (source.helper) this.helper = source.helper.clone();

            this.wrap();

            this.position = source.position.clone();
            this.rotation = source.rotation.clone();

            this._type = source._type;

            return this;
        }

        /**
         * Remove this light from world.
         */

    }, {
        key: 'remove',
        value: function remove() {

            this.parent.scene.remove(this.light);
            if (source.helper) this.parent.scene.remove(this.helper);

            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent = null;

            this.emit("remove");

            return this;
        }

        /**
         * Overwriting light position values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Light} - this.
         */

    }, {
        key: 'setPosition',
        value: function setPosition(x, y, z) {
            this.position.set(x, y, z);

            return this;
        }

        /**
         * Overwriting light rotation values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Light} - this.
         */

    }, {
        key: 'setRotation',
        value: function setRotation(x, y, z) {
            this.rotation.set(x, y, z);

            return this;
        }
    }, {
        key: 'position',
        get: function get() {
            return this.light.position;
        },
        set: function set(vector3) {
            return this.light.position.copy(vector3);
        }
    }, {
        key: 'rotation',
        get: function get() {
            return this.light.rotation;
        },
        set: function set(euler) {
            return this.light.rotation.copy(euler);
        }
    }, {
        key: 'target',
        get: function get() {
            return this.light.target.position;
        },
        set: function set(vector3) {
            return this.light.target.position.copy(vector3);
        }
    }]);

    return _class3;
}(WHS.Object);

/** Shape super class */
WHS.Shape = function(_WHS$Object4) {
    _inherits(_class4, _WHS$Object4);

    /**
     * Constructing WHS.Shape object.
     * 
     * @param {Object} params - Inputed parameters.
     * @param {String} type - Shape type.
     * @return {WHS.Shape}
     */

    function _class4(params, type) {
        var _ret4;

        _classCallCheck(this, _class4);

        if (!type) console.error("@constructor: Please specify \" type \".");

        var _set = function _set(x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;
        };

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).call(this, {

            mass: 10,

            helpers: {
                box: false,
                boundingBox: false,
                edges: false,
                faceNormals: false
            },

            pos: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            rot: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            scale: {
                x: 1,
                y: 1,
                z: 1,
                set: _set
            },

            target: {
                x: 0,
                y: 0,
                z: 0,
                set: _set
            },

            morph: {
                speed: 1,
                duration: 1
            },

            physics: true

        }));

        _get(Object.getPrototypeOf(_class4.prototype), 'setParams', _this5).call(_this5, params);

        var scope = Object.assign(_this5, {
            _type: type,
            __params: params,

            wait: [],
            helpers: {
                box: false
            },

            physics: params.physics
        });

        if (WHS.debug) console.debug("@WHS.Shape: Shape " + scope._type + " found.", scope);

        return _ret4 = scope, _possibleConstructorReturn(_this5, _ret4);
    }

    _createClass(_class4, [{
        key: 'wait',
        value: function wait(promise) {

            this.wait.push(promise);

            return this;
        }

        /**
         * Applying shadow & position & rotation.
         *
         * @param {...String} tags - Tags that defines what to do with shape 
         * additionally.
         */

    }, {
        key: 'wrap',
        value: function wrap() {

            'use strict';

            var _scope = this;

            for (var _len3 = arguments.length, tags = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                tags[_key3] = arguments[_key3];
            }

            if (tags.indexOf("wait") >= 0) {

                return new Promise(function(resolve, reject) {

                    Promise.all(_scope.wait).then(function() {

                        try {

                            _scope.mesh.castShadow = true;
                            _scope.mesh.receiveShadow = true;

                            _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

                            _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

                            _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

                            // Box helper.
                            if (_scope.__params.helpers.box) {

                                _scope.helpers.box = new THREE.BoxHelper(_scope.mesh);
                            }

                            // Bounding box helper.
                            if (_scope.__params.helpers.boundingBox) {

                                _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.mesh, _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
                            }

                            // Edges helper.
                            if (_scope.__params.helpers.edges) {

                                _scope.helpers.edges = new THREE.EdgesHelper(_scope.mesh, _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
                            }

                            // faceNormals helper.
                            if (_scope.__params.helpers.faceNormals) {

                                _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.mesh, _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
                            }

                            // vertexNormals helper.
                            if (_scope.__params.helpers.vertexNormals) {

                                _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.mesh, _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
                            }

                            if (WHS.debug) console.debug("@WHS.Shape: Shape " + _scope._type + " is ready.", _scope);

                            _scope.emit("ready");

                            resolve();
                        } catch (err) {

                            console.error(err.message);
                            reject();
                        }
                    });
                });
            } else {

                return new Promise(function(resolve, reject) {

                    try {

                        _scope.mesh.castShadow = true;
                        _scope.mesh.receiveShadow = true;

                        _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

                        _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

                        _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

                        // Box helper.
                        if (_scope.__params.helpers.box) {

                            _scope.helpers.box = new THREE.BoxHelper(_scope.mesh);
                        }

                        // Bounding box helper.
                        if (_scope.__params.helpers.boundingBox) {

                            _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.mesh, _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
                        }

                        // Edges helper.
                        if (_scope.__params.helpers.edges) {

                            _scope.helpers.edges = new THREE.EdgesHelper(_scope.mesh, _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
                        }

                        // faceNormals helper.
                        if (_scope.__params.helpers.faceNormals) {

                            _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.mesh, _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
                        }

                        // vertexNormals helper.
                        if (_scope.__params.helpers.vertexNormals) {

                            _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.mesh, _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
                        }

                        if (WHS.debug) console.debug("@WHS.Shape: Shape " + _scope._type + " is ready.", _scope);

                        resolve();

                        _scope.emit("ready");
                    } catch (err) {

                        console.error(err.message);
                        reject();
                    }
                });
            }

            return this;
        }

        /**
         * Add shape to WHS.World object.
         *
         * @param {WHS.World} parent - World, were this shape will be.
         * @param {...String} tags - Tags for compiling. 
         */

    }, {
        key: 'addTo',
        value: function addTo(parent) {

            'use strict';

            this.parent = parent;

            var _mesh = this.mesh,
                _helpers = this.helpers,
                _scope = this;

            for (var _len4 = arguments.length, tags = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                tags[_key4 - 1] = arguments[_key4];
            }

            if (tags.indexOf("wait") >= 0) {

                return new Promise(function(resolve, reject) {

                    Promise.all(_scope.wait).then(function() {

                        try {

                            _scope.parent.scene.add(_scope.mesh);
                            _scope.parent.children.push(_scope);

                            if (_scope.__params.helpers.box) _scope.parent.scene.add(_helpers.box);

                            if (_scope.__params.helpers.boundingBox) _scope.parent.scene.add(_helpers.boundingBox);

                            if (_scope.__params.helpers.edges) _scope.parent.scene.add(_helpers.edges);

                            if (_scope.__params.helpers.faceNormals) _scope.parent.scene.add(_helpers.faceNormals);

                            if (_scope.__params.helpers.vertexNormals) _scope.parent.scene.add(_helpers.vertexNormals);
                        } catch (err) {

                            console.error(err.message);
                            reject();
                        } finally {

                            if (_scope._wait) {

                                _scope.mesh.addEventListener('ready', function() {
                                    resolve(_scope);
                                });
                            } else {
                                resolve(_scope);
                            }

                            _scope.mesh.addEventListener('collide', function() {
                                _scope.emit("collide");
                            });

                            if (WHS.debug) console.debug("@WHS.Shape: Shape " + _scope._type + " was added to world.", [_scope, _scope.parent]);
                        }
                    });
                });
            } else {

                return new Promise(function(resolve, reject) {

                    try {

                        _scope.parent.scene.add(_scope.mesh);
                        _scope.parent.children.push(_scope);

                        if (_scope.__params.helpers.box) _scope.parent.scene.add(_helpers.box);

                        if (_scope.__params.helpers.boundingBox) _scope.parent.scene.add(_helpers.boundingBox);

                        if (_scope.__params.helpers.edges) _scope.parent.scene.add(_helpers.edges);

                        if (_scope.__params.helpers.faceNormals) _scope.parent.scene.add(_helpers.faceNormals);

                        if (_scope.__params.helpers.vertexNormals) _scope.parent.scene.add(_helpers.vertexNormals);
                    } catch (err) {

                        console.error(err.message);
                        reject();
                    } finally {

                        if (_scope._wait) {

                            _scope.mesh.addEventListener('ready', function() {

                                resolve(_scope);
                            });
                        } else {
                            resolve(_scope);
                        }

                        _scope.mesh.addEventListener('collide', function() {
                            _scope.emit("ready");
                        });

                        if (WHS.debug) console.debug("@WHS.Shape: Shape " + _scope._type + " was added to world", [_scope, _scope.parent]);
                    }
                });
            }
        }

        /**
         * Initialize shape's material object.
         */

    }, {
        key: '_initMaterial',
        value: function _initMaterial(params) {

            return this.physics ? WHS.API.loadMaterial(params)._material : WHS.API.loadMaterial(params)._materialP;
        }

        /**
         * Clone shape.
         */

    }, {
        key: 'clone',
        value: function clone() {

            return new WHS.Shape(this.__params, this._type).copy(this);
        }

        /**
         * Copy shape.
         *
         * @param {WHS.Shape} source - Source object, that will be applied to this.
         */

    }, {
        key: 'copy',
        value: function copy(source) {

            this.mesh = source.mesh.clone();

            this.wrap();

            this.position = source.position.clone();
            this.rotation = source.rotation.clone();

            this._type = source._type;

            return this;
        }

        /**
         * Remove this shape from world.
         *
         * @return {THREE.Shape} - this.
         */

    }, {
        key: 'remove',
        value: function remove() {

            this.parent.scene.remove(this.mesh);

            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent = null;

            this.emit("remove");

            if (WHS.debug) console.debug("@WHS.Shape: Shape " + this._type + " was removed from world", [_scope]);

            return this;
        }
    }, {
        key: 'setPosition',

        /**
         * Overwriting mesh position values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Shape} - this.
         */
        value: function setPosition(x, y, z) {
            this.position.set(x, y, z);
            this.mesh.__dirtyPosition = true;

            return this;
        }

        /**
         * Overwriting mesh rotation values.
         *
         * @param {Number} x - X coord.
         * @param {Number} y - Y coord.
         * @param {Number} z - Z coord.
         * @return {WHS.Shape} - this.
         */

    }, {
        key: 'setRotation',
        value: function setRotation(x, y, z) {
            this.rotation.set(x, y, z);
            this.mesh.__dirtyRotation = true;

            return this;
        }
    }, {
        key: 'follow',
        value: function follow(curve) {
            var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
            var loop = arguments[2];

            var _scope = this,
                gEnd = time;

            var animation = new WHS.loop(function(clock) {

                var u = clock.getElapsedTime() * 1000 / gEnd;
                var vec1 = curve.getPoint(u);
                var vec2 = curve.getPoint((u + 0.01) % 1);

                _scope.setPosition(vec1.x, vec1.y, vec1.z);
                _scope.mesh.lookAt(vec2);
            });

            animation.start();

            if (loop) setInterval(function() {
                animation.stop();

                animation = new WHS.loop(function(clock) {

                    var u = clock.getElapsedTime() * 1000 / gEnd;
                    var vec1 = curve.getPoint(u);
                    var vec2 = curve.getPoint((u + 0.01) % 1);

                    _scope.setPosition(vec1.x, vec1.y, vec1.z);
                    _scope.mesh.lookAt(vec2);
                });

                animation.start();
            }, time);
            else setTimeout(function() {
                animation.stop();
            }, time);
        }
    }, {
        key: 'position',
        get: function get() {
            return this.mesh.position;
        },
        set: function set(vector3) {
            this.mesh.__dirtyPosition = true;
            return this.mesh.position.copy(vector3);
        }
    }, {
        key: 'rotation',
        get: function get() {
            return this.mesh.rotation;
        },
        set: function set(euler) {
            this.mesh.__dirtyRotation = true;
            return this.mesh.rotation.copy(euler);
        }
    }, {
        key: 'scale',
        get: function get() {
            return this.mesh.scale;
        },
        set: function set(vector3) {
            return this.mesh.scale = vector3;
        }
    }]);

    return _class4;
}(WHS.Object);

/** Class that initializates 3d world. */
WHS.World = function(_WHS$Object5) {
    _inherits(_class5, _WHS$Object5);

    /**
     * Create a 3D world and define defaults.
     *
     * @param {object} params - The scene settings object.
     * @return {World} A 3D world whs object.
     */

    function _class5() {

        'use strict';

        var _ret5;

        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, _class5);

        if (!THREE) console.warn('WhitestormJS requires Three.js. {Object} THREE is undefined.');
        if (!Physijs) console.warn('WhitestormJS requires Physi.js. {Object} Physijs is undefined.');

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class5).call(this, {

            stats: false,
            autoresize: false,

            shadowmap: {
                enabled: true,
                type: THREE.PCFSoftShadowMap
            },

            helpers: {
                grid: false,
                axis: false
            },

            gravity: {
                x: 0,
                y: 0,
                z: 0
            },

            camera: {
                aspect: 75,
                near: 1,
                far: 1000,

                x: 0,
                y: 0,
                z: 0
            },

            rWidth: 1, // Resolution(width).
            rHeight: 1, // Resolution(height).

            width: window.innerWidth, // Container(width).
            height: window.innerHeight, // Container(height).

            physics: {

                quatNormalizeSkip: 0,
                quatNormalizeFast: false,

                solver: {
                    iterations: 20,
                    tolerance: 0
                },

                defMaterial: {
                    contactEquationStiffness: 1e8,
                    contactEquationRegularizationTime: 3
                }

            },

            background: 0x000000,
            assets: "./assets",
            container: document.body,

            path_worker: '../libs/physijs_worker.js',
            path_ammo: '../libs/ammo.js'

        }));

        _get(Object.getPrototypeOf(_class5.prototype), 'setParams', _this6).call(_this6, params);

        // INIT.
        _this6._initScene();
        _this6._initDOM();
        _this6._initStats();
        _this6._initCamera();
        _this6._initRenderer();
        _this6._initHelpers();

        // NOTE: ==================== Autoresize. ======================
        var scope = _this6;

        if (_this6.__params.autoresize) window.addEventListener('resize', function() {
            scope.setSize(window.innerWidth, window.innerHeight);
        });

        return _ret5 = scope, _possibleConstructorReturn(_this6, _ret5);
    }

    /**
     * Initialize Three.js scene object.
     */

    _createClass(_class5, [{
        key: '_initScene',
        value: function _initScene() {

            this._initPhysiJS();

            this.scene = new Physijs.Scene();

            this.scene.setGravity(new THREE.Vector3(this.__params.gravity.x, this.__params.gravity.y, this.__params.gravity.z));

            // Arrays for processing.
            this.children = [];
        }

        /**
         * Set Physi.js scripts pathes.
         */

    }, {
        key: '_initPhysiJS',
        value: function _initPhysiJS() {

            this.simulate = true;

            Physijs.scripts.worker = this.__params.path_worker;
            Physijs.scripts.ammo = this.__params.path_ammo;
        }

        /**
         * Initialize DOM structure for whitestorm.
         */

    }, {
        key: '_initDOM',
        value: function _initDOM() {

            this.__params.container.style.margin = 0;
            this.__params.container.style.padding = 0;
            this.__params.container.style.position = 'relative';
            this.__params.container.style.overflow = 'hidden';

            this._dom = document.createElement('div');
            this._dom.className = "whs";

            this.__params.container.appendChild(this._dom);

            return this._dom;
        }

        /**
         * Inititialize stats plugin.
         */

    }, {
        key: '_initStats',
        value: function _initStats() {

            // Debug Renderer
            if (this.__params.stats) {

                this._stats = new Stats();

                if (this.__params.stats == "fps") this._stats.setMode(0);
                else if (this.__params.stats == "ms") this._stats.setMode(1);
                else if (this.__params.stats == "mb") this._stats.setMode(1);
                else {
                    this._stats.setMode(0);

                    console.warn([this._stats], "Please, apply stats mode [fps, ms, mb] .");
                }

                this._stats.domElement.style.position = 'absolute';
                this._stats.domElement.style.left = '0px';
                this._stats.domElement.style.bottom = '0px';

                this._dom.appendChild(this._stats.domElement);
            }
        }

        /**
         * Create a camera and add it to scene.
         */

    }, {
        key: '_initCamera',
        value: function _initCamera() {

            this._camera = new WHS.PerspectiveCamera({
                camera: {
                    fov: this.__params.camera.aspect,
                    aspect: this.__params.width / this.__params.height,
                    near: this.__params.camera.near,
                    far: this.__params.camera.far
                }
            });

            this._camera.position.set(this.__params.camera.x, this.__params.camera.y, this.__params.camera.z);

            this._camera.addTo(this);
        }

        /**
         * Create a renderer and apply it's options.
         */

    }, {
        key: '_initRenderer',
        value: function _initRenderer() {

            this.render = true;

            // Renderer.
            this._renderer = new THREE.WebGLRenderer();
            this._renderer.setClearColor(this.__params.background);

            // Shadowmap.
            this._renderer.shadowMap.enabled = this.__params.shadowmap.enabled;
            this._renderer.shadowMap.type = this.__params.shadowmap.type;
            this._renderer.shadowMap.cascade = true;

            this._renderer.setSize(+(this.__params.width * this.__params.rWidth).toFixed(), +(this.__params.height * this.__params.rHeight).toFixed());

            this._renderer.render(this.scene, this._camera.camera);

            this._dom.appendChild(this._renderer.domElement);

            this._renderer.domElement.style.width = '100%';
            this._renderer.domElement.style.height = '100%';
        }

        /**
         * Add helpers to scene.
         */

    }, {
        key: '_initHelpers',
        value: function _initHelpers() {

            if (this.__params.helpers.axis) this.scene.add(new THREE.AxisHelper(this.__params.helpers.axis.size ? this.__params.helpers.axis.size : 5));

            if (this.__params.helpers.grid) this.scene.add(new THREE.GridHelper(this.__params.helpers.grid.size ? this.__params.helpers.grid.size : 10, this.__params.helpers.grid.step ? this.__params.helpers.grid.step : 1));
        }

        /**
         * Start animation.
         */

    }, {
        key: 'start',
        value: function start() {

            'use strict';

            var clock = new THREE.Clock();
            var scope = this;

            function reDraw(time) {

                requestAnimationFrame(reDraw);

                // Init stats.
                if (scope._stats) scope._stats.begin();

                //if (scope.__params.anaglyph)
                //  scope.effect.render(scope.scene, scope._camera);

                scope.__localTime = time;

                scope._process(clock);

                if (scope.simulate) scope.scene.simulate();

                scope._updateControls();

                // Effects rendering.
                if (scope._composer) {

                    scope._composer.reset();

                    if (scope.render) scope._composer.render(scope.scene, scope._camera.camera);

                    scope._composer.pass(scope._composer.stack);

                    scope._composer.toScreen();
                } else {

                    if (scope.render) scope._renderer.render(scope.scene, scope._camera.camera);
                }

                scope._execLoops(time);

                // End helper.
                if (scope._stats) scope._stats.end();
            }

            this._update = reDraw;

            scope._update();
        }

        /**
         * Execute all loops with a specific time.
         *
         * @params {number} time - The time value that will be passed to loops.
         */

    }, {
        key: '_execLoops',
        value: function _execLoops(time) {

            WHS.loops.forEach(function(loop) {
                if (loop.enabled) loop.func(loop.clock, time);
            });
        }

        /**
         * Update controls time values.
         */

    }, {
        key: '_updateControls',
        value: function _updateControls() {

            if (this.controls) {

                this.controls.update(Date.now() - this.time);
                this.time = Date.now();
            }
        }

        /**
         * Update morphs animations.
         *
         * @params {THREE.Clock} clock - The clock object, which.
         */

    }, {
        key: '_process',
        value: function _process(clock) {

            var delta = clock.getDelta();

            for (var i = 0; i < this.children.length; i++) {

                if (this.children[i]._type == "morph") this.children[i].mesh.mixer.update(delta);
            }
        }

        /**
         * Set a camera for rendering world.
         *
         * @params {WHS.Camera} camera - The camera to be rendered.
         */

    }, {
        key: 'setCamera',
        value: function setCamera(camera) {

            if (camera instanceof WHS.Camera) this._camera = camera;
            else console.error("@WHS.World: camera in not an instance of WHS.Camera.");

            return this;
        }

        /**
         * This functon will scene properties when it's called.
         */

    }, {
        key: 'setSize',
        value: function setSize() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            this._camera.camera.aspect = width / height;
            this._camera.camera.updateProjectionMatrix();

            this._renderer.setSize(+(width * this.__params.rWidth).toFixed(), +(height * this.__params.rHeight).toFixed());
        }
    }]);

    return _class5;
}(WHS.Object);

/**
 * Extending object with other objects.
 *
 * @param {Object} object - Object that will be overwritten.
 * @param {...Objects} extensions - other objects that will be merged to first.
 * @return {Object} Extended object.
 */
WHS.API.extend = function(object) {
    for (var _len5 = arguments.length, extensions = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        extensions[_key5 - 1] = arguments[_key5];
    }

    // $.extend alternative, ... is the spread operator.

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var extension = _step.value;

            //console.log(extension);
            //console.log(typeof extension);

            if (!extension) continue; // Ignore null and undefined objects and paramaters.

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(extension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prop = _step2.value;
                    // Do not traverse the prototype chain.
                    if (object[prop] != undefined && object[prop].toString() == '[object Object]' && extension[prop].toString() == '[object Object]')

                    //Goes deep only if object[prop] and extension[prop] are both objects !
                        WHS.API.extend(object[prop], extension[prop]);
                    else object[prop] = object[prop] === 0 ? 0 : object[prop];
                    if (typeof object[prop] == "undefined") object[prop] = extension[prop]; // Add values that do not already exist.
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return object;
};

WHS.API.loadMaterial = function(material) {

    'use strict';

    var isPhysics = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    if (typeof material.kind !== "string") console.error("Type of material is undefined or not a string. @loadMaterial");

    var scope = {
        _type: material.kind,
        _restitution: !isNaN(parseFloat(material.restitution)) ? material.restitution : !isNaN(parseFloat(material.rest)) ? material.rest : 0.3,
        _friction: !isNaN(parseFloat(material.friction)) ? material.friction : !isNaN(parseFloat(material.fri)) ? material.fri : 0.8
    };

    var params = WHS.API.extend({}, material);

    delete params["kind"];

    delete params["friction"];
    delete params["fri"];

    delete params["restitution"];
    delete params["rest"];

    delete params["useCustomMaterial"];
    delete params["useVertexColors"];

    switch (material.kind) {
        case "basic":
            scope._material = new THREE.MeshBasicMaterial(params);
            break;

        case "linebasic":
            scope._material = new THREE.LineBasicMaterial(params);
            break;

        case "linedashed":
            scope._material = new THREE.LineDashedMaterial(params);
            break;

        case "material":
            scope._material = new THREE.Material(params);
            break;

        case "depth":
            scope._material = new THREE.MeshDepthMaterial(params);
            break;

        case "face":
            scope._material = new THREE.MeshFaceMaterial(params);
            break;

        case "lambert":
            scope._material = new THREE.MeshLambertMaterial(params);
            break;

        case "normal":
            scope._material = new THREE.MeshNormalMaterial(params);
            break;

        case "phong":
            scope._material = new THREE.MeshPhongMaterial(params);
            break;

        case "pointcloud":
            scope._material = new THREE.PointCloudMaterial(params);
            break;

        case "rawshader":
            scope._material = new THREE.RawShaderMaterial(params);
            break;

        case "shader":
            scope._material = new THREE.ShaderMaterial(params);
            break;

        case "spritecanvas":
            scope._material = new THREE.SpriteCanvasMaterial(params);
            break;

        case "sprite":
            scope._material = new THREE.SpriteMaterial(params);
            break;
    }

    if (isPhysics) scope._materialP = Physijs.createMaterial(scope._material, scope._friction, scope._restitution);

    return scope;
};

/**
 * Adds multiple objects to first object with .add method.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 * @deprecated since v0.0.6
 */
WHS.API.merge = function(box, rabbits) {

    'use strict';

    // More presice checking.

    if (!((typeof box === 'undefined' ? 'undefined' : _typeof(box)) === 'object' && (typeof rabbits === 'undefined' ? 'undefined' : _typeof(rabbits)) === 'object')) console.error("No rabbits for the box. (arguments)", [typeof box === 'undefined' ? 'undefined' : _typeof(box), typeof rabbits === 'undefined' ? 'undefined' : _typeof(rabbits)]);

    // Will only get here if box and rabbits are objects, arrays are object !
    if (!box) // Box should not be null, null is an object too !

    // #FIXME:0 Fix caller function line number.
        console.error("box is undefined. Line " + new Error().lineNumber + ". Func merge.", [box, rabbits]);
    else {

        if (Array.isArray(rabbits) && rabbits.length === 1) box.add(rabbits[0]); // Should not be 0.

        else if (Array.isArray(rabbits) && rabbits.length > 1 && box) {

            for (var i = 0; i < rabbits.length; i++) {

                box.add(rabbits[i]);
            }
        } else if (!Array.isArray(rabbits)) box.add(rabbits);
    }
};

/**
 * Texture. Loads texture object.
 *
 * @param {String} url - Url adress of texture *JSON*.
 * @param {Object} options - Parameters of texture.
 * @return {Object} Three.JS texture.
 */
WHS.API.texture = function(url, options) {

    'use strict';

    var texture = WHS.API.loadTexture(url);

    if (options) {

        var opt = WHS.API.extend(options, {

            offset: {
                x: 0,
                y: 0
            },

            repeat: {
                x: 1,
                y: 1
            }

        });

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        texture.offset.set(opt.offset.x, opt.offset.y);
        texture.repeat.set(opt.repeat.x, opt.repeat.y);

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
    }

    return texture;
};

WHS.Watch = function(queue) {

    'use strict';

    this._queue = Array.isArray(queue) ? queue.slice() : [];

    return this;
};

WHS.Watch.prototype.add = function(element) {

    'use strict';

    this._queue.push(element);

    return this;
};

WHS.Watch.prototype.remove = function(element) {

    'use strict';

    this._queue = this._queue.filter(function(item) {
        return item != element;
    });

    return this;
};

/**
 * WhitestormJS plugin loop
 *
 * @param  {Function} func - Function to be executed
 */
WHS.loop = function(func) {

    this.loop = {
        func: func,
        id: WHS.loops.length,
        clock: new THREE.Clock(),
        enabled: false
    };

    WHS.loops.push(this.loop);
};

/**
 * Starts the loop
 */
WHS.loop.prototype.start = function() {

    this.loop.clock.start();

    this.loop.enabled = true;
};

/**
 * Stops the loop
 */
WHS.loop.prototype.stop = function() {

    this.loop.clock.stop();

    this.loop.enabled = false;
};

/**
 * Removes loop from WHS.loops array.
 */
WHS.loop.prototype.remove = function() {
    var _this7 = this;

    this.loop.clock.stop();

    this.loop.enabled = false;

    WHS.loops.filter(function(el) {
        return el !== _this7.loop;
    });
};

/**
 * WhitestormJS box shape.
 *
 * @extends WHS.Shape
 */

WHS.Box = function(_WHS$Shape) {
    _inherits(Box, _WHS$Shape);

    /**
     * Create a box.
     *
     * @param {Object} params - Box options
     * @param {Object} params.geometry - Box geometry
     * @param {Number} params.geometry.width - Box width
     * @param {Number} params.geometry.height - Box height
     * @param {Number} params.geometry.depth - Box depth
     * @param {Material} params.material - Box material
     * @param {Number} params.mass - Box mass
     */

    function Box() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Box);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(Box).call(this, params, "box"));

        WHS.API.extend(params.geometry, {

            width: 1,
            height: 1,
            depth: 1

        });

        _this8.build(params);

        _get(Object.getPrototypeOf(Box.prototype), 'wrap', _this8).call(_this8);

        return _this8;
    }

    _createClass(Box, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.BoxMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Box.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.BoxGeometry(params.geometry.width, params.geometry.height, params.geometry.depth), material, params.mass);

                resolve();
            });
        }
    }]);

    return Box;
}(WHS.Shape);

WHS.World.prototype.Box = function(params) {
    var object = new WHS.Box(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS cylinder shape.
 *
 * @extends WHS.Shape
 */

WHS.Cylinder = function(_WHS$Shape2) {
    _inherits(Cylinder, _WHS$Shape2);

    /**
     * Create a cylinder.
     *
     * @param {Object} params - Cylinder options
     * @param {Object} params.geometry - Cylinder geometry
     * @param {Number} params.geometry.radiusTop - The cylinder's top radius
     * @param {Number} params.geometry.radiusBottom - The cylinder's bottom radius
     * @param {Number} params.geometry.height - The cylinder's height
     * @param {Number} params.geometry.radiusSegments - The number of radius segments the cylinder has
     * @param {Material} params.material - The cylinder's material
     * @param {Number} params.mass - The cylinder's mass
     */

    function Cylinder() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Cylinder);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Cylinder).call(this, params, "cylinder"));

        WHS.API.extend(params.geometry, {

            radiusTop: 1,
            radiusBottom: 1,
            height: 1,
            radiusSegments: 32

        });

        _this9.build(params);

        _get(Object.getPrototypeOf(Cylinder.prototype), 'wrap', _this9).call(_this9);

        return _this9;
    }

    _createClass(Cylinder, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.CylinderMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Cylinder.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.CylinderGeometry(params.geometry.radiusTop, params.geometry.radiusBottom, params.geometry.height, params.geometry.radiusSegments), material, params.mass);

                resolve();
            });
        }
    }]);

    return Cylinder;
}(WHS.Shape);

WHS.World.prototype.Cylinder = function(params) {
    var object = new WHS.Cylinder(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS dodecahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Dodecahedron = function(_WHS$Shape3) {
    _inherits(Dodecahedron, _WHS$Shape3);

    /**
     * Create a dodecahedron
     *
     * @param {Object} params - The dodecahedron's options
     * @param {Object} params.geometry - The dodecahedron's geometry
     * @param {Number} params.geometry.radius - The dodecahedron's radius
     * @param {Number} params.geometry.detail - The dodecahedron's detail
     * @param {Material} params.material - The dodecahedron's material
     * @param {Number} params.mass - The dodecahedron's mass
     */

    function Dodecahedron() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Dodecahedron);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Dodecahedron).call(this, params, "dodecahedron"));

        WHS.API.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

        _this10.build(params);

        _get(Object.getPrototypeOf(Dodecahedron.prototype), 'wrap', _this10).call(_this10);

        return _this10;
    }

    _createClass(Dodecahedron, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Dodecahedron.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.DodecahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass);

                resolve();
            });
        }
    }]);

    return Dodecahedron;
}(WHS.Shape);

WHS.World.prototype.Dodecahedron = function(params) {
    var object = new WHS.Dodecahedron(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS shape extrude
 *
 * @extends WHS.Shape
 */
WHS.Extrude = function(_WHS$Shape4) {
    _inherits(Extrude, _WHS$Shape4);

    /**
     * Extrude a shape
     *
     * @param {Object} params - General options
     * @param {Object} params.geometry - Geometry options
     * @param {Array} params.geometry.shapes - Shapes to extrude
     * @param {Object} params.geometry.options - Options concerning shapes to extrude
     * @param {Material} params.material - Material
     * @param {Number} params.mass - Mass
     */

    function Extrude() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Extrude);

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Extrude).call(this, params, "extrude"));

        WHS.API.extend(params.geometry, {

            shapes: [],
            options: {}

        });

        _this11.build(params);

        _get(Object.getPrototypeOf(Extrude.prototype), 'wrap', _this11).call(_this11);

        return _this11;
    }

    _createClass(Extrude, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Extrude.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.ExtrudeGeometry(params.geometry.shapes, params.geometry.options), material, params.mass);

                resolve();
            });
        }
    }]);

    return Extrude;
}(WHS.Shape);

WHS.World.prototype.Extrude = function(params) {
    var object = new WHS.Extrude(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS icosahedron shape.
 *
 * @extends WHS.Shape
 */

WHS.Icosahderon = function(_WHS$Shape5) {
    _inherits(Icosahedron, _WHS$Shape5);

    /**
     * Create an icosahedron
     *
     * @param {Object} params - Icosahedron options
     * @param {Object} params.geometry - Icosahedron geometry options
     * @param {Number} params.geometry.radius - Icosahedron radius
     * @param {Number} params.geometry.detail - Icosahedron detail
     * @param {Material} params.material - Icosahedron material
     * @param {Number} params.mass - Icosahedron mass
     */

    function Icosahedron() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Icosahedron);

        var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(Icosahedron).call(this, params, "icosahedron"));

        WHS.API.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

        _this12.build(params);

        _get(Object.getPrototypeOf(Icosahedron.prototype), 'wrap', _this12).call(_this12);

        return _this12;
    }

    _createClass(Icosahedron, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Icosahedron.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.IcosahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass);

                resolve();
            });
        }
    }]);

    return Icosahedron;
}(WHS.Shape);

WHS.World.prototype.Icosahedron = function(params) {
    var object = new WHS.Icosahderon(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS lathe Shape
 *
 * @extends WHS.Shape
 */

WHS.Lathe = function(_WHS$Shape6) {
    _inherits(Lathe, _WHS$Shape6);

    /**
     * Create a lathe
     *
     * @param {Object} params - Lathe options
     * @param {Object} params.geometry - Lathe geometry options
     * @param {Array} params.geometry.points - Lathe points
     * @param {Material} params.material - Lathe material
     * @param {Number} params.mass - Lathe mass
     */

    function Lathe() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Lathe);

        var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(Lathe).call(this, params, "lathe"));

        WHS.API.extend(params.geometry, {

            points: []

        });

        _this13.build(params);

        _get(Object.getPrototypeOf(Lathe.prototype), 'wrap', _this13).call(_this13);

        return _this13;
    }

    _createClass(Lathe, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Lathe.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.LatheGeometry(params.geometry.points), material, params.mass);

                resolve();
            });
        }
    }]);

    return Lathe;
}(WHS.Shape);

WHS.World.prototype.Lathe = function(params) {
    var object = new WHS.Lathe(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS model
 *
 * @extends WHS.Shape
 */

WHS.Model = function(_WHS$Shape7) {
    _inherits(Model, _WHS$Shape7);

    /**
     * Create a model
     *
     * @param {Object} params - Model options
     * @param {Object} params.geometry - Model geometry options
     * @param {String} params.geometry.path - Path to model JSON
     * @param {Material} params.material - Model material
     * @param {Number} params.mass - Model mass
     */

    function Model() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Model);

        var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this, params, "model"));

        WHS.API.extend(params.geometry, {

            path: "",
            physics: ""

        });

        var scope = _this14;

        _this14.build(params);

        _get(Object.getPrototypeOf(Model.prototype), 'wrap', _this14).call(_this14, "wait");

        return _this14;
    }

    _createClass(Model, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh;

            var promise = new Promise(function(resolve, reject) {

                WHS.API.loadJSON(params.geometry.path, function(data, materials) {

                    if (params.geometry.physics != "") {

                        WHS.API.loadJSON(params.geometry.physics, function(data2) {

                            if (params.material.useVertexColors) var material = WHS.API.loadMaterial(WHS.API.extend(params.material, {
                                morphTargets: true,
                                vertexColors: THREE.FaceColors
                            }))._material;
                            else if (!materials || params.material.useCustomMaterial) var material = WHS.API.loadMaterial(params.material)._material;
                            else var material = new THREE.MultiMaterial(materials);

                            console.log(data);

                            data.computeFaceNormals();
                            data.computeVertexNormals();

                            _scope.mesh = new mesh(data, material, params.mass, data2, params.scale);

                            resolve();
                        });
                    } else {

                        if (!materials || params.material.useVertexColors) var material = WHS.API.loadMaterial(WHS.API.extend(params.material, {
                            morphTargets: true,
                            vertexColors: THREE.FaceColors
                        }))._material;
                        else if (params.material.useCustomMaterial) var material = WHS.API.loadMaterial(params.material)._material;
                        else var material = new THREE.MultiMaterial(materials);

                        data.computeFaceNormals();
                        data.computeVertexNormals();

                        _scope.mesh = new mesh(data, material, params.mass);

                        resolve();
                    }
                });
            });

            _get(Object.getPrototypeOf(Model.prototype), 'wait', this).call(this, promise);

            return promise;
        }
    }]);

    return Model;
}(WHS.Shape);

WHS.World.prototype.Model = function(params) {
    var object = new WHS.Model(params);

    object.addTo(this, "wait");

    return object;
};

/**
 * WhitestormJS morph
 *
 * @extends WHS.Shape
 */

WHS.Morph = function(_WHS$Shape8) {
    _inherits(Morph, _WHS$Shape8);

    /**
     * Create a morph
     *
     * @param {Object} params - Morph options
     * @param {Object} params.geometry - Morph geometry options
     * @param {String} params.geometry.path - Path to morph JSON
     * @param {Material} params.material - Morph material
     * @param {Number} params.mass - Morph mass
     * @param {Object} params.morph - Morph options
     * @param {Number} params.morph.speed - Morph speed
     * @param {Number} params.morph.duration - Morph duration
     */

    function Morph() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Morph);

        var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Morph).call(this, params, "morph"));

        WHS.API.extend(params.geometry, {

            path: ""

        });

        var scope = _this15;

        _this15.build(params);

        _get(Object.getPrototypeOf(Morph.prototype), 'wrap', _this15).call(_this15, "wait");

        return _this15;
    }

    _createClass(Morph, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            var promise = new Promise(function(resolve, reject) {

                WHS.API.loadJSON(params.geometry.path, function(data, materials) {

                    if (params.material.useVertexColors) var material = WHS.API.loadMaterial(WHS.API.extend(params.material, {
                        morphTargets: true,
                        vertexColors: THREE.FaceColors
                    }))._material;
                    else if (!materials || params.material.useCustomMaterial) var material = WHS.API.loadMaterial(params.material)._material;
                    else var material = new THREE.MultiMaterial(materials);

                    data.computeFaceNormals();
                    data.computeVertexNormals();

                    // Visualization.
                    _scope.mesh = new THREE.Mesh(data, material);
                    _scope.mesh.speed = params.morph.speed;

                    _scope.mesh.mixer = new THREE.AnimationMixer(_scope.mesh);

                    _scope.mesh.mixer.clipAction(data.animations[0]).setDuration(params.morph.duration).play();

                    resolve();
                });
            });

            _get(Object.getPrototypeOf(Morph.prototype), 'wait', this).call(this, promise);

            return promise;
        }
    }]);

    return Morph;
}(WHS.Shape);

WHS.World.prototype.Morph = function(params) {
    var object = new WHS.Morph(params);

    object.addTo(this, "wait");

    return object;
};

/**
 * WhitestormJS octahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Octahedron = function(_WHS$Shape9) {
    _inherits(Octahedron, _WHS$Shape9);

    /**
     * Creates an octahedron
     *
     * @param {Object} params - Octahedron options
     * @param {Object} params.geometry - Octahedron geometry options
     * @param {Number} params.geometry.radius - Octahedron radius
     * @param {Number} params.geometry.detail - Octahedron detail
     * @param {Material} params.material - Octahedron material
     * @param {Number} params.mass - Octahedron mass
     */

    function Octahedron() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Octahedron);

        var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(Octahedron).call(this, params, "octahedron"));

        WHS.API.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

        _this16.build(params);

        _get(Object.getPrototypeOf(Octahedron.prototype), 'wrap', _this16).call(_this16);

        return _this16;
    }

    _createClass(Octahedron, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Octahedron.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.OctahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass);

                resolve();
            });
        }
    }]);

    return Octahedron;
}(WHS.Shape);

WHS.World.prototype.Octahedron = function(params) {
    var object = new WHS.Octahedron(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS parametric
 *
 * @extends WHS.Shape
 */

WHS.Parametric = function(_WHS$Shape10) {
    _inherits(Parametric, _WHS$Shape10);

    /**
     * Creates a parametric
     *
     * @param {Object} params - Parametric options
     * @param {Object} params.geometry - Parametric geometry options
     * @param {Function} params.func - Parametric function
     * @param {Number} params.slices - Parametric slices
     * @param {Number} params.stacks - Parametric stacks
     * @param {Material} params.material - Parametric material
     * @param {Number} params.mass - Parametric mass
     */

    function Parametric() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Parametric);

        var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(Parametric).call(this, params, "parametric"));

        WHS.API.extend(params.geometry, {

            func: function func() {},
            slices: 10,
            stacks: 10

        });

        _this17.build(params);

        _get(Object.getPrototypeOf(Parametric.prototype), 'wrap', _this17).call(_this17);

        return _this17;
    }

    _createClass(Parametric, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Parametric.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.ParametricGeometry(params.geometry.func, params.geometry.slices, params.geometry.stacks), material, params.mass);

                resolve();
            });
        }
    }]);

    return Parametric;
}(WHS.Shape);

WHS.World.prototype.Parametric = function(params) {
    var object = new WHS.Parametric(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS plane shape
 *
 * @extends WHS.Shape
 */

WHS.Plane = function(_WHS$Shape11) {
    _inherits(Plane, _WHS$Shape11);

    /**
     * Creates a plane.
     *
     * @param {Object} params - Plane options
     * @param {Object} params.geometry - Plane geometry options
     * @param {Number} params.geometry.width - Plane width
     * @param {Number} params.geometry.height - Plane height
     * @param {Number} params.geometry.segments - Plane segments
     * @param {Material} params.material - Plane material
     * @param {Number} params.mass - Plane mass
     */

    function Plane() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Plane);

        var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(Plane).call(this, params, "plane"));

        WHS.API.extend(params.geometry, {

            width: 10,
            height: 10,
            segments: 32

        });

        _this18.build(params);

        _get(Object.getPrototypeOf(Plane.prototype), 'wrap', _this18).call(_this18);

        return _this18;
    }

    _createClass(Plane, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.PlaneMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Plane.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.PlaneGeometry(params.geometry.width, params.geometry.height, params.geometry.segments), material, params.mass);

                resolve();
            });
        }
    }]);

    return Plane;
}(WHS.Shape);

WHS.World.prototype.Plane = function(params) {
    var object = new WHS.Plane(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS polyhedron shape
 *
 * @extends WHS.Shape
 */

WHS.Polyhedron = function(_WHS$Shape12) {
    _inherits(Polyhedron, _WHS$Shape12);

    /**
     * Creates a polyhedron
     *
     * @param {Object} params - Polyhedron options
     * @param {Object} params.geometry - Polyhedron geometry options
     * @param {Number} params.geometry.radius - Polyhedron radius
     * @param {Number} param.geometry.verticesOfCube - Vertices of cube
     * @param {Number} param.geometry.indicesOfFaces - Indices of faces
     * @param {Number} param.geometry.detail - Polyhedron detail
     * @param {Material} param.material - Polyhedron material
     * @param {Number} param.mass - Polyhedron mass
     */

    function Polyhedron() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Polyhedron);

        var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(Polyhedron).call(this, params, "polyhedron"));

        WHS.API.extend(params.geometry, {

            verticesOfCube: _this19.verticesOfCube,
            indicesOfFaces: _this19.indicesOfFaces,
            radius: 6,
            detail: 2

        });

        _this19.build(params);

        _get(Object.getPrototypeOf(Polyhedron.prototype), 'wrap', _this19).call(_this19);

        return _this19;
    }

    _createClass(Polyhedron, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Polyhedron.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.PolyhedronGeometry(params.geometry.verticesOfCube, params.geometry.indicesOfFaces, params.geometry.radius, params.geometry.detail), material, params.mass);

                resolve();
            });
        }
    }, {
        key: 'verticesOfCube',
        get: function get() {

            return [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
        }
    }, {
        key: 'indicesOfFaces',
        get: function get() {

            return [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4];
        }
    }]);

    return Polyhedron;
}(WHS.Shape);

WHS.World.prototype.Polyhedron = function(params) {
    var object = new WHS.Polyhedron(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS ring shape
 *
 * @extends WHS.Shape
 */

WHS.Ring = function(_WHS$Shape13) {
    _inherits(Ring, _WHS$Shape13);

    /**
     * Creates a ring.
     *
     * @param {Object} params - Ring options
     * @param {Object} params.geometry - Ring geometry options
     * @param {Number} params.geometry.innerRadius - Ring inner radius
     * @param {Number} params.geometry.outerRadius - Ring outer radius
     * @param {Number} params.geometry.thetaSegments - Ring theta segments
     * @param {Number} params.geometry.phiSegments - Ring phi segments
     * @param {Number} params.geometry.thetaStart - Ring theta start
     * @param {Number} params.geometry.thetaLength - Ring theta length
     * @param {Material} params.material - Ring material
     * @param {Number} params.mass - Ring mass
     */

    function Ring() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Ring);

        var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ring).call(this, params, "ring"));

        WHS.API.extend(params.geometry, {

            innerRadius: 0,
            outerRadius: 50,
            thetaSegments: 8,
            phiSegments: 8,
            thetaStart: 0,
            thetaLength: Math.PI * 2

        });

        _this20.build(params);

        _get(Object.getPrototypeOf(Ring.prototype), 'wrap', _this20).call(_this20, "onlyvis");

        return _this20;
    }

    _createClass(Ring, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                material = _get(Object.getPrototypeOf(Ring.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new THREE.Mesh(new THREE.RingGeometry(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength), material);

                resolve();
            });
        }
    }]);

    return Ring;
}(WHS.Shape);

WHS.World.prototype.Ring = function(params) {
    var object = new WHS.Ring(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS 2D shape
 *
 * @extends WHS.Shape
 */

WHS.Shape2D = function(_WHS$Shape14) {
    _inherits(Shape2D, _WHS$Shape14);

    /**
     * Creates a 2D shape
     *
     * @param {Object} params - Shape options
     * @param {Object} params.geometry - Shape geometry options
     * @param {Array} params.geometry.shapes - Shapes
     * @param {Material} params.material - Shape material
     */

    function Shape2D() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Shape2D);

        var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(Shape2D).call(this, params, "shape2D"));

        WHS.API.extend(params.geometry, {

            shapes: []

        });

        _this21.mesh = new THREE.Mesh(new THREE.ShapeGeometry(params.geometry.shapes), _get(Object.getPrototypeOf(Shape2D.prototype), '_initMaterial', _this21).call(_this21, params.material));

        _get(Object.getPrototypeOf(Shape2D.prototype), 'wrap', _this21).call(_this21, "onlyvis");

        return _this21;
    }

    return Shape2D;
}(WHS.Shape);

WHS.World.prototype.Shape2D = function(params) {
    var object = new WHS.Shape2D(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS sphere shape
 *
 * @extends WHS.Shape
 */

WHS.Sphere = function(_WHS$Shape15) {
    _inherits(Sphere, _WHS$Shape15);

    /**
     * Creates a sphere.
     *
     * @param {Object} params - Sphere options
     * @param {Object} params.geometry - Sphere geometry options
     * @param {Number} params.geometry.radius - Sphere radius
     * @param {Number} params.geometry.segmentA - Sphere segment A count
     * @param {Number} params.geometry.segmentB - Sphere segment B count
     * @param {Material} params.material - Sphere material
     * @param {Number} params.mass - Sphere mass
     */

    function Sphere() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Sphere);

        var _this22 = _possibleConstructorReturn(this, Object.getPrototypeOf(Sphere).call(this, params, "sphere"));

        WHS.API.extend(params.geometry, {

            radius: 1,
            segmentA: 32,
            segmentB: 32

        });

        _this22.build(params);

        _get(Object.getPrototypeOf(Sphere.prototype), 'wrap', _this22).call(_this22);

        return _this22;
    }

    _createClass(Sphere, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Sphere.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.SphereGeometry(params.geometry.radius, params.geometry.segmentA, params.geometry.segmentB), material, params.mass);

                resolve();
            });
        }
    }]);

    return Sphere;
}(WHS.Shape);

WHS.World.prototype.Sphere = function(params) {
    var object = new WHS.Sphere(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS tetrahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Tetrahedron = function(_WHS$Shape16) {
    _inherits(Tetrahedron, _WHS$Shape16);

    /**
     * Creates a tetrahedron
     *
     * @param {Object} params - Tetrahedron options
     * @param {Object} params.geometry - Tetrahedron geometry options
     * @param {Number} params.geometry.radius - Tetrahedron radius
     * @param {Number} params.geometry.detail - Tetrahedron detail
     * @param {Material} params.material - Tetrahedron material
     * @param {Number} params.mass - Tetrahedron mass
     */

    function Tetrahedron() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tetrahedron);

        var _this23 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tetrahedron).call(this, params, "tetrahedron"));

        WHS.API.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

        _this23.build(params);

        _get(Object.getPrototypeOf(Tetrahedron.prototype), 'wrap', _this23).call(_this23);

        return _this23;
    }

    _createClass(Tetrahedron, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Tetrahedron.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.TetrahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass);

                resolve();
            });
        }
    }]);

    return Tetrahedron;
}(WHS.Shape);

WHS.World.prototype.Tetrahedron = function(params) {
    var object = new WHS.Tetrahedron(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS text
 *
 * @extends WHS.Shape
 */

WHS.Text = function(_WHS$Shape17) {
    _inherits(Text, _WHS$Shape17);

    /**
     * Creates 3D text
     *
     * @param {Object} params - Text options
     * @param {Object} params.geometry - Text geometry options
     * @param {String} params.geometry.text - Text to display
     * @param {Number} params.geometry.parameters.size - Text size
     * @param {Number} params.geometry.parameters.height - Text height
     * @param {Number} params.geometry.parameters.curveSegments - Text curve segments
     * @param {Font} params.geometry.parameters.font - Text font
     * @param {Boolean} params.geometry.parameters.bevelEnabled - Whether or not to bevel text
     * @param {Number} params.geometry.parameters.bevelThickness - Text bevel thickness
     * @param {Number} params.geometry.parameters.bevelSize - Text bevel size
     * @param {Material} params.material - Text material
     * @param {Number} params.mass - Text mass
     */

    function Text() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Text);

        var _this24 = _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, params, "text"));

        WHS.API.extend(params.geometry, {

            text: "Hello World!",

            parameters: {
                size: 12,
                height: 50,
                curveSegments: 12,
                font: new THREE.Font(),
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8
            }

        });

        _this24.build(params);

        _get(Object.getPrototypeOf(Text.prototype), 'wrap', _this24).call(_this24, "wait");

        return _this24;
    }

    _createClass(Text, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Text.prototype), '_initMaterial', this).call(this, params.material);

            var promise = new Promise(function(resolve, reject) {

                WHS.API.loadFont(params.geometry.parameters.font, function(font) {

                    params.geometry.parameters.font = font;

                    var mesh = scope.physics ? Physijs.ConcaveMesh : THREE.Mesh;

                    _scope.mesh = new mesh(new THREE.TextGeometry(params.geometry.text, params.geometry.parameters), material, params.mass);

                    resolve();
                });
            });

            _get(Object.getPrototypeOf(Text.prototype), 'wait', this).call(this, promise);

            return promise;
        }
    }]);

    return Text;
}(WHS.Shape);

WHS.World.prototype.Text = function(params) {
    var object = new WHS.Text(params);

    object.addTo(this, "wait");

    return object;
};

/**
 * WhitestormJS torus shape
 *
 * @extends WHS.Shape
 */

WHS.Torus = function(_WHS$Shape18) {
    _inherits(Torus, _WHS$Shape18);

    /**
     * Creates a torus
     *
     * @param {Object} params - Torus options
     * @param {Object} params.geometry - Torus geometry options
     * @param {Number} params.geometry.radius - Torus radius
     * @param {Number} params.geometry.tube - Torus tube size
     * @param {Number} params.geometry.radialSegments - Amount of radial segments
     * @param {Number} params.geometry.tubularSegments - Amount of tubular segments
     * @param {Number} params.geometry.arc - Torus arc
     * @param {Material} params.material - Torus material
     * @param {Number} params.mass - Torus mass
     */

    function Torus() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Torus);

        var _this25 = _possibleConstructorReturn(this, Object.getPrototypeOf(Torus).call(this, params, "torus"));

        WHS.API.extend(params.geometry, {

            radius: 100,
            tube: 40,
            radialSegments: 8,
            tubularSegments: 6,
            arc: Math.PI * 2

        });

        _this25.build(params);

        _get(Object.getPrototypeOf(Torus.prototype), 'wrap', _this25).call(_this25);

        return _this25;
    }

    _createClass(Torus, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Torus.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.TorusGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.arc), material, params.mass);

                resolve();
            });
        }
    }]);

    return Torus;
}(WHS.Shape);

WHS.World.prototype.Torus = function(params) {
    var object = new WHS.Torus(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS torus knot
 *
 * @extends WHS.Shape
 */

WHS.Torusknot = function(_WHS$Shape19) {
    _inherits(Torusknot, _WHS$Shape19);

    /**
     * Creates a torus knot
     *
     * @param {Object} params - Knot options
     * @param {Object} params.geometry - Knot geometry options
     * @param {Number} params.geometry.radius - Knot radius
     * @param {Number} params.geometry.tube - Knot tube size
     * @param {Number} params.geometry.radialSegments - Amount of radial segments
     * @param {Number} params.geometry.tubularSegments - Amount of tubular segments
     * @param {Number} params.geometry.p - P
     * @param {Number} params.geometry.q - Q
     * @param {Number} params.geometry.heightScale - Knot height scale
     */

    function Torusknot() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Torusknot);

        var _this26 = _possibleConstructorReturn(this, Object.getPrototypeOf(Torusknot).call(this, params, "Torusknot"));

        WHS.API.extend(params.geometry, {

            radius: 100,
            tube: 40,
            radialSegments: 64,
            tubularSegments: 8,
            p: 2,
            q: 3,
            heightScale: 1

        });

        _this26.build(params);

        _get(Object.getPrototypeOf(Torusknot.prototype), 'wrap', _this26).call(_this26);

        return _this26;
    }

    _createClass(Torusknot, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Torusknot.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.TorusKnotGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.p, params.geometry.q, params.geometry.heightScale), material, params.mass);

                resolve();
            });
        }
    }]);

    return Torusknot;
}(WHS.Shape);

WHS.World.prototype.Torusknot = function(params) {
    var object = new WHS.Torusknot(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS tube shape
 *
 * @extends WHS.Shape
 */

WHS.Tube = function(_WHS$Shape20) {
    _inherits(Tube, _WHS$Shape20);

    /**
     * Creates a tube
     *
     * @param {Object} params - Tube options
     * @param {Object} params.geometry - Tube geometry options
     * @param {Number} params.geometry.path - Tube path
     * @param {Number} params.geometry.segments - Tube segments
     * @param {Number} params.geometry.radius - Tube radius
     * @param {Number} params.geometry.radiusSegments - Amount of radius segments
     * @param {Boolean} params.geometry.closed - Whether or not the tube is closed
     * @param {Material} params.material - Tube material
     * @param {Number} params.mass - Tube mass
     */

    function Tube() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tube);

        var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tube).call(this, params, "tube"));

        WHS.API.extend(params.geometry, {

            path: options.geometryOptions.path ? new _this27.CustomSinCurve(100) : false,
            segments: 20,
            radius: 2,
            radiusSegments: 8,
            closed: false

        });

        _this27.build(params);

        _get(Object.getPrototypeOf(Tube.prototype), 'wrap', _this27).call(_this27);

        return _this27;
    }

    _createClass(Tube, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this,
                mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
                material = _get(Object.getPrototypeOf(Tube.prototype), '_initMaterial', this).call(this, params.material);

            return new Promise(function(resolve, reject) {
                _scope.mesh = new mesh(new THREE.TubeGeometry(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed), material, params.mass);

                resolve();
            });
        }
    }, {
        key: 'CustomSinCurve',
        get: function get() {

            return THREE.Curve.create(function(scale) {
                //custom curve constructor
                this.scale = scale || 1;
            }, function(t) {
                //getPoint: t is between 0-1
                var tx = t * 3 - 1.5,
                    ty = Math.sin(2 * Math.PI * t),
                    tz = 0;

                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            });
        }
    }]);

    return Tube;
}(WHS.Shape);

WHS.World.prototype.Tube = function(params) {
    var object = new WHS.Tube(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS ambient light.
 *
 * @extends WHS.Light
 */
WHS.AmbientLight = function(_WHS$Light) {
    _inherits(AmbientLight, _WHS$Light);

    /**
     * Ambient light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     */

    function AmbientLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, AmbientLight);

        var _this28 = _possibleConstructorReturn(this, Object.getPrototypeOf(AmbientLight).call(this, params, "ambientlight"));

        _this28.build(params);

        _get(Object.getPrototypeOf(AmbientLight.prototype), 'wrap', _this28).call(_this28, "noshadows");

        return _this28;
    }

    _createClass(AmbientLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.AmbientLight(params.light.color, params.light.intensity);

                resolve();
            });
        }
    }]);

    return AmbientLight;
}(WHS.Light);

WHS.World.prototype.AmbientLight = function(params) {
    var object = new WHS.AmbientLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS directional light.
 *
 * @extends WHS.Light
 */
WHS.DirectionalLight = function(_WHS$Light2) {
    _inherits(DirectionalLight, _WHS$Light2);

    /**
     * Directional light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     */

    function DirectionalLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, DirectionalLight);

        var _this29 = _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalLight).call(this, params, "directionallight"));

        _this29.build(params);

        _get(Object.getPrototypeOf(DirectionalLight.prototype), 'wrap', _this29).call(_this29);
        _get(Object.getPrototypeOf(DirectionalLight.prototype), 'wrapShadow', _this29).call(_this29);

        return _this29;
    }

    _createClass(DirectionalLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.DirectionalLight(params.light.color, params.light.intensity);

                if (params.helper) _scope.helper = new THREE.DirectionalLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);

                resolve();
            });
        }
    }]);

    return DirectionalLight;
}(WHS.Light);

WHS.World.prototype.DirectionalLight = function(params) {
    var object = new WHS.DirectionalLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS hemisphere light.
 *
 * @extends WHS.Light
 */
WHS.HemisphereLight = function(_WHS$Light3) {
    _inherits(HemisphereLight, _WHS$Light3);

    /**
     * Hemisphere light.
     *
     * @param {Object} params.light.skyColor - Light sky color.
     * @param {Object} params.light.groundColor - Light ground color.
     * @param {Object} params.light.intensity - Light intensity.
     */

    function HemisphereLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, HemisphereLight);

        var _this30 = _possibleConstructorReturn(this, Object.getPrototypeOf(HemisphereLight).call(this, params, "hemispherelight"));

        _this30.build(params);

        _get(Object.getPrototypeOf(HemisphereLight.prototype), 'wrap', _this30).call(_this30);
        _get(Object.getPrototypeOf(HemisphereLight.prototype), 'wrapShadow', _this30).call(_this30);

        return _this30;
    }

    _createClass(HemisphereLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.HemisphereLight(params.light.skyColor, params.light.groundColor, params.light.intensity);

                if (params.helper) _scope.helper = new THREE.HemisphereLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);

                resolve();
            });
        }
    }]);

    return HemisphereLight;
}(WHS.Light);

WHS.World.prototype.HemisphereLight = function(params) {
    var object = new WHS.HemisphereLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS default light.
 *
 * @extends WHS.Light
 */
WHS.NormalLight = function(_WHS$Light4) {
    _inherits(NormalLight, _WHS$Light4);

    /**
     * Normal light.
     *
     * @param {Object} params.light.color - Light color.
     */

    function NormalLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, NormalLight);

        var _this31 = _possibleConstructorReturn(this, Object.getPrototypeOf(NormalLight).call(this, params, "normallight"));

        _this31.build(params);

        _get(Object.getPrototypeOf(NormalLight.prototype), 'wrap', _this31).call(_this31);
        _get(Object.getPrototypeOf(NormalLight.prototype), 'wrapShadow', _this31).call(_this31);

        return _this31;
    }

    _createClass(NormalLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.Light(params.light.color);

                resolve();
            });
        }
    }]);

    return NormalLight;
}(WHS.Light);

WHS.World.prototype.NormalLight = function(params) {
    var object = new WHS.NormalLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS point light.
 *
 * @extends WHS.Light
 */
WHS.PointLight = function(_WHS$Light5) {
    _inherits(PointLight, _WHS$Light5);

    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.decay - Light decay.
     */

    function PointLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, PointLight);

        var _this32 = _possibleConstructorReturn(this, Object.getPrototypeOf(PointLight).call(this, params, "pointlight"));

        _this32.build(params);

        _get(Object.getPrototypeOf(PointLight.prototype), 'wrap', _this32).call(_this32);
        _get(Object.getPrototypeOf(PointLight.prototype), 'wrapShadow', _this32).call(_this32);

        return _this32;
    }

    _createClass(PointLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.PointLight(params.light.color, params.light.intensity, params.light.distance, params.light.decay);

                if (params.helper) _scope.helper = new THREE.PointLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);

                resolve();
            });
        }
    }]);

    return PointLight;
}(WHS.Light);

WHS.World.prototype.PointLight = function(params) {
    var object = new WHS.PointLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS spot light.
 *
 * @extends WHS.Light
 */
WHS.SpotLight = function(_WHS$Light6) {
    _inherits(SpotLight, _WHS$Light6);

    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.angle - Light angle.
     * @param {Object} params.light.exponent - Light exponent.
     * @param {Object} params.light.decay - Light decay.
     */

    function SpotLight() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SpotLight);

        var _this33 = _possibleConstructorReturn(this, Object.getPrototypeOf(SpotLight).call(this, params, "spotlight"));

        _this33.build(params);

        _get(Object.getPrototypeOf(SpotLight.prototype), 'wrap', _this33).call(_this33);
        _get(Object.getPrototypeOf(SpotLight.prototype), 'wrapShadow', _this33).call(_this33);

        return _this33;
    }

    _createClass(SpotLight, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.light = new THREE.SpotLight(params.light.color, params.light.intensity, params.light.distance, params.light.angle, params.light.exponent, params.light.decay);

                if (params.helper) _scope.helper = new THREE.SpotLightHelper(_scope.light);

                resolve();
            });
        }
    }]);

    return SpotLight;
}(WHS.Light);

WHS.World.prototype.SpotLight = function(params) {
    var object = new WHS.SpotLight(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS cube camera.
 *
 * @extends WHS.Camera
 */
WHS.CubeCamera = function(_WHS$Camera) {
    _inherits(CubeCamera, _WHS$Camera);

    /**
     * Directional light.
     *
     * @param {Object} params.camera.near - Near distance from camera position.
     * @param {Object} params.camera.far - Far distance from camera position.
     * @param {Object} params.camera.cubeResolution - Sets the width of the cube.
     */

    function CubeCamera() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, CubeCamera);

        var _this34 = _possibleConstructorReturn(this, Object.getPrototypeOf(CubeCamera).call(this, params, "cubecamera"));

        _this34.build(params);

        _get(Object.getPrototypeOf(CubeCamera.prototype), 'wrap', _this34).call(_this34);

        return _this34;
    }

    _createClass(CubeCamera, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.camera = new THREE.CubeCamera(params.camera.near, params.camera.far, params.camera.cubeResolution);

                resolve();
            });
        }
    }]);

    return CubeCamera;
}(WHS.Camera);

WHS.World.prototype.CubeCamera = function(params) {
    var camera = new WHS.CubeCamera(params);

    camera.addTo(this);

    return camera;
};

/**
 * WhitestormJS ortographic camera.
 *
 * @extends WHS.Camera
 */
WHS.OrtographicCamera = function(_WHS$Camera2) {
    _inherits(OrtographicCamera, _WHS$Camera2);

    /**
     * Ortographic camera.
     *
     * @param {Object} params.camera.left - Left distance.
     * @param {Object} params.camera.right - Right distance.
     * @param {Object} params.camera.top - Top distance.
     * @param {Object} params.camera.bottom - Bottom distance.
     * @param {Object} params.camera.near - Near distance.
     * @param {Object} params.camera.far - Far distance.
     */

    function OrtographicCamera() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, OrtographicCamera);

        var _this35 = _possibleConstructorReturn(this, Object.getPrototypeOf(OrtographicCamera).call(this, params, "ortographiccamera"));

        _this35.build(params);

        _get(Object.getPrototypeOf(OrtographicCamera.prototype), 'wrap', _this35).call(_this35);

        return _this35;
    }

    _createClass(OrtographicCamera, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.camera = new THREE.OrtographicCamera(params.camera.left, params.camera.right, params.camera.top, params.camera.bottom, params.camera.near, params.camera.far);

                resolve();
            });
        }
    }]);

    return OrtographicCamera;
}(WHS.Camera);

WHS.World.prototype.OrtographicCamera = function(params) {
    var camera = new WHS.OrtographicCamera(params);

    camera.addTo(this);

    return camera;
};

/**
 * WhitestormJS perspective light.
 *
 * @extends WHS.Light
 */
WHS.PerspectiveCamera = function(_WHS$Camera3) {
    _inherits(PerspectiveCamera, _WHS$Camera3);

    /**
     * Perspective camera.
     *
     * @param {Object} params.camera.fov - Fov.
     * @param {Object} params.camera.aspect - Aspect.
     * @param {Object} params.camera.near - Near distance.
     * @param {Object} params.camera.far - Far distance.
     */

    function PerspectiveCamera() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, PerspectiveCamera);

        var _this36 = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectiveCamera).call(this, params, "perspectivecamera"));

        _this36.build(params);

        _get(Object.getPrototypeOf(PerspectiveCamera.prototype), 'wrap', _this36).call(_this36);

        return _this36;
    }

    _createClass(PerspectiveCamera, [{
        key: 'build',
        value: function build() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _scope = this;

            return new Promise(function(resolve, reject) {
                _scope.camera = new THREE.PerspectiveCamera(params.camera.fov, params.camera.aspect, params.camera.near, params.camera.far);

                resolve();
            });
        }
    }]);

    return PerspectiveCamera;
}(WHS.Camera);

WHS.World.prototype.PerspectiveCamera = function(params) {
    var camera = new WHS.PerspectiveCamera(params);

    camera.addTo(this);

    return camera;
};

/**
 * First person controls.
 *
 * @param {Object} object - *WHS* figure/object.
 * @param {Object} params - Controls parameter objects.
 */

var PI_2 = Math.PI / 2;

WHS.World.prototype.FPSControls = function(object) {

    'use strict';

    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var target = WHS.API.extend(params, {
        block: document.getElementById('blocker'),
        speed: 1,
        ypos: 1
    });

    this.controls = new function(camera, mesh, params) {

        /* Velocity properties */
        var velocityFactor = 1,
            runVelocity = 0.25;

        mesh.setAngularFactor({
            x: 0,
            y: 0,
            z: 0
        });

        /* Init */
        var scope = this,
            player = mesh,
            pitchObject = new THREE.Object3D();

        pitchObject.add(camera.camera);

        var yawObject = new THREE.Object3D();

        yawObject.position.y = params.ypos; // eyes are 2 meters above the ground
        yawObject.add(pitchObject);

        var quat = new THREE.Quaternion(),
            moveForward = false,
            moveBackward = false,
            moveLeft = false,
            moveRight = false,
            canJump = false;

        player.addEventListener("collision", function(other_object, v, r, contactNormal) {
            if (contactNormal.y < 0.5) // Use a "good" threshold value between 0 and 1 here!
                canJump = true;
        });

        function onMouseMove(event) {
            if (scope.enabled === false) return;

            var movementX = event.movementX || event.mozMovementX || event.getMovementX() || 0,
                movementY = event.movementY || event.mozMovementY || event.getMovementY() || 0;

            yawObject.rotation.y -= movementX * 0.002, pitchObject.rotation.x -= movementY * 0.002;

            pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
        };

        function onKeyDown(event) {

            switch (event.keyCode) {

                case 38: // up
                case 87:
                    // w
                    moveForward = true;
                    break;

                case 37: // left
                case 65:
                    // a
                    moveLeft = true;
                    break;

                case 40: // down
                case 83:
                    // s
                    moveBackward = true;
                    break;

                case 39: // right
                case 68:
                    // d
                    moveRight = true;
                    break;

                case 32:
                    // space
                    if (canJump == true) {

                        player.applyCentralImpulse({
                            x: 0,
                            y: 300,
                            z: 0
                        });
                    }

                    canJump = false;

                    break;

                case 16:
                    // shift

                    runVelocity = 0.5;
                    break;

            }
        };

        function onKeyUp(event) {
            switch (event.keyCode) {

                case 38: // up
                case 87:
                    // w
                    moveForward = false;
                    break;

                case 37: // left
                case 65:
                    // a
                    moveLeft = false;
                    break;

                case 40: // down
                case 83:
                    // a
                    moveBackward = false;
                    break;

                case 39: // right
                case 68:
                    // d
                    moveRight = false;
                    break;

                case 16:
                    // shift
                    runVelocity = 0.25;
                    break;

            }
        };

        document.body.addEventListener('mousemove', onMouseMove, false);
        document.body.addEventListener('keydown', onKeyDown, false);
        document.body.addEventListener('keyup', onKeyUp, false);

        this.enabled = false;

        this.getObject = function() {
            return yawObject;
        };

        this.getDirection = function(targetVec) {
            targetVec.set(0, 0, -1);
            quat.multiplyVector3(targetVec);
        };

        // Moves the camera to the Cannon.js object position
        // and adds velocity to the object if the run key is down.
        var inputVelocity = new THREE.Vector3(),
            euler = new THREE.Euler();

        this.update = function(delta) {

            var moveVec = new THREE.Vector3();

            if (scope.enabled === false) return;

            delta = delta || 0.5;
            delta = Math.min(delta, 0.5);

            inputVelocity.set(0, 0, 0);

            var speed = velocityFactor * delta * params.speed * runVelocity;

            if (moveForward) {
                inputVelocity.z = -speed;
            }

            if (moveBackward) {
                inputVelocity.z = speed;
            }

            if (moveLeft) {
                inputVelocity.x = -speed;
            }

            if (moveRight) {
                inputVelocity.x = speed;
            }

            // Convert velocity to world coordinates
            euler.x = pitchObject.rotation.x, euler.y = yawObject.rotation.y, euler.order = "XYZ";

            quat.setFromEuler(euler);

            inputVelocity.applyQuaternion(quat);

            player.applyCentralImpulse({
                x: inputVelocity.x * 10,
                y: 0,
                z: inputVelocity.z * 10
            });
            player.setAngularVelocity({
                x: inputVelocity.z * 10,
                y: 0,
                z: -inputVelocity.x * 10
            });
            player.setAngularFactor({
                x: 0,
                y: 0,
                z: 0
            });

            yawObject.position.copy(player.position);
        };
    }(this._camera, object.mesh, target);

    var controls = this.controls;

    WHS.API.merge(this.scene, this.controls.getObject());

    if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {

        var element = document.body;

        this.pointerlockchange = function() {
            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                controls.enabled = true;

                target.block.fadeOut();
            } else {

                controls.enabled = false;

                target.block.fadeIn();
            }
        };
    } else {

        console.warn("Your browser does not support the PointerLock WHS.API.");
    }

    document.addEventListener('pointerlockchange', this.pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);

    this.pointerlockerror = function() {
        console.warn("Pointer lock error.");
    };

    document.addEventListener('pointerlockerror', this.pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);

    target.block.addEventListener('click', function() {

        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        if (/Firefox/i.test(navigator.userAgent)) {

            var fullscreenchange = function fullscreenchange() {
                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);

                    element.requestPointerLock();
                }
            };

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen();
        } else element.requestPointerLock();
    });
};

/**
 * Orbit controld for scene.
 *
 * @param {Object} object - Object followed by camera.
 */
WHS.World.prototype.OrbitControls = function(object) {

    this.controls = new THREE.OrbitControls(this._camera.camera, this._renderer.domElement);

    if (object) {

        if (object._whsobject) {

            var target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);

            this.controls.target = target;
        } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == "object") this.controls.target.copy(target);
        else console.error("Object must be a THREE.JS vector! @OrbitControls");
    }
};

/**
 * Three.js fog effect.
 *
 */
WHS.Fog = function() {
    /**
     * Creates fog.
     *
     * @param {Object} params - Optional fog parameters.
     * @param {Color} params.hex - Fog color.
     * @param {Number} params.near - The minimum distance to start fog.
     * @param {Number} params.far - The maximum distance to start fog.
     */

    function Fog() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Fog);

        WHS.API.extend(params, {

            hex: 0x000000,
            near: 1,
            far: 1000

        });

        this.fog = new THREE.Fog(params.hex, params.near, params.far);

        this.type = "fog";
    }

    /**
     * Add fog to scene.
     */

    _createClass(Fog, [{
        key: 'addTo',
        value: function addTo(root) {

            root.scene.fog = this.fog;
        }
    }]);

    return Fog;
}();

WHS.World.prototype.Fog = function(params) {
    var object = new WHS.Fog(params);

    object.addTo(this);

    return object;
};

/**
 * Three.js FogExp2 effect.
 */
WHS.FogExp2 = function() {
    /**
     * Create fog (exp2).
     *
     * @param {Object} params - Optional fog parameters.
     * @param {Color} params.hex - Fog color.
     * @param {Number} params.density - Defines how fast the fog will grow dense.
     */

    function FogExp2() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, FogExp2);

        WHS.API.extend(params, {

            hex: 0x000000,
            density: 0.00025

        });

        this.fog = new THREE.FogExp2(params.hex, params.density);

        this.type = "fogexp2";
    }

    /**
     * Add fog to scene.
     */

    _createClass(FogExp2, [{
        key: 'addTo',
        value: function addTo(root) {

            root.scene.fog = this.fog;
        }
    }]);

    return FogExp2;
}();

WHS.World.prototype.FogExp2 = function(params) {
    var object = new WHS.FogExp2(params);

    object.addTo(this);

    return object;
};

/**
 * WhitestormJS skybox.
 *
 * @extends WHS.Shape
 */

WHS.Skybox = function(_WHS$Shape21) {
    _inherits(Skybox, _WHS$Shape21);

    /**
     * Create a skybox.
     *
     * @param {Object} params - Skybox options
     * @param {String} params.skyType - Skybox type (box/sphere)
     * @param {String} params.detail - Skybox image extension (.png, .jpg, etc.)
     * @param {Number} params.radius - Skybox radius
     * @param {Boolean} params.fog - Skybox fog
     * @param {String} params.path - Skybox image path
     */

    function Skybox() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Skybox);

        var _this37 = _possibleConstructorReturn(this, Object.getPrototypeOf(Skybox).call(this, params, "skybox"));

        WHS.API.extend(params, {

            skyType: "box",
            detail: ".png",
            radius: 10,
            fog: true,

            path: ""

        });

        var skyGeometry, skyMat;

        switch (params.skyType) {
            case "box":

                var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];

                skyGeometry = new THREE.CubeGeometry(params.radius, params.radius, params.radius);

                var matArray = [];

                for (var i = 0; i < 6; i++) {

                    matArray.push(new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture(params.path + directions[i] + params.imgSuffix),
                        side: THREE.BackSide,
                        fog: params.fog
                    }));
                }

                skyMat = new THREE.MeshFaceMaterial(matArray);

                break;
            case "sphere":

                skyGeometry = new THREE.SphereGeometry(params.radius / 2, 60, 40);

                skyMat = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(params.path + params.imgSuffix),
                    side: THREE.BackSide,
                    fog: params.fog
                });

                break;
        }

        _this37.mesh = new THREE.Mesh(skyGeometry, skyMat);
        _this37.mesh.renderDepth = 1000.0;

        _get(Object.getPrototypeOf(Skybox.prototype), 'wrap', _this37).call(_this37);

        return _this37;
    }

    return Skybox;
}(WHS.Shape);

WHS.World.prototype.Skybox = function(params) {
    var object = new WHS.Skybox(params);

    object.addTo(this);

    return object;
};