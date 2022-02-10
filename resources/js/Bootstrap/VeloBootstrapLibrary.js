import Xw from '@xirelogy/xw';
import velo from '../Velo';
import VeloBootstrapButtons from './VeloBootstrapButtons';
import VeloBootstrapDialogs from './VeloBootstrapDialogs';
import VeloBootstrapForms from './VeloBootstrapForms';
import VeloBootstrapInputTags from './VeloBootstrapInputTags';
import VeloBootstrapPaginator from './VeloBootstrapPaginator';
import VeloBootstrapPopMenus from './VeloBootstrapPopMenus';
import VeloBootstrapTabs from './VeloBootstrapTabs';
import VeloBootstrapToasts from './VeloBootstrapToasts';


/**
 * Apply patch to target object's prototype to ensure it is iterable
 * @param {object} proto
 */
function patchIterator(proto) {
    if (Xw.$.isDefined(proto[Symbol.iterator])) return;
    proto[Symbol.iterator] = Array.prototype[Symbol.iterator];
}


/**
 * Apply patch for debugging process
 */
function patchDebug() {
    patchIterator(NodeList.prototype);
    patchIterator(HTMLCollection.prototype);
    patchIterator(DOMTokenList.prototype);
    patchIterator(StyleSheetList.prototype);
    patchIterator(CSSRuleList.prototype);
}


/**
 * Find CSS rule matching specific selector
 * @param {string} selector
 * @return {CSSRule|null}
 */
function selectCssRule(selector) {
    for (const styleSheet of document.styleSheets) {
        for (const cssRule of styleSheet.cssRules) {
            if (cssRule.selectorText == selector) return cssRule;
        }
    }
    return null;
}


/**
 * Extract CSS rule from given text
 * @param {CSSRule} rule
 * @return {string}
 */
function extractCssText(rule) {
    const cssText = rule.cssText;
    const bracePos = cssText.indexOf('{');
    if (bracePos >= 0) {
        return cssText.substring(bracePos);
    } else {
        return '';
    }
}


/**
 * Insert a CSS rule text
 * @param {string} selector
 * @param {string} ruleText
 */
function insertCssRule(selector, ruleText) {
    if (Xw.strings.isEmpty(ruleText)) return;

    const fullRuleText = `${selector} ${ruleText}`;
    Xw.$.insertCustomCss(selector, fullRuleText);
}


/**
 * Prepare dynamic styles by copying from existing style sheets
 */
function prepareStyles() {
    const formControlRule = selectCssRule('.form-control');
    if (formControlRule && formControlRule instanceof CSSStyleRule) {
        const outVeloInputTagsStyles = [];

        const heightCss = formControlRule.style.getPropertyValue('height');
        if (heightCss) outVeloInputTagsStyles.push(`min-height: ${heightCss};`);

        if (outVeloInputTagsStyles.length > 0) {
            insertCssRule('.velo-input-tags', `{ ${outVeloInputTagsStyles.join(' ')} }`)
        }
    }

    const formControlFocusRule = selectCssRule('.form-control:focus');
    if (formControlFocusRule) {
        insertCssRule('.form-control-focus', extractCssText(formControlFocusRule));
    }
}


/**
 * Boot-up functions
 * @param {boolean} [isDebug=false] If debugging is enabled
 */
export default function boot(isDebug) {

    const _isDebug = Xw.$.defaultable(isDebug, false);

    Xw.appSetup.init('velo-bootstrap', [], () => {
        const libraryName = 'Xirelogy.Velo.Bootstrap';

        if (_isDebug) patchDebug();

        prepareStyles();
        
        velo.registerProvider(libraryName, 'VeloButtons', () => {
            return new VeloBootstrapButtons();
        });
        velo.registerProvider(libraryName, 'VeloDialogs', () => {
            return new VeloBootstrapDialogs();
        });
        velo.registerProvider(libraryName, 'VeloForms', () => {
            return new VeloBootstrapForms();
        });
        velo.registerProvider(libraryName, 'VeloInputTags', (args) => {
            return new VeloBootstrapInputTags(args);
        })
        velo.registerProvider(libraryName, 'VeloPaginator', (args) => {
            return new VeloBootstrapPaginator(args);
        });
        velo.registerProvider(libraryName, 'VeloPopMenus', () => {
            return new VeloBootstrapPopMenus();
        });
        velo.registerProvider(libraryName, 'VeloTabs', (args) => {
            return new VeloBootstrapTabs(args);
        });
        velo.registerProvider(libraryName, 'VeloToasts', () => {
            return new VeloBootstrapToasts();
        });
    });
}