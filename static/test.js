console.log()




// $.ajax({
// 	url: '/api/creatlecture',
// 	type: 'POST',
// 	dataType: '',
// 	data: {
// 		creator : "",
// 		name : 'wooooo',
// 		content : "hahahahahh"
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

