import xml2js from 'xml2js';

export default async function handler(req, res) {
  const xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
    <SMLQuery>
      <Options MaxResults="50" />
      <AvailablePerformers QueryId="MyGenericQuery">
        <Include>
          <Descriptions />
          <Media>staticbiopic</Media>
        </Include>
        <Constraints>
          <PublicProfile />
          <StreamType>live</StreamType>
        </Constraints>
      </AvailablePerformers>
    </SMLQuery>`;

  try {
    const response = await fetch('http://affiliate.streamate.com/SMLive/SMLResult.xml', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlRequest
    });

    const xmlText = await response.text();
    const jsonResult = await xml2js.parseStringPromise(xmlText, { explicitArray: false });

    const performers = jsonResult?.SMLResponse?.AvailablePerformers?.Performer || [];
    const formatted = Array.isArray(performers) ? performers : [performers];

    res.status(200).json(formatted);
  } catch (error) {
    console.error('CamBuilder API error:', error);
    res.status(500).json({ error: 'Failed to fetch CamBuilder data' });
  }
}