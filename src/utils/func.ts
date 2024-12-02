import moment from 'moment'
import { h } from 'vue'
import Decimal from 'decimal.js'
import { ElMessageBox } from 'element-plus'

// 获取类型
export function getType(obj: any) {
  return Object.prototype.toString.call(obj)
}

// 判断是否是一个对象
export function isObject(obj: any) {
  return getType(obj) === '[object Object]'
}

// 判断是否是一个数组
export function isArray(obj: any) {
  return getType(obj) === '[object Array]'
}

/**
 * 转换对象中的-1为null
 * @param {Object} params
 * @return {*}
 */
export function formatAllTypeParams(params: any): any {
  if (!isObject(params)) return params
  const obj = { ...params }
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '-1') {
      obj[key] = null
    }
  })
  return obj
}

// 判断是否非空, 防止隐式转换
export function isEmpty(obj: any, arg = '') {
  let params = obj

  const emptyTypeList = [undefined, null, '']
  if (arg) emptyTypeList.push(arg)
  if (typeof params === 'string') {
    params = params.trim()
  }
  return emptyTypeList.includes(params)
}

// 判断不为空
export function isNotEmpty(obj: any, arg = '') {
  return !isEmpty(obj, arg)
}

// 深度拷贝 - 不包含函数拷贝
export function deepClone(obj: object | Array<any>, defaultData: object) {
  if (!isObject(obj) && !isArray(obj)) {
    if (defaultData) return defaultData
    else return new Error('传入的参数必须是一个对象或一个数组')
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 深度拷贝 - 包含函数拷贝
 * @param {Object | Array<Object>} o
 * @return {Object | Array<Object>}
 */
export function deepCopy(o: any): object | Array<object> {
  let m: any

  switch (true) {
    case isObject(o):
      m = {}
      let key, val
      for ([key, val] of Object.entries(o)) {
        m[key] = deepCopy(val)
      }
      break
    case isArray(o):
      m = []
      o.forEach((tmp: any) => {
        m.push(deepCopy(tmp))
      })
      break
    default:
      m = o
  }
  return m
}

/**
 * 获取localStorage的值，可选择是否序列化
 * @param {string} key 取值字段
 * @param {boolean} [useFormatter] 是否进行序列化
 * @param {any} [defaultData] 取值失败时使用的默认值
 */
export function getLocal(key: string, useFormatter: boolean, defaultData: any) {
  if (useFormatter) {
    let obj = window.localStorage.getItem(key)

    if (!obj) {
      return defaultData
    } else {
      try {
        obj = JSON.parse(obj)
      } catch (e) {
        obj = defaultData
      }
      return obj
    }
  }
  return window.localStorage.getItem(key)
}

/**
 * 存储至localStorage
 * @param {string} key 存储字段
 * @param {Object | Array | string | number} obj 存储数据
 */
export function setLocal(key: string, obj: any) {
  const saveData = isObject(obj) || isArray(obj) ? JSON.stringify(obj) : obj

  return window.localStorage.setItem(key, saveData)
}

/**
 * 防抖函数
 * @param {function} func 函数
 * @param {number} wait 时间(毫秒)
 * @return {function}
 */
export function debounce(func: Function, wait: number): Function {
  let timer: any

  return function (this: MouseEvent) {
    const context = this,
      args = arguments

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

// 节流
export function throttle(method: Function, delay: number, duration: number) {
  let timer: any = null
  let begin: any = new Date()
  return function (this: MouseEvent) {
    const context = this,
      args = arguments
    const current: any = new Date()
    clearTimeout(timer)
    if (current - begin >= duration) {
      method.apply(context, args)
      begin = current
    } else {
      timer = setTimeout(function () {
        method.apply(context, args)
      }, delay)
    }
  }
}
/**
 * 数组根据某字段进行分组
 * @param {Object[]} list 需要进行分组的数组
 * @param {function(item: Object): string | Array | Symbol} fn 根据此回调返回的内容进行分组
 * @return {Object}
 */
export function groupBy(list: Array<object>, fn: Function): object {
  if (!Array.isArray(list)) return {}
  const obj: any = {}

  list.forEach((item) => {
    obj[fn(item)] = obj[fn(item)] || []
    obj[fn(item)].push(item)
  })
  return obj
}

/**
 * 绑定外部js的上下文, 请注意需要绑定this的函数必须声明为function函数而不是箭头函数, 否则函数的this将自动绑定
 * @param {Object[]} paramsList - 需要绑定的list
 * @param {string[]} keyList - key的集合
 * @param {Object} context - 传this
 */
export function bindContext(paramsList: object[], keyList: string[], context: object) {
  let list: any = [...paramsList]

  if (!list || !keyList || !context) return
  list = deepCopy(list)
  list.forEach((item: any) => {
    keyList.forEach((key) => {
      if (item[key] instanceof Function) {
        item[key] = item[key].bind(context)
      }

      if (isObject(item[key])) {
        const obj: any = {}

        Object.keys(item[key]).forEach((itemKey) => {
          if (item[key][itemKey] instanceof Function) {
            obj[itemKey] = item[key][itemKey].bind(context)
          } else {
            obj[itemKey] = item[key][itemKey]
          }
        })
        item[key] = obj
      }
      if (item[key] instanceof Function) {
        item[key] = item[key].bind(context)
      }
    })
  })
  return list
}

/**
 * 开始/结束日期互斥
 * @param {Date} currentDate - 当前日期
 * @param {string} type - 类型(start代表开始日期，end代表结束日期)
 * @param {Date} otherDate - 用于比较的日期
 * @return {boolean} - true代表禁用, false代表启用
 */
export function timeDisabled(currentDate: Date, otherDate: Date, type: string): boolean {
  if (type === 'start' && currentDate && otherDate) return currentDate.getTime() > moment(otherDate).valueOf()
  if (type === 'end' && currentDate && otherDate) return currentDate.getTime() < moment(otherDate).valueOf()
  return false
}

/**
 * 将数字转换为千分位逗号分隔字符串
 * @param {number} number
 */
export function toThousands(number: string) {
  if (typeof number !== 'number' || isNaN(number)) return '0'
  const prefix = number >= 0 ? '' : '-',
    afterNumber = String(number).split('.')[1] || '',
    mainNumber = String(Math.abs(parseInt(number))),
    cutLength = 3,
    mainNumberArr = mainNumber.split(''),
    startLength = mainNumberArr.length % cutLength,
    startStr = mainNumberArr.slice(0, startLength).join('')

  let resStr = ''

  for (let i = startLength; i < mainNumberArr.length; i += cutLength) {
    resStr += mainNumberArr.slice(i, i + cutLength).join('')
    if (i + cutLength < mainNumberArr.length) {
      resStr += ','
    }
  }
  return `${prefix}${startStr || ''}${startStr && resStr ? ',' : ''}${resStr}${afterNumber ? '.' : ''}${afterNumber}`
}

// decimal - 加法
export function addDecimal() {
  const array = Array.from(arguments),
    num = array.reduce((total, item) => {
      const _total = total || 0
      const _item = item || 0
      if (typeof _item !== 'string' && typeof _item !== 'number') {
        return _total
      } else {
        return new Decimal(_total).add(new Decimal(_item))
      }
    })

  return num.toNumber()
}

// decimal - 减法
export function subDecimal() {
  const array = Array.from(arguments),
    num = array.reduce((total, item) => {
      const _total = total || 0
      const _item = item || 0
      if (typeof _item !== 'string' && typeof _item !== 'number') {
        return total
      } else {
        return new Decimal(_total).sub(new Decimal(_item))
      }
    })

  return num.toNumber()
}

// decimal - 乘法
export function mulDecimal() {
  const array = Array.from(arguments),
    num = array.reduce((total, item) => {
      const _total = total || 0
      const _item = item || 0
      if (typeof _item !== 'string' && typeof _item !== 'number') {
        return _total
      } else {
        return new Decimal(_total).mul(new Decimal(_item))
      }
    })

  return num.toNumber()
}

// decimal - 除法
export function divDecimal() {
  const array = Array.from(arguments),
    num = array.reduce((total, item) => {
      const _total = total || 0
      const _item = item || 0
      if (typeof _item !== 'string' && typeof _item !== 'number') {
        return _total
      } else if (_item === 0 || _item === '0') {
        return new Decimal(0)
      } else {
        return new Decimal(_total).div(new Decimal(_item))
      }
    })

  return num.toNumber()
}

/**
 * decimal - 保留小数位
 * @param {Number|String} value - 要保留的值
 * @param {Number} digit - 保留的位数
 * @return {Number} - 返回数字
 */
export function fixedDecimal(value: number | string = 0, digit: number = 0): number {
  const fixed = new Decimal(value).toFixed(digit)

  return new Decimal(fixed).toNumber()
}

/**
 * decimal - 保留小数位，不舍弃小数点后的0
 * @param {Number|String} paramsValue - 要保留的值
 * @param {Number} digit - 保留的位数
 * @param {Boolean} useThousands - 是否需要千分位分隔
 * @param {Boolean} skipEmpty - 不对空值进行转换
 * @return {String} - 返回字符串
 */
export function fixedDecimalString(paramsValue: number | string, digit: number = 0, useThousands: boolean = true, skipEmpty: boolean = false): string {
  let value: any = paramsValue

  if (isEmpty(value) || isNaN(value)) {
    if (skipEmpty) {
      return ''
    } else {
      value = 0
    }
  }
  // 如果需要千分位的分隔
  if (useThousands) {
    const fixed = new Decimal(value).toFixed(digit),
      arr: string[] = fixed.split('.')

    arr[0] = toThousands(arr[0])
    return arr.join('.')
  } else {
    return new Decimal(value).toFixed(digit)
  }
}

/**
 * 根据form配置项创建一个默认表单对象
 * @param {Array<Object>} options - 表单配置项
 * @param {Object} defaultValue - 表单默认值
 */
export function createDefaultForm(options: any | Array<object> = [], defaultValue: any | object = {}) {
  const obj: any = {}

  if (!(options instanceof Array)) return obj
  const keys = options.map((item: any) => item.key)

  keys.forEach((key: any, index) => {
    const value = defaultValue[key]

    if (isNotEmpty(value)) {
      obj[key] = value
    } else {
      const defaultValue = options[index].defaultValue

      obj[key] = isNotEmpty(defaultValue) ? defaultValue : ''
    }
  })
  return obj
}

/**
 * 转换0和1为boolean, 请在提交时使用
 * @param {Object} form
 * @param {string[]} keyList
 * @return {Object}
 */
export function transStringToBoolean(form: object, keyList: string[]): object {
  const obj: any = deepCopy(form)

  Object.keys(obj).forEach((key: string) => {
    if (keyList.includes(key)) {
      if (obj[key] !== '-1') {
        obj[key] = obj[key] === '1'
      } else {
        obj[key] = ''
      }
    }
  })
  return obj
}

/**
 * 将boolean值转换为0和1，请在获取数据时使用
 * @param {Object} form
 * @param {string[]} keyList
 * @return {Object}
 */
export function transBooleanToString(form: object, keyList: string[]): object {
  const obj: any = deepCopy(form)

  Object.keys(obj).forEach((key) => {
    if (keyList.includes(key)) {
      obj[key] = obj[key] === true ? 1 : 0
    }
  })
  return obj
}

/**
 * 将-1转换成空，用于转换查询下拉框的全部选项
 * @param {Object} form
 * @param {string[]} keyList
 * @return {Object}
 */
export function transMinusoneToEmpty(form: object, keyList: string[]): object {
  const obj: any = deepCopy(form)

  Object.keys(obj).forEach((key) => {
    if (keyList.includes(key) && obj[key] === '-1') {
      obj[key] = ''
    }
  })
  return obj
}

/**
 * 表格中的表单数据校验
 * @param {Object[]} tableData 表格数据
 * @param {Object} rules 校验规则
 * @return {Promise}
 */
export function validateTableData(tableData: Array<object>, rules: any): any {
  let errList: any = []

  let state = true

  tableData.forEach((item: any, index: number) => {
    let str = '',
      isFirst = false

    Object.keys(rules).forEach((key: any) => {
      rules[key](item[key], item, (err: any) => {
        if (err) {
          if (!isFirst) {
            str += `第${index + 1}行：`
            isFirst = true
          }
          state = false
          str += `${err.message};`
        }
      })
    })
    errList.push(str)
  })
  if (!state) {
    ElMessageBox({
      title: '校验失败',
      type: 'error',
      message: () => {
        let messageList: any = []
        errList.forEach((item: string) => {
          const str = item.split(';').join(', ')
          messageList.push(h('p', null), str.substring(0, str.length - 2))
        })
        return h('div', { 'max-height': '500px', 'overflow-y': 'auto' }, messageList)
      },
    })
    return Promise.reject(new Error('校验失败'))
  }
  return Promise.resolve()
}

/**
 * 双数组对比取出不同部分
 * @param {Object[]} list1 原始数组
 * @param {Object[]} list2 新数组
 * @param {string} onlyKey 主键key
 * @return {Object[]} 不同项数组
 */
export function excludeArray(list1: any, list2: any, onlyKey: any): object[] {
  if (!isArray(list1) || !isArray(list2)) {
    // eslint-disable-next-line no-console
    console.error('传入的前两个参数必须都为数组')
    return []
  }
  if (isEmpty(onlyKey)) {
    // eslint-disable-next-line no-console
    console.error('请传入对比用的key, 且必须为唯一值字段')
    return []
  }
  const arr: any = []

  list2.forEach((item: any) => {
    const findData = list1.find((tmp: any) => tmp[onlyKey] === item[onlyKey])

    if (!findData) arr.push(item)
  })
  return arr
}

/**
 * 字符串转字节数组
 * @param {string} str
 * @return {any[]}
 */
export function stringToByteArray(str: string): any[] {
  const bytes = []
  let c
  const len = str.length
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0)
      bytes.push(((c >> 12) & 0x3f) | 0x80)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0)
      bytes.push((c & 0x3f) | 0x80)
    } else {
      bytes.push(c & 0xff)
    }
  }
  return bytes
}

