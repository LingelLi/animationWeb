<template>
  <div class="login-container">
    <el-form ref="user" :model="user" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">动画资源管理系统 用户注册</h3>
      </div>

      <el-form-item prop="Name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="Name"
          v-model="user.Name"
          placeholder="请输入用户名"
          name="Name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="Password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="Password"
          v-model="user.Password"
          :type="passwordType"
          placeholder="请输入密码"
          name="Password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="Email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input type="email" v-model="user.Email"
        placeholder="请输入邮箱" ref="Email" name="Email"></el-input>
	  </el-form-item>

      <el-button type="primary" style="width:100% ;" 
      @click="submitForm('user')">注册</el-button>

      <el-link type="primary" @click="toLogin">用户登录</el-link>


    </el-form>
  </div>
</template>


<script>
import { validEmail } from '@/utils/validate'

export default{
    data(){
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6个字符'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if(validEmail(value)){
          callback()
        }else{
          callback(new Error("电子邮箱格式错误"))
        }
      }

      return{
        user:{
            Name: '',
            Password: '',
            Email: '',
            Upload_permission: '有上传权限',
            Download_permission: '无下载权限'
        },
        loginRules: {
          Name: [{ required: true, trigger: 'blur'}],
          Password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          Email: [{required: true, trigger: 'blur', validator: validateEmail}]
        },
        loading: false,
        passwordType: 'password',
      };
    },
    methods:{
      toLogin(){
        this.$router.push({
            path:'/login'
        });
      },
      submitForm(formName) {
        this.$http.get(`UserByName/${this.user.Name}`).then(res => {
          if(Object.keys(res.data).length == 0){
            this.$http.post('user', this.user).then(res => {
                console.log(res.data);
                this.$message({type:"success",message:'注册成功!'});
                this.$router.push('/login')
              }).catch(error => {
                this.$message({type:"error",message:'注册失败!'})
                console.log(error)
              })
          }else{
            this.$message({type:"error",message:'用户名重复，请重新输入!'})
          }
        })
      },
      showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
}
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
