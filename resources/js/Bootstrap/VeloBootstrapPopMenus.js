import Xw from '@xirelogy/xw';
import veloBootstrapCommon from './VeloBootstrapCommon';
import { createPopper } from '@popperjs/core/lib/popper-lite.js';


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



export default class VeloBootstrapPopMenus {
    /**
     * Bind an element to trigger a particular menu to show/hide
     * @param {HTMLElement} trigger Element to trigger the show/hide of the menu
     * @param {HTMLElement} menu Menu element to be shown/hidden
     * @param {object} [options] Binding options
     * @param {string} [options.anchor] Anchor of the menu in relative to the element
     */
    bindTrigger(trigger, menu, options) {
        
        const _trigger = Xw.$.requires(trigger);
        const _menu = Xw.$.requires(menu);
        const _options = Xw.$.defaultable(options);
        const _optionsAnchor = translateAnchor(Xw.$.defaultable(_options.anchor));
        const _optionsOnAsyncShow = Xw.$.defaultable(_options.onAsyncShow, async (target) => {
            await veloBootstrapCommon.animateFadeIn(target);
        });
        const _optionsOnAsyncHide = Xw.$.defaultable(_options.onAsyncHide, async (target) => {
            await veloBootstrapCommon.animateFadeOut(target);
        });

        // Use popper
        const popperOptions = {};
        if (_optionsAnchor !== null) popperOptions.placement = _optionsAnchor;
        createPopper(_trigger, _menu, popperOptions);

        // Bind the trigger to show/hide
        _trigger.addEventListener('click', async (ev) => {
            ev.stopImmediatePropagation();
            if (!Xw.doms.isShown(_menu)) {
                await _optionsOnAsyncShow(_menu);
            } else {
                await _optionsOnAsyncHide(_menu);
            }
        });

        // Anything click outside the menu will cause a hide
        _menu.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation();
        });

        document.addEventListener('click', async (ev) => {
            if (Xw.doms.isShown(_menu)) {
                await _optionsOnAsyncHide(_menu);
            }
        });
    }
}