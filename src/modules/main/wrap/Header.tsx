import React from 'react'
import { Dropdown, Menu } from 'antd'
import classnames from 'classnames'
// import { sharedApis } from 'src/apis'
import IconFont from 'src/components/iconfont'
// import AsyncTask from 'src/components/async-task'
import route from 'src/route'
import app from 'src/app'
import utils from 'src/utils'
import styles from './index.module.scss'

function Header() {
  const userName = app.userInfo.userName
  return (
    <div className={styles.header}>
      {/* <AsyncTask /> */}
      <span />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <a
                onClick={async () => {
                  // await sharedApis.logout()
                  localStorage.removeItem('userInfo')
                  localStorage.removeItem('baseInfo')
                  window.location.href = route.LOGIN
                }}
              >
                退出登录
              </a>
            </Menu.Item>
          </Menu>
        }
      >
        <div className={styles.userBlock}>
          {app.userInfo.avatar ? (
            <img
              className={styles.avatar}
              alt=""
              src={utils.imageView2(app.userInfo.avatar)}
            />
          ) : (
            <div className={classnames(styles.avatar, styles.defaultAvatar)}>
              聚
            </div>
          )}
          <div>
            {userName || '管理员'}
            <IconFont
              type="icon-xiajiantou"
              style={{ fontSize: 12, marginLeft: 5 }}
            />
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
