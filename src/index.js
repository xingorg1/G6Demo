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
fetch(
  "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(1, data);
    data.edge = {
      source: data.id,
      target: data.id,
      midPointColor: "#f00",
      quatileColor: "#f00"
    };

    const container = document.getElementById("container");
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: "container",
      width,
      height,
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.get("model").data;
              data.collapsed = collapsed;
              return true;
            }
          },
          "drag-canvas",
          "zoom-canvas",
          "activate-relations"
        ]
      },
      defaultNode: {
        size: 12,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5]
        ]
      },
      defaultEdge: {
        type: "cubic-horizontal",
        style: {
          stroke: "#eee",
          cursor: "default",
          endArrow: {
            path: ""
          },
          startArrow: {
            $arrowType: "diy",
            $path: "M 0,0 L 10,5 L 10,-5 Z",
            $compute: (e) => e,
            path: "M 0,0 L 10,5 L 10,-5 Z",
            d: 0,
            fill: "#eee"
          },
          strokeOpacity: 1,
          shadowColor: "#ffffff",
          lineAppendWidth: 2,
          lineWidth: 1
        },
        labelCfg: {
          position: "middle",
          style: {
            textAlign: "center",
            textBaseline: "middle",
            fontStyle: "italic",
            fill: "red",
            stroke: "red"
          }
        }
        // startArrow: {
        //   path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        //   fill: '#F6BD16',
        // },
        // endArrow: {
        //   path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        //   fill: '#fff',
        // },
      },
      layout: {
        type: "dendrogram",
        direction: "RL", // H / V / LR / RL / TB / BT
        nodeSep: 30,
        rankSep: 100
      }
    });

    graph.node(function (node) {
      let data = {
        label: node.id,
        type:
          node.children && node.children.length > 0 ? "" : "background-animate",
        color: node.children && node.children.length > 0 ? "green" : "red",
        labelCfg: {
          position: "left"
          // offset: 5,
        }
      };
      // console.log(data, node);

      return data;
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    if (typeof window !== "undefined")
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });
