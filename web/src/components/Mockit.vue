<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 18, offset: 3}" :lg="{span: 14, offset:5}">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <el-input placeholder="Please input mock url" v-model="stub.path">
          <template slot="prepend">http://localhost:4000/</template>
        </el-input>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Status Code" name="code">
            <status-code v-bind:statusCode.sync="stub.statusCode" />
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <headers :headers="stub.headers" @update:header="updateHeader" @add:header="addNewHeader" @remove:header="removeHeader" />
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            <response-body :body.sync="stub.body" />
          </el-tab-pane>
        </el-tabs>
        <div class="actions">
          <el-button type="success" @click="handleStart" plain>Start</el-button>
          <el-button type="danger" plain v-show="servingRouteId">Stop</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import StatusCode from "./Response/StatusCode";
import Headers from "./Response/Headers";
import ResponseBody from "./Response/ResponseBody";
import getNewHeader from "../helpers/getNewHeader";
import toJS from "../helpers/toJS";

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
      activeTab: "code",
      servingRouteId: "",
      stub: {
        path: "",
        headers: [],
        statusCode: 200,
        body: {}
      }
    };
  },
  methods: {
    setStatusCode(code) {
      this.stub.statusCode = code;
    },
    updatePath(newPath) {
      this.stab.path = newPath;
    },
    updateHeader({ id, name, value }) {
      this.stub.headers.find(item => item.id === id)[name] = value;
    },
    addNewHeader() {
      this.stub.headers.push(getNewHeader());
    },
    removeHeader(id) {
      const indexOfHeader = this.stub.headers.findIndex(item => item.id === id);
      this.stub.headers.splice(indexOfHeader, 1);
    },
    mapHeaders(headers) {
      return headers.filter(h => h.key !== "" || h.value !== "").map(h =>
        Object.defineProperty({}, h.key, {
          value: h.value
        })
      );
    },
    handleStart() {
      const { path, body, headers, statusCode } = this.stub;
      const payload = {
        path,
        statusCode,
        headers: this.mapHeaders(headers),
        body: toJS(body)
      };
      console.log("request", payload);
    }
  },
  created() {
    this.addNewHeader();
  }
};
</script>

<style lang="scss">
.actions {
  display: flex;
  justify-content: space-between;
}
</style>
