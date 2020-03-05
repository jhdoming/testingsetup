using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Data;

namespace ProjectTemplate
{
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	[System.Web.Script.Services.ScriptService]

	public class ProjectServices : System.Web.Services.WebService
	{
		////////////////////////////////////////////////////////////////////////
		///replace the values of these variables with your database credentials
		////////////////////////////////////////////////////////////////////////
		private string dbID = "byteme";
		private string dbPass = "!!Byteme";
		private string dbName = "byteme";
		////////////////////////////////////////////////////////////////////////

		////////////////////////////////////////////////////////////////////////
		///call this method anywhere that you need the connection string!
		////////////////////////////////////////////////////////////////////////
		private string getConString() {
			return "SERVER=107.180.1.16; PORT=3306; DATABASE=" + dbName+"; UID=" + dbID + "; PASSWORD=" + dbPass;
		}
		////////////////////////////////////////////////////////////////////////



		/////////////////////////////////////////////////////////////////////////
		//don't forget to include this decoration above each method that you want
		//to be exposed as a web service!
		[WebMethod(EnableSession = true)]
		/////////////////////////////////////////////////////////////////////////
		public string TestConnection()
		{
			try
			{

				string testQuery = "select * from Login";

				////////////////////////////////////////////////////////////////////////
				///here's an example of using the getConString method!
				////////////////////////////////////////////////////////////////////////
				MySqlConnection con = new MySqlConnection(getConString());
				////////////////////////////////////////////////////////////////////////

				MySqlCommand cmd = new MySqlCommand(testQuery, con);
				MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
				DataTable table = new DataTable();
				adapter.Fill(table);
				return "Success!";
			}
			catch (Exception e)
			{
				return "Something went wrong, please check your credentials and db name and try again.  Error: "+e.Message;
			}
		}

        [WebMethod(EnableSession = true)] //NOTICE: gotta enable session on each individual method
        public bool LogOn(string uid, string pass)
        {
            //we return this flag to tell them if they logged in or not
            bool success = false;

            //our connection string comes from our web.config file like we talked about earlier
            // use the method used up top
            string sqlConnectString = getConString();
            //here's our query.  A basic select with nothing fancy.  Note the parameters that begin with @
            //NOTICE: we added admin to what we pull, so that we can store it along with the id in the session
            //string sqlSelect = "SELECT id, admin FROM accounts WHERE userid=@idValue and pass=@passValue";
            string sqlSelect = "SELECT UserId FROM Login WHERE Username=@idValue and Pass=@passValue";

            //set up our connection object to be ready to use our connection string
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            //set up our command object to use our connection, and our query
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            //tell our command to replace the @parameters with real values
            //we decode them because they came to us via the web so they were encoded
            //for transmission (funky characters escaped, mostly)
            sqlCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));
            sqlCommand.Parameters.AddWithValue("@passValue", HttpUtility.UrlDecode(pass));

            //a data adapter acts like a bridge between our command object and
            //the data we are trying to get back and put in a table object
            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
            //here's the table we want to fill with the results from our query
            DataTable sqlDt = new DataTable();
            //here we go filling it!
            sqlDa.Fill(sqlDt);
            //check to see if any rows were returned.  If they were, it means it's
            //a legit account

