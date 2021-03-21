'use strict'
var selectedSupplier = new MnSupplier("", "", "", "", "", "", "", "", "", "", "")
var items = []
var totalPurchase = 0

async function searchSupplier() {
    const {
        value: search
    } = await Swal.fire({
        title: 'Supplier Search Term',
        input: 'text',
        inputPlaceholder: 'Name, Company'
    })
    if (search) {
        return fetch(MnPurchase.searchSizeUrl, {
            method: 'Get'
        }).then(function (response) {
            return (response.json())
        }).then(function (result) {
            return fetch(MnPurchase.searchSupplierUrl, {
                    method: 'POST',
                    body: 'offset=0&limit=' + result.totalsize + '&search=' + search
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
        }).then(function (searchResult) {

            if (searchResult.length == 0) {
                Swal.fire('No supplier found')
            } else {
                var rows = document.createElement("tbody")
                var row = document.createElement("tr")

                for (let i = 0; i < searchResult.length; i++) {
                    let jsonSupplier = MnSupplier.fromJson(searchResult[i])
                    row = document.createElement("tr")
                    row.className = 'clickable'
                    row.setAttribute('onclick', 'setActive(this);setSelectedSupplier(' + JSON.stringify(jsonSupplier) + ')')
                    row.innerHTML = '<th scope="row"  class="small">' + searchResult[i].id + '</th><td class="small">' + searchResult[i].company + '</td><td class="small">' + searchResult[i].name + '</td><td class="small">' + searchResult[i].city + '</td>'

                    rows.appendChild(row)
                }
                Swal.fire({
                    html: '<table class="table table-sm table-hover pt-1"><thead><tr><th scope="col" class="small">#</th><th scope="col" class="small">Company</th><th scope="col" class="small">Name</th><th scope="col" class="small">City</th></tr></thead>' + rows.innerHTML + '</table>',
                    showCloseButton: true,
                }).then(() => {
                    //alert(selectedSupplier.company)
                })
            }
            //alert(JSON.stringify(searchResult))

        })
    }

}

function setActive(x) {
    var clickables = document.getElementsByClassName('clickable')
    for (let i = 0; i < clickables.length; i++) {
        clickables[i].classList.remove('active')
    }
    x.classList.add('active')

}

function setSelectedSupplier(selectedSupplierVar) {
    selectedSupplier = selectedSupplierVar
    let supplierId = document.getElementById("supplierId")
    supplierId.innerHTML = selectedSupplier.id
    let supplierCompany = document.getElementById("supplierCompany")
    supplierCompany.innerHTML = selectedSupplier.company
    let supplierName = document.getElementById("supplierName")
    supplierName.innerHTML = selectedSupplier.name
    let supplierCity = document.getElementById("supplierCity")
    supplierCity.innerHTML = selectedSupplier.city

}

function addNewSupplier() {
    window.location = '../supplier/supplier_add.html?redirect=../purchase/purchase_add.html'
}

function updateSummarySection() {

    var selectedSupplierName = document.getElementById('selectedSupplierName')
    var selectedSupplierCompany = document.getElementById('selectedSupplierCompany')

    selectedSupplierName.innerHTML = 'Name: ' + selectedSupplier.name
    selectedSupplierCompany.innerHTML = 'Company: ' + selectedSupplier.company

    var accItems = document.getElementById('accordionItems')

    document.querySelectorAll('.items-data').forEach(e => e.remove());

    totalPurchase = 0

    for (let i = 0; i < items.length; i++) {

        var accItem = document.createElement('div')
        accItem.className = 'accordion-item items-data'

        var accHeader = document.createElement('div')
        accHeader.className = 'accordion-header'
        accHeader.id = 'flush-heading' + i

        var accButton = document.createElement('button')
        accButton.className = 'accordion-button collapsed'
        accButton.setAttribute('data-bs-toggle', 'collapse')
        accButton.setAttribute('data-bs-target', '#flush-collapse' + i)
        accButton.setAttribute('aria-expanded', 'false')
        accButton.setAttribute('aria-controls', 'flush-collapse' + i)
        accButton.setAttribute('type', 'button')
        accButton.innerHTML = items[i].name + ' - ' + items[i].barcode

        var accCollapse = document.createElement('div')
        accCollapse.id = 'flush-collapse' + i
        accCollapse.className = 'accordion-collapse collapse'
        accCollapse.setAttribute('aria-labelledby', 'flush-heading' + i)
        accCollapse.setAttribute('data-bs-parent', '#' + accItems.id)

        var accButtonDeleteContainer = document.createElement('div')
        accButtonDeleteContainer.className = 'd-flex flex-row-reverse'

        var accButtonDelete = document.createElement('button')
        accButtonDelete.id = 'buttonDeleteItem-' + i
        accButtonDelete.setAttribute('type', 'button')
        accButtonDelete.className = 'btn btn-primary mr-1 btn-delete-item'
        accButtonDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'


        accButtonDeleteContainer.appendChild(accButtonDelete)

        var accBody = document.createElement('div')
        accBody.className = 'accordion-body'
        accBody.innerHTML = '<dl class="row"><dt class="col-lg-6">Quantity</dt><dd class="col-lg-6">' + items[i].quantityOnHand + '</dd><dt class="col-md-6">Purchase price</dt><dd class="col-md-6">' + items[i].purchasePrice + '</dd></dl>'
        accBody.appendChild(accButtonDeleteContainer)

        accHeader.appendChild(accButton)
        accItem.appendChild(accHeader)
        accCollapse.appendChild(accBody)
        accItem.appendChild(accCollapse)
        accItems.appendChild(accItem)

        totalPurchase += items[i].purchasePrice * items[i].quantityOnHand

    }
    var totalPurchaseSummary = document.getElementById('totalPurchase')
    totalPurchaseSummary.innerHTML = 'Total Purchase: ' + totalPurchase

    addEventListenerDeleteItem()
}

function addEventListenerDeleteItem() {
    var btnDeleteItems = document.getElementsByClassName('btn-delete-item')
    for (var i = 0; i < btnDeleteItems.length; i++) {
        let j = i
        btnDeleteItems[i].addEventListener("click", function () {
            removeItem(j);
            //updateSummarySection()
        })
    }
}

function removeItem(itemVar) {

    Swal.fire({
        title: 'Delete ' + items[itemVar].name + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            items.splice(itemVar, 1)
            updateSummarySection()
        }
    })

}

function addItem() {

    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
        } else {
            if (selectedSupplier.id == undefined) {
                swal.fire({
                    icon: 'error',
                    title: 'Please select a supplier'
                })
            } else {
                var mnName = document.getElementById("itemName").value;
                var mnBarcode = document.getElementById("itemBarcode").value;
                var mnQuantityOnHand = document.getElementById("itemQuantity").value;
                var mnPurchasePrice = document.getElementById("itemPurchasePrice").value;
                var mnNotes = document.getElementById("itemNotes").value;
                var mnSellingPrice = document.getElementById("itemSellingPrice").value;
                let item = new MnItem('', mnName, mnBarcode, mnNotes, mnQuantityOnHand, mnPurchasePrice, mnSellingPrice)
                items.push(item)
                updateSummarySection()
                var summaryPanel = document.getElementById('summaryPanel')
                summaryPanel.classList.remove('d-none')
                console.log(items.length)
            }
        }
    })
}

function save() {

    let purchaseObj = new MnPurchase('', totalPurchase, new Date(), items, selectedSupplier)
    console.log(JSON.stringify(purchaseObj))

    Swal.fire({
        title: 'Save purchase?',
        icon: 'question',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(MnPurchase.addUrl, {
                method: 'Post',
                body: JSON.stringify(purchaseObj)
            }).then(function (response) {
                return response.json()
            }).then(function (result) {
            
                if (JSON.stringify(result).toLowerCase === 'Successfully added'.toLowerCase) {
                    Swal.fire({
                            text: 'Purchase saved',
                            icon: 'success',
                            timer: 3000
                        })
                        .then(function () {
                           window.location.href = "purchase_home.html";
                        })
                } else {
                    swal.fire('Error While saving the purchase', 'error')
                }

            })


        }
    })

}
