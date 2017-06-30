# Basic scene

To create whitestorm.js app you should make a basic HTML document with `html`, `head` and `body` tags. Next step is to include Whitestorm.js to the document and main app script file. You can do it simply using `script` tag.

<div class="embed" style="border-radius: 4px; overflow: hidden; height:400px;">
  <iframe style="height: inherit; width: 100%;" scrolling='no' title='Simple WhitestormJS app' src='https://codepen.io/sasha240100/embed/JELBGX/?height=265&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sasha240100/pen/JELBGX/'>Simple WhitestormJS app</a> by Alexander Buzin (<a href='https://codepen.io/sasha240100'>@sasha240100</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
</div>

Try this [helloworld demo online](https://whs-dev.surge.sh/examples/#basic/helloworld).

## App

The first thing you should setup is the App object. **When you do this, you do multiple things at once:**
 - Setup `THREE.Scene`
 - Make a perspective camera and add it to the scene.
 - Apply background and other renderer options.
 - Set auto resize (in addition).

```js
const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),

  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 0, 50)
  })),

  new WHS.RenderingModule({bgColor: 0x162129}),
  new WHS.ResizeModule()
]);
```

[> Loops & 3D Animation](Loops & 3D Animation.html)

## FAQ

> Q: Why is the color in Hexadecimal format?
>
> A: Simply following Three.js' [best practice](https://threejs.org/docs/api/math/Color.html).
