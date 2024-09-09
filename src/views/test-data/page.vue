<template>
  <div>
    <div style="display: flex">
      <div
        v-for="item in btnGroup"
        :key="item.id"
        draggable="true"
        @dragend="handleDragEnd($event, item)"
      >
        <el-button
          :style="{
            background: item.background,
            color: item.color,
            border: item.border,
          }"
          >{{ item.name }}</el-button
        >
      </div>
      <el-button @click="graphSave">保存</el-button>
    </div>
    <el-divider></el-divider>
    <div id="container" style="height: 70vh; width: 100%"></div>
  </div>
</template>
<script>
import {
  Graph,
  // Shape,
  //  Addon,
  //   DataUri
} from "@antv/x6";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
export default {
  data() {
    return {
      graph: null, //画布
      params: {}, //详情
      btnGroup: [
        {
          name: "开始",
          id: 1,
          background: "#30d362",
          color: "white",
          border: "none",
          type: "btn",
        },
        {
          name: "结束",
          id: 2,
          background: "#e65d6e",
          color: "white",
          border: "none",
          type: "btn",
        },
      ],
    };
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      const container = document.getElementById("container");
      this.graph = new Graph({
        container: container, // 画布容器
        width: "100%", // 画布宽
        height: "70vh", // 画布高
        background: false, // 背景（透明）
        snapline: true, // 对齐线
        // 配置连线规则
        connecting: {
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边
          allowLoop: true, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          highlight: true, // 拖动边时，是否高亮显示所有可用的节点
          highlighting: {
            magnetAdsorbed: {
              name: "stroke",
              args: {
                attrs: {
                  fill: "#5F95FF",
                  stroke: "#5F95FF",
                },
              },
            },
          },
          router: {
            // 对路径添加额外的点
            name: "metro",
          },
          connector: {
            // 边渲染到画布后的样式
            name: "rounded",
            args: {
              radius: 8,
            },
          },
        },
        panning: {
          enabled: false,
        },
        mousewheel: {
          enabled: true, // 支持滚动放大缩小
          zoomAtMousePosition: true,
          modifiers: ["ctrl", "meta"],
          minScale: 0.5,
          maxScale: 3,
        },
        grid: {
          type: "dot",
          size: 10, // 网格大小 10px
          visible: true, // 渲染网格背景
          args: {
            color: "#a0a0a0", // 网格线/点颜色
            thickness: 1, // 网格线宽度/网格点大小
          },
        },
      });
      // 使用插件
      this.graph.use(
        //变换
        new Transform({
          resizing: true, //调整大小
          rotating: true, //旋转角度
        })
      );
      // 框选
      this.graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
          showEdgeSelectionBox: true,
          pointerEvents: "none",
        })
      );
      // 快捷键
      this.graph.use(
        new Keyboard({
          enabled: true,
        })
      );
      // 复制粘贴
      this.graph.use(
        new Clipboard({
          enabled: true,
          global: false, //是否为全局键盘事件
        })
      );
      //撤销重做
      this.graph.use(
        new History({
          enabled: true,
        })
      );
      // 对齐线
      this.graph.use(
        new Snapline({
          enabled: true,
          clean: false, // 如果为 true，则在 3s 后清除对齐线，为 false，不会清除，如果为数字(ms)，则在指定时间后清除对齐线
        })
      );
      // 双击节点
      // this.graph.on("cell:dblclick", ({ e, x, y, cell, view }) => {
      //   this.$emit(dbclickAlert,true)
      //   this.$parent.dbclickAlert(true)
      //   if (this.graph.isNode(cell)) {
      //     console.log("data", cell.getData());
      //     this.$parent.$parent.$parent.dbclickAlert(cell, true);
      //   }
      // });
      // 历史改变
      this.graph.on("history:change", () => {
        this.canRedo = this.graph.canRedo();
        this.canUndo = this.graph.canUndo();
      });
      // 右键菜单
      this.graph.on("node:contextmenu", ({ e, x, y, cell, view }) => {
        this.onContextmenu(e);
      });
      this.graph.on("edge:contextmenu", ({ e, x, y, cell, view }) => {
        this.onContextmenu(e);
      });
      this.graph.on("blank:contextmenu", ({ e, x, y, cell, view }) => {
        this.onContextmenu(e);
      });
      this.graph.on("node:mouseenter", () => {
        const container = document.getElementById("container");
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, true);
      });
      this.graph.on("node:mouseleave", () => {
        const container = document.getElementById("container");
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, false);
      });
      // 复制
      this.graph.bindKey("ctrl+c", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
        }
        return false;
      });
      // 粘贴
      this.graph.bindKey("ctrl+v", () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
        return false;
      });
      // 撤销
      this.graph.bindKey("ctrl+z", () => {
        this.graph.undo();
      });
      // 恢复
      this.graph.bindKey("ctrl+y", () => {
        this.graph.redo();
      });
      // 剪切
      this.graph.bindKey("ctrl+x", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
          this.graph.removeCells(cells);
        }
      });
      // 删除
      this.graph.bindKey("Backspace", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.removeCells(cells);
        }
        return false;
      });
    },
    // 右击菜单事件
    onContextmenu(event) {
      const cells = this.graph.getSelectedCells();
      const isRedo = this.canRedo;
      const isUndo = this.canUndo;
      this.$contextmenu({
        items: [
          {
            label: "复制(Ctrl+Z)",
            disabled: cells.length === 0 ? true : false,
            onClick: () => {
              if (cells.length) {
                this.graph.copy(cells);
              }
            },
          },
          {
            label: "粘贴(Ctrl+V)",
            disabled: this.graph.isClipboardEmpty(),
            onClick: () => {
              if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: 32 });
                this.graph.cleanSelection();
                this.graph.select(cells);
              }
            },
          },
          {
            label: "剪切(Ctrl+X)",
            divided: true,
            disabled: cells.length === 0 ? true : false,
            onClick: () => {
              if (cells.length) {
                this.graph.copy(cells);
                this.graph.removeCells(cells);
              }
            },
          },
          {
            label: "撤销(Ctrl+Z)",
            disabled: !isUndo,
            onClick: () => {
              this.undo();
            },
          },
          {
            label: "恢复(Ctrl+Y)",
            disabled: !isRedo,
            divided: true,
            onClick: () => {
              this.redo();
            },
          },
          {
            label: "删除(Backspace)",
            disabled: cells.length === 0 ? true : false,
            onClick: () => {
              if (cells.length) {
                this.graph.removeCells(cells);
              }
            },
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 100, // 菜单样式 z-index
        minWidth: 150, // 主菜单最小宽度
      });
      return false;
    },
    // 撤销
    undo() {
      this.graph.undo();
    },
    // 恢复
    redo() {
      this.graph.redo();
    },
    // 拖动后松开鼠标触发事件
    handleDragEnd(e, item) {
      console.log(e, item); // 可以获取到最后拖动后松开鼠标时的坐标和拖动的节点相关信息
      this.addHandleNode(
        e.pageX - 500,
        e.pageY - 200,
        new Date().getTime(),
        item
      );
    },
    //添加节点到画布
    addHandleNode(x, y, id, item) {
      console.log(312313, x, y, id, item);
      this.graph.addNode({
        id: item.id,
        shape: "rect", // 指定使用何种图形，默认值为 'rect'
        x: x,
        y: y,
        width: item.type === "option" ? 220 : 100,
        height: 40,
        // imageUrl: image,
        attrs: {
          body: {
            stroke: item.type === "btn" ? "white" : "black", //边框色
            strokeWidth: 1,
            fill: item.background, //背景色
            rx: 6,
            ry: 6,
          },
          text: {
            text: item.name,
            fill: item.color, // 文字颜色
          },
          // label: {
          //   text: item.name,
          //   fill: item.color,
          //   textWrap: {
          //     width: 100,
          //     height: 40,
          //     ellipsis: true,
          //   },
          // },
        },
        ports: {
          groups: {
            group1: {
              position: {
                name: "top",
              },
            },
            group2: {
              position: {
                name: "bottom",
              },
            },
            group3: {
              position: {
                name: "left",
              },
            },
            group4: {
              position: {
                name: "right",
              },
            },
          },
          items: [
            {
              group: "group1",
              id: "port1",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  fill: "#5F95FF",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            {
              group: "group2",
              id: "port2",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  fill: "#5F95FF",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            {
              group: "group3",
              id: "port3",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  fill: "#5F95FF",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            {
              group: "group4",
              id: "port4",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  fill: "#5F95FF",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
          ],
        },
        zIndex: 10,
        parent: item.parent ? item.parent : null, // 设置父节点ID
      });
      this.graph.on("node:mouseenter", ({ e, node, view }) => {
        console.log(9999, e, view);
        node.addTools({
          name: "button-remove",
          args: {
            x: "100%",
            y: 0,
            offset: { x: 0, y: 0 },
          },
        });
      });
      this.graph.on("node:mouseleave", ({ e, node, view }) => {
        console.log(9999, e, view);
        node.removeTools();
      });
      this.graph.on("node:contextmenu", ({ cell, e, x, y, node, view }) => {
        console.log("右键", cell, e, x, y, node, view);
        e.preventDefault();
      });
      if (item.parent) {
        // 动态添加边线，连接到刚刚创建的节点
        this.graph.addEdge({
          source: { cell: item.parent }, // 指定起始节点ID
          target: { cell: item.id }, // 指定目标节点ID或端点
          attrs: {
            line: {
              stroke: "#333",
              strokeWidth: 2,
            },
          },
          tools: ["edge-editor"], // 文本编辑器
        });
      }
    },
    // 控制连接桩显示/隐藏
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    },
    // 导出svg
    toSvg() {
      this.graph.exportSVG("导出svg格式");
    },
    // 导出png
    toJpg() {
      this.graph.exportPNG("导出png格式");
    },
    // 销毁画布
    graphDispose() {
      this.graph.dispose();
    },
    // 将画布中元素居中展示
    graphCenter() {
      this.graph.centerContent();
    },
    // 保存
    graphSave() {
      console.log("data", this.graph.toJSON());
    },
  },
};
</script>
<style lang="less" scoped>
</style>