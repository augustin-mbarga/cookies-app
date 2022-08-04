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

    cookieForm.reset();
}

function createCookie(newCookie) {

    if(doesCookieExist(newCookie.name)) {
        console.log('Le cookie existe déjà. Prêt pour la mise à jour !')
        createToast({ name: newCookie.name, state: "modifié", color: "orangered"});
    }
    else {
        console.log('Nouveau cookie. Prêt pour la création !')
        createToast({ name: newCookie.name, state: "crée", color: "green"});
    }
    // create a cookie
    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`; // use of UTCString method to convert the expires cookie's date OBJECT to a String
}

function doesCookieExist(name) {

    const cookies = document.cookie.replace(/\s/g, "").split(";");
    const onlyCookiesName = cookies.map((cookie) => cookie.split("=")[0]
    );
    
    const cookiePresence = onlyCookiesName.find(cookie => cookie === encodeURIComponent(name));
    
    return cookiePresence;
}

const toastsContainer = document.querySelector(".toasts-container");

function createToast({name, state, color}) {

    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";

    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = color;
    toastsContainer.appendChild(toastInfo);

    setTimeout( () => {
        toastInfo.remove();
    }, 2500);
}
