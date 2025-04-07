// This function ensures critical assets are not optimized by Netlify
exports.handler = async function(event, context) {
  // Get requested path
  const path = event.path;
  
  // List of critical assets that should bypass optimization
  const criticalAssets = [
    '/src/assets/images/hero-eyeglass.png',
    '/src/assets/images/product-overview.gif',
    '/src/assets/videos/editedTSonic.mp4'
  ];
  
  // Check if the requested path is a critical asset
  if (criticalAssets.some(asset => path.includes(asset))) {
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Netlify-No-Transform': 'true'
      },
      body: JSON.stringify({
        message: 'Critical asset detected, bypassing optimization'
      })
    };
  }
  
  // For non-critical assets, let Netlify handle as normal
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Normal asset processing'
    })
  };
}; 