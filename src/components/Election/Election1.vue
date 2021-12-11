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
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>选举类别</label>
                        <md-select v-model="election_type" name="选举类别" id="election_type" required>
                          <md-option v-for="item in mytypes" :key="item.id" :lable="item.name" :value="item.name">
                            {{ item.name }}
                          </md-option>
                        </md-select>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>选举主题</label>
                        <md-input v-model="election_theme" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>发布单位</label>
                        <md-input v-model="election_units" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <label>选举起止时间</label>
                      <br><br>
                      <el-date-picker
                          v-model="election_time"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          style="width: 100%"
                          required>
                      </el-date-picker>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>规则/简介/要求</label>
                        <md-textarea v-model="election_rules"></md-textarea>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-20">
                      <label>封面图片</label>
                      <md-field>
                        <md-file v-model="election_cover" accept="image/*" placeholder="上传图片"
                                 @change="tirggerFile($event)"/>
                      </md-field>
                      <img style="max-width:300px;max-height:300px;" id="election_default_cover"
                           src="http://112.124.35.32:8081/xiangliban/api/file/2mwh4g5lu4jo.jpg" alt/>
                      <!--                      <img style="width:100px;height:100px;" id="election_default_cover" src="@/assets/img/election_pic_default.jpg" alt/>-->
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
            <md-button class="md-raised md-primary" @click="setDone('first', 'second')">下一步</md-button>
          </md-step>

          <md-step id="second" md-label="第二步：输入参选人信息" md-description="必填" :md-error="secondStepError"
                   :md-done.sync="second">
            <md-button class="md-raised md-primary" @click="addCandidate()">添加参选人</md-button>
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
              <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33"
                       v-for="(cdd,index) in candidates" :key="cdd.id">
                <md-card-header :data-background-color="pplBackgroundColor">
                  <h4 class="title">参选人{{ index + 1 }}详细信息</h4>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-size-33">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <img style="width:150px;height:150px;object-fit: cover" :id=cdd.id
                           src="http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png" alt/>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>姓名</label>
                        <md-input v-model="cdd.candidate_name" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <md-file v-model="cdd.candidate_cover" placeholder="上传照片" accept="image/*"
                                 @change="tirggerFile2($event,cdd)"/>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <md-field>
                        <label>性别</label>
                        <md-input v-model="cdd.candidate_gender" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <md-field>
                        <label>年龄</label>
                        <md-input v-model="cdd.candidate_age" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>政治面貌</label>
                        <md-input v-model="cdd.candidate_politics" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>竞选职务</label>
                        <md-input v-model="cdd.candidate_position" required></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>个人简历</label>
                        <md-textarea v-model="cdd.candidate_resume" required></md-textarea>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>工作规划</label>
                        <md-textarea v-model="cdd.candidate_plan" required></md-textarea>
                      </md-field>
                    </div>
                    <md-button class="md-raised md-primary" data-background-color="red" @click="remove(cdd)">删除候选人
                    </md-button>
                  </div>
                </md-card-content>
              </md-card>

            </div>
            <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
          </md-step>

          <md-step id="third" md-label="确认添加" :md-done.sync="third">
            <h3>
              我确定我输入的信息无误，并愿意承担由于输入错误而导致的所有后续结果的责任。
            </h3>
            <md-button class="md-raised md-primary" @click="setDone('third'); uploadPhoto()">添加</md-button>
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
      election_type: '',
      election_time: '',
      img_submit: [],
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
      new_id: 0,
      candidates: [],
    };
  },
  methods: {
    setDone(id, index) {
      this[id] = true;
      this.secondStepError = null;
      if (index) {
        this.active = index;
      }
    },
    addCandidate() {
      this.candidates.push({
        id: this.new_id++,
        // candidate_name: this.candidate_name,
        // candidate_gender: this.candidate_gender,
        // candidate_age: this.candidate_age,
        // candidate_politics: this.candidate_politics,
        // candidate_position: this.candidate_position,
        // candidate_resume: this.candidate_resume,
        // candidate_plan: this.candidate_plan,
        candidate_votes: 0,
        candidate_cover: "",
      });
      // console.log("输入的选举人个数: " + this.candidates.length);
      // console.log("当前增加的选举人的index: " + this.candidates.indexOf(cdd));
      // console.log("当前最后一个选举人的id: " + this.candidates[this.candidates.length-1].id);
      // for(let key in this.candidates){
      //   console.log(this.candidates[key])
      // }
      // console.log(this.candidates[this.candidates.length-1].candidate_name);
      // console.log(this.candidates[this.candidates.length-1].candidate_gender);
      // console.log(this.candidates[this.candidates.length-1].candidate_age);
      // console.log(this.candidates[this.candidates.length-1].candidate_politics);
      // console.log(this.candidates[this.candidates.length-1].candidate_position);
      // console.log(this.candidates[this.candidates.length-1].candidate_resume);
      // console.log(this.candidates[this.candidates.length-1].candidate_plan);
      // console.log(this.candidates[this.candidates.length-1].candidate_votes);
    },
    remove(cdd) {
      var i = this.candidates.indexOf(cdd);
      this.candidates.splice(i, 1);
      this.img_submit.splice(i, 1);
      this.new_id--;
    },
    tirggerFile(event) {
      var file = event.target.files;
      var reader = new FileReader();//读取文件
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        document.getElementById("election_default_cover").src = reader.result;
      };
    },
    tirggerFile2(event, cdd) {
      var file = event.target.files;
      var reader = new FileReader();//读取文件
      reader.readAsDataURL(file[0]);
      this.img_submit.push(file[0]);
      cdd.candidate_cover = file[0];
      reader.onload = function (event) {
        document.getElementById(cdd.id).src = reader.result;
      };
    },
    uploadPhoto() {
      for (var i = 0; i < this.img_submit.length;++i ) {
        var formData = new FormData();
        formData.append('file',this.img_submit[i]);
        this.$axios
            .post('/api/imgUpload', formData)
            .then(successResponse => {
              console.log(successResponse.data);
            }).catch(failResponse => {
          console.log("上传失败");
        })
      }
    }
  },
}
</script>

<style>
/*.md-steppers {*/

/*}*/

/*#mycard1 {*/
/*  display: inline !important;*/
/*}*/

/*.myfloat {*/
/*  float: left !important;*/
/*}*/
</style>