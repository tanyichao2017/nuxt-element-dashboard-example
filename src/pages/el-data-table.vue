<template>
  <div class="page">
    <el-data-table
      ref="el-data-table"
      v-bind="tableConfig"
      :searchForm="searchForm"
      :formAttrs="formAttrs"
      :hasOperation="false"
      :paginationSize="5"
    >
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="primary" size="small">
            查看
          </el-button>
          <el-button @click="edit(scope.row)" size="small">
            编辑
          </el-button>
          <el-button size="small" @click="changeStatus(scope.row)">
            {{ scope.row.status === 'on' ? '下架' : '上架' }}
          </el-button>
        </template>
      </el-table-column>
    </el-data-table>
  </div>
</template>

<script>
export default {
  name: 'el-data-table-page',
  data() {
    return {
      tableConfig: {
        url: '/deepexi-tenant/el-table-data',
        columns: [
          {type: 'selection', selectable: (row, index) => index > 0},
          {
            prop: 'comName',
            label: '组件名称'
          },
          {
            prop: 'category',
            label: '分类',
            width: '100px'
          },
          {
            prop: 'version',
            label: '版本',
            width: '80px'
          },
          {
            prop: 'language',
            label: '开发语言'
          },
          {
            prop: 'lastUpdateTime',
            label: '最后更新时间'
          },
          {
            prop: 'status',
            label: '状态',
            width: '50px',
            formatter: row => {
              let status = row.status === 'on' ? '上架' : '下架'
              let statusClass = row.status === 'on' ? 'status-on' : 'status-off'
              return <span class={statusClass}>{status}</span>
            }
          }
        ],
        form: [
          {
            $type: 'input',
            $id: 'comName',
            label: '组件名称',
            rules: [
              {
                required: true,
                message: '请输入组件名称',
                trigger: 'blur',
                transform: v => v && v.trim()
              }
            ],
            $el: {placeholder: '请输入组件名称'}
          },
          {
            $id: 'category',
            $type: 'select',
            label: '分类',
            $el: {
              placeholder: '请选择分类'
            },
            rules: [
              {
                required: true,
                message: '请选择分类',
                transform: v => v && v.trim()
              }
            ],
            $options: [
              {
                label: 'A',
                value: 'A'
              }
            ]
          },
          {
            $type: 'input',
            $id: 'version',
            label: '版本',
            rules: [
              {
                required: true,
                message: '请输入版本',
                trigger: 'blur'
              }
            ],
            $el: {placeholder: '请输入版本'}
          },
          {
            $type: 'input',
            $id: 'language',
            label: '开发语言',
            rules: [
              {
                required: true,
                message: '请输入开发语言',
                trigger: 'blur',
                transform: v => v && v.trim()
              }
            ],
            $el: {placeholder: '请输入开发语言'}
          },
          {
            $id: 'status',
            $type: 'select',
            label: '状态',
            $el: {
              placeholder: '请选择状态'
            },
            rules: [
              {
                required: true,
                message: '请选择状态'
              }
            ],
            $options: [
              {
                label: '上架',
                value: 'on'
              },
              {
                label: '下架',
                value: 'off'
              }
            ]
          }
        ]
      },
      formAttrs: {
        labelWidth: '200px'
      },
      searchForm: [
        {
          $el: {placeholder: '请输入'},
          label: '组件名称',
          $id: 'comName',
          $type: 'input'
        },
        {
          $el: {placeholder: '请选择'},
          label: '分类',
          $id: 'category',
          $type: 'select'
        },
        {
          $el: {placeholder: '请选择'},
          label: '状态',
          $id: 'status',
          $type: 'select'
        }
      ]
    }
  },
  methods: {
    view(row) {
      this.$refs['el-data-table'].onDefaultView(row)
    },
    edit(row) {
      this.$refs['el-data-table'].onDefaultEdit(row)
    },
    changeStatus(row) {
      const {status} = row
      row.status = row.status === 'on' ? 'off' : 'on'
      return this.$axios.put('/deepexi-tenant/el-table-data', row)
    }
  }
}
</script>

<style lang="less">
.status-on {
  color: lightseagreen;
}

.status-off {
  color: #ddd;
}

.el-form {
  .el-form-item__label {
    margin-right: 30px;
  }

  .el-input {
    max-width: 250px;
  }

  .el-select {
    width: 250px;
  }
}
</style>
