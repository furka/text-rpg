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
  }

  //interact with the dialog, sending it to a specific ID
  interact (id) {
    let data = dialogue.interact(this.name, this.player.name, id);
    gui.render(data, this.player);
  }
}

let player = new Player('Player 1');
let app = new Dialogue('test', manifest.dungeon, player.toJSON());
let gui = new GUI(app.interact.bind(app));
app.interact(0);