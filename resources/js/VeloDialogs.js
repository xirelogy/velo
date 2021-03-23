import velo from './Velo';


export default class VeloDialogs {

    /**
     * @constructor
     */
    constructor() {
        this._inst = velo.getCurrentProvider('VeloDialogs');
    }


    /**
     * Show the dialog in modal
     * @param {HTMLElement} target Target dialog element
     * @param {object} [options] Showing options
     * @return {Promise<void>}
     */
    async showModal(target, options) {
        if (this._inst) {
            await this._inst.showModal(target, options);
        }
    }


    /**
     * Hide the dialog from modal
     * @param {HTMLElement} target Target dialog element
     * @param {object} [options] Hiding options
     * @return {Promise<void>}
     */
    async hideModal(target, options) {
        if (this._inst) {
            await this._inst.hideModal(target, options);
        }
    }


    /**
     * Show a prompt (equivalent to alert)
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string} [titleHTML] Title (HTML) of the prompt
     * @param {string} [type=info] Type of the prompt
     * @return {Promise<void>}
     */
    async prompt(messageHTML, titleHTML, type) {
        if (this._inst) {
            await this._inst.prompt(messageHTML, titleHTML, type);
        }
    }


    /**
     * Show a prompt (equivalent to alert)
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string} [titleHTML] Title (HTML) of the prompt
     * @param {string} [type=info] Type of the prompt
     * @param {object} [options] Optional options
     * @return {Promise<boolean>}
     */
    async confirm(messageHTML, titleHTML, type, options) {
        if (this._inst) {
            return await this._inst.confirm(messageHTML, titleHTML, type, options);
        }
    }
}