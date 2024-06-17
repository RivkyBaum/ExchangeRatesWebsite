namespace ExchangeRates.Services
{
    using System;
    using System.Net.Http;
    using System.Text.Json;
    using System.Threading.Tasks;
    using System.Xml.Linq;

    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        private static readonly List<Currency> _currencies = new List<Currency>
        {
        new Currency { Code = "USD", Name = "USD" },
        new Currency { Code = "EUR", Name = "EUR" },
        new Currency { Code = "GBP", Name = "GBP" },
        new Currency { Code = "CNY", Name = "CNY" },
        new Currency { Code = "ILS", Name = "ILS" },

        };
        public async Task<List<Currency>> GetAllCurrencies()
        {
            return _currencies;
        }
        public async Task<string> GetExchangeRatesAsync(string currencyCode)
        {
            string apiUrl = $"https://v6.exchangerate-api.com/v6/0de29d1e794537b77848fa47/latest/{currencyCode}";
            string responseData = null;

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    responseData = await response.Content.ReadAsStringAsync();
                }
                else
                {
                    responseData = $"Error: {response.StatusCode}";
                }
            }
            catch (Exception ex)
            {
                responseData = $"Error: {ex.Message}";
            }

            return responseData;
        }

    }

    public class Currency
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}

