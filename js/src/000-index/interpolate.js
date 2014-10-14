

var interpolate = function ( delta, a, i, j, k ) {

	var w, d, p;

	w = delta( a[j-1], a[i] );
	d = delta( k, a[i] );

	if ( w === 0 ) {
		w = 1;
		d = d > 0;
	}

	p = i + Math.floor( d * (j - i - 1) / w );
	return Math.max( i, Math.min( j - 1, p ) );
};

exports.interpolate = interpolate;
