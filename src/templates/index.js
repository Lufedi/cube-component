import CompReselectStyledCompFilesBuilder from './component-reselect-styled-connect/template-builder'

const templates = {
  'component-reselect-styled-connect': CompReselectStyledCompFilesBuilder
}

const getTemplateBuilder = templateName => {
  if(!templates[templateName]){
    throw 'Missing template builder'
  }
  return templates[templateName]
}

export default {
  getTemplateBuilder
}


