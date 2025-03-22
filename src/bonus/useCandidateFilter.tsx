import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const useCandidateFilter = (candidates: Candidate[]) => {
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "location" | "company" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    let filtered = [...candidates];

    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const valueA = a[sortBy]?.toLowerCase() || "";
        const valueB = b[sortBy]?.toLowerCase() || "";
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }

    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, sortBy, sortOrder]);

  const handleSort = (field: "name" | "location" | "company") => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return { filteredCandidates, searchTerm, setSearchTerm, handleSort, sortBy, sortOrder };
};

export default useCandidateFilter;