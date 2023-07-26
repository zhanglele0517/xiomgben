<template>
  <div class="content-box">
    <div class="block-s">
      <div class="block">
        <span class="demonstration">时间</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value1_1"
          type="datetime"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </div>
      <div class="block-u">
        <span>操作人</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="cah">
        <el-button type="primary" size="mini">查询</el-button>
      </div>

      <div class="buttonnas">
        <el-button
          style="margin: 38px 0 28px 0"
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
          @click="openDialog('详情')"
          >详情</el-button
        >
      </div>
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

            <el-table-column prop="shebei" align="center" label="时间" />
            <el-table-column prop="shijian" align="center" label="操作人" />

            <el-table-column prop="cuoshi" align="center" label="煤种信息" />

            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('详情', scope.row)"
                  >详情</el-button
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
      <el-form :model="responseForm" align="center" label-width="110px" label-position="left">
        <div class="block_us">
          <span class="demonstration">时间</span>
          <el-date-picker 
            v-model="value1"
            type="datetime"
            placeholder="2022-07-23 00:00:00"
          >
          </el-date-picker>

          <div>
            <span class="demonstration">操作人</span>
            <el-input class="input_cao" placeholder="普通用户"/>
          </div>
        </div>
      
      </el-form>
      <el-row type="flex" justify="center" style="margin-top:20px">
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
      value1: "", //时间
      value1_1: "",
      tableData: [
        {
          shebei: "2022-05-23 00:00:00",
          shijian: "普通用户",
          cuoshi: "详情",
        },
        {
          shebei: "2022-05-23 00:00:00",
          shijian: "普通用户",
          cuoshi: "详情",
        },
        {
          shebei: "2022-05-23 00:00:00",
          shijian: "普通用户",
          cuoshi: "详情",
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
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //详情
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

.block-s {
  width: 100%;
  display: flex;
  color: #fff;
}
.block-s .block {
  width: 15%;
}
.block-s span {
  margin-right: 4%;
}
.block-u {
  display: flex;
  width: 20%;
}
.block-u span {
  width: 25%;
  margin-top: 2%;
}
.cah {
  margin-top: 0.5%;
  margin-left: 1%;
}
// button样式需更改
.buttonnas {
  margin-left: 25%;
  width: 20%;
}
.demonstration{
    color: #ffffff;
}

.input_cao{
    width: 300px;
    margin-top: 5%;
}



</style>


