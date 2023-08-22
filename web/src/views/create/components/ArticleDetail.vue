<template>
  <div class='createPost-container'>
    <el-form ref='postForm' :model='postForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>
            <!-- <el-form-item style='margin-bottom: 40px;' prop='name'>
              <MDinput v-model='postForm.name' :maxlength='100' name='name' required>* 角色名称</MDinput>
            </el-form-item>-->
<!-- <h1>ID:{{this.$route.params.id}}</h1> -->

            <div class='characterInfo-container'>
              <el-form
                :model='actor'
                :rules='rules'
                ref='actor'
                label-width='100px'
                class='demo-ruleForm'
              >
                <!-- <el-form-item style='margin-bottom: 40px;' prop='namename'>
                  <MDinput v-model='actor.Name' :maxlength='100' name='name' required>* 角色名称</MDinput>
                </el-form-item> -->

                <el-form-item label="角色名称" prop='Name'>
                  <el-input v-model="actor.Name"></el-input>
                </el-form-item>

                <el-form-item label='2D / 3D' prop='Dimension'>
                  <el-radio-group v-model='actor.Dimension'>
                    <el-radio label='2D'></el-radio>
                    <el-radio label='3D'></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label='角色分类' prop='Type'>
                  <el-cascader
                    v-model='actor.Type'
                    placeholder='请选择角色分类'
                    :options='modelOptions'
                  ></el-cascader>
                </el-form-item>

                <el-form-item label='角色标签' prop='TagInput'>
                  <el-input v-model='TagInput' placeholder='请输入自定义标签  以空格分隔'></el-input>
                </el-form-item>

                <el-form-item prop='Tag'>
                  <el-cascader
                    v-model='TagSelect'
                    placeholder='请选择角色标签'
                    :options='options'
                    :props='{ checkStrictly: true,multiple: true,emitPath:false }'
                    clearable
                  ></el-cascader>
                </el-form-item>

                <el-form-item label='角色描述'>
                  <el-input type='textarea' v-model='actor.Desc'></el-input>
                </el-form-item>

                <el-form-item prop='image_uri' label='缩略图'>
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
                    :on-preview="handlePreview"
                    :on-success="afterUploadFile"
                    :before-remove="beforeRemove"
                    multiple
                    :file-list="actor.File"
                  >
                    <el-button size='small' type='primary'>点击上传</el-button>
                  </el-upload>
                </el-form-item>

                <el-form-item label='关联动画'>
                  <el-table
                    v-model="actor.Animation"
                    ref="multipleTable"
                    :data="animTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type='selection' width='55'></el-table-column>

                    <el-table-column prop="Name" label='动画名称' width='200'>
                      <!-- <template slot-scope='scope'>{{ scope.row.date }}</template> -->
                    </el-table-column>
                    <el-table-column prop='_id' v-model='actor.Animation' label='id' width='120'></el-table-column>
                    <el-table-column prop='Desc' label='动画描述' show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-form-item>

                <el-form-item label='关联音频'>
                  <el-table
                    ref='multipleTable'
                    :data='audioTableData'
                    tooltip-effect='dark'
                    style='width: 100%'
                    @selection-change='handleSelectionChange2'
                  >
                    <el-table-column type='selection' width='55'></el-table-column>
                    <el-table-column prop="Name" label='音频名称' width='200'>
                      <!-- <template slot-scope='scope'>{{ scope.row.date }}</template> -->
                    </el-table-column>
                    <el-table-column prop='_id' v-model='actor.AudioList' label='id' width='120'></el-table-column>
                    <el-table-column prop='Desc' label='音频描述' show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-form-item>

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
};

