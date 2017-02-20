"use strict";

/**
 * Created by Apple on 17/2/17.
 */
define(function () {
    return {
        fields: [{
            "name": "ID",
            "fieldName": "id",
            "show": true,
            "use": true,
            "style": {}, /*样式*/
            "translate": true, /*是否特殊处理*/
            "render": function render(param) {
                /*特殊处理*/
                return param;
            }
        }],
        default_fieldMessage: {
            id: true /*默认显示*/
        }
    };
});
