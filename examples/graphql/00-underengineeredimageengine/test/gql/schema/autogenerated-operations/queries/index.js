const fs = require('fs');
const path = require('path');

module.exports.job = fs.readFileSync(path.join(__dirname, 'job.gql'), 'utf8');
