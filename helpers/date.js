function getDate() {
let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date = new Date();
let month = date.getMonth();
month = monthName[month];
let day = date.getDay();
let year = date.getFullYear();
let reviewDate = month + ' ' + day + ', ' + year;
return reviewDate;
}

module.exports = getDate();
