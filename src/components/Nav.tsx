import { Link } from "react-router-dom";
import { CSSProperties } from "react";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/SavedCandidates" style={styles.link}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles: { [key: string]: CSSProperties } = {
  nav: {
    background: "transparent",
    padding: "20px",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  ul: {
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  li: {
    display: "inline",
  },
  link: {
    color: "white",
    textDecoration: "none",
  }
};

export default Nav;