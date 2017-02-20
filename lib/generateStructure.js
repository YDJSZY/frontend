/**
 * Created by Apple on 17/2/20.
 */
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs-extra'));
function generateStructure(project){
    return fs.copyAsync('structure', project,{clobber: true})
        .then(function(err){
            return err ?  console.error(err) : console.log('generate project success');
        })
}

module.exports = generateStructure;