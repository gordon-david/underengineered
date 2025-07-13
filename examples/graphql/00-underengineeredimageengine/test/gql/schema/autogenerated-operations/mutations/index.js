const fs = require('fs');
const path = require('path');

module.exports.uploadImage = fs.readFileSync(path.join(__dirname, 'uploadImage.gql'), 'utf8');
