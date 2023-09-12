sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, FilterOperator, Filter) {
        "use strict";

    return Controller.extend("projectb1304.controller.View2", {
          //formatter 객체 안에다 format function들을 넣고 관리
        formatter : {
          //fndatestring => 날짜 객체를 'yyyy-mm-dd' 형태로 변경
          fnDateString : function(oDate) {
            if(oDate){
                var oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                  pattern : 'yyyy-MM-dd'
                });
                return oDateTimeInstance.format(oDate);
            }
          }
        },

         onInit: function () {
            },

         onValueHelp : function() {
          var oDialog = sap.ui.getCore().byId("idDialog");
          
          if(oDialog){
            oDialog.open();
          }else{
          Fragment.load({
            name : 'projectb1304.view.fragment.Order',
            type : 'XML',
            controller : this
          }).then(function(oDialog){
            oDialog.setModel(this.getView().getModel())
            oDialog.open();
          }.bind(this)); 
                }

            },
        onValueHelp2 : function(){
            var oDialog2 = sap.ui.getCore().byId("idDialog2");
          
            if(oDialog2){
              oDialog2.open();
            }else{
            Fragment.load({
              name : 'projectb1304.view.fragment.Customers',
              type : 'XML',
              controller : this
            }).then(function(oDialog2){
              oDialog2.setModel(this.getView().getModel())
              oDialog2.open();
            }.bind(this)); 
                  }

          },

         onClose : function(oEvent){
                var oButton = oEvent.getSource();  
                var oDialog = oButton.getParent();     
               oDialog.close();
            },

         onBeforeOpen: function () {
                var oTable = sap.ui.getCore().byId('idOrderTable');
                var oFilter =   new Filter({
                  path: "EmployeeID",
                  operator: "GE",
                  value1: 4
                });
                oTable.getBinding('rows').filter(oFilter)
              },

         onSearch: function () {
                var inputNum = this.byId('idInput').getValue()
                var inputCust=this.byId('idInput2').getValue()
                var inputDate=this.byId('idDate').getDateValue()
                var inputDate2=this.byId('idDate').getSecondDateValue()
                var oFilter = []

                if(inputNum){
                  oFilter.push(
                    new Filter({
                      path: "OrderID",
                      operator: "EQ",
                      value1: inputNum
                    })
                  )
                }

                if(inputCust){
                  oFilter.push(
                    new Filter({
                      path: "CustomerID",
                      operator: "EQ", 
                      value1: inputCust
                    })
                  )
                }

                if(inputDate && inputDate2){
                  oFilter.push(
                    new Filter({
                      path: "OrderDate",
                      operator: "BT",
                      value1: inputDate,
                      value2: inputDate2
                    })
                  )
                }

                this.byId("idProductsTable").getBinding('items').filter(oFilter)
              },

         onNavDetail: function() {
          //Detail.view.xml 화면으로 이동
          var oRouter = this.getOwnerComponent().getRouter();
          //oRouter.navTo(/* 라우트 객체 이름 */);
              oRouter.navTo("RouteDetail", {
              paramOrder : 'OderID',
              param2 : 'Option'
          });
        },
         onSelectionChange : function(oEvent){
         
          var sPathItem = this.getView().getModel().getProperty(oEvent.getParameters().listItem.getBindingContextPath()).OrderID
          // var sPathItem = oEvent.getParameters().listItem.getBindingContextPath()
          // var sPathItem2 = this.getView().getModel().getProperty(sPathItem)
          // var sPathItem3 = sPathItem2.OrderID

          var oRouter = this.getOwnerComponent().getRouter();
          //oRouter.navTo(/* 라우트 객체 이름 */);
              oRouter.navTo("RouteDetail", {
              paramOrder : sPathItem
          });
          // oDateModel.getProperty(경로) 해서 한 건의 데이터 전체 가져오기
          // -> 그 안에서 OderID 값을 얻을 수 있다.
          // 해당 OrderID(필수 파라미터)를 가지고 Detail 화면으로 이동
        
          // 테스트
          //  Detail 라우터의 URL에 OrderID값이 잘 들어오는 지 확인
        },
        
        onSelet: function(oEvent){
          var getId = this.getView().getModel().getProperty("/"+oEvent.getSource().getBinding('rows').aKeys[oEvent.getParameters().rowIndices]).OrderID
          console.log(getId)
          this.byId("idInput").setValue(getId)
          sap.ui.getCore().byId("idDialog").close()
      }
            })
          })
