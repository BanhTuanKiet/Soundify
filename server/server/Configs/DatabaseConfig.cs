using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services.Album;
using server.Services.Artist;
using server.Services.Playlist;
using server.Services.Song;

namespace server.Configs
{
    public static class DatabaseConfig
    {
        public static void AddDatabaseAndServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"), npgsqlOptions =>
                    {
                        npgsqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(10),
                            errorCodesToAdd: null
                        );
                    }
                )
            );

            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<IAlbum, AlbumService>();
            services.AddScoped<IArtist, ArtistService>();
            services.AddScoped<IPlaylist, PlaylistService>();
            services.AddScoped<ISong, SongService>();
        }
    }
}