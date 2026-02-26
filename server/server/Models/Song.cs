using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Index("AlbumId", Name = "IX_Songs_AlbumId")]
[Index("GenreId", Name = "IX_Songs_GenreId")]
public partial class Song
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public Guid? AlbumId { get; set; }

    public int? GenreId { get; set; }

    public string FileUrl { get; set; } = null!;

    public int DurationSeconds { get; set; }

    [Precision(10, 2)]
    public decimal? FileSizeMb { get; set; }

    public long? PlayCount { get; set; }

    public bool? IsExplicit { get; set; }

    public DateTime? CreatedAt { get; set; }

    [ForeignKey("AlbumId")]
    [InverseProperty("Songs")]
    public virtual Album? Album { get; set; }

    [ForeignKey("GenreId")]
    [InverseProperty("Songs")]
    public virtual Genre? Genre { get; set; }

    [InverseProperty("Song")]
    public virtual ICollection<ListeningHistory> ListeningHistories { get; set; } = new List<ListeningHistory>();

    [InverseProperty("Song")]
    public virtual ICollection<PlaylistSong> PlaylistSongs { get; set; } = new List<PlaylistSong>();

    [InverseProperty("Song")]
    public virtual ICollection<UserFavoriteSong> UserFavoriteSongs { get; set; } = new List<UserFavoriteSong>();

    [ForeignKey("SongId")]
    [InverseProperty("Songs")]
    public virtual ICollection<Artist> Artists { get; set; } = new List<Artist>();
}
