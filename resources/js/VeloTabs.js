import velo from './Velo';
import Xw from '@xirelogy/xw';


/**
 * @class VeloTabs
 * Tabs interaction component
 * @property {HTMLElement} active Currently active tab item element (get/set)
 * @property {string} activeKey Currently active tab item key, if key function is defined (get/set)
 */
export default class VeloTabs {

    /**
     * @constructor
     * @param {HTMLElement} element Tabs container element
     * @param {object} [options] Options
     * @param {function(HTMLElement)} [options.keyFn] Get key for given tab item element
     * @param {string} [options.contentDisplayType='block'] The display type to be used for contents
     * @param {string} [options.persist] Prefix to persist anything relevant to current tabs
     * @param {string} [options.persistKey='key'] Key to persist the currently active key
     */
    constructor(element, options) {
        this._inst = velo.getCurrentProvider('VeloTabs', {
            element: element,
            options: options,
        });

        const _options = Xw.$.defaultable(options, {});
        this._contentDisplayType = Xw.$.defaultable(_options.contentDisplayType, 'block');

        const _optionsPersist = Xw.$.defaultable(_options.persist, null);
        this._persist = (_optionsPersist !== null) ? new Xw.PrefixedPersistable(Xw.bookmarkPersist, _optionsPersist) : null;
        this._persistKey = Xw.$.defaultable(_options.persistKey, 'key');

        Object.defineProperty(this, 'active', {
            get: () => {
                if (this._inst) return this._inst.getActive();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setActive(value);
            }
        });

        Object.defineProperty(this, 'activeKey', {
            get: () => {
                if (this._inst) return this._inst.getActiveKey();
                return null;
            },
            set: (value) => {
                if (this._inst) this._inst.setActiveKey(value);
            }
        });

        this._keysMap = new Map();
        this._elementsMap = new Map();
        this._contentsSet = new Set();

        this._inst.onChange(async (ev) => {
            await this._onChanged(ev);
        });
    }


    /**
     * Subscribe to change event
     * @param {function(*):void} fn Event receiver
     */
    onChange(fn) {
        if (this._inst) this._inst.onChange(fn);
    }


    /**
     * Bind tab item
     * @param {object} source Source specification (either element or key)
     * @param {HTMLElement} [source.element] Source element
     * @param {string} [source.key] Source key
     * @param {object} target Target specification
     * @param {HTMLElement} [target.element] Target content element
     */
    bind(source, target) {
        const _source = Xw.$.requires(source);
        const _sourceElement = Xw.$.defaultable(_source.element, null);
        const _sourceKey = Xw.$.defaultable(_source.key, null);
        const _target = Xw.$.requires(target);

        // Create descriptor
        const desc = {};
        desc.element = Xw.$.defaultable(_target.element, null);

        // Check that either one is satisfied
        if (_sourceKey !== null) {
            // Map keys
            this._keysMap.set(_sourceKey, desc);
        } else if (_sourceElement !== null) {
            // Map elements
            this._elementsMap.set(_sourceElement, desc);
        } else {
            // Force error
            const dummy = Xw.$.requires(_source.element);
        }

        // Post actions
        if (desc.element !== null) {
            this._contentsSet.add(desc.element);
        }
    }


    /**
     * Get corresponding descriptor, if any
     * @param {object} ev
     * @return {object|null} The corresponding descriptor, if any
     * @private
     */
    _getDescFromChangedEvent(ev) {
        const key = Xw.$.defaultable(ev.key);
        if (key !== null) {
            const keyDesc = this._keysMap.get(key) || null;
            if (keyDesc !== null) return keyDesc;
        }

        const element = Xw.$.defaultable(ev.valueElement);
        if (element !== null) {
            const valueDesc = this._elementsMap.get(element) || null;
            if (valueDesc !== null) return valueDesc;
        }

        return null;
    }


    /**
     * Show content for given descriptor, hiding others
     * @param {object} desc
     * @private
     */
    async _showContentForDesc(desc) {
        if (desc.element === null) return;

        for (const element of this._contentsSet.values()) {
            if (element !== desc.element) {
                Xw.doms.hide(element);
            }
        }
        Xw.doms.show(desc.element, this._contentDisplayType);
    }


    /**
     * Handle tab changed
     * @param ev
     * @return {Promise<void>}
     * @private
     */
    async _onChanged(ev) {
        // Persist, if required
        const currentKey = ev.key || null;
        if (this._persist !== null && currentKey !== null) {
            this._persist.save(this._persistKey, currentKey);
        }

        // Reacting on descriptor
        const desc = this._getDescFromChangedEvent(ev);
        if (desc !== null) {
            await this._showContentForDesc(desc);
        }
    }


    /**
     * Get current descriptor, if any
     * @return {object|null} The corresponding descriptor, if any
     * @private
     */
    _getDesc() {
        if (this._inst.hasKey()) {
            const key = this._inst.getActiveKey() || null;
            if (key !== null) {
                const keyDesc = this._keysMap.get(key) || null;
                if (keyDesc !== null) return keyDesc;
            }
        }

        const element = this._inst.getActive();
        if (element !== null) {
            const elementDesc = this._elementsMap.get(element) || null;
            if (elementDesc !== null) return elementDesc;
        }

        return null;
    }


    /**
     * Initialize
     * @return {Promise<void>}
     */
    async init() {
        // May load from bookmark
        if (this._persist && this._inst.hasKey()) {
            const loadKey = this._persist.load(this._persistKey);
            if (loadKey !== null) {
                this._inst.setActiveKey(loadKey);
                return;
            }
        }

        // Refresh
        await this.refresh();
    }


    /**
     * Refresh the tabs
     * @return {Promise<void>}
     */
    async refresh() {
        // Reacting on descriptor
        const desc = this._getDesc();
        if (desc !== null) {
            await this._showContentForDesc(desc);
        }
    }
}