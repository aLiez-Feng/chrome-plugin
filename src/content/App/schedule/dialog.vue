<template>
  <el-dialog title="进度管理/快捷创建" center :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="选择模块" :label-width="formLabelWidth">
        <el-select
          v-model="form.moduleValue"
          @change="visibleModuleForm"
          class="--chrome-select"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <component ref="component" :is="moduleComponent" />
    <div slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="createTask">创建吧~</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ScheduleForm from "./schedule-form.vue";
import { MODULEFORMMAPSATSCHEDULE } from "../const";
import { sendMessage } from "../utils";
export default {
  name: "DiaLogAtSchedule",
  components: {
    ScheduleForm,
  },
  data() {
    return {
      visible: false,
      formLabelWidth: "120px",
      options: [
        {
          value: "schedule",
          label: "进度计划",
        },
      ],
      form: {
        moduleValue: "", // 选择模块
      },
      moduleComponent: "",
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    visibleModuleForm(value) {
      this.moduleComponent = MODULEFORMMAPSATSCHEDULE[value];
      console.log(value, "value");
    },
    createTask() {
      const currentComponent = this.$refs["component"];
      const form = currentComponent.$refs["form"];
      form.validate((valid) => {
        if (valid) {
          sendMessage({
            url: "/creat_schdeule",
            method: "post",
            data: currentComponent.ruleForm,
          })
            .then(() => {
              this.$message.success("操作成功");
              this.visible = false;
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

<style>
</style>