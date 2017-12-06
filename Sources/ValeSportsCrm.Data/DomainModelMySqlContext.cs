using ValeSportsCrm.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace ValeSportsCrm.Data
{ 
    // >dotnet ef migration add testMigration
    public class DomainModelMySqlContext : DbContext
    {
        public DomainModelMySqlContext(DbContextOptions<DomainModelMySqlContext> options) :base(options)
        { }
        
        public DbSet<Customer> Customers { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Customer>().HasKey(m => m.Id);
            
            base.OnModelCreating(builder);
        }
    }
}