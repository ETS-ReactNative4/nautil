import Component from './component.js'
import Navigation from './navigation.js'
import Observer from './observer.jsx'
import { Provider, Consumer } from './provider.jsx'
import React from 'react'
import { noop } from './utils.js'
import { ifexist } from './types.js'

export class Navigator extends Component {
  static validateProps = {
    name: ifexist(String),
    navigation: Navigation,
    dispatch: Function,
  }

  render() {
    const { name, navigation, dispatch } = this.attrs
    return (
      <Observer subscribe={dispatch => navigation.on('*', dispatch)} dispatch={dispatch}>
        <Provider name={name || '$navigation'} value={navigation}>
          {this.children}
        </Provider>
      </Observer>
    )
  }
}

export default Navigator

export class Navigate extends Component {
  static validateProps = {
    to: String,
    params: Object,
    replace: Boolean,
    open: ifexist(String),
  }
  static defaultProps = {
    params: {},
    replace: false,
  }

  render() {
    const { to, params, replace, open } = this.attrs
    return (
      <Consumer name="$navigation">
        {(navigation) => {
          const go = () => {
            if (open) {
              navigation.open(open, params)
            }
            else {
              navigation.go(to, params, replace)
            }
          }
          return React.Children.map(this.children, (child) => {
            if (!child.type) {
              return <Text onHintEnd={() => go()}>{child}</Text>
            }
            else {
              return React.cloneElement(child, { onHintEnd: () => go() })
            }
          })
        }}
      </Consumer>
    )
  }

}