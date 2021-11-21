const bycript = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bycript.genSaltSync(10);
    const hash = await bycript.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, hash) => {
    const result = await bycript.compare(password, hash);
    return result;
};
module.exports = helpers;