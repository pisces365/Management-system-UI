<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">用户号/姓名/身份证号码/电话号码/家庭住址</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="按姓名查找" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="IDnum" md-sort-by="idnum">{{ item.idnum }}</md-table-cell>
        <md-table-cell md-label="telephone" md-sort-by="telephone">{{ item.telephone }}</md-table-cell>
        <md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>

      </md-table-row>
    </md-table>
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
        name: "Shawna Dubbin",
        idnum:"656",
        telephone:"5161",
        address:"杭州西湖"
      },
      {
        id: 2,
        name: "mike",
        idnum:"655166",
        telephone:"516161",
        address:"旧金山"
      },
      {
        id: 3,
        name: "是指好",
        idnum:"656456",
        telephone:"5154661",
        address:"杭州小和山"
      },
      {
        id: 4,
        name: "WWWWWWW",
        idnum:"65456446",
        telephone:"516145645",
        address:"北京东城"
      },
      {
        id: 5,
        name: "维奥莱",
        idnum:"656",
        telephone:"5161",
        address:"华东理工"
      },

    ]
  }),
  methods: {
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
    }
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