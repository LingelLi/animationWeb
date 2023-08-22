

<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="name">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                                        * 角色名称
              </MDinput>
            </el-form-item>

            <div class="characterInfo-container">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="2D / 3D" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="2D"></el-radio>
                    <el-radio label="3D"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="角色分类" prop="modelType">
                <el-cascader
                  v-model="ruleForm.modelType" placeholder="请选择角色分类"
                  :options="modelOptions"
                  @change="handleChange"></el-cascader>
                  </el-form-item>

                  
                <el-form-item label="角色标签" prop="tagInput">
                  <el-input v-model="ruleForm.tagInput" placeholder="请输入自定义标签  以 , 分隔"></el-input>
                  </el-form-item>

                  <el-form-item prop="tag">
                    <el-cascader
                      v-model="ruleForm.tag" placeholder="请选择角色标签"
                      :options="options"
                      :props="{ checkStrictly: true,multiple: true,emitPath:false }"
                      clearable></el-cascader>
                    </el-form-item>

                    
                  <el-form-item label="角色描述">
                    <el-input type="textarea"></el-input>
                  </el-form-item>

                  <el-form-item prop="image_uri" label="缩略图">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :class="{ disabled :uploadDisabled }"
                      list-type="picture-card"
                      :limit="limitcount"
                      :on-change="handleChange"
                      :on-remove="handleRemove"
                      :auto-upload="false"
                      accept="image/*">
                      <i class="el-icon-plus"></i>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="角色文件" prop="desc">
                    <el-upload
                      class="upload-demo"
                      v-model="ruleForm.desc"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleFileRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="关联动画">
                    <el-table
                    ref="multipleTable"
                    :data="animTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="动画名称"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="author"
                      label="作者"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="动画描述"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                  </el-form-item>

                  <el-form-item label="关联音频">
                    <el-table
                    ref="multipleTable"
                    :data="audioTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="音频名称"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="author"
                      label="作者"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="音频描述"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'AnimationUploadDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
