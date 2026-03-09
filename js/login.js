const user = document.querySelector("#userInput");
const password = document.querySelector("#passwordInput");
const loginButton = document.querySelector('#loginBtn');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (user.value === 'admin' && password.value === 'admin123') {
        window.location.href = "./main.html";
    }
    else {
        alert("Wrong username or password");
    }
});



