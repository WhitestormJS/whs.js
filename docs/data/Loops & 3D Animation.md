# Loops & 3D Animation

[//]: # (TODO: Make a codepen with it)
![](http://i.imgur.com/v7OaN9h.gif)

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
