var profile = require('./profileschema');

function createNewprofile(newProjectObj, candidateid, successCB, errorCB) {
    var projectObj = new profile({
        
        // profile: [{
           "candidateid":candidateid,
           "candidateType":newProjectObj.profile[0].candidateType,
            "updatedOn":newProjectObj.profile[0].updatedOn,
            "skills":[]
        // }]
    });
    //  var id="candidateid":candidateid;
    // projectObj.profile.push(id);
    //  projectObj.profile.push(newProjectObj.profile[0]);

    console.log("About to save a new profile: ", projectObj);

    projectObj.save(function(err, savedObj) {
        if (err) {
            console.log("Error in saving profile: ", err);
            errorCB(err);
        }

        successCB(savedObj);
    });
};

// function modifyprofile(oldProjectObj, candidateid, successCB, errorCB) {

//     project.update({ "candidateid": candidateid }, { $push: { "records": oldProjectObj.records[0] } },
//         function() {
//             successCB("project added")

//         }
//     );
// };

module.exports = {

    createNewprofile: createNewprofile,
    // modifyprofile: modifyprofile

};
