import Xw from '@xirelogy/xw';
import velo from '../Velo';
import VeloBootstrapButtons from './VeloBootstrapButtons';
import VeloBootstrapDialogs from './VeloBootstrapDialogs';
import VeloBootstrapForms from './VeloBootstrapForms';
import VeloBootstrapPopMenus from './VeloBootstrapPopMenus';


/**
 * Boot-up functions
 */
export default function boot() {

    Xw.appSetup.init('velo-bootstrap', [], () => {
        const libraryName = 'Xirelogy.Velo.Bootstrap';

        velo.registerProvider(libraryName, 'VeloButtons', () => {
            return new VeloBootstrapButtons();
        });
        velo.registerProvider(libraryName, 'VeloDialogs', () => {
            return new VeloBootstrapDialogs();
        });
        velo.registerProvider(libraryName, 'VeloForms', () => {
            return new VeloBootstrapForms();
        });
        velo.registerProvider(libraryName, 'VeloPopMenus', () => {
            return new VeloBootstrapPopMenus();
        });
    });
}