let deparseType = {
    'Object': function (astValue) {
        let result = ['{'];
        astValue.forEach(v => {
            result.push('"', v.key, '":');
            switch(v.type) {
                case 'String': 
                    result.push('"',v.value,'"');
                    break;
                case 'Array':
                    console.log(v.children)
                    result.push(deparseType['Array'](v.children));
                    break;
                case 'Object':
                    result.push(deparseType['Object'](v.children));
                    break;
                default:
                    result.push(v.value);
            }
        })
        result.push('}')
        return result.join("");
    },
    'Array': function (astValue) {
        console.log(astValue)
        let result = ['['];
        let len = astValue.length;
        astValue.forEach((v, i) => {
            switch(v.type) {
                case 'String': 
                    result.push('"',v.value,'"');
                    break;
                case 'Array':
                    result.push(deparseType['Array'](v.children));
                    break;
                case 'Object':
                    result.push(deparseType['Object'](v.children));
                    break;
                default:
                    result.push(v.value);
            }
            if(i != len -1)
                result.push(',');
        })
        result.push(']');
        return result.join("");
    }
}
module.exports = function deparse(ast) {
    return deparseType[ast.type](ast.value);
}
// {"value":[{"key":"str","value":"test","children":[],"type":"String","comment":""}],"type":"Object"}