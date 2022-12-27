import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

    private globalHandlerRegistred = false;
    
    constructor() {

        super();

        // Register errors listerner
        this.registerGlobalEventHandler();

    }

    /**
     * Register a global errors listerner to handle all error can happen
     * @returns {void}
     */
    private registerGlobalEventHandler(): void{

        if(this.globalHandlerRegistred){
            return;
        }

        // Add global error listener to log all errors can happen
        window.addEventListener("error", e => this.handle(e.error));
    }

    /**
     * Handle error
     * @param {Error} error 
     */
    public handle(error: Error): void{
        super.handleError(error);
    }
}
