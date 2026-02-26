using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Index("Name", Name = "Genres_Name_key", IsUnique = true)]
public partial class Genre
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [InverseProperty("Genre")]
    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}
