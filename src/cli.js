import inquirer from 'inquirer';
import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import consola from 'consola'
import TemplateFactory from './templates'

/**
 * Parse cli args
 * @param {array} rawArgs 
 */
const parseArgumentsToOptions = (rawArgs) => {
  const args = minimist(rawArgs.slice(2))
  return args
}

/**
 * Promp missing parameters to the user
 * @param {object} options 
 */
const promptMissingParameters = async options => {
  const questions = []
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Please write the component name',
      validate: (value) => {
        if (value.match(/^[a-zA-Z0-9]*$/)) {
          return true;
        }
        return 'Please enter a valid component name'
      }
    });

  }
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'select a template',
      choices: [
        'component-reselect-styled-connect'
      ]
    })
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    name: options.name || answers.name,
    template: options.template || answers.template
  };
}

/**
 * Resolve the location of the selected template 
 * @param {string} templateFolder template name 
 */
const resolveTemplateUrl = (templateFolder) => {
  if(!templateFolder){
    consola.error('Missing template folder');
  }
  const templateDir = path.resolve(
    __dirname,
    `./templates/${templateFolder}`
  );
  return templateDir
}

/**
 * Create the files using the template builder for the selecter template  
 * @param {objcet} param { template<string>: template name, name<string>: component name }
 */
const createFiles = ({ template, name }) => {
  const templateUrl = resolveTemplateUrl(template)
  if(!fs.existsSync(templateUrl)){
    consola.error('Template forlder does not exist');
    return;
  }
  TemplateFactory
    .getTemplateBuilder(template)
    .build({ templateUrl, name })
  
}

/**
 * CLI trigger
 * @param {array} args 
 */
export async function cli(args) {
  let options = parseArgumentsToOptions(args);
  options = await promptMissingParameters(options);
  consola.info('Creating files');
  createFiles(options);
}