const express = require('express')
const app = express()
const config = require('./config.json')

app.use(require('cors')())
app.use(express.json())
//将uploads目录暴露出来，可以通过url访问
app.use(config["Upload URL"], express.static(config["Upload Dir"]))
app.use(config["Target URL"], express.static(config["Target Dir"]))
app.set('secret','appsecretkey')

ip = config["MongoDB Address"]

const mongoose = require('mongoose')
var Schema = mongoose.Schema

const mongoose_huiben_public_material = mongoose.createConnection('mongodb://' + ip + '/Huiben_Public_Material', {
  // userFindAndModify: true,
  // userCreateIndex: true,
  // useNewUrlParser: true,
});

// require('require-all')(__dirname + '/../src')
// require('./routes/web')

const Actor = mongoose_huiben_public_material.model(
  'Actor',
  new Schema({
    Name: { type: String },
    Type: { type: String },
    Url: { type: String },
    ZipUrl: { type: String },
    Animation: { type: Array },
    Style: {type: String},
    ClassId: {type: String}
  }),
  'Actor'
);
const Animation = mongoose_huiben_public_material.model(
  'Animation',
  new Schema({
    Name: { type: String },
    Type: { type: String },
    Url: { type: String },
    ActorList: { type: Array },
  }),
  'Animation'
);
const Background = mongoose_huiben_public_material.model(
  'Background',
  new Schema({
    Name: { type: String },
    Style: {type: String},
    Url: {type: String}
  }),
  'Background'
);
const Preview = mongoose_huiben_public_material.model(
  "Preview",
  new Schema({
    Name: {type: String},
    KeyName: {type: String},
    Type: {type: String},
    ID: {type: Number}, 
    Url: {type: String}
  }),
  "Preview"
);
const Style = mongoose_huiben_public_material.model(
  "Style",
  new Schema({
    StyleName: {type: String},
    StyleId: {type: String}
  }),
  "Style"
);


const mongoose_huiben_setting = mongoose.createConnection('mongodb://' + ip + '/Huiben_Setting', {
  // userFindAndModify: true,
  // userCreateIndex: true,
  // useNewUrlParser: true,
});

const convMatMapList = mongoose_huiben_setting.model(
  'convMatMapList',
  new Schema({
    mapName: { type: String },
    contentList: {type: Array}
  }),
  'convMatMapList'
);

const convMatMapListChild = mongoose_huiben_setting.model(
  'convMatMapListChild',
  new Schema({
    mapName: { type: String },
    contentList: {type: Array}
  }),
  'convMatMapListChild'
);

const matSettingList = mongoose_huiben_setting.model(
  'matSettingList',
  new Schema({
    speed: {type: Number},
    matName: { type: String },
    initScale: {type: Array},
    initRotation: {type: Array},
    classList: {type: Array},
    width: {type: Number},
    height: {type: Number}
  }),
  'matSettingList'
);






const mongoose_huiben_user = mongoose.createConnection('mongodb://' + ip + '/Huiben_User', {
  // userFindAndModify: true,
  // userCreateIndex: true,
  // useNewUrlParser: true,
});

const Admin = mongoose_huiben_user.model(
  'Admin',
  new Schema({
    UserName: { type: String },
    Password: { 
      type: String, 
      select: false
      // set(val){
      //   return require('bcrypt').hashSync(val, 10)
      // } 
    }
  }),
  'Admin'
);

// const User = mongoose.model(
//   'User',
//   new mongoose.Schema({
//     Name: { type: String },
//     Password: { 
//       type: String, 
//       select: false
//       // set(val){
//       //   return require('bcrypt').hashSync(val, 10)
//       // } 
//     },
//     Email: { type: String },
//     Upload_permission: { type: String },
//     Download_permission: { type: String }
//   }),
//   'User'
// );


// 查询Huiben_Public_Material.Style所有内容
app.get("/api/Style", async (req, res) => {
  const styles = await Style.find()
  res.send(styles)
})


app.post('/api/Actor', async (req, res) => {
  const actor = await Actor.create(req.body)
  res.send(actor)
})

