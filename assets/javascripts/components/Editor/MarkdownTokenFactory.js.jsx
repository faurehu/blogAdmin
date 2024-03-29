export class RegularMarkdownToken {
  constructor(token, isSymetric) {
    this.token = token;
    this.isSymetric = isSymetric;
  }

  applyTokenTo(_text) {
    let res = this.token;
    res += _text;
    if (this.isSymetric) {
      res += this.token;
    }
    return res;
  }
}

export class NullMarkdownToken extends RegularMarkdownToken {
  applyTokenTo(_text) {
    return _text;
  }
}

export class HeaderMarkdownToken extends RegularMarkdownToken {
  constructor(_token) {
    super(_token || '##', false);
  }

  applyTokenTo(_text) {
    return `\n${this.token} ${_text}\n`;
  }
}

export class SubHeaderMarkdownToken extends HeaderMarkdownToken {
  constructor() {
    super('###');
  }
}

export class UrlMarkdownToken extends RegularMarkdownToken {
  applyTokenTo(_text) {
    return `[${_text}](${_text})`;
  }
}

export class ListMarkdownToken extends RegularMarkdownToken {
  applyTokenTo(_text) {
    let items = _text.split('\n');
    let t = items.reduce((acc, item) => {
      return `${acc}+ ${item}\n`;
    }, '\n');

    return t + '\n';
  }
}

export class ImageMarkdownToken {
  applyTokenTo(_text) {
    return `![${_text}](${_text})`;
  }
}
