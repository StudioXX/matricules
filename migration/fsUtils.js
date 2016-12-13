var path = require('path'), fs=require('fs');

let allaccessions = [];
function getDirectories(path) {
  return fs.readdirSync(path).map(function (file) {
     allaccessions.push(file);
  });
}

getDirectories('./media');

// move all media files into corresponding accession number folder
function findMatches(startPath, accession){

    if (!fs.existsSync(startPath)){
        console.log("no dir ", startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
        findMatches(filename,accession); //recurse
      }
      else if (filename.indexOf(accession)>=0) {
        console.log('moving ' + filename)
        fs.rename(filename, `media/${accession}/${path.basename(filename)}`, (err) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log('-- moved: ',filename);
          }
          })        
      };
    };
};

// findMatches('./matfiles', '1996PRM00067C')

(allaccessions).map((accession) => {
  findMatches('./matfiles', accession)
})


// MOVE ALL VIDEO FILES
// function fromDir(startPath,filter){

//     if (!fs.existsSync(startPath)){
//         console.log("no dir ",startPath);
//         return;
//     }

//     var files=fs.readdirSync(startPath);
//     for(var i=0;i<files.length;i++){
//         var filename=path.join(startPath,files[i]);
//         var stat = fs.lstatSync(filename);
//         if (stat.isDirectory()){
//             fromDir(filename,filter); //recurse
//         }
//         else if (filename.indexOf(filter)>=0) {

//             fs.rename(filename, `matvideos/${path.basename(filename)}`, (err) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 else {
//                     console.log('-- moved: ',filename);
//                 }
//                 })
//         };
//     };
// };

// fromDir('./matfiles','.mov');
