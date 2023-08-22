<template>
<div>
<div class="item-detail-show">
  <div class="item-detail-right">
    <el-descriptions title="动画详情" direction="vertical" :column="4" border>
      <el-descriptions-item label="名称">{{animation.Name}}</el-descriptions-item>
      <el-descriptions-item label="标签" :span="4">
        <el-tag size="small" v-for="tag in animation.Tag" :key="tag">{{ tag }}</el-tag>
      </el-descriptions-item >
      <el-descriptions-item label="描述" :span="4">{{animation.Desc}}</el-descriptions-item>
      <el-descriptions-item label="关联角色ID" :span="4">
       <p v-for="type in animation.ActorList" :key="type">
         <el-link @click="toActor(type)" icon="el-icon-view"> {{ type }} </el-link></p>
      </el-descriptions-item>
      <el-descriptions-item label="关联音频ID" :span="4">
       <p v-for="type in animation.AudioList" :key="type">
         <el-link @click="toAudio(type)" icon="el-icon-view"> {{ type }} </el-link></p>
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" size="mini" icon="el-icon-download"
          @click="download(animation.File)">下载资源</el-button>
  </div>
</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Uploadanimation',
  components: {
  },
  props: {
    id: { }
  },
  data() {
    return {
      username:'',
      animation: {
      },
      user:{
        Download_permission: "",
        Email: "",
        Name: "",
        Upload_permission:""
      },

    }
  },
    
  
  created() {
    this.$route.params.id && this.fetch()
  },
  methods: {
    toActor(id){
      this.$router.push(`/ActorDetail/${id}`)
    },
    toAudio(id){
      this.$router.push(`/AudioDetail/${id}`)
    },

    async fetch(){
      const res = await this.$http.get(`Animation/${this.$route.params.id}`)
      this.animation = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
    },

    
    async download(url) {
      const username = JSON.parse(localStorage.getItem("name"))
      const user = await this.$http.get(`UserByName/${username}`)
      if(user.data.Download_permission == "有下载权限"){
        const aTag = document.createElement('a')
        aTag.href = url //文件id
        aTag.click()
        alert("创建下载任务成功！");
      }else{
        alert("您暂无下载权限");
        return false
      }
      
    },
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
  margin-right: 20px;
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
