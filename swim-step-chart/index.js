require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    inserted: function () {
        var _self = this;

        _self._chart = c3.generate({
            bindto: $('.chart', this)[0],
            padding: {
                left: 48,
                right: 48
            },
            data: {
                x: 'date',
                columns: [
                    ['date', '2014-01-01', '2014-01-02', '2014-01-03', '2014-01-04', '2014-01-05', '2014-01-06', '2014-01-07'],
                    ['Connectivity', 300, 350, 128, 350, 40, 55, 369],
                    ['Connectivity_bar', 300, 350, 128, 350, 40, 55, 369]
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

    },
    methods: {
        removeAlertBars: function () {
            var alertBar = d3.selectAll('.alert-bar');
            console.log('alertBar', alertBar);
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

                console.log('bbox', bbox);
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