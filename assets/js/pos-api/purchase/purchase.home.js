"use strict";

function getPagination(url, paginationObj, mnCallback) {
    fetch(url)
        .then((response) => response.json())
        .then(function (result) {
            let paginationTotalSize = document.getElementById(
                "paginationTotalSize"
            );
            paginationTotalSize.innerHTML =
                " of " + result.totalsize + " entries";
            mnCallback(result, paginationObj);
        });
}

async function getData(url, paginationObj, mnCallback) {
    await fetch(url, {
        method: "Get",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            if (result.length == 0) {
                emptyMessage();
            } else {
                paginationObj.recordFeedIn = result.length;
                let paginationSummary = document.getElementById(
                    "paginationSummary"
                );
                let numOffset = Number(paginationObj.offset);
                let numRecordIn = Number(paginationObj.recordFeedIn);

                paginationSummary.innerHTML =
                    "Showing " +
                    (numOffset + 1) +
                    " to " +
                    (numOffset + numRecordIn);

                result.forEach(mnCallback);
            }
        })
        .catch(function (error) {
            alert("error get data purchase_home.js " + error);
        });
}

var displayData = function (paginationObj) {
    document.querySelectorAll(".purchase-data").forEach((e) => e.remove());

    let url = MnPurchase.paginatorUrl;
    let searchTerm = document.getElementById("search").value;
    paginationObj.offset =
        (paginationObj.currentPage - 1) * paginationObj.rowsPerPage;
    paginationObj.limit = paginationObj.rowsPerPage;
    url =
        url +
        "offset=" +
        paginationObj.offset +
        "&limit=" +
        paginationObj.limit +
        "&order=" +
        paginationObj.order +
        "&descending=" +
        paginationObj.descending;
    if (searchTerm != "") {
        url = url + "&search=" + searchTerm + "&toone=1";
    }

    //alert(url)
    getData(url, paginationObj, generateSupplierHtml);
};

function init(data, pagination) {
    pagination.size = data.totalsize;
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked')
        .value;
    document
        .querySelectorAll("ul.pagination li.page-item")
        .forEach((e) => e.remove());
    generatePagination(pagination);
    displayData(pagination);
}

function emptyMessage() {
    var wrapper = document.getElementById("accordionFlushExample");
    var accItem = document.createElement("div");
    var accHeader = document.createElement("div");
    var accHeaderLink = document.createElement("a");
    var accCollapse = document.createElement("div");
    var accCollapseItem = document.createElement("div");

    accItem.className = "accordion-item supplier-data";
    accHeaderLink.id = "flush-heading-empty";
    accHeaderLink.setAttribute("role", "button");
    accHeaderLink.setAttribute("aria-expanded", "false");
    accHeaderLink.innerHTML =
        '<div class="d-flex justify-content-center pt-1">No Record Found</div>';

    accHeader.appendChild(accHeaderLink);
    accItem.appendChild(accHeader);
    accItem.appendChild(accCollapse);
    wrapper.appendChild(accItem);
}

