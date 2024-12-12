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
        internal object faculty;
        internal object depttbl;

        static RegistrationContext()
        {
            Database.SetInitializer<RegistrationContext>(null);
        }
        public RegistrationContext() : base("Name = ustmybidet_db")
        {

        }
        public virtual DbSet<studentstblModel> studentstbl{ get; set; }
        public virtual DbSet<FacultytblModel> facultytbl { get; set; }
        public virtual DbSet<depttblModel> Depttbl { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new FacultytblMap());
            modelBuilder.Configurations.Add(new studentstblMap());
        }

        internal void SaveChanges() => throw new NotImplementedException();
    }
}