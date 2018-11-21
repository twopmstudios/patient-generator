function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class WordPool {
  constructor(words) {
    this.originalWords = words.slice(0)
    this.words = shuffle(words.slice(0))
  }

  getWord() {
    if (this.words.length > 0) {
      return this.words.pop()
    }

    this.words = shuffle(this.originalWords.slice(0))
    return this.words.pop()
  }
}

function getRandomListEntry(list) {
  return list[Math.floor(Math.random()*list.length)]
}

module.exports = {
  shuffle,
  WordPool,
  getRandomListEntry,
};