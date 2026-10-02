:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background: #07131d;
  color: #ebf3ff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  width: 100%;
  min-height: 100%;
  background:
    radial-gradient(circle at top left, #16314d, transparent 30%),
    linear-gradient(135deg, #06151e 0%, #0b1d2b 42%, #0f2230 100%);
}

body {
  min-height: 100vh;
  color: #edf5ff;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  min-height: 100vh;
  max-width: 1500px;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;
}

.glass,
.glass-soft {
  background: rgba(9, 22, 32, 0.55);
  border: 1px solid rgba(164, 207, 255, 0.14);
  box-shadow: 0 20px 45px rgba(2, 9, 15, 0.35);
  backdrop-filter: blur(14px);
}

.sidebar {
  border-radius: 28px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  font-size: 26px;
  background: linear-gradient(135deg, rgba(94, 177, 255, 0.35), rgba(113, 245, 193, 0.22));
  border: 1px solid rgba(166, 228, 255, 0.18);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 10px;
  color: rgba(185, 219, 255, 0.72);
}

.logo-block h1,
.topbar h3,
.section-header h4,
.location-card h2 {
  margin: 0;
}

.search-box {
  display: flex;
  gap: 10px;
  width: 100%;
}

.search-box input {
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(158, 200, 255, 0.16);
  border-radius: 12px;
  color: #edf5ff;
  padding: 14px 15px;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(201, 220, 246, 0.55);
}

.search-box button {
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #62c0ff, #8f8dff 60%, #85e7d9);
  color: #071820;
  padding: 0 18px;
  font-weight: 700;
}

.error-banner {
  background: rgba(255, 96, 118, 0.12);
  border: 1px solid rgba(255, 120, 145, 0.26);
  color: #ffc3d0;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 0.92rem;
}

.location-card,
.current-card,
.hour-card,
.forecast-row {
  border-radius: 18px;
}

.location-card {
  padding: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(162, 208, 255, 0.12);
}

.location-card .label,
.metrics-grid .label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(184, 216, 255, 0.7);
}

.location-card span {
  display: block;
  margin-top: 6px;
  font-size: 0.92rem;
  color: rgba(222, 239, 255, 0.76);
}

.loading {
  color: rgba(215, 232, 255, 0.8);
  font-size: 0.95rem;
  padding: 8px 0;
}

.current-card {
  padding: 18px;
}

.temp-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.temp-value {
  font-size: clamp(3rem, 5vw, 4.5rem);
  line-height: 1;
  font-weight: 700;
}

.weather-icon {
  font-size: 2.2rem;
}

.summary {
  font-size: 1.05rem;
  color: rgba(230, 241, 255, 0.8);
  margin-bottom: 18px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.metrics-grid div {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(160, 210, 255, 0.12);
  border-radius: 12px;
  padding: 12px 14px;
}

.metrics-grid strong {
  display: block;
  margin-top: 8px;
  font-size: 1.1rem;
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.topbar {
  border-radius: 24px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-pill {
  background: rgba(104, 224, 170, 0.12);
  color: #9becd3;
  border: 1px solid rgba(120, 239, 187, 0.18);
  padding: 9px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section {
  padding: 8px 0 0;
}

.section-header {
  margin-bottom: 14px;
}

.section-header h4 {
  font-size: 1.08rem;
  color: rgba(219, 236, 255, 0.9);
}

.hourly-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.hour-card {
  padding: 18px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.time {
  font-size: 0.8rem;
  color: rgba(196, 220, 255, 0.74);
}

.hour-icon {
  font-size: 1.8rem;
}

.hour-card strong {
  font-size: 1.35rem;
}

.hour-card small {
  color: rgba(192, 215, 244, 0.7);
}

.forecast-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.forecast-row {
  display: grid;
  grid-template-columns: 85px 1.5fr 120px 70px 200px;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
}

.day-name {
  font-weight: 600;
  color: rgba(228, 240, 255, 0.88);
}

.forecast-main {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(224, 239, 255, 0.82);
}

.forecast-icon {
  font-size: 1.5rem;
}

.forecast-temp {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.forecast-temp .min {
  color: rgba(174, 205, 239, 0.7);
}

.forecast-rain {
  color: #96d9ff;
  font-weight: 600;
}

.forecast-sun {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.82rem;
  color: rgba(205, 226, 255, 0.74);
}

@media (max-width: 1000px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .hourly-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .forecast-row {
    grid-template-columns: 1fr 1fr;
  }

  .forecast-main,
  .forecast-temp,
  .forecast-rain,
  .forecast-sun {
    justify-self: start;
  }
}

@media (max-width: 560px) {
  .app-shell {
    padding: 14px;
  }

  .sidebar,
  .topbar {
    padding-left: 14px;
    padding-right: 14px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-box button {
    padding: 12px 16px;
  }

  .hourly-grid {
    grid-template-columns: 1fr;
  }

  .forecast-row {
    grid-template-columns: 1fr;
  }
}
