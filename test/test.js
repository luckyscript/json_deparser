const { expect } = require('chai');
const {parse} = require('json_with_comments_parser');
const deparse = require('../index')

describe('deparse', function () {
	let jsonArray = [
			'{"a":"b"}',
			'{"a":1}',
			'{"a":true}',
			'{"a":false}',
			'{"a":null}',
			'{"a": {"b": "c"}}',
			'{"a": [1,2,3]}',
			'{"a": [1,2,"a"]}',
			'{"a": [1,2,null]}',
			'{"a": [1,2,true]}',
			'{"a": [1,2,false]}',
			'{"a": [1,2,[1,2,3]]}',
			'[1,2,{"a":"b"}]',
			'[1,2,3]',
			'[1,2,"a"]',
			'[1,2,null]',
			'[1,2,true]',
			'[1,2,false]',
			'[1,2,[1,2,3]]',
			'[1,2,{"a":"b"}]',
		];
	jsonArray.forEach(v => {
		it(`${v}: `, function () {
			let input = JSON.parse(v);
			let output = JSON.parse(deparse(parse(v)));
        	expect(input).to.deep.equal(output)
		})
	})
});