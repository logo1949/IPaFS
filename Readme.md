###   1、项目简介

本项目是基于ipfs-api 的论文分享、查阅系统，利用最新的blockchain、IPFS以及智能合约技术进行实现。采用react设计前端框架，使用 mongodb作为数据存储后台。

eth-ipfs 是 fork 的别人的项目 : [https://github.com/mcchan1/eth-ipfs]( https://github.com/mcchan1/eth-ipfs)此项目需要先部署存储合约，并且把合约的abi和address替换到/eth-ipfs/src/storagehash.js中。

路由系统采用单页面路由，借鉴的这个项目: <https://github.com/youngwind/mini-react-router>

整个IPaFS（The InterPlanetary Academic File System）系统功能如下：

- 分布式、点对点论文分享、查阅、下载
- 论文评分
- 论文版权溯源

### 2、运行前提

1、本地下载并启动 mongodb 数据库 ：1.1 `brew install mongodb` 1.2 `brew services start mongodb`。ubuntu下mongodb的安装和启动参考：https://segmentfault.com/a/1190000014385351

2、本地下载并启动 ipfs daemon 

​	2.1 `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'` 

​	2.2 `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'` 

​	2.3 `ipfs daemon`

3、安装 metamask 注册ropsten 测试网地址并且有余额

4、程序默认把文件存在了 ipfs MFS 下的 /test1/ 路径下，可以考虑新建这个路径: 命令行输入 ipfs files mkdir /test1

5、文件下载的默认存储位置在 my-eth-ipfs/download 路径下, 需要手动新建这个路径

### 3、使用方法：

1、本项目已部署到远程服务端，欢迎访问http://120.78.71.240:8080/ethipfs

进行使用，通过远端访问无需本地启动IPFS和mongdb。

2、如果希望自己部署到本地端或者服务器端可以按照下列方法进行：
​     2.1 git clone 本项目
​     2.2 在本项目路径下执行 npm install 安装依赖包
​     2.3 在本项目路径下执行npm run start进行启动

### 4、补充：

编译出错：sh: 1: nodemon: not found;//缺少nodemon模块
解决办法：`npm install nodemon --save`

编译出错：Module not found: Can't resolve 'webcrypto-shim'//缺少webcrypto-shim模块
解决办法：`npm install node-webcrypto-shim`

上传文件出错：Unhandled Rejection (TypeError): Cannot read property '0' of undefined
解决办法：在启动ipfs之前需要允许request请求，具体操作如下：
`ipfs init`
`ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001`
`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["×"]'`
`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'`
`ipfs daemon`

更改端口出错：提示[nodemon] app crashed - waiting for file changes before starting...
原因：node服务被占用，端口改变后无法进行切换。
解决办法：将node进程关闭，然后在重启服务即可。具体操作如下：
`ps -A | grep node`  ----列出所有的node进程
kill 进程id  ----结束进程

