import Xw from '@xirelogy/xw';


/**
 * Get the parent input-group for a given control
 * @param {HTMLElement} control
 * @param {HTMLElement|null}
 */
function getControlParentInputGroup(control) {
    const parentElement = control.parentElement;
    if (parentElement === null) return null;

    if (!parentElement.classList.contains('form-group')) return null;

    return parentElement;
}


export default class VeloBootstrapForms {

    /**
     * Reset control's validity
     * @param {HTMLElement} control Target control to be set invalid
     */
    resetControlValidity(control) {
        control.classList.remove('is-invalid');
        control.classList.remove('is-valid');

        const inputGroup = getControlParentInputGroup(control);
        if (inputGroup) {
            inputGroup.querySelectorAll('.valid-feedback')[0]?.remove();
            inputGroup.querySelectorAll('.invalid-feedback')[0]?.remove();
        }

    }


    /**
     * Set control as invalid
     * @param {HTMLElement} control Target control to be set invalid
     * @param {Error} [e] Associated error
     */
    setControlInvalid(control, e) {
        control.classList.add('is-invalid');

        const inputGroup = getControlParentInputGroup(control);
        if (inputGroup) {
            inputGroup.querySelectorAll('.invalid-feedback')[0]?.remove();

            if (e) {
                const divElement = document.createElement('div');
                divElement.classList.add('invalid-feedback');
                divElement.innerHTML = Xw.$.escapeHtml(e.message);

                inputGroup.appendChild(divElement);
            }
        }
    }


    /**
     * Set control as valid
     * @param {HTMLElement} control Target control to be set valid
     */
    setControlValid(control) {
        control.classList.add('is-valid');
    }
}