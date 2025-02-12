import * as TySheMo from 'tyshemo'
import * as React from 'react'
import produce from 'immer'

export { TySheMo, React, produce }

export {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
  Fragment,
  createElement,
  cloneElement,
  Children,
  createRef,
  isValidElement,
  PureComponent,
  createContext,
  Suspense,
  lazy,
  memo,
  forwardRef,
} from 'react'

export {
  Ty,
  Dict,
  Tupl,
  /**
   * @deprecated
   */
  Tuple,
  List,
  Enum,
  Range,
  Mapping,
  SelfRef,
  Shape,

  ifexist,
  nonable,

  Any,
  None,
  Numeric,
  Int,

  Model,
  Meta,
  Validator,
  Factory,
  AsyncGetter,
  MemoGetter,
  createMeta,
  createMetaGroup,

  meta,
  state,
  enhance,
  eject,
} from 'tyshemo'

export { Component } from './lib/core/component.js'

export { createTwoWayBinding, isShallowEqual, isRef, noop } from './lib/utils.js'

export { useTwoWayBinding, useTwoWayBindingState, useTwoWayBindingAttrs } from './lib/hooks/two-way-binding.js'
export { useUniqueKeys } from './lib/hooks/unique-keys.js'
export { useModel, useModelReactor } from './lib/hooks/model.js'
export { useController, applyController } from './lib/hooks/controller.js'
export { useShallowLatest } from './lib/hooks/shallow-latest.js'
export { useForceUpdate } from './lib/hooks/force-update.js'
export { useDataSource, useLazyDataSource } from './lib/hooks/data-source.js'

export { observe, evolve, inject, initialize, nest, decorate } from './lib/decorators/decorators.js'
export { pipe } from './lib/decorators/combiners.js'

export { Async } from './lib/components/async.jsx'
export { For, Each } from './lib/components/for-each.jsx'
export { If, Else, ElseIf } from './lib/components/if-else.jsx'
export { Observer } from './lib/components/observer.jsx'
export { Prepare } from './lib/components/prepare.jsx'
export { Static } from './lib/components/static.jsx'
export { Switch, Case } from './lib/components/switch-case.jsx'

export { Section } from './lib/elements/section.jsx'
export { Text } from './lib/elements/text.jsx'
export { Button } from './lib/elements/button.jsx'
export { Line } from './lib/elements/line.jsx'

export { Form } from './lib/elements/form.jsx'
export { Select } from './lib/elements/select.jsx'
export { Checkbox } from './lib/elements/checkbox.jsx'
export { Input } from './lib/elements/input.jsx'
export { Radio } from './lib/elements/radio.jsx'
export { Textarea } from './lib/elements/textarea.jsx'

export { ListSection } from './lib/elements/list-section.jsx'
export { ScrollSection } from './lib/elements/scroll-section.jsx'
export { SwipeSection } from './lib/elements/swipe-section.jsx'

export { Image } from './lib/elements/image.jsx'
export { Audio } from './lib/elements/audio.jsx'
export { Video } from './lib/elements/video.jsx'
export { Webview } from './lib/elements/webview.jsx'

export { Animation } from './lib/animate/animation.jsx'

export { Store } from './lib/store/store.js'
export { Provider, Consumer, connect, useStore } from './lib/store/context.jsx'
export { applyStore } from './lib/store/shared.js'

export { Stream, createStream } from './lib/core/stream.js'
export { Service } from './lib/core/service.js'
export { DataService, isDataSource } from './lib/services/data-service.js'
export { QueueService, SerialQueueService, ParallelQueueService, ShiftQueueService, SwitchQueueService } from './lib/services/queue-service.js'
export { EventService } from './lib/services/event-service.js'
export { Controller } from './lib/core/controller.js'
export { View } from './lib/core/view.jsx'

export { Storage } from './lib/storage/storage.js'

export { I18n } from './lib/i18n/i18n.class.js'
export { useI18n, useLanguage, useTranslate } from './lib/i18n/i18n.jsx'
export { LanguageDetector } from './lib/i18n/language-detector.js'

export {
  Router,
  Link,
  useRouteNavigate,
  useLocation,
  useHistoryListener,
  useRouteParams,
  useRouteMatch,
  useRouteLocation,
  useRoutePrefetch,
  createRouteComponent,
  createRouteState,
  Route,
} from './lib/router/router.jsx'

export {
  createBootstrap,
  createAsyncComponent,
  importModule,
  useModuleNavigator,
  useModuleContext,
  useModuleI18n,
  useModuleParams,
} from './lib/core/module.jsx'
