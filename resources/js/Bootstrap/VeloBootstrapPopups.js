import Xw from '@xirelogy/xw';
import veloBootstrapCommon from './VeloBootstrapCommon';
import VeloPopupInterface from '../VeloPopupInterface';
import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
import offset from '@popperjs/core/lib/modifiers/offset.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import arrow from '@popperjs/core/lib/modifiers/arrow.js';


/**
 * Convert rem to px
 * @param {number} value
 * @return {number}
 */
function remToPx(value) {
    return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


/**
 * Translate anchor value
 * @param {string|null} value
 * @return {string|null}
 */
function translateAnchor(value) {
    if (value === null) return null;
    if (Xw.strings.isEmpty(value)) return null;

    switch (value.trim().toLowerCase()) {
        case 'tl':
            return 'top-start';
        case 't':
        case 'tc':
            return 'top';
        case 'tr':
            return 'top-end';
        case 'bl':
            return 'bottom-start';
        case 'b':
        case 'bc':
            return 'bottom';
        case 'br':
            return 'bottom-end';
        case 'lt':
            return 'left-start';
        case 'l':
        case 'lc':
            return 'left';
        case 'lb':
            return 'left-end';
        case 'rt':
            return 'right-start';
        case 'r':
        case 'rc':
            return 'right';
        case 'rb':
            return 'right-end';
        default:
            return null;
    }
}


/**
 * Remove any dash
 * @param {string} value
 * @return {string}
 */
function undash(value) {
    const dashPos = value.indexOf('-');
    if (dashPos > 0) return value.substring(0, dashPos);
    return value;
}


export default class VeloBootstrapPopups {

    /**
     * Bind parent to popup
     * @param {HTMLElement} parent Parent element
     * @param {HTMLElement} popup Popup content element
     * @param {object} [options] Options
     * @param {string} [options.anchor] Anchor of the popup content in relative to the parent
     * @return {VeloPopupInterface}
     */
    bind(parent, popup, options) {

        const _parent = Xw.$.requires(parent);
        const _popup = Xw.$.elementClone(Xw.$.requires(popup));
        const _options = Xw.$.defaultable(options, {});
        const _optionsAnchor = translateAnchor(Xw.$.defaultable(_options.anchor));
        const _optionsOnAsyncShow = Xw.$.defaultable(_options.onAsyncShow, async (target) => {
            await veloBootstrapCommon.animateFadeIn(target);
        });
        const _optionsOnAsyncHide = Xw.$.defaultable(_options.onAsyncHide, async (target) => {
            await veloBootstrapCommon.animateFadeOut(target);
        });

        // Configure the popup and add to body
        const popupId = Xw.$.randomId();
        _popup.setAttribute('id', popupId);
        document.body.appendChild(_popup);

        // Popper instance
        let _popper = null;

        // Setup popup
        if (_optionsAnchor !== null) {
            _popup.classList.add('bs-popover-' + undash(_optionsAnchor));
            _popup.setAttribute('x-placement', _optionsAnchor);
        }

        // Setup popper options
        const _flip = {...flip};
        _flip.options = {
            fallbackPlacements: [
                'top',
                'right',
                'bottom',
                'left',
            ]
        };

        const _offset = {...offset};
        _offset.options = {
            offset: [remToPx(0.2), remToPx(0.5)],   // Adapt to the difference in arrow for Bootstrap 4.6
        };

        const _preventOverflow = {...preventOverflow};
        _preventOverflow.options = {
            boundary: 'clippingParents',
        };

        const _arrow = {...arrow};
        _arrow.options = {
            element: '.arrow',
        };

        const popperOptions = {
            modifiers: [
                _flip,
                _offset,
                _preventOverflow,
                _arrow,
            ],
        };
        if (_optionsAnchor !== null) popperOptions.placement = _optionsAnchor;

        return new class extends VeloPopupInterface {
            /**
             * @inheritDoc
             */
            getPopElement() {
                return _popup;
            }


            /**
             * @inheritDoc
             */
            isShown() {
                return Xw.doms.isShown(_popup);
            }


            /**
             * @inheritDoc
             */
            async show() {
                if (!_popper) _popper = createPopper(_parent, _popup, popperOptions);

                if (!this.isShown()) {
                    _parent.setAttribute('aria-describedby', popupId);
                    await _optionsOnAsyncShow(_popup);
                }
            }


            /**
             * @inheritDoc
             */
            async hide() {
                if (this.isShown()) {
                    await _optionsOnAsyncHide(_popup);
                    _parent.removeAttribute('aria-describedby');
                }
            }
        };
    }
}