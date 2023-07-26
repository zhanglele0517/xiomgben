<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="寿命类型id">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="寿命类型id">
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
        @click="openDialog('新增')"
        >新增</el-button
      >
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDeleteDialog('删除')"
        >删除</el-button
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

            <el-table-column prop="shebei" align="center" label="寿命类型id" />
            <el-table-column prop="shijian" align="center" label="寿命类型id" />
            <el-table-column prop="yuanyin" align="center" label="工况" />
            <el-table-column prop="cuoshi" align="center" label="系数" />
            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('编辑', scope.row)"
                  >编辑</el-button
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
      width="40%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <!-- 新增 -->
      <el-form :model="responseForm" label-width="120px" label-position="left">
        <el-form-item label="寿命类型id">
          <el-select
            v-model="form.jizu"
            style="width: 400px"
            size="mini"
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
            v-model="form.gongkuang"
            style="width: 400px"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in gongkuangList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
       <el-form-item label="工况">
            <el-input v-model="input" size="small" style="width:400px" placeholder="-40"></el-input>
        </el-form-item>
           <el-form-item label="系数值">
            <el-input v-model="input1" size="small" style="width:400px" placeholder="1"></el-input>
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
        { label: "变压器", value: "1" },
        { label: "变压器", value: "2" },
        { label: "变压器", value: "3" },
      ],
      gongkuangList: [
        { label: "环境温度", value: "1" },
        { label: "环境温度", value: "2" },
        { label: "环境温度", value: "3" },
      ],
      tableData: [
        {
          shebei: "变压器",
          shijian: "环境温度",
          yuanyin: "-40",
          cuoshi: "1",
        },
        {
          shebei: "变压器",
          shijian: "环境温度",
          yuanyin: "-40",
          cuoshi: "1",
        },
        {
          shebei: "变压器",
          shijian: "环境温度",
          yuanyin: "-40",
          cuoshi: "1",
        },
        {
          shebei: "变压器",
          shijian: "环境温度",
          yuanyin: "-40",
          cuoshi: "1",
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
      input:'',//工况
      input1:'',//系数值
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
