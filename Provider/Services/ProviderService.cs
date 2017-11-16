using Provider.Models;
using Provider.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Provider.Services
{
    public interface IProviderService
    {
        Task<IEnumerable<ProviderModel>> GetProvider(ProviderRequest providerRequest);
    }
    public class ProviderService: IProviderService
    {
        private IProviderRepository _providerRepository ;

        public ProviderService(IProviderRepository providerRepository)
        {
            _providerRepository = providerRepository;
        }
        public async Task<IEnumerable<ProviderModel>> GetProvider(ProviderRequest providerRequest)
        {
            return await _providerRepository.GetProvider(providerRequest);
        }
    }
}