<template>
  <div class="content-box">
    <div class="boxd">
      <dv-border-box-10>
        <el-button type="primary">历史维护</el-button>
      </dv-border-box-10>
    </div>
    <div>
      <el-button size="mini">维护计划</el-button>
      <el-button size="mini">历史维护</el-button>
      <el-button size="mini">维修记录</el-button>
    </div>
    <div class="ader">
      <el-row type="flex" justify="space-between">
        <el-form inline :model="form" class="demo-form-inline">
          <div class="block-s">
            <div class="block">
              <span class="demonstration">工作时间</span>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="请选择日期"
                style="width: 200px"
                size="mini"
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
                size="mini"
              >
              </el-date-picker>
            </div>
            <div class="block">
              <span class="demonstration">结束时间</span>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="请选择日期"
                style="width: 200px"
                size="mini"
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
                size="mini"
              >
              </el-date-picker>
            </div>
            <div>
              <el-form-item label="检修性质">
                <el-select v-model="form.jizu" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in jizuList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="检修内容">
                <el-input
                  v-model="input"
                  size="mini"
                  placeholder="请输入检修内容"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>

        <!-- //？此处需修改     -->

        <!-- <el-button
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
        @click="openDialog('导入')"
        >导入</el-button
      >
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialog('导出')"
        >导出</el-button
      > -->
      </el-row>
      <div class="el-butto">
        <el-button
          class="bbb"
          style="margin: 48px 0 28px 0"
          size="mini"
          type="primary"
          @click="openDialog('新增')"
          >新增</el-button
        >
        <el-button
          class="bbb"
          style="margin: 48px 0 28px 0"
          size="mini"
          type="primary"
          >查询</el-button
        >
      </div>
    </div>

    <div class="de-borderbox">
      <dv-border-box-10>
        <div style="padding: 10px">
          <el-table
            :header-row-style="{ background: 'transparent', color: '#fff' }"
            :header-cell-style="{ background: 'transparent' }"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            />
            <el-table-column prop="shebei" align="center" label="检修内容" />
            <el-table-column prop="shijian" align="center" label="检修性质" />
            <el-table-column
              prop="yuanyin"
              align="center"
              label="后续问题及意见"
            />
            <el-table-column prop="cuoshi" align="center" label="计划工期" />
            <el-table-column prop="fsshijian" align="center" label="实际工期" />
            <el-table-column prop="kaishi" align="center" label="开始时间" />
            <el-table-column prop="jieshu" align="center" label="开始时间" />
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
                <el-button
                  size="medium"
                  type="text"
                  style="color: rgb(64, 255, 137); margin-left: 20px"
                  @click="openDialog('详情', scope.row)"
                  >详情</el-button
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
        <el-form-item label="设备名称:">
          <b class="b">激光式浊度仪</b>
        </el-form-item>
        <el-form-item label="检修性质">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检修内容">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="计划工期">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="实际工期">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="后续问题及意见">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上传照片(支持png.jpg)" label-width="160px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        { label: "检修性质", value: "1" },
        { label: "检修性质", value: "2" },
        { label: "检修性质", value: "3" },
      ],
      gongkuangList: [
        { label: "国电三联1", value: "1" },
        { label: "国电三联2", value: "2" },
        { label: "国电三联3", value: "3" },
      ],
      tableData: [
        {
          shebei: "测试内容",
          shijian: "检修性质",
          yuanyin: "无",
          cuoshi: "12天",
          fsshijian: "1",
          kaishi: "2022-08-01 00:00:00",
          jieshu: "2022-08-02 00:00:00",
        },
        {
          shebei: "测试内容",
          shijian: "检修性质",
          yuanyin: "无",
          cuoshi: "12天",
          fsshijian: "1",
          kaishi: "2022-08-01 00:00:00",
          jieshu: "2022-08-02 00:00:00",
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
      value1_1: "", //开始时间
      value1: "", //
      imageUrl: "", //上传
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

    //上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.boxd {
  width: 1600px;
  height: 300px;
  padding-left: 5%;
}
.block-s {
  width: 100%;
  display: flex;
  color: #fff;
  margin-top: 1%;
}

.el-butto {
  width: 10%;
  position: relative;
  top: -70px;
  left: 85%;
  // border: 1px solid saddlebrown;

  display: flex;
}

.de-borderbox {
  margin-top: -100px;
}

.b {
  color: #fff;
}

//上传

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
