## 开发

```bash
# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install
npm install -g nodemon
npm install compressing

# 启动服务器
npx nodemon server

# 启动管理端服务
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev

# 启动客户端服务
cd web
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev
```

浏览器访问 http://localhost:9527


# AnimationWeb/server 后端
# AnimationWeb 管理员前端
# AnimationWeb/web 用户前端

