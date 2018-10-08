<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 20, offset: 2}" :lg="{span: 16, offset:4}">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <div class="group">
          <el-select v-model="stub.method" placeholder="Select">
            <el-option v-for="item in requestMethods" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input placeholder="Please input mock url" v-model="stub.path">
            <template slot="prepend">http://{{stub.host}}.{{stub.domain}}/</template>
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
          <el-button type="success" @click="addStub" plain>Add Stub</el-button>
          <el-button type="danger" @click="resetStub" plain>Reset</el-button>
        </div>
      </el-card>
      <stubs-list @start:stub="startStub" @stop:stub="stopServing" @delete:stub="deleteStub" :stubs="stubs" v-if="stubs.length" />
    </el-col>
  </el-row>
</template>

<script>
import StatusCode from "./Response/StatusCode";
import Headers from "./Response/Headers";
import ResponseBody from "./Response/ResponseBody";
import StubsList from "./StubsList";
import getNewHeader from "../helpers/getNewHeader";
import toJS from "../helpers/toJS";
import allowedMethods from "../helpers/requestAllowedMethods";
import initialMock from "../helpers/initialMock";

export default {
  name: "Mockit",
  components: {
    StatusCode,
    Headers,
    ResponseBody,
    StubsList
  },
  data() {
    return {
      title: "Mockit",
      activeTab: "code",
      message: "",
      requestMethods: allowedMethods,
      stub: { ...initialMock },
      stubs: []
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

    startStub(stub) {
      const ss = this.stubs.find(item => item === stub);
      this.startServing(stub).then(servedStub => {
        if (servedStub) {
          ss.servingRouteId = servedStub.servingRouteId;
          ss.serving = servedStub.serving;
        }
      });
    },

    startServing(stub) {
      const { host, method, path, body, headers, statusCode } = stub;
      const payload = {
        host,
        method,
        path: "/".concat(path),
        statusCode,
        headers: this.mapHeaders(headers),
        body: toJS(body)
      };

      const servedStub = { ...stub };

      return this.$http
        .post("/endpoint", payload)
        .then(res => {
          if (res) {
            this.$message({
              message: res.message,
              type: "success"
            });
            servedStub.servingRouteId = res.routeId;
            servedStub.serving = true;
          } else {
            throw new Error("Oops, something went wrong!");
          }
          return servedStub;
        })
        .catch(err => {
          this.$message({
            message: err.response.data.message,
            type: "error"
          });
        });
    },

    stopServing(stub) {
      return this.$http
        .delete("/endpoint", { routeId: stub.servingRouteId })
        .then(res => {
          this.$message({
            message: res.message,
            type: "success"
          });
          const stoppedStub = this.stubs.find(item => item === stub);
          stoppedStub.servingRouteId = "";
          stoppedStub.serving = false;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },

    deleteStub(stub) {
      if (stub.serving) {
        this.stopServing(stub.servingRouteId).then(res =>
          this.removeStub(stub)
        );
      } else {
        this.removeStub(stub);
      }
    },

    removeStub(stub) {
      const removedStubIndex = this.stubs.findIndex(item => item === stub);
      this.stubs.splice(removedStubIndex, 1);
    },

    addStub() {
      this.startServing(this.stub).then(stub => {
        if (stub) {
          this.stubs.push(stub);
        }
      });
    },
    resetStub() {
      this.stub.path = "";
      this.stub.method = "GET";
    }
  },

  created() {
    this.$http.get("/host").then(res => {
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
