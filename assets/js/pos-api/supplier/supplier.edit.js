const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const suppId = urlParams.get('id')
console.log(suppId);



var supplierObj;

fetch('http://localhost:9000/api/supplier/view/id=' + suppId)
    .then(res => res.json())
    .then(data => supplierObj = MnSupplier.fromJson(data))
    .then(() => displayExistingData())


function displayExistingData() {

    var mnCompany = document.getElementById("company");
    var mnName = document.getElementById("name");
    var mnContact = document.getElementById("contactno");
    var mnEmail = document.getElementById("email");
    var mnStreet = document.getElementById("street");
    var mnCity = document.getElementById("city");
    var mnState = document.getElementById("state");
    var mnCountry = document.getElementById("country");
    var mnBank = document.getElementById("bank");
    var mnNotes = document.getElementById("notes");


    mnCompany.value = supplierObj.company
    mnName.value = supplierObj.name
    mnContact.value = supplierObj.contactno
    mnEmail.value = supplierObj.email
    mnStreet.value = supplierObj.street
    mnCity.value = supplierObj.city
    mnState.value = supplierObj.state
    mnCountry.value = supplierObj.country
    mnBank.value = supplierObj.bank
    mnNotes.value = supplierObj.notes

}

function validateForm() {
    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')

        } else {
            Swal.fire({
                title: 'Save Changes of ' + supplierObj.name,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    setEditedData()
                    console.log('fetching:' + supplierObj.company)
                    return fetch('http://localhost:9000/api/supplier/edit/id=' + supplierObj.id, {
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


function setEditedData() {


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
