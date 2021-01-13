function MnSupplier(mnId, mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes) {
    if (mnId != '') {
        this.id = mnId;
    }
    this.company = mnCompany;
    this.name = mnName;
    this.contactno = mnContact;
    this.email = mnEmail;
    this.street = mnStreet;
    this.city = mnCity;
    this.state = mnState;
    this.country = mnCountry;
    this.bank = mnBank;
    this.notes = mnNotes;
}

MnSupplier.fromJson = function (json) {
    console.log('MnSupplier.fromJson' + json)
    var obj = json; //JSON.parse(json);
    var supp = new MnSupplier(obj.id, obj.company, obj.name, obj.contactno, obj.email, obj.street, obj.city, obj.state, obj.country, obj.bank, obj.notes);
    return supp;
};

MnSupplier.addUrl = serverUrl + 'api/supplier/add/'
MnSupplier.editUrl = serverUrl + 'api/supplier/edit/'
MnSupplier.viewUrl = serverUrl + 'api/supplier/view/'
MnSupplier.paginatorUrl = serverUrl + 'api/supplier/paginator/'
MnSupplier.sizeUrl = serverUrl + 'api/supplier/size/'
MnSupplier.deleteUrl = serverUrl + 'api/supplier/delete/'
MnSupplier.searchUrl = serverUrl + 'api/supplier/search/'
