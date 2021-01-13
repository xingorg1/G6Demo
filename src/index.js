import G6 from "@antv/g6";
// 数据
const data = {
  nodes: [
    {
      id: "雄霸-天下",
      name: "雄霸-天下",
      label: "node1",
      type: "background-animate",
      color: "#f40",
      count: 123456,
      label1: "338.00",
      rate: 0.627,
      status: "R",
      currency: "Yuan",
      variableName: "V2",
      variableValue: 0.179,
      variableUp: true
    },
    {
      id: "秦霜",
      name: "秦霜",
      count: 123456,
      label1: "338.00",
      rate: 0.627,
      status: "R",
      currency: "Yuan",
      variableName: "V2",
      variableValue: 0.179,
      variableUp: true
    },
    {
      id: "步惊云",
      type: "background-animate",
      color: "#f40",
      count: 123456,
      label1: "338.00",
      rate: 0.627,
      status: "R",
      currency: "Yuan",
      variableName: "V2",
      variableValue: 0.179,
      variableUp: true
    },
    {
      id: "孔慈",
      type: "background-animate",
      color: "#f40",
      count: 123456,
      label1: "338.00",
      rate: 0.627,
      status: "R",
      currency: "Yuan",
      variableName: "V2",
      variableValue: 0.179,
      variableUp: true
    },
    {
      id: "聂风",
      type: "rect-jsx",
      name: "聂风",
      color: "#2196f3",
      count: 123456,
      label1: "338.00",
      rate: 0.627,
      status: "R",
      currency: "Yuan",
      variableName: "V2",
      variableValue: 0.179,
      variableUp: true,
      description: "雄霸的第三个义子，主角、暖男",
      meta: {
        creatorName: "聂人王、颜盈"
      }
    }
  ],
  edges: [
    {
      source: "秦霜",
      target: "雄霸-天下",
      value: 1
    },
    {
      source: "步惊云",
      target: "雄霸-天下",
      value: 8,
      style: {
        stroke: "#f40"
      }
    },
    {
      source: "孔慈",
      target: "雄霸-天下",
      value: 10,
      style: {
        stroke: "#f40"
      }
    },
    {
      source: "孔慈",
      target: "步惊云",
      value: 6,
      style: {
        stroke: "#f40"
      }
    },
    {
      source: "聂风",
      target: "雄霸-天下",
      value: 1
    },
    {
      source: "孔慈",
      target: "聂风",
      value: 2
    }
  ]
};
// 节点优化 - 自定义
const colors = {
  B: "#5B8FF9",
  R: "#F46649",
  Y: "#EEBC20",
  G: "#5BD8A6",
  DI: "#A7A7A7"
};
G6.registerNode(
  "flow-rect",
  {
    shapeType: "flow-rect",
    draw(cfg, group) {
      const {
        name = "",
        variableName,
        variableValue,
        variableUp,
        label1,
        collapsed,
        currency,
        status,
        rate
      } = cfg;
      const grey = "#CED4D9";
      // 逻辑不应该在这里判断
      const rectConfig = {
        width: 202,
        height: 60,
        lineWidth: 1,
        fontSize: 12,
        fill: "#fff",
        radius: 4,
        stroke: grey,
        opacity: 1
      };

      const nodeOrigin = {
        x: -rectConfig.width / 2,
        y: -rectConfig.height / 2
      };

      const textConfig = {
        textAlign: "left",
        textBaseline: "bottom"
      };

      const rect = group.addShape("rect", {
        attrs: {
          x: nodeOrigin.x,
          y: nodeOrigin.y,
          ...rectConfig
        }
      });

      const rectBBox = rect.getBBox();

      // label title
      group.addShape("text", {
        attrs: {
          ...textConfig,
          x: 12 + nodeOrigin.x,
          y: 20 + nodeOrigin.y,
          text: name.length > 28 ? name.substr(0, 28) + "..." : name,
          fontSize: 12,
          opacity: 0.85,
          fill: "#000",
          cursor: "pointer"
        },
        name: "name-shape"
      });

      // price
      const price = group.addShape("text", {
        attrs: {
          ...textConfig,
          x: 12 + nodeOrigin.x,
          y: rectBBox.maxY - 12,
          text: label1,
          fontSize: 16,
          fill: "#000",
          opacity: 0.85
        }
      });

      // label currency
      group.addShape("text", {
        attrs: {
          ...textConfig,
          x: price.getBBox().maxX + 5,
          y: rectBBox.maxY - 12,
          text: currency,
          fontSize: 12,
          fill: "#000",
          opacity: 0.75
        }
      });

      // percentage
      const percentText = group.addShape("text", {
        attrs: {
          ...textConfig,
          x: rectBBox.maxX - 8,
          y: rectBBox.maxY - 12,
          text: `${((variableValue || 0) * 100).toFixed(2)}%`,
          fontSize: 12,
          textAlign: "right",
          fill: colors[status]
        }
      });

      // percentage triangle
      const symbol = variableUp ? "triangle" : "triangle-down";
      const triangle = group.addShape("marker", {
        attrs: {
          ...textConfig,
          x: percentText.getBBox().minX - 10,
          y: rectBBox.maxY - 12 - 6,
          symbol,
          r: 6,
          fill: colors[status]
        }
      });

      // variable name
      group.addShape("text", {
        attrs: {
          ...textConfig,
          x: triangle.getBBox().minX - 4,
          y: rectBBox.maxY - 12,
          text: variableName,
          fontSize: 12,
          textAlign: "right",
          fill: "#000",
          opacity: 0.45
        }
      });

      // bottom line background
      const bottomBackRect = group.addShape("rect", {
        attrs: {
          x: nodeOrigin.x,
          y: rectBBox.maxY - 4,
          width: rectConfig.width,
          height: 4,
          radius: [0, 0, rectConfig.radius, rectConfig.radius],
          fill: "#E0DFE3"
        }
      });

      // bottom percent
      const bottomRect = group.addShape("rect", {
        attrs: {
          x: nodeOrigin.x,
          y: rectBBox.maxY - 4,
          width: rate * rectBBox.width,
          height: 4,
          radius: [0, 0, 0, rectConfig.radius],
          fill: colors[status]
        }
      });

      // collapse rect
      if (cfg.children && cfg.children.length) {
        group.addShape("rect", {
          attrs: {
            x: rectConfig.width / 2 - 8,
            y: -8,
            width: 16,
            height: 16,
            stroke: "rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
            fill: "#fff"
          },
          name: "collapse-back",
          modelId: cfg.id
        });

        // collpase text
        group.addShape("text", {
          attrs: {
            x: rectConfig.width / 2,
            y: -1,
            textAlign: "center",
            textBaseline: "middle",
            text: collapsed ? "+" : "-",
            fontSize: 16,
            cursor: "pointer",
            fill: "rgba(0, 0, 0, 0.25)"
          },
          name: "collapse-text",
          modelId: cfg.id
        });
      }

      this.drawLinkPoints(cfg, group);
      return rect;
    },
    update(cfg, item) {
      const group = item.getContainer();
      this.updateLinkPoints(cfg, group);
    },
    setState(name, value, item) {
      if (name === "collapse") {
        const group = item.getContainer();
        const collapseText = group.find(
          (e) => e.get("name") === "collapse-text"
        );
        if (collapseText) {
          if (!value) {
            collapseText.attr({
              text: "-"
            });
          } else {
            collapseText.attr({
              text: "+"
            });
          }
        }
      }
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5]
      ];
    }
  },
  "rect"
);
G6.registerNode(
  "rect-jsx",
  (cfg) => `
    <group>
      <rect>
        <rect style={{
          width: 150,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          cursor: 'move'，
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{ 
            marginTop: 2, 
            marginLeft: 75, 
            textAlign: 'center', 
            fontWeight: 'bold', 
            fill: '#fff' }}>{{label}}</text>
        </rect>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: #ffffff,
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
          <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
        </rect>
      </rect>
    </group>`
);
// 节点动画
G6.registerNode(
  "background-animate",
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2;
      const back1 = group.addShape("circle", {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6
        },
        name: "back1-shape"
      });
      const back2 = group.addShape("circle", {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6
        },
        name: "back2-shape"
      });
      const back3 = group.addShape("circle", {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6
        },
        name: "back3-shape"
      });
      group.sort(); // Sort according to the zIndex
      back1.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: "easeCubic",
          delay: 0,
          repeat: true // repeat
        }
      ); // no delay
      back2.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: "easeCubic",
          delay: 1000,
          repeat: true // repeat
        }
      ); // 1s delay
      back3.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: "easeCubic",
          delay: 2000,
          repeat: true // repeat
        }
      ); // 3s delay
    }
  },
  "circle"
);
// 插件 - 小地图
const minimap = new G6.Minimap({
  size: [100, 100]
});
// 插件 - 上下文菜单
const contextMenu = new G6.Menu({
  getContent(evt) {
    let header;
    if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
      header = "Canvas ContextMenu";
    } else if (evt.item) {
      const itemType = evt.item.getType();
      header = `${itemType.toUpperCase()} ContextMenu`;
    }
    return `
    <h3>${header}</h3>
    <ul>
      <li title='1'>li 1</li>
      <li title='2'>li 2</li>
      <li>li 3</li>
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
  },
  handleMenuClick: (target, item) => {
    console.log(target, item);
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 16 + 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 0,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ["node", "edge", "canvas"]
});
// 插件 - 提示图
const tooltip = new G6.Tooltip({
  // offsetX and offsetY include the padding of the parent container
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX: 10,
  offsetY: 50 + 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ["node", "edge"],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement("div");
    outDiv.style.width = "fit-content";
    //outDiv.style.padding = '0px 0px 20px 0px';
    outDiv.innerHTML = `
      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${e.item.getType()}</li>
      </ul>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`;
    return outDiv;
  }
});

// 图形绘制
const container = document.getElementById("container");
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: container,
  width: width,
  height: height,
  fitView: true,
  modes: {
    default: ["drag-canvas", "drag-node", "zoom-canvas", "activate-relations"],
    // 支持的 behavior
    edit: ["click-select"]
  },
  plugins: [minimap, contextMenu, tooltip],
  layout: {
    type: "dagre",
    rankdir: "LR"
    // align: "UR"
  },
  defaultNode: {
    type: "flow-rect",
    style: {
      fill: "rgb(239, 244, 255)",
      stroke: "rgb(95, 149, 255)",
      cursor: "pointer",
      lineWidth: 1
    },
    linkPoints: {
      fill: "rgb(239, 244, 255)",
      stroke: "#ff0fda",
      lineWidth: 1,
      top: false,
      size: 10,
      bottom: false,
      left: false,
      right: false
    },
    labelCfg: {
      style: {
        style: {
          fill: "rgb(255, 255, 255)"
        },
        textAlign: "center",
        fontStyle: "normal",
        fontSize: 7,
        fill: "rgb(70, 70, 70)",
        rotate: 6.28
      },
      position: "top",
      offset: 1
    },
    size: 14,
    icon: {
      width: "",
      height: "",
      show: false
    }
  },
  defaultEdge: {
    type: "cubic-horizontal",
    style: {
      stroke: "l(0) 0:undefined 1:#b2bdc3",
      cursor: "default",
      lineWidth: 1,
      endArrow: {
        $arrowType: "diy",
        $path: "M 0,0 L 10,5 L 10,-5 Z",
        $compute: (e) => e,
        path: "M 0,0 L 10,5 L 10,-5 Z",
        d: 1,
        fill: "#d1f4ff",
        stroke: "#75e2ff"
      },
      startArrow: {
        path: ""
      }
    },
    labelCfg: {
      position: "middle",
      style: {
        textAlign: "center",
        textBaseline: "middle",
        fontStyle: "normal",
        fill: "#000000"
      }
    }
  }
});
graph.node((node) => {
  const { labelCfg = {}, icon = {}, linkPoints = {}, style = {} } = node;
  return {
    ...node,
    label: node.id
  };
});
graph.edge((edge) => {
  const { loopCfg = {}, style = {} } = edge;
  return {
    ...edge
  };
});
graph.data(data);
graph.render();

if (typeof window !== "undefined")
  window.onresize = () => {
    if (!graph || graph.get("destroyed")) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
