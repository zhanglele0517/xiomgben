<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-form-item label="时间">
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
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="buttonLoading" type="primary" size="mini" @click="getTreeDataFun">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="treeTap('add')">新建</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="8">
        <dv-border-box-10>
          <div id="information-left" style="padding: 20px">
            <el-tree ref="treeRef" node-key="onlyId" class="tree" :indent="0" :data="treeData" highlight-current :props="{children: 'reportDevices',label: 'title'}" @node-click="handleNodeClick">
              <span slot-scope="{ node }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span v-if="node.data.flag !== 1">
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="treeTap('edit',node.data)"
                  >
                    <i class="el-icon-edit-outline" style="color: #00A3FD;font-size: 16px;" />
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="treeTap('delete',node.data)"
                  >
                    <i class="el-icon-delete" style="color: #EA0A19;font-size: 16px;" />
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </dv-border-box-10>
      </el-col>
      <el-col :span="16">
        <dv-border-box-10>
          <div v-show="isShow" v-loading="contentLoading" element-loading-background="rgba(0, 0, 0, 0.8)" class="content-right">
            <p class="big-title">{{ title }}</p>
            <el-form ref="contentFormRef" :model="contentForm" label-width="80px">
              <el-row type="flex" justify="center">
                <el-form-item label="报警类型" prop="botReportDevice.reportId" :rules="{required: true, message: '请选择报警类型'}">
                  <el-select v-model="contentForm.botReportDevice.reportId" placeholder="请选择报警类型" size="small">
                    <el-option
                      v-for="item in typeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-row>
              <p class="title">基本信息</p>
              <div class="con-bg">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="事件名称" prop="botReportDevice.eventName" :rules="{required: true, message: '请填写事件名称'}">
                      <el-input v-model="contentForm.botReportDevice.eventName" style="max-width: 200px" placeholder="请输入事件名称" size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="设备名称" prop="botReportDevice.deviceId" :rules="{required: true, message: '请选择设备'}">
                      <el-select v-model="contentForm.botReportDevice.deviceId" placeholder="请选择设备" size="small">
                        <el-option
                          v-for="item in shebeiList"
                          :key="item.id"
                          :label="item.deviceName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="设备类型" prop="botReportDevice.deviceTypeId" :rules="{required: true, message: '请选择设备类型'}">
                      <el-select v-model="contentForm.botReportDevice.deviceTypeId" placeholder="请选择设备类型" size="small">
                        <el-option
                          v-for="item in shebeitypeList"
                          :key="item.id"
                          :label="item.deviceTypeName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="报警等级" prop="botReportDevice.reportLeveId" :rules="{required: true, message: '请选择报警等级'}">
                      <el-select v-model="contentForm.botReportDevice.reportLeveId" placeholder="请选择报警等级" size="small">
                        <el-option
                          v-for="item in dengjiList"
                          :key="item.id"
                          :label="item.dicValue"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报警方式" prop="botReportDevice.reportFunctionId" :rules="{required: true, message: '请选择报警方式'}">
                      <el-radio-group v-model="contentForm.botReportDevice.reportFunctionId">
                        <el-radio v-for="(item, index) in fangshiList" :key="index" :label="item.id">{{ item.dicValue }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否生效" prop="botReportDevice.effectId" :rules="{required: true, message: '请选择是否生效'}">
                      <el-radio-group v-model="contentForm.botReportDevice.effectId">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="推送人员" style="margin: 0" prop="botReportDevice.relactionPeopleId" :rules="{required: true, message: '请选择推送人员'}">
                  <el-select v-model="contentForm.botReportDevice.relactionPeopleId" multiple style="width: 100%;" placeholder="请选择推送人员(可多选)" size="small">
                    <el-option
                      v-for="item in renyuanList"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <p class="title">报警规则</p>
              <div class="con-bg">
                <el-form-item v-show="contentForm.botReportDevice.reportId === 10002" label="测点" label-width="50px" prop="botReportDevice.pointId" :rules="{required: true, message: '请选择测点'}">
                  <el-select v-model="contentForm.botReportDevice.pointId" placeholder="请选择测点" size="small" style="width: 100%">
                    <el-option
                      v-for="item in cedianList"
                      :key="item.id"
                      :label="item.tagDesc"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item v-show="contentForm.botReportDevice.reportId !== 10002" label="测点" style="margin-bottom: 0" label-width="50px" prop="botReportDevice.pointId" :rules="{required: true, message: '请选择测点'}">
                          <el-select v-model="contentForm.botReportDevice.pointId" placeholder="请选择测点" size="small">
                            <el-option
                              v-for="item in cedianList"
                              :key="item.id"
                              :label="item.tagDesc"
                              :value="item.id"
                            />
                          </el-select>
                        </el-form-item>
                        <el-form-item v-show="contentForm.botReportDevice.reportId === 10002" label="趋势报警" style="margin-bottom: 0" label-width="78px" prop="botReportDevice.trend" :rules="{required: contentForm.botReportDevice.reportId === 10002, message: '请选择'}">
                          <el-select v-model="contentForm.botReportDevice.trend" placeholder="上升/下降" size="small">
                            <el-option label="上升" :value="1" />
                            <el-option label="下降" :value="2" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-show="contentForm.botReportDevice.reportId === 10002" :span="8">
                        <el-form-item style="margin-bottom: 0;" label-width="15px" prop="botReportDevice.trendTime" :rules="{required: contentForm.botReportDevice.reportId === 10002, message: '请输入秒'}">
                          <el-input v-model="contentForm.botReportDevice.trendTime" size="small" placeholder="秒" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item style="margin-bottom: 0;" label-width="30px" prop="botReportDevice.operator" :rules="{required: true, message: '请选择运算符'}">
                          <el-select v-model="contentForm.botReportDevice.operator" placeholder="请选择运算符" size="small">
                            <el-option
                              v-for="item in yunsuanfuList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-show="contentForm.botReportDevice.reportId === 10003" :span="8">
                        <el-form-item style="margin-bottom: 0;" label-width="15px" prop="botReportDevice.relcationPointName" :rules="{required: contentForm.botReportDevice.reportId === 10003, message: '请输入测点编号或数值'}">
                          <el-input v-model="contentForm.botReportDevice.relcationPointName" size="small" placeholder="测点编号或数值" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="阈值" style="margin-bottom: 0" label-width="50px" prop="botReportDevice.threshold" :rules="{required: true, message: '请输入阈值'}">
                      <el-input v-model="contentForm.botReportDevice.threshold" style="max-width: 200px" placeholder="请输入阈值" size="small" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <p class="title">故障原因</p>
              <div class="con-bg" style="background: transparent;padding: 0">
                <el-table
                  ref="tableRef"
                  :header-row-style="{background: 'transparent',color: '#FFFFFF'}"
                  :header-cell-style="{background: 'transparent'}"
                  :data="contentForm.botReportCases"
                  style="width: 100%"
                >
                  <el-table-column
                    v-if="title !== '详情'"
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    label="故障原因"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span v-if="title === '详情'" style="display: inline-block;margin-bottom: 12px">{{ scope.row.faultCase }}</span>
                      <el-form-item v-else style="margin: 0" :prop="`botReportCases[${scope.$index}].faultCase`" :rules="{required: true, message: '请输入故障原因'}">
                        <el-input v-model="scope.row.faultCase" type="textarea" placeholder="请输入故障原因" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处理方法"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span v-if="title === '详情'">{{ scope.row.processingMethod }}</span>
                      <el-form-item v-else style="margin: 0" :prop="`botReportCases[${scope.$index}].processingMethod`" :rules="{required: true, message: '请输入处理方法'}">
                        <el-input v-model="scope.row.processingMethod" type="textarea" placeholder="请输入处理方法" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" width="160px">
                    <template v-if="title !== '详情'" slot="header" slot-scope="scope">
                      <el-button type="primary" size="small" @click="guzhangTap('add',scope.row)">添加</el-button>
                      <el-button type="danger" size="small" :loading="deleteLoading" @click="guzhangTap('delete')">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
            <el-row v-if="title !== '详情'" type="flex" justify="center">
              <el-button size="medium" style="width: 100px;margin-right: 30px" @click="isShow = false">取消</el-button>
              <el-button type="primary" style="width: 100px" :loading="submitLoading" size="medium" @click="submit">提交</el-button>
            </el-row>
          </div>
        </dv-border-box-10>
      </el-col>
    </el-row>
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
        <el-button type="primary" style="width: 100px" size="medium" :loading="deleteLoading" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { clone } from '@/utils/index'
import { getTreeData, getDeviceType, getReportType, getRelacationUser, getPoint, getValueByName, getDeviceByType, saveBotReportDevice, getBotDeviceInfo, getBotDeviceInfoCases, editBotReportDevice, deleteReportDevice, deleteCase } from '@/api/alarmCenter/information'

export default {
  data() {
    return {
      form: {
        startTime: '',
        endTime: ''
      },
      buttonLoading: false,
      submitLoading: false,
      contentLoading: false,
      treeData: [],
      isShow: false,
      title: '新增',
      contentForm: {
        botReportDevice: {
          createTime: '', // 创建时间
          deviceId: '', // 设备id
          deviceName: '', // 设备名称
          deviceTypeId: '', // 设备类型id
          deviceTypeName: '', // 设备类型名称
          deviceTypeParentId: '', // 设备类型id
          effectId: 1, // 是否生效 1是 2否
          eventName: '', // 事件名称
          id: '',
          operator: '', // 运算符 1：> 2：>= 3: < 4: <= 5: = 6 !=
          pointId: '', // 测点id
          pointName: '', // 测点名称
          relactionPeopleId: [], // 关联人员id
          relcationPointName: '', // 关联报警专属字段 关联测点编号或数值
          reportFunctionId: '', // 报警方式id 字典表id
          reportFunctionStr: '', // 报警方式字典表文字值
          reportId: '', // 报警类型id 枚举
          reportLeveId: '', // 报警等级 字典表id
          reportLeveStr: '', // 报警等级 字典表值
          reportValue: '', // 报警类型名称 枚举
          threshold: '', // 阈值
          trend: '', // 趋势报警类型专属字段：1上升 2下降
          trendTime: '' // 趋势报警类型专属字段：上升或下降的秒数
        },
        botReportCases: [
          {
            createTime: '', // 创建时间
            faultCase: '', // 故障原因
            id: '',
            processingMethod: '', // 处理方法
            reportId: '', // 报警规则ID
            index: 0 // 下标
          }
        ]
      },
      typeList: [],
      renyuanList: [],
      shebeiList: [],
      shebeitypeList: [],
      dengjiList: [],
      cedianList: [],
      fangshiList: [],
      yunsuanfuList: [
        { label: '>', value: 1 },
        { label: '≥', value: 2 },
        { label: '<', value: 3 },
        { label: '≤', value: 4 },
        { label: '=', value: 5 },
        { label: '≠', value: 6 }
      ],
      deleteDialogVisible: false,
      deleteId: '',
      deleteLoading: false
    }
  },
  watch: {
    'contentForm.botReportDevice.reportId'(val) {
      if (val !== 10002) {
        this.contentForm.botReportDevice.trend = ''
        this.contentForm.botReportDevice.trendTime = ''
      } else if (val !== 10003) {
        this.contentForm.botReportDevice.relcationPointName = ''
      }
    }
  },
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    Promise.all([
      this.getTreeDataFun(),
      this.getReportTypeFun(),
      this.getDeviceTypeFun(),
      this.getRelacationUserFun(),
      this.getValueByNameFun(),
      this.getDeviceByTypeFun(),
      this.getPointFun()
    ]).then(res => {
      loading.close()
    })
  },
  methods: {
    getDeviceByTypeFun() {
      return getDeviceByType({ deviceTypeId: '' }).then(res => {
        this.shebeiList = res.data
      })
    },
    async getValueByNameFun() {
      await getValueByName({ name: 'get_report_level' }).then(res => {
        this.dengjiList = res.data
      })
      await getValueByName({ name: 'get_report_function' }).then(res => {
        this.fangshiList = res.data
        if (res.data.length > 0) this.contentForm.botReportDevice.reportFunctionId = res.data[0].id
      })
    },
    getPointFun() {
      return getPoint().then(res => {
        this.cedianList = res.data
      })
    },
    getRelacationUserFun() {
      return getRelacationUser().then(res => {
        this.renyuanList = res.data
      })
    },
    getReportTypeFun() {
      return getReportType().then(res => {
        this.typeList = res.data
      })
    },
    getDeviceTypeFun() {
      return getDeviceType().then(res => {
        this.shebeitypeList = res.data
      })
    },
    getTreeDataFun() {
      this.buttonLoading = true
      return getTreeData(this.form).then(res => {
        this.buttonLoading = false
        this.treeData = res.data.map((val, index) => {
          return {
            ...val, onlyId: String(index), reportDevices: val.reportDevices.map((vals, indexs) => {
              return { ...vals, onlyId: `${index}-${indexs}` }
            }) }
        })
      }).catch(() => {
        this.buttonLoading = false
      })
    },
    treeTap(type, data) {
      if (type === 'add' || type === 'edit') {
        this.isShow = true
        if (type === 'add') {
          this.title = '新增'
          this.$refs.contentFormRef.resetFields()
          this.contentForm = {
            botReportDevice: {
              createTime: '', // 创建时间
              deviceId: '', // 设备id
              deviceName: '', // 设备名称
              deviceTypeId: '', // 设备类型id
              deviceTypeName: '', // 设备类型名称
              deviceTypeParentId: '', // 设备类型id
              effectId: 1, // 是否生效 1是 2否
              eventName: '', // 事件名称
              id: '',
              operator: '', // 运算符 1：> 2：>= 3: < 4: <= 5: = 6 !=
              pointId: '', // 测点id
              pointName: '', // 测点名称
              relactionPeopleId: [], // 关联人员id
              relcationPointName: '', // 关联报警专属字段 关联测点编号或数值
              reportFunctionId: this.fangshiList[0].id, // 报警方式id 字典表id
              reportFunctionStr: '', // 报警方式字典表文字值
              reportId: '', // 报警类型id 枚举
              reportLeveId: '', // 报警等级 字典表id
              reportLeveStr: '', // 报警等级 字典表值
              reportValue: '', // 报警类型名称 枚举
              threshold: '', // 阈值
              trend: '', // 趋势报警类型专属字段：1上升 2下降
              trendTime: '' // 趋势报警类型专属字段：上升或下降的秒数
            },
            botReportCases: [
              {
                createTime: '', // 创建时间
                faultCase: '', // 故障原因
                id: '',
                processingMethod: '', // 处理方法
                reportId: '', // 报警规则ID
                index: 0 // 下标
              }
            ]
          }
        }
        if (type === 'edit') {
          this.title = '编辑'
          this.isShow = true
          this.$refs.treeRef.setCurrentKey(data.onlyId)
          if (data.id !== this.contentForm.botReportDevice.id) {
            this.contentLoading = true
            this.getDetail(data)
          }
        }
      } else {
        this.deleteDialogVisible = true
        this.deleteId = data.id
      }
    },
    handleNodeClick(data) {
      if (data.flag !== 1) {
        this.isShow = true
        this.title = '详情'
        if (data.id !== this.contentForm.botReportDevice.id) {
          this.contentLoading = true
          this.getDetail(data)
        }
      }
    },
    getDetail(data) {
      Promise.all([getBotDeviceInfo({ id: data.id }), getBotDeviceInfoCases({ deviceId: data.id, pageNum: 1, limit: 10000 })]).then(res => {
        if (res[0].data) {
          for (const key in this.contentForm.botReportDevice) {
            this.contentForm.botReportDevice[key] = res[0].data[key] || ''
            if (key === 'relactionPeopleId') this.contentForm.botReportDevice[key] = res[0].data[key] ? res[0].data[key].split(',').map(val => Number(val)) : []
          }
        }
        this.contentForm.botReportCases = res[1].data.records.map((val, index) => {
          return { ...val, index }
        })
        this.contentLoading = false
      })
    },
    async guzhangTap(type) {
      if (type === 'add') {
        this.contentForm.botReportCases.push({
          createTime: '', // 创建时间
          faultCase: '', // 故障原因
          id: '',
          processingMethod: '', // 处理方法
          reportId: '', // 报警规则ID
          index: this.contentForm.botReportCases.length
        })
      } else if (type === 'delete') {
        const selectTableList = this.$refs.tableRef.selection
        if (selectTableList.length === 0) return this.$message.warning('请至少勾选一条数据')
        this.deleteLoading = true
        const apiList = selectTableList.filter(val => val.id)
        if (apiList.length > 0) {
          await deleteCase(apiList.map(val => val.id))
        }
        for (let i = this.contentForm.botReportCases.length - 1; i >= 0; i--) {
          // eslint-disable-next-line no-labels
          first: for (let j = selectTableList.length - 1; j >= 0; j--) {
            if (this.contentForm.botReportCases[i].index === selectTableList[j].index) {
              this.contentForm.botReportCases.splice(i, 1)
              // eslint-disable-next-line no-labels
              break first
            }
          }
        }
        console.log(this.contentForm.botReportCases)
        for (let i = 0; i < this.contentForm.botReportCases.length; i++) {
          this.contentForm.botReportCases[i].index = i
        }
        this.deleteLoading = false
      }
    },
    submit() {
      this.$refs.contentFormRef.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const form = clone(this.contentForm)
          // 设备名称
          form.botReportDevice.deviceName = this.shebeiList.filter(val => val.id === form.botReportDevice.deviceId)[0].deviceName
          // 设备类型名称和设备类型parentId
          const deviceTypeArr = this.shebeitypeList.filter(val => val.id === form.botReportDevice.deviceTypeId)
          form.botReportDevice.deviceTypeName = deviceTypeArr[0].deviceTypeName
          form.botReportDevice.deviceTypeParentId = deviceTypeArr[0].parentId
          // 推送人员
          form.botReportDevice.relactionPeopleId = form.botReportDevice.relactionPeopleId.toString()
          // 测点名称
          // eslint-disable-next-line eqeqeq
          form.botReportDevice.pointName = this.cedianList.filter(val => val.id == form.botReportDevice.pointId)[0].pointName
          // 报警方式字典表文字值
          form.botReportDevice.reportFunctionStr = this.fangshiList.filter(val => val.id === form.botReportDevice.reportFunctionId)[0].dicValue
          // 报警类型名称
          form.botReportDevice.reportValue = this.typeList.filter(val => val.id === form.botReportDevice.reportId)[0].name
          // 报警等级名称
          form.botReportDevice.reportLeveStr = this.dengjiList.filter(val => val.id === form.botReportDevice.reportLeveId)[0].dicValue
          if (this.title === '新增') {
            saveBotReportDevice(form).then(() => {
              this.submitLoading = false
              this.$message.success('添加成功')
              this.getTreeDataFun()
            }).catch(() => {
              this.submitLoading = false
            })
          } else if (this.title === '编辑') {
            editBotReportDevice(form).then(() => {
              this.submitLoading = false
              this.$message.success('修改成功')
            }).catch(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    deleteAfirm() {
      this.deleteLoading = true
      deleteReportDevice({ id: this.deleteId }).then(res => {
        this.$message.success('删除成功')
        this.getTreeDataFun()
        this.deleteLoading = false
        this.deleteDialogVisible = false
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.content-right{
  padding: 20px;
  color: #fff;
  .big-title{
    font-size: 18px;
    margin: 0;
    margin-bottom: 20px;
    text-align: center;
  }
  .title{
    font-size: 18px;
    margin-bottom: 20px;
  }
  .con-bg{
    background: #164277;
    padding: 20px 30px;
    margin-bottom: 30px;
    ::v-deep.el-table{
      .el-form-item__content{
        margin: 0 0 15px 0 !important;
      }
    }
  }
}
::v-deep .el-textarea__inner{
  background: #164277;
  border: none;
  color: #fff;
}
</style>
