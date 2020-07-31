!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t=t||self).progressBar={})}(this,(function(t){"use strict";var i=function(){return(i=Object.assign||function(t){for(var i,n=1,e=arguments.length;n<e;n++)for(var a in i=arguments[n])Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);return t}).apply(this,arguments)},n=function(){function t(t,n,e){var a=this;this.target=t,this.endVal=n,this.options=e,this.version="2.0.4",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){a.startTime||(a.startTime=t);var i=t-a.startTime;a.remaining=a.duration-i,a.useEasing?a.countDown?a.frameVal=a.startVal-a.easingFn(i,0,a.startVal-a.endVal,a.duration):a.frameVal=a.easingFn(i,a.startVal,a.endVal-a.startVal,a.duration):a.countDown?a.frameVal=a.startVal-(a.startVal-a.endVal)*(i/a.duration):a.frameVal=a.startVal+(a.endVal-a.startVal)*(i/a.duration),a.countDown?a.frameVal=a.frameVal<a.endVal?a.endVal:a.frameVal:a.frameVal=a.frameVal>a.endVal?a.endVal:a.frameVal,a.frameVal=Math.round(a.frameVal*a.decimalMult)/a.decimalMult,a.printValue(a.frameVal),i<a.duration?a.rAF=requestAnimationFrame(a.count):null!==a.finalEndVal?a.update(a.finalEndVal):a.callback&&a.callback()},this.formatNumber=function(t){var i,n,e,s,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(a.options.decimalPlaces),e=(n=(i+="").split("."))[0],s=n.length>1?a.options.decimal+n[1]:"",a.options.useGrouping){r="";for(var l=0,u=e.length;l<u;++l)0!==l&&l%3==0&&(r=a.options.separator+r),r=e[u-l-1]+r;e=r}return a.options.numerals&&a.options.numerals.length&&(e=e.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]})),s=s.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]}))),o+a.options.prefix+e+s+a.options.suffix},this.easeOutExpo=function(t,i,n,e){return n*(1-Math.pow(2,-10*t/e))*1024/1023+i},this.options=i({},this.defaults,e),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.decimalMult=Math.pow(10,this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t}();var e=function(t,i,n,e,a,s,r,o,l,u){"boolean"!=typeof r&&(l=o,o=r,r=!1);var h,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,a&&(d.functional=!0)),e&&(d._scopeId=e),s?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,l(t)),t&&t._registeredComponents&&t._registeredComponents.add(s)},d._ssrRegister=h):i&&(h=r?function(){i.call(this,u(this.$root.$options.shadowRoot))}:function(t){i.call(this,o(t))}),h)if(d.functional){var c=d.render;d.render=function(t,i){return h.call(i),c(t,i)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,h):[h]}return n};const a={name:"progressBar",props:{percent:{type:[String,Number],required:!0,default:function(){return"0"}},tintColor:{type:String,default:function(){return"rgb(0, 130, 251)"}},bgColor:{type:String,default:function(){return"rgba(0, 138, 251, 0.102)"}}},data:function(){return{val:"0",cu:void 0,id:void 0}},mounted:function(){this.in()},methods:{in:function(){this.id=this.ha(),this.ca(this.percent)},ha:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7;return(16777215*Math.random()<<t).toString(16)},ca:function(t){var i=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;setTimeout((function(){i.cu=new n(i.id,t,{startVal:e,suffix:"%",duration:.25}),i.se(t<=0?.001:t>100?100:t)}),500)},se:function(t){this.cu.error?console.error(this.cu.error):this.cu.start(),this.val=t}},watch:{percent:function(t,i){this.se(0),this.ca(t,i)}}};var s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"pb-main"},[n("div",{staticClass:"bar",style:{background:t.bgColor}},[n("div",{staticClass:"current",style:{width:t.val+"%",background:t.tintColor}})]),t._v(" "),n("div",{staticClass:"percent",style:{color:t.val>0?t.tintColor:""},attrs:{id:t.id}},[t._t("percent",[t._v("\n    "+t._s(t.percent||0)+"%\n    ")],{percent:t.percent})],2)])};s._withStripped=!0;var r=e({render:s,staticRenderFns:[]},void 0,a,"data-v-4a75ad4f",!1,void 0,void 0,void 0),o=[r],l=function(t){o.forEach((function(i){t.component(i.name,i)}))};"undefined"!=typeof window&&window.Vue&&l(window.Vue),t.ProgressBar=r,t.default=l,Object.defineProperty(t,"__esModule",{value:!0})}));
