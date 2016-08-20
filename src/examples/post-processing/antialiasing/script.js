import { Game } from './post-processing/antialiasing/game.js';
import { conf } from './post-processing/antialiasing/conf.js';

var app = null;

function bootstrap() {
  app.start()
}

function configure() {
  return new Promise((resolve) => {
    app = new Game(conf);
    resolve(true);
  });
}

configure().then(() => bootstrap());