import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
@inject(Router)
export class NavBar {
    constructor(router) {
        this.authenticated = false;
        this.router = router;
        this.email = "";
        this.password = "";
    }

    attached(){
        $( '.navbar-nav a' ).on( 'click', function () {
        $( '.navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
        $( this ).parent( 'li' ).addClass( 'active' );
        });
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
