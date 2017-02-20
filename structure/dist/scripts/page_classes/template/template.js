"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Apple on 16/10/16.
 */
define(["./fields"], function (dataFields) {
    console.log(dataFields);
    function page(ky) {
        var TemplatePage = function (_ky$DataTable) {
            _inherits(TemplatePage, _ky$DataTable);

            _createClass(TemplatePage, null, [{
                key: "templateUrl",
                value: function templateUrl() {
                    return "views/template.html";
                }
            }, {
                key: "url",
                value: function url() {
                    return "/template/";
                }
            }, {
                key: "homepage",
                value: function homepage() {
                    return true; /*指定本页面为默认页*/
                }
            }]);

            function TemplatePage(scope) {
                _classCallCheck(this, TemplatePage);

                var _this = _possibleConstructorReturn(this, (TemplatePage.__proto__ || Object.getPrototypeOf(TemplatePage)).call(this, scope));

                _this.$location = ky.AngularApplication.getInstance().getAngular("$location");
                _this.scope.filters = {};
                _this.scope.dataFields = dataFields.fields;
                _this.$filter = _this.app.getAngular("$filter");
                _this.scope.fieldData = dataFields.default_fieldMessage;
                _this.scope.filter = _this.filter;
                _this.scope.toggleDetail = _this.toggleDetail.bind(_this);
                _this.scope.isDetailShown = _this.isDetailShown.bind(_this);
                _this.scope.render = _this.render.bind(_this);
                _this.enterPress = ky.enterPress.apply(_this, [".text-search", _this.quickSearch]);
                _this.scope.productNames = [["a", 1]];
                return _this;
            }

            _createClass(TemplatePage, [{
                key: "run",
                value: function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        var pagination, sltDateRange;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        // load data first.
                                        this.scope.$watch("filters", function () {
                                            this.mergeFilter(this.scope.filters);
                                        }.bind(this), true);

                                        pagination = this.find("#mainContent", "#pagination");

                                        pagination.action(function () {
                                            var page = pagination.value();
                                            this.loadPage(parseInt(page));
                                        }.bind(this));

                                        sltDateRange = this.find("#mainContent", "#sltDateRange");

                                        sltDateRange.action(function () {
                                            this.income_obj = null;
                                            this.mergeFilter(sltDateRange.json());
                                        }.bind(this));
                                        sltDateRange.setDateRangeName("今天");
                                        this.mergeFilter(sltDateRange.json());
                                        //await this.loadFirstPage();
                                        //this.setAutoApplyFilter(true);

                                    case 7:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    function run() {
                        return _ref.apply(this, arguments);
                    }

                    return run;
                }()
            }, {
                key: "render",
                value: function render(key, obj) {
                    this.singleDataObj = obj;
                    for (var i = 0, l = this.scope.billsField.length; i < l; i++) {
                        if (this.scope.billsField[i]["translate"] && key === this.scope.billsField[i]["fieldName"]) {
                            return this.scope.billsField[i]["render"].apply(this, [obj[key]]);
                        }
                    }
                    return obj[key];
                }
            }, {
                key: "toggleDetail",
                value: function toggleDetail(id) {
                    ky.toggleDetail.apply(this, [id]);
                    this.showBackendRecord(id);
                }
            }, {
                key: "isDetailShown",
                value: function isDetailShown(id) {
                    return ky.isDetailShown.apply(this, [id]);
                }
            }, {
                key: "quickSearch",
                value: function quickSearch() {
                    var textSearch = $("#text-search").val();
                    textSearch = textSearch.replace(/\s/g, "");
                    this.mergeFilter({ "q": textSearch });
                }
            }, {
                key: "makeRequest",
                value: function makeRequest() {
                    var obj = {
                        "url": this.makeUrl("admin/bills/"),
                        "method": "GET",
                        "loading": true
                    };
                    return obj;
                }
            }, {
                key: "processResponse",
                value: function processResponse(data) {
                    this.objectList = data.results;
                    var pagination = this.find("#mainContent", "#pagination");
                    pagination.setPage(data.current, data.num_pages, this.pageSize);
                    this.summary = data.summary;
                }
            }, {
                key: "editCallBack",
                value: function editCallBack() {
                    /*编辑之前做一些处理*/
                }
            }, {
                key: "createCallBack",
                value: function createCallBack() {
                    /*新增之前做一些处理*/
                }
            }, {
                key: "beforeSave",
                value: function beforeSave(obj) {
                    /*保存之前做一些处理*/
                    return obj;
                }
            }]);

            return TemplatePage;
        }(ky.DataTable(ky.BasePage));

        ;
        return TemplatePage;
    }

    return {
        "page": page
    };
});
