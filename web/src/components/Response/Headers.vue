  <template>
  <el-table :data="tableData" :fit="true">
    <el-table-column prop="date" label="Date">
    </el-table-column>
    <el-table-column prop="name" label="Name">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom"
        },
        {
          date: "2016-05-02",
          name: "Tom"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  text-align: left;
  margin-bottom: 16px;
}
</style>
