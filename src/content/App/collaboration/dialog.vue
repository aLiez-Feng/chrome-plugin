<template>
  <el-dialog center :visible.sync="visible">
    <template #title>
      <span class="el-dialog__title">成本协同/快捷创建</span>
      <el-popover
        placement="top-start"
        title="操作小Tips!"
        width="200"
        trigger="hover"
      >
        <i class="el-icon-question question" slot="reference"></i>
        <div>
          <span class="title">新项目：</span><br />
          <span class="text"
            >1、在ERP新建一级项目和分期项目，新成本项目记得维护核算对象</span
          >
          <br />
          <span class="text"
            >2、对一级项目引入科目（新成本“在项目准备-科目设置”，老成本在“基础数据设置-公司科目设置里”）</span
          >
          <br />
          <span class="title oldproj">老项目：</span><br />
          <span class="text">已有科目，可直接使用</span>
        </div>
      </el-popover>
    </template>
    <template>
      <component ref="component" :is="moduleComponent" />
      <success-content :data="successData" />
    </template>
    <div slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="createTask">创建吧~</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendMessage } from "../utils";
// import { sendMessage } from "../utils";
import SuccessContent from "../components/success-content.vue";
import CollaborationForm from "./collaboration-form.vue";
export default {
  name: "DiaLogAtCollaboration",
  components: {
    SuccessContent,
    CollaborationForm,
  },
  data() {
    return {
      visible: false,
      moduleComponent: "CollaborationForm",
      successData: [],
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    createTask() {
      const currentComponent = this.$refs["component"];
      const form = currentComponent.$refs["form"];
      form.validate((valid) => {
        if (valid) {
          console.log(currentComponent.ruleForm);
          sendMessage({
            name: "成本协同",
            url: "/addcontract",
            method: "post",
            data: currentComponent.ruleForm,
          })
            .then((res) => {
              if (res && res.msg && res.msg.indexOf("success") === -1) {
                return this.$message.error(res.msg);
              }
              this.$message.success(res.msg);
              this.successData = res.data;
              // this.visible = false;
              form.resetFields();
            })
            .catch((error) => {
              this.$message.error(`操作失败:原因 --> ${error}`);
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.el-alert {
  width: 63%;
  margin-left: 40px;
  margin-bottom: 10px;
}
.question {
  font-size: 18px;
  margin-left: 3px;
  color: red;
}
.title {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}
.oldproj {
  margin-top: 10px;
}
.text {
  font-size: 14px;
  display: inline-block;
  margin-left: 1em;
  margin-bottom: 2px;
}
</style>