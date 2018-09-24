<template>
  <vue-json-editor v-model="json" :mode="'code'" :show-btns="false" @json-change="onJsonChange" @has-error="onError"></vue-json-editor>
</template>

<script>
import vueJsonEditor from "vue-json-editor";

export default {
  name: "ResponseBody",
  data() {
    return {
      json: {}
    };
  },

  components: {
    vueJsonEditor
  },

  methods: {
    onJsonChange(value) {
      console.log("value:", value);
    },
    onError() {
      console.log("Error parse");
    }
  }
};
</script>
