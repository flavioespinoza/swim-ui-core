require('./style.less');
var c3 = require('c3');

tag('x-swim-donut-chart', {
    template: require('./template.html'),
    inserted: function () {

        var _self = this;
        _self.data = _self.getData();
        var title = _self.data[0][1] + '%';

        _self._chart = c3.generate({
            bindto: $('.chart', _self)[0],
            data: {
                columns: _self.data,
                type : 'donut',
                colors: {
                    Uptime: '#709ed4',
                    Downtime: '#DDDDDD'
                },
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) {  },
                onmouseout: function (d, i) {  }
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
            return [['Uptime', 93], ['Downtime', 7]]
        }
    }

});