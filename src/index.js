import G6 from "@antv/g6";
const data = {
  nodes: [
    {
      id: "Myriel",
      label: "node1"
    },
    {
      id: "Napoleon"
    },
    {
      id: "Mlle.Baptistine"
    },
    {
      id: "Mme.Magloire"
    },
    {
      id: "CountessdeLo"
    }
  ],
  edges: [
    {
      source: "Napoleon",
      target: "Myriel",
      value: 1
    },
    {
      source: "Mlle.Baptistine",
      target: "Myriel",
      value: 8
    },
    {
      source: "Mme.Magloire",
      target: "Myriel",
      value: 10
    },
    {
      source: "Mme.Magloire",
      target: "Mlle.Baptistine",
      value: 6
    },
    {
      source: "CountessdeLo",
      target: "Myriel",
      value: 1
    }
  ]
};
const container = document.getElementById("container");
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: container,
  width: width,
  height: height,
  fitView: true,
  modes: {
    default: ["drag-canvas", "drag-node"]
  },
  layout: {
    type: "dagre",
    rankdir: "LR",
    align: "UR"
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
