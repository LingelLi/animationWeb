<template>
<div class='ActorManage'>
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

      <el-form-item label="分类" prop="searchType">
          <el-cascader
            v-model='searchForm.searchType'
            placeholder='请选择角色分类'
            :options='typeOptions'
          ></el-cascader>
      </el-form-item>

          <el-button @click="resetForm('searchForm')">清除查询</el-button>
        </el-form>
    </div>

  <el-table
    ref="filterTable"
    :data="actorTableData.filter(data => data.AuditStatus === '审核通过' 
      &&(( !searchForm.search || data.Name.toLowerCase().includes(searchForm.search.toLowerCase())) &&
      ( !searchForm.searchTag || data.Tag.toString().includes(searchForm.searchTag.toString())) &&
      ( searchForm.searchType=='' || data.Type.toString()==searchForm.searchType.toString())))"
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
          <el-form-item label="缩略图">
              <img :src="props.row.Image" style="height:3rem;">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="角色名称"
      prop="Name">
    </el-table-column>
    
    <el-table-column
      label="角色分类"
      prop="Type">
    </el-table-column>

    <!-- <el-table-column
      label="角色分类"
      prop="Type">
    </el-table-column> -->
    <el-table-column
      label="缩略图" >
      <template slot-scope="scope"> 
      <img :src="scope.row.Image" style="height:3rem;">
      </template>
    </el-table-column>

    <el-table-column
      align="center">

      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-search"
        @click="$router.push(`/ActorDetail/${scope.row._id}`)"></el-button>
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
        props:{},
        actorTableData:[],
        searchForm:{
          search: '',
          searchTag:'',
          searchType:''
        },
        
        typeOptions:[
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

    async fetchActor(){
      const res = await this.$http.get('Actor')
      this.actorTableData = res.data
    },
    
    filterStatus(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    // searchTag() {
    //   var item = this.actorTableData.filter(data => {
    //     if (data.Tag.includes(this.searchVal) || !searchVal) {
    //       return data
    //     }
    //   })
    //   return item
    // }
  }
}
</script>