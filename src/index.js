import css from 'index.less';
import dialogue from 'dialoguejs';
import * as manifest from 'dialogues/manifest';
import GUI from 'gui';
import Player from 'player';

class Dialogue {
  constructor (name, data, player) {
    this.name = name;
    this.player = player;
    dialogue.parse(this.name, data);

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
    let data = dialogue.interact(this.name, this.player.name, id);

    gui.render(data, this.player);
  }

}

let player = new Player('Player 1');
let app = new Dialogue('test', manifest.dungeon, player.toJSON());
let gui = new GUI();
app.interact(0);