import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime';
import config from './auth-config';

window.regeneratorRuntime = regeneratorRuntime;
//Promise.config({  warnings: {    wForgottenReturn: false  }});


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-auth', (baseConfig) => {
      baseConfig.configure(config);
    })
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
