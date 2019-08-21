import { connect } from 'react-redux'

import COMPONENT_NAME from './COMPONENT_NAME'
import COMPONENT_NAMESelector from './COMPONENT_NAME.selector'
import { translate } from 'react-translate'

export default translate('COMPONENT_NAME')(connect(
  COMPONENT_NAMESelector
)(COMPONENT_NAME))
