using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[PrimaryKey("PlaylistId", "SongId")]
public partial class PlaylistSong
{
    [Key]
    public Guid PlaylistId { get; set; }

    [Key]
    public Guid SongId { get; set; }

    public int? OrderIndex { get; set; }

    public DateTime? AddedAt { get; set; }

    [ForeignKey("PlaylistId")]
    [InverseProperty("PlaylistSongs")]
    public virtual Playlist Playlist { get; set; } = null!;

    [ForeignKey("SongId")]
    [InverseProperty("PlaylistSongs")]
    public virtual Song Song { get; set; } = null!;
}
