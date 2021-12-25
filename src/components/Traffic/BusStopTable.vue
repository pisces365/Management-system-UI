<template>
  <div>
    <md-table
      v-model="searched"
      :table-header-color="tableHeaderColor"
      md-sort="busline-id"
      md-sort-order="asc"
      md-fixed-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">公交车站列表</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-start">
          <md-input
            placeholder="查询公交车站"
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="无结果"
        :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`"
      >
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="公交车站编号" md-sort-by="routeName">{{
          item.id
        }}</md-table-cell>
        <md-table-cell md-label="车站名" md-sort-by="startStop">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="经度" md-sort-by="endStop">{{
          item.location.lng
        }}</md-table-cell>
        <md-table-cell md-label="纬度" md-sort-by="startTime">{{
          item.location.lat
        }}</md-table-cell>
        <md-table-cell md-label="顺序" md-sort-by="endTime">{{
          item.sequence
        }}</md-table-cell>
        <md-table-cell md-label="详细信息">
          <!-- 点击此按钮展示当前条目完整信息 -->
          <el-button type="primary" @click="getRouteMap(item.routeName)" icon="el-icon-info"/>
          <!-- 点击此按钮打开修改信息页 -->
          <el-button type="warning" @click="alterSelectedDetails(item)" icon="el-icon-edit"/>
          <!-- 点击此按钮二次确认是否删除 -->
          <el-button type="danger" @click="open(item)" icon="el-icon-delete"/>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br />
    <div class="md-layout-item md-size-100 text-right">
      <el-button
          type="success"
          @click="
          addBus();
        "
      >新增车站</el-button
      >
    </div>
  </div>
</template>

<script>

const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchById = (items, term) => {
  if (term) {
    return items.filter((item) =>
        toLower(item.id).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "bus-stop-table",
  data() {
    return {
      search: null,
      searched: [], //模糊查询的结果
      stops: [
        {
          id:10,
          name:10,
          location:{
            lng:10,
            lat:10
          },
          sequence:1
        }
      ],
      addStopVisible:false  //增加弹窗是否可见
    };
  },
  methods:{
    searchOnTable() {
      this.searched = searchById(this.stops,this.search);
    },
  },
  created() {
    this.$axios.get()
  },
};
</script>

<style scoped></style>
