var app = require('express').createServer();
var io = require('socket.io')(app);

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
});
