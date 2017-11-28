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
    // Register this new mesh with our objects list
    var object = new Object(data);
    data.id = object.id;
    
    // Send all Data to other clients, it isn't meant to be interpreted by the server
    socket.emit('addMesh', data); 
  }
  
  function onRemoveMesh(data) {
    
  }
  
  // ------------------------- //
  
  // Position/Rotation Events
  function onNewPosition(data) {
    
  }
  
  function onNewRotation(data) {
    
  }
  
  // ------------------------- //
  
  // Material/Geometry Events
  function onNewMaterial(data) {
    
  }
  
  function onNewGeometry(data) {
    
  }
  
  // ------------------------- //
});


var Object = function(data) {
  this.options = data.options;
  this.Type = data.type;
  
  this.id = uuid();
  
  this.mesh = new this.Type(this.options);
}