/*     const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    } */
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      uploadDisabled: false,
      limitcount: 1,

      animTableData:[{
          date: '游泳',
          author: 'admin',
          description:''
        }, {
          date: '吃东西',
          author: 'admin',
          description: ''
        }, {
          date: '跳舞',
          author: 'admin',
          description: ''
        }],
      audioTableData:[{
          date: '鸭子叫',
          author: 'admin',
          description:''
        }],

      multipleSelection: [],
      input: '',
      postForm: {
          name: ''
        },
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          modelType: '',
          tag:'',
          tagInput:'',
          resource: '',
          desc: ''
        },
      rules: {
        imageUrl:'',
        /* image_uri: [{ validator: validateRequire }], 
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }],*/
        name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        region: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        modelType: [
          { required: true, message: '请选择分类', trigger: 'change' }
          /* { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' } */
        ],
        tag: [
          { required: true, message: '请选择标签', trigger: 'change' }
        ],
        tagInput: [
          { required: false, message: '请填写自定义标签', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ]
      },
      tempRoute: {},

      selected: '',
      options:  [{
          value: 'style',
          label: '风格',
          disabled: true,
          children: [{
            value: 'xieshi',
            label: '写实',
          }, {
            value: 'xiangsu',
            label: '像素',
          }, {
            value: 'catoon',
            label: '卡通',
          }]
        }, {
          value: 'fenlei',
          label: '分类',
          disabled: true,
            children: [{
            value: 'animal',
            label: '动物',
            children: [{
              value: 'buru',
              label: '哺乳类动物',
              children: [{
                value: 'mao',
                label: '猫'
              }, {
                value: 'tu',
                label: '兔'
              },  {
                value: 'gou',
                label: '狗'
              },{
                value: 'hu',
                label: '虎'
              }, {
                value: 'houzi',
                label: '猴子'
              }, {
                value: 'xingxing',
                label: '猩猩'
              }, {
                value: 'zhu',
                label: '猪'
              }, {
                value: 'yang',
                label: '羊'
              }, {
                value: 'xiang',
                label: '象'
              }, {
                value: 'ma',
                label: '马'
              }, {
                value: 'lu',
                label: '鹿'
              }, {
                value: 'baozi',
                label: '豹子'
              }, {
                value: 'songshu',
                label: '松鼠'
              }, {
                value: 'xiong',
                label: '熊'
              }, {
                value: 'shizi',
                label: '狮子'
              }, {
                value: 'niu',
                label: '牛'
              }, {
                value: 'lang',
                label: '狼'
              }, {
                value: 'banma',
                label: '斑马'
              }, {
                value: 'changjinglu',
                label: '长颈鹿'
              }]
            }, {
              value: 'niaolei',
              label: '鸟类',
              children: [{
                value: 'ya',
                label: '鸭'
              }, {
                value: 'ji',
                label: '鸡'
              }, {
                value: 'kongque',
                label: '孔雀'
              }, {
                value: 'gezi',
                label: '鸽子'
              }, {
                value: 'huolieniao',
                label: '火烈鸟'
              }]
            },  {
              value: 'yulei',
              label: '鱼类',
            }, {
              value: 'kunchong',
              label: '昆虫',
              children: [{
                value: 'hudie',
                label: '蝴蝶'
              }, {
                value: 'qingting',
                label: '蜻蜓'
              }, {
                value: 'mifeng',
                label: '蜜蜂'
              }, {
                value: 'mayi',
                label: '蚂蚁'
              }]
            }, {
              value: 'paxing',
              label: '爬行动物',
              children: [{
                value: 'wugui',
                label: '乌龟'
              }, {
                value: 'eyu',
                label: '鳄鱼'
              }, {
                value: 'she',
                label: '蛇'
              }]
            }, {
              value: 'liangqi',
              label: '两栖动物',
              children: [{
                value: 'qingwa',
                label: '青蛙'
              }]
            }],
          }, {
          value: 'zhiye',
          label: '职业',
          children: [{
            value: 'jiaoshi',
            label: '教师'
          }, {
            value: 'yisheng',
            label: '医生'
          }, {
            value: 'jingcha',
            label: '警察'
          }, {
            value: 'gongchengshi',
            label: '工程师'
          }, {
            value: 'xiaofangyuan',
            label: '消防员'
          }]
        }]
        },{
          value: 'color',
          label: '颜色',
          disabled: true,
          children: [{
            value: 'red',
            label: '红',
          }, {
            value: 'yellow',
            label: '黄',
          }, {
            value: 'blue',
            label: '蓝',
          },,{
            value: 'green',
            label: '绿',
          },{
            value: 'purple',
            label: '紫',
          },{
            value: 'white',
            label: '白',
          },{
            value: 'black',
            label: '黑',
          },{
            value: 'gray',
            label: '灰',
          }]
        }],

        value: [],
        modelOptions: [{
          value: 'human',
          label: '人类',
          children: [{
            value: 'male',
            label: '男性',
            children: [{
              value: 'younian',
              label: '幼年'
            }, {
              value: 'qingnian',
              label: '青年'
            }, {
              value: 'chengnian',
              label: '成年'
            }, {
              value: 'zhongnian',
              label: '中年'
            }, {
              value: 'laonian',
              label: '老年'
            }]
          }, {
            value: 'female',
            label: '女性',
            children: [{
              value: 'younian',
              label: '幼年'
            }, {
              value: 'qingnian',
              label: '青年'
            }, {
              value: 'chengnian',
              label: '成年'
            }, {
              value: 'zhongnian',
              label: '中年'
            }, {
              value: 'laonian',
              label: '老年'
            }]
          }]
        }, {
          value: 'animal',
          label: '动物',
        }
    
        ]};
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
   /*  submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '上传角色成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, */
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    handleChange(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitcount;
      console.log("this.uploadDisabled", this.uploadDisabled);
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitcount;
      console.log("this.uploadDisabled", this.uploadDisabled);
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
    /* beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传缩略图只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传缩略图大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    } */
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


</style>
