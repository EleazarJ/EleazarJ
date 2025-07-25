# QuestionnaireCircu

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Auto-évaluation : Circularité de votre entreprise</title>
  <link rel="stylesheet" href="style.css">
  <script defer src="model.js"></script>
  <script defer src="script.js"></script>
</head>
<body>
  <main>
    <h1>Estimation du profil circulaire</h1>
    <p>
        Introduction du projet...
        Blablabla...
        
      Ce questionnaire vous permet de palcer votre entreprise parmi [combien ?] PME de la Région Hauts-de-France. Répondez simplement aux 10 questions qui suivent et cliquez sur le bouton "Soumettre".
    </p>

    <form id="circularForm">
      <div id="questionsContainer"></div>
      <button type="submit">Soumettre</button>
    </form>

    <div class="result" id="result"></div>
    
      <p>
          Voici comment votre PME se situe par rapport aux PME de notre enquête :
      </p> 
      
    <div class="visualisation">
      <h2>Distribution des PME (remplacer le placeholder)</h2>
      <div style="position: relative; display: inline-block;">
        <img src="nuage.png" alt="Nuage factoriel ACM" id="acmImage" width="800" height="600">
        <div id="acmPoint" style="position: absolute; width: 10px; height: 10px; background-color: red; border-radius: 50%; transform: translate(-50%, -50%); display: none;"></div>
      </div>
    </div>

    <div class="footer">
      <p>Pour en savoir plus :</p>
      <ul>
        <li><a href="rapport.pdf" target="_blank">Rapport scientifique du projet ICPME-HF</a></li>
        <li><a href="methodo.pdf" target="_blank">Méthodologie</a></li>
        <li><a href="mailto:joseph-eleazar.duhot@univ-lille.fr">Contact</a></li>
      </ul>
    </div>
  </main>
</body>
</html>
