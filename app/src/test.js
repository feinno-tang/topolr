/**
 * @packet test;
 * @template template.temp;
 * @style style.qq;
 * @require service.test;
 */
Module({
    name:"test",
    extend:"view",
    className:"mt-test",
    template:"@temp.test",
    style:"@qq",
    autodom:true,
    services:{"test":"@test.testservice"},
    init:function () {
        this.excuteService("test.set",{name:"aa"});
    },
    bind_add:function (dom) {
        this.excuteService("test.set",{name:this.excuteService("test.get").name+1});
    },
    bind_data:function (dom) {
        this.excuteService("test.set",{name:dom.val()});
    }
});