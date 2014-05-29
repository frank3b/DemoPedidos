/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides default renderer for the sap.m.FeedListItem
jQuery.sap.declare("sap.m.FeedListItemRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.ListItemBaseRenderer");

/**
 * @class FeedListItem renderer.
 * @static
 */
sap.m.FeedListItemRenderer = sap.ui.core.Renderer.extend(sap.m.ListItemBaseRenderer);

/**
 * Make sure that parent li is displayed as a horizontal webkit-box.
 * 
 * @param {sap.ui.core.RenderManager}
 *            rm the RenderManager that can be used for writing to the
 *            Render-Output-Buffer
 * @param {sap.ui.core.Control}
 *            oFeedListItem an object representation of the feed list item that
 *            should be rendered
 */
sap.m.FeedListItemRenderer.renderLIAttributes = function (rm, oFeedListItem) {
	rm.addClass("sapMFeedListItemTitleDiv");
	if (oFeedListItem._showSeparators === sap.m.ListSeparators.None) {
		rm.addClass("sapMFeedListShowSeparatorsNone");
	} else {
		rm.addClass("sapMFeedListShowSeparatorsAll");
	}
	
};

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager}
 *            rm the RenderManager that can be used for writing to the
 *            Render-Output-Buffer
 * @param {sap.ui.core.Control}
 *            oFeedListItem an object representation of the feed list item that
 *            should be rendered
 */
sap.m.FeedListItemRenderer.renderLIContent = function (rm, oFeedListItem) {
	// convenience variable
	var sMyId = oFeedListItem.getId(),
		bIsPhone = jQuery.device.is.phone;

	rm.write('<article');
	rm.writeControlData(oFeedListItem);
	rm.addClass('sapMFeedListItem');

	rm.writeClasses();
	rm.write('>');

	// icon
	if (!!oFeedListItem.getShowIcon() && !!oFeedListItem.getIcon()) {
		rm.write('<figure id="' + sMyId + '-figure" class ="sapMFeedListItemFigure">');
		if (!!oFeedListItem.getIconActive()) {
			rm.write('<a id="' + sMyId + '-iconRef" ');
			rm.writeAttribute('href', 'javascript:void(0);');
			rm.write('>');
		}
		rm.renderControl(oFeedListItem._getImageControl());	
		if (!!oFeedListItem.getIconActive()) {
			rm.write('</a>');
		}
		rm.write('</figure>');
	}

	// text (starting with sender)
	rm.write('<div class= "sapMFeedListItemText ');
	if (!!oFeedListItem.getShowIcon() && !!oFeedListItem.getIcon()) {
		rm.write('sapMFeedListItemHasFigure ');
	}
	rm.write('" >');

	if (bIsPhone) {	// name and status first on phone so we can use the full width for the text 
		rm.write('<span id="' + sMyId + '-name" class="sapMFeedListItemTextName">');
		if (!!oFeedListItem.getSender()) {
			rm.renderControl(oFeedListItem._getLinkControl());
		} else if (oFeedListItem.getShowIcon() && !!oFeedListItem.getIcon()) {
			// shows an empty line on mobile phones if no sender is defined
			rm.write('&nbsp;');
		}
		rm.write('</span>');
		this.renderLIMeta(rm, oFeedListItem, true);
		rm.write('</div>');
		rm.write('<p id="' + sMyId + '-text" class="sapMFeedListItemTextText">');
		rm.writeEscaped(oFeedListItem.getText(), true);
		rm.write('</p>');
	} else { // name, text & meta next of the picture
		rm.write('<p id="' + sMyId + '-text" class="sapMFeedListItemTextText">');
		if (!!oFeedListItem.getSender()) {
			rm.write('<span id="' + sMyId + '-name" class="sapMFeedListItemTextName">');
			rm.renderControl(oFeedListItem._getLinkControl());
			rm.write(': ');
			rm.write('</span>');
		}
		rm.writeEscaped(oFeedListItem.getText(), true);
		this.renderLIMeta(rm, oFeedListItem);
		rm.write('</p>');
		rm.write('</div>');
	}

	rm.write('</article>');
};

sap.m.FeedListItemRenderer.renderLIMeta = function (rm, oFeedListItem, sub) {
	if (!!oFeedListItem.getInfo() || !!oFeedListItem.getTimestamp()) {
		// info and date
		rm.write('<p class="sapMFeedListItemFooter">');
		if (!!oFeedListItem.getInfo()) {
			rm.write('<span class="sapMFeedListItemInfo">');
			rm.writeEscaped(oFeedListItem.getInfo());
			rm.write('</span>');
			//Write Interpunct separator if necessary
			if (!!oFeedListItem.getTimestamp()) {
				rm.write('<span class="sapMFeedListItemInterpunct">');
				rm.write("&#x00B7");
				rm.write('</span>');
			}
		}
		if (!!oFeedListItem.getTimestamp()) {
			rm.write('<span class="sapMFeedListItemTimestamp">');
			rm.writeEscaped(oFeedListItem.getTimestamp());
			rm.write('</span>');
		}
	}
};