app.put(`/api/Actor/:id`, async (req, res) => {
  const model = await Actor.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

// app.put(`/api/Actor/:author`, async (req, res) => {
//   const actor = await Actor.findByIdAndUpdate(req.params.author,req.body)
//   const user = await Actor.findOne({Author: req.params.author})
//   res.send(actor)
// })

app.get('/api/Actor', async (req, res, next) =>{
  const token = req.headers.authorization
  console.log(token)
  await next()
}, async (req, res) => {
  const actors = await Actor.find()
  res.send(actors)
})

app.get(`/api/Actor/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await Actor.findById(req.params.id)
  // console.log(res.params.id)
  res.send(model)
})

app.get(`/api/ActorName/:Name`, async (req, res) => {
  const actors = await Actor.find({Name: req.params.Name})
  res.send(actors)
})

app.post(`/api/Preview`, async (req, res) => {
  const preview = await Preview.create(req.body)
  res.send(preview)
})

app.get(`/api/Preview/:Name`, async (req, res) => {
  const previews = await Preview.find({Name: req.params.Name})
  res.send(previews)
})

app.put(`/api/Preview/:id`, async (req, res) => {
  const preview = await Preview.findByIdAndUpdate(req.params.id,req.body)
  res.send(preview)
})

app.delete(`/api/Preview/:id`, async (req, res) => {
  const preview = await Preview.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

app.post(`/api/matSettingList`, async (req, res) => {
  const _matSettingList = await matSettingList.create(req.body)
  res.send(_matSettingList)
})

app.get(`/api/matSettingList/:Name`, async (req, res) =>{
  const settings = await matSettingList.find({matName: req.params.Name})
  res.send(settings)
})

app.put(`/api/matSettingList/:id`, async (req, res) => {
  const setting = await matSettingList.findByIdAndUpdate(req.params.id,req.body)
  res.send(setting)
})

app.delete(`/api/matSettingList/:id`, async (req, res) => {
  const setting = await matSettingList.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

app.post(`/api/convMatMapList`, async (req, res) => {
  const l = await convMatMapList.create(req.body)
  res.send(l)
})

app.get(`/api/convMatMapList/:Name`, async (req, res) => {
  const ls = await convMatMapList.find({mapName: req.params.Name})
  res.send(ls)
})

app.put(`/api/convMatMapList/:id`, async (req, res) => {
  const l = await convMatMapList.findByIdAndUpdate(req.params.id, req.body)
  res.send(l)
})

app.delete(`/api/convMatMapList/:id`, async (req, res) => {
  const l = await convMatMapList.findByIdAndDelete(req.params.id)
  res.send({success: true})
})

app.post(`/api/convMatMapListChild`, async (req, res) => {
  const l = await convMatMapListChild.create(req.body)
  res.send(l)
})

app.get(`/api/convMatMapListChild/:Name`, async (req, res) => {
  const ls = await convMatMapListChild.find({mapName: req.params.Name})
  res.send(ls)
})

app.put(`/api/convMatMapListChild/:id`, async (req, res) => {
  const l = await convMatMapListChild.findByIdAndUpdate(req.params.id, req.body)
  res.send(l)
})

app.delete(`/api/convMatMapListChild/:id`, async (req, res) => {
  const l = await convMatMapListChild.findByIdAndDelete(req.params.id)
  res.send({success: true})
})


/* developer 返回全部url列表 & 返回第一个
输入 可用,分割，支持模糊查询
{
  "actorType":"",
	"actorTag": "",
  "animationTag":""
}
  
返回 符合条件的全部json数组
[{
  actorName
  actorURL
  animName
  animURL
}]
*/
app.post('/api/Developer/getAllUrl', async (req, res) => {
  // const actor = await Actor.find(req.body)
  const { actorType,actorTag,animationTag } = req.body
  // 分割查询 + 模糊匹配
  var typeArr = actorType.split(',')
  for (var i = 0;i<typeArr.length;i++){
    typeArr[i] = RegExp(typeArr[i])
  }
  var tagArr = actorTag.split(',')
  for (var i = 0;i<tagArr.length;i++){
    tagArr[i] = RegExp(tagArr[i])
  }
  var animArr = animationTag.split(',')
  for (var i = 0;i<animArr.length;i++){
    animArr[i] = RegExp(animArr[i])
  }
  // 查询符合条件的animation
  const anim = await Animation.find({Tag:{$all:animArr},AuditStatus:"审核通过"})
  // console.log('anim',anim)
  var animList = [];
  var urlList = [];
  var i =0;
  for(i=0;i<anim.length;i++){
    animList[i] = anim[i]._id.toString()
    // console.log('animList[i]',animList[i])
    var actorURL = await Actor.find({Type: {$all:typeArr},Tag:{$all:tagArr},Animation:animList[i],AuditStatus:"审核通过"})
    // console.log('actorURL',actorURL)
    for(var j=0;j<actorURL.length;j++){
      urlList.push({
        actorName:actorURL[j].Name,
        actorURL:actorURL[j].File,
        animName:anim[i].Name,
        animURL:anim[i].File
      })
    }
  }
  res.send(urlList)
})

app.post('/api/Developer/getOneUrl', async (req, res) => {
  // const actor = await Actor.find(req.body)
  const { actorType,actorTag,animationTag } = req.body
  // 分割查询 + 模糊匹配
  var typeArr = actorType.split(',')
  for (var i = 0;i<typeArr.length;i++){
    typeArr[i] = RegExp(typeArr[i])
  }
  var tagArr = actorTag.split(',')
  for (var i = 0;i<tagArr.length;i++){
    tagArr[i] = RegExp(tagArr[i])
  }
  var animArr = animationTag.split(',')
  for (var i = 0;i<animArr.length;i++){
    animArr[i] = RegExp(animArr[i])
  }
  // 查询符合条件的animation
  const anim = await Animation.find({Tag:{$all:animArr},AuditStatus:"审核通过"})
  // console.log('anim',anim)
  var animList = [];
  var urlList = [];
  var i =0;
  for(i=0;i<anim.length;i++){
    animList[i] = anim[i]._id.toString()
    // console.log('animList[i]',animList[i])
    var actorURL = await Actor.find({Type: {$all:typeArr},Tag:{$all:tagArr},Animation:animList[i],AuditStatus:"审核通过"})
    // console.log('actorURL',actorURL)
    for(var j=0;j<actorURL.length;j++){
      urlList.push({
        actorName:actorURL[j].Name,
        actorURL:actorURL[j].File,
        animName:anim[i].Name,
        animURL:anim[i].File
      })
    }
  }
  res.send(urlList[0])
})


// app.get(`/api/ActorAnim/:id`, async (req, res) => {
//   const parent = await Actor.findById(req.params.id)
//   const model = await Actor.aggregate([
//   {$match: { parent: parent._id } },
//   {
//     $lookup:
//       {
//         from: "animations",
//         localField: "Animation",
//         foreignField: "_id",
//         as: "AnimationList"
//       }
//   }
// ]
// )
//   res.send(model)
// })

app.delete(`/api/Actor/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await Actor.findByIdAndDelete(req.params.id)
  // console.log(res.params.id)
  res.send({
    success: true
  })
})


// Animation
app.get('/api/Animation', async (req, res) => {
  const animations = await Animation.find()
  res.send(animations)
})

app.get(`/api/Animation/:id`, async (req, res) => {
  const model = await Animation.findById(req.params.id)
  res.send(model)
})

app.post('/api/Animation', async (req, res) => {
  const animation = await Animation.create(req.body)
  res.send(animation)
})

app.put(`/api/Animation/:id`, async (req, res) => {
  const model = await Animation.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Animation/:id`, async (req, res) => {
  const model = await Animation.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Audio
app.get('/api/Audio', async (req, res) => {
  const model = await Audio.find()
  res.send(model)
})

app.get(`/api/Audio/:id`, async (req, res) => {
  const model = await Audio.findById(req.params.id)
  res.send(model)
})

app.post('/api/Audio', async (req, res) => {
  const model = await Audio.create(req.body)
  res.send(model)
})

app.put(`/api/Audio/:id`, async (req, res) => {
  const model = await Audio.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Audio/:id`, async (req, res) => {
  const model = await Audio.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Background
app.get('/api/Background', async (req, res) => {
  const model = await Background.find()
  res.send(model)
})

app.get(`/api/Background/:id`, async (req, res) => {
  const model = await Background.findById(req.params.id)
  res.send(model)
})

app.post('/api/Background', async (req, res) => {
  const model = await Background.create(req.body)
  res.send(model)
})

app.put(`/api/Background/:id`, async (req, res) => {
  const model = await Background.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Background/:id`, async (req, res) => {
  const model = await Background.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Environment
app.get('/api/Environment', async (req, res) => {
  const model = await Environment.find()
  res.send(model)
})

app.get(`/api/Environment/:id`, async (req, res) => {
  const model = await Environment.findById(req.params.id)
  res.send(model)
})

app.post('/api/Environment', async (req, res) => {
  const model = await Environment.create(req.body)
  res.send(model)
})

app.put(`/api/Environment/:id`, async (req, res) => {
  const model = await Environment.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Environment/:id`, async (req, res) => {
  const model = await Environment.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Home
app.get('/api/Home', async (req, res) => {
  const model = await Home.find()
  res.send(model)
})

app.get(`/api/Home/:id`, async (req, res) => {
  const model = await Home.findById(req.params.id)
  res.send(model)
})

app.post('/api/Home', async (req, res) => {
  const model = await Home.create(req.body)
  res.send(model)
})

app.put(`/api/Home/:id`, async (req, res) => {
  const model = await Home.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Home/:id`, async (req, res) => {
  const model = await Home.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Items
app.get('/api/Items', async (req, res) => {
  const model = await Items.find()
  res.send(model)
})

app.get(`/api/Items/:id`, async (req, res) => {
  const model = await Items.findById(req.params.id)
  res.send(model)
})

app.post('/api/Items', async (req, res) => {
  const model = await Items.create(req.body)
  res.send(model)
})

app.put(`/api/Items/:id`, async (req, res) => {
  const model = await Items.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Items/:id`, async (req, res) => {
  const model = await Items.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// Others
app.get('/api/Others', async (req, res) => {
  const model = await Others.find()
  res.send(model)
})

app.get(`/api/Others/:id`, async (req, res) => {
  const model = await Others.findById(req.params.id)
  res.send(model)
})

app.post('/api/Others', async (req, res) => {
  const model = await Others.create(req.body)
  res.send(model)
})

app.put(`/api/Others/:id`, async (req, res) => {
  const model = await Others.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.delete(`/api/Others/:id`, async (req, res) => {
  const model = await Others.findByIdAndDelete(req.params.id)
  res.send({
    success: true
  })
})

// 管理员
app.post('/api/Admin', async (req, res) => {
  const actor = await Admin.create(req.body)
  res.send(actor)
})

app.put(`/api/Admin/:id`, async (req, res) => {
  const actor = await Admin.findByIdAndUpdate(req.params.id,req.body)
  res.send(actor)
})

app.get('/api/Admin', async (req, res, next) =>{
  const token = req.headers.authorization
  console.log(token)
  await next()
}, async (req, res) => {
  const actors = await Admin.find()
  res.send(actors)
})

app.get(`/api/Admin/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await Admin.findById(req.params.id)
  // console.log(res.params.id)
  res.send(model)
})

app.delete(`/api/Admin/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await Admin.findByIdAndDelete(req.params.id)
  // console.log(res.params.id)
  res.send({
    success: true
  })
})

// 用户
app.post('/api/User', async (req, res) => {
  const model = await User.create(req.body)
  res.send(model)
})

app.put(`/api/User/:id`, async (req, res) => {
  const model = await User.findByIdAndUpdate(req.params.id,req.body)
  res.send(model)
})

app.get('/api/User', async (req, res, next) =>{
  const token = req.headers.authorization
  console.log(token)
  await next()
}, async (req, res) => {
  const model = await User.find()
  res.send(model)
})

app.get(`/api/User/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await User.findById(req.params.id)
  // console.log(res.params.id)
  res.send(model)
})

app.get(`/api/UserByName/:name`, async (req, res) => {
  // const model = await User.findById(req.params.id)
  // const { username } = req.body
  const model = await User.findOne({Name:(req.params.name)})
  // console.log(res.params.id)
  res.send(model)
})


app.delete(`/api/User/:id`, async (req, res) => {
  // console.log(res.params)
  const model = await User.findByIdAndDelete(req.params.id)
  // console.log(res.params.id)
  res.send({
    success: true
  })
})

// 登录
app.post('/api/login', async(req, res) => {
  const { username, password } = req.body
  const user = await Admin.findOne({UserName: username}).select('+Password')
  if(!user){
    return res.status(422).send({
      message:'用户不存在'
    })
  }
  if(password != user.Password){
    return res.status(422).send({
      message:'密码错误'
    })
  }
  // 返回token
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({id: user._id}, app.get('secret'))
  res.send({
    code:200,
    message:'登录成功',
    data:{username, token}})

})



// User.find({username: username}, function(err, user){     //看用户名之前是否存在，不存在则进行注册
//   if (user.length == 0) {
//      var user = new User({         //实例化
//         username: username,
//         password: passwordHashed,
//         email: email
//    })
//    user.save(function(err, user){   //存储数据
//         if (err) {
//             console.error(err);
//             return;
//         }else{
//              console.log(user);
//             res.send({code: 1});
//         }
//    })	
//   }else{
//      res.send({code: 2});
//   }
// })





app.post('/api/logout', async (req, res) => {
  res.send({
    code: 200,
    data: 'success'
  })
})

// 用户登录
app.post('/api/userLogin', async(req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({Name: username}).select('+Password')
  if(!user){
    return res.status(422).send({
      message:'用户不存在'
    })
  }

  if(password != user.Password){
    return res.status(422).send({
      message:'密码错误'
    })
  }
  // 返回token
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({id: user._id}, app.get('secret'))
  res.send({
    code:200,
    message:'登录成功',
    data:{username, token}})

})

//开放3001端口
app.listen(config["Port"], () => {
  console.log(`http://localhost:${config["Port"]}`)
})

//接收上传文件工具
const multer = require('multer')
// const uploadFolder = multer({dest: __dirname + '/uploads'})

//文件上传的地址
const uploadFolder = config["Upload Dir"]
const os = require('os');
var targetFolder = config["Target Dir"]
var exposed_url = `http://localhost:${config["Port"]}${config["Target URL"]}/`
if(os.type() == "Windows_NT"){
  // targetFolder = __dirname + '\\fake_uploads\\'
  targetFolder = config["Target Dir"].replace('/', '\\') + "\\"
}



// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadFolder);    // 保存的路径
  },
  filename: function (req, file, cb) {
      // 设置保存文件名
      cb(null, file.originalname);
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

//compressing压缩解压缩工具
const compressing = require("compressing")
const fs = require("fs")

//创建文件夹
const createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder)
  }
}
createFolder(uploadFolder)
createFolder(targetFolder)


app.post('/api/uploadFile', upload.single('file'), async(req, res) => {
  fs.copyFileSync(req.file.path, targetFolder + req.file.filename)
  compressing.zip.uncompress(targetFolder + req.file.filename, targetFolder)
  .then(() => {
    //需要返回Url, ZipUrl以及Preview_Url
    const ZipUrl = exposed_url + req.file.filename
    var Url = exposed_url + req.file.filename.slice(0,-4) + "/Prefab/" + req.file.filename.slice(0,-4)
    // if(os.type() == "Windows_NT"){
    //   Url = exposed_url + req.file.filename.slice(0,-4) + "\\Prefab\\" + req.file.filename.slice(0,-4)
    // }
    var Preview_Url = exposed_url + req.file.filename.slice(0,-4) + "/Preview/" + req.file.filename.slice(0,-4) + ".png"
    // if(os.type() == "Windows_NT"){
    //   Preview_Url = exposed_url + req.file.filename.slice(0,-4) + "\\Preview\\" + req.file.filename.slice(0,-4) + ".png"
    // }
    res.send({Url: Url, ZipUrl: ZipUrl, Preview_Url: Preview_Url})
  })
  .catch((error) => {
    console.log(error)
  })

  // const file = req.file
  // file.url = `http://localhost:3001/uploads/${file.filename}`
  // res.send(file)
})