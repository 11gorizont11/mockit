<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 18, offset: 3}" :lg="{span: 14, offset:5}">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <div class="group">
          <el-select v-model="stub.method" placeholder="Select">
            <el-option v-for="item in requestMethods" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input placeholder="Please input mock url" v-model="stub.path">
            <template slot="prepend">http://{{stub.host}}.localhost:4000/</template>
          </el-input>
        </div>

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
          <el-button type="success" :loading="mockServing" @click="startServing" plain>{{mockServing ? "Serving ..." :"Start serving"}}</el-button>
          <el-button type="danger" plain v-show="servingRouteId" @click="stopServing">Stop</el-button>
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
import allowedMethods from "../helpers/requestAllowedMethods";

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
      mockServing: false,
      message: "",
      servingRouteId: "",
      requestMethods: allowedMethods,
      stub: {
        host: "",
        path: "",
        method: "GET",
        headers: [],
        statusCode: 200,
        body: {}
      }
    };
  },
  methods: {
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
      return headers.reduce((mappedHeaders, item) => {
        if (item.key !== "" || item.value !== "") {
          mappedHeaders.push({
            key: item.key,
            value: item.value
          });
        }
        return mappedHeaders;
      }, []);
    },

    startServing() {
      const { host, method, path, body, headers, statusCode } = this.stub;
      const payload = {
        host,
        method,
        path: "/".concat(path),
        statusCode,
        headers: this.mapHeaders(headers),
        body: toJS(body)
      };

      this.$http
        .post("/api/endpoint", payload)
        .then(res => {
          if (res) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.servingRouteId = res.routeId;
            this.mockServing = true;
          } else {
            throw new Error("Oops, something went wrong!");
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    stopServing() {
      this.$http
        .delete("/api/endpoint", { routeId: this.servingRouteId })
        .then(res => {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.servingRouteId = "";
          this.mockServing = false;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    }
  },

  created() {
    this.$http.get("/api/host").then(res => {
      this.stub.host = res.host;
    });
    this.addNewHeader();
  }
};
</script>

<style lang="scss">
.group,
.actions {
  display: flex;
  justify-content: space-between;
}
</style>
