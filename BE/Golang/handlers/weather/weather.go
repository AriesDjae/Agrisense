package main

import (
    "log"
    "net/http"
    "os"
    "strings"

    "github.com/gin-gonic/gin"
    weather "github.com/username/agrisense/weather"
)

// This binary exposes simple endpoints that proxy BMKG's
// JSON "prakiraan-cuaca" API through your Go backend, focused on DIY.

// These adm4 codes are placeholders. Replace them with the correct DIY /
// Sleman adm4 codes from BMKG's documentation when you have them.
const (
    diyAdm4Code    = "31.71.01.1001"
    slemanAdm4Code = "31.71.01.1001"
)

func main() {
	r := gin.Default()

	wClient := weather.NewClient()

	// Very simple in-browser test page, served from the same origin to avoid CORS.
	r.GET("/weather-test", func(c *gin.Context) {
		const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>DIY Yogyakarta Weather Test</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    pre { background: #111827; color: #e5e7eb; padding: 1rem; border-radius: 0.5rem; max-height: 70vh; overflow: auto; }
    button { padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; background: #2563eb; color: white; cursor: pointer; }
    button:hover { background: #1d4ed8; }
    label { display: block; margin-bottom: 0.5rem; }
    input { padding: 0.4rem 0.6rem; border-radius: 0.375rem; border: 1px solid #d1d5db; width: 260px; }
  </style>
</head>
<body>
  <h1>DIY Yogyakarta Weather (BMKG)</h1>
  <p>This page calls your Go backend, which proxies BMKG's JSON API.</p>

  <form id="form">
    <label>
      Optional adm4 override (desa/kelurahan code):
      <input id="adm4" name="adm4" placeholder="leave empty to use default DIY code" />
    </label>
    <button type="submit">Fetch Weather</button>
  </form>

  <h2>Response JSON</h2>
  <pre id="out">(no data yet)</pre>

  <script>
    const form = document.getElementById('form');
    const out = document.getElementById('out');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const adm4 = document.getElementById('adm4').value.trim();
      let url = '/api/weather/diy-yogyakarta';
      if (adm4) {
        url += '?adm4=' + encodeURIComponent(adm4);
      }
      out.textContent = 'Loading...';
      fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function (data) {
          out.textContent = JSON.stringify(data, null, 2);
        })
        .catch(function (err) {
          out.textContent = 'Error: ' + err.message;
        });
    });
  </script>
</body>
</html>`

		c.Header("Content-Type", "text/html; charset=utf-8")
		c.String(http.StatusOK, page)
	})

	// DIY Yogyakarta endpoint. You can:
	// - Pass ?adm4=... to target a specific locality.
	// - Or set BMKG_ADM4_DIY env var.
	// - Otherwise it falls back to diyAdm4Code.
	r.GET("/api/weather/diy-yogyakarta", func(c *gin.Context) {
        adm4 := strings.TrimSpace(c.Query("adm4"))
        if adm4 == "" {
            adm4 = os.Getenv("BMKG_ADM4_DIY")
        }
		if adm4 == "" {
			adm4 = diyAdm4Code
		}

		data, err := wClient.GetForecastByAdm4(adm4)
		if err != nil {
			log.Println("bmkg forecast error:", err)
			c.JSON(http.StatusBadGateway, gin.H{"error": "failed to fetch weather data"})
			return
		}

		c.Data(http.StatusOK, "application/json", data)
	})

	// DIY Yogyakarta summary endpoint that returns a compact WeatherSummary
	// (average temperature, humidity, and basic location info) derived from BMKG.
	r.GET("/api/weather/diy-summary", func(c *gin.Context) {
		adm4 := strings.TrimSpace(c.Query("adm4"))
		if adm4 == "" {
			adm4 = os.Getenv("BMKG_ADM4_DIY")
		}
		if adm4 == "" {
			adm4 = diyAdm4Code
		}

		summary, err := wClient.GetSummaryByAdm4(adm4)
		if err != nil {
			log.Println("bmkg summary error:", err)
			c.JSON(http.StatusBadGateway, gin.H{"error": "failed to fetch weather summary"})
			return
		}

		c.JSON(http.StatusOK, summary)
	})

    // Sleman-specific shortcut endpoint. You can override via BMKG_ADM4_SLEMAN.
    r.GET("/api/weather/sleman", func(c *gin.Context) {
        adm4 := os.Getenv("BMKG_ADM4_SLEMAN")
        if adm4 == "" {
            adm4 = slemanAdm4Code
        }

        data, err := wClient.GetForecastByAdm4(adm4)
        if err != nil {
            log.Println("bmkg forecast error (sleman):", err)
            c.JSON(http.StatusBadGateway, gin.H{"error": "failed to fetch weather data"})
            return
        }

        c.Data(http.StatusOK, "application/json", data)
    })

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
