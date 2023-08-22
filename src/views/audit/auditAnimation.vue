<template>
  <div class="AnimManage">
    <div class="filter-container">
      <el-form ref="searchForm" :model="searchForm" class="demo-form-inline" :inline="true">
        <el-form-item label="名称" prop="search">
          <el-input
            v-model="searchForm.search"
            style="width: 200px;"
            placeholder="输入关键字搜索名称"
          />
        </el-form-item>

        <el-form-item label="标签" prop="searchTag">
          <el-input
            v-model="searchForm.searchTag"
            style="width: 200px;"
            placeholder="输入关键字搜索标签"
          />
        </el-form-item>

        <el-button @click="resetForm('searchForm')">清除查询</el-button>
      </el-form>
    </div>
    <el-table
      ref="filterTable"
      :data="animTableData.filter(data => (( !searchForm.search || data.Name.toLowerCase().includes(searchForm.search.toLowerCase())) &&
        ( !searchForm.searchTag || data.Tag.includes(searchForm.searchTag.toLowerCase())) ))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="动画名称">
              <span>{{ props.row.Name }}</span>
            </el-form-item>
            <el-form-item label="动画 ID">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.Author }}</span>
            </el-form-item>
            <el-form-item label="动画描述">
              <span>{{ props.row.Desc }}</span>
            </el-form-item>
            <el-form-item label="动画标签">
              <span>{{ props.row.Tag }}</span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{ props.row.AuditStatus }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="动画 ID"
        prop="_id"
      />
      <el-table-column
        label="动画名称"
        prop="Name"
      />
      <el-table-column
        label="审核状态"
        prop="AuditStatus"
        :filters="[{ text: '未审核', value: '未审核' }, { text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">

          <el-tag
            :type="(scope.row.AuditStatus === '未审核') ? 'primary' :(scope.row.AuditStatus === '审核通过'? 'success': 'danger' )"
            disable-transitions
          >{{ scope.row.AuditStatus }}</el-tag>

        </template>
      </el-table-column>

      <el-table-column
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="info"
            size="mini"
            icon="el-icon-download"
            @click="download(scope.row.File)"
          />
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="$router.push(`/AnimationDetail/${scope.row._id}`)"
          />
          <el-button type="primary" size="mini" @click="audit(scope.row)">通过</el-button>
          <el-button type="danger" size="mini" @click="auditFail(scope.row)">不通过</el-button>

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
      animTableData: [],
      searchForm: {
        search: '',
        searchTag: ''
      },
      change: ''
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    resetAuditFilter() {
      this.$refs.filterTable.clearFilter('AuditStatus')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    filterStatus(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    download(url) {
      const aTag = document.createElement('a')
      aTag.href = url // 文件id
      aTag.click()
    },

    async fetch() {
      const res = await this.$http.get('Animation')
      this.animTableData = res.data
      console.log(res.data)
    },

    async audit(row) {
      this.$confirm('是否确定审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.get(`Animation/${row._id}`)
        this.change = res.data
        this.change.AuditStatus = '审核通过'
        this.$http.put(`Animation/${row._id}`, this.change)
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },

    async auditFail(row) {
      this.$confirm('是否确定审核不通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.get(`Animation/${row._id}`)
        this.change = res.data
        this.change.AuditStatus = '审核未通过'
        this.$http.put(`Animation/${row._id}`, this.change)
        // this.$message({
        //   type: 'success',
        //   message: '成功!'
        // });
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },

    async remove(row) {
      this.$confirm('是否确定删除该动画?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`Animation/${row._id}`)
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
