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
          <h1 class="md-title">公交车路线列表</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-start">
          <md-input
            placeholder="查询公交车路线"
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
          v-if="empty_state_show"
        md-label="无结果"
        :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入`"
      >
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="公交车路线" md-sort-by="routeName" >{{
          item.routeName
        }}</md-table-cell>
        <md-table-cell md-label="起始站" md-sort-by="startStop" md-numeric >{{
          item.startStop
        }}</md-table-cell>
        <md-table-cell md-label="终点站" md-sort-by="endStop" md-numeric>{{
          item.endStop
        }}</md-table-cell>
        <md-table-cell md-label="发车时间" md-sort-by="startTime" md-numeric>{{
          item.startTime
        }}</md-table-cell>
        <md-table-cell md-label="结束时间" md-sort-by="endTime" md-numeric>{{
          item.endTime
        }}</md-table-cell>
        <md-table-cell md-label="发车间隔" md-sort-by="depature_interval"  md-numeric>{{
          item.intervalTime
        }}</md-table-cell>
        <md-table-cell md-label="操作" md-numeric >
       <!--   <md-button class="md-raised md-primary" data-background-color="blue" @click="getDetails1(item.routeName)">查看</md-button>
          <md-button class="md-raised md-primary" data-background-color="blue" @click="getDetails1(item.routeName)">编辑</md-button>
          <md-button class="md-raised md-primary" data-background-color="blue" @click="getDetails1(item.routeName)">修改路线</md-button>-->
          <!-- 点击此按钮展示当前条目完整信息 -->
          <el-button type="primary" @click="getRouteMap(item.routeName)" icon="el-icon-map-location"/>
          <!-- 点击此按钮打开修改信息页 -->
          <el-button type="warning" @click="alterSelectedDetails(item)" icon="el-icon-edit"/>
          <!-- 点击此按钮二次确认是否删除 -->
          <el-button type="danger" @click="open(item)" icon="el-icon-delete"/>
     <!--     <el-button type="primary" icon="el-icon-search">修改路线</el-button>-->
        </md-table-cell>
        <md-table-cell>
          <el-button type="primary" icon="el-icon-search" @click="getStopList(item.busId,item.routeName)">修改路线</el-button>
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
        >新增路线</el-button
      >
    </div>
    <div>
      <!--修改当前路线信息对话，根据变量alterBusVisible的值展示/关闭-->
      <el-dialog title="编辑路线" :visible.sync="alterBusVisible">
        <el-card class="box-card">
          <el-form>
            <el-form-item label="公交车编号" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.busId" autocomplete="off" :disabled="true"/>
            </el-form-item>
            <el-form-item label="路线名" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.routeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="公交类型" :label-width="formLabelWidth">
              <el-select v-model="alterBusData.type" placeholder="请选择">
                <el-option label="普通公交" value="普通公交"></el-option>
                <el-option label="电动公交" value="电动公交"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发车时间" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.startTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.endTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="发车间隔" :label-width="formLabelWidth">
              <el-input
                  v-model="alterBusData.intervalTime"
                  autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="executeUpdate('update')"
          >确认修改</el-button
          >
        </div>
      </el-dialog>



      <!--新增路线对话框-->
      <el-dialog title="新增路线" :visible.sync="addBusVisible">
        <el-card class="box-card">
          <el-form>
            <el-form-item label="公交车编号" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.busId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="路线名" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.routeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="公交类型" :label-width="formLabelWidth">
              <el-select v-model="alterBusData.type" placeholder="请选择">
                <el-option label="普通公交" value="普通公交"></el-option>
                <el-option label="电动公交" value="电动公交"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发车时间" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.startTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
              <el-input v-model="alterBusData.endTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="发车间隔" :label-width="formLabelWidth">
              <el-input
                v-model="alterBusData.intervalTime"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="executeUpdate('new')"
            >确认新增</el-button
          >
        </div>
      </el-dialog>
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
      toLower(item.routeName).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "bus-lines-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    return {
      search: null,
      selected: [],
      searched: [], // 模糊查询的结果
      all_bus_line: [], //从后台获取的全部公交线路
      list_empty: false, // 从后台获取的公交列表是否为空
      searched_empty: false, // 模糊查询结果是否为空
      errored: false, // 从后台获取数据是否出错
      loading: true, // 是否正在从后台获取数据
      addBusVisible: false, //增加弹窗是否可见
      alterBusVisible:false, //更改详情弹窗是否可见
      formLabelWidth: "120px",
      alterBusData: [], //要更改的课程类别
      empty_state_show:false,
    };
  },
  //初始化页面完成后，从后台获取全部的公交路线
  mounted() {
    this.$axios
      .get("http://112.124.35.32:8082/SelectBusList")
      .then((successResponse) => {
        this.all_bus_line = successResponse.data; // 将获取的数据保存
        this.empty_state_show = this.all_bus_line.isEmpty ? true : false; // 将获取数据是否为空保存
        this.searched = this.all_bus_line; // 再次初始化显示的内容
      })
      .catch((error) => {
        console.log(error); // 记录出错信息
        this.errored = true; // 在前端提示用户出错
      })
      .finally(() => (this.loading = false)); // 将加载中动画设为不可见
  },
  methods: {
    addBus() {
      this.addBusVisible = true;
    },
    getRouteMap(id) {
      this.$router.push({
        path: "/buslinemapc",
        query: {
          name: id,
        },
      });
    },
    getStopList(id,bname){
      this.$router.push({
        path: "/busstoplist",
        query:{
          bid:id,
          bname:bname,
        }
      })
    },
    contactAdmin() {
      window.alert("请求已收到");
    },
    searchOnTable() {
      this.searched = searchById(this.all_bus_line, this.search);
    },

    //点击修改路线详情后，获取当前路线信息并设置对话框可见
    alterSelectedDetails(item){
      this.selected.pop();
      this.selected.push(item);
      this.alterBusData=item;  //当前条目放入变量中保存
      this.alterBusVisible=true;
    },


    //更新和新增的方法
    executeUpdate(item) {
      if (item === "update") {
        this.$axios
            .post("http://112.124.35.32:8082/UpdateBus", {
              busId: this.alterBusData.busId,
              routeName: this.alterBusData.routeName,
              type: this.alterBusData.type,
              startTime: this.alterBusData.startTime,
              endTime: this.alterBusData.endTime,
              intervalTime: this.alterBusData.intervalTime,
            })
            .then((successResponse) => {
              console.log(successResponse.data);
              this.$message({
                type: "success",
                message: "路线已经更新",
              });
              this.reload();
            })
            .catch((ailResponse) => {
              this.$message.error("出错了，路线信息更新失败！");
            });
      } else if (item === "new") {
        this.$axios
          .post("http://112.124.35.32:8082/InsertBus", {
            busId: this.alterBusData.busId,
            routeName: this.alterBusData.routeName,
            type: this.alterBusData.type,
            startTime: this.alterBusData.startTime,
            endTime: this.alterBusData.endTime,
            intervalTime: this.alterBusData.intervalTime,
          })
          .then((successResponse) => {
            console.log(successResponse.data);
            this.$message({
              type: "success",
              message: "路线已经新增",
            });
            this.reload();
          })
          .catch((failResponse) => {
            this.$message.error("出错了，路线信息新增失败！");
          });
      }
    },
    //删除时二次确认
    open(item){
      this.$confirm('此操作将永久删除该路线，是否继续？','确认删除',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$axios.get('http://112.124.35.32:8082/DeleteBus/'+item.routeName)
        .then(successResponse=>{
          console.log(successResponse.data);
          this.$message({
            type:'success',
            message:'路线已经删除'
          });
          this.reload();
        }).catch(failResponse=>{
          this.$message.error('出错了，路线删除失败！');
          this.reload();
        })
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        });
        this.reload();
      })
    }
  },
  created() {
    this.searched = this.all_bus_line;
  },
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
