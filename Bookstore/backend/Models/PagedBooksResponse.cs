namespace BookstoreBackend.Models;

public class PagedBooksResponse
{
    public List<Book> Books { get; set; } = [];

    public int TotalCount { get; set; }
}
