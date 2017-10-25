

function toRad(x) {
   return x * Math.PI / 180;
}
function distance(position1,position2){
    var lat1=position1.latitude;
    var lat2=position2.latitude;
    var lon1=position1.longitude;
    var lon2=position2.longitude;
    var R = 6371000; // metres
    var φ1 = toRad(lat1);
    var φ2 = toRad(lat2)
    var Δφ = toRad(lat2-lat1)
    var Δλ = toRad(lon2-lon1)
    // console.log(Δφ, Δλ);
    // var φ2 = lat2.toRad;
    // var Δφ = (lat2-lat1).toRad;
    // var Δλ = (lon2-lon1).toRad;
    //
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        // console.log(a);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // console.log(c);

    var d = R * c;
    // console.log(d);
    return d;
}
module.exports = distance
