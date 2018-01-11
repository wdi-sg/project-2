


$(document).ready(function() {
    var reference = document.querySelectorAll('.api');
    console.log(reference);
    Array.prototype.forEach.call(reference, (link, index) => {
        let url = link.getAttribute('href');
        console.log('API URL: ');
        console.log(url);
        let arrayPosition = link.getAttribute('id').split("-")[1]
        console.log('Position in array');
        console.log(arrayPosition);
        // console.log(document.querySelectorAll(a[href]));
        // if (chapter.getElementsByClassName('line').length != 6) {
        // 	console.log(chapter.getElementsByClassName('line').length)
        // }
        console.log(link.children.length)
    });
//     $('').attr("href");
//     $('#reference').contents();
//     $('').
//     $('').
//     let hexagram = $('#hexagram').text();
//
    function retrieveAPIIngredients() {
        return Promise.resolve($.ajax({
            url: '/result/' + hexagram,
            type: 'GET',
            success: function(json) {
                console.log(json);
                // location.reload();
                return json;
            },
            error: function(xhr) {
                console.log("An error occured…");
                console.log('`xhr.status`: ');
                console.log(xhr.status);
                console.log('`xhr.statusText`');
                console.log(xhr.statusText);
            }
        }));
    }
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
});
