# Navigate

Navigate compoent is to jump/switch navigation from one route to another.

```js
import { Navigate } from 'nautil/components'

<Navigate
  navigation={navigation}
  to="article"
  params={{
    id: 123,
  }}
  replace={true}
  open={false}
  render={(goto, href, open) => {
    <a href={href} onClick={goto} target={open ? '_blank' : '_self'}>click to go</a>
  }}
/>
```

**props**

- navigation: which navigation to navigate
- to: target, it can be one of:
  - name: route name
  - -1: go back one history stack
  - url: external url
- params: parameters to pass to next navigation state
- open: Boolean, when `to` is a url, whether to open with `target="_blank"`
- replace: whether to replace history when swtich route
- render: Function