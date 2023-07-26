<template>
  <div class="content-box">
    <div class="boxd">
      <dv-border-box-10>
        <el-button type="primary"> 维护计划 </el-button>
      </dv-border-box-10>
    </div>
    <div>
      <el-button size="mini">维护计划</el-button>
      <el-button size="mini">历史维护</el-button>
      <el-button size="mini">维修记录</el-button>
    </div>
    <div class="block-s">
      <div class="block">
        <span class="demonstration">时间</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="请选择日期"
           style="width:200px"  
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value1_1"
          type="datetime"
          placeholder="请选择日期"
           style="width:200px"
        >
        </el-date-picker>
      </div>
      <div class="block-u">
        <span>工作项目</span>
        <el-input v-model="input" placeholder="请输入工作项目"></el-input>
      </div>
      <div class="block-u">
        <span>工作标准</span>
        <el-input v-model="input" placeholder="请输入工作标准"></el-input>
      </div>
      <div class="cah">
        <el-button type="primary" size="mini">查询</el-button>
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

            <el-table-column prop="shebei" align="center" label="工作项目" />
            <el-table-column prop="shijian" align="center" label="工作标准" />

            <el-table-column
              prop="cuoshi"
              align="center"
              label="开始月份(与当前月的差值)"
            />
            <el-table-column prop="zhouqi" align="center" label="执行周期" />
            <el-table-column prop="xiaci" align="center" label="下次执行时间" />
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
          shebei: "激光式浊度仪",
          shijian: "测试",
          cuoshi: "7",
          zhouqi: "1或15号",
          xiaci: "2022-08-01 00:00:00",
        },
        {
          shebei: "激光式浊度仪",
          shijian: "测试",
          cuoshi: "7",
          zhouqi: "1或15号",
          xiaci: "2022-08-01 00:00:00",
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
  width: 25%;
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
</style>
