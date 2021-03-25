function MnPurchase(mnId, mnTotal, mnCreatedOn, mnItems, mnSupplier) {
    if (mnId != '') {
        this.id = mnId;
    }
    this.total = mnTotal;
    this.createdOn = mnCreatedOn;
    this.items = mnItems;
    this.supplier = mnSupplier;
}

MnPurchase.fromJson = function (json) {
    console.log('MnPurchase.fromJson' + JSON.stringify(json))
    var obj = json; //JSON.parse(json);
    var purchase = new MnPurchase(obj.id, obj.total, obj.createdOn, obj.items, obj.supplier);
    return purchase;
};

MnPurchase.addUrl = serverUrl + 'api/purchase/add/'
MnPurchase.editUrl = serverUrl + 'api/purchase/edit/'
MnPurchase.viewUrl = serverUrl + 'api/purchase/view/'
MnPurchase.paginatorUrl = serverUrl + 'api/purchase/paginator/'
MnPurchase.sizeUrl = serverUrl + 'api/purchase/size/'
MnPurchase.deleteUrl = serverUrl + 'api/purchase/delete/'
MnPurchase.searchUrl = serverUrl + 'api/purchase/search/'
MnPurchase.searchSupplierUrl = serverUrl + 'api/supplier/paginator/'
MnPurchase.searchSizeUrl = serverUrl + 'api/purchase/size/all'
