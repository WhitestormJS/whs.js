/* global CANNON,THREE,Detector */

/**
 * Adds Three.js primitives into the scene where all the Cannon bodies and shapes are.
 * @class CannonDebugRenderer
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 * @param {object} [options]
 */
THREE.CannonDebugRenderer = function(scene, world, options){
    options = options || {};

    this.scene = scene;
    this.world = world;

    this._meshes = [];

    this._material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this._sphereGeometry = new THREE.SphereGeometry(1);
    this._boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this._planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    this._cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 10, 10 );
};

THREE.CannonDebugRenderer.prototype = {

    tmpVec0: new CANNON.Vec3(),
    tmpVec1: new CANNON.Vec3(),
    tmpVec2: new CANNON.Vec3(),
    tmpQuat0: new CANNON.Vec3(),

    update: function(){

        var bodies = this.world.bodies;
        var meshes = this._meshes;
        var shapeWorldPosition = this.tmpVec0;
        var shapeWorldQuaternion = this.tmpQuat0;

        var meshIndex = 0;

        for (var i = 0; i !== bodies.length; i++) {
            var body = bodies[i];

            for (var j = 0; j !== body.shapes.length; j++) {
                var shape = body.shapes[j];

                this._updateMesh(meshIndex, body, shape);

                var mesh = meshes[meshIndex];

                if(mesh){

                    // Get world position
                    body.quaternion.vmult(body.shapeOffsets[j], shapeWorldPosition);
                    body.position.vadd(shapeWorldPosition, shapeWorldPosition);

                    // Get world quaternion
                    body.quaternion.mult(body.shapeOrientations[j], shapeWorldQuaternion);

                    // Copy to meshes
                    mesh.position.copy(shapeWorldPosition);
                    mesh.quaternion.copy(shapeWorldQuaternion);
                }

                meshIndex++;
            }
        }

        for(var i = meshIndex; i < meshes.length; i++){
            var mesh = meshes[i];
            if(mesh){
                this.scene.remove(mesh);
            }
        }

        meshes.length = meshIndex;
    },

    _updateMesh: function(index, body, shape){
        var mesh = this._meshes[index];
        if(!this._typeMatch(mesh, shape)){
            if(mesh){
                this.scene.remove(mesh);
            }
            mesh = this._meshes[index] = this._createMesh(shape);
        }
        this._scaleMesh(mesh, shape);
    },

    _typeMatch: function(mesh, shape){
        if(!mesh){
            return false;
        }
        var geo = mesh.geometry;
        return (
            (geo instanceof THREE.SphereGeometry && shape instanceof CANNON.Sphere) ||
            (geo instanceof THREE.BoxGeometry && shape instanceof CANNON.Box) ||
            (geo instanceof THREE.PlaneGeometry && shape instanceof CANNON.Plane) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.ConvexPolyhedron) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.Trimesh) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.Heightfield)
        );
    },

    _createMesh: function(shape){
        var mesh;
        var material = this._material;

        switch(shape.type){

        case CANNON.Shape.types.SPHERE:
            mesh = new THREE.Mesh(this._sphereGeometry, material);
            break;

        case CANNON.Shape.types.BOX:
            mesh = new THREE.Mesh(this._boxGeometry, material);
            break;

        case CANNON.Shape.types.PLANE:
            mesh = new THREE.Mesh(this._planeGeometry, material);
            break;

        case CANNON.Shape.types.CONVEXPOLYHEDRON:
            // Create mesh
            var geo = new THREE.Geometry();

            // Add vertices
            for (var i = 0; i < shape.vertices.length; i++) {
                var v = shape.vertices[i];
                geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
            }

            for(var i=0; i < shape.faces.length; i++){
                var face = shape.faces[i];

                // add triangles
                var a = face[0];
                for (var j = 1; j < face.length - 1; j++) {
                    var b = face[j];
                    var c = face[j + 1];
                    geo.faces.push(new THREE.Face3(a, b, c));
                }
            }
            geo.computeBoundingSphere();
            geo.computeFaceNormals();

            mesh = new THREE.Mesh(geo, material);
            shape.geometryId = geo.id;
            break;

        case CANNON.Shape.types.TRIMESH:
            var geometry = new THREE.Geometry();
            var v0 = this.tmpVec0;
            var v1 = this.tmpVec1;
            var v2 = this.tmpVec2;
            for (var i = 0; i < shape.indices.length / 3; i++) {
                shape.getTriangleVertices(i, v0, v1, v2);
                geometry.vertices.push(
                    new THREE.Vector3(v0.x, v0.y, v0.z),
                    new THREE.Vector3(v1.x, v1.y, v1.z),
                    new THREE.Vector3(v2.x, v2.y, v2.z)
                );
                var j = geometry.vertices.length - 3;
                geometry.faces.push(new THREE.Face3(j, j+1, j+2));
            }
            geometry.computeBoundingSphere();
            geometry.computeFaceNormals();
            mesh = new THREE.Mesh(geometry, material);
            shape.geometryId = geometry.id;
            break;

        case CANNON.Shape.types.HEIGHTFIELD:
            var geometry = new THREE.Geometry();

            var v0 = this.tmpVec0;
            var v1 = this.tmpVec1;
            var v2 = this.tmpVec2;
            for (var xi = 0; xi < shape.data.length - 1; xi++) {
                for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
                    for (var k = 0; k < 2; k++) {
                        shape.getConvexTrianglePillar(xi, yi, k===0);
                        v0.copy(shape.pillarConvex.vertices[0]);
                        v1.copy(shape.pillarConvex.vertices[1]);
                        v2.copy(shape.pillarConvex.vertices[2]);
                        v0.vadd(shape.pillarOffset, v0);
                        v1.vadd(shape.pillarOffset, v1);
                        v2.vadd(shape.pillarOffset, v2);
                        geometry.vertices.push(
                            new THREE.Vector3(v0.x, v0.y, v0.z),
                            new THREE.Vector3(v1.x, v1.y, v1.z),
                            new THREE.Vector3(v2.x, v2.y, v2.z)
                        );
                        var i = geometry.vertices.length - 3;
                        geometry.faces.push(new THREE.Face3(i, i+1, i+2));
                    }
                }
            }
            geometry.computeBoundingSphere();
            geometry.computeFaceNormals();
            mesh = new THREE.Mesh(geometry, material);
            shape.geometryId = geometry.id;
            break;
        }

        if(mesh){
            this.scene.add(mesh);
        }

        return mesh;
    },

    _scaleMesh: function(mesh, shape){
        switch(shape.type){

        case CANNON.Shape.types.SPHERE:
            var radius = shape.radius;
            mesh.scale.set(radius, radius, radius);
            break;

        case CANNON.Shape.types.BOX:
            mesh.scale.copy(shape.halfExtents);
            mesh.scale.multiplyScalar(2);
            break;

        case CANNON.Shape.types.CONVEXPOLYHEDRON:
            mesh.scale.set(1,1,1);
            break;

        case CANNON.Shape.types.TRIMESH:
            mesh.scale.copy(shape.scale);
            break;

        case CANNON.Shape.types.HEIGHTFIELD:
            mesh.scale.set(1,1,1);
            break;

        }
    }
};
