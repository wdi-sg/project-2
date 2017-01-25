module.exports = {
  simpleFormat: function (str) {
    str = str.replace(/\r\n?/, '\n')
    // str = $.trim(str);
    if (str.length > 0) {
      str = str.replace(/\n\n+/g, '</p><p>')
      str = str.replace(/\n/g, '<br />')
      str = '<p>' + str + '</p>'
    }
    return str
  },
  dateFormat: function (str) {
  // console.log(Date.UTC(2017,02,03,02,02,02).toISOString())
    str = str.toISOString()
  //  console.log(str.substring(0, str.length - 5))

    return str.substring(0, str.length - 5)
  },
  dateShow: function (date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  },
  dateCheck: function (date) {
    return date.toLocaleDateString() === new Date().toLocaleDateString()
  }
}
