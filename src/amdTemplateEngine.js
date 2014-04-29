//an AMD template engine that uses the text plugin to pull templates
(function(ko, require) {
    //get a new native template engine to start with
    var engine = new ko.nativeTemplateEngine(),
        existingRenderTemplate = engine.renderTemplate,
        sources = {};

    engine.defaultPath = "templates";
    engine.defaultSuffix = ".tmpl.html";
    engine.defaultRequireTextPluginName = "text";

    //create a template source that loads its template using the require.js text plugin
    ko.templateSources.requireTemplate = function(key) {
        this.key = key;
        this.template = ko.observable(" "); //content has to be non-falsey to start with
        this.requested = false;
        this.retrieved = false;
    };

    ko.templateSources.requireTemplate.prototype.text = function(value) {
        //when the template is retrieved, check if we need to load it
        if (!this.requested && this.key) {
            require([engine.defaultRequireTextPluginName + "!" + addTrailingSlash(engine.defaultPath) + this.key + engine.defaultSuffix], function(templateContent) {
                this.retrieved = true;
                this.template(templateContent);
            }.bind(this));

            this.requested = true;
        }

        //if template is currently empty, then clear it
        if (!this.key) {
            this.template("");
        }

        //always return the current template
        if (arguments.length === 0) {
            return this.template();
        }
    };

    //our engine needs to understand when to create a "requireTemplate" template source
    engine.makeTemplateSource = function(template, doc) {
        var el;

        //if a name is specified, then use the
        if (typeof template === "string") {
            //if there is an element with this id and it is a script tag, then use it
            el = (doc || document).getElementById(template);

            if (el && el.tagName.toLowerCase() === "script") {
                return new ko.templateSources.domElement(el);
            }

            //otherwise pull the template in using the AMD loader's text plugin
            if (!(template in sources)) {
                sources[template] = new ko.templateSources.requireTemplate(template);
            }

            //keep a single template source instance for each key, so everyone depends on the same observable
            return sources[template];
        }
        //if there is no name (foreach/with) use the elements as the template, as normal
        else if (template && (template.nodeType === 1 || template.nodeType === 8)) {
            return new ko.templateSources.anonymousTemplate(template);
        }
    };

    //override renderTemplate to properly handle afterRender prior to template being available
    engine.renderTemplate = function(template, bindingContext, options, templateDocument) {
        var templateSource,
            existingAfterRender = options && options.afterRender;

        //if a module is being loaded, and that module as a `template` property (of type `string` or `function`) - use that property as the source of the template.
        if (bindingContext.$module && bindingContext.$module.template && (typeof bindingContext.$module.template === 'string' || typeof bindingContext.$module.template === 'function')) {
            if (typeof bindingContext.$module.template === 'string') {
                templateSource = {
                    'text': function() {
                        return bindingContext.$module.template;
                    }
                };
            } else {
                templateSource = {
                    'text': bindingContext.$module.template
                };
            }
        } else {
            templateSource = engine.makeTemplateSource(template, templateDocument);
        }

        //wrap the existing afterRender, so it is not called until template is actuall retrieved
        if (typeof existingAfterRender === "function" && templateSource instanceof ko.templateSources.requireTemplate && !templateSource.retrieved) {
            options.afterRender = function() {
                if (templateSource.retrieved) {
                    existingAfterRender.apply(this, arguments);
                }
            };
        }

        return engine.renderTemplateSource(templateSource, bindingContext, options);
    };

    //expose the template engine at least to be able to customize the path/suffix/plugin at run-time
    ko.amdTemplateEngine = engine;

    //make this new template engine our default engine
    ko.setTemplateEngine(engine);

})(ko, require);
