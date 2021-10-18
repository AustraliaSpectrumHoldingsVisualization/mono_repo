// Use CommonJS Syntax in Node.js script.
const fs = require('fs');

(async () => {
  const args = process.argv.slice(2);
  
  if (args[0] === null) {
    throw Error('Please specify the file to encode to base64');
  }
  if (args[1] === null) {
    throw Error('Please specify the output file to be written');
  }
  if (args.length !== 2) {
    throw Error(
      'Please only specify the file to encode to base64 and the output file.'
    );
  }

  let data = fs.readFileSync(`${args[0]}`);
  let buff = new Buffer.from(data);
  let base64data = buff.toString('base64');
  
  fs.writeFileSync(args[1], base64data, { encoding: 'base64' });
  console.log("String representation is '" + base64data + "'");
})();