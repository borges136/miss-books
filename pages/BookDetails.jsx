import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setBook(null)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function priceClass() {
        if (book.listPrice.amount > 150)
            return 'red'
        else if (book.listPrice.amount < 20)
            return 'green'
    }

    function readingType() {
        if (book.pageCount > 500) 
         return 'Serious Reading'
        else if (book.pageCount > 200) 
          return 'Decent Reading'
        else if (book.pageCount < 100) 
          return 'Light Reading'
    }
    function ageLabel() {
      const yearInSeconds = 10*356*24*60*60
      if (new Date() - book.publishedDate > 10 * yearInSeconds)
        return 'Vintage'
      else if (new Date() - book.publishedDate < 1 * yearInSeconds)
        return 'New'
    }

    // console.log('Details render')

    if (!book) return <div className="loader">Loading...</div>
    // console.log('book:', book)
    return (
        <section className="book-details">
            <h1 className="title"><LongTxt txt={book.title} length="10" /></h1>
            <div className="age">{ageLabel()}</div>
            <div className='reading-type'>{readingType()}</div>
            <h2 className="author">
                By:
                {
                    book.authors.map ((author, index) =>

                        <span key={index} className="author"> {(index > 0) && ', '}{author}</span>
                    )
                }
                </h2>
            <div className="price-and-label">
              <h1 className={priceClass()}> Price: {book.listPrice.amount}{book.listPrice.currencyCode}</h1>
              {book.listPrice.isOnSale && <span className="on-sale"> On Sale! </span>}
            </div>
            <img src={book.thumbnail} alt="book-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}