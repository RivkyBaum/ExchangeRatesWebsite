 
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/out .# Use the official ASP.NET runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ExchangeRates/ExchangeRates.csproj", "ExchangeRates/"]
RUN dotnet restore "ExchangeRates/ExchangeRates.csproj"
COPY . .
WORKDIR "/src/ExchangeRates"
RUN dotnet build "ExchangeRates.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "ExchangeRates.csproj" -c Release -o /app/publish

# Use the runtime image to run the application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExchangeRates.dll"]
ENTRYPOINT ["dotnet", "aspnetcoreapp.dll"]