function generateSupplierHtml(item, index, arr) {
    var purch = MnPurchase.fromJson(item);

    //console.log("purch: " + purch);
    var wrapper = document.getElementById("accordionFlushExample");
    var accItem = document.createElement("div");
    var accHeader = document.createElement("div");
    var accHeaderLink = document.createElement("a");
    var accCollapse = document.createElement("div");
    var accCollapseItem = document.createElement("div");

    accItem.className = "accordion-item purchase-data";

    accHeader.className = "accordion-header";
    accHeaderLink.className = "accordion-button collapsed btn";
    accHeaderLink.setAttribute("data-bs-toggle", "collapse");

    accHeaderLink.id = "flush-heading" + index;
    accHeaderLink.setAttribute("data-bs-target", "#flush-collapse" + index);
    accHeaderLink.setAttribute("role", "button");
    accHeaderLink.setAttribute("aria-expanded", "false");
    accHeaderLink.setAttribute("aria-controls", "#flush-collapse" + index);
    accHeaderLink.innerHTML =
        '<div class="container-fluid p-0 m-0"><dl class="row m-0"><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Id</dt>                                    <dd class="col-9 col-md-1 text-left border-right-md">' +
        purch.id +
        '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Company</dt>                                    <dd class="col-9 col-md-3 text-left border-right-md">' +
        nullValueToEmpty(purch.supplier.name) +
        '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Sales</dt><dd class="col-9 col-md-4 text-left border-right-md">' +
        nullValueToEmpty(purch.total) +
        '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">City</dt><dd class="col-9 col-md-4 text-left">' +
        nullValueToEmpty(purch.createdOn) +
        "</dd></dl></div>";

    accCollapse.className = "accordion-collapse collapse";
    accCollapse.id = "flush-collapse" + index;
    accCollapse.setAttribute("aria-labelledby", "flush-heading" + index);
    accCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

    var accCollapseItemContainer = document.createElement("div");
    var accCollapseContentContainer = document.createElement("dl");
    var accCollapseContentButtonContainer = document.createElement("div");
    var accCollapseContentDt = document.createElement("dt");
    var accCollapseContentDd = document.createElement("dd");
    var accCollapseContentButtonEdit = document.createElement("button");
    var accCollapseContentButtonDelete = document.createElement("button");

    accCollapseItem.className = "accordion-body bg-light";
    accCollapseItemContainer.className = "container-fluid";
    accCollapseContentContainer.className = "row";
    accCollapseContentButtonContainer.className =
        '"d-flex flex-row-reverse bd-highlight';

    let accCollapseContentContainerStr =
        '<table class="table table-striped"><thead><tr><th scope="col">Id</th><th scope="col">Name</th><th scope="col">Price</th><th scope="col">Quantity</th><th scope="col">Deleted</th></tr></thead><tbody>';

    let purchaseItems = purch.items;

    if (purchaseItems != null) {
        //console.log('size: ' + purchaseItems.size)
        for (let i = 0; i < purchaseItems.length; i++) {
            accCollapseContentContainerStr +=
                "<tr><td>" +
                purchaseItems[i].id +
                "</td><td>" +
                purchaseItems[i].name +
                "</td><td>" +
                purchaseItems[i].purchasePrice +
                "</td><td>" +
                purchaseItems[i].quantityOnHand +
                "</td><td>" +
                purchaseItems[i].deleted +
                "</td></tr>";
        }
    }
    accCollapseContentContainerStr += "</tbody></table>";
    accCollapseContentContainer.innerHTML = accCollapseContentContainerStr;

    accCollapseContentButtonEdit = document.createElement("button");
    accCollapseContentButtonEdit.className = "btn btn-primary ml-1 mr-1";
    accCollapseContentButtonEdit.innerHTML =
        '<i class = "fas fa-pencil-alt"></i>';
    accCollapseContentButtonDelete = document.createElement("button");
    accCollapseContentButtonDelete.className = "btn btn-primary mr-1";
    accCollapseContentButtonDelete.innerHTML =
        '<i class="fas fa-trash-alt"></i>';

    accCollapseContentButtonEdit.addEventListener("click", function () {
        window.location.href = "purchase_edit.html?id=" + purch.id;
    });

    accCollapseContentButtonDelete.addEventListener("click", function () {
        Swal.fire({
            title: "Delete " + purch.id,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(MnPurchase.deleteUrl + "id=" + purch.id)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: "success", title: "Deleted" }).then(
                    function () {
                        // Redirect the user
                        window.location.href = "purchase_home.html";
                    }
                );
            }
        });
    });

    accCollapseContentButtonContainer = document.createElement("div");
    accCollapseContentButtonContainer.className =
        "d-flex flex-row-reverse bd-highlight";
    accCollapseContentButtonContainer.appendChild(
        accCollapseContentButtonDelete
    );
    accCollapseContentButtonContainer.appendChild(accCollapseContentButtonEdit);
    accCollapseContentContainer.appendChild(accCollapseContentButtonContainer);

    accCollapseItemContainer.appendChild(accCollapseContentContainer);
    accCollapseItem.appendChild(accCollapseItemContainer);
    accCollapse.appendChild(accCollapseItem);

    accHeader.appendChild(accHeaderLink);
    accItem.appendChild(accHeader);
    accItem.appendChild(accCollapse);
    wrapper.appendChild(accItem);
}

var sortables = document.getElementsByClassName("sortable");
for (var i = 0; i < sortables.length; i++) {
    //alert(sortables[i].id)
    sortables[i].addEventListener("click", changeOrder);
}

var url = MnPurchase.sizeUrl + "all";
var numRows = document.querySelector('input[name = "btnradiorows"]:checked')
    .value;
var paginationInit = new MnPagination(
    0,
    numRows,
    1,
    3,
    "paginatorTop",
    "id",
    "1",
    displayData
);
paginationInit.paginationUrl = url;
getPagination(paginationInit.paginationUrl, paginationInit, init);

function noRowsChanged() {
    let url = MnPurchase.sizeUrl;
    let searchTerm = document.getElementById("search").value;
    if (searchTerm == "") {
        url = url + "all";
    } else {
        url = url + "search=" + searchTerm;
    }
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked')
        .value;
    //var pagination = new MnPagination(0, numRows, 1, 3, 'paginatorTop', 'id', '', displayData)
    paginationInit.rowsPerPage = numRows;
    paginationInit.currentPage = 1;
    getPagination(url, paginationInit, init);
}

function changeOrder() {
    let from = this.id;
    let url = MnPurchase.sizeUrl;
    let searchTerm = document.getElementById("search").value;
    if (searchTerm == "") {
        url = url + "all";
    } else {
        url = url + "search=" + searchTerm;
    }
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked')
        .value;
    var desc = 0;

    if (this.classList.contains("asc")) {
        this.classList.remove("asc");
        this.classList.add("desc");
        desc = 1;
    } else if (this.classList.contains("desc")) {
        this.classList.remove("desc");
        this.classList.add("asc");
        desc = 0;
    } else {
        this.classList.add("asc");
    }

    for (var i = 0; i < sortables.length; i++) {
        if (sortables[i].id != from) {
            sortables[i].classList.remove("desc");
            sortables[i].classList.remove("asc");
        }
    }

    paginationInit.order = from;
    paginationInit.descending = desc;
    getPagination(url, paginationInit, init);
}

function search() {
    var url =
        MnPurchase.sizeUrl +
        "search=" +
        document.getElementById("search").value;
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked')
        .value;
    paginationInit.rowsPerPage = numRows;
    paginationInit.currentPage = 1;
    getPagination(url, paginationInit, init);
}
