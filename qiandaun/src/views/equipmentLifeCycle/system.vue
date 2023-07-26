<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-row type="flex" justify="space-between">
        <el-row type="flex">
          <el-form-item label="系统名称">
            <el-input v-model="form.systemName" placeholder="搜索" size="mini">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-form-item>
          <el-form-item label="机组">
            <el-input v-model="form.unitName" placeholder="搜索" size="mini">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
        <el-form-item style="margin-right: 0">
          <el-button type="primary" size="mini" @click="openDialog('新增')">新增</el-button>
          <el-button type="primary" size="mini" @click="opendeleteDialog">删除</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div>
      <dv-border-box-10>
        <div style="padding: 20px">
          <el-table
            ref="tableRef"
            v-loading="tableLoading"
            element-loading-background="rgba(0, 0, 0, 0.7)"
            :header-row-style="{background: 'transparent',color: '#FFFFFF'}"
            :header-cell-style="{background: 'transparent'}"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            />
            <el-table-column
              prop="systemName"
              align="center"
              label="系统名称"
            />
            <el-table-column
              prop="unitName"
              align="center"
              label="机组"
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
                >编辑</el-button>
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
      width="30%"
      center
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ dialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="100px">
        <el-form-item prop="systemName" label="系统名称" :rules="{required: true, message: '请输入系统名称'}">
          <el-input v-model="responseForm.systemName" placeholder="请输入系统名称" size="small" />
        </el-form-item>
        <el-form-item prop="unitName" style="margin: 0" label="机组" :rules="{required: true, message: '请输入机组'}">
          <el-input v-model="responseForm.unitName" placeholder="请输入机组" size="small" />
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
        <el-form-item prop="unitId" style="margin: 0" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="DialogVisible = false">取 消</el-button>
        <el-button :loading="DialogLoading" style="margin-left: 40px" type="primary" size="medium" @click="submitTap">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="deleteDialogVisible"
      width="20%"
      center
      :show-close="false"
      @closed="deleteId = ''"
    >
      <div slot="title" class="dialog-title">
        <span>删除</span>
      </div>
      <p style="color: #FFFFFF;text-align: center;margin: 0 0 30px 0;">确定要删除该内容？</p>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" style="width: 100px" size="medium" :loading="DialogLoading" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getList, saveSystemOpction, deleteSystemOpction } from '@/api/equipmentLifeCycle/system'
export default {
  data() {
    return {
      form: {
        systemName: '',
        unitName: ''
      },
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      DialogVisible: false,
      DialogLoading: false,
      dialogTitle: '新增',
      deleteDialogVisible: false,
      deleteId: '',
      responseForm: {
        id: '',
        systemName: '',
        unitId: '',
        unitName: ''
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
    opendeleteDialog() {
      if (this.$refs.tableRef.selection.length === 0) return this.$message.warning('请至少勾选一条数据')
      this.deleteDialogVisible = true
      this.deleteId = this.$refs.tableRef.selection.map(val => val.id)
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
          saveSystemOpction(this.responseForm).then(() => {
            this.DialogLoading = false
            this.$message.success(`${this.dialogTitle}成功`)
            this.getListFun()
            this.DialogVisible = false
          }).catch(() => {
            this.DialogLoading = false
          })
        } else {
          return false
        }
      })
    },
    deleteAfirm() {
      this.DialogLoading = true
      deleteSystemOpction(this.deleteId).then(res => {
        this.DialogLoading = false
        this.$message.success('删除成功')
        this.getListFun()
        this.deleteDialogVisible = false
      }).catch(() => {
        this.DialogLoading = false
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
