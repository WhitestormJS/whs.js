/* eslint-disable */

var iframe = document.querySelector('iframe');
var hash = window.location.hash.slice(1).split('#');
var link = window.location.hash.length > 3 ? hash[0] + '/' : '/basic/simple_app/';

iframe.src = '' + link;
iframe.id = 'content';
document.getElementById('panel').appendChild(iframe);

iframe.onload = function () {
  document.querySelector('#explanation-holder').innerHTML =
    iframe.contentWindow.document.querySelector('#explanation').innerHTML;
};

const tutorialOpenAll = document.querySelectorAll('.tutorial-open');
const explanationToggle = UIkit.toggle(document.querySelector('#explanation'), {
  animation: 'uk-animation-fade'
});

for (let tutorialOpen of tutorialOpenAll) {
  tutorialOpen.addEventListener('click', function (e) {
    e.preventDefault();

    const isTutorial = explanationToggle.isToggled();

    for (let tutorialOpen of tutorialOpenAll) {
      tutorialOpen.innerHTML = tutorialOpen.innerHTML.replace(
        !isTutorial ? 'Show' : 'Hide',
        isTutorial ? 'Show' : 'Hide'
      );
    }

    explanationToggle.toggle();

    return;
  });
}

for (const link of document.querySelectorAll('[data-updatable]')) {
  link.addEventListener('click', function (e) {
    const tutorialUrl = /.*\#(.*)/.exec(link.href)[1].replace(/#(.*)/, '');
    const iframeUrl = iframe.src.replace(window.origin, '');

    if (tutorialUrl !== iframeUrl) {
      delete document.body.dataset.exampleReady;
      iframe.src = tutorialUrl + '/';
      iframe.onload();
    }
  });
}

if (hash[1] && hash[1] === 'tutorial') {
  document.querySelector('#explanation').removeAttribute('hidden');
}

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('[data-item]');

for (let filter of filters) {
  filter.addEventListener('keyup', function (e) {
    const text = e.target.value;

    document.body.dataset.filtered = text !== '';

    items.forEach(item => {
      if (text !== '' && item.dataset.item.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    })
  });
}

window.__EXAMPLES_API__ = new class {
  constructor() {
    this.PREFIX = 'Examples API';
    console.log(`${this.PREFIX}: initialized.`);
    this.__initTime = Date.now();
    this.connected = false;

    Object.assign(this, {
      ready: () => {
        const time = Date.now() - this.__initTime;

        setTimeout(() => {
          document.body.dataset.exampleReady = true;
        }, Math.max(1000 - time, 0));
      }
    });

    setTimeout(() => { // Not connected
      if (!this.connected) {
        document.body.dataset.exampleReady = true;
      }
    }, 1000);
  }
}
