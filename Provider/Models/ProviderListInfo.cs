using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Provider.Models
{
    public class ProviderListInfo
    {
        public IEnumerable<ProviderModel> providerModel { get; set; }
        public int totalCount { get; set; }
    }
}