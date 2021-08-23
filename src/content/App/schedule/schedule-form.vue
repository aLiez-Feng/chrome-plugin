<template>
  <el-form ref="form" :model="ruleForm" :rules="rules">
    <el-form-item
      label="进度计划名称"
      prop="planname"
      :label-width="formLabelWidth"
    >
      <el-input v-model="ruleForm.planname" />
    </el-form-item>
    <el-form-item
      label="节点名称"
      prop="nodename"
      :label-width="formLabelWidth"
    >
      <el-input v-model="ruleForm.nodename" />
    </el-form-item>
    <el-form-item
      label="计划结束时间"
      prop="end_time"
      :label-width="formLabelWidth"
    >
      <el-date-picker
        v-model="ruleForm.end_time"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      label="计划类型"
      prop="plan_type"
      :label-width="formLabelWidth"
    >
      <el-select v-model="ruleForm.plan_type">
        <el-option
          v-for="plantype in planTypes"
          :key="plantype.value"
          :label="plantype.label"
          :value="plantype.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主责人" prop="user" :label-width="formLabelWidth">
      <el-select v-model="ruleForm.user" filterable>
        <el-option
          v-for="(id, key) in users"
          :key="key"
          :label="key"
          :value="id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { sendMessage } from "../utils";
export default {
  name: "ScheduleForm",
  data() {
    return {
      formLabelWidth: "120px",
      planTypes: [
        { value: 0, label: "项目计划" },
        { value: 1, label: "楼栋计划" },
        { value: 2, label: "楼栋工序计划" },
      ],
      users: {},
      ruleForm: {
        planname: "",
        nodename: "",
        end_time: null,
        plan_type: 0,
        user: "",
      },
      rules: {
        planname: [
          { required: true, message: "请选择进度计划名称", trigger: "change" },
        ],
        nodename: [
          { required: true, message: "请选择节点名称", trigger: "change" },
        ],
        end_time: [
          {
            required: true,
            message: "请选择计划结束时间",
            trigger: "change",
          },
        ],
        plan_type: [
          { required: true, message: "请选择计划类型", trigger: "change" },
        ],
        user: [{ required: true, message: "请选择主责人", trigger: "change" }],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      sendMessage({
        url: "/get_userid",
        method: "get",
      })
        .then((users) => {
          this.users = users;
          this.$message.success("获取用户成功");
        })
        .catch((error) => {
          this.$message.error(`操作失败:原因 --> ${error}`);
        });
    },
  },
};
</script>

<style>
</style>