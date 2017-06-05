import optionTemplate  from 'templates/option.hbs';
import handlebars from 'handlebars';
const OPTION_PREFIX = '> ';

export default class gui {
  constructor (handler) {
    this.handler = handler;

    this.text = document.querySelector('.dialogue > .text');
    this.options = document.querySelector('.dialogue > .options');
  }

  //render data
  render (data, player) {
    this.options.innerHTML = '';

    let responses = data.responses && data.responses.slice();

    if (responses.length === 0) {
      responses.push({
        text: '…',
        id: null
      })
    }

    data.text = this.template(data.text, player);

    this.slowRender(this.text, data.text)
      .then(() => {
        let promise = Promise.resolve();

        responses.forEach(response => {
          response.text = this.template(response.text, player);

          promise = promise.then(() => this.createResponse(response));
        })
      });
  }

  template (text, player) {
    return handlebars.compile(text)({
      player: player
    });
  }

  //creates a response that will call the handler when clicked
  createResponse (response) {
    let template = document.createElement('template');
    template.innerHTML = optionTemplate({
      text: response.text
    });
    let li = template.content.firstChild;

    li.addEventListener('click', () => this.handler(response.id));

    this.options.appendChild(li);
    return this.slowRender(li, OPTION_PREFIX + response.text);
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
}