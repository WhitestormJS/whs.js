export class ReduxComposeModule {
  constructor(store, connector, optionalInitialState, updateHandler) {
    this.store = store;
    this.connector = connector;
    this.initialState = optionalInitialState || this.store.getState();
    this.updateHandler = updateHandler || {};
  }

  setup(component, {manager, ...other}) {
    const connector = this.connector;
    let prevState = connector(this.initialState);

    for (let key in prevState) {
      const currentValue = prevState[key];

      if (key in this.updateHandler) {
        this.updateHandler[key](component, currentValue);
      } else {
        manager[key] = currentValue;
      }
    }

    this.store.subscribe(() => {
      const state = connector(this.store.getState());

      for (let key in state) {
        const currentValue = state[key];

        if (prevState[key] !== currentValue) {
          if (key in this.updateHandler) {
            this.updateHandler[key](component, currentValue);
          } else {
            manager[key] = currentValue;
          }
        }
      }

      prevState = state;
    });
  }
}

export function createComposer(store) {
  const initialState = store.getState();

  return {
    compose: (connector, updateHandler) => new ReduxComposeModule(store, connector, initialState, updateHandler),
    initialState
  }
};
