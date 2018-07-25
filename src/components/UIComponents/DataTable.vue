<template>
  <div>
      <div class="card-header">
      </div>
      <div class="card-content row">
        <div class="col-sm-6">
          <el-select
            class="select-default"
            v-model="pagination.perPage"
            placeholder="Per page">
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table class="table-striped"
                    :data="queriedData"
                    border
                    style="width: 100%">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :formatter="cellValueRenderer"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
            <el-table-column v-if="actions"
              :min-width="80"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <slot name="buttons" :queriedData="queriedData" :index="props.$index" :handleEdit="handleEdit" :handleDelete="handleDelete">
                </slot>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
      </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import { mapState } from 'vuex'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      ...mapState({
        tableData: state => state.crud.data
      }),
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.tableData.length
          return this.pagedData
        }
        let result = this.tableData
          .filter((row) => {
            let isIncluded = false
            for (let key of this.propsToSearch) {
              let rowValue = row[key].toString()
              if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                isIncluded = true
              }
            }
            return isIncluded
          })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.tableData.length
        return this.tableData.length
      }
    },
    props: {
      pagination: {
        type: Object,
        default: function () {
          return {
            perPage: 5,
            currentPage: 1,
            perPageOptions: [5, 10, 25, 50],
            total: 0
          }
        }
      },
      actions: {
        type: Boolean,
        default: true
      },
      url: {
        type: String,
        required: true
      },
      propsToSearch: {
        type: Array,
        required: true
      },
      tableColumns: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        searchQuery: ''
      }
    },
    methods: {
      handleEdit (index) {
        const formData = {
          url: this.url,
          id: index
        }
        this.$store.commit('crud/editSetter', true)
        this.$store.dispatch('crud/find', formData)
      },
      handleDelete (index) {
        const formData = {
          url: this.url,
          id: index
        }
        this.$store.dispatch('crud/remove', formData)
      },
      cellValueRenderer (row, column, cellValue) {
        const isBool = typeof row[column.property] === 'boolean'
        return !isBool ? cellValue : String(cellValue)
      }
    },
    mounted () {
      this.$store.dispatch('crud/loadData', this.url)
      this.$store.commit('crud/formDataCleaner')
      this.$store.commit('crud/editSetter', false)
    }
  }
</script>
<style>
</style>
