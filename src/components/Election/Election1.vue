<template>
  <div class="content">
    <div class="md-layout">

      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-steppers :md-active-step.sync="active" md-linear>
          <md-step id="first" md-label="第一步：输入选举信息" md-description="必填" :md-done.sync="first">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
              <md-card>
                <!--              <md-card-header :data-background-color="dataBackgroundColor">-->
                <!--                <h4 class="title">请输入选举详细信息</h4>-->
                <!--              </md-card-header>-->
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <md-field>
                        <label>选举类别</label>
                        <md-select v-model="election_type" name="选举类别" id="election_type" required>
                          <md-option v-for="item in mytypes" :key="item.id" :lable="item.name" :value="item.name">
                            {{ item.name }}
                          </md-option>
                        </md-select>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <md-field>
                        <label>选举主题</label>
                        <md-input v-model="election_theme" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <md-field>
                        <label>发布单位</label>
                        <md-input v-model="election_units" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>规则/简介/要求</label>
                        <md-textarea v-model="election_rules"></md-textarea>
                      </md-field>
                    </div>
<!--                    <div class="md-layout-item md-small-size-100 md-size-50">-->
<!--                      <label>选举开始时间</label>-->
<!--                      <el-date-picker-->
<!--                          v-model="election_start_time"-->
<!--                          type="datetimerange"-->
<!--                          range-separator="至"-->
<!--                          start-placeholder="开始日期"-->
<!--                          end-placeholder="结束日期" required>-->
<!--                      </el-date-picker>-->
<!--                    </div>-->
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <label>选举开始时间</label>
                      <md-datepicker v-model="election_start_time" required></md-datepicker>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <label>选举结束时间</label>
                      <md-datepicker v-model="election_end_time" required></md-datepicker>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-20">
                      <label>封面图片</label>
                      <md-field>
                        <md-file v-model="course_cover" accept="image/*" @change="tirggerFile($event)"/>
                      </md-field>
                      <img style="width:100px;height:100px;" id="img1" src="@/assets/img/faces/faker1.jpg" alt/>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
            <md-button class="md-raised md-primary" @click="setDone('first', 'second')">下一步</md-button>
          </md-step>

          <md-step id="second" md-label="第二步：输入参选人信息" md-description="必填" :md-error="secondStepError"
                   :md-done.sync="second">
            <!--      WIP-->
            <md-button class="md-raised md-primary" @click="addCandidate">添加参选人</md-button>
            <md-button class="md-raised md-primary" data-background-color="red" @click="remove(ctr)">删除候选人</md-button>
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
              <div v-for="ctr in counter" :key="ctr" id="mycard1">
                <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33" :item="ctr">
                  <md-card-header :data-background-color="pplBackgroundColor">
                    <h4 class="title">参选人详细信息</h4>
                  </md-card-header>
                  <md-card-content>
                    <div class="md-layout md-size-33">
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>姓名</label>
                          <md-input v-model="ctr.candidate_name" required></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>性别</label>
                          <md-input v-model="ctr.candidate_gender" required></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>年龄</label>
                          <md-input v-model="ctr.candidate_age" required></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>政治面貌</label>
                          <md-input v-model="ctr.candidate_politics" required></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>竞选职务</label>
                          <md-input v-model="ctr.candidate_position" required></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field maxlength="5">
                          <label>个人简历</label>
                          <md-textarea v-model="ctr.candidate_resume" required></md-textarea>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field maxlength="5">
                          <label>工作规划</label>
                          <md-textarea v-model="ctr.candidate_plan" required></md-textarea>
                        </md-field>
                      </div>
                    </div>
                  </md-card-content>
                </md-card>
              </div>
            </div>
            <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
<!--            <md-button class="md-raised md-primary" data-background-color="red" @click="setError()">出错了，需要联系管理员</md-button>-->
          </md-step>

          <md-step id="third" md-label="确认添加" :md-done.sync="third">
            <h3>
              我确定我输入的信息无误，并愿意承担由于输入错误而导致的所有后续结果的责任。
            </h3>
            <md-button class="md-raised md-primary" @click="setDone('third')">添加</md-button>
          </md-step>
        </md-steppers>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Election1",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
    pplBackgroundColor: {
      type: String,
      default: "blue",
    },
  },
  data() {
    return {
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      counter:[],
      election_type: '',
      mytypes: [
        {
          id: 'election1',
          name: '村长选举',
        },
        {
          id: 'election2',
          name: '村支书选举',
        },
        {
          id: 'election3',
          name: '村委换届',
        },
        {
          id: 'election4',
          name: '村党支部换届',
        },
      ],
      candidates: [
        {
          candidate_id: "EC#00001",
          candidate_name: "王德法",
          candidate_gender: "男",
          candidate_age: "25",
          candidate_politics: "党员",
          candidate_position: "村支书",
          candidate_resume: "今天是个好日子",
          candidate_plan: "建设最美乡村",
          candidate_votes: "10",
        },
      ],
    }
  },
  methods: {
    setDone(id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    setError() {
      this.secondStepError = '出现问题!'
    },
    addCandidate(){
      this.counter.push({});
    },
    remove(ctr) {
      var i = this.counter.indexOf(ctr)
      this.counter.splice(i, 1)
    },
    tirggerFile(event) {
      var file = event.target.files;
      var reader = new FileReader();//读取文件
      reader.readAsDataURL(file[0]);
      reader.onload = function() {
        document.getElementById("img1").src = reader.result;
      };
    },
  }
}
</script>

<style lang="scss" scoped>
.md-steppers {

}
#mycard1{
  display: inline !important;
}
</style>