document.getElementById('complaintForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;
    const resolution = document.getElementById('resolution').value;

    // Validate form data (simple example)
    if (name && email && issue && resolution) {
        alert('Complaint submitted successfully!\nThank you for your feedback.');
        // Here you can also add code to send the data to the server
    } else {
        alert('Please fill in all fields.');
    }
});
