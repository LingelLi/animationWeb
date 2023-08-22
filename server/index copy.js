const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.set('secret','appsecretkey')

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Animation', {
  // userFindAndModify: true,
  // userCreateIndex: true,
  // useNewUrlParser: true,
});

// require('require-all')(__dirname + '/../src')
// require('./routes/web')

const Actor = mongoose.model(
  'Actor',
  new mongoose.Schema({
    Name: { type: String },
    Type: { type: Array },
    TagInput: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Dimension: { type: String },
    Author: { type: String },
    Image: { type: String },
    File: { type: String },
    Animation: { type: Array },
    AudioList: { type: Array },
    AuditStatus: { type: String }
  })
);
const Animation = mongoose.model(
  'Animation',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Author: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
    ActorList: { type: Array },
    AudioList: { type: Array }
  })
);
const Audio = mongoose.model(
  'Audio',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Author: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
    ActorList: { type: Array },
    AnimationList: { type: Array }
  })
);
const Background = mongoose.model(
  'Background',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Author: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
    AppearPosition: { type: Array },
    Route: { type: Array }
  }),
  'Background'
);
const Environment = mongoose.model(
  'Environment',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Author: { type: String },
    Dimension: { type: String },
    Image: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
  })
);
const Home = mongoose.model(
  'Home',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Author: { type: String },
    Dimension: { type: String },
    Image: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
  }),
  'Home'
);
const Items = mongoose.model(
  'Items',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Dimension: { type: String },
    Author: { type: String },
    Image: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
  }),
  'Items'
);
const Others = mongoose.model(
  'Others',
  new mongoose.Schema({
    Name: { type: String },
    Tag: { type: Array },
    Desc: { type: String },
    Dimension: { type: String },
    Author: { type: String },
    Image: { type: String },
    File: { type: String },
    AuditStatus: { type: String },
  }),
  'Others'
);

const Admin = mongoose.model(
  'Admin',
  new mongoose.Schema({
    Name: { type: String },
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

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    Name: { type: String },
    Password: { 
      type: String, 
      select: false
      // set(val){
      //   return require('bcrypt').hashSync(val, 10)
      // } 
    },
    Email: { type: String },
    Upload_permission: { type: String },
    Download_permission: { type: String }
  }),
  'User'
);

app.post('/api/Actor', async (req, res) => {
  const actor = await Actor.create(req.body)
  res.send(actor)
})

app.put(`/api/Actor/:id`, async (req, res) => {
  const actor = await Actor.findByIdAndUpdate(req.params.id,req.body)
  res.send(actor)
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
  const user = await Admin.findOne({Name: username}).select('+Password')
  if(!user){
    return res.status(422).send({
      message:'用户不存在'
    })
  }

  // console.log(user)
  // const isValid = require('bcrypt').compareSync(password, user.Password)
  
  // console.log(isValid)
  // if(!isValid){
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


app.listen(3001, () => {
  console.log('http://localhost:3001/')
})

const multer = require('multer')
// const uploadFolder = multer({dest: __dirname + '/uploads'})
const uploadFolder =  __dirname + '/uploads'


// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadFolder);    // 保存的路径，需要自己创建
  },
  filename: function (req, file, cb) {
      // 设置保存文件名
      cb(null, file.originalname);
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), async(req, res) => {
  const file = req.file
  file.url = `http://localhost:3001/uploads/${file.filename}`
  res.send(file)
})
app.post('/api/uploadFile', upload.single('file'), async(req, res) => {
  const file = req.file
  file.url = `http://localhost:3001/uploads/${file.filename}`
  res.send(file)
})