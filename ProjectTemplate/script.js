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


function editCharacter() {
    // code to concatenate all the checked boxes into one variable
    // make a variable to store the concatenated string, and a variable to get all the skills into one variable
    var charSkills = '';
    var newUserInput = document.getElementsByName('editKnownSkills');

    // use for loop to go through all the checkboxes, if input is checkbos and name is knownskills, if it is checked, concatenate the skills
    for (var x = 0; x < newUserInput.length; x++) {
        if (newUserInput[x].type == "checkbox" && newUserInput[x].name == 'editKnownSkills') {
            if (newUserInput[x].checked == true) {
                charSkills += newUserInput[x].value + ',';
            }
        }
    }
    // might not need this code (alert is just a check)
    if (/,$/.test(charSkills)) {
        charSkills = charSkills.replace(/,$/, "")
    }
    alert(charSkills);


    var charName = document.getElementById("editNameId").value;
    var charClass = document.getElementById("editClassId").value;
    var charRace = document.getElementById("editRaceId").value;
    var charLevel = document.getElementById("editLevelId").value;

    var charHealth = document.getElementById("editHealthId").value;
    var charStrength = document.getElementById("editStrengthId").value;
    var charDexterity = document.getElementById("editDexterityId").value;
    var charConstitution = document.getElementById("editConsitutionId").value;

    var charIntelligence = document.getElementById("editIntelligenceId").value;
    var charWisdom = document.getElementById("editWisdomId").value;
    var charCharisma = document.getElementById("editCharismaId").value;

    var charAttack1 = document.getElementById("editAttack1Id").value;
    var charAttack2 = document.getElementById("editAttack2Id").value;
    var charAttack3 = document.getElementById("editAttack3Id").value;

    var charArmorclass = document.getElementById("newArmorclassId").value;

    var charEquipment = document.getElementById("editEquipmentId").value;
    var charOtherProficiency = document.getElementById("editOtherproficiencyId").value;

    var charLanguage = document.getElementById("editLanguageId").value;
    //figure out how to loop through all checkboxes and concatenate all values and save in a variable
    //var charSkills = document.getElementById("newAttack2Id").value;
    var charKnownSaves = document.getElementById("editKnownsavesId").value;


    var webMethod = "AccountServices.asmx/RequestAccount";
    var parameters = "{\"CharName\":\"" + encodeURI(charName) + "\",\"Class\":\"" + encodeURI(charClass) +
        "\",\"Race\":\"" + encodeURI(charRace) + "\",\"Level\":\"" + encodeURI(charLevel) +
        "\",\"Health\":\"" + encodeURI(charHealth) + "\",\"Str\":\"" + encodeURI(charStrength) +
        "\",\"Dex\":\"" + encodeURI(charDexterity) + "\",\"Con\":\"" + encodeURI(charConstitution) +
        "\",\"Int\":\"" + encodeURI(charIntelligence) + "\",\"Wis\":\"" + encodeURI(charWisdom) +
        "\",\"Cha\":\"" + encodeURI(charCharisma) + "\",\"AttackOne\":\"" + encodeURI(charAttack1) +
        "\",\"AttackTwo\":\"" + encodeURI(charAttack2) + "\",\"AttackThree\":\"" + encodeURI(charAttack3) +
        "\",\"ArmorClass\":\"" + encodeURI(charArmorclass) + "\",\"Equipment\":\"" + encodeURI(charEquipment) +
        "\",\"OtherProf\":\"" + encodeURI(charOtherProficiency) + "\",\"Languages\":\"" + encodeURI(charLanguage) +
        "\",\"KnownSkills\":\"" + encodeURI(charSkills) + "\",\"KnownSaves\":\"" + encodeURI(charKnownSaves) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            //showPanel('logonPanel');
            alert("Character data has been Updated");
        },
        error: function (e) {
            alert("Error: something went wrong");
        }
    });
}

