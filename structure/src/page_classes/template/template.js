/**
 * Created by Apple on 16/10/16.
 */
define(["./fields"],function (dataFields){
    function page(ky) {
        class TemplatePage extends ky.DataTable(ky.BasePage) {
            static templateUrl() {
                return "views/template.html";
            }

            static url() {
                return "/template/";
            }

            static homepage() {
                return true;/*指定本页面为默认页*/
            }

            constructor(scope) {
                super(scope);
                this.$location = ky.AngularApplication.getInstance().getAngular("$location");
                this.scope.filters = {};
                this.scope.dataFields = dataFields.fields;
                this.$filter = this.app.getAngular("$filter");
                this.scope.fieldData = dataFields.default_fieldMessage;
                this.scope.filter = this.filter;
                this.scope.toggleDetail = this.toggleDetail.bind(this);
                this.scope.isDetailShown = this.isDetailShown.bind(this);
                this.scope.render = this.render.bind(this);
                this.enterPress = ky.enterPress.apply(this,[".text-search",this.quickSearch]);
                this.scope.productNames = [["a",1]]
            }

            async run() {
                // load data first.
                this.scope.$watch("filters",function () {
                    this.mergeFilter(this.scope.filters)
                }.bind(this),true)

                var pagination = this.find("#mainContent", "#pagination");
                pagination.action(function () {
                    var page = pagination.value();
                    this.loadPage(parseInt(page));
                }.bind(this));

                var sltDateRange = this.find("#mainContent", "#sltDateRange");
                sltDateRange.action(function () {
                    this.income_obj = null;
                    this.mergeFilter(sltDateRange.json());
                }.bind(this));
                sltDateRange.setDateRangeName("今天");
                this.mergeFilter(sltDateRange.json());
                //await this.loadFirstPage();
                //this.setAutoApplyFilter(true);
            }

            render(key,obj) {
                this.singleDataObj = obj;
                for(var i = 0,l = this.scope.billsField.length; i < l; i++) {
                    if(this.scope.billsField[i]["translate"] && key===this.scope.billsField[i]["fieldName"]){
                        return this.scope.billsField[i]["render"].apply(this,[obj[key]])
                    }
                }
                return obj[key];
            }

            toggleDetail(id) {
                ky.toggleDetail.apply(this,[id]);
                this.showBackendRecord(id);
            }

            isDetailShown(id) {
                return ky.isDetailShown.apply(this,[id]);
            }

            quickSearch() {
                var textSearch = $("#text-search").val();
                textSearch = textSearch.replace(/\s/g,"");
                this.mergeFilter({"q": textSearch});
            }

            makeRequest() {
                var obj = {
                    "url": this.makeUrl("admin/bills/"),
                    "method": "GET",
                    "loading":true
                };
                return obj;
            }

            processResponse(data) {
                this.objectList = data.results;
                var pagination = this.find("#mainContent", "#pagination");
                pagination.setPage(data.current, data.num_pages, this.pageSize);
                this.summary = data.summary;
            }

            editCallBack() {
                /*编辑之前做一些处理*/
            }

            createCallBack() {
                /*新增之前做一些处理*/
            }

            beforeSave(obj) {
                /*保存之前做一些处理*/
                return obj;
            }
        };
        return TemplatePage
    }
    
    return {
        "page": page,
    };
})
