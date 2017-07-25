import css from 'index.less';
import * as manifest from 'dialogues/manifest';
import Player from 'player';

import DialogueState from 'states/dialogue';



const CONDITIONS = {
}
const ACTIONS = {
  GOTO_BRIDGE: () => game.switchState('dialogue', manifest.bridge),
  GOTO_DUNGEON: () => game.switchState('dialogue', manifest.dungeon)
}

class Game {
  constructor (player) {
    this.player = player;

    this.CONDITIONS = CONDITIONS;
    this.ACTIONS = ACTIONS;

    document.addEventListener('click', e => this._click(e));
    document.addEventListener('keydown', e => this._keyPress(e));
  }

  _click (e) {
    const target  = e.target;

    if (
      this.currentState.isReadyForInteraction()
      && target.classList.contains('option')
    ) {
      this.pickOption(target);
    }
  }

  _keyPress (e) {
    const key = e.code;
    let choice = (key).match(/^(Digit|Numpad)([0-9])/);

    if (
      this.currentState.isReadyForInteraction()
      && choice
    ) {
      choice = Number(choice[2]) - 1;
      this.pickOption(document.getElementsByClassName('option')[choice]);
    }
  }

  //pick an option
  pickOption (el) {
    if (!el) {
      return;
    }

    this.currentState.interact(el.getAttribute('choice'));
  }

  switchState (state, ...args) {
    if (this.currentState) {
      this.currentState.kill();
    }

    switch (state) {
    case 'dialogue':
      this.currentState = new DialogueState(this, ...args);
      break;
    }
  }
}

let player = new Player('Player 1');
let game = new Game(player.toJSON());
game.switchState('dialogue', manifest.dungeon);