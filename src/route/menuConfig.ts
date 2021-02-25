import route from 'src/route'

// @TODO: url输入/sss => 404 not found

const menuConfig: MenuConfig = [
  {
    name: '今日统计',
    path: route.DASHBOARD,
    icon: 'icon-tongji'
  },
  {
    name: '数据中心',
    path: route.DATA_CENTER,
    icon: 'icon-shuju',
    children: [
      {
        name: '数据总览',
        path: route.DATA_CENTER_ALL
      },
      {
        name: '订单数据',
        path: route.DATA_CENTER_ORDER
      }
    ]
  },
  {
    name: '门店管理',
    path: route.SHOP,
    icon: 'icon-mendian',
    children: [
      {
        name: '门店信息',
        children: [
          {
            name: '基础信息',
            path: route.SHOP_BASE
          },
          {
            name: '营业设置',
            path: route.SHOP_BUSINESS_SETTING
          }
        ]
      },
      {
        name: '商品库',
        children: [
          {
            name: '我的商品',
            path: route.SHOP_PRODUCT,
            breadcrumbMap: {
              [route.SHOP_PRODUCT_UPLOAD]: '同步渠道商品',
              [route.SHOP_PRODUCT_MERGE]: '手动合并商品',
              [route.SHOP_PRODUCT_EDIT]: '编辑商品',
              [route.SHOP_PRODUCT_ADD]: '新建商品'
            }
          }
          // {
          //   name: '回收站商品',
          //   path: route.SHOP_PRODUCT_RECYCLE
          // }
        ]
      },
      {
        name: '菜单配置',
        children: [
          {
            name: '菜单模版',
            path: route.SHOP_MENU,
            breadcrumbMap: {
              [route.SHOP_MENU_IMPORT]: '商品导入',
              [route.SHOP_MENU_UPLOAD]: '上传结果',
              [route.SHOP_MENU_PRODUCT_ADD]: '新建商品',
              [route.SHOP_MENU_PRODUCT_EDIT]: '编辑商品',
              [route.SHOP_MENU_IMPORT_EDIT]: '编辑商品'
            }
          }
          // {
          //   name: '其他模版',
          //   path: route.SHOP_MENU_TEMPLATE
          // },
          // {
          //   name: '使用记录',
          //   path: route.SHOP_MENU_RECORD,
          //   breadcrumbMap: {
          //     [route.SHOP_MENU_RECORD_DETAIL]: '记录详情'
          //   }
          // }
        ]
      }
    ]
  },
  {
    name: '账户管理',
    path: route.ACCOUNT,
    icon: 'icon-zhanghu',
    children: [
      {
        name: '账户信息',
        children: [
          {
            name: '基础设置',
            path: route.ACCOUNT_BASE
          },
          {
            name: '安全设置',
            path: route.ACCOUNT_SAFE
          }
        ]
      },
      {
        name: '第三方门店',
        children: [
          {
            name: '平台列表',
            path: route.ACCOUNT_PLATFORM,
            breadcrumbMap: {
              [route.ACCOUNT_PLATFORM_STORES]: '查看门店',
              [route.ACCOUNT_PLATFORM_RESULT]: '绑定结果'
            }
          }
        ]
      }
    ]
  }
]

const breadcrumbMap = (function mapToBreadcrumb(config: MenuConfigItem[]) {
  let ret: { [key: string]: string } = {}
  config.forEach(item => {
    if (Array.isArray(item.children)) {
      if (item.path) {
        ret[item.path] = item.name
      }
      ret = {
        ...ret,
        ...mapToBreadcrumb(item.children)
      }
    } else {
      ret[item.path as string] = item.name
      ret = {
        ...ret,
        ...(item.breadcrumbMap || {})
      }
    }
  })

  return ret
})(menuConfig)

export { menuConfig, breadcrumbMap }
