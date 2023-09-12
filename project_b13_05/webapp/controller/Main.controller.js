sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projectb1305.controller.Main", {
            onInit: function () {
                this._setChartInView();
                this._setChartInController();           
            },
            _setChartInView: function(){
                var oData = { 
                    list : [{name:'aaa',rate:'35', cost:'10'},
                            {name:'bbb',rate:'15', cost:'12'},
                            {name:'ccc',rate:'10', cost:'11'},
                            {name:'ddd',rate:'35', cost:'15'},
                            {name:'eee',rate:'5', cost:'10'},
                            {name:'fff',rate:'15', cost:'17'},  ]
                        };
                var oModel = new JSONModel(oData); 
                this.getView().setModel(oModel,'view')
            },
            _setChartInController: function(){
                var oData ={
                    sales: [
                        {product: 'Jackets', amount: '65'},
                        {product: 'Shirts', amount: '70'},
                        {product: 'Pants', amount: '83'},
                        {product: 'Coats', amount: '92'},
                        {product: 'Purse', amount: '77'},
                    ]
                };
                this.getView().setModel(new JSONModel(oData),'cont');
                
                //chart
                var oColChart = this.getView().byId("idChart");

                //dataset
                var oColDataset = new sap.viz.ui5.data.FlattenedDataset({
                    data: { path:"cont>/sales" },
                    dimensions: [{name: "Product", value: "{cont>product}"}],
                    measures: [{name: "Amount", value: "{cont>amount}"}]                   
                });

                oColChart.setDataset(oColDataset);

                //feeds
                var oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid : "valueAxis",
                    type: "Measure",
                    values: ["Amount"]
                });
                var oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid : "categoryAxis",
                    type: "Dimension",
                    values: ["Product"]
                });
                oColChart.addFeed(oFeedItemValue);
                oColChart.addFeed(oFeedItemCategory);
                    
                //optional
                oColChart.setVizProperties({
                    'title' : {'visible' : true, 'text' : 'Line Chart'},
                    'legendGroup' : {layout : {position : 'left'}},
                    'plotArea' : {
                        drawingEffect: 'glossy',
                        colorPalette: ['#B7F0B1','#B2EBF4','#FFC19E']
                    }
                })
            }
        });
    });
