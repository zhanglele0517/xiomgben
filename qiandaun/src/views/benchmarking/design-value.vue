<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="设计所属名称">
          <el-input v-model="form.nameWork" prefix-icon="el-icon-search" placeholder="设计所属名称" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" :loading="tableLoading" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="margin: 6px 0 28px 0">
        <el-button size="mini" type="primary" style="margin-right: 20px">导出</el-button>
        <el-button size="mini" type="primary" @click="openDialog('新增')">新增</el-button>
      </div>
    </el-row>

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
              prop="nameWork"
              align="center"
              label="设计值名称"
            />
            <el-table-column
              prop="description"
              align="center"
              label="设计值描述"
            />
            <el-table-column
              prop="createTime"
              align="center"
              label="创建时间"
            />
            <el-table-column
              align="center"
              label="操作"
              width="140px"
            >
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('编辑',scope.row)"
                >编辑</el-button>
                <el-button
                  size="medium"
                  type="text"
                  style="color: red;margin-left: 20px"
                  @click="openDeleteDialog(scope.row)"
                >删除</el-button>
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
      width="40%"
      center
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="100px" label-position="left">
        <el-form-item label="设计值名称" prop="nameWork" :rules="{required: true, message: '请输入设计值名称'}">
          <el-input v-model="responseForm.nameWork" placeholder="请输入设计值名称" size="small" />
        </el-form-item>
        <el-form-item label="设计值描述" prop="description" :rules="{required: true, message: '请输入设计值描述'}">
          <el-input v-model="responseForm.description" placeholder="请输入设计值描述" size="small" />
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
        <el-form-item prop="createTime" style="margin: 0" />
        <el-form-item prop="createUser" style="margin: 0" />
        <el-form-item prop="updateTime" style="margin: 0" />
        <el-form-item prop="updateUser" style="margin: 0" />
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" style="width: 100px" :loading="dialogLoading" size="medium" @click="submitForm">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="deleteDialogVisible"
      width="20%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>删除</span>
      </div>
      <p style="color: #FFFFFF;text-align: center;margin: 0 0 30px 0;">确定要删除该内容？</p>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" style="width: 100px" :loading="dialogLoading" size="medium" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getList, saveWorkConditionDesign, deleteWorkConditionDesign } from '@/api/benchmarking/design-value'
// import { getTime } from '@/utils/index'
export default {
  data() {
    return {
      form: {
        nameWork: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DialogVisible: false,
      DialogTitle: '新增', //
      responseForm: {
        nameWork: '',
        description: '',
        createTime: '',
        createUser: '',
        id: '',
        updateTime: '',
        updateUser: ''
      },
      deleteDialogVisible: false,
      deleteId: '',
      tableLoading: false,
      dialogLoading: false
    }
  },
  mounted() {
    this.getListFun()
  },
  methods: {
    getListFun() {
      this.tableLoading = true
      getList({ pageNum: this.currentPage, limit: this.pageSize, ...this.form }).then(res => {
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
    openDialog(title, data) {
      this.DialogTitle = title
      this.DialogVisible = true
      console.log(this.responseForm)
      if (data) {
        this.$nextTick(() => {
          this.responseForm.nameWork = data.nameWork
          this.responseForm.description = data.description
          this.responseForm.id = data.id
        })
      }
    },
    openDeleteDialog(data) {
      this.deleteId = data.id
      this.deleteDialogVisible = true
    },
    deleteAfirm() {
      this.dialogLoading = true
      deleteWorkConditionDesign({ id: this.deleteId }).then(() => {
        this.deleteDialogVisible = false
        this.dialogLoading = false
        this.$message.success('删除成功')
        this.getListFun()
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    submitForm() {
      this.dialogLoading = true
      // if (this.DialogTitle === '新增') this.responseForm.createTime = getTime()
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          saveWorkConditionDesign(this.responseForm).then(res => {
            this.dialogLoading = false
            this.DialogVisible = false
            this.$message.success('提交成功')
            this.getListFun()
          }).catch(() => {
            this.dialogLoading = false
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
