using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class Album
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public DateOnly? ReleaseDate { get; set; }

    public string? CoverImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    [InverseProperty("Album")]
    public virtual ICollection<AlbumArtist> AlbumArtists { get; set; } = new List<AlbumArtist>();

    [InverseProperty("Album")]
    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}
