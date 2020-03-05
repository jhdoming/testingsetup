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
    public class Feature
    {

        public string _class { get; set; }
        public int _level { get; set; }
        public int _profbonus { get; set; }

        public string[] _features { get; set; }

    }
}

