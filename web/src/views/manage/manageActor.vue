<template>
<div class='ActorManage'>

  <div class="buttons">
      <el-button class="filter-item" style="margin: 20px;" type="primary" icon="el-icon-edit" @click="handleCreate">
       新增
      </el-button>
  </div>
    <!-- :data="actorTableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))" -->
  <el-table
    ref="filterTable"
    :data="actorTableData.filter(data => data.Author === this.username &&( data.Name.toLowerCase().includes(search.toLowerCase())))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="角色名称">
            <span>{{ props.row.Name }}</span>
          </el-form-item>
          <el-form-item label="角色 ID">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="角色分类">
            <span>{{ props.row.Type }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.Author }}</span>
          </el-form-item>
          <el-form-item label="角色描述">
            <span>{{ props.row.Desc }}</span>
          </el-form-item>
          <el-form-item label="角色标签">
            <span>{{ props.row.Tag }}</span>
          </el-form-item>
          <el-form-item label="2D / 3D">
            <span>{{ props.row.Dimension }}</span>
          </el-form-item>
          <el-form-item label="审核状态">
            <span>{{ props.row.AuditStatus }}</span>
          </el-form-item>
          <el-form-item label="缩略图">
            <!-- <span>{{ props.row.Image }}</span> -->
              <img :src="props.row.Image" style="height:3rem;">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="角色 ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="Name">
    </el-table-column>
    <el-table-column
      label="角色分类"
      prop="Type">
    </el-table-column>


    <el-table-column
      align="center">
      <template slot="header" slot-scope="scope">
        <span>
        <!-- <el-button type="primary" size="mini">批量上传</el-button> -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/></span>
      </template>
      <template slot-scope="scope">
        <el-button type="info" size="small" icon="el-icon-download"
        @click="download(scope.row.File)"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-search"
        @click="$router.push(`/ActorDetail/${scope.row._id}`)"></el-button>
        <el-button type="primary" size="small" icon="el-icon-edit"
        @click="$router.push(`/EditActor/${scope.row._id}`)"></el-button>
        <el-button type="danger" size="small" icon="el-icon-delete"
        @click="remove(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        actorTableData:[],
        search: '',
        changeActor:'',
        username:''
      }
    },
  created() {
    this.fetchActor()
  },

  methods: {
    download(url) {
      const aTag = document.createElement('a')
      aTag.href = url //文件id
      aTag.click()
    },

    async handleCreate() {
      const username = JSON.parse(localStorage.getItem("name"))
      const user = await this.$http.get(`UserByName/${username}`)
      if(user.data.Upload_permission == "有上传权限"){
        this.$router.push('/manage/uploadActor')
      }else{
        alert("您暂无上传权限");
        return false
      }
    },
    // handleCreate() {
    //   this.$router.push('/manage/uploadActor')
    // },

    async fetchActor(){
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
      this.username = JSON.parse(localStorage.getItem("name"))
      // console.log(res.data)
    },
    async remove(row){
    this.$confirm('是否确定删除该项?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const res = await this.$http.delete(`Actor/${row._id}`)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.fetchActor()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }

  }
}
</script>