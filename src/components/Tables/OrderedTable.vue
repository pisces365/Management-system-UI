<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Wait number">{{ item.number }}</md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
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
          name: "内科",
          number: "50",
        },
        {
          id: 2,
          name: "外科",
          number: "00",
        },
        {
          id: 3,
          name: "皮肤科",
          number: "8",
        },
        {
          id: 4,
          name: "肛肠科",
          number: "10",
        },
        {
          id :5,
          name: "儿科",
          number: "56",
        },
        {
          id :6,
          name: "妇科",
          number: "23",
        },
      ],
    };
  },
};
</script>
