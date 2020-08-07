using System;
using System.ComponentModel.DataAnnotations;

namespace Receive_API.Models
{
    public class Department
    {
        [Key]
        public string ID { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Updated_By { get; set; }
        public DateTime? Updated_Time { get; set; }
    }
}