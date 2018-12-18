import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 

    config.map([{
        route: [ 'home'],
        moduleId: './modules/home',
        name: 'Home',
        auth: true 


      },
      {
        route: ['','landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false

      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users'
      },
      {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'helpTickets'
      }
    ]);
  }
}
