
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    '@ng-bootstrap':              'node_modules/@ng-bootstrap',
    '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap',
    'ng2-cookies':                'node_modules/ng2-cookies',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    '@ng-bootstrap/ng-bootstrap': { main: 'index.js', defaultExtension: 'js' },
    'ng2-cookies':                { defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Bootstrap packages
  var ngBootstrapPackageNames = [
    'accordion',
    'alert',
    'bundles',
    'buttons',
    'carousel',
    'collapse',
    'dropdown',
    'esm',
    'modal',
    'pagination',
    'popover',
    'progressbar',
    'rating',
    'tabset',
    'timepicker',
    'tooltip',
    'typeahead',
    'util'
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  function ngBootstrapPackIndex(pkgName) {
    packages['@ng-bootstrap/ng-bootstrap/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  ngBootstrapPackageNames.forEach(ngBootstrapPackIndex);

  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
