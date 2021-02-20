function MnItem(mnId, mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes) {
    if (mnId != '') {
        this.id = mnId;
    }
    this.company = mnCompany;
    this.name = mnName;
    this.contact = mnContact;
    this.email = mnEmail;
    this.street = mnStreet;
    this.city = mnCity;
    this.state = mnState;
    this.country = mnCountry;
    this.bank = mnBank;
    this.notes = mnNotes;
}

MnCustomer.fromJson = function (json) {
    console.log('MnCustomer.fromJson' + json)
    var obj = json; //JSON.parse(json);
    var cust = new MnCustomer(obj.id, obj.company, obj.name, obj.contact, obj.email, obj.street, obj.city, obj.state, obj.country, obj.bank, obj.notes);
    return cust;
};

MnCustomer.addUrl = serverUrl + 'api/customer/add/'
MnCustomer.editUrl = serverUrl + 'api/customer/edit/'
MnCustomer.viewUrl = serverUrl + 'api/customer/view/'
MnCustomer.paginatorUrl = serverUrl + 'api/customer/paginator/'
MnCustomer.sizeUrl = serverUrl + 'api/customer/size/'
MnCustomer.deleteUrl = serverUrl + 'api/customer/delete/'
MnCustomer.searchUrl = serverUrl + 'api/customer/search/'
