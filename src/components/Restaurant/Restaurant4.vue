<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">编号/菜品名字/单价/售出份数/总金额</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="输入菜品名字" v-model="search" @input="searchOnTable" />
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
        <md-table-cell md-label="price" md-sort-by="price">{{ item.price }}</md-table-cell>
        <md-table-cell md-label="num" md-sort-by="num">{{ item.num }}</md-table-cell>
        <md-table-cell md-label="money" md-sort-by="money">{{ item.money }}</md-table-cell>
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
        name: "红烧肉",
        price:"50",
        num:"100",
        money:"5000"
      },
      {
        id: 2,
        name: "扬州炒饭",
        price:"20",
        num:"100",
        money:"2000"
      },
      {
        id: 3,
        name: "糖醋里脊",
        price:"15",
        num:"50",
        money:"750"
      },
      {
        id: 4,
        name: "地锅鸡",
        price:"68",
        num:"50",
        money:"3400"
      },
      {
        id: 5,
        name: "酸溜土豆丝",
        price:"10",
        num:"30",
        money:"300"
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