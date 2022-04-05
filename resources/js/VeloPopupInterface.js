import Xw from '@xirelogy/xw';

export default class VeloPopupInterface {
    /**
     * Get pop element
     * @return {HTMLElement}
     */
    getPopElement() {
        Xw.$.todo();
    }


    /**
     * If the popup is currently shown
     * @return {boolean}
     */
    isShown() {
        Xw.$.todo();
    }


    /**
     * Show the popup content
     * @return {Promise<void>}
     */
    async show() {
        Xw.$.todo();
    }


    /**
     * Hide the popup content
     * @return {Promise<void>}
     */
    async hide() {
        Xw.$.todo();
    }


    /**
     * Toggle the popup content (hide shown, show hidden)
     * @return {Promise<void>}
     */
    async toggle() {
        if (this.isShown()) {
            await this.hide();
        } else {
            await this.show();
        }
    }
}