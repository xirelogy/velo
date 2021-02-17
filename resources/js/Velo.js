import Xw from '@xirelogy/xw';


/**
 * All registered providers
 * @type {object}
 * @private
 */
const _providers = {};


/**
 * Make provider key
 * @param {string} libraryName The library name
 * @param {string} className The class name
 * @return {string} Corresponding key
 */
function makeKey(libraryName, className) {
    return libraryName + '::' + className;
}


class Velo {

    /**
     * Register a provider
     * @param {string} libraryName The library name
     * @param {string} className The class name
     * @param {function():*} fn Factory function to create the provider
     */
    registerProvider(libraryName, className, fn) {
        const key = makeKey(libraryName, className);
        _providers[key] = fn;
    }


    /**
     * Get current provider
     * @param {string} className The class name
     * @return {*|null} The current provider, if available
     */
    getCurrentProvider(className) {
        const currentLibraryName = window.$velo || '';
        const key = makeKey(currentLibraryName, className);

        if (!Xw.$.isDefined(_providers[key])) return null;
        return (_providers[key])();
    }
    
}


const velo = new Velo();


export default velo;