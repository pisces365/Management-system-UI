<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>

          <md-card-content>
            <div v-for="candidate in candidates" :key="candidate.candidate_id" id="mycard1">
              <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33" >
                <md-card-header :data-background-color="dataBackgroundColor">
                  <h4 class="title">工单详细信息{{ candidate.candidate_id }}</h4>

                </md-card-header>

                <md-card-content>
                  <div class="md-layout md-size-33">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>编号</label>
                        <md-input v-model="candidate.candidate_num" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>类别</label>
                        <md-input v-model="candidate.candidate_kind" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>创建时间</label>
                        <md-input v-model="candidate.candidate_time" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>地点</label>
                        <md-input v-model="candidate.candidate_address" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>申报人</label>
                        <md-input v-model="candidate.candidate_person" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>联系方式</label>
                        <md-input v-model="candidate.candidate_tele" readonly></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>具体问题</label>
                        <md-textarea v-model="candidate.candidate_question" readonly></md-textarea>
                      </md-field>
                    </div>
                    <md-button class="md-info">接单</md-button>
                  </div>
                </md-card-content>
              </md-card>

            </div>
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate" ></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
            <!--            <candidate-details table-header-color="blue" class="mycandidate"></candidate-details>-->
          </md-card-content>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import { ElectionDetails,CandidateDetails } from "@/components";

export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
  },
  components: {
    // ElectionDetails,
    // CandidateDetails,
  },
  data() {
    return {
      candidates: [
        {
          candidate_num: "#0001",
          candidate_kind: "水电类",
          candidate_time: "2021-10-01",
          candidate_address: "金华市永康市",
          candidate_person: "施志豪",
          candidate_tele: "18257871786",
          candidate_question: "停电停水了啊，活不下去了啊，领导们！",
        },
        {
          candidate_num: "#0001",
          candidate_kind: "水电类",
          candidate_time: "2021-10-01",
          candidate_address: "金华市永康市",
          candidate_person: "施志豪",
          candidate_tele: "18257871786",
          candidate_question: "停电停水了啊，活不下去了啊，领导们！",
        },
        {
          candidate_num: "#0001",
          candidate_kind: "水电类",
          candidate_time: "2021-10-01",
          candidate_address: "金华市永康市",
          candidate_person: "施志豪",
          candidate_tele: "18257871786",
          candidate_question: "停电停水了啊，活不下去了啊，领导们！",
        },
        {
          candidate_num: "#0001",
          candidate_kind: "水电类",
          candidate_time: "2021-10-01",
          candidate_address: "金华市永康市",
          candidate_person: "施志豪",
          candidate_tele: "18257871786",
          candidate_question: "停电停水了啊，活不下去了啊，领导们！",
        },
        {
          candidate_num: "#0001",
          candidate_kind: "水电类",
          candidate_time: "2021-10-01",
          candidate_address: "金华市永康市",
          candidate_person: "施志豪",
          candidate_tele: "18257871786",
          candidate_question: "停电停水了啊，活不下去了啊，领导们！",
        },


      ],
    };
  },
};
</script>
<style>
#mycard1{
  display: inline !important;
}
</style>