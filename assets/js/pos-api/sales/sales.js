function MnSales(mnId, mnTotal, mnCreatedOn, mnItems, mnCustomer) {
    if (mnId != "") {
        this.id = mnId;
    }
    this.total = mnTotal;
    this.date = mnCreatedOn;
    this.items = mnItems;
    this.customerId = mnCustomer.id;
}

MnSales.fromJson = function (json) {
    console.log("MnSales.fromJson" + JSON.stringify(json));
    var obj = json; //JSON.parse(json);
    var sales = new MnSales(
        obj.id,
        obj.total,
        obj.date,
        obj.items,
        obj.customerId
    );
    return sales;
};

MnSales.addUrl = serverUrl + "api/sales/add/";
MnSales.editUrl = serverUrl + "api/sales/edit/";
MnSales.viewUrl = serverUrl + "api/sales/view/";
MnSales.paginatorUrl = serverUrl + "api/sales/paginator/";
MnSales.sizeUrl = serverUrl + "api/sales/size/";
MnSales.deleteUrl = serverUrl + "api/sales/delete/";
MnSales.searchUrl = serverUrl + "api/sales/search/";
MnSales.searchCustomerUrl = serverUrl + "api/customer/paginator/";
MnSales.searchSizeUrl = serverUrl + "api/sales/size/all";
MnSales.searchItemUrl = serverUrl + "api/item/paginator/";
