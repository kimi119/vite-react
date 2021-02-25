export interface UserInfo {
  token?: string

  orgId?: string
  tenantId?: string
  userName: string
  avatar: string
  perms?: {
    defaultOrgs: {
      type: number
      data: {
        id: string
      }
    }[]
  }
}

interface BaseInfo {
  /** 浏览器指纹 */
  clientId: string
  /** 控制初始是否需要验证码，0需要  >0不需要 */
  noNeedCaptchaTimes: number
  /** 上传文件域名 */
  resourceDomain: string
  /** 前端静态域名 */
  staticDomain: string
  /** 租户id */
  tenantId: string

  /** 渠道信息 */
  channelInfo: {
    logo: string
  }
  /** 渠道id */
  channelId: string
  config: {
    logo: string
  }
}

class App {
  set clientId(data: string) {
    localStorage.setItem('clientId', data)
  }
  get clientId(): string {
    return localStorage.getItem('clientId')!
  }

  set pageStatus(data: number) {
    localStorage.setItem('pageStatus', JSON.stringify(data))
  }
  get pageStatus(): number {
    const pageStatus = localStorage.getItem('pageStatus')
    return pageStatus ? +pageStatus : 0
  }

  set baseInfo(data: BaseInfo) {
    localStorage.setItem('baseInfo', JSON.stringify(data))
  }
  get baseInfo() {
    try {
      const data = localStorage.getItem('baseInfo')
      if (typeof data === 'string') {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error(e)
    }
    return {} as BaseInfo
  }

  set userInfo(data: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  get userInfo() {
    try {
      const ret = localStorage.getItem('userInfo')
      if (typeof ret === 'string') {
        const data = JSON.parse(ret)
        return {
          token: data.token,
          orgId: data.orgId,
          tenantId: data.tenantId,
          userName: data.userName,
          avatar: data.avatar,
          perms: data.perms
        }
      }
    } catch (e) {
      console.error(e)
    }
    return {} as UserInfo
  }
}

export default new App()
