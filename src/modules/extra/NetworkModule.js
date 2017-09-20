import * as io from 'socket.io-client';
import * as patch from 'socketio-wildcard';



/**
 * @class NetworkModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption>Creating a network module, and passing it to the app.</caption>
 * new App([
 *   new NetworkModule('localhost', 3000, 'http')
 * ]);
 */
 
export class NetworkModule {
 constructor(params = {}) {
   this.params = Object.assign({
     hostname: window.location.hostname,
     port: window.location.port,
     scheme: window.location.protocol
   }, params);

   // Variables
   this.objects = new Map();
   this.commands = new Map();

   // Server Management
   this.server = this.params.scheme + '://' + this.params.host + ':' + this.params.port;
   this.socket = this.connect(this.server);


   // Events
   this.socket.on('connect', () => {
     console.info('Socket connected to ' + this.server);
   });

   this.socket.on('*', (data) => {
     checkEvents(data);
   });

   this.on('disconnect', () => {
     console.info('Socket disconnected from ' + this.server);
   });

 }

 manager(manager) {
  manager.add('socket', this.socket); 
 }

 /**
 * @method connect
 * @instance
 * @description Connects to the socket server using the provided configuration in the constructor.
 */
 connect(server) {
   this.socket = io(server);
   patch(io.Manager);
   patch(this.socket);
 }

 /**
 * @method command
 * @instance
 * @description Creates a command that is checked for (custom event).
 */
 command(command, callback) {
  this.commands.set(command.toString(), callback);
 }

 /**
 * @method checkEvents
 * @instance
 * @description Called when socket.io-client receives an event, checks event type and data.
 */
 checkEvents(data) {
   if(data.event == 'update') {
     // DO something
     return;
   } else {
       var command = this.commands.get(data.event);
       command();
   }
  }
  
  
  integrate(self) {
    // Functions for on-event
    
  }
}
