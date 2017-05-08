require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    inserted: function () {
        var _self = this;

        _self.dates = ['date'];
        _self.connectivity = ['Connectivity'];
        _self.connectivityBar = ['Connectivity_bar'];

        Swim.downlink()
            .host('ws://sensornet.swim.services:80/?token=abcd')
            .node('org/NewOrg')
            .lane('pzConnectionHistory')
            .onEvent(function (message) {

                var timestamp = message.body['@update'].key;
                var date = moment(timestamp).format('ddd, MMM DD YYYY @ hh:mm:ss:SSS A');
                var value = message.body[1];
                _self.dates.push(date);
                _self.connectivity.push(value);
                _self.connectivityBar.push(value);

            })
            .sync();

        setTimeout(function () {

            console.log('_self.dates.length', _self.dates.length);
            console.log('_self.dates', _self.dates);

            _self._chart = c3.generate({
                bindto: $('.chart', this)[0],
                padding: {
                    left: 48,
                    right: 48
                },
                data: {
                    x: 'date',
                    columns: [
                        // _self.dates,
                        // _self.connectivity,
                        // _self.connectivityBar
                    ],
                    type: 'area-step',
                    types: {
                        Connectivity_bar: 'bar'
                    },
                    colors: {
                        Connectivity: '#709ed4',
                        Connectivity_bar: 'red'
                    }
                },
                bar: {
                    width: {
                        ratio: 1
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries'
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                }
            });

            _self.removeAlertBars();
            _self.createAlertBars();

        }, 5000);



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

            var bars = d3.selectAll('path.c3-bar');
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