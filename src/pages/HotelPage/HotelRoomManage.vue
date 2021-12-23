<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是民宿处理房源息的后台
*/-->


<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="diagramOrange">
        <h4 class="title">房源管理</h4>
        <p class="category">在这可以看到该房源使用情况和剩余房源</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="id" label="房间编号" fixed sortable></el-table-column>
          <el-table-column property="roomtype" label="房间类型名字" ></el-table-column>
          <el-table-column property="roomused" label="已使用" ></el-table-column>
          <el-table-column property="roomrest" label="剩余" sortable></el-table-column>
          <el-table-column label="执行操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="modifyHotelManage(scope.row)"></el-button>
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteHotelManage(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="md-layout-item md-size-100 text-right">
          <el-button  type="warning" round  @click="addHotelManage">新增房源</el-button>
        </div>
      </md-card-content>
    </md-card>

    <el-dialog title="新增房间类型信息" :visible.sync="dialogFormVisible">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="房间名id" :label-width="formLabelWidth">
            <el-input v-model="id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间类型名name" :label-width="formLabelWidth">
            <el-input v-model="roomtype" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已使用roomused" :label-width="formLabelWidth">
            <el-input-number v-model="roomused" @change="handleChange" :min="1" :max="1000" ></el-input-number>
          </el-form-item>
          <el-form-item label="剩余房间roomrest" :label-width="formLabelWidth">
            <el-input-number v-model="roomrest" @change="handleChange" :min="1" :max="1000" ></el-input-number>
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
    <el-dialog title="修改房间类型信息" :visible.sync="dialogFormVisible2">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="房间名id" :label-width="formLabelWidth">
            <el-input v-model="selected_item.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="房间类型名name" :label-width="formLabelWidth">
            <el-input v-model="selected_item.roomtype" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="已使用roomused" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.roomused" @change="handleChange" :min="1" :max="1000" ></el-input-number>
          </el-form-item>
          <el-form-item label="剩余房间roomrest" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.roomrest" @change="handleChange" :min="1" :max="1000" ></el-input-number>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modify">提交</el-button>
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
    return items.filter(item => toLower(item.roomtype).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'Hotel2',
  inject: ['reload'],
  data: () => ({
    search: null,
    searched: [],
    all_hotel_room:[],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    dialogFormVisible2: false,

    id:'',
    roomtype:'',
    roomused:'',
    roomrest:'',
    empty_state_show:false,
    selected_item: [],
  }),
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8087/xiangliban/hotel/allroom')
        .then(successResponse => {
          this.all_hotel_room = successResponse.data; // 将获取的数据保存
          this.empty_state_show = (this.all_hotel_room.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_hotel_room; // 再次初始化显示的内容
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
          .post('http://112.124.35.32:8087/xiangliban/hotel/deleteHotelManage',params)
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
      params.append("roomtype",this.roomtype);
      params.append("roomused",this.roomused);
      params.append("roomrest",this.roomrest);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/hotel/addHotelManage',params)
          .then(successResponse => {
            // console.log('inject success')
            this.$message({
              type: 'success',
              message: '新增房源成功！！'
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
    modify(item) {
      var params = new URLSearchParams();
      params.append("id",this.selected_item.id);
      params.append("roomtype",this.selected_item.roomtype);
      params.append("roomused",this.selected_item.roomused);
      params.append("roomrest",this.selected_item.roomrest);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/hotel/updateHotelManage',params)
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
    searchOnTable () {
      this.searched = searchByName(this.all_hotel_room, this.search)
    },
    addHotelManage() {
      this.dialogFormVisible = true;
    },
    deleteHotelManage(){
      this.dialogFormVisible1 = true;
    },
    handleChange(value) {
      console.log(value);
    },
    modifyHotelManage(item){
      this.selected_item = item;
      this.dialogFormVisible2 = true;
    }
  },
  created () {
    this.searched = this.all_hotel_room
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>