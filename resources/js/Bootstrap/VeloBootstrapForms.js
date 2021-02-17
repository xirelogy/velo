export default class VeloBootstrapForms {

    /**
     * Reset control's validity
     * @param {HTMLElement} control Target control to be set invalid
     */
    resetControlValidity(control) {
        control.classList.remove('is-invalid');
        control.classList.remove('is-valid');
    }


    /**
     * Set control as invalid
     * @param {HTMLElement} control Target control to be set invalid
     */
    setControlInvalid(control) {
        control.classList.add('is-invalid');
    }


    /**
     * Set control as valid
     * @param {HTMLElement} control Target control to be set valid
     */
    setControlValid(control) {
        control.classList.add('is-valid');
    }
}