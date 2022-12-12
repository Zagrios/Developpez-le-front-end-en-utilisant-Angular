import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

    private globalHandlerRegistred = false;
    
    constructor() {
        super();

        this.registerGlobalEventHandler();
    }

    private registerGlobalEventHandler(): void{
        if(this.globalHandlerRegistred){
            return;
        }

        window.addEventListener("error", e => this.handle(e.error));
    }

    public handle(error: Error): void{
        super.handleError(error);
    }
}
