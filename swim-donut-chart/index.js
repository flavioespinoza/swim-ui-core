require('./style.less');

tag('x-swim-donut-chart', {
    template: require('./template.html'),
    draw: function () {

        var lane = this.attributes['data-lane'].nodeValue;
        var guid = this.guid;
        var state = Store.get(guid);

        if (state) {
            if (state.week) {

                var dataset = {
                    value: [state.week, 100 - state.week]
                };

                console.log('dataset', dataset.value);

                this._path = this._path.data(this._pie(dataset.value)); // compute the new angles
                this._path.attr("d", this._arc); // redraw the arcs
                this._text.text(dataset.value[0] + '%')

            }
        }

    },
    inserted: function () {

        var _self = this;
        _self.data = _self.getData();

        var title = _self.attributes['data-title'].nodeValue;
        $('.donut-title', _self).html(title);

        if (_self.attributes['data-subchart']) {
            $('.donut-sub-chart', _self).removeClass('hidden');
            var subtitle = _self.attributes['data-subtitle'].nodeValue;
            $('.donut-sub-title', _self).html(subtitle);
        }

        var dataset = {
            value: [0, 100]
        };

        var width = $('.chart', this).width();
        var height = $('.chart', this).height();

        _self._radius = Math.min(width, height) / 2;

        _self._color = d3.scale.category20();

        _self._pie = d3.layout.pie()
            .sort(null);

        _self._arc = d3.svg.arc()
            .innerRadius(_self._radius - 12)
            .outerRadius(_self._radius - 48);

        _self._svg = d3.select(_self).select('.chart').append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        _self._path = _self._svg.selectAll("path")
            .data(_self._pie(dataset.value))
            .enter().append("path")
            .attr("fill", function (d, i) {
                return _self._color(i);
            })
            .attr("d", _self._arc);

        _self._text = d3.select(this).select('svg')
            .data(dataset.value)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('y', height / 2)
            .attr('x', width / 2)
            .attr('font-size', '20px')
            .text(function (d) {
                console.log('d', d);
                return d;
            });

    }

});