const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    // add 2 EventListeners types on each input
    input.addEventListener("invalid",handleValidation);
    input.addEventListener("input",handleValidation);
});

function handleValidation(event){
    if(event.type === "invalid") {
        // use of setCustomValidity method to change the warning message
        event.target.setCustomValidity("Ce champ ne peut être vide.");
    }
    // stop showing the warning message when we input
    else if( event.type === "input") {
        event.target.setCustomValidity("");
    }
}

const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(event) {
    event.preventDefault();

    const newCookie = {};

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name");
        newCookie[nameAttribute] = input.value; 
        // Another way to do in one line :
        // newCookie[`${input.name}`] = input.value;
    });
    // Add an expire cookie's date
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 *60 * 60 * 1000);
    
    createCookie(newCookie);
}

function createCookie(newCookie) {
    if(doesCookieExist(newCookie.name)) {
        // createToast();
        console.log('Le cookie existe déjà. Prêt pour la mise à jour !')
    }
    else {
        // createToast();
        console.log('Nouveau cookie. Prêt pour la création !')
    }
    // create a cookie
    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`; // use of UTCString method to convert the expires cookie's date OBJECT to a String
}

function doesCookieExist(name) {
    const cookies = document.cookie.replace(/ /g, '').split(';');
    const onlyCookiesName = cookies.map((cookie) => cookie.split('=')[0]
    );
    const cookiePresence = onlyCookiesName.find(cookie => cookie === name);
    if(!cookiePresence) {
        return false;
    }
    else {
        return true;
    }
}
