import Xw from '@xirelogy/xw';

const CLASSNAME_ACTIVE = 'active';

const CLASSNAME_DISABLED = 'disabled';

const CLASSNAME_TYPE_LI = 'page-item';

const CLASSNAME_TYPE_A = 'page-link';

/**
 * Decode element for page information
 * @param {HTMLElement} liElement Target element (LI)
 * @param {object} flags Flag receivers
 */
function decodeElement(liElement, flags) {
    if (liElement.nodeName.toLowerCase() != 'li') return null;
    if (!liElement.classList.contains(CLASSNAME_TYPE_LI)) return null;
    if (liElement.classList.contains(CLASSNAME_ACTIVE)) flags.isActive = true;

    switch (liElement.dataset['kind']) {
        case 'prev':
        case 'more':
        case 'next':
            return null;
    }

    const aElement = liElement.firstChild;
    if (aElement === null) return null;
    if (aElement.nodeName.toLowerCase() != 'a') return null;
    if (!aElement.classList.contains(CLASSNAME_TYPE_A)) return null;

    if (Xw.$.isDefined(aElement.dataset['value'])) return parseInt(aElement.dataset['value']);

    return parseInt(aElement.innerText);
}


/**
 * Create page element
 * @param {number} thisPage
 * @param {number} activePage
 * @param {function():void} fn
 * @return {HTMLElement}
 */
function createPageElement(thisPage, activePage, fn) {
    const liElement = document.createElement('li');
    liElement.classList.add(CLASSNAME_TYPE_LI);
    if (thisPage === activePage) liElement.classList.add(CLASSNAME_ACTIVE);

    const aElement = document.createElement('a');
    aElement.classList.add(CLASSNAME_TYPE_A);
    aElement.setAttribute('href', '#');

    aElement.innerText = thisPage.toString();
    aElement.addEventListener('click', (ev) => {
        fn(liElement, thisPage, ev);
    });

    liElement.appendChild(aElement);
    return liElement;
}


/**
 * Create 'more' element
 * @return {HTMLElement}
 */
function createMoreElement() {
    const liElement = document.createElement('li');
    liElement.classList.add(CLASSNAME_TYPE_LI);
    liElement.classList.add(CLASSNAME_DISABLED);
    liElement.setAttribute('data-kind', 'more');

    const aElement = document.createElement('a');
    aElement.classList.add(CLASSNAME_TYPE_A);
    aElement.setAttribute('href', '#');
    aElement.setAttribute('tabindex', '-1');

    aElement.innerText = '...';

    liElement.appendChild(aElement);
    return liElement;
}



export default class VeloBootstrapPaginator {

    /**
     * @constructor
     * @param {*} args
     */
    constructor(args) {
        this._element = Xw.$.requires(args.element);
        const _options = Xw.$.defaultable(args.options, {});

        const ulElement = this._element.firstChild;
        if (ulElement === null) throw new Xw.UnsupportedError();
        if (ulElement.nodeName.toLowerCase() != 'ul') throw new Xw.UnsupportedError();
        if (ulElement.classList.contains('paginator')) throw new Xw.UnsupportedError();

        let activePage = null;
        let minPage = null;
        let maxPage = null;

        for (const liElement of ulElement.children) {
            const flags = {};
            const thisPage = decodeElement(liElement, flags);
            if (thisPage === null) continue;

            if (Xw.$.isDefined(flags.isActive)) activePage = thisPage;
            if (minPage === null || thisPage < minPage) minPage = thisPage;
            if (maxPage === null || thisPage > maxPage) maxPage = thisPage;
        }

        this._ulElement = ulElement;
        this._activePage = activePage;
        this._maxPage = maxPage;
        this._maxDisplayPages = Xw.$.defaultable(_options.maxDisplayPages, 7);
        if (this._maxDisplayPages < 5) this._maxDisplayPages = 5;
        this._onSelect = new Xw.EventListeners();
    }


    /**
     * Get current page
     * @return {number|null}
     */
    getCurrentPage() {
        return this._activePage;
    }


    /**
     * Set current page
     * @param {number} value
     */
    setCurrentPage(value) {
        this._activePage = value;
        this._repopulate();
    }


    /**
     * Get total pages
     * @return {number|null}
     */
    getTotalPages() {
        return this._maxPage;
    }


