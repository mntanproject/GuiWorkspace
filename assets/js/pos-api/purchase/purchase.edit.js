const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const purchaseId = urlParams.get("id");
console.log("editing purchase id: " + purchaseId);

var selectedSupplier,
  items = [];

if (!purchaseId) {
  window.location.href = "purchase_home.html";
}

var purchaseObj;
var items = [];

fetch(MnPurchase.viewUrl + "id=" + purchaseId)
  .then((res) => res.json())
  .then((data) => {
    var summaryPanel = document.getElementById("summaryPanel");
    summaryPanel.classList.remove("d-none");

    let dataItems = data.items;
    purchaseObj = MnPurchase.fromJson(data);
    selectedSupplier = MnSupplier.fromJson(data.supplier);
    for (let i = 0; i < dataItems.length; i++) {
      items.push(MnItem.fromJson(dataItems[i]));
    }
  })
  .then(() => displayExistingData());

function displayExistingData() {
  let suppId = document.getElementById("supplierId");
  let suppName = document.getElementById("supplierName");
  let suppCompany = document.getElementById("supplierCompany");
  let suppCity = document.getElementById("supplierCity");

  suppId.innerHTML = purchaseObj.supplier.id;
  suppName.innerHTML = purchaseObj.supplier.name;
  suppCompany.innerHTML = purchaseObj.supplier.company;
  suppCity.innerHTML = purchaseObj.supplier.city;

  updateSummarySection();
}

function updateSummarySection() {
  console.log("updating summary section...");
  var selectedSupplierName = document.getElementById('selectedSupplierName');
  var selectedSupplierCompany = document.getElementById('selectedSupplierCompany');

  selectedSupplierName.innerHTML = 'Name: ' + selectedSupplier.name;
  selectedSupplierCompany.innerHTML = 'Company: ' + selectedSupplier.company;

  var accItems = document.getElementById('accordionItems');

  // document.querySelectorAll('.items-data').forEach(e => e.remove());

  totalPurchase = 0;
  document.querySelectorAll('.items-data').forEach(e => e.remove());


  for (let i = 0; i < items.length; i++) {
    console.log("items ..." + i);
    var accItem = document.createElement("div");
    accItem.className = "accordion-item items-data";

    var accHeader = document.createElement("div");
    accHeader.className = "accordion-header";
    accHeader.id = "flush-heading" + i;

    var accButton = document.createElement("button");
    accButton.className = "accordion-button collapsed";
    accButton.setAttribute("data-bs-toggle", "collapse");
    accButton.setAttribute("data-bs-target", "#flush-collapse" + i);
    accButton.setAttribute("aria-expanded", "false");
    accButton.setAttribute("aria-controls", "flush-collapse" + i);
    accButton.setAttribute("type", "button");
    accButton.innerHTML = items[i].name + " - " + items[i].barcode;

    var accCollapse = document.createElement("div");
    accCollapse.id = "flush-collapse" + i;
    accCollapse.className = "accordion-collapse collapse";
    accCollapse.setAttribute("aria-labelledby", "flush-heading" + i);
    accCollapse.setAttribute("data-bs-parent", "#" + accItems.id);

    var accButtonDeleteContainer = document.createElement("div");
    accButtonDeleteContainer.className = "d-flex flex-row-reverse";

    var accButtonDelete = document.createElement("button");
    accButtonDelete.id = "buttonDeleteItem-" + i;
    accButtonDelete.setAttribute("type", "button");
    accButtonDelete.className = "btn btn-primary mr-1 btn-delete-item";
    accButtonDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';

    accButtonDeleteContainer.appendChild(accButtonDelete);

    var accBody = document.createElement("div");
    accBody.className = "accordion-body";
    accBody.innerHTML =
      '<dl class="row"><dt class="col-lg-6">Quantity</dt><dd class="col-lg-6">' +
      items[i].quantityOnHand +
      '</dd><dt class="col-md-6">Purchase price</dt><dd class="col-md-6">' +
      items[i].purchasePrice +
      "</dd></dl>";
    accBody.appendChild(accButtonDeleteContainer);

    accHeader.appendChild(accButton);
    accItem.appendChild(accHeader);
    accCollapse.appendChild(accBody);
    accItem.appendChild(accCollapse);
    accItems.appendChild(accItem);

    totalPurchase += items[i].purchasePrice * items[i].quantityOnHand;
  }
  var totalPurchaseSummary = document.getElementById("totalPurchase");
  totalPurchaseSummary.innerHTML = "Total Purchase: " + totalPurchase;

  addEventListenerDeleteItem();
}

function addEventListenerDeleteItem() {
  var btnDeleteItems = document.getElementsByClassName("btn-delete-item");
  for (var i = 0; i < btnDeleteItems.length; i++) {
    let j = i;
    btnDeleteItems[i].addEventListener("click", function () {
      removeItem(j);
      //updateSummarySection()
    });
  }
}

function removeItem(itemVar) {
  Swal.fire({
    title: "Delete " + items[itemVar].name + "?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("before remove: " + items.length);
      items.splice(itemVar, 1);
      console.log("after remove: " + items.length);
      updateSummarySection();
    }
  });
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

    //let purchaseObj = new MnPurchase('', totalPurchase, new Date(), items, selectedSupplier)
    purchaseObj.createdOn = new Date()
    console.log('save before.. ' + JSON.stringify(purchaseObj))
    for(let i=0;i<purchaseObj.items.length;i++){
        purchaseObj.items.splice(i,1)
    }
    for(let i=0;i<items.length;i++){
        purchaseObj.items.push(items[i])
    }
    console.log('save after.. ' + JSON.stringify(purchaseObj))
    
    //purchaseObj.items = items

    console.log('save.. ' + JSON.stringify(purchaseObj))

    Swal.fire({
        title: 'Save purchase?',
        icon: 'question',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(MnPurchase.editUrl + 'id=' + purchaseObj.id, {
                method: 'Post',
                body: JSON.stringify(purchaseObj)
            }).then(function (response) {
                return response.json()
            }).then(function (result) {
                if (result) {
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
