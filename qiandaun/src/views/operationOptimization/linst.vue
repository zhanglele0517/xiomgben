<template>
  <div class="content-box">
    <div>
      <p>当前煤种分析</p>
    </div>
    <div class="dv-border">
      <dv-border-box-8>
        <div class="nav-fs">
          <div>煤种除尘难易性评估</div>
          <div>除尘器理论所需比集尖面积SCA(m2/m3/s)</div>
          <div>除尘器出口烟尖浓度实时值5CA(mg/Nm3/)</div>
          <div>除尘器实时比集建尖面积SCA(m2/m3/s)</div>
          <div>实时适应性分析判断结论</div>
          <div>推荐的应对方案</div>
        </div>
      </dv-border-box-8>
    </div>

    <p>当前煤种信息</p>
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="项目">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
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
        @click="openDialog('编辑')"
        >编辑</el-button
      >
      <el-button
        style="margin: 48px 0 28px 0"
        size="mini"
        type="primary"
        @click="openDialogsht('保存到历史信息')"
        >保存到历史信息</el-button
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

            <el-table-column prop="shebei" align="center" label="项目" />
            <el-table-column prop="shijian" align="center" label="单位" />
            <el-table-column prop="yuanyin" align="center" label="数据类型" />
            <el-table-column prop="cuoshi" align="center" label="入炉煤数据" />
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

    <!-- 保存历史信息 -->
    <el-dialog
      append-to-body
      :visible.sync="wodefa"
      width="35%"
      center
      :show-close="false"
      title="保存到历史信息"
    >
      <div class="block">
        <span class="demonstration">时间</span>
        <el-date-picker
          class="navstr"
          v-model="value1"
          type="date"
          size="100%"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>

      <div class="block">
        <span class="demonstrations">操作人</span>
        <el-select v-model="value" placeholder="请选择" class="navstr">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="button-sr">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
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
        <el-form-item label="项目">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder="碳Car"
            size="small"
          />
        </el-form-item>

        <el-form-item label="单位">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder="wt%"
            size="small"
          />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder="煤种成分"
            size="small"
          />
        </el-form-item>
        <el-form-item label="入炉煤数据">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder="62.61"
            size="small"
          />
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
          shebei: "炭Car",
          shijian: "wt%",
          yuanyin: "煤种成分",
          cuoshi: "62.20",
        },
        {
          shebei: "炭Car",
          shijian: "wt%",
          yuanyin: "煤种成分",
          cuoshi: "62.20",
        },
        {
          shebei: "炭Car",
          shijian: "wt%",
          yuanyin: "煤种成分",
          cuoshi: "62.20",
        },
      ],
      value1: "", // 历史-时间
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false,
      wodefa: false,
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
      options: [
        {
          //操作人
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      value: "",
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

    //历史信息
    openDialogsht(title, data) {
      this.DialogTitle = title;
      this.wodefa = true;
      if (data) this.responseForm = data;
    },
    // 删除
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

p {
  color: #ffffff;
}
.dv-border {
  width: 90%;
  height: 20%;
  margin: 0 auto;
}

.nav-fs {
  width: 100%;
  height: 100%;
  display: flex;
}
.nav-fs div {
  border: 1px solid #2c1fdb5a;
  flex: 1;
  height: 50%;
  width: 85%;
  text-align: center;
  color: #ffffff;
  padding-top: 1%;
}
.demonstration {
  color: #ffffff;
}
.block {
  width: 100%;
  height: 10%;
  margin-top: 4%;
  // border: 1px solid red;
  line-height: 50%;
}

.demonstration {
  margin-left: 9%;
  
}

.demonstrations {
  margin-left: 7%;
  color: #ffffff;
}
.navstr {
  margin-left: 9%;
  width: 70%;
}
.button-sr{
  // border: 1px solid #ccc;
  text-align: center;
  margin-top: 4%;
}
.button-sr button {
  width: 25%;
  height: 10%;
}
</style>
