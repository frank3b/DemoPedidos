/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.SliderRenderer");

/**
 * @class Slider renderer.
 * @static
 */
sap.m.SliderRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oSlider an object representation of the slider that should be rendered
 */
sap.m.SliderRenderer.render = function(oRm, oSlider) {
	var fValue = oSlider.getValue(),
		sName = oSlider.getName(),
		bEnabled = oSlider.getEnabled(),
		sTooltip = oSlider.getTooltip_AsString();

	// avoid render when not visible
	if (!oSlider.getVisible()) {
		return;
	}

	oRm.write("<div");
	oRm.addClass("sapMSliCont");

	if (!bEnabled) {
		oRm.addClass("sapMSliContDisabled");
	}

	oRm.addStyle("width", oSlider.getWidth());
	oRm.addStyle("visibility", "hidden");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.writeControlData(oSlider);

	if (sTooltip) {
		oRm.writeAttributeEscaped("title", sTooltip);
	}

	oRm.write(">");

		oRm.write('<div');
			oRm.addClass("sapMSli");

			if (!bEnabled) {
				oRm.addClass("sapMSliDisabled");
			}

			oRm.writeClasses();
			oRm.writeStyles();
			oRm.write(">");

			if (oSlider.getProgress()) {
				oRm.write('<div class="sapMSliProgress" style="width: ' +  oSlider._fProgressValue + '"></div>');
			}

			// start render slider handle
			oRm.write('<span');
				oRm.addClass("sapMSliHandle");
				oRm.addStyle("left", oSlider._fProgressValue);

				// WAI-ARIA
				oRm.writeAccessibilityState(oSlider, {
					role: "slider",
					orientation: "horizontal",
					valuemin: oSlider.getMin(),
					valuemax: oSlider.getMax(),
					valuenow: fValue,
					valuetext: fValue,
					live: "assertive",
					disabled: !oSlider.getEnabled()
				});

				oRm.writeClasses();
				oRm.writeStyles();

				oRm.writeAttribute("title", fValue);

				if (oSlider.getEnabled()) {
					oRm.writeAttribute("tabIndex", "0");
				}

			oRm.write('><span class="sapMSliHandleInner"></span></span>');
		oRm.write("</div>");

		if (sName) {

			// start render input
			oRm.write('<input type="text" class="sapMSliInput"');

			if (!bEnabled) {
				oRm.write("disabled");
			}

			oRm.writeAttributeEscaped("name", sName);
			oRm.writeAttribute("value", fValue);
			oRm.write("/>");
		}

	oRm.write("</div>");
};