<template>
  <vue-json-editor v-model="json" :mode="'code'" :show-btns="false" @json-change="onJsonChange" @has-error="onError"></vue-json-editor>
</template>

<script>
import vueJsonEditor from "vue-json-editor";

export default {
  name: "ResponseBody",

  props: {
    body: Object
  },
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
      this.$emit("update:body", value);
    },
    onError() {
      console.log("Error parse");
    }
  }
};
</script>


<style lang="scss">
.jsoneditor-vue {
  margin-bottom: 16px;
}
</style>
