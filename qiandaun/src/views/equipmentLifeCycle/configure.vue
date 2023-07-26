<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-form-item label="下次执行时间">
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
      <el-form-item>
        <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" size="mini" @click="openDialog('新增')">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="opendeleteDialog">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
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
              prop="startTime"
              align="center"
              label="开始年月"
            />
            <el-table-column
              align="center"
              label="执行周期"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.executionTime === 1 ? '一天' : scope.row.executionTime === 2 ? '一周' : scope.row.executionTime === 3 ? '一个月' : '一年' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="lastTime"
              align="center"
              label="下次执行时间"
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
      width="40%"
      center
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ dialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="80px">
        <el-form-item label="执行周期" prop="executionTime" :rules="{required: true, message: '请输入执行周期'}">
          <el-select v-model="responseForm.executionTime" style="width: 100%" size="mini" placeholder="请选择执行周期">
            <el-option
              v-for="item in zhouqiList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始年月" prop="startTime" :rules="{required: true, message: '请选择开始年月'}">
          <el-date-picker
            v-model="responseForm.startTime"
            size="mini"
            style="width: 100%"
            type="month"
            placeholder="请选择开始年月"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceId" :rules="{required: true, message: '请选择设备'}">
          <el-select v-model="responseForm.deviceId" style="width: 100%" size="mini" placeholder="请选择设备">
            <el-option
              v-for="item in shebeiList"
              :key="item.id"
              :label="item.deviceName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工作项目" prop="workProject" :rules="{required: true, message: '请输入工作项目'}">
          <el-input v-model="responseForm.workProject" :rows="5" type="textarea" placeholder="请输入工作项目" size="small" />
        </el-form-item>
        <el-form-item style="margin: 0" label="工作标准" prop="workStandard" :rules="{required: true, message: '请输入工作标准'}">
          <el-input v-model="responseForm.workStandard" :rows="5" type="textarea" placeholder="请输入工作标准" size="small" />
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
        <el-form-item prop="deviceName" style="margin: 0" />
        <el-form-item prop="lastTime" style="margin: 0" />
        <el-form-item prop="startMoth" style="margin: 0" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="DialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" :loading="DialogLoading" type="primary" size="medium" @click="submitTap">保存</el-button>
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
import { getList, saveDeviceOverWorkingOption, deleteDeviceOverWorkingOption } from '@/api/equipmentLifeCycle/configure'
import { getDevices } from '@/api/common/index'
export default {
  data() {
    return {
      form: {
        executorTimeStart: '',
        executorTimeEnd: '',
        workingProject: '',
        workStandard: '',
        deviceName: ''
      },
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      selectData: {},
      DialogVisible: false,
      responseForm: {
        deviceId: '',
        deviceName: '',
        executionTime: '',
        id: '',
        startTime: '',
        workProject: '',
        workStandard: ''
      },
      shebeiList: [],
      zhouqiList: [
        { id: 1, label: '一天' },
        { id: 2, label: '一周' },
        { id: 3, label: '一个月' },
        { id: 4, label: '一年' }
      ],
      deleteDialogVisible: false,
      deleteId: '',
      DialogLoading: false,
      dialogTitle: '新增'
    }
  },
  mounted() {
    this.getListFun()
    this.getDevicesFun()
  },
  methods: {
    getDevicesFun() {
      getDevices().then(res => {
        this.shebeiList = res.data
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
          this.responseForm.deviceName = this.shebeiList.filter(val => val.id === this.responseForm.deviceId)[0].deviceName
          saveDeviceOverWorkingOption(this.responseForm).then(res => {
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
      deleteDeviceOverWorkingOption(this.deleteId).then(res => {
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
