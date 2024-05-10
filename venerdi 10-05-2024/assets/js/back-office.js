class Abbonamenti {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    }
}

const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('eventId');
console.log('EVENTID?', eventId);

let abbonamentoModificato;

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    if (eventId) {
        submitButton.textContent = 'Modifica';
        modificoAbbonamento();
    } else {
        submitButton.textContent = 'Crea';
    }
});

const modificoAbbonamento = function () {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Errore nel trovamento dell'abbonamento");
        }
    })
    .then((event) => {
        document.getElementById('name').value = event.name;
        document.getElementById('description').value = event.description;
        document.getElementById('brand').value = event.brand;
        document.getElementById('imageUrl').value = event.imageUrl;
        document.getElementById('price').value = event.price;

        abbonamentoModificato = event;
    })
    .catch((err) => {
        console.error("ERRORE", err);
    });
};

const creoAbbonamenti = function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageUrlInput = document.getElementById('imageUrl');
    const priceInput = document.getElementById('price');

    const abbonamentoFromForm = new Abbonamenti(
        nameInput.value,
        descriptionInput.value,
        brandInput.value,
        imageUrlInput.value,
        priceInput.value
    );

    console.log("abbonamento da inviare alle api", abbonamentoFromForm);

    let URL = 'https://striveschool-api.herokuapp.com/api/product/';
    let metodoUsato = 'POST';

    if (eventId) {
        URL = `https://striveschool-api.herokuapp.com/api/product/${abbonamentoModificato._id}`;
        metodoUsato = 'PUT';
    }

    fetch(URL, {
        method: metodoUsato,
        body: JSON.stringify(abbonamentoFromForm),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDI5ODgxODQ0MjAwMTUzNzU4N2EiLCJpYXQiOjE3MTUzMjc2NDAsImV4cCI6MTcxNjUzNzI0MH0.b_iCQmrwRKLBKMVhynHh0Yb4qqBh9JxacX0L5fgBihE"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert(`Abbonamento ${eventId ? 'modificato' : 'creato'} con successo!`);
            if (eventId) {
                // Redirect to homepage or another specified URL after successful modification
                window.location.href = './Home.html'; // Adjust this URL to your home page URL
            } else {
                document.getElementById('event-form').reset(); // Reset the form if a new subscription is created
            }
        } else {
            throw new Error('Errore nel salvataggio della risorsa');
        }
    })
    .catch((err) => {
        console.error(err);
        alert("Errore durante il salvataggio: " + err.message);
    });
};

document.getElementById('event-form').addEventListener('submit', creoAbbonamenti);