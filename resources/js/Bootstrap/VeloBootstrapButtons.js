import Xw from '@xirelogy/xw';


export default class VeloBootstrapButtons {

    /**
     * Start a finalizable with the button state busy
     * @param {HTMLButtonElement} target Target button element
     * @param {string} [textHTML] Alternative text (HTML) to replace the original
     * @return {XwFinalizable} A finalizable handle
     */
    startBusy(target, textHTML) {

        const _target = Xw.$.requires(target);
        const _textHTML = Xw.$.defaultable(textHTML, target.innerHTML);

        const oldHTML = target.innerHTML;

        return new Xw.CommonFinalizable({
            onInit: () => {
                const loadingElement = document.createElement('div');
                loadingElement.setAttribute('role', 'status');
                loadingElement.classList.add('spinner-border');
                loadingElement.classList.add('spinner-border-sm');

                const spanElement = document.createElement('span');
                spanElement.classList.add('sr-only');
                spanElement.innerHTML = 'Loading...';
                loadingElement.appendChild(spanElement);

                _target.innerHTML = loadingElement.outerHTML + ' ' + _textHTML;
                _target.disabled = true;
            },
            onFinal: () => {
                _target.innerHTML = oldHTML;
                _target.disabled = false;
            },
        });
    }


    /**
     * Check if the button is currently busy
     * @param {HTMLButtonElement} target Target button element
     */
    isBusy(target) {
        return target.disabled;
    }

}