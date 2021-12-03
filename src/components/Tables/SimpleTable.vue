<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Crowded Situation">{{ item.situation }}</md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      users: [
        {
          id: 1,
          address:"一楼大厅",
          situation:"良好"
        },
        {
          id: 2,
          address:"一楼药房",
          situation:"拥挤"
        },
        {
          id: 3,
          address:"二楼皮肤科科室",
          situation:"空闲"
        },
        {
          id: 4,
          address:"三楼肛肠科科室",
          situation:"良好"
        },
        {
          id: 5,
          address:"四楼住院部走廊",
          situation:"空闲"
        },

      ],
    };
  },
};
</script>
