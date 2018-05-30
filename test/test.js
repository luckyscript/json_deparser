const { expect } = require('chai');
const {parse} = require('json_with_comments_parser');
const sjc = require('strip-json-comments')
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
			'{"a":"b", "v": 1}',
			`{
				"a":"b", //test
				"v": 1
			}`,
		];
	jsonArray.forEach(v => {
		it(`${v}: `, function () {
			let input = JSON.parse(sjc(v));
			let output = JSON.parse(sjc(deparse(parse(v))));
        	expect(input).to.deep.equal(output)
		})
	})
});