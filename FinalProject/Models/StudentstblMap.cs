using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class studentstblMap : EntityTypeConfiguration<>
    {

        public studentstblMap()
        {
            HasKey(i => i.userID);
            ToTable("studentstbl");

        }
    }
}
