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
            _self.generateList(sorted, false, 'Orbcomm');
        }, 1000);

        $('.keyboard-backspace', _self).on('click', function (e) {
            $('.keyboard-backspace', _self).addClass('hidden');
            $('.dashboard', _self).removeClass('hidden');
            $('#allZones').removeClass('hidden');
            $('#singleZone').addClass('hidden');
            $('#singleReader').addClass('hidden');
            _self.generateList(_self.items, false, 'Orbcomm');
        });

        //TODO: TEMP WORK AROUND: Replace with jquery selector pattern pattern
        $(_self).on('click', function (e) {

            if (e.target.attributes['url']) {

                var url = e.target.attributes['url'].value;
                var location = e.target.attributes['location'].value;

                if (url === 'child') {

                    console.log('child zone', location);

                    $('#singleReader').removeClass('hidden');
                    $('#singleZone').addClass('hidden');

                } else {

                    // TODO: Flavio - Ask Derek how he wants this done.
                    // Dispatcher.dispatch(actions.SET_IT_DATA, url);
                    this.getChildren(url, location);

                    setTimeout(function () {
                        $('.dashboard', this).addClass('hidden');
                        $('.keyboard-backspace', this).removeClass('hidden');
                    }.bind(this), 1000);

                }

            }

        });

    },
    methods: {
        generateList: function (items, children, title) {

            $('.title', this).html(title);

            var icon = 'dns';
            if (children) {
                icon = 'settings_remote';
            }

            $('.location-list', this).html('');

            for (var i = 0; i < items.length; i++) {

                $('.location-list', this).append('       ' +
                    '       <div class="location pointer location-btn" location="' + items[i].location + '" url="' + items[i].url + '">  ' +
                    '         <div class="location-wrapper no-pointer">  ' +
                    '           <button class="no-pointer list-btn mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored fl">  ' +
                    '             <i class="material-icons no-pointer">' + icon + '</i>  ' +
                    '           </button>  ' +
                    '           <div class="title fl pl12 black no-pointer">' + items[i].location + '</div>  ' +
                    '           <i class="material-icons black fr mt12 no-pointer">keyboard_arrow_right</i>  ' +
                    '         </div>  ' +
                    '      </div>  ')

            }

        },
        getChildren: function (url, title) {

            $('#allZones').addClass('hidden');
            $('#singleZone').removeClass('hidden');

            var children = [];

            Swim.downlink()
                .host('ws://sensornet.swim.services:80/?token=abcd')
                .node(url)
                .lane('readers')
                .onEvent(function (message) {

                    var reader = message.body[0]['@update'].key;
                    children.push({
                        location: reader,
                        url: 'child'
                    });
                    console.log(url + reader);

                })
                .sync();


            setTimeout(function () {
                this.generateList(children, true, title);
            }.bind(this), 1000);


        }
    }

});