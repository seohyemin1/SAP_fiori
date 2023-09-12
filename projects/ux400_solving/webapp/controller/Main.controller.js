sap.ui.define(
  ["sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controlle} Controller
   */
  function (Controller,JSONModel,Fragment,FilterOperator,Filter) {
    "use strict";

    return Controller.extend("sap.btp.ux400solving.controller.Main", {
      formatter : {
        //fndatestring => 날짜 객체를 'yyyy-mm-dd' 형태로 변경
        transformDiscontinued : function(oData) {
          if(oData == true){
            return "Yes"
          } else {
            return "No"
          }
        }
      },

      onInit: function () {
        var oDatas = { list: [] }; //json data 생성
        var oModel = new JSONModel(oDatas); //json data를 포함한 json model 생성
        this.getView().setModel(oModel, "list"); // json model을 view에서 사용할 수 있도록 세팅
      },

      onRandomPress: function () {
        var random = Math.floor(Math.random() * 100) + 1;
        this.byId("Input1").setValue(random);

        var oModel = this.getView().getModel("list"), //main모델 가져오기
                    aList2= oModel.getProperty("/list");
                    //aList = oMdel.getData(), list배열 데이터 가져오기
                      aList2.push({value:random})
                    oModel.setProperty("/list", aList2);
      },
      onDialog: function(){
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel2 = this.getView().getModel("main");
       
          if(oDialog){
            oDialog.open();
          }else{
          Fragment.load({
            name : 'sap.btp.ux400solving.view.fragment.Products',
            type : 'XML',
            controller : this
          }).then(function(oDialog){
            oDialog.setModel(oModel2, 'main');
            oDialog.open();})
          }
      },
      onClose : function(oEvent){
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();

            oDialog.close();
      },
      onValueChange : function(oEvent){
       var inputValue = this.byId("Input1").getValue()
       oEvent.getSource().setValueState("None");
       
       if (inputValue<=100 && inputValue>=1) {
        var oModel = this.getView().getModel("list"), //main모델 가져오기
        aList2= oModel.getProperty("/list");
        aList2.push({value:inputValue})
        oModel.setProperty("/list", aList2);
       } else {
        oEvent.getSource().setValueState("Error");
       }
      }
    });
})