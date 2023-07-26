/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

function checkDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

// 深度克隆
export function clone(data) {
  let result; const dataType = checkDataType(data)
  //  通过dataType判断的类型，确定result的初始值
  switch (dataType) {
    case 'Array':
      result = []
      break
    case 'Object':
      result = {}
      break
    default:
      return data
  }
  for (const i in data) {
    // 循环取到每个value值
    const value = data[i]
    if (checkDataType(value) === 'Array' || checkDataType(value) === 'Object') { // 再判断数据类型
      // 递归重走
      result[i] = clone(value)
    } else { // 如果为基本数据类型，就直接放进新的对象或者数组
      result[i] = value
    }
  }
  return result
}

// 获取当前时间
export function getTime() {
  const timeOne = new Date()
  const year = timeOne.getFullYear()
  let month = timeOne.getMonth() + 1
  let day = timeOne.getDate()
  let hour = timeOne.getHours()
  let minute = timeOne.getMinutes()
  let second = timeOne.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  const NOW_MONTHS_AGO = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return NOW_MONTHS_AGO
}

// 格式化时间戳
export function getTimeStr(d, t) {
  if (d) {
    switch (d.toString().length) {
      case 10:
        d = d * 1000
        break
      case 13:
        d = d * 1
        break
      default:
        break
    }
    var now = new Date(parseInt(d))
    var year = now.getFullYear()
    var month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    var hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    var seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    if (t) {
      if (t == 1) {
        return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds
      } else if (t == 2) {
        return year + '年' + month + '月' + date + '日' + ' ' + hours + ':' + minutes + ':' + seconds
      } else if (t == 3) {
        return year + ' . ' + month + ' . ' + date
      } else if (t == 4) {
        return hours + '：' + minutes
      } else if (t == 5) {
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
      } else if (t == 6) {
        return year + '-' + month + '-' + date
      }
    } else {
      return year + ' 年 ' + month + ' 月 ' + date + ' 日 '
    }
  }
}
