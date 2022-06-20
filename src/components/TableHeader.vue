<template>
  <div
    class="ww-theader"
    :class="{
      fixed,
    }"
  >
    <div
      ref="tr"
      class="ww-tr"
      :style="{
        width: `${store.states.tableWidth}px`,
        height: `${store.states.theaderHeight}px`,
        transform: `translate3d(
          -${fixed ? 0 : store.states.tableBodyLeft}px,
          0,
          0
        )`,
      }"
    >
      <div
        v-for="(th, index) in columns"
        :key="index"
        class="ww-th"
        :style="{
          width: `${columnsWidth[index]}px`,
          'text-align': th.align,
        }"
        :class="{
          selection: th.type === 'selection',
        }"
        :title="th.title"
        v-show="th.fixed || allShow"
      >
        <el-checkbox
            size="mini"
            v-if="th.type === 'selection'"
            v-model="checkedAll"
            @change="selectAll"
          ></el-checkbox>
          <p
            class="ww-title"
            :style="{
              width: `${columnsWidth[index] - 20}px`,
            }"
            :class="{ active: isActive(columnsStatusList[index]) }"
            v-else
          >
            <span
              v-if="showIcon"
              class="icon"
              :class="iconClass(th.type)"
            ></span>
            {{ th.title }}
            <a href="javascript:void(0)" v-if="fixAble" @click="lockKey(th, index)"  class="icon" title="锁定表头" :class="{lock:true}"></a>
            <a href="javascript:void(0)" v-if="editAble" @click="editKey(th, index)"  class="icon" title="编辑表头" :class="{edit:true}"></a>
            <el-popover
              placement="right-start"
              trigger="click"
              :visible-arrow="false"
            >
                <ul>
                  <li>
                    <a
                      href="javascript:void(0)"
                      @click="add_new_column('left', th, index)"
                      >左侧添加列</a
                    >
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      @click="add_new_column('right', th, index)"
                      >右侧添加列</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="delete_column(th, index)"
                      >删除该列</a
                    >
                  </li>
                </ul>
                <a href="javascript:void(0)"  slot="reference" @click="menuKey(th)"  class="icon" title="列操作" :class="{menu:true}"></a>
            </el-popover>
          </p>
          <div
            v-if="th.type !== 'selection'"
            class="dropdown"
            :class="{ active: dropdown.index === index }"
            :style="{
              top: `${(store.states.theaderHeight - 14) / 2}px`,
            }"
          >
            <i v-if="th.action" @click.stop="openDropdown(index)"></i>
          </div>
          <div
            v-if="th.type !== 'selection'"
            class="handler"
            @mousedown="handlerDown(index)"
          ></div>
      </div>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        width="30%"
        :show-close="false"
        :destroy-on-close = "true"
        :before-close="handleClose"
      >
       <el-form ref="form" size="mini" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="label" prop="label">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
         <el-form-item label="key" prop="key">
          <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" size="mini">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import
{
  checkbox, popover, dialog, Input, form, button, FormItem, MessageBox
}
from "element-ui";

