# whs-module-dat.gui - User Interface for runtime editing properties

[![NPM Version](https://img.shields.io/npm/v/whs-module-dat.gui.svg?style=flat-square)](https://www.npmjs.com/package/whs-module-dat.gui)

<img src="http://i.imgur.com/Qq8ptt8.png" width="50%">

### Simple configuration

```javascript
const sphere = new WHS.Sphere({
  material: new THREE.MeshBasicMaterial({color: 0xffffff}),
  modules: [
    new DatGUIModule({
      name: 'MySphere', // name of folder for this component
      material: true // use material
    })
  ]
});
```


### Advanced configuration

```javascript
const sphere = new WHS.Sphere({
  material: new THREE.MeshBasicMaterial({color: 0xffffff}),
  modules: [
    new WHS.DynamicGeometryModule(),
    new DatGUIModule({
      name: 'MySphere',
      material: true,
      geometry: true, // Update geometry parameters
      tryMaterial: [ // Beta feature. Allows you to change material to the one of the following
        THREE.MeshBasicMaterial,
        THREE.MeshLambertMaterial,
        THREE.MeshPhongMaterial
      ],
      custom: { // custom parameters
        hello: (value, component) => { // onChange function 
          console.log(value);
        }
      },
      defaults: { // Default values for "custom"
        hello: 1
      },
      range: { // min and max for "custom"
        hello: [0, 10]
      },
      step: { // steps for "custom"
        hello: 2
      }
    })
  ]
});
```

> `geometry` parameter requires `WHS.DynamicGeometryModule` to be set before `DatGUIModule`.


## Screenshot

![](http://i.imgur.com/ptoZCgz.png)

## Todo

 - Make ability to use several components. Add DatGUI to App
 - Make `tryMaterial` change without reloading material folder
 - Wide support for colors & custom data
 - Ability to get dat.GUI from callback
