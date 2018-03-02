//-------------------------------------------------------------------------------//
// WhiteStormJS OFFICIAL SERVER.JS # FOR INTERACTING WITH THE NETWORKING MODULE. //
//-------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------//
// NOTE: THIS IS A TEMPLATE INTERACTION. THIS DEFINES THE EVENTS THAT THE        //
// NETWORKING MODULE WILL PASS. IT IS NOT RECOMMENDED TO USE THIS OUT OF THE     //
// BOX WITHOUT ANY ALTERATIONS FOR A FINAL PRODUCT.                              //
//-------------------------------------------------------------------------------//


var app = require('express').createServer();
var io = require('socket.io')(app);
const uuid = require('uuid/v4');

app.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var objects = new Map(); // or = [] ?

io.on('connection', function (socket) {
  socket.on('addMesh', onAddMesh);
  socket.on('removeMesh' onRemoveMesh);
  
  socket.on('newPosition', onNewPosition);
  socket.on('newRotation', onNewRotation);
  
  socket.on('newMaterial', onNewMaterial);
  socket.on('newGeometry', onNewGeometry);
  
  // Add/Remove Events
  function onAddMesh(data) {
    if(data.transform) {
      // Register this new mesh with our objects list
      var object = new Object(data);
    
      objects.add(object); // Add the object to our list
      console.log("Registered new NetworkIdentity Object: ");
      
      socket.broadcast.emit('addMesh', { "options": data, "id": object.id });
    } else {
      // No NetworkTransform, simply send the newMesh data and that's it. Nothing else can be done. (Not even remove it).
      socket.broadcast.emit('addMesh', data);
    }
  }
  
  function onRemoveMesh(data) {
    for(var i = 0; i < objects.length; i++) {
      if(objects[i].id == data.id) {
        objects[i] = null;
        objects.splice(i, 1);
        console.log("Object succesfully removed: " + data.id)
        
        socket.broadcast.emit('removeMesh', data.id);
        return;
      }
    }
    console.log("Unable to remove object " + data.id);
  }
  
  // ------------------------- //
  
  // Position/Rotation Events
  function onNewPosition(data) {
    for(var i = 0; i < objects.length; i++) {
      if(objects[i].id == data.id) {
        objects[i].setPosition(data.x, data.y, data.z);
        socket.broadcast.emit('newPos', data);
        return;
      }
    }
    console.log("Unable to find object " + data.id);
  }
  
  function onNewRotation(data) {
    for(var i = 0; i < objects.length; i++) {
      if(objects[i].id == data.id) {
        objects[i].setRotation(data.x, data.y, data.z);
        socket.broadcast.emit('newRot', data); // Send this
        return;
      }
    }
    console.log("Unable to find object " + data.id);
  }
  
  // ------------------------- //
  
  // Material/Geometry Events
  function onNewMaterial(data) {
    for(var i = 0; i < objects.length; i++) {
      if(objects[i].id == data.id) {
        objects[i].setMaterial(data.material);
        socket.broadcast.emit('newMaterial', data);
        return;
      }
    }
    console.log("Unable to find object " + data.id);
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  TODO: This function isn't supported on the client side of WHS, therefore, it can't be supported here ATM. //
  //  WILL BE ADDING SUPPORT SOON....                                                                           //
  // function onNewGeometry(data) {                                                                             //
  //                                                                                                            //
  // }                                                                                                          //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // ------------------------- //
});

///////////////////////////////////////
// - UTILITY FUNCTIONS AND CLASSES - //
///////////////////////////////////////


var Object = function(data) {
  this.options = data.options;
  this.Type = data.type;
  
  this.position = data.options.position;
  this.rotation = data.options.rotation;
  this.material = data.options.material;
  
  this.id = uuid();
  
  this.mesh = new this.Type(this.options);
  
  this.setPosition = function(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    
    this.mesh.position = this.position;
  }
  
  this.setRotation = function(x, y, z) {
    this.rotation.x = x;
    this.rotation.y = y;
    this.rotation.z = z;
    
    this.mesh.rotation = this.rotation;
  }
  
  this.setMaterial = function(newMat) {
    this.material = newMat;
    
    this.mesh.material = newMat;
  }
}
