namespace ExchangeRates.Classes
{
  using System;
  using System.Net.Http;
  using System.Threading.Tasks;

  public class ApiService
  {
    private readonly HttpClient _httpClient;

    public ApiService(HttpClient httpClient)
    {
      _httpClient = httpClient;
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

}
