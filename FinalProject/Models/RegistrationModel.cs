using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Registration
    {
        public Registration(string fName, string lName, string add, string userID)
        {
            FName = fName;
            LName = lName;
            Uaddress = add;
            Unumb = userID;
        }

        public string FName { get; set; }
        public string LName { get; set; }
        public string Uaddress { get; set; }
        public string Unumb { get; set; }

    }
}