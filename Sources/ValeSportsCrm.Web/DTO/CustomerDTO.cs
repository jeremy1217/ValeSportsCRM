using System.Collections.Generic;

namespace ValeSportsCrm.Web.DTO
{
    public class CustomerDTO
    {
        public long Id { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string BirthDate { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

        public List<long> Sports { get; set; }
    }
}
