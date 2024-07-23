import Meta from 'gi://Meta';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

let _windowCreatedId;

export default class ExampleExtension extends Extension {
    enable() {
        this._windowCreatedId = global.display.connect('window-created', (d, win) =>
            win.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL)
        );
    }

    disable() {
        global.display.disconnect(this._windowCreatedId);
    }
}
