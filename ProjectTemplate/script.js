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


// really confused how the .ready function is positioned
// already have the parameter being passed in
$('characterSheet.html').ready(function postCharacter(val) {
    
    var webMethod = "ProjectServices.asmx/GetCharacters";
    var characterArray;
    var characterID;

    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            characterArray = data;
            characterID = val;
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
});