import velo from './Velo';
import Xw from '@xirelogy/xw';

/**
 * Default key to persist item count
 * @type {string}
 */
const DEFAULT_PERSIST_COUNT = 'count';

/**
 * Default key to persist scroll
 * @type {string}
 */
const DEFAULT_PERSIST_SCROLL = 'scroll';

/**
 * Default split, unless otherwise specified
 * @type {number}
 */
const DEFAULT_SPLIT = 10;


/**
 * Support for scroll-for-more, or so called infinity scroll
 */
export default class VeloScrollForMore {

    /**
     * Constructor
     * @param {HTMLElement} outerElement The outer element (providing scroll)
     * @param {HTMLElement} innerElement The inner element (providing content)
     * @param {object} [options] Options
     */
    constructor(outerElement, innerElement, options) {

        this._outerElement = Xw.$.requires(outerElement);
        this._innerElement = Xw.$.requires(innerElement);
        const _options = Xw.$.defaultable(options, {});

        // Process options
        this._onLoad = Xw.$.requires(_options.onLoad);
        this._onItem = Xw.$.requires(_options.onItem);
        this._onStartBusy = Xw.$.defaultable(_options.onStartBusy);
        this._onEndBusy = Xw.$.defaultable(_options.onEndBusy);
        this._onNoMore = Xw.$.defaultable(_options.onNoMore);
        this._onClear = Xw.$.defaultable(_options.onClear);
        this._split = Xw.$.defaultable(_options.split, DEFAULT_SPLIT);

        const _persist = Xw.$.defaultable(_options.persist);
        this._persist = _persist !== null ? new Xw.PrefixedPersistable(Xw.bookmarkPersist, _persist) : null;
        this._persistCount = Xw.$.defaultable(_options.persistCount, DEFAULT_PERSIST_COUNT);
        this._persistScroll = Xw.$.defaultable(_options.persistScroll, DEFAULT_PERSIST_SCROLL);

        // Setup variables
        this._isBusy = false;
        this._isFinal = false;
        this._totalItems = 0;

        // Handle scroll event
        this._outerElement.addEventListener('scroll', (ev) => {
            const outerHeight = this._outerElement.clientHeight;
            const innerHeight = this._innerElement.clientHeight;
            const scrollTop = this._outerElement.scrollTop;

            // Save scroll
            this._persistSave(this._persistScroll, scrollTop);

            // Handle scroll-for-more
            if ((scrollTop + outerHeight + 1) >= innerHeight) {
                this._onScrollForMore();
            }
        });

        // Defer initialization
        Xw.axw.fork(async () => {
            await this._onInit();
        });
    }


    /**
     * Reload everything
     * @return {Promise<void>}
     */
    async reload() {
        this._isFinal = false;
        this._totalItems = 0;
        if (this._onClear !== null) this._onClear();

        if (this._persist) {
            this._persist.delete(this._persistScroll);
            this._persist.delete(this._persistCount);
        }

        await this._onScrollForMore();
    }


    /**
     * Handle initialization
     * @private
     */
    async _onInit() {
        const count = this._persistLoad(this._persistCount);
        if (count === null || count <= 0 || count <= this._split) {
            await this._onScrollForMore();
        } else {
            await this._onScrollForMore(parseInt(count));

            // Restore scroll after loading
            const scroll = this._persistLoad(this._persistScroll);
            if (scroll !== null) this._outerElement.scrollTop = scroll;
        }
    }


    /**
     * Handle scroll for more
     * @param {number} [split] Number of items to load
     * @private
     */
    async _onScrollForMore(split) {

        if (this._isFinal) return;
        if (this._isBusy) return;

        const _split = Xw.$.defaultable(split, this._split);

        // Define context
        const _this = this;
        const context = new function() {
            /**
             * Notification of item loaded
             * @param {*[]} item Current item loaded
             */
            this.onItems = function(items) {

                let count = 0;
                for (const item of items) {
                    ++count;
                    ++_this._totalItems;
                    _this._persistSave(_this._persistCount, _this._totalItems);

                    _this._onItem(item);
                }

                if (count === 0 || count < _split) {
                    _this._isFinal = true;
                    if (_this._onNoMore !== null) _this._onNoMore();
                }
            };


            /**
             * @property {number} split
             * Number of items to load
             */
            Object.defineProperty(this, 'split', {
                get: () => {
                    return _split;
                },
            });
        };

        // The busy finalizable
        const busyFinal = new Xw.CommonFinalizable({
            data: {},
            onInit: (data) => {
                this._isBusy = true;
                if (this._onStartBusy !== null) this._onStartBusy(data);
            },
            onFinal: (data) => {
                this._isBusy = false;
                if (this._onEndBusy !== null) this._onEndBusy(data);
            },
        });

        try {
            await this._onLoad(context);
        } finally {
            busyFinal.final();
        }

    }


    /**
     * Load value from persistence store
     * @param {string} key Persistence key
     * @return {*}
     * @private
     */
    _persistLoad(key) {
        if (this._persist === null) return null;
        return this._persist.load(key);
    }


    /**
     * Save value to persistence store
     * @param {string} key Persistence key
     * @param {*} value Value to be stored
     * @private
     */
    _persistSave(key, value) {
        if (this._persist === null) return;
        this._persist.save(key, value);
    }
}