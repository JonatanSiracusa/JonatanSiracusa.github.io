document.getElementById("contactForm").addEventListener("submit", async function(event) {event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    // const response = await fetch("http://127.0.0.1:8000/submit", {
    const response = await fetch("https://github-contact-fastapi.onrender.com/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
      mode: "cors"
    });

    if (response.ok) {
      responseMessage.textContent = "¡Mensaje enviado correctamente!\n\nMessage sent successfully!";
      responseMessage.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      responseMessage.textContent = "No fue posible nviar el mensaje. Por favor, intente mas tarde.\n\nFailed to send message. Please try again later.";
      responseMessage.style.color = "red";
    }
  } catch (error) {
    responseMessage.textContent = "Ocurrió un error.\n\nAn error occurred.";
    responseMessage.style.color = "red";
  }
});