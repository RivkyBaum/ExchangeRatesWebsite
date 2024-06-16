using ExchangeRates.Classes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExchangeRates.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ExchangeRatesController : ControllerBase
  {
    private readonly ApiService _apiService;

    public ExchangeRatesController(ApiService apiService)
    {
      _apiService = apiService;
    }

    [HttpGet("exchangeRates/{currencyCode}")]
    public async Task<IActionResult> GetExchangeRates(string currencyCode)
    {
      try
      {
        string exchangeRates = await _apiService.GetExchangeRatesAsync(currencyCode);

        return Ok(exchangeRates);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }
        [HttpGet("AllCurrencies/")]
        public async Task<List<Currency>> GetCurrencies()
        {
            return await _apiService.GetAllCurrencies();
        }
    }
}
