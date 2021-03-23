import Xw from '@xirelogy/xw';
import velo from './Velo';


export default class VeloForms {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloForms');
    }


    /**
     * Reset control's validity
     * @param {HTMLElement} control Target control to be set invalid
     */
    resetControlValidity(control) {
        if (this._inst) {
            this._inst.resetControlValidity(control);
        }
    }


    /**
     * Set control as invalid
     * @param {HTMLElement} control Target control to be set invalid
     */
    setControlInvalid(control) {
        if (this._inst) {
            this._inst.setControlInvalid(control);
        }
    }


    /**
     * Set control as valid
     * @param {HTMLElement} control Target control to be set valid
     */
    setControlValid(control) {
        if (this._inst) {
            this._inst.setControlValid(control);
        }
    }


    /**
     * Bind default handler of interact's validity
     * @param {XwInteracts} interacts
     */
    bindInteractsDefaultValidity(interacts) {
        interacts.onValidated((control, e) => {
            if (control === null) return;

            this.resetControlValidity(control);

            if (e !== null) {
                this.setControlInvalid(control);
            }
        });
    }
}