<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">用户号/房间号/问题描述</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="按房间号查找" v-model="search" @input="searchOnTable" />
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
        <md-table-cell md-label="require" md-sort-by="require">{{ item.require }}</md-table-cell>
        <md-button >查看</md-button>
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
  name: 'Hotel3',
  data: () => ({
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "555号房",
        require:"厕所堵了"
      },
      {
        id: 2,
        name: "110号房",
        require:"门锁有问题"
      },

      {
        id: 3,
        name: "166号房",
        require:"窗帘掉下来了"
      },

      {
        id: 4,
        name: "177号房",
        require:"不出热水"
      },

      {
        id: 5,
        name: "949号房",
        require:"没有拖鞋"
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