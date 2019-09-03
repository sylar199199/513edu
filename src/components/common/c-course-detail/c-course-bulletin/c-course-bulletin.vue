<template>
  <div class="course-bulletin">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        课程公告
      </h2>
    </div>
    <ul class="course-bulletin-list">
      <li class="course-bulletin-item">
        <div class="course-bulletin-left">
          <p class="course-bulletin-title">
            关于《电商实训课》修改概况
          </p>
          <p class="course-bulletin-common">
            老师修改了期末考试相关内容！
          </p>
          <p class="course-bulletin-common">
            课程名称：《电商实训课》
          </p>
          <p class="course-bulletin-common">
            考试时间：2019-09-01 00:00:00~2019-12-31 23:59:59
          </p>
          <p class="course-bulletin-common">
            学习截止时间：2019-12-31 23:59:59
          </p>
        </div>
        <div class="course-bulletin-right">
          <span class="course-bulletin-connon course-bulletin-name"
            >发布人：Amber</span
          >
          <span class="course-bulletin-connon">发布于：2019-09-01</span>
        </div>
      </li>
      <li class="course-bulletin-item">
        <div class="course-bulletin-left">
          <p class="course-bulletin-title">
            关于《电商实训课》修改概况
          </p>
          <p class="course-bulletin-common">
            老师修改了期末考试相关内容！
          </p>
          <p class="course-bulletin-common">
            课程名称：《电商实训课》
          </p>
          <p class="course-bulletin-common">
            考试时间：2019-09-01 00:00:00~2019-12-31 23:59:59
          </p>
          <p class="course-bulletin-common">
            学习截止时间：2019-12-31 23:59:59
          </p>
        </div>
        <div class="course-bulletin-right">
          <span class="course-bulletin-connon course-bulletin-name"
            >发布人：Amber</span
          >
          <span class="course-bulletin-connon">发布于：2019-09-01</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.course-bulletin-list {
  .course-bulletin-item {
    width: 100%;
    margin-top: 25px;
    border-bottom: 1px #ccc solid;
    display: flex;
    justify-content: space-between;
    .course-bulletin-left {
      margin-bottom: 20px;
      .course-bulletin-title {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }
      .course-bulletin-common {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
      }
    }
    .course-bulletin-right {
      .course-bulletin-connon {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .course-bulletin-name {
        margin-right: 42px;
      }
    }
  }
  .course-bulletin-item:last-child {
    border-bottom: 0;
  }
}
</style>
