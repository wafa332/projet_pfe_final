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
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjA0ZjFhOTYtY2JlOC00M2Y4LWFiYmYtZjhlYWY1ZDg1NzMwLyIsImlhdCI6MTczNjk1NjMzNiwibmJmIjoxNzM2OTU2MzM2LCJleHAiOjE3MzY5NjE5NTcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WkFBQUFrNzRGcTFjRSt1TldNWExXSUxSdjFxRlhWVjlZRWJ0Zy8yMWovRnhMSStzNkhrVThtYWtISktkUm5MMnFQM0lKZ05WNDljdzgxalZOZ1FxUGYyODhzUFJKTEFzVE9GRmZlVUgzajN6RFNyaz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJZQUNPVUJJIiwiZ2l2ZW5fbmFtZSI6IldhZmEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDIuMTUyLjIxNC4yMTYiLCJuYW1lIjoiV2FmYSBZQUNPVUJJIiwib2lkIjoiY2JlNDRjNjUtODk4Zi00OTFmLWE1OGMtMWQzMjljYWVjODQ2IiwicHVpZCI6IjEwMDMyMDAzMDlDNTY5MjAiLCJyaCI6IjEuQVRvQWxocFBZT2pMLUVPcnZfanE5ZGhYTUFrQUFBQUFBQUFBd0FBQUFBQUFBQUE2QVBnNkFBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImhGSkYwWVJzblFUNWgtemJsVWs2ckJvRk00OUl0U004V0drSHpLbTdVQTQiLCJ0aWQiOiI2MDRmMWE5Ni1jYmU4LTQzZjgtYWJiZi1mOGVhZjVkODU3MzAiLCJ1bmlxdWVfbmFtZSI6IndhZmEueWFjb3ViaUBlc3ByaXQudG4iLCJ1cG4iOiJ3YWZhLnlhY291YmlAZXNwcml0LnRuIiwidXRpIjoiQmFZOUJTSlVHa2FUblhBc2s1bHdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMiJ9.JbMHphXiDiwA92KUyQxI2VrgWMnjywwFBUML_qtv2D7Fa6cxWn12pz3MGQytT49i5DPYJ42r0b2aVAX5yfi8IarwBsBOKAbLt_DVIpfqXHu-itXJapKVbk3GL2hSfQaAgkvPRLU6qVmvyurrDsFfdl5-HnbSWIQzm6sd7NtQcLXN93vPLB1c-7F4chKuQYaG0NiwyfBGy4NtzpoDhEis9-xvEfUWzs_H84xWU5g8r7s9fqunIbnJdu5GQoAsAbtDWceOq3IytJ1Z_xgSPCh8JTIVvNx5SSjDwEh1RwdFffFf_WtYL_VBIVZCMlBwpZ7EepssShAfE_kc-BigHkhRqw',
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
