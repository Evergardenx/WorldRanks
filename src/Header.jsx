import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to={"/"}>
        <img src="Logo.svg" alt="WorldRanks" />
      </Link>
      <h1 className="visually-hidden">WorldRanks</h1>
    </header>
  );
}
