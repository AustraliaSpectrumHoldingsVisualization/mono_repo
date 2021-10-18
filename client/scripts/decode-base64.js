const fs = require('fs');

(async () => {
  const args = process.argv.slice(2);
  
  if (args[0] === null) {
    throw Error('Please specify the file to decode to base64');
  }
  if (args[1] === null) {
    throw Error('Please specify the output file to be written');
  }
  if (args.length !== 2) {
    throw Error(
      'Please only specify the file to decode from base64 and the ' +
      'output file.');
  }

  let base64data = fs.readFileSync(`${args[0]}`);
  let buff = new Buffer.from(base64data, 'base64');
  
  fs.writeFileSync(args[1], buff);
})();