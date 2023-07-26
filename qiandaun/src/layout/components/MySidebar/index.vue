<template>
  <div class="my_sidebar flex-x">
    <div
      style="width: 28%; padding-left: 0"
      class="my_sidebar_item flex-x flex-bottom flex-center"
    >
      <img
        class="my_sidebar_item_bg"
        src="@/assets/barImgs/bar_1.png"
        style="width: 100%"
        alt=""
      >

      <div
        v-for="(item, index) in routes1"
        :key="index"
        class="my_sidebar_texts_item flex-x flex-center"
        :style="{
          background: `url(${item.meta.background})`,
          width: item.meta.width,
          height: item.meta.height,
        }"
      >
        <!-- <div class="menu-list-box" :style="{bottom: item.meta.height}">
          <div v-for="(items,indexs) in item.children" :key="indexs" class="item-menu">
            <AppLink :to="`${item.path === '/' ? '' : item.path}/${items.path}`">
              {{ items.meta.title }}
            </AppLink>
          </div>
        </div>
        <span
          slot="reference"
          :style="{
            transform: `rotate(${item.meta.rotate}deg)`,
          }"
        >
          {{ item.meta.title }}
        </span> -->
        <el-popover
          placement="top"
          trigger="hover"
          popper-class="menu-popover"
        >
          <div v-for="(items,indexs) in item.children" :key="indexs" class="applink-item">
            <AppLink v-if="!items.meta.noShow" :to="`${item.path === '/' ? '' : item.path}/${items.path}`">
              {{ items.meta.title }}
            </AppLink>
          </div>
          <span
            slot="reference"
            :style="{
              transform: `rotate(${item.meta.rotate}deg)`,
            }"
          >
            {{ item.meta.title }}
          </span>
        </el-popover>
      </div>
    </div>
    <div
      style="width: 44%; margin: 0 10px; padding: 0 50px"
      class="my_sidebar_item flex-x flex-bottom flex-center"
    >
      <img
        class="my_sidebar_item_bg"
        src="@/assets/barImgs/bar_2.png"
        style="width: 100%"
        alt=""
      >
      <div
        v-for="(item, index) in routes2"
        :key="index"
        class="my_sidebar_texts_item flex-x flex-center"
        :style="{
          background: `url(${item.meta.background})`,
          width: item.meta.width,
          height: item.meta.height,
        }"
      >
        <el-popover
          placement="top"
          trigger="hover"
          popper-class="menu-popover"
        >
          <div v-for="(items,indexs) in item.children" :key="indexs" class="applink-item">
            <AppLink :to="`${item.path === '/' ? '' : item.path}/${items.path}`">
              {{ items.meta.title }}
            </AppLink>
          </div>
          <span
            slot="reference"
            :style="{
              transform: `rotate(${item.meta.rotate}deg)`,
            }"
          >
            {{ item.meta.title }}
          </span>
        </el-popover>
      </div>
    </div>
    <div
      style="width: 28%; padding-left: 0"
      class="my_sidebar_item flex-x flex-bottom flex-center"
    >
      <img
        class="my_sidebar_item_bg"
        src="@/assets/barImgs/bar_3.png"
        style="width: 100%"
        alt=""
      >
      <div
        v-for="(item, index) in routes3"
        :key="index"
        class="my_sidebar_texts_item flex-x flex-center"
        :style="{
          background: `url(${item.meta.background})`,
          width: item.meta.width,
          height: item.meta.height,
        }"
      >
        <el-popover
          placement="top"
          trigger="hover"
          popper-class="menu-popover"
        >
          <div v-for="(items,indexs) in item.children" :key="indexs" class="applink-item">
            <AppLink :to="`${item.path === '/' ? '' : item.path}/${items.path}`">
              {{ items.meta.title }}
            </AppLink>
          </div>
          <span
            slot="reference"
            :style="{
              transform: `rotate(${item.meta.rotate}deg)`,
            }"
          >
            {{ item.meta.title }}
          </span>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import AppLink from '../Sidebar/Link.vue'
export default {
  components: {
    AppLink
  },
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    routes1() {
      return this.$router.options.routes.filter((item, index) => {
        return !item.hidden && index <= 5
      })
    },
    routes2() {
      return this.$router.options.routes.filter((item, index) => {
        return index >= 6 && index <= 10
      })
    },
    routes3() {
      return this.$router.options.routes.filter((item, index) => {
        return index >= 11 && index <= 14
      })
    }
  },
  mounted() {
    console.log(this.routes2)
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    }
  }
}
</script>

<style lang="scss" >
.my_sidebar_texts_item{
  position: relative;
  .menu-list-box{
    transition: all .5s linear;
    position: absolute;
    width: 80%;
    left: 0;
    background: rgba(19,39,122,0.6);
    border-radius: 10px 10px 0 0;
    box-shadow: 0px 0px 5px 1px #354fe2, inset 0px 0px 12px 3px #50f3ee;
    box-shadow-bottom: 0;
    padding: 0 10px;
    height: 0;
    overflow: hidden;
    .item-menu{
      padding: 10px 0;
      color: #fff;
      text-align: center;
    }
  }
  &:hover{
    .menu-list-box{
      padding: 10px;
      height: 200px;
    }
  }
}
@import "~@/styles/mixin.scss";
.tree_popper {
  background-color: transparent;
  border: 0;
  /* background: url(/assets/img/menu_item_bg.png) no-repeat;
  background-size: 100% 100%; */
  /* width: 82px;
  height: 173px;
  border: 1px solid;
  border-image: linear-gradient(0deg, #01edff) 10 10;
  background: linear-gradient(
    177deg,
    rgba(6, 57, 108, 0.9) 1%,
    rgba(6, 57, 108, 0) 100%
  );
  border-radius: 11px; */
  .el-tree {
    background-color: transparent;
    .el-tree-node__content:hover {
      background-color: transparent;
    }
    .el-tree-node__content {
      background-color: transparent !important;
    }
    .el-tree-node__label {
      color: #fff;
    }
    .el-tree-node__expand-icon {
      color: #fff;
    }
  }
  .tree_box {
    height: 150px;
    overflow-y: auto;
  }
}

.my_sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 90px;
  &_texts {
    height: 100%;
    &_item {
      cursor: pointer;
      font-size: 12px;
      color: #fff;
      background-repeat: no-repeat !important;
      background-size: 100% 100% !important;
      padding: 4px;
      span {
        display: inline-block;
        @include textoverflow(1);
      }
    }
  }
  &_item {
    position: relative;
    height: 90px;
    /* padding: 30px 0 0 10px; */
    padding-left: 10px;
    &_bg {
      z-index: -1;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 90px;
      vertical-align: middle;
    }
  }
}
.menu-popover{
  box-shadow: 0px 0px 5px 1px #354fe2, inset 0px 0px 12px 3px #50f3ee;
  background: rgba(19,39,122,0.6);
  border: none;
  .popper__arrow{
    border-color: transparent !important;
    &::after{
      border-top-color: rgba(82,253,248,0.6) !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.applink-item{
  margin-top: 10px;
  color: #fff;
  &:first-child{
    margin-top: 0;
  }
}
</style>
