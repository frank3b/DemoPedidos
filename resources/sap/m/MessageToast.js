/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.MessageToast");
jQuery.sap.require("sap.ui.core.Popup");
jQuery.sap.require("sap.m.InstanceManager");

/**
 * @class
 * A message toast notification offers simple feedback about an operation in a Pop-up.
 * Toasts automatically disappear after a timeout.
 * Toasts appears close the bottom of the screen, centered horizontally, but you can change
 * this position which is not dependent on the default values of the position settings.
 * The default position applies as long as the application does not do any position setting.
 * Position settings are "my, at, of and offset".
 *
 * Beware that only one message toast can be shown at a time in the same place.
 * If you want to have multiple message toasts visible at the same time, you need to position
 * the message toasts in different places.
 * This positioning needs to be handled in the application logic.
 *
 * As <code>MessageToast</code> is a static class, a <code>jQuery.sap.require("sap.m.MessageToast");</code>
 * statement must be explicitly executed before the class can be used.
 *
 * Basic example:
 *
 * <pre>
 * jQuery.sap.require("sap.m.MessageToast");
 *
 * sap.m.MessageToast.show("This message should appear in the message toast");
 * </pre>
 *
 * Other example:
 * <pre>
 * jQuery.sap.require("sap.m.MessageToast");
 *
 * sap.m.MessageToast.show("This message should appear in the message toast", {
 *     duration: 3000,                  // default
 *     width: "15em",                   // default
 *     my: "center bottom",             // default
 *     at: "center bottom",             // default
 *     of: window,                    	// default
 *     offset: "0 0",                   // default
 *     collision: "fit fit"             // default
 *     onClose: null,                   // default
 *     autoClose: true,                 // default
 *     animationTimingFunction: "ease", // default
 *     animationDuration: 1000          // default
 * });
 * </pre>
 *
 * @author SAP AG
 * @since 1.9.2
 *
 * @static
 * @public
 * @name sap.m.MessageToast
 */
sap.m.MessageToast = {};

/* =========================================================== */
/*        begin: internal methods and properties               */
/* =========================================================== */

sap.m.MessageToast._aPopups = [];

sap.m.MessageToast._iOpenedPopups = 0;

sap.m.MessageToast._bNotBoundToOrientationChange = true;

sap.m.MessageToast._validateSettings = function(mSettings) {
	var aMy = mSettings.my.split(" "),
		aAt = mSettings.at.split(" "),
		core = sap.ui.core,
		Dock = core.Popup.Dock,
		sMy = this._getDockFormat(aMy),
		sAt = this._getDockFormat(aAt),
		rValidTimingFn = /^(ease|linear|ease-in|ease-out|ease-in-out)$/i,
		rValidCollisions = /^(fit|flip|none|flipfit|flipflip|flip flip|flip fit|fitflip|fitfit|fit fit|fit flip)$/i,
		sMethodName = this + "._validateSettings";

	// duration
	if (typeof mSettings.duration !== "number" || !isFinite(mSettings.duration) || !(Math.floor(mSettings.duration) === mSettings.duration) || mSettings.duration <= 0) {
		jQuery.sap.log.error('"duration" needs to be a finite positive nonzero integer on', sMethodName);
		return;
	}

	// width
	if (!core.CSSSize.isValid(mSettings.width)) {
		jQuery.sap.log.error(mSettings.width + ' is not of type ' + '"sap.ui.core.CSSSize" for property "width" on', sMethodName);
		return;
	}

	// my
	if (typeof sMy !== "string" || !(sMy in Dock)) {
		jQuery.sap.log.error(mSettings.my + ' is not of type ' + '"sap.ui.core.Popup.Dock" for property "my" on', sMethodName);
		return;
	}

	// at
	if (typeof sAt !== "string" || !(sAt in Dock)) {
		jQuery.sap.log.error(mSettings.at + ' is not of type ' + '"sap.ui.core.Popup.Dock" for property "at" on', sMethodName);
		return;
	}

	// of
	if (!(mSettings.of instanceof jQuery) &&
		!jQuery.isWindow(mSettings.of) &&
		(mSettings.of.nodeType !== 1 && mSettings.of.nodeType !== 9) &&
		!(mSettings.of instanceof sap.ui.core.Control)) {

		jQuery.sap.log.error('"of" needs to be an instance of sap.ui.core.Control or an Element or a jQuery object or the window on', sMethodName);
		return;
	}

	// offset
	if (typeof mSettings.offset !== "string") {
		jQuery.sap.log.error(mSettings.offset + ' is of type ' + typeof mSettings.offset + ', expected "string" for property "offset" on', sMethodName);
		return;
	}

	// collision
	if (!rValidCollisions.test(mSettings.collision)) {
		jQuery.sap.log.error('"collision" needs to be a single value “fit”, “flip”, or “none”, or a pair for horizontal and vertical e.g. "fit flip”, "fit none", "flipfit"' + " on", sMethodName);
		return;
	}

	// onClose
	if (typeof mSettings.onClose !== "function" && mSettings.onClose !== null) {
		jQuery.sap.log.error('"onClose" should be a function or null on', sMethodName);
		return;
	}

	// autoClose
	if (typeof mSettings.autoClose !== "boolean") {
		jQuery.sap.log.error('"autoClose" should be a boolean on', sMethodName);
		return;
	}

	// animationTimingFunction
	if (!rValidTimingFn.test(mSettings.animationTimingFunction)) {
		jQuery.sap.log.error('"animationTimingFunction" should be a string, expected values: ' + "ease, linear, ease-in, ease-out, ease-in-out on", sMethodName);
		return;
	}

	// animationDuration
	if (typeof mSettings.animationDuration !== "number" || !isFinite(mSettings.animationDuration) || !(Math.floor(mSettings.animationDuration) === mSettings.animationDuration) || mSettings.animationDuration < 0) {
		jQuery.sap.log.error('"animationDuration" needs to be a finite positive integer on ', sMethodName);
		return;
	}

	return true;
};

