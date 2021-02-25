import React from 'react'
import { breadcrumbMap } from 'src/route/menuConfig'
import { Breadcrumb } from 'antd'
import styles from './index.module.scss'

type BreadcrumbNavProps = {
  pathname: string
}

class BreadcrumbNav extends React.Component<BreadcrumbNavProps> {
  shouldComponentUpdate(nextProps: BreadcrumbNavProps) {
    return nextProps.pathname !== this.props.pathname
  }

  render() {
    const pathSnippets = this.props.pathname.split('/').filter(i => i)
    return (
      <Breadcrumb className={styles.breadcrumb}>
        {pathSnippets.map((_, index) => {
          if (index < 1) {
            return <Breadcrumb.Item key={index}>首页</Breadcrumb.Item>
          }
          const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
          return (
            <Breadcrumb.Item key={url}>{breadcrumbMap[url]}</Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
}

export default BreadcrumbNav
