<template>
  <el-dialog
    :title="type==='edit'?'修改视频信息':'添加视频'"
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
      <el-form-item label="视频名:" prop="video_name">
        <el-input v-model="cloneData.video_name" />
      </el-form-item>
      <el-form-item label="视频类别:" prop="category">
        <el-select v-model="cloneData.category" clearable placeholder="请选择">
          <el-option
            v-for="item in categorys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="视频海报:" prop="video_pic">
        <Upload ref="upload" @path="handlePath" />
      </el-form-item>
      <el-form-item label="视频地址:" prop="video_path">
        <VideoUpload ref="address" @path="handleVideoAddress" />
      </el-form-item>
      <el-form-item label="视频价格:" prop="video_price">
        <el-input v-model="cloneData.video_price" />
      </el-form-item>
      <el-form-item label="视频简介:" prop="video_intro" class="textarea">
        <el-input v-model="cloneData.video_intro" type="textarea" :rows="3" placeholder="请输入内容" maxlength="50" show-word-limit />
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
import Upload from '@/components/Upload/index'
import VideoUpload from '@/components/Upload/video'
import { mapGetters } from 'vuex';
export default {
  components: { Upload, VideoUpload },
  props: ['visible', 'type', 'formData', 'editType'],
  data() {
    return {
      cloneData: {},
      loading: false,
      categorys: [
        { value: '计算机网络', label: '计算机网络' },
        { value: '软件工程', label: '软件工程' },
        { value: '数据结构', label: '数据结构' },
        { value: '操作系统', label: '操作系统' }
      ],
      rules: {
        video_name: [{ required: true, message: '请输入视频名称' }],
        category: [{ required: true, message: '请选择分类' }],
        video_pic: [{ required: true, message: '请选择海报' }],
        video_path: [{ required: true, message: '请选择视频' }],
        video_price: [{ required: true, message: '请输入价格' }],
        video_intro: [{ required: true, message: '请输入视频简介' }]
      }
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
      this.$refs['cloneData'].resetFields()
      this.$refs.upload.$refs.upload.clearFiles()
      this.$refs.address.$refs.address.clearFiles()
    },
    handlePath(path) {
      this.cloneData.video_pic = path
    },
    handleVideoAddress(path) {
      this.cloneData.video_path = path
    },
    handleSave(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          const params = this.type === 'edit' ? { ...this.cloneData } : { ...this.cloneData, adminId: this.id }
          console.log(params)
          const res = this.type === 'edit' ? await request.post('/api/video/update', params) : await request.post('/api/video/insert', params)
          const { code, msg } = res
          code === 200 ? this.$message({ message: msg, type: 'success' }) : this.$message({ message: msg, type: 'warning' })
          this.$emit('update:visible', false)
          this.loading = false
          this.$emit('refresh')
          this.$refs.upload.$refs.upload.clearFiles()
        } else {
          return false
        }
      })
    },
    openDialog(data) {
      this.cloneData = { ...this.formData, video_price: 0 }
    }
  }
}
</script>

<style lang="scss">
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
.textarea {
  width: 100%;
  .el-textarea {
    width: 545px;
  }
}
</style>
