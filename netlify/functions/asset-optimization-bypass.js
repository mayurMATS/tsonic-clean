/**
 * Serverless function to bypass Netlify's asset optimization
 * This preserves critical assets that should not be transformed
 */
exports.handler = async function(event, context) {
  const path = event.path;
  const assetPath = path.replace('/.netlify/functions/asset-optimization-bypass', '');
  
  // Get asset file type for setting correct content-type headers
  let contentType = 'application/octet-stream';
  if (assetPath.endsWith('.png')) {
    contentType = 'image/png';
  } else if (assetPath.endsWith('.jpg') || assetPath.endsWith('.jpeg')) {
    contentType = 'image/jpeg';
  } else if (assetPath.endsWith('.gif')) {
    contentType = 'image/gif';
  } else if (assetPath.endsWith('.mp4')) {
    contentType = 'video/mp4';
  } else if (assetPath.endsWith('.css')) {
    contentType = 'text/css';
  } else if (assetPath.endsWith('.js')) {
    contentType = 'application/javascript';
  }
  
  // Log to Netlify functions log for debugging
  console.log(`Bypassing optimization for asset: ${assetPath}`);
  
  try {
    // Instead of handling the asset directly, redirect to the original
    // with headers that prevent transformation
    return {
      statusCode: 302,
      headers: {
        'Location': assetPath,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Netlify-No-Transform': 'true',
        'Content-Type': contentType
      }
    };
  } catch (error) {
    console.error(`Error handling asset ${assetPath}:`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process asset' })
    };
  }
}; 