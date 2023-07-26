<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-row type="flex" justify="space-between">
        <el-row type="flex">
          <el-form-item>
            <el-input v-model="form.deviceName" placeholder="搜索设备名称" size="mini">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
        <el-form-item style="margin-right: 0">
          <el-button type="primary" size="mini">下载批量导入模板</el-button>
          <el-button type="primary" size="mini">设备批量导入</el-button>
          <el-button type="primary" size="mini">设备批量导出</el-button>
          <el-button type="primary" size="mini" @click="openDialog">添加设备</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <template v-if="oneClassifyList.length > 0">
      <el-row type="flex" style="margin-bottom: 20px">
        <div v-for="(item,index) in oneClassifyList" :key="index" class="one-classify" :class="{'selected' : selectIndex === index}" @click="classify('selectIndex',index,item.id)">
          <span>{{ item.deviceTypeName }}</span>
        </div>
      </el-row>
      <el-row v-if="oneClassifyList[selectIndex].children.length > 0" type="flex" style="margin-bottom: 20px;background: #13277A;">
        <div class="two-classify">
          <span style="color: #ffffff">二级菜单</span>
        </div>
        <div v-for="(item,index) in oneClassifyList[selectIndex].children" :key="index" class="two-classify" :class="{'two-selected' : selectTwoIndex === index}" @click="classify('selectTwoIndex',index,item.id)">
          <span>{{ item.deviceTypeName }}</span>
        </div>
      </el-row>
      <div :class="[oneClassifyList[selectIndex].children.length > 0 ? 'little-height' : 'zhengchang-height']">
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
                align="center"
                width="170px"
              >
                <template slot-scope="scope">
                  <el-image style="height: 100px;width: 130px" :src="scope.row.imageUrl" fit="cover" />
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <div style="text-align: left;width: 598px;margin: 0 auto;">
                    <p style="color: #00A3FD;font-size: 14px;">{{ scope.row.name }}</p>
                    <p style="color: #ffffff;font-size: 12px">投运时间：{{ getTimeStr(scope.row.putIntoOperateTime,5) }}｜预计更换时间：{{ getTimeStr(scope.row.estimatedReplacementTime,5) }}｜维修次数：{{ scope.row.repairCount }}次｜剩余寿命：{{ scope.row.designLifetime }}h｜健康指数：<span style="color: #49D70F"> {{ scope.row.healthIndex }}</span> <br>相数：{{ scope.row.phaseNumber }}；设备规格及技术参数：{{ scope.row.specifications }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="200px" align="center">
                <template>
                  <span style="font-size: 14px;">故障信息</span>
                </template>
              </el-table-column>
              <el-table-column width="200px" align="center">
                <template>
                  <span style="font-size: 14px;">定期工作</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="140px"
              >
                <template slot="header">
                  <el-button type="primary" size="small" @click="opendeleteDialog">删除</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    type="text"
                    style="margin-right: 20px"
                  ><i class="el-icon-upload" style="font-size: 25px" /> </el-button>
                  <el-button
                    size="medium"
                    type="text"
                    @click="openDialog(scope.row)"
                  ><i class="el-icon-edit-outline" style="font-size: 25px" /> </el-button>
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
    </template>
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
        <el-button type="primary" style="width: 100px" size="medium" :loading="DialogLoading" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getList, delBotDeviceType, getDeviceInfoMain } from '@/api/equipmentLifeCycle/device-dynamics'
export default {
  data() {
    return {
      form: {
        deviceName: '',
        deviceTypeId: ''
      },
      tableData: [],
      oneClassifyList: [],
      selectIndex: 0,
      selectTwoIndex: 0,
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      DialogLoading: false,
      deleteDialogVisible: false,
      deleteId: ''
    }
  },
  mounted() {
    this.getDeviceInfoMainFun()
    this.getListFun()
  },
  methods: {
    classify(variable, index, id) {
      this[variable] = index
      if (variable === 'selectIndex') {
        this.selectTwoIndex = 0
        if (this.oneClassifyList[index].children.length > 0) {
          this.form.deviceTypeId = this.oneClassifyList[index].children[0].id
        } else {
          this.form.deviceTypeId = id
        }
      } else {
        this.form.deviceTypeId = id
      }
      this.currentPage = 1
      this.getListFun()
    },
    getDeviceInfoMainFun() {
      return getDeviceInfoMain().then(res => {
        this.oneClassifyList = this.handleTree(res.data)
      })
    },
    handleTree(array) {
      const arr = [{ deviceTypeName: '全部', id: '', children: [] }]
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].parentId === 0) {
          arr.push({ ...array[i], children: [] })
          array.splice(i, 1)
        }
      }
      for (let j = 0; j < array.length; j++) {
        // eslint-disable-next-line no-labels
        two: for (let i = 0; i < arr.length; i++) {
          if (array[j].parentId === arr[i].id) {
            arr[i].children.push(array[j])
            // eslint-disable-next-line no-labels
            break two
          }
        }
      }
      return arr
    },
    getListFun() {
      this.tableLoading = true
      getList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.form
      }).then(res => {
        this.total = res.count
        this.tableData = res.data
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
    openDialog(data) {
      if (data) {
        this.$router.push({
          path: '/equipmentLifeCyclePath/equipment-entry',
          query: {
            id: data.id
          }
        })
      } else {
        this.$router.push('/equipmentLifeCyclePath/equipment-entry')
      }
    },
    opendeleteDialog() {
      if (this.$refs.tableRef.selection.length === 0) return this.$message.warning('请至少勾选一条数据')
      this.deleteDialogVisible = true
      this.deleteId = this.$refs.tableRef.selection.map(val => val.id)
    },
    deleteAfirm() {
      this.DialogLoading = true
      delBotDeviceType(this.deleteId).then(res => {
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
::v-deep.dv-border-box-10 .border-box-content {
  // height: calc(100vh - 140px - 90px - 63px - 130px);
  height: 100%;
  overflow-y: auto;
}
.little-height{
  height: calc(100vh - 140px - 90px - 63px - 130px);
}
.zhengchang-height{
  height: calc(100vh - 140px - 90px - 63px - 65px);
}
.one-classify{
  height: 45px;
  background: #164277;
  width: 110px;
  margin-right: 10px;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  font-size: 13px;
  cursor: pointer;
}
.two-classify{
  height: 45px;
  width: 110px;
  margin-right: 10px;
  color: rgba(80,243,248,0.7);
  text-align: center;
  line-height: 45px;
  font-size: 12px;
  cursor: pointer;
}
.selected{
  position: relative;
  overflow: hidden;
  border: 1px solid #329b98;
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    top: -10px;
    left: 0;
    height: 6px;
    box-shadow: 0 10px 10px 0 #21f3ed;
  }
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    bottom: -10px;
    left: 0;
    height: 6px;
    box-shadow: 0 -10px 10px 0 #21f3ed;
  }
}
.two-selected{
  color: rgba(80,243,248,1);
  font-weight: bold;
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
