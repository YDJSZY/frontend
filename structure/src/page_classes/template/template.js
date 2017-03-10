/**
 * Created by Apple on 16/10/16.
 */
define(["./fields","kuaiyunapp","commonMethods"],function (dataFields,ky,commonMethods){
    class Template extends ky.DataTable(ky.BasePage) {
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
            this.scope.getMediaData = this.getMediaData.bind(this);
            this.scope.handelData = this.handelData.bind(this);
            this.scope.selectMedia = this.selectMedia.bind(this);
            this.enterPress = ky.enterPress.apply(this,[".text-search",this.quickSearch]);
            this.scope.sort = this.sort.bind(this);
            this.ordersSort = new commonMethods.sort(this.scope.dataFields,$("#wechartAction"));
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
            await this.loadFirstPage();
            this.setAutoApplyFilter(true);
        }

        sort(event,field) {
            var o = this.ordersSort.beginSort(event.target,field);
            this.mergeFilter({o:o})
        }

        render(key,obj) {
            this.singleDataObj = obj;
            for(var i = 0,l = this.scope.dataFields.length; i < l; i++) {
                if(this.scope.dataFields[i]["translate"] && key===this.scope.dataFields[i]["fieldName"]){
                    return this.scope.dataFields[i]["render"].apply(this,[obj[key]])
                }
            }
            return obj[key];
        }

        toggleDetail(id) {
            ky.toggleDetail.apply(this,[id]);
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
                "url": this.makeUrl("wx_action/"),
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
        }

        createCallBack() {
            this.scope.editingObject.type = 1;
        }

        beforeSave(obj) {
            /*保存之前做一些处理*/
            return obj;
        }

        getMediaData(page) {
            var params = {page:page || 1,type:this.scope.editingObject.type}
            return this.sendRequest({
                url:"/api/v1/admin/wx_action/media/",
                params:params,
                method:"GET"
            })
        }

        handelData(response) {
            this.scope.mediaData = response.data.data.item;
            this.scope.pageCount = 1;
        }

        selectMedia(item) {
            this.scope.editingObject.content.media_id = item.media_id;
        }
    };
    return {
        "page": Template,
    };
})
