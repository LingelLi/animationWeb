<template>
  <div class="ActorManage">

    <div class="buttons">
      <el-button class="filter-item" style="margin: 20px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" style="margin: 20px;" type="primary" @click="$router.push(`/convMatMapList`)">
        一级映射管理
      </el-button>
      <el-button class="filter-item" style="margin: 20px;" type="primary" @click="$router.push(`/convMatMapListChild`)">
        二级映射管理
      </el-button>
    </div>
    <!-- :data="actorTableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table
      ref="filterTable"
      :data="actorTableData.filter(data => ( !search || data.Name.includes(search))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" style="margin-left: 5%;">
            <el-form-item label="角色名称">
              <span>{{ props.row.Name }}</span>
            </el-form-item>
            <el-form-item label="角色 ID">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="角色分类">
              <span>{{ props.row.Type }}</span>
            </el-form-item>
            <el-form-item label="角色风格">
              <span>{{ props.row.Style }}</span>
            </el-form-item>
            <el-form-item label="类别ID">
              <span>{{ props.row.ClassId }}</span>
            </el-form-item>
            <el-form-item label="缩略图名">
              <span>{{ props.row.Preview_KeyName }}</span>
            </el-form-item>
            <el-form-item label="缩略图类型">
              <span>{{ props.row.Preview_Type }}</span>
            </el-form-item>
            <el-form-item label="高度">
              <span>{{ props.row.height }}</span>
            </el-form-item>
            <el-form-item label="宽度">
              <span>{{ props.row.width }}</span>
            </el-form-item>
            <el-form-item label="速度">
              <span>{{ props.row.speed }}</span>
            </el-form-item>
            <el-form-item label="初始规模">
              <span>{{ props.row.initScale }}</span>
            </el-form-item>
            <el-form-item label="初始旋转">
              <span>{{ props.row.initRotation }}</span>
            </el-form-item>
            <el-form-item label="类型数组">
              <span>{{ props.row.classList }}</span>
            </el-form-item>
            <!-- <el-form-item label="审核状态">
              <span>{{ props.row.AuditStatus }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="角色名称"
        prop="Name"
      />
      <el-table-column
        label="角色分类"
        prop="Type"
      />
      <el-table-column
        label="缩略图名"
        prop="Preview_KeyName"
      />
      <el-table-column label="缩略图" prop="Preview_Url">
        <template slot-scope="scope">
          <el-image :src="scope.row.Preview_Url" style="height: 60px;"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="300"
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
            @click="download(scope.row.ZipUrl)"
          />
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="$router.push(`/ActorDetail/${scope.row._id}`)"
          />
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/EditActor/${scope.row._id}`)"
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
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    background
    :total="actorTableData.length"
    :page-size="pagesize"
    :page-sizes="[5,10,15,20]"
    :current-page="currentPage"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    style="margin: 3% 0 3% 20%;">
  </el-pagination>
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
      Styles: {},
      actorTableData: [],
      search: '',
      username: '',
      pagesize: 10,  //每页的数据数
      currentPage: 1,  //初始页
    }
  },
  created() {
    this.fetchActor()
  },

  methods: {
    handleCurrentChange (currentPage){
      this.currentPage = currentPage
    },
    handleSizeChange (size){
      this.pagesize = size
    },

    download(url) {
      this.$message('获取资源中，该过程可能需要几秒钟，请稍后')
      const aTag = document.createElement('a')
      aTag.href = url // 文件id
      aTag.click()
    },

    handleCreate() {
      this.$router.push('/manage/uploadActor')
    },

    async fetchActor() {

      await this.$http.get("/Style").then(res => {
        this.Styles = res.data
      })

      // actor: {
      //   Name: '',
      //   Type: '',
      //   Style: '',
      //   ClassId: '0',
      //   Url: '',
      //   ZipUrl: '',
      //   Preview_KeyName: '',
      //   Preview_Type: '',
      //   Preview_Url: '',
      //   speed: '',
      //   initScale: [],
      //   initRotation: [],
      //   classList: '',
      //   width: '',
      //   height: '',
      //   keyNameList: '',
      // }
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
      for(let i=0; i<this.actorTableData.length; i++){
        const res1 = await this.$http.get('Preview/' + this.actorTableData[i].Name)
        const res2 = await this.$http.get('matSettingList/' + this.actorTableData[i].Name)
        let preview = res1.data[0]
        let setting = res2.data[0]
        for(let key in preview){
          if (key == "KeyName" || key == "Type" || key == "Url"){
            this.actorTableData[i]["Preview_" + key] = preview[key]
          }
        }
        if(preview != undefined && "_id" in preview)
          this.actorTableData[i]["Preview_id"] = preview["_id"]
        for(let key in setting){
          if (key != "_id" && key != "matName"){
            this.actorTableData[i][key] = setting[key]
          }
        }
        if(setting != undefined && "_id" in setting)
          this.actorTableData[i]["setting_id"] = setting["_id"]
        for(let i=0;i<this.Styles.length;i++){
          if(this.actorTableData[i].Style == this.Styles[i].StyleId){
            this.actorTableData[i].Style = this.Styles[i].StyleName
          }
        }
        if(this.actorTableData[i].Preview_Type == "Character"){
          this.actorTableData[i].Preview_Type = "人物"
        }
        else if(this.actorTableData[i].Preview_Type == "Animal"){
          this.actorTableData[i].Preview_Type = "动物"
        }
      }
      this.username = JSON.parse(localStorage.getItem('name'))  //目前未使用，应该用户只能看到自己的Actor
      this.$forceUpdate()
    },
    async remove(row) {
      this.$confirm('是否确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res = await this.$http.delete(`Actor/${row._id}`)
        res = await this.$http.delete(`Preview/${row.Preview_id}`)
        res = await this.$http.delete(`matSettingList/${row.setting_id}`)
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
