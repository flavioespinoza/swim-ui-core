require('./style.less');
var c3 = require('c3');

tag('x-swim-donut-chart', {
    template: require('./template.html'),
    draw: function () {
        var lane = this.attributes['data-lane'].nodeValue;

        // console.log('this.guid', this.guid);
        // console.log('lane', lane);

        var state = Store.get(this.guid);

        if (state) {
            if (state.week) {
                this._chart.load({
                    columns: [['Uptime', state.week], ['Downtime', (100 - state.week)]]
                });
            }
        }
    },
    inserted: function () {

        var _self = this;
        _self.data = _self.getData();
        var title = _self.data[0][1] + '%';

        _self._chart = c3.generate({
            bindto: $('.chart', _self)[0],
            size: {
                height: 240,
                width: 240
            },
            data: {
                columns: _self.data,
                type: 'donut',
                colors: {
                    Uptime: '#709ed4',
                    Downtime: '#bbbbbb'
                },
                onclick: function (d, i) {

                },
                onmouseover: function (d, i) {

                },
                onmouseout: function (d, i) {

                }
            },
            donut: {
                title: title
            },
            legend: {
                show: true
            }
        });
    },
    methods: {
        getData: function () {
            return [['Uptime', 0], ['Downtime', 100]]
        }
    }

});