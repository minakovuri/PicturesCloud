FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS pictures_cloud_build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./WebApi/
WORKDIR /app/WebApi
RUN dotnet restore

# copy everything else and build app
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS pictures_cloud_runtime
WORKDIR /app
COPY --from=pictures_cloud_build /app/WebApi/out ./
COPY ./Storage ./Storage
ENTRYPOINT ["dotnet", "WebApi.dll"]