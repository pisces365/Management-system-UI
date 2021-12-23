<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4  class="title">公交车站管理</h4>
            <p class="category">车站列表</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table
                  v-model="searched"
                  md-sort="sequence"
                  md-sort-order="asc"
                  md-fixed-header
              >
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">全部车站列表</h1>
                  </div>
                  <md-field md-clearable class="md-toolbar-section-start">
                    <md-input placeholder="查询公交车站" v-model="search" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>
                <md-table-empty-state
                    v-if="empty_state_show"
                    md-label="无结果"
                    :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`"
                >
                </md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="公交车站编号" md-sort-by="id">{{
                      item.id
                    }}</md-table-cell>
                  <md-table-cell md-label="车站名" md-sort-by="name">{{
                      item.name
                    }}</md-table-cell>
                  <md-table-cell md-label="经度" md-sort-by="lng">{{
                      item.location.lng
                    }}</md-table-cell>
                  <md-table-cell md-label="纬度" md-sort-by="lat">{{
                      item.location.lat
                    }}</md-table-cell>
                  <md-table-cell md-label="详细信息">
                    <!-- 点击此按钮展示当前条目完整信息 -->
                    <el-button
                        type="primary"
                        @click="getRouteMap(item.routeName)"
                        icon="el-icon-info"
                    />
                    <!-- 点击此按钮打开修改信息页 -->
                    <el-button
                        type="warning"
                        @click="alterSelectedDetails(item)"
                        icon="el-icon-edit"
                    />
                    <!-- 点击此按钮二次确认是否删除 -->
                    <el-button
                        type="danger"
                        @click="open(item)"
                        icon="el-icon-delete"
                    />
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <br />
              <div class="md-layout-item md-size-100 text-right">
                <el-button type="success" @click="addStop()"
                >新增车站</el-button
                >
              </div>
            </div>
          </md-card-content>
        </md-card>
        <div>
          <!--修改车站信息，根据变量alterStopVisible的值展示/关闭-->
          <el-dialog title="编辑车站信息" :visible.sync="alterStopVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="车站编号" :label-width="formLabelWidth" disabled="true">
                  <el-input v-model="alterStopData.id" auto-complete="off" />
                </el-form-item>
                <el-form-item label="车站名" :label-width="formLabelWidth">
                  <el-input v-model="alterStopData.name" auto-complete="off" />
                </el-form-item>
                <el-form-item label="经度" :label-width="formLabelWidth">
                  <el-input v-model="alterLocation.lng" auto-complete="off" />
                </el-form-item>
                <el-form-item label="纬度" :label-width="formLabelWidth">
                  <el-input v-model="alterLocation.lat" auto-complete="off" />
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeUpdate('update')"
              >确认修改</el-button
              >
            </div>
          </el-dialog>
          <!--新增一个车站，根据变量addStopVisible的值展示/关闭-->
          <el-dialog title="新增一个车站" :visible.sync="addStopVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="车站编号" :label-width="formLabelWidth">
                  <el-input v-model="addStopData.id" auto-complete="off" />
                </el-form-item>
                <el-form-item label="车站名" :label-width="formLabelWidth">
                  <el-input v-model="addStopData.name" auto-complete="off" />
                </el-form-item>
                <el-form-item label="经度" :label-width="formLabelWidth">
                  <el-input v-model="addStopData.lng" auto-complete="off" />
                </el-form-item>
                <el-form-item label="纬度" :label-width="formLabelWidth">
                  <el-input v-model="addStopData.lat" auto-complete="off" />
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
<!--              <el-button type="primary" @click="addPositionShow()"-->
<!--              >查看地图</el-button-->
<!--              >-->
              <el-button type="primary" @click="executeUpdate('new')"
              >确认新增</el-button
              >
            </div>
          </el-dialog>
<!--          <Position v-if="positionShow" :maker-position.sync="position" :dialog-visible.sync="positionShow" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Position from "../components/Traffic/Position";
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchById = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.name).includes(toLower(term)));
  }
  return items;
};
export default {
  // components:{
  //   Position,
  // },
  name: "AllBusStopList",
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data(){
    return {
      position:false,
      positionShow:false,
      search: null,
      searched: [], //模糊查询的结果
      all_stop_list: [], //数据库里所有的公交车站列表
      searched_empty: false, // 搜素结果是否为空
      list_empty: false, //初始获取到的数据是否为空
      addStopVisible: false, //增加弹窗是否可见
      alterStopVisible:false, //编辑弹窗是否可见
      empty_state_show:false,
      addStopData: [],  // 要新增的车站信息
      alterStopData: [],  // 要编辑的车站信息
      alterLocation:[],
      formLabelWidth: '120px',
    }
  },
  methods:{
    //点击打开选择地点，查看经纬度
    addPositionShow(){
      this.positionShow=true;

    },
    //点击新增车站后，设置对话框可见
    addStop() {
      this.addStopVisible = true;
    },
    //点击修改路线详情后，获取当前路线信息并设置对话框可见
    alterSelectedDetails(item){
      this.alterStopData=item;  //当前条目放入变量中保存
   //   this.alterStopData.lng=item.location.lng;
   //   this.alterStopData.lat=item.location.lat;
      this.alterLocation=item.location;
      this.alterStopVisible=true;
    },
    searchOnTable() {
      this.searched = searchById(this.all_stop_list, this.search);
      this.searched_empty = this.searched.isEmpty ? false : true;
    },
    executeUpdate(item){
      if(item==="update"){
        this.$axios.post("http://112.124.35.32:8082/UpdateStop",{
          id:this.alterStopData.id,
          name:this.alterStopData.name,
          lng:this.alterLocation.lng,
          lat:this.alterLocation.lat,
        }).then((successResponse) => {
          console.log(successResponse.data);
          this.$message({
            type: "success",
            message: "车站信息已经更新",
          });
          this.reload();
        })
            .catch((failResponse) => {
              this.$message.error("出错了，车站修改失败！");
              this.reload();
            });
      }else if(item==="new"){
        this.$axios.post("http://112.124.35.32:8082/InsertStop",{
          id:this.addStopData.id,
          name:this.addStopData.name,
          lng:this.addStopData.lng,
          lat:this.addStopData.lat,
        }).then((successResponse) => {
              console.log(successResponse.data);
              this.$message({
                type: "success",
                message: "车站已经新增",
              });
              this.reload();
            })
            .catch((failResponse) => {
              this.$message.error("出错了，车站新增失败！");
            });
      }
    },
    open(item){
      this.$confirm('此操作将永久删除该车站，是否继续？','确认删除',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$axios.get('http://112.124.35.32:8082/DeleteStop/'+item.id)
            .then(successResponse=>{
              console.log(successResponse.data);
              this.$message({
                type:'success',
                message:'车站已经删除'
              });
              this.reload();
            }).catch(failResponse=>{
          this.$message.error('出错了，车站删除失败！');
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
    this.$axios
        .get("http://112.124.35.32:8082/SelectAllBusStop")
        .then((successResponse) => {
          this.all_stop_list = successResponse.data; // 将获取的数据保存
          this.empty_state_show = this.all_stop_list.isEmpty ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_stop_list; // 再次初始化显示的内容
        })
        .catch((error) => {
          console.log(error); // 记录出错信息
          this.errored = true; // 在前端提示用户出错
        })
        .finally(() => (this.loading = false)); // 将加载中动画设为不可见
  }
}
</script>

<style scoped>

</style>
