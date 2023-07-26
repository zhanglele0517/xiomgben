<template>
  <div class="content-box">
    <div class="boxd">
      <dv-border-box-10>
        <el-button type="primary"> 历史维护 </el-button>
      </dv-border-box-10>
    </div>
    <div>
      <el-button size="mini">维护计划</el-button>
      <el-button size="mini">历史维护</el-button>
      <el-button size="mini">维修记录</el-button>
    </div>
    <div class="block-s">
      <div class="block">
        <span class="demonstration">工作时间</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="请选择日期"
          style="width: 200px"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value1_1"
          type="datetime"
          placeholder="请选择日期"
          style="width: 200px"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">工作时间</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="请选择日期"
          style="width: 200px"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value1_1"
          type="datetime"
          placeholder="请选择日期"
          style="width: 200px"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="block-p">
      <div class="block-u">
        <span>工作项目</span>
        <el-input v-model="input" placeholder="搜素"></el-input>
      </div>
      <div class="block-u">
        <span>工作标准</span>
        <el-input v-model="input" placeholder="搜素"></el-input>
      </div>
      <div class="block-u">
        <span>执行人</span>
        <el-input v-model="input" placeholder="搜素"></el-input>
      </div>
      <div class="cah">
        <el-button type="primary" size="mini">查询</el-button>
      </div>
    </div>
    <div class="www">
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialogww('未完成')"
        >未完成</el-button
      >
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialog('完成')"
        >完成</el-button
      >
    </div>
    <div>
      <dv-border-box-10>
        <div style="padding: 20px">
          <el-table
            :header-row-style="{ background: 'transparent', color: '#fff' }"
            :header-cell-style="{ background: 'transparent' }"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />

            <el-table-column prop="shebei" align="center" label="工作项目" />
            <el-table-column prop="shijian" align="center" label="工作标准" />

            <el-table-column
              prop="cuoshi"
              align="center"
              label="计划执行时间"
            />
            <el-table-column prop="zhouqi" align="center" label="工作内容" />
            <el-table-column prop="xiaci" align="center" label="工作时间" />
            <el-table-column prop="zhixing" align="center" label="执行人" />
            <el-table-column prop="zhuangtai" align="center" label="工作状态" />
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

    <!-- 未完成 -->
    <el-dialog
      append-to-body
      :visible.sync="DialogVisibleww"
      width="35%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form :model="responseForm" label-width="120px" label-position="left">
        <div>
          <el-form-item label="设备名称">
            <el-input v-model="input" placeholder="吸收塔循环京"></el-input>
          </el-form-item>
          <el-form-item label="工作项目">
            <el-input v-model="input" placeholder="吸收塔循环京"></el-input>
          </el-form-item>
          <el-form-item label="工作标准">
            <el-input v-model="input" placeholder="5"></el-input>
          </el-form-item>
          <el-form-item label="计划执行时间">
            <el-input v-model="input" placeholder="5"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button
          size="medium"
          style="width: 100px; margin-right: 30px"
          @click="DialogVisibleww = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="width: 100px"
          size="medium"
          @click="DialogVisibleww = false"
          >提交</el-button
        >
      </el-row>
    </el-dialog>

    <!-- 完成 -->
    <el-dialog
      append-to-body
      :visible.sync="DialogVisible"
      width="35%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form :model="responseForm" label-width="100px" label-position="left">
        <div>
          <el-form-item label="工作内容">
            <el-input
              v-model="textarea"
              :rows="4"
              type="textarea"
              placeholder="请输入工作内容"
            />
          </el-form-item>
          <el-form-item label="工作时间">
            <el-input v-model="input" placeholder="" />
          </el-form-item>
          <el-form-item label="执行人">
            <el-select v-model="form.jizu"  style="width:420px;" size="mini" placeholder="普通用户">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button
          size="medium"
          style="width: 100px; margin-right: 30px"
          @click="DialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="width: 100px"
          size="medium"
          @click="DialogVisible = false"
          >提交</el-button
        >
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        jizu: "",
        gongkuang: "",
      },
      jizuList: [
        { label: "普通用户", value: "1" },
        { label: "中级用户", value: "2" },
        { label: "高级用户", value: "3" },
      ],
      input: "",
      value1: "", //时间
      DialogVisibleww: false, //未完成
      DialogVisible: false, //完成
      textarea: "",
      value1_1: "",
      tableData: [
        {
          shebei: "工作象奴",
          shijian: "5",
          cuoshi: "1",
          zhouqi: "1111",
          xiaci: "2022-08-01 00:00:00",
          zhixing: "普通用户",
          zhuangtai: "已完成",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 10,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 未完成
    openDialogww(title, data) {
      this.DialogTitle = title;
      this.DialogVisibleww = true;
      if (data) this.responseForm = data;
    },
    openDeleteDialog(data) {
      this.tapSelectedData = data;
      this.deleteDialogVisible = true;
    },

    // 完成
    openDialog(title, data) {
      this.DialogTitle = title;
      this.DialogVisible = true;
      if (data) this.responseForm = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.labelText {
  margin: 0 10px;
  color: #ffffff;
  // font-size: 12px;
}
::v-deep.el-input.is-disabled .el-input__inner {
  color: #666666 !important;
}

.form_naes {
  color: #ffffff;
}

.block-s {
  width: 100%;
  display: flex;
  color: #fff;
}
.block-s .block {
  width: 19%;
}
.block-s span {
  margin-right: 4%;
}
.block-u {
  display: flex;
  text-align: center;
  width: 25%;
}
.block-u span {
  width: 30%;
  margin-top: 2%;
}
.block-p {
  width: 100%;
  display: flex;
  color: #ffffff;
  margin-top: 2%;
}
.block-p .block-u {
  flex: 1;
  justify-content: first baseline;
}
.cah {
  //   margin-top: 0.5%;
  margin-left: 40%;
}
// button样式需更改
.buttonnas {
  margin-left: 25%;
  width: 20%;
}
.demonstration {
  color: #ffffff;
}

.input_cao {
  width: 300px;
  margin-top: 5%;
}

.boxd {
  width: 1600px;
  height: 300px;
  padding-left: 5%;
}
.www {
  width: 200px;
  height: 110px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 280px;
  left: 1350px;
}
</style>
