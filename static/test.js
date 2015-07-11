$.ajax({
	url: '/api/getAllLectures',
	type: 'POST',
	dataType: '',
	data: {
		lecture_Id: 11,
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
