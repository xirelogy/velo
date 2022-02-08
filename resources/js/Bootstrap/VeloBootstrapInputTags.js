import Xw from '@xirelogy/xw';

const FORM_FOCUS_CLASS = 'form-control-focus';


export default class VeloBootstrapInputTags {

    /**
     * @constructor
     * @param {*} args
     */
    constructor(args) {
        this._element = Xw.$.requires(args.element);
        const _options = Xw.$.defaultable(args.options, {});
        this._separator = Xw.$.requires(args.separator);
        this._translator = Xw.$.requires(args.translator);
        this._parser = Xw.$.requires(args.parser);
        this._onChanged = Xw.$.requires(args.onChanged);

        this._inputElement = this._element.querySelectorAll('input')[0];

        // Provide the correct visual appearance
        this._inputElement.addEventListener('focus', () => {
            this._element.classList.add(FORM_FOCUS_CLASS);
        });
        this._inputElement.addEventListener('blur', () => {
            this._scanInputElement(true);
            this._element.classList.remove(FORM_FOCUS_CLASS);
        });

        // Override main element's focus() and blur()
        this._element.focus = (options) => {
            this._inputElement.focus(options);
        }
        this._element.blur = () => {
            this._inputElement.blur();
        }

        // Listen on the input element and process accordingly
        this._inputElement.addEventListener('keydown', (ev) => {
            // Remove the last tag when input is empty and backspace is used
            if (this._inputElement.value === '' && ev.keyCode === 8) {
                this._removeLastTag();
            }
        });

        this._inputElement.addEventListener('input', (ev) => {
            this._scanInputElement();
        });
    }


    /**
     * Get the tags
     * @return {string[]}
     */
    getTags() {
        const ret = [];
        for (const child of this._element.children) {
            if (child.tagName.toLowerCase() == 'span') {
                ret.push(child.dataset.text);
            }
        }

        return ret;
    }


    /**
     * Get the input's value
     * @return {string}
     */
    getInputValue() {
        return this._inputElement.value;
    }


    /**
     * Set the tags and values
     * @param {string[]} tags List of tags
     * @param {string} value Pending value
     */
    setValue(tags, value) {
        // Delete all existing tags
        const deleteChildren = [];
        for (const child of this._element.children) {
            if (child.tagName.toLowerCase() == 'span') {
                deleteChildren.push(child);
            }
        }

        for (const deleteChild of deleteChildren) {
            deleteChild.remove();
        }

        // Create new tags
        for (const tag of tags) {
            const tagElement = this._createTagElement(tag);
            this._element.insertBefore(tagElement, this._inputElement);
        }

        // Set input
        this._inputElement.value = value;
    }


    /**
     * Scan the input element for items to be added as tags
     * @param {boolean} [isForced=false] If the input text is forced to be a tag
     * @private
     */
    _scanInputElement(isForced) {
        const _isForced = Xw.$.defaultable(isForced, false);
        const currentValue = this._inputElement.value;

        if (!currentValue.includes(this._separator) && !(_isForced && !Xw.strings.isEmpty(currentValue))) {
            return;
        }

        const oldTags = this.getTags();
        const newTags = this._parser(currentValue);

        const allTags = oldTags.concat(newTags);
        this.setValue(allTags, '');
        this._onChanged();
    }


    /**
     * Create tag element for given text
     * @param {string} text Text of the tag
     * @return {HTMLElement}
     * @private
     */
    _createTagElement(text) {
        const tagElement = document.createElement('span');
        tagElement.classList.add('velo-input-tag');
        tagElement.classList.add('text-white');
        tagElement.classList.add('bg-secondary');
        tagElement.dataset.text = text;
        tagElement.innerHTML = Xw.$.escapeHtml(text) + '<span class="velo-input-tag-delete text-white-50">&times;</span>';

        const tagDeleteElement = tagElement.querySelectorAll('.velo-input-tag-delete')[0];
        tagDeleteElement.addEventListener('click', () => {
            tagElement.remove();
            this._onChanged();
            this._inputElement.focus();
        });

        return tagElement;
    }


    /**
     * Remove last tag, if available
     * @private
     */
    _removeLastTag() {
        // Scan for last tag
        let lastChild = null;
        for (const child of this._element.children) {
            if (child.tagName.toLowerCase() == 'span') {
                lastChild = child;
            }
        }

        // Remove last tag if found
        if (lastChild === null) return;
        lastChild.remove();
        this._onChanged();
    }

}