import Component from '../core/component.js'

export class Input extends Component {
  render() {
    const { type, placeholder, value, bind, ...rest } = this.attrs
    const { $value } = this.props

    const onChange = (e) => {
      if ($value) {
        const value = e.target.value
        this.attrs.value = value
      }
      this.onChange$.next(e)
    }

    return <input
      {...rest}

      type={type}
      placeholder={placeholder}
      value={value}

      onChange={onChange}
      onFocus={e => this.onFocus$.next(e)}
      onBlur={e => this.onBlur$.next(e)}
      onSelect={e => this.onSelect$.next(e)}

      className={this.className}
      style={this.style}
    />
  }
}
export default Input
