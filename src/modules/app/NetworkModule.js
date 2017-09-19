import { io } from 'socket.io-client';

/**
 * @class NetworkModule
 * @category modules/app
 * @param {String} The url/host to connect to for the server.
 * @param {Int} The port to connect to on the host.
 * @param {String} Which scheme to use for the networking. Includes: HTTP, HTTPS, (PROXIES), etc.
 * @memberof module:modules/app
 * @example <caption>Creating a network module, and passing it to the app.</caption>
 * new App([
 *   new NetworkModule('localhost', 3000, 'http')
 * ]);
 */
 
 export class NetworkModule {
   constructor(options = { host: 'localhost', port: 3000, scheme: 'http' }) {
     this.host = options.host;
     this.port = options.port;
     this.scheme = options.scheme
   }
   
   /**
   * @method connect
   * @instance
   * @description Connects to the socket server. 
   * @memberof module:modules/app.ResizeModule
   */
   connect() {
     this.socket = io((this.scheme + '://' + this.host + ':' + this.port));
   }
   
 }
