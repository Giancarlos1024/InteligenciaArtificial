document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});
//XDXDDXD
function output(input) {
  let product;

  // Regex elimina los caracteres que no son palabras/espacios 
  // Recorta los espacios en blanco finales 
  // Elimina los dígitos; no estoy seguro de si esto es lo mejor 
  // Pero resuelve el problema de ingresar algo como 'hola'1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
  

  if (compare(prompts, replies, text)) { 
    // Buscar coincidencias exactas en `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/emergencia/gi)) {
    product = "Si tiene una emergencia es mejor que visite urgentemente el hospital mas cercano..."

  } else if (text.match(/gracias/gi)) {
    product = "De nada...vuelve cuando quieras...!"

  } else if (text.match(/dolor/gi)) {
    product = "Si el dolor es persistente es mejor que visite pronto un centro de salud; si no escriba 'necesito una consulta' o para preguntas frecuentes escriba'una pregunta'."
  } else if (text.match(/mal/gi)) {
    product = "Si se encuentra delicado de salud visite urgentemente un centro medico!si no escriba 'necesito una consulta' o para preguntas frecuentes escriba'una pregunta'."
  } else if (text.match(/ayuda/gi)) {
    product = "Si necesita ayuda urgente visite un centro medico; si no escriba 'necesito una consulta' o para preguntas frecuentes escriba'una pregunta'."
  } else if (text.match(/duele/gi)) {
    product = "Si tiene un fuerte dolor visite un centro medico urgentemente ; si no escriba 'necesito una consulta' o para preguntas frecuentes escriba'una pregunta'."

  } else if (text.match(/(corona|covid|virus)/gi)) {
    // Si no coincide, verifique si el mensaje contiene `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  }
  else if (text.match(/(chau|hasta luego|nos vemos|adios)/gi)) {
      product = "Hasta pronto, espero haberte ayudado..."
  } else {
    // Si todo lo demás falla: alternativa aleatoria
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Detener el bucle interno cuando el valor de entrada coincida con las indicaciones
        break;
      }
    }
    if (replyFound) {
      // Detener el ciclo externo cuando se encuentra la respuesta en lugar de iterar a través de toda la matriz
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="img/user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "img/robot_act.jpg";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )

}