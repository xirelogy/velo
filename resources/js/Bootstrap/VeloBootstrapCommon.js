import Xw from '@xirelogy/xw';

class VeloBootstrapCommon {
    /**
     * Fade-in animation
     * @param {HTMLElement} target Target element to be animated
     * @param {object} [options] Animation options
     * @param {number} [options.durationMs=300] Animation duration in milliseconds
     * @param {string} [options.easing='linear'] Animation easing
     * @return {Promise<void>}
     */
    async animateFadeIn(target, options) {
        const _target = Xw.$.requires(target);
        const _options = Xw.$.defaultable(options, {});
        const _durationMs = Xw.$.defaultable(_options.durationMs, 300);
        const _easing = Xw.$.defaultable(_options.easing, 'linear');

        await Xw.doms.animate(_target, {
            opacity: ['0', '100'],
        }, {
            duration: _durationMs,
            easing: _easing,
            beforeAnimation: () => {
                Xw.doms.show(_target);
            },
        });
    }


    /**
     * Fade-out animation
     * @param {HTMLElement} target Target element to be animated
     * @param {object} [options] Animation options
     * @param {number} [options.durationMs=250] Animation duration in milliseconds
     * @param {string} [options.easing='linear'] Animation easing
     * @return {Promise<void>}
     */
    async animateFadeOut(target, options) {
        const _target = Xw.$.requires(target);
        const _options = Xw.$.defaultable(options, {});
        const _durationMs = Xw.$.defaultable(_options.durationMs, 250);
        const _easing = Xw.$.defaultable(_options.easing, 'linear');

        await Xw.doms.animate(_target, {
            opacity: ['100', '0'],
        }, {
            duration: _durationMs,
            easing: _easing,
        });

        Xw.doms.hide(_target);
    }
}


const veloBootstrapCommon = new VeloBootstrapCommon();
export default veloBootstrapCommon;