/**
 * Created by Apple on 17/2/17.
 */
require(["config/require_config"],function () {
    require([
        "../../kuaiyunapp/dist/scripts/entrance.js",
        "./page_classes/template/template"
    ],function (garden,template) {
        var app = new garden.app("angularApp",["ngRoute","toaster","ui.select","uiSwitch","ngAnimate","ngSanitize"]);
        app.register(template.page(app.ky));
        app.start();
        app.showLoadingImpl(true);
    })
})
