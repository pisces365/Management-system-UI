<!--
 * @FileDescription: 管理员(权限等级高)-用户管理页面
 * @Author: 刘元驰
 * @Date: 2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/24/2021
 -->
<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="diagramBlue">
            <h4 class="title">用户管理</h4>
            <p class="category">系统内的所有用户</p>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>用户列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div class="md-layout-item md-size-25 md-toolbar-section-end" style="float: right"
                 v-if="errored === false && loading === false && list_empty === false">
              <el-input placeholder="查询用户编号" v-model="search" @input="searchOnTable"/>
            </div>
            <el-table :data="searched" style="width: 100%" max-height="500"
                      v-if="errored === false && loading === false && list_empty === false">
              <el-table-column property="uid" label="用户编号" fixed sortable></el-table-column>
              <el-table-column property="account" label="账号名" sortable></el-table-column>
              <el-table-column property="name" label="姓名" sortable></el-table-column>
              <el-table-column property="authorization" label="权限等级" sortable>
                <template slot-scope="scope">
                  <el-tag :type="getLabelColor(scope.row.authorization)">
                    {{ getAuthority(scope.row.authorization) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="可选操作">
                <template slot-scope="scope">
                  <!-- 点击此按钮展示当前条目完整信息 -->
                  <el-button type="primary" @click="getSelectedDetails(scope.row)" icon="el-icon-info"/>
                  <!-- 点击此按钮打开修改信息页 -->
                  <el-button type="warning" @click="alterSelectedDetails(scope.row)" icon="el-icon-edit"/>
                  <!-- 点击此按钮打开确认删除页 -->
                  <el-button type="danger" @click="deleteSelectedDetails(scope.row)" icon="el-icon-delete"/>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <div class="md-layout-item md-size-100 text-right"
                 v-if="errored === false && loading === false && list_empty === false">
              <!-- 点击此按钮打开新增用户页 -->
              <el-button type="success" @click="addUser();">新增用户</el-button>
            </div>
          </md-card-content>
        </md-card>
        <div>
          <!-- 用户详情对话, 根据变量dialogTableVisible的值展示/关闭 -->
          <el-dialog title="用户详情" :visible.sync="dialogTableVisible">
            <!-- 用户详情 -->
            <el-card class="box-card">
              <div slot="header">
                <el-alert
                    title="用户身份信息"
                    type="success"
                    description="基本信息可以直接查看"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <!-- 从selected取数据 -->
              <el-table :data="selected" border style="width: 100%">
                <el-table-column property="uid" label="用户编号"></el-table-column>
                <el-table-column property="account" label="账号名"></el-table-column>
                <el-table-column property="password" label="密码"></el-table-column>
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="authorization" label="权限等级">
                  <template slot-scope="scope">
                    <el-tag :type="getLabelColor(scope.row.authorization)">
                      {{ getAuthority(scope.row.authorization) }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <div slot="header">
                <el-alert
                    title="用户个人信息"
                    type="error"
                    description="这是敏感信息,请输入管理员给予的Key来查看"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <el-form>
                <el-form-item label="输入二级密码" :label-width="formLabelWidth">
                  <el-input placeholder="请输入密码" v-model="personalInfoPass" style="width: 80%" show-password></el-input>
                  <el-button type="primary" icon="el-icon-unlock" style="float: right" @click="verifyPass"/>
                </el-form-item>
              </el-form>
              <!-- 从selected取数据 -->
              <el-table :data="selected" border style="width: 100%" v-show="passConfirmed === true">
                <el-table-column property="sex" label="性别">
                  <template slot-scope="scope">
                    {{ (scope.row.sex === 0) ? "女" : "男" }}
                  </template>
                </el-table-column>
                <el-table-column property="age" label="年龄"></el-table-column>
                <el-table-column property="phone" label="手机号码"></el-table-column>
                <el-table-column property="id" label="身份证号"></el-table-column>
                <el-table-column property="political_face" label="政治面貌"></el-table-column>
              </el-table>
            </el-card>
          </el-dialog>
          <!-- 修改当前用户权限对话, 根据变量alterAuthorVisible的值展示/关闭 -->
          <el-dialog title="修改当前用户权限" :visible.sync="alterAuthorVisible">
            <el-card class="box-card">
              <div slot="header">
                <el-alert
                    title="当前用户权限"
                    type="error"
                    description="这是敏感操作,请输入管理员给予的Key来继续"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <el-form>
                <el-form-item label="输入二级密码" :label-width="formLabelWidth">
                  <el-input placeholder="请输入密码" v-model="personalInfoPass" style="width: 80%" show-password></el-input>
                  <el-button type="primary" icon="el-icon-unlock" style="float: right" @click="verifyPass"/>
                </el-form-item>
              </el-form>
              <!-- 从alterAuthorization取数据 -->
              <el-table :data="alterAuthorization" border style="width: 100%" v-show="passConfirmed === true">
                <el-table-column property="uid" label="用户编号"></el-table-column>
                <el-table-column property="account" label="账号名"></el-table-column>
                <el-table-column property="authorization" label="权限等级">
                  <template slot-scope="scope">
                    <el-tag :type="getLabelColor(scope.row.authorization)">
                      {{ getAuthority(scope.row.authorization) }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card" v-show="passConfirmed === true">
              <div slot="header">
                <el-alert
                    title="新的用户权限"
                    type="warning"
                    description="这是重要信息,请确认无误再提交!"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <el-form>
                <el-form-item label="权限等级" :label-width="formLabelWidth">
                  <el-select v-model="updateSubmitAuthor" placeholder="请选择">
                    <el-option label="系统管理员" :value='0' disabled></el-option>
                    <el-option label="普通村民" :value='1'></el-option>
                    <el-option label="租房工作人员" :value='2'></el-option>
                    <el-option label="民宿工作人员" :value='3'></el-option>
                    <el-option label="餐馆工作人员" :value='4'></el-option>
                    <el-option label="医疗工作人员" :value='5'></el-option>
                    <el-option label="交通工作人员" :value='6'></el-option>
                    <el-option label="老年大学管理员" :value='7'></el-option>
                    <el-option label="老年大学工作人员" :value='8'></el-option>
                    <el-option label="选举管理员" :value='9'></el-option>
                    <el-option label="选举工作人员" :value='10'></el-option>
                    <el-option label="报修管理员" :value='11'></el-option>
                    <el-option label="报修工作人员" :value='12'></el-option>
                    <el-option label="快递工作人员" :value='13'></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer" v-show="passConfirmed === true">
              <el-button type="primary" @click="executeAuthorUpdate">确认修改</el-button>
            </div>
          </el-dialog>
          <!-- 删除当前用户对话, 根据变量deleteUserVisible的值展示/关闭 -->
          <el-dialog title="删除当前用户" :visible.sync="deleteUserVisible">
            <el-card class="box-card">
              <div slot="header">
                <el-alert
                    title="当前用户信息"
                    type="error"
                    description="这是危险操作,请输入管理员给予的Key来继续"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <el-form>
                <el-form-item label="输入二级密码" :label-width="formLabelWidth">
                  <el-input placeholder="请输入密码" v-model="personalInfoPass" style="width: 80%" show-password></el-input>
                  <el-button type="danger" icon="el-icon-unlock" style="float: right" @click="verifyPass"/>
                </el-form-item>
              </el-form>
              <!-- 从selected取数据 -->
              <el-table :data="selected" border style="width: 100%" v-show="passConfirmed === true">
                <el-table-column property="uid" label="用户编号"></el-table-column>
                <el-table-column property="account" label="账号名"></el-table-column>
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="authorization" label="权限等级">
                  <template slot-scope="scope">
                    <el-tag :type="getLabelColor(scope.row.authorization)">
                      {{ getAuthority(scope.row.authorization) }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card" v-show="passConfirmed === true">
              <div slot="header">
                <el-alert
                    title="即将删除该用户"
                    type="error"
                    description="本操作是毁灭性的,不可撤销!"
                    :closable="false"
                    show-icon>
                </el-alert>
              </div>
              <div style="text-align:center">
                <h4>您将要删除这个用户!</h4><br>
                <el-button type="danger" @click="executeDelete()">执行删除</el-button>
              </div>
            </el-card>
          </el-dialog>
          <!-- 新增用户信息对话, 根据变量addUserVisible的值展示/关闭 -->
          <el-dialog title="新增用户" :visible.sync="addUserVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="账号名" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.account" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.password" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="权限等级" :label-width="formLabelWidth">
                  <el-select v-model="addUserData.authorization" placeholder="请选择">
                    <el-option label="系统管理员" :value='0' disabled></el-option>
                    <el-option label="普通村民" :value='1'></el-option>
                    <el-option label="租房工作人员" :value='2'></el-option>
                    <el-option label="民宿工作人员" :value='3'></el-option>
                    <el-option label="餐馆工作人员" :value='4'></el-option>
                    <el-option label="医疗工作人员" :value='5'></el-option>
                    <el-option label="交通工作人员" :value='6'></el-option>
                    <el-option label="老年大学管理员" :value='7'></el-option>
                    <el-option label="老年大学工作人员" :value='8'></el-option>
                    <el-option label="选举管理员" :value='9'></el-option>
                    <el-option label="选举工作人员" :value='10'></el-option>
                    <el-option label="报修管理员" :value='11'></el-option>
                    <el-option label="报修工作人员" :value='12'></el-option>
                    <el-option label="快递工作人员" :value='13'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.name" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="addUserData.sex" placeholder="请选择">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.age" type="number" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="addUserData.phone" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="政治面貌" :label-width="formLabelWidth">
                  <el-select v-model="addUserData.political_face" placeholder="请选择">
                    <el-option label="党员" value="党员"></el-option>
                    <el-option label="共青团员" value="共青团员"></el-option>
                    <el-option label="少先队员" value="少先队员"></el-option>
                    <el-option label="普通公民" value="普通公民"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeAdd">确认新增</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}
const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.uid).includes(toLower(term)))
  }
  return items
}
export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    return {
      errored: false, // 数据加载是否错误
      loading: false, // 是否正在加载数据
      list_empty: false,  // 初始获取到的数据是否为空
      searched_empty: false,  // 搜素结果是否为空
      dialogTableVisible: false,  // 详情弹窗是否可见
      alterAuthorVisible: false,  // 更改权限弹窗是否可见
      deleteUserVisible: false,  // 删除用户弹窗是否可见
      addUserVisible: false,  // 增加用户弹窗是否可见
      formLabelWidth: '120px',
      search: null, // 模糊搜素的输入
      selected: [], // 当前选择的条目
      searched: [], // 模糊搜索结果
      user_list: [],  // 页面初始化时获取的所有用户信息
      alterAuthorization: [],  // 要更改的权限信息
      updateSubmitAuthor: null, // 更改后的权限
      updateSubmitUid: null, // 更改的Uid
      deleteUser: [],  // 要删除的用户信息
      addUserData: [],  // 要新增的用户信息
      personalInfoPass: null, // 两步验证输入
      passConfirmed: false, // 敏感信息是否可见
    };
  },
  created() {
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/user/selectAllUsers')
        .then(successResponse => {
          this.user_list = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.user_list.length === 0); // 将获取数据是否为空保存
          this.searched = this.user_list; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    // 点击新增用户后, 设置对话可见
    addUser() {
      this.addUserVisible = true;
    },
    searchOnTable() {
      this.searched = searchById(this.user_list, this.search)
      this.searched_empty = (!this.searched.isEmpty)
    },
    // 自动设置标签颜色
    getLabelColor(item) {
      if (item === 0) { // 系统管理员
        return "danger";
      } else if (item === 1) {  // 最低权限
        return "success";
      } else if (item >= 2 && item <= 13) {
        return "warning"; // 工作人员与管理员
      } else {
        return "danger";  // 出错
      }
    },
    // 自动设置权限等级
    getAuthority(item) {
      if (item === 0) { // 系统管理员
        return "系统管理员";
      } else if (item === 1) {  // 最低权限
        return "普通村民";
      } else if (item === 2) {  //
        return "租房工作人员";
      } else if (item === 3) {
        return "民宿工作人员";
      } else if (item === 4) {
        return "餐馆工作人员";
      } else if (item === 5) {
        return "医疗工作人员";
      } else if (item === 6) {
        return "交通工作人员";
      } else if (item === 7) {
        return "老年大学管理员";
      } else if (item === 8) {
        return "老年大学工作人员";
      } else if (item === 9) {
        return "选举管理员";
      } else if (item === 10) {
        return "选举工作人员";
      } else if (item ===11) {
        return "报修管理员";
      } else if (item === 12) {
        return "报修工作人员";
      } else if (item === 13) {
        return "快递工作人员";
      } else {
        return "错误,请马上联系系统管理员!";
      }
    },
    // 点击查看用户详情后, 获取当前用户信息并设置对话可见
    getSelectedDetails(item) {
      this.personalInfoPass = null;
      this.passConfirmed = false;
      this.selected.pop();
      this.selected.push(item);
      this.dialogTableVisible = true; // 设置对话可见
    },
    // 两步验证后查看敏感信息
    verifyPass() {
      if (this.personalInfoPass === "123") {
        this.passConfirmed = true;
        this.$notify({
          title: '成功',
          message: '敏感信息已解锁',
          type: 'success'
        });
      } else {
        this.$notify.error({
          title: '错误',
          message: '二级密码输入错误!'
        });
      }
    },
    // 点击修改权限后, 获取当前权限信息并设置对话可见
    alterSelectedDetails(item) {
      this.updateSubmitUid = null;
      this.personalInfoPass = null;
      this.passConfirmed = false;
      this.alterAuthorization.pop();
      this.alterAuthorization.push(item);  // 当前条目放入变量中保存
      this.updateSubmitAuthor = this.alterAuthorization[0].authorization;
      this.updateSubmitUid = this.alterAuthorization[0].uid;
      this.alterAuthorVisible = true;
    },
    // 点击删除用户后, 获取当前信息并设置对话可见
    deleteSelectedDetails(item) {
      this.personalInfoPass = null;
      this.passConfirmed = false;
      this.selected.pop();
      this.selected.push(item);
      this.deleteUser = item;  // 当前条目放入变量中保存
      this.deleteUserVisible = true;
    },
    // 执行权限修改
    executeAuthorUpdate() {
      var params = new URLSearchParams();
      params.append("uid", this.updateSubmitUid);
      params.append("authorization", this.updateSubmitAuthor);
      this.$axios
          .post('http://112.124.35.32:8083/xiangliban/user/updateUserAuthorization', params)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$notify({
              title: '成功',
              message: '权限已经修改',
              type: 'success'
            });
            this.reload();
          }).catch(failResponse => {
        this.$notify.error({
          title: '错误',
          message: '权限更新失败!'
        });
      })
    },
    // 执行新增用户
    async executeAdd() {
      let jsonData = {
        "account": this.addUserData.account,
        "age": this.addUserData.age,
        "authorization": this.addUserData.authorization,
        "avatar": "暂无",
        "id": this.addUserData.id,
        "name": this.addUserData.name,
        "password": this.addUserData.password,
        "phone": this.addUserData.phone,
        "political_face": this.addUserData.political_face,
        "sex": this.addUserData.sex,
        "uid": "default",
      }
      await this.$axios
          .post('http://112.124.35.32:8083/xiangliban/user/addNewUser', jsonData)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$notify({
              title: '成功',
              message: '用户已经新增',
              type: 'success'
            });
            this.reload();
          }).catch(failResponse => {
            this.$notify.error({
              title: '错误',
              message: '用户新增失败!'
            });
          })
    },
    // 删除用户
    executeDelete() {
      var params = new URLSearchParams();
      params.append("uid", this.deleteUser.uid);
      this.$axios
          .post('http://112.124.35.32:8083/xiangliban/user/deleteUserByUid', params)
          .then(successResponse => {
            this.$notify({
              title: '成功',
              message: '用户已经删除',
              type: 'success'
            });
            this.reload();
          }).catch(failResponse => {
        this.$notify.error({
          title: '错误',
          message: '删除失败!'
        });
      })
    },
  },
}
;
</script>