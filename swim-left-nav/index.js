require('./style.less');

tag('x-swim-left-nav', {
    template: require('./template.html'),
    inserted: function () {

        var _self = this;
        _self.items = [];

        Swim.downlink()
            .host('ws://sensornet.swim.services:80/?token=abcd')
            .node('org/NewOrg')
            .lane('pzs')
            .onEvent(function (message) {

                _self.items.push({
                    location: message.body[0]['@update'].key,
                    url: message.body[1]
                });

            })
            .sync();

        setTimeout(function () {
            var sorted = _.sortBy(_self.items, function (obj) {
                return obj.location;
            });
            _self.generateList(sorted);
        }, 2000);

        $('.keyboard-backspace', _self).on('click', function (e) {
            console.log('e', e);
            $('.keyboard-backspace', _self).addClass('hidden');
            $('.dashboard', _self).removeClass('hidden');
            _self.generateList(_self.items);
        });

        //TODO: TEMP WORK AROUND: Replace with jquery selector pattern pattern
        $(_self).on('click', function (e) {

            if (e.target.attributes['url']) {

                $('.dashboard', _self).addClass('hidden');
                $('.keyboard-backspace', _self).removeClass('hidden');


                this.generateList(_self.items);

                var url = e.target.attributes['url'].value;
                var location = e.target.attributes['location'].value;


                var items = [{
                    location: location,
                    url: url
                }];
                _self.generateList(items);

            }

        });

    },
    methods: {
        generateList: function (items) {

            $('.location-list', this).html('');

            for (var i = 0; i < items.length; i++) {

                $('.location-list', this).append('       ' +
                    '       <div class="location pointer location-btn" location="' + items[i].location + '" url="' + items[i].url + '">  ' +
                    '         <div class="location-wrapper no-pointer">  ' +
                    '           <button class="no-pointer list-btn mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored fl">  ' +
                    '             <i class="material-icons no-pointer">dns</i>  ' +
                    '           </button>  ' +
                    '           <div class="title fl pl12 black no-pointer">' + items[i].location + '</div>  ' +
                    '           <i class="material-icons black fr mt12 no-pointer">keyboard_arrow_right</i>  ' +
                    '         </div>  ' +
                    '      </div>  ')

            }

        }
    }

});