const parser = require('@babel/parser');
const fs = require('fs');
const files = process.argv.slice(2);
const errors = {};
for (const f of files) {
  try {
    const src = fs.readFileSync(f, 'utf8');
    parser.parse(src, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  } catch (e) {
    errors[f] = e.message.slice(0, 250);
  }
}
if (Object.keys(errors).length) {
  process.stdout.write(JSON.stringify(errors));
  process.exit(1);
}
