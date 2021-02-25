import moment, { Moment } from 'moment'
// import { sharedApis } from 'shared/apis'
import app from 'src/app'

const webpFormat =
  !![].map &&
  document
    .createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0
    ? '/format/webp'
    : ''

const utils = {
  imageView2(url: string, width = 0, height = 0, domain?: string): string {
    if (!url) {
      return url
    }
    if (url.startsWith('http')) {
      return url
    }
    const base = '?imageView2/0/w/' + width + '/h/' + height

    const format = webpFormat
      ? webpFormat
      : url.endsWith('.png')
      ? ''
      : '/format/jpg'

    return (domain || app.baseInfo.resourceDomain) + url + base + format
  },

  staticImageView2(url: string, width = 0, height = 0) {
    return this.imageView2(
      url,
      width,
      height,
      app.baseInfo.staticDomain + '/shopkeeper_admin/'
    )
  },

  cents2yuan(v: number) {
    return v / 100
  },

  yuan2cents(v: number) {
    // 0.29 * 100
    return Math.round(v * 100)
  },

  log(data: any, ...args: any) {
    if (process.env.NODE_ENV === 'development') {
      if (data) {
        console.log(JSON.parse(JSON.stringify(data)), ...args)
      } else {
        console.log(data, ...args)
      }
    }
  },

  sleep(ms: number) {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), ms)
    })
  },

  // async getChannelInfo(allChannel?: boolean) {
  //   const {
  //     data: { list }
  //   } = await sharedApis.getAuthChannelList(allChannel)
  //   const options = list.map((item: any) => ({
  //     label: item.name,
  //     value: item.id || item.name
  //   }))
  //   const disabledOptions = list.map((item: any) => ({
  //     label: item.name,
  //     value: item.id || item.name,
  //     disabled: !item.id
  //   }))
  //   return {
  //     list: list.map((item: any) => {
  //       return {
  //         code: item.code,
  //         logo: item.logo,
  //         label: item.name,
  //         value: item.id || item.name,
  //         pid: item.pid,
  //         id: item.id
  //       }
  //     }),
  //     options,
  //     disabledOptions
  //   }
  // },

  // async updateUserInfo() {
  //   const { data: permsInfo } = await sharedApis.getPerms()
  //   app.userInfo = {
  //     ...app.userInfo,
  //     avatar: permsInfo.avatar,
  //     userName: permsInfo.username,
  //     perms: permsInfo
  //   }
  // },

  getShopId() {
    return app.userInfo.perms?.defaultOrgs?.[2].data?.id || ''
  },

  /** base64转File */
  dataURLtoFile(dataurl: string) {
    const arr = dataurl.split(',')
    const matchValue = arr[0].match(/:(.*?);/)
    if (matchValue) {
      const mime = matchValue[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let blob = new File(
        [u8arr],
        'file_' + Math.random().toString(36).substr(2),
        { type: mime }
      )
      return blob
    }
  },

  /**
   * 对象格式转换成moment数组
   * @param {Object} obj
   * @param {Array<[String, String]>} name
   * @example
   * const obj = { start: '2018-01-01', end: '2018-02-01' }
   * getRangePickerValues(obj, ['start', 'end'])
   * => [Moment('2018-01-01'), Moment('2018-02-01')]
   * @returns {Array<[Moment, Moment]> | undefined}
   */
  getRangePickerValues(
    obj: { [key: string]: string },
    fields: string[]
  ): [Moment, Moment] | undefined {
    if (Array.isArray(fields)) {
      if (obj[fields[0]] && obj[fields[1]]) {
        const start = moment(obj[fields[0]])
        const end = moment(obj[fields[1]])
        if (start.isValid() && end.isValid()) {
          return [start, end]
        }
      }
    }
    return undefined
  },

  // 获取符合antd分页组件的参数
  getPagination(
    data: any
  ): {
    current: number
    total: number
    pageSize: number
  } {
    if (!data) {
      return {
        current: 1,
        total: 0,
        pageSize: 10
      }
    }
    return {
      current: data.pageNum,
      total: data.total,
      pageSize: data.pageSize
    }
  },

  /**
   * 为没有值的字段设置占位符
   * @param {Object | Array<Object>} obj
   * @param {Array<String>} fields
   * @example
   * const obj = { name: '', age: 20 }
   * setPlaceholder(obj, ['name'])
   * => obj{ name: '-', age: 20 }
   * @example
   * const objArray = [{ name: '', age: 20 }, { name: 'divcss3', age: 0 }]
   * setPlaceholder(objArray, ['name', 'age'])
   * => objArray[{ name: '-', age: 20, { name: 'divcss3', age: '-' } }]
   * @return {undefined}
   */
  setPlaceholder(obj: Object | any, fields: any[], placeholder: string = '-') {
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        this.setPlaceholder(item, fields, placeholder)
      })
    } else {
      fields.forEach(field => {
        if (obj[field] !== 0 && !obj[field]) {
          if (obj[field] !== placeholder) {
            obj[field] = placeholder
          }
        }
      })
    }
  },

  /**
   * 将对象中指定的金额字段，由`分`转换成`元`
   * @param {Object} obj
   * @param {Array<String>} keys
   * @param {String} precision 精度
   * @example
   * const obj = { field1: 150, field2: undefined }
   * convertMoney(obj, ['field1', 'field2'])
   * => { field1: '¥1.5', field2: '-' }
   * @example
   * const obj = { field1: 150, field2: undefined }
   * convertMoney(obj, ['field1', 'field2'], '')
   * => { field1: 1.5, field2: '-' }
   */
  convertMoney(
    obj: Object | any,
    keys: Array<any>,
    symbol = '¥',
    precision = 2
  ) {
    if (obj) {
      keys.forEach(key => {
        obj[key] = obj[key] || 0
        if (!isNaN(obj[key])) {
          const number = +obj[key]
          obj[`${key}__raw`] = number
          obj[key] =
            number === 0
              ? `${symbol}0.${Array.from({ length: precision }, () => '0').join(
                  ''
                )}`
              : `${symbol}${Number(number / Math.pow(10, precision)).toFixed(
                  precision
                )}`
          if (symbol === '') {
            // 没有货币符号，一般来说要返回Number类型
            obj[key] = parseFloat(obj[key])
          }
        } else {
          obj[key] = '-'
        }
      })
    }
  }
}

export default utils
