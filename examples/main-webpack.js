require(["knockout", "./modules/app", "knockout-amd-helpers"], function(ko, App) {
//require(["knockout", "./modules/app"], function(ko, App) {
  function requireAll(requireContext) {
    console.log('requireAll', requireContext.keys());
    return requireContext.keys().map(requireContext);
  }
//
//  var modules = requireAll(require.context('./modules', true, /.js$/));
//  console.log('modules', modules);
  //var requireTest = require.context('./modules', true, /.js$/);
  //requireTest.keys().forEach(requireTest);


//  var templates = requireAll(require.context('./templates', true, /.tmpl.html$/));
//  console.log('templates', templates);
//
//  // amd-helpers
//  require('./modules/navigation')
//  require(["text!./templates/navigation.tmpl.html"])
//  require(["text!./templates/content.tmpl.html"])
//  require(["text!./templates/footer.tmpl.html"])
//  require(["text!./templates/article.tmpl.html"])
//  require(["text!./templates/aside.tmpl.html"])
//  require(["text!./templates/header.tmpl.html"])

//  require("knockout-template?name=navigation!html!./templates/navigation.tmpl.html")

  // not use amd-helpers
//  require("knockout-template?name=navigation!html!./templates/navigation.tmpl.html")
//  require("knockout-template?name=content!html!./templates/content.tmpl.html")
//  //require("knockout-template?name=article!html!./templates/article.tmpl.html")
//  require("knockout-template?name=aside!html!./templates/aside.tmpl.html")
//  require("knockout-template?name=footer!html!./templates/footer.tmpl.html")
//  require("knockout-template?name=header!html!./templates/header.tmpl.html")

//  require.ensure([], function (require) {
//    // all dynamic entry modules inside /dynamic/ folder
//    console.log("--", require("knockout-template!html!./templates/navigation.tmpl.html"))
//    console.log("--", require("knockout-template!html!./templates/content.tmpl.html"))
//    console.log("--", require("knockout-template!html!./templates/footer.tmpl.html"))
//  });

//  require.ensure([], function(x) {
//    console.log('loaded', x);
//  })



  // amd-helpers

  ko.bindingHandlers.module.baseDir = "modules";

  //fruits/vegetable modules have embedded template
  ko.bindingHandlers.module.templateProperty = "embeddedTemplate";

  ko.applyBindings(new App());
});
