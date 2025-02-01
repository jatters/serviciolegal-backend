'use strict';

/**
 * company-ls service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::company-ls.company-ls');
