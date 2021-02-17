import Xw from '@xirelogy/xw';
import velo from '../Velo';
import VeloBootstrapForms from './VeloBootstrapForms';


/**
 * Boot-up functions
 */
export default function boot() {

    Xw.appSetup.init('velo-bootstrap', [], () => {
        const libraryName = 'Xirelogy.Velo.Bootstrap';

        velo.registerProvider(libraryName, 'VeloForms', () => {
            return new VeloBootstrapForms();
        });
    });
}