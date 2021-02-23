import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { Router, Route, Switch } from 'react-router-dom'
import { createHistory } from 'src/utils/history'
import zhCN from 'antd/lib/locale/zh_CN'
import route from 'src/route'
import LoginPage from 'src/modules/login-page'
// import './index.scss'
// import App from './App'

// const xxx = require('node-sass')
// import 'node-sass'

function render() {
  // const store = initStore({})
  // store.runSaga()
  // loading()
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Router history={createHistory()}>
        <Switch>
          <Route path={route.LOGIN} component={LoginPage} />
        </Switch>
      </Router>
    </ConfigProvider>,

    document.getElementById('root')
  )
}

render()
