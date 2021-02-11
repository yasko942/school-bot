const Discord = require("discord.js");
const config = require("./config.json");
const capitale = require("./capitale.json")
const histoire = require("./histoire.json")
const client = new Discord.Client();
var enCours = false;
var nombreDeLancementDuQuiz = 0
var nombreQuestions
var questionsFaites
var type
var choixDuTheme = false
client.on("message", function (message) {
    if (message.author.bot) return;
    if (message.content == "quiz") {

        if (enCours == true) { message.reply("tu as déjà un quiz en cours") }
        else {
            nombreDeLancementDuQuiz = nombreDeLancementDuQuiz + 1
            message.reply("début du quiz, ça fait " + nombreDeLancementDuQuiz + " fois que tu as lancé le quiz, quel est le quiz que vous vouliez lancer, histoire ou géographie?")

            enCours = true;


        } return;
    }
    if (message.content == "arrêt") {

        if (enCours == false) { message.reply("le quiz n'a pas commencé pour le commencer écrivez quiz") }
        else {
            message.reply("fin du quiz")
            enCours = false
        }

    }
    if (enCours == true) {
        if (choixDuTheme == false) {
            if (message.content == "histoire") { type = "histoire"; choixDuTheme = true }
            else if (message.content == "géographie") { type = "géographie"; choixDuTheme = true }
            else { choixDuTheme = false; message.reply("Je ne comprends pas veuillez choisir entre histoire et géographie.") }
            if (choixDuTheme == true) { message.reply("Vous avez choisi le quiz de type " + type + ", combien voulez vous de questions?") }
        }
        else {
            if (isNaN(message.content) == false) {
                if (message.content < 20) {
                    questionsFaites = 0
                    nombreQuestions = message.content
                    message.reply("Vous avez choisi " + message.content + " question(s).")
                    if (type == "géographie") { message.reply("Première question. Quelle est la capitale de" + capitale.capitales[0].pays + "?") }
                    else if (type == "histoire") { message.reply("Première question." + histoire.questions[0].question) }
                }
                else { message.reply("Le maximum de questions est 20") }

            }
            else {
                var reponse;
                if (type == "histoire") { reponse = histoire.questions[questionsFaites].reponse }
                else {
                    reponse = capitale.capitales[questionsFaites].capitale
                }
                if (message.content == reponse) { message.reply("Bravo, bonne réponse!") }
                else { message.reply("Mauvaise réponse, la réponse était " + reponse) }
                questionsFaites = questionsFaites + 1
                if (questionsFaites == nombreQuestions) {
                    enCours = false; message.reply("Fin du quiz.")
                    return
                }
                message.reply("Question " + (1 + questionsFaites )+ ".") 
                if (type == "géographie" ) {message.reply ( "Quelle est la capitale de " + capitale.capitales[questionsFaites].pays + "?") } 
                else {message.reply ( histoire.questions[questionsFaites].question)}
            }
        }

    }
});
client.login(config.BOT_TOKEN);
