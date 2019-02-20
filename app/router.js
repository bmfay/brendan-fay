import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('main', { path: '/' }, function() {
    this.route('music');
    this.route('photo');
    this.route('film');
    this.route('misc');
  });
});

export default Router;
