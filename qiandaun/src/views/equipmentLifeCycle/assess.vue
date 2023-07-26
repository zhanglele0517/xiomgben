<template>
  <div class="content-box">
    <el-row type="flex" justify="space-between">
      <el-form inline :model="form" class="demo-form-inline">
        <el-form-item label="影响因子">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="margin: 48px 0 28px 0" size="mini" type="primary"
            >查询</el-button
          >
        </el-form-item>
        <el-button
          style="margin: 48px 0 28px 0"
          size="mini"
          type="primary"
          @click="openDialogww('配置')"
          >配置</el-button
        >
      </el-form>
      <br />
      <!-- //？此处需修改     -->
      <el-from-item>
        <el-button type="primary" size="mini">返回</el-button>
      </el-from-item>
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

            <el-table-column prop="shebei" align="center" label="影响因子" />
            <el-table-column prop="shijian" align="center" label="评估指标" />
            <el-table-column prop="yuanyin" align="center" label="测点名称" />
            <el-table-column prop="chuoshi" align="center" label="测点标识" />
            <el-table-column prop="fsshijian" align="center" label="评估值" />
            <el-table-column prop="zhanbi" align="center" label="占比" />
            <el-table-column prop="defen" align="center" label="得分" />
            <el-table-column prop="koufen" align="center" label="单项扣分" />
            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="openDialog('配置修改', scope.row)"
                  >配置修改</el-button
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
    <!-- 配置 -->
    <el-dialog
      append-to-body
      :visible.sync="DialogVisibleww"
      width="90%"
      center
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-form :model="responseForm" label-width="180px" label-position="left">
        <el-form-item label="设备名称">
          <el-select v-model="form.jizu" size="mini" placeholder="请选择">
            <el-option
              v-for="item in jizuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="技术因子"> </el-form-item>
        <div class="boxs">
          <el-form-item label="烟尘排放浓度(25%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="除尘器出口油烟浓度(15%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="环保岛总除尘效率(10%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="除尘器入口烟尘浓度">
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
        <div class="boxs">
          <el-form-item label="除尘效率(10%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="比点耗W1(20%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="比电耗W2(20%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="比电耗Q(20%)">
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
        <div class="boxs">
          <el-form-item label="设备阻力值(10%)">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="漏风率(15%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="停机消缺次数(2%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="每年实际运行时间(h)">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
        </div>
        <div class="boxs">
          <el-form-item label="故障导致停运时间(h)">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="湿式电除尘器(2%)">
            <el-radio v-model="radio" label="1">有</el-radio>
            <el-radio v-model="radio" label="2">无</el-radio>
          </el-form-item>
        </div>
        <el-form-item label="故障因子" />
        <div class="boxs">
          <el-form-item label="重大故障发生次数(35%)">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="一般故障发生次数(15%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关联影响次数(20%)">
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
        <el-form-item label="安全因子" />
        <div class="boxs">
          <el-form-item label="人身安全事故次数(60%)">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="解构安全事故次数(40%)">
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
        <el-form-item label="环境因子" />
        <div class="boxs">
          <el-form-item label="环境腐蚀(50%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="气候湿度因素(20%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="除尘器运行烟温(30%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="入口烟温设计值">
            <el-input
              v-model="input"
              style="width: 180px"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="腐蚀因子" />
        <div class="boxs">
          <el-form-item label="烟气高S02(20%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="烟气高养离子腐蚀(25%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="烟气高温度腐蚀(10%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="烟气氧逃逸量(25%)">
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
        <div class="boxs">
          <el-form-item label="入口烟气温度(20%)">
            <el-select v-model="form.jizu" size="mini" placeholder="请选择">
              <el-option
                v-for="item in jizuList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="烟气酸露点温度">
            <el-input v-model="input" style="width:180px" size="mini" placeholder=""></el-input>
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
    <!-- 配置修改、 -->
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
        <el-form-item label="影响因子">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="技术因子"
            size="small"
          />
        </el-form-item>
        <el-form-item label="评估指标">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="电除尘器除尘效率"
            size="small"
          />
        </el-form-item>
        <el-form-item label="占比">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="10"
            size="small"
          />
        </el-form-item>
        <el-form-item label="评估99.940值">
          <el-input v-model="responseForm.cuoshi" placeholder="" size="small" />
        </el-form-item>
        <el-form-item label="评估值">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="52.388"
            size="small"
          />
        </el-form-item>
        <el-form-item label="相关测点">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="入口粉尘浓度"
            size="small"
          />
        </el-form-item>
        <el-form-item label="相关测点">
          <el-input
            v-model="responseForm.cuoshi"
            placeholder="整体除尘效率"
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
          shebei: "寿命因子",
          shijian: "电器类设备",
          yuanyin: "--",
          chuoshi: "--",
          fsshijian: "1.00",
          zhanbi: "35",
          defen: "0.55",
          koufen: "30.0",
        },
        {
          shebei: "故障因子",
          shijian: "电厂投运率",
          yuanyin: "入口烟气温度",
          chuoshi: "YQWD",
          fsshijian: "60.00",
          zhanbi: "35",
          defen: "7.0",
          koufen: "28.0",
        },
        {
          shebei: "寿命因子",
          shijian: "电器类设备",
          yuanyin: "--",
          chuoshi: "--",
          fsshijian: "1.00",
          zhanbi: "35",
          defen: "0.55",
          koufen: "30.0",
        },
        {
          shebei: "故障因子",
          shijian: "电厂投运率",
          yuanyin: "入口烟气温度",
          chuoshi: "YQWD",
          fsshijian: "60.00",
          zhanbi: "35",
          defen: "7.0",
          koufen: "28.0",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DialogVisible: false, //配置修改
      DialogVisibleww: false, //配置
      DialogTitle: "新增", //
      radio: "1", //单选框
      input: "", //默认
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

    // 配置
    openDialogww(title, data) {
      this.DialogTitle = title;
      this.DialogVisibleww = true;
      if (data) this.responseForm = data;
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

.boxs {
  width: 100%;
  display: flex;
}
</style>
