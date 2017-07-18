import css from 'index.less';
import * as manifest from 'dialogues/manifest';
import Dialogue from 'dialogue';
import GUI from 'gui';
import Player from 'player';

class Game {
  constructor (template, player) {
    this.player = player;
    this.dialogue = new Dialogue(template)

    document.addEventListener('click', e => this._click(e.target));
    document.addEventListener('keydown', e => this._keyPress(e.code));
  }

  _click (target) {
    if (target.classList.contains('option')) {
      this.pickOption(target);
    }
  }

  _keyPress (key) {
    if (gui.typewriter.started) {
      gui.skip();
      return;
    }

    let choice = (key).match(/^(Digit|Numpad)([0-9])/);

    if (choice) {
      choice = Number(choice[2]) - 1;
      this.pickOption(document.getElementsByClassName('option')[choice]);
    }
  }

  //pick an option
  pickOption (el) {
    if (!el) {
      return;
    }

    this.interact(el.getAttribute('choice'));
  }

  //interact with the dialog, sending it to a specific ID
  interact (id) {
    try {
      let data = this.dialogue.interact(id);

      gui.render(data, this.player);
    } catch (e) {
      this.interact(0);
      console.error(e);
    }
  }

}

let player = new Player('Player 1');
let app = new Game(manifest.dungeon, player.toJSON());
let gui = new GUI();
app.interact(0);