sap.m.MessageToast._getDockFormat = function(aMy) {
	return aMy.map(function(sMy) {
		return sMy.charAt(0).toUpperCase() + sMy.slice(1);
	}).join("");
};

sap.m.MessageToast._handleOrientationChange = function() {
	var self = this;

	setTimeout(function() {
		var i = 0,
			oPopup,
			oMessageToastRef,
			mPos;

		for (; i < self._aPopups.length; i++) {
			oPopup = self._aPopups[i];
			if (oPopup instanceof sap.ui.core.Popup) {
				mPos = oPopup._oPosition;	// TODO _oPosition is a private property, use a public method when available because Popup.js does not have a getPosition() method.

				if (jQuery.device.is.phone || jQuery.device.is.ipad) {
					oMessageToastRef = oPopup.getContent();
					oMessageToastRef.style.visibility = "hidden";
					oMessageToastRef.style.left = 0;

					setTimeout(function() {
						oPopup.setPosition(mPos.my, mPos.at, mPos.of, mPos.offset);
						oMessageToastRef.style.visibility = "visible";
					}, 0);
				} else {
					oPopup.setPosition(mPos.my, mPos.at, mPos.of, mPos.offset);
				}
			}
		}
	}, 0);
};

sap.m.MessageToast._isDefaulPosition = function(mOptions) {
	var mProp = ["my", "at", "of", "offset"],
		i = 0;

	for (; i < mProp.length; i++) {
		if (mOptions[mProp[i]] !== undefined) {
			return false;
		}
	}

	return true;
};

sap.m.MessageToast._createHTMLMarkup = function(mSettings) {
	var oMessageToast = document.createElement("div");

	oMessageToast.style.width = mSettings.width;
	oMessageToast.className = "sapMMT";
	oMessageToast.setAttribute("tabindex", "-1");
	oMessageToast.appendChild(document.createTextNode(mSettings.message));

	return oMessageToast;
};

sap.m.MessageToast.toString = function() {
	return "sap.m.MessageToast";
};

/* =========================================================== */
/*       end: internal methods and properties                  */
/* =========================================================== */


/* =========================================================== */
/*                   begin: API method and properties          */
/* =========================================================== */

/**
 * Creates and displays a simple message toast notification message with the given text, and optionally other options.
 *
 * The only mandatory parameter is <code>sMessage</code>.
 *
 * @param {string} sMessage The message to be displayed.
 * @param {object} [mOptions] Optionally other options.
 * @param {int} [mOptions.duration=3000] Time in milliseconds before the close animation starts. Needs to be a finite positive nonzero integer.
 * @param {sap.ui.core/CSSSize} [mOptions.width="15em"] The width of the message toast, this value can be provided in %, em, px and all possible CSS measures.
 * @param {sap.ui.core.Popup.Dock} [mOptions.my="center bottom"] Specifies which point of the message toast should be aligned.
 * @param {sap.ui.core.Popup.Dock} [mOptions.at="center bottom"] Specifies the point of the reference element to which the message toast should be aligned.
 * @param {sap.ui.core.Control|Element|jQuery|window|undefined} [mOptions.of=window] Specifies the reference element to which the message toast should be aligned, by default it is aligned to the browser visual viewport.
 * @param {string} [mOptions.offset="0 0"] The offset relative to the docking point, specified as a string with space-separated pixel values (e.g. "0 10" to move the message toast 10 pixels to the right).
 * @param {string} [mOptions.collision="fit fit"] Specifies how the position of the message toast should be adjusted in case it overflows the screen in some direction. Possible values “fit”, “flip”, “none”, or a pair for horizontal and vertical e.g. "fit flip”, "fit none".
 * @param {function} [mOptions.onClose=null] Function to be called when the message toast closes.
 * @param {boolean} [mOptions.autoClose=true] Specify whether the message toast should close as soon as the end user touches the screen.
 * @param {string} [mOptions.animationTimingFunction="ease"] Describes how the close animation will progress. Possible values "ease", "linear", "ease-in", "ease-out", "ease-in-out". This feature is not supported in android and ie9 browsers.
 * @param {int} [mOptions.animationDuration=1000] Time in milliseconds that the close animation takes to complete. Needs to be a finite positive integer. For not animation set to 0. This feature is not supported in android and ie9 browsers.
 *
 * @type void
 * @public
 * @name sap.m.MessageToast.show
 * @function
 */
