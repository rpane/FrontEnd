//function to validate the form
function validateForm() {
  'use strict';
	console.log("in validate form");

// Get references to the form elements:
var name = $("#name").val();
var email = $("#email").val();
var dayCare = $('input[id="dayCare"]');
var boarding = $('input[id="boarding"]');
var grooming = $('input[id="grooming"]');
var training = $('input[id="training"]');

console.log(training.val());

var errorMsg = "Error! Please complete the form! <br>";
var isError = false;

if (name.length == 0) {
  errorMsg += "* Name must be filled in! <br>";
  isError = true;
}

if (email.length == 0) {
  errorMsg += "* Email address must be filled in! <br>";
  isError = true;
}

if ((email.indexOf("@") < 1) || (email.indexOf("@") === (email.length -1))) {
  errorMsg += "* Email address must contain the @ symbol anywhere except for the first or last character! <br>"
  isError = true;
}

//verify whether any of the check boxes have been selected
if (!dayCare.is(':checked') && !boarding.is(':checked') && !grooming.is(':checked') && !training.is(':checked')) {
  errorMsg += "* Please check at least one box!"
  isError = true;
}

//determine whether or not to submit the form
	if (isError == false) {
		return true;
	}
	else {
    $("#bookingForm").append('<div id="errors"></div');
		console.log("returned false: do not submit");
    $('#errors').html(errorMsg).css({'color': 'red'});
		return false;
	}

} // End of validateForm() function.

// Function called when the window has been loaded.
// Function needs to add an event listener to the form.
function init() {
console.log("in init document");
//Call carousel manually with
$('.carousel').carousel({
  interval: 2000
})
// Assign an event listener to the submit button
$("#bookingForm").submit(validateForm);

var petFinderURL = 'http://api.petfinder.com/pet.find?key=388d2c3f91d893056749e8d06f4e136a&animal=dog&count=6&location=h9s1y5&output=full&format=json';

$.ajax({
  type : 'GET',
  data : {},
  url : petFinderURL+'&callback=?' ,
  dataType: 'jsonp',
  success : function(data) {
      var petfinder = data.petfinder;
      //log adoptable dogs in montreal to console
      console.log(petfinder);

      for (var i = 1; i < 6; i++) {

        var url = petfinder.pets.pet[i].media.photos.photo[2].$t;
        var name = petfinder.pets.pet[i].name.$t;
        var age = petfinder.pets.pet[i].age.$t
        var breed = petfinder.pets.pet[i].breeds.breed.$t
        var sex = petfinder.pets.pet[i].sex.$t
        var contact = petfinder.pets.pet[i].contact.email.$t
        var desc = petfinder.pets.pet[i].description.$t;

        $('#dog' + i).append('<img class="d-block w-100" src="' + url + '">');
        $('#caption' + i).append('<h5>' + name + '</h5><p>Name: ' + name + '<br>Age: ' + age + '<br>Breed: ' + breed + '<br>Sex: ' + sex + '<br>Contact: ' + contact + '</p>');

      } //end for loop
    } //end fun0ction
}); //end .ajax

} //end init function

// Assign an event listener to the window's load event:
$(init);
