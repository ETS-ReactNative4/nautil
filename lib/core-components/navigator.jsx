import Component from '../core/component.js'
import Navigation from '../core/navigation.js'
import Observer from './observer.jsx'
import React from 'react'
import { enumerate, ifexist } from '../core/types.js'
import { isNumber, cloneElement } from '../core/utils.js'
import Text from '../components/text.jsx'

export class Navigator extends Component {
  static props = {
    navigation: Navigation,
    dispatch: ifexist(Function),
  }

  render() {
    const { navigation, dispatch } = this.attrs

    // const originals = Navigate.defaultProps
    // const hasuse = originals || {}
    // const willuse = { ...hasuse, navigation: this }
    // Navigate.defaultProps = willuse

    // console.log('render')
    // console.log(Navigate.defaultProps)

    const Page = () => {
      const { options, status, state } = navigation
      const isInside = options.routes.find(item => item.component)
      const { notFound } = options

      if (isInside) {
        return status === '!' ? notFound ? <notFound /> : null
          : status !== '' ? state.route.component ? <state.route.component /> : null
          : this.children
      }
      else {
        return this.children
      }
    }

    const update = dispatch ? dispatch : this.update
    const page = Page()
    const children = page || null

    const output = (
      <Observer subscribe={dispatch => navigation.on('*', dispatch)} unsubscribe={dispatch => navigation.off('*', dispatch)} dispatch={update}>
        {children}
      </Observer>
    )

    // Navigate.defaultProps = originals

    // console.log(output)

    return output
  }
}

export default Navigator

export class Navigate extends Component {
  static props = {
    navigation: Navigation,
    to: enumerate([String, Number]),
    params: Object,
    replace: Boolean,
    open: Boolean,
  }
  static defaultProps = {
    params: {},
    replace: false,
    open: false,
  }

  render() {
    const { to, params, replace, open, navigation } = this.attrs

    const go = () => {
      if (isNumber(to) && to < 0) {
        navigation.back(to)
      }
      else if (open) {
        navigation.open(to, params)
      }
      else {
        navigation.go(to, params, replace)
      }
    }

    return React.Children.map(this.children, (child) => {
      if (!child.type) {
        return <Text onHint={() => go()}>{child}</Text>
      }
      else {
        return cloneElement(child, { onHintEnd: () => go() })
      }
    })
  }
}