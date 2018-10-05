<template>
  <ul class="headers-list">
    <li>
      <span class="headers__input-control el-input__inner">Key</span>
      <span class="headers__input-control el-input__inner">Value</span>
    </li>
    <li v-for="item in headers" :key="item.id">
      <input type="text" class="headers__input-control el-input__inner" name="key" :value="item.key" @change="updatHeader(item.id, $event)">
      <input type="text" class="headers__input-control el-input__inner" name="value" :value="item.value" @change="updatHeader(item.id, $event)">
      <el-button type="danger" icon="el-icon-delete" circle class="headers__remove" @click="remove(item.id, $event)"></el-button>
    </li>
  </ul>
</template>

<script>
import compose from "../../helpers/compose";

export default {
  props: {
    headers: Array,
    required: true
  },
  data() {
    return {};
  },
  methods: {
    updatHeader(id, event) {
      const { name, value } = event.target;
      this.$emit("update:header", { id, name, value });
      compose(this.maybeRemoveLine, this.maybeAddNewLine, this.hasEmptylines)(
        this.headers
      );
    },
    hasEmptylines(headers) {
      return headers.slice().reduce((emptyLines, h) => {
        if (h.key === "" && h.value === "") {
          emptyLines.push(h.id);
        }
        return emptyLines;
      }, []);
    },
    maybeAddNewLine(emptyLinesIDs) {
      if (!emptyLinesIDs.length) {
        this.$emit("add:header");
      }
      return emptyLinesIDs;
    },
    maybeRemoveLine(emptyLinesIDs) {
      if (emptyLinesIDs.length > 1) {
        this.remove(emptyLinesIDs[1]);
      }
      return emptyLinesIDs;
    },
    remove(id) {
      if (this.headers.length > 1) {
        this.$emit("remove:header", id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headers-list {
  text-align: left;
  margin: 0 0 16px 0;
  list-style: none;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ebeef5;
    margin: 8px 0;
    position: relative;
    &:hover {
      .headers__remove {
        display: block;
      }
    }
  }
}
.headers__input-control {
  width: 50%;
  border: none;
}
.headers__remove {
  display: none;
  position: absolute;
  right: 0;
  top: -4px;
}
</style>
