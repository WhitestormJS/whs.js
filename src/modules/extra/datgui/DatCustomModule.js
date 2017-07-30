export class DatCustomModule {
  constructor(props = [], gui) {
    this.props = props;
    this.gui = gui;

    props.forEach(this.add.bind(this));
  }

  add({
    name,
    value,
    range = [false, false],
    step = 1,
    onChange,
    onFinishChange,
    listen = false
  }) {
    const controller = this.gui.add({[name]: value}, name, range[0] || 0, range[1] || 1);

    controller.onChange(onChange);
    if (onFinishChange) controller.onFinishChange(onFinishChange);
    if (listen) controller.listen();

    return controller;
  }
};
