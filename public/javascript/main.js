$(document).ready(function(){



// On click of "add to cart", append to cart
$(".addOrderBtn").on("click", function() {
  var name = $(this).data("name");
  var price = $(this).data("price");
  var id = $(this).data("id");

  //itemList is inside home.handlebars
  $( ".itemList" ).append( "<div class='singleItem' id=" + id + "></div>" );
  $( "#" + id ).append(name);
  $( "#" + id ).append("<p>SGD$: " + price + "</p>");
  $( "#" + id ).append('<input class="addQuantity" type="number" value="1" min="0"><br><br>');

  // This is how it looks like
    // <div class="singleItem" id="unique ID of item">
    // name
    // <p>SGD$: price</p>
    // <input class="addQuantity" type="number" value="1" min="0">
    // <br><br>
});
















}); // End document.ready
