<template>
  <div>
    <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="delivery_id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">课程列表</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="查询课程编号" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
          md-label="无结果"
          :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或添加新课程`">
        <md-button class="md-primary md-raised" @click="addCourse">添加课程</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="课程编号" md-sort-by="course_id">{{ item.course_id }}</md-table-cell>
        <md-table-cell md-label="课程名称" md-sort-by="course_name">{{ item.course_name }}</md-table-cell>
        <md-table-cell md-label="课程类别" md-sort-by="course_category">{{ item.course_category }}</md-table-cell>
        <md-table-cell md-label="课程教师名称" md-sort-by="course_teacher_name">{{ item.course_teacher_name }}</md-table-cell>
        <md-table-cell md-label="课程开始时间" md-sort-by="course_start_time">{{ item.course_start_time }}</md-table-cell>
        <md-table-cell md-label="课程结束时间" md-sort-by="course_end_time">{{ item.course_end_time }}</md-table-cell>
        <md-table-cell md-label="课程节数" md-sort-by="course_sections">{{ item.course_sections }}</md-table-cell>
        <md-table-cell md-label="课程状态" md-sort-by="course_status">{{ item.course_status }}</md-table-cell>
        <md-table-cell md-label="详细信息"><md-button class="md-raised md-primary" data-background-color="green" @click="getDetails">查看</md-button></md-table-cell>
      </md-table-row>
    </md-table>
    <br>
    <div class="md-layout-item md-size-100 text-right">
      <md-button class="md-raised md-success" @click="addCourse">新增课程</md-button>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.course_id).includes(toLower(term)))
  }
  return items
}
export default {
  name: "course-list",
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
      courses: [
        {
          course_id: "C#00001",
          course_name: "汉语言的艺术",
          course_category: "文学",
          course_teacher_name: "江映蓉",
          course_start_time: "2021-12-05",
          course_end_time: "2022-11-05",
          course_sections: "120",
          course_status: "可报名",
        },
        {
          course_id: "C#00002",
          course_name: "数字的魅力",
          course_category: "理学",
          course_teacher_name: "王万良",
          course_start_time: "2021-11-05",
          course_end_time: "2021-12-05",
          course_sections: "10",
          course_status: "可报名",
        },
        {
          course_id: "C#00003",
          course_name: "农用收割机的使用教程",
          course_category: "本地特色",
          course_teacher_name: "讲师A",
          course_start_time: "2021-12-05",
          course_end_time: "2021-12-12",
          course_sections: "3",
          course_status: "可报名",
        },
        {
          course_id: "C#00004",
          course_name: "个人电脑使用的艺术",
          course_category: "日常生活",
          course_teacher_name: "讲师B",
          course_start_time: "2021-12-01",
          course_end_time: "2022-12-01",
          course_sections: "365",
          course_status: "可报名",
        },
        {
          course_id: "C#00005",
          course_name: "小米手环2的营销手段",
          course_category: "科技",
          course_teacher_name: "马云",
          course_start_time: "2015-07-08",
          course_end_time: "2015-07-08",
          course_sections: "1",
          course_status: "已报满",
        },
        {
          course_id: "C#00006",
          course_name: "小说入门",
          course_category: "艺术",
          course_teacher_name: "贾平凹",
          course_start_time: "2021-12-05",
          course_end_time: "2021-12-07",
          course_sections: "3",
          course_status: "可报名",
        },
        {
          course_id: "C#00007",
          course_name: "如何画画",
          course_category: "艺术",
          course_teacher_name: "梵高",
          course_start_time: "2021-12-05",
          course_end_time: "2021-12-10",
          course_sections: "5",
          course_status: "已报满",
        },
        {
          course_id: "C#00008",
          course_name: "JavaEE——从入门到出门",
          course_category: "本地特色",
          course_teacher_name: "讲师C",
          course_start_time: "2021-09-01",
          course_end_time: "2022-01-05",
          course_sections: "48",
          course_status: "不可报名",
        },
      ],
    };
  },
  methods:{
    getDetails(){
      this.$router.push('course-details')
    },
    addCourse () {
      this.$router.push('add-course')
    },
    searchOnTable () {
      this.searched = searchById(this.courses, this.search)
    },
  },
  created () {
    this.searched = this.courses
  },
};
</script>
