<template>
  <div class="content-box">
    <el-form inline class="demo-form-inline">
      <el-row type="flex" justify="end">
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
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
            <!-- <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            /> -->
            <el-table-column
              prop="name"
              align="center"
              label="设备类型"
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
          <!-- <el-row type="flex" justify="center" class="pagination">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-row> -->
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
      <el-form ref="responseFormRef" :model="responseForm" label-width="80px">
        <el-form-item label="所属上级" prop="parentId" class="shangji-class">
          <el-select ref="orgIdSelecteltreeRef" v-model="responseForm.parentId" style="width: 100%" size="small" placeholder="请选择所属上级">
            <el-option v-for="item in handleTreeData(shangjiList)" :key="item.id" :label="item.name" :value="item.id" style="display: none;" />
            <el-tree
              ref="orgTreeRef"
              :data="shangjiList"
              node-key="id"
              highlight-current
              :props="{children: 'children',label: 'name'}"
              :current-node-key="responseForm.parentId"
              :expand-on-click-node="false"
              @node-click="typeTreeSelectTap"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="deviceTypeName" style="margin: 0" label="设备类型" :rules="{required: true, message: '请输入设备类型'}">
          <el-input v-model="responseForm.deviceTypeName" placeholder="请输入设备类型" size="small" />
        </el-form-item>
        <el-form-item prop="createTime" style="margin: 0" />
        <el-form-item prop="id" style="margin: 0" />
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
import { getList, addBotDeviceType, updateBotDeviceType, delBotDeviceType } from '@/api/equipmentLifeCycle/equipment-type'
import { clone } from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      // currentPage: 1, // 当前页数
      // pageSize: 10, // 分页每页条数
      // total: 0, // 用户总数
      tableLoading: false,
      DialogVisible: false,
      DialogLoading: false,
      dialogTitle: '新增',
      deleteDialogVisible: false,
      deleteId: '',
      responseForm: {
        createTime: '',
        deviceTypeName: '',
        id: '',
        parentId: 0
      },
      shangjiList: []
    }
  },
  mounted() {
    this.getListFun()
  },
  methods: {
    handleTreeData(array) {
      let arr = []
      const recursionFun = (data) => {
        if (data.children && data.children.length > 0) {
          let childrenArr = []
          for (let i = 0; i < data.children.length; i++) {
            childrenArr = childrenArr.concat(recursionFun(data.children[i]))
          }
          return [data, ...childrenArr]
        } else {
          return [data]
        }
      }
      for (let i = 0; i < array.length; i++) {
        arr = arr.concat(recursionFun(array[i]))
      }
      return arr
    },
    getListFun() {
      this.tableLoading = true
      getList().then(res => {
        // this.total = res.data.total
        // this.tableData = res.data.records
        this.tableData = res.data
        this.tableLoading = false
      })
    },
    // // 监听每页条数发生变化
    // handleSizeChange(e) {
    //   this.currentPage = 1
    //   this.pageSize = e
    //   this.getListFun()
    // },
    // // 监听页数发生变化
    // handleCurrentChange(e) {
    //   this.currentPage = e
    //   this.getListFun()
    // },
    // 搜索
    onSubmit() {
      // this.currentPage = 1
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
        const newArr = clone(this.tableData)
        const fun = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === row.id) {
              arr.splice(i, 1)
              return
            }
            if (arr[i].children && arr[i].children.length > 0) fun(arr[i].children)
          }
        }
        fun(newArr)
        this.shangjiList = [{ id: 0, name: '一级类型', parentId: 0, createTime: null }, ...newArr]
        this.$nextTick(() => {
          this.responseForm = { ...row, deviceTypeName: row.name }
        })
      } else {
        this.shangjiList = [{ id: 0, name: '一级类型', parentId: 0, createTime: null }, ...this.tableData]
      }
    },
    submitTap() {
      this.$refs.responseFormRef.validate((valid) => {
        if (valid) {
          this.DialogLoading = true
          const endFun = (title) => {
            this.$message.success(title)
            this.DialogLoading = false
            this.DialogVisible = false
            this.getListFun()
          }
          if (this.dialogTitle === '新增') {
            addBotDeviceType(this.responseForm).then(res => {
              endFun('新增成功')
            })
          } else {
            updateBotDeviceType(this.responseForm).then(res => {
              endFun('修改成功')
            })
          }
          setTimeout(() => {
            this.DialogLoading = false
            this.DialogVisible = false
          }, 1000)
        } else {
          return false
        }
      })
    },
    deleteAfirm() {
      this.DialogLoading = true
      delBotDeviceType(this.deleteId).then(res => {
        this.$message.success('删除成功')
        this.getListFun()
        this.DialogLoading = false
        this.deleteDialogVisible = false
      })
    },
    typeTreeSelectTap(data) {
      this.responseForm.parentId = data.id
      this.$refs.orgIdSelecteltreeRef.blur()
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
::v-deep .el-table__expand-icon{
  color: #ffffff;
}
</style>
