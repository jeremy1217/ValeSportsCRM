using ValeSportsCrm.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace ValeSportsCrm.Data
{
    public class DomainModelContext : DbContext
    {
        public DomainModelContext(DbContextOptions<DomainModelContext> options) :base(options)
        { }
        
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<CustomerSport> CustomerSport { get; set; }
        public DbSet<ProgramType> ProgramTypes { get; set; }
        public DbSet<Program> Programs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Many-to-many: customer - sport
            builder.Entity<CustomerSport>()
                .HasKey(bc => new { bc.CustomerId, bc.SportId });
            builder.Entity<CustomerSport>()
                .HasOne(bc => bc.Sport)
                .WithMany(b => b.CustomerSports)
                .HasForeignKey(bc => bc.SportId);
            builder.Entity<CustomerSport>()
                .HasOne(bc => bc.Customer)
                .WithMany(c => c.CustomerSports)
                .HasForeignKey(bc => bc.CustomerId);
        }
    }
}