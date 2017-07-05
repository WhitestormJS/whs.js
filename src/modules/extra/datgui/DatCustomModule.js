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
    const controller = this.gui.add({[name]: value}, name);

    if (range[0] !== false) controller.min(range[0])
    if (range[1] !== false) controller.max(range[1])

    controller.step(step);

    if (onChange) controller.onChange(onChange);
    if (onFinishChange) controller.onFinishChange(onFinishChange);
    if (listen) controller.listen();

    return controller;
  }
};
