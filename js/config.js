requirejs.config({
    //The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.
    waitSeconds: 0,
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'jquery-3.3.1.min',
        bootstrap: 'bootstrap.bundle.min',
        app: '../app/app'
    },
  
    shim: {
        bootstrap: {
          deps: ['jquery'],
          exports: 'bootstrap'
        },
      
        app: {
          deps: ['jquery'],
          eports: 'app'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'bootstrap', 'app'],
function   ($) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
  
});