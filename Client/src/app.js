// const form = document.getElementById("Form");

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   // Taking data from the form
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData.entries());
//   data.is_student = formData.get("is_student") === "on"; // Converting checkbox into true/false

//   fetch("http://localhost:8080/newguest", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ formValues }),
//   });
// });

const form = document.getElementById("Form");
const guestbookEntries = document.getElementById("guestbook-entries");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Taking data from the form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.is_student = formData.get("is_student") === "on"; // Converting checkbox into true/false

  // Sending data to the server
  try {
    await fetch("http://localhost:8080/newguest", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ formValues: data }), // Use `data` here
    });

    alert("Form submitted successfully!"); // Optional: Notify user on success
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to submit the form. Please try again later."); // Optional: Notify user on error
  }
});

/* Loading guest entries */

async function loadGuestbookEntries() {
  const response = await fetch(`http://localhost:8080/newguest`);
  const data = await response.json();

  guestbookEntries.innerHTML = ""; // Clear existing entries

  // Loop through entries and display them
  data.forEach((entry) => {
    const entryElement = document.createElement("div");
    entryElement.classList.add("guestbook-entry");
    entryElement.innerHTML = `
          <p><strong>${entry.name}</strong> (${entry.created_at}):</p>
          <p>${entry.message}</p>
        `;
    guestbookEntries.appendChild(entryElement);
  });
}

// Load guestbook entries when the page is loaded
loadGuestbookEntries();
