$(document).ready(function(){


// ====== Adding item to cart ======
// On click of "add to cart", append to cart
$(".addOrderBtn").on("click", function() {
  var name = $(this).data("name");
  var price = $(this).data("price");
  var id = $(this).data("id");

  //itemList is inside home.handlebars
  $( ".itemList" ).append( "<div class='singleItem' id=" + id + "></div>" );
  $( "#" + id ).append("<p>" + name + "</p>");
  $( "#" + id ).append("<p>SGD$: " + price + "</p>");
  $( "#" + id ).append('<input class="addQuantity" type="number" value="1" min="0"><br><br>');

    // This is how it looks like
    // <div class="singleItem" id="unique ID of item">
    // name
    // <p>SGD$: price</p>
    // <input class="addQuantity" type="number" value="1" min="0">
    // <br><br>
});



// ====== MAIN ORDER BUTTON ======
$("#mainOrderBtn").on("click", function() {
  // console.log($(".itemList").children("div"));
  // $(".itemList").children()

  var idArray = []
  var quantityArray = []
  var selectedCustomer;
  var custSelectValue = $("#custSelectDropdown").val();
  console.log(custSelectValue);

  $(".itemList").children("div").each(function() {
    // for each child of itemlist, push the id inside
    // console.log($(this).attr("id"));
    idArray.push($(this).attr("id"));
  })

  $(".addQuantity").each(function() {
    // console.log($(this).val());
    quantityArray.push($(this).val());
  })

  var orderedItemsArray = []
  for(var i = 0; i < idArray.length; i++){
    var orderedItemsObj = {};
    orderedItemsObj["item_id"] = idArray[i];
    orderedItemsObj["quantity"] = quantityArray[i];
    orderedItemsObj["customer_id"] = custSelectValue;
    // console.log(idArray[i])
    // console.log(quantityArray[i]);
    // console.log(custSelectValue);
    // console.log(orderedItemsObj);
    orderedItemsArray.push(orderedItemsObj);
    // console.log(orderedItemsArray);


  }
console.log(orderedItemsArray[0].customer_id);



  $.ajax({
    url: /order/,
    type: 'post',
    data: {'object': orderedItemsArray},
    success: function(data) {
      console.log(data);
    },
    error: function(data){
      console.log(data);
    }
  });

});













}); // End document.ready
