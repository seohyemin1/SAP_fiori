sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
   "sap/ui/model/json/JSONModel",
   "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("practiceb1301.controller.View3", {
      onInit: function () {
       // var oDatas = {list: []};

      //  var oDatas = {
      //                "name" : "seo hye min",
      //            "title" : "Fiori Application",
      //   "list" : [],
      //   "operList" : [
      //       {"code" : "PLUS", text : "+"},
      //       {"code" : "MINUS", text : "-"},
      //       {"code" : "MULTIPLE", text : "*"},
      //       {"code" : "DIVISION", text : "/"}
      //   ]};

      //  var oModel = new JSONModel(oDatas); //json data를 포함한 json model 생성
      var oModel = new JSONModel();
          oModel.loadData('../model/viewData.json',true);

        this.getView().setModel(oModel, "main"); // json model을 view에서 사용할 수 있도록 세팅
      },

      onClick: function () {
        var oInput1 = this.byId("Input1");
        var sUserText1 = Number(oInput1.getValue()); //사용자 입력값을 받음

        var oInput2 = this.byId("Input2");
        var sUserText2 = Number(oInput2.getValue()); //사용자 입력값을 받음

        var oSelect = this.byId("select");
        var sUserKey = oSelect.getSelectedItem().getText();

        var result = 0;

        if (sUserKey == "/" && sUserText2 == 0) {
          sap.m.MessageToast.show('NO Click');
          //alert("입력 오류")
          return;
        }

        switch (sUserKey) {
          case "+":
            result = sUserText1 + sUserText2;
            break;
          case "-":
            result = sUserText1 - sUserText2;
            break;
          case "*":
            result = sUserText1 * sUserText2;
            break;
          case "/":
            // if(!nNUM2) return this.onChange();
            result = sUserText1 / sUserText2;
            break;
          default:
            result = "유효하지 않은 연산자입니다.";
        }
        // var getvalue = oText.getValue(); //사용자 입력값을 받음=
        this.onAdd(sUserText1,sUserText2,sUserKey,result);
      },

      onChange: function (oEvent) {
        var nNum = Number(this.byId("Input2").getValue());
        // var nNum = Number(oEvent.getParameters().value); // NaN, 0
        // var nNum2 = this.byId("Input2");
        var sKey = this.byId("select").getSelectedKey();
        var oButton = this.byId("btn1");

        if (!nNum && sKey === "DIVISION") {
          //입력값이 없거나 0이면 에러 상태로 변경
          // console.log(nNum);
          // nNum2.setValueState('Error');
          oEvent.getSource().setValueState("Error");
          oButton.setEnabled(false);
        } else {
          // nNum2.setValueState('None');
          oEvent.getSource().setValueState("None");
          oButton.setEnabled(true);
        }
      },
      onAdd: function (sUserText1, sUserText2, sUserKey, result) {
        var oModel = this.getView().getModel("main"), //main모델 가져오기
          aList2 = oModel.getProperty("/list");
        //aList = oMdel.getData(), list배열 데이터 가져오기
        aList2.push({
          num1: sUserText1,
          operator: sUserKey,
          num2: sUserText2,
          result: result,
        });
        oModel.setProperty("/list", aList2);
      },
      onClick2: function() {
            var oModel = this.getView().getModel("main"), //main모델 가져오기
            aList2= oModel.getProperty("/list");
            //aList = oMdel.getData(), list배열 데이터 가져오기

            var tableid= this.byId("tableId");
            var rowcount = tableid.getSelectedIndices();       
            
           // for(var i=i; i<rowcount.length; i++){//->배열 지울때 앞에서부터 지우면 index 값이 꼬여서 수정함.
           // aList2.splice(rowcount[i], rowcount.length) 
            
             for(var i=rowcount.length-1; i>-1; i--){//1개뿐만 아니라 여러개의 row를 삭제시키기 위해 반복문
             aList2.splice(rowcount[i],1) // 배열 삭제 기능인 splice를 통해 삭제함.
             // 첫번째 파라미터는 삭제시킬 row의 시작 인덱스 값. 두번째 파라미터는 몇개 삭제시키는 건지 기술.
            }
            oModel.setProperty("/list", aList2);
        },

        onOpenDialog: function(){
          var oDialog = sap.ui.getCore().byId("idDialog");
          
          if(oDialog){
            oDialog.open();
          }else{
          Fragment.load({
            name : 'practiceb1301.fragment.HelloDialog',
            type : 'XML',
            controller : this
          }).then(function(oDialog){
            oDialog.open();
          }); 
                }

        },

        onClose : function(oEvent){
          var oButton = oEvent.getSource();
          var oDialog = oButton.getParent();

          oDialog.close();
        },
        onOpenDialog2: function(){
          if(this.byId('idDialogView')) {
            this.byId('idDialogView').open();
          }
        }

    });
  }
);
