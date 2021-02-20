const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const custId = urlParams.get('id')
console.log(custId);


if (!custId) {
    window.location.href = "customer_home.html";
}

var customerObj;

fetch(MnCustomer.viewUrl + 'id=' + custId)
    .then(res => res.json())
    .then(data => customerObj = MnCustomer.fromJson(data))
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


    mnCompany.value = customerObj.company
    mnName.value = customerObj.name
    mnContact.value = customerObj.contact
    mnEmail.value = customerObj.email
    mnStreet.value = customerObj.street
    mnCity.value = customerObj.city
    mnState.value = customerObj.state
    mnCountry.value = customerObj.country
    mnBank.value = customerObj.bank
    mnNotes.value = customerObj.notes

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
                title: 'Save Changes of ' + customerObj.name,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    setEditedData()
                    console.log('fetching:' + customerObj.company)
                    return fetch(MnCustomer.editUrl + 'id=' + customerObj.id, {
                            method: 'POST',
                            body: JSON.stringify(customerObj)
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
                            window.location.href = "customer_home.html";
                        })
                }
            })

        }
    })

}


function setEditedData() {


    customerObj.company = document.getElementById("company").value;
    customerObj.name = document.getElementById("name").value;
    customerObj.contact = document.getElementById("contactno").value;
    customerObj.email = document.getElementById("email").value;
    customerObj.street = document.getElementById("street").value;
    customerObj.city = document.getElementById("city").value;
    customerObj.state = document.getElementById("state").value;
    customerObj.country = document.getElementById("country").value;
    customerObj.bank = document.getElementById("bank").value;
    customerObj.notes = document.getElementById("notes").value;



}
