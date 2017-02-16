import axios from 'axios'
import indicatorManager from './indicator'
import { isString, isArray } from './tool'

window.axios = axios

let http = {
  /**
   * @param {any} keys 指标ID, 类型:String或者数组
   * @param {any} params 指标参数,每个ID对于一个JSON
   * @param {any} callback 回调方法
   */
  getData(indicatorIds, params, callback) {
    if (!indicatorIds) {
      return
    }
    let key
    if (isString(indicatorIds)) {
      // 单个指标
      key = indicatorIds
      indicatorManager.paramsMapper[key] = params
      indicatorManager.handlerMapper[key] = callback
      this.mataGetData(key, params).then(response => {
        callback(response)
      }).catch(error => {
        console.log(error)
      })
    } else if (isArray(indicatorIds)) {
      // 多个指标
      key = indicatorIds.join('$$')
        // 设置回调函数
      indicatorManager.handlerMapper[key] = callback
      indicatorIds.forEach(item => {
        // 设置指标参数
        indicatorManager.paramsMapper[item] = params[item]
      })
      let retData = []
      indicatorIds.forEach(item => {
        retData.push(this.mataGetData(item, params[item]))
      })
      axios.all(retData).then(axios.spread(callback)).catch(error => {
        console.log(error)
      })
    } else {
      return
    }
  },
  mataGetData(indicatorId, params = {}) {
    return axios.get('api/getData/' + indicatorId, { params: params })
  },
  triggerUpdate(indicatorId) {
    if (indicatorId === '' || indicatorId === null) {
      return
    }
    if (isString(indicatorId)) {
      for (var key in indicatorManager.handlerMapper) {
        if (key.indexOf(indicatorId) > -1) {
          let indicators = key.split('$$')
          let handler = indicatorManager.handlerMapper[key]
          if (indicators.length === 1) {
            this.mataGetData(key, indicatorManager.paramsMapper[key]).then(response => {
              handler(response)
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('关联指标:' + key)
            let retData = []
            indicators.forEach(item => {
              retData.push(this.mataGetData(item, indicatorManager.paramsMapper[item]))
            })
            axios.all(retData).then(axios.spread(handler)).catch(error => {
              console.log(error)
            })
          }
        }
      }
    } else {
      console.log('指标ID类型错误')
    }
  }
}

export default http
