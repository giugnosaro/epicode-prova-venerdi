const generoAbbonamenti = function (abbonamentiArray) {
 const row = document.getElementById ('events-row');
abbonamentiArray.forEach((abbonamento) => {
    const newCol = document.createElement ('div')
    newCol.classList.add ('col')
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${abbonamento.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${abbonamento.name}</h5>
          <p class="card-text">${abbonamento.description}</p>
          <p class="card-text">${abbonamento.brand}</p>
          <div class="d-flex justify-content-between">
          <p>${abbonamento.price}€</p>
            <a href="back-office.html?eventId=${abbonamento._id}" class="btn btn-info">MODIFICA</a>
            <button class="btn btn-danger delete-btn" data-id="${abbonamento._id}">ELIMINA</button>          
            </div>
        </div>
      </div>
      `
      row.appendChild(newCol)
})
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const abbonamentoId = this.getAttribute('data-id');
        deleteAbbonamento(abbonamentoId, this.parentElement.parentElement.parentElement);
    });
});
}


const deleteAbbonamento = function(abbonamentoId, cardElement) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${abbonamentoId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore durante l\'eliminazione dell\'abbonamento');
        }
        cardElement.remove(); // Rimuove la card dal DOM
        alert('Abbonamento eliminato con successo');
    })
    .catch(error => console.error('Errore:', error));
}

const getList = function (){
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
        }
        })
     .then( (response) => {
        if (response.ok) {
            console.log(response)
            return response.json();
        } else {
            throw new Error ("Errore nel trovamento della lista")
        }
     })

     .then ((lista) => {
        console.log("lista" ,lista)
        generoAbbonamenti(lista)
     })

     .catch((error) => {
        console.log(error)
      })
}

getList()