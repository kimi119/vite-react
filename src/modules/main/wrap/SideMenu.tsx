import React from 'react'
import { Menu } from 'antd'
// import shallowEqual from 'fbjs/lib/shallowEqual'
import shallowEqual from 'shallowequal'
import history from 'src/utils/history'
import route from 'src/route'
// import app from 'src/app'
// import utils from 'src/utils'
import IconFont from 'src/components/iconfont'
import { menuConfig } from 'src/route/menuConfig'
import styles from './index.module.scss'

type SideMenuState = {
  pathname: string
  openKeys: React.ReactText[]
  selectKey: string
}

type SideMenuProps = {
  pathname: string
}

function getPathname(pathname: string, size: number): string {
  return pathname.split('/').slice(0, size).join('/')
}

class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
    super(props)
    this.state = {
      pathname: props.pathname,
      openKeys: menuConfig.map(item => item.path), // 默认展开全部
      selectKey: this.getSelectedKey()
    }
  }

  static getDerivedStateFromProps(
    nextProps: SideMenuProps,
    prevState: SideMenuState
  ) {
    if (prevState.pathname !== nextProps.pathname) {
      return {
        pathname: nextProps.pathname,
        selectKey: getPathname(nextProps.pathname, 3),
        openKeys: Array.from(
          new Set([...prevState.openKeys, getPathname(nextProps.pathname, 2)])
        )
      }
    }

    return null
  }

  shouldComponentUpdate(nextProps: SideMenuProps, nextState: SideMenuState) {
    return (
      nextProps.pathname !== this.props.pathname ||
      !shallowEqual(nextState, this.state)
    )
  }

  getSelectedKey(): string {
    if (history.location.pathname === '/') {
      return route.DASHBOARD
    }
    return getPathname(history.location.pathname, 3)
  }

  handleMenuClick = (item: MenuConfigItem): void => {
    if (!history.location.search && history.location.pathname === item.path) {
      return
    }
    history.push({
      pathname: item.path
    })
  }

  render() {
    // const avatar = app.userInfo.avatars
    return (
      <div className={styles.sideMenuWrap}>
        <div className={styles.logo}>
          🇨🇳
          {/* <div className={styles.imgWrap}>
            <img
              src={
                app.baseInfo.channelInfo.logo
                  ? utils.imageView2(app.baseInfo.channelInfo.logo)
                  : utils.staticImageView2('3ChtSQ39.png')
              }
              alt=""
            />
          </div> */}
        </div>
        <Menu
          style={{ width: 256 }}
          selectedKeys={[this.state.selectKey]}
          openKeys={this.state.openKeys.map(item => item + '')}
          className={styles.sideMenu}
          onOpenChange={openKeys => {
            this.setState({
              openKeys
            })
          }}
          theme="dark"
          mode="inline"
        >
          {menuConfig.map(first => {
            if (Array.isArray(first.children)) {
              return (
                <Menu.SubMenu
                  key={first.path}
                  icon={
                    <IconFont
                      type={first.icon || ''}
                      style={{ color: '#fff' }}
                    />
                  }
                  title={first.name}
                >
                  {first.children.map((second, secondIndex) => {
                    if (Array.isArray(second.children)) {
                      return (
                        <Menu.ItemGroup key={secondIndex} title={second.name}>
                          {second.children.map(third => {
                            return (
                              <Menu.Item
                                key={third.path}
                                onClick={() => this.handleMenuClick(third)}
                              >
                                {third.name}
                              </Menu.Item>
                            )
                          })}
                        </Menu.ItemGroup>
                      )
                    } else {
                      return (
                        <Menu.Item
                          key={second.path}
                          onClick={() => this.handleMenuClick(second)}
                        >
                          {second.name}
                        </Menu.Item>
                      )
                    }
                  })}
                </Menu.SubMenu>
              )
            } else {
              return (
                <Menu.Item
                  key={first.path}
                  onClick={() => this.handleMenuClick(first)}
                  icon={
                    <IconFont type="icon-tongji" style={{ color: '#fff' }} />
                  }
                >
                  {first.name}
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </div>
    )
  }
}

export default SideMenu
