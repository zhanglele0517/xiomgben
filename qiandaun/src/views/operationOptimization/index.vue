<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="煤种">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="使用电厂名称">
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
        @click="openDialog('导入')"
        >导入</el-button
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            />
            <el-table-column prop="coalType" align="center" label="煤种" />
            <el-table-column prop="fe2o3" align="center" label="成分" />
            <el-table-column
              prop="k2o"
              align="center"
              label="wk值(设计/效核1.2)"
            />
            <el-table-column prop="mgo" align="center" label="wk值" />
            <el-table-column
              prop="lio2"
              align="center"
              label="使用电厂名称"
            />
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

          <!-- 新增 -->
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
      <el-form :model="responseForm" label-width="110px" label-position="left">
        <el-form-item label="序号">
          <button>1</button>
        </el-form-item>
        <el-form-item label="煤种">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder=""
            size="small"
          />
        </el-form-item>
        <el-form-item label="成分" class="form_naes">
          <div>
            <b>Sar</b> <input type="text" /> <b>Sar</b> <input type="text" />
            <b>Sar</b> <input type="text" />
          </div>
          <div>
            <b>Sar</b> <input type="text" /> <b>Sar</b> <input type="text" />
            <b>Sar</b> <input type="text" />
          </div>
        </el-form-item>
        <el-form-item label="wk值(设计/效核1.2)">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder=""
            size="small"
          />
        </el-form-item>
        <el-form-item label="wk值">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder=""
            size="small"
          />
        </el-form-item>
        <el-form-item label="使用电厂名称">
          <el-input
            v-model="responseForm.cuoshi"
            disabled
            placeholder=""
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
// import { getDesign, getMachine, getList, saveWorkConditionDetail, editWorkConditionDetail, deleteDesign } from '@/api/benchmarking/working-condition'
// import { getValueByName } from '@/api/alarmCenter/information'

import { getList, deleteOrupdate ,saveOrupdate} from "@/api/alarmCenter/yunxing";
export default {
  data() {
    return {
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
          coalType: '',
          fe2o3: "",
          k2o: "",
          lio2: "",
          mgo: "",
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

      pageNum: 1, // 当前页数
      limit: 10, // 分页每页条数
      total: 0, // 用户总数
      form: {
        coalType: "",
        usePower: "",
      },

      ids: [],
    };
  },

  mounted() {
    this.getListFun();
  },
  methods: {
    getListFun() {
      getList({
        pageNum: this.pageNum,
        limit: this.limit,
        ...this.form,
      }).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.records;
        console.log(res);
      });
    },
    // 监听每页条数发生变化
    // handleSizeChange(e) {
    //   this.pageNum = 1
    //   this.limit = e
    //   this.getListFun()
    // },
    // // 监听页数发生变化
    // handleCurrentChange(e) {
    //   this.pageNum = e
    //   this.getListFun()
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = val;
      this.getListFun();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.limit = val;
      this.getListFun();
    },
    //编辑
    openDialog(title, data) {
      this.DialogTitle = title;
      this.DialogVisible = true;
      if (data) this.responseForm = data;
    },
    
    handleSelectionChange(val){
      this.ids = []
      let ths = this
      val.forEach(item => {
        ths.ids.push(item.id)
      });
      console.log(val);

      console.log(this.ids);
    },

    deleteAfirm() {
      this.DialogLoading = true;
      console.log(this.ids);
      deleteOrupdate(this.ids)
        .then((res) => {
            // if (this.$refs.tableRef.selection.length === 0)
        // return this.$message.warning("请至少勾选一条数据");
          console.log(1);
          this.DialogLoading = false;
          this.$message.success("删除成功");
          this.getListFun();
          this.deleteDialogVisible = false;
          console.log(res);
        })
        .catch(() => {
          this.DialogLoading = false;
        });
    },
    openDeleteDialog(data) {
      this.tapSelectedData = data;
      this.deleteDialogVisible = true;
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
