using System.Collections.Generic;
using ValeSportsCrm.Core.Model;

namespace ValeSportsCrm.Core
{
    public interface IDataAccessProvider
    {
        void AddCustomer(Customer customer);
        void UpdateCustomer(long id, Customer customer);
        void DeleteCustomer(long id);
        Customer GetCustomer(long id);
        List<Customer> GetCustomers();    
    }
}
