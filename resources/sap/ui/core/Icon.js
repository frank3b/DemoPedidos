/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','./Control','./IconPool'],function(){"use strict";sap.ui.core.Control.extend("sap.ui.core.Icon",{metadata:{library:"sap.ui.core",properties:{"src":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"size":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"color":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"hoverColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"activeColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"backgroundColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"hoverBackgroundColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"activeBackgroundColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"decorative":{type:"boolean",group:"Accessibility",defaultValue:true}},events:{"press":{}}}});sap.ui.core.Icon.M_EVENTS={'press':'press'};sap.ui.core.Icon.prototype.onAfterRendering=function(){var $=this.$();if(sap.ui.Device.browser.chrome&&this.hasListeners("press")){$.css("cursor","pointer")}if($.css("cursor")==="auto"){$.css("cursor","default")}};sap.ui.core.Icon.prototype.onmousedown=function(e){this._bPressFired=false;if(e.srcControl.mEventRegistry["press"]||e.srcControl.mEventRegistry["tap"]){e.setMarked()}var a=this.getActiveColor(),A=this.getActiveBackgroundColor(),$;if(a||A){if(!e.targetTouches||(e.targetTouches&&e.targetTouches.length===1)){$=this.$();$.addClass("sapUiIconActive");if(a){$.css("color",a)}if(A){$.css("background-color",A)}}}};sap.ui.core.Icon.prototype.ontouchstart=sap.ui.core.Icon.prototype.onmousedown;sap.ui.core.Icon.prototype.onmouseup=function(e){if(!e.targetTouches||(e.targetTouches&&e.targetTouches.length===0)){this.$().removeClass("sapUiIconActive");this._restoreColors()}};sap.ui.core.Icon.prototype.ontouchend=sap.ui.core.Icon.prototype.onmouseup;sap.ui.core.Icon.prototype.ontouchcancel=sap.ui.core.Icon.prototype.onmouseup;sap.ui.core.Icon.prototype.onmouseover=function(){var h=this.getHoverColor(),H=this.getHoverBackgroundColor(),$=this.$();if(h){$.css("color",h)}if(H){$.css("background-color",H)}};sap.ui.core.Icon.prototype.onmouseout=function(){this._restoreColors()};sap.ui.core.Icon.prototype.onclick=function(){if(this._bPressFired){return}this.firePress({});this._bPressFired=true};sap.ui.core.Icon.prototype.ontap=sap.ui.core.Icon.prototype.onclick;sap.ui.core.Icon.prototype.onkeydown=function(e){if(e.which===jQuery.sap.KeyCodes.SPACE||e.which===jQuery.sap.KeyCodes.ENTER){e.preventDefault();var $=this.$(),a=this.getActiveColor(),A=this.getActiveBackgroundColor();$.addClass("sapUiIconActive");if(a){$.css("color",a)}if(A){$.css("background-color",A)}}};sap.ui.core.Icon.prototype.onkeyup=function(e){if(e.which===jQuery.sap.KeyCodes.SPACE||e.which===jQuery.sap.KeyCodes.ENTER){this.$().removeClass("sapUiIconActive");this._restoreColors();this.firePress({})}};sap.ui.core.Icon.prototype._restoreColors=function(){this.$().css({"color":this.getColor()||"","background-color":this.getBackgroundColor()||""})};sap.ui.core.Icon.prototype.setSrc=function(s){var i=sap.ui.core.IconPool.getIconInfo(s),t=(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<9),$=this.$();if(i){$.css("font-family",i.fontFamily);if(t){$.text(i.content)}else{$.attr("data-sap-ui-icon-content",i.content)}$.toggleClass("sapUiIconMirrorInRTL",!i.suppressMirroring)}this.setProperty("src",s,!!i);return this};sap.ui.core.Icon.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",w);return this};sap.ui.core.Icon.prototype.setHeight=function(h){this.setProperty("height",h,true);this.$().css({"height":h,"line-height":h});return this};sap.ui.core.Icon.prototype.setSize=function(s){this.setProperty("size",s,true);this.$().css("font-size",s);return this};sap.ui.core.Icon.prototype.setColor=function(c){this.setProperty("color",c,true);this.$().css("color",c);return this};sap.ui.core.Icon.prototype.setActiveColor=function(c){return this.setProperty("activeColor",c,true)};sap.ui.core.Icon.prototype.setHoverColor=function(c){return this.setProperty("hoverColor",c,true)};sap.ui.core.Icon.prototype.setBackgroundColor=function(c){this.setProperty("backgroundColor",c,true);this.$().css("background-color",c);return this};sap.ui.core.Icon.prototype.setActiveBackgroundColor=function(c){return this.setProperty("activeBackgroundColor",c,true)};sap.ui.core.Icon.prototype.setHoverBackgroundColor=function(c){return this.setProperty("hoverBackgroundColor",c,true)};return sap.ui.core.Icon},true);
