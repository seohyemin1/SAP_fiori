sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.projectm01.controller.Main", {
            formatter:{
                        transformDiscontinued: function(getDate){
                            if(getDate == true){
                                return "Yes"                                    
                                }else {
                                return "No"    
                                }

                            }
                        },

            onInit : function () {

                var list = { number : []}
                var oModel = new JSONModel(list); 
                this.getView().setModel(oModel)  //모델생성 3줄 외우기
            },
            onRandomPress : function() {
             var randomNum = Math.floor(Math.random() * 100) + 1
             this.byId("idInput").setValue(randomNum)
            
                // 테이블에 값이 추가되는 로직
                var oModel = this.getView().getModel() //모델 불러오기
                var aList = oModel.getProperty("/number")

                aList.push({
                    number : randomNum
                })
                    oModel.setProperty("/number", aList)
            },
            onDialog: function(){
                    var aDialog = this.byId("idDialog")

                    if(aDialog){
                        aDialog.open()
                    } else{
                    // fregment 소환 하는 방법
                    this.loadFragment({
                        name : 'sap.btp.projectm01.view.fragment.Products'
                    }).then(function(oDialog){
                        this.getView().setModel(this.getOwnerComponent().getModel())
                        oDialog.open() //this.byId("idDialog")
                    }.bind(this))
                }
                },

            onClose : function(){
                    this.byId("idDialog").close()
                },
            onValueChange : function(oEvent){
                //vaildation -> 입력값에 따라 입력칸이 '에'러 :빨간색 오류메시지' 표시나게함.
                var idInput = this.byId("idInput")
                var getNum = idInput.getValue()

                if(getNum >= 1 && getNum <= 100){ //사용자가 1이상 100이하의 값을 입력했을 경우,
                    oEvent.getSource().setValueState("None")  
                       // 해당 값을 추가한다.
                       var oModel = this.getView().getModel() //모델 불러오기
                       var aList = oModel.getProperty("/number")
                       aList.push({
                           number : getNum
                       })
                    oModel.setProperty("/number", aList)
            } else { //그 외일 경우, 입력창 상태를 빨간색 처리 및 값이 추가 되지않도록함.
                oEvent.getSource().setValueState("Error")     
                oEvent.getSource().setValueStateText("오류")           
            }
        }
        });
    });
