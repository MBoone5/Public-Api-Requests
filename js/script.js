// Custom JavaScript For Public API Requests Project
// Waiting for the document to be ready
$(document).ready(() => {
    // refrences for important dom elements
    const galleryDiv = $('#gallery');
    
    // function to create a card for each random user from an array of user objects
    function createUserCards(userData) {
        // refrences for user information
        let cardHTML = '';

        // iterating over each random user object
        userData.forEach(userData => {
            let userName = userData.name;
            let userMail = userData.email;
            let userImg = userData.picture;
            let userLocation = userData.location;

            // creating the HTML for the user card
            cardHTML += `
            <div class='card'>
            <div class="card-img-container">
            <img class="card-img" src="${userImg.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${userName.first} ${userName.last}</h3>
            <p class="card-text">${userMail}</p>
            <p class="card-text cap">${userLocation.city}, ${userLocation.state}</p>
            </div>
            </div> 
            `;
        });
        
        return cardHTML;
    } // close user card function
    
    // getting random user data
    $.getJSON('https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob', 
        data => {
            // appending the data into the gallery div
            galleryDiv.append(createUserCards(data.results));
        }
    ); // close Random User API request

}); // close doc.ready