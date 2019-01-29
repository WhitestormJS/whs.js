export class Store {
  static asyncLoader = {
    load(asyncData, onComplete, onProgress, onError) {
      asyncData().then(onComplete);
    }
  };

  constructor(loaders) {
    this.loaders = loaders;
    this.refs = {};
    this.processors = {};
  }

  process(assetType, processor) {
    if (this.processors[assetType]) {
      this.processors[assetType].push(processor);
    } else {
      this.processors[assetType] = [processor];
    }
  }

  load(assetName, url, options = {}) {
    const [, assetType] = /(.*)\./.exec(assetName);
    const loader = this.loaders[assetType];
    const processors = this.processors[assetType] || [];

    console.log(processors);

    this.refs[assetName] = new Promise((resolve, reject) => {
      loader.load(
        url,
        (data) => {
          resolve(
            processors.reduce(
              (newData, processor) => processor(newData, options, assetName),
              data
            )
          );
        },
        undefined,
        reject
      );
    });

    return this.refs[assetName];
  }

  ref(assetName) {
    return this.refs[assetName];
  }
}
