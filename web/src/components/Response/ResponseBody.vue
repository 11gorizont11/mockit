<template>
  <vue-json-editor v-model="json" :mode="'code'" :show-btns="false" @json-change="onJsonChange"></vue-json-editor>
</template>

<script>
import vueJsonEditor from "vue-json-editor";

export default {
  name: "ResponseBody",
  data() {
    return {
      json: [{ name: "Dirk", age: 1234 }, { name: "Jason" }]
    };
  },

  components: {
    vueJsonEditor
  },

  methods: {
    onJsonChange(value) {
      console.log("value:", value);
    }
  }
};
</script>
