


$(document).ready(function() {
    var reference = document.querySelectorAll('.api');
    console.log(reference);
    Array.prototype.forEach.call(reference, (link, index) => {
        let url = link.getAttribute('href');
        console.log('API URL: ');
        console.log(url);

        let id = link.getAttribute('id');
        let arrayPosition
        id.split('-').length == 3 ? arrayPosition = id.split('-')[2] : arrayPosition = id.split('-')[1];

        console.log('Position in array');
        console.log(arrayPosition);

        let whichBook = id.split("-")[0];
        console.log('Source of text:');
        console.log(whichBook);

        let whichPart = id.split("-")[1];
        console.log('Which part of the Book of Changes:');
        console.log(whichPart);

        let citation;
        console.log('Name of part of Book of Changes:');

        $.ajax({
            url: url,
            type: 'GET',
            success: function(json) {
                let retrieved = json.fulltext[arrayPosition];
                console.log(retrieved);

                if (whichBook == 'yijing') {
                    if (whichPart == 'classic') {
                        citation = "《周易》：";
                    } else if (whichPart == 'image') {
                        citation = "《周易·象傳》：";
                    } else if (whichPart == 'judgment') {
                        citation = "《周易·彖傳》：";
                    }
                } else if (whichBook == 'yilin') {
                    citation = "《焦氏易林》：";
                }
                console.log(citation);

                $('#retrieved-text').append('<h4 class="is-size-6">' + citation +'</h4>')
                $('#retrieved-text').append('<p class=" is-size-4">' + retrieved + '</p');
            },
            error: function() {
                console.log("An error occured…");
                console.log('`xhr.status`: ');
                console.log(xhr.status);
                console.log('`xhr.statusText`');
                console.log(xhr.statusText);
            }
        })
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