sap.m.MessageToast.show = function(sMessage, mOptions) {
	var self = this,
		$ = jQuery,
		mSettings = jQuery.extend({
			duration: 3000,
			width: "15em",
			my: "center bottom",
			at: "center bottom",
			of: document.defaultView,
			offset: "0 0",
			collision: "fit fit",
			onClose: null,
			animationTimingFunction: "ease",
			animationDuration: 1000,
			autoClose: true
		}, {message: sMessage}),
		oPopup = new sap.ui.core.Popup(),
		handleMTClosed,
		iPos,
		oMessageToast;

	if (mOptions) {

		// if no additional position options are provided, change the default offset
		if (this._isDefaulPosition(mOptions)) {
			mOptions.offset = "0 -64";
		}

		// merge mOptions into mSettings
		$.extend(mSettings, mOptions);
	} else {
		mSettings.offset = "0 -64";
	}

	// validate all settings
	if (!this._validateSettings.call(this, mSettings)) {
		return;
	}

	// in case that the document is provided as an option, replace it with the window,
	// because in this case the message toast should be showed related to the
	// visual viewport and not to the layout viewport
	if (mSettings.of.nodeType === 9) {
		mSettings.of = document.defaultView;
	}

	// create the HTML markup
	oMessageToast = this._createHTMLMarkup(mSettings);

	// save this Popup instance and the position,
	// to be used inside fnMTAttachClosed closure
	iPos = this._aPopups.push(oPopup) - 1;

	// sets the content of the Popup
	oPopup.setContent(oMessageToast);

	// sets the position of the Popup
	oPopup.setPosition(mSettings.my, mSettings.at, mSettings.of, mSettings.offset, mSettings.collision);

	if (jQuery.support.cssTransitions && !jQuery.os.android) {

		// sets the animation functions to use for opening and closing the Popup
		// note: this custom animations are using css3 transitions
		oPopup.setAnimations(function fnMTOpen($MessageToast, iDuration, fnOpened) {
			fnOpened();
		}, function fnMTClose($MessageToast, iDuration, fnClose) {
			var sCssTransition = "opacity " + mSettings.animationTimingFunction + " " + mSettings.animationDuration + "ms";

			if (mSettings.animationDuration > 0) {
				$MessageToast[0].style.webkitTransition = sCssTransition;
				$MessageToast[0].style.transition = sCssTransition;
				$MessageToast[0].style.opacity = 0;

				$MessageToast.on("webkitTransitionEnd.sapMMessageToast transitionend.sapMMessageToast", function handleMTTransitionEnd() {

					// unbound the event handler after its first invocation
					$MessageToast.off("webkitTransitionEnd.sapMMessageToast transitionend.sapMMessageToast");

					// handleMTClosed() function is called
					fnClose();
				});
			} else {
				fnClose();
			}
		});
	}

	// no default shadow
	oPopup.setShadow(false);

	//
	oPopup.setAutoClose(mSettings.autoClose);

	// add the popup instance to the InstanceManager to handle browser back navigation
	sap.m.InstanceManager.addPopoverInstance(oPopup);

	// do not bind if already bound
	if (this._bNotBoundToOrientationChange) {
		this._bNotBoundToOrientationChange = false;

		// bind to the resize event to handle orientation change
		$(window).on("resize.sapMMessageToast", jQuery.proxy(this._handleOrientationChange, this));
	}

	// attach event handler fnFunction to the 'opened' event
	oPopup.attachOpened(function handleMTOpened() {
		jQuery.sap.focus(self._aPopups[iPos].getContent());
	});

	// opens the popup's content at the position specified via #setPosition
	oPopup.open();
	this._iOpenedPopups++;

	// attach event handler fnFunction to the 'closed' event
	oPopup.attachClosed(function handleMTClosed() {
		sap.m.InstanceManager.removePopoverInstance(self._aPopups[iPos]);
		$(self._aPopups[iPos].getContent()).remove();
		self._aPopups[iPos].detachClosed(handleMTClosed);
		self._aPopups[iPos].destroy();
		self._aPopups[iPos] = null;
		self._iOpenedPopups--;

		if (self._iOpenedPopups === 0) {
			self._aPopups = [];
			$(window).off("resize.sapMMessageToast");
			self._bNotBoundToOrientationChange = true;
		}

		if (typeof mSettings.onClose === "function") {
			mSettings.onClose.call(self);
		}
	});

	setTimeout(function() {
		var sOpenState = oPopup.getOpenState();

		// closes the Popup if is not already closed
		if (!(sOpenState === "CLOSED" || sOpenState === "CLOSING")) {
			oPopup.close();
		}

	}, mSettings.duration);

	return this;
};

/* =========================================================== */
/*                  end: API method and properties             */
/* =========================================================== */