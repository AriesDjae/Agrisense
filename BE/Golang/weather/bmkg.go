// weather/bmkg.go
package weather

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

const bmkgForecastBaseURL = "https://api.bmkg.go.id/publik/prakiraan-cuaca"

type Client struct {
	httpClient *http.Client
}

func NewClient() *Client {
	return &Client{
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// BMKGResponse represents the minimal JSON structure we care about from
// https://api.bmkg.go.id/publik/prakiraan-cuaca (see https://github.com/infoBMKG/data-cuaca).
type BMKGResponse struct {
	Lokasi struct {
		Desa      string  `json:"desa"`
		Kecamatan string  `json:"kecamatan"`
		Kotkab    string  `json:"kotkab"`
		Provinsi  string  `json:"provinsi"`
		Lat       float64 `json:"lat"`
		Lon       float64 `json:"lon"`
		Timezone  string  `json:"timezone"`
	} `json:"lokasi"`
	Data []struct {
		// cuaca is a 2D array in the official PHP example: array of days, each
		// containing an array of forecasts for that day.
		Cuaca [][]BMKGForecast `json:"cuaca"`
	} `json:"data"`
}

type BMKGForecast struct {
	LocalDateTime string  `json:"local_datetime"`
	WeatherDesc   string  `json:"weather_desc"`
	T             float64 `json:"t"`       // temperature °C
	Hu            float64 `json:"hu"`      // humidity %
	Ws            float64 `json:"ws"`      // wind speed
	Wd            string  `json:"wd"`      // wind direction
	VsText        string  `json:"vs_text"` // visibility text
	Image         string  `json:"image"`
}

// WeatherSummary is a compact, frontend-friendly aggregation of the BMKG data.
type WeatherSummary struct {
	Location struct {
		Desa      string  `json:"desa"`
		Kecamatan string  `json:"kecamatan"`
		Kotkab    string  `json:"kotkab"`
		Provinsi  string  `json:"provinsi"`
		Lat       float64 `json:"lat"`
		Lon       float64 `json:"lon"`
		Timezone  string  `json:"timezone"`
	} `json:"location"`
	AvgTemperature float64 `json:"avgTemperature"`
	AvgHumidity    float64 `json:"avgHumidity"`
}

// GetForecastByAdm4 fetches the raw BMKG JSON forecast for a given adm4 code.
// The official BMKG example (see https://github.com/infoBMKG/data-cuaca) uses:
//
//	https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.01.1001
func (c *Client) GetForecastByAdm4(adm4 string) ([]byte, error) {
	if adm4 == "" {
		return nil, fmt.Errorf("adm4 code is required")
	}

	u, err := url.Parse(bmkgForecastBaseURL)
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("adm4", adm4)
	u.RawQuery = q.Encode()

	resp, err := c.httpClient.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("bmkg error %d: %s", resp.StatusCode, string(body))
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return data, nil
}

// GetSummaryByAdm4 fetches BMKG data for the given adm4 code and computes a
// simple average temperature and humidity across all available forecast entries.
func (c *Client) GetSummaryByAdm4(adm4 string) (*WeatherSummary, error) {
	raw, err := c.GetForecastByAdm4(adm4)
	if err != nil {
		return nil, err
	}

	var resp BMKGResponse
	if err := json.Unmarshal(raw, &resp); err != nil {
		return nil, fmt.Errorf("decode bmkg json: %w", err)
	}

	var (
		tempSum float64
		humSum  float64
		count   float64
	)

	if len(resp.Data) > 0 {
		for _, day := range resp.Data[0].Cuaca {
			for _, f := range day {
				tempSum += f.T
				humSum += f.Hu
				count++
			}
		}
	}

	var avgTemp, avgHum float64
	if count > 0 {
		avgTemp = tempSum / count
		avgHum = humSum / count
	}

	summary := &WeatherSummary{
		AvgTemperature: avgTemp,
		AvgHumidity:    avgHum,
	}
	summary.Location.Desa = resp.Lokasi.Desa
	summary.Location.Kecamatan = resp.Lokasi.Kecamatan
	summary.Location.Kotkab = resp.Lokasi.Kotkab
	summary.Location.Provinsi = resp.Lokasi.Provinsi
	summary.Location.Lat = resp.Lokasi.Lat
	summary.Location.Lon = resp.Lokasi.Lon
	summary.Location.Timezone = resp.Lokasi.Timezone

	return summary, nil
}
