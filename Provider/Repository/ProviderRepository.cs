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
          Task<IEnumerable<ProviderModel>> GetProvider(ProviderRequest providerRequest);
    }
    public class ProviderRepository: IProviderRepository
    {
        
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["ProviderDB"].ConnectionString;
        public async Task<IEnumerable<ProviderModel>> GetProvider(ProviderRequest providerRequest)
        {
            string pass = null;
            
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                await sqlConnection.OpenAsync(); 
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@max_discharges", providerRequest.max_discharges);
                dynamicParameters.Add("@min_discharges", providerRequest.min_discharges);
                dynamicParameters.Add("@max_average_covered_charges", providerRequest.max_average_covered_charges);
                dynamicParameters.Add("@min_average_covered_charges", providerRequest.min_average_covered_charges);
                dynamicParameters.Add("@min_average_medicare_payments", providerRequest.min_average_medicare_payments);
                dynamicParameters.Add("@max_average_medicare_payments", providerRequest.max_average_medicare_payments);
                dynamicParameters.Add("@state", providerRequest.state);

                if(string.IsNullOrWhiteSpace(providerRequest.columns))
                {
                    dynamicParameters.Add("@selectparams", pass);
                    return await sqlConnection.QueryAsync<ProviderModel>(
                        "GetProviders",
                        dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                }
                else
                {
                    dynamicParameters.Add("@selectparams", providerRequest.columns);
                    return await sqlConnection.QueryAsync<ProviderModel>(
                        "GetProvidersDynamic",
                        dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                }

            }
            
        }
    }
}