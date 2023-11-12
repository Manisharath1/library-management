package com.lms.backend.services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.lms.backend.dto.BookResponseDto;
import com.lms.backend.model.Book;

public interface BookService {
    Book createBook(Book book);

    Book updateBook(Book book, String bookId);

    Book deleteBook(String bookId);

    Book getBookById(String bookId);

    List<BookResponseDto> getBooks();

    List<Book> getAllActiveBooks();

    List<Book> getAllInactiveBooks();

    Book updateStock(String bookId, int stock);

    Book bookOutOfStock(String bookId);

    List<Book> getBookByShelfNumber(String shelfNumber);

    List<Book> getBookByBatchId(String batchId);

    List<Book> getBookBySemester(int semester);

    String saveBookImage(String bookId, MultipartFile file);

    Resource getImage(String bookId);

    List<BookResponseDto> getBooksByBatch(String batchId, int semester);

    List<BookResponseDto> getMostDemandingBooks();
}
