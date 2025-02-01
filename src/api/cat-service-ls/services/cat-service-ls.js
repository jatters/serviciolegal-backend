'use strict';

/**
 * cat-service-ls service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cat-service-ls.cat-service-ls');
