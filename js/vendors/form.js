// document.getElementById("contactForm").addEventListener("submit", async function(event) {
//     event.preventDefault();
// // document.getElementById("contactForm").addEventListener("submit", function(event) {
// // 	event.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const message = document.getElementById("message").value;

//     const responseMessage = document.getElementById("responseMessage");
	
//     try {
//
//         const response = await fetch("https://api.github.com/repos/JonatanSiracusa/JonatanSiracusa.github.io/dispatches", {
// 		// const response = fetch("https://api.github.com/repos/jonatansiracusa/jonatansiracusa.github.io/dispatches", {
//             method: "POST",
//             headers: {
//                 "Accept": "application/vnd.github.v3+json",
//                 "Authorization": `Bearer ${PUB_PAT}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 event_type: "contact_form_submission",
//                 client_payload: { name, email, message }
//             })
//         });

//         if (response.ok) {
//             responseMessage.textContent = "Message sent successfully!";
//             responseMessage.style.color = "green";
//             document.getElementById("contactForm").reset();
//         } else {
//             responseMessage.textContent = "Failed to send message. Please try again later.";
//             responseMessage.style.color = "red";
//         }
//     } catch (error) {
//         responseMessage.textContent = "An error occurred.";
//         responseMessage.style.color = "red";
//     }
// });

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value
    };

    const response = await fetch("https://form-msg.siracusa-a-jonatan.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      mode: "cors"  // Esto asegura que la solicitud se haga con CORS habilitado
    })

    if (response.ok) {
        responseMessage.textContent = "Message sent successfully!";
        responseMessage.style.color = "green";
        document.getElementById("contactForm").reset();
    } else {
        responseMessage.textContent = "Failed to send message. Please try again later.";
        responseMessage.style.color = "red";
    }
  });