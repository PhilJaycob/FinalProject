using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class RegistrationDTO{
        public string fName { get; set; } = string.Empty;
        public string lName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string UserType { get; set; } = string.Empty;
        public int userID { get; set; }

    }
}