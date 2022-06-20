<template>
  <div id="app">
    <button @click="sss">sss</button>
    <div :class="s.main">
      <div :class="s.willtable_wrapper">
        <willtable
          ref="willtable"
          :columns="columns0"
          v-model="data0"
          :maxHeight="maxHeight"
          :disabled="disabled"
          :showIcon="showIcon"
          :editAble="editAble"
          :fixAble="fixAble"
          :addAble="addAble"
          :deleteAble="deleteAble"
          :cellStyle="cellStyle"
          :cellClassName="cellClassName"
          :rowHeight="28"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Willtable from "../src/components/Table.vue";
// import Willtable from '../dist/vue-willtable.min';
// import '../dist/vue-willtable.min.css';

export default {
  name: "App",
  components: {
    Willtable,
  },
  data() {
    return {
      features: [
        {
          label: "显示数据类型icon",
          checked: true,
          handleChange: (checked) => {
            this.showIcon = checked;
          },
        },
        {
          label: "显示行多选",
          checked: true,
          handleChange: (checked) => {
            if (checked) {
              this.columns.unshift({
                type: "selection",
                width: 40,
                fixed: true,
              });
            } else {
              this.columns.shift();
            }
          },
        },
        {
          label: "固定列",
          checked: true,
          handleChange: (checked) => {
            this.columns.forEach((col) => {
              if (["sid", "name"].includes(col.key)) {
                col.fixed = checked;
              }
            });
          },
        },
        {
          label: "启用筛选与过滤",
          checked: false,
          handleChange: (checked) => {
            this.columns.forEach((col) => {
              if (["sid", "name", "date"].includes(col.key)) {
                this.$set(col, "action", checked);
              }
            });
          },
        },
        {
          label: "禁止整表操作",
          checked: false,
          handleChange: (checked) => {
            this.disabled = checked;
          },
        },
        {
          label: "禁止序号操作",
          checked: false,
          handleChange: (checked) => {
            this.columns.some((col) => {
              if (col.key === "sid") {
                this.$set(col, "disabled", checked);
                return true;
              }
              return false;
            });
          },
        },
        {
          label: "自定义单元格样式",
          checked: false,
          handleChange: (checked) => {
            if (checked) {
              this.cellStyle = ({ rowIndex, columnIndex }) => {
                if (rowIndex % 2 === 1 && columnIndex % 2 === 0) {
                  return {
                    color: "#67C23A",
                  };
                }
              };
            } else {
              this.cellStyle = () => {};
            }
          },
        },
        {
          label: "自定义单元格类名",
          checked: false,
          handleChange: (checked) => {
            if (checked) {
              this.cellClassName = ({ rowIndex, columnIndex }) => {
                if (rowIndex % 2 === 0 && columnIndex % 2 === 1) {
                  return {
                    customChanged: true,
                  };
                }
              };
            } else {
              this.cellClassName = () => {};
            }
          },
        },
      ],
      columns0: [],
      columns1: [],
      columnsData: [
        {
          type: "selection",
          width: 40,
          fixed: true,
        },
        {
          title: "序号",
          key: "key",
          width: 100,
        },
        {
          title: "姓名",
          key: "table",
          width: 120,
        },
        {
          title: "value",
          key: "valu1e",
          width: 120,
        },
        {
          title: "datetun",
          key: "datetun",
          type: "date",
          fixed: true,
          width: 220,
        },
        {
          title: "序号1",
          key: "key1",
          width: 100,
        },
        {
          title: "姓名1",
          key: "table1",
          width: 120,
        },
        {
          title: "value1",
          key: "valu1e1",
          width: 120,
        },
        {
          title: "datetun1",
          key: "datetun1",
          type: "date",
          width: 220,
        },
        {
          title: "姓名2",
          key: "table2",
          width: 120,
        },
        {
          title: "value2",
          key: "valu1e2",
          width: 120,
        },
        {
          title: "datetun2",
          key: "datetun2",
          type: "date",
          width: 220,
        },
      ],
      data1: [
        {
          key: 31,
          table: "",
          valu1e: 32232,
          datetun: "2022-05-25",
          key1: 31,
          table1: "23",
          valu1e1: 32232,
          datetun1: "2022-05-25",
          table2: "23",
          valu1e2: 32232,
          datetun2: "2022-05-25",
        },
        {
          key: 21,
          table: "",
          valu1e: 32232,
          datetun: "2022-03-21",
          key1: 31,
          table1: "",
          valu1e1: 32232,
          datetun1: "2022-05-25",
          table2: "23",
          valu1e2: 32232,
          datetun2: "2022-05-25",
        },
        {
          key: 11,
          table: "",
          valu1e: 32232,
          datetun: "2021-12-23",
          key1: 31,
          table1: "23",
          valu1e1: 32232,
          datetun1: "2022-05-25",
          table2: "23",
          valu1e2: 32232,
          datetun2: "2022-05-25",
        },
      ],
      data0: [
        {
          key: 312,
          table: "rimo",
          valu1e: 32232,
        },
        {
          key: 346571,
          table: "",
          valu1e: 32232,
        },
      ],
      showIcon: false,
      disabled: false,
      editAble: true,
      fixAble: true,
      addAble: true,
      deleteAble: true,
      maxHeight: 130,
      cellStyle: () => {},
      cellClassName: () => {},
    };
  },
  mounted() {
    this.getList();
  },
  updated() {},
  methods: {
    sss() {
      console.log(this.data0, this.data1);
    },
    getList() {
      console.log(Object.keys(this.data0[0]));
      for (const k of Object.keys(this.data0[0])) {
        this.columns0.push({
          key: k,
          title: k,
        });
      }
      this.columns0.unshift({
        key: "selection",
        type: "selection",
        fixed: true,
        width: 50,
      });
      for (const k of Object.keys(this.data1[0])) {
        this.columns1.push({
          key: k,
          title: k,
        });
      }
      this.$refs.willtable.setData(this.data0);
    },
    addnew() {
      const onj = {
        id: new Date().getTime(),
        title: "obj.label",
        key: "obje",
        fixed: true,
        width: 100,
      };
      this.columns.push(onj);
      // this.columns.splice(2, 0, onj);
      // for (const o of this.data) {
      //   o.obje = ""
      // }
      // this.columns = res.table.columns;
      const tableData = this.data;
      this.columns.forEach((column) => {
        tableData.forEach((item) => {
          if (!Object.prototype.hasOwnProperty.call(item, column.key)) {
            this.$set(item, column.key, "");
          }
        });
      });
      console.log(tableData);
      // this.$nextTick().then(() => {
      //   this.$refs.willtable.setData(tableData);
      // })
      // this.$refs.willtable.setData(this.data);
    },
    getErrorRows() {
      console.log(this.$refs.willtable.getErrorRows());
    },
    getChangeData() {
      console.log(this.$refs.willtable.getChangeData());
    },
    // cellStyle({ rowIndex, columnIndex }) {
    //   if (rowIndex === 1) {
    //     return {
    //       color: 'red',
    //     };
    //   }
    //   if (columnIndex === 5) {
    //     return {
    //       color: 'green',
    //     };
    //   }
    // },
    add() {
      const obj = {};
      obj.id = new Date().getTime();
      this.columns.forEach((item) => {
        if (item.key) {
          obj[item.key] = "";
        }
      });
      this.$refs.willtable.addItem(obj);
    },
    remove() {
      this.$refs.willtable.removeItems(
        "sid",
        this.selection.map((s) => s.sid)
      );
    },
  },
};
</script>

<style lang="scss" module="s">
:global {
  html,
  body,
  #app {
    height: 100%;
  }
  .customChanged {
    background-color: rgba(247, 181, 0, 0.1);
  }
}

.title {
  text-align: center;
  padding-top: 20px;
  h2 {
    font-size: 24px;
    margin-bottom: 6px;
  }
  h3 {
    font-size: 18px;
    font-weight: normal;
    a {
      color: #0366d6;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.main {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  overflow: auto;
}

.features_wrapper {
  flex: none;
  width: 280px;
  margin-right: 30px;
}

.features_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #363636;
  margin-bottom: 20px;
  span {
    font-size: 18px;
  }
}

.features_list {
  padding-left: 20px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px 2px;
    border-bottom: 1px solid #e3e3e3;
  }
}

.willtable_wrapper {
  flex: auto;
  overflow-x: auto;
  height: 100%;
}

.more {
  font-size: 32px;
  text-align: right;
}
</style>
