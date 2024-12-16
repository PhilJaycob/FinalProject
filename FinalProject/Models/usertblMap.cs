using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class usertblMap : EntityTypeConfiguration<usertblModel>
    {
        public usertblMap()
        {
            HasKey(i => i.userID);
            ToTable("usertbl");

        }
    }
        
    
}