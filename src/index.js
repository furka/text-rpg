import css from 'index.less';
import dialogue from 'dialoguejs';
import * as manifest from 'dialogues/manifest';

const PLAYER = 'player';
const OPTION_PREFIX = '> ';

class Dialogue {


  constructor (name, data, start) {
    this.name = name;
    dialogue.parse(this.name, data);
    this.interact(start);
  }

  //renders a chunk of data given by the dialog system
  render (data) {
    let text = document.querySelector('.dialogue > .text');
    let ul = document.querySelector('.dialogue > .options');
    ul.innerHTML = '';

    let responses = data.responses.slice();
    if (data.responses.length === 0) {
      data.responses.push({
        text: '…',
        id: null
      })
    }

    this.slowRender(text, data.text)
      .then(() => {
        let promise = Promise.resolve();

        data.responses.forEach(response => {
          promise = promise.then(() => this.createResponse(ul, response));
        })
      });
  }

  //slowly renders some text, character per character
  slowRender(el, text, i) {
    return new Promise(resolve => {
      if (typeof i !== 'number') {
        i = 0;
      }

      el.innerText =  text.slice(0, i) + '|';

      if (i < text.length) {
        requestAnimationFrame(() => {
          this.slowRender(el, text, i + 1)
            .then(() => resolve());
        })
      } else {
        el.innerText = text;
        resolve();
      }
    })
  }

  //creates a response the user can select which will move the dialog on to that branch
  createResponse (parent, response) {
    let li = document.createElement('li');
    li.addEventListener('click', this.interact.bind(this, response.id));
    parent.appendChild(li);
    return this.slowRender(li, OPTION_PREFIX + response.text);
  }

  //interact with the dialog, sending it to a specific ID
  interact (id) {
    let data = dialogue.interact(this.name, PLAYER, id);
    this.render(data);
  }
}

let test = new Dialogue('test', manifest.test, 0);