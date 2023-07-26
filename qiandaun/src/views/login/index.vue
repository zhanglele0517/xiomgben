<template>
  <div class="login-container">
    <el-row type="flex" style="padding: 60px 0 0 70px">
      <img src="@/assets/img/logo_1.png" style="height: 49px;width: 239px">
      <div style="margin-left: 50px">
        <p class="title-top">IDT-ESP 除尘器数字孪生智慧管理系统</p>
        <p class="title-bottom">INTELLIGNT DIGITAL TWIN FOR ESP</p>
      </div>
    </el-row>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <img src="@/assets/img/rentou.png" class="icon">
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" style="color: #fff" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="请输入登录账号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passWord">
        <span class="svg-container">
          <svg-icon icon-class="password" style="color: #fff" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.passWord"
          :type="passwordType"
          placeholder="请输入登录密码"
          name="passWord"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            style="color: #fff"
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>

    </el-form>
    <p class="footer-title">智慧管理·预见未来</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('密码长度不能小于6位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        account: '1',
        passWord: '1'
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        passWord: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
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
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
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
    height: 50px;
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/img/login-bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    margin-right: 140px;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    line-height: 25px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;
    .icon {
      height: 60px;
      width: 60px;
      margin-bottom: 30px;
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

.title-top{
  margin: 0;
  font-size: 45px;
  font-family: FZCuHeiSongS-B-GB-Regular, FZCuHeiSongS-B-GB;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
}
.title-bottom{
  margin: 0;
  font-size: 26px;
  font-family: FZCuHeiSongS-B-GB-Regular, FZCuHeiSongS-B-GB;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  letter-spacing: 10px;
}
.footer-title{
  position: absolute;
  bottom: 50px;
  right: 100px;
  font-size: 50px;
  font-family: 楷体;
  font-weight: normal;
  color: rgba(255,255,255,0.6);
  letter-spacing: 10px;
}
</style>