    /**
     * Set total pages
     * @param {number} value
     */
    setTotalPages(value) {
        this._maxPage = value;
        this._repopulate();
    }


    /**
     * Repopulate the elements
     * @private
     */
    _repopulate() {
        // Must have active page and max page
        if (this._activePage === null || this._maxPage === null) return;

        // Separate page type
        let prevElement = null;
        let nextElement = null;
        const deleteElements = [];
        for (const liElement of this._ulElement.children) {
            switch (liElement.dataset['kind']) {
                case 'prev':
                    prevElement = liElement;
                    break;
                case 'next':
                    nextElement = liElement;
                    break;
                default:
                    deleteElements.push(liElement);
                    break;
            }
        }

        // Delete everything unnecessary
        if (prevElement === null || nextElement === null) return;
        for (const deleteElement of deleteElements) {
            deleteElement.remove();
        }

        // Setup prev/next
        prevElement.classList.remove(CLASSNAME_DISABLED);
        nextElement.classList.remove(CLASSNAME_DISABLED);
        if (this._activePage === 1) prevElement.classList.add(CLASSNAME_DISABLED);
        if (this._activePage === this._maxPage) nextElement.classList.add(CLASSNAME_DISABLED);

        // Handle function
        const pageFn = (element, page, ev) => {
            const newEv = new CustomEvent('select');
            newEv.pageElement = element;
            newEv.page = page;
            newEv.parentEvent = ev;
            this._onSelect.dispatch(newEv);
        };

        if (this._maxPage > this._maxDisplayPages) {
            // Fit into display spans
            let span = this._maxDisplayPages - 2;
            if (span < 1) span = 1;

            if (this._activePage <= (span - 1)) {
                // Head style (xx xx xx xx .. xx)
                for (let i = 0; i < span; ++i) {
                    this._ulElement.insertBefore(createPageElement(i + 1, this._activePage, pageFn), nextElement);
                }
                this._ulElement.insertBefore(createMoreElement(), nextElement);
                this._ulElement.insertBefore(createPageElement(this._maxPage, this._activePage, pageFn), nextElement);

            } else if (this._activePage > (this._maxPage - span + 1)) {
                // Tail style (xx .. xx xx xx xx)
                this._ulElement.insertBefore(createPageElement(1, this._activePage, pageFn), nextElement);
                this._ulElement.insertBefore(createMoreElement(), nextElement);
                for (let i = this._maxPage - span; i < this._maxPage; ++i) {
                    this._ulElement.insertBefore(createPageElement(i + 1, this._activePage, pageFn), nextElement);
                }
            } else {
                // Middle style
                this._ulElement.insertBefore(createPageElement(1, this._activePage, pageFn), nextElement);
                this._ulElement.insertBefore(createMoreElement(), nextElement);

                let slots = this._maxDisplayPages - 4;
                if (slots < 1) slots = 1;

                if ((slots % 2) != 0) {
                    // Odd number, divide evenly
                    const sides = (slots - 1) / 2;
                    for (let i = this._activePage - sides; i <= this._activePage + sides; ++i) {
                        this._ulElement.insertBefore(createPageElement(i, this._activePage, pageFn), nextElement);
                    }
                } else {
                    // Even number, choose a heavy end
                    const sides = (slots - 2) / 2;
                    const isHeadHeavy = this._activePage < parseInt(Math.floor(this._activePage / 2));
                    const start = this._activePage - sides - (isHeadHeavy ? 1 : 0);
                    const end = this._activePage + sides + (isHeadHeavy ? 0 : 1);
                    for (let i = start; i <= end; ++i) {
                        this._ulElement.insertBefore(createPageElement(i, this._activePage, pageFn), nextElement);
                    }
                }

                this._ulElement.insertBefore(createMoreElement(), nextElement);
                this._ulElement.insertBefore(createPageElement(this._maxPage, this._activePage, pageFn), nextElement);
            }
        } else {
            for (let i = 0; i < this._maxPage; ++i) {
                this._ulElement.insertBefore(createPageElement(i + 1, this._activePage, pageFn), nextElement);
            }
        }
    }


    /**
     * Subscribe to page selected event
     * @param {function(*):void} fn Event receiver
     */
    onSelect(fn) {
        return this._onSelect.subscribe(fn);
    }
}