/**
 * Created by Apple on 17/2/20.
 */
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname.replace(/ng-frontend\/lib/,'ng-frontend/');
function generateStructure(project){
    return fs.copyAsync(root+'structure', project,{clobber: true})
        .then(function(err){
            if(err){
                console.error(err);
            }else{
                var p = fs.realpathSync(project);
                fs.symlinkSync(p+"/src",p+"/dist/scripts.src");
                return console.log('generate project success');
            }
        })
}

module.exports = generateStructure;