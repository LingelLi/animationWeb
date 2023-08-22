<template>
  <div class='createPost-container'>
    <el-form ref='backgroundForm' :model='backgroundForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>

            <div class='characterInfo-container'>
              <el-form
                :model='background'
                :rules='rules'
                ref='background'
                label-width='100px'
                class='demo-ruleForm'
              >

                <el-form-item label="背景名称" prop='Name'>
                  <el-input v-model="background.Name"></el-input>
                </el-form-item>
            
                <el-form-item label="背景标签" prop="TagInput">
                  <el-input v-model="TagInput" placeholder="请输入自定义标签  以空格分隔"></el-input>
                  </el-form-item>

                  <el-form-item prop="Tag">
                    <el-cascader
                      v-model="TagSelect"
                      placeholder="请选择背景标签"
                      :options="options"
                      :props="{ checkStrictly: true,multiple: true,emitPath:false }"
                      clearable></el-cascader>
                    </el-form-item>

                  <el-form-item label="背景描述">
                    <el-input type="textarea" v-model='background.Desc'></el-input>
                  </el-form-item>

                  <el-form-item label="背景文件" prop='File'>
                    <el-upload
                      class='upload-demo'
                      :action="$http.defaults.baseURL + '/uploadFile'"
                      :on-preview="handlePreview"
                      :on-success="afterUploadFile"
                      :on-remove="handleFileRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :file-list="background.File"
                    >
                      <el-button size='small' type='primary'>点击上传</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="角色可出现点" prop="appearPosition">
                  	<el-input v-model="appearPosition" placeholder="请填写角色可出现坐标  格式：(x,y,z) 用;分隔"></el-input>
                  </el-form-item>

				          <el-form-item label="可行路径坐标" prop="routes">
                    <el-input v-model="routes" placeholder="请填写路径起点和终点坐标  格式：(x,y,z)  不同路径间用;分隔"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('background')">提交</el-button>
                    <el-button @click="resetForm('background')">重置</el-button>
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

const defaultForm = {

}
export default {
  name: 'BackgroundUploadDetail',
  // components: { MDinput },
  props: {

  },
  data() {
    return {
      loading: false,
      uploadDisabled: false,
      limitcount: 1,
      fileList: [],
      imageUrl: '',
      TagInput:'',
      TagSelect:'',
      appearPosition:'',
      routes:'',
      username:'',

      input: '',
      backgroundForm: {
          name: ''
        },
      background: {
          Name: '',
          Tag: '',
          File: '',
          Desc: '',
          Author: '',
          AppearPosition:'',
          Route:'',
          AuditStatus:'未审核'
        },
      rules: {
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        File: [{ required: true, message: '请上传文件', trigger: 'change' }]
      },

	  selected: '',
    options:  [{
        value: 'style',
        label: '风格',
        disabled: true,
        children: [{
          value: '写实',
          label: '写实',
        }, {
          value: '像素',
          label: '像素',
        }, {
          value: '卡通',
          label: '卡通',
        }]
      }, {
        value: '场景',
        label: '场景',
        disabled: true,
        children: [{
          value: '自然',
          label: '自然',
          }, {
          value: '城市',
          label: '城市',
        }, {
        value: '其他',
          label: '其他',
        }]
		}]
	}


  },
  computed: { },
  created() {
    this.$route.params.id && this.fetch()
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
              // 设置作者
              const author = JSON.parse(localStorage.getItem("name"))
              this.$set(this.background, 'Author', author)

              //标签
              if (this.TagInput.length === 0){
                  this.$set(this.background, 'Tag', this.TagSelect)
              } else{
                  this.TagSelect = this.TagSelect.concat(this.TagInput.split(" "))
                  this.$set(this.background, 'Tag', this.TagSelect)
              }
              //可行路径
              this.routes = this.routes.split(";")
              this.$set(this.background, 'Route', this.routes)

              this.appearPosition = this.appearPosition.split(";")
              this.$set(this.background, 'AppearPosition', this.appearPosition)
          
              if (this.$route.params.id){
                this.$set(this.background, 'AuditStatus', '未审核')
                this.$http.put(`Background/${this.$route.params.id}`, this.background).then(res => {
                  console.log(res.data);
                })
              } else {
                this.$http.post('background', this.background).then(res => {
                  console.log(res.data);
                })
              }
              alert('提交成功!');
              this.$router.push('/BackgroundManage')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    handleFileRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    afterUploadFile(res){
      // console.log(res)
      this.$set(this.background, 'File', res.url)
      // this.background.Image =  res.url
    },
      
    async fetch(){
      const res = await this.$http.get(`Background/${this.$route.params.id}`)
      this.background = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
      console.log(this.background)
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
}

</style>