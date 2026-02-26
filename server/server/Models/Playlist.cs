using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Index("UserId", Name = "IX_Playlists_UserId")]
public partial class Playlist
{
    [Key]
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool? IsPublic { get; set; }

    public DateTime? CreatedAt { get; set; }

    [InverseProperty("Playlist")]
    public virtual ICollection<PlaylistSong> PlaylistSongs { get; set; } = new List<PlaylistSong>();

    [ForeignKey("UserId")]
    [InverseProperty("Playlists")]
    public virtual AspNetUser? User { get; set; }
}
