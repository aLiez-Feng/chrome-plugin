<template>
  <div
    class="--chrome-plugins-container"
    :style="{ width: computedStyle.width, height: computedStyle.height }"
  >
    <el-button @click="openGroups" v-show="!isShowGroups"
      >无情的测试机器</el-button
    >
    <el-card class="--chrome-card" v-show="isShowGroups">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="refreshPage">刷新页面</el-button>
        <el-button type="danger" @click="isShowGroups = false">关闭</el-button>
      </div>
      <ul class="--chrome-list-container">
        <li
          class="--chrome-list-item"
          v-for="(group, index) in groups"
          @click="openDialog(index)"
          :key="group.name"
        >
          <img :src="group.img" alt="group" />
          <span>{{ group.name }}</span>
        </li>
      </ul>
    </el-card>
    <component ref="departmentComponent" :is="departmentComponent" />
  </div>
</template>

<script>
import DiaLogAtSchedule from "./schedule/dialog.vue";
import DiaLogAtCollaboration from "./collaboration/dialog.vue";
import "./logo.jpg";

export default {
  components: {
    DiaLogAtSchedule,
    DiaLogAtCollaboration,
  },
  data() {
    return {
      isShowGroups: false,
      departmentComponent: "",
      formLabelWidth: "120px",
      groups: [
        {
          name: "进度管理组",
          img: window.chrome.extension.getURL("img/logo.jpg"),
          component: "DiaLogAtSchedule",
        },
        {
          name: "成本协同组",
          img: window.chrome.extension.getURL("img/logo.jpg"),
          component: "DiaLogAtCollaboration",
        },
        {
          name: "智慧客服组",
          img: window.chrome.extension.getURL("img/logo.jpg"),
        },
      ],
    };
  },
  computed: {
    computedStyle() {
      const { isShowGroups } = this;
      return {
        width: isShowGroups ? "480px" : "140px",
        height: isShowGroups ? "188px" : "40px",
      };
    },
  },
  methods: {
    openGroups() {
      this.isShowGroups = true;
    },
    openDialog(index) {
      if (this.timer) clearTimeout(this.timer);
      const component = this.groups[index].component;
      if (component) {
        this.departmentComponent = component;
        // dialog关闭有延迟
        this.timer = setTimeout(() => {
          this.$nextTick(() => {
            this.$refs["departmentComponent"].open();
          });
        }, 200);
      }
    },
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" >
.--chrome-plugins-container {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 100000;
  .--chrome-card {
    width: 480px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .--chrome-list-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .--chrome-list-item {
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover > span {
        color: rgba(153, 153, 153, 0.61);
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-top: 8px;
      }
    }
  }
}
.el-popover {
  z-index: 1000001 !important;
}
.sidebar-container {
  position: fixed !important;
}
.el-select-dropdown.el-popper,
.el-date-picker {
  z-index: 1000000 !important;
}
.el-input {
  width: 220px !important;
}
</style>