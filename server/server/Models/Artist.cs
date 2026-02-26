using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class Artist
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    public string? Bio { get; set; }

    public string? AvatarUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    [StringLength(20)]
    public string Type { get; set; } = null!;

    [InverseProperty("Artist")]
    public virtual ICollection<AlbumArtist> AlbumArtists { get; set; } = new List<AlbumArtist>();

    [ForeignKey("ArtistId")]
    [InverseProperty("Artists")]
    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}
