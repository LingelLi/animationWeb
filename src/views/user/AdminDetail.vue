<template>
  <div class="createPost-container">
    <el-form ref="AdminForm" :model="AdminForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">

            <div class="characterInfo-container">
              <el-form
                ref="admin"
                :model="admin"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- <el-form-item style='margin-bottom: 40px;' prop='namename'>
                  <MDinput v-model='admin.Name' :maxlength='100' name='name' required>* 角色名称</MDinput>
                </el-form-item> -->

                <el-form-item label="管理员名称" prop="UserName">
                  <el-input v-model="admin.UserName"/>
                </el-form-item>

                <el-form-item label="管理员密码" prop="Password">
                  <el-input v-model="admin.Password" show-password/>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('admin')">提交</el-button>
                  <el-button @click="resetForm('admin')">重置</el-button>
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
// import Tinymce from '@/components/Tinymce';
// import Upload from '@/components/Upload/SingleImage3';
// import MDinput from '@/components/MDinput';
// import Sticky from '@/components/Sticky'; // 粘性header组件
// import { validURL } from '@/utils/validate';
// import { fetchArticle } from '@/api/article';
// import { searchUser } from '@/api/remote-search';
// import Warning from './Warning';
// import {
//   CommentDropdown,
//   PlatformDropdown,
//   SourceUrlDropdown
// } from './Dropdown';

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  // display_time: undefined, // 前台展示时间
  id: undefined,
  // platforms: ['a-platform'],
  comment_disabled: false
  // importance: 0
}

export default {
  name: 'ArticleDetail',
  components: {
  },
  props: {
    id: { }
  },
  data() {
    return {
      uploadDisabled: false,
      admin: {
        UserName: '',
        Password: ''
      },
      AdminForm: {
        name: ''
      },
      rules: {
        // imageUrl: '',
        /* image_uri: [{ validator: validateRequire }],
                title: [{ validator: validateRequire }],
                content: [{ validator: validateRequire }],
                source_uri: [{ validator: validateSourceUri, trigger: 'blur' }],*/
        UserName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          /* { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' } */
        ]

      }
      // tempRoute: {},

    }
  },
  computed: {
  },
  created() {
    // if (this.isEdit) {
    //   const id = this.$route.params && this.$route.params.id;
    //   this.fetchData(id);
    // }
    this.$route.params.id && this.fetch()
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            this.$http.put(`Admin/${this.$route.params.id}`, this.admin).then(res => {
              console.log(res.data)
            })
          } else {
            this.$http.post('admin', this.admin).then(res => {
              console.log(res.data)
            })
          }
          alert('提交成功!')

          // save
          this.$router.push('/user/AdminList')
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
      const res = await this.$http.get(`Admin/${this.$route.params.id}`)
      this.admin = res.data
      console.log(this.admin)
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