            if (sqlDt.Rows.Count > 0)
            {
                //if we found an account, store the id and admin status in the session
                //so we can check those values later on other method calls to see if they
                //are 1) logged in at all, and 2) and admin or not
                Session["userId"] = sqlDt.Rows[0]["userId"];
                success = true;
            }
            //return the result!
            return success;
        }

        [WebMethod] //NOTICE: gotta enable session on each individual method
        public String CreateAccount(string uid, string pass)
        {

            string sqlConnectString = getConString();

            // Select pulls the User table so that we can compare to the desired username
            string sqlSelectUserCheck = "SELECT UserID FROM Login WHERE Username=@idValue";
            string sqlInsertNewUser = "INSERT INTO Login(Username,Pass) VALUES(@idValue,@passValue)";

            //COMMAND SET UP
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            MySqlCommand sqlSelectUserCheckCommand = new MySqlCommand(sqlSelectUserCheck, sqlConnection);
            MySqlCommand sqlInsertCommand = new MySqlCommand(sqlInsertNewUser, sqlConnection);

            // SETTING PARAMETERS
            sqlSelectUserCheckCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));
            sqlInsertCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));
            sqlInsertCommand.Parameters.AddWithValue("@passValue", HttpUtility.UrlDecode(pass));

            // opens up pathway to database and fills data table with user names
            // If rows are returned, that means that the desired user name is in use already
            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlSelectUserCheckCommand);
            DataTable sqlDt = new DataTable();
            sqlDa.Fill(sqlDt);

            if (sqlDt.Rows.Count > 0)
            {
                return "User name is in use, please choose another name and try again";
            }


            // establishing check variables for the password
            bool upperLetter = false;
            bool numberCheck = false;

            // Tests each character in the password for validity. If all tests pass, password is valid
            foreach (char c in pass)
            {
                if (char.IsUpper(c))
                {
                    upperLetter = true;
                }

                if (char.IsDigit(c))
                {
                    numberCheck = true;
                }
            }
            //Checks that both an Upper Case Letter and Number are used in the password
            //If either fails, tells user to try again
            if (upperLetter == false || numberCheck == false)
            {
                return "Please make another password that has >One upper case letter and >One number";
            }

            // Opens Connection to execute query, then closes once finished
            sqlConnection.Open();
            int check = sqlInsertCommand.ExecuteNonQuery();
            sqlConnection.Close();

            // checks to see that a row is affected. If the change is made, Alerts user to log in.
            if (check == 1)
            {
                return "Account Successfully Created, You can now log in";
            }
            else
            {
                return "Account Creation Failed";
            }

        }

    //EXAMPLE OF A SELECT, AND RETURNING "COMPLEX" DATA TYPES
		[WebMethod(EnableSession = true)]
		public Character[] GetCharacters()
		{
			//check out the return type.  It's an array of Character objects.  You can look at our custom Chracter class in this solution to see that it's
			//just a container for public class-level variables.  It's a simple container that asp.net will have no trouble converting into json.  When we return
			//sets of information, it's a good idea to create a custom container class to represent instances (or rows) of that information, and then return an array of those objects.
			//Keeps everything simple.

			//WE ONLY SHARE ACCOUNTS WITH LOGGED IN USERS!

				DataTable sqlDt = new DataTable("characters");

				string sqlConnectString = getConString();
				string sqlSelect = "SELECT * FROM byteme.Character WHERE UserID=@userId";

                MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
				MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

                sqlCommand.Parameters.AddWithValue("@userId", Session["userId"]);

                //gonna use this to fill a data table
                MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
				//filling the data table
				sqlDa.Fill(sqlDt);

				//loop through each row in the dataset, creating instances
				//of our container class Account.  Fill each acciount with
				//data from the rows, then dump them in a list.
				List<Character> characters = new List<Character>();
				for (int i = 0; i < sqlDt.Rows.Count; i++)
				{
                    characters.Add(new Character
                    {
                        _charName = sqlDt.Rows[i]["charName"].ToString(),
                        _class = sqlDt.Rows[i]["class"].ToString(),
                        _race = sqlDt.Rows[i]["race"].ToString(),
                        _attackOne = sqlDt.Rows[i]["attackOne"].ToString(),
                        _attackTwo = sqlDt.Rows[i]["attackTwo"].ToString(),
                        _attackThree = sqlDt.Rows[i]["attackThree"].ToString(),
                        _level =Convert.ToInt32(sqlDt.Rows[i]["level"]),
                        _str = Convert.ToInt32(sqlDt.Rows[i]["str"]),
                        _dex = Convert.ToInt32(sqlDt.Rows[i]["dex"]),
                        _int = Convert.ToInt32(sqlDt.Rows[i]["int"]),
                        _wis = Convert.ToInt32(sqlDt.Rows[i]["wis"]),
                        _cha = Convert.ToInt32(sqlDt.Rows[i]["cha"]),
                        _armorClass = Convert.ToInt32(sqlDt.Rows[i]["armorClass"]),
                        _equipment = sqlDt.Rows[i]["equipment"].ToString().Split(','),
                        _otherProf = sqlDt.Rows[i]["otherProf"].ToString().Split(','),
                        _languages = sqlDt.Rows[i]["languages"].ToString().Split(','),
                        _knownSkills = sqlDt.Rows[i]["knownSkills"].ToString().Split(','),
                    });
				}
				//convert the list of accounts to an array and return!
				return characters.ToArray();
		}


            //EXAMPLE OF AN INSERT QUERY WITH PARAMS PASSED IN.  BONUS GETTING THE INSERTED ID FROM THE DB!
            [WebMethod(EnableSession = true)]
            public void CreateCharacter(string characterName, string charClass, string race, string level, string health,
                                        string strength, string dexterity, string constitution, string intelligence, string wisdom, 
                                        string charisma, string attack1, string attack2, string attack3, string armor, string equipment, 
                                        string proficiency, string languages, string skills, string saves)
            {
                string sqlConnectString = getConString();

                //the only thing fancy about this query is SELECT LAST_INSERT_ID() at the end.  All that
                //does is tell mySql server to return the primary key of the last inserted row.
                // query based off the database attributes
                string sqlSelect = "INSERT INTO byteme.Character(UserId, CharName, Class, Race, Level, Health, Str, Dex, Con, Inte, Wis, Cha, AttackOne, AttackTwo, AttackThree, ArmorClass, Equipment, OtherProf, Languages, KnownSkills, KnownSaves) values(@userIdValue, @charNameValue, @classValue, @raceValue, @levelValue, @healthValue, @strValue, @dexValue, @conValue, @inteValue, @wisValue, @chaValue, @attackoneValue, @attacktwoValue, @attackthreeValue, @armorclassValue, @equipmentValue, @otherProfValue, @languagesValue, @knownskillsValue, @knownsavesValue);";

                // get the userId of current session and turn object into a string. THis line of code is if i wasnt sure to put here or in the js file and pass
                // it in as a paramater rather than assiging it here
                //var currentSessionUserId = Session["userId"].ToString();

                MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
                MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);
                var currentSessionUserId = sqlCommand.Parameters.AddWithValue("@userId", Session["userId"]).ToString();


            // put the paramters in parenthesis to be the values in the query
                sqlCommand.Parameters.AddWithValue("@userIdValue", HttpUtility.UrlDecode(currentSessionUserId));
                sqlCommand.Parameters.AddWithValue("@charNameValue", HttpUtility.UrlDecode(characterName));
                sqlCommand.Parameters.AddWithValue("@classValue", HttpUtility.UrlDecode(charClass));
                sqlCommand.Parameters.AddWithValue("@raceValue", HttpUtility.UrlDecode(race));
                sqlCommand.Parameters.AddWithValue("@levelValue", HttpUtility.UrlDecode(level));

                sqlCommand.Parameters.AddWithValue("@healthValue", HttpUtility.UrlDecode(health));
                sqlCommand.Parameters.AddWithValue("@strValue", HttpUtility.UrlDecode(strength));
                sqlCommand.Parameters.AddWithValue("@dexValue", HttpUtility.UrlDecode(dexterity));
                sqlCommand.Parameters.AddWithValue("@conValue", HttpUtility.UrlDecode(constitution));
                sqlCommand.Parameters.AddWithValue("@inteValue", HttpUtility.UrlDecode(intelligence));

                sqlCommand.Parameters.AddWithValue("@wisValue", HttpUtility.UrlDecode(wisdom));
                sqlCommand.Parameters.AddWithValue("@chaValue", HttpUtility.UrlDecode(charisma));
                sqlCommand.Parameters.AddWithValue("@attackoneValue", HttpUtility.UrlDecode(attack1));
                sqlCommand.Parameters.AddWithValue("@attacktwoValue", HttpUtility.UrlDecode(attack2));
                sqlCommand.Parameters.AddWithValue("@attackthreeValue", HttpUtility.UrlDecode(attack3));

                sqlCommand.Parameters.AddWithValue("@armorclassValue", HttpUtility.UrlDecode(armor));
                sqlCommand.Parameters.AddWithValue("@equipmentValue", HttpUtility.UrlDecode(equipment));
                sqlCommand.Parameters.AddWithValue("@otherProfValue", HttpUtility.UrlDecode(proficiency));
                sqlCommand.Parameters.AddWithValue("@languagesValue", HttpUtility.UrlDecode(languages));
                sqlCommand.Parameters.AddWithValue("@knownskillsValue", HttpUtility.UrlDecode(skills));
                sqlCommand.Parameters.AddWithValue("@knownsavesValue", HttpUtility.UrlDecode(saves));

            //this time, we're not using a data adapter to fill a data table.  We're just
            //opening the connection, telling our command to "executescalar" which says basically
            //execute the query and just hand me back the number the query returns (the ID, remember?).
            //don't forget to close the connection!
            sqlConnection.Open();
                //we're using a try/catch so that if the query errors out we can handle it gracefully
                //by closing the connection and moving on
                try
                {
                    int accountID = Convert.ToInt32(sqlCommand.ExecuteScalar());
                    //here, you could use this accountID for additional queries regarding
                    //the requested account.  Really this is just an example to show you
                    //a query where you get the primary key of the inserted row back from
                    //the database!
                }
                catch (Exception e)
                {
                }
                sqlConnection.Close();
            }


    }
}