<template>
  <div class='createPost-container'>
    <el-form ref='itemsForm' :model='itemsForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>

            <div class='characterInfo-container'>
              <el-form
                :model='items'
                :rules='rules'
                ref='items'
                label-width='100px'
                class='demo-ruleForm'
              >

                <el-form-item label="道具名称" prop='Name'>
                  <el-input v-model="items.Name"></el-input>
                </el-form-item>
            
                <el-form-item label='2D / 3D' prop='Dimension'>
                  <el-radio-group v-model='items.Dimension'>
                    <el-radio label='2D'></el-radio>
                    <el-radio label='3D'></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="道具标签" prop="TagInput">
                  <el-input v-model="TagInput" placeholder="请输入自定义标签  以空格分隔"></el-input>
                  </el-form-item>

                  <el-form-item prop="Tag">
                    <el-cascader
                      v-model="TagSelect"
                      placeholder="请选择道具标签"
                      :options="options"
                      :props="{ checkStrictly: true,multiple: true,emitPath:false }"
                      clearable></el-cascader>
                    </el-form-item>

                  <el-form-item label="道具描述">
                    <el-input type="textarea" v-model='items.Desc'></el-input>
                  </el-form-item>

                  <el-form-item prop='image_uri' label='缩略图'>
                    <el-upload
                      class="avatar-uploader"
                      :action="$http.defaults.baseURL + '/upload'"
                      :show-file-list="false"
                      :on-success="afterUpload"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="items.Image" :src="items.Image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="道具文件" prop='File'>
                    <el-upload
                      class='upload-demo'
                      :action="$http.defaults.baseURL + '/uploadFile'"
                      :on-preview="handlePreview"
                      :on-success="afterUploadFile"
                      :on-remove="handleFileRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :file-list="items.File"
                    >
                      <el-button size='small' type='primary'>点击上传</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('items')">提交</el-button>
                    <el-button @click="resetForm('items')">重置</el-button>
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
  name: 'ItemsUpload',
  // components: { MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
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
      username:'',

      input: '',
      itemsForm: {
          name: ''
        },
      items: {
          Name: '',
          Tag: '',
          Image:'',
          File: '',
          Dimension: '',
          Desc: '',
          Author: '',
          AuditStatus:'未审核'
        },
      rules: {
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        File: [{ required: true, message: '请上传文件', trigger: 'change' }],
        Dimension: [{ required: true, message: '请选择', trigger: 'change' }],
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
        },  {
          value: '室内',
          label: '室内',
        }, {
          value: '户外',
          label: '户外',
        },{
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
              this.$set(this.items, 'Author', author)
              //标签
              if (this.TagInput.length === 0){
                  this.$set(this.items, 'Tag', this.TagSelect)
              } else{
                  this.TagSelect = this.TagSelect.concat(this.TagInput.split(" "))
                  this.$set(this.items, 'Tag', this.TagSelect)
              }
          
              if (this.$route.params.id){
                this.$set(this.items, 'AuditStatus', '未审核')
                this.$http.put(`Items/${this.$route.params.id}`, this.items).then(res => {
                  console.log(res.data);
                })
              } else {
                this.$http.post('Items', this.items).then(res => {
                  console.log(res.data);
                })
              }

              alert('提交成功!');
              this.$router.push('/ItemsManage')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    async fetch(){
      const res = await this.$http.get(`Items/${this.$route.params.id}`)
      this.items = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
      console.log(this.items)
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
    afterUpload(res){
        this.$set(this.items, 'Image', res.url)
    },
    afterUploadFile(res){
      // console.log(res)
      this.$set(this.items, 'File', res.url)
      // this.items.Image =  res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
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