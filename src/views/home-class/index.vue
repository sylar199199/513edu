<template>
  <div class="home-class-minHeight">
    <div class="container">
      <ul>
        <li
          v-for="(item, index) in newFindOneList"
          :key="item.sign"
          @click="addClass(index, item.sign)"
          :class="{ active: index == current }"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul>
        <li
          v-for="(item, index) in allPrice"
          :key="item.id"
          @click="addTwoClass(index)"
          :class="{ active: index == currentTwo }"
        >
          {{ item.title }}
        </li>
      </ul>
      <ul>
        <li
          v-for="(item, index) in allHot"
          :key="item.id"
          @click="addThereClass(index)"
          :class="{ active: index == currentThere }"
        >
          {{ item.title }}
        </li>
      </ul>
      <div>
        <class-handpick ref="handpick" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import classHandpick from './children/handpick'

export default {
  data() {
    return {
      current: 0,
      currentTwo: 0,
      currentThere: 0,
      activeName: 'first',
      allPrice: [
        { id: 111, title: '全部' },
        { id: 112, title: '免费' },
        { id: 113, title: '付费' },
      ],
      allHot: [
        { id: 222, title: '综合排序' },
        { id: 223, title: '精选' },
        { id: 224, title: '最新' },
        { id: 225, title: '最热' },
      ],
      courseType: 0,
      sortType: 0,
      gradeThree: 0,
    }
  },
  components: {
    'class-handpick': classHandpick,
  },
  computed: {
    ...mapState('class', {
      findOneList: state => state.findOneList,
    }),
    newFindOneList() {
      let obj = { sign: 0, name: '全部' }
      let copyFindOneList = JSON.parse(JSON.stringify(this.findOneList))
      copyFindOneList.unshift(obj)
      return copyFindOneList
    },
  },
  methods: {
    ...mapActions('class', ['getFindOne', 'getAllCourseRecommendedList']),
    addClass(index, sign) {
      this.current = index
      this.gradeThree = sign
      let recommendedReq = {
        pageNum: 1,
        size: 8,
        courseType: this.courseType,
        sort: this.sortType,
        gradeThree: this.gradeThree,
      }
      this.getAllCourseRecommendedList(recommendedReq)
    },
    addTwoClass(index) {
      this.currentTwo = index
      this.courseType = index
      let recommendedReq = {
        pageNum: 1,
        size: 8,
        courseType: this.courseType,
        sort: this.sortType,
        gradeThree: this.gradeThree,
      }
      this.getAllCourseRecommendedList(recommendedReq)
    },
    addThereClass(index) {
      this.currentThere = index
      this.sortType = index
      let recommendedReq = {
        pageNum: 1,
        size: 8,
        courseType: this.courseType,
        sort: this.sortType,
        gradeThree: this.gradeThree,
      }
      this.getAllCourseRecommendedList(recommendedReq)
    },
    handleClick(tab, event) {
      if (tab.label === '精选') {
        //console.log('精选')
      }
      if (tab.label === '最新') {
        //console.log('最新')
      }
      if (tab.label === '最热') {
        //console.log('最热')
      }
    },
  },
  created() {
    this.getFindOne()
    let recommendedReq = {
      courseType: this.courseType,
      sort: this.sortType,
      pageNum: 1,
      size: 8,
    }
    this.getAllCourseRecommendedList(recommendedReq)
  },
}
</script>

<style lang="less" scoped>
.home-class-minHeight {
  min-height: calc(100% - 348px);

  ul {
    width: 100%;
    height: 65px;
    line-height: 64px;
    background: rgba(245, 245, 245, 1);
    display: flex;
    li {
      margin: 0 20px;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      cursor: pointer;
      a {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .active {
        color: #58c6bd;
      }
    }
    .active {
      color: #58c6bd;
    }
  }
  ul:nth-child(3) {
    background: #fff;
    border-bottom: 1px #e6e6e6 solid;
    li {
      padding: 0 10px;
    }
    .active {
      color: #58c6bd;
      border-bottom: 2px #58c6bd solid;
    }
  }
}
</style>
