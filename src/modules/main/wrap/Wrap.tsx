import React from 'react'
import classnames from 'classnames'
import { Layout } from 'antd'
import history from 'src/utils/history'
import IconFont from 'src/components/iconfont'
import Header from './Header'
import SideMenu from './SideMenu'
import BreadcrumbNav from './Breadcrumb'
import styles from './index.module.scss'

class Wrap extends React.Component {
  state = {
    pathname: window.location.pathname
  }

  constructor(props: {}) {
    super(props)

    // document.getElementById('progressElement')!.style.width =
    //   Math.round(Math.random() * 15) + 5 + '%'
  }

  componentDidMount() {
    history.listen((location, action) => {
      if (action === 'POP') {
        this.setState({
          pathname: location.pathname
        })
      }
    })
  }

  render() {
    return (
      <div className={classnames(styles.wrap, 'ant-layout')}>
        <SideMenu pathname={this.state.pathname} />
        <div
          className={classnames(styles.containerLayout, 'ant-layout')}
          style={{ paddingLeft: 220 }}
        >
          <div className="ant-layout-content">
            <Header />
            <BreadcrumbNav pathname={this.state.pathname} />
            <div id="page" className={styles.page}></div>
          </div>
          <Layout.Footer>
            <div className={styles.footerLogo}>
              Copyright <IconFont type="icon-copyright" /> 2021 聚合呗科技
            </div>
          </Layout.Footer>
        </div>
      </div>
    )
  }
}

export default Wrap
