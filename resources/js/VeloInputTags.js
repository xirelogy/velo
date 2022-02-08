import velo from './Velo';
import Xw from '@xirelogy/xw';


/**
 * Parse value, separating by tags
 * @param {string} value
 * @param {string} separator
 * @return {string[]}
 */
function parseValue(value, separator) {
    if (typeof value !== 'string') return [];
    return value.split(separator);
}


/**
 * @class VeloInputTags
 * Input for multiple tags
 */
export default class VeloInputTags {
    /**
     * @constructor
     * @param {HTMLElement} element Main element
     * @param {object} [options] Options
     * @param {string} [options.separator] Tag separator character, defaults to comma (,)
     * @param {function(string, function):string} [options.translate] Tag translation function
     */
    constructor(element, options) {
        // Specify defaults
        const _defaultTranslate = (value, prevTranslate) => {
            return value.trim();
        }
        const _defaultSeparator = element.dataset.separator || ',';

        // Process options
        const _options = Xw.$.defaultable(options, {});
        const _separator = Xw.$.defaultable(_options.separator, _defaultSeparator);
        const _translate = Xw.$.defaultable(_options.translate, _defaultTranslate);

        // Create the translator function
        const _translator = (value) => {
            return _translate(value, _defaultTranslate);
        }

        // Create the parser function
        const _parser = (value) => {
            const parsedValues = [];
            for (const parsedValue of parseValue(value, _separator)) {
                const translatedValue = _translator(parsedValue);
                if (Xw.strings.isEmpty(translatedValue)) continue;
                parsedValues.push(translatedValue);
            }
            return parsedValues;
        }

        // Listen to 'change' event raised from children
        const _onChanged = () => {
            const inputEv = new InputEvent('input');
            element.dispatchEvent(inputEv);

            const changeEv = new Event('change');
            element.dispatchEvent(changeEv);
        };

        // Define the implementation instance
        this._inst = velo.getCurrentProvider('VeloInputTags', {
            element: element,
            options: options,
            separator: _separator,
            translator: _translator,
            parser: _parser,
            onChanged: _onChanged,
        });

        // Define the 'value'
        Object.defineProperty(element, 'value', {
            get: () => {
                const tags = this._inst.getTags();
                const inputValue = this._inst.getInputValue();

                if (!Xw.strings.isEmpty(inputValue)) {
                    tags.push(inputValue);
                }

                return tags.join(_separator);
            },
            set: (value) => {
                this._inst.setValue(_parser(value), '');
            },
        });

        // Define the 'valueTags'
        Object.defineProperty(element, 'valueTags', {
            get: () => {
                return this._inst.getTags();
            },
            set: (values) => {
                const translatedValues = [];
                for (const value of values) {
                    const translatedValue = _translator(value);
                    if (Xw.strings.isEmpty(translatedValue)) continue;
                    translatedValues.push(translatedValue);
                }
                this._inst.setValue(translatedValues, '');
            }
        });

        // Friendly to Xw.Interacts
        element.dataset['xwInteractsBind'] = 'valueTags';

        // Accept from attribute
        const valueAttr = element.attributes.getNamedItem('value');
        if (valueAttr) element.value = valueAttr.value;
    }
}