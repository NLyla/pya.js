const { request } = require('undici')

const body = async (url) => {
  let { body } = await request(url)

  return body.arrayBuffer()
}

const randomHex = () => {
  let random = Math.random()
  let xxp = --random.toExponential().split('-')[1]

  random *= Math.pow(10, xxp)

  let hex = "#" + (~~(random * (1 << 24))).toString(16)

  return hex.toUpperCase()
}

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {

  var words = text.split(' '),
    line = '',
    lineCount = 0,
    i,
    test,
    metrics;

  for (i = 0; i < words.length; i++) {
    test = words[i];
    metrics = context.measureText(test);
    while (metrics.width > maxWidth) {

      test = test.substring(0, test.length - 1);
      metrics = context.measureText(test);
    }
    if (words[i] != test) {
      words.splice(i + 1, 0, words[i].substr(test.length))
      words[i] = test;
    }

    test = line + words[i] + ' ';
    metrics = context.measureText(test);

    if (metrics.width > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
      lineCount++;
    }
    else {
      line = test;
    }
  }

  return context.fillText(line, x, y);
}

module.exports = { body, wrapText, randomHex }