export default {
  components: {
    "el-checkbox": checkbox,
    "el-popover": popover,
    "el-dialog": dialog,
    "el-input": Input,
    "el-button": button,
    "el-form": form,
    "el-form-item": FormItem
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    editAble: {
      type: Boolean,
      default: false,
    },
    fixAble: {
      type: Boolean,
      default: false,
    },
    allShow: Boolean,
    columnsWidth: {
      type: Array,
      default: () => [],
    },
    fixedCount: [String, Number],
    store: {
      required: true,
    },
  },
  data() {
    return {
      active_row: {},
      form: {
        key: "",
        label: "",
      },
      rules: {
        label: [
          { required: true, message: "新增列头名称不能为空", trigger: "blur" },
        ],
        key: [
          { required: true, message: "新增列头key不能为空", trigger: "blur" },
        ]
      },
      dialogVisible: false,
      dialog_type: '',
      checkedAll: false,
      adjustWidthValue: 80,
      adjustWidthFlag: false,
      adjustWidthIndex: 0,
      adjustWidthType: "",
      mouseX: 0,
    };
  },
  computed: {
    columns() {
      return this.store.states.columns;
    },
    columnsStatusList() {
      return this.store.states.columnsStatusList;
    },
    dropdown() {
      return this.store.states.dropdown;
    },
    filters() {
      return this.store.states.filters;
    },
  },
  methods: {
    menuKey(col) {
      this.active_row = {};
      this.form.key = "";
      this.form.label = "";
      this.active_row = col;
    },
    lockKey(th) {
      this.$emit('fix_column', th)
    },
    editKey(th, index) {
      console.log(th, index)
      this.form.label = th.title;
      this.form.key = th.key;
      this.dialog_type = 'edit'
      this.active_row = th;
      this.active_row.index = index;
      this.dialogVisible = true;
    },
    submitForm(tag) {
      this.$refs[tag].validate((valid) => {
        if (valid) {
          this.active_row.label = this.form.label;
          this.active_row.key = this.form.key;
          this.dialogVisible = false
          if (this.dialog_type === 'add') {
            this.$emit('add_new_column', this.active_row)
          } else {
            console.log(this.active_row)
            this.$emit('edit_column', this.active_row)
          }
        } else {
          console.log('error submit!!');
        }
      });
    },
    handleClose() {
    },
    delete_column(col, index) {
      MessageBox.confirm('确定删除该列吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("delete_column", { col, index });
      }).catch(() => {

      })
    },
    add_new_column(type, col, index) {
      this.dialogVisible = true;
      this.dialog_type = 'add'
      this.active_row.type = type;
      this.active_row.col = col;
      this.active_row.index = index;
    },
    selectAll() {
      this.$parent.selectAll();
    },
    handlerDown(index) {
      this.adjustWidthFlag = true;
      this.adjustWidthIndex = index;
      this.store.states.adjustLineShow = true;
      window.addEventListener("mousemove", this.handlerMove);
      window.addEventListener("mouseup", this.handlerUp);
    },
    handlerMove(e) {
      if (this.adjustWidthFlag) {
        e = e || window.event;
        let width;
        if (this.fixedCount >= this.adjustWidthIndex + 1) {
          width =
            e.pageX -
            this.$parent.excelPos.left -
            this.$refs.tr.children[this.adjustWidthIndex].offsetLeft;
        } else {
          width =
            e.pageX +
            this.store.states.tableBodyLeft -
            this.$parent.excelPos.left -
            this.$refs.tr.children[this.adjustWidthIndex].offsetLeft;
        }
        if (width >= 80) {
          this.adjustWidthValue = width;
          this.store.states.adjustLineLeft =
            e.pageX - this.$parent.excelPos.left;
        }
      }
    },
    handlerUp() {
      this.$parent.adjustWidth(this.adjustWidthIndex, this.adjustWidthValue);
      this.adjustWidthFlag = false;
      this.store.states.adjustLineShow = false;
      window.removeEventListener("mousemove", this.handlerMove);
      window.removeEventListener("mouseup", this.handlerUp);
    },
    openDropdown(i) {
      this.store.openDropdown(i);
    },
    isActive(th) {
      if (!th) return false;
      if (this.filters.hasOwnProperty(th.key)) {
        return true;
      }
      if (th.sort) {
        return true;
      }
      return false;
    },
    iconClass(type) {
      let className;
      switch (type) {
        case "number":
          className = "number";
          break;
        case "date":
          className = "date";
          break;
        case "month":
          className = "date";
          break;
        case "select":
          className = "select";
          break;
        default:
          className = "text";
      }
      return {
        [className]: true,
      };
    },
  },
};
</script>

<style lang="scss">
.ww-theader {
  position: relative;
  font-size: 12px;
  user-select: none;
  overflow: hidden;
  border-right: 1px solid #d6dfe4;
  z-index: 5;
  &.fixed {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 1px 0 8px #d3d4d6;
    z-index: 6;
  }
  .ww-tr {
    display: flex;
    background-color: #eef1f6;
    border-bottom: 1px solid #d6dfe4;
  }
  .ww-th {
    position: relative;
    display: flex;
    align-items: center;
    border-top: 1px solid #d6dfe4;
    border-left: 1px solid #d6dfe4;
    &.selection {
      justify-content: center;
    }
  }
  .dropdown {
    position: absolute;
    right: 10px;
    z-index: 1;
    display: flex;
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: url("../assets/dropdown.png") center center no-repeat;
      cursor: pointer;
      transition: all 0.3s;
    }
    &.active {
      i {
        transform: rotateZ(180deg);
      }
    }
  }
  .handler {
    position: absolute;
    z-index: 1;
    top: 0;
    right: -8px;
    width: 16px;
    height: 30px;
    cursor: col-resize;
    text-align: center;
  }
  .active {
    color: #2d8cf0;
  }

  .ww-title {
    height: 30px;
    line-height: 30px;
    text-indent: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: text-bottom;
    margin-bottom: 1px;
    &.text {
      background-image: url("../assets/text.png");
    }
    &.select {
      background-image: url("../assets/select.png");
    }
    &.date {
      background-image: url("../assets/date.png");
    }
    &.number {
      background-image: url("../assets/number.png");
    }
    &.edit {
      background-image: url("../assets/edit.png");
    }
    &.addRow {
      background-image: url("../assets/add-row.png");
    }
    &.deleteRow {
      background-image: url("../assets/delete-row.png");
    }
    &.lock {
      background-image: url("../assets/lock.png");
    }
    &.menu {
      background-image: url("../assets/menu.png");
    }
  }
}
</style>
