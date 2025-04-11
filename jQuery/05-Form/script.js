$(document).ready(function () {
  $("#validationForm").submit(function (event) {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Name validation (Only letters and spaces allowed)
    let name = $("#name").val().trim();
    if (!/^[a-zA-Z ]{3,}$/.test(name)) {
      $("#nameGroup").addClass("error");
      $("#nameError").show();
      isValid = false;
    } else {
      $("#nameGroup").removeClass("error").addClass("success");
      $("#nameError").hide();
    }

    // Email validation
    let email = $("#email").val().trim();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      $("#emailGroup").addClass("error");
      $("#emailError").show();
      isValid = false;
    } else {
      $("#emailGroup").removeClass("error").addClass("success");
      $("#emailError").hide();
    }

    // Phone number validation (10-digit number only)
    let phone = $("#phone").val().trim();
    if (!/^[0-9]{10}$/.test(phone)) {
      $("#phoneGroup").addClass("error");
      $("#phoneError").show();
      isValid = false;
    } else {
      $("#phoneGroup").removeClass("error").addClass("success");
      $("#phoneError").hide();
    }

    // If all fields are valid
    if (isValid) {
      $("#statusMessage")
        .html("<strong>Form submitted successfully!</strong>")
        .css({
          "background-color": "#d4edda",
          color: "#155724",
          display: "block",
        });
      $("#validationForm")[0].reset(); // Reset form after successful submission
      $(".form-group").removeClass("success");
    } else {
      $("#statusMessage")
        .html("<strong>Please fix the errors above.</strong>")
        .css({
          "background-color": "#f8d7da",
          color: "#721c24",
          display: "block",
        });
    }
  });
});
