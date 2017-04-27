require('./style.less');

tag('x-swim-left-nav', {
    template: require('./template.html'),
    inserted: function () {
        var _self = this;
        var items = _self.getListItems();
        _self.generateList(items);

    },
    methods: {
        generateList: function (items) {


            for (var i = 0; i < items.length; i++) {

                $('.location-list', this).append( '       ' +
                    '       <div class="location pointer">  '  +
                    '         <div class="location-wrapper">  '  +
                    '           <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored fl">  '  +
                    '             <i class="material-icons">dns</i>  '  +
                    '           </button>  '  +
                    '           <div class="title fl pl12 black">' + items[i].name + '</div>  '  +
                    '           <i class="material-icons black fr mt12 pointer">keyboard_arrow_right</i>  '  +
                    '         </div>  '  +
                    '      </div>  ')

            }


        },
        getListItems: function () {
            return [{
                date: '2017-01-01',
                level: 0,
                name: 'LOC Alpha Centari',
                total: 100
            }, {
                date: '2017-01-01',
                level: 1,
                name: 'LOC 1',
                total: 101
            }, {
                date: '2017-01-01',
                level: 2,
                name: 'LOC 2',
                total: 102
            },


                {
                    date: '2017-01-02',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 200
                }, {
                    date: '2017-01-02',
                    level: 1,
                    name: 'LOC 1',
                    total: 201
                }, {
                    date: '2017-01-02',
                    level: 2,
                    name: 'LOC 2',
                    total: 202
                },


                {
                    date: '2017-01-03',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 300
                }, {
                    date: '2017-01-03',
                    level: 1,
                    name: 'LOC 1',
                    total: 301
                }, {
                    date: '2017-01-03',
                    level: 2,
                    name: 'LOC 2',
                    total: 302
                },


                {
                    date: '2017-01-04',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 400
                }, {
                    date: '2017-01-04',
                    level: 1,
                    name: 'LOC 1',
                    total: 401
                }, {
                    date: '2017-01-04',
                    level: 2,
                    name: 'LOC 2',
                    total: 402
                },


                {
                    date: '2017-01-05',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 500
                }, {
                    date: '2017-01-05',
                    level: 1,
                    name: 'LOC 1',
                    total: 501
                }, {
                    date: '2017-01-05',
                    level: 2,
                    name: 'LOC 2',
                    total: 502
                },


                {
                    date: '2017-01-06',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 600
                }, {
                    date: '2017-01-06',
                    level: 1,
                    name: 'LOC 1',
                    total: 601
                }, {
                    date: '2017-01-06',
                    level: 2,
                    name: 'LOC 2',
                    total: 602
                },


                {
                    date: '2017-01-07',
                    level: 0,
                    name: 'LOC Alpha Centari',
                    total: 700
                }, {
                    date: '2017-01-07',
                    level: 1,
                    name: 'LOC 1',
                    total: 701
                }, {
                    date: '2017-01-07',
                    level: 2,
                    name: 'LOC 2',
                    total: 702
                }]
        },


    }

});