"use strict";
var selectedCustomer = new MnCustomer("", "", "", "", "", "", "", "", "", "");
var items = [];
var totalSales = 0;

async function searchItem() {
    const { value: search } = await Swal.fire({
        title: "Item Search Term",
        input: "text",
        inputPlaceholder: "Item name, barcode",
    });
    if (search) {
        return fetch(MnSales.searchSizeUrl, {
            method: "Get",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                return fetch(MnSales.searchItemUrl, {
                    method: "POST",
                    body:
                        "offset=0&limit=" +
                        result.totalsize +
                        "&search=" +
                        search,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((errolengthr) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            })
            .then(function (searchResult) {
                if (searchResult.length == 0) {
                    Swal.fire("No Item found");
                } else {
                    var rows = document.createElement("tbody");
                    var row = document.createElement("tr");

                    for (let i = 0; i < searchResult.length; i++) {
                        let jsonCustomer = MnCustomer.fromJson(searchResult[i]);
                        row = document.createElement("tr");
                        row.className = "clickable";
                        row.setAttribute(
                            "onclick",
                            "setActive(this);setSelectedCustomer(" +
                            JSON.stringify(jsonCustomer) +
                            ")"
                        );
                        row.innerHTML =
                            '<th scope="row"  class="small">' +
                            searchResult[i].id +
                            '</th><td class="small">' +
                            searchResult[i].company +
                            '</td><td class="small">' +
                            searchResult[i].name +
                            '</td><td class="small">' +
                            searchResult[i].city +
                            "</td>";

                        rows.appendChild(row);
                    }
                    Swal.fire({
                        html:
                            '<table class="table table-sm table-hover pt-1"><thead><tr><th scope="col" class="small">#</th><th scope="col" class="small">Company</th><th scope="col" class="small">Name</th><th scope="col" class="small">City</th></tr></thead>' +
                            rows.innerHTML +
                            "</table>",
                        showCloseButton: true,
                    }).then(() => {
                        //alert(selectedCustomer.company)
                    });
                }
                //alert(JSON.stringify(searchResult))
            });
    }
}
async function searchCustomer() {
    const { value: search } = await Swal.fire({
        title: "Customer Search Term",
        input: "text",
        inputPlaceholder: "Customer name, company",
    });
    if (search) {
        return fetch(MnSales.searchSizeUrl, {
            method: "Get",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                return fetch(MnSales.searchCustomerUrl, {
                    method: "POST",
                    body:
                        "offset=0&limit=" +
                        result.totalsize +
                        "&search=" +
                        search,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            })
            .then(function (searchResult) {
                if (searchResult.length == 0) {
                    Swal.fire("No Customer found");
                } else {
                    var rows = document.createElement("tbody");
                    var row = document.createElement("tr");

                    for (let i = 0; i < searchResult.length; i++) {
                        let jsonCustomer = MnCustomer.fromJson(searchResult[i]);
                        row = document.createElement("tr");
                        row.className = "clickable";
                        row.setAttribute(
                            "onclick",
                            "setActive(this);setSelectedCustomer(" +
                            JSON.stringify(jsonCustomer) +
                            ")"
                        );
                        row.innerHTML =
                            '<th scope="row"  class="small">' +
                            searchResult[i].id +
                            '</th><td class="small">' +
                            searchResult[i].company +
                            '</td><td class="small">' +
                            searchResult[i].name +
                            '</td><td class="small">' +
                            searchResult[i].city +
                            "</td>";

                        rows.appendChild(row);
                    }
                    Swal.fire({
                        html:
                            '<table class="table table-sm table-hover pt-1"><thead><tr><th scope="col" class="small">#</th><th scope="col" class="small">Company</th><th scope="col" class="small">Name</th><th scope="col" class="small">City</th></tr></thead>' +
                            rows.innerHTML +
                            "</table>",
                        showCloseButton: true,
                    }).then(() => {
                        //alert(selectedCustomer.company)
                    });
                }
                //alert(JSON.stringify(searchResult))
            });
    }
}

function setActive(x) {
    var clickables = document.getElementsByClassName("clickable");
    for (let i = 0; i < clickables.length; i++) {
        clickables[i].classList.remove("active");
    }
    x.classList.add("active");
}

function setSelectedCustomer(selectedCustomerVar) {
    selectedCustomer = selectedCustomerVar;
    let customerId = document.getElementById("customerId");
    customerId.innerHTML = selectedCustomer.id;
    let customerCompany = document.getElementById("customerCompany");
    customerCompany.innerHTML = selectedCustomer.company;
    let customerName = document.getElementById("customerName");
    customerName.innerHTML = selectedCustomer.name;
    let customerCity = document.getElementById("customerCity");
    customerCity.innerHTML = selectedCustomer.city;
}

function addNewCustomer() {
    window.location =
        "../customer/customer_add.html?redirect=../sales/sales_add.html";
}

function updateSummarySection() {
    var selectedCustomerName = document.getElementById("selectedCustomerName");
    var selectedCustomerCompany = document.getElementById(
        "selectedCustomerCompany"
    );

    selectedCustomerName.innerHTML = "Name: " + selectedCustomer.name;
    selectedCustomerCompany.innerHTML = "Company: " + selectedCustomer.company;

    var accItems = document.getElementById("accordionItems");

    document.querySelectorAll(".items-data").forEach((e) => e.remove());

    totalSales = 0;

    for (let i = 0; i < items.length; i++) {
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
            '</dd><dt class="col-md-6">Sales price</dt><dd class="col-md-6">' +
            items[i].salesPrice +
            "</dd></dl>";
        accBody.appendChild(accButtonDeleteContainer);

        accHeader.appendChild(accButton);
        accItem.appendChild(accHeader);
        accCollapse.appendChild(accBody);
        accItem.appendChild(accCollapse);
        accItems.appendChild(accItem);

        totalSales += items[i].salesPrice * items[i].quantityOnHand;
    }
    var totalSalesSummary = document.getElementById("totalSales");
    totalSalesSummary.innerHTML = "Total Sales: " + totalSales;

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
            items.splice(itemVar, 1);
            updateSummarySection();
        }
    });
}

function addItem() {
    var forms = document.querySelectorAll(".needs-validation");
    forms.forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
        } else {
            if (selectedCustomer.id == undefined) {
                swal.fire({
                    icon: "error",
                    title: "Please select a Customer",
                });
            } else {
                var mnName = document.getElementById("itemName").value;
                var mnBarcode = document.getElementById("itemBarcode").value;
                var mnQuantityOnHand = document.getElementById("itemQuantity")
                    .value;
                var mnSalesPrice = document.getElementById("itemSalesPrice")
                    .value;
                var mnNotes = document.getElementById("itemNotes").value;
                var mnSellingPrice = document.getElementById("itemSellingPrice")
                    .value;
                let item = new MnItem(
                    "",
                    mnName,
                    mnBarcode,
                    mnNotes,
                    mnQuantityOnHand,
                    mnSalesPrice,
                    mnSellingPrice
                );
                items.push(item);
                updateSummarySection();
                var summaryPanel = document.getElementById("summaryPanel");
                summaryPanel.classList.remove("d-none");
                console.log(items.length);
            }
        }
    });
}

function save() {
    let salesObj = new MnSales(
        "",
        totalSales,
        new Date(),
        items,
        selectedCustomer
    );
    console.log(JSON.stringify(salesObj));

    Swal.fire({
        title: "Save sales?",
        icon: "question",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(MnSales.addUrl, {
                method: "Post",
                body: JSON.stringify(SalesObj),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (
                        JSON.stringify(result).toLowerCase ===
                        "Successfully added".toLowerCase
                    ) {
                        Swal.fire({
                            text: "Sales saved",
                            icon: "success",
                            timer: 3000,
                        }).then(function () {
                            window.location.href = "sales_home.html";
                        });
                    } else {
                        swal.fire("Error While saving the sales", "error");
                    }
                });
        }
    });
}
