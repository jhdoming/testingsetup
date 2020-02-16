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
        private string getConString()
        {
            return "SERVER=107.180.1.16; PORT=3306; DATABASE=" + dbName + "; UID=" + dbID + "; PASSWORD=" + dbPass;
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
                // replace login with the name of the table in the database
                string testQuery = "select * from login";

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
                return "Something went wrong, please check your credentials and db name and try again.  Error: " + e.Message;
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
            string sqlSelect = "SELECT id FROM users WHERE userid=@idValue and pass=@passValue";

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
                Session["id"] = sqlDt.Rows[0]["id"];
                //Session["admin"] = sqlDt.Rows[0]["admin"];
                success = true;
            }
            //return the result!
            return success;
        }

        [WebMethod] //NOTICE: gotta enable session on each individual method
        public String CreateAccount(string uid, string pass)
        {
            //we return this flag to tell them if they successfully created account
            bool success = false;

            //our connection string comes from our web.config file like we talked about earlier
            // use the method used up top
            string sqlConnectString = getConString();

            // Select pulls the User table so that we can compare to the Inserted Values

            string sqlSelect = "SELECT * FROM users";
            string sqlSelectUserCheck = "SELECT id FROM users WHERE userid=@idValue";
            string sqlInsert = "INSERT INTO users(userid,pass) VALUES(@idValue,@passValue)";


            //set up our connection object to be ready to use our connection string
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            //set up our command object to use our connection, and our query
            MySqlCommand sqlSelectCommand = new MySqlCommand(sqlSelect, sqlConnection);
            MySqlCommand sqlSelectUserNameCommand = new MySqlCommand(sqlSelect, sqlConnection);
            MySqlCommand sqlInsertCommand = new MySqlCommand(sqlInsert, sqlConnection);

            //tell our command to replace the @parameters with real values
            //we decode them because they came to us via the web so they were encoded
            //for transmission (funky characters escaped, mostly)
            sqlSelectCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));
            sqlSelectCommand.Parameters.AddWithValue("@passValue", HttpUtility.UrlDecode(pass));

            sqlSelectUserNameCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));

            sqlInsertCommand.Parameters.AddWithValue("@idValue", HttpUtility.UrlDecode(uid));
            sqlInsertCommand.Parameters.AddWithValue("@passValue", HttpUtility.UrlDecode(pass));


            //a data adapter acts like a bridge between our command object and
            //the data we are trying to get back and put in a table object
            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlSelectCommand);
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

                //checks if the Usernames are different 
                if (String.Equals(uid, (string)sqlDt.Rows[0]["userid"], StringComparison.OrdinalIgnoreCase)==false)
                {
                    if (uid.Length == ((string)sqlDt.Rows[0]["userid"]).Length)
                    {
                        return "User name is in use, please choose another name and try again";
                    }
                }

            }
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
            if (upperLetter == false || numberCheck == false)
            {
                return $"Please make another password that has at least 1 upper case letter and >One number {upperLetter} {numberCheck}";
            }

            // Opens Connection to execute query, then closes once finished
            sqlConnection.Open();
            int check = sqlInsertCommand.ExecuteNonQuery();
            sqlConnection.Close();

            // checks to see that a row is affected. If the change is made, Alerts user to log in.
            if (check == 1)
            {
                return $"Account Successfully Created, You can now log in {upperLetter} {numberCheck}";
            }
            else
            {
                return "Account Creation Failed";
            }

        }
    }
}
