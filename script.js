// Liste de questions et réponses
const questions = [
  "Je suis familier des pratiques d’économie circulaire.",
  "Je mets en place des mesures pour prolonger la durée de vie de mes produits.",
  "Je privilégie les matériaux recyclés dans mes pratiques de sourcing.",
  "Dans la sélection de mes fournisseurs, je prends en compte leur proximité géographique.",
  "Je réduis ou récupère l’énergie et/ou les déchets de mon activité.",
  "Je facilite le retour de mes produits et/ou composants en fin de vie.",
  "Je sensibilise mes clients aux pratiques de consommation responsable et circulaire.",
  "Je forme mes salariés à la démarche 3 R (Réduire, Réemployer, Recycler).",
  "Dans mes communications officielles, je mets en lumière mes pratiques circulaires.",
  "L’ensemble des départements de mon entreprise est engagé dans des pratiques circulaires."
];

const reponses = [
  "0 : Je ne suis pas concerné",
  "1 : Non, ça ne m'intéresse pas",
  "2 : Non, mais j'y pense",
  "3 : Oui, je débute",
  "4 : Oui, c'est en cours de réalisation",
  "5 : Oui totalement"
];

// Génère dynamiquement le questionnaire
const container = document.getElementById("questionsContainer");
questions.forEach((text, index) => {
  const div = document.createElement("div");
  div.className = "question";
  const qNum = index + 1;
  div.innerHTML = `<label><strong>Question ${qNum}</strong> : ${text}</label><div class="radios">` +
    reponses.map((label, val) =>
      `<label><input type="radio" name="q${qNum}" value="${val}"> ${label}</label>`
    ).join(' ') + `</div>`;
  container.appendChild(div);
});

// Applique le modèle logit (issu de model.js)
function applyLogitModel(inputs) {
  const scores = logitModel.coefficients.map((coef, k) => {
    const dot = coef.reduce((sum, c, i) => sum + c * inputs[i], 0);
    return dot + logitModel.intercepts[k];
  });

  const expScores = scores.map(Math.exp);
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const probs = expScores.map(e => e / sumExp);
  const predicted = probs.indexOf(Math.max(...probs));

  return {
    predicted: logitModel.labels[predicted],
    proba: probs.map(p => (p * 100).toFixed(1) + '%')
  };
}

// Calcule les coordonnées projetées sur l'ACM
function computeACMCoordinates(inputs) {
  const x = acmModel.axis1.reduce((sum, c, i) => sum + c * inputs[i], 0);
  const y = acmModel.axis2.reduce((sum, c, i) => sum + c * inputs[i], 0);
  return [x, y];
}

function positionACMPoint(x, y) {
  const img = document.getElementById("acmImage");
  const point = document.getElementById("acmPoint");

  // Récupérer taille affichée (responsive) et taille réelle
  const displayWidth = img.clientWidth;
  const displayHeight = img.clientHeight;

  const scaleX = displayWidth / (acmModel.axis1Max - acmModel.axis1Min);
  const scaleY = displayHeight / (acmModel.axis2Max - acmModel.axis2Min);

  const px = (x - acmModel.axis1Min) * scaleX;
  const py = displayHeight - (y - acmModel.axis2Min) * scaleY;

  point.style.left = `${px}px`;
  point.style.top = `${py}px`;
  point.style.display = "block";
}


// Gère la soumission du formulaire
document.getElementById("circularForm").addEventListener("submit", function (e) {
  const inputs = [];
  let total = 0;

  for (let i = 1; i <= questions.length; i++) {
    const radios = document.getElementsByName(`q${i}`);
    let answered = false;
    for (let r of radios) {
      if (r.checked) {
        const val = parseInt(r.value);
        inputs.push(val);
        total += val;
        answered = true;
        break;
      }
    }
    if (!answered) {
      e.preventDefault(); // on bloque si une question n'est pas remplie
      alert("Merci de répondre à toutes les questions.");
      return;
    }
  }

  // Ajoute les réponses comme champs cachés pour Web3Forms
  inputs.forEach((val, i) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = `Question ${i + 1}`;
    input.value = val;
    this.appendChild(input);
  });

  // Affiche le résultat logit + remerciement
  const result = applyLogitModel(inputs);
  const [x, y] = computeACMCoordinates(inputs);
  positionACMPoint(x, y);

  document.getElementById("result").innerHTML =
    `Score total : ${total}/50<br>` +
    `Classe estimée : <strong>${result.predicted}</strong><br>` +
    `Probabilités estimées : ${result.proba.join(' / ')}<br><br>` +
    `<span style="color: green;">✅ Merci pour votre participation !</span>`;
});


  const result = applyLogitModel(inputs);
  document.getElementById("result").innerHTML =
    `Score total : ${total}/50<br>` +
    `Classe estimée : <strong>${result.predicted}</strong><br>` +
    `Probabilités estimées : ${result.proba.join(' / ')}`;

  // Positionnement ACM
  const [x, y] = computeACMCoordinates(inputs);
  positionACMPoint(x, y);
});
