var path = require('path'),
  async = require('async'),
  fs = require('fs'),
  B2G_BIN_OSX = 'b2g/B2G.app/Contents/MacOS/b2g-bin',
  os = process.platform,
  FX_PROFILES_OSX = 'Library/Application Support/Firefox/Profiles',
  B2G_BIN_LINUX = 'b2g/b2g-bin',
  FX_PROFILES_LINUX = '.mozilla/firefox',
  simulator_regex = /fxos_(.*)_simulator@mozilla.org$/;

var HOME = getUserHome();
var FX_PROFILES;
var B2G_BIN;

if (os == 'darwin') {
  FX_PROFILES = path.join(HOME, FX_PROFILES_OSX);
  B2G_BIN = B2G_BIN_OSX;
} else
if (os == 'linux') {
  FX_PROFILES = path.join(HOME, FX_PROFILES_LINUX);
  B2G_BIN = B2G_BIN_LINUX;
}

module.exports = findB2G;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function matchSimulator(extension) {
  return simulator_regex.exec(extension);
}

function extensionsExist(profile) {
  var extensions_path = path.join(FX_PROFILES, profile, 'extensions');
  return fs.existsSync(extensions_path);
}

function findB2G (opts, callback) {

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }


  var b2g_profiles = [];

  fs.readdir(FX_PROFILES, function (err, profiles) {

    // Filter profiles that don't have extensions
    profiles = profiles.filter(extensionsExist);

    // Iterate through all the profiles to find extensions
    async.each(profiles, function (profile, next) {

      var extensions_path = path.join(FX_PROFILES, profile, 'extensions');

      // Iterate in each extension to find simulators
      fs.readdir(extensions_path, function(err, extensions) {
        
        async.each(extensions, function(extension, callback) {
        
          var matches = matchSimulator(extension);
          if (matches && matches[1]) {
            var version = matches[1].replace('_','.');

            // if we want a specific version, skip it
            if (opts.version && opts.version != version)
              return callback(null);

            b2g_profiles.push({
              version: version,
              bin: path.join(extensions_path, extension, B2G_BIN),
              profile: path.join(extensions_path, extension, 'profile')
            });
          }

          callback(null);
        }, next);

      });

    }, function(err) {
      callback(err, b2g_profiles);
    });

  });


}

if (require.main === module) {
  (function() {
    findB2G(function(err, b2gs){
      console.log("Firefox OS binaries found:", b2gs);
    });
  })();
}
