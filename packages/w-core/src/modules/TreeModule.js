import {Scene} from 'three';

export class TreeModule {
  setup(app, {manager}) {
    manager.scene = new Scene();

    app.add = async (component) => {
      const scene = manager.scene;

      if (component.isAsync) {
        scene.add(await component.native);
      } else {
        scene.add(component.native);
      }
    };
  }
}
