

export default function Heading({title}) {
  return (
    <div className="heading__partition">
            <span className="heading__lines"></span>
            <h1 className={`heading__text`}>{title}</h1>
            <span className="heading__lines"></span>
    </div>
  )
}
