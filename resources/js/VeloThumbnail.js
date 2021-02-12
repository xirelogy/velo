import Xw from '@xirelogy/xw';
import veloPageMask from './VeloPageMask';


/**
 * Mask element
 * @type {string}
 */
const MASK_ID = 'velo-id-mask';

/**
 * Image element
 * @type {string}
 */
const IMAGE_ID = 'velo-id-thumbimage';


/**
 * Get the mask
 * @return {VeloPageMask}
 * @private
 */
function _getMask() {
    const mask = veloPageMask.create(MASK_ID, {
        opacity0: 0,
        opacity1: 0.6,
        onSetup: (target) => {
            target.onClick(async () => {
                const findElement = document.getElementById(IMAGE_ID);
                if (Xw.$.isDefined(findElement)) findElement.remove();
                await mask.hide();
            })
        },
    });

    return mask;
}


/**
 * Create a preview element
 * @param {string} src Source of the image
 * @param {object} [options] Options for page mask
 * @param {string} [options.maxWidth=90vw] The maximum display width of the image
 * @param {string} [options.maxHeight=90vh] The maximum display height of the image
 * @param {number} [options.zIndex=1002] The z-index for the preview element
 * @return {HTMLElement}
 * @private
 */
function _createPreviewElement(src, options) {

    const _options = Xw.$.defaultable(options, {});
    const _maxWidth = Xw.$.defaultable(_options.maxWidth, '90vw');
    const _maxHeight = Xw.$.defaultable(_options.maxHeight, '90vh');
    const _zIndex = Xw.$.defaultable(_options.zIndex, 1002);

    // The outer wrapping DIV
    const divElement = document.createElement('div');
    divElement.id = IMAGE_ID;
    divElement.style.pointerEvents = 'none';
    divElement.style.position = 'absolute';
    divElement.style.top = 0;
    divElement.style.left = 0;
    divElement.style.width = '100vw';
    divElement.style.height = '100vh';
    divElement.style.zIndex = _zIndex;

    // The image
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', src);
    imageElement.style.pointerEvents = 'none';
    imageElement.style.position = 'absolute';
    imageElement.style.maxWidth = _maxWidth;
    imageElement.style.maxHeight = _maxHeight;
    imageElement.style.top = 0;
    imageElement.style.left = 0;
    imageElement.style.bottom = 0;
    imageElement.style.right = 0;
    imageElement.style.width = 'auto';
    imageElement.style.height = 'auto';
    imageElement.style.margin = 'auto';
    divElement.appendChild(imageElement);

    // Return
    return divElement;
}


/**
 * Initialize the binding
 * @param {HTMLElement>} element Target element to be binded to
 * @param {object} [options] Options for page mask
 * @param {string} [options.maxWidth=90vw] The maximum display width of the image
 * @param {string} [options.maxHeight=90vh] The maximum display height of the image
 * @param {number} [options.zIndex=1002] The z-index for the preview element
 * @private
 */
function _init(element, options) {
    element.addEventListener('click', async () => {
        const src = Xw.$.defaultable(element.getAttribute('src'));
        if (src === null) return;

        const mask = _getMask();
        mask.show();
        
        const divElement = _createPreviewElement(src, options);
        document.body.appendChild(divElement);
    })
}


export default class VeloThumbnail {

    /**
     * Constructor
     * @param {HTMLElement>} element Target element to be binded to
     * @param {object} [options] Options for page mask
     * @param {string} [options.maxWidth=90vw] The maximum display width of the image
     * @param {string} [options.maxHeight=90vh] The maximum display height of the image
     * @param {number} [options.zIndex=1002] The z-index for the preview element
     */
    constructor(element, options) {
        this._element = Xw.$.requires(element);
        _init(this._element, options);
    }
}