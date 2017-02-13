import axios from 'axios'
import indicatorManager from './indicator'

/**
 * http 指标请求
 */
let http = {
  getData(key, params, callback) {
    let handler = indicatorManager.mapper[key]
    if (!handler) {
      indicatorManager.indicators.push()
    }
    indicatorContainer.callback.push(callback)
    mapperHandler.push(indicatorContainer.callback.length)

    axios.get('getData/key=' + indicatorId).then(data => {
      callback(data)
    })
  },
  triggerUpdate(indicatorId) {

  }
}

export default http
