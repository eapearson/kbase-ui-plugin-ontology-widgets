# KBase UI Plugin - Ontology Widgets

## Getting Started

- create a local development directory
- within that directory:
- fork and clone the develop branch of https://github.com/kbase/kbase-ui
    - ```git clone -b develop https://github.com/someuser/kbase-ui```
- fork and clone this repo https://github.com/eapearson/kbase-ui-plugin-ontology-widgets

### First Build

Before integrating the plugin, ensure that kbase-ui will build and run

Within the kbase-ui directory:

```
make init
make build
make start
make preview
```

### Integrate Plugin

Within the kbase-ui directory:

- copy the config directory into the dev directory
```
cp -pr config dev/config
```
- edit  dev/config/link.sh to create a link to the my-plugin repo.
  - in the EXTERNAL PLUGINS section, uncomment the two example lines
```
# rm -rf ../../build/build/client/modules/plugins/PLUGIN
# ln -s /DEVDIR/kbase-ui-plugin-PLUGIN/src/plugin ../../build/build/client/modules/plugins/PLUGIN
```
  - replace PLUGIN with ontology-widgets, and DEVDIR with the absolute path to the directory in which the plugin repo was cloned

- edit dev/config/ui/dev/build.yml
- at the end of the plugins section add a section like this:

```
    -
        name: ontology-widgets
        globalName: kbase-ui-plugin-ontology-widgets
        version: 0.1.0
        cwd: src/plugin
        source:
            directory:
                path: /DEVDIR/kbase-ui-plugin-ontology-widgets/src/plugin
```

- again replacing DEVDIR with the absolute path to the plugin repo

- edit dev/config/ui/dev/settings.yml
- in the menu.authenticated property add the menu items ```,  ontologyWidgetDictionary, ontologyWidgetTranslation``` to the list of menu items. I will now look something like:

```
menus:
    authenticated: 
        main: [narrative, appcatalog, search, dashboard]
        developer: [databrowser, typebrowser, jobbrowser, shockbrowser, dataapidemo, test, visdemoBarchart, visdemoHeatmap, visdemoLinechart, visdemoScatterplot,  ontologyWidgetDictionary, ontologyWidgetTranslation]
        help: [contact-kbase, about-kbase]
    unauthenticated: 
        main: [appcatalog, search]
        developer: []
        help: [contact-kbase, about-kbase]
```

### Build with the plugin

Back in kbase-ui, rebuild kbase-ui, but this time including the plugin:

```
make build; cd dev/config; sh link.sh; cd ../..
```

You should now see the ontology menu items in the hamburger menu.

### Here is what you now have:

- ontology widgets defined in the system and mapped to their respective types
- menu item  which invoke panels, which embeds sample invocations of the ontology widgets. These are for testing outside of landing pages
- type mappings for the widgets so that they are activated on the dataview landing page

### Further Fun

- use the type browser to locate the supported ontology types, browse to existing objects, and load the landing page to see the widgets.
- play with the widgets, reload the landing page, and see the effects.

