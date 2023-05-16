<template>
  <div>
    <b-card no-body>
        <!-- <b-card-header class="border-0">
            <h3 class="mb-0">프로젝트 관리</h3>
        </b-card-header> -->


        <span>프로젝트 명: </span>
        <input type="text" v-model="searchValue">

        <br/>
        <br/>

        <el-table class="table-responsive table" header-row-class-name="thead-light" :data="filteredProjects">
            <el-table-column label="Project" min-width="310px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                </template>
            </el-table-column>



            <el-table-column label="기간"
                             prop="기간"
                             min-width="140px">
            </el-table-column>

            <el-table-column label="발주금액"
                             prop="발주금액"
                             min-width="140px">
            </el-table-column>

            <el-table-column label="참여인원"
                             prop="참여인원"
                             min-width="140px">
            </el-table-column>

            <el-table-column label="PM"
                             prop="PM"
                             min-width="140px">
            </el-table-column>

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Completion"
                             prop="completion"
                             min-width="240px">
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer> -->
    </b-card>
  </div>

  
</template>

<script>
//  import projects from 'projects'
 import { Table, TableColumn} from 'element-ui'


 export default {
  name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects: [
    {
      title: 'Argon Design System',
      발주금액: '$2500 USD',
      참여인원: 10,
      PM: '정은',
      기간:'2023/03/01-2023/10/01',
      status: 'pending',
      statusType: 'warning',
      completion: 60
    },
    {
      img: 'img/theme/angular.jpg',
      title: 'Angular Now UI Kit PRO',
      발주금액: '$1800 USD',
      참여인원: 8,
      PM: '정은',
      기간:'2023/03/01-2023/10/01',
      status: 'completed',
      statusType: 'success',
      completion: 100
    },
    {
      img: 'img/theme/sketch.jpg',
      title: 'Black Dashboard',
      발주금액: '$3150 USD',
      참여인원: 5,
      PM: '정은',
      기간:'2023/03/01-2023/10/01',
      status: 'delayed',
      statusType: 'danger',
      completion: 72
    },
    {
      img: 'img/theme/react.jpg',
      title: 'React Material Dashboard',
      발주금액: '$4400 USD',
      참여인원: 2,
      PM: '정은',
      기간:'2023/03/01-2023/10/01',
      status: 'on schedule',
      statusType: 'info',
      completion: 90
    },
    {
      img: 'img/theme/vue.jpg',
      title: 'Vue Paper UI Kit PRO',
      발주금액: '$2200 USD',
      참여인원: 2,
      PM: '정은',
      기간:'2023/03/01-2023/10/01',
      status: 'completed',
      statusType: 'success',
      completion: 100
    },
  ],
  searchValue: ''
}
},
computed: {
    filteredProjects() {
      if (this.searchValue) {
        const searchValueLowercase = this.searchValue.toLowerCase()
        return this.projects.filter(project => project.title.toLowerCase().includes(searchValueLowercase))
      }
      return this.projects
    }}
 }

</script>

<style>