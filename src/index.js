import { buildCustomElementConstructor, register } from 'lwc';
import { registerWireService } from '@lwc/wire-service';
import UiApp from 'ui/app';

registerWireService(register);

customElements.define('ui-app', buildCustomElementConstructor(UiApp));
