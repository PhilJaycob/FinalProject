using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class loctblModel
    {
        public int locID { get; set; }
        public string LocName { get; set; }
        public string isActive { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}