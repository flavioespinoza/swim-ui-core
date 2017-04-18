require('./style.less');
var c3 = require('c3');

tag('x-swim-line-chart', {
    template: require('./template.html'),
    inserted: function () {

        this._chart = c3.generate({
            bindto: $('.chart', this)[0],
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25]
                ]
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
    }
});