<template>
  <el-form ref="form" :model="ruleForm" :rules="rules">
    <el-form-item
      label="ERP版本"
      prop="erp_version"
      :label-width="formLabelWidth"
    >
      <el-select v-model="ruleForm.erp_version">
        <el-option
          v-for="version in versions"
          :key="version.value"
          :label="version.label"
          :value="version.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目名称" prop="project" :label-width="formLabelWidth">
      <el-input v-model="ruleForm.project" />
    </el-form-item>
    <el-form-item
      label="合同名称"
      prop="contract"
      :label-width="formLabelWidth"
    >
      <el-input v-model="ruleForm.contract" />
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  name: "CollaborationForm",
  data() {
    return {
      formLabelWidth: "120px",
      versions: [
        { value: "352版本", label: "352版本" },
        { value: "新成本", label: "新成本" },
      ],
      ruleForm: {
        erp_version: "352版本",
        project: "",
        contract: "",
      },
      rules: {
        project: [
          { required: true, message: "请输入项目名称", trigger: "change" },
        ],
        contract: [
          { required: true, message: "请输入节点名称", trigger: "change" },
        ],
        erp_version: [
          { required: true, message: "请选择版本", trigger: "change" },
        ],
      },
    };
  },
};
</script>

<style>
</style>