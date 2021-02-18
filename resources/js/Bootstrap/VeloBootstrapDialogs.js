import Xw from '@xirelogy/xw';
import veloPageMask from '../VeloPageMask';


const MASK_ID = 'velo-bootstrap-modal-mask';

const PROMPT_ID = 'velo-bootstrap-prompt';

const PROMPT_BUTTON_ID = 'velo-bootstrap-prompt-button';


const _dialogListeners = new Map();


/**
 * Create a prompt dialog
 * @return {HTMLElement}
 */
function createPromptDialog() {

    let mainElement = document.getElementById(PROMPT_ID);
    if (mainElement) return mainElement;

    mainElement = document.createElement('div');
    mainElement.id = PROMPT_ID;
    mainElement.classList.add('modal');
    mainElement.setAttribute('tabIndex', '-1');
    mainElement.setAttribute('role', 'dialog');

    const dialogElement = document.createElement('div');
    dialogElement.classList.add('modal-dialog');
    dialogElement.setAttribute('role', 'document');

    const contentElement = document.createElement('div');
    contentElement.classList.add('modal-content');

    const headerElement = document.createElement('div');
    headerElement.classList.add('modal-header');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('modal-title');
    headerElement.appendChild(titleElement);
    contentElement.appendChild(headerElement);

    const bodyElement = document.createElement('div');
    bodyElement.classList.add('modal-body');
    contentElement.appendChild(bodyElement);

    const footerElement = document.createElement('div');
    footerElement.classList.add('modal-footer');

    const buttonElement = document.createElement('button');
    buttonElement.id = PROMPT_BUTTON_ID;
    buttonElement.setAttribute('type', 'button');
    buttonElement.classList.add('btn');
    buttonElement.classList.add('btn-primary');
    footerElement.appendChild(buttonElement);
    contentElement.appendChild(footerElement);

    dialogElement.appendChild(contentElement);
    mainElement.appendChild(dialogElement);
    document.body.appendChild(mainElement);

    return mainElement;
}


export default class VeloBootstrapDialogs {

    /**
     * Show the dialog in modal
     * @param {HTMLElement} target Target dialog element
     * @param {object} [options] Showing options
     * @return {Promise<void>}
     */
    async showModal(target, options) {

        const _options = Xw.$.defaultable(options, {});
        const _showMs = Xw.$.defaultable(_options.showMs, 300);
        const _onDismiss = Xw.$.defaultable(_options.onDismiss);

        const mask = veloPageMask.create(MASK_ID);
        document.body.appendChild(target);

        await Xw.axw.waitAll([
            mask.show(),
            Xw.doms.animate(target, {
                opacity: ['0', '100'],
            }, {
                duration: _showMs,
                easing: 'linear',
                beforeAnimation: () => {
                    target.style.display = 'block';
                },
            }),
        ]);

        const outerListener = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal(target);
            if (_onDismiss) _onDismiss();
        };
        target.addEventListener('click', outerListener);
        _dialogListeners.set(target, outerListener);

        const contentListener = (ev) => {
            ev.stopImmediatePropagation();
        };

        const closeListener = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal(target);
            if (_onDismiss) _onDismiss();
        };

        const targetContents = target.getElementsByClassName('modal-content');
        for (const targetContent of targetContents) {
            targetContent.addEventListener('click', contentListener);
            _dialogListeners.set(targetContent, contentListener);
            break;
        }

        const closeButton = target.querySelector('button.close');
        if (closeButton) {
            closeButton.addEventListener('click', closeListener);
            _dialogListeners.set(closeButton, closeListener);
        }
    }


    /**
     * Hide the dialog from modal
     * @param {HTMLElement} target Target dialog element
     * @param {object} [options] Hiding options
     * @return {Promise<void>}
     */
    async hideModal(target, options) {

        const _options = Xw.$.defaultable(options, {});
        const _hideMs = Xw.$.defaultable(_options.hideMs, 250);

        const mask = veloPageMask.create(MASK_ID);

        await Xw.axw.waitAll([
            Xw.doms.animate(target, {
                opacity: ['100', '0'],
            }, {
                duration: _hideMs,
                easing: 'linear',
            }),
            mask.hide(),
        ]);

        target.style.display = 'none';

        if (_dialogListeners.has(target)) {
            target.removeEventListener('click', _dialogListeners.get(target));
            _dialogListeners.delete(target);
        }

        const targetContents = target.getElementsByClassName('modal-content');
        for (const targetContent of targetContents) {
            if (_dialogListeners.has(targetContent)) {
                target.removeEventListener('click', _dialogListeners.get(targetContent));
                _dialogListeners.delete(targetContent);
            }
            break;
        }

        const closeButton = target.querySelector('button.close');
        if (closeButton) {
            if (_dialogListeners.has(closeButton)) {
                target.removeEventListener('click', _dialogListeners.get(closeButton));
                _dialogListeners.delete(closeButton);
            }
        }
    }


    /**
     * Show the prompt
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string|null} titleHTML Title (HTML) of the prompt
     * @param {string} type Type of the prompt
     * @param {callable} onDismiss Function to be executed on dismiss
     * @return Promise<HTMLElement>
     * @private
     */
    async _showPrompt(messageHTML, titleHTML, type, onDismiss)
    {
        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.requires(titleHTML);
        const _type = Xw.$.requires(type);
        const _onDismiss = Xw.$.requires(onDismiss);

        const target = createPromptDialog();

        const titleElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-header > h5.modal-title');
        if (titleHTML) {
            titleElement.innerHTML = titleHTML;
            titleElement.style.display = 'block';
        } else {
            titleElement.style.display = 'none';
        }

        const bodyElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-body');
        bodyElement.innerHTML = messageHTML;

        const buttonElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-footer > button.btn');
        buttonElement.innerHTML = 'Ok';

        const _localDismiss = () => {
            buttonElement.removeEventListener('click', closeFunction);
            _onDismiss();
        };

        const closeFunction = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal(target);
            _localDismiss();
        };

        buttonElement.addEventListener('click', closeFunction);

        await this.showModal(target, {
            onDismiss: _localDismiss,
        });

        return target;
    }


    /**
     * Show a prompt (equivalent to alert)
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string} [titleHTML] Title (HTML) of the prompt
     * @param {string} [type=info] Type of the prompt
     * @return {Promise<void>}
     */
    async prompt(messageHTML, titleHTML, type) {

        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.defaultable(titleHTML);
        const _type = Xw.$.defaultable(type, 'info');

        return new Promise((resolve, reject) => {
            this._showPrompt(_messageHTML, _titleHTML, _type, resolve);
        });
    }
}