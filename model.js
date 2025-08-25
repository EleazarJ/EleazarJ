// Modèle logit multinomial simulé – cohérent avec un classement par score total
const logitModel = {
  intercepts: [-0.4, 0, 0.4],
  coefficients: [
    [-0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1], // Groupe 1
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],    // Groupe 2
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]             // Groupe 3
  ],
  labels: [
    "Groupe 1 : Sensibilisation faible",
    "Groupe 2 : Transition en cours",
    "Groupe 3 : Circulaire avancé"
  ]
};1
// Placeholder pour les coefficients des deux premières composantes de l'ACM
const acmModel = {
  // Chaque composante est une combinaison linéaire des 10 réponses [q1, ..., q10]
  axis1: [0.1, -0.1, 0.1, 0.1, -0.1, 0.1, 0.1, -0.1, 0.1, 0.1],
  axis2: [-0.1, 0.1, -0.1, 0.1, 0.1, -0.1, 0.1, 0.1, -0.1, 0.1],
  // Dimensions de l'image pour projection (doivent correspondre à nuage.png)
  imageWidth: 800,
  imageHeight: 600,
  // Bornes du nuage ACM (valeurs maximales et minimales projetées sur chaque axe)
  axis1Min: -2,
  axis1Max: 2,
  axis2Min: -2,
  axis2Max: 2
};
