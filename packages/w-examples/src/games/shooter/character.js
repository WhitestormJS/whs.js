import {RigidbodyModule} from '@whs/physics';
import {Component} from '@whs/core';

import Character from './components/Character';
import CharacterControlsModule from './modules/CharacterControlsModule';
import CharacterCameraModule from './modules/CharacterCameraModule';

import {app, store} from './app';

const character = new Character(async () => ({
  model: await store.load('gltf.character', '/assets/gltf/blake_fbx/scene.gltf'),
  actionsMap: {
    run: 'armature|run',
    jump: 'armature|jump',
    idle: 'armature|idle',
    gun_idle: 'armature|gun_idle'
  },
  modules: [
    new CharacterControlsModule(),
    new RigidbodyModule({type: 'sphere', radius: 0.5, restitution: 0.5, friction: 1})
    // new CharacterCameraModule(app.manager.camera, update => app.loop(update))
  ]
}));

character.initialize(update => app.loop(update));
// console.log(character.actions);
character.action('idle');
app.add(character);

app.add(new Component.Mesh({
  geometry: new THREE.SphereGeometry(1, 32, 32),
  material: new THREE.MeshBasicMaterial({color: 0xff0000}),
  modules: [
    new RigidbodyModule({type: 'sphere', radius: 0.5, restitution: 0.5, friction: 1})
  ],
  position: [0, 10, 0]
}));
