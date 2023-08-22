<template>
  <div class='createPost-container'>
    <el-form ref='postForm' :model='postForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>

            <div class='characterInfo-container'>
              <el-form
                :model='actor'
                :rules='rules'
                ref='actor'
                label-width='100px'
                class='demo-ruleForm'
              >

                <el-form-item label="角色名称" prop='Name'>
                  <el-input v-model="actor.Name"></el-input>
                </el-form-item>

                <el-form-item label='角色分类' prop='Type'>
                  <el-radio-group v-model='actor.Type'>
                    <el-radio label='db'></el-radio>
                    <el-radio label='else'></el-radio>
                  </el-radio-group>
                </el-form-item>

                <!-- <el-form-item label='角色分类' prop='Type'>
                  <el-cascader
                    v-model='actor.Type'
                    placeholder='请选择角色分类'
                    :options='modelOptions'
                  ></el-cascader>
                </el-form-item> -->

                <el-form-item label="风格" prop="Style">
                  <el-radio v-model="actor.Style" v-for="item in Styles" :label="item.StyleId">{{ item.StyleName }}</el-radio>
                </el-form-item>

                <el-form-item label="类别ID" prop="ClassId">
                  <el-input v-model="actor.ClassId"></el-input>
                </el-form-item>

                <el-form-item label="角色文件" prop="ZipUrl">
                  <el-upload
                    class='upload-demo'
                    name="file"
                    :action="$http.defaults.baseURL + '/uploadFile'"
                    :on-success="afterUploadFile"
                    :before-remove="beforeRemove"
                    drag
                    ref="upload"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" style="margin: -15px 0 0 0" slot="tip">只能上传zip文件</div>
                  </el-upload>
                </el-form-item>

                <el-form-item label="缩略图名" prop="Preview_KeyName">
                  <el-input v-model="actor.Preview_KeyName"></el-input>
                </el-form-item>

                <el-form-item label="缩略图类型" prop="Preview_Type">
                  <el-radio v-model="actor.Preview_Type" label="Animal">动物</el-radio>
                  <el-radio v-model="actor.Preview_Type" label="Character">人物</el-radio>
                </el-form-item>

                <el-form-item label="速度" prop="speed">
                  <el-input v-model="actor.speed"></el-input>
                </el-form-item>

                <el-form-item label="初始规模" prop="initScale">
                  <el-input v-model="actor.initScale_1" style="width: 15%;margin-right: 2%;"></el-input>
                  <el-input v-model="actor.initScale_2" style="width: 15%;margin-right: 2%;"></el-input>
                  <el-input v-model="actor.initScale_3" style="width: 15%;margin-right: 2%;"></el-input>
                </el-form-item>

                <el-form-item label="初始旋转角度" prop="initRotation">
                  <el-input v-model="actor.initRotation_1" style="width: 15%;margin-right: 2%;"></el-input>
                  <el-input v-model="actor.initRotation_2" style="width: 15%;margin-right: 2%;"></el-input>
                  <el-input v-model="actor.initRotation_3" style="width: 15%;margin-right: 2%;"></el-input>
                </el-form-item>

                <el-form-item label="类型数组" prop="classList">
                  <el-input v-model="actor.classList" placeholder="请输入零或多个类型，以英文逗号分隔"></el-input>
                </el-form-item>

                <el-form-item label="高度" prop="height">
                  <el-input v-model="actor.height"></el-input>
                </el-form-item>

                <el-form-item label="宽度" prop="width">
                  <el-input v-model="actor.width"></el-input>
                </el-form-item>



                <!-- <el-form-item prop='image_uri' label='缩略图'>
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="actor.Image" :src="actor.Image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>

                <el-form-item label='角色文件' prop='File'>
                  <el-upload
                    class='upload-demo'
                    :action="$http.defaults.baseURL + '/uploadFile'"
                    :on-success="afterUploadFile"
                    :before-remove="beforeRemove"
                    multiple
                    :file-list="actor.File"
                  >
                    <el-button size='small' type='primary'>点击上传</el-button>
                  </el-upload>
                </el-form-item> -->

                <!-- <el-form-item label='关联动画'>
                  <el-table
                    v-model="actor.Animation"
                    ref="multipleTable"
                    :data="animTableData.filter(data => data.Author === this.username)"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type='selection' width='55'></el-table-column>

                    <el-table-column prop="Name" label='动画名称' width='200'>
                    </el-table-column>
                    <el-table-column prop='_id' v-model='actor.Animation' label='id' width='120'></el-table-column>
                    <el-table-column prop='Desc' label='动画描述' show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-form-item>

                <el-form-item label='关联音频'>
                  <el-table
                    v-model="actor.AudioList"
                    ref='multipleTable'
                    :data='audioTableData.filter(data => data.Author === this.username)'
                    tooltip-effect='dark'
                    style='width: 100%'
                    @selection-change='handleSelectionChange2'
                  >
                    <el-table-column type='selection' width='55'></el-table-column>
                    <el-table-column prop="Name" label='音频名称' width='200'>
                    </el-table-column>
                    <el-table-column prop='_id' v-model='actor.AudioList' label='id' width='120'></el-table-column>
                    <el-table-column prop='Desc' label='音频描述' show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-form-item> -->

                <el-form-item>
                  <el-button type='primary' @click="submitForm('actor')">提交</el-button>
                  <el-button @click="resetForm('actor')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'UploadActor',
  components: {
  },
  props: {
    id: { }
  },
  data() {
    return {
      // anim:{
      //   ActorList:[]
      // },

      // animTableData: [],
      // audioTableData: [],
      username:'',

      // multipleSelection: [],
      // multipleSelection2: [],
      postForm: {
        name: ''
      },
      Styles: [],
      actor: {
        Name: '',
        Type: '',
        Style: '',
        ClassId: '0',
        Url: '',
        ZipUrl: '',
        Preview_KeyName: '',
        Preview_Type: '',
        Preview_Url: '',
        speed: '',
        initScale_1: '',
        initScale_2: '',
        initScale_3: '',
        initRotation_1: '',
        initRotation_2: '',
        initRotation_3: '',
        classList: '',
        width: '',
        height: '',
        keyNameList: '',
      },
      rules: {
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
      },

      selected: '',
      options: [],

      value: [],
      modelOptions: []
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    //查数据库填充Styles数组
    this.$http.get("/Style").then(res => {
      this.Styles = res.data
    })
  },
  methods: {
    submitForm(formName) {
      console.log(this.actor)

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.get(`ActorName/${this.actor.Name}`).then(res => {
            const actors = res.data
            if(actors.length > 0){
              this.$message({"message":"角色名称重复，请重新输入！","type":"error"})
              return
            }else{
              const actor = {
                "Name": this.actor.Name,
                "Type": this.actor.Type,
                "Url": this.actor.Url,
                "ZipUrl": this.actor.ZipUrl,
                "Animation": [],
                "Style": this.actor.Style,
                "ClassId": this.actor.ClassId
              }
              this.$http.post("Actor", actor).then(res => {
                const preview = {
                  "Name": this.actor.Name,
                  "KeyName": this.actor.Preview_KeyName,
                  "Type": this.actor.Preview_Type,
                  "ID": 0,
                  "Url": this.actor.Preview_Url
                }
                this.$http.post("Preview", preview).then(res =>{
                  const matSettingList = {
                    "speed": parseFloat(this.actor.speed),
                    "matName": this.actor.Name,
                    "initScale": [parseFloat(this.actor.initScale_1), parseFloat(this.actor.initScale_2), parseFloat(this.actor.initScale_3)],
                    "initRotation": [parseFloat(this.actor.initRotation_1), parseFloat(this.actor.initRotation_2), parseFloat(this.actor.initRotation_3)],
                    "classList": this.actor.classList.split(","),
                    "width": parseFloat(this.actor.width),
                    "height": parseFloat(this.actor.height)
                  }
                  this.$http.post("matSettingList", matSettingList).then(res => {
                    this.$message({"message":"上传成功", "type":"success"})
                    //数据清零
                    this.actor.Name = ''
                    this.actor.Type = ''
                    this.actor.Style = ''
                    this.actor.ClassId = '0'
                    this.actor.Url = ''
                    this.actor.ZipUrl = ''
                    this.actor.Preview_KeyName = ''
                    this.actor.Preview_Type = ''
                    this.actor.Preview_Url = ''
                    this.actor.speed = ''
                    this.actor.initScale_1 = ''
                    this.actor.initScale_2 = ''
                    this.actor.initScale_3 = ''
                    this.actor.initRotation_1 = ''
                    this.actor.initRotation_2 = ''
                    this.actor.initRotation_3 = ''
                    this.actor.classList = ''
                    this.actor.width = ''
                    this.actor.height = ''
                    this.actor.keyNameList = ''
                    this.$refs.upload.clearFiles();
                  }).catch(error => {
                    console.log(error)
                    this.$message({"message":"上传失败，请稍后重试", "type":"error"})
                  })
                }).catch(error => {
                  console.log(error)
                  this.$message({"message":"上传失败，请稍后重试", "type":"error"})
                })
              }).catch(error => {
                console.log(error)
                this.$message({"message":"上传失败，请稍后重试", "type":"error"})
              })

              this.$router.push('/ActorManage')
            }
          })
        }
        else {
              console.log('error submit!!');
              return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async fetch(){
      const res = await this.$http.get(`Actor/${this.$route.params.id}`)
      this.actor = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
      console.log(this.actor)
    },

    async fetchAnimation(){
      this.username = JSON.parse(localStorage.getItem("name"))
      const res = await this.$http.get('Animation')
      this.animTableData = res.data
    },

    async fetchAnimationByID(animID){
      this.username = JSON.parse(localStorage.getItem("name"))
      const res = await this.$http.get(`Animation/${animID}`)
      this.anim = res.data
    },
    // fetch 音频
    async fetchAudio(){
      const res = await this.$http.get('Audio')
      this.audioTableData = res.data
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // handleSelectionChange(res) {
    //   this.multipleSelection = res
    //   console.log(res)
    //   // this.$set(this.actor, 'Animation', res)
    // },
    // handleSelectionChange2(res) {
    //   this.multipleSelection2 = res
    //   console.log(res)
    //   // this.$set(this.actor, 'Animation', res)
    // },

    // afterUpload(res){
    //     // console.log('acotr avatar file',res)
    //     this.$set(this.actor, 'Image', res.url)
    //     // this.actor.Image =  res.url
    // },
    afterUploadFile(res){
        console.log(res)
        this.actor.Url = res.Url
        this.actor.ZipUrl = res.ZipUrl
        this.actor.Preview_Url = res.Preview_Url
        // this.actor.Image =  res.url
    },
    // beforeAvatarUpload(file) {
    //   // const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   // if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
    //   // }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   // return file.type;
    //   return  isLt2M;
    // }
  }
};
</script>

<style lang='scss' scoped>
@import '~@/styles/mixin.scss';
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .characterInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
      .disabled .el-upload--picture-card {
        display: none;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
