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
    public class Character
    {

        public string _charName {get; set;}
        public string _class {get; set;}
        public string _race {get; set;}
        public string _attackOne {get; set;}
        public string _attackTwo {get; set;}
        public string _attackThree {get; set;}
        public int _level {get; set;}
        public int _health { get; set; }
        public int _str {get; set;}
        public int _con { get; set; }
        public int _dex {get; set;}
        public int _int {get; set;}
        public int _wis {get; set;}
        public int _cha {get; set;}
        public int _armorClass {get; set;}
        public string[] _equipment {get; set;}
        public string[] _otherProf {get; set;}
        public string[] _languages {get; set;}
        public string[] _knownSkills {get; set;}
        public string[] _knownSaves { get; set; }
        public string[] _features { get; set; }
        public string[] _traits { get; set; }



    }
}