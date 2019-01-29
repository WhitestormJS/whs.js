export class ResizeModule {
  setup(app, {manager}) {
    window.addEventListener('resize', () => {
      manager.size = [window.innerWidth, window.innerHeight];
    });
  }
}
