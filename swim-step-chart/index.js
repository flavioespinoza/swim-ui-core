require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    inserted: function () {

        this._chart = c3.generate({
            bindto: $('.chart', this)[0],
            data: {
                columns: [
                    ['data1', 300, 350, 300, 0, 0, 100],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: 'step',
                    data2: 'area-step'
                }
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