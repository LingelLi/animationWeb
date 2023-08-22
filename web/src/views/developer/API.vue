<template>
  <div class="app-container">
    <div style="margin-top:50px;">
      <aside>
        <h3>/api/Developer/getOneUrl</h3>
        根据输入角色的分类、标签及关联动画的标签，返回一个符合条件的角色及关联动画url列表
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane label="Parameters">

        <code>
            <p>角色类型：<el-tag class="permission-sourceCode" type="info">actorType</el-tag></p>
            <p>角色标签：<el-tag class="permission-sourceCode" type="info">actorTag</el-tag></p>
            <p>动画标签：<el-tag class="permission-sourceCode" type="info">animationTag</el-tag></p>
        </code>
        <p>可用<el-tag class="permission-sourceCode">,</el-tag>分割，支持模糊查询</p>
        </el-tab-pane>

        <el-tab-pane label="Returns">
        <code>
          <p>角色名称：<el-tag class="permission-sourceCode" type="info">actorName</el-tag></p>
          <p>角色URL：<el-tag class="permission-sourceCode" type="info">actorURL</el-tag></p>
          <p>动画名称：<el-tag class="permission-sourceCode" type="info">animName</el-tag></p>
          <p>动画URL：<el-tag class="permission-sourceCode" type="info">animURL</el-tag></p>
        </code>
        </el-tab-pane>
      </el-tabs>
    </div>

        <div style="margin-top:50px;">
      <aside>
        <h3>/api/Developer/getAllUrl</h3>
        根据输入角色的分类、标签及关联动画的标签，返回全部符合条件的角色及关联动画url列表
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane label="Parameters">

        <code>
            <p>角色类型：<el-tag class="permission-sourceCode" type="info">actorType</el-tag></p>
            <p>角色标签：<el-tag class="permission-sourceCode" type="info">actorTag</el-tag></p>
            <p>动画标签：<el-tag class="permission-sourceCode" type="info">animationTag</el-tag></p>
        </code>
        <p>可用<el-tag class="permission-sourceCode">,</el-tag>分割，支持模糊查询</p>
        </el-tab-pane>

        <el-tab-pane label="Returns">
        <code>
          <p>角色名称：<el-tag class="permission-sourceCode" type="info">actorName</el-tag></p>
          <p>角色URL：<el-tag class="permission-sourceCode" type="info">actorURL</el-tag></p>
          <p>动画名称：<el-tag class="permission-sourceCode" type="info">animName</el-tag></p>
          <p>动画URL：<el-tag class="permission-sourceCode" type="info">animURL</el-tag></p>
        </code>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>

</template>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  ::v-deep .permission-sourceCode {
    margin-left: 15px;
    margin-right: 15px;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>