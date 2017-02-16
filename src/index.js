/**
 * 提供对外接口
 * 1: 指标查询接口
 * 2: Axios原生查询支持及原生配置管理
 * 3: 消息接收接口,接收更新数据消息,触发更新
 */
import http from './http'

if (!window.ips) {
  window.ips = {}
}

window.ips.http = http
