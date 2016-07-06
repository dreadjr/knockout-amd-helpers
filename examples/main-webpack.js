require(["knockout", "./modules/app", "knockout-amd-helpers"], function(ko, App) {
  //require("./foundation/css/normalize.css");
  //require("./foundation/css/foundation.css");

  // MARK: knockout-amd-helpers
  ko.bindingHandlers.module.baseDir = "modules";
  ko.bindingHandlers.module.templateProperty = "embeddedTemplate";

  // MARK: knockout
  ko.applyBindings(new App());
});
