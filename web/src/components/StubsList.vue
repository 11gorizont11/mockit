<template>
  <el-table :data="stubs" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <vue-json-pretty :path="'res'" :data="scope.row.body">
        </vue-json-pretty>
      </template>
    </el-table-column>
    <el-table-column label="Url" width="380">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{"http://"+ scope.row.host + "."+ scope.row.domain + "/" + scope.row.path}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="method" label="Method" width="120">
    </el-table-column>
    <el-table-column label="Status" width="80" align="center">
      <template slot-scope="scope">
        <i v-if="scope.row.servingRouteId" class="el-icon-loading"></i>
        <i v-else class="el-icon-setting"></i>
      </template>
    </el-table-column>
    <el-table-column label="Actions" align="right">
      <template slot-scope="scope">
        <el-button v-if="scope.row.servingRouteId" size="mini" @click="handleStop(scope.row)">Stop</el-button>
        <el-button v-else size="mini" type="success" @click="handleStart(scope.row)">Start</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";

export default {
  components: {
    VueJsonPretty
  },
  props: {
    stubs: Array,
    required: true
  },
  methods: {
    handleStart(stub) {
      this.$emit("start:stub", stub);
    },
    handleStop(stub) {
      this.$emit("stop:stub", stub);
    },
    handleDelete(stub) {
      this.$emit("delete:stub", stub);
    }
  }
};
</script>