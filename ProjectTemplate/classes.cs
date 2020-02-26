using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Data;

namespace Classes
{
    public class Character
    {
        public Character()
        {

        }
        private string _charName {get; set;}
        private string _class {get; set;}
        private string _race {get; set;}
        private string _attackOne {get; set;}
        private string _attackTwo {get; set;}
        private string _attackThree {get; set;}
        private int _level {get; set;}
        private int _str {get; set;}
        private int _dex {get; set;}
        private int _wis {get; set;}
        private int _cha {get; set;}
        public int _armorClass {get; set;}
        private string[] _equipment {get; set;}
        private string[] _otherProf {get; set;}
        private string[] _languages {get; set;}
        private string[] _knownSkills {get; set;}

    }

    public class Methods_for_Character
    {
        public int displayAC()
        {
            Character mycharacter = new Character();
            mycharacter._armorClass = 1;
            return mycharacter._armorClass;
        }
    }
}