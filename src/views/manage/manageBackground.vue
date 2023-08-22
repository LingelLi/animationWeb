<template>
  <div class="BackgroundManage">
    <div class="buttons">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>
    <!-- :data="actorTableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table
      ref="filterTable"
      :data="bgTableData.filter(data => data.Author === this.username &&( data.Name.toLowerCase().includes(search.toLowerCase())))"
      style="width: 100%"
    >
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
            <el-form-item label="审核状态">
              <span>{{ props.row.AuditStatus }}</span>
            </el-form-item>
            <el-form-item label="缩略图">
              <img :src="props.row.File" style="height:3rem;">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="背景 ID"
        prop="_id"
      />
      <el-table-column
        label="背景名称"
        prop="Name"
      />

      <el-table-column
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <span>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            /></span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="info"
            size="small"
            icon="el-icon-download"
            @click="download(scope.row.File)"
          />
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="$router.push(`/BackgroundDetail/${scope.row._id}`)"
          />
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/EditBackground/${scope.row._id}`)"
          />
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row)"
          />
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
      bgTableData: [],
      search: '',
      change: '',
      username: ''
    }
  },
  created() {
    this.fetch()
  },

  methods: {
    async handleCreate() {
      this.$router.push('/manage/uploadBackground')
    },

    download(url) {
      const aTag = document.createElement('a')
      aTag.href = url // 文件id
      aTag.click()
    },

    async fetch() {
      const res = await this.$http.get('Background')
      this.bgTableData = res.data
      this.username = JSON.parse(localStorage.getItem('name'))
      console.log(res.data)
    },

    async remove(row) {
      this.$confirm('是否确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`Background/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
