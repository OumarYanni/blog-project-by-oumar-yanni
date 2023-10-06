import { async } from "regenerator-runtime";
import "../assets/styles/styles.scss";
import "./form.scss";


const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];
let articleId;

// We'll create an asynchronous function that we'll invoke immediately.
// We parse the URL of the page and check if we have an id parameter.
// If we have an id, we'll retrieve the corresponding article.
const initForm = async () => {
    const params = new URL(window.location.href);
    articleId = params.searchParams.get("id");
    if (articleId) {
        const response = await fetch(`https://restapi.fr/api/article/${articleId}`);
        if (response.status < 300) {
            const article = await response.json();
            fillForm(article);
        }
    }
};

initForm();

// We fill in all the fields in our form by creating references
// and using the information retrieved from the server.
const fillForm = article => {
    const author = document.querySelector('input[name="author"]');
    const img = document.querySelector('input[name="img"]');
    const category = document.querySelector('input[name="category"]');
    const title = document.querySelector('input[name="title"]');
    const content = document.querySelector("textarea");

    author.value = article.author || "";
    img.value = article.img || "";
    category.value = article.category || "";
    title.value = article.title || "";
    content.value = article.content || "";

};

btnCancel.addEventListener("click", () => {
    window.location.assign("/index.html");
});

// When we edit, we don't create a new resource on the server.
// So we don't use a POST request, but a PATCH request.
// Not PUT because we don't replace the remote resource (we keep the creation date and id).
form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());

    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            let response;
            if (articleId) {
                response = await fetch(`https://restapi.fr/api/article/${articleId}`, {
                method: "PATCH",
                body: json,
                headers: {
                    "Content-Type": "application/json"
                }
                });
            } else {
                response = await fetch("https://restapi.fr/api/article", {
                method: "POST",
                body: json,
                headers: {
                    "Content-Type": "application/json"
                }
                });
            }

            if (response.status < 300) {
                window.location.assign("/index.html");
            }
        } catch (e) {
            console.error("e : ", e);
        }
    }
});


const formIsValid = article => {
    errors = [];
    if (
        !article.author ||
        !article.category ||
        !article.content ||
        !article.img ||
        !article.title
    ) {
        errors.push("Vous devez renseigner tous les champs")
    } else {
        errors = [];
    }
    if (article.content.length < 20) {
        errors.push("Le contenu de votre article est trop court !")
    } 
    if (errors.length) {
        let errorHTML = "";
        errors.forEach(e => {
            errorHTML += `<li>${e}<li>`;
        });
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = "";
        return true;
    }
};