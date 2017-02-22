export default {
  isFunction(val) {
    return typeof val === 'function'
  },
  isString(val) {
    return typeof val === 'string'
  },
  isBoolean(val) {
    return val === true || val === false
  },
  isObject(obj) {
    return obj !== null && typeof obj === 'object'
  },
  isArray(val) {
    return val.constructor === Array
  }
}
