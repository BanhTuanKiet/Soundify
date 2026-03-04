using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Album> Albums { get; set; }

    public virtual DbSet<AlbumArtist> AlbumArtists { get; set; }

    // public virtual DbSet<ApplicationUser> ApplicationUser { get; set; }

    public virtual DbSet<Artist> Artists { get; set; }

    // public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    // public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    // public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    // public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    // public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    // public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<ListeningHistory> ListeningHistories { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<PlaylistSong> PlaylistSongs { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<UserFavoriteSong> UserFavoriteSongs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.HasDefaultSchema("public");
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Albums_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<AlbumArtist>(entity =>
        {
            entity.HasKey(e => new { e.AlbumId, e.ArtistId }).HasName("AlbumArtists_pkey");

            entity.Property(e => e.Role).HasDefaultValueSql("'primary'::character varying");

            entity.HasOne(d => d.Album).WithMany(p => p.AlbumArtists).HasConstraintName("AlbumArtists_AlbumId_fkey");

            entity.HasOne(d => d.Artist).WithMany(p => p.AlbumArtists).HasConstraintName("AlbumArtists_ArtistId_fkey");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Artists_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Type).HasDefaultValueSql("'artist'::character varying");
        });

        // modelBuilder.Entity<AspNetRole>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("AspNetRoles_pkey");

        //     entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
        // });

        // modelBuilder.Entity<AspNetRoleClaim>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("AspNetRoleClaims_pkey");

        //     entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasConstraintName("AspNetRoleClaims_RoleId_fkey");
        // });

        // modelBuilder.Entity<AspNetUser>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("AspNetUsers_pkey");

        //     entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
        //     entity.Property(e => e.AccessFailedCount).HasDefaultValue(0);
        //     entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        //     entity.Property(e => e.EmailConfirmed).HasDefaultValue(false);
        //     entity.Property(e => e.LockoutEnabled).HasDefaultValue(false);
        //     entity.Property(e => e.PhoneNumberConfirmed).HasDefaultValue(false);
        //     entity.Property(e => e.TwoFactorEnabled).HasDefaultValue(false);

        //     entity.HasMany(d => d.Roles).WithMany(p => p.Users)
        //         .UsingEntity<Dictionary<string, object>>(
        //             "AspNetUserRole",
        //             r => r.HasOne<AspNetRole>().WithMany()
        //                 .HasForeignKey("RoleId")
        //                 .HasConstraintName("AspNetUserRoles_RoleId_fkey"),
        //             l => l.HasOne<AspNetUser>().WithMany()
        //                 .HasForeignKey("UserId")
        //                 .HasConstraintName("AspNetUserRoles_UserId_fkey"),
        //             j =>
        //             {
        //                 j.HasKey("UserId", "RoleId").HasName("AspNetUserRoles_pkey");
        //                 j.ToTable("AspNetUserRoles");
        //             });
        // });

        // modelBuilder.Entity<AspNetUserClaim>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("AspNetUserClaims_pkey");

        //     entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasConstraintName("AspNetUserClaims_UserId_fkey");
        // });

        // modelBuilder.Entity<AspNetUserLogin>(entity =>
        // {
        //     entity.HasKey(e => new { e.LoginProvider, e.ProviderKey }).HasName("AspNetUserLogins_pkey");

        //     entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasConstraintName("AspNetUserLogins_UserId_fkey");
        // });

        // modelBuilder.Entity<AspNetUserToken>(entity =>
        // {
        //     entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name }).HasName("AspNetUserTokens_pkey");

        //     entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasConstraintName("AspNetUserTokens_UserId_fkey");
        // });


        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Genres_pkey");
        });

        modelBuilder.Entity<ListeningHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("ListeningHistories_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.PlayedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Song).WithMany(p => p.ListeningHistories)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ListeningHistories_SongId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.ListeningHistories)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ListeningHistories_UserId_fkey");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Playlists_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.IsPublic).HasDefaultValue(true);

            entity.HasOne(d => d.User).WithMany(p => p.Playlists)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("Playlists_UserId_fkey");
        });

        modelBuilder.Entity<PlaylistSong>(entity =>
        {
            entity.HasKey(e => new { e.PlaylistId, e.SongId }).HasName("PlaylistSongs_pkey");

            entity.Property(e => e.AddedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.OrderIndex).HasDefaultValue(0);

            entity.HasOne(d => d.Playlist).WithMany(p => p.PlaylistSongs).HasConstraintName("PlaylistSongs_PlaylistId_fkey");

            entity.HasOne(d => d.Song).WithMany(p => p.PlaylistSongs).HasConstraintName("PlaylistSongs_SongId_fkey");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Songs_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.IsExplicit).HasDefaultValue(false);
            entity.Property(e => e.PlayCount).HasDefaultValue(0L);

            entity.HasOne(d => d.Album).WithMany(p => p.Songs)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Songs_AlbumId_fkey");

            entity.HasOne(d => d.Genre).WithMany(p => p.Songs)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Songs_GenreId_fkey");

            entity.HasMany(d => d.Artists).WithMany(p => p.Songs)
                .UsingEntity<Dictionary<string, object>>(
                    "SongArtist",
                    r => r.HasOne<Artist>().WithMany()
                        .HasForeignKey("ArtistId")
                        .HasConstraintName("SongArtists_ArtistId_fkey"),
                    l => l.HasOne<Song>().WithMany()
                        .HasForeignKey("SongId")
                        .HasConstraintName("SongArtists_SongId_fkey"),
                    j =>
                    {
                        j.HasKey("SongId", "ArtistId").HasName("SongArtists_pkey");
                        j.ToTable("SongArtists");
                    });
        });

        modelBuilder.Entity<UserFavoriteSong>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.SongId }).HasName("UserFavoriteSongs_pkey");

            entity.Property(e => e.LikedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Song).WithMany(p => p.UserFavoriteSongs).HasConstraintName("UserFavoriteSongs_SongId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserFavoriteSongs).HasConstraintName("UserFavoriteSongs_UserId_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
