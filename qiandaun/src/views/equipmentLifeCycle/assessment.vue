<template>
  <div class="content-box">
    <dv-border-box-10>
      <div class="shebei-box">
        <p style="font-size: 18px;color: #0C1E42;font-weight: bold">2#电除尘器</p>
        <el-button size="mini" type="primary">查看详情</el-button>
      </div>
      <div class="center-box">
        <div class="center-little-box">
          <div class="lianghao">
            <span>良好</span>
          </div>
          <div class="float-box jishuyinzi">
            <span class="number">37.35</span>
            <span class="label">技术因子得分<br>(满分:40)</span>
          </div>
          <div class="float-box shoumingyinzi">
            <span class="number">3.52</span>
            <span class="label">寿命因子得分<br>(满分:10)</span>
          </div>
          <div class="float-box guzhangyinzi">
            <span class="number">8.10</span>
            <span class="label">故障因子得分<br>(满分:20)</span>
          </div>
          <div class="float-box anquanyinzi">
            <span class="number">1.50</span>
            <span class="label">安全因子得分<br>(满分:10)</span>
          </div>
          <div class="float-box huanjinyinzi">
            <span class="number">4.85</span>
            <span class="label">环境因子得分<br>(满分:10)</span>
          </div>
          <div class="float-box fushiyinzi">
            <span class="number">7.50</span>
            <span class="label">腐蚀因子得分<br>(满分:10)</span>
          </div>
          <div class="left-border-box" />
          <div class="right-border-box" />
          <div class="zhezhao">
            <div class="neirong">
              <p class="title">评估得分</p>
              <div class="center-out-box">
                <div class="img-box">
                  <p style="font-size: 26px;font-weight: bold">76.31<span style="font-size: 12px;color: #666666">分</span></p>
                  <p style="font-size: 14px;margin-top: 10px;">得分结果</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
::v-deep.dv-border-box-10 .border-box-content{
  height: calc(100vh - 140px - 90px);
  position: relative;
  .shebei-box{
    position: absolute;
    width: 200px;
    height: 160px;
    left: 80px;
    top: 160px;
    background: rgba(204,213,223,0.7);
    border-radius: 16px 16px 16px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p{
      margin: 0;
      margin-bottom: 20px;
    }
  }
}
.center-box{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-little-box{
    position: relative;
    width: 350px;
    height: 300px;
    .lianghao{
      z-index: 1;
      background: url('../../assets/img/right-top.png');
      background-size: 100% 100%;
      position: absolute;
      right: -50px;
      top: -50px;
      height: 110px;
      width: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        font-size: 18px;
        font-weight: bold;
      }
    }
    .float-box{
      z-index: 1;
      width: 140px;
      height: 100px;
      background: #CCD5DF;
      border-radius: 16px 16px 16px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .number{
        font-size: 18px;
        color: #00A65A;
        margin-bottom: 20px;
        font-weight: bold;
      }
      .label{
        font-size: 12px;
        color: #666666;
        text-align: center;
      }
    }
    .jishuyinzi{
      position: absolute;
      bottom: 20px;
      right: -110px;
    }
    .shoumingyinzi{
      position: absolute;
      bottom: 20px;
      left: -200px;
    }
    .guzhangyinzi{
      position: absolute;
      top: -165px;
      left: -255px;
    }
    .anquanyinzi{
      position: absolute;
      bottom: -140px;
      left: 70px;
    }
    .huanjinyinzi{
      position: absolute;
      bottom: -140px;
      right: -370px;
    }
    .fushiyinzi{
      position: absolute;
      top: 10px;
      right: -320px;
    }
    .left-border-box{
      position: absolute;
      left: -185px;
      bottom: 40px;
      height: 376px;
      width: 490px;
      border: 1px dashed #50F3EE;
      border-radius: 20px;
    }
    .right-border-box{
      position: absolute;
      right: -298px;
      top: 40px;
      height: 355px;
      width: 510px;
      border: 1px dashed #50F3EE;
      border-radius: 20px;
    }
    .zhezhao{
      position: absolute;
      height: 100%;
      width: 100%;
      background: url('../../assets/img/main_bg.png');
      background-size: 100vw 100vh;
      background-repeat:no-repeat;
      background-position: 50% 53%;
      top: 0;
      left: 0;
      .neirong{
        height: 100%;
        width: 100%;
        border-radius: 16px 16px 16px 16px;
        padding: 25px;
        background: rgba(204,213,223,0.7)
      }
    }
    .title{
      color: #0C1E42;
      font-size: 16px;
      margin: 0;
    }
    .center-out-box{
      height: calc(100% - 18.4px);
      display: flex;
      justify-content: center;
      align-items: center;
      .img-box{
        height: 180px;
        width: 180px;
        background: url('../../assets/img/center.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p{
          margin: 0;
        }
      }
    }
  }
}
</style>