/**
 * 密码转hex
 * @param {any[]} byteArray
 * @return {string}
 */
export function byteToHex(byteArray: any[]): string {
  const HEX_ARRAY_STR = '0123456789ABCDEF'
  const HEX_ARRAY = HEX_ARRAY_STR.split('')
  const arr = new Array(byteArray.length * 2)
  for (let j = 0; j < byteArray.length; ++j) {
    const v = byteArray[j] & 255
    arr[j * 2] = HEX_ARRAY[v >>> 4]
    arr[j * 2 + 1] = HEX_ARRAY[v & 15]
  }
  return arr.join('')
}
/**
 * 双数组批量对比删除方法
 * @param {Object[]} list1 - 被选中数组
 * @param {Object[]} list2 - 原始对照数组
 * @param {string} key - 对比的key
 * @return {Array}
 */
export function dbListSplice(list1: any, list2: object[], key: string): Array<any> {
  const copyList: any = deepCopy(list2)
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < copyList.length; j++) {
      if (list1[i][key] === copyList[j][key]) {
        copyList.splice(j, 1)
        j--
      }
    }
  }
  return copyList
}

export function copyText(str: string) {
  const oInput = document.createElement('input')
  oInput.value = str
  document.body.appendChild(oInput)
  oInput.select() // 选择对象 此方法在ios的浏览器中可能无法正常执行全选,如需在ios环境中使用,需要调用setSelectionRange
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
}

/**
 * 使用文件原名称下载文件
 * @param {string} path 文件下载路径
 * @param {string} sourceName 文件原名称
 * @param {string} sourceType 文件类型
 */
export function downloadFile(path: string, sourceName: string) {
  const request = new XMLHttpRequest(),
    fileUrl = path,
    fileName = sourceName

  request.open('GET', fileUrl, true)
  request.responseType = 'blob'

  return new Promise((resolve: Function, reject: Function) => {
    request.onload = function () {
      const tempUrl = window.URL.createObjectURL(request.response),
        href = document.createElement('a')
      href.href = tempUrl
      href.download = fileName
      href.click()
      href.remove()
      resolve()
    }
    request.onerror = function () {
      reject()
    }
    request.send()
  })
}

// 判断是否json
export function isJSON(str: string) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
}
