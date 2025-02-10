const { useState, useEffect } = React

export function LongTxt({txt, length = 100}) {

  const [showingFullText, setShowingFullText] = useState(false)
  function onClick(ev) {
    ev.preventDefault()
    setShowingFullText(!showingFullText)
  }

  if (txt.length <= length)
    return txt

  return(
    <span> 
    {showingFullText ? txt : `${txt.substring(0, length)}...`}
    <a href="#" className="full-text-toggle" onClick={onClick}>{showingFullText ? '-' : '+'}</a>
    </span>
    )

}