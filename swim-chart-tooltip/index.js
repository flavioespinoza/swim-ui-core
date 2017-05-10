require('./style.less');

//calculate the legend value
function getDataValue(id, data) {
    var ret = "";
    data.forEach(function (value) {
        if (id == value[0]) {
            ret = value[1];
        }
    });
    return ret;
}

function getKeys(data) {
 	 var ret = [];
    data.forEach(function (value) {
        if (value[0]) {
            ret.push(value[0]);
        }
    });
    
    return ret;
}

module.exports = tag('x-swim-chart-tooltip', {
    template: require('./index.html'),
    draw: function(){
		    var state = this._data = Store.get(this.guid);
		    if(state) {
				this._chart.load({
        			columns: state
    			});		    
		    }
		    this.generateLegend();
    },
    inserted: function() {
      var colorPattern = ['#ffc107', '#FED45B', '#FD9F28', '#FFEBB6'];
		this._data  = [];
        		
      // generate base chart when inserted into the DOM
		var chart = this._chart = c3.generate({
			bindto: $('.chart', this)[0],
			size: {
  				width: $(this).width()
			},
			color: {
            pattern: colorPattern
         },
			tooltip: {
            show: false
         },
   		legend: {
        		show: false
    		},
  			pie: {
    			label: {
      			show: false
    			}
  			},
    		data: {
        		columns: this._data,
        		type : 'pie'
    		}
		});   
		
		this.generateLegend();
    }, 
    methods: {
		generateLegend: function() {
				var data = this._data;
				var chart = this._chart;
				// create the legend from the chart
				$('.legend', this).remove();
				d3.select($('.chart', this)[0]).insert('div', '.chart').attr('class', 'legend').selectAll('span')
    			.data(getKeys(data))
  				.enter().append('span')
    			.attr('data-id', function (id) { return id; })
    			.html(function (id) { return '<div><span class="asset" style="width:20px;height:20px;display:inline-block;background:#000;border-radius:20px;"></span><span>' + id + '</span><span style="float:right;">' + getDataValue(id, data) +  '</span></div>'; })
    			.each(function (id) {
        			d3.select(this).select('.asset').style('background-color', chart.color(id));
    			});		
		}    
    }, 
    accessors: {
		'location': {
			attribute: {},
			set: function(value){
				this._title = value;
				$('.location', this).text(value);			
			},
			get: function() {
				return this._title;
			}	
		}    
    }
});