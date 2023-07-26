<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          style="width: 180px"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="mini"
          type="datetime"
          placeholder="选择开始时间"
        />
        <span class="labelText">至</span>
        <el-date-picker
          v-model="form.endTime"
          style="width: 180px"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择结束时间"
        />
      </el-form-item>
      <el-form-item label="参数名称">
        <el-select v-model="form.pointId" size="mini" placeholder="请选择" clearable>
          <el-option
            v-for="item in canshuList"
            :key="item.id"
            :label="item.tagDesc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="tableLoading" type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
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
              prop="tagInfo"
              align="center"
              label="所属设备"
            />
            <el-table-column
              prop="eventName"
              align="center"
              label="事件名称"
            />
            <el-table-column
              prop="alarmCause"
              align="center"
              label="发生原因"
            />
            <el-table-column
              prop="handleMode"
              align="center"
              label="处理措施"
            />
            <el-table-column
              prop="createDate"
              align="center"
              label="发生时间"
            />
            <el-table-column
              prop="taginfoid"
              align="center"
              label="所处班组"
            />
            <el-table-column
              align="center"
              label="处理时间"
            >
              <template slot-scope="scope">
                <span>{{ getTimeStr(scope.row.handleTime,5) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="100px"
            >
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog(scope.row)"
                >详情</el-button>
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
      width="50%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>详情</span>
        <i class="el-icon-circle-close close" @click="DialogVisible = false" />
      </div>
      <el-form :model="responseForm" label-width="100px">
        <el-form-item label="事件名称">
          <el-input v-model="responseForm.eventName" disabled placeholder="请输入事件名称" size="small" />
        </el-form-item>
        <el-form-item label="所属设备">
          <el-input v-model="responseForm.tagInfo" disabled placeholder="请输入所属设备" size="small" />
        </el-form-item>
        <el-form-item label="报警类型">
          <el-input v-model="responseForm.alarmType" disabled placeholder="请输入报警类型" size="small" />
        </el-form-item>
        <el-form-item label="发生原因">
          <el-input v-model="responseForm.alarmCause" disabled placeholder="请输入发生原因" size="small" />
        </el-form-item>
        <el-form-item label="处理措施">
          <el-input v-model="responseForm.handleMode" disabled placeholder="请输入处理措施" size="small" />
        </el-form-item>
        <el-form-item label="发生时间">
          <el-input v-model="responseForm.createDate" disabled placeholder="请输入发生时间" size="small" />
        </el-form-item>
        <el-form-item label="所处班组">
          <el-input v-model="responseForm.taginfoid" disabled placeholder="请输入所处班组" size="small" />
        </el-form-item>
        <el-form-item label="处理时间">
          <el-input v-model="responseForm.handleTime" disabled placeholder="请输入处理时间" size="small" />
        </el-form-item>
        <el-form-item label="处理措施评价">
          <el-input v-model="responseForm.appraiseContent" disabled placeholder="请输入处理措施评价" size="small" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPoint, getList } from '@/api/alarmCenter/record'
export default {
  data() {
    return {
      form: {
        pointId: '',
        startTime: '',
        endTime: ''
      },
      canshuList: [],
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      selectData: {},
      DialogVisible: false,
      responseForm: {}
    }
  },
  mounted() {
    this.getPointFun()
    this.getListFun()
  },
  methods: {
    getPointFun() {
      getPoint().then(res => {
        this.canshuList = res.data
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
    openDialog(data) {
      this.DialogVisible = true
      this.responseForm = data
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
