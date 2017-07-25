import template  from 'templates/index.hbs';
import handlebars from 'handlebars';
import Typewriter from 'cool-typewriter';
import RPGDialogue from 'rpg-dialogue';
import State from './state';

export default class Dialogue extends State {

  constructor (game, dialogueTree) {
    super(game);

    this.dialogue = new RPGDialogue(dialogueTree);
    this.typewriter = new Typewriter();
    this.interact(0);
  }

  interact (id) {
    try {
      const result = this.dialogue.interact(id, this.game.CONDITIONS, this.game.ACTIONS);
      if (this.active) {
        this._render(result);
      }
    } catch (e) {
      this.interact(0);
      console.error(e);
    }
  }

  kill () {
    super.kill();
    this.typewriter.stop();
  }

  isReadyForInteraction () {
    if (this.typewriter.started) {
      this.typewriter.complete();
      return false;
    }

    return true;
  }

  //render a chunk of dialogue with answer options
  _render (data) {
    data = JSON.parse(JSON.stringify(data));

    data.text = handlebars.compile(data.text)({player: this.game.player});
    data.responses.forEach((response, i) => {
      if (response.text) {
        response.text = handlebars.compile(response.text)({player: this.game.player});
      } else {
        response.text = '…';
      }
      response.index = i + 1;
    });

    document.body.innerHTML = template({
      data: data,
      player: this.game.player
    });

    this.typewriter.type(document.body).start();
  }
}
