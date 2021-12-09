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
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" >{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name（地名）" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Wait number（等待人数）">{{ item.number }}</md-table-cell>
        <md-table-cell md-label="CrowdedSituation（拥挤情况）">{{ item.situation }}</md-table-cell>
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
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "一楼内科诊室",
        number: "20",
        situation:"正常",
      },
      {
        id: 2,
        name: "二楼外科诊室",
        number: "05",
        situation:"空闲",
      },
      {
        id: 3,
        name: "二楼皮肤科诊室",
        number: "08",
        situation:"空闲",
      },
      {
        id: 4,
        name: "三楼肛肠科诊室",
        number: "10",
        situation:"良好",
      },
      {
        id :5,
        name: "四楼儿科诊室",
        number: "36",
        situation:"拥挤",
      },
      {
        id :6,
        name: "五楼妇科诊室",
        number: "23",
        situation:"良好",
      },
      {
        id :7,
        name: "一楼大厅",
        number: "55",
        situation:"拥挤",
      },
      {
        id :8,
        name: "一楼点滴室",
        number: "44",
        situation:"良好",
      },
      {
        id :9,
        name: "七楼住院部走廊",
        number: "23",
        situation:"良好",
      },
      {
        id :10,
        name: "一楼取药房",
        number: "17",
        situation:"良好",
      },
    ],
  }),
  methods: {
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
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