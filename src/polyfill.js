import present from 'present';

export const system = {
  window: typeof window === 'undefined' ? global : window
};

global.performance = {
  now: present
};
