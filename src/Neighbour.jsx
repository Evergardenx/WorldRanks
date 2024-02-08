import { Link } from "react-router-dom";

export default function Neighbour({ img, alt, name }) {
  return (
    <Link
      aria-label={name}
      to={`/country/${name.toLowerCase()}`}
      className="neighbour__link"
    >
      <article className="country__neighbour">
        <img src={img} alt={alt} className="neighbour__img" />
        <span>{name}</span>
      </article>
    </Link>
  );
}
