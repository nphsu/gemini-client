<template>
    <el-row>
        <sub-header/>
        <el-col :span="24">
            <el-card class="box-card box-card-wrapper">
                <div slot="header">
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
                        <span>新規通貨シンボル</span>
                    </el-col>
                    <el-col :span="12">
                        <el-input
                                v-model="request.symbol"
                                placeholder="New Symbol..."
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
                            width="200"
                            align="left"/>
                    <el-table-column
                            prop="name"
                            label="通貨名"
                            width="200"
                            align="left"/>
                    <el-table-column
                            prop="symbol"
                            label="通貨シンボル"
                            width="200"
                            align="left"/>
                    <el-table-column
                            prop="amount"
                            label="数量"
                            width="200"
                            align="left"/>
                    <el-table-column
                            prop="operation"
                            label="Ops"
                            width="200"
                            align="left">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteCurrency(scope.row.id)">×</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  /* eslint-disable no-console */

  import axios from 'axios'
  import SubHeader from "../components/SubHeader";

  export default {
    name: "Currency",
    components: {SubHeader},
    data () {
      return {
        request: {
          name: undefined,
          symbol: undefined
        },
        currencies: []
      }
    },
    created: async function () {
      await this.refresh()
    },
    methods: {
      refresh: async function () {
        const res = await axios.get('http://localhost:8080/')
        this.currencies = res.data.currencies
        this.request.name = undefined
        this.request.symbol = undefined
      },
      addCurrency: async function () {
        await axios.post('http://localhost:8080/', this.request)
        await this.refresh()
        this.$message({
          showClose: true,
          message: 'Add Currency Success!',
          type: 'success'
        })
      },
      deleteCurrency: async function (id) {
        await axios.delete('http://localhost:8080/' + id)
        await this.refresh()
        this.$message({
          showClose: true,
          message: 'Delete Currency Success!',
          type: 'success'
        })
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "../styles/base";
</style>