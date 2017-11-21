using Dapper;
using Provider.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Provider.Repository
{
    public interface IProviderRepository
    {
          Task<ProviderListInfo> GetProvider(ProviderRequest providerRequest);
    }
    public class ProviderRepository: IProviderRepository
    {
        
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["ProviderDB"].ConnectionString;
        public async Task<ProviderListInfo> GetProvider(ProviderRequest providerRequest)
            {
            string pass = null;
            
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                //await sqlConnection.OpenAsync(); 
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@max_discharges", providerRequest.max_discharges);
                dynamicParameters.Add("@min_discharges", providerRequest.min_discharges);
                dynamicParameters.Add("@max_average_covered_charges", providerRequest.max_average_covered_charges);
                dynamicParameters.Add("@min_average_covered_charges", providerRequest.min_average_covered_charges);
                dynamicParameters.Add("@min_average_medicare_payments", providerRequest.min_average_medicare_payments);
                dynamicParameters.Add("@max_average_medicare_payments", providerRequest.max_average_medicare_payments);
                dynamicParameters.Add("@state", providerRequest.state);

                if(string.IsNullOrWhiteSpace(providerRequest.max_discharges) &&
                    string.IsNullOrWhiteSpace(providerRequest.min_discharges) &&
                    string.IsNullOrWhiteSpace(providerRequest.max_average_covered_charges) &&
                    string.IsNullOrWhiteSpace(providerRequest.min_average_covered_charges) &&
                    string.IsNullOrWhiteSpace(providerRequest.min_average_medicare_payments) &&
                    string.IsNullOrWhiteSpace(providerRequest.max_average_medicare_payments) &&
                    string.IsNullOrWhiteSpace(providerRequest.state))
                {
                    dynamicParameters.Add("@selectparams", pass);
                    dynamicParameters.Add("@PageIndex", providerRequest.pageIndex);
                    dynamicParameters.Add("@pageSize", providerRequest.pageSize);

                    ProviderListInfo providerListInfo = new ProviderListInfo();
                    using (var multi = await sqlConnection.QueryMultipleAsync("[dbo].[GetProviders]", dynamicParameters, commandType: CommandType.StoredProcedure))
                    {
                        providerListInfo.providerModel = multi.Read<ProviderModel>();
                        providerListInfo.totalCount = multi.Read<int>().AsList<int>()[0];
                    }
                    return providerListInfo;
                }
                else
                {
                    dynamicParameters.Add("@selectparams", providerRequest.columns);
                    dynamicParameters.Add("@PageIndex", providerRequest.pageIndex);
                    dynamicParameters.Add("@pageSize", providerRequest.pageSize);
                    ProviderListInfo providerListInfo = new ProviderListInfo();
                    using (var multi = await sqlConnection.QueryMultipleAsync("[dbo].[GetProvidersDynamic]", dynamicParameters, commandType: CommandType.StoredProcedure))
                    {
                        providerListInfo.providerModel = multi.Read<ProviderModel>();
                        providerListInfo.totalCount = multi.Read<int>().AsList<int>()[0];
                    }
                    return providerListInfo;

                }

            }
            
        }
    }
}