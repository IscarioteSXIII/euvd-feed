export default async function handler(req, res) {
  const response = await fetch("https://euvd.enisa.europa.eu/api/lastvulnerabilities");
  const data = await response.json();

  const items = data.slice(0, 10).map((vuln) => ({
    title: vuln.title || `CVE ${vuln.id}`,
    description: vuln.description || '',
    date: vuln.datePublished,
    url: `https://euvd.enisa.europa.eu/vulnerability/${vuln.id}`
  }));

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(items);
}
