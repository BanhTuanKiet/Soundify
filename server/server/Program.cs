using AutoMapper;
using server.Configs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.CorsPolicy();
builder.Services.AddAutoMapper(typeof(AutoMapperConfig).Assembly);
builder.Services.AddDatabaseAndServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddAuth(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ErrorHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("_allowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
