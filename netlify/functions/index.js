/**
 * Index file to export all Netlify functions
 * This ensures proper function discovery
 */

const assetOptimizationBypass = require('./asset-optimization-bypass');
const preserveStyles = require('./preserve-styles');

// Export all functions
module.exports = {
  assetOptimizationBypass,
  preserveStyles
};
