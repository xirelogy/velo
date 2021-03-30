import Xw from '@xirelogy/xw';
import veloBootstrapCommon from './VeloBootstrapCommon';


/**
 * ID of the mask
 * @type {string}
 */
const QUEUE_ID = 'velo-bootstrap-toast-queue';


function createQueue() {

    let queueElement = document.getElementById(QUEUE_ID);
    if (queueElement) return queueElement;

    queueElement = document.createElement('div');
    queueElement.id = QUEUE_ID;
    queueElement.classList.add('velo-toast-queue');

    document.body.appendChild(queueElement);
    return queueElement;
}


/**
 * Create a toast dialog
 * @param {string} id
 * @param {string} contentHTML The HTML of the content
 * @param {string|null} [titleHTML] The HTML of the title
 * @return {HTMLElement}
 */
function createToast(id, contentHTML, titleHTML) {

    const _id = Xw.$.requires(id);
    const _contentHTML = Xw.$.requires(contentHTML);
    const _titleHTML = Xw.$.defaultable(titleHTML);

    const mainElement = document.createElement('div');
    mainElement.id = _id;
    mainElement.classList.add('toast');
    mainElement.setAttribute('tabIndex', '-1');
    mainElement.setAttribute('role', 'alert');
    mainElement.setAttribute('aria-live', 'assertive');
    mainElement.setAttribute('aria-atomic', 'true');

    if (_titleHTML !== null) {
        const titleElement = document.createElement('div');
        titleElement.classList.add('toast-header');
        titleElement.innerHTML = _titleHTML;
        mainElement.appendChild(titleElement);
    }

    const contentElement = document.createElement('div');
    contentElement.classList.add('toast-body');
    contentElement.innerHTML = _contentHTML;
    mainElement.appendChild(contentElement);

    return mainElement;
}


export default class VeloBootstrapToasts {

    /**
     * Show a confirmation prompt (equivalent to query)
     * @param {string} messageHTML Message (HTML) in the toast
     * @param {string|null} [titleHTML=null] Title (HTML) of the toast
     * @param {string} [type=info] Type of the toast
     * @param {object} [options] Optional options
     * @return {Promise<void>}
     */
    async toast(messageHTML, titleHTML, type, options) {

        const _messageHTML = Xw.$.requires(messageHTML);
        const _titleHTML = Xw.$.defaultable(titleHTML);
        const _type = Xw.$.defaultable(type, 'info');
        const _options = Xw.$.defaultable(options, {});

        const _showMs = Xw.$.defaultable(_options.showMs, 300);
        const _stayMs = Xw.$.defaultable(_options.stayMs, 500);
        const _hideMs = Xw.$.defaultable(_options.hideMs, 250);

        let _outTitleHTML = null;

        if (_titleHTML !== null) {
            const titleSpanElement = document.createElement('span');

            switch (_type) {
                case 'success':
                    titleSpanElement.classList.add('text-success');
                    break;
                case 'error':
                case 'danger':
                    titleSpanElement.classList.add('text-danger');
                    break;
                case 'warn':
                case 'warning':
                    titleSpanElement.classList.add('text-warning');
                    break;
                default:
                    break;
            }

            titleSpanElement.innerHTML = _titleHTML;
            _outTitleHTML = titleSpanElement.outerHTML;
        }

        const id = Xw.$.randomId();
        const mainElement = createToast(id, _messageHTML, _outTitleHTML);
        mainElement.classList.add('velo-toast-item');

        const queueElement = createQueue();
        queueElement.appendChild(mainElement);

        await Xw.doms.animate(mainElement, {
            opacity: ['0', '100'],
        }, {
            duration: _showMs,
            easing: 'linear',
        });

        await Xw.axw.sleep(_stayMs);

        await Xw.doms.animate(mainElement, {
            opacity: ['100', '0'],
        }, {
            duration: _hideMs,
            easing: 'linear',
        });

        mainElement.remove();
    }
}