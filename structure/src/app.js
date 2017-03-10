/**
 * Created by Apple on 17/2/17.
 */
define(["../../../scripts/entrance"],function (entrance) {
    require([
        "kuaiyunapp",
        "./page_classes/template/template",   
    ],function (ky,template) {
        var Entrance = entrance.createEntrance(ky);
        class App extends Entrance{
            constructor(angularName,dependsModules){
                super(angularName,dependsModules);
                this.register(template.page);
            }

            async run() {
                await this.getMyInformation();
                await this.loadConstants();
            }

            makeUrl(restApi) {
                if(restApi.startsWith("/")) {
                    return "/api/v1/admin" + restApi;
                } else {
                    return "/api/v1/admin/" + restApi;
                }
            }
        }

        var app = new App("angularApp",["ngRoute","toaster","ui.select","uiSwitch","ngAnimate","ngSanitize"]);
        app.start();
    })
})

