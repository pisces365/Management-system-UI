<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">工单#Ord000011详细信息</h4>
        <p class="category">选定订单的详细信息</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>工单编号</label>
              <md-input v-model="order_id" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>用户订单编号</label>
              <md-input v-model="delivery_id" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>工单状态</label>
              <md-input v-model="order_status" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>包裹内容</label>
              <md-input v-model="package_details" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>配送员状态</label>
<!--              <md-input v-model="order_courier_status" type="text"></md-input>-->
              <md-select v-model="order_courier_status" name="配送员状态" id="order_courier_status">
                <md-option value="order-received">已接单</md-option>
                <md-option value="picked-up">已取货</md-option>
                <md-option value="on-road">在途中</md-option>
                <md-option value="delivered">已送达</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>收件人姓名</label>
              <md-input v-model="delivery_recipient_name" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>收件人电话</label>
              <md-input v-model="delivery_recipient_phone" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>收件人地址</label>
              <md-input v-model="delivery_recipient_address" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>收件人性别</label>
              <md-input v-model="delivery_recipient_gender" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>期望送达时间</label>
              <md-input v-model="delivery_eta" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>配送员姓名</label>
              <md-input v-model="order_courier_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>配送员电话</label>
              <md-input v-model="order_courier_phone" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>付款方式</label>
              <md-input v-model="delivery_payment_method" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>配送费</label>
              <md-input v-model="delivery_freight" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>配送附带服务</label>
              <md-input v-model="delivery_additional_services" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>配送员位置</label>
              <md-input v-model="order_courier_location" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
<!--            <md-button class="md-raised md-success" data-background-color="red">接收订单</md-button>-->
            <md-button class="md-raised md-success">确认修改</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "order-details",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      order_id: "#Ord00001",
      delivery_id: "#00004",
      order_status: "进行中",
      package_details: "物品1",
      order_courier_status: "picked-up",
      delivery_recipient_name: "customer1",
      delivery_recipient_phone: "11292828920",
      delivery_recipient_address: "浙江省杭州市西湖区留下街道",
      delivery_recipient_gender: "男",
      delivery_eta: "2021-12-02",
      order_courier_name: "罗刘刚",
      order_courier_phone: "19292878298",
      delivery_payment_method: "支付宝",
      delivery_freight: "RMB 14.5",
      delivery_additional_services: "保价100RMB",
      order_courier_location:"",
    };
  },
};
</script>