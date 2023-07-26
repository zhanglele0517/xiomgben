<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-form-item label="工作时间">
        <el-date-picker
          v-model="form.workTimeStart"
          style="width: 180px"
          value-format="timestamp"
          size="mini"
          type="datetime"
          placeholder="选择开始时间"
        />
        <span class="labelText">至</span>
        <el-date-picker
          v-model="form.workTimeEnd"
          style="width: 180px"
          size="mini"
          value-format="timestamp"
          type="datetime"
          placeholder="选择结束时间"
        />
      </el-form-item>
      <el-form-item label="计划执行时间">
        <el-date-picker
          v-model="form.executorTimeStart"
          style="width: 180px"
          value-format="timestamp"
          size="mini"
          type="datetime"
          placeholder="选择开始时间"
        />
        <span class="labelText">至</span>
        <el-date-picker
          v-model="form.executorTimeEnd"
          style="width: 180px"
          size="mini"
          value-format="timestamp"
          type="datetime"
          placeholder="选择结束时间"
        />
      </el-form-item>
      <el-form-item label="工作项目">
        <el-input v-model="form.workingProject" placeholder="搜索" size="mini">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
      <el-form-item label="工作标准">
        <el-input v-model="form.workStandard" placeholder="搜索" size="mini">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="form.deviceName" placeholder="搜索" size="mini">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
      <el-form-item label="执行人">
        <el-input v-model="form.executorUser" placeholder="搜索" size="mini">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="configureTap">配置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="openDeleteDialog">删除</el-button>
      </el-form-item>
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
            @row-click="openDialog"
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
              prop="deviceName"
              align="center"
              label="设备名称"
            />
            <el-table-column
              prop="workProject"
              align="center"
              label="工作项目"
            />
            <el-table-column
              prop="workStandard"
              align="center"
              label="工作标准"
            />
            <el-table-column
              prop="workingHours"
              align="center"
              label="计划执行时间"
            />
            <el-table-column
              prop="workingContent"
              align="center"
              label="工作内容"
            />
            <el-table-column
              prop="workingTime"
              align="center"
              label="工作时间"
            />
            <el-table-column
              prop="executorUser"
              align="center"
              label="执行人"
            />
            <el-table-column
              align="center"
              label="工作状态"
              width="100px"
            >
              <template slot-scope="scope">
                <span :style="{color: scope.row.workingContent && scope.row.workingTime ? '#3270EB' : '#FFAA00'}">{{ scope.row.workingContent && scope.row.workingTime ? '已完成' : '未完成' }}</span>
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
    >
      <div slot="title" class="dialog-title">
        <span>未完成</span>
      </div>
      <el-form label-width="100px">
        <el-form-item label="设备名称">
          <el-input v-model="responseForm.deviceName" disabled placeholder="请输入设备名称" size="small" />
        </el-form-item>
        <el-form-item label="工作项目">
          <el-input v-model="responseForm.workProject" disabled placeholder="请输入工作项目" size="small" />
        </el-form-item>
        <el-form-item label="工作标准">
          <el-input v-model="responseForm.workStandard" disabled placeholder="请输入工作标准" size="small" />
        </el-form-item>
        <el-form-item label="计划执行时间" style="margin: 0">
          <el-input v-model="responseForm.workingHours" disabled placeholder="请输入计划执行时间" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="DialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" type="primary" size="medium" @click="DialogVisibleTwo = true">完成</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="DialogVisibleTwo"
      width="45%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>未完成</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="100px">
        <el-form-item label="工作内容" prop="workingContent" :rules="{required: true, message: '请输入工作内容'}">
          <el-input v-model="responseForm.workingContent" :rows="5" type="textarea" placeholder="请输入工作内容" size="small" />
        </el-form-item>
        <el-form-item label="工作时间" prop="workingTime" :rules="{required: true, message: '请输入工作时间'}">
          <el-input v-model="responseForm.workingTime" placeholder="请输入发生时间" size="small" />
        </el-form-item>
        <el-form-item style="margin: 0" label="执行人" prop="executorUserId" :rules="{required: true, message: '请选择执行人'}">
          <el-select v-model="responseForm.executorUserId" style="width: 100%" size="mini" placeholder="请选择执行人">
            <el-option
              v-for="item in renyuanList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="DialogVisibleTwo = false">取 消</el-button>
        <el-button style="margin-left: 40px" :loading="DialogLoading" type="primary" size="medium" @click="submitTap">确定</el-button>
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
import { getRelacationUser } from '@/api/common/index'
import { getList, saveDeviceOverWorking, deleteDeviceOverWorking } from '@/api/equipmentLifeCycle/overhaul'
export default {
  data() {
    return {
      form: {
        workTimeStart: '',
        workTimeEnd: '',
        executorTimeStart: '',
        executorTimeEnd: '',
        workingProject: '',
        workStandard: '',
        deviceName: '',
        executorUser: ''
      },
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      DialogVisible: false,
      DialogVisibleTwo: false,
      responseForm: {
        deviceName: '',
        executorUser: '',
        executorUserId: '',
        id: '',
        workProject: '',
        workStandard: '',
        workingContent: '',
        workingHours: '',
        workingTime: ''
      },
      renyuanList: [],
      deleteId: '',
      deleteDialogVisible: false,
      DialogLoading: false
    }
  },
  mounted() {
    this.getRelacationUserFun()
    this.getListFun()
  },
  methods: {
    getRelacationUserFun() {
      getRelacationUser().then(res => {
        this.renyuanList = res.data
      })
    },
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
    openDeleteDialog() {
      if (this.$refs.tableRef.selection.length === 0) return this.$message.warning('请至少勾选一条数据')
      this.deleteDialogVisible = true
      this.deleteId = this.$refs.tableRef.selection.map(val => val.id)
    },
    deleteAfirm() {
      this.DialogLoading = true
      deleteDeviceOverWorking(this.deleteId).then(res => {
        this.$message.success('删除成功')
        this.DialogLoading = false
        this.deleteDialogVisible = false
        this.getListFun()
      }).catch(() => {
        this.DialogLoading = false
      })
    },
    openDialog(row) {
      if (!row.workingContent || !row.workingTime) {
        this.DialogVisible = true
        this.responseForm = { ...row }
      }
    },
    configureTap() {
      this.$router.push('/equipmentLifeCyclePath/configure')
    },
    submitTap() {
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          this.DialogLoading = true
          this.responseForm.executorUser = this.renyuanList.filter(val => val.id === this.responseForm.executorUserId)[0].userName
          saveDeviceOverWorking(this.responseForm).then(() => {
            this.DialogLoading = false
            this.$message.success('提交成功')
            this.getListFun()
            this.DialogVisible = false
            this.DialogVisibleTwo = false
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
::v-deep.dv-border-box-10 .border-box-content{
  height: calc(100vh - 140px - 90px - 126px);
}
.labelText {
  margin: 0 10px;
  color: #ffffff;
  // font-size: 12px;
}
::v-deep.el-input.is-disabled .el-input__inner{
  color: #666666 !important;
}
</style>
