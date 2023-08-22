<template>
  <div class="createPost-container">
    <el-form ref="UserForm" :model="UserForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">

            <div class="characterInfo-container">
              <el-form
                ref="user"
                :model="user"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
              >

                <el-form-item label="用户名">
                  <el-input v-model="user.Name" :disabled="true" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="user.Email" :disabled="true" />
                </el-form-item>

                <el-form-item label="上传权限" prop="Upload_permission">
                  <el-radio-group v-model="user.Upload_permission">
                    <el-radio-button label="有上传权限" />
                    <el-radio-button label="无上传权限" />
                  </el-radio-group>
                  <!-- <el-input v-model="user.Upload_permission"></el-input> -->
                </el-form-item>

                <el-form-item label="下载权限" prop="Download_permission">
                  <el-radio-group v-model="user.Download_permission">
                    <el-radio-button label="有下载权限" />
                    <el-radio-button label="无下载权限" />
                  </el-radio-group>
                  <!-- <el-input v-model="user.Download_permission"></el-input> -->
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('user')">保存</el-button>
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
        Email: '',
        Upload_permission: '',
        Download_permission: ''
      },
      model: {},
      id: '',
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
        ]

      }
      // tempRoute: {},

    }
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
            console.log(res.data)
          })

          alert('保存成功!')

          // save
          this.$router.push('/user/UserList')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async fetch() {
      const res = await this.$http.get(`User/${this.$route.params.id}`)
      this.user = res.data
    }

  }
}
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
