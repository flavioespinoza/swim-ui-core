require('./style.less');

tag('x-swim-left-nav', {
    template: require('./template.html'),
    inserted: function () {

        var _self = this;
        var items = [];

        Swim.downlink()
            .host('ws://sensornet.swim.services:80/?token=abcd')
            .node('org/NewOrg')
            .lane('pzs')
            .onEvent(function (message) {

                items.push({
                    location: message.body[0]['@update'].key,
                    url: message.body[1]
                });

            })
            .sync();



        setTimeout(function () {
            var sorted = _.sortBy(items, function (obj) {
                return obj.location;
            });
            _self.generateList(sorted);
        }, 2000);

        $('.location-btn', this).on('click', function (e) {
            console.log('e', e);
        });

    },
    methods: {
        generateList: function (items) {

            for (var i = 0; i < items.length; i++) {

                $('.location-list', this).append('       ' +
                    '       <div class="location pointer location-btn">  ' +
                    '         <div class="location-wrapper">  ' +
                    '           <button class="list-btn mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored fl">  ' +
                    '             <i class="material-icons">dns</i>  ' +
                    '           </button>  ' +
                    '           <div class="title fl pl12 black">' + items[i].location + '</div>  ' +
                    '           <i class="material-icons black fr mt12 pointer">keyboard_arrow_right</i>  ' +
                    '         </div>  ' +
                    '      </div>  ')

            }
        }
    }

});