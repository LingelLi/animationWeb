<template>
  <el-table
    :data="actorTableData"
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
      label="角色描述"
      prop="Desc"
    />
  </el-table>
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
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  created() {
    this.fetchActor()
  },
  methods: {
    async fetchActor() {
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
      console.log(res.data)
    }
  }
}
</script>
