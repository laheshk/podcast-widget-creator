import React, { useState } from 'react';

function App() {
  const [rssUrl, setRssUrl] = useState('');
  const [podcastData, setPodcastData] = useState(null);
  const [error, setError] = useState(null);
  const [style, setStyle] = useState({
    fontFamily: 'Arial',
    titleColor: '#000000',
    dateColor: '#666666',
    titleSize: 16,
    dateSize: 14,
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  });
  const [iframeCode, setIframeCode] = useState('');

  const fetchPodcastData = async () => {
    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate an API call with a timeout
      setError(null);
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({
          episodes: [
            {
              title: "Harriet Johnston (VP of Marketing at Ashby) on Building Effective Marketing Strategies and Teams",
              date: "Jun 20, 2024",
              duration: "39:00",
              episode: "Episode 34",
              image: "https://picsum.photos/seed/ep34/150"
            },
            {
              title: "John Smith (CTO at TechCorp) on Scaling Engineering Teams",
              date: "Jun 13, 2024",
              duration: "45:00",
              episode: "Episode 33",
              image: "https://picsum.photos/seed/ep33/150"
            },
            {
              title: "Sarah Lee (CEO of FoodTech) on Innovating in the Food Industry",
              date: "Jun 6, 2024",
              duration: "42:00",
              episode: "Episode 32",
              image: "https://picsum.photos/seed/ep32/150"
            },
            {
              title: "Mike Johnson (Data Scientist at AI Solutions) on the Future of AI",
              date: "May 30, 2024",
              duration: "38:00",
              episode: "Episode 31",
              image: "https://picsum.photos/seed/ep31/150"
            }
          ]
        }), 1000)
      );
      setPodcastData(response);
    } catch (err) {
      setError('Failed to fetch podcast data. Please try again.');
      console.error('Error fetching podcast data:', err);
    }
  };

  const generateIframeCode = () => {
    const encodedStyle = encodeURIComponent(JSON.stringify(style));
    const widgetUrl = process.env.REACT_APP_WIDGET_URL || 'https://example.com/widget';
    const code = `<iframe src="${widgetUrl}?rss=${encodeURIComponent(rssUrl)}&style=${encodedStyle}" width="600" height="800" frameborder="0"></iframe>`;
    setIframeCode(code);
  };

  const handleStyleChange = (key, value) => {
    setStyle(prevStyle => ({ ...prevStyle, [key]: value }));
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Podcast RSS Feed Widget Creator</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="rss-url">RSS Feed URL: </label>
        <input
          id="rss-url"
          type="text"
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
          placeholder="https://example.com/podcast-rss"
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <button onClick={fetchPodcastData} style={{ marginBottom: '20px' }}>Fetch Podcast Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {podcastData && (
        <div>
          <h2>Customize Widget</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="font-family">Font Family: </label>
              <select
                id="font-family"
                value={style.fontFamily}
                onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
            <div>
              <label htmlFor="title-color">Title Color: </label>
              <input
                id="title-color"
                type="color"
                value={style.titleColor}
                onChange={(e) => handleStyleChange('titleColor', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date-color">Date Color: </label>
              <input
                id="date-color"
                type="color"
                value={style.dateColor}
                onChange={(e) => handleStyleChange('dateColor', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="background-color">Background Color: </label>
              <input
                id="background-color"
                type="color"
                value={style.backgroundColor}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="border-color">Border Color: </label>
              <input
                id="border-color"
                type="color"
                value={style.borderColor}
                onChange={(e) => handleStyleChange('borderColor', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title-size">Title Size: </label>
              <input
                id="title-size"
                type="range"
                min="12"
                max="24"
                value={style.titleSize}
                onChange={(e) => handleStyleChange('titleSize', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="date-size">Date Size: </label>
              <input
                id="date-size"
                type="range"
                min="10"
                max="18"
                value={style.dateSize}
                onChange={(e) => handleStyleChange('dateSize', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="gap">Gap Between Elements: </label>
              <input
                id="gap"
                type="range"
                min="0"
                max="20"
                value={style.gap}
                onChange={(e) => handleStyleChange('gap', parseInt(e.target.value))}
              />
            </div>
          </div>

          <h2>Preview</h2>
          <div style={{ 
            fontFamily: style.fontFamily, 
            backgroundColor: style.backgroundColor,
            border: `1px solid ${style.borderColor}`,
            padding: '10px',
            marginBottom: '20px',
            maxWidth: '600px',
          }}>
            {podcastData.episodes.map((episode, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: `${style.gap}px`,
                paddingBottom: `${style.gap}px`,
                borderBottom: index < podcastData.episodes.length - 1 ? `1px solid ${style.borderColor}` : 'none',
              }}>
                <img src={episode.image} alt={episode.title} style={{ width: '100px', height: '100px', marginRight: `${style.gap}px` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: style.dateColor, fontSize: `${style.dateSize}px`, marginBottom: `${style.gap/2}px` }}>
                    {episode.episode} • {episode.date} • {episode.duration}
                  </div>
                  <h3 style={{ color: style.titleColor, fontSize: `${style.titleSize}px`, margin: 0 }}>{episode.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <h2>Export</h2>
          <button onClick={generateIframeCode}>Generate iframe Code</button>
          {iframeCode && (
            <div style={{ marginTop: '10px' }}>
              <label htmlFor="iframe-code">iframe Code: </label>
              <textarea
                id="iframe-code"
                value={iframeCode}
                readOnly
                style={{ width: '100%', height: '100px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
