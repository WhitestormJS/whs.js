/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addObject = function(figureType, options) {
    console.log('No Error !')
    'use strict';
    var scope = new api.construct(this, options, figureType),
        mass = options.onlyvis ? scope._target.mass : 1,
        fprops;

    scope.materialType = api.loadMaterial(options.materialOptions)._material;
    options.geometryOptions = options.geometryOptions || {}
    
    switch (figureType) {
        case "sphere":

            api.extend(options.geometryOptions, {

                radius: 1,
                segmentA: 32,
                segmentB: 32

            });


            scope.visible = new Physijs.SphereMesh(new THREE.SphereGeometry(
                options.geometryOptions.radius,
                options.geometryOptions.segmentA,
                options.geometryOptions.segmentB
            ), scope.materialType, 10);

            break;
        case "cube":

            api.extend(options.geometryOptions, {

                width: 1,
                height: 1,
                depth: 1

            });

            scope.visible = new Physijs.BoxMesh(new THREE.BoxGeometry(
                options.geometryOptions.width,
                options.geometryOptions.height,
                options.geometryOptions.depth
            ), scope.materialType, mass);

            break;
        case "cylinder":

            api.extend(options.geometryOptions, {

                radiusTop: 1,
                radiusBottom: 1,
                height: 1,
                radiusSegments: 32

            });

            scope.visible = new Physijs.CylinderMesh(
                new THREE.CylinderGeometry(
                    options.geometryOptions.radiusTop,
                    options.geometryOptions.radiusBottom,
                    options.geometryOptions.height,
                    options.geometryOptions.radiusSegments
                ),
            scope.materialType, mass);

            break;
        case "dodecahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.DodecahedronGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.detail
                ),
            scope.materialType, mass);

            break;
        case "extrude":

            api.extend(options.geometryOptions, {

                shapes: [],
                options: {}

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.ExtrudeGeometry(
                    options.geometryOptions.shapes,
                    options.geometryOptions.options
                ),
            scope.materialType, mass);

            break;
        case "icosahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.IcosahedronGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.detail
                ),
            scope.materialType, mass);

            break;
        case "lathe":

            api.extend(options.geometryOptions, {

                points: [],

            });

            scope.visible = new Physijs.ConvexMesh(new THREE.LatheGeometry(
                options.geometryOptions.points
            ), scope.materialType, mass);

            break;
        case "octahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.OctahedronGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.detail
                ),
            scope.materialType, mass);

            break;
        case "parametric":

            api.extend(options.geometryOptions, {

                func: function() {},
                slices: 10,
                stacks: 10 


            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.ParametricGeometry(
                    options.geometryOptions.func,
                    options.geometryOptions.slices,
                    options.geometryOptions.stacks
                ),
            scope.materialType, mass);

            break;
        case "plane":

            api.extend(options.geometryOptions, {

                width: 1,
                height: 0,
                segments: 32

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.PlaneBufferGeometry(
                    options.geometryOptions.width,
                    options.geometryOptions.height,
                    options.geometryOptions.segments
                ),
            scope.materialType, mass);

            break;
        case "polyhedron":

            api.extend(options.geometryOptions, {

                verticesOfCube: [],
                indicesOfFaces: [],
                radius: 1,
                detail: 1

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.PolyhedronGeometry(
                    options.geometryOptions.verticesOfCube,
                    options.geometryOptions.indicesOfFaces
                ),
            scope.materialType, mass);

            break;
        case "ring":

            api.extend(options.geometryOptions, {

                innerRadius: 2,
                outerRadius: 5,
                thetaSegments: 30,
                phiSegments: 30,
                thetaStart: 0,
                thetaLength: Math.PI * 2

            });

            scope.visible = new Physijs.ConcaveMesh(
                new THREE.TorusGeometry(
                    options.geometryOptions.outerRadius,
                    (options.geometryOptions.outerRadius - options.geometryOptions.innerRadius) / 2,
                    options.geometryOptions.thetaSegments, options.geometryOptions.phiSegments
                ),
            scope.materialType, mass);

            break;
        case "shape":
            
            scope.visible = new THREE.Mesh(
                new THREE.ShapeGeometry(options.geometryOptions.shapes),
                scope.materialType
            );

            scope.onlyvis = true;

            // WARN: console | 2d to 3d.
            console.warn('This is not physic object. 2D!', [scope]);

            break;
        case "tetrahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.visible = new Physijs.ConvexMesh(
                new THREE.TetrahedronGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.detail
                ),
            scope.materialType, mass);

            break;
        case "text":
            if(!(options.geometryOptions.parameters))
                throw new Error("Missing text parameters");
            scope.visible = new Physijs.ConcaveMesh(
                new THREE.TextGeometry(
                    api.extend(options.geometryOptions, {
                        text: "Hello World!"
                    }),
                    api.extend(options.geometryOptions.parameters, {
                        size: 1,
                        height: 50,
                        curveSegments: 1,
                        font: "Adelle",
                        weight: "normal",
                        style: "normal",
                        bevelEnabled: false,
                        bevelThickness: 10,
                        bevelSize: 8
                    })
                ),
            scope.materialType, masss);

            break;
        case "torus":

            api.extend(options.geometryOptions, {

                radius: 100,
                tube: 40,
                radialSegments: 8,
                tubularSegments: 6,
                arc: Math.PI * 2,

            });

            scope.visible = new Physijs.ConcaveMesh(
                new THREE.TorusGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.tube,
                    options.geometryOptions.radialSegments,
                    options.geometryOptions.tubularSegments,
                    options.geometryOptions.arc
                ),
            scope.materialType, mass);

            break;
        case "torusknot":

            api.extend(options.geometryOptions, {

                radius: 100,
                tube: 40,
                radialSegments: 64,
                tubularSegments: 8,
                p: 2,
                q: 3,
                heightScale: 1

            });
            scope.visible = new Physijs.ConvexMesh(
                new THREE.TorusKnotGeometry(
                    options.geometryOptions.radius,
                    options.geometryOptions.tube,
                    options.geometryOptions.radialSegments,
                    options.geometryOptions.tubularSegments,
                    options.geometryOptions.p,
                    options.geometryOptions.q,
                    options.geometryOptions.heightScale
                ),
            scope.materialType, mass);

            break;
        case "tube":

            scope.CustomSinCurve = THREE.Curve.create(

                function(scale) { //custom curve constructor
                    this.scale = scale || 1;
                },

                function(t) { //getPoint: t is between 0-1
                    var tx = t * 3 - 1.5,
                        ty = Math.sin(2 * Math.PI * t),
                        tz = 0;

                    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
                }

            );

            api.extend(options.geometryOptions, {

                path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
                segments: 20,
                radius: 2,
                radiusSegments: 8,
                closed: false,

            });

            scope.visible = new Physijs.ConcaveMesh(
                new THREE.TubeGeometry(
                    options.geometryOptions.path,
                    options.geometryOptions.segments,
                    options.geometryOptions.radius,
                    options.geometryOptions.radiusSegments,
                    options.geometryOptions.closed
                ),
            scope.materialType, masss);

            break;
    }

    scope.addCompoundFace = function() {
        
        this.compoundFace = new THREE.Geometry();
        this.compoundFace.faces.push(new THREE.Face3(0, 1, 2));

        var boundingBox = new THREE.Box3().setFromObject(this.visible),
                boxAround = new THREE.BoxGeometry(
                    boundingBox.max.x - boundingBox.min.x,
                    boundingBox.max.y - boundingBox.min.y,
                    boundingBox.max.z - boundingBox.min.z
                );

        var vec1 = boxAround.vertices[boxAround.faces[7].a]
            .add(this.visible.position);

        var vec2 = boxAround.vertices[boxAround.faces[7].b]
            .add(this.visible.position);

        var vec3 = boxAround.vertices[boxAround.faces[7].c]
            .add(this.visible.position);

        this.compoundFace.vertices.push(vec1);
        this.compoundFace.vertices.push(vec2);
        this.compoundFace.vertices.push(vec3);
        //this.compoundFace.vertices.push(new THREE.Vector3(0,1,2));
    }

    scope.remove = function () {
        return scope.wrap.remove();
    }

    scope.retrieve = function () {
        return scope.wrap.retrieve();
    }

    scope.build(scope.visible);

    scope.wrap = new api.Wrap(scope, scope.visible);

    return scope;
};
