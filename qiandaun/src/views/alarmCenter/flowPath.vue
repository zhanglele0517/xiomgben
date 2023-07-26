<template>
  <div class="content-box">
    <el-form inline :model="form" class="demo-form-inline">
      <el-form-item>
        <el-radio-group v-model="form.alarmState">
          <el-radio
            v-for="(item, index) in radioList"
            :key="index"
            :label="item.value"
            @change="valueChange"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="事件名称">
        <el-input v-model="form.eventName" placeholder="搜索" size="mini">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
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
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" :loading="tableLoading" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <dv-border-box-10>
        <div v-loading="tableLoading" element-loading-background="rgba(0, 0, 0, 0.7)" style="padding: 80px 50px 20px 50px">
          <el-row v-if="dataList.length === 0" type="flex" justify="center">
            <span style="color: #909399;font-size: 14px;line-height: 60px">暂无数据</span>
          </el-row>
          <div
            v-for="(item, index) in dataList"
            :key="index"
            class="data-item"
            :style="{marginBottom: index === dataList.length-1 ? '80px' : '120px'}"
            @click="itemTap(item)"
          >
            <div class="sort">
              <p class="title">事件名称</p>
              <span>{{ index >= 9 ? "" : 0 }}{{ index + 1 }}</span>
              <p class="label-title red">{{ item.eventName }}</p>
            </div>
            <div class="number circle bright">
              <div class="little-circle bright" />
              <p class="title">数值</p>
              <p class="label-title red">{{ item.alarmValue }}</p>
            </div>
            <div class="begin circle bright">
              <div class="little-circle bright" />
              <p class="title">开始时间</p>
              <p class="label-title">{{ item.createDate }}</p>
            </div>
            <div class="none circle bright">
              <div class="little-circle bright" />
            </div>
            <div class="reason circle bright">
              <div class="little-circle bright" />
              <p class="title">原因分析</p>
              <p class="label-title">
                {{ item.alarmCause }}
              </p>
            </div>
            <div
              class="response circle"
              :class="{ bright: item.alarmState !== 1 }"
            >
              <img
                v-if="item.alarmState === 1"
                src="@/assets/img/wind-car.png"
                class="select-icon"
              >
              <div
                v-if="item.alarmState !== 1"
                class="little-circle"
                :class="{ bright: item.alarmState !== 1 }"
              />
              <p class="title" :class="{ red: item.alarmState === 1 }">
                {{ item.alarmState === 1 ? '待响应' : '已响应' }}
              </p>
              <p class="label-title" :class="{ red: item.alarmState === 1 }">
                {{
                  item.alarmState === 1 ? item.responseDelay : item.responseTime
                }}
              </p>
            </div>
            <div
              class="handle circle"
              :class="{
                bright: item.alarmState !== 1 && item.alarmState !== 2,
              }"
            >
              <img
                v-if="item.alarmState === 2"
                src="@/assets/img/wind-car.png"
                class="select-icon"
              >
              <div
                v-if="item.alarmState !== 2"
                class="little-circle"
                :class="{
                  bright: item.alarmState !== 2 && item.alarmState !== 1,
                }"
              />
              <p class="title">
                {{
                  item.alarmState === 3 || item.alarmState === 4
                    ? "已处理"
                    : "待处理"
                }}
              </p>
              <p class="label-title" :class="{ red: item.alarmState === 1 }">
                {{
                  item.alarmState === 3 || item.alarmState === 4
                    ? item.handleTime
                    : item.handleDelay
                }}
              </p>
            </div>
            <div class="evaluate circle">
              <img
                v-if="item.alarmState === 3"
                src="@/assets/img/wind-car-yellow.png"
                class="select-icon"
              >
              <div v-if="item.alarmState === 4" class="complete" />
              <div
                v-if="item.alarmState !== 3 && item.alarmState !== 4"
                class="little-circle"
              />
              <p class="title">
                {{ item.alarmState === 4 ? "已完成" : "待评价" }}
              </p>
            </div>
            <div class="progress" :style="{ width: item.alarmState === 1 ? '79.7%' : item.alarmState === 2 ? '92%' : '100%' }" />
          </div>
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
      :visible.sync="responseDialogVisible"
      width="20%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>待响应</span>
      </div>
      <div class="box">
        <p class="Copywriting">事件名称：{{ selectData.eventName }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="responseDialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" :loading="DialogLoading" type="primary" size="medium" @click="closeTap('responseDialogVisible')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="handleDialogVisible"
      width="45%"
      center
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dialog-title">
        <span>待处理</span>
      </div>
      <div class="box">
        <el-form ref="handleDialogVisibleRef" :model="handleForm" label-width="80px" :rules="handleFormRules">
          <p style="font-size: 16px;margin-bottom: 20px">报警信息</p>
          <el-row style="font-size: 14px;margin-bottom: 20px;">
            <el-col :span="10">事件名称：{{ selectData.eventName }}</el-col>
            <el-col :span="6">报警极值：{{ selectData.alarmValue }}</el-col>
            <el-col :span="8">开始时间：{{ selectData.createDate }}</el-col>
          </el-row>
          <el-form-item label="原因分析" prop="alarmCause">
            <el-input v-model="handleForm.alarmCause" placeholder="请输入原因分析" size="small" />
          </el-form-item>
          <el-form-item label="处理措施" prop="handleMode">
            <el-input v-model="handleForm.handleMode" placeholder="请输入处理措施" size="small" />
          </el-form-item>
          <p style="font-size: 16px;margin: 30px 0 20px 0">处理信息</p>
          <el-row style="font-size: 14px;margin-bottom: 20px;">
            <el-col :span="8">响应时间：{{ selectData.responseTime }}</el-col>
            <el-col :span="8">响应人:</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="处理时间" prop="handleTime">
                <el-date-picker
                  v-model="handleForm.handleTime"
                  style="width: 190px"
                  value-format="timestamp"
                  size="small"
                  type="datetime"
                  placeholder="选择处理时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理人" prop="sysUserId">
                <el-select v-model="handleForm.sysUserId" placeholder="请选择处理人" size="small">
                  <el-option
                    v-for="item in renoptions"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <span style="margin-right: 30px;">原因分析是否准确</span>
            <el-radio-group v-model="handleForm.alarmTrue">
              <el-radio :label="1">准确</el-radio>
              <el-radio :label="2">不准确</el-radio>
            </el-radio-group>
          </div>
          <div v-if="handleForm.alarmTrue === 2" style="margin-top: 20px">
            <el-form-item label="原因分析" prop="falseAlarmCause">
              <el-input v-model="handleForm.falseAlarmCause" placeholder="请输入原因分析" size="small" />
            </el-form-item>
            <el-form-item label="处理措施" style="margin: 0" prop="falseAlarmCause">
              <el-input v-model="handleForm.falseHandleMode" placeholder="请输入处理措施" size="small" />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleDialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" :loading="DialogLoading" type="primary" size="medium" @click="closeTap('handleDialogVisible')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="evaluateDialogVisible"
      width="45%"
      center
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dialog-title">
        <span>待评价</span>
      </div>
      <div class="box">
        <p style="font-size: 16px;margin-bottom: 20px">报警信息</p>
        <el-row style="font-size: 14px;margin-bottom: 20px;">
          <el-col :span="10">事件名称：{{ selectData.eventName }}</el-col>
          <el-col :span="6">报警极值：{{ selectData.alarmValue }}</el-col>
          <el-col :span="8">开始时间：{{ selectData.createDate }}</el-col>
        </el-row>
        <p style="margin-bottom: 30px">原因分析：{{ selectData.alarmCause }}</p>
        <p style="font-size: 16px;margin: 20px 0">处理信息</p>
        <el-row style="font-size: 14px;margin-bottom: 20px;">
          <el-col :span="8">响应时间：{{ selectData.responseTime }}</el-col>
          <el-col :span="8">响应人：{{ selectData.responsePersonId }}</el-col>
          <el-col :span="8">处理时间：{{ selectData.handleTime }}</el-col>
        </el-row>
        <el-row style="font-size: 14px;margin-bottom: 30px;">
          <el-col :span="8">处理人：{{ selectData.handlePersonId }}</el-col>
          <el-col :span="8">处理措施：{{ selectData.handleMode }}</el-col>
        </el-row>
        <p style="font-size: 16px;margin-bottom: 20px">评价信息</p>
        <el-form ref="evaluateDialogVisibleRef" :model="evaluateForm" label-width="96px" :rules="evaluateFormRules">
          <el-form-item label="处理措施评价" style="margin: 0" prop="appraiseContent">
            <el-input v-model="evaluateForm.appraiseContent" placeholder="请输入处理措施评价" size="small" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="evaluateDialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" :loading="DialogLoading" type="primary" size="medium" @click="closeTap('evaluateDialogVisible')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="completeDialogVisible"
      width="45%"
      center
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dialog-title">
        <span>已完成</span>
      </div>
      <div class="box">
        <p style="font-size: 16px;margin-bottom: 20px">报警信息</p>
        <el-row type="flex" justify="space-between" style="font-size: 14px;margin-bottom: 20px;">
          <p>事件名称：{{ selectData.eventName }}</p>
          <p>报警极值：{{ selectData.alarmValue }}</p>
          <p>开始时间：{{ selectData.createDate }}</p>
        </el-row>
        <p style="margin-bottom: 30px">原因分析：{{ selectData.alarmCause }}</p>
        <p style="font-size: 16px;margin: 20px 0">处理信息</p>
        <el-row style="font-size: 14px;margin-bottom: 20px;">
          <el-col :span="8">响应时间：{{ selectData.responseTime }}</el-col>
          <el-col :span="8">响应人：{{ selectData.responsePersonId }}</el-col>
          <el-col :span="8">处理时间：{{ selectData.handleTime }}</el-col>
        </el-row>
        <el-row style="font-size: 14px;margin-bottom: 30px;">
          <el-col :span="8">处理人：{{ selectData.handlePersonId }}</el-col>
          <el-col :span="8">处理措施：{{ selectData.handleMode }}</el-col>
        </el-row>
        <p style="font-size: 16px;margin-bottom: 20px">评价信息</p>
        <p>{{ selectData.appraiseContent }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="completeDialogVisible = false">取 消</el-button>
        <el-button style="margin-left: 40px" type="primary" size="medium" @click="completeDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getRelacationUser, trueHandle, trueEvaluate, trueResponse } from '@/api/alarmCenter/flowPath'
export default {
  data() {
    return {
      form: {
        alarmState: 1,
        eventName: '',
        tagName: '',
        startTime: '',
        endTime: ''
      },
      radioList: [
        { label: '待响应', value: 1 },
        { label: '待处理', value: 2 },
        { label: '待评价', value: 3 },
        { label: '已完成', value: 4 }
      ],
      dataList: [],
      responseDialogVisible: false,
      handleDialogVisible: false,
      handleForm: {
        alarmCause: '',
        handleMode: '',
        handleTime: '',
        alarmTrue: 1,
        sysUserId: '',
        newreason: '',
        newcuoshi: ''
      },
      handleFormRules: {
        alarmCause: [
          { required: true, message: '请输入原因分析' }
        ],
        handleMode: [
          { required: true, message: '请输入处理措施' }
        ],
        handleTime: [
          { required: true, message: '请选择处理时间' }
        ],
        alarmTrue: [
          { required: true, message: '请选择原因分析是否准确' }
        ],
        sysUserId: [
          { required: true, message: '请选择处理人' }
        ],
        falseAlarmCause: [
          { required: true, message: '请输入原因分析' }
        ],
        falseHandleMode: [
          { required: true, message: '请输入处理措施' }
        ]
      },
      renoptions: [],
      evaluateDialogVisible: false,
      evaluateForm: {
        appraiseContent: ''
      },
      evaluateFormRules: {
        appraiseContent: [
          { required: true, message: '请输入评价' }
        ]
      },
      completeDialogVisible: false,
      currentPage: 1, // 当前页数
      pageSize: 10, // 分页每页条数
      total: 0, // 用户总数
      tableLoading: false,
      selectData: {},
      DialogLoading: false
    }
  },
  mounted() {
    this.getRelacationUserFun()
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
        this.dataList = res.data.records
        this.tableLoading = false
      })
    },
    getRelacationUserFun() {
      return getRelacationUser().then(res => {
        this.renoptions = res.data
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
    itemTap(data) {
      this.selectData = data
      if (data.alarmState === 1) {
        this.responseDialogVisible = true
      } else if (data.alarmState === 2) {
        this.handleDialogVisible = true
      } else if (data.alarmState === 3) {
        this.evaluateDialogVisible = true
      } else if (data.alarmState === 4) {
        this.completeDialogVisible = true
      }
    },
    valueChange(e) {
      this.currentPage = 1
      this.getListFun()
    },
    handleClose() {

    },
    closeTap(variable) {
      const endFun = (title) => {
        this.DialogLoading = false
        this.$message.success(title)
        this[variable] = false
        this.getListFun()
      }
      // 响应
      if (variable === 'responseDialogVisible') {
        this.DialogLoading = true
        trueResponse({ id: this.selectData.id }).then(() => {
          endFun('响应成功')
        }).catch(() => {
          this.DialogLoading = false
        })
      // 处理
      } else if (variable === 'handleDialogVisible') {
        this.$refs[`${variable}Ref`].validate((valid) => {
          if (valid) {
            this.DialogLoading = true
            trueHandle({ id: this.selectData.id, ...this.handleForm }).then(res => {
              endFun('处理成功')
            }).catch(() => {
              this.DialogLoading = false
            })
          } else {
            return false
          }
        })
      // 评价
      } else if (variable === 'evaluateDialogVisible') {
        this.$refs[`${variable}Ref`].validate((valid) => {
          if (valid) {
            this.DialogLoading = true
            trueEvaluate({ id: this.selectData.id, ...this.evaluateForm }).then(res => {
              endFun('评价成功')
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
}
</script>

<style lang="scss" scoped>
.labelText {
  margin: 0 10px;
  color: #ffffff;
  // font-size: 12px;
}
.data-item {
  border-radius: 20px;
  height: 6px;
  border: 1px solid #5e70eb;
  display: flex;
  position: relative;
  .sort {
    width: 26px;
    height: 26px;
    background: #3270eb;
    box-shadow: 0px 0px 7px 1px #6eecff, inset 0px 0px 6px 1px #5ffffa;
    border-radius: 13px 13px 13px 13px;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    top: -10px;
    left: -13px;
    .title {
      width: 56px;
      color: #ffffff;
      position: absolute;
      top: -45px;
    }
    .label-title {
      width: 250px;
      color: #ffffff;
      position: absolute;
      text-align: left;
      // line-height: 12px;
    }
  }
  .progress {
    background-image: linear-gradient(to right, #50f3ee, #5e70eb);
    border-radius: 10px;
    height: 100%;
  }
  .circle {
    width: 10px;
    height: 10px;
    background: #ada9a9;
    border-radius: 5px 5px 5px 5px;
    opacity: 0.89;
    position: absolute;
    top: -2px;
    .select-icon {
      width: 34px;
      height: 34px;
      position: absolute;
      top: -14px;
      left: -12px;
    }
    .little-circle {
      width: 7px;
      height: 7px;
      background: #ada9a9;
      border-radius: 5px 5px 5px 5px;
      position: relative;
      top: -12px;
      left: 1.51px;
    }
    .title {
      font-size: 12px;
      color: #ffffff;
      position: absolute;
      top: -45px;
    }
    .label-title {
      color: #ffffff;
      font-size: 12px;
      position: absolute;
      top: 16px;
    }
  }
  .number {
    left: 18.5%;
    .title {
      width: 28px;
    }
  }
  .begin {
    left: 27.4%;
    .title {
      width: 56px;
    }
    .label-title {
      width: 158px;
    }
  }
  .none {
    left: 43%;
  }
  .reason {
    left: 53.5%;
    .title {
      width: 56px;
    }
    .label-title {
      left: -110px;
      width: 224px;
      text-align: center;
    }
  }
  .response {
    left: 79.7%;
    .title {
      width: 56px;
    }
    .label-title {
      left: -75px;
      text-align: center;
      width: 158px;
    }
  }
  .handle {
    left: 92%;
    .title {
      width: 56px;
    }
    .label-title {
      left: -75px;
      text-align: center;
      width: 158px;
    }
  }
  .evaluate {
    right: -2px;
    .title {
      width: 56px;
    }
    .complete {
      width: 26px;
      height: 26px;
      background: #3270eb;
      box-shadow: 0px 0px 7px 1px #6eecff, inset 0px 0px 6px 1px #5ffffa;
      border-radius: 13px 13px 13px 13px;
      position: absolute;
      top: -10px;
      left: -6.5px;
    }
  }
  .bright {
    background: #3270eb;
    box-shadow: 0px 0px 7px 1px #6eecff, inset 0px 0px 6px 1px #5ffffa;
  }
}
.red {
  color: #ea0a19 !important;
}
</style>
