using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class studentstblModel
    {
        internal object deptID;

        public int userID { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string add { get;set }
        public DateTime updateAt { get; internal set; }

        public static implicit operator studentstblModel(studentstblModel v)
        {
            throw new NotImplementedException();
        }
    }
}