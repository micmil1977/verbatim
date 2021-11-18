let _TSON;
let _types;
function getTSON() {
    if (!_TSON) {
        if (!_types) {
            throw new Error('Typson types not inited yet.');
        }
        const Typeson = require('typeson');
        _TSON = new Typeson().register(_types);
    }
    return _TSON;
}

// Must be called before using serialize/deserialize
exports.setTypsonTypes = function (types) {
    if (_TSON) {
        throw new Error('TSON already inited.');
    }
    _types = types;
}

exports.serialize = function (obj) {
    const data = getTSON().stringifySync(obj);
    return [ Buffer.from(data) ];
}

exports.deserialize = function (buffers) {
    const data = buffers.shift().toString();
    return getTSON().parseSync(data);
}
