using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class depttblMap : EntityTypeConfiguration<depttblModel>
    {
        public depttblMap()
        {
            HasKey(i => i.deptID);
            ToTable("depttbl");
        }
    }
}