using ValeSportsCrm.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace ValeSportsCrm.Data
{ 
    // >dotnet ef migration add testMigration
    public class DomainModelContext : DbContext
    {
        public DomainModelContext(DbContextOptions<DomainModelContext> options) :base(options)
        { }
        
        public DbSet<Customer> Customers { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}