const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('eventId')
console.log(addressBarContent)

const modificoAbbonamento = function (){
    fetch (`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
        }

    })

    .then ((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error ("Errore nel trovamento dell'abbonamento")
        }
    })
    .then ((event) => {
        document.getElementById('name').value = event.name 
        document.getElementById('description').value = event.description
        document.getElementById('brand').value = event.brand
        document.getElementById('imageUrl').value = event.imageUrl
        document.getElementById('price').value = event.price + '€'

    })
    .catch ( (err) => {
         console.log("ERRORE"  ,err)
 
    })
}

modificoAbbonamento()



const deleteEvent = function () {
  fetch (`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
    }

})
    .then((response) => {
      if (response.ok) {
        
        alert('RISORSA ELIMINATA')
        location.assign('Home.html') // torniamo in home
      } else {
        
        alert('ERRORE - RISORSA NON ELIMINATA')
      }
    })
    .catch((err) => {
      console.log('ERR', err)
    })
}



const editButton = document.getElementById('edit-button')
editButton.addEventListener('click', function () {
  location.assign(`backoffice.html?eventId=${eventId}`)
})