require('./style.less');
var c3 = require('c3');

tag('x-swim-step-chart', {
    template: require('./template.html'),
    draw: function () {

        var lane = this.attributes['data-lane'].nodeValue;
        var guid = this.guid;
        var state = Store.get(guid);
        var data = [];

        if (state) {

            console.log('state', state);

            // if (state.body[0]['@update'][0].key) {
            //
            //     console.log('x-swim-step-chart state', state);
            //     data.push({
            //         timestamp: state.body[0]['@update'][0].key,
            //         value: state.body[1]
            //     });
            //
            // }

        }
    },
    inserted: function () {

        var _self = this;
        _self.dates = [];
        _self.connectivity = ['Connectivity'];
        _self.connectivityBar = ['Connectivity_bar'];

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

        setTimeout(function () {
            console.log('array', array);
        }.bind(this), 2000);

    },
    methods: {

    }

});