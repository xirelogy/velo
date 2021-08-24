import Xw from '@xirelogy/xw'
import veloBootstrapCommon from './VeloBootstrapCommon';
import veloPageMask from '../VeloPageMask';

const _sessions = new Array();


/**
 * Get the next z-index
 * @return {number}
 */
function getNextZIndex() {
    return 1000 + (_sessions.length * 100);
}


/**
 * Dialog session
 */
export default class VeloBootstrapDialogSession {

    /**
     * Constructor
     * @param {HTMLElement} target Target dialog element
     * @param {function()} onDismiss Notification on dismiss
     * @param {object} options Showing options
     */
    constructor(target, onDismiss, options) {
        // Accept arguments
        this._target = Xw.$.requires(target);
        this._onDismiss = Xw.$.requires(onDismiss);
        const _options = Xw.$.defaultable(options, {});
        this._showMs = Xw.$.defaultable(_options.showMs, 300);

        // Initial variables
        this._dialogListeners = new Map();
        this._isShown = false;
    }


    /**
     * Show the dialog
     * @return {Promise<void>}
     */
    async showModal() {
        // Check and protect the state
        if (this._isShown) throw new Xw.InvalidStateError();
        this._isShown = true;

        // Create the mask
        const baseZIndex = getNextZIndex();
        this._maskId = Xw.$.randomId();
        const mask = veloPageMask.create(this._maskId, {
            zIndex: baseZIndex,
        });
        _sessions.push(this);

        // Set current z-index
        this._target.style.zIndex = baseZIndex + 50;

        // Show the dialog by animation
        const showArgs = {};
        if (this._showMs !== null) showArgs.durationMs = this._showMs;

        await Xw.axw.waitAll([
            mask.show(),
            veloBootstrapCommon.animateFadeIn(this._target, showArgs),
        ]);

        // Create outer listener
        const outerListener = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal();
            if (this._onDismiss) this._onDismiss();
        };
        this._target.addEventListener('click', outerListener);
        this._dialogListeners.set(this._target, outerListener);

        // Handle target content (protective listener - prevent click propagation outwards)
        const contentListener = (ev) => {
            ev.stopImmediatePropagation();
        };

        const targetContents = this._target.getElementsByClassName('modal-content');
        for (const targetContent of targetContents) {
            targetContent.addEventListener('click', contentListener);
            this._dialogListeners.set(targetContent, contentListener);
            break;
        }

        // Handle close button
        const closeListener = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal();
            if (this._onDismiss) this._onDismiss();
        };

        const closeButton = this._target.querySelector('button.close');
        if (closeButton) {
            closeButton.addEventListener('click', closeListener);
            this._dialogListeners.set(closeButton, closeListener);
        }
    }


    /**
     * Hide the dialog from modal
     * @param {object} [options] Hiding options
     * @return {Promise<void>}
     */
    async hideModal(options) {
        const _options = Xw.$.defaultable(options, {});
        const _hideMs = Xw.$.defaultable(_options.hideMs, 250);

        const hideArgs = {};
        if (_hideMs !== null) hideArgs.durationMs = _hideMs;

        const mask = veloPageMask.create(this._maskId);

        // Animate hiding
        await Xw.axw.waitAll([
            veloBootstrapCommon.animateFadeOut(this._target, hideArgs),
            mask.hide(),
        ]);

        // Remove the listeners
        if (this._dialogListeners.has(this._target)) {
            this._target.removeEventListener('click', this._dialogListeners.get(this._target));
            this._dialogListeners.delete(this._target);
        }

        const targetContents = this._target.getElementsByClassName('modal-content');
        for (const targetContent of targetContents) {
            if (this._dialogListeners.has(targetContent)) {
                targetContent.removeEventListener('click', this._dialogListeners.get(targetContent));
                this._dialogListeners.delete(targetContent);
            }
            break;
        }

        const closeButton = this._target.querySelector('button.close');
        if (closeButton) {
            if (this._dialogListeners.has(closeButton)) {
                closeButton.removeEventListener('click', this._dialogListeners.get(closeButton));
                this._dialogListeners.delete(closeButton);
            }
        }

        // Remove mask element and pop session
        mask.remove();
        _sessions.pop();
    }
}