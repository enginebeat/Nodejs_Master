/*
*   Library for storing and editing data
*/


/* Dependencies */

var fs = require('fs');
var path = require('path');


/* Container for the module (to be exported) */

var lib = {};

/* Define Base directory of the data folder */
lib.baseDir = path.join(__dirname, '/../.data/');

/* write data to a file */
lib.create = (dir, file, data, callback)=>{
    /* open the file for writing */
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            /* Convert data to a string */
            var stringData = JSON.stringify(data);
            /* write to file */
            fs.writeFile(fileDescriptor, stringData, (err)=>{
                if(!err){
                    /* Close file */
                    fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false);
                        }else{
                            callback('error closing file!')
                        }
                    })
                }else{
                    callback('error writing to new file!');
                }
            })
        }else{
            callback('could not create new file, it may already exist.')
        }
    });

};


/* Read Data from a File */

lib.read = (dir, file, callback)=>{
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data)=>{
        callback(err, data);
    });

};

/* Update data inside a file */
lib.update = (dir, file, data, callback)=>{
    /* Open File for Writing */
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            /* Convert data to a string */
            var stringData = JSON.stringify(data);

            /* Truncate the file */
            fs.truncate(fileDescriptor, (err)=>{
                if(!err){
                    /* write to the file and close it */
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err){
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback('Error closing file') 
                                }
                            });
                        }else{
                           callback('Error writing to the file ') 
                        }
                    });
                }else {
                    callback('Error truncating file');
                }
            })
        }else{
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
};

/* Delete a file */

lib.delete = (dir, file, callback)=>{
    /* unlink the file */

    fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err)=>{
        if(!err){
            callback(false);
        }else{
            callback(' Error deleting file');
        }
    }

);
lib.delete = (dir, file, callback)=>{
    /* unlink the file */
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err)=>{
        if(!err){
            callback(false);
        }else{
            callback(' Error deleting file');
        }
    })
};

/* Export Module */
module.exports = lib;