# whs-module-statsjs - Module for JavaScript Performance Monitor
> Based of [stats.js](https://github.com/mrdoob/stats.js). Thanks to [@mrdoob](https://github.com/mrdoob) 

## Usage

```javascript
const app = new WHS.App([
  new WHS.ElementModule(), // This module is required
  // other modules
  new StatsModule(StatsModule.codes.fps) // or just "0"
]);
```

## Exported dependencies

Name    | Description                                                              | Alias
--------|--------------------------------------------------------------------------|------
`stats` | `Stats` object provided by [stats.js](https://github.com/mrdoob/stats.js)| `app.$stats`

See [stats.js example](https://github.com/mrdoob/stats.js#usage) for full codes list

## Screenshots

![Screenshot](http://i.imgur.com/TMUoJ88.png)

<img src="http://i.imgur.com/i4A4FIp.png" width="50%" />
