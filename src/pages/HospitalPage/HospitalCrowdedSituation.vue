<template>
  <div class="content">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">医院拥挤情况</h4>
            <p class="category">在这可以看到医院各个不同地方的拥挤情况</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-size-25" style="float: right">
              <el-input placeholder="查询地名" v-model="search" @input="searchOnTable"/>
            </div>
            <el-table :data="searched" style="width: 100%" max-height="400">
              <el-table-column property="hospital_location_id" label="地名编号" fixed sortable></el-table-column>
              <el-table-column property="hospital_location_name" label="地名" ></el-table-column>
              <el-table-column property="wait_number" label="等待人数" ></el-table-column>
              <el-table-column property="crowded_situation" label="拥挤情况"></el-table-column>
            </el-table>

          </md-card-content>
        </md-card>

  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.hospital_location_name).includes(toLower(term)))
  }
  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: '',
    searched: [],
    users: [],
    user_empty: false
  }),
  beforeCreate() {
    this.$axios
        .get('http://112.124.35.32:8085/xiangliban/selectHospitalLocationPersons')
        .then(successResponse => {
          console.log(successResponse.data);
          this.users = successResponse.data; // 将获取的数据保存
          this.searched = successResponse.data;
        })
        .catch(error => {
          console.log(error) // 记录出错信息
        })
  },
  methods: {
    newUser() {
      window.alert('Noop')
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
      this.user_empty = (this.searched.length == 0) ? false : true;
    }
  },
  created() {
    this.searched = this.users
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>