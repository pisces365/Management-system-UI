<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <div>
            <div class="row">
              <div class="tim-typo">
                <h3>
                  <span class="tim-note">※</span>
                  <h4>选举类别：（村长选举，村支书选举，村委换届，村党支部换届）</h4>
                  <h4>选举主题 :  <textarea rows="1" cols="20"/> </h4>
                  <h4>发布单位 :  <textarea rows="1" cols="20"/> </h4>
                  <h4>规则/简介/要求 :  <textarea rows="1" cols="20"/> </h4>
                  <h4>时间 :  <textarea rows="1" cols="20"/> </h4>
                  <h4>封面图片：
                    <md-button class="md-warning">+</md-button>
                  </h4>
                </h3>

              </div>

              <h3>&emsp;* 参选人信息：</h3>
              <h4>&emsp;&emsp;&emsp;参选人1</h4>
              <h4>&emsp;&emsp;&emsp;&emsp;姓名 :  <textarea style='height:25px;width:200px;'/> </h4>
              <h4>&emsp;&emsp;&emsp;&emsp;性别 :  <textarea style='height:25px;width:200px;'/> </h4>
              <h4>&emsp;&emsp;&emsp;&emsp;年龄 :  <textarea style='height:25px;width:200px;'/></h4>
              <h4>&emsp;&emsp;&emsp;&emsp;政治面貌 :  <textarea style='height:25px;width:200px;'/> </h4>
              <h4>&emsp;&emsp;&emsp;&emsp;竞选职务 :  <textarea style='height:25px;width:200px;'/> </h4>
              <h4>&emsp;&emsp;&emsp;&emsp;<span style="vertical-align: top">个人简历：</span>
                <textarea style='height:100px;width:700px;'></textarea></h4>
              <h4>&emsp;&emsp;&emsp;&emsp;<span style="vertical-align: top">工作规划：</span>
                <textarea style='height:100px;width:700px;'></textarea></h4>
              <h4></h4>

              <h4>&emsp;&emsp;&emsp;参选人2</h4>
              <h4>&emsp;&emsp;&emsp;&emsp;......</h4>

              &emsp;&emsp;&emsp;&emsp; <md-button class="md-primary"> 添加参选人</md-button>
              &emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;&emsp;
              <h4>&emsp;&emsp;&emsp;&emsp;<md-button class="md-info"> 提交</md-button></h4>

            </div>
          </div>
        </md-card>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Election1"
}
</script>

<style scoped>

</style>