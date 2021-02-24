import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Button } from 'antd'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import route from 'src/route'
import LoginPage from 'src/modules/login-page'
import history, { createHistory } from 'src/utils/history'
import ExceptionPage from 'src/components/exception-page'

function render() {
  const { pathname } = window.location
  const isFound =
    pathname === '/' ||
    Object.keys(route).some((item: string) => {
      return route[item] === pathname
    })
  console.log(process.env.NODE_ENV)
  if (isFound) {
    ReactDOM.render(
      <ExceptionPage code={404} message="你访问的页面不存在">
        <Button
          type="primary"
          onClick={() => {
            window.location.href = route.DASHBOARD
          }}
        >
          返回首页
        </Button>
      </ExceptionPage>,
      document.getElementById('root')
    )
    return
  }
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Router history={createHistory()}>
        <Switch>
          <Route
            path={route.INDEX}
            exact
            render={() => <Redirect to={route.LOGIN} />}
          />
          <Route path={route.LOGIN} component={LoginPage} />
        </Switch>
      </Router>
    </ConfigProvider>,
    document.getElementById('root') as HTMLElement
  )
}

render()
