require('./style.less');

var d3 = require('d3');
require('./lib/sankey.js');




var sankeyStore = Store.get('sankey');

tag('x-swim-sankey', {
  template: require('./template.html'),
    draw: function(){
       var state = Store.get(this.guid);
        var drawPaths = state && state.pulsePaths.splice(10);
        $(drawPaths).each(function(idx, value){
          $('x-swim-sankey')[0].flowCircle(value.weight, $('path[data-link-name=' + value.loc + ']')[0])
        });
        Store.put(this.guid, state);
},
  methods: {
    load: function (data) {

    },
    // draw a Circle that flows down a path on the sankey
    // path name is a source.name + target.name with scrubbed spaces
    flowCircle: function flowCircle(diameter, path) {

      //Get path start point for placing marker
      function pathStartPoint(path) {
        var d = path.attr("d"),
          dsplitted = d.split(" ");
        return dsplitted[1].split(",");
      }

      var startPoint = pathStartPoint($(path));
      var marker = this.svg.append("circle");

      marker.attr("r", diameter)
        .attr("class", "circle")
        .attr("transform", "translate(" + startPoint + ")");

      marker.transition()
        .duration(7500)
        .attrTween("transform", translateAlong(path)).remove();;

      function translateAlong(path) {
        var l = path.getTotalLength();
        return function (i) {
          return function (t) {
            var p = path.getPointAtLength(t * l);
            return "translate(" + p.x + "," + p.y + ")"; //Move marker
          }
        }
      }
    }
  },
  created: function () {
    this.svg = d3.select(this).append("svg");
  },
  inserted: function () {

    var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },

    width = $(this).width() - margin.left - margin.right,

    //todo: this is a hack right now, to fit into an app, fix fix fix
    height = $(this).height() - 64 - margin.top - margin.bottom;

    // append the svg canvas to the page
    this.svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();

    // load the data

    var graph = require('./lib/fixture.json');
    var nodeMap = {};
    graph.nodes.forEach(function (x) {
      nodeMap[x.name] = x;
    });
    graph.links = graph.links.map(function (x) {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
      };
    });

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    // add in the links
    var link = this.svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("data-link-name", function (d) {
        return d.source.name.replace(' ', '-') + "-" + d.target.name.replace(' ', '-');
      })
      .attr("d", path)
      .style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    // add the link titles
    link.append("title")
      .text(function (d) {
        return d.source.name + " → " +
          d.target.name;
      });

    // add in the nodes
    var node = this.svg.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
  
          // re-inflate from state store, then update from swim
          // service
          if(sankeyStore && sankeyStore[d.name]) {
            d.x = sankeyStore[d.name][0];
            d.y = sankeyStore[d.name][1];
          }
          // sankey.relayout();

          link.attr("d", function (d) {
            var p = path(d);
            return p;
          });

          return  "translate(" + d.x + "," + d.y + ")";

      })
      .call(d3.behavior.drag()
        .on("dragstart", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", function dragmove(d) {
              var sankeyStore = Store.get('sankey') || {};

              d3.select(this).attr("transform",
                "translate(" + (
                  d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                ) + "," + (
                  d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");

              sankeyStore[d.name] = [d.x, d.y];
              Store.put('sankey', sankeyStore);

              sankey.relayout();

              link.attr("d", function (d) {
                var p = path(d);
                return p;
              });
        }));

    // add the rectangles for the nodes
    node.append("rect")
      .attr("height", function (d) {
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", '#709ed4')
      .append("title")
      .text(function (d) {
        return d.name;
      });

    // add in the title for the nodes
    node.append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
  }
});