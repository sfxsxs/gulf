gulf.factory('ConverBase64', function () {

//    var Base64 = {
//        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
//        encode: function (e) {
//            var t = "";
//            var n, r, i, s, o, u, a;
//            var f = 0;
//            e = Base64._utf8_encode(e);
//            while (f < e.length) {
//                n = e.charCodeAt(f++);
//                r = e.charCodeAt(f++);
//                i = e.charCodeAt(f++);
//                s = n >> 2;
//                o = (n & 3) << 4 | r >> 4;
//                u = (r & 15) << 2 | i >> 6;
//                a = i & 63;
//                if (isNaN(r)) {
//                    u = a = 64
//                } else if (isNaN(i)) {
//                    a = 64
//                }
//                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
//            }
//            return t
//        },
//        decode: function (e) {
//            var t = "";
//            var n, r, i;
//            var s, o, u, a;
//            var f = 0;
//            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
//            while (f < e.length) {
//                s = this._keyStr.indexOf(e.charAt(f++));
//                o = this._keyStr.indexOf(e.charAt(f++));
//                u = this._keyStr.indexOf(e.charAt(f++));
//                a = this._keyStr.indexOf(e.charAt(f++));
//                n = s << 2 | o >> 4;
//                r = (o & 15) << 4 | u >> 2;
//                i = (u & 3) << 6 | a;
//                t = t + String.fromCharCode(n);
//                if (u != 64) {
//                    t = t + String.fromCharCode(r)
//                }
//                if (a != 64) {
//                    t = t + String.fromCharCode(i)
//                }
//            }
//            t = Base64._utf8_decode(t);
//            return t
//        },
//        _utf8_encode: function (e) {
//            e = e.replace(/rn/g, "n");
//            var t = "";
//            for (var n = 0; n < e.length; n++) {
//                var r = e.charCodeAt(n);
//                if (r < 128) {
//                    t += String.fromCharCode(r)
//                } else if (r > 127 && r < 2048) {
//                    t += String.fromCharCode(r >> 6 | 192);
//                    t += String.fromCharCode(r & 63 | 128)
//                } else {
//                    t += String.fromCharCode(r >> 12 | 224);
//                    t += String.fromCharCode(r >> 6 & 63 | 128);
//                    t += String.fromCharCode(r & 63 | 128)
//                }
//            }
//            return t
//        },
//        _utf8_decode: function (e) {
//            var t = "";
//            var n = 0;
//            var r = c1 = c2 = 0;
//            while (n < e.length) {
//                r = e.charCodeAt(n);
//                if (r < 128) {
//                    t += String.fromCharCode(r);
//                    n++
//                } else if (r > 191 && r < 224) {
//                    c2 = e.charCodeAt(n + 1);
//                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
//                    n += 2
//                } else {
//                    c2 = e.charCodeAt(n + 1);
//                    c3 = e.charCodeAt(n + 2);
//                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
//                    n += 3
//                }
//            }
//            return t
//        }
//    }

var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
    
    
    return {
        convertBase64: function (Data) {

	//var converedData = $.base64.encode(Data)
           var converedData = Base64.encode(Data);
            return converedData;


        }


    }


});