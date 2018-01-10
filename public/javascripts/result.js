// $(document).ready(function() {
//     let hexagram = $('#hexagram').text();
//
//     function retrieveAPIIngredients() {
//         return Promise.resolve($.ajax({
//             url: '/result/' + hexagram,
//             type: 'GET',
//             success: function(json) {
//                 console.log(json);
//                 // location.reload();
//                 return json;
//             },
//             error: function(xhr) {
//                 console.log("An error occured…");
//                 console.log('`xhr.status`: ');
//                 console.log(xhr.status);
//                 console.log('`xhr.statusText`');
//                 console.log(xhr.statusText);
//             }
//         }));
//     }
//
//     let ingredients = retrieveAPIIngredients();
//     console.log(ingredients);
//
//     //
//     for (text in ingredients.text) {
//         for (entry in text.entry) {
//
//         }
//     }
//
//     function callAPI() {
//
//         return Promise.resolve($.ajax({
//             url: yijing.chinese.url + yijing.chinese.urn + '/' + yijing.chinese.entry[entryName],
//             type: 'GET',
//             success: function(json) {
//                 return json;
//             },
//             error: function(xhr) {
//                 console.log("An error occured…");
//                 console.log('`xhr.status`: ');
//                 console.log(xhr.status);
//                 console.log('`xhr.statusText`');
//                 console.log(xhr.statusText);
//             }
//         }));
//     }
// });

// $.ajax({
//     url: '/delete/' + id,
//     type: 'GET',
//     success: function(data) {
//         console.log(data);
//         location.reload();
//     },
//     error: function(xhr) {
//         console.log("An error occured…");
//         console.log('`xhr.status`: ');
//         console.log(xhr.status);
//         console.log('`xhr.statusText`');
//         console.log(xhr.statusText););
//     }
// });
