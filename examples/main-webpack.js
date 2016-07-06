require(["knockout", "./modules/app", "knockout-amd-helpers"], function(ko, App) {
  //require("./foundation/css/normalize.css");
  //require("./foundation/css/foundation.css");

  // MARK: knockout-amd-helpers
  //ko.bindingHandlers.module.baseDir = "modules";
  ko.bindingHandlers.module.templateProperty = "embeddedTemplate";
  ko.amdTemplateEngine.defaultSuffix = ".tmpl.html";

  var moduleContext = require.context("./knockout-modules", true /*, /^.*\.js$/*/);
  var templateContext = require.context("./knockout-templates", true, /.tmpl.html$/);

  console.log('moduleContext', moduleContext.keys());
  console.log('templateContext', templateContext.keys());

  ko.bindingHandlers.module.loader = function( moduleName, done ) {
    var mod = moduleContext( "./" + moduleName );
    done( mod );
  }

  ko.amdTemplateEngine.loader = function( templateName, done ) {
    var template = templateContext( "./" + templateName + ko.amdTemplateEngine.defaultSuffix );
    done( template );
  }

  ko.applyBindings(new App());
});
