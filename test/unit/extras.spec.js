define(['whs'], (WHS) => {
  describe('- Extras -', () => {
    const world = new WHS.World({modules: {rendering: false}});

    describe('[WHS.Group]', () => {
      const group = new WHS.Group();

      describe('#addTo()', () => {
        it('should add group to the world [WHS.World]', () => group.addTo(world));
      });

      describe('Adding a component', () => {
        it('should add a mesh [WHS.Element] to the group',
          () => new WHS.Element(
            new THREE.Mesh(),
            [WHS.MeshComponent]
          ).addTo(group)
        );
      });

      describe('Shapes created at the beginning', () => {
        const element1 = new WHS.Element(
          new THREE.Mesh(),
          [WHS.MeshComponent]
        );

        const element2 = element1.clone();
        it('should add meshes on start', () => new WHS.Group(element1, element2));
      });
    });

    describe('[WHS.Loop]', () => {
      const loop = new WHS.Loop((clock) => {
        clock.getElapsedTime();
      });

      describe('#addLoop()', () => {
        it('should add loop to the world [WHS.World]', () => world.addLoop(loop));
      });

      describe('#removeLoop()', () => {
        it('should remove loop to the world [WHS.World]', () => world.removeLoop(loop));
      });

      describe('#start()', () => {
        it('should start loop', () => loop.start());
        it('should start loop and add it to the world', () => loop.start(world));
      });

      describe('#stop()', () => {
        it('should stop loop', () => loop.stop());
        it('should stop loop and remove it from the world', () => loop.stop(world));
      });

      describe('#execute()', () => {
        it('should run the function loop contains', () => loop.execute());
      });
    });

    describe('[WHS.VirtualMouse]', () => {
      const mouse = new WHS.VirtualMouse(world);

      describe('#track()', () => {
        it('Should track mouse movement on the component', () => mouse.track(new WHS.Sphere()));
      });

      describe('#intersection()', () => {
        it('should return intersection betweeen "mouse ray" and a component',
          () => mouse.intersection(new WHS.Sphere()));
      });

      describe('#project()', () => {
        it('should return a vector[THREE.Vector3] of mouse projected on plane',
          () => mouse.project());
      });

      describe('#hovers()', () => {
        it('should return false when mouse isn`t over the component',
          () => mouse.hovers(new WHS.Sphere()) === false);
      });

      it('@returns .ray', () => mouse.ray);
      it('@returns .x', () => mouse.x);
      it('@returns .y', () => mouse.y);
    });
  });
});
