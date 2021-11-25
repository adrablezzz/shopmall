(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/tabbar/tabbar"],{"5eef":function(t,n,e){},"64ed":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},a720:function(t,n,e){"use strict";e.r(n);var a=e("64ed"),r=e("dc36");for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);e("b55e");var c=e("2877"),o=Object(c["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n["default"]=o.exports},b55e:function(t,n,e){"use strict";var a=e("5eef"),r=e.n(a);r.a},dc36:function(t,n,e){"use strict";e.r(n);var a=e("e47a"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=r.a},e47a:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"Tabbar",data:function(){return{currentIndex:0}},props:{tabbar:{type:Array,default:function(){return["标题1","标题2","标题3","标题4"]}}},methods:{tabbarClick:function(t){this.currentIndex=t,this.$emit("tabbarClick",t)}}};n.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/tabbar/tabbar-create-component',
    {
        'components/common/tabbar/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("a720"))
        })
    },
    [['components/common/tabbar/tabbar-create-component']]
]);
