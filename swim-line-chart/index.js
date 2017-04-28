require('./style.less');
var c3 = require('c3');

tag('x-swim-line-chart', {
    template: require('./template.html'),
    inserted: function () {


        //TODO: Derek - Need to feed in interval
        var duration = 500;
        var limit = 50;
        var now = new Date(Date.now() - duration);

        var width = this.clientWidth;
        var height = this.clientHeight;

        var groups = {
            max: {
                color: 'orange',
                data: d3.range(limit).map(function () {
                    return 0
                })
            },
            mean: {
                color: 'green',
                data: d3.range(limit).map(function () {
                    return 0
                })
            },
            min: {
                color: 'blue',
                data: d3.range(limit).map(function () {
                    return 0
                })
            }
        };

        var x = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, 100])
            .range([height, 0]);

        var line = d3.svg.line()
            .interpolate('basis')
            .x(function (d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function (d) {
                return y(d)
            });

        var svg = d3.select(this).select('.chart').append('svg')
            .attr('width', width)
            .attr('height', height + 50);

        var paths = svg.append('g');

        for (var name in groups) {
            var group = groups[name];
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
                .style('stroke-width', 3)
                .style('fill', 'none');
        }

        this._chart = function (data) {

            now = new Date();

            // Add new values
            for (var name in groups) {
                var group = groups[name];
                group.data.push(data[name].value);
                group.path.attr('d', line);
            }

            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration]);

            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .each('end', this._chart);

            // Remove oldest data point from each group
            for (var name in groups) {
                var group = groups[name];
                group.data.shift()
            }
        };

    },
    methods: {
        load: function (obj) {
            this._chart(obj)
        }
    },
    accessors: {
        // X-Tag utomatically maps camelcased accessor setter names to their
        // dashed attribute equivalents. In this example, `limitedCount` maps
        // to the `limited-count` attribute.
        data: {
            attribute: {},
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = JSON.parse(value);
            }
        },
        tooltip: {
            attribute: {boolean: true},
            get: function () {
                return this._tooltip;
            },
            set: function (value) {
                this._tooltip = value;
            }
        },
        legend: {
            attribute: {boolean: true},
            get: function () {
                return this._legend;
            },
            set: function (value) {
                this._legend = value;
            }
        },
        point: {
            attribute: {boolean: true},
            get: function () {
                return this._point;
            },
            set: function (value) {
                this._point = value;
            }
        },
        axis_x: {
            attribute: {boolean: true},
            get: function () {
                return this._axis_x;
            },
            set: function (value) {
                this._axis_x = value;
            }
        },
        axis_y: {
            attribute: {boolean: true},
            get: function () {
                return this._axis_y;
            },
            set: function (value) {
                this._axis_y = value;
            }
        }
    }
});