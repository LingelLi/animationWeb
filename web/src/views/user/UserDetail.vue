<template>
  <div class='createPost-container'>
    <el-form ref='UserForm' :model='UserForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>

            <div class='characterInfo-container'>
              <el-form
                :model='user'
                :rules='rules'
                ref='user'
                label-width='100px'
                class='demo-ruleForm'
              >
                <!-- <el-form-item style='margin-bottom: 40px;' prop='namename'>
                  <MDinput v-model='user.Name' :maxlength='100' name='name' required>* 角色名称</MDinput>
                </el-form-item> -->

                <el-form-item label="用户名">
                  <el-input v-model="user.Name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop='Email'>
                  <el-input v-model="user.Email"></el-input>
                </el-form-item>
                
                <el-form-item label="上传权限">
                  <el-input v-model="user.Upload_permission" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="下载权限">
                  <el-input v-model="user.Download_permission" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop='Password'>
                  <el-input v-model="user.Password"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type='primary' @click="submitForm('user')">保存</el-button>
                  <el-button @click="resetForm('user')">重置</el-button>
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

export default {
  name: 'UserDetail',
  components: {
  },
  props: {
    id: { }
  },
  data() {
    
    return {
      uploadDisabled: false,
      user: {
        Name: '',
        Password: '',
        Email:'',
        Upload_permission:'',
        Download_permission:''
      },
      model:{},
      id:'',
      UserForm: {
          name: ''
        },
      rules: {

        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        Email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],

      },
      // tempRoute: {},

      
    };
  },
  computed: {
  },
  created() {

    this.fetch()

  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
      
            this.$http.put(`User/${this.user._id}`, this.user).then(res => {
              console.log(res.data);
            })
          
          alert('保存成功!');

          // save
          this.$router.push('/user/UserDetail')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async fetch(){
      // this.username = JSON.parse(localStorage.getItem("name"))
      // this.model.Name = username
      // console.log(this.model.data)
      // const user = await this.$http.post('UserByName',this.model)
      const username = JSON.parse(localStorage.getItem("name"))
      const res = await this.$http.get(`UserByName/${username}`)
      // this.user.Name = res.data.Name
      // this.user.Email = res.data.Email
      // this.user.Password = res.data.Password
      this.user = res.data
      console.log(this.user)

    }

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
