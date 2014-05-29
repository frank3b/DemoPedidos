/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides class sap.ui.core.ComponentMetadata
jQuery.sap.declare("sap.ui.core.ComponentMetadata");
jQuery.sap.require("sap.ui.base.ManagedObjectMetadata");

/**
 * Creates a new metadata object for a Component subclass.
 *
 * @param {string} sClassName fully qualified name of the class that is described by this metadata object
 * @param {object} oStaticInfo static info to construct the metadata from
 *
 * @experimental Since 1.9.2. The Component concept is still under construction, so some implementation details can be changed in future.
 * @class
 * @author SAP
 * @version 1.15.0-SNAPSHOT
 * @since 1.9.2
 */
sap.ui.core.ComponentMetadata = function(sClassName, oClassInfo) {

	// call super constructor
	sap.ui.base.ManagedObjectMetadata.apply(this, arguments);
};

//chain the prototypes
sap.ui.core.ComponentMetadata.prototype = jQuery.sap.newObject(sap.ui.base.ManagedObjectMetadata.prototype);

sap.ui.core.ComponentMetadata.preprocessClassInfo = function(oClassInfo) {
	// if the component is a string we convert this into a "_src" metadata entry
	// the specific metadata object can decide to support this or gracefully ignore it
	// basically the ComponentMetadata makes use of this feature
	if (oClassInfo && typeof oClassInfo.metadata === "string") {
		oClassInfo.metadata = {
			_src: oClassInfo.metadata
		};
	}
	return oClassInfo;
};

sap.ui.core.ComponentMetadata.prototype.applySettings = function(oClassInfo) {

	var oStaticInfo = oClassInfo.metadata;

	sap.ui.base.ManagedObjectMetadata.prototype.applySettings.call(this, oClassInfo);

	// if the component specifies the metadata property: loadFromFile then
	// the component metadata will be loaded from the specified file 
	// which needs to be located next to the Component.js file.
	if (oStaticInfo._src) {
		jQuery.sap.log.warning("The metadata of the component " + this.getName() + " is loaded from file " + oStaticInfo._src + ". This is a design time feature and not for productive usage!");
		var sPackage = this.getName().replace(/\.\w+?$/, "");
		var sUrl = jQuery.sap.getModulePath(sPackage, "/" + oStaticInfo._src);
		var oResponse = jQuery.sap.syncGetJSON(sUrl);
		if (oResponse.success) {
			jQuery.extend(oStaticInfo, oResponse.data);
		} else {
			jQuery.sap.log.error("Failed to load component metadata from \"" + oStaticInfo._src + "\"! Reason: " + oResponse.error);
		}
	}
	
	this._mDependencies = oStaticInfo.dependencies || null;
	this._mIncludes = oStaticInfo.includes || null;
	this._sVersion = oStaticInfo.version || null;
	
};

/**
 * Returns the dependencies defined in the metadata of the component. If not specified, the return value is null.
 * @return {Object} Component dependencies. 
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getDependencies = function() {
	return this._mDependencies;
};

/**
 * Returns the array of the included files that the Component requires such as css and js. If not specified or the array is empty, the return value is null.
 * @return {string[]} Included files.
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getIncludes = function() {
	return (this._mIncludes && this._mIncludes.length > 0) ? this._mIncludes : null;
};

/**
 * Returns the required version of SAP UI5 defined in the metadata of the Component. If returned value is null, then no special UI5 version is required.
 * @return {string} Required version of UI5 or if not specified then null.
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getUI5Version = function() {
	return this._mDependencies ? this._mDependencies.ui5version : null;
};   

/**
 * Returns array of components specified in the metadata of the Component. If not specified or the array is empty, the return value is null.
 * @return {string[]} Required Components.
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getComponents = function() {
	var aComponents = null;
	if (this._mDependencies) {
		if (this._mDependencies.components && (this._mDependencies.components.length > 0) ) {
			aComponents = this._mDependencies.components;
		}
	} 
	return aComponents;
};

/**
 * Returns array of libraries specified in metadata of the Component, that are automatically loaded when an instance of the component is created.
 * If not specified or the array is empty, the return value is null.
 * @return {string[]} Required libraries.
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getLibs = function() {
	var aLibs = null;
	if (this._mDependencies) {
		if (this._mDependencies.libs && (this._mDependencies.libs.length > 0) ) {
			aLibs = this._mDependencies.libs;
		}
	} 
	return aLibs;
};

/**
 * Returns the version of the component. If not specified, the return value is null.
 * @return {string} The version of the component.
 * @public
 */
sap.ui.core.ComponentMetadata.prototype.getVersion = function() {
	return this._sVersion;
};
