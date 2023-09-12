sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

    return Controller.extend("projectb1304.controller.Detail", {   
             onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);
        },

        _patternMatched : function(oEvent){
            //파라미터로 받은 값들 가져오기
            var oParam = oEvent.getParameters().arguments; //paraOrder
            this.getView().bindElement(`/Orders(${oParam.paramOrder})`);

            //oParam 안에는 mainfest.json에 등록된,
            // RouteDetail의 parameter 값들이 있음

        },

        onNavMain: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('RouteView2');
        }
            });
          });
