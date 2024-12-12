import React, { useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import './style.css';

const DashboardPowerBi = () => {
  const [selectedModel, setSelectedModel] = useState("");

  return (
    <div className="dashboard-container">
      <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: '006726a0-4db3-4c37-9c17-82964abda906',
          embedUrl:
            'https://app.powerbi.com/reportEmbed?reportId=006726a0-4db3-4c37-9c17-82964abda906&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1JLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjA0ZjFhOTYtY2JlOC00M2Y4LWFiYmYtZjhlYWY1ZDg1NzMwLyIsImlhdCI6MTczMzg0MTA1NiwibmJmIjoxNzMzODQxMDU2LCJleHAiOjE3MzM4NDYyMDMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUEvaVdLZXVWdDVCamVNb1lHT1FBWUhVbUVVNzJhenhMWXlhRWJnL3FWMkViSFVZREZGSFdKQ0ZNQjBaeXMxY1h1WXlSQmFrTjUzRDI3dmowZ1ovSzQ4NjJTSnBEczVLNEt0TWRmeTN1SmJ1UT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJZQUNPVUJJIiwiZ2l2ZW5fbmFtZSI6IldhZmEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODUuMTA3LjU2LjEyOCIsIm5hbWUiOiJXYWZhIFlBQ09VQkkiLCJvaWQiOiJjYmU0NGM2NS04OThmLTQ5MWYtYTU4Yy0xZDMyOWNhZWM4NDYiLCJwdWlkIjoiMTAwMzIwMDMwOUM1NjkyMCIsInJoIjoiMS5BVG9BbGhwUFlPakwtRU9ydl9qcTlkaFhNQWtBQUFBQUFBQUF3QUFBQUFBQUFBQTZBUGc2QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiaEZKRjBZUnNuUVQ1aC16YmxVazZyQm9GTTQ5SXRTTThXR2tIekttN1VBNCIsInRpZCI6IjYwNGYxYTk2LWNiZTgtNDNmOC1hYmJmLWY4ZWFmNWQ4NTczMCIsInVuaXF1ZV9uYW1lIjoid2FmYS55YWNvdWJpQGVzcHJpdC50biIsInVwbiI6IndhZmEueWFjb3ViaUBlc3ByaXQudG4iLCJ1dGkiOiJTdU9QSFdmS21VNkozQnJLY2tOa0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAxMCJ9.VSUE_WxvM1GFa3igLIntv7Wnag02BQD5DmnrIx5FYesP8v2sBjtTu84jZTB-Si--yYxyAmpmeSEZQmbgsJgZz5ic0s8kZC6fvg1XZjZpDw5xmvQbNkDuFe5dAwjbYfOVr9FoSlVSLTCvuwiF5iNPdaZEE12NJRRt7Hc1ar9zG6cquLoe2K1K7kKPp8hfeUEKXf36PQmJaFd8_7OnS5xx9jNSU6lHdMp2gbQ7b-Tf_faXMmYyNEA4hvw_MA6zrnY0ExNIK4Rz5IpHqWjMcOoYbNvOnDPiMxjCbUMJP2zSJZBM3e-anjfKdZwtUwhPm6xIHdBGlnT7gF55LI11BGiK-g',
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Default,
          },
        }}
        eventHandlers={new Map([
          ['loaded', () => console.log('Report loaded')],
          ['rendered', () => console.log('Report rendered')],
          ['error', (event) => console.log(event.detail)],
          ['visualClicked', () => console.log('Visual clicked')],
          ['pageChanged', (event) => console.log(event)],
        ])}
        cssClassName="reportClass"
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  );
};

export default DashboardPowerBi;
