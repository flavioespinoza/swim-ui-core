require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    inserted: function () {
        var _self = this;
        _self.dates = [];
        _self.connectivity = ['Connectivity'];
        _self.connectivityBar = ['Connectivity_bar'];

        var title = _self.attributes['data-title'].nodeValue;
        $('.step-title', _self).html(title);

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