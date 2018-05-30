const debug = require('debug')('deparse:info')
let deparseType = {
    'Object': function (astValue, depth=0) {
        let indent = this.config.indent;
        let result = ['{', '\n'];
        let len = astValue.length;
        astValue.forEach((v, i) => {
            result.push(indent.repeat(depth+1),'"', v.key, '": ');
            switch(v.type) {
                case 'String': 
                    result.push('"',v.value,'"');
                    break;
                case 'Array':
                    result.push(deparseType['Array'](v.children, depth+1));
                    break;
                case 'Object':
                    result.push(deparseType['Object'](v.children, depth+1));
                    break;
                default:
                    result.push(v.value);
            }
            if(i != len -1)
                result.push(',');
            if(v.comment) {
                result.push(` // ${v.comment}`)
            }
            if(i != len -1)
                result.push('\n');
        })
        result.push('\n',indent.repeat(depth),'}')
        return result.join("");
    },
    'Array': function (astValue, depth=0) {
        let indent = this.config.indent;
        let result = ['[', '\n'];
        let len = astValue.length;
        astValue.forEach((v, i) => {
            switch(v.type) {
                case 'String': 
                    result.push(indent.repeat(depth+1),'"',v.value,'"');
                    break;
                case 'Array':
                    result.push(indent.repeat(depth+1),deparseType['Array'](v.children, depth+1));
                    break;
                case 'Object':
                    result.push(indent.repeat(depth+1),deparseType['Object'](v.children, depth+1));
                    break;
                default:
                    result.push(indent.repeat(depth+1),v.value);
            }
            if(i != len -1)
                result.push(',\n');
        })
        result.push('\n',indent.repeat(depth),']');
        return result.join("");
    },
    config: {
        indent: ' '.repeat(2),
    }
}
module.exports = function deparse(ast, config) {
    deparseType.config = Object.assign(deparseType.config, config)
    let result = deparseType[ast.type](ast.value);
    debug(result);
    return result;
}