using System.Collections.Generic;
using ValeSportsCrm.Core.Model;

namespace ValeSportsCrm.Core
{
    public interface IDataAccessProvider
    {
        void AddCustomer(Customer customer, List<long> sports);
        void UpdateCustomer(long id, Customer customer, List<long> sports);
        void DeleteCustomer(long id);
        Customer GetCustomer(long id);
        List<Customer> GetCustomers();

        void AddProgram(Program program);
        void UpdateProgram(Program program);
        void DeleteProgram(long id);
        Program GetProgram(long id);
        List<Program> GetPrograms();

        List<Sport> GetSports();
        List<ProgramType> GetProgramTypes();
    }
}
