using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class locdeptMap : EntityTypeConfiguration<loctblModel>
    {
        public locdeptMap()
        {
            HasKey(i => i.locID);
            ToTable("loctbl");

        }
    }
}