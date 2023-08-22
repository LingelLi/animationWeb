<template>
<div class='BackgroundManage'>
<div class="filter-container" style="margin: 20px;">
      <el-form :model="searchForm" ref="searchForm" class="demo-form-inline" :inline="true">
      <el-form-item label="名称" prop="search">
        <el-input
          v-model="searchForm.search"
          style="width: 200px;"
          placeholder="输入关键字搜索名称"/>
      </el-form-item>

      <el-form-item label="标签" prop="searchTag">
        <el-input
          v-model="searchForm.searchTag"
          style="width: 200px;"
          placeholder="输入关键字搜索标签"/>
      </el-form-item>

          <el-button @click="resetForm('searchForm')">清除查询</el-button>
        </el-form>
    </div>
  <el-table
    ref="filterTable"
    :data="backgroundTableData.filter(data => data.AuditStatus === '审核通过' 
      &&(( !searchForm.search || data.Name.toLowerCase().includes(searchForm.search.toLowerCase())) &&
      ( !searchForm.searchTag || data.Tag.includes(searchForm.searchTag.toLowerCase())) ))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="背景名称">
            <span>{{ props.row.Name }}</span>
          </el-form-item>
          <el-form-item label="背景 ID">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.Author }}</span>
          </el-form-item>
          <el-form-item label="背景描述">
            <span>{{ props.row.Desc }}</span>
          </el-form-item>
          <el-form-item label="背景标签">
            <span>{{ props.row.Tag }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="背景 ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="背景名称"
      prop="Name">
    </el-table-column>

    <el-table-column
      align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-search"
        @click="$router.push(`/BackgroundDetail/${scope.row._id}`)"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-download"
        @click="download(scope.row.File)"></el-button>
      
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
        backgroundTableData:[],
        searchForm:{
          search: '',
          searchTag:'',
        },
        change:''
      }
    },
  created() {
    this.fetch()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

    async fetch(){
      const res = await this.$http.get('Background')
      this.backgroundTableData = res.data
      // console.log(res.data)
    },

  }
}
</script>