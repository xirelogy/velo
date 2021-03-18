import velo from './Velo';
import Xw from '@xirelogy/xw';


export default class VeloTabs {

    /**
     * @constructor
     * @param {HTMLElement} element Tabs container element
     * @param {object} [options] Options
     */
    constructor(element, options) {
        this._inst = velo.getCurrentProvider('VeloTabs', {
            element: element,
            options: options,
        });

        Object.defineProperty(this, 'active', {
            get: () => {
                if (this._inst) return this._inst.getActive();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setActive(value);
            }
        });

        Object.defineProperty(this, 'activeKey', {
            get: () => {
                if (this._inst) return this._inst.getActiveKey();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setActiveKey(value);
            }
        });
    }


    /**
     * Subscribe to change event
     * @param {function(*):void} fn Event receiver
     */
    onChange(fn) {
        if (this._inst) this._inst.onChange(fn);
    }
}