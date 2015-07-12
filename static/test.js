console.log()
// $.ajax({
// 	url: '/api/creatlecture',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		// creator : "55a09acdf2290647ded227a1",
// 		creator:"55928482df38c17a66c67f2a",
// 		name : '444',
// 		content : "444"
// 	},
// })
// .done(function(data) {
// 	console.log(data)
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });


$.ajax({
	url: '/api/getAllLectures',
	type: 'POST',
	dataType: '',
	data: {
		user_Id : "55a09acdf2290647ded227a1"
		// lecture_Id: "55a0d7a14cfc3883176ef1de",
	},
})
.done(function(data) {
	console.log(data)
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});





// $.ajax({
// 	url: '/api/createSection',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		user_Id : "55928482df38c17a66c67f2a",
// 		lecture_Id : "55a12a88f41d06712b6dc674",
// 		content : "first section for user2 lec4",
// 	},
// })
// .done(function(msg) {
// 	console.log(msg)
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });

// $.ajax({
// 	url: '/api/getAllSectionsByID',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		user_Id: '55928482df38c17a66c67f2a',
// 		lecture_Id : '55a129623e54e0092b7dd526',
// 	},
// })
// .done(function(data) {
// 	console.log(data)
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });

// $.ajax({
// 	url: '/api/createQuestion',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		lecture_Id : "55a129623e54e0092b7dd526",
// 		section_Id : "55a12f67889c9b112f834e1e",
// 		content : "section ques from user2 in lec1 in section1",
// 		name :"wodemingzi",
// 		user_Id : "55928482df38c17a66c67f2a"
// 	},
// })
// .done(function() {
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });


// $.ajax({
// 	url: '/api/getAllQuestionsByID',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		user_Id : "55928482df38c17a66c67f2a",
// 		section_Id : "55a12f67889c9b112f834e1e",
// 		lecture_Id : "55a129623e54e0092b7dd526"
// 	},
// })
// .done(function(data) {
// 	console.log(data)
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });







