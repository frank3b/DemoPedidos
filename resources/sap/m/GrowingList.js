/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.GrowingList.
jQuery.sap.declare("sap.m.GrowingList");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.List");

/**
 * Constructor for a new GrowingList.
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
 * <li>{@link #getThreshold threshold} : int (default: 20)</li>
 * <li>{@link #getTriggerText triggerText} : string</li>
 * <li>{@link #getScrollToLoad scrollToLoad} : boolean (default: false)</li></ul>
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
 * 
 * In addition, all settings applicable to the base type {@link sap.m.List#constructor sap.m.List}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * sap.m.GrowingList control is the container for all list items and inherits from sap.m.List control. Everything like the selection, deletion, unread states and inset style are also maintained here. In addition the control provides a loading mechanism to request data from the model and append the list items to the list. The request is started manually by tapping on the trigger at the end of the list.
 * @extends sap.m.List
 *
 * @author SAP AG 
 * @version 1.15.0-SNAPSHOT
 *
 * @constructor   
 * @public
 * @name sap.m.GrowingList
 */
sap.m.List.extend("sap.m.GrowingList", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"threshold" : {type : "int", group : "Misc", defaultValue : 20},
		"triggerText" : {type : "string", group : "Appearance", defaultValue : null},
		"scrollToLoad" : {type : "boolean", group : "Misc", defaultValue : false}
	}
}});


/**
 * Creates a new subclass of class sap.m.GrowingList with name <code>sClassName</code> 
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
 * @name sap.m.GrowingList.extend
 * @function
 */


/**
 * Getter for property <code>threshold</code>.
 * Number of list items requested from the server and added to the list.
 *
 * Default value is <code>20</code>
 *
 * @return {int} the value of property <code>threshold</code>
 * @public
 * @name sap.m.GrowingList#getThreshold
 * @function
 */

/**
 * Setter for property <code>threshold</code>.
 *
 * Default value is <code>20</code> 
 *
 * @param {int} iThreshold  new value for property <code>threshold</code>
 * @return {sap.m.GrowingList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.GrowingList#setThreshold
 * @function
 */


/**
 * Getter for property <code>triggerText</code>.
 * Text which is displayed on the trigger at the end of the list. The default is a translated text ("Load more data") coming from the messagebundle properties.
 * This property can be used only if scrollToLoad property is set false.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>triggerText</code>
 * @public
 * @name sap.m.GrowingList#getTriggerText
 * @function
 */

/**
 * Setter for property <code>triggerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTriggerText  new value for property <code>triggerText</code>
 * @return {sap.m.GrowingList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.GrowingList#setTriggerText
 * @function
 */


/**
 * Getter for property <code>scrollToLoad</code>.
 * If you set this property to true then user needs to scroll end to trigger loading a new page. Default value is false which means user needs to scroll end and then click button to load new page.
 * 
 * NOTE: This property can be set true, if you only have one instance of GrowingList inside the scroll container(e.g Page).
 * In
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>scrollToLoad</code>
 * @public
 * @since 1.11
 * @name sap.m.GrowingList#getScrollToLoad
 * @function
 */

/**
 * Setter for property <code>scrollToLoad</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bScrollToLoad  new value for property <code>scrollToLoad</code>
 * @return {sap.m.GrowingList} <code>this</code> to allow method chaining
 * @public
 * @since 1.11
 * @name sap.m.GrowingList#setScrollToLoad
 * @function
 */


// Start of sap\m\GrowingList.js


/**
 * Function is called to define the behavior for the control.
 */
sap.m.GrowingList.prototype.init = function() {
	if (sap.m.List.prototype.init) {
		sap.m.List.prototype.init.apply(this, arguments);
	}
	this._iRenderedDataItems = 0;
	this._trigger = null;
	this._loading = null;
	this._loadingByScroll = false;
	this._countChecked = false;
	this._iItemCount = 0;
	this._bBindingEvents = false;
	this._bExperimentalGrouping = false;
};

sap.m.GrowingList.prototype.onBeforeRendering = function() {
	if (sap.m.List.prototype.onBeforeRendering) {
		sap.m.List.prototype.onBeforeRendering.apply(this, arguments);
	}
	this._unbindDataEvents();
};

/**
 * Function is called after rendering the control.
 *
 * @private
 */
sap.m.GrowingList.prototype.onAfterRendering = function() {
	this._countChecked = false;
	if (sap.m.List.prototype.onAfterRendering) {
		sap.m.List.prototype.onAfterRendering.apply(this, arguments);
	}
	if (this.getScrollToLoad()) {
		var oScrollDelegate = sap.m.getScrollDelegate(this);
		if (oScrollDelegate) {
			this._oScrollDelegate = oScrollDelegate;
			oScrollDelegate.setGrowingList(this, this._triggerLoadingByScroll);
		}
	}
	
	this._bindDataEvents();	
	this._updateTrigger();
};


/**
 * Remove the callback from iScroll if user disable scroll to load
 */
sap.m.GrowingList.prototype.setScrollToLoad = function(bScrollToLoad) {
	if (this.getScrollToLoad() && !bScrollToLoad) {
		var oScrollDelegate = this._oScrollDelegate || sap.m.getScrollDelegate(this);
		if (oScrollDelegate) {
			oScrollDelegate.setGrowingList(null);
			delete this._oScrollDelegate;
		}
	}
	return this.setProperty("scrollToLoad", bScrollToLoad);
};


/**
 * Function is called when exiting the control.
 *
 * @private
*/
sap.m.GrowingList.prototype.exit = function() {
	if (sap.m.List.prototype.exit) {
		sap.m.List.prototype.exit.apply(this, arguments);
	}
	if (this._busyIndicator) {
		this._busyIndicator.destroy();
	}
	if (this._trigger) {
		this._trigger.destroy();
	}
	if (this._loading) {
		this._loading.destroy();
	}
	
	delete this._oScrollDelegate;
	this._unbindDataEvents();
};


/**
 * Function is called to create or return the trigger control.
 *
 * @private
 */
sap.m.GrowingList.prototype._getTrigger = function(sId) {
	var that = this;
	// set default text, check and set custom text
	var sTriggerText = sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LOAD_MORE_DATA");
	if (this.getTriggerText()) {
		sTriggerText = this.getTriggerText();
	}
	return this._trigger || (this._trigger = new sap.m.CustomListItem({
		id : sId,
		content : new sap.ui.core.HTML({
			content :	"<div class='sapMGrowingListTrigger'>" +
							"<div class='sapMGrowingListBusyIndicator' id='" + sId + "-busyIndicator'></div>" +
							"<div class='sapMSLITitleDiv sapMGrowingListTitel'>" +
								"<h1 class='sapMSLITitle'>" + jQuery.sap.encodeHTML(sTriggerText) + "</h1>" +
							"</div>" +
							"<div class='sapMGrowingListDescription'>" +
								"<div class='sapMSLIDescription' id='" + sId + "-itemInfo'>" + that._getListItemInfo() + "</div>" +
							"</div>" +
						"</div>",
			afterRendering : function(e) {
				var oBusyIndicator = that._getBusyIndicator();
				var rm = sap.ui.getCore().createRenderManager();
				rm.render(oBusyIndicator, this.getDomRef().firstChild);
				rm.destroy();
			}
		}),
		type : sap.m.ListType.Active
	}).setParent(this, null, true).attachPress(this._tap));
};


/**
 * Function is called to create or return the loading control.
 *
 * @private
 */
sap.m.GrowingList.prototype._getLoading = function(sId) {
	var that = this;
	return this._loading || (this._loading = new sap.m.CustomListItem({
		id : sId,
		content : new sap.ui.core.HTML({
			content :	"<div class='sapMSLIDiv sapMGrowingListLoading'>" +
							"<div class='sapMGrowingListBusyIndicator' id='" + sId + "-busyIndicator'></div>" +
						"</div>",
			afterRendering : function(e) {
				var oBusyIndicator = that._getBusyIndicator();
				var rm = sap.ui.getCore().createRenderManager();
				rm.render(oBusyIndicator, this.getDomRef().firstChild);
				rm.destroy();
			}
		})
	}).setParent(this, null, true));
};


/**
 * Function is called to create or return the busy indicator control.
 *
 * @private
*/
sap.m.GrowingList.prototype._getBusyIndicator = function() {
	return this._busyIndicator || (this._busyIndicator = new sap.m.BusyIndicator({
		size : "2.0em"
	}));
};

sap.m.GrowingList.prototype._bindDataEvents = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		oBinding.attachDataRequested(this._onDataRequested, this);
		oBinding.attachDataReceived(this._onDataReceived, this);
	}
};

sap.m.GrowingList.prototype._unbindDataEvents = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		oBinding.detachDataRequested(this._onDataRequested, this);
		oBinding.detachDataReceived(this._onDataReceived, this);
	}
};

sap.m.GrowingList.prototype._onDataRequested = function() {
	this._showIndicator();
};

sap.m.GrowingList.prototype._onDataReceived = function() {
	this._hideIndicator();
};


/**
 * Returns the information about the list items.
 * -> how many items are displayed
 * -> maximum items to be displayed
 *
 * @private
*/
sap.m.GrowingList.prototype._getListItemInfo = function() {
	return ("[ " + this._iRenderedDataItems + " / " + this._getListItemCount() + " ]");
};


/**
 * Calls the  method "_loadNewItems" of the list to append the loaded list items when trigger is tapped
 *
 * @private
*/
sap.m.GrowingList.prototype._tap = function(oEvent) {
	var that = this;
	
	// show busy indicator
	this.oParent._showIndicator();
	
	// load new items - add new rows
	window.setTimeout(function() {
		that.oParent._iItemCount += that.oParent.getThreshold();
		that.oParent.updateItems();
	}, 0);
};


/**
 * Function is called to add single list item to the existing list.
 *
 * @private
 */
sap.m.GrowingList.prototype.addListItem = function(oItem, bSuppressInvalidate) {
	if (!this._countChecked) {
		this._countChecked = true;
		if (this.getShowNoData()) {
			jQuery.sap.byId(this.getId() + "-listNoData").css("display", "none");
		}
	}
	oItem._mode = this.getMode();
	oItem._includeItemInSelection = this.getIncludeItemInSelection();
	oItem._select = this._select;
	oItem._delete = this._delete;
	oItem._listId = this.getId();
	oItem._showUnread = this.getShowUnread();
	this._iRenderedDataItems++;
	
	// Grouping support
	if (this._bExperimentalGrouping) {
		var oBinding = this.getBinding("items"),
			bGrouped = oBinding.isGrouped() && this.addItemGroup,
			oNewGroup = null,
			bNewGroup = false;
		
		if (bGrouped) {
			oNewGroup = this._getGroupForContext(oItem.getBindingContext());
			
			if (this.getItems().length == 0) {
				bNewGroup = true;
			} else{
				var aItems = this.getItems();
				if (oNewGroup.key !== this._getGroupForContext(aItems[aItems.length-1].getBindingContext()).key) {
					bNewGroup = true;
				}
			}
			
			if (bNewGroup) {
				var oGroupHeader;
				//If factory is defined use it
				var oBindingInfo = this.getBindingInfo("items");
				if (oBindingInfo.groupHeaderFactory) {
					oGroupHeader = oBindingInfo.groupHeaderFactory(oNewGroup);
				}
				this.addItemGroup(oNewGroup, oGroupHeader);
			}
		}
	}
	
	this.addAggregation("items", oItem, bSuppressInvalidate);
	
	if (this._bExperimentalGrouping && bSuppressInvalidate) {
		var oDomRef = jQuery.sap.domById( this.getId() + "-listUl");
		if (oDomRef) {
			var rm = sap.ui.getCore().createRenderManager();
			rm.renderControl(oItem);
			rm.flush(oDomRef, false, true);
			rm.destroy();
		}
	}
	
	return this;
};


sap.m.GrowingList.prototype.addItemGroup = function(oGroup, oHeader) {
	if (!oHeader) {
		oHeader = new sap.m.GroupHeaderListItem({ title:oGroup.text || oGroup.key }).addStyleClass("sapMListHdr");
	}
	this.addAggregation("items", oHeader, true);
	
	var oDomRef = jQuery.sap.domById( this.getId() + "-listUl");
	if (oDomRef) {
		var rm = sap.ui.getCore().createRenderManager();
		rm.renderControl(oHeader);
		rm.flush(oDomRef, false, true);
		rm.destroy();
	}
};


/**
 * Only call when grouped!!
 * 
 * @param oContext
 * @returns
 */
sap.m.GrowingList.prototype._getGroupForContext = function(oContext) {
	var oNewGroup = this.getBinding("items").aSorters[0].fnGroup(oContext);
	if (typeof oNewGroup == "string") {
		oNewGroup = {
			key: oNewGroup
		};
	}
	return oNewGroup;
};

/**
 * Function is called to insert single list item to the existing list.
 *
 * @private
 */
sap.m.GrowingList.prototype.insertListItem = function(oItem, iIndex) {
	if (!this._countChecked) {
		this._countChecked = true;
		if (this.getShowNoData()) {
			jQuery.sap.byId(this.getId() + "-listNoData").css("display", "none");
		}
	}
	oItem._mode = this.getMode();
	oItem._includeItemInSelection = this.getIncludeItemInSelection();
	oItem._select = this._select;
	oItem._delete = this._delete;
	oItem._listId = this.getId();
	oItem._showUnread = this.getShowUnread();
	this._iRenderedDataItems++;
	this.insertAggregation("items", oItem, iIndex, true);
	var rm = sap.ui.getCore().createRenderManager();
	var sListId = this.getId() + "-listUl";
	rm.renderControl(oItem);
	rm.flush(jQuery.sap.domById(sListId), false, iIndex);
	rm.destroy();
	return this;
};


/**
 * Function is called to remove single list item from the existing list.
 *
 * @private
 */
sap.m.GrowingList.prototype.deleteListItem = function(oItem) {
	this._iRenderedDataItems--;
	this.removeAggregation("items", oItem, true);
	oItem.destroy();
	return this;
};

/**
 * Returns the row count. If aggregation rows is bound the count will be the length of the binding,
 * otherwise the count of the list items aggregation will be returned
 *
 * @private
*/
sap.m.GrowingList.prototype._getListItemCount = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		return oBinding.getLength();
	} else {
		return this.getItems().length;
	}
};


/**
 * Update loaded items ... called from the model.
 *
 * @private
*/
sap.m.GrowingList.prototype.updateItems =  function(bCalledByControl) {
	// collect the relevant informations
	if (this._iItemCount == 0) {
		this._iItemCount = this.getThreshold();
	}
	var oBindingInfo = this.getBindingInfo("items"),
		fnFactory = oBindingInfo.factory,
		oBinding = oBindingInfo.binding,
		fnODataListBinding = sap.ui.model && sap.ui.model.odata && sap.ui.model.odata.ODataListBinding,
		bODataListBinding = fnODataListBinding && oBinding instanceof fnODataListBinding,
		aContexts = oBinding ? oBinding.getContexts(0, this._iItemCount) : [];
	
	if (this._bExperimentalGrouping) {
		var bFromScratch = true;
		
		if (aContexts.length > 0) {
			var sListId = this.getId() + "-listUl";
			if (jQuery.sap.domById(sListId) != null) {
				// check if model diff-array exists and execute
				if (aContexts.diff) {
					bFromScratch = false;
					var bFirstAddedItemChecked = false;
					for ( var i = 0, l = aContexts.diff.length; i < l; i++) {
						if (aContexts.diff[i].type === "delete") {
							bFromScratch = true;
							break;
						}
						if (aContexts.diff[i].type === "insert") {
							if (!bFirstAddedItemChecked && aContexts.diff[i].index !== this._iRenderedDataItems) {
								bFromScratch = true;
								break;
							}
							bFirstAddedItemChecked = true;
							
							var oClone = fnFactory("", aContexts[aContexts.diff[i].index]);
							oClone.setBindingContext(aContexts[aContexts.diff[i].index], oBindingInfo.model);
							this.addListItem(oClone, true);
						}
					}
				}

				if(bFromScratch) {
					// renderer available - fill the aggregation and render list items
					this.destroyItems();
					this._iRenderedDataItems = 0;
					for ( var i = 0, l = aContexts.length; i < l; i++) {
						var oClone = fnFactory("", aContexts[i]);
						oClone.setBindingContext(aContexts[i], oBindingInfo.model);
						this.addListItem(oClone, false);
					}
				}
			} else {
				// no renderer - fill only the aggregation
				for ( var i = 0, l = aContexts.length; i < l; i++) {
					var oClone = fnFactory("", aContexts[i]);
					oClone.setBindingContext(aContexts[i], oBindingInfo.model);
					this.addListItem(oClone, true);
				}
			}
		} else {
			this._iRenderedDataItems = 0;
			this.destroyItems();
		}
		
	} else { // no grouping, stable implementation
		if (aContexts.length > 0) {
			var sListId = this.getId() + "-listUl";
			if (jQuery.sap.domById(sListId) != null) {
				// check if model diff-array exists and execute
				if (aContexts.diff) {
					var aItems, oClone;
					for ( var i = 0, l = aContexts.diff.length; i < l; i++) {
						aItems = this.getAggregation("items");
						if (aContexts.diff[i].type === "delete") {
							this.deleteListItem(aItems[aContexts.diff[i].index]);
						}
						if (aContexts.diff[i].type === "insert") {
							oClone = fnFactory("", aContexts[aContexts.diff[i].index]);
							oClone.setBindingContext(aContexts[aContexts.diff[i].index], oBindingInfo.model);
							this.insertListItem(oClone, aContexts.diff[i].index);
						}
					}
					// update context on all items after applying diff
					aItems = this.getAggregation("items");
					for ( var i = 0, l = aContexts.length; i < l; i++) {
						aItems[i].setBindingContext(aContexts[i], oBindingInfo.model);
					}
				} else {
					// most likely a new binding is set in this case - therefore remove all items and aggregations 
					this._iRenderedDataItems = 0;
					this.destroyItems();
					// renderer available - fill the aggregation and render list items
					for ( var i = 0, l = aContexts.length; i < l; i++) {
						var oClone = fnFactory("", aContexts[i]);
						oClone.setBindingContext(aContexts[i], oBindingInfo.model);
						this.addListItem(oClone, false);
					}
				}
			} else {
				// no renderer - fill only the aggregation
				for ( var i = 0, l = aContexts.length; i < l; i++) {
					var oClone = fnFactory("", aContexts[i]);
					oClone.setBindingContext(aContexts[i], oBindingInfo.model);
					this.addListItem(oClone, true);
				}
			}
		} else {
			this._iRenderedDataItems = 0;
			this.destroyItems();
		}
	}

	// hide indicator if binding is not ODataListBinding
	// dataReceived event handle hiding indicator when we have ODataListBinding
	// TODO: this is very fragile we should not distinguish bindings
	// but this is the best option for now to handle loading animations
	// make an update after core team handles asynchronous nature of different models
	if (!bODataListBinding) {
		this._hideIndicator();
	}	
	
	// reset trigger check
	var maxItemCount = this._iRenderedDataItems + this.getThreshold(); // FIXME
	if (this._iItemCount > maxItemCount) {
		this._iItemCount = maxItemCount;
	}
	this._updateTrigger();
};


/**
 * Hide loading trigger list item.
 *
 * @private
*/
sap.m.GrowingList.prototype._updateTrigger = function() {
	if (this.getScrollToLoad()) {
		return;
	}
	
	var iMaxItems = this._getListItemCount();

	// hide trigger if maximum of items reached
	if (this._iItemCount >= iMaxItems) {
		jQuery.sap.byId(this.getId() + "-triggerList").css("display", "none");
	} else {
		jQuery.sap.byId(this.getId() + "-triggerList").css("display", "block");	
	}
};


/**
 * show loading indicator
 *
 * @private
*/
sap.m.GrowingList.prototype._showIndicator = function() {
	if (!this.getScrollToLoad()) {
		jQuery.sap.byId(this.getId() + "-trigger-busyIndicator").addClass("sapMGrowingListBusyIndicatorVisible");
	} else {
		var $trigger = jQuery.sap.byId(this.getId() + "-triggerList").css("display", "block");
		if (jQuery.support.touch && this._oScrollDelegate) {
			if (this._oScrollDelegate.getMaxScrollTop() - this._oScrollDelegate.getScrollTop() < $trigger.height()) {
				this._oScrollDelegate.refresh();
				this._oScrollDelegate.scrollTo(this._oScrollDelegate.getScrollLeft(), this._oScrollDelegate.getMaxScrollTop());
			}
		}
	}
	this._getBusyIndicator().setVisible(true);
};

/**
 * Hide/update indicator.
 *
 * @private
*/
sap.m.GrowingList.prototype._hideIndicator = function() {		
	jQuery.sap.delayedCall(0, this, function() {
		var sId = this.getId();
		this._getBusyIndicator().setVisible(false);
		if (this.getScrollToLoad()) {
			this._loadingByScroll = false;
			jQuery.sap.byId(sId + "-triggerList").css("display", "none");
		} else {
			jQuery.sap.byId(sId + "-trigger-itemInfo").html(this._getListItemInfo());
			jQuery.sap.byId(sId + "-trigger-busyIndicator").removeClass("sapMGrowingListBusyIndicatorVisible");			
		}
	});
};


/**
 * Trigger loading by scroll.
 *
 * @private
*/
sap.m.GrowingList.prototype._triggerLoadingByScroll = function() {
	if (!this._loadingByScroll && this._iItemCount < this._getListItemCount()) {// && this._iRenderedDataItems !== this.getBindingInfo("items").binding.iLength) {
		var that = this;
		this._showIndicator();
		this._loadingByScroll = true;
		this._iItemCount += this.getThreshold();
		window.setTimeout(function() {
			that.updateItems();
		}, 0);
		
	}
};


/**
 * Enable extended change detection for bindings
 *
 * @private
*/
sap.m.GrowingList.prototype.bUseExtendedChangeDetection = true;


/**
 * Reset counter to start with the initial threshold when binding has changed
 *
 * @private
*/
sap.m.GrowingList.prototype.bindAggregation = function() {
	this._iItemCount = 0;
	sap.ui.base.ManagedObject.prototype.bindAggregation.apply(this, arguments);
};
