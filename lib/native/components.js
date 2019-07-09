import {
  Section,
  Text,
  Image,
  Line,
  Button,

  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,

  Audio,
  Video,
  Webview,
} from '../../components.js'
import { assign, parse } from '../core/utils.js'
import {
  View,
  Text as NativeText,
  Button as NativeButton,
  Image as NativeImage,
  ImageBackground,
  TextInput,
  Picker,
  WebView as NativeWebview,
} from 'react-native'
import CheckboxButton from './checkbox-button.jsx'
import RadioButton from './radio-button.jsx'

Object.assign(Section.prototype, {
  render() {
    const {
      onHint$,
      onHintEnter$,
      onHintStart$,
      onHintMove$,
      onHintEnd$,
      onHintLeave$,

      className,
      style,
      attrs,
      children,
    } = this

    const { pointerEvents } = style

    return <View
      nResponderGrant={e => onHintStart$.next(e)}
      onResponderMove={e => onHintMove$.next(e)}
      onResponderRelease={e => {
        onHintEnd$.next(e)
        onHint$.next(e)
      }}

      className={className}
      style={style}
      pointerEvents={pointerEvents}

      {...attrs}>{children}</View>
  },
})

Object.assign(Text.prototype, {
  render() {
    const {
      onHint$,
      onHintEnter$,
      onHintStart$,
      onHintMove$,
      onHintEnd$,
      onHintLeave$,

      className,
      style,
      attrs,
      children,
    } = this

    return <NativeText
      onPress={e => onHintEnd$.next(e)}

      className={className}
      style={style}

      {...attrs}>{children}</NativeText>
  },
})

Object.assign(Button.prototype, {
  render() {
    const {
      onHint$,
      onHintEnter$,
      onHintStart$,
      onHintMove$,
      onHintEnd$,
      onHintLeave$,

      className,
      style,
      attrs,
      children,
    } = this

    const { color } = style

    return <NativeButton
      onPress={e => onHintEnd$.next(e)}

      className={className}
      style={style}
      color={color}

      {...attrs}>{children}</NativeButton>
  },
})

Object.assign(Image.prototype, {
  render() {
    const {
      className,
      style,
      attrs,
      children,
    } = this
    var { source, width, height, maxWidth, maxHeight, ...props } = attrs

    width = width === Infinity ? 'auto' : width
    height = height === Infinity ? 'auto' : height

    const styles = { width, height, maxWidth, maxHeight, ...style }

    if (children) {
      return <ImageBackground source={source} style={styles} {...props}>{children}</ImageBackground>
    }
    else {
      return <NativeImage source={source} style={styles} {...props}></NativeImage>
    }
  },
})

Object.assign(Line.prototype, {
  render() {
    const {
      className,
      style,
      attrs,
    } = this
    const { width, thickness, color, ...props } = attrs
    const styles = { width, height: 0, borderBottomColor: color, borderBottomWidth: thickness, ...style }
    return <View {...props} style={styles}></View>
  },
})

Object.assign(Input.prototype, {
  render() {
    const {
      onChange$,
      onFocus$,
      onBlur$,
      onSelect$,

      $state,

      className,
      style,
      attrs,
    } = this
    const { type, placeholder, value, model, readOnly, disabled, ...props } = attrs

    const onChange = (e) => {
      if (model && $state) {
        const value = e.target.value
        assign($state, model, value)
      }
      onChange$.next(e)
    }

    const useValue = model && $state ? parse($state, model) : value
    const editable = !readOnly && !disabled

    return <TextInput
      {...props}

      textContentType={type}
      placeholder={placeholder}
      value={useValue}

      editable={editable}

      onChange={onChange}
      onFocus={e => onFocus$.next(e)}
      onBlur={e => onBlur$.next(e)}
      onSelectionChange={e => onSelect$.next(e)}

      className={className}
      style={style}></TextInput>
  },
})

Object.assign(Textarea.prototype, {
  render() {
    const {
      onChange$,
      onFocus$,
      onBlur$,
      onSelect$,

      $state,

      className,
      style,
      attrs,
    } = this
    const { line, placeholder, value, model, readOnly, disabled, ...props } = attrs

    const onChange = (e) => {
      if (model && $state) {
        const value = e.target.value
        assign($state, model, value)
      }
      onChange$.next(e)
    }

    const useValue = model && $state ? parse($state, model) : value
    const editable = !readOnly && !disabled

    return <TextInput
      {...props}

      multiline={true}
      placeholder={placeholder}
      numberOfLines={line}
      value={useValue}

      editable={editable}

      onChange={onChange}
      onFocus={e => onFocus$.next(e)}
      onBlur={e => onBlur$.next(e)}
      onSelectionChange={e => onSelect$.next(e)}

      className={className}
      style={style}></TextInput>
  },
})

Object.assign(Checkbox.prototype, {
  render() {
    const {
      onCheck$,
      onUncheck$,

      $state,

      className,
      style,
      attrs,
    } = this
    const { checkedValue, uncheckedValue, model, checked, color, ...props } = attrs

    const onChange = (e) => {
      if (model && $state) {
        const nextValue = checked ? uncheckedValue : checkedValue
        assign($state, model, nextValue)
      }

      if (checked) {
        onUncheck$.next(e)
      }
      else {
        onCheck$.next(e)
      }
    }

    return <CheckboxButton
      {...props}

      checked={checked}
      onChange={onChange}
      color={color}

      className={className}
      style={style}></CheckboxButton>
  },
})

Object.assign(Radio.prototype, {
  render() {
    const {
      onCheck$,
      onUncheck$,

      $state,

      className,
      style,
      attrs,
    } = this
    const { value, model, checked, color, ...props } = attrs

    const onChange = (e) => {
      if (model && $state && checked) {
        assign($state, model, value)
      }

      if (checked) {
        onUncheck$.next(e)
      }
      else {
        onCheck$.next(e)
      }
    }

    return <RadioButton
      {...props}

      checked={checked}
      onChange={onChange}
      color={color}

      className={className}
      style={style}></RadioButton>
  },
})

Object.assign(Select.prototype, {
  render() {
    const {
      onChange$,

      $state,

      className,
      style,
      attrs,
    } = this
    const { value, model, placeholder, options, readOnly, disabled, ...props } = attrs

    const onChange = (e) => {
      if (model && $state) {
        const value = e.target.value
        assign($state, model, value)
      }
      onChange$.next(e)
    }

    const useValue = model && $state ? parse($state, model) : value
    const enabled = !readOnly && !disabled

    return <Picker
      {...props}

      selectedValue={useValue}
      onValueChange={onChange}
      enabled={enabled}
      prompt={placeholder}

      className={className}
      style={style}>
      {options.map(item => item.disabled ? null : <Picker.Item key={item.value} value={item.value} label={item.text}></Picker.Item>)}
    </Picker>
  },
})

Object.assign(Audio.prototype, {
  render() {
    const { children, ...props } = this.props
    return <audio {...props}>{children}</audio>
  },
})

Object.assign(Video.prototype, {
  render() {
    const { children, ...props } = this.props
    return <video {...props}>{children}</video>
  },
})

Object.assign(Webview.prototype, {
  render() {
    const { children, source, ...props } = this.props
    return <WebView source={source} {...props}>{children}</WebView>
  },
})