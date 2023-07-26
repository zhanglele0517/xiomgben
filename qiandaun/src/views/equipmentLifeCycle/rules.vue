<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-row type="flex" justify="space-between">
        <div>
          <el-form-item label="设备名称">
            <el-input v-model="form.deviceName" placeholder="搜索" size="mini">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item style="margin-right: 0">
            <el-button type="primary" size="mini" @click="openDialog('新增')">新增</el-button>
          </el-form-item>
        </div>
      </el-row>
    </el-form>

    <div>
      <dv-border-box-10>
        <div style="padding: 20px">
          <el-table
            v-loading="tableLoading"
            element-loading-background="rgba(0, 0, 0, 0.7)"
            :header-row-style="{background: 'transparent',color: '#FFFFFF'}"
            :header-cell-style="{background: 'transparent'}"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            />
            <el-table-column
              prop="deviceName"
              align="center"
              label="设备名称"
              width="200px"
            />
            <el-table-column
              prop="content"
              align="center"
              label="规程信息"
            />
            <el-table-column
              prop="d3Point"
              align="center"
              label="三维模型锚点"
            />
            <el-table-column
              align="center"
              label="操作"
              width="100px"
            >
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('编辑',scope.row)"
                >修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" class="pagination">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-row>
        </div>
      </dv-border-box-10>
    </div>
    <el-dialog
      append-to-body
      :visible.sync="DialogVisible"
      width="45%"
      center
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ dialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="110px">
        <el-form-item label="设备名称" prop="deviceName" :rules="{required: true, message: '请输入设备名称'}">
          <el-input v-model="responseForm.deviceName" placeholder="请输入设备名称" size="small" />
        </el-form-item>
        <el-form-item label="规程信息" prop="content" :rules="{required: true, message: '请输入规程信息'}">
          <el-input v-model="responseForm.content" :rows="8" type="textarea" placeholder="请输入规程信息" size="small" />
        </el-form-item>
        <el-form-item style="margin: 0" label="三维模型锚点" prop="d3Point" :rules="{required: true, message: '请输入三维模型锚点'}">
          <el-input v-model="responseForm.d3Point" :rows="8" type="textarea" placeholder="请输入三维模型锚点" size="small" />
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="DialogVisible = false">取 消</el-button>
        <el-button :loading="DialogLoading" style="margin-left: 40px" type="primary" size="medium" @click="submitTap">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveDeviceContent, getList } from '@/api/equipmentLifeCycle/rules'
export default {
  data() {
    return {
      form: {
        deviceName: ''
      },
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      dialogTitle: '新增',
      DialogLoading: false,
      DialogVisible: false,
      responseForm: {
        content: '',
        d3Point: '',
        deviceName: '',
        id: ''
      }
    }
  },
  mounted() {
    this.getListFun()
  },
  methods: {
    getListFun() {
      this.tableLoading = true
      getList({
        pageNum: this.currentPage,
        limit: this.pageSize,
        ...this.form
      }).then(res => {
        this.total = res.data.total
        this.tableData = res.data.records
        this.tableLoading = false
      })
    },
    // 监听每页条数发生变化
    handleSizeChange(e) {
      this.currentPage = 1
      this.pageSize = e
      this.getListFun()
    },
    // 监听页数发生变化
    handleCurrentChange(e) {
      this.currentPage = e
      this.getListFun()
    },
    // 搜索
    onSubmit() {
      this.currentPage = 1
      this.getListFun()
    },
    openDialog(title, row) {
      this.dialogTitle = title
      this.DialogVisible = true
      if (row) {
        this.$nextTick(() => {
          this.responseForm = { ...row }
        })
      }
    },
    submitTap() {
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          this.DialogLoading = true
          saveDeviceContent(this.responseForm).then(res => {
            this.DialogLoading = false
            this.$message.success('修改成功')
            this.getListFun()
            this.DialogVisible = false
          }).catch(() => {
            this.DialogLoading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.labelText {
  margin: 0 10px;
  color: #ffffff;
  // font-size: 12px;
}
::v-deep.el-input.is-disabled .el-input__inner{
  color: #666666 !important;
}
</style>
