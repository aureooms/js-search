
var util, array;

util = require( "util" );
array = require( "@aureooms/js-array" );


var check = function(ctor, n, diff) {
	var name = util.format("binarysearch (new %s(%d), %s)", ctor.name, n, diff);
	console.log(name);
	test(name, function (assert) {

		// ALIASES
		var iota = array.iota;
		var copy = array.copy;

		var binarysearch = search.binarysearch;

		// SETUP REF ARRAY
		var ref = new ctor(n);
		iota(ref, 0, n, 0);
		Array.prototype.sort.call ( ref, diff );

		// SETUP TEST ARRAY
		var a = new ctor(n);
		copy(ref, 0, n, a, 0);

	// TEST SEARCH
		var i = a.length;

		if(i > 0){
			// CHECK > OUTER BOUND
			var s = binarysearch( diff, a, 0, n, n);
			deepEqual(s[0], 0, 'not found ' + n);
			var x = (a[n-1] + (diff(-1, 0) < 0));
			deepEqual(s[1], x, 'where === ' + x);

			// CHECK BODY
			while (i--) {
				s = binarysearch( diff, a, 0, n, a[i]);
				deepEqual(s[0], 1, 'find  a[' + i + ']');
				deepEqual(s[1], i, 'where  === ' + i);
			}

			// CHECK < OUTER BOUND
			s = binarysearch( diff, a, 0, n, -1);
			deepEqual(s[0], 0, 'not found -1');
			x = (a[0] + (diff(-1, 0) > 0));
			deepEqual(s[1], x, 'where === ' + x);
		}
		else{
			var s = binarysearch( diff, a, 0, n, -1);
			deepEqual(s[0], 0, 'not found -1');
			deepEqual(s[1], 0, 'where === ' + 0);
		}


		// CHECK NOT MODIFIED
		deepEqual(a.length, n, 'length check');

		var notmodified = true;
		i = a.length;
		while(i--){
			if(a[i] !== ref[i]){
				notmodified = false;
				break;
			}
		}

		ok(notmodified, 'not modified check');
	});
};

var DIFF = [
	function(a, b){ return a - b; },
	function(a, b){ return b - a; }
];



var N = [0, 1, 2, 10, 31, 32, 33];

var CTOR = [
	Array,
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
];

for (var k = 0; k < CTOR.length; k++) {
	for (var j = 0; j < N.length; j++) {
		if(CTOR[k].BYTES_PER_ELEMENT &&
			N[j] > Math.pow(2, CTOR[k].BYTES_PER_ELEMENT * 8)){
				continue;
		}
		for (var i = 0; i < DIFF.length; ++i) {
			check(CTOR[k], N[j], DIFF[i]);
		}
	}
}

