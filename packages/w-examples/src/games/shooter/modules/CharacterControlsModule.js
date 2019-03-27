const PREVENT_KEYS = 'w,g, '.split(',');

export default class CharacterControlsModule {
  setup(character, {manager}) {
    const activeKeys = {};
    let lockedKey = null;

    window.addEventListener('keydown', e => {
      if (PREVENT_KEYS.includes(e.key)) e.preventDefault();
      if (lockedKey === e.key) return;
      lockedKey = e.key;
      activeKeys[e.key] = true;

      switch (e.key) {
        case 'w':
          character.emit('run');
          character.action('run');
          character.setSpeed(50);
          break;
        case 's':
          character.emit('run');
          character.action('run');
          character.setSpeed(-50);
          break;
        case 'd':
          character.emit('turn');
          character.setLookDirectionAngleOffset(-Math.PI / 90);
          break;
        case 'a':
          character.emit('turn');
          character.setLookDirectionAngleOffset(Math.PI / 90);
          break;
        case 'g':
          // character.stop('idle');
          character.action('gun_idle');
          break;
        case ' ':
          character.action('jump');
        default:

      }
    });

    window.addEventListener('keyup', e => {
      if (PREVENT_KEYS.includes(e.key)) e.preventDefault();
      lockedKey = null;
      activeKeys[e.key] = false;

      switch (e.key) {
        case 'w':
        case 'g':
        case 's':
          character.action('idle');

          if (!activeKeys.w && !activeKeys.s) {
            character.setSpeed(0);
            character.emit('run/stop');
          }
          break;
        case 'd':
        case 'a':
          character.emit('turn/stop');
          character.setLookDirectionAngleOffset(0);
          break;
        case ' ':
          character.stop('jump');
        default:

      }

    });
  }
}
