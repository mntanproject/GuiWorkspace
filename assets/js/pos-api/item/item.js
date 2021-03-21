   function MnItem(mnId, mnName, mnBarcode, mnNotes, mnQuantityOnHand, mnPurchasePrice, mnSellingPrice) {
       if (mnId != '') {
           this.id = mnId;
       }
       this.name = mnName;
       this.barcode = mnBarcode;
       this.notes = mnNotes;
       this.quantityOnHand = mnQuantityOnHand;
       this.purchasePrice = mnPurchasePrice;
       this.sellingPrice = mnSellingPrice;
   }

   MnItem.fromJson = function (json) {
       console.log('MnItem.fromJson' + json)
       var obj = json; //JSON.parse(json);
       var item = new MnItem(obj.id, obj.name, obj.barcode, obj.notes, obj.quantityOnHand, obj.purchasePrice, obj.sellingPrice);
       return item

   }

   MnItem.addUrl = serverUrl + 'api/item/add/'
   MnItem.editUrl = serverUrl + 'api/item/edit/'
   MnItem.viewUrl = serverUrl + 'api/item/view/'
   MnItem.paginatorUrl = serverUrl + 'api/item/paginator/'
   MnItem.sizeUrl = serverUrl + 'api/item/size/'
   MnItem.deleteUrl = serverUrl + 'api/item/delete/'
   MnItem.searchUrl = serverUrl + 'api/item/search/'
