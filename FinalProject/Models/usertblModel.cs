using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class usertblModel
    {
        public int userID { get; set; }
        public int deptID { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string Address { get; set; }
        public DateTime updateAt { get; set; }
    }
}
