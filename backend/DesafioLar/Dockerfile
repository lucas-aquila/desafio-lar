FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["DesafioLar/DesafioLar.csproj", "DesafioLar/"]
COPY ["DesafioLar.Application/DesafioLar.Application.csproj", "DesafioLar.Application/"]
COPY ["DesafioLar.Domain/DesafioLar.Domain.csproj", "DesafioLar.Domain/"]
COPY ["DesafioLar.Infrastructure/DesafioLar.Infrastructure.csproj", "DesafioLar.Infrastructure/"]

RUN dotnet restore "DesafioLar/DesafioLar.csproj"

COPY . .

WORKDIR "/src/DesafioLar"

RUN dotnet publish "DesafioLar.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "DesafioLar.dll"]