using FinalProject.Models;
using MySql.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class RegistrationContext : DbContext
    {
        static RegistrationContext()
        {
            Database.SetInitializer<RegistrationContext>(null);
        }
        public RegistrationContext() : base("Name = ustmybidet_db")
        {

        }
        public virtual DbSet<usertblModel> usertbl { get; set; }
  

        public virtual DbSet<depttblModel> depttbl { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new usertblMap());
            modelBuilder.Configurations.Add(new depttblMap());
          
        }
    }
}