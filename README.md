# ips-axios

## 摘要

  ```
  扩展axios,根据业务加入几个接口
  ```

## 扩展接口

* 指标查询接口
  
  ``` 
  单指标 :

  ipsAxios.indi.get(id,params,callback)

  多指标 : 

  ipsAxios.indi.get([id1,id2],{id1:params1,id2:params2},callback)
  ```

* 指标更新接口
  ``` 
  ipsAxios.indi.update(id)
  ```

## 安装

* npm 安装
  ```
  npm install ips-axios
  ```
  
* 标签引入
  ```
  <script src="../ipsAxios.min.js"></script>
  ```