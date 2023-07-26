<template>
  <div class="content-box">
    <el-form ref="formRef" inline :model="form" class="demo-form-inline">
      <el-form-item label="是否替换原有数据">
        <el-radio-group v-model="form.isChange">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="机组" prop="unitId" :rules="{ required: true, message: '请选择机组'}">
        <el-select v-model="form.unitId" placeholder="请选择" size="mini">
          <el-option
            v-for="item in jizuList"
            :key="item.id"
            :label="item.unitName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceTypeId" :rules="{ required: true, message: '请选择设备类型'}">
        <el-select v-model="form.deviceTypeId" placeholder="请选择" size="mini" @change="typeChange">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-show="typeList2.length > 0" v-model="form.deviceTypeIdTwo" style="margin-left: 20px" placeholder="请选择" size="mini">
          <el-option
            v-for="item in typeList2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <dv-border-box-10>
        <div style="padding: 30px 50px 30px 80px">
          <el-form ref="responseFormRef" :model="responseForm">
            <el-timeline>
              <el-timeline-item hide-timestamp class="diyi">
                <el-row :gutter="40">
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="设备名称" prop="deviceName" :rules="{ required: true, message: '请输入设备名称'}">
                      <el-input v-model="responseForm.deviceName" placeholder="请输入设备名称" size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="出厂编号" prop="deviceCode" :rules="{ required: true, message: '请输入出厂编号'}">
                      <el-input v-model="responseForm.deviceCode" placeholder="请输入出厂编号" size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="设备型号" prop="deviceModel" :rules="{ required: true, message: '请输入设备型号'}">
                      <el-input v-model="responseForm.deviceModel" placeholder="请输入设备型号" size="small" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="供应商" prop="deviceFactoryId" :rules="{ required: true, message: '请选择供应商'}">
                      <el-select v-model="responseForm.deviceFactoryId" style="width: 100%" placeholder="请选择供应商" size="small">
                        <el-option
                          v-for="item in gongyingshangList"
                          :key="item.id"
                          :label="item.manufactorName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="出厂日期" prop="outFactoryTime" :rules="{ required: true, message: '请选择出厂日期'}">
                      <el-date-picker
                        v-model="responseForm.outFactoryTime"
                        style="width: 100%"
                        value-format="timestamp"
                        size="small"
                        type="date"
                        placeholder="选择出厂日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="一般寿命" prop="designLifetime" :rules="{ required: true, message: '请输入一般寿命'}">
                      <el-input v-model="responseForm.designLifetime" type="number" placeholder="请输入一般寿命" size="small" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :span="8">
                    <el-form-item style="margin: 0" label-width="80px" label="投运时间" prop="putIntoOperateTime" :rules="{ required: true, message: '请输入投运时间'}">
                      <el-date-picker
                        v-model="responseForm.putIntoOperateTime"
                        style="width: 100%"
                        value-format="timestamp"
                        size="small"
                        type="date"
                        placeholder="选择投运时间"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item style="margin: 0" label-width="80px" label="设备数量" prop="deviceCount" :rules="{ required: true, message: '请输入设备数量'}">
                      <el-input v-model="responseForm.deviceCount" type="number" placeholder="请输入设备数量" size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item style="margin: 0" label-width="80px" label="带电设备" prop="isElectricDevice" :rules="{ required: true, message: '请选择带电设备'}">
                      <el-select v-model="responseForm.isElectricDevice" style="width: 100%" placeholder="请选择带电设备" size="small">
                        <el-option
                          v-for="item in shebeiList"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-timeline-item>
              <el-timeline-item hide-timestamp class="dier">
                <el-form-item style="margin: 0" label-width="0px" prop="specifications" :rules="{ required: true, message: '请填写规格参数'}">
                  <el-input v-model="responseForm.specifications" :autosize="{minRows: 6}" :rows="6" type="textarea" />
                </el-form-item>
              </el-timeline-item>
              <el-timeline-item hide-timestamp class="disan">
                <el-form-item style="margin: 0" label-width="0px" prop="otherInformation" :rules="{ required: true, message: '请填写其他信息'}">
                  <el-input v-model="responseForm.otherInformation" :autosize="{minRows: 6}" :rows="6" type="textarea" />
                </el-form-item>
              </el-timeline-item>
              <el-timeline-item hide-timestamp class="disi">
                <el-form-item style="margin: 0;" label-width="0px" prop="imageUrl" :rules="{ required: true, message: '请上传设备图片'}">
                  <el-row type="flex">
                    <div>
                      <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :http-request="httpRequest"
                        :before-upload="beforeAvatarUpload"
                      >
                        <el-image v-if="responseForm.imageUrl" fit="cover" :src="responseForm.imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                      <span class="upload-label">支持png jpg</span>
                    </div>
                    <el-row type="flex" align="middle" style="margin: 0 20px;height: 90px">
                      <div style="display: flex;justify-content: center;flex-direction: column;">
                        <el-button style="display: block;margin-bottom: 10px;" size="mini" type="primary" @click="generate">生成二维码</el-button>
                        <el-button v-print="print" style="display: block;margin-left: 0;" size="mini" :disabled="!erweimaShow">打印</el-button>
                      </div>
                    </el-row>
                    <div v-if="erweimaShow" class="erweima">
                      <div id="qrcode" />
                    </div>
                  </el-row>
                </el-form-item>
              </el-timeline-item>
              <el-timeline-item hide-timestamp class="diwu">
                <el-row type="flex">
                  <el-button style="width: 80px" size="small" type="primary" :loading="buttonLoading" @click="save">保存</el-button>
                  <el-button style="width: 80px;margin-left: 30px" size="small" @click="$router.back()">取消</el-button>
                </el-row>
              </el-timeline-item>
            </el-timeline>
          </el-form>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
import { getMachine, getManufactor, addBotDeviceInfoMain, updateBotDeviceInfoMain, getBotDeviceInfoMainDetail } from '@/api/equipmentLifeCycle/equipment-entry'
import { getList } from '@/api/equipmentLifeCycle/equipment-type'
import { upload } from '@/api/common/index'
import QRCode from 'qrcodejs2'
import print from 'vue-print-nb'
export default {
  directives: {
    print
  },
  data() {
    return {
      form: {
        isChange: 0,
        unitId: '',
        deviceTypeId: '',
        deviceTypeIdTwo: ''
      },
      jizuList: [],
      typeList: [],
      typeList2: [],
      gongyingshangList: [],
      shebeiList: [
        { label: '带电', id: 1 },
        { label: '变压器', id: 2 },
        { label: '其他', id: 3 }
      ],
      responseForm: {
        deviceName: '',
        deviceCode: '',
        deviceModel: '',
        deviceFactoryId: '',
        outFactoryTime: '',
        designLifetime: '',
        putIntoOperateTime: '',
        deviceCount: '',
        isElectricDevice: '',
        specifications: '',
        otherInformation: '',
        imageUrl: '',
        qrCodeImageUrl: ''
      },
      buttonLoading: false,
      erweima: '',
      erweimaShow: false,
      print: {
        id: 'qrcode',
        previewTitle: '二维码',
        popTitle: ''
      }
    }
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    Promise.all([this.getMachineFun(), this.getListFun(), this.getManufactorFun()]).then(res => {
      loading.close()
      if (this.$route.query.id) {
        getBotDeviceInfoMainDetail({ id: this.$route.query.id }).then(res => {
          for (const key in this.form) {
            if (key === 'unitId' || key === 'isChange') {
              this.form[key] = Number(res.data[key])
            } else if (key === 'deviceTypeId') {
              for (let i = 0; i < this.typeList.length; i++) {
                if (this.typeList[i].id === res.data[key].toString()) {
                  this.form[key] = res.data[key].toString()
                  break
                }
                if (this.typeList[i].children) {
                  for (let j = 0; j < this.typeList[i].children.length; j++) {
                    console.log(this.typeList[i].id)
                    if (this.typeList[i].children[j].id === res.data[key].toString()) {
                      this.form.deviceTypeId = this.typeList[i].id
                      this.typeList2 = this.typeList[i].children
                      this.form.deviceTypeIdTwo = res.data[key].toString()
                      break
                    }
                  }
                }
              }
            } else if (key === 'deviceTypeIdTwo') {
              continue
            } else {
              this.form[key] = res.data[key]
            }
          }
          for (const key in this.responseForm) {
            if (key === 'deviceFactoryId' || key === 'isElectricDevice') {
              this.responseForm[key] = Number(res.data[key])
            } else {
              this.responseForm[key] = res.data[key]
            }
          }
        })
      }
    })
  },
  methods: {
    // 将base64转换为blob
    dataURLtoFile(dataURI, type) {
      const binary = atob(dataURI.split(',')[1])
      const array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], { type: type })
    },
    typeChange(e) {
      const obj = this.typeList.filter(val => val.id === e)[0]
      if (obj.children) {
        this.typeList2 = obj.children
        this.form.deviceTypeIdTwo = obj.children[0].id
      } else {
        this.typeList2 = []
        this.form.deviceTypeIdTwo = ''
      }
    },
    getMachineFun() {
      return getMachine().then(res => {
        this.jizuList = res.data
      })
    },
    getManufactorFun() {
      return getManufactor().then(res => {
        this.gongyingshangList = res.data
      })
    },
    getListFun() {
      return getList().then(res => {
        this.typeList = res.data
      })
    },
    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$refs.responseFormRef.validate((valid) => {
            if (valid) {
              this.buttonLoading = true
              const endFun = () => {
                this.buttonLoading = false
                this.$message.success('保存成功')
                setTimeout(() => {
                  this.$router.back()
                }, 2000)
              }
              const object = { ...this.form, ...this.responseForm }
              if (this.typeList2.length > 0) object.deviceTypeId = object.deviceTypeIdTwo
              if (this.$route.query.id) {
                object.id = this.$route.query.id
                updateBotDeviceInfoMain(object).then(res => {
                  endFun()
                }).catch(() => {
                  this.buttonLoading = false
                })
              } else {
                addBotDeviceInfoMain(object).then(res => {
                  endFun()
                }).catch(() => {
                  this.buttonLoading = false
                })
              }
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) return this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      if (!isLt2M) return this.$message.error('上传图片大小不能超过 2MB!')
    },
    httpRequest(data) {
      const params = new FormData()
      params.append('file', data.file)
      upload(params).then(res => {
        this.responseForm.imageUrl = res.data
      })
    },
    generate() {
      if (!this.responseForm.imageUrl) return this.$message.warning('请先上传照片')
      this.erweimaShow = true
      this.$nextTick(() => {
        this.erweima = new QRCode('qrcode', {
          text: 'www.baidu.com', // 二维码内容
          width: 89,
          height: 89,
          render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-timeline-item__tail{
    border-image: linear-gradient(#50f3ee, #5e70eb) 2 2;
  }
  ::v-deep .el-timeline-item__node{
    background: #3270eb;
    box-shadow: 0px 0px 7px 1px #6eecff, inset 0px 0px 6px 1px #5ffffa;
    position: relative;
    &::before{
      position: absolute;
      color: #50F3EE;
      font-size: 15px;
      left: -75px;
      top:0;
    }
    &::after{
      position: absolute;
      content: '';
      height: 7px;
      width: 7px;
      border-radius: 5px 5px 5px 5px;
      right: -12px;
      top:3px;
      background: #3270EB;
      box-shadow: 0px 0px 7px 1px #6EECFF, inset 0px 0px 6px 1px #5FFFFA;
    }
  }
  ::v-deep .el-timeline-item__wrapper{
    padding-left: 75px;
  }
  .diyi{
    ::v-deep .el-timeline-item__node{
      &::before{
        content: '基本信息';
      }
    }
  }
  .dier{
    ::v-deep .el-timeline-item__node{
      &::before{
        content: '规格参数';
      }
    }
  }
  .disan{
    ::v-deep .el-timeline-item__node{
      &::before{
        content: '其他信息';
      }
    }
  }
  .disi{
    ::v-deep .el-timeline-item__node{
      &::before{
        content: '上传照片';
      }
    }
  }
  .diwu{
    ::v-deep .el-timeline-item__node{
      &::before{
        content: '提交保存';
      }
    }
  }
  .avatar-uploader{
    line-height: normal;
    ::v-deep.el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
  .upload-label{
    display: inline-block;
    color: #fff;
    text-align: center;
    width: 90px;
    margin-top: 5px;
    line-height: normal;
  }
  .erweima{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    height: 92px;
    width: 92px;
  }
  ::v-deep .el-textarea__inner{
    background: #164277;
    color: #fff;
    border: none;
    padding: 15px 20px;
  }
</style>

<style media="print">
@page {
  size: auto; /* auto is the initial value */
  margin: 3mm; /* this affects the margin in the printer settings */
}
</style>
