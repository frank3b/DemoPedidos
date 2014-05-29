/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ProgressIndicator.
jQuery.sap.declare("sap.m.ProgressIndicator");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");

/**
 * Constructor for a new ProgressIndicator.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getEnabled enabled} : boolean (default: true)</li>
 * <li>{@link #getBarColor barColor} : sap.ui.core.BarColor (default: sap.ui.core.BarColor.NEUTRAL)</li>
 * <li>{@link #getDisplayValue displayValue} : string (default: '0%')</li>
 * <li>{@link #getPercentValue percentValue} : float (default: 0)</li>
 * <li>{@link #getShowValue showValue} : boolean (default: true)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Shows the progress of a process in a graphical way. To indicate the progress, the inside of the ProgressIndicator is filled with a color.
 * Additionally, a user defined string can be displayed on the ProgressIndicator.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.15.0-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.13.1
 * @name sap.m.ProgressIndicator
 */
sap.ui.core.Control.extend("sap.m.ProgressIndicator", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"visible" : {type : "boolean", group : "Behavior", defaultValue : true},
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"barColor" : {type : "sap.ui.core.BarColor", group : "Appearance", defaultValue : sap.ui.core.BarColor.NEUTRAL},
		"displayValue" : {type : "string", group : "Appearance", defaultValue : '0%'},
		"percentValue" : {type : "float", group : "Data", defaultValue : 0},
		"showValue" : {type : "boolean", group : "Appearance", defaultValue : true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'}
	}
}});


/**
 * Creates a new subclass of class sap.m.ProgressIndicator with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.m.ProgressIndicator.extend
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Invisible controls are not rendered
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.ProgressIndicator#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setVisible
 * @function
 */


/**
 * Getter for property <code>enabled</code>.
 * Switches enabled state of the control. Disabled fields have different colors, and can not be focused.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.m.ProgressIndicator#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setEnabled
 * @function
 */


/**
 * Getter for property <code>barColor</code>.
 * The color of the bar. Enumeration sap.ui.core.BarColor provides CRITICAL (yellow), NEGATIVE (red), POSITIVE (green), NEUTRAL (blue) (default value).
 *
 * Default value is <code>NEUTRAL</code>
 *
 * @return {sap.ui.core.BarColor} the value of property <code>barColor</code>
 * @public
 * @name sap.m.ProgressIndicator#getBarColor
 * @function
 */

/**
 * Setter for property <code>barColor</code>.
 *
 * Default value is <code>NEUTRAL</code> 
 *
 * @param {sap.ui.core.BarColor} oBarColor  new value for property <code>barColor</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setBarColor
 * @function
 */


/**
 * Getter for property <code>displayValue</code>.
 * The text value to be displayed in the bar.
 *
 * Default value is <code>0%</code>
 *
 * @return {string} the value of property <code>displayValue</code>
 * @public
 * @name sap.m.ProgressIndicator#getDisplayValue
 * @function
 */

/**
 * Setter for property <code>displayValue</code>.
 *
 * Default value is <code>0%</code> 
 *
 * @param {string} sDisplayValue  new value for property <code>displayValue</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setDisplayValue
 * @function
 */


/**
 * Getter for property <code>percentValue</code>.
 * The numerical value for the displayed length of the progress bar.
 *
 * Default value is <code>0</code>
 *
 * @return {float} the value of property <code>percentValue</code>
 * @public
 * @name sap.m.ProgressIndicator#getPercentValue
 * @function
 */

/**
 * Setter for property <code>percentValue</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {float} fPercentValue  new value for property <code>percentValue</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setPercentValue
 * @function
 */


/**
 * Getter for property <code>showValue</code>.
 * Specifies whether the current value shall be rendered inside the bar.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showValue</code>
 * @public
 * @name sap.m.ProgressIndicator#getShowValue
 * @function
 */

/**
 * Setter for property <code>showValue</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowValue  new value for property <code>showValue</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setShowValue
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * The width of the control.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.ProgressIndicator#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.ProgressIndicator} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ProgressIndicator#setWidth
 * @function
 */


// Start of sap\m\ProgressIndicator.js
///**
// * This file defines behavior for the control,
// */
//sap.m.ProgressIndicator.prototype.init = function(){
//   // do something for initialization...
//};

sap.m.ProgressIndicator.prototype.setPercentValue = function(fPercentValue) {

	var that = this;

	// validation of fPercentValue
	if (typeof (fPercentValue) == "number") {
		if (!((fPercentValue >= 0) && (fPercentValue <= 100))) {
			jQuery.sap.log.error(this + ": percentValue (" + fPercentValue + ") is not correct! It has to be between 0-100.");
			return this;
		}
	}

	if (that.getPercentValue() != fPercentValue) {
		// animation without rerendering
		this.$().addClass("sapMPIAnimate");
		this.setProperty("percentValue", fPercentValue, true);
		var $Bar = jQuery.sap.byId(this.getId() + "-bar");
		$Bar.animate({
			width : fPercentValue + "%"
		}, 600, "linear", function() {
			that._setText.apply(that);
			that.$().removeClass("sapMPIAnimate");
		});
	}

	return this;
};

sap.m.ProgressIndicator.prototype._setText = function() {

	this.$().toggleClass("sapMPIValueGreaterHalf", this.getPercentValue() > 50);

	return this;
};

sap.m.ProgressIndicator.prototype.setDisplayValue = function(sDisplayValue) {

	// change of value without rerendering
	this.setProperty("displayValue", sDisplayValue, true);
	var $textLeft = jQuery.sap.byId(this.getId() + "-textLeft");
	var $textRight = jQuery.sap.byId(this.getId() + "-textRight");
	$textLeft.text(sDisplayValue);
	$textRight.text(sDisplayValue);

	return this;
};