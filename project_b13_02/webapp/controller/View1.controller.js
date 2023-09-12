sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb1302.controller.View1", {
            onInit: function () {
                var oDatas = {list: []};
         
 //json data 생성

    var oModel = new JSONModel(oDatas); //json data를 포함한 json model 생성

    this.getView().setModel(oModel,"main"); // json model을 view에서 사용할 수 있도록 세팅


            },

            onClick: function() {               
            var oModel = this.getView().getModel("main"), //main모델 가져오기
                aList2= oModel.getProperty("/list");
                //aList = oMdel.getData(), list배열 데이터 가져오기
                aList2.push({"Name" : "서헤민",
                "Address" : "서울",
                 "Phone" : "010-2222-2222",
                 "Department" : "-"})
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
                    onRowActionDel: function(oEvent) {
                        var nSelectedIndex = oEvent.getParameter('row').getIndex();
                        var aList = this.getView().getModel().getData().list; //배열데이터

                        aList.splice(nSelectedIndex, 1); //.splice를 통해 단 건 삭제 후 적용

                        this.getView().getModel().setData({list: aList}, true)

                    }
        });
    });
