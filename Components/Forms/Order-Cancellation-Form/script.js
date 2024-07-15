document.getElementById('refundMethod').addEventListener('change', function () {
    const bankDetails = document.getElementById('bankDetails');
    if (this.value === 'bank-transfer') {
        bankDetails.style.display = 'block';
    } else {
        bankDetails.style.display = 'none';
    }
});

document.getElementById('cancellationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Order cancellation request submitted successfully.');
});
