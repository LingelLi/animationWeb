<template>
  <div class="AcudioManage">
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

        <el-form-item label="分类" prop="searchType">
          <el-cascader
            v-model="searchForm.searchType"
            placeholder="请选择角色分类"
            :options="typeOptions"
          />
        </el-form-item>

        <el-button @click="resetForm('searchForm')">清除查询</el-button>
      </el-form>
    </div>
    <el-table
      ref="filterTable"
      :data="actorTableData.filter(data => (( !searchForm.search || data.Name.toLowerCase().includes(searchForm.search.toLowerCase())) &&
        ( !searchForm.searchTag || data.Tag.includes(searchForm.searchTag.toString())) &&
        ( searchForm.searchType=='' || data.Type.toString()==searchForm.searchType.toString())))"
      style="width: 100%"
    >
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
        prop="_id"
      />
      <el-table-column
        label="角色名称"
        prop="Name"
      />
      <el-table-column
        label="角色分类"
        prop="Type"
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
            @click="$router.push(`/ActorDetail/${scope.row._id}`)"
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
      actorTableData: [],
      searchForm: {
        search: '',
        searchTag: '',
        searchType: ''
      },
      changeActor: '',
      typeOptions: [
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
    }
  },
  created() {
    this.fetchActor()
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

    async fetchActor() {
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
      console.log(res.data)
    },

    async audit(row) {
      this.$confirm('是否确定审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.get(`Actor/${row._id}`)
        this.changeActor = res.data
        this.changeActor.AuditStatus = '审核通过'
        // console.log(this.changeActor)
        this.$http.put(`Actor/${row._id}`, this.changeActor)
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
        this.fetchActor()
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
        const res = await this.$http.get(`Actor/${row._id}`)
        this.changeActor = res.data
        this.changeActor.AuditStatus = '审核未通过'
        console.log(this.changeActor)
        this.$http.put(`Actor/${row._id}`, this.changeActor)
        // this.$message({
        //   type: 'success',
        //   message: '成功!'
        // });
        this.fetchActor()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },

    async remove(row) {
      this.$confirm('是否确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`Actor/${row._id}`)
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
