<template>
  <div v-if="userList.length" class="app-container">
    <el-button type="primary" class="addBtn" @click="insertClick">添加视频</el-button>
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        label="Id"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="视频名"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.video_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="视频类别"
        width="140">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="视频海报"
        width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-popover trigger="hover" placement="top" width="150px">
              <div class="block">
                <el-image :src="`http://localhost:8080/${scope.row.video_pic}`">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-image :src="`http://localhost:8080/${scope.row.video_pic}`" style="height: 80px; width: 120px">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="视频简介"
        width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.video_intro }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="视频价格"
        width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ '￥' + scope.row.video_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate | parsetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
    />
    <Modal :visible.sync="visible" :type="type" :form-data="formData" @refresh="handleRefresh" />
  </div>
</template>

<script>
import request from '@/utils/request'
import { parseTime } from '@/utils/index'
import Modal from './modal'
export default {
  components: { Modal },
  filters: {
    parsetime(value) {
      return parseTime(value)
    }
  },
  data() {
    return {
      userList: [],
      type: 'edit',
      visible: false,
      formData: {},
      pageSize: 6,
      currentPage: 1,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await request({
        url: '/api/video/list',
        methods: 'get',
        params: { pageSize: this.pageSize, currentPage: this.currentPage }
      })
      this.userList = res.data
      this.total = res.total
      console.log(this.userList)
    },
    currentChange(page) {
      this.currentPage = page
      this.getList()
    },
    insertClick() {
      this.formData = {}
      this.type = 'create'
      this.visible = true
    },
    handleEdit(index, row) {
      this.formData = row
      this.type = 'edit'
      this.visible = true
    },
    handleDelete(index, row) {
      this.$confirm('确认删除嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const params = { id: row.id }
        const res = await request.post('/api/video/del', params)
        const { code, msg } = res
        this.$message({ message: msg, type: code === 200 ? 'success' : 'warning' })
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        })
      })
    },
    handleRefresh() {
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .block {
    width: 100px;
  }
</style>
