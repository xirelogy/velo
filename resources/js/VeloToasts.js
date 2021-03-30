import velo from './Velo';


export default class VeloToasts {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloToasts');
    }


    /**
     * Show a confirmation prompt (equivalent to query)
     * @param {string} messageHTML Message (HTML) in the toast
     * @param {string|null} [titleHTML=null] Title (HTML) of the toast
     * @param {string} [type=info] Type of the toast
     * @param {object} [options] Optional options
     * @return {Promise<void>}
     */
    async toast(messageHTML, titleHTML, type, options) {
        if (this._inst) {
            return await this._inst.toast(messageHTML, titleHTML, type, options);
        }
    }
}