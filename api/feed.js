const API_BASE = "https://euvd.enisa.europa.eu/api";

const endpoints = {
  latest: "lastvulnerabilities",
  exploited: "exploitedvulnerabilities",
  critical: "criticalvulnerabilities",
  all: "vulnerabilities"
};

export default async function handler(req, res) {
  const { type = "latest" } = req.query;

  const endpoint = endpoints[type] || endpoints.latest;
  const url = `${API_BASE}/${endpoint}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const items = data.slice(0, 15).map((vuln) => ({
      title: vuln.title || `CVE ${vuln.id}`,
      description: vuln.description || '',
      date: vuln.datePublished,
      url: `https://euvd.enisa.europa.eu/vulnerability/${vuln.id}`
    }));

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch EUVD data", details: err.message });
  }
}
