<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是餐馆查看营业额的后台
*/-->

<template>
  <div class="content">

    <md-card>
      <md-card-header data-background-color="diagramLime">
        <h4 class="title">餐馆营业情况</h4>
        <p class="category">在这可以看到该餐馆的营业情况</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="cuisine_id" label="菜品编号" fixed sortable></el-table-column>
          <el-table-column property="cuisine_name" label="菜名" ></el-table-column>
          <el-table-column property="price" label="单价" ></el-table-column>
          <el-table-column property="salenum" label="售出份数" sortable></el-table-column>
          <el-table-column property="account" label="营业额" sortable></el-table-column>
          <el-table-column label="执行操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="modifyRestBus(scope.row)"></el-button>
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRestBus(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="md-layout-item md-size-100 text-right">
          <el-button type="warning" round @click="addRestBus">新增菜品</el-button>
        </div>
      </md-card-content>
    </md-card>


    <el-dialog title="新增餐馆菜品信息" :visible.sync="dialogFormVisible">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="菜品编号cuisine_id" :label-width="formLabelWidth">
            <el-input v-model="cuisine_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜名cuisine_name" :label-width="formLabelWidth">
            <el-input v-model="cuisine_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格price" :label-width="formLabelWidth">
            <el-input-number v-model="price" @change="handleChange" :min="1" :max="10000"></el-input-number>
          </el-form-item>
          <el-form-item label="售出份数salenum" :label-width="formLabelWidth">
            <el-input-number v-model="salenum" @change="handleChange" :min="1" :max="10000"></el-input-number>
          </el-form-item>
          <el-form-item label="总价account" :label-width="formLabelWidth">
            <el-input v-model="account" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="真的要删除吗真的要删除吗真的要删除吗" :visible.sync="dialogFormVisible1">
      <el-form>
        <el-form-item label="请输入你要删除的id" :label-width="formLabelWidth">
          <el-input v-model="cuisine_id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delete2">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改餐馆菜品信息" :visible.sync="dialogFormVisible2">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="菜品编号cuisine_id" :label-width="formLabelWidth">
            <el-input v-model="selected_item.cuisine_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="菜名cuisine_name" :label-width="formLabelWidth">
            <el-input v-model="selected_item.cuisine_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格price" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.price" @change="handleChange" :min="1" :max="10000"></el-input-number>
          </el-form-item>
          <el-form-item label="售出份数salenum" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.salenum" @change="handleChange" :min="1" :max="10000"></el-input-number>
          </el-form-item>
          <el-form-item label="总价account" :label-width="formLabelWidth">
            <el-input v-model="selected_item.account" autocomplete="off"></el-input>
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
    return items.filter(item => toLower(item.cuisine_name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'TableSearch',
  inject: ['reload'],
  data: () => ({
    search: null,
    searched: [],
    all_rest_business:[],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    dialogFormVisible2: false,
    cuisine_id: '',
    cuisine_name: '',
    price: '',
    salenum: '',
    account: '',
    empty_state_show:false,
    selected_item: [],
  }),
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8087/xiangliban/rest/allBusiness')
        .then(successResponse => {
          this.all_rest_business = successResponse.data; // 将获取的数据保存
          this.empty_state_show = (this.all_rest_business.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_rest_business; // 再次初始化显示的内容
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
      params.append("id",this.cuisine_id);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/deleteRestBusiness',params)
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
      params.append("cuisine_id",this.cuisine_id);
      params.append("cuisine_name",this.cuisine_name);
      params.append("price",this.price);
      params.append("salenum",this.salenum);
      params.append("account",this.account);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/addRestBusiness',params)
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
      params.append("cuisine_id",this.selected_item.cuisine_id);
      params.append("cuisine_name",this.selected_item.cuisine_name);
      params.append("price",this.selected_item.price);
      params.append("salenum",this.selected_item.salenum);
      params.append("account",this.selected_item.account);

      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/rest/updateRestBusiness',params)
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
    handleChange(value) {
      console.log(value);
    },
    searchOnTable () {
      this.searched = searchByName(this.all_rest_business, this.search)
    },
    addRestBus() {
      this.dialogFormVisible = true;
    },
    deleteRestBus(){
      this.dialogFormVisible1 = true;
    },
    modifyRestBus(item){
      this.selected_item = item;
      this.dialogFormVisible2 = true;
    }
  },
  created () {
    this.searched = this.all_rest_business
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>