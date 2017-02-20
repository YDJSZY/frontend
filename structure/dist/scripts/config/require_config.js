"use strict";

var config = {
    /*baseUrl: require.toUrl("./dist/"),*/
    paths: {
        "jquery": "../../../kuaiyunapp/dist/node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min",
        "bootstrap": "../../../kuaiyunapp/dist/node_modules/bootstrap/dist/js/bootstrap.min",
        "admin-lte": "../../../kuaiyunapp/dist/node_modules/admin-lte/dist/js/app.min",
        "angular": "../../../kuaiyunapp/dist/node_modules/angular/angular.min",
        "angular-route": "../../../kuaiyunapp/dist/node_modules/angular-route/angular-route.min",
        "angular-animate": "../../../kuaiyunapp/dist/node_modules/angular-animate/angular-animate.min",
        "hgoldfish": "../../../kuaiyunapp/src/kuaiyun/hgoldfish",
        "kuaiyunapp": "../../kuaiyunapp/src/kuaiyun/kuaiyunapp",
        "angular-ui-select": "../../../kuaiyunapp/dist/node_modules/ui-select/dist/select.min",
        "angular-ui-switch": "../../../kuaiyunapp/dist/node_modules/angular-ui-switch/angular-ui-switch.min",
        "angular-sanitize": "../../../kuaiyunapp/dist/node_modules/angular-sanitize/angular-sanitize.min",
        "angularToaster": "../../../kuaiyunapp/dist/node_modules/angularjs-toaster/toaster.min",
        "highcharts": "../../../kuaiyunapp/dist/node_modules/highcharts/highcharts",
        "datetimepicker": "../../../kuaiyunapp/dist/node_modules/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min",
        "angularFilter": "../../kuaiyunapp/filters/angular_filters"
    },
    shim: {
        "angularToaster": ["angular"],
        "angular-ui-select": ["angular"],
        "angular-ui-switch": ["angular"],
        "bootstrap": ["jquery"],
        "handsontable": ["jquery"],
        "angular-sanitize": ["angular"],
        "angularFilter": ["angular"],
        "datetimepicker": ["bootstrap"],
        "angular-route": ["angular"],
        "angular-animate": ["angular"],
        "hgoldfish": ["jquery"],
        "highcharts": ["jquery"],
        "admin-lte": ["bootstrap", "angular-ui-select", "angular-ui-switch", "angular-route", "angular-sanitize", "angular-animate", "highcharts", "datetimepicker", "hgoldfish"]
    }
};
require.config(config);
