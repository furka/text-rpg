export default class State {
  constructor (game, ...args) {
    this.game = game;
    this.active = true;
  }

  kill () {
    this.active = false;
  }

  interact (id) {
    /* no-op to be extended */
  }

  isReadyForInteraction() {
    return true;
  }
}