<template>
    <div>
        <el-button class="filter-item" style="margin: 20px;" type="primary" icon="el-icon-edit" @click="handleAdd">
        新增
      </el-button>
        <el-table :data="contentList.filter(data => (!search || data.valName.includes(search)) || data.keyNameList[0].toString().includes(search) || data.bookName.includes(search))" style="width: 100%;margin: 10px 0 0 30px">

            <el-table-column prop="bookName" label="绘本" width="200px"></el-table-column>

            <el-table-column prop="valName" label="通用名称" width="200px">

            </el-table-column>
            <el-table-column label="绘本中的名称">
                <template slot-scope="scope">
                    <el-tag size="medium" v-for="(item, index) in scope.row.keyNameList[0]" :key="index">{{ item }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="300px">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                    style="width: 250px;"
                    ></el-input>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleCancel">

        <div style="margin-bottom: 20px;">
            <el-select v-model="create_book" placeholder="请选择或输入绘本" allow-create default-first-option filterable clearable @blur="oninput1($event)" @change="onchange1($event)">
                <el-option v-for="(item, index) in all_book" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </div>

        <div style="margin-bottom: 20px;">
            <el-select v-model="create_value" placeholder="请选择或输入通用名称" allow-create default-first-option filterable clearable @blur="oninput($event)" @change="onchange($event)">
                <el-option v-for="(item, index) in all_value" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </div>
        
        <div>
            <el-tag
            :key="index"
            v-for="(item, index) in create_keys"
            closable
            :disable-transitions="false"
            @close="handleClose(item)">
            {{ item }}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">新增绘本中的名称</el-button>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleCreate">确 定</el-button>
        </span>
        </el-dialog>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            contentList: [],
            rawdata: {},
            dialogVisible: false,
            create_value: "",
            create_keys: [],
            all_value: [],
            inputVisible: false,
            inputValue: '',
            dialogTitle: '',
            search: '',
            create_book: '',
            all_book: []
        }
    },

    mounted() {
        this.getContentList()
        this.getAllValue()
    },

    methods: {
        //获得convMatMapListChild中ObjectMap的所有数据
        async getContentList() {
            let mapName = "ObjectMap"
            await this.$http.get(`/convMatMapListChild/${mapName}`).then(res => {
                this.rawdata = res.data[0]
                this.contentList = res.data[0].contentList
                this.getAllBook()
            })
        },
        //获得所有已有书名
        getAllBook(){
            let data = this.contentList
            for(let d=0;d<data.length;d++){
                let bookName = data[d].bookName
                if(!this.all_book.includes(bookName)){
                    this.all_book.push(bookName)
                }
            }
        },
        //获得所有一级映射名称
        async getAllValue(){
            let mapName = 'ObjectMap'
            await this.$http.get(`convMatMapList/${mapName}`).then(res => {
                let data = res.data[0].contentList
                for(let d=0;d<data.length;d++){
                    let keyNameList = data[d].keyNameList[0]
                    for(let i=0;i<keyNameList.length;i++){
                        if(!this.all_value.includes(keyNameList[i])){
                            this.all_value.push(keyNameList[i])
                        }
                    }
                }
            })
        },
        handleAdd(){
            this.dialogVisible=true
            this.dialogTitle="新增一级映射"
        },
        //输入一级映射名称
        oninput(e){
            if(e.target.value){
                this.create_value = e.target.value
                this.onchange(this.create_value)
            }
        },
        //输入的一级映射名称修改时，查询对应的绘本名称
        onchange(e){
            console.log(e)
            this.create_keys = []
            for(let i=0;i<this.contentList.length;i++){
                if(this.contentList[i].valName == e && (this.create_book == "" || this.contentList[i].bookName == this.create_book)){
                    this.create_keys = JSON.parse(JSON.stringify(this.contentList[i].keyNameList[0]))
                    break
                }
            }
        },
        //输入绘本
        oninput1(e){
            if(e.target.value){
                this.create_book = e.target.value
                this.onchange(this.create_book)
            }
        },

        onchange1(e){
            console.log(e)
            this.create_keys = []
            for(let i=0;i<this.contentList.length;i++){
                if(this.contentList[i].bookName == e && this.create_value == this.contentList[i].valName){
                    this.create_keys = JSON.parse(JSON.stringify(this.contentList[i].keyNameList[0]))
                    break
                }
            }
        },
        //删除某个绘本名称
        handleClose(tag) {
            this.create_keys.splice(this.create_keys.indexOf(tag), 1)
        },
        //新增（输入）绘本名称
        showInput(){
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        //输入完成
        handleInputConfirm() {
            let inputValue = this.inputValue
            if(inputValue){
                this.create_keys.push(inputValue)
            }
            this.inputVisible=false
            this.inputValue=""
        },
        //创建新的绘本名称
        handleCreate() {
            if(this.create_book == ""){
                this.$message({"message":"请填写或选择绘本", "type":"error"})
                return
            }
            if(this.create_value == ""){
                this.$message({"message":"请填写或选择通用名称", "type":"error"})
                return
            }
            let find = false
            for(let i=0;i<this.contentList.length;i++){
                if(this.contentList[i].valName == this.create_value && this.contentList[i].bookName == this.create_book){
                    this.contentList[i].keyNameList = [this.create_keys]
                    find = true
                    break
                }
            }
            if(!find){
                this.contentList.push({"valName": this.create_value, "keyNameList": [this.create_keys], "bookName": this.create_book})
            }
            this.rawdata.contentList = this.contentList
            this.$http.put(`convMatMapListChild/${this.rawdata._id}`, this.rawdata).then(res => {
                this.$message({"message":"操作成功", "type":"success"})
            }).catch(error => {
                console.log(error)
                this.$message({"message":"操作失败，请稍后重试", "type":"error"})
            })
            this.dialogVisible = false
            this.create_value = ""
            this.create_keys = []
            this.create_book = ""
        },
        handleCancel() {
            this.dialogVisible = false
            this.create_value = ""
            this.create_keys = []
            this.create_book = ""
        },
        handleEdit(data){
            this.dialogVisible=true
            this.dialogTitle="修改一级映射"
            this.create_value = data.valName
            this.create_keys = JSON.parse(JSON.stringify(data.keyNameList[0]))
            this.create_book = data.bookName
        },
        handleDelete(data) {
            this.$confirm('是否确定删除该项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.contentList = this.contentList.filter(function(item){
                    return item != data
                })
                this.rawdata.contentList = this.contentList
                
                this.$http.put(`convMatMapListChild/${this.rawdata._id}`, this.rawdata).then(res => {
                    this.$message({"message":"删除成功", "type":"success"})
                }).catch(error => {
                    console.log(error)
                    this.$message({"message":"删除失败，请稍后重试", "type":"error"})
                })
            })
        },
    }
}
</script>


<style>
  .el-tag + .el-tag {
    margin: 0 0 0 10px;
  }
  .button-new-tag {
    margin: 0 0 0 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin: 0 0 0 10px;
    vertical-align: bottom;
  }
</style>