import Component from '../core/component.js'
import { Any, list, ifexist } from '../core/types.js'
import { noop } from '../core/utils.js'

export class Select extends Component {
  static injectProps = {
    $state: true,
  }
  static validateProps = {
    value: ifexist(Any),
    model: ifexist(String),

    options: list({
      text: String,
      value: Any,
      disabled: ifexist(Boolean),
    }),
    placeholder: ifexist(String),

    onChange: Function,
  }
  static defaultProps = {
    onChange: noop,
  }
}
export default Select
