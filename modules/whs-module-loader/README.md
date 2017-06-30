# whs-module-loader - Loading progress for components, textures, ...

## Usage

### `constructor(expecting = [])`

> `expecting` - `Array` of _keys `[String]`_ that will be added to `.expecting`

### `.expect(key)` and `.resolve(key)` - Use for callbacks

```javascript
const loader = new LoaderModule();

const app = new WHS.App([
  // ...
])''

loader.expect('sphere1');

const sphere = new WHS.Sphere({
  // ...
});

sphere.addTo(app).then(() => loader.resolve('sphere1'));
```

### `.promise(key, promise)` - Use for promises

> No `.expect()` required!

```javascript
loader.promise('sphere1', sphere.addTo(app));
```

### `.getProgress()` - Get loading progress

Returns value from `0` to `1`, where `1` means **completed**.

Can be transformed into percents simply muliplying by `100`: 

```javascript
console.log(`Current percent is: ${loader.getProgress() * 100}`);
```

## Events

### `.on('step', [Callback])`

```javascript
loader.on('step', key => {
  console.log(key);
});
```

### `.on('complete', [Callback])`

```javascript
loader.on('complete', () => {
  alert('completed!');
});
```

Fires when `.resolve()` was called and `.expecting` is empty.

## Attributes

### `.expecting`

```javascript
console.log(loader.expecting);
// Array of keys that aren't resolved yet.
```

> This attribute represents an `Array` of _keys `[String]`_ values that **are not resolved yet**.

### `.resolved`

```javascript
console.log(loader.resolved);
// Array of keys that have been resolved.
```

> `Array` of resolved keys.
