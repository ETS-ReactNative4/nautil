import { createRef } from 'react'
import { mixin, throttle } from 'ts-fns'

import SwipeSection from '../../lib/elements/swipe-section.jsx'

mixin(SwipeSection, class {
  init() {
    this.dom = createRef()

    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchCancel = this.onTouchCancel.bind(this)

    if (this.props.throttle) {
      this.onTouchMove = throttle(this.onTouchMove, this.props.throttle)
    }

    this.touchStartX = 0
    this.startX = 0
    this.started = false
  }

  onMounted() {
    const { current } = this.dom
    current.addEventListener('touchstart', this.onTouchStart)
    current.addEventListener('touchmove', this.onTouchMove)
    current.addEventListener('touchend', this.onTouchEnd)
    current.addEventListener('touchcancel', this.onTouchCancel)
  }

  onUnmount() {
    const { current } = this.dom
    current.removeEventListener('touchstart', this.onTouchStart)
    current.removeEventListener('touchmove', this.onTouchMove)
    current.removeEventListener('touchend', this.onTouchEnd)
    current.removeEventListener('touchcancel', this.onTouchCancel)
  }

  onTouchStart(e) {
    const { clientX } = e.changedTouches[0]
    this.startX = clientX
  }

  onTouchMove(e) {
    const { clientX: currentX } = e.changedTouches[0]
    const { touchStartX, startX } = this
    const { sensitivity, distance, disabled } = this.attrs
    const touchMoveX = currentX - touchStartX

    if (disabled) {
      return
    }

    if (!this.started && this.isReached(touchMoveX, sensitivity)) {
      this.dispatch('Start', { startX: currentX })
      this.startX = currentX
      this.started = true
    }
    else if (this.started) {
      const moveX = currentX - startX
      this.dispatch('Move', { moveX, startX, currentX })

      // 当达到了可以执行 onEnd 的位置
      if (this.isReached(moveX, distance)) {
        this.dispatch('Reach', { moveX, startX, currentX })
      }
      // 未达到指定位置
      else {
        this.dispatch('Unreach', { moveX, startX, currentX })
      }
    }
  }

  isReached(moveX, target) {
    const { direction } = this.attrs
    const res = direction === 'right' ? moveX >= target
      : direction === 'left' ? -moveX >= target
        : Math.abs(moveX) >= target
    return res
  }

  onTouchEnd(e) {
    const { clientX: currentX } = e.changedTouches[0]
    const { startX } = this
    const { distance, disabled } = this.attrs
    const moveX = currentX - startX

    if (this.isReached(moveX, distance)) {
      if (!disabled) {
        this.dispatch('End', { moveX, startX, currentX })
      }
      else {
        this.dispatch('Cancel', { moveX, startX, currentX })
      }
    }
    else {
      this.dispatch('Cancel', { moveX, startX, currentX })
    }

    this.startX = 0
    this.started = false
  }

  onTouchCancel(e) {
    const { clientX: currentX } = e.changedTouches[0]
    const { startX } = this
    const moveX = currentX - startX

    this.dispatch('Cancel', { moveX, startX, currentX })

    this.startX = 0
    this.started = false
  }

  render() {
    const { sensitivity: _sensitivity, distance: _distance, direction: _direction, disabled: _disabled, ...rest } = this.attrs
    return (
      <div {...rest} ref={this.dom}>{this.children}</div>
    )
  }
})

export { SwipeSection }
export default SwipeSection
