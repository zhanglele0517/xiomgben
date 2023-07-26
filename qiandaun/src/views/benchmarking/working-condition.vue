<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="设计值名称">
          <el-select v-model="form.nameWorkId" clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in shijianList"
              :key="item.id"
              :label="item.nameWork"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属工况">
          <el-select v-model="form.workId" clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in gongkuangList"
              :key="item.id"
              :label="item.dicValue"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="机组">
          <el-select v-model="form.machineId" clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.id"
              :label="item.unitName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
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
              prop="designName"
              align="center"
              label="设计值名称"
            />
            <el-table-column
              prop="workValue"
              align="center"
              label="所属工况"
            />
            <el-table-column
              prop="unitName"
              align="center"
              label="机组"
            />
            <el-table-column
              prop="value"
              align="center"
              label="设计数值"
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
      custom-class="dialog-class"
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" :model="responseForm" label-width="110px" label-position="left">
        <el-form-item label="设计数值" prop="value" :rules="{required: true, message: '请输入设计数值'}">
          <el-input v-model="responseForm.value" type="number" placeholder="请输入设计数值" size="small" />
        </el-form-item>
        <el-form-item label="工况字典" prop="workId" :rules="{required: true, message: '请选择工况字典'}">
          <el-select v-model="responseForm.workId" style="width: 100%" size="mini" placeholder="请选择">
            <el-option
              v-for="item in gongkuangList"
              :key="item.id"
              :label="item.dicValue"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属设计事件" prop="designId" :rules="{required: true, message: '请选择设计事件'}">
          <el-select v-model="responseForm.designId" style="width: 100%" size="mini" placeholder="请选择">
            <el-option
              v-for="item in shijianList"
              :key="item.id"
              :label="item.nameWork"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="机组" prop="unitId" :rules="{required: true, message: '请选择机组'}">
          <el-select v-model="responseForm.unitId" style="width: 100%" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.id"
              :label="item.unitName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
        <el-form-item prop="createTime" style="margin: 0" />
        <el-form-item prop="createUser" style="margin: 0" />
        <el-form-item prop="designName" style="margin: 0" />
        <el-form-item prop="unitName" style="margin: 0" />
        <el-form-item prop="updateTime" style="margin: 0" />
        <el-form-item prop="updateUser" style="margin: 0" />
        <el-form-item prop="workValue" style="margin: 0" />
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="dialogLoading" style="width: 100px" size="medium" @click="submitForm">提交</el-button>
      </el-row>
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
        <el-button type="primary" :loading="dialogLoading" style="width: 100px" size="medium" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDesign, getMachine, getList, saveWorkConditionDetail, editWorkConditionDetail, deleteDesign } from '@/api/benchmarking/working-condition'
import { getValueByName } from '@/api/alarmCenter/information'
// import { getTime } from '@/utils/index'
export default {
  data() {
    return {
      form: {
        nameWorkId: '',
        workId: '',
        machineId: ''
      },
      jizuList: [],
      gongkuangList: [],
      shijianList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false,
      DialogTitle: '新增', //
      responseForm: {
        createTime: '',
        createUser: '',
        designId: '',
        designName: '',
        id: '',
        unitId: '',
        unitName: '',
        updateTime: '',
        updateUser: '',
        value: '',
        workId: '',
        workValue: ''
      },
      deleteDialogVisible: false,
      deleteId: '',
      tableLoading: false,
      dialogLoading: false
    }
  },
  mounted() {
    this.getDesignFun()
    this.getMachineFun()
    this.getValueByNameFun()
    this.getListFun()
  },
  methods: {
    getDesignFun() {
      getDesign().then(res => {
        this.shijianList = res.data
      })
    },
    getMachineFun() {
      getMachine().then(res => {
        this.jizuList = res.data
      })
    },
    getValueByNameFun() {
      getValueByName({ name: 'get_working' }).then(res => {
        this.gongkuangList = res.data
      })
    },
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
      if (data) {
        this.$nextTick(() => {
          this.responseForm.designId = data.designId
          this.responseForm.unitId = data.unitId
          this.responseForm.workId = data.workId
          this.responseForm.value = data.value
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
      deleteDesign({ id: this.deleteId }).then(() => {
        this.deleteDialogVisible = false
        this.dialogLoading = false
        this.$message.success('删除成功')
        this.getListFun()
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    submitForm() {
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          this.dialogLoading = true
          const endFun = (title) => {
            this.dialogLoading = false
            this.DialogVisible = false
            this.$message.success(title)
            this.getListFun()
          }
          // 设计值名称
          this.responseForm.designName = this.shijianList.filter(val => val.id === this.responseForm.designId)[0].nameWork
          // 机组名称
          this.responseForm.unitName = this.jizuList.filter(val => val.id === this.responseForm.unitId)[0].unitName
          // 工况字符串
          this.responseForm.workValue = this.gongkuangList.filter(val => val.id === this.responseForm.workId)[0].dicValue
          if (this.DialogTitle === '新增') {
            // this.responseForm.createTime = getTime()
            saveWorkConditionDetail(this.responseForm).then(res => {
              endFun('添加成功')
            }).catch(() => {
              this.dialogLoading = false
            })
          } else if (this.DialogTitle === '编辑') {
            editWorkConditionDetail(this.responseForm).then(res => {
              endFun('修改成功')
            }).catch(() => {
              this.dialogLoading = false
            })
          }
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

.dialog-class{
  ::v-deep.el-select{
    width: 100%;
  }
}
</style>
