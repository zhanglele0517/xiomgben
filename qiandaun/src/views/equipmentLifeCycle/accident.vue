<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="发生时间">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px; background: #0E2967"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="事件名称">
          <el-input
            v-model="input"
            style="width: 180px"
            size="mini"
            placeholder=""
          />
        </el-form-item>

        <el-form-item label="事件类型">
          <el-select
            v-model="form.jizu"
            size="mini"
            placeholder="请选择事件类型"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="上报人">
          <el-input
            v-model="input"
            style="width: 180px"
            size="mini"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <br />
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

            <el-table-column prop="shebei" align="center" label="事件名称" />
            <el-table-column prop="shijian" align="center" label="事件类型" />
            <el-table-column prop="yuanyin" align="center" label="事件详情" />
            <el-table-column prop="cuoshi" align="center" label="发生时间" />
            <el-table-column prop="fsshijian" align="center" label="上报人" />
            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('修改', scope.row)"
                  >修改</el-button
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
      width="35%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <!-- 新增 -->
      <el-form :model="responseForm" label-width="140px" label-position="left">
        <el-form-item label="事件名称">
          <el-input
            v-model="input"
            style="width: 300px"
            size="mini"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="事件类型">
          <el-select
            v-model="form.jizu"
            style="width: 300px"
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
        <el-form-item label="发生时间">
          <el-select
            v-model="form.jizu"
            style="width: 300px"
            size="mini"
            placeholder="2022-06-26 00:00:00"
          >
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件详情">
          <el-input
            class="inputt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>  <el-form-item label="上报人">
          <el-input
            v-model="input"
            placeholder="普通用户"
            size="mini"
            style="width:300px"
          ></el-input>
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
      <p style="color: #ffffff; text-align: center; margin: 10px 0 30px 0">
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
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      jizuList: [
        { label: "人身安全事故", value: "1" },
        { label: "安全事故", value: "2" },
        { label: "解构安全事故", value: "3" },
      ],
      tableData: [
        {
          shebei: "22",
          shijian: "人身安全事故",
          yuanyin: "4.01B441",
          cuoshi: "2022-06-26 00:00:00",
          fsshijian: "普通客户",
        },
        {
          shebei: "22",
          shijian: "安全事故",
          yuanyin: "4.01B441",
          cuoshi: "2022-06-26 00:00:00",
          fsshijian: "普通客户",
        },
        {
          shebei: "22",
          shijian: "解构安全事故",
          yuanyin: "4.01B441",
          cuoshi: "2022-06-26 00:00:00",
          fsshijian: "普通客户",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false,
      DialogTitle: "新增", //

      input: "",
      responseForm: {
        cuoshi: "",
        name: "",
        shebei: "",
        type: "",
        reason: "",
      },
      deleteDialogVisible: false,
      tapSelectedData: {},
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
.inputt {
  height: 150px;
  width: 300px;
  // border: 1px solid red;s
  background: #ffffff;
}
</style>
