/**
 * Serverless function to preserve CSS styling
 * This ensures color themes and styling are preserved during deployment
 */
exports.handler = async function(event, context) {
  // Get the stylesheet content by proxying to the original file
  const path = event.path;
  const cssPath = path.replace('/.netlify/functions/preserve-styles', '');
  
  try {
    return {
      statusCode: 302,
      headers: {
        'Location': cssPath,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Netlify-No-Transform': 'true',
        'Content-Type': 'text/css',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error(`Error preserving styles ${cssPath}:`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to preserve styles' })
    };
  }
}; 