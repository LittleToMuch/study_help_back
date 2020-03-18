<template>
  <el-upload
    ref="upload"
    v-model="avatar"
    class="upload-demo"
    action="/api/admin/uploadAvatar"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :limit="1"
    list-type="picture"
    :on-success="handleSuccess"
    :accept="'.jpg' || 'png' || '.jepg'"
    name="avatar"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <span slot="tip" class="el-upload__tip">
      只能上传jpg/png/jepg文件，且不超过500kb
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
    handleSuccess(response, file, fileList) {
      this.avatar = response.data
      this.$emit('path', response.data)
    }
  }
};
</script>
<style lang="scss" scoped></style>
