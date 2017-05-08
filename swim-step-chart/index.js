require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    inserted: function () {
        var _self = this;
        _self.dates = [];
        _self.connectivity = ['Connectivity'];
        _self.connectivityBar = ['Connectivity_bar'];

        var array = [];

        Swim.downlink()
            .host('ws://sensornet.swim.services:80/?token=abcd')
            .node('org/NewOrg')
            .lane('readerConnectionHistory')
            .onEvent(function (message) {

                var timestamp = message.body['@update'].key;
                var value = message.body[1];

                array.push({
                    date: timestamp,
                    close: value
                });

            })
            .sync();

        setTimeout(function () {

            var sorted = _.sortedUniq(array, function (obj) {
                return obj.timestamp;
            });
            
            var margin = {top: 20, right: 50, bottom: 30, left: 50},
                width = 996 - margin.left - margin.right,
                height = 224 - margin.top - margin.bottom;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var line = d3.svg.area()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.close);
                });

            line.interpolate('step-after');
            //line.interpolate('step-before');

            var svg = d3.select(_self).select('.chart').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var data = sorted;

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain(d3.extent(data, function (d) {
                return d.close;
            }));

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Readers');

            // draw the data as an svg path
            svg.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);

            // draw the data points as circles
            svg.selectAll('rect')
                .data(data)
                .enter().append('svg:rect')
                .attr('x', function (d) {
                    return x(d.date)
                })
                .attr('y', function (d) {
                    return y(d.close)
                })
                .attr('stroke-width', 2)
                .attr('stroke', 'steelblue')
                .attr('fill', 'orange')
                .attr('fill-opacity', .5)
                .attr('width', 15)
                .attr('height', 4)
                .on('mouseover', function (d) {
                    console.log('d', d);
                })

        }, 2000);

        // _self.removeAlertBars();
        // _self.createAlertBars();

    },
    methods: {
        removeAlertBars: function () {
            var alertBar = d3.selectAll(this).selectAll('.alert-bar');
            alertBar.remove();
        },
        getAlert: function (height) {
            if (height < 100) {
                return '#ffc107';
            } else {
                return '#709ed4';
            }
        },
        createAlertBars: function () {

            var bars = d3.selectAll(this).selectAll('path.c3-bar');
            var __bars = bars[0];

            for (var i = 0; i < __bars.length; i++) {
                var parent = d3.select(__bars[i].parentNode);
                var bbox = __bars[i].getBBox();
                var alert = this.getAlert(bbox.height);
                var offset = (bbox.height - 4);

                parent.append('rect')
                    .attr('class', 'alert-bar')
                    .attr('width', bbox.width)
                    .attr('height', bbox.height - offset)
                    .attr('x', bbox.x)
                    .attr('y', bbox.y - 4)
                    .attr('fill', alert)
                    .attr('fill-opacity', 1)
            }

            bars.remove();

        }
    }

});