using System;

namespace ValeSportsCrm.Web.DTO
{
    public class ProgramDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
        public long ProgramTypeId { get; set; }
    }
}
