'use strict';

/**
 * policy-ls service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::policy-ls.policy-ls');
