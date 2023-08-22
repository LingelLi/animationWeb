<template>
  <div class="app-container">
    <div>
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-download"
      >下载模板</el-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>

    <el-button
      style="float: right"
      type="primary"
      :loading="loading"
      @click="submitExcel()"
    >确认并导入</el-button>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      files: [],
      loading: false
    }
  },
  methods: {
    beforeUpload(file) {
      this.files = file
      console.log(this.files)

      // const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isLt5M = file.size / 1024 / 1024 < 5

      if (isLt5M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      console.log('tableData', this.tableData)
    },
    submitExcel() {
      this.doImport(this.tableData)
    },

    async doImport(data) {
      try {
        const res = await this.$http.post('animation', data)
        this.loading = false
        this.$message.success('导入成功')
      } catch (err) {
        console.log('importMaterial', err)
        this.loading = false
        this.$message.error('导入失败')
      }
    }
  }
}
</script>
