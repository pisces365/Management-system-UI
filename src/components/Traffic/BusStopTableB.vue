<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="车站编号">{{ item.id }}</md-table-cell>

        <md-table-cell md-label="车站名">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="经度">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="纬度">{{ item.time }}</md-table-cell>
        <md-table-cell md-label="顺序">{{ item.item }}</md-table-cell>

        <md-table-cell md-label=""><md-button class="md-raised md-primary" data-background-color="blue">查看</md-button> <md-button class="md-raised md-accent" data-background-color="red">取消</md-button></md-table-cell>





      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "order-table-A",
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
          name: "Dakota Rice",
          phone:"13376545678",
          time:"2021-10-10 19:26",
          item:"洗浴/汗蒸",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          phone:"1337643278",
          time:"2021-11-10 11:26",
          item:"养生SPA",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          phone:"1434545678",
          time:"2021-12-12 7:26",
          item:"魔力空间蹦床",
        },
        {
          id: 4,
          name: "Philip Chaney",
          phone:"13376545678",
          time:"2021-10-10 19:26",
          item:"VR体验",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
small {
  display: block;
}
</style>
