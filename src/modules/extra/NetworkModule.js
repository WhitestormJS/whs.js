import * as io from 'socket.io-client';
import * as patch from 'socketio-wildcard';

import { MeshComponent } from 'whs';

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

// FIXME: Use `minivents` package.
export class NetworkModule {
  constructor({
    hostname = window.location.hostname,
    port = window.location.port,
    scheme = window.location.protocol
  }) {
    // Variables
    this.objects = new Map();
    this.commands = new Map();

    this.scene;

    // Server Management
    this.server = `${scheme}://${host}:${port}`;
    this.socket = this.connect(this.server);

    // Events
    this.socket.on('connect', () => {
     console.info('Socket connected to ' + this.server);
     this.id = this.socket.id;
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
    this.scene = manager.get('scene');
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
    if (data.event === 'update') {
      // DO something
      if (data.new) this.onNewMesh(data);
      else if (data.destroy) this.onDestroyMesh(data);
      else if (data.position || data.rotation || data.geometry || data.material) this.onMeshEvent(data);
    } else
      this.commands.get(data.event)();
  }

  integrate() {
    this.onNewMesh = data => {
      // Create a new mesh
      const mesh = new MeshComponent({
        geometry: data.geometry || new THREE.CubeGeometry(),
        material: data.material || new THREE.MeshNormalMaterial()
      });

      mesh.name = data.name; // Id sent by server; Server will create and manage IDs.

      this.objects.set(mesh.name, mesh);
      this.scene.add(mesh);
    };

    // Functions for on-event
    this.onMeshEvent = data => {
      // Apply Mesh Changes sent by the server

      // Which mesh to change?
      const mesh = findMesh(data.name); // Return MeshComponent

      // What to change?
      if (data.position) mesh.position.set(data.position);
      if (data.rotation) mesh.rotation.set(data.rotation);
      if (data.geometry) mesh.geometry = data.geometry;
      if (data.material) mesh.material = data.material;
    };

    this.onDestroyMesh = data => {
      const mesh = findMesh(data.name);

      this.scene.remove(mesh);
      this.objects.remove(data.name);
    };
  }

  /**
   * @method findMesh
   * @instance
   * @description Used to determine which mesh the sever wants the client to alter. Helper function.
   */
  findMesh(name) {
    return objects.get(name);
  }
}
