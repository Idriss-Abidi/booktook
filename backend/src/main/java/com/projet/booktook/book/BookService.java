package com.projet.booktook.book;

import com.projet.booktook.book.dto.BookDTO;
import com.projet.booktook.user.User;
import com.projet.booktook.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BookDTO createBook(BookDTO bookDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setType(bookDTO.getType());
        book.setCategory(bookDTO.getCategory());
        book.setPrice(bookDTO.getPrice());
        book.setCondition(bookDTO.getCondition());
        book.setUser(user);
        book.setAvailable(bookDTO.isAvailable());

        Book savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));
        return convertToDTO(book);
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));

        existingBook.setTitle(bookDTO.getTitle());
        existingBook.setAuthor(bookDTO.getAuthor());
        existingBook.setDescription(bookDTO.getDescription());
        existingBook.setType(bookDTO.getType());
        existingBook.setCategory(bookDTO.getCategory());
        existingBook.setPrice(bookDTO.getPrice());
        existingBook.setCondition(bookDTO.getCondition());
        existingBook.setAvailable(bookDTO.isAvailable());

        if (!existingBook.getUser().getId().equals(bookDTO.getUserId())) {
            User newUser = userRepository.findById(bookDTO.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            existingBook.setUser(newUser);
        }

        Book updatedBook = bookRepository.save(existingBook);
        return convertToDTO(updatedBook);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new EntityNotFoundException("Book not found");
        }
        bookRepository.deleteById(id);
    }

    public List<BookDTO> getBooksByUser(Long userId) {
        return bookRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BookDTO convertToDTO(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setAuthor(book.getAuthor());
        bookDTO.setDescription(book.getDescription());
        bookDTO.setType(book.getType());
        bookDTO.setCategory(book.getCategory());
        bookDTO.setPrice(book.getPrice());
        bookDTO.setCondition(book.getCondition());
        bookDTO.setUserId(book.getUser().getId());
        bookDTO.setAvailable(book.isAvailable());
        bookDTO.setCreatedAt(book.getCreatedAt());
        bookDTO.setUpdatedAt(book.getUpdatedAt());
        return bookDTO;
    }
}