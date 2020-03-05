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


//logs the user off both at the client and at the server
function logOff() {
    var webMethod = "ProjectServices.asmx/LogOff";
	$.ajax({
		type: "POST",
		url: webMethod,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (msg) {
			if (msg.d) {
				//we logged off, so go back to logon page,
				//stop checking messages
				//and clear the chat panel
				//showPanel('logonPanel');
                //HideMenu();
                window.location.replace("index.html");
                alert(msg.d);
			}
			else {
			}
		},
		error: function (e) {
			alert("boo...");
		}
	});
}

function submitEditCharacter() {

    var webMethod = "ProjectServices.asmx/UpdateCharacter";
    var charName = document.getElementById("editNameId").value;
    var Class = document.getElementById("editClassId").value;
    var Race = document.getElementById("editRaceId").value;
    var AttackOne = document.getElementById("editAttack1Id").value;
    var AttackTwo = document.getElementById("editAttack2Id").value;
    var AttackThree = document.getElementById("editAttack3Id").value;
    var Level = document.getElementById("editLevelId").value;
    var Health = document.getElementById("editHealthId").value;
    var str = document.getElementById("editStrengthId").value;
    var dex = document.getElementById("editDexterityId").value;
    var con = document.getElementById("editConstitutionId").value;
    var Inte = document.getElementById("editIntelligenceId").value;
    var Wis = document.getElementById("editWisdomId").value;
    var Cha = document.getElementById("editCharismaId").value;
    var armorClass = document.getElementById("editArmorclassId").value;
    var Equipment = document.getElementById("editEquipmentId").value;
    var OtherProf = document.getElementById("editOtherproficiencyId").value;
    var Languages = document.getElementById("editLanguageId").value;


    var parameters = "{\"CharName\":\"" + encodeURI(charName)
        + "\", \"Class\":\"" + encodeURI(Class)
        + "\", \"Race\":\"" + encodeURI(Race)
        + "\", \"attackOne\":\"" + encodeURI(AttackOne)
        + "\", \"attackTwo\":\"" + encodeURI(AttackTwo)
        + "\", \"attackThree\":\"" + encodeURI(AttackThree)
        + "\", \"Level\":\"" + encodeURI(Level)
        + "\", \"Health\":\"" + encodeURI(Health)
        + "\", \"str\":\"" + encodeURI(str)
        + "\", \"con\":\"" + encodeURI(con)
        + "\", \"dex\":\"" + encodeURI(dex)
        + "\", \"Inte\":\"" + encodeURI(Inte)
        + "\", \"Wis\":\"" + encodeURI(Wis)
        + "\", \"Cha\":\"" + encodeURI(Cha)
        + "\", \"armorClass\":\"" + encodeURI(armorClass)
        + "\", \"equipment\":\"" + encodeURI(Equipment)
        + "\", \"otherProf\":\"" + encodeURI(OtherProf)
        + "\", \"languages\":\"" + encodeURI(Languages)
        + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responsefromserver = msg.d;
            console.log(responsefromserver);
            window.location.href = 'characterSheet.html';
        }
    });
}

function postEditCharacter() {
    var webMethod = "ProjectServices.asmx/GetCharacters";
    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var characterArray = data.d;
            console.log(characterArray)
            var characterID = localStorage.getItem('charid');
            $("#editNameId").val(characterArray[characterID]._charName);
            $("#editClassId").val(characterArray[characterID]._class);
            $("#editRaceId").val(characterArray[characterID]._race);
            $("#editAttack1Id").val(characterArray[characterID]._attackOne);
            $("#editAttack2Id").val(characterArray[characterID]._attackTwo);
            $("#editAttack3Id").val(characterArray[characterID]._attackThree);
            $("#editLevelId").val(characterArray[characterID]._level);
            $("#editHealthId").val(characterArray[characterID]._health);
            $("#editStrengthId").val(characterArray[characterID]._str);
            $("#editDexterityId").val(characterArray[characterID]._dex);
            $("#editConstitutionId").val(characterArray[characterID]._con);
            $("#editIntelligenceId").val(characterArray[characterID]._int);
            $("#editWisdomId").val(characterArray[characterID]._wis);
            $("#editCharismaId").val(characterArray[characterID]._cha);
            $("#editArmorclassId").val(characterArray[characterID]._armorClass);
            $("#editEquipmentId").val(characterArray[characterID]._equipment);
            $("#editOtherproficiencyId").val(characterArray[characterID]._otherProf);
            $("#editLanguageId").val(characterArray[characterID]._languages);
            $("#editKnownsavesId").val(characterArray[characterID]._knownSaves);
        }
    });
}

