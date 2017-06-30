import {App} from './App';

export class Loop {
    /**
     * Creates a new loop
     */
    constructor(func: Function, useClock?: Boolean);

    /**
     * Add the loop to the app and executes it function
     */
    start(app: App): void;

    /**
     * Stop the loop function and remove from app
     */
    stop(app: App): void;

    /**
     * Executes the function
     */
    execute(): void;
}
