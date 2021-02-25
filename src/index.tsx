import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Button } from 'antd'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import route from 'src/route'
import app from 'src/app'
import LoginPage from 'src/modules/login-page'
import Main from 'src/modules/main'
import history, { createHistory } from 'src/utils/history'
import ExceptionPage from 'src/components/exception-page'
import 'antd/dist/antd.css'
import './index.scss'

function render() {
  const { pathname } = window.location
  const isLoginPage = window.location.pathname === route.LOGIN
  const isFound =
    pathname === '/' ||
    Object.keys(route).some((item: string) => {
      return route[item] === pathname
    })
  if (!isFound) {
    ReactDOM.render(
      <ExceptionPage code={404} message="你访问的页面不存在">
        <Button
          type="primary"
          onClick={() => {
            window.location.href = route.MAIN
          }}
        >
          返回首页
        </Button>
      </ExceptionPage>,
      document.getElementById('root')
    )
    return
  }

  // if (!isLoginPage && !app.userInfo.token) {
  //   // 不在登录页并且没有token，跳到登录页
  //   history.replace({
  //     pathname: route.LOGIN,
  //     state: history.location.pathname + history.location.search
  //   })
  //   window.location.reload()
  //   return
  // }

  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Router history={createHistory()}>
        <Switch>
          <Route
            path={route.INDEX}
            exact
            render={() => <Redirect to={route.MAIN} />}
          />
          <Route path={route.LOGIN} component={LoginPage} />
          <Route path={route.MAIN} component={Main} />
        </Switch>
      </Router>
    </ConfigProvider>,
    document.getElementById('root') as HTMLElement
  )
}

render()