function postCharacterSheet() {
    var webMethod = "ProjectServices.asmx/GetCharacters";
    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var characterArray = data.d;
            var characterID = localStorage.getItem('charid');
            $("#nameId").val(characterArray[characterID]._charName);
            $("#classId").val(characterArray[characterID]._class);
            $("#levelId").val(characterArray[characterID]._level);
            $("#armorClassId").val(characterArray[characterID]._armorClass);
            $("#otherProf").val(characterArray[characterID]._otherProf);
            $("#strengthId").val(characterArray[characterID]._str);
            $("#dexterityId").val(characterArray[characterID]._dex);
            $("#constitutionId").val(characterArray[characterID]._con);
            $("#intelligenceId").val(characterArray[characterID]._int);
            $("#wisdomId").val(characterArray[characterID]._wis);
            $("#charismaId").val(characterArray[characterID]._cha);
        }
    });
}

function postTraits() {
    var webMethod = "ProjectServices.asmx/GetCharacters";
    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var characterArray = data.d;
            var characterID = localStorage.getItem('charid');
            var attack1Array = characterArray[characterID]._attackOne.split(",");
            var attack2Array = characterArray[characterID]._attackTwo.split(",");
            var attack3Array = characterArray[characterID]._attackThree.split(",");
            $("#traits-class").val(characterArray[characterID]._class);
            $("#traits-race").val(characterArray[characterID]._race);
            $("#attack1").val(attack1Array[1]);
            $("#damage2").val(attack1Array[2]);
            $("#attack2").val(attack2Array[1]);
            $("#damage2").val(attack2Array[2]);
            $("#attack3").val(attack3Array[1]);
            $("#damage3").val(attack3Array[2]);
            $("#equipment").val(characterArray[characterID]._equipment);
        }
    });
}

function postSkills() {
    var webMethod = "ProjectServices.asmx/GetCharacters";
    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var characterArray = data.d;
            var characterID = localStorage.getItem('charid');
            var skillsArray = characterArray[characterID]._knownSkills.split(",");
            $("#traits-class").val(characterArray[characterID]._class);
            $("#traits-race").val(characterArray[characterID]._race);
            $("#attack1").val(attack1Array[1]);
            $("#damage2").val(attack1Array[2]);
            $("#attack2").val(attack2Array[1]);
            $("#damage2").val(attack2Array[2]);
            $("#attack3").val(attack3Array[1]);
            $("#damage3").val(attack3Array[2]);
            $("#equipment").val(characterArray[characterID]._equipment);
        }
    });
}

function postMainPage(){

    var webMethod = "ProjectServices.asmx/GetCharacters";
    var characterArray;

    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var characterArray = data.d;
            switch (characterArray.length) {
                default:
                    break;
                case 1:
                    $("#openchar1").prop("disabled", false);
                    break;
                case 2:
                    $("#openchar1").prop("disabled", false);
                    $("#openchar2").prop("disabled", false);
                    break;
                case 3:
                    $("#openchar1").prop("disabled", false);
                    $("#openchar2").prop("disabled", false);
                    $("#openchar3").prop("disabled", false);
                    break;
                case 4:
                    $("#openchar1").prop("disabled", false);
                    $("#openchar2").prop("disabled", false);
                    $("#openchar3").prop("disabled", false);
                    $("#openchar4").prop("disabled", false);
                    break;
            }

            $("#name1").val(characterArray[0]._charName);
            $("#class1").val(characterArray[0]._class);
            $("#level1").val(characterArray[0]._level);

            $("#name2").val(characterArray[1]._charName);
            $("#class2").val(characterArray[1]._class);
            $("#level2").val(characterArray[1]._level);

            $("#name3").val(characterArray[2]._charName);
            $("#class3").val(characterArray[2]._class);
            $("#level3").val(characterArray[2]._level);

            $("#name4").val(characterArray[3]._charName);
            $("#class4").val(characterArray[3]._class);
            $("#level4").val(characterArray[3]._level);

        }
    })
}

function openCharacterSheet(id) {
    localStorage.setItem('charid', id);
    window.location.href = 'characterSheet.html';
}

