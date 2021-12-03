<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">上门就诊预约的处理</h4>
            <p class="category">在这处理用户关于上门就诊的预约</p>
          </md-card-header>
          <md-card-content>
            <div id="typography">
              <div class="title">
                <h2>处理预约信息</h2>
              </div>
              <div class="row">
                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">※</span>
                    <h3>1.用户号155的预约</h3>
                    <p>姓名：施志豪</p>
                    <p>身份证号码:330</p>
                    <p>电话号码：18257871786</p>
                    <p>地址：杭州西湖</p>
                  </h3>
                </div>

                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">※</span>
                    <h3>2.用户号1678的预约</h3>
                    <p>姓名：金克斯</p>
                    <p>身份证号码：64161494</p>
                    <p>电话号码：110</p>
                    <p>地址：梦想小镇</p>
                  </h3>
                </div>
                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">※</span>
                    <h3>3.用户号777的预约</h3>
                    <p>姓名：明凯</p>
                    <p>身份证号码:33161</p>
                    <p>电话号码：187</p>
                    <p>地址：武汉光谷</p>
                  </h3>
                </div>
                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">※</span>
                    <h3>4.用户号696的预约</h3>
                    <p>姓名：小王</p>
                    <p>身份证号码:331610</p>
                    <p>电话号码：14571786</p>
                    <p>地址：北京海淀</p>
                  </h3>
                </div>
                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">※</span>
                    <h3>5.用户号594的预约</h3>
                    <p>姓名：小胡</p>
                    <p>身份证号码:33022</p>
                    <p>电话号码：11651</p>
                    <p>地址：上海徐汇</p>
                  </h3>
                </div>


              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
};
</script>
