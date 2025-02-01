'use strict';

/**
 * term-ls service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::term-ls.term-ls');
