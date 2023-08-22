<template>
  <div class="AdminList">

    <el-table
      ref="filterTable"
      :data="actorTableData.filter(data => !search || data.UserName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        label="管理员 ID"
        prop="_id"
      />
      <el-table-column
        label="管理员名称"
        prop="UserName"
      />

      <!-- <el-table-column
      fixed="right"
      label="操作"
      width="180"> -->
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/EditAdmin/${scope.row._id}`)"
          >编辑</el-button>
          <el-button
            type="primary"
            size="small"
            @click="remove(scope.row)"
          >删除</el-button>
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
      actorTableData: [],
      search: ''
    }
  },
  created() {
    this.fetchActor()
  },
  methods: {
    async fetchActor() {
      const res = await this.$http.get('Admin')
      this.actorTableData = res.data
      console.log(res.data)
    },

    async remove(row) {
      this.$confirm('是否确定删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`Admin/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchActor()
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
