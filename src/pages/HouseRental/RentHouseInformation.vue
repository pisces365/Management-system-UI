<!--/**
* Created with IntelliJ IDEA.
*
* @Author: 施志豪
* @Date: 2021/12/19/13:41
* @Description:这里是租房界面的后台，主要分为了三大类，第一类是主界面的几个字段，第二类是按钮里的房间信息，第三类是按钮里的设施信息
*/-->

<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="diagramYellow">
        <h4 class="title">租房界面</h4>
        <p class="category">在这可以看到租房的详细信息</p>
      </md-card-header>
      <md-card-content>

        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询用户号" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="hr_id" label="出租房屋id" fixed sortable></el-table-column>
          <el-table-column property="hr_user_id" label="房东id"></el-table-column>
          <el-table-column property="hr_location" label="出租屋地址"></el-table-column>
          <el-table-column property="hr_type" label="出租类型"></el-table-column>
          <el-table-column property="hr_price" label="价格"></el-table-column>
          <el-table-column property="hr_area" label="面积"></el-table-column>
          <el-table-column property="hr_toward" label="朝向"></el-table-column>
          <el-table-column property="hr_floor" label="楼层"></el-table-column>
          <el-table-column label="房间/设备情况" fixed="right">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-goblet-square-full"
                  @click="SearchRoomNum(scope.row)"></el-button>
              <el-button
                  type="warning"
                  icon="el-icon-sunny"
                  size="mini"
                  @click="processSelectedItem(scope.row);SearchRoomDevice(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </md-card-content>
    </md-card>

    <el-dialog width="70%" title="设备信息" :visible.sync="dialogFormVisible1">
      <el-card>
        <el-descriptions title="" :column="1" border>
          <el-descriptions-item label="房屋id" content-class-name="my-content">
            <el-input v-model="selected_item.hr_id" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <el-descriptions title="" :column="3" border>
          <el-descriptions-item label="有无装修">
            <el-input v-model="selected_item.hr_decorate" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无洗衣机">
            <el-input v-model="selected_item.hr_washing_machine" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无冰箱">
            <el-input v-model="selected_item.hr_refrigerator" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无电视机">
            <el-input v-model="selected_item.hr_tv" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无空调">
            <el-input v-model="selected_item.hr_air_conditioner" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无热水器">
            <el-input v-model="selected_item.hr_water_heater" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无天然气">
            <el-input v-model="selected_item.hr_natural_gas" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="有无网络">
            <el-input v-model="selected_item.hr_network" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          '
          <el-descriptions-item label="有无厨房">
            <el-input v-model="selected_item.hr_closet" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-dialog>

<!--dialog套娃-->
    <el-dialog title="房间数量信息表" :visible.sync="dialogFormVisible2">
      <el-dialog width="50%" title="详细描述表" :visible.sync="dialogFormVisible3" append-to-body>
        <el-card>
          <el-descriptions title="" :column="1" border>
            <el-descriptions-item label="详细介绍">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="selected_item.hr_introduce" autocomplete="off" readonly ></el-input>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-dialog>
      <el-dialog width="30%" title="审核状态修改" :visible.sync="dialogFormVisible4" append-to-body>
        <el-card>
          <el-descriptions title="" :column="1" border>
            <el-descriptions-item label="房屋id" content-class-name="my-content">
              <el-input v-model="selected_item.hr_id" autocomplete="off" readonly></el-input>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card>
          <el-radio-group v-model="selected_item.hr_check">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">未通过</el-radio>
          </el-radio-group>
          <br>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" icon="el-icon-success" round @click="modify(item)">确认修改</el-button>
        </div>
      </el-dialog>
      <el-card>
        <el-descriptions title="" :column="1" border>
          <el-descriptions-item label="房屋id" content-class-name="my-content">
            <el-input v-model="selected_item.hr_id" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <el-descriptions title="" :column="2" border>
          <el-descriptions-item label="客厅数量">
            <el-input v-model="selected_item.hr_living_room_amount" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="卧室数量">
            <el-input v-model="selected_item.hr_bedroom_amount" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="床数量">
            <el-input v-model="selected_item.hr_bed_amount" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="卫生间数量">
            <el-input v-model="selected_item.hr_toilet_amount" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="房间数量">
            <el-input v-model="selected_item.hr_room_amount" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="支付方式">
            <el-input v-model="selected_item.hr_pay" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="审核状态">
            <el-input v-model="selected_item.hr_check" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="审核状态修改">
            <el-button type="danger" icon="el-icon-edit-outline" @click="modifyState()" circle></el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <el-descriptions title="" :column="1" border>
          <el-descriptions-item label="图片详情">
            <!--          <el-input v-model="selected_item.hr_picture"  autocomplete="off" readonly/>-->
            <el-image style="max-width: 100%; height: auto" :src="selected_item.hr_picture"></el-image>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <el-descriptions title="" :column="1" border>
          <el-descriptions-item label="房屋描述">
            <el-input v-model="selected_item.hr_describe" autocomplete="off" readonly></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="详细介绍">
            <el-button type="danger" icon="el-icon-magic-stick" @click="SearchIntroduce()" circle></el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-dialog>
  </div>
