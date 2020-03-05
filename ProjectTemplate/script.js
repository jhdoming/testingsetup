
//$(document).ready(
//    function () {
//        $("#test").click(
//            function () {
//                concatenateCheckbox();
//            }
//        );
//    }
//);

//function concatenateCheckbox() {
//    var string = '';

//    var userInput = document.getElementsByName('knownSkills');

//    for (var x = 0; x < userInput.length; x++) {
//        if (userInput[x].type == "checkbox" && userInput[x].name == 'knownSkills') {
//            if (userInput[x].checked == true) {
//                string += userInput[x].value + ',';
//            }
//        }
//    }
//    if (/,$/.test(string)) {
//        string = string.replace(/,$/, "")
//    }
//    alert(string);
//}

function createAccount() {
    var id = document.getElementById("createId").value;
    var pass = document.getElementById("createPass").value;

    var webMethod = "ProjectServices.asmx/createAccount";

    var parameters = "{\"uid\":\"" + encodeURI(id) + "\", \"pass\":\"" + encodeURI(pass) + "\"}";


    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            if (responseFromServer == true) {
                alert(responseFromServer);
                //window.location.replace("index.html");
            }
            else {
                alert(responseFromServer);
            }
            //after creating an account, sends you back to the login page (works here but also works when password isnt set right)
            //window.location.replace("index.html");
        },
        error: function (e) {
            alert("this code will only execute if javascript is unable to access the webservice");
        }
    });
}


function createCharacter() {
    // variable to store the concatenated character skills
    var charSkills = '';

    // make an empty variable to store the concatenated strings, and a variable to get and store all the skills into one variable by name attribute
    var userInput = document.getElementsByName('knownSkills');

    // use for loop to go through all the checkboxes, if the input is checkbox and name is knownskills and if it is checked, concatenate the skills
        for (var x = 0; x < userInput.length; x++) {
            if (userInput[x].type == "checkbox" && userInput[x].name == 'knownSkills') {
                if (userInput[x].checked == true) {
                    charSkills += userInput[x].value + ',';
                }
            }
        }
    // might not need this code (alert is just a check that it was concatenated in charSkills variable)
    if (/,$/.test(charSkills)) {
        charSkills = charSkills.replace(/,$/, "")
        }
    //alert(charSkills);


    // created variables to store all the user input from the create character hmtl, by grabbing all the inputs by Id
    var charName = document.getElementById("newNameId").value;
    var charClass = document.getElementById("newClassId").value;
    var charRace = document.getElementById("newRaceId").value;
    var charLevel = document.getElementById("newLevelId").value;

    var charHealth = document.getElementById("newHealthId").value;
    var charStrength = document.getElementById("newStrengthId").value;
    var charDexterity = document.getElementById("newDexterityId").value;
    var charConstitution = document.getElementById("newConsitutionId").value;

    var charIntelligence = document.getElementById("newIntelligenceId").value;
    var charWisdom = document.getElementById("newWisdomId").value;
    var charCharisma = document.getElementById("newCharismaId").value;

    var charAttack1 = document.getElementById("newAttack1Id").value;
    var charAttack2 = document.getElementById("newAttack2Id").value;
    var charAttack3 = document.getElementById("newAttack3Id").value;

    var charArmorclass = document.getElementById("newArmorclassId").value;

    var charEquipment = document.getElementById("newEquipmentId").value;
    var charOtherProficiency = document.getElementById("newOtherproficiencyId").value;

    var charLanguage = document.getElementById("newLanguageId").value;
    var charKnownSaves = document.getElementById("newKnownsavesId").value;

    alert(charName);
    alert(charClass);
    alert(charRace);
    alert(charLevel);
    alert(charHealth);
    alert(charStrength);
    alert(charDexterity);
    alert(charConstitution);
    alert(charIntelligence);
    alert(charWisdom);
    alert(charCharisma);
    alert(charAttack1);
    alert(charAttack2);
    alert(charAttack3);
    alert(charArmorclass);
    alert(charEquipment);
    alert(charOtherProficiency);
    alert(charLanguage);
    alert(charKnownSaves);
    alert(charSkills);


    // wasn't sure if to put this here and pass it through the parameters like all the other variables above. I put this line of code in
    // the ProjectServices.asmx file just after the query
    //var currentSession = Session["userId"]

    // reference the function/webservice here
    var webMethod = "ProjectServices.asmx/CreateCharacter";

    // pass the info to the server
    var parameters = "{\"CharName\":\"" + encodeURI(charName) + "\",\"Class\":\"" + encodeURI(charClass) +
                        "\",\"Race\":\"" + encodeURI(charRace) + "\",\"Level\":\"" + encodeURI(charLevel) +
                        "\",\"Health\":\"" + encodeURI(charHealth) + "\",\"Str\":\"" + encodeURI(charStrength) +
                        "\",\"Dex\":\"" + encodeURI(charDexterity) + "\",\"Con\":\"" + encodeURI(charConstitution) +
                        "\",\"Inte\":\"" + encodeURI(charIntelligence) + "\",\"Wis\":\"" + encodeURI(charWisdom) +
                        "\",\"Cha\":\"" + encodeURI(charCharisma) + "\",\"AttackOne\":\"" + encodeURI(charAttack1) +
                        "\",\"AttackTwo\":\"" + encodeURI(charAttack2) + "\",\"AttackThree\":\"" + encodeURI(charAttack3) +
                        "\",\"ArmorClass\":\"" + encodeURI(charArmorclass) + "\",\"Equipment\":\"" + encodeURI(charEquipment) +
                        "\",\"OtherProf\":\"" + encodeURI(charOtherProficiency) + "\",\"Languages\":\"" + encodeURI(charLanguage) +
                        "\",\"KnownSkills\":\"" + encodeURI(charSkills) + "\",\"KnownSaves\":\"" + encodeURI(charKnownSaves) +"\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            //showPanel('logonPanel');
            alert("New Character has been Created");
            alert(responseFromServer);

        },
        error: function (e) {
            alert("Error: something went wrong");
            //responseFromServer
        }
    });
}


function logon() {
    var id = document.getElementById("logonId").value;
    var pass = document.getElementById("logonPass").value;

    var webMethod = "ProjectServices.asmx/LogOn";

    var parameters = "{\"uid\":\"" + encodeURI(id) + "\", \"pass\":\"" + encodeURI(pass) + "\"}";


    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            if (responseFromServer == true) {

                location.href ="mainpage.html";
            }
            else {
                alert("bad credentials");
            }
        },
        error: function (e) {
            alert("this code will only execute if javascript is unable to access the webservice");
        }
    });
}

function postCharacter() 
{
    var webMethod = "ProjectServices.asmx/GetCharacters";
    var characterArray;
    var characterID;

    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            characterArray = data;
            characterID = 0;
            $("#charName").val(characterArray.d[characterID]._charName);
            $("#class").val(characterArray.d[characterID]._class);
            $("#level").val(characterArray.d[characterID]._level);
            $("#armorClass").val(characterArray.d[characterID]._armorClass);
            $("#otherProf").val(characterArray.d[characterID]._otherProf);
            $("#str").val(characterArray.d[characterID]._str);
            $("#dex").val(characterArray.d[characterID]._dex);
            $("#con").val(characterArray.d[characterID]._con);
            $("#int").val(characterArray.d[characterID]._int);
            $("#wis").val(characterArray.d[characterID]._wis);
            $("#cha").val(characterArray.d[characterID]._cha);

        }
    })
}
