using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Controllers
{
    public class RegistrationController
    {
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Uaddress { get; set; }
        public string Utype { get; set; }

        public int Unumb { get; set; }

    }
}