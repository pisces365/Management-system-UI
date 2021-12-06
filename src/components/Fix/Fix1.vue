<template>

    <div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label for="movie">类别</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label for="movie">类别</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-field>
            <label for="movie">类别</label>
            <md-select v-model="movie" name="movie" id="movie">
              <md-option value="门窗类">门窗类</md-option>
              <md-option value="水电类">水电类</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
      <div>
        <md-field>
          <label>编号</label>
          <md-input v-model="id"></md-input>
        </md-field>

        <md-field>
          <label>类别</label>
          <md-input v-model="type" readonly></md-input>
        </md-field>

        <md-field>
          <label>创建时间</label>
          <md-input v-model="createtime"></md-input>
        </md-field>

        <md-field>
          <label>地点</label>
          <md-input v-model="address"></md-input>
        </md-field>

        <md-field>
          <label>申报人</label>
          <md-input v-model="applyman" ></md-input>
        </md-field>
        <md-field md-inline>
          <label>维修人员</label>
          <md-input v-model="fixman"></md-input>
        </md-field>
        <md-field>
          <label>具体问题</label>
          <md-textarea v-model="situation"></md-textarea>
        </md-field>
        <md-field>
          <label>上门时间</label>
          <md-input v-model="fixtime"></md-input>
        </md-field>
        <md-field>
          <label>状态</label>
          <md-input v-model="state"></md-input>
        </md-field>


      </div>
    </div>

</template>

<script>
export default {
  name: "Fix1",
  data: () => ({
    id: '555',
    type: "门窗类",
    createtime: "2020-10-1",
    address: "小和山",
    applyman: "施志豪",
    fixman: "Mr.smith",
    situation: "门窗稀烂",
    fixtime: "2021-10-1",
    state : "已完工",
  })
}
</script>

<style scoped>

</style>