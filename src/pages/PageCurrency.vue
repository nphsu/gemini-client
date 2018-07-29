<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card box-card-wrapper">
        <div slot="header" class="clearfix">
          <span>新規通貨追加</span>
        </div>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>新規通貨名称</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="request.name"
              placeholder="New Name..."
              clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>新規通貨単位</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="request.unit"
              placeholder="New Unit..."
              clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="24">
            <el-button
              type="success"
              @click="addCurrency">追加</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>仮想通貨一覧</span>
        </div>
        <el-table
          :data="currencies"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="通貨ID"
            width="300"
            align="left"/>
          <el-table-column
            prop="name"
            label="通貨名"
            width="300"
            align="left"/>
          <el-table-column
            prop="unit"
            label="通貨単位"
            width="300"
            align="left"/>
          <el-table-column
            prop="operation"
            label="オペレーション"
            width="300"
            align="left">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteCurrency(scope.row.id)">削除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageCurrency',
  data () {
    return {
      request: {
        name: undefined,
        unit: undefined
      },
      currencies: []
    }
  },
  created: async function () {
    await this.refresh()
  },
  methods: {
    addCurrency: async function () {
      await axios.post('http://localhost:20000/', this.request)
      await this.refresh()
      this.$message({
        showClose: true,
        message: 'Add Currency Success!',
        type: 'success'
      })
    },
    deleteCurrency: async function (id) {
      console.info(id)
      await axios.delete('http://localhost:20000/' + id)
      await this.refresh()
      this.$message({
        showClose: true,
        message: 'Delete Currency Success!',
        type: 'success'
      })
    },
    refresh: async function () {
      const res = await axios.get('http://localhost:20000/')
      this.currencies = res.data.currencies
      this.request.name = undefined
      this.request.unit = undefined
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/base";

.row-wrapper {
  margin-bottom: 20px;
}

.box-card-wrapper {
  margin-bottom: 20px;
}

</style>
