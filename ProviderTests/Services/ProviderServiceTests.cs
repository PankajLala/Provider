using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Provider.Models;
using Provider.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Provider.Services.Tests
{
    [TestClass()]
    public class ProviderServiceTests
    {
        [TestMethod()]
        public async Task GetProviderTest_Count()
        {

            var providerRequest = new ProviderRequest
            {
                max_discharges = null,
                min_discharges = null,
                max_average_covered_charges = null,
                min_average_covered_charges = null,
                max_average_medicare_payments = null,
                min_average_medicare_payments = null,
                state = null,
                columns = null
            };

            var providerModels = new List<ProviderModel>
            {
                new ProviderModel
                {
                    DRDefinition = "Sample",
                    ProviderId = "Sample",
                    ProviderName = "Sample",
                    ProviderStreetAddress = "Sample",
                    ProviderCity = "Sample",
                    TotalDischarges = "Sample"

                }
            };

            var providerListInfo = new ProviderListInfo
            {
                providerModel = providerModels,
                totalCount = 1
            };
            var mockRepo = new Mock<IProviderRepository>();
            mockRepo.Setup(x => x.GetProvider(providerRequest)).ReturnsAsync(providerListInfo);
            ProviderService providerService = new ProviderService(mockRepo.Object);
            var result = await providerService.GetProvider(providerRequest);

            Assert.AreEqual(((IList<ProviderModel>)result.providerModel).Count, 1);
        }

        [TestMethod()]
        public async Task GetProviderTest()
        {

            var providerRequest = new ProviderRequest
            {
                max_discharges = null,
                min_discharges = null,
                max_average_covered_charges = null,
                min_average_covered_charges = null,
                max_average_medicare_payments = null,
                min_average_medicare_payments = null,
                state = "CA",
                columns = null
            };

            var providerModels = new List<ProviderModel>
            {
                new ProviderModel
                {
                    DRDefinition = "Sample",
                    ProviderId = "Sample",
                    ProviderName = "Sample",
                    ProviderStreetAddress = "Sample",
                    ProviderCity = "Sample",
                    TotalDischarges = "Sample",
                    ProviderState = "CA"

                }
            };

            var providerListInfo = new ProviderListInfo
            {
                providerModel = providerModels,
                totalCount = 1
            };
            var mockRepo = new Mock<IProviderRepository>();
            mockRepo.Setup(x => x.GetProvider(providerRequest)).ReturnsAsync(providerListInfo);
            ProviderService providerService = new ProviderService(mockRepo.Object);
            var result = await providerService.GetProvider(providerRequest);

            Assert.AreEqual(((IList<ProviderModel>)result.providerModel)[0].ProviderState, providerRequest.state);
        }


    }
}