import velo from './Velo';
import Xw from '@xirelogy/xw';


export default class VeloPopMenus {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloPopMenus');
    }


    /**
     * Bind an element to trigger a particular menu to show/hide
     * @param {HTMLElement} trigger Element to trigger the show/hide of the menu
     * @param {HTMLElement} menu Menu element to be shown/hidden
     * @param {object} [options] Binding options
     * @param {string} [options.anchor] Anchor of the menu in relative to the element
     */
    bindTrigger(trigger, menu, options) {
        if (this._inst) {
            this._inst.bindTrigger(trigger, menu, options);
        }
    }
}
