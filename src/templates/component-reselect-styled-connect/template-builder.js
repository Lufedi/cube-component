import fs from 'fs'

const build = ({ templateUrl, name }) => {
  const fileNames = fs.readdirSync(`${templateUrl}/files`);
  fileNames.forEach(fileName => {
    const file = fs.readFileSync(`${templateUrl}/files/${fileName}`);
    let text = file.toString();
    text = replaceAll(text, 'COMPONENT_NAME', name);
    saveTextToFile(text, fileName.replace('comp', name));
  })
  consola.success('Files created');
}

const saveTextToFile = (text, fileName) => {
  fs.writeFileSync(`./${fileName}`, text);
}

const replaceAll = (text, pattern, value) => {
  let newText = text.replace(pattern, value);
  while (newText !== text) {
    text = newText;
    newText = text.replace(pattern, value);
  }
  return newText;
}

export default {
  build
}