export default {
  name: 'ArticleDetail',
  components: {
    // Tinymce,
    // MDinput
    // Upload,
    // Sticky,
    // Warning,
    // CommentDropdown,
    // PlatformDropdown,
    // SourceUrlDropdown
  },
  props: {
    id: { }
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
      // userListOptions: [],
      uploadDisabled: false,
      limitcount: 1,
      fileList: [],
      imageUrl: '',
      TagInput:'',
      TagSelect:'',

      animTableData: [],
      audioTableData: [
        // {
        //   date: '鸭子叫',
        //   author: 'admin',
        //   description: ''
        // }
      ],

      multipleSelection: [],
      multipleSelection2: [],
      input: '',
      postForm: {
        name: ''
      },
      actor: {
        Name: '',
        Type: '',
        Tag: '',
        Dimension: '',
        File: '',
        Image: '',
        Desc: '',
        Author: '',
        Animation: '',
        AuditStatus:'未审核'
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
        File: [{ required: false, message: '请上传文件', trigger: 'blur' }]
      },
      // tempRoute: {},

      selected: '',
      options: [
        {
          value: '风格',
          label: '风格',
          disabled: true,
          children: [
            {
              value: '写实',
              label: '写实'
            },
            {
              value: '像素',
              label: '像素'
            },
            {
              value: '卡通',
              label: '卡通'
            }
          ]
        },
        {
          value: '分类',
          label: '分类',
          disabled: true,
          children: [
            {
              value: '动物',
              label: '动物',
              children: [
                {
                  value: '哺乳类动物',
                  label: '哺乳类动物',
                  children: [
                    {
                      value: '猫',
                      label: '猫'
                    },
                    {
                      value: '兔',
                      label: '兔'
                    },
                    {
                      value: '狗',
                      label: '狗'
                    },
                    {
                      value: '虎',
                      label: '虎'
                    },
                    {
                      value: '猴子',
                      label: '猴子'
                    },
                    {
                      value: '猩猩',
                      label: '猩猩'
                    },
                    {
                      value: '猪',
                      label: '猪'
                    },
                    {
                      value: '羊',
                      label: '羊'
                    },
                    {
                      value: '象',
                      label: '象'
                    },
                    {
                      value: '马',
                      label: '马'
                    },
                    {
                      value: '鹿',
                      label: '鹿'
                    },
                    {
                      value: '豹子',
                      label: '豹子'
                    },
                    {
                      value: '松鼠',
                      label: '松鼠'
                    },
                    {
                      value: '熊',
                      label: '熊'
                    },
                    {
                      value: '狮子',
                      label: '狮子'
                    },
                    {
                      value: '牛',
                      label: '牛'
                    },
                    {
                      value: '狼',
                      label: '狼'
                    },
                    {
                      value: '斑马',
                      label: '斑马'
                    },
                    {
                      value: '长颈鹿',
                      label: '长颈鹿'
                    }
                  ]
                },
                {
                  value: '鸟类',
                  label: '鸟类',
                  children: [
                    {
                      value: '鸭',
                      label: '鸭'
                    },
                    {
                      value: '鸡',
                      label: '鸡'
                    },
                    {
                      value: '孔雀',
                      label: '孔雀'
                    },
                    {
                      value: '鸽子',
                      label: '鸽子'
                    },
                    {
                      value: '火烈鸟',
                      label: '火烈鸟'
                    }
                  ]
                },
                {
                  value: '鱼类',
                  label: '鱼类'
                },
                {
                  value: '昆虫',
                  label: '昆虫',
                  children: [
                    {
                      value: '蝴蝶',
                      label: '蝴蝶'
                    },
                    {
                      value: '蜻蜓',
                      label: '蜻蜓'
                    },
                    {
                      value: '蜜蜂',
                      label: '蜜蜂'
                    },
                    {
                      value: '蚂蚁',
                      label: '蚂蚁'
                    }
                  ]
                },
                {
                  value: '爬行动物',
                  label: '爬行动物',
                  children: [
                    {
                      value: '乌龟',
                      label: '乌龟'
                    },
                    {
                      value: '鳄鱼',
                      label: '鳄鱼'
                    },
                    {
                      value: '蛇',
                      label: '蛇'
                    }
                  ]
                },
                {
                  value: '两栖动物',
                  label: '两栖动物',
                  children: [
                    {
                      value: '青蛙',
                      label: '青蛙'
                    }
                  ]
                }
              ]
            },
            {
              value: '职业',
              label: '职业',
              children: [
                {
                  value: '教师',
                  label: '教师'
                },
                {
                  value: '医生',
                  label: '医生'
                },
                {
                  value: '警察',
                  label: '警察'
                },
                {
                  value: '工程师',
                  label: '工程师'
                },
                {
                  value: '消防员',
                  label: '消防员'
                },
                {
                  value: '学生',
                  label: '学生'
                },
                {
                  value: '司机',
                  label: '司机'
                },
                {
                  value: '律师',
                  label: '律师'
                },
                {
                  value: '商人',
                  label: '商人'
                },
                {
                  value: '销售员',
                  label: '销售员'
                },
                {
                  value: '服务员',
                  label: '服务员'
                },
                {
                  value: '运动员',
                  label: '运动员'
                },
                {
                  value: '军人',
                  label: '军人'
                },
                {
                  value: '模特',
                  label: '模特'
                },
                {
                  value: '其他职业',
                  label: '其他职业'
                },

              ]
            }
          ]
        }
        /* ,{
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
                       } */
      ],

      value: [],
      modelOptions: [
        {
          value: '人类',
          label: '人类',
          children: [
            {
              value: '男性',
              label: '男性',
              children: [
                {
                  value: '幼年',
                  label: '幼年'
                },
                {
                  value: '青年',
                  label: '青年'
                },
                {
                  value: '成年',
                  label: '成年'
                },
                {
                  value: '中年',
                  label: '中年'
                },
                {
                  value: '老年',
                  label: '老年'
                }
              ]
            },
            {
              value: '女性',
              label: '女性',
              children: [
                {
                  value: '幼年',
                  label: '幼年'
                },
                {
                  value: '青年',
                  label: '青年'
                },
                {
                  value: '成年',
                  label: '成年'
                },
                {
                  value: '中年',
                  label: '中年'
                },
                {
                  value: '老年',
                  label: '老年'
                }
              ]
            }
          ]
        },
        {
          value: '动物',
          label: '动物'
        }
      ]
    };
  },
  computed: {
    // contentShortLength() {
    //   return this.postForm.content_short.length;
    // },
    // displayTime: {
    //   // set and get is useful when the data
    //   // returned by the back end api is different from the front end
    //   // back end return => '2013-06-25 06:59:25'
    //   // front end need timestamp => 1372114765000
    //   get() {
    //     return +new Date(this.postForm.display_time);
    //   },
    //   set(val) {
    //     this.postForm.display_time = new Date(val);
    //   }
    // }
  },
  created() {
    // if (this.isEdit) {
    //   const id = this.$route.params && this.$route.params.id;
    //   this.fetchData(id);
    // }
    this.$route.params.id && this.fetch()

    this.fetchAnimation()
    this.fetchAudio()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    // this.tempRoute = Object.assign({}, this.$route);

    // this.$http.get('Actor').then(res => {
    //   this.animTableData = res.data
    //   console.log(res.data)
    // })
  },
  methods: {
    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          this.postForm = response.data;

          // just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`;
          this.postForm.content_short += `   Article Id:${this.postForm.id}`;

          // set tagsview title
          // this.setTagsViewTitle();

          // set page title
          this.setPageTitle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // setTagsViewTitle() {
    //   const title = 'Edit Article';
    //   const route = Object.assign({}, this.tempRoute, {
    //     title: `${title}-${this.postForm.id}`
    //   });
    //   this.$store.dispatch('tagsView/updateVisitedView', route);
    // },
    setPageTitle() {
      const title = 'Edit Article';
      document.title = `${title} - ${this.postForm.id}`;
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm);
          // 关联动作
          var animSelection = new Array();
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var halo = this.multipleSelection[i]._id
            animSelection.push(halo)
            // console.log(animSelection)
          }
          this.$set(this.actor, 'Animation', animSelection)

          //关联音频
          var audioSelection = new Array();
          for (var i = 0; i < this.multipleSelection2.length; i++) {
            var halo = this.multipleSelection2[i]._id
            audioSelection.push(halo)
            // console.log(animSelection)
          }
          this.$set(this.actor, 'AudioList', audioSelection)

          //标签
          this.TagInput = this.TagInput.split(" ")
          this.TagSelect = this.TagSelect.concat(this.TagInput)
          this.$set(this.actor, 'Tag', this.TagSelect)
      
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

    async fetch(){
      const res = await this.$http.get(`Actor/${this.$route.params.id}`)
      this.actor = res.data
      console.log(this.actor)
    },

    async fetchAnimation(){
      const res = await this.$http.get('Animation')
      this.animTableData = res.data
    },
    // fetch 音频
    async fetchAudio(){
      const res = await this.$http.get('Audio')
      this.audioTableData = res.data
    },

    // handleChange(file, fileList) {
    //   this.uploadDisabled = fileList.length >= this.limitcount;
    //   console.log('this.uploadDisabled', this.uploadDisabled);
    // },
    // handleRemove(file, fileList) {
    //   this.uploadDisabled = fileList.length >= this.limitcount;
    //   console.log('this.uploadDisabled', this.uploadDisabled);
    // },
    // handleFileRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSelectionChange(res) {
      this.multipleSelection = res
      console.log(res)
      // this.$set(this.actor, 'Animation', res)
    },
    handleSelectionChange2(res) {
      this.multipleSelection2 = res
      console.log(res)
      // this.$set(this.actor, 'Animation', res)
    },
    // dialogFormAdd() {
    //   for (var i = 0; i < this.multipleSelection.length; i++) {
    //     var halo = this.multipleSelection[i];
    //     console.log(halo);
    //     // halo即为选中数组里的值。控制台打印就看获得 拿到了值想如何操做均可以了。
    //     // this.$axios.post().then(res => {
    //     //  
    //     // });
    //   }
    // },

    // handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },
    afterUpload(res){
        // console.log(res)
        this.$set(this.actor, 'Image', res.url)
        // this.actor.Image =  res.url
    },
    afterUploadFile(res){
        // console.log(res)
        this.$set(this.actor, 'File', res.url)
        // this.actor.Image =  res.url
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
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
