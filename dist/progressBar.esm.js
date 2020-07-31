var t=function(){return(t=Object.assign||function(t){for(var i,n=1,a=arguments.length;n<a;n++)for(var e in i=arguments[n])Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t}).apply(this,arguments)},i=function(){function i(i,n,a){var e=this;this.target=i,this.endVal=n,this.options=a,this.version="2.0.4",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){e.startTime||(e.startTime=t);var i=t-e.startTime;e.remaining=e.duration-i,e.useEasing?e.countDown?e.frameVal=e.startVal-e.easingFn(i,0,e.startVal-e.endVal,e.duration):e.frameVal=e.easingFn(i,e.startVal,e.endVal-e.startVal,e.duration):e.countDown?e.frameVal=e.startVal-(e.startVal-e.endVal)*(i/e.duration):e.frameVal=e.startVal+(e.endVal-e.startVal)*(i/e.duration),e.countDown?e.frameVal=e.frameVal<e.endVal?e.endVal:e.frameVal:e.frameVal=e.frameVal>e.endVal?e.endVal:e.frameVal,e.frameVal=Math.round(e.frameVal*e.decimalMult)/e.decimalMult,e.printValue(e.frameVal),i<e.duration?e.rAF=requestAnimationFrame(e.count):null!==e.finalEndVal?e.update(e.finalEndVal):e.callback&&e.callback()},this.formatNumber=function(t){var i,n,a,s,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(e.options.decimalPlaces),a=(n=(i+="").split("."))[0],s=n.length>1?e.options.decimal+n[1]:"",e.options.useGrouping){r="";for(var l=0,u=a.length;l<u;++l)0!==l&&l%3==0&&(r=e.options.separator+r),r=a[u-l-1]+r;a=r}return e.options.numerals&&e.options.numerals.length&&(a=a.replace(/[0-9]/g,(function(t){return e.options.numerals[+t]})),s=s.replace(/[0-9]/g,(function(t){return e.options.numerals[+t]}))),o+e.options.prefix+a+s+e.options.suffix},this.easeOutExpo=function(t,i,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+i},this.options=t({},this.defaults,a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.decimalMult=Math.pow(10,this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof i?document.getElementById(i):i,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}return i.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},i.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},i.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},i.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},i.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},i.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i},i.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},i.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},i.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},i}();var n=function(t,i,n,a,e,s,r,o,l,u){"boolean"!=typeof r&&(l=o,o=r,r=!1);var h,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,e&&(d.functional=!0)),a&&(d._scopeId=a),s?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,l(t)),t&&t._registeredComponents&&t._registeredComponents.add(s)},d._ssrRegister=h):i&&(h=r?function(){i.call(this,u(this.$root.$options.shadowRoot))}:function(t){i.call(this,o(t))}),h)if(d.functional){var c=d.render;d.render=function(t,i){return h.call(i),c(t,i)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,h):[h]}return n};const a={name:"progressBar",props:{percent:{type:[String,Number],required:!0,default:function(){return"0"}},tintColor:{type:String,default:function(){return"rgb(0, 130, 251)"}},bgColor:{type:String,default:function(){return"rgba(0, 138, 251, 0.102)"}}},data:function(){return{val:"0",cu:void 0,id:void 0}},mounted:function(){this.in()},methods:{in:function(){this.id=this.ha(),this.ca(this.percent)},ha:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7;return(16777215*Math.random()<<t).toString(16)},ca:function(t){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;setTimeout((function(){n.cu=new i(n.id,t,{startVal:a,suffix:"%",duration:.25}),n.se(t<=0?.001:t>100?100:t)}),500)},se:function(t){this.cu.error?console.error(this.cu.error):this.cu.start(),this.val=t}},watch:{percent:function(t,i){this.se(0),this.ca(t,i)}}};var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"pb-main"},[n("div",{staticClass:"bar",style:{background:t.bgColor}},[n("div",{staticClass:"current",style:{width:t.val+"%",background:t.tintColor}})]),t._v(" "),n("div",{staticClass:"percent",style:{color:t.val>0?t.tintColor:""},attrs:{id:t.id}},[t._t("percent",[t._v("\n    "+t._s(t.percent||0)+"%\n    ")],{percent:t.percent})],2)])};e._withStripped=!0;var s=n({render:e,staticRenderFns:[]},void 0,a,"data-v-4a75ad4f",!1,void 0,void 0,void 0),r=[s],o=function(t){r.forEach((function(i){t.component(i.name,i)}))};"undefined"!=typeof window&&window.Vue&&o(window.Vue);export default o;export{s as ProgressBar};
