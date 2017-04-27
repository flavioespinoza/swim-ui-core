require('./style.less');
var c3 = require('c3');

tag('x-swim-line-chart', {
    template: require('./template.html'),
    inserted: function () {
        this._chart = c3.generate({
            bindto: $('.chart', this)[0],
            data: this._data || {columns:[]},
            axis: {
                x: {
                    show: this._axis_x
                },
                y: {
                    show: this._axis_y
                }
            },
            point: {
                show: this._point
            },
            legend: {
                show: this._legend
            },
            tooltip: {
                show: this._tooltip
            },
            transition: {
                duration: 150
            }
        });
    },
    methods: {
        load: function(data) {
            this._chart.load(data);
        }
    },
    accessors: {
        // X-Tag utomatically maps camelcased accessor setter names to their
        // dashed attribute equivalents. In this example, `limitedCount` maps
        // to the `limited-count` attribute.
        data: {
            attribute: {},
            get: function() {
                return this._data;
            },
            set: function(value) {
                this._data = JSON.parse(value);
            }
        },
        tooltip: {
          attribute: {boolean: true},
          get: function(){
            return this._tooltip;
          },
          set: function(value){
            this._tooltip = value;
          }
        },
        legend: {
          attribute: {boolean: true},
          get: function(){
            return this._legend;
          },
          set: function(value){
            this._legend = value;
          }
        },
        point: {
          attribute: {boolean: true},
          get: function(){
            return this._point;
          },
          set: function(value){
            this._point = value;
          }
        },
        axis_x: {
          attribute: {boolean: true},
          get: function(){
            return this._axis_x;
          },
          set: function(value){
            this._axis_x = value;
          }
        },
        axis_y: {
          attribute: {boolean: true},
          get: function(){
            return this._axis_y;
          },
          set: function(value){
            this._axis_y = value;
          }
        }
    }
});