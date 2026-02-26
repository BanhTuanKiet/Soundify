using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[PrimaryKey("AlbumId", "ArtistId")]
public partial class AlbumArtist
{
    [Key]
    public Guid AlbumId { get; set; }

    [Key]
    public Guid ArtistId { get; set; }

    [StringLength(50)]
    public string? Role { get; set; }

    [ForeignKey("AlbumId")]
    [InverseProperty("AlbumArtists")]
    public virtual Album Album { get; set; } = null!;

    [ForeignKey("ArtistId")]
    [InverseProperty("AlbumArtists")]
    public virtual Artist Artist { get; set; } = null!;
}
