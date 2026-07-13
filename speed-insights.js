// Vercel Speed Insights initialization
// This script loads and initializes the Speed Insights tracker
// Following the official Vercel Speed Insights documentation for static sites
(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // Load the Speed Insights script from Vercel's CDN
  // When deployed to Vercel, this path is automatically available
  // For local development, this will not send any data
  var script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '2.0.0';
  script.onerror = function() {
    // Silently fail if the script is not available (e.g., in local development)
    console.debug('Speed Insights not available (expected in local development)');
  };
  document.head.appendChild(script);
})();
