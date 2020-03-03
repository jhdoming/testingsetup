

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

function sessionHoldingTable(characterID=0) {
        var characterID = characterID;
    return characterID
}

function openCharacterSheet(id) {
    localStorage.setItem('charid', id);
    window.location.href = 'characterSheet.html';
}