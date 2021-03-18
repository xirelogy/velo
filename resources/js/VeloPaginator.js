import velo from './Velo';
import Xw from '@xirelogy/xw';


export default class VeloPaginator {

    /**
     * @constructor
     * @param {HTMLElement} element Paginator container element
     * @param {object} [options] Options
     */
    constructor(element, options) {
        this._inst = velo.getCurrentProvider('VeloPaginator', {
            element: element,
            options: options,
        });

        Object.defineProperty(this, 'currentPage', {
            get: () => {
                if (this._inst) return this._inst.getCurrentPage();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setCurrentPage(value);
            }
        });

        Object.defineProperty(this, 'totalPages', {
            get: () => {
                if (this._inst) return this._inst.getTotalPages();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setTotalPages(value);
            }
        });
    }


    /**
     * Subscribe to page selected event
     * @param {function(*):void} fn Event receiver
     */
    onSelect(fn) {
        if (this._inst) this._inst.onSelect(fn);
    }
}