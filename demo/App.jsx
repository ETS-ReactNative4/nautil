import { Component, Navigation, Navigator, Navigate, Observer, Provider, Store, Depository, Switch, Case, Prepare, ObservableProvider } from '../index.js'
import { Section, Text, Button } from '../components.js'

import Page1 from './pages/Page1.jsx'
import Page2 from './pages/Page2.jsx'

const navigation = new Navigation({
  base: '/',
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'page1',
      path: '/page1',
    },
    {
      name: 'page2',
      path: '/page2/:id/:action?',
    },
  ],
})

const store = new Store({
  name: 'tomy',
  age: 10,
  info: {},
})

const depo = new Depository({
  expire: 2000,
})
depo.register({
  id: 'info',
  url: '/api',
})

depo.autorun(function() {
  const data = depo.get('info')
  store.state.info = data || {}
})

function Home() {
  return (
    <Section>
      <Section>
        <Text>Welcome to Nautil's world!</Text>
      </Section>
      <Section>
        <Navigate to="page1">
          <Button>Page1</Button>
        </Navigate>
        <Navigate to="page2" params={{ id: '123' }}>
          <Button>Page2</Button>
        </Navigate>
      </Section>
    </Section>
  )
}

class NotFound extends Component {
  static injectProviders = {
    $navigation: true,
  }
  render() {
    return (
      <Section>
        <Text>Not found! {this.$navigation.status}</Text>
      </Section>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Navigator navigation={navigation} dispatch={this.update}>
        <ObservableProvider
          name="$state" value={store.state}
          subscribe={dispatch => store.watch('*', dispatch)} dispatch={this.update}
        >
          <Provider name="$depo" value={depo}>
            <Prepare isReady={navigation.status !== '' && store.state.info.time} loadingComponent={<Text>loading...</Text>}>
              <Switch of={navigation.status}>
                <Case value="home">
                  <Home />
                </Case>
                <Case value="page1">
                  <Page1 />
                </Case>
                <Case value="page2">
                  <Page2 />
                </Case>
                <Case default>
                  <NotFound />
                </Case>
              </Switch>
            </Prepare>
          </Provider>
        </ObservableProvider>
      </Navigator>
    )
  }
}

export default App
