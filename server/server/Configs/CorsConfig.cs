namespace server.Configs
{
    public static class CorsConfig
    {
        public static void CorsPolicy(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("_allowSpecificOrigins", policy =>
                {
                    policy
                        .WithOrigins(
                            "http://localhost:5173"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
        }
    }
}