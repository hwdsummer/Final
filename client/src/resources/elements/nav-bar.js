import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
@inject(Router)
export class NavBar {
    constructor(router) {
        this.authenticated = false;
        this.router = router;
    }
    
    login() {
        console.log(this.email);
        console.log(this.password);
        this.authenticated = true;
        this.router.navigate('home');
    }
    logout() {
        this.authenticated = false;
        this.router.navigate('landing');
    }
}
