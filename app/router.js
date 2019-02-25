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
  this.route('admin', function() {
    this.route('compositions', function() {
      this.route('new');
      this.route('edit', { path: '/:id' });
    });
  });
});

export default Router;
