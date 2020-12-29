//document.querySelectorAll('[data-bs-toggle="popover"]')
//    .forEach(function (popover) {
//        new bootstrap.Popover(popover)
//    })
//bootstrap.Popover.getInstance(exampleTriggerEl) // Returns a Bootstrap popover instance

function validateForm() {
    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')

        } else {
            var mnCompany = document.getElementById("company").value;
            var mnName = document.getElementById("name").value;
            document.getElementById('myModalBody').innerHTML = '<p class="text-center">Save ' + mnCompany + ', ' + mnName + ' as supplier?</p>';
            document.getElementById('myModalTitle').innerHTML = '<i class="fas fa-people-carry mr-2"></i>Supplier'
            showModal();

        }
    })

}


var btnModalYes = document.getElementById('btnModalYes');
btnModalYes.onclick = function () {
    addSupplier();
};

function hideModal() {
    var modalElement = document.getElementById('myModal');
    var modalInstance = mnGetModalInstance(modalElement);
    modalInstance.hide();
}

function showModal() {
    var modalElement = document.getElementById('myModal');
    var modalOption;
    var modalInstance = mnGenerateModal(modalElement, modalOption);
    modalInstance.show();
}

async function addSupplier() {
    hideModal();

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


    var isAdded = await mnMakeRequest(supp, 'http://localhost:9000/api/supplier/add/', 'POST');
    if (isAdded) {
        document.location.href = 'supplier_home.html'
    } else {
        var toastEl = document.getElementById('myToast')
        var option = {
            autohide: false
        }
        var myToast = new bootstrap.Toast(toastEl, option)
        document.getElementById('myToastBody').innerHTML = "Unable to add supplier, please restart your phone and try again"
        myToast.show()

    }

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
