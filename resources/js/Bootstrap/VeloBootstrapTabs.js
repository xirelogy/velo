import Xw from '@xirelogy/xw';

const CLASSNAME_ACTIVE = 'active';

const CLASSNAME_DISABLED = 'disabled';

export default class VeloBootstrapTabs {

    /**
     * @constructor
     * @param {*} args
     */
    constructor(args) {
        this._element = Xw.$.requires(args.element);
        const _options = Xw.$.defaultable(args.options, {});

        this._onChange = new Xw.EventListeners();
        this._keyFn = Xw.$.defaultable(_options.keyFn);

        for (const childElement of this._element.children) {
            childElement.addEventListener('click', (ev) => {
                this._onChildClicked(childElement, ev);
            });
        }
    }


    /**
     * If key is supported
     * @return {boolean}
     */
    hasKey() {
        return this._keyFn !== null;
    }


    /**
     * Get the active element
     * @return {HTMLElement|null} Active element if found
     */
    getActive() {
        for (const childElement of this._element.children) {
            const linkElement = childElement.children[0];
            if (linkElement.classList.contains(CLASSNAME_DISABLED)) continue;
            if (linkElement.classList.contains(CLASSNAME_ACTIVE)) return linkElement;
        }

        return null;
    }


    /**
     * Get the active element's key
     * @return {string|null} Active element's key if found
     */
    getActiveKey() {
        if (this._keyFn === null) throw new Xw.UnsupportedError();

        const element = this.getActive();
        if (element === null) return null;

        return this._keyFn(element);
    }


    /**
     * Set the active element
     * @param {HTMLElement} element Target element to be set as active
     */
    setActive(element) {
        this._onSetActive(element);
        this._onRaiseChange(element, null);
    }


    /**
     * Set the active key
     * @param key
     */
    setActiveKey(key) {
        if (this._keyFn === null) throw new Xw.UnsupportedError();

        for (const childElement of this._element.children) {
            const linkElement = childElement.children[0];
            const childKey = this._keyFn(linkElement);
            if (childKey === key) {
                this.setActive(linkElement);
                return;
            }
        }
    }


    /**
     * Actualizer to set the active element
     * @param {HTMLElement} targetElement Target element to be set as active
     * @private
     */
    _onSetActive(targetElement) {
        if (targetElement.classList.contains(CLASSNAME_DISABLED)) return;

        for (const childElement of this._element.children) {
            const linkElement = childElement.children[0];
            linkElement.classList.remove(CLASSNAME_ACTIVE);
            if (linkElement === targetElement) linkElement.classList.add(CLASSNAME_ACTIVE);
        }
    }


    /**
     * Subscribe to change event
     * @param {function(*):void} fn Event receiver
     */
    onChange(fn) {
        return this._onChange.subscribe(fn);
    }


    /**
     * Get notified on child element clicked
     * @param {HTMLElement} childElement
     * @param {Event} ev
     * @private
     */
    _onChildClicked(childElement, ev) {
        const linkElement = childElement.children[0];
        if (linkElement.classList.contains(CLASSNAME_DISABLED)) return;

        this._onSetActive(linkElement);
        this._onRaiseChange(linkElement, ev);
    }


    /**
     * Raise event indicating tab had changed
     * @param {HTMLElement} linkElement
     * @param {Event|null} ev
     * @private
     */
    _onRaiseChange(linkElement, ev) {
        const newEv = new CustomEvent('change');
        newEv.valueElement = linkElement;
        newEv.parentEvent = ev;
        if (this._keyFn) newEv.key = this._keyFn(linkElement);
        this._onChange.dispatch(newEv);
    }
}