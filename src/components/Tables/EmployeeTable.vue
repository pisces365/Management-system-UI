<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="姓名">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="薪水">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="城市">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="入职时间">{{ item.time }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
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
          name: "小明",
          salary: "¥36,738",
          city: "杭州",
          time: "2021年11月10日",
        },
        {
          id: 2,
          name: "小红",
          salary: "¥23,738",
          city: "武汉",
          time: "2020年8月7日",
        },
        {
          id: 3,
          name: "小黄",
          salary: "¥56,142",
          city: "杭州",
          time: "2017年9月10日",
        },
        {
          id: 4,
          name: "小黑",
          salary: "¥38,735",
          city: "上海",
          time: "2016年3月17日",
        },
      ],
    };
  },
};
</script>
