/* globals najax */
import Ember from 'ember';

const { get } = Ember;

var nodeAjax = function(options) {
  let httpRegex = /^https?:\/\//;
  let protocolRelativeRegex = /^\/\//;
  let protocol = get(this, 'fastboot.request.protocol');

  if (protocolRelativeRegex.test(options.url)) {
    options.url = protocol + options.url;
  } else if (!httpRegex.test(options.url)) {
    try {
      // TODO: revert to this: hoptions.url = protocol + '//' + get(this, 'fastboot.request.host') + options.url;
      options.url = options.url
    } catch (fbError) {
      throw new Error('You are using Ember Data with no host defined in your adapter. This will attempt to use the host of the FastBoot request, which is not configured for the current host of this request. Please set the hostWhitelist property for in your environment.js. FastBoot Error: ' + fbError.message);
    }
  }

  return new Ember.RSVP.Promise((resolve, reject) => {
    $.ajax(options)
      .then((a) => resolve(a))
      .catch((error) => reject(error));
  }); // NOTE: maybe Promise is unnecessary
};

export default {
  name: 'ajax-service',

  initialize: function(application) {
    application.register('ajax:node', nodeAjax, { instantiate: false });
    application.inject('adapter', '_ajaxRequest', 'ajax:node');
    application.inject('adapter', 'fastboot', 'service:fastboot');
  }
};
