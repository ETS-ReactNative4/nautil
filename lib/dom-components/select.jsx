import Component from '../core/component.js'

export class Select extends Component {
  render() {
    const { value, placeholder, options, ...rest } = this.attrs
    const { $value } = this.props

    const onChange = (e) => {
      if ($value) {
        const value = e.target.value
        this.attrs.value = value
      }
      onChange$.next(e)
    }

    return (
      <select
        {...rest}

        value={value}
        onChange={onChange}

        className={this.className}
        style={this.style}
      >
        {placeholder ? <option disabled hidden style={{ display: 'none' }}>{placeholder}</option> : null}
        {options.map(item => <option key={item.value} value={item.value} disabled={item.disabled}>{item.text}</option>)}
      </select>
    )
  }
}
export default Select
