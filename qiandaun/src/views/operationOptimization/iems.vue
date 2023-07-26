<template>
  <div class="content-box">
    <div v-for="(item,index) in dataList" :key="index" class="item-box">
      <p class="title">{{ item.title }}</p>
      <div v-for="(items,indexs) in item.children" :key="indexs" class="children">
        <p class="items-title">{{ items.title }}：</p>
        <el-row :gutter="40" style="flex: 1">
          <el-col :span="4">
            <p class="children-title">电网电工</p>
            <div class="color-box">
              <div>
                <p>A相：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">V</span></p>
                <p>B相：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">V</span></p>
                <p>C相：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">V</span></p>
                <p>N相：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span">V</span></p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <p class="children-title">功率</p>
            <div class="color-box">
              <div>
                <p>有功功率：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">kW</span></p>
                <p>无功功率：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">kvar</span></p>
                <p>视在功率：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">kVA</span></p>
                <p>功率因数：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span" /></p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <p class="children-title">电网电流</p>
            <div class="color-box">
              <div>
                <p>A相：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">V</span></p>
                <p>B相：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">V</span></p>
                <p>C相：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">V</span></p>
                <p>N相：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span">V</span></p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <p class="children-title">负载电流</p>
            <div class="color-box">
              <div>
                <p>A相：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">V</span></p>
                <p>B相：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">V</span></p>
                <p>C相：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">V</span></p>
                <p>N相：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span">V</span></p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <p class="children-title">设备电流</p>
            <div class="color-box">
              <div>
                <p>A相：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">V</span></p>
                <p>B相：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">V</span></p>
                <p>C相：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">V</span></p>
                <p>N相：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span">V</span></p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <p class="children-title">IGBT温度</p>
            <div class="color-box">
              <div>
                <p>A相：<span class="color-span value">{{ items.zhi1 }}</span><span class="color-span">V</span></p>
                <p>B相：<span class="color-span value">{{ items.zhi2 }}</span><span class="color-span">V</span></p>
                <p>C相：<span class="color-span value">{{ items.zhi3 }}</span><span class="color-span">V</span></p>
                <p>N相：<span class="color-span value">{{ items.zhi4 }}</span><span class="color-span">V</span></p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        { title: 'A列', children: [
          { title: 'A1', zhi1: 225.47, zhi2: 225.62, zhi3: 224.21, zhi4: 0 },
          { title: 'A2', zhi1: 225.47, zhi2: 225.62, zhi3: 224.21, zhi4: 0 },
          { title: 'A2', zhi1: 225.47, zhi2: 225.62, zhi3: 224.21, zhi4: 0 }
        ] },
        { title: 'B列', children: [
          { title: 'B1', zhi1: 225.47, zhi2: 225.62, zhi3: 224.21, zhi4: 0 },
          { title: 'B2', zhi1: 225.47, zhi2: 225.62, zhi3: 224.21, zhi4: 0 }
        ] }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-box{
    overflow-y: auto;
    overflow-x: hidden;
    .item-box{
      margin-bottom: 50px;
      &:last-child{
        margin-bottom: 0;
      }
      .title{
        margin: 0;
        color: #50F3EE;
        text-align: center;
        font-size: 20px;
        margin-bottom: 40px;
      }
      .children{
        display: flex;
        align-content: center;
        margin-bottom: 30px;
        font-size: 14px;
        color: #FFFFFF;
        &:last-child{
          margin-bottom: 0;
        }
        .items-title{
          margin-right: 30px;
          font-size: 20px;
          color: #50F3EE;
          display: flex;
          align-items: center;
        }
        .color-box{
          height: 150px;
          background: rgba(177,187,255,0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .value{
            display: inline-block;
            width: 80px;
          }
          p{
            margin: 0;
            margin-bottom: 10px;
          }
          .color-span{
            color: #50F3EE;
          }
        }
      }
    }
  }
</style>
