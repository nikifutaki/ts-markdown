import { md } from '../example';

describe('Markdown', () => {
  it('Example should be equal to README.md', () => {
    const fs = require('fs');
    const readme = fs.readFileSync('README.md', 'utf8');
    expect(md.toString() + '\n').toBe(readme);
  });
});