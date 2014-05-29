/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides helper sap.ui.core.LocalBusyIndicatorSupport
jQuery.sap.declare("sap.ui.core.LocalBusyIndicatorSupport");

/**
 * This support class extends the calling control with a local BusyIndicator.
 * After the control called this class (within the init-function), the control
 * is able to easily set a LocalBusyIndicator that only blocks the current
 * control.
 * The Busy Indicator is automatically attached to all controls.
 * 
 * @returns {sap.ui.core.LocalBusyIndicatorSupport}
 * @constructor
 * @public
 */
sap.ui.core.LocalBusyIndicatorSupport = function() {
	// "this" is the prototype now when called with apply()

	// Ensure only Element prototype is enhanced
	if (this === sap.ui.core.Control.prototype) {
		
		this._sapUiCoreLocalBusy_oPopup;
		this._sapUiCoreLocalBusy_busyIndicator;
		this._sapUiCoreLocalBusy_previousFocus = null;
		this._sapUiCoreLocalBusy_tabIndices = [];

		this._sapUiCoreLocalBusy_delay = 1000;

		/**
		 * This function starts or ends the LocalBusyIndicator depending on the
		 * given parameter value.
		 * 
		 * @param {boolean}
		 *            bBusy whether the control should be set as busy or not
		 * @public
		 */
		this.setBusy = function(bBusy) {

			if (this._sapUiCoreLocalBusy_isBusy === bBusy) {
				// if the status should be set as it already is -> nothing needs
				// to be done
				return;
			}

			var that = this,
				$this = this.$(),
				sPreventedEvents = "focusin focusout keydown keypress keyup";
			this._sapUiCoreLocalBusy_isBusy = bBusy;

			if (bBusy) {
				jQuery.sap.require("sap.ui.core.Popup");

				if (this._sapUiCoreLocalBusy_busyIndicator) {
					delete this._sapUiCoreLocalBusy_busyIndicator;
				}
				
				if ($this.length <= 0) {
					return;
				}
				
				$this.attr("aria-busy", true);
				
				var w = $this.outerWidth() + "px";
				var h = $this.outerHeight() + "px";
				this._sapUiCoreLocalBusy_busyIndicator = new sap.ui.core.LocalBusyIndicator({
					width : w,
					height : h
				});

				var $TabRefs = $this.find('[tabindex]');
				$TabRefs.each(function(iIndex, oObject) {
					var $Ref = jQuery(oObject),
						iTabIndex = $Ref.attr('tabindex');
					
					if (iTabIndex < 0) return true;
					
					that._sapUiCoreLocalBusy_tabIndices.push({
						ref: $Ref,
						tabindex: iTabIndex
					});
					$Ref.attr('tabindex', -1);
					$Ref.bind(sPreventedEvents, that._sapUiCoreLocalBusyPreventEvents);
				});
				

				// content, bModal, bShadow, bAutoclose
				this._sapUiCoreLocalBusy_oPopup = new sap.ui.core.Popup(this._sapUiCoreLocalBusy_busyIndicator, false, false, false);
				this._sapUiCoreLocalBusy_oPopup.attachOpened(jQuery.proxy(this._sapUiCoreLocalBusyPopupOpened, this));
				this._sapUiCoreLocalBusy_oPopup.attachClosed(jQuery.proxy(this._sapUiCoreLocalBusyPopupClosed, this));

				this._delayedCallId = jQuery.sap.delayedCall(this._sapUiCoreLocalBusy_delay, this, "_sapUiCoreLocalBusyPopupOpen");
			} else {
				if ($this.length > 0) {
					$this.attr("aria-busy", false);
				}

				var bClearedDelayedCall = false;
				if (this._delayedCallId) {
					/*
					 * This stuff is needed if the LocalBusyIndicator was
					 * started and a delay was used and the delay hasn't passed
					 * yet. So everything needs to be tidied up.
					 */
					jQuery.sap.clearDelayedCall(this._delayedCallId);
					delete this._delayedCallId;
					bClearedDelayedCall = true;
				}

				//If there is a popup, it has to be closed before the LBI is destroyed, else the whole static UI Area rerenders
				if (this._sapUiCoreLocalBusy_oPopup && this._sapUiCoreLocalBusy_oPopup.isOpen()) {
					this._sapUiCoreLocalBusy_oPopup.close();
				} else if (bClearedDelayedCall) {
					/*
					 * If delayed call was cleared and busy indicator is defined we destroy it
					 * We do that only if popup is not open. If popup is open the destroying is done by the popup closed handler
					 */
					if (this._sapUiCoreLocalBusy_busyIndicator) {
						this._sapUiCoreLocalBusy_busyIndicator.destroy();
						delete this._sapUiCoreLocalBusy_busyIndicator;
					}
				}
				
				jQuery.each(this._sapUiCoreLocalBusy_tabIndices, function(iIndex, oObject) {
					oObject.ref.attr('tabindex', oObject.tabindex);
					oObject.ref.unbind(sPreventedEvents, that._sapUiCoreLocalBusyPreventEvents);
				});
				this._sapUiCoreLocalBusy_tabIndices = [];
			}
		};

		/**
		 * Checks if the control is currently busy.
		 * 
		 * @returns {boolean} whether the contol is currently busy or not
		 * @public
		 */
		this.isBusy = function() {
			return this._sapUiCoreLocalBusy_isBusy;
		};

		/**
		 * This function set the delay until the BusyIndicator is being shown
		 * 
		 * @public
		 * @param iDelay
		 */
		this.setBusyIndicatorDelay = function(iDelay) {
			this._sapUiCoreLocalBusy_delay = iDelay;
		};

		/**
		 * @returns {Number} delay that will be waited for until the
		 *          BusyIndicator is shown
		 */
		this.getBusyIndicatorDelay = function() {
			return this._sapUiCoreLocalBusy_delay;
		};
		
		this._sapUiCoreLocalBusyPreventEvents = function(oEvent) {
			oEvent.preventDefault();
			oEvent.stopImmediatePropagation();
		}
		
		this._sapUiCoreLocalBusyPreventDelegate = {
				onAny: function() {
					//
				}
			};

		this._sapUiCoreLocalBusyPopupOpen = function() {
			// iDuration, my, at, of, offset, collision, followOf
			this._sapUiCoreLocalBusy_oPopup.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginTop, this, "0 0", null, true);
		};

		/**
		 * @private
		 */
		this._sapUiCoreLocalBusyPopupOpened = function() {
			jQuery.sap.clearDelayedCall(this._delayedCallId);
			delete this._delayedCallId;
			if (this._sapUiCoreLocalBusy_oPopup) {
				jQuery.sap.focus(this._sapUiCoreLocalBusy_oPopup.getContent().$());
			}
		};

		/**
		 * This function destroys the previously created BusyIndicator after the
		 * Popup is closed
		 * 
		 * @private
		 */
		this._sapUiCoreLocalBusyPopupClosed = function() {
			jQuery.sap.clearDelayedCall(this._delayedCallId);
			delete this._delayedCallId;

			if (this._sapUiCoreLocalBusy_busyIndicator) {
				this._sapUiCoreLocalBusy_busyIndicator.destroy();
				delete this._sapUiCoreLocalBusy_busyIndicator;
			}
		};

		// TODO edit this comment accordingly to the comment in Element.js
		/**
		 * 
		 * This function is called from Element.js (a temporary hook) to
		 * remove/delete all stuff that was added before
		 * 
		 * @private
		 */
		this._sapUiCoreLocalBusy_Exit = function() {
			if (this._delayedCallId) {
				jQuery.sap.clearDelayedCall(this._delayedCallId);
				delete this._delayedCallId;
			}

			if (this._sapUiCoreLocalBusy_busyIndicator) {
				this._sapUiCoreLocalBusy_busyIndicator.destroy();
				delete this._sapUiCoreLocalBusy_busyIndicator;
			}

			if (this._sapUiCoreLocalBusy_oPopup) {
				this._sapUiCoreLocalBusy_oPopup.detachOpened(this._sapUiCoreLocalBusyPopupOpened);
				this._sapUiCoreLocalBusy_oPopup.detachClosed(this._sapUiCoreLocalBusyPopupClosed);

				this._sapUiCoreLocalBusy_oPopup.destroy();
				delete this._sapUiCoreLocalBusy_oPopup;
			}
		};
		
		this._sapUiCoreLocalBusy_initBusyIndicator = function() {
			this._sapUiCoreLocalBusy_isBusy = false;
			var oDelegate = {
				onAfterRendering: function() {
					if (this._sapUiCoreLocalBusy_isBusy) {
						var that = this;
						setTimeout(function() {
							//Check again if control is still busy, else we don't have to do anything
							if (that._sapUiCoreLocalBusy_isBusy) {
								that._sapUiCoreLocalBusy_isBusy = !that._sapUiCoreLocalBusy_isBusy;
								var iDelay = that._sapUiCoreLocalBusy_delay;
								that.setBusyIndicatorDelay(0);
								that.setBusy(true);
								that.setBusyIndicatorDelay(iDelay);
							}
						}, 0);
					}
				}
			};
			this.addDelegate(oDelegate, false, this);
		}
		
	} else {
		jQuery.sap.log.error("Only controls can use the LocalBusyIndicator", this);
	}
};

//moved here to fix the cyclic dependency LocalBusyIndicatorSupport, Element, control
jQuery.sap.require("sap.ui.core.Element");
