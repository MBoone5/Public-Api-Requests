// Custom JavaScript For Public API Requests Project
// Waiting for the document to be ready
$(document).ready(() => {
    // refrences for important dom elements
    const $galleryDiv = $('#gallery');
    const $modalDiv = $('#modal-div');
    
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
            </div>
            <img class="card-img" src="${userImg.large}" alt="profile picture">
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

    // function to create a modal for each random user from an array of user objects
    function createUserModals(userData) {
        // creating the HTML for the user modals
        let modalHTML = '';
        
        userData.forEach(userData => {
            // references for user information
            let userName = userData.name;
            let userMail = userData.email;
            let userImg = userData.picture;
            let userLocation = userData.location;
            let userDob = userData.dob;
            let userPhone = userData.phone;
            modalHTML += `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${userImg.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${userName.first} ${userName.last}</h3>
                        <p class="modal-text">${userMail}l</p>
                        <p class="modal-text cap">${userLocation.city}</p>
                        <hr>
                        <p class="modal-text">${userPhone}</p>
                        <p class="modal-text">${userLocation.street}, ${userLocation.city}, ${userLocation.state} ${userLocation.postcode}</p>
                        <p class="modal-text">Birthday: ${userDob}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `;
        }); // close modal html iteration

        return modalHTML;
    }
    
    function displayModal(target) {
        // traversing upwards to the parent .card div
        const parents = $(target).parentsUntil('.gallery');
        let parentCard;

        /* if there are no ancestors to traverse to .div, 
        then e.target is the parent div.card
        if there are ancestors, then the last element will be the parent div.card */
        if (parents.length === 0) {
            parentCard = target;
        } else {
            parentCard = parents[parents.length - 1]; // accessing the last element in the array
        }

        // finding the name of the employee
        const $empName = $(parentCard).find('.card-info-container>h3').text();

        // reference to the current modal
        const $currentModal = $(`.modal-container:has(h3:contains(${$empName}))`);
        
        // displaying the modal
        $currentModal.show();
    }
    function handleX() {
        $('.modal-close-btn').click((e) => {
            // find the parent modal and hide it
            let parentModal = $(e.target).parents('.modal-container')[0]; // this is an ELEMENT not a jQuery Object; hence no $ before the name
            $(parentModal).hide();
        });
    }
    // getting random user data
    $.getJSON('https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob,phone', 
        data => {
            // Hiding the loader when the request is complete
            $('.loader').css('display', 'none');

            // appending the data into the gallery div
            $galleryDiv.append(createUserCards(data.results));

            // appending modals to the modal-div
            $modalDiv.append(createUserModals(data.results));
            
            // event listener for user modal events
            $('.card').click(e => displayModal(e.target));

            // event listenr for x buttons
            handleX();

        }); // close Random User API request

    
    
    
}); // close doc.ready