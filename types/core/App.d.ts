import {ModuleSystem} from './ModuleSystem';
import {Loop} from './Loop';

export class App extends ModuleSystem {
    /**
     * Creates a new App without modules
     */
    constructor();

    /**
     * Creates a new App with modules
     */
    constructor(modules: Array<any>);

    /**
     * Start this app
     */
    start(): void;

    /**
     * Add a loop to this app
     */
    addLoop(loop: Loop): void;

    /**
     * Removes a loop to this app
     */
    removeLoop(loop: Loop): void;
}
