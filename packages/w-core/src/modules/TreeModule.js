import {Scene} from 'three';

export class TreeModule {
  setup(app, {manager}) {
    app.scene = manager.scene = new Scene();

    app.add = async (component) => {
      component = app.bridge('child', component);
      manager.scene.add(component.isAsync ? await component.native : component.native);
    };
  }
}
