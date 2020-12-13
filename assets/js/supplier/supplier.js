function validation() {

    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')

        } else {
            supplierAdd();
        }
    })
}

function supplierAdd() {

    var mnCompany = document.getElementById("company").value;
    var mnName = document.getElementById("name").value;
    var mnContact = document.getElementById("contactno").value;
    var mnEmail = document.getElementById("email").value;
    var mnStreet = document.getElementById("street").value;
    var mnCity = document.getElementById("city").value;
    var mnState = document.getElementById("state").value;
    var mnCountry = document.getElementById("country").value;
    var mnBank = document.getElementById("bank").value;
    var mnNotes = document.getElementById("notes").value;

    var supp = new MnSupplier(mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes);
    //var supp = new MnSupplier("mnCompany", "mnName", "mnContact", "mnEmail", "mnStreet", "mnCity", "mnState", "mnCountry", "mnBank", "mnNotes");

    mnMakeRequest(supp);
    console.log('supplier: ' + supp);



    return false;

}

function MnSupplier(mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes) {
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

function mnMakeRequest(data) {
    const url = "http://localhost:9000/api/supplier/add/";
    console.log(data);
    fetch(url, {
        method: "POST",
        //mode: 'no-cors',
        //body: data,
        // -- or --
        body: JSON.stringify(data)
    }).then(function (response) {
        alert(response.status); // returns true if the response
    });
}
