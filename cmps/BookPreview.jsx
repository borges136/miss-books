import { LongTxt } from "../cmps/LongTxt.jsx"
export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Title: <LongTxt txt={book.title} length={10}/></h2>
            <h4>Book List price: {book.listPrice.amount}{book.listPrice.currencyCode}</h4>
            <img src={book.thumbnail} alt="book-image" />
        </article>
    )
}