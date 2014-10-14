

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
