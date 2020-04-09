# 功能
1. 资源列表(未分页)
2. 上传
3. 预览
4. 下载
5. nginx 负载
6. mongo 集群

# 工具/库
1. express (服务器框架)
2. svelte  (前端框架)
3. bulma   (css)
4. mongodb 
5. mongoose
6. moment (处理时间的库)
7. node-uuid (nodejs 生成 uuid)
8. systemd (linux 进程管理)

# 配置
## Linux 负载配置
![Linux 负载配置](https://pic.downk.cc/item/5e8ec360504f4bcb04184b37.png)

## Mongo 集群配置
由于只有一台主机，并且mongo并不适合做 m-s，所以做了一个副本集,启动脚本在 mongoSehll/run     
[资料来源](https://www.jianshu.com/p/2825a66d6aed)

# 问题
1. 服务器端没做参数校验
2. Mongo 链接池及链接管理
3. 前端页面布局、弹窗、资源参数调整
