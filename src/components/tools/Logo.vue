<template>
  <div class="logo">
      <!-- <span><a :href="tokenUrl" style="color: #fff" target="_blank">this is demo!!!</a></span> -->
      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
      <!-- <img v-if="navTheme === 'dark'" src="@/assets/logo1.png" alt="logo"> -->
      <!-- <img v-else src="@/assets/logo-single.png" alt="logo"> -->
      <!-- <img v-if="navTheme === 'dark'" src="@/assets/logo1.png" alt="logo">  -->
      <a :href="tokenUrl" style="color: #fff" target="_blank">
        <!-- <img v-if="collapsed == false" src="@/assets/000005.png" alt="logo"> -->
        <img v-if="collapsed == false" src="@/assets/01.png" alt="logo" width="167px">
        <img v-else src="@/assets/27.png" alt="logo">
      </a>
      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->

      <h1 v-if="showTitle">{{ title }}</h1>
  </div>
</template>

<script>
  import { mixin } from '@/utils/mixin.js'
import { mapState } from 'vuex'

  export default {
    name: 'Logo',
    mixins: [mixin],
    props: {
      title: {
        type: String,
        default: '理财代销平台',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    data() {
      return {
        tokenUrl: ''
      }
    },
    computed: {
      ...mapState({
        collapsed: state => state.app.collapsed,
        token: (state) => state.user.token
      })
    },
    mounted() {
      let token = this.token;
      token = btoa(token);
      this.tokenUrl = `${window._CONFIG['globalURl']}layout/dashboard?token=${token}`
      // this.tokenUrl = `http://localhost:8080/layout/dashboard?token=${token}`
    }
  }
</script>
<style lang="scss" scoped>
  /*缩小首页布 局顶部的高度*/
  $height: 59px;

  .sider {
    box-shadow: none !important;
    .logo {
      height: $height !important;
      line-height: $height !important;
      box-shadow: none !important;
      transition: background 300ms;

      a {
        color: white;
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    &.light .logo {
      background-color: #1890ff;
    }
  }
</style>