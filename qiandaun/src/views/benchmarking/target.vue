<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="机组">
          <el-select v-model="form.machineId" size="mini" placeholder="请选择" clearable>
            <el-option
              v-for="item in jizuList"
              :key="item.id"
              :label="item.unitName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工况选择">
          <el-select v-model="form.workId" size="mini" placeholder="请选择" clearable>
            <el-option
              v-for="item in gongkuangList"
              :key="item.id"
              :label="item.dicValue"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" :loading="tableLoading" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin: 6px 0 28px 0" size="mini" type="primary" @click="openDialog('新增')">新增</el-button>
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
            <!-- <el-table-column
              type="selection"
              width="55"
            /> -->
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            />
            <el-table-column
              prop="name"
              align="center"
              label="对标指标"
            />
            <el-table-column
              prop="designName"
              align="center"
              label="#2设计值"
            />
            <el-table-column
              prop="pointName1"
              align="center"
              label="#1机组"
            />
            <el-table-column
              prop="pointName2"
              align="center"
              label="#2机组"
            />
            <el-table-column
              prop="description"
              align="center"
              label="指标描述"
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
      width="45%"
      center
      :show-close="false"
      @closed="$refs.responseFormRef.resetFields()"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form ref="responseFormRef" style="padding: 0 20px" :model="responseForm" label-width="140px" label-position="left">
        <el-form-item label="指标名称" prop="name" :rules="{required: true, message: '请输入指标名称'}">
          <el-input v-model="responseForm.name" placeholder="请输入指标名称" size="small" />
        </el-form-item>
        <el-form-item label="#1机组实时值测点" prop="pointId1" :rules="{required: true, message: '请选择#1机组实时值测点'}">
          <el-select v-model="responseForm.pointId1" style="width: 100%" placeholder="请选择" size="small">
            <el-option
              v-for="item in cedian1List"
              :key="item.id"
              :label="item.tagDesc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="#2机组实时值测点" prop="pointId2" :rules="{required: true, message: '请选择#2机组实时值测点'}">
          <el-select v-model="responseForm.pointId2" style="width: 100%" placeholder="请选择" size="small">
            <el-option
              v-for="item in cedian2List"
              :key="item.id"
              :label="item.tagDesc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="#2机组设计值" prop="designId" :rules="{required: true, message: '请选择#2机组设计值'}">
          <el-select v-model="responseForm.designId" style="width: 100%" placeholder="请选择" size="small">
            <el-option
              v-for="item in shejizhiList"
              :key="item.id"
              :label="item.nameWork"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指标描述" prop="description" :rules="{required: true, message: '请输入指标描述'}">
          <el-input v-model="responseForm.description" placeholder="请输入指标描述" size="small" />
        </el-form-item>
        <el-form-item prop="id" style="margin: 0" />
        <el-form-item prop="designName" style="margin: 0" />
        <el-form-item prop="pointName1" style="margin: 0" />
        <el-form-item prop="pointName2" style="margin: 0" />
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" style="width: 100px" size="medium" :loading="dialogLoading" @click="submitTap">提交</el-button>
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
        <el-button type="primary" style="width: 100px" size="medium" :loading="dialogLoading" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getMachine, saveOreditWorkConditionDivision, deleteWorkConditionDetail, getPointOne, getPointTwo, getDesign } from '@/api/benchmarking/target'
import { getValueByName } from '@/api/alarmCenter/information'
export default {
  data() {
    return {
      form: {
        machineId: '',
        workId: ''
      },
      jizuList: [],
      gongkuangList: [],
      cedian1List: [],
      cedian2List: [],
      shejizhiList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DialogVisible: false,
      DialogTitle: '新增', //
      responseForm: {
        // createTime: '',
        // createUser: '',
        description: '',
        designId: '',
        designName: '',
        id: '',
        name: '',
        pointId1: '',
        pointId2: '',
        pointName1: '',
        pointName2: ''
        // unitId: '',
        // unitName: '',
        // updateTime: '',
        // updateUser: ''
      },
      deleteId: '',
      deleteDialogVisible: false,
      dialogLoading: false,
      tableLoading: false
    }
  },
  mounted() {
    this.getMachineFun()
    this.getValueByNameFun()
    this.getListFun()
    this.getPointOneFun()
    this.getPointTwoFun()
    this.getDesignFun()
  },
  methods: {
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
    getPointOneFun() {
      getPointOne().then(res => {
        this.cedian1List = res.data
      })
    },
    getPointTwoFun() {
      getPointTwo().then(res => {
        this.cedian2List = res.data
      })
    },
    getDesignFun() {
      getDesign().then(res => {
        this.shejizhiList = res.data
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
          for (const key in this.responseForm) {
            if (key === 'pointId1' || key === 'pointId2') {
              this.responseForm[key] = String(data[key])
            } else {
              this.responseForm[key] = data[key]
            }
          }
        })
      }
    },
    openDeleteDialog(data) {
      this.deleteId = data.id
      this.deleteDialogVisible = true
    },
    deleteAfirm() {
      this.dialogLoading = true
      deleteWorkConditionDetail({ id: this.deleteId }).then(res => {
        this.$message.success('删除成功')
        this.dialogLoading = false
        this.deleteDialogVisible = false
        this.getListFun()
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    submitTap() {
      this.dialogLoading = true
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          this.responseForm.designName = this.shejizhiList.filter(val => val.id === this.responseForm.designId)[0].nameWork
          this.responseForm.pointName1 = this.cedian1List.filter(val => val.id === this.responseForm.pointId1)[0].tagDesc
          this.responseForm.pointName2 = this.cedian2List.filter(val => val.id === this.responseForm.pointId2)[0].tagDesc
          saveOreditWorkConditionDivision(this.responseForm).then(() => {
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
