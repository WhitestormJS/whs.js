# Loops & 3D Animation

<div class="embed" style="border-radius: 4px; overflow: hidden; height:400px;">
  <iframe style="height: inherit; width: 100%;"  scrolling='no' title='Loops & 3D Animation' src='https://codepen.io/sasha240100/embed/mwmvBJ/?height=265&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sasha240100/pen/mwmvBJ/'>Loops & 3D Animation</a> by Alexander Buzin (<a href='https://codepen.io/sasha240100'>@sasha240100</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
</div>

You don't need to write `animate()` function like you do in Three.js. The problem is that bigger you app become, the bigger your `animate()` function is.

Here comes `WHS.Loop` class. With just a few lines of code you can your own mini-animate() function:

```js
const app = new WHS.App([
  // ...
]);

new WHS.Loop(() => {
  box.rotation.y += 0.02;
}).start(app);
```

And you can make loop temporary like that:

```js
const loop = new WHS.Loop((clock) => {
  // ...
  if (clock.getElapsedTime() > 5) loop.stop(app);
});

loop.start(app);
```

This loop will be destroyed after 5 seconds.

[> Groups](Groups.html)
