<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">{{ bname }}公交车路线</h4>
            <p class="category">经过的车站列表</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table
                v-model="searched"
                :table-header-color="tableHeaderColor"
                md-sort="sequence"
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
                  <md-table-cell md-label="顺序" md-sort-by="sequence">{{
                    item.sequence
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
          <!--修改车站顺序，根据变量alterBusVisible的值展示/关闭-->
          <el-dialog title="编辑车站顺序" :visible.sync="alterStopVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="车站名" :label-width="formLabelWidth">
                  <el-input v-model="alterStopData.name" auto-complete="off" disabled="true"/>
                </el-form-item>
                <el-form-item label="原顺序" :label-width="formLabelWidth">
                  <el-input v-model="alterStopData.sequence" auto-complete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新顺序" :label-width="formLabelWidth" prop="sequence">
                  <el-select v-model="ruleForm.sequence" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in stop_list"
                        :key="index+1"
                        :label="index+1"
                        :value="index+1">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeUpdate('update')"
              >确认修改</el-button
              >
            </div>
          </el-dialog>
          <!--新增一个所经车站，根据变量addStopVisible的值展示/关闭 -->
          <el-dialog title="新增一个所经车站" :visible.sync="addStopVisible">
            <el-card class="box-card">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="车站" :label-width="formLabelWidth" prop="name">
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="ruleForm.name"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.name }}</div>
                      <span class="addr">经度:{{ item.location.lng }},纬度:{{item.location.lat }}</span>
                    </template>
                  </el-autocomplete>
                </el-form-item>
                <el-form-item label="顺序" :label-width="formLabelWidth" prop="sequence">
                  <el-select v-model="ruleForm.sequence" placeholder="请选择">
                    <el-option value="1" label="1" key="1"></el-option>
                    <el-option
                        v-for="(item,index) in stop_list"
                        :key="index+2"
                        :label="index+2"
                        :value="index+2">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitForm('ruleForm');executeUpdate('new')">确认新增</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchById = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.id).includes(toLower(term)));
  }
  return items;
};
export default {
  name: "bus-stop-table",
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    var checkName=(rule,value,callback)=>{
      if(value===''){
        callback(new Error('请输入车站'));
      }
      else {
        if (this.ruleForm.name!==''){
          this.$refs.ruleForm.validateField('checkName');
        }
        callback();
      }
    }
    var checkSequence=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('顺序不能为空'));
      }
      setTimeout(()=>{
        if(!Number.isInteger(value)){
          callback(new Error("请输入数字值"));
        }else{
          if(value<1){
            callback(new Error("顺序必须大于0"));
          }
          else {
            callback();
          }
        }
      },10);
    };
    return {
      bname: "", //从上个页面传来的公交车路线名
      bid: "111", //从上个页面传过来的公交车编号
      search: null,
      searched: [], //模糊查询的结果
      stops: [
        {
          id: 10,
          name: 10,
          location: {
            lng: 10,
            lat: 10,
          },
          sequence: 1,
        },
      ],
      addStopVisible: false, //增加弹窗是否可见
      alterStopVisible:false, //编辑弹窗是否可见
      stop_list: [], //页面初始化时获取的所有所经车站
      list_empty: false, //初始获取到的数据是否为空
      searched_empty: false, // 搜素结果是否为空
      formLabelWidth: "120px",
      all_stop_list: [], //数据库里所有的公交车站列表
      state: "",
      ruleForm:{     //用于校验
        sequence:'',
        name:'',
      },
      rules:{
        sequence: [
          {validator:checkSequence,trigger:'blur'},
        ],
        name:[
          {validator:checkName,trigger:'blur'},
        ]
      },
      empty_state_show:false,
      alterStopData:[], //要更改顺序的车站
    };
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
        //  alert('submit!');
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //点击新增车站后，设置对话框可见
    addStop() {
      this.addStopVisible = true;
    },

    //点击修改路线详情后，获取当前路线信息并设置对话框可见
    alterSelectedDetails(item){
      this.alterStopData=item;  //当前条目放入变量中保存
      this.alterStopVisible=true;
    },

    searchOnTable() {
      this.searched = searchById(this.stop_list, this.search);
      this.searched_empty = this.searched.isEmpty ? false : true;
    },
    //获取传来的参数bid公交车编号
    getParams() {
      //取到路由带过来的参数
      let routerParams = this.$route.query.bid;
      //将数据方在当前组件的数据内
      this.bid = this.$route.query.bid;
      this.bname = this.$route.query.bname;
    },
    querySearch(queryString, cb) {
      var all_stop_list = this.all_stop_list;
      var results = queryString
        ? all_stop_list.filter(this.createFilter(queryString))
        : all_stop_list;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (all_stop) => {
        return (
          all_stop.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //在添加车站时获取所部车站以便选择
    loadAllStop() {
      this.$axios
        .get("http://112.124.35.32:8082/SelectAllBusStop")
        .then((successResponse) => {
          this.all_stop_list = successResponse.data; // 将获取的数据保存
        })
        .catch((error) => {
          console.log(error); // 记录出错信息
          this.errored = true; // 在前端提示用户出错
        })
        .finally(() => (this.loading = false)); // 将加载中动画设为不可见
    },
    handleSelect(item) {
      this.state=item.name;
      this.ruleForm.name=item.name;
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //执行对路线的修改，或者在路线中新增车站
    executeUpdate(item){
      if(item==="update"){
        this.$axios.post("http://112.124.35.32:8082/AdjustStopSequence",{
          routeName:this.bname,
          stopName:this.alterStopData.name,
          newSequence:this.ruleForm.sequence,
          sequence:this.alterStopData.sequence,
        }).then((successResponse) => {
          console.log(successResponse.data);
          this.$message({
            type: "success",
            message: "车站顺序已经修改",
          });
          this.reload();
        }).catch((failResponse) => {
          this.$message.error("出错了，修改失败！");
        });
      }else if(item==="new"){
        this.$axios.post("http://112.124.35.32:8082/InsertStopToRoute",{
          routeName:this.bname,
          stopName:this.ruleForm.name,
          sequence:this.ruleForm.sequence,
        }).then((successResponse) => {
          console.log(successResponse.data);
          this.$message({
            type: "success",
            message: "车站已经新增",
          });
          this.reload();
        }).catch((failResponse) => {
          this.$message.error("出错了，新增失败！");
        });
      }
    },
    //删除时二次确认
    open(item){
      this.$confirm('此操作将删除该所经车站，是否继续？','确认删除',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$axios.post('http://112.124.35.32:8082/DeleteStopFromRoute',{
          routeName:this.bname,
          stopName:item.name,
          sequence:item.sequence,
          stopId:item.id,
        }).then(successResponse=>{
              console.log(successResponse.data);
              this.$message({
                type:'success',
                message:'所经已经删除'
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
  mounted() {
    this.all_stop_list = this.loadAllStop();
  },
  created() {
    this.getParams(); //获得传来的参数bid
    this.$axios
      .get("http://112.124.35.32:8082/SelectBusStopByBusId/" + this.bid)
      .then((successResponse) => {
        this.stop_list = successResponse.data; // 将获取的数据保存
        this.empty_state_show = this.stop_list.isEmpty ? true : false; // 将获取数据是否为空保存
        this.searched = this.stop_list; // 再次初始化显示的内容
      })
      .catch((error) => {
        console.log(error); // 记录出错信息
        this.errored = true; // 在前端提示用户出错
      })
      .finally(() => (this.loading = false)); // 将加载中动画设为不可见
  },
  watch: {
    //监测路由变化，只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams",
  },
};
</script>

<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
  li {
    line-height: normal;
    padding: 7px;

  }

</style>
