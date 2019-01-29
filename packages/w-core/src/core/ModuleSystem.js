export class ModuleSystem {
  constructor(options) {
    this.modules = options.modules || [];

    const data = {};
    const unresolvedWarns = new Map();
    const updateHandlers = {};
    let activeModule = null;

    this.manager = new Proxy(data, {
      set(obj, prop, value) {
        obj[prop] = value;

        // console.log(prop, updateHandlers[prop]);
        if (updateHandlers[prop]) {
          updateHandlers[prop].forEach(cb => cb(value));
        }

        return true;
      },

      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          const warns = unresolvedWarns.get(activeModule);

          if (warns && warns[prop])
            console.warn(warns[prop], activeModule);

          if (activeModule === null)
            console.error('No active module');
          else
            console.error('Active module: ', activeModule);

          throw new Error(`manager.${prop} is required by the active module.`);
        }
      }
    });

    const warn = module => (dependency, message) => {
      unresolvedWarns.set(module, {
        ...(unresolvedWarns.get(module) || {}),
        [dependency]: message
      });
    }

    const onUpdate = (propName, handler) => {
      if (updateHandlers[propName]) {
        updateHandlers[propName].push(handler);
      } else {
        updateHandlers[propName] = [handler];
      }

      return () => {
        if (updateHandlers[propName]) {
          updateHandlers[propName].splice(
            updateHandlers[propName].indexOf(handler),
            1
          );
        }
      };
    }

    this.setupModules = () => {
      for (const module of this.modules) {
        if ('setup' in module) {
          activeModule = module;

          module.setup(this, {
            data,
            manager: this.manager,
            warn: warn(module),
            onUpdate
          });
        }
      }

      activeModule = null;
    };
  }

  bridge(bridgeName, inputData) {
    let outputData = inputData;

    for (const module of this.modules) {
      if (module.bridges && bridgeName in module.bridges) {
        outputData = module.bridges[bridgeName];
      }
    }

    return outputData;
  }
}
