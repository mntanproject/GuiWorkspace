const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const itemId = urlParams.get("id");
console.log(itemId);

if (!itemId) {
    window.location.href = "item_home.html";
}

var itemObj;

fetch(MnItem.viewUrl + "id=" + itemId)
    .then((res) => res.json())
    .then((data) => (itemObj = MnItem.fromJson(data)))
    .then(() => displayExistingData());

function displayExistingData() {
    var mnName = document.getElementById("name");
    var mnSellingPrice = document.getElementById("sellingPrice");
    var mnPurchasePrice = document.getElementById("purchasePrice");
    var mnQuantityOnHand = document.getElementById("quantityOnHand");
    var mnNotes = document.getElementById("notes");
    var mnBarcode = document.getElementById("barcode");

    mnName.value = itemObj.name;
    mnBarcode.value = itemObj.barcode;
    mnSellingPrice.value = itemObj.sellingPrice;
    mnPurchasePrice.value = itemObj.purchasePrice;
    mnQuantityOnHand.value = itemObj.quantityOnHand;
    mnNotes.value = itemObj.notes;
}

function validateForm() {
    var forms = document.querySelectorAll(".needs-validation");
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
        } else {
            Swal.fire({
                title: "Save Changes of " + itemObj.name,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    setEditedData();
                    console.log("fetching:" + itemObj.name);
                    return fetch(MnItem.editUrl + "id=" + itemObj.id, {
                        method: "POST",
                        body: JSON.stringify(itemObj),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            );
                        });
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Updated",
                        icon: "success",
                        timer: 3000,
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "item_home.html";
                    });
                }
            });
        }
    });
}

function setEditedData() {
    itemObj.name = document.getElementById("name").value;
    itemObj.barcode = document.getElementById("barcode").value;
    itemObj.sellingPrice = document.getElementById("sellingPrice").value;
    itemObj.purchasePrice = document.getElementById("purchasePrice").value;
    itemObj.quantityOnHand = document.getElementById("quantityOnHand").value;
    itemObj.notes = document.getElementById("notes").value;
}
