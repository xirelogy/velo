import velo from './Velo';
import Xw from '@xirelogy/xw';
import VeloPopupInterface from './VeloPopupInterface';


export default class VeloPopups {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloPopups');
    }


    /**
     * Bind parent to popup
     * @param {HTMLElement} parent Parent element
     * @param {HTMLElement} popup Popup content element
     * @param {object} [options] Options
     * @param {string} [options.anchor] Anchor of the popup content in relative to the parent
     * @return {VeloPopupInterface}
     */
    bind(parent, popup, options) {
        if (this._inst) {
            return this._inst.bind(parent, popup, options);
        }

        throw Xw.InvalidStateError();
    }
}