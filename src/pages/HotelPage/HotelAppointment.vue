<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是餐馆预约的后台
*/-->

<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="diagramBlueGrey">
        <h4 class="title">民宿预约情况</h4>
        <p class="category">在这可以看到该民宿的预约情况</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="id" label="用户号id" fixed sortable></el-table-column>
          <el-table-column property="name" label="姓名" ></el-table-column>
          <el-table-column property="telephone" label="电话号码" ></el-table-column>
          <el-table-column property="arrivedate" label="入住日期" sortable></el-table-column>
          <el-table-column property="leavedate" label="离开日期" sortable></el-table-column>
          <el-table-column property="num" label="人数" sortable></el-table-column>
          <el-table-column label="执行操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="modifyHotelAppoint(scope.row)"></el-button>
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteHotelAppoint(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="md-layout-item md-size-100 text-right">
          <el-button type="warning" round @click="addHotelAppoint">新增预约情况</el-button>
        </div>
      </md-card-content>
    </md-card>

    <el-dialog title="新增民宿预约信息" :visible.sync="dialogFormVisible">
              <el-card class="box-card">
                <el-form>
                  <el-form-item label="用户编号id" :label-width="formLabelWidth">
                    <el-input v-model="id" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名name" :label-width="formLabelWidth">
                    <el-input v-model="name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码telephone" :label-width="formLabelWidth">
                    <el-input v-model="telephone" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
      <el-card class="box-card">
        <el-form>
                  <el-form-item label="到达日期arrivedate" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="arrivedate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="离店日期leavedate" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="leavedate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="人数num" :label-width="formLabelWidth">
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="15" ></el-input-number>
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
    <el-dialog title="修改民宿预约信息" :visible.sync="dialogFormVisible2">
      <el-card class="box-card">
        <el-form>
          <el-form-item label="用户编号id" :label-width="formLabelWidth">
            <el-input v-model="selected_item.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名name" :label-width="formLabelWidth">
            <el-input v-model="selected_item.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码telephone" :label-width="formLabelWidth">
            <el-input v-model="selected_item.telephone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <el-form>
          <el-form-item label="到达日期arrivedate" :label-width="formLabelWidth">
            <el-date-picker
                v-model="selected_item.arrivedate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离店日期leavedate" :label-width="formLabelWidth">
            <el-date-picker
                v-model="selected_item.leavedate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="人数num" :label-width="formLabelWidth">
            <el-input-number v-model="selected_item.num" @change="handleChange" :min="1" :max="15" ></el-input-number>
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
          return items.filter(item => toLower(item.id).includes(toLower(term)))
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
        data() {
          return {
            search: null,
            selected: [],
            searched: [],
            all_hotel_appointment: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            id: '',
            name: '',
            telephone: '',
            arrivedate: '',
            leavedate: '',
            num: '',
            empty_state_show:false,
            selected_item: [],
          };
        },
        mounted() {
          this.$axios
              .get('http://112.124.35.32:8087/xiangliban/hotel/allAppointment')
              .then(successResponse => {
                this.all_hotel_appointment = successResponse.data; // 将获取的数据保存
                this.empty_state_show = (this.all_hotel_appointment.isEmpty) ? true : false; // 将获取数据是否为空保存
                this.searched = this.all_hotel_appointment; // 再次初始化显示的内容
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
                .post('http://112.124.35.32:8087/xiangliban/hotel/deleteHotelAppointment',params)
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
            params.append("name",this.name);
            params.append("telephone",this.telephone);
            params.append("arrivedate",this.arrivedate);
            params.append("leavedate",this.leavedate);
            params.append("num",this.num);
            this.$axios
                .post('http://112.124.35.32:8087/xiangliban/hotel/addHotelAppointment',params)
                .then(successResponse => {
                  // console.log('inject success')
                  this.$message({
                    type: 'success',
                    message: '新增预约成功！！'
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
            params.append("name",this.selected_item.name);
            params.append("telephone",this.selected_item.telephone);
            params.append("arrivedate",this.selected_item.arrivedate);
            params.append("leavedate",this.selected_item.leavedate);
            params.append("num",this.selected_item.num);
            this.$axios
                .post('http://112.124.35.32:8087/xiangliban/hotel/updateHotelAppointment',params)
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

          contactAdmin() {
            window.alert('请求已收到')
          },
          searchOnTable() {
            this.searched = searchById(this.all_hotel_appointment, this.search)
          },
          handleChange(value) {
            console.log(value);
          },
          addHotelAppoint() {
            this.dialogFormVisible = true;
          },
          deleteHotelAppoint(){
            this.dialogFormVisible1 = true;
          },
          modifyHotelAppoint(item){
            this.selected_item = item;
            this.dialogFormVisible2 = true;
          }
        },
        created() {
          this.searched = this.all_hotel_appointment
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
