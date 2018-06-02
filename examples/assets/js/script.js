/* eslint-disable */

var iframe = document.querySelector('iframe');
var hash = window.location.hash.slice(1).split('#');
var link = window.location.hash.length > 3 ? hash[0] + '/' : '/Basic/Hello_World/';

iframe.src = '' + link;
iframe.id = 'content';
document.getElementById('panel').appendChild(iframe);

iframe.onload = function () {
  var moveChildren = [];

  for (var child of iframe.contentWindow.document.querySelector('#explanation').childNodes)
    moveChildren.push(child);

  for (var child of moveChildren)
    document.querySelector('#explanation-holder').appendChild(child);
};

const tutorialOpen = document.getElementById('tutorial-open');
const tutorialLink = '#' + link.slice(0, -1) + '#tutorial';

// tutorialOpen.href = tutorialLink;
tutorialOpen.dataset.tutorialLink = tutorialLink;

for (const link of document.querySelectorAll('[data-updatable]')) {
  link.addEventListener('click', function(e) {
    // console.log(123);
    // debugger;
    var tutorial = window.location.hash.indexOf('tutorial') > 0;

    if (link.dataset.tutorialLink) {
      e.preventDefault();

      console.log(tutorial);

      window.location.hash = tutorial
        ? link.dataset.tutorialLink.replace('#tutorial', '')
        : link.dataset.tutorialLink;
    }

    if (link.dataset.tutorialLink && link.dataset.tutorialLink.indexOf(hash[0]) > 0) return;
    // window.location.reload();
  });
}

// setTimeout(function () {
//   document.body.dataset.exampleReady = true;
// }, 2000);

if (hash[1] && hash[1] === 'tutorial') {
  document.querySelector('#explanation').removeAttribute('hidden');
}

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('[data-item]');

// tutorialOpen.addEventListener('click', () => {
//   if (tutorialOpen.href.indexOf(''))
// })

for (let filter of filters) {
  filter.addEventListener('keyup', function (e) {
    const text = e.target.value;

    items.forEach(item => {
      // console.log([item]);
      if (text === '' || item.innerText.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
        item.parentNode.style.display = 'block';
      } else {
        item.parentNode.style.display = 'none';
      }
    })
  });
}

// SIDEBAR
// if (isMobile) {
//   new Slideout({
//     panel: document.getElementById('panel'),
//     menu: document.getElementById('sidebar'),
//     padding: 320,
//     tolerance: 70
//   });
// }

// Filter

// const filter = document.getElementById('filter');
// const items = document.querySelectorAll('#sidebar .item .minor');
// const categories = document.querySelectorAll('#sidebar .item.category');

// filter.addEventListener('keyup', function (e) {
//   items.forEach(item => {
//     if (
//       item.innerText.indexOf(e.target.value) > -1
//       || e.target.value === ''
//     ) item.style.display = 'block';
//     else item.style.display = 'none';
//   });
//
//   categories.forEach(function (cat) {
//     const isHidden = [].slice.call(cat.querySelectorAll('.minor')).every(item => item.style.display === 'none');
//
//     if (isHidden) cat.style.display = 'none';
//     else cat.style.display = 'block';
//   });
// });

window.__ExamplesAPI = new class {
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
