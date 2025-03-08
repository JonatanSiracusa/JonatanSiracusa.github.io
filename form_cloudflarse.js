
addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request, event.env));
  });
  
  async function handleRequest(request, env) {
	const corsHeaders = {
	  "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen (en producción, considera restringirlo)
	  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",  // Métodos permitidos
	  "Access-Control-Allow-Headers": "Content-Type, Authorization"  // Encabezados permitidos
	};
  
	if (request.method === "OPTIONS") {
	  // Responder a la solicitud preflight CORS (cuando el navegador hace una solicitud OPTIONS antes de la real)
	  return new Response(null, {
		status: 204,
		headers: corsHeaders
	  });
	}
  
	if (request.method !== "POST") {
	  return new Response("Método no permitido", { status: 405, headers: corsHeaders });
	}
  
	try {
		// Agregar un log para verificar la solicitud entrante
		console.log('Request received:', request);

		const body = await request.json();

		// Agregar log para ver el cuerpo de la solicitud
		console.log('Request body:', body);
		// console.log('event.env.GH_TOKEN_CLOUDFLARE:', event.env.GH_TOKEN_CLOUDFLARE);
		console.log('env.GH_TOKEN_CLOUDFLARE:', env.GH_TOKEN_CLOUDFLARE);

		console.log('GH_TOKEN_CLOUDFLARE:', env.GH_TOKEN_CLOUDFLARE ? 'Token exists' : 'Token missing');

  
	  const response = await fetch("https://api.github.com/repos/JonatanSiracusa/JonatanSiracusa.github.io/dispatches", {
		method: "POST",
		headers: {
		  "Accept": "application/vnd.github.v3+json",
		//   "Authorization": `Bearer ${event.env.GH_TOKEN_CLOUDFLARE}`,  // 🔥 Token seguro
		//   "Authorization": `Bearer ${request.cf.env.GH_TOKEN_CLOUDFLARE}`,
		  "Authorization": `Bearer ${env.GH_TOKEN_CLOUDFLARE}`,
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({
		  event_type: "contact_form_submission",
		  client_payload: body
		})
	  });
  
	  if (!response.ok) {
		return new Response("Error al enviar los datos a GitHub", {
		  status: 500,
		  headers: corsHeaders
		});
	  }
  
	  return new Response("Datos enviados con éxito", { status: 200, headers: corsHeaders });
  
	} catch (error) {
	  return new Response("Error en el servidor", { status: 500, headers: corsHeaders });
	}
  }