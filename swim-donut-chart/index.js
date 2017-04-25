require('./style.less');
var c3 = require('c3');

tag('x-swim-donut-chart', {
    template: require('./template.html'),
    inserted: function () {

        var _self = this;
        _self.data = _self.getData();
        var sum = [];
        for (var i = 0; i < _self.data.length; i++) {
            sum.push(_self.data[i][1]);
        }
        var title = 'Total: ' + _.sum(sum);

        _self._chart = c3.generate({
            bindto: $('.chart', _self)[0],
            data: {
                columns: _self.data,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: title
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                }
            },
            point: {
                show: false
            },
            legend: {
                show: false
            }
        });
    },
    methods: {
        getData: function () {
            return [['R0001', 30], ['R1002', 120]]
        }
    }

});