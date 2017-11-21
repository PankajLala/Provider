using Provider.Models;
using Provider.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Provider.Controllers
{
    public class ProviderController : ApiController
    {
        private IProviderService _providerService;
        public ProviderController(IProviderService providerService)
        {
            _providerService = providerService;
        }

        [HttpGet]
        [Route("api/provider/getprovider/")]
        public async Task<ProviderListInfo> GetProviders(string state = null, string max_discharges = null, string min_discharges = null,
    string max_average_covered_charges = null, string min_average_covered_charges = null, string min_average_medicare_payments = null,
    string max_average_medicare_payments = null, string columns = null, int pageIndex = 1, int pageSize = 10)
        {
            var providerRequest = new ProviderRequest
            {
                max_discharges = max_discharges,
                min_discharges = min_discharges,
                max_average_covered_charges = max_average_covered_charges,
                min_average_covered_charges = min_average_covered_charges,
                max_average_medicare_payments = max_average_medicare_payments,
                min_average_medicare_payments = min_average_medicare_payments,
                state = state,
                columns = columns,
                pageIndex= pageIndex,
                pageSize = pageSize
            };

            return await _providerService.GetProvider(providerRequest);

        }

        [Authorize]
        public async Task<ProviderListInfo> Get(string state = null, string max_discharges = null, string min_discharges = null,
            string max_average_covered_charges=null, string min_average_covered_charges = null, string min_average_medicare_payments = null,
            string max_average_medicare_payments = null, string columns = null, int pageIndex = 1, int pageSize = 10)
        {
            var providerRequest = new ProviderRequest
            {
                max_discharges = max_discharges,
                min_discharges = min_discharges,
                max_average_covered_charges = max_average_covered_charges,
                min_average_covered_charges = min_average_covered_charges,
                max_average_medicare_payments = max_average_medicare_payments,
                min_average_medicare_payments = min_average_medicare_payments,
                state = state,
                columns = columns,
                pageIndex = pageIndex,
                pageSize = pageSize
            };
            
            return await _providerService.GetProvider(providerRequest);

        }
    }
}
