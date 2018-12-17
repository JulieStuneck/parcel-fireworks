parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Sr7R":[function(require,module,exports) {

},{}],"UdCc":[function(require,module,exports) {
var define;
var t;!function(i,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof t&&t.amd?t("Fireworks",s):i.Fireworks=s()}(this,function(){"use strict";function t(t,i){return Math.random()*(i-t)+t}var i=2*Math.PI,s=function(){function s(s){var e=s.isRocket,o=void 0!==e&&e,n=s.hue,h=void 0===n?t(1,360):n,r=s.brightness,a=void 0===r?t(50,60):r,c=s.position;if(this.isRocket=o,this.position=c,this.positions=[this.position,this.position,this.position],this.isRocket)this.velocity={x:t(-3,3),y:t(-7,-3)},this.shrink=.999,this.resistance=1;else{var p=t(0,i),l=15*Math.cos(t(0,i));this.velocity={x:Math.cos(p)*l,y:Math.sin(p)*l},this.shrink=t(0,.05)+.93,this.resistance=.92}this.gravity=.01,this.size=3,this.alpha=1,this.fade=0,this.hue=h,this.brightness=a}return s.prototype.clone=function(){return new s({position:{x:this.position.x,y:this.position.y},hue:this.hue,brightness:this.brightness})},s.prototype.shouldRemove=function(t,i){return this.alpha<=.1||this.size<=1||this.position.x>t||this.position.x<0||this.position.y>i||this.position.y<0},s.prototype.shouldExplode=function(i,s,e){return!!this.isRocket&&(this.position.y<=i||!(this.position.y>=s)&&t(0,1)<=e)},s.prototype.update=function(){this.positions.pop(),this.positions.unshift({x:this.position.x,y:this.position.y}),this.velocity.x*=this.resistance,this.velocity.y*=this.resistance,this.velocity.y+=this.gravity,this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.size*=this.shrink,this.alpha-=this.fade},s.prototype.draw=function(t){var i=this.positions[this.positions.length-1];t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(this.position.x,this.position.y),t.lineWidth=this.size,t.strokeStyle="hsla("+this.hue+", 100%, "+this.brightness+"%, "+this.alpha+")",t.stroke()},s}(),e=function(){function i(t){var i=t.maxRockets,s=t.numParticles,e=t.cw,o=t.ch;this._set=new Set,this.rockets=0,this.maxRockets=i,this.numParticles=s,this.cw=e,this.ch=o}return i.prototype.size=function(){return this._set.size},i.prototype.entries=function(){return this._set},i.prototype.clear=function(){this._set.clear()},i.prototype.delete=function(t){this._set.delete(t)},i.prototype.add=function(t){this._set.add(t)},i.prototype.explode=function(t){this.rockets--;for(var i=0;i<this.numParticles;i+=1)this.add(t.clone());this.delete(t)},i.prototype.spawnRocket=function(){this.rockets++,this.add(new s({isRocket:!0,position:{x:t(0,this.cw),y:this.ch}}))},i.prototype.spawnRockets=function(){this.rockets<this.maxRockets&&this.spawnRocket()},i}();return function(){function t(t,i){var s=void 0===i?{}:i,o=s.rocketSpawnInterval,n=void 0===o?150:o,h=s.maxRockets,r=void 0===h?3:h,a=s.numParticles,c=void 0===a?100:a,p=s.explosionMinHeight,l=void 0===p?.2:p,u=s.explosionMaxHeight,d=void 0===u?.9:u,v=s.explosionChance,f=void 0===v?.08:v;this.rocketSpawnInterval=n,this.maxRockets=r,this.cw=t.clientWidth,this.ch=t.clientHeight,this.max_h=this.ch*(1-d),this.min_h=this.ch*(1-l),this.chance=f,this.canvas=document.createElement("canvas"),this.canvas.width=this.cw,this.canvas.height=this.ch,this.ctx=this.canvas.getContext("2d"),t.appendChild(this.canvas),this.things=new e({maxRockets:this.maxRockets,numParticles:c,cw:this.cw,ch:this.ch})}return t.prototype.destroy=function(){this.canvas.parentElement.removeChild(this.canvas),window.clearInterval(this.interval),window.cancelAnimationFrame(this.rafInterval)},t.prototype.start=function(){var t=this;return this.maxRockets>0&&(this.interval=window.setInterval(function(){return t.things.spawnRockets()},this.rocketSpawnInterval),this.rafInterval=window.requestAnimationFrame(function(){return t.update()})),function(){return t.stop()}},t.prototype.stop=function(){window.clearInterval(this.interval),this.interval=null},t.prototype.kill=function(){this.things.clear(),this.stop(),window.cancelAnimationFrame(this.rafInterval),this.rafInterval=null,this._clear(!0)},t.prototype.fire=function(){var t=this;this.things.spawnRocket(),this.rafInterval||(this.rafInterval=window.requestAnimationFrame(function(){return t.update()}))},t.prototype._clear=function(t){void 0===t&&(t=!1),this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle="rgba(0, 0, 0 "+(t?"":", 0.5")+")",this.ctx.fillRect(0,0,this.cw,this.ch),this.ctx.globalCompositeOperation="lighter"},t.prototype.update=function(){var t,i,s=this;this._clear();try{for(var e=function(t){var i="function"==typeof Symbol&&t[Symbol.iterator],s=0;return i?i.call(t):{next:function(){return t&&s>=t.length&&(t=void 0),{value:t&&t[s++],done:!t}}}}(this.things.entries()),o=e.next();!o.done;o=e.next()){var n=o.value;n.draw(this.ctx),n.update(),n.shouldRemove(this.cw,this.ch)?this.things.delete(n):n.shouldExplode(this.max_h,this.min_h,this.chance)&&this.things.explode(n)}}catch(i){t={error:i}}finally{try{o&&!o.done&&(i=e.return)&&i.call(e)}finally{if(t)throw t.error}}this.interval||this.things.size()>0?this.rafInterval=window.requestAnimationFrame(function(){return s.update()}):(this._clear(!0),this.rafInterval=null)},t}()});
},{}],"epB2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("./main.css");var e=t(require("fireworks-canvas"));function t(e){return e&&e.__esModule?e:{default:e}}var r=function(){var t=document.getElementById("container");new e.default(t).start()};exports.default=r;
},{"./main.css":"Sr7R","fireworks-canvas":"UdCc"}],"Focm":[function(require,module,exports) {
"use strict";var e=u(require("./main"));function u(e){return e&&e.__esModule?e:{default:e}}(0,e.default)();
},{"./main":"epB2"}]},{},["Focm"], null)
//# sourceMappingURL=src.2215e316.map