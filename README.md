# ips-http

<h2>目标</h2>

1:对外开放统一接口(get),不管是订阅指标还是SQL查询指标,订阅指标只负责接收消息,数据获取还是通过查询方式

2:支持多个指标查询,SQL查询和订阅指标可自由组合,且支持带参数查询.收到推送,多个指标同时查询

3:支持标签引入及npm安装,使用Axios

问题汇总:
1:只能订阅无参数指标?  如果可订阅,
2:非带参数指标走可有多个回调函数,问题:如果走推送,可注册多个回调函数,若不走数据推送,则不需要注册回调函数,前端定时查询即可
3:指标组合

let urls = ['/user/12345', '/user/12345/permissions'];
let requests = urls.map(makeRequest);

// 把指定的 url 转变成 axios 请求，返回的是 Promise 对象
function makeRequest(url) {
    return axios.get(url);
}
axios.all(requests).then(axios.spread(function (acct, perms) {
  // Both requests are now complete
}));