</template>


<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.hr_id).includes(toLower(term)))
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
      all_rent: [],
      dialogFormVisible3: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible4: false,
      hr_id: '',
      hr_user_id: '',
      hr_location: '',
      hr_type: '',
      hr_price: '',
      hr_area: '',
      hr_toward: '',
      hr_living_room_amount: '',
      hr_bedroom_amount: '',
      hr_bed_amount: '',
      hr_toilet_amount: '',
      hr_room_amount: '',
      hr_picture: '',
      hr_describe: '',
      hr_introduce: '',
      hr_check: '',
      hr_floor: '',
      hr_pay: '',
      hr_decorate: '',
      hr_washing_machine: '',
      hr_refrigerator: '',
      hr_tv: '',
      hr_air_conditioner: '',
      hr_water_heater: '',
      hr_natural_gas: '',
      hr_network: '',
      hr_closet: '',
      empty_state_show: false,
      selected_item: [],
    };
  },
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8087/xiangliban/RentHouse/allrent')
        .then(successResponse => {
          this.all_rent = successResponse.data; // 将获取的数据保存
          this.empty_state_show = (this.all_rent.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.all_rent; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    modify(item) {
      var params = new URLSearchParams();
      params.append("hr_id", this.selected_item.hr_id);
      params.append("hr_check", this.selected_item.hr_check);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/RentHouse/updaterent_check', params)
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
    SearchRoomNum(item) {
      this.selected_item = item;
      this.dialogFormVisible2 = true;
    },
    SearchRoomDevice(item) {
      this.selected_item = item;
      console.log("new item pushed");
      this.dialogFormVisible1 = true;
    },
    SearchIntroduce() {
      this.dialogFormVisible3 = true;
    },
    modifyState() {
      this.dialogFormVisible4 = true;
    },

    contactAdmin() {
      window.alert('请求已收到')
    },

    searchOnTable() {
      this.searched = searchById(this.all_rent, this.search)
    },

    processSelectedItem(item) {
      console.log("new item process started");
      let yes = "有";
      let no = "无";
      (item.hr_decorate === 1 || item.hr_decorate === yes) ? (item.hr_decorate = yes) : (item.hr_decorate = no);
      (item.hr_washing_machine === 1 || item.hr_washing_machine === yes) ? (item.hr_washing_machine = yes) : (item.hr_washing_machine = no);
      (item.hr_refrigerator === 1 || item.hr_refrigerator === yes) ? (item.hr_refrigerator = yes) : (item.hr_refrigerator = no);
      (item.hr_tv === 1 || item.hr_tv === yes) ? (item.hr_tv = yes) : (item.hr_tv = no);
      (item.hr_air_conditioner === 1 || item.hr_air_conditioner === yes) ? (item.hr_air_conditioner = yes) : (item.hr_air_conditioner = no);
      (item.hr_water_heater === 1 || item.hr_water_heater === yes) ? (item.hr_water_heater = yes) : (item.hr_water_heater = no);
      (item.hr_natural_gas === 1 || item.hr_natural_gas === yes) ? (item.hr_natural_gas = yes) : (item.hr_natural_gas = no);
      (item.hr_network === 1 || item.hr_network === yes) ? (item.hr_network = yes) : (item.hr_network = no);
      (item.hr_closet === 1 || item.hr_closet === yes) ? (item.hr_closet = yes) : (item.hr_closet = no);
      console.log("new item process ended");
    },


  },
  // created() {
  //   this.searched = this.all_rent
  // },
};
</script>
<style lang="scss" scoped>
//.md-field {
//  max-width: 300px;
//}
//
//.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
//  background-color: #505050;
//}
//
//.my-label {
//  background: #E1F3D8;
//}
//
//.my-content {
//  background: #FDE2E2;
//}
</style>
