const form = document.getElementById("Form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Taking data from the form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.is_student = formData.get("is_student") === "on"; // Converting checkbox into true/false

  try {
    await fetch("http://localhost:8080/newguest", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ formValues: data }),
    });
  } catch (error) {
    console.error(error.message, error.stack);
    // TODO: let user know what to do
    console.log(formValues);
  }

  form.reset();

  // TODO: Redirect or let user know we succesfully created
});
