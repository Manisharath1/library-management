package com.lms.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lms.backend.constants.BookStatus;
import com.lms.backend.dto.BookResponseDto;
import com.lms.backend.model.Batch;
import com.lms.backend.model.Book;
import com.lms.backend.repository.BatchRepository;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.services.BookService;
import com.lms.backend.services.StorageService;
import com.lms.backend.services.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BatchRepository batchRepository;
    private final StorageService storageService;
    private final TransactionService transactionService;

    @Override
    public Book createBook(Book book) {
        var bookId = UUID.randomUUID().toString();

        book.setBookId(bookId);
        book.setStatus(BookStatus.OUTOFSTOCK);

        bookRepository.save(book);
        return book;
    }

    @Override
    public Book updateBook(Book book, String bookId) {
        var oldBook = bookRepository.findById(bookId).orElseThrow();

        oldBook.setBookName(book.getBookName());
        oldBook.setAuthor(book.getAuthor());
        oldBook.setDescription(book.getDescription());
        oldBook.setReferenceNumber(book.getReferenceNumber());
        oldBook.setBatchId(book.getBatchId());
        oldBook.setSemester(book.getSemester());
        oldBook.setShelfNumber(book.getShelfNumber());

        bookRepository.save(oldBook);
        return oldBook;
    }

    @Override
    public Book deleteBook(String bookId) {
        var oldBook = bookRepository.findById(bookId).orElseThrow();

        oldBook.setStatus(BookStatus.INACTIVE);
        bookRepository.save(oldBook);

        return oldBook;
    }

    @Override
    public List<BookResponseDto> getBooks() {
        return bookRepository.findAll().stream().map(this::convertBookResponseDto).toList();
    }

    @Override
    public List<Book> getAllActiveBooks() {
        return bookRepository.findAllByStatus(BookStatus.ACTIVE);
    }

    @Override
    public List<Book> getAllInactiveBooks() {
        return bookRepository.findAllByStatus(BookStatus.INACTIVE);
    }

    @Override
    public Book updateStock(String bookId, int stock) {
        if (stock == 0) {
            throw new RuntimeException("stock can't be 0");
        }

        var book = bookRepository.findById(bookId).orElseThrow();
        book.setStatus(BookStatus.ACTIVE);
        book.setAvailableStock(stock);

        bookRepository.save(book);
        return book;
    }

    @Override
    public Book getBookById(String bookId) {
        return bookRepository.findById(bookId).orElseThrow();
    }

    @Override
    public Book bookOutOfStock(String bookId) {
        var book = bookRepository.findById(bookId).orElseThrow();

        book.setAvailableStock(0);
        book.setStatus(BookStatus.OUTOFSTOCK);

        bookRepository.save(book);
        return book;
    }

    @Override
    public List<Book> getBookByShelfNumber(String shelfNumber) {
        return bookRepository.findByShelfNumber(shelfNumber);
    }

    @Override
    public List<Book> getBookByBatchId(String batchId) {
        return bookRepository.findByBatchId(batchId);
    }

    @Override
    public List<Book> getBookBySemester(int semester) {
        return bookRepository.findBySemester(semester);
    }

    @Override
    public String saveBookImage(String bookId, MultipartFile file) {
        var book = bookRepository.findById(bookId).orElseThrow();
        var location = storageService.store(file, "book/");

        book.setImage(location);
        bookRepository.save(book);

        return location;
    }

    @Override
    public Resource getImage(String bookId) {
        var book = bookRepository.findById(bookId).orElseThrow();
        return storageService.load(book.getImage());
    }

    @Override
    public List<BookResponseDto> getBooksByBatch(String batchId, int semester) {
        var books = bookRepository.findAllByBatchIdAndSemester(batchId, semester);
        return books.stream().map(this::convertBookResponseDto).toList();
    }

    @Override
    public List<BookResponseDto> getMostDemandingBooks() {
        var demandingBooks = transactionService.getDemandindBook();
        var referenceNumbers = demandingBooks.stream().map(book -> book.getBookReferenceNumber()).toList();
        var books = bookRepository.findAllByReferenceNumberIn(referenceNumbers);
        return books.stream().map(this::convertBookResponseDto).toList();
    }

    private BookResponseDto convertBookResponseDto(Book book) {
        var batchId = book.getBatchId();
        var batch = batchRepository.findById(batchId).orElse(new Batch());
        var batchName = batch.getBatchName() == null ? "" : batch.getBatchName();
        var image = "/book/%s/image/%d".formatted(book.getBookId(), book.getVersion());

        return new BookResponseDto(book.getBookId(), book.getBookName(), book.getAuthor(),
                book.getDescription(), image,
                book.getReferenceNumber(),
                batchName, book.getSemester(),
                book.getShelfNumber(),
                book.getAvailableStock(), book.getStatus(),
                book.getCreatedBy(), book.getCreatedDate(),
                book.getUpdatedBy(), book.getUpdatedDate());
    }

}
