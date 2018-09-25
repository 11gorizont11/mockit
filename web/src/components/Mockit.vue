<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 18, offset: 3}" :lg="{span: 14, offset:5}">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <el-input placeholder="Please input mock url" :value="stub.path" @change="updatePath">
          <template slot="prepend">http://localhost:4000/</template>
        </el-input>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Status Code" name="code">
            <status-code :statusCode="stub.statusCode" @update:code="setStatusCode" />
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <headers :headers="stub.headers" />
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            <response-body/>
          </el-tab-pane>
        </el-tabs>
        <div class="actions">
          <el-button type="success" @click="handleStart" plain>Start</el-button>
          <el-button type="danger" plain>Stop</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import StatusCode from "./Response/StatusCode";
import Headers from "./Response/Headers";
import ResponseBody from "./Response/ResponseBody";

export default {
  name: "Mockit",
  components: {
    StatusCode,
    Headers,
    ResponseBody
  },
  data() {
    return {
      title: "Mockit",
      activeTab: "code"
    };
  },
  computed: {
    ...mapState({
      stub: state => state.stub
    })
  },
  methods: {
    ...mapMutations(["setStatusCode", "updatePath"]),
    handleStart() {
      console.log("request", this.stub);
    }
  }
};
</script>

<style lang="scss">
.actions {
  display: flex;
  justify-content: space-between;
}
</style>
