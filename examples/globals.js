const isMobile = (function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
})();

export const $world = {
  stats: 'fps', // fps, ms, mb or false if not need.
  autoresize: 'window',

  gravity: [0, -100, 0],

  camera: {
    position: [0, 10, 50]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    pixelRatio: false,

    renderer: {
      antialias: !isMobile
    }
  },

  shadowmap: {
    type: isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap
  }
};

export const appDefaults = {
  camera: {
    position: new THREE.Vector3(0, 10, 50),
    far: isMobile ? 200 : 1000
  },

  rendering: {
    bgColor: 0x162129,

    pixelRatio: isMobile ? false : window.devicePixelRatio,

    renderer: {
      antialias: !isMobile,

      shadowMap: {
        type: isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap
      }
    }
  },

  physics: {
    ammo: process.ammoPath
  }
};

export const appModules = ( // appModules(camera, rendering);
  camera = appDefaults.camera,
  rendering = appDefaults.rendering,
  physics = appDefaults.physics,
  useControls = true
) => (
  [
    new WHS.ElementModule(),
    new WHS.SceneModule(),
    new WHS.DefineModule('camera', new WHS.PerspectiveCamera(Object.assign(camera, {fov: 75}))),
    new WHS.RenderingModule(rendering, {shadow: true}),
    new PHYSICS.WorldModule(physics),
    useControls ? new WHS.OrbitControlsModule() : null,
    new StatsModule(),
    new WHS.ResizeModule()
  ]
);

export const $colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2,
  softbody: 0x434B7F
};

export function addAmbient(app, intensity) {
  new WHS.AmbientLight({
    intensity
  }).addTo(app);
}

export function addBasicLights(app, intensity = 0.5, position = [0, 10, 10], distance = 100, shadowmap) {
  addAmbient(app, 1 - intensity);

  return new WHS.PointLight({
    intensity,
    distance,

    shadow: Object.assign({
      fov: 90
    }, shadowmap),

    position
  }).addTo(app);
}

export function addPlane(app, size = 100) {
  return new WHS.Plane({
    geometry: {
      width: size,
      height: size
    },

    modules: [
      new PHYSICS.PlaneModule({
        mass: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

    rotation: {
      x: -Math.PI / 2
    }
  }).addTo(app);
}

export function addBoxPlane(app, size = 100, color = 0x447F8B) {
  return new WHS.Box({
    geometry: {
      width: size,
      height: 1,
      depth: size
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({color})
  }).addTo(app);
}

function hexToRgb(hex) {
  let bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, 1.0)`;
}

export class Label extends WHS.MeshComponent {
  constructor(params = {}) {
    super(params, Object.assign(WHS.MeshComponent.defaults, {
      text: 'Hello world!',
      color: '#ffffff',
      size: 40
    }));
  }

  build() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    const {canvas, ctx} = this;
    const {text, bgColor, color, size} = this.params;

    ctx.font = `Bold ${size}px Arial`;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';
    // const size = ctx.measureText(text);
    ctx.fillText(text, 150, 75);

    // ctx.fillStyle = 'green';
    // ctx.fillRect(10, 10, 100, 100);

    const texture = new THREE.Texture(this.canvas);
    texture.needsUpdate = true;

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({map: texture})
    );

    return sprite;
  }
}
