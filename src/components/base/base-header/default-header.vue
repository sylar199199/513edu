<template>
  <div class="default-header">
    <div class="container">
      <div class="nav_mian">
        <div class="logo">
          <router-link to="/home" class="logo-router">
            <img :src="$imgUrl + '/base-header/nav_logo%402x.png'" alt="" />
          </router-link>
        </div>
        <div class="nav">
          <ul class="nav_list clearfix">
            <li class="nav_item" v-for="item in navList" :key="item.navId">
              <router-link
                :to="item.href"
                active-class="active"
                class="nav_item_a"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav_input">
          <input
            type="text"
            class="nav_input_input"
            v-model="defaultVal"
            placeholder="搜索感兴趣的课程"
          />
          <img
            class="nav_input_search"
            :src="$imgUrl + '/base-header/nav_search%402x.png'"
            alt=""
          />
        </div>
        <div class="log_reg">
          <DropDown />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from '@components/user/drop-down'
export default {
  name: 'default-header',
  data() {
    return {
      defaultVal: '',
    }
  },
  props: {
    navList: {
      type: Array,
    },
  },
  components: {
    DropDown,
  },
}
</script>

<style lang="less" scoped>
.nav_mian {
  height: 88px;
  background: rgba(255, 255, 255, 1);
  display: flex;

  .logo {
    margin-top: 22px;
    margin-right: 34px;
    .logo-router {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .nav_list {
    //display: flex;

    .nav_item {
      margin: 0 27px;
      line-height: 88px;
      float: left;
      .nav_item_a {
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: #333;
      }
      .active {
        color: #55c6c2;
      }
    }
  }

  .nav_input {
    width: 256px;
    height: 34px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 17px;
    margin-left: 50px;
    margin-top: 27px;
    overflow: hidden;
    position: relative;

    .nav_input_input {
      width: 100%;
      height: 100%;
      border-radius: 17px;
      border: 0;
      padding-left: 21px;
    }
    .nav_input_search {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 4px;
      right: 15px;
    }
  }

  .log_reg {
    margin-left: 21px;
    line-height: 88px;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }
}
</style>
