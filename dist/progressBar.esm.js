function normalizeComponent(t,i,n,e,a,s,r,o,l,u){"boolean"!=typeof r&&(l=o,o=r,r=!1);var h="function"==typeof n?n.options:n;t&&t.render&&(h.render=t.render,h.staticRenderFns=t.staticRenderFns,h._compiled=!0,a&&(h.functional=!0)),e&&(h._scopeId=e);var d;if(s?(d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,l(t)),t&&t._registeredComponents&&t._registeredComponents.add(s)},h._ssrRegister=d):i&&(d=r?function(){i.call(this,u(this.$root.$options.shadowRoot))}:function(t){i.call(this,o(t))}),d)if(h.functional){var c=h.render;h.render=function(t,i){return d.call(i),c(t,i)}}else{var p=h.beforeCreate;h.beforeCreate=p?[].concat(p,d):[d]}return n}var __assign=function(){return(__assign=Object.assign||function(t){for(var i,n=1,e=arguments.length;n<e;n++)for(var a in i=arguments[n])Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);return t}).apply(this,arguments)},CountUp=function(){function t(t,i,n){var e=this;this.target=t,this.endVal=i,this.options=n,this.version="2.0.4",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){e.startTime||(e.startTime=t);var i=t-e.startTime;e.remaining=e.duration-i,e.useEasing?e.countDown?e.frameVal=e.startVal-e.easingFn(i,0,e.startVal-e.endVal,e.duration):e.frameVal=e.easingFn(i,e.startVal,e.endVal-e.startVal,e.duration):e.countDown?e.frameVal=e.startVal-(e.startVal-e.endVal)*(i/e.duration):e.frameVal=e.startVal+(e.endVal-e.startVal)*(i/e.duration),e.countDown?e.frameVal=e.frameVal<e.endVal?e.endVal:e.frameVal:e.frameVal=e.frameVal>e.endVal?e.endVal:e.frameVal,e.frameVal=Math.round(e.frameVal*e.decimalMult)/e.decimalMult,e.printValue(e.frameVal),i<e.duration?e.rAF=requestAnimationFrame(e.count):null!==e.finalEndVal?e.update(e.finalEndVal):e.callback&&e.callback()},this.formatNumber=function(t){var i,n,a,s,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(e.options.decimalPlaces),a=(n=(i+="").split("."))[0],s=n.length>1?e.options.decimal+n[1]:"",e.options.useGrouping){r="";for(var l=0,u=a.length;l<u;++l)0!==l&&l%3==0&&(r=e.options.separator+r),r=a[u-l-1]+r;a=r}return e.options.numerals&&e.options.numerals.length&&(a=a.replace(/[0-9]/g,function(t){return e.options.numerals[+t]}),s=s.replace(/[0-9]/g,function(t){return e.options.numerals[+t]})),o+e.options.prefix+a+s+e.options.suffix},this.easeOutExpo=function(t,i,n,e){return n*(1-Math.pow(2,-10*t/e))*1024/1023+i},this.options=__assign({},this.defaults,n),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.decimalMult=Math.pow(10,this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t}(),script={name:"progressBar",props:{percent:{type:[String,Number],required:!0,default:function(){return"0"}}},data(){return{val:"0",cu:void 0,id:void 0}},mounted(){this.in()},methods:{in(){this.id=this.ha(),this.ca(this.percent)},ha(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7;return(16777215*Math.random()<<t).toString(16)},ca(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;setTimeout(function(){i.cu=new CountUp(i.id,t,{startVal:n,suffix:"%",duration:.25}),i.se(t<=0?.001:t>100?100:t)},500)},se(t){this.cu.error?console.error(this.cu.error):this.cu.start(),this.val=t}},watch:{percent(t,i){this.se(0),this.ca(t,i)}}},normalizeComponent_1=normalizeComponent;const __vue_script__=script;var __vue_render__=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"pb-main"},[n("div",{staticClass:"bar"},[n("div",{staticClass:"current",style:{width:t.val+"%"}})]),t._v(" "),n("div",{staticClass:"percent",style:{color:t.val>0?"rgb(0, 130, 251)":""},attrs:{id:t.id}},[t._t("percent",[t._v("\n    "+t._s(t.percent||0)+"%\n    ")],{percent:t.percent})],2)])},__vue_staticRenderFns__=[];__vue_render__._withStripped=!0;const __vue_inject_styles__=void 0,__vue_scope_id__="data-v-24564bbd",__vue_module_identifier__=void 0,__vue_is_functional_template__=!1;var bar=normalizeComponent_1({render:__vue_render__,staticRenderFns:__vue_staticRenderFns__},void 0,__vue_script__,__vue_scope_id__,!1,void 0,void 0,void 0),components=[bar],install=function(t){components.forEach(function(i){t.component(i.name,i)})};"undefined"!=typeof window&&window.Vue&&install(window.Vue);export default install;
