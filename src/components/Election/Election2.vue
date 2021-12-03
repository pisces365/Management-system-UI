<template>
  <md-card>
    <div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label for="movie">选举类别</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label for="movie">选举主题</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-field>
            <label for="movie">发布单位</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-field>
            <label for="movie">规则/简介/要求</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label for="movie">时间</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>
      </div>

      <div>
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title"></h1>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head md-numeric style="color: #880e4f">选举类别</md-table-head>
            <md-table-head style="color: #880e4f">选举主题</md-table-head>
            <md-table-head style="color: #880e4f">发布单位</md-table-head>
            <md-table-head style="color: #880e4f">规则/简介/要求</md-table-head>
            <md-table-head style="color: #880e4f">时间</md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-cell md-numeric st>村支部选举</md-table-cell>
            <md-table-cell>红色基因</md-table-cell>
            <md-table-cell>第一党支部</md-table-cell>
            <md-table-cell>竞选</md-table-cell>
            <md-table-cell>11.18下午</md-table-cell>
            <md-button  class="md-primary" @click="gotoDetails">详情</md-button>
            <md-button  class="md-danger">删除</md-button>
          </md-table-row>
          <md-table-row>
            <md-table-cell md-numeric st>村长选举</md-table-cell>
            <md-table-cell>根正苗红</md-table-cell>
            <md-table-cell>第二党支部</md-table-cell>
            <md-table-cell>无记名</md-table-cell>
            <md-table-cell>10.01下午</md-table-cell>
            <md-button  class="md-primary"  @click="gotoDetails">详情</md-button>
            <md-button  class="md-danger">删除</md-button>
          </md-table-row>

        </md-table>
      </div>


    </div>
  </md-card>
</template>

<script>
export default {
  name: "Election2",
  methods:{
    gotoDetails(){
      this.$router.push('election-details-page')
    },
  },
}
</script>

<style scoped>

</style>