const fs = require('fs');
const { join } = require('path');

const replaceString = [
  ['color-interpolation-filters', 'colorInterpolationFilters'],
  ['flood-opacity', 'floodOpacity'],
  ['clip-path', 'clipPath'],
  ['stop-color', 'stopColor'],
  ['clip-rule', 'clipRule'],
  ['fill-rule', 'fillRule'],
  ['stroke-width', 'strokeWidth'],
  ['stroke-linecap', 'strokeLinecap'],
  ['stroke-linejoin', 'strokeLinejoin'],
  ['fill-opacity', 'fillOpacity'],
  ['stop-opacity', 'stopOpacity'],
  ['stroke-opacity', 'strokeOpacity'],
  ['stroke-dasharray', 'strokeDasharray'],
  ['stroke-miterlimit', 'strokeMiterlimit'],
];
const options = {
  files: ['./src/components/Icons/**.tsx', './src/components/Icons/**/**.tsx'],
  from: replaceString.map((x) => new RegExp(x[0], 'g')),
  to: replaceString.map((x) => x[1]),
};

async function replaceSvg() {
  // replace svg
  try {
    const results = await (await import('replace-in-file')).replaceInFile(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

function isDir(path) {
  try {
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}

function autoImportFile(folderIcons) {
  const files = fs.readdirSync(folderIcons).filter((e) => e !== 'index.ts');
  let text = '';
  for (const file of files) {
    const path = join(folderIcons, file);
    if (isDir(path)) {
      autoImportFile(path);
    }
    text += `export * from './${file.replace('.tsx', '')}';\r\n`;
  }
  fs.writeFileSync(join(folderIcons, 'index.ts'), text);
}

async function run() {
  await replaceSvg();
  autoImportFile(join(__dirname, 'src', 'components', 'Icons'));
}

run();
