require(["knockout", "./modules/app", "knockout-amd-helpers"], function(ko, App) {
  //require("./foundation/css/normalize.css");
  //require("./foundation/css/foundation.css");

  // MARK: knockout-amd-helpers
  //ko.bindingHandlers.module.baseDir = "modules";
  ko.bindingHandlers.module.templateProperty = "embeddedTemplate";
  ko.amdTemplateEngine.defaultSuffix = ".tmpl.html";

  let moduleContext = require.context("./knockout-modules", true /*, /^.*\.js$/*/);
  let templateContext = require.context("./knockout-templates", true, /.tmpl.html$/);

  console.log('moduleContext', moduleContext.keys());
  console.log('templateContext', templateContext.keys());

  function contextModuleLoader(moduleName, done) {
    let mod = moduleContext("./" + moduleName);
    done(mod);
  }

  function contextTemplateLoader(templateName, done) {
    let mod = templateContext("./" + templateName + ko.amdTemplateEngine.defaultSuffix);
    done(mod);
  }

  function moduleLoader(name, callback) {
    require("bundle?lazy!./modules/" + name + ".js")(function(loadedModule) {
      callback(loadedModule);
    });
  }

  function templateLoader(name, callback) {
    require("bundle?lazy!./templates/" + name + ko.amdTemplateEngine.defaultSuffix)(function(loadedTemplate) {
      callback(loadedTemplate);
    });
  }

  ko.bindingHandlers.module.loader = contextModuleLoader;
  ko.amdTemplateEngine.loader = contextTemplateLoader;
//  ko.bindingHandlers.module.loader = moduleLoader;
//  ko.amdTemplateEngine.loader = templateLoader;

  ko.applyBindings(new App());
});
