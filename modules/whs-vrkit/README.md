# whs-vrkit - Modules for VR
> Based on `VRControls` and `VREffect`

[![NPM](https://nodei.co/npm/whs-vrkit.png)](https://nodei.co/npm/whs-vrkit/)

## Usage

```javascript
const app = new WHS.App([
  new WHS.ElementModule(), // This module is required
  // other modules
  new VRKit.VRModule() // enables VR
]);
```

## API

### `new VRKit.VRModule({message = true, button = true})`

Parameters:

- **message** - Boolean. Defines whether show message about VR displays.
- **button** - Boolean. ...whether add button to enter VR mode.

### `new VRKit.VRControls()`

```javascript
app.module(
  new VRKit.VRControls({
    object: app.manager.get('camera')
  })
);
```

Parameters:

- **object** - Object3D. An object controlled by VR (usually camera).
- **intensity** - Number. Move intensity.

## manager

`VRModule` is defined as `vr`.

## Screenshot

![](http://i.imgur.com/9gYC15p.png)
