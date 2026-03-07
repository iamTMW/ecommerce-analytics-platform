import React from 'react';

const App: React.FC = () => {
  return (
    <div className="wrap">
      <div className="card">
        <span className="pill">Placeholder MVP</span>
        <span className="pill">Docker Compose</span>
        <span className="pill">Spring Boot + Gradle</span>
        <span className="pill">TypeScript</span>

        <h1>SPRINT 4 PLACEHOLDER APP</h1>

        <p>
          <strong>Pitch:</strong> Our web app is designed to give product analysts
          a clear, immediate view of what is driving their business. With
          interactive dashboards featuring customer revenue rankings, monthly
          revenue trends, and product performance charts, our app makes it easy
          to identify top customers, detect seasonal patterns, and track
          best-selling products over time.
        </p>

        <div className="grid">
          <div>
            <strong>What’s coming next:</strong>
            <p>Next week: integrate API + add the Python container.</p>
          </div>
        </div>

        <div className="cta">
          <a className="btn" href="/api/health">
            Backend health check
          </a>

          <a
            className="btn"
            href="https://gitlab.socs.uoguelph.ca/cis3760w26/indigo/ecommerce-analysis"
            target="_blank"
            rel="noreferrer"
          >
            Project link
          </a>
        </div>

        <p className="tip">
          Tip: if the button above shows <code>ok</code>, your backend container
          is up.
        </p>
      </div>
    </div>
  );
};

export default App;