(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/feedback/feedback"],{"3d73":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"53a7":function(t,e,n){"use strict";var a=n("b870"),o=n.n(a);o.a},7425:function(t,e,n){"use strict";(function(t,a){function o(t){return u(t)||c(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return n.e("components/common/tabbar/tabbar").then(n.bind(null,"a720"))},s=function(){return n.e("components/common/upload-img/upload-img").then(n.bind(null,"c258"))},f={components:{Tabbar:r,UploadImg:s},data:function(){return{tabbar:["体验问题","商品、商家投诉"],image:[],text:"",fbChoice:[{id:0,content:"功能建议",isActive:!1},{id:1,content:"购买遇到问题",isActive:!1},{id:2,content:"性能问题",isActive:!1},{id:3,content:"其他",isActive:!1}],uploadedImgs:[]}},methods:{fbChoose:function(t){this.fbChoice[t].isActive=!this.fbChoice[t].isActive},textInput:function(e){var n=e.detail.value;n.trim()?this.text=n:t.showToast({title:"请输入有效内容",mask:!0,icon:"none"})},chooseImg:function(){var e=this;t.chooseImage({success:function(t){var n=t.tempFilePaths;e.image=[].concat(o(e.image),o(n))}})},removeClick:function(t){this.image.splice(t,1)},submit:function(){var e=this,n=[];this.fbChoice.filter(function(t){return t.isActive}).forEach(function(t){n.push(t.content)});var o=this.text,i=this.image;n?o.trim()?(i?(console.log(a("都选了,问题的种类和问题描述已提交"," at pages\\feedback\\feedback.vue:119")),t.showLoading({title:"正在上传中",mask:!0}),i.forEach(function(n,o){console.log(a(n," at pages\\feedback\\feedback.vue:127")),t.uploadFile({url:"http://img.coolcr.cn/api/upload",filePath:n,name:"image",success:function(t){var n=JSON.parse(t.data).data.url;e.uploadedImgs.push(n),console.log(a(e.uploadedImgs," at pages\\feedback\\feedback.vue:135"))}})})):(t.showLoading({title:"正在上传中",mask:!0}),console.log(a("没选图片但可以提交"," at pages\\feedback\\feedback.vue:116"))),t.hideLoading(),t.navigateBack({delta:1})):t.showToast({title:"请描述问题",mask:!0,icon:"none"}):t.showToast({title:"请选择问题的种类",mask:!0,icon:"none"})}}};e.default=f}).call(this,n("6e42")["default"],n("0de9")["default"])},"78d4":function(t,e,n){"use strict";n.r(e);var a=n("3d73"),o=n("b704");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("53a7");var c=n("2877"),u=Object(c["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},b704:function(t,e,n){"use strict";n.r(e);var a=n("7425"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},b870:function(t,e,n){},f7d2:function(t,e,n){"use strict";(function(t){n("1a38"),n("921b");a(n("66fd"));var e=a(n("78d4"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["f7d2","common/runtime","common/vendor"]]]);