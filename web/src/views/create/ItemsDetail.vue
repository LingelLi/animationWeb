<template>
<div>
<div class="item-detail-show">
  <div class="item-detail-left">
    <div class="item-detail-big-img">
      <img :src="items.Image" style="width: 250px; height: 250px">
      <el-button type="primary" size="mini" icon="el-icon-download"
          @click="download(items.File)">下载资源</el-button>
    </div>
  </div>

  <div class="item-detail-right">
    <el-descriptions title="道具详情" direction="vertical" :column="4" border>
      <el-descriptions-item label="名称">{{items.Name}}</el-descriptions-item>
      <el-descriptions-item label="2D / 3D">{{items.Dimension}}</el-descriptions-item>
      <el-descriptions-item label="分类" :span="2">
        <el-tag size="small" v-for="type in items.Type" :key="type">{{ type }} </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="标签" :span="4">
        <el-tag size="small" v-for="tag in items.Tag" :key="tag">{{ tag }}</el-tag>
      </el-descriptions-item >
      <el-descriptions-item label="描述" :span="4">{{items.Desc}}</el-descriptions-item>

    </el-descriptions>
  </div>
</div>

</div>
</template>

<script>
export default {
  name: 'UploadItems',
  components: {
  },
  props: {
    id: { }
  },
  data() {
    return {
      username:'',
      items:{},
      user:{
        Download_permission: "",
        Email: "",
        Name: "",
        Upload_permission:""
      }
    }
  },
    
  
  created() {
    this.fetch()
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`Items/${this.$route.params.id}`)
      this.items = res.data
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
