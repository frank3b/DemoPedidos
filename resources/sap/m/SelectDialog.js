/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.SelectDialog.
jQuery.sap.declare("sap.m.SelectDialog");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");

/**
 * Constructor for a new SelectDialog.
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
 * <li>{@link #getTitle title} : string</li>
 * <li>{@link #getNoDataText noDataText} : string</li>
 * <li>{@link #getFilterPath filterPath} : string</li>
 * <li>{@link #getFilterOperator filterOperator} : string</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.m.StandardListItem[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.SelectDialog#event:close close} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A SelectDialog provides you a easier way to create a dialog that contains a list with grouping and search functionality.
 * The list used in a SelectDialog is a growing list with StandardListItem. After selecting an item, the dialog will be closed and a callback function will return the item being selected.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.15.0-SNAPSHOT
 *
 * @constructor   
 * @public
 * @experimental Since version 1.15. 
 * API is not yet finished and might change completely
 * @name sap.m.SelectDialog
 */
sap.ui.core.Control.extend("sap.m.SelectDialog", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"open"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"title" : {type : "string", group : "Appearance", defaultValue : null},
		"noDataText" : {type : "string", group : "Misc", defaultValue : null},
		"filterPath" : {type : "string", group : "Misc", defaultValue : null},
		"filterOperator" : {type : "string", group : "Misc", defaultValue : null}
	},
	aggregations : {
    	"items" : {type : "sap.m.StandardListItem", multiple : true, singularName : "item"}
	},
	events : {
		"close" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.SelectDialog with name <code>sClassName</code> 
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
 * @name sap.m.SelectDialog.extend
 * @function
 */

sap.m.SelectDialog.M_EVENTS = {'close':'close'};


/**
 * Getter for property <code>title</code>.
 * Title text appears in the dialog header.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>title</code>
 * @public
 * @name sap.m.SelectDialog#getTitle
 * @function
 */

/**
 * Setter for property <code>title</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTitle  new value for property <code>title</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setTitle
 * @function
 */


/**
 * Getter for property <code>noDataText</code>.
 * This is the text shown, when the list has no data.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>noDataText</code>
 * @public
 * @name sap.m.SelectDialog#getNoDataText
 * @function
 */

/**
 * Setter for property <code>noDataText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sNoDataText  new value for property <code>noDataText</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setNoDataText
 * @function
 */


/**
 * Getter for property <code>filterPath</code>.
 * Filter path for the list.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>filterPath</code>
 * @public
 * @name sap.m.SelectDialog#getFilterPath
 * @function
 */

/**
 * Setter for property <code>filterPath</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sFilterPath  new value for property <code>filterPath</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setFilterPath
 * @function
 */


/**
 * Getter for property <code>filterOperator</code>.
 * Filter operator for the list.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>filterOperator</code>
 * @public
 * @name sap.m.SelectDialog#getFilterOperator
 * @function
 */

/**
 * Setter for property <code>filterOperator</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sFilterOperator  new value for property <code>filterOperator</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setFilterOperator
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * The items of the result list.
 * 
 * @return {sap.m.StandardListItem[]}
 * @public
 * @name sap.m.SelectDialog#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.StandardListItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.StandardListItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.StandardListItem} vItem the item to remove or its index or id
 * @return {sap.m.StandardListItem} the removed item or null
 * @public
 * @name sap.m.SelectDialog#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.StandardListItem[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.SelectDialog#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.StandardListItem</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.StandardListItem}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.SelectDialog#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#destroyItems
 * @function
 */


/**
 * this event will be fired when the dialog is closed. If something has been selected, the item being selected will be returned, else, null will be returned. 
 *
 * @name sap.m.SelectDialog#close
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.StandardListItem} oControlEvent.getParameters.selectedItem return selectedItem, when nothing is selected, null is returned.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'close' event of this <code>sap.m.SelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.SelectDialog</code>.<br/> itself. 
 *  
 * this event will be fired when the dialog is closed. If something has been selected, the item being selected will be returned, else, null will be returned. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.SelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#attachClose
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'close' event of this <code>sap.m.SelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#detachClose
 * @function
 */

/**
 * Fire event close to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.m.StandardListItem</code> return selectedItem, when nothing is selected, null is returned.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.SelectDialog#fireClose
 * @function
 */


/**
 * Open the dialog.
 *
 * @name sap.m.SelectDialog.prototype.open
 * @function

 * @type void
 * @public
 */


// Start of sap\m\SelectDialog.js
/*!
 * @copyright@
 */

jQuery.sap.require("sap.m.Button");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.m.GrowingList");
jQuery.sap.require("sap.m.SearchField");

sap.m.SelectDialog.prototype.init = function(){
	
}

sap.m.SelectDialog.prototype.onBeforeRendering = function(){
	
}

sap.m.SelectDialog.prototype.onAfterRendering = function(){
	
}

sap.m.SelectDialog.prototype.exit = function(){
	
}