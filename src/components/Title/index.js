import "./Title.scss";

export default function Title({children, name}) {
    return (
        <div className="title">
        {children}
            <div className="card-body"> 
                <h1>{name}</h1>
            </div>
        </div>
    )
}