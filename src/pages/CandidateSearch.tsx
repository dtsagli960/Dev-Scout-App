import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser} from "../api/API"; 
import { Candidate } from "../interfaces/Candidate.interface"; 
import "../styles/CandidateSearch.css";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noCandidates, setNoCandidates] = useState<boolean>(false);

  const fetchCandidate = async () => {
    setIsLoading(true);
    try {
      const data = await searchGithub();
      if (data.length > 0) {
        const randomUser = data[0];
        const detailedCandidate = await searchGithubUser(randomUser.login);
        setCandidate(detailedCandidate); 
      } else {
        setNoCandidates(true);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setNoCandidates(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCandidate(); 
  }, []);


  const handleAccept = () => {
    if (candidate) {
      const savedCandidates: Candidate[] = JSON.parse(
        localStorage.getItem("candidates") || "[]"
      );
      savedCandidates.push(candidate);
      localStorage.setItem("candidates", JSON.stringify(savedCandidates));
    }
    fetchCandidate();
  };

  const handleReject = () => {
    fetchCandidate();
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (noCandidates) return <h2>No more candidates available.</h2>;

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>
      {candidate && (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.login} />
          <h2>
            {candidate.name || candidate.login} <i>({candidate.login})</i>
          </h2>
          <p><strong>Location:</strong> {candidate.location || "Not Available"}</p>
          <p><strong>Email:</strong> {candidate.email || "Not Available"}</p>
          <p><strong>Company:</strong> {candidate.company || "Not Available"}</p>
          <p><strong>Bio:</strong> {candidate.bio || "Not Available"}</p>
          <div className="buttons">
            <button className="reject" onClick={handleReject}>-</button>
            <button className="accept" onClick={handleAccept}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;