const fs = require('fs');
const path = require('path');

module.exports.jobStatus = fs.readFileSync(path.join(__dirname, 'jobStatus.gql'), 'utf8');
