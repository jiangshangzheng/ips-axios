/**
 * @author jsz
 * @description 指标管理类(单例模式)
 */
class IndicatorManager {
  static getInstance() {
    if (!IndicatorManager.instance) {
      IndicatorManager.instance = new IndicatorManager()
      IndicatorManager.instance.indicators = []
      IndicatorManager.instance.callback = {}
      IndicatorManager.instance.mapper = { a: new Date().getMilliseconds() }
      console.log(IndicatorManager.instance.mapper.a)
    }
    return IndicatorManager.instance
  }
}

let indicatorManager = IndicatorManager.getInstance()

export default indicatorManager
