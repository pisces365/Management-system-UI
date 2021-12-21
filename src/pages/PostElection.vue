<!--
 * @FileDescription: 工作人员-发布选举界面
 * @Author: 刘元驰
 * @Date: 12/15/2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/21/2021
 -->
<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">选举信息发布</h4>
            <p class="category">输入选举详细信息和选举人详细信息</p>
          </md-card-header>
          <md-card-content>
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
                                    <md-option v-for="item in type_list" :key="item.id" :lable="item.name"
                                               :value="item.id">
                                      {{ item.name }}
                                    </md-option>
                                  </md-select>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                  <label>选举主题</label>
                                  <md-input v-model="name" required></md-input>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                  <label>发布单位</label>
                                  <md-input v-model="department" required></md-input>
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
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 100%"
                                    required>
                                </el-date-picker>
                              </div>
                              <div class="md-layout-item md-size-100">
                                <md-field maxlength="5">
                                  <label>规则/简介/要求</label>
                                  <md-textarea v-model="intro"></md-textarea>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-small-size-100 md-size-20">
                                <label>封面图片</label>
                                <md-field>
                                  <md-file v-model="election_cover" accept="image/*" placeholder="上传图片"
                                           @change="tirggerFile($event)"/>
                                </md-field>
                                <img style="max-width:300px;max-height:150px;" id="election_default_cover"
                                     src="http://112.124.35.32:8081/xiangliban/api/file/2mwh4g5lu4jo.jpg" alt/>
                              </div>
                            </div>
                          </md-card-content>
                        </md-card>
                      </div>
                      <md-button class="md-raised md-primary" @click="uploadCover(); setDone('first', 'second')">下一步
                      </md-button>
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

                              <!--WIP-->
                              <div class="md-layout-item md-small-size-100 md-size-50">
                                <h4>参选人姓名</h4>
                                <el-select v-model="cdd.uid" placeholder="请选择参选人">
                                  <el-option
                                      v-for="item in candidate_list"
                                      :key="item.uid"
                                      :label="item.name"
                                      :value="item.uid">
                                  </el-option>
                                </el-select>
                              </div>
                              <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                  <md-file v-model="cdd.img" placeholder="上传照片" accept="image/*"
                                           @change="tirggerFile2($event,cdd)"/>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                  <label>竞选职务</label>
                                  <md-input v-model="cdd.duty" required></md-input>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-size-100">
                                <md-field maxlength="5">
                                  <label>个人简历</label>
                                  <md-textarea v-model="cdd.brief_intro" required></md-textarea>
                                </md-field>
                              </div>
                              <div class="md-layout-item md-size-100">
                                <md-field maxlength="5">
                                  <label>工作规划</label>
                                  <md-textarea v-model="cdd.outlook" required></md-textarea>
                                </md-field>
                              </div>
                              <md-button class="md-raised md-primary" data-background-color="red" @click="remove(cdd)">
                                删除候选人
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
                      <md-button class="md-raised md-primary" @click="setDone('third'); executeSubmit();">添加</md-button>
                    </md-step>
                  </md-steppers>
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
  // 调入用于刷新界面的方法
  inject: ['reload'],
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
  created() {
    this.$axios
        .get('http://112.124.35.32:8081/xiangliban/vote/allVoteType')
        .then(successResponse => {
          this.type_list = successResponse.data; // 将获取的数据保存
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/user/selectAllVillagers')
        .then(successResponse => {
          this.candidate_list = successResponse.data; // 将获取的数据保存
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
  },
  data() {
    return {
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      election_cover: null, // 没用
      //-----------------------------------------
      // 新增选举用字段
      tmp_id: "default",  // 新增的无用选举id
      election_type: null,  // 新增的选举类别id
      name: null, // 新增选举主题/名称
      department: null, // 新增选举部门
      election_time: null,  // 新增选举其实时间
      intro: null,  // 新增选举描述
      img: "http://112.124.35.32:8081/xiangliban/api/file/2mwh4g5lu4jo.jpg",  // 新增选举封面
      //-----------------------------------------
      candidate_list: [], // 可选的选举人村民列表
      img_submit: [], // 待上传选举人图片列表
      type_list: [],  // 获取的所有选举类别
      new_id: 0,
      current_vote_id: null, // 生成的选举id
      candidates: [], // 新增的选举人信息都在此处
      candidate_submit: [], // 提交的信息
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
        candidate_votes: 0,
        candidate_cover: "",
      });
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
      this.img_submit.push(file[0]);  // 暂存在img_submit
      reader.onload = function () {
        document.getElementById("election_default_cover").src = reader.result;
      };
    },
    // 在第一步点击下一步后, 上传封面图片
    uploadCover() {
      var formData = new FormData();
      formData.append('file', this.img_submit[0]);
      this.$axios
          .post('http://112.124.35.32:8081/xiangliban/api/imgUpload', formData)
          .then(successResponse => {
            this.img = successResponse.data;
            console.log(this.img);
          }).catch(failResponse => {
        console.log("上传失败");
      })
      this.img_submit.pop();
    },
    tirggerFile2(event, cdd) {
      var file = event.target.files;
      var reader = new FileReader();//读取文件
      reader.readAsDataURL(file[0]);
      this.img_submit.push(file[0]);
      // cdd.candidate_cover = file[0];
      reader.onload = function (event) {
        document.getElementById(cdd.id).src = reader.result;
      };
    },
    // 提交选举本身信息
    async submitElection(_this) {
      var this_return = null;
      let jsonData = {
        "department": _this.department,
        "end": _this.election_time[1],
        "id": _this.tmp_id,
        "img": _this.img,
        "intro": _this.intro,
        "name": _this.name,
        "start": _this.election_time[0],
        "state": 0,
        "type": _this.election_type
      }
      await this.$axios
          .post('http://112.124.35.32:8081/xiangliban/vote/addVoteInfo', jsonData)
          .then(successResponse => {
            this_return = successResponse.data;
            console.log("basic election added");
          }).catch(failResponse => {
            this.$message.error('出错了, 选举增加失败!');
          })
      return this_return;
    },
    // 上传候选人照片并保存返回的url
    async uploadPhoto() {
      for (var i = 0; i < this.img_submit.length; ++i) {
        var formData = new FormData();
        formData.append('file', this.img_submit[i]);
        await this.$axios
            .post('http://112.124.35.32:8081/xiangliban/api/imgUpload', formData)
            .then(successResponse => {
              this.candidates[i].img = successResponse.data;
              console.log("upload single done");
              console.log(successResponse.data);
            }).catch(failResponse => {
              console.log("上传失败");
            })
      }
      console.log("upload done");
    },
    // 增加选举人信息, 完成这个选举信息的新增
    async executeSubmit() {
      let _this = this;
      var this_election_id = await this.submitElection(_this);
      await this.uploadPhoto();
      console.log("files upload done");
      for (var i = 0; i < this.candidates.length; ++i) {
        let jsonData = {
          "brief_intro": this.candidates[i].brief_intro,
          "duty": this.candidates[i].duty,
          "img": this.candidates[i].img,
          "outlook": this.candidates[i].outlook,
          "uid": this.candidates[i].uid,
          "voteid": "default",
          "voteinfoid": this_election_id,
          "votes": "0"
        }
        this.candidate_submit.push(jsonData);
      }
      await this.$axios
          .post('http://112.124.35.32:8081/xiangliban/vote/addVotePersons', this.candidate_submit)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$message({
              type: 'success',
              message: '选举已经添加'
            });
            this.reload();
          }).catch(failResponse => {
            this.$message.error('出错了, 选举添加失败!');
          })
    },
  },
}

</script>