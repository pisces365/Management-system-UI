<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是民宿处理订单的后台
*/-->

<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="diagramBrown">
        <h4 class="title">民宿客户订单处理</h4>
        <p class="category">在这可以看到该民宿需要处理的订单</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="id" label="用户编号" fixed sortable></el-table-column>
          <el-table-column property="roomnum" label="房间号" ></el-table-column>
          <el-table-column property="description" label="问题描述" ></el-table-column>

          <el-table-column label="执行操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="modifyHotelCope(scope.row)"></el-button>
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteHotelCope(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="md-layout-item md-size-100 text-right">
          <el-button type="warning" round @click="addHotelCope">新增订单</el-button>
        </div>
      </md-card-content>
    </md-card>

    <el-dialog title="新增客户需求信息" :visible.sync="dialogFormVisible">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="用户编号id" :label-width="formLabelWidth">
            <el-input v-model="id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间号roomnum" :label-width="formLabelWidth">
            <el-input-number v-model="roomnum" @change="handleChange" :min="1" :max="15" ></el-input-number>
          </el-form-item>
          <el-form-item label="问题描述description" :label-width="formLabelWidth">
            <el-input v-model="description" autocomplete="off"></el-input>
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
          <el-input v-model="id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delete2">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改客户需求信息" :visible.sync="dialogFormVisible2">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="用户编号id" :label-width="formLabelWidth">
            <el-input v-model="selected_item.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="房间号roomnum" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.roomnum" @change="handleChange" :min="1" :max="10000" ></el-input-number>
          </el-form-item>
          <el-form-item label="问题描述description" :label-width="formLabelWidth">
            <el-input v-model="selected_item.description" autocomplete="off"></el-input>
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

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.roomnum).includes(toLower(term)))
  }

  return items
}

export default {
  inject: ['reload'],
  data: () => ({
    search: null,
    searched: [],
    all_hotel_cope:[],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    dialogFormVisible2: false,
    id:'',
    roomnum:'',
    description:'',
    empty_state_show:false,
    selected_item: [],
  }),
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8087/xiangliban/hotel/allCope')
        .then(successResponse => {
          this.all_hotel_cope = successResponse.data; // 将获取的数据保存
          this.empty_state_show = (this.all_hotel_cope.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_hotel_cope; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    delete2(item){
      var params = new URLSearchParams();
      params.append("id",this.id);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/hotel/deleteHotelCope',params)
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
      params.append("id",this.id);
      params.append("roomnum",this.roomnum);
      params.append("description",this.description);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/hotel/addHotelCope',params)
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
      params.append("id",this.selected_item.id);
      params.append("roomnum",this.selected_item.roomnum);
      params.append("description",this.selected_item.description);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/hotel/updateHotelCope',params)
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
    newUser () {
      window.alert('Noop')
    },
    contactAdmin() {
      window.alert('请求已收到')
    },
    handleChange(value) {
      console.log(value);
    },
    searchOnTable () {
      this.searched = searchByName(this.all_hotel_cope, this.search)
    },
    addHotelCope() {
      this.dialogFormVisible = true;
    },
    deleteHotelCope(){
      this.dialogFormVisible1 = true;
    },
    modifyHotelCope(item) {
      this.selected_item = item;
      this.dialogFormVisible2 = true;
    }
  },
  created () {
    this.searched = this.all_hotel_cope
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>