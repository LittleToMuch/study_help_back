<template>
  <el-upload
    ref="upload"
    v-model="avatar"
    class="upload-demo"
    action="/api/admin/uploadAvatar"
    :limit="1"
    list-type="picture"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :accept="'.jpg,.png,.jepg'"
    name="avatar"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <span slot="tip" class="el-upload__tip">
      只能上传JPG、PNG、JEPG文件
    </span>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      avatar: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('path', '')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`海报只能选一张哦`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response, file, fileList) {
      this.avatar = response.data
      this.$emit('path', response.data)
    }
  }
};
</script>
<style lang="scss" scoped></style>
