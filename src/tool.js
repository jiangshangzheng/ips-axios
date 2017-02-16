let tool = {
  getQueryString: function(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) { return unescape(r[2]) }
    return null
  },
  isString(val) {
    return typeof val === 'string'
  },
  isBoolean(val) {
    return val === true || val === false
  },
  isFunction(val) {
    return typeof val === 'function'
  },
  isObject(obj) {
    return obj !== null && typeof obj === 'object'
  },
  isArray(val) {
    return val.constructor === Array
  }
}

export default tool
