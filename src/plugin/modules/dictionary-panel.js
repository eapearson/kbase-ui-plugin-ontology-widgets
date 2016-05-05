/*global define*/
/*jslint white: true, browser: true*/
define([
    'kb/widget/widgetSet',
    'kb/common/html',
    'bootstrap'
], function (WidgetSet, html) {
    'use strict';

    function factory(config) {
        var root, container, runtime = config.runtime,
            widgetSet = WidgetSet.make({runtime: runtime}),
            layout;

        // Widget Implementation

        function render() {
            var t = html.tag,
                h1 = t('h1'),
                div = t('div'),
                p = t('p');
            return div({class: 'container-fluid'}, [
                div({class: 'row'}, [
                    div({class: 'col-md-12'}, [
                        h1('Ontology Dictionary Demo Page'),
                    ])
                ]),
                div({class: 'row'}, [
                    div({class: 'col-md-3'}, [
                        p('This page demonstrates the ontology dictionary widget.'),
                        p('It takes an object reference from the path components.')
                    ]),
                    div({class: 'col-md-9', id: widgetSet.addWidget('ontologyDictionary')})
                ])
            ]);
        }

        layout = render();



        // Widget Interface

        function init(config) {
            return widgetSet.init(config);
        }

        function attach(node) {
            root = node;
            container = node.appendChild(document.createElement('div'));
            container.innerHTML = layout;
            return widgetSet.attach(container);
        }
        function start(params) {
            return widgetSet.start(params);
        }
        function run(params) {
            runtime.send('ui', 'setTitle', 'Hi, I am the data widgets plugin');
            return widgetSet.run(params);
        }
        function stop() {
            return widgetSet.stop();
        }
        function detach() {
            if (root && container) {
                root.removeChild(container);
            }
            return widgetSet.detach();
        }
        function destroy() {
            return widgetSet.destroy();
        }

        return Object.freeze({
            init: init,
            attach: attach,
            start: start,
            run: run,
            stop: stop,
            detach: detach,
            destroy: destroy
        });
    }

    return {
        make: function (config) {
            return factory(config);
        }
    };
});