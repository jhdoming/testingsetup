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
    public class character
    {

        private string _charName;
        private string _class;
        private string _race;
        private string _attackOne;
        private string _attackTwo;
        private string _attackThree;
        private int _level;
        private int _str;
        private int _dex;
        private int _wis;
        private int _cha;
        private int _armorClass;
        private string[] _equipment;
        private string[] _otherProf;
        private string[] _languages;
        private string[] _knownSkills;

    }

}