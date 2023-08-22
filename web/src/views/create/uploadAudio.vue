<template>
  <div class='createPost-container'>
    <el-form ref='audioForm' :model='audioForm' :rules='rules' class='form-container'>
      <div class='createPost-main-container'>
        <el-row>
          <el-col :span='24'>

            <div class='characterInfo-container'>
              <el-form
                :model='audio'
                :rules='rules'
                ref='audio'
                label-width='100px'
                class='demo-ruleForm'
              >

                <el-form-item label="音频名称" prop='Name'>
                  <el-input v-model="audio.Name"></el-input>
                </el-form-item>
            
                <el-form-item label="音频标签" prop="TagInput">
                  <el-input v-model="TagInput" placeholder="请输入自定义标签  以空格分隔"></el-input>
                  </el-form-item>

                  <el-form-item prop="Tag">
                    <el-cascader
                      v-model="TagSelect"
                      placeholder="请选择音频标签"
                      :options="options"
                      :props="{ checkStrictly: true,multiple: true,emitPath:false }"
                      clearable></el-cascader>
                    </el-form-item>

                  <el-form-item label="音频描述">
                    <el-input type="textarea" v-model='audio.Desc'></el-input>
                  </el-form-item>

                  <el-form-item label="音频文件" prop='File'>
                    <el-upload
                      class='upload-demo'
                      :action="$http.defaults.baseURL + '/uploadFile'"
                      :on-preview="handlePreview"
                      :on-success="afterUploadFile"
                      :on-remove="handleFileRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :file-list="audio.File"
                    >
                      <el-button size='small' type='primary'>点击上传</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label='关联角色'>
                    <el-table
                      v-model="audio.ActorList"
                      ref="multipleTable"
                      :data="actorTableData.filter(data => data.Author === this.username)"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type='selection' width='55'></el-table-column>

                      <el-table-column prop="Name" label='角色名称' width='200'>
                      </el-table-column>
                      <el-table-column prop='_id' label='id' v-model='audio.ActorList' width='120'></el-table-column>
                      <el-table-column prop='Desc' label='角色描述' show-overflow-tooltip></el-table-column>
                    </el-table>
                  </el-form-item>

                  <el-form-item label='关联动画'>
                    <el-table
                      v-model="audio.AnimationList"
                      ref="multipleTable"
                      :data="animTableData.filter(data => data.Author === this.username)"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange2"
                    >
                      <el-table-column type='selection' width='55'></el-table-column>

                      <el-table-column prop="Name" label='动画名称' width='200'>
                      </el-table-column>
                      <el-table-column prop='_id' label='id' v-model='audio.AnimationList' width='120'></el-table-column>
                      <el-table-column prop='Desc' label='动画描述' show-overflow-tooltip></el-table-column>
                    </el-table>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('audio')">提交</el-button>
                    <el-button @click="resetForm('audio')">重置</el-button>
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
  name: 'AudioUploadDetail',
  // components: { MDinput },
  props: {},
  data() {
    return {
      username:'',
      loading: false,
      uploadDisabled: false,
      limitcount: 1,
      fileList: [],
      imageUrl: '',
      TagInput:'',
      TagSelect:'',

      animTableData:[],
      actorTableData:[],

      multipleSelection: [],
      multipleSelection2: [],
      input: '',
      audioForm: {
          name: ''
        },
      audio: {
          Name: '',
          Tag: '',
          File: '',
          Image: '',
          Desc: '',
          Author: '',
          AnimationList: '',
          ActorList:'',
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
          value: '适用动作',
          label: '适用动作',
          disabled: true,
          children: [{
            value: '走',
            label: '走',
          }, {
            value: '跑',
            label: '跑',
          }, {
            value: '跳',
            label: '跳',
          }, {
            value: '吃',
            label: '吃',
          }, {
            value: '休息',
            label: '休息',
          }, {
            value: '叫',
            label: '叫',
          },{
            value: '游泳',
            label: '游泳',
          }, {
            value: '战斗',
            label: '战斗',
          }, {
            value: '其他',
            label: '其他',
          }]
        }, {
          value: '适用角色',
          label: '适用角色',
          disabled: true,
            children: [{
            value: '动物',
            label: '动物',
            children: [{
              value: '哺乳类动物',
              label: '哺乳类动物',
              children: [{
                value: '猫',
                label: '猫'
              }, {
                value: '兔',
                label: '兔'
              },  {
                value: '狗',
                label: '狗'
              },{
                value: '虎',
                label: '虎'
              }, {
                value: '猴子',
                label: '猴子'
              }, {
                value: '猩猩',
                label: '猩猩'
              }, {
                value: '猪',
                label: '猪'
              }, {
                value: '羊',
                label: '羊'
              }, {
                value: '象',
                label: '象'
              }, {
                value: '马',
                label: '马'
              }, {
                value: '鹿',
                label: '鹿'
              }, {
                value: '豹子',
                label: '豹子'
              }, {
                value: '松鼠',
                label: '松鼠'
              }, {
                value: '熊',
                label: '熊'
              }, {
                value: '狮子',
                label: '狮子'
              }, {
                value: '牛',
                label: '牛'
              }, {
                value: '狼',
                label: '狼'
              }, {
                value: '斑马',
                label: '斑马'
              }, {
                value: '长颈鹿',
                label: '长颈鹿'
              }]
            }, {
              value: '鸟类',
              label: '鸟类',
              children: [{
                value: '鸭',
                label: '鸭'
              }, {
                value: '鸡',
                label: '鸡'
              }, {
                value: '孔雀',
                label: '孔雀'
              }, {
                value: '鸽子',
                label: '鸽子'
              }, {
                value: '火烈鸟',
                label: '火烈鸟'
              }]
            },  {
              value: '鱼类',
              label: '鱼类',
            }, {
              value: '昆虫',
              label: '昆虫',
              children: [{
                value: '蝴蝶',
                label: '蝴蝶'
              }, {
                value: '蜻蜓',
                label: '蜻蜓'
              }, {
                value: '蜜蜂',
                label: '蜜蜂'
              }, {
                value: '蚂蚁',
                label: '蚂蚁'
              }]
            }, {
              value: '爬行动物',
              label: '爬行动物',
              children: [{
                value: '乌龟',
                label: '乌龟'
              }, {
                value: '鳄鱼',
                label: '鳄鱼'
              }, {
                value: '蛇',
                label: '蛇'
              }]
            }, {
              value: '两栖动物',
              label: '两栖动物',
              children: [{
                value: '青蛙',
                label: '青蛙'
              }]
            }],
          }, {
          value: '人物',
          label: '人物',
          children: [{
            value: '男性',
            label: '男性',
            children: [{
              value: '幼年',
              label: '幼年'
            }, {
              value: '青年',
              label: '青年'
            }, {
              value: '成年',
              label: '成年'
            }, {
              value: '中年',
              label: '中年'
            }, {
              value: '老年',
              label: '老年'
            }]
          }, {
            value: '女性',
            label: '女性',
            children: [{
              value: '幼年',
              label: '幼年'
            }, {
              value: '青年',
              label: '青年'
            }, {
              value: '成年',
              label: '成年'
            }, {
              value: '中年',
              label: '中年'
            }, {
              value: '老年',
              label: '老年'
            }]
          }]
		    }]
		}],
	}


  },
  computed: { },
  created() {
    this.$route.params.id && this.fetch()
    this.fetchActor()
    this.fetchAnimation()
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
              const author = JSON.parse(localStorage.getItem("name"))
              this.$set(this.audio, 'Author', author)

              var actorSelection = new Array();
              for (var i = 0; i < this.multipleSelection.length; i++) {
                var halo = this.multipleSelection[i]._id
                actorSelection.push(halo)
              }
              this.$set(this.audio, 'ActorList', actorSelection)
              
              var animSelection = new Array();
              for (var i = 0; i < this.multipleSelection2.length; i++) {
                var halo = this.multipleSelection2[i]._id
                animSelection.push(halo)
                // console.log(animSelection)
              }
              this.$set(this.audio, 'AnimationList', animSelection)

              //标签
              if (this.TagInput.length === 0){
                  this.$set(this.audio, 'Tag', this.TagSelect)
              } else{
                  this.TagSelect = this.TagSelect.concat(this.TagInput.split(" "))
                  this.$set(this.audio, 'Tag', this.TagSelect)
              }
              
              if (this.$route.params.id){
                this.$set(this.audio, 'AuditStatus', '未审核')
                this.$http.put(`Audio/${this.$route.params.id}`, this.audio).then(res => {
                  console.log(res.data);
                })
              } else {
                this.$http.post('audio', this.audio).then(res => {
                  console.log(res.data);
                })
              }
              alert('提交成功!');
              this.$router.push('/AudioManage')
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
      const res = await this.$http.get(`Audio/${this.$route.params.id}`)
      this.audio = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
      // console.log(this.animation)
    },

    async fetchAnimation(){
      this.username = JSON.parse(localStorage.getItem("name"))
      const res = await this.$http.get('Animation')
      this.animTableData = res.data
    },
    // fetch 角色
    async fetchActor(){
      this.username = JSON.parse(localStorage.getItem("name"))
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(res) {
      this.multipleSelection2 = res
      console.log(res)
      // this.$set(this.actor, 'Animation', res)
    },
    afterUploadFile(res){
    // console.log(res)
    this.$set(this.audio, 'File', res.url)
    // this.actor.Image =  res.url
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

</style>