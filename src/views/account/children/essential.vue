<template>
  <div class="essential">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        个人信息
      </h2>
    </div>
    <div class="essential-head">
      <div v-if="headIsShow">
        <span class="essential-head-txt">头像：</span>
        <div class="headImg">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :with-credentials="true"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <strong>
          上传头像大小不超过300KB
        </strong>
        <button
          class="essential-name-save essential-name-change gai-bian-wei-zhi"
          @click="setHead(photoPath)"
        >
          保存头像
        </button>
      </div>
      <div v-else class="essential-head-default">
        <span>头像：</span>
        <img :src="userInfo.photo" alt="" />
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          class="essential-head-redact"
          @click="getHeadTrueCompile"
        ></el-button>
      </div>
    </div>
    <div class="essential-name">
      <div v-if="nameIsShow">
        姓名：<input
          type="text"
          placeholder="请输入用户名"
          class="essential-name-text"
          v-model="author"
        />
        <button class="essential-name-save" @click="setName(author)">
          保存
        </button>
        <button class="essential-name-cancel" @click="getNameFalseCompile">
          取消
        </button>
      </div>
      <div v-else class="essential-name-flex">
        <span class="essential-name-sex"> 姓名：{{ userInfo.name }} </span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          class="essential-name-compile"
          v-if="userInfo.roleStr === 'normal'"
          @click="getNameTrueCompile"
        ></el-button>
      </div>
    </div>
    <div class="essential-radio">
      <div v-if="sexIsShow">
        性别：<el-radio v-model="radio" label="0">
          不公开
        </el-radio>
        <el-radio v-model="radio" label="1">
          男
        </el-radio>
        <el-radio v-model="radio" label="2">
          女
        </el-radio>
        <button
          class="essential-name-save essential-name-change"
          @click="setSex(radio)"
        >
          修改
        </button>
      </div>
      <div v-else class="essential-radio-flex">
        <span class="essential-radio-sex">性别：{{ newSex }}</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="getSexrueCompile"
        ></el-button>
      </div>
    </div>

    <div class="essential-name">
      绑定：{{ newPhone }}
      <router-link
        to="/home/changeMoblie"
        class="essential-name-change essential-name-save"
      >
        更换手机
      </router-link>
    </div>

    <div class="course-bulletin-notice essential-name-attestation">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        认证信息
      </h2>
    </div>

    <div class="essential-authentication">
      <div class="essential-authentication-left" v-if="attestationShow">
        <el-button
          type="primary"
          v-login-in="'authentication_student'"
          class="essential-authentication-left-btn"
        >
          点击认证
        </el-button>
      </div>
      <ul class="essential-authentication-hidden" v-else>
        <li class="essential-authentication-success">
          身份：{{ accountStudent.roleName }}
        </li>
        <li class="essential-authentication-success">
          姓名：{{ accountStudent.name }}
        </li>
        <li class="essential-authentication-success">
          学号：{{ accountStudent.cardNumber }}
        </li>
        <li class="essential-authentication-success">
          学校：{{ accountStudent.schoolName }}
        </li>
      </ul>
      <div class="essential-authentication-right">
        <p class="essential-authentication-p">
          认证说明：
        </p>
        <ul class="essential-authentication-list">
          <li class="essential-authentication-item">
            学籍证明中的身份证号码必须与实名认证中身份证信息保持一致。如有误，将无法通过审核。
          </li>
          <li class="essential-authentication-item">
            学籍认证审核完成后，将无法修改和删除，请谨慎填写。同时系统将自动发放10个积分作为奖励；查看积分；
          </li>
          <li class="essential-authentication-item">
            如存在恶意乱填写姓名，上传假信息，改动学籍证明内容或上传无关图片者，一经发现将冻结伍壹叁账号。
          </li>
          <li class="essential-authentication-item">
            我们会确保你所提供的信息均处于严格的保密状态，不会泄露。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      radio: '0',
      radioDefault: '0',
      author: '',
      imageUrl: '',
      photoPath: '',
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
    }
  },
  computed: {
    ...mapState('login', {
      userInfo: state => state.userInfo,
      isShowSave: state => state.isShowSave,
      nameIsShow: state => state.nameIsShow,
      headIsShow: state => state.headIsShow,
      sexIsShow: state => state.sexIsShow,
      attestationShow: state => state.attestationShow,
      accountStudent: state => state.accountStudent,
    }),
    newPhone() {
      return (
        this.userInfo.mobile.substr(0, 3) +
        '****' +
        this.userInfo.mobile.substr(7)
      )
    },
    newSex() {
      if (this.userInfo.sex == 0) {
        return '不公开'
      } else if (this.userInfo.sex == 1) {
        return '男'
      } else {
        return '女'
      }
    },
  },
  methods: {
    ...mapMutations('login', [
      'setUserName',
      'getNameTrueCompile',
      'getNameFalseCompile',
      'getHeadTrueCompile',
      'getHeadFalseCompile',
      'getSexrueCompile',
      'setattestationhide',
    ]),
    ...mapActions('login', [
      'getUpdateUserName',
      'getUploadUserPhoto',
      'getUpdateSex',
      'getFindUserRoleInfo',
      'getLoginInfo',
    ]),
    async setHead(photoPath) {
      await this.getUploadUserPhoto(photoPath)
      await this.getLoginInfo()
    },
    async setName(author) {
      await this.getUpdateUserName(author)
      await this.getLoginInfo()
    },
    async setSex(radio) {
      await this.getUpdateSex(radio)
      await this.getLoginInfo()
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.photoPath = res.data[0].url
        // this.$message.success(res.msg)
        this.imageUrl = URL.createObjectURL(file.raw)
        // this.imageUrl = res.data.imgSrc
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isICON = file.type === 'image/icon'
      //const isLt2M = file.size / 1024 / 1024 < 2
      const isLt2M = file.size / 1024 < 300

      if (!isJPEG && !isJPG && !isGIF && !isPNG && !isBMP && !isICON) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP/ICON 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 300kb!')
      }
      return (isJPEG || isJPG || isBMP || isGIF || isPNG || isICON) && isLt2M
    },
  },
  created() {
    if (this.userInfo.bindFlag === '已绑定') {
      this.getFindUserRoleInfo()
    } else {
      this.setattestationhide()
    }
  },
  destroyed() {
    this.getNameFalseCompile()
    this.getHeadFalseCompile()
  },
}
</script>

<style lang="less" scoped>
.essential {
  padding: 0 36px;
  min-height: calc(100vh - 348px);
  .essential-head {
    margin-top: 18px;
    .essential-head-txt {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .headImg {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px #eee solid;
      display: inline-block;
      margin-right: 30px;
      overflow: hidden;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    strong {
      position: relative;
      top: -65px;
    }
    .gai-bian-wei-zhi {
      position: relative;
      left: -177px;
    }
    .essential-name-save {
      width: 88px;
      height: 34px;
      background: rgba(85, 198, 194, 1);
      border-radius: 2px;
      border: 0;
      line-height: 34px;
      margin: 0 20px 0 30px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      .essential-name-change {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .essential-head-btn {
      position: relative;
      top: -44px;
    }
    .essential-head-default {
      span {
        width: 40px;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .essential-head-redact {
        margin-left: 84px;
      }
    }
  }
  .essential-name {
    margin-top: 26px;
    margin-bottom: 30px;
    .essential-name-compile {
      margin-left: 30px;
    }
    .essential-name-text {
      width: 220px;
      height: 34px;
      border: 1px solid rgba(204, 204, 204, 1);
      padding: 0 6px;
    }
    .essential-name-save {
      text-align: center;
      display: inline-block;
      width: 88px;
      height: 34px;
      background: rgba(85, 198, 194, 1);
      border-radius: 2px;
      border: 0;
      line-height: 34px;
      margin-left: 60px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      .essential-name-change {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .essential-name-cancel {
      width: 88px;
      height: 34px;
      background: #fff;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 2px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 34px;
      margin-left: 10px;
    }
    .essential-name-flex {
      .essential-name-sex {
        margin-top: 15px;
        width: 190px;
        display: inline-block;
      }
    }
  }
  .essential-radio {
    margin-bottom: 26px;
    .essential-name-save {
      width: 88px;
      height: 34px;
      background: rgba(85, 198, 194, 1);
      border-radius: 2px;
      border: 0;
      line-height: 34px;
      margin: 0 20px 0 30px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      .essential-name-change {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .essential-radio-flex {
      .essential-radio-sex {
        margin-top: 15px;
        width: 190px;
        display: inline-block;
        margin-right: 30px;
      }
    }
  }
  .essential-name-attestation {
    margin-top: 70px;
  }
  .essential-authentication {
    display: flex;
    margin-bottom: 95px;
    .essential-authentication-left {
      width: 374px;
      height: 292px;
      background: rgba(240, 240, 240, 1);
      border-radius: 4px;
      margin-top: 40px;
      .essential-authentication-left-btn {
        margin: 119px 0 0 143px;
      }
    }
    .essential-authentication-hidden {
      width: 374px;
      height: 292px;
      border-radius: 4px;
      margin-top: 40px;
      .essential-authentication-success {
        margin-bottom: 36px;
      }
    }
    .essential-authentication-right {
      margin-left: 86px;
      margin-top: 39px;
      .essential-authentication-p {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 14px;
      }
      .essential-authentication-list {
        width: 417px;
        .essential-authentication-item {
          list-style: disc;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 28px;
        }
      }
    }
  }
}
</style>
