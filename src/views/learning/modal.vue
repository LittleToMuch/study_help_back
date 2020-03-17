<template>
  <el-dialog
    :title="type==='edit'?'修改用户密码':'新建教师'"
    :visible="visible"
    :close-on-click-modal="false"
    width="830px"
    center
    class="chuangjiandialog"
    @close="handleCancel"
    @open="openDialog"
  >
    <el-form
      ref="cloneData"
      class="chaungjianmeitidialog"
      :model="cloneData"
      :rules="rules"
      :inline="true"
      label-width="140px"
    >
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="cloneData.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="cloneData.password" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button
        type="warning"
        :loading="loading"
        class="chuangjianqueding"
        @click="handleSave('cloneData')"
      >确 定</el-button>
      <el-button @click="handleCancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['visible', 'type', 'formData', 'editType'],
  data() {
    return {
      cloneData: {},
      loading: false,
      rules: {
        username: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
      this.$refs['cloneData'].resetFields()
    },
    handleSave(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          const params = { id: this.cloneData.id, password: this.cloneData.password }
          const res = await request.post('/api/users/setPassword', params)
          const { code } = res
          code === 200 ? this.$message({ message: '修改成功', type: 'success' }) : this.$message({ message: '修改失败', type: 'warning' })
          this.$emit('update:visible', false)
          this.loading = false
        } else {
          return false
        }
      })
    },
    openDialog(data) {
      this.cloneData = { ...this.formData, password: '' }
    }
  }
}
</script>

<style>
.el-dialog {
    background-color: #eaedfd;
}
.chaungjianmeitidialog {
    border-radius: 15px;
    background: #eaedfd;
}
.chuangjianqueding {
    background: rgb(60, 196, 196);
    border-radius: 10px;
    border: 0px;
}
</style>
