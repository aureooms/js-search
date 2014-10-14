(function(exports, undefined){

	'use strict';


/* js/src/000-index */
/* js/src/000-index/interpolate.js */


var interpolate = function ( delta, a, i, j, k ) {

	var w, d, p;

	w = delta( a[j - 1], a[i] );
	d = delta( k, a[i] );

	if ( w === 0 ) {
		w = 1;
		d = d > 0;
	}

	p = i + Math.floor( d * (j - i - 1) / w );
	return Math.max( i, Math.min( j - 1, p ) );
};

exports.interpolate = interpolate;

/* js/src/000-index/median.js */

var median = function ( delta, a, i, j, k ) {
	return ( i + j ) / 2 | 0;
};

exports.median = median;

/* js/src/001-search */
/* js/src/001-search/pivotsearch.js */


var __pivotsearch__ = function ( pivot ) {

	/**
	 * Searches an element in a sorted array.
	 *
	 * @returns {(int, int)} a tuple where the first element is 1
	 * iff the item was found, and the second element is the place
	 * where the element should be inserted to keep the
	 * array sorted.
	 */

	var pivotsearch = function( delta, a, i, j, k ){

		var p, d;

		if ( i === j ) {
			return [0, i];
		}

		p = pivot( delta, a, i, j, k );
		d = delta( k, a[p] );


		if ( d === 0 ) {
			return [1, p];
		}

		else if ( d < 0 ) {
			return pivotsearch( delta, a, i, p, k );
		}

		else {
			return pivotsearch( delta, a, p + 1, j, k );
		}

	};

	return pivotsearch;

};

exports.__pivotsearch__ = __pivotsearch__;

/* js/src/999-custom */
/* js/src/999-custom/binarysearch.js */

exports.binarysearch = __pivotsearch__( median );

/* js/src/999-custom/interpolationsearch.js */

exports.interpolationsearch = __pivotsearch__( interpolate );

})(typeof exports === 'undefined' ? this['search'] = {} : exports);
