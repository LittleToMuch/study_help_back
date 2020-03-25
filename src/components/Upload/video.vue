<template>
  <el-upload
    ref="address"
    v-model="address"
    class="upload-demo"
    action="/api/admin/uploadAvatar"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    multiple
    :limit="1"
    :accept="'.avi,.wmv,.mpeg,.mp4'"
    name="avatar"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <span slot="tip" class="el-upload__tip">
      只能上传AVI、WMV、MPEG、MP4文件
    </span>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      address: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('path', '')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response, file, fileList) {
      this.address = response.data
      this.$emit('path', response.data)
    }
  }
}
</script>

<style>

</style>