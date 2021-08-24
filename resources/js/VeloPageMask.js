import Xw from '@xirelogy/xw';


class VeloPageMask_Static {

    /**
     * Create or get a page mask
     * @param {string} id ID for the page mask
     * @param {object} [options] Options for page mask
     * @param {number} [options.opacity0=0] Opacity of the mask at hidden level
     * @param {number} [options.opacity1=0.6] Opacity of the mask at shown level
     * @param {number} [options.showMs=300] Time for showing animation, in milliseconds
     * @param {number} [options.hideMs=250] Time for hiding animation, in milliseconds
     * @param {number} [options.zIndex=1000] The z-index for the page mask
     * @param {function} [options.onSetup=null] Initial setup of the page mask
     * @return {VeloPageMask} Created mask element
     */
    create(id, options) {

        const _id = Xw.$.requires(id);
        const _options = Xw.$.defaultable(options, {});
        const _opacity0 = Xw.$.defaultable(_options.opacity0, 0);
        const _opacity1 = Xw.$.defaultable(_options.opacity1, 0.75);
        const _showMs = Xw.$.defaultable(_options.showMs, 300);
        const _hideMs = Xw.$.defaultable(_options.hideMs, 250);
        const _zIndex = Xw.$.defaultable(_options.zIndex, 1000);
        const _onSetup = Xw.$.defaultable(_options.onSetup, null);


        // Ensure element is created
        let isCreated = false;
        let _element = document.getElementById(_id);
        if (_element === null) {
            // Create mask element
            _element = document.createElement('div');
            _element.id = _id;

            // Setup mask style
            _element.style.position = 'absolute';
            _element.style.top = 0;
            _element.style.left = 0;
            _element.style.width = '100vw';
            _element.style.height = '100vh';
            _element.style.backgroundColor = '#000000';
            _element.style.display = 'none';
            _element.style.zIndex = _zIndex;

            // Append to body
            document.body.appendChild(_element);

            // Element is created
            isCreated = true;
        }


        /**
         * @class VeloPageMask
         */
        const ret = {};


        /**
         * Show the mask
         * @return {Promise<void>}
         */
        ret.show = async function() {
            await Xw.doms.animate(_element, {
                opacity: [_opacity0, _opacity1],
            }, {
                duration: _showMs,
                easing: 'linear',
                beforeAnimation: () => {
                    _element.style.display = 'block';
                },
            });
        };

        /**
         * Hide the mask
         * @return {Promise<void>}
         */
        ret.hide = async function() {
            await Xw.doms.animate(_element, {
                opacity: [_opacity1, _opacity0],
            }, {
                duration: _hideMs,
                easing: 'linear',
            });
            _element.style.display = 'none';
        }


        /**
         * Handle click
         * @param {function} fn
         */
        ret.onClick = function(fn) {
            _element.addEventListener('click', (ev) => {
                fn(ev);
            });
        };


        /**
         * Remove the mask
         */
        ret.remove = function() {
            _element.remove();
        };


        // Call onSetup if required
        if (isCreated && _onSetup !== null) {
            _onSetup(ret);
        }

        return ret;
    }
}


const veloPageMask = new VeloPageMask_Static();
export default veloPageMask;