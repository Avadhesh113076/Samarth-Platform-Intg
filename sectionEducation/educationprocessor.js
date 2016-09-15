var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var mongoose=require('mongoose');
var eduModel=require('./educationschema');
/*mongoose.connect('mongodb://localhost:27017/sectionEducationDetails');*/


// function getEducation() {
//   var myPromise = new Promise(function(resolve, reject){
//     eduModel.find({},function(err,docs) {
//     console.log("I am inside the find callback... ")

//     if(err) { 
//       console.log("Internal database error in fetching education document ", err);
//       reject({error:'Internal error occurred, please report...'});
//     }

//     console.log("got the data from db: ", docs);
//     resolve(docs);
//   });  

//   });

//   return myPromise;
// };
//----------callbackway-----------------//

function getEducation(successCB, errorCB) {
	console.log("About to do a find query... ");

	//Asynch 
	eduModel.find({},function(err,docs) {
		console.log("I am inside the find callback... ")
		
		if(err) { 
			console.log("Internal database error in fetching education document ", err);
			errorCB({error:'Internal error occurred, please report...'});
		}

		console.log("got the data from db: ", docs);
		successCB(docs);
	});

	console.log("returning  ");
};

//--------ends--callbackway-----------------//

function addEducation(newEmpObj,candidateID,successCB,errorCB) {

	var addEduObj = new eduModel({
  candidateID:candidateID,
  qualification:[] 
});

	addEduObj.qualification.push(newEmpObj.record[0]);
	addEduObj.save(function(err,res)
	{
		 if (err) {
           console.log("Error in saving project: ", err);
           errorCB(err);
       }

       successCB(res);
	});

};

function updateEducation(updatedEmpObj,candidateId,successCB,errCB) {

eduModel.update({ "candidateid": candidateId }, { $push: { "qualification": updatedEmpObj.record[0] } },
       function() {
       successCB("qualification updateded")
   }
);
};

function modifyExistingEducation(candidateID,qualificationID,modifiedExistingObject,successCB,errorCB)
{
	// console.log("got);
	eduModel.update({ 'candidateid': candidateID ,'records._id': qualificationID }, 
       {$set: 
       	{'records.$.title': modifiedExistingObject.records[0].title,
        'records.$.batch': modifiedExistingObject.records[0].batch ,
        'records.$.from': modifiedExistingObject.records[0].from ,
        'records.$.to': modifiedExistingObject.records[0].to,
        'records.$.academicType': modifiedExistingObject.records[0].academicType,
        'records.$.outcome.result': modifiedExistingObject.records[0].outcome.result,
        'records.$.outcome.unit': modifiedExistingObject.records[0].outcome.unit,
        'records.$.institute.name': modifiedExistingObject.records[0].institute.name,
        'records.$.institute.type': modifiedExistingObject.records[0].institute.type,
        'records.$.institute.location': modifiedExistingObject.records[0].institute.location,
        'records.$.institute.affiliation': modifiedExistingObject.records[0].institute.affiliation,
        'records.$.institute.metadata': modifiedExistingObject.records[0].institute.metadata
       }
     },
       function() {
           successCB("the existing qualification has been modified");
       }

   );
};

function deleteEducation(candidateID,qualificationID,deletingObj,successCB,errorCB)
{
	eduModel.remove({'candidateID':candidateID,'records._id':qualificationID},
		function(){
			successCB("THE EDUCATION DETAIL HAS BEEN DELETED");
		},
		function(){
			errorCB("the education detail failed to be deleted");
		});
};


module.exports = {
	getEducation: getEducation,
	addEducation: addEducation,
	updateEducation: updateEducation,
	modifyExistingEducation:modifyExistingEducation,
	deleteEducation:deleteEducation
};
