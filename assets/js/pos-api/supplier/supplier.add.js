//document.querySelectorAll('[data-bs-toggle="popover"]')
//    .forEach(function (popover) {
//        new bootstrap.Popover(popover)
//    })
//bootstrap.Popover.getInstance(exampleTriggerEl) // Returns a Bootstrap popover instance
var supplierObj

function setEditedData() {

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

    supplierObj = new MnSupplier('', mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes);

    supplierObj.company = document.getElementById("company").value;
    supplierObj.name = document.getElementById("name").value;
    supplierObj.contactno = document.getElementById("contactno").value;
    supplierObj.email = document.getElementById("email").value;
    supplierObj.street = document.getElementById("street").value;
    supplierObj.city = document.getElementById("city").value;
    supplierObj.state = document.getElementById("state").value;
    supplierObj.country = document.getElementById("country").value;
    supplierObj.bank = document.getElementById("bank").value;
    supplierObj.notes = document.getElementById("notes").value;
}

function validateForm() {
    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')

        } else {
            setEditedData()
            Swal.fire({
                title: 'Save ' + supplierObj.name,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    console.log('fetching:' + supplierObj.company)
                    return fetch(MnSupplier.addUrl, {
                            method: 'POST',
                            body: JSON.stringify(supplierObj)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText)
                            }
                            return response.json()
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                            text: 'Updated',
                            icon: 'success',
                            timer: 3000
                        })
                        .then(function () {
                            // Redirect the user
                            window.location.href = "supplier_home.html";
                        })
                }
            })


        }
    })

}



//async function addSupplier() {
//    hideModal();
//
//    var mnCompany = document.getElementById("company").value;
//    var mnName = document.getElementById("name").value;
//    var mnContact = document.getElementById("contactno").value;
//    var mnEmail = document.getElementById("email").value;
//    var mnStreet = document.getElementById("street").value;
//    var mnCity = document.getElementById("city").value;
//    var mnState = document.getElementById("state").value;
//    var mnCountry = document.getElementById("country").value;
//    var mnBank = document.getElementById("bank").value;
//    var mnNotes = document.getElementById("notes").value;
//
//    var supp = new MnSupplier(mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes);
//
//
//    var isAdded = await mnMakeRequest(supp, 'http://localhost:9000/api/supplier/add/', 'POST');
//    if (isAdded) {
//        document.location.href = 'supplier_home.html'
//    } else {
//        var toastEl = document.getElementById('myToast')
//        var option = {
//            autohide: false
//        }
//        var myToast = new bootstrap.Toast(toastEl, option)
//        document.getElementById('myToastBody').innerHTML = "Unable to add supplier, please restart your phone and try again"
//        myToast.show()
//
//    }
//
//}
//
//function MnSupplier(mnCompany, mnName, mnContact, mnEmail, mnStreet, mnCity, mnState, mnCountry, mnBank, mnNotes) {
//    this.company = mnCompany;
//    this.name = mnName;
//    this.contactno = mnContact;
//    this.email = mnEmail;
//    this.street = mnStreet;
//    this.city = mnCity;
//    this.state = mnState;
//    this.country = mnCountry;
//    this.bank = mnBank;
//    this.notes = mnNotes;
//}
