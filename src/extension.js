import Meta from 'gi://Meta';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import {PACKAGE_VERSION} from 'resource:///org/gnome/shell/misc/config.js';

// GNOME Shell 49 dropped the flags argument from Meta.Window.maximize().
const MAXIMIZE_TAKES_FLAGS = parseInt(PACKAGE_VERSION.split('.')[0], 10) < 49;

export default class MaximizedByDefaultExtension extends Extension {
    enable() {
        this._windowCreatedId = global.display.connect('window-created', (d, win) =>
            this._maximize(win)
        );
    }

    disable() {
        global.display.disconnect(this._windowCreatedId);
    }

    _maximize(win) {
        if (MAXIMIZE_TAKES_FLAGS)
            win.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
        else
            win.maximize();
    }
}
