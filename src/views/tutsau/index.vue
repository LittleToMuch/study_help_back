<template>
  <div class="app-container">
    <el-table
      v-if="userList.length"
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
        label="标题"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="插图"
        width="180"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-popover trigger="hover" placement="top" width="150px">
              <div class="block">
                <el-image :src="`http://localhost:8080/${scope.row.pic}`">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-image :src="`http://localhost:8080/${scope.row.pic}`" style="height: 80px; width: 120px">
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
        label="类别"
        width="150">
        <template slot-scope="scope">
          <el-tag :type="$store.state.category[scope.row.category] || ''">{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" width="150px">
            <div class="block">
              <span>{{ scope.row.content }}</span>
            </div>
            <div slot="reference" class="name-wrapper content">{{ scope.row.content }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate | parsetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="userList.length"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
    />
    <Modal v-if="userList.length" :visible.sync="visible" :type="type" :formData="formData" />
  </div>
</template>

<script>
import request from '@/utils/request'
import { parseTime } from '@/utils/index'
export default {
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
    console.log(this.$store.state.category)
  },
  methods: {
    async getList() {
      const res = await request({
        url: '/api/tutsau/list',
        methods: 'get',
        params: { pageSize: this.pageSize, currentPage: this.currentPage }
      })
      this.userList = res.data
      this.total = res.total
    },
    handleEdit(index, row) {
      this.formData = row
      this.visible = true
    },
    currentChange(page) {
      this.currentPage = page
      this.getList()
    },
    handleDelete(index, row) {
      this.$confirm('确认删除嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const params = { id: row.id }
        const res = await request.delete('/api/learning/del', { params: params })
        const { code, msg } = res
        this.$message({ message: msg, type: code === 200 ? 'success' : 'warning' })
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .block {
    width: 100px;
  }
  .content {
    height: 40px;
    overflow: hidden;
  }
</style>
