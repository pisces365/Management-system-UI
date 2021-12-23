<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"></h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="按地名进行查找" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`"
          v-show="user_empty"
      >
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" >{{ item.hospital_location_id }}</md-table-cell>
        <md-table-cell md-label="Name（地名）" md-sort-by="name">{{ item.hospital_location_name }}</md-table-cell>
        <md-table-cell md-label="Wait number（等待人数）">{{ item.wait_number }}</md-table-cell>
        <md-table-cell md-label="CrowdedSituation（拥挤情况）">{{ item.crowded_situation }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout-item md-size-100 text-right">
      <md-button class="md-raised md-success" @click="addAddress">新增地名</md-button>
      <md-button class="md-raised md-success" @click="Crowd">查看拥挤程度图</md-button>
    </div>
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
    search: null,
    searched: [],
    user_empty: false,
   users: []
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
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search);
      this.user_empty = (this.searched.length == 0) ? false : true;
    },
      addAddress () {
        this.$router.push('add-address')
      },
      Crowd(){
      this.$router.push('CrowdChart')
      },
    },

  created () {
    this.searched = this.users
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}

</style>