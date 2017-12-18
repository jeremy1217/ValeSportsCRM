namespace ValeSportsCrm.Core.Model
{
    public class CustomerSport
    {
        public long CustomerId { get; set; }
        public Customer Customer { get; set; }

        public long SportId { get; set; }
        public Sport Sport { get; set; }
    }
}
