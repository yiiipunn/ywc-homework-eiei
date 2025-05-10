"use server";

export interface APIResponse {
  design: Candidate[]
  content: Candidate[]
  programming: Candidate[]
  marketing: Candidate[]
}

export interface Candidate {
  firstName: string
  lastName: string
  interviewRefNo: string
  major: string
}

export async function Result(name: string, surname: string, major: string) {

  const res = await fetch("https://api.ywc20.ywc.in.th/homework/candidates", {
    headers: {
      "x-reference-id": "PG-44", 
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch candidate data");
  }

  const data: APIResponse = await res.json();

  
  switch (major) {
    case "Web Design":
      const candidateDS = data.design.find(candidate => candidate.firstName == name && candidate.lastName == surname);
      if (candidateDS) return candidateDS;
      else return null;
      break;
    case "Web Programming":
      const candidatePG = data.programming.find(candidate => candidate.firstName == name && candidate.lastName == surname);
      if (candidatePG) return candidatePG;
      else return null;
      break;
    case "Web Content":
      const candidateCT = data.content.find(candidate => candidate.firstName == name && candidate.lastName == surname);
      if (candidateCT) return candidateCT;
      else return null;
      break;
    case "Web Marketing":
      const candidateMK = data.marketing.find(candidate => candidate.firstName == name && candidate.lastName == surname);
      if (candidateMK) return candidateMK;
      else return null;
      break;
  
    default:
      return null;
      break;
  }
}
