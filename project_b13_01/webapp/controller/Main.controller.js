sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("sync.projectb1301.controller.Main", {
            onInit: function () {               
              //  this.byId("Input2").setValue('kkkkk');
                var oDatas = { "name" : "seo hye min",
                            "title" : "알라뷰승연",
                            "list" : [
                                {num1: 12, operator:'test', num2: 13, result: 0 }
                                // {"phone" : "010-1111-1111","home": "광주"},
                                // {"phone" : "010-2222-2222","home": "제주"},
                                // {"phone" : "010-3333-3333","home": "서울"}
                                        ],
                            "age" : 20};
                     
             //json data 생성

                var oModel = new JSONModel(oDatas); //json data를 포함한 json model 생성

                this.getView().setModel(oModel,"main"); // json model을 view에서 사용할 수 있도록 세팅
            },
            onClick: function(){
                var oInput1 = this.byId('Input1');
                var sUserText1 = Number(oInput1.getValue()); //사용자 입력값을 받음

                var oInput2 = this.byId('Input2');
                var sUserText2 = Number(oInput2.getValue()); //사용자 입력값을 받음


                var oSelect = this.byId("select");
                var sUserKey = oSelect.getSelectedKey();

                var oText = this.byId('idText');
                var result = 0;

                    switch (sUserKey) {
                        case 'PLUS':
                            result = sUserText1 + sUserText2;
                            break;
                        case 'MINUS':
                            result = sUserText1 - sUserText2;
                            break;
                        case 'MULTIPLE':
                            result = sUserText1 *  sUserText2;
                            break;
                        case 'DIVISION':
                           // if(!nNUM2) return this.onChange();
                            result = sUserText1 / sUserText2;
                        default:
                           result = "유효하지 않은 연산자입니다.";
                }
                // var getvalue = oText.getValue(); //사용자 입력값을 받음=
                oText.setText(result); //사용자 입력값을 출력
                this.onAdd(result)
        },

            onChange : function(oEvent){
               var nNum = Number(this.byId("Input2").getValue());
                // var nNum = Number(oEvent.getParameters().value); // NaN, 0
               // var nNum2 = this.byId("Input2");
                var sKey = this.byId("select").getSelectedKey();
                var oButton = this.byId("btn1");

                if (!nNum && sKey === "DIVISION") {
                        //입력값이 없거나 0이면 에러 상태로 변경
                    // console.log(nNum);
                    // nNum2.setValueState('Error');                 
                oEvent.getSource().setValueState('Error');
                oButton.setEnabled(false);
                }else{
                    // nNum2.setValueState('None');                    
                oEvent.getSource().setValueState('None');
                oButton.setEnabled(true); 
                }
            
                },
                onAdd: function(result){
                    var oInput1 = this.byId('Input1');
                    var sUserText1 = Number(oInput1.getValue()); //사용자 입력값을 받음
    
                    var oInput2 = this.byId('Input2');
                    var sUserText2 = Number(oInput2.getValue()); //사용자 입력값을 받음
    
    
                    var oSelect = this.byId("select");
                    var sUserKey = oSelect.getSelectedKey();

                    var oModel = this.getView().getModel("main"), //main모델 가져오기
                    aList2= oModel.getProperty("/list");
                    //aList = oMdel.getData(), list배열 데이터 가져오기
                      aList2.push({num1:sUserText1, operator : sUserKey , num2: sUserText2, result:result })
                    oModel.setProperty("/list", aList2);
          }
                
        });
    });
