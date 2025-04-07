import { defineConfig } from 'vite';

export default defineConfig({
  // Prevent asset optimizations that might break functionality
  build: {
    // Preserve CSS custom properties
    cssCodeSplit: true,
    cssMinify: false,
    
    // Prevent asset optimization
    minify: false,
    
    // Preserve file names to match redirects
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    
    // Ensure styles.css is directly accessible
    assetsInlineLimit: 0,
  },
  
  // Properly handle assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.mp4'],
  
  // Configure server
  server: {
    host: true
  }
}); 