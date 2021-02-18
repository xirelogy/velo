import velo from './Velo';
import Xw from '@xirelogy/xw';


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
            return this._inst.startBusy(target, textHTML);
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