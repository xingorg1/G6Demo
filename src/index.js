import G6 from "@antv/g6";
// Background Animation
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
const data = {
  nodes: [
    {
      id: "雄霸-天下",
      label: "node1",
      type: "background-animate",
      color: "#f40"
    },
    {
      id: "秦霜"
    },
    {
      id: "步惊云",
      type: "background-animate",
      color: "#f40"
    },
    {
      id: "孔慈",
      type: "background-animate",
      color: "#f40"
    },
    {
      id: "聂风"
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
const container = document.getElementById("container");
const width = container.scrollWidth;
const height = container.scrollHeight || 800;
const graph = new G6.Graph({
  container: container,
  width: width,
  height: height,
  fitView: true,
  modes: {
    default: ["drag-canvas", "drag-node", "zoom-canvas"],
    // 支持的 behavior
    edit: ["click-select"]
  },
  layout: {
    type: "dagre",
    rankdir: "LR"
    // align: "UR"
  },
  defaultNode: {
    type: "circle",
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
