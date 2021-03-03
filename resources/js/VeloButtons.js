import velo from './Velo';
import Xw from '@xirelogy/xw';


/**
 * Translate and get busy text
 * @param {HTMLElement} target
 * @param {string} [textHtml]
 * @return {string}
 */
function translateTextHtml(target, textHtml) {
    if (Xw.$.isDefined(textHtml)) return textHtml;

    const attrDataBusy = target.getAttribute('data-busy');
    if (attrDataBusy) {
        return Xw.$.escapeHtml(attrDataBusy);
    }

    return target.innerHTML;
}


export default class VeloButtons {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloButtons');
    }


    /**
     * Start a finalizable with the button state busy
     * @param {HTMLButtonElement} target Target button element
     * @param {string} [textHTML] Alternative text (HTML) to replace the original
     * @return {XwFinalizable} A finalizable handle
     */
    startBusy(target, textHTML) {
        if (this._inst) {
            return this._inst.startBusy(target, translateTextHtml(target, textHTML));
        }

        return new Xw.CommonFinalizable({
            onInit: () => {
                target.disabled = true;
            },
            onFinal: () => {
                target.disabled = false;
            },
        });
    }


    /**
     * Check if the button is currently busy
     * @param {HTMLButtonElement} target Target button element
     */
    isBusy(target) {
        if (this._inst) {
            return this._inst.isBusy(target);
        }

        return target.disabled;
    }
}