import { Component } from '../component.js'
import { noop } from '../utils.js'

export class Button extends Component {
  static props = {
    onHint: Function,
    onHintStart: Function,
    onHintEnd: Function,
  }
  static defaultProps = {
    onHint: noop,
    onHintStart: noop,
    onHintEnd: noop,
  }
}
export default Button
