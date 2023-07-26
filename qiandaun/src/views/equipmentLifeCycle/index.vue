<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="寿命类型">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-select v-model="form.jizu" size="mini" placeholder="请输入内容  ">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="折算系数k类型">
          <el-select v-model="form.gongkuang" size="mini" placeholder="请选择">
            <el-option
              v-for="item in gongkuangList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="健康指数">
          <el-select v-model="form.gongkuang" size="mini" placeholder="请选择">
            <el-option
              v-for="item in gongkuangList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">查询</el-button>
        </el-form-item> </el-form
      ><br />
      <!-- //？此处需修改     -->
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialog('添加')"
        >新增</el-button
      >

      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialog('配置')"
        >配置</el-button
      >
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialog('导出')"
        >导出</el-button
      >
    </el-row>

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

            <el-table-column prop="shebei" align="center" label="设备名称" />
            <el-table-column prop="shijian" align="center" label="寿命类型" />
            <el-table-column
              prop="yuanyin"
              align="center"
              label="折算系数k类型"
            />
            <el-table-column prop="cuoshi" align="center" label="测点名称" />
            <el-table-column prop="biaoshi" align="center" label="测算标识" />
            <el-table-column
              prop="shesuan"
              align="center"
              label="折算运行时长"
            />
            <el-table-column prop="fsshijian" align="center" label="健康指数" />
            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  style="margin-left: 20px"
                  @click="openDialog('配置', scope.row)"
                  >配置</el-button
                >
                <el-button
                  size="medium"
                  type="text"
                  style="color: red; margin-left: 20px"
                  @click="openDeleteDialog"
                  >删除</el-button
                >
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
        <span>{{ DialogTitle }}</span>
      </div>
      <!-- 新增 -->
      <el-form :model="responseForm" label-width="110px" label-position="left">
        <el-form-item label="设备名称">
          <el-select
            v-model="form.jizu"
            style="width: 660px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="寿命类型">
          <el-select
            v-model="form.jizu"
            style="width: 660px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="系数依据">
          <el-select
            v-model="form.jizu"
            style="width: 660px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="测点名称">
          <el-select
            v-model="form.jizu"
            style="width: 660px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="初始时间">
          <el-input v-model="input" placeholder="请输入小时"></el-input>
        </el-form-item>
        <el-form-item label="出厂/运行时间">
          <el-radio v-model="radio" label="1">投运时间</el-radio>
          <el-radio v-model="radio" label="2">出厂时间</el-radio>
        </el-form-item>
        <el-form-item label="系统运行时间">
          <el-input
            v-model="input1"
            placeholder="2022 05-27 00:00:00"
          ></el-input>
        </el-form-item>
        <el-form-item label="出厂时间">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 660px"
            >
            </el-date-picker>
          </div>
        </el-form-item>
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
      <p style="color: #ffffff; text-align: center; margin: 0 0 30px 0">
        确定要删除该内容？
      </p>
      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-button
          size="medium"
          style="width: 100px; margin-right: 30px"
          @click="deleteDialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="width: 100px"
          size="medium"
          @click="deleteAfirm"
          >确定</el-button
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
        { label: "煤种1", value: "1" },
        { label: "煤种1", value: "2" },
        { label: "煤种1", value: "3" },
      ],
      gongkuangList: [
        { label: "国电三联1", value: "1" },
        { label: "国电三联2", value: "2" },
        { label: "国电三联3", value: "3" },
      ],
      tableData: [
        {
          shebei: "压力变速器",
          shijian: "不折算类设备",
          yuanyin: "无",
          cuoshi: "———",
          biaoshi: "———",
          shesuan: "85940",
          fsshijian: "0.97",
        },
        {
          shebei: "压力变速器",
          shijian: "不折算类设备",
          yuanyin: "无",
          cuoshi: "———",
          biaoshi: "———",
          shesuan: "85940",
          fsshijian: "0.97",
        },
        {
          shebei: "压力变速器",
          shijian: "不折算类设备",
          yuanyin: "无",
          cuoshi: "———",
          biaoshi: "———",
          shesuan: "85940",
          fsshijian: "0.97",
        },
        {
          shebei: "压力变速器",
          shijian: "不折算类设备",
          yuanyin: "无",
          cuoshi: "———",
          biaoshi: "———",
          shesuan: "85940",
          fsshijian: "0.97",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false,
      DialogTitle: "新增", //
      responseForm: {
        cuoshi: "",
        name: "",
        shebei: "",
        type: "",
        reason: "",
      },
      deleteDialogVisible: false,
      tapSelectedData: {},
      radio: "1", //投运时间
      value1: "", //时间
      input: "", //初始时间
      input1: "", //出厂时间
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //编辑
    openDialog(title, data) {
      this.DialogTitle = title;
      this.DialogVisible = true;
      if (data) this.responseForm = data;
    },
    openDeleteDialog(data) {
      this.tapSelectedData = data;
      this.deleteDialogVisible = true;
    },
    deleteAfirm() {
      this.deleteDialogVisible = false;
      console.log("删除成功");
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
</style>
