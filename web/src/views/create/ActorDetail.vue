<template>
<div>
<div class="item-detail-show">
  <div class="item-detail-left" style="position:relative">
    <div class="item-detail-big-img">
      <img :src="actor.Preview_Url" alt="">
      <center>
    <el-button type="primary" size="mini" icon="el-icon-download"
          @click="download(actor.ZipUrl)" style="margin-top: 40px;">下载资源</el-button>
        </center>
    </div>
    
  </div>

  <div class="item-detail-right">
    <el-descriptions title="角色详情" direction="vertical" :column="6" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleChange">修改</el-button>
      </template>
      <el-descriptions-item label="名称" :span="3">{{actor.Name}}</el-descriptions-item>
      <el-descriptions-item label="分类" :span="3">
        {{ actor.Type }}
      </el-descriptions-item>

      <el-descriptions-item label="风格" :span="3">
        {{ actor.Style }}
      </el-descriptions-item>
      <el-descriptions-item label="类型ID" :span="3">
        {{ actor.ClassId }}
      </el-descriptions-item>
      <el-descriptions-item label="缩略图名" :span="3">
        {{ actor.Preview_KeyName }}
      </el-descriptions-item>
      <el-descriptions-item label="缩略图类型" :span="3">
        {{ actor.Preview_Type }}
      </el-descriptions-item>
      <el-descriptions-item label="高度" :span="1">
        {{ actor.height }}
      </el-descriptions-item>
      <el-descriptions-item label="宽度" :span="2">
        {{ actor.width }}
      </el-descriptions-item>
      <el-descriptions-item label="速度" :span="3">
        {{ actor.speed }}
      </el-descriptions-item>
      <el-descriptions-item label="初始规模" :span="6">
        {{ actor.initScale }}
        <!-- <el-tag size="small" v-for="t in actor.initScale" :key="t"> 
          {{ t }} 
        </el-tag> -->
      </el-descriptions-item>
      <el-descriptions-item label="初始旋转" :span="6">
        {{ actor.initRotation }}
        <!-- <el-tag size="small" v-for="t in actor.initRotation" :key="t"> 
          {{ t }} 
        </el-tag> -->
      </el-descriptions-item>
      <el-descriptions-item label="类型数组" :span="6">
        {{ actor.classList }}
        <!-- <el-tag size="small" v-for="t in actor.classList" :key="t"> 
          {{ t }} 
        </el-tag> -->
      </el-descriptions-item>


    </el-descriptions>
  </div>
</div>

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
      Styles: {},
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
        initScale: [],
        initRotation: [],
        classList: '',
        width: '',
        height: '',
        keyNameList: '',
      },
      user:{
        Download_permission: "",
        Email: "",
        Name: "",
        Upload_permission:""
      },
      rules: {
        // imageUrl: '',
        /* image_uri: [{ validator: validateRequire }], 
                title: [{ validator: validateRequire }],
                content: [{ validator: validateRequire }],
                source_uri: [{ validator: validateSourceUri, trigger: 'blur' }],*/
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '请选择分类', trigger: 'change' }
          /* { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' } */
        ],
        // tag: [{ required: true, message: '请选择标签', trigger: 'change' }],
        // tagInput: [
        //   { required: false, message: '请填写自定义标签', trigger: 'blur' }
        // ],
        Dimension: [{ required: true, message: '请选择', trigger: 'change' }],
        File: [{ required: true, message: '请上传文件', trigger: 'change' }]
      },
    }
  },
    
  
  created() {
    this.$http.get("/Style").then(res => {
      this.Styles = res.data
    })
    this.$route.params.id && this.fetch()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm);
          // 设置作者
          const author = JSON.parse(localStorage.getItem("name"))
          this.$set(this.actor, 'Author', author)

          // 关联动作
          var animSelection = new Array();
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var animID = this.multipleSelection[i]._id
            animSelection.push(animID)
          }
          this.$set(this.actor, 'Animation', animSelection)

          //关联音频
          var audioSelection = new Array();
          for (var i = 0; i < this.multipleSelection2.length; i++) {
            var audioList = this.multipleSelection2[i]._id
            audioSelection.push(audioList)
            // console.log(animSelection)
          }
          this.$set(this.actor, 'AudioList', audioSelection)

          //标签
          if (this.TagInput.length === 0){
              this.$set(this.actor, 'Tag', this.TagSelect)
          } else{
              this.TagSelect = this.TagSelect.concat(this.TagInput.split(" "))
              this.$set(this.actor, 'Tag', this.TagSelect)
          }
      
          if (this.$route.params.id){
            this.$http.put(`Actor/${this.$route.params.id}`, this.actor).then(res => {
              console.log(res.data);
            })
          } else {
            this.$http.post('actor', this.actor).then(res => {
              console.log(res.data);
            })
          }
          // this.$http.post('actor', this.actor).then(res => {
          //   console.log(res.data);
          // })
          alert('提交成功!');

          // save
          this.$router.push('/ActorManage')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toAnim(id){
      this.$router.push(`/AnimationDetail/${id}`)
    },
    toAudio(id){
      this.$router.push(`/AudioDetail/${id}`)
    },

    async fetch(){
      const res = await this.$http.get(`Actor/${this.$route.params.id}`)
      this.actor = res.data
      const res1 = await this.$http.get('Preview/' + this.actor.Name)
      const res2 = await this.$http.get('matSettingList/' + this.actor.Name)
      let preview = res1.data[0]
      let setting = res2.data[0]
      for(let key in preview){
        if (key == "KeyName" || key == "Type" || key == "Url"){
          this.actor["Preview_" + key] = preview[key]
        }
      }
      for(let key in setting){
        if (key != "_id" && key != "matName"){
          this.actor[key] = setting[key]
        }
      }
      for(let i=0;i<this.Styles.length;i++){
        if(this.actor.Style == this.Styles[i].StyleId){
          this.actor.Style = this.Styles[i].StyleName
        }
      }
      if(this.actor.Preview_Type == "Character"){
        this.actor.Preview_Type = "人物"
      }
      else if(this.actor.Preview_Type == "Animal"){
        this.actor.Preview_Type = "动物"
      }
      this.username = JSON.parse(localStorage.getItem("name"))
      // console.log(this.actor)
      this.$forceUpdate()
    },

    async download(url) {
      this.$message('获取资源中，该过程可能需要几秒钟，请稍后')
      const aTag = document.createElement('a')
      aTag.href = url //文件id
      aTag.click()
      // const username = JSON.parse(localStorage.getItem("name"))
      // const user = await this.$http.get(`UserByName/${username}`)
      // if(user.data.Download_permission == "有下载权限"){
      //   const aTag = document.createElement('a')
      //   aTag.href = url //文件id
      //   aTag.click()
      //   alert("创建下载任务成功！");
      // }else{
      //   alert("您暂无下载权限");
      //   return false
      // }
      
    },

    async handleChange() {
      this.$router.push(`/EditActor/${this.actor._id}`)
    }
  }
};
</script>

<style lang='scss' scoped>
@import '~@/styles/mixin.scss';
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  // flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 300px;
  margin-right: 20px;
}

.item-detail-right {
  width: 500px;
  // margin-left: 30px;

  // display: flex;
  // flex-direction: column;
}

.item-detail-big-img {
  width: 250px;
  height: 250px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
}

</style>
