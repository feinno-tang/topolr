/**
 * @packet test;
 * @template template.temp;
 * @style style.qq;
 * @require service.test;
 * @require action;
 */
Module({
    name: "test",
    extend: "view",
    className: "mt-test",
    template: "@temp.test",
    style: "@qq",
    autodom: true,
    services: {"test": "@test.testservice"},
    init: function () {
        this.excuteService("test.set", {name: "aa"});
    },
    bind_add: function (dom) {
        this.excuteService("test.name", this.excuteService("test.get").name + 1);
        this.excuteService("test.add", this.excuteService("test.get").name + 1)
    },
    bind_data: function (dom) {
        this.excuteService("test.name", dom.val());
    }
});
Module({
    name: "test2",
    extend: "view",
    className: "mt-test",
    template: "@temp.test2",
    style: "@qq",
    autodom: true,
    services: {"test": "@test.testservice"},
    init: function () {
        this.data=[
            {name:"aa1",id:"aa1"},
            {name:"aa2",id:"aa2"},
            {name:"aa3",id:"aa3"},
            {name:"aa4",id:"aa4"},
            {name:"aa5",id:"aa5"}
        ];
        this.render(this.data);
    },
    bind_item: function (dom) {
        var index=this.data.indexOf(dom.cache());
        if(index!==-1){
            this.data[index] = this.data.splice(index+1, 1, this.data[index])[0];
        }
        // this.data.reverse();
        this.update(this.data);
    }
});
Module({
    name:"aa",
    extend:"view",
    autodom:true,
    template:"<div>{{data.desc}}</div>",
    option:{
        desc:"aaaa"
    },
    init:function(){
        this.render(this.option);
    }
});
Module({
    name:"bb",
    extend:"viewgroup",
    autodom:true,
    layout:"<div data-bind='click:change'>"+
            "{{if data.check}}"+
            "<div>sdsdsd</div>"+
            "{{/if}}"+
            "<@module type='{{data.type}}'/>"+
            "</div>",
    option:{
        type:"@.aa",
        check:true
    },
    bind_change:function () {
        this.option.check=this.option.check?false:true;
        this.update(this.option);
    }
});