const carerForm = document.getElementById('carerForm')
console.log('carerForm', carerForm)

carerForm.addEventListener('submit', function (e) {
    alert()
    e.preventDefault();

    var action = this.attr('action')
    console.log('action', action)


    $.ajax({
        url: "https://fiddle.jshell.net/favicon.png",
        data: {
            name: formElements['name'].value,
            surname: formElementsT['surname'].value,
            mail: formElementsT['mail'].value,
            phone: formElements['phone'].value,
            vacancy: formElements['vacancy'].value,
            file: formElements['file'].value,
        },
        success: function (response) {
            console.log(response)
        }
    })
})