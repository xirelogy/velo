import Xw from '@xirelogy/xw';
import veloBootstrapCommon from './VeloBootstrapCommon';
import veloPageMask from '../VeloPageMask';
import VeloBootstrapDialogSession from './VeloBootstrapDialogSession';

const _l = Xw.i18n.init('VeloBootstrapDialogs');


/**
 * ID of the prompt
 * @type {string}
 */
const PROMPT_ID = 'velo-bootstrap-prompt';

/**
 * ID of the prompt's accept button
 * @type {string}
 */
const PROMPT_BUTTON_OK_ID = 'velo-bootstrap-prompt-ok-button';

/**
 * ID of the prompt's cancel button
 * @type {string}
 */
const PROMPT_BUTTON_CANCEL_ID = 'velo-bootstrap-prompt-cancel-button';


/**
 * Dialog sessions
 * @type {Map<HTMLElement, VeloBootstrapDialogSession>}
 * @private
 */
const _sessions = new Map();


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

    const okButtonElement = document.createElement('button');
    okButtonElement.id = PROMPT_BUTTON_OK_ID;
    okButtonElement.setAttribute('type', 'button');
    okButtonElement.classList.add('btn');
    okButtonElement.classList.add('btn-primary');
    okButtonElement.classList.add('tag-ok');
    footerElement.appendChild(okButtonElement);

    const cancelButtonElement = document.createElement('button');
    cancelButtonElement.id = PROMPT_BUTTON_CANCEL_ID;
    cancelButtonElement.setAttribute('type', 'button');
    cancelButtonElement.classList.add('btn');
    cancelButtonElement.classList.add('btn-outline-secondary');
    cancelButtonElement.classList.add('tag-cancel');
    footerElement.appendChild(cancelButtonElement);

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

        const _target = Xw.$.requires(target);
        const _options = Xw.$.defaultable(options, {});
        const _onDismiss = Xw.$.defaultable(_options.onDismiss, null);

        const _localDismiss = () => {
            _sessions.delete(target);
            if (_onDismiss) _onDismiss();
        };

        const session = new VeloBootstrapDialogSession(target, _localDismiss, options);
        _sessions.set(target, session);

        await session.showModal();
    }


    /**
     * Hide the dialog from modal
     * @param {HTMLElement} target Target dialog element
     * @param {object} [options] Hiding options
     * @return {Promise<void>}
     */
    async hideModal(target, options) {

        if (!_sessions.has(target)) return;

        const session = _sessions.get(target);
        await session.hideModal(options);
    }


    /**
     * Show the prompt
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string|null} titleHTML Title (HTML) of the prompt
     * @param {string} type Type of the prompt
     * @param {object} options Options
     * @param {callable} onDismiss Function to be executed on dismiss
     * @return Promise<HTMLElement>
     * @private
     */
    async _showPrompt(messageHTML, titleHTML, type, options, onDismiss)
    {
        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.requires(titleHTML);
        const _type = Xw.$.requires(type);
        const _options = Xw.$.defaultable(options, {});
        const _onDismiss = Xw.$.requires(onDismiss);

        const target = createPromptDialog();

        const headerElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-header');
        const titleElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-header > h5.modal-title');
        if (_titleHTML) {
            titleElement.innerHTML = _titleHTML;
            Xw.doms.show(headerElement);
        } else {
            Xw.doms.hide(headerElement);
        }

        const bodyElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-body');
        bodyElement.innerHTML = _messageHTML;

        const okButtonElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-footer > button.tag-ok');
        okButtonElement.innerHTML = _l('Ok');

        const cancelButtonElement = target.querySelector('div.modal-dialog > div.modal-content > div.modal-footer > button.tag-cancel');
        cancelButtonElement.innerHTML = _l('Cancel');

        const _localDismiss = (ret) => {
            okButtonElement.removeEventListener('click', okCloseFunction);
            cancelButtonElement.removeEventListener('click', cancelCloseFunction);
            _onDismiss(ret);
        };

        const okCloseFunction = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal(target);
            _localDismiss(true);
        };

        const cancelCloseFunction = async (ev) => {
            ev.stopImmediatePropagation();
            await this.hideModal(target);
            _localDismiss(false);
        };

        okButtonElement.classList.remove('btn-success');
        okButtonElement.classList.remove('btn-danger');
        okButtonElement.classList.remove('btn-warning');
        okButtonElement.classList.remove('btn-primary');

        switch (_type) {
            case 'success':
                okButtonElement.classList.add('btn-success');
                break;
            case 'error':
            case 'danger':
                okButtonElement.classList.add('btn-danger');
                break;
            case 'warn':
            case 'warning':
                okButtonElement.classList.add('btn-warning');
                break;
            default:
                okButtonElement.classList.add('btn-primary');
                break;
        }

        okButtonElement.addEventListener('click', okCloseFunction);
        cancelButtonElement.addEventListener('click', cancelCloseFunction);

        const _optionsHasCancel = Xw.$.defaultable(_options.hasCancel, false);
        if (_optionsHasCancel) {
            Xw.doms.show(cancelButtonElement);
        } else {
            Xw.doms.hide(cancelButtonElement);
        }

        await this.showModal(target, {
            onDismiss: () => {
                _localDismiss(false);
            },
        });
        okButtonElement.focus();

        return target;
    }


    /**
     * Show a prompt (equivalent to alert)
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string} [titleHTML] Title (HTML) of the prompt
     * @param {string} [type=info] Type of the prompt
     * @param {object} [options] Optional options
     * @return {Promise<void>}
     */
    async prompt(messageHTML, titleHTML, type, options) {

        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.defaultable(titleHTML);
        const _type = Xw.$.defaultable(type, 'info');
        const _options = Xw.$.defaultable(options, {});

        _options.hasCancel = false;

        return new Promise((resolve, reject) => {
            this._showPrompt(_messageHTML, _titleHTML, _type, _options, resolve);
        });
    }


    /**
     * Show a confirmation prompt (equivalent to query)
     * @param {string} messageHTML Message (HTML) in the prompt
     * @param {string} [titleHTML] Title (HTML) of the prompt
     * @param {string} [type=info] Type of the prompt
     * @param {object} [options] Optional options
     * @return {Promise<boolean>}
     */
    async confirm(messageHTML, titleHTML, type, options) {

        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.defaultable(titleHTML);
        const _type = Xw.$.defaultable(type, 'info');
        const _options = Xw.$.defaultable(options, {});

        _options.hasCancel = true;

        return new Promise((resolve, reject) => {
            this._showPrompt(_messageHTML, _titleHTML, _type, _options, resolve);
        })
    }
}