import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './books.model';

@Injectable()
export class BooksService {
	constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

	async insertBook(title: string, desc: string, price: number) {
		const newBook = new this.bookModel({
			title,
			desc,
			price,
		});

		const result = await newBook.save();

		return result;
	}

	async getBooks() {
		const books = await this.bookModel.find().exec();

		return books.map(book => ({
			id: book.id,
			title: book.title,
			description: book.description,
			price: book.price,
		}));
	}

	async getSingleBook(bookId: string) {
		const book = await this.findBook(bookId);

		return {
			id: book.id,
			title: book.title,
			description: book.description,
			price: book.price,
		};
	}

	async updateBook(bookId: string, title: string, bookDesc: string, price: number) {
		const updatedBook = await this.findBook(bookId);

		if (title) {
			updatedBook.title = title;
		}

		if (price) {
			updatedBook.price = price;
		}

		if (bookDesc) {
			updatedBook.description = bookDesc;
		}

		updatedBook.save();

		return updatedBook;
	}

	async deleteBook(bookId: string) {
		const result = await this.bookModel.deleteOne({ _id: bookId }).exec();

		if (result.n === 0) {
			throw new NotFoundException('Could not find this book.');
		}

		return true;
	}

	private async findBook(bookId: string): Promise<Book> {
		let book;

		try {
			book = await this.bookModel.findById(bookId).exec();
		} catch (error) {
			throw new NotFoundException('Could not find this book.');
		}

		if (!book) {
			throw new NotFoundException('Could not find this book.');
		}
		
		return book;
	}
}
