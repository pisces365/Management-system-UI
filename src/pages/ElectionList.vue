<!--
 * @FileDescription: 工作人员-选举列表和管理界面
 * @Author: 刘元驰
 * @Date: 12/15/2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/21/2021
 -->
<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="deliveryBlue">
            <h4 class="title">选举信息概览</h4>
            <p class="category"> 在这可以看到选举信息的概览</p>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>课程类别列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div class="md-layout-item md-size-25 md-toolbar-section-end" style="float: right" v-if="errored === false && loading === false && list_empty === false">
              <el-input placeholder="查询选举开始时间" v-model="search" @input="searchOnTable"/>
            </div>
            <div class="md-layout-item md-toolbar-section-end" style="float: right" v-if="errored === false && loading === false && list_empty === false">
              <el-select class="md-title" v-model="typeFilter" placeholder="请选择选举类别" @change="searchOnTable2()">
                <el-option :key="null">全部</el-option>
                <el-option
                    v-for="item in type_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </div>
            <el-table :data="searched" style="width: 100%" max-height="600" v-if="errored === false && loading === false && list_empty === false">
              <el-table-column property="id" label="选举编号" fixed sortable></el-table-column>
              <el-table-column property="name" label="选举主题"></el-table-column>
              <el-table-column property="department" label="发布单位"></el-table-column>
              <el-table-column property="intro" label="规则/简介/要求"></el-table-column>
              <el-table-column property="start" label="选举开始时间"></el-table-column>
              <el-table-column property="end" label="选举结束时间"></el-table-column>
              <el-table-column label="可选操作">
                <template slot-scope="scope">
                  <el-button
                      type="primary"
                      icon="el-icon-info"
                      @click="getSelectedDetails(scope.row)"></el-button>
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="deleteCurrentElection(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </md-card-content>
        </md-card>
        <div>
          <!-- 选举详情对话, 根据变量dialogTableVisible的值展示/关闭 -->
          <el-dialog title="选举详情" :visible.sync="dialogTableVisible">
            <!-- 选举详情 -->
            <el-card class="box-card">
              <div slot="header">
                <span style="font-weight: bold">选举详细信息</span>
              </div>
              <!-- 从selected_election取数据 -->
              <el-table :data="selected_election" border style="width: 100%">
                <el-table-column property="id" label="选举编号"></el-table-column>
                <el-table-column property="name" label="选举名称"></el-table-column>
                <el-table-column property="type" label="选举类别">
                  <template slot-scope="scope">
                    {{ getElectionTypeName(scope.row.type) }}
                  </template>
                </el-table-column>
                <el-table-column property="department" label="选举发布部门"></el-table-column>
              </el-table>
              <el-table :data="selected_election" border style="width: 100%">
                <el-table-column property="intro" label="选举简介"></el-table-column>
                <el-table-column property="start" label="选举开始时间"></el-table-column>
                <el-table-column property="end" label="选举结束时间"></el-table-column>
                <el-table-column property="state" label="选举状态">
                  <template slot-scope="scope">
                    <el-tag :type="getLableColor(scope.row.state)">
                      {{ (scope.row.state === 0) ? "未开始" : ((scope.row.state === 1) ? "进行中" : "已结束") }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <!-- 选举封面 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">选举封面</span>
              </div>
              <div class="block">
                <!-- 从selected_images逐张取照片 -->
                <el-image :src="selected_election_cover" style="width: 50%;height: 50%;"/>
              </div>
            </el-card>
            <!-- 选举人信息 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">选举人信息</span>
              </div>
              <el-table :data="selected_candidate" border style="width: 100%">
                <el-table-column property="voteid" label="参选人编号"></el-table-column>
                <el-table-column property="name" label="参选人名称"></el-table-column>
                <el-table-column property="age" label="参选人年龄"></el-table-column>
                <el-table-column property="sex" label="参选人性别"></el-table-column>
                <el-table-column property="uid" label="参选人个人id"></el-table-column>
                <el-table-column property="political_face" label="政治面貌"></el-table-column>
                <el-table-column property="duty" label="参选职位"></el-table-column>
                <el-table-column property="brief_intro" label="简介"></el-table-column>
                <el-table-column property="outlook" label="展望"></el-table-column>
                <el-table-column property="votes" label="获得投票数"></el-table-column>
                <el-table-column property="img" label="参选人照片">
                  <template slot-scope="scope">
                    <el-image :src="scope.row.img" :preview-src-list="selected_candidate_images"/>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
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
    return items.filter(item => toLower(item.start).includes(toLower(term)))
  }
  return items
}
export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  props: {
    tableHeaderColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      errored: false, // 数据加载是否错误
      loading: false, // 是否正在加载数据
      list_empty: false,  // 初始获取到的数据是否为空
      searched_empty: false,  // 搜素结果是否为空
      search: null,
      typeFilter: null, // 类别筛选
      searched: [],
      type_list: [],  // 获取到的全部类别信息
      elections: [],  // 获取到的全部选举信息
      selected_election: [],  // 选定的选举信息
      selected_election_cover: null,  // 选中的选举封面
      selected_candidate: [], // 选中的参选人信息
      selected_candidate_images: [],  // 选中的参选人图片
      dialogTableVisible: false,  // 选举详情是否可见
    };
  },
  created() {
    this.$axios
        .get('http://112.124.35.32:8081/xiangliban/vote/allVoteType')
        .then(successResponse => {
          this.type_list = successResponse.data; // 将获取的数据保存
          this.searchOnTable2(0);
          // this.searched_empty = false;
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
    this.$axios
        .get('http://112.124.35.32:8081/xiangliban/vote/selectAllVoteDetail')
        .then(successResponse => {
          this.elections = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.elections.length === 0); // 将获取数据是否为空保存
          this.searched = this.elections; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    searchOnTable() {
      this.searched = searchById(this.elections, this.search)
      this.searched_empty = (!this.searched.isEmpty)
    },
    searchOnTable2() {
      this.searched = (this.typeFilter === undefined) ? this.elections : [];
      for (let i = 0; i < this.elections.length; ++i) {
        if (this.elections[i].type === this.typeFilter) {
          this.searched.push(this.elections[i]);
        }
      }
      this.searched_empty = (!this.searched.isEmpty)
    },
    getLableColor(state) {
      if (state === 0) {
        return ""
      } else if (state === 1) {
        return "success"
      } else {
        return "danger"
      }
    },
    getElectionTypeName(type) {
      for (let i = 0; i < this.type_list.length; ++i) {
        if(this.type_list[i].id === type){
          return this.type_list[i].name;
        }
      }
    },
    async getSelectedDetails(item) {
      this.selected_election.pop();
      await this.$axios
          .get('http://112.124.35.32:8081/xiangliban/vote/voteDetailById', {
            params: {
              id: item.id
            }
          })
          .then(successResponse => {
            this.selected_election.push(successResponse.data); // 将获取的数据保存
            this.selected_election_cover = successResponse.data.img;
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.errored = true // 在前端提示用户出错
          })
      await this.$axios
          .get('http://112.124.35.32:8081/xiangliban/vote/votePersonDetailsByVoteInfoId', {
            params: {
              voteinfoid: item.id
            }
          })
          .then(successResponse => {
            this.selected_candidate = successResponse.data; // 将获取的数据保存
            this.selected_candidate_images.pop(); // 弹出之前加载的头像集
            for (var i = 0; i < this.selected_candidate.length; ++i) {
              this.selected_candidate_images.push(this.selected_candidate[i].img);  // 加载新的头像集合
            }
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.errored = true // 在前端提示用户出错
          })
      this.dialogTableVisible = true;
    },
    deleteCurrentElection(item) {
      this.$confirm('您确认删除这个选举?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append("id", item.id);
        this.$axios
            .post('http://112.124.35.32:8081/xiangliban/vote/deleteVoteInfo', params)
            .then(successResponse => {
              this.$message({
                type: 'success',
                message: '选举已经删除'
              });
              this.reload();
            }).catch(failResponse => {
          this.$message.error('出错了, 删除失败!');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
}

</script>
<style>
.md-tabs.md-theme-default.md-success .md-tabs-navigation {
  background-color: #0d47a1;
}
</style>