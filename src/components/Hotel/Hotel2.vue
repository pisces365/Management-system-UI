<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">用户号/房源类型/已使用/剩余</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="按房源类型进行查找" v-model="search" @input="searchOnTable" />
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
        <md-table-cell md-label="Used" md-sort-by="used">{{ item.used }}</md-table-cell>
        <md-table-cell md-label="Rest" md-sort-by="rest">{{ item.rest }}</md-table-cell>
        <md-button>查看</md-button>
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
  name: 'Hotel2',
  data: () => ({
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "标间",
        used:  "150",
        rest: "50"

      },
      {
        id: 2,
        name: "大床房",
        used:  "33",
        rest: "44"
      },
      {
        id: 3,
        name: "总统套房",
        used:  "14",
        rest: "60"
      },
      {
        id: 4,
        name: "三人房",
        used:  "88",
        rest: "25"
      },
      {
        id: 5,
        name: "国王套房",
        used:  "76",
        rest: "53"
      },
      {
        id: 6,
        name: "亲子房",
        used:  "55",
        rest: "6"
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