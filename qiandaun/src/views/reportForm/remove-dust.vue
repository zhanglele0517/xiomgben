<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.shijian"
            size="mini"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="选择参数">
          <el-select v-model="form.canshu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in canshuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择电厂">
          <el-select v-model="form.dianchang" size="mini" placeholder="请选择">
            <el-option
              v-for="item in dianchangList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">A列</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="margin: 6px 0 28px 0">
        <el-button size="mini" type="primary" @click="openDialog('新增')">新增</el-button>
      </div>
    </el-row>

    <div>
      <dv-border-box-10>
        <div style="padding: 20px">
          <el-table
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
              prop="shebei"
              align="center"
              label="时间"
            />
            <el-table-column
              prop="shijian"
              align="center"
              label="2A11"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
              <el-table-column width="10px" />
            </el-table-column>
            <el-table-column
              prop="shijian"
              align="center"
              label="2A12"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
              <el-table-column width="10px" />
            </el-table-column>
            <el-table-column
              prop="shijian"
              align="center"
              label="2A13"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
              <el-table-column width="10px" />
            </el-table-column>
            <el-table-column
              prop="shijian"
              align="center"
              label="2A14"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
              <el-table-column width="10px" />
            </el-table-column>
            <el-table-column
              prop="shijian"
              align="center"
              label="2A15"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
              <el-table-column width="10px" />
            </el-table-column>
            <el-table-column
              prop="shijian"
              align="center"
              label="2A21"
            >
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="一次电压 V" />
              <el-table-column label-class-name="columu-customized" width="60px" prop="shijian" align="center" label="闪络 次" />
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
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form :model="responseForm" label-width="110px" label-position="left">
        <el-form-item label="设计数值">
          <el-input v-model="responseForm.name" placeholder="请输入指标名称" size="small" />
        </el-form-item>
        <el-form-item label="工况字典">
          <el-select v-model="responseForm.shebei" size="mini" placeholder="请选择">
            <el-option
              v-for="item in zidianList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属设计时间ID">
          <el-select v-model="responseForm.type" size="mini" placeholder="请选择">
            <el-option
              v-for="item in shijianList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="机组">
          <el-select v-model="responseForm.reason" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button size="medium" style="width: 100px;margin-right: 30px" @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" style="width: 100px" size="medium" @click="DialogVisible = false">提交</el-button>
      </el-row>
    </el-dialog>
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
        <el-button type="primary" style="width: 100px" size="medium" @click="deleteAfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        shijian: '',
        dianchang: '',
        canshu: ''
      },
      nameList: [
        { label: '设计值1', value: '1' },
        { label: '设计值2', value: '2' },
        { label: '设计值3', value: '3' }
      ],
      dianchangList: [
        { label: '电厂1', value: '1' },
        { label: '电厂2', value: '2' },
        { label: '电厂3', value: '3' }
      ],
      canshuList: [
        { label: '参数1', value: '1' },
        { label: '参数2', value: '2' },
        { label: '参数3', value: '3' }
      ],
      jizuList: [
        { label: '机组1', value: '1' },
        { label: '机组2', value: '2' },
        { label: '机组3', value: '3' }
      ],
      tableData: [{
        shebei: '烟粉尘浓度',
        shijian: '30.00',
        yuanyin: '机组',
        cuoshi: '5',
        fsshijian: '2022-05-30  16:29:00'
      }, {
        shebei: '烟粉尘浓度',
        shijian: '30.00',
        yuanyin: '机组',
        cuoshi: '5',
        fsshijian: '2022-05-30  16:29:00'
      }, {
        shebei: '烟粉尘浓度',
        shijian: '30.00',
        yuanyin: '机组',
        cuoshi: '5',
        fsshijian: '2022-05-30  16:29:00'
      }],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false,
      DialogTitle: '新增', //
      zidianList: [
        { label: '工况字典1', value: '1' },
        { label: '工况字典2', value: '2' },
        { label: '工况字典3', value: '3' }
      ],
      shijianList: [
        { label: '时间1', value: '1' },
        { label: '时间2', value: '2' },
        { label: '时间3', value: '3' }
      ],
      responseForm: {
        name: '',
        shebei: '',
        type: '',
        reason: '',
        cuoshi: ''
      },
      deleteDialogVisible: false,
      tapSelectedData: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    openDialog(title, data) {
      this.DialogTitle = title
      this.DialogVisible = true
      if (data) this.responseForm = data
    },
    openDeleteDialog(data) {
      this.tapSelectedData = data
      this.deleteDialogVisible = true
    },
    deleteAfirm() {
      this.deleteDialogVisible = false
      console.log('删除成功')
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

::v-deep .el-table__header-wrapper{
  margin-bottom: 10px !important;
  th{
    border: none;
  }
}

</style>
