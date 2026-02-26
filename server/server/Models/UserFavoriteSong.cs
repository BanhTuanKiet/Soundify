using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[PrimaryKey("UserId", "SongId")]
public partial class UserFavoriteSong
{
    [Key]
    public Guid UserId { get; set; }

    [Key]
    public Guid SongId { get; set; }

    public DateTime? LikedAt { get; set; }

    [ForeignKey("SongId")]
    [InverseProperty("UserFavoriteSongs")]
    public virtual Song Song { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserFavoriteSongs")]
    public virtual AspNetUser User { get; set; } = null!;
}
