import template  from 'templates/index.hbs';
import handlebars from 'handlebars';
import Typewriter from 'cool-typewriter';
const OPTION_PREFIX = '> ';

export default class gui {
  constructor () {
    this.typewriter = new Typewriter();
    this.skip = this.skip.bind(this);
  }

  //render data
  render (data, player) {
    document.removeEventListener('click', this.skip);

    data = JSON.parse(JSON.stringify(data));

    data.text = handlebars.compile(data.text)({player: player});
    data.responses.forEach((response, i) => {
      if (response.text) {
        response.text = handlebars.compile(response.text)({player: player});
      } else {
        response.text = '…';
      }
      response.index = i + 1;
    });

    document.body.innerHTML = template({
      data: data,
      player: player
    });

    this.typewriter.type(document.body).start();

    document.addEventListener('click', this.skip);
  }

  skip () {
    this.typewriter.complete();
  }
}