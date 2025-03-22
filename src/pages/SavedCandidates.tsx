import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface"; 
import "../styles/SavedCandidates.css";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );
    setSavedCandidates(storedCandidates);
  }, []);

  const handleRemove = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <h2>No candidates have been accepted.</h2>
      ) : (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.name} className="profile-img" />
                </td>
                <td>
                  <strong>{candidate.name}</strong> <br />
                  <i>({candidate.login})</i>
                </td>
                <td>{candidate.location || "Not Available"}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`} className="email-link">
                      {candidate.email}
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td>{candidate.company || "Not Available"}</td>
                <td>{candidate.bio || "Not Available"}</td>
                <td>
                  <button className="remove-btn" onClick={() => handleRemove(candidate.login)}>
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;