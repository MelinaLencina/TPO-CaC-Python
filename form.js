//form validation
const form = document.querySelector(".form");
const inputs = document.querySelectorAll('#form input:not([type="radio"])');

const rexp = {
  title, image, ingredients: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
};

const fieldsFalseTrue = {
  title: false,
  image: false,
  ingredients: false,
  description: false,
};

const formValidate = (event) => {
  switch (event.target.name) {
    case "title":
      validateField(rexp.title, event.target, "title");
      break;
    case "image":
      validateField(rexp.image, event.target, "image");
      break;
    case "ingredients":
      validateField(rexp.ingredients, event.target, "ingredients");
      break;
    case "description":
        validateField(rexp.description, event.target, "description");
        break;
  }
};

const validateField = (expression, input, area) => {
  if (expression.test(input.value)) {
    document
      .getElementById(`field-${area}`)
      .classList.remove("container-form-incorrect");
    document
      .getElementById(`field-${area}`)
      .classList.add("container-form-correct");
    document.querySelector(`#field-${area} i`).classList.add("fa-check-circle");
    document
      .querySelector(`#field-${area} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#field-${area} .input-error`)
      .classList.remove("input-error-active");
    fieldsFalseTrue[area] = true;
  } else {
    document
      .getElementById(`field-${area}`)
      .classList.add("container-form-incorrect");
    document
      .getElementById(`field-${area}`)
      .classList.remove("container-form-correct");
    document.querySelector(`#field-${area} i`).classList.add("fa-times-circle");
    document
      .querySelector(`#field-${area} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#field-${area} .input-error`)
      .classList.add("input-error-active");
    fieldsFalseTrue[area] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", formValidate);
  input.addEventListener("blur", formValidate);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (fieldsFalseTrue.title && fieldsFalseTrue.image && fieldsFalseTrue.ingredients && fieldsFalseTrue.description) {
    form.reset();

    document
      .getElementById("success-message-form")
      .classList.add("success-message-form-active");
    setTimeout(() => {
      document
        .getElementById("success-message-form")
        .classList.remove("success-message-form-active");
    }, 4000);

    document.querySelectorAll(".container-form-correct").forEach((icon) => {
      icon.classList.remove("container-form-correct");
    });
  } else {
    document
      .getElementById("empty-message-form")
      .classList.add("empty-message-form-active");
    setTimeout(() => {
      document
        .getElementById("empty-message-form")
        .classList.remove("empty-message-form-active");
    }, 4000);
  }
});

/* ****************** MESSAGE IN THE DOM *******************/

const sendForm = () => {
  let titleValue = document.getElementById("title").value;
  let imageValue = document.getElementById("image").value;
  let ingredientsValue = document.getElementById("ingredients").value;
  let descriptionValue = document.getElementById("description").value;

  /* form.reset(); // Reset form in validation js code*/

  let body = ``;
  body += `
    <div class="background-mssg">
      <h3 class="text-dimension"> From: out best chef</h3>
      <div id="text-form">
        <p class = "label-message">Title:</p>
        <p class = "text-message">${titleValue}</p>
        <p class = "label-message">Image:</p>
        <img style="width:40px" src"${imageValue}" alt="img" />
        <p class = "label-message">Ingredients:</p>
        <p class = "text-message">${ingredientsValue}</p>
        <p class = "label-message">Description:</p>
        <p class = "text-message">${descriptionValue}</p>
        <p class = "label-message">Contact through:
    </div>
  `;
  document.getElementById("message-area").classList.add("message-area-active");
  document.getElementById("received-message").innerHTML = body;
};
