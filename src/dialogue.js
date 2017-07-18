export default class Dialogue {
  constructor (html) {
    this.template = document.createElement('template');
    this.template.innerHTML = html;
    this.template = this.template.content;
  }

  interact (id) {
    id = parseInt(id, 10);

    if (Number.isNaN(id)) {
      id = null;
    }

    let element;

    if (id === null) {
      element = Array
        .from(this.current.childNodes)
        .filter(node => node.nodeType === node.ELEMENT_NODE)[0];
    } else {
      element = this.template.getElementById(id);
    }

    this.current = element;

    const text = Dialogue.getText(this.current);
    const responses = this.validateOptions(Dialogue.getOptions(this.current));

    if (!text && responses.length === 0) {
      throw new Error('Dialogue Error - dead end');
    }

    return {
      text: text,
      responses: responses
    };
  }

  validateOptions (list) {
    return list.filter(option => {
      if (option.id === null && Dialogue.hasChildOptions(this.current)) {
        return true;
      } else if (this.template.getElementById(option.id)) {
        return true;
      } else {
        console.warn('Invalid dialogue option', option);
      }
    })
  }

  static hasChildOptions (node) {
    return Array.from(node.childNodes).filter(node => node.nodeType === node.ELEMENT_NODE).length > 0;
  }

  static getOptions (node) {
    const options = Array.from(node.childNodes).map(node => {
      if (node.nodeType === node.ELEMENT_NODE) {
        return {
          id: node.id || node.className || null,
          text: Dialogue.getText(node)
        }
      }
    })
    .filter(option => Boolean(option));

    if (options.length === 1) {
      options[0].text = null;
    }

    return options;
  }

  static getText (node) {
    return Array.from(node.childNodes).reduce((text, val) => {
      return text + (val.nodeType === val.TEXT_NODE ? val.textContent : '');
    }, '');
  }
}