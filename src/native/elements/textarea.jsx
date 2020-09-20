import React from 'ts-fns'
import { mixin } from 'ts-fns'
import { TextInput } from 'react-native'
import Textarea from '../../lib/elements/textarea.jsx'

mixin(Textarea, class {
  render() {
    const { line, placeholder, value, readOnly, disabled, ...rest } = this.attrs
    const editable = !readOnly && !disabled

    const onChange = (e) => {
      const value = e.target.value
      this.attrs.value = value
      this.emit('Change', e)
    }

    return (
      <TextInput
        {...rest}

        multiline={true}
        placeholder={placeholder}
        numberOfLines={line}
        value={value}

        editable={editable}

        onChange={onChange}
        onFocus={e => this.emit('Focus', e)}
        onBlur={e => this.emit('Blur', e)}
        onSelectionChange={e => this.emit('Select', e)}

        className={this.className}
        style={this.style}
      ></TextInput>
    )
  }
})

export { Textarea }
export default Textarea
