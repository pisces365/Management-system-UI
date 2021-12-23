<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是餐馆查看餐桌账单的后台
*/-->

<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="diagramPink">
        <h4 class="title">餐桌结账</h4>
        <p class="category">查看当前餐桌的账单</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="tableid" label="餐桌号" fixed sortable></el-table-column>
          <el-table-column property="tableDetail" label="菜品" ></el-table-column>
          <el-table-column property="money" label="金额" ></el-table-column>
          <el-table-column label="执行操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="modifyRestDue(scope.row)"></el-button>
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRestDue(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="md-layout-item md-size-100 text-right">
          <el-button type="primary" @click="addRestDue">新增餐桌信息</el-button>
        </div>
      </md-card-content>
    </md-card>

    <el-dialog title="新增餐馆账单信息" :visible.sync="dialogFormVisible">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="餐桌号id" :label-width="formLabelWidth">
            <el-input-number v-model="tableid" @change="handleChange" :min="1" :max="15" ></el-input-number>
          </el-form-item>
          <el-form-item label="菜品" :label-width="formLabelWidth">
            <el-input v-model="tableDetail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额money" :label-width="formLabelWidth">
            <el-input v-model="money" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="真的要删除吗真的要删除吗真的要删除吗" :visible.sync="dialogFormVisible1">
      <el-form>
        <el-form-item label="请再次输入你要删除的id" :label-width="formLabelWidth">
          <el-input v-model="tableid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delete2">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改餐馆账单信息" :visible.sync="dialogFormVisible2">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="餐桌号id" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.tableid" @change="handleChange" :min="1" :max="15" ></el-input-number>
          </el-form-item>
          <el-form-item label="菜品" :label-width="formLabelWidth">
            <el-input v-model="selected_item.tableDetail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额money" :label-width="formLabelWidth">
            <el-input v-model="selected_item.money" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modify1">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.tableid).includes(toLower(term)))
  }
  return items
}
export default {
  inject: ['reload'],
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data()  {
    return {
      search: null,
      selected: [],
      searched: [],
      all_rest_due:[],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      tableid: null,
      tableDetail: '',
      money: '',
      empty_state_show:false,
      selected_item: [],
    };
  },
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8087/xiangliban/rest/allDue')
        .then(successResponse => {
          this.all_rest_due = successResponse.data; // 将获取的数据保存
          this.empty_state_show = (this.all_rest_due.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_rest_due; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods:{
    delete2(item){
      var params = new URLSearchParams();
      params.append("id",this.tableid);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/deleteRestDue',params)
          .then(successResponse => {
            // console.log('inject success')
            this.$message({
              type: 'success',
              message: '删除成功！！'
            })
            this.reload();
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            // this.errored = true // 在前端提示用户出错
            this.$message.error('出错啦！')
          })
          .finally(() => this.loading = false) // 将加载中动画设为不可见
    },
    submit(item) {
      var params = new URLSearchParams();
      params.append("tableid",this.tableid);
      params.append("tableDetail",this.tableDetail);
      params.append("money",this.money);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/addRestDue',params)
          .then(successResponse => {
            // console.log('inject success')
            this.$message({
              type: 'success',
              message: '新增成功！！'
            })
            this.reload();
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            // this.errored = true // 在前端提示用户出错
            this.$message.error('出错啦！')
          })
          .finally(() => this.loading = false) // 将加载中动画设为不可见
    },
    modify1(item) {
      var params = new URLSearchParams();
      params.append("tableid",this.selected_item.tableid);
      params.append("tableDetail",this.selected_item.tableDetail);
      params.append("money",this.selected_item.money);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/updateRestDue',params)
          .then(successResponse => {
            // console.log('inject success')
            this.$message({
              type: 'success',
              message: '修改成功！！'
            })
            this.reload();
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            // this.errored = true // 在前端提示用户出错
            this.$message.error('出错啦！')
          })
          .finally(() => this.loading = false) // 将加载中动画设为不可见
    },
    contactAdmin () {
      window.alert('请求已收到')
    },
    handleChange(value) {
      console.log(value);
    },
    searchOnTable () {
      this.searched = searchById(this.all_rest_due, this.search)
    },
    addRestDue() {
      this.dialogFormVisible = true;
    },
    deleteRestDue(){
      this.dialogFormVisible1 = true;
    },
    modifyRestDue(item){
      this.selected_item = item;
      this.dialogFormVisible2 = true;
    }
  },
  created () {
    this.searched = this.all_rest_due
  },
};
</script>