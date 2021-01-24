import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
	constructor(private readonly BooksService: BooksService) {}

	@Post()
	async addBook(
		@Body('title') bookTitle: string,
		@Body('description') bookDesc: string,
		@Body('price') bookPrice: number, 
	) {
		const book = await this.BooksService.insertBook(bookTitle, bookDesc, bookPrice);

		return {
			statusCode: HttpStatus.OK,
			message: 'Book added successfully',
			data: book,
		};
	}

	@Get()
	async getAllBooks() {
		const books = await this.BooksService.getBooks();

		return books;
	}

	@Get(':id')
	async getBooks(@Param('id') bookId: string) {
		return this.BooksService.getSingleBook(bookId);
	}

	@Patch(':id')
	async updateBook(
		@Param('id') bookId: string,
		@Body('title') bookTitle: string,
		@Body('description') bookDesc: string,
		@Body('price') bookPrice: number,
	) {
		const book = await this.BooksService.updateBook(
			bookId,
			bookTitle,
			bookDesc,
			bookPrice,
		);

		return {
			statusCode: HttpStatus.OK,
			message: 'Book updated successfully',
			data: book,
		};
	}

	@Delete(':id')
	async removeBook(@Param('id') bookId: string) {
		const isDeleted = await this.BooksService.deleteBook(bookId);

		if (isDeleted) {
			return {
				statusCode: HttpStatus.OK,
				message: 'Book deleted successfully',
			};
		}
	}
}
