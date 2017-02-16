# ips-http

## 摘要
* 对外统一提供指标查询接口
  ``` 
  单指标 :
    ipshttp.getData(id,params,callback)

  多指标 : 
    ipshttp.getData([id],params,callback)
  ```
* 对外提供消息触发更新接口
  ``` 
  ipshttp.triggerUpdate(id)
  ```
## 安装

* npm 安装
  ```
  npm install ips-http
  ```
* 标签引入
  ```
  <script src="../ipshttp.min.js"></script>
  ```