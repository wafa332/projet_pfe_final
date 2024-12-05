import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client' ;
import React from 'react';
import { useEffect, useState } from 'react';
import { Box, height } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import { Grid } from '@mui/material';

const dashboardPowerBi = () => {
  const modelsReports = []
  const [selectedModel,setSelectedModel] = useState("")
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Grid container sx={{flexDirection:'row', display: 'flex', alignItems: 'center', justifyContent: 'center',height: "80vh"}} >
        <PowerBIEmbed 
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: '006726a0-4db3-4c37-9c17-82964abda906',
		embedUrl: "https://app.powerbi.com/reportEmbed?reportId=006726a0-4db3-4c37-9c17-82964abda906&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1JLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjA0ZjFhOTYtY2JlOC00M2Y4LWFiYmYtZjhlYWY1ZDg1NzMwLyIsImlhdCI6MTczMzI0NjU1NiwibmJmIjoxNzMzMjQ2NTU2LCJleHAiOjE3MzMyNTE1MTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUFBRmNMUFdTTW5PYi9nN0g1MHBnUGgrUTRpbkJWUW5ZV0w4dXNGcDBPeEZXY2hLMnNHRGNzNVB1dnYrY3NTU0tBeUJaKzNVL0FOYzc0ZXlKWFVFM2h6dW12NTFzdFEwQkZYd2J2ZUlEamhyQT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJZQUNPVUJJIiwiZ2l2ZW5fbmFtZSI6IldhZmEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDIuMTUyLjIxMi4xMTYiLCJuYW1lIjoiV2FmYSBZQUNPVUJJIiwib2lkIjoiY2JlNDRjNjUtODk4Zi00OTFmLWE1OGMtMWQzMjljYWVjODQ2IiwicHVpZCI6IjEwMDMyMDAzMDlDNTY5MjAiLCJyaCI6IjEuQVRvQWxocFBZT2pMLUVPcnZfanE5ZGhYTUFrQUFBQUFBQUFBd0FBQUFBQUFBQUE2QVBnNkFBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImhGSkYwWVJzblFUNWgtemJsVWs2ckJvRk00OUl0U004V0drSHpLbTdVQTQiLCJ0aWQiOiI2MDRmMWE5Ni1jYmU4LTQzZjgtYWJiZi1mOGVhZjVkODU3MzAiLCJ1bmlxdWVfbmFtZSI6IndhZmEueWFjb3ViaUBlc3ByaXQudG4iLCJ1cG4iOiJ3YWZhLnlhY291YmlAZXNwcml0LnRuIiwidXRpIjoienNtQnhBcDdMa21GZy15T2p4YjlBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEwIDEifQ.O_DsKkIzAFDcgWgPhD_wQw_OcJV5S98y8a0Cw53izP0xV3Rhnvig3X4j7vc85QOel2a4wgNyH0k-8qlYuma2D1DAaW1tgfoHh9cDsvaVtDok9lmdQMXDkRTIEC8ZC_Ec59TDiwRA9MpkCPDZqdYigl1hEbPAXxs_xG6zsXGie-WlSF1VCsKdwWbW1kLZe0gSzjnRtXgURIuFps3d7_3tal_-l8Ec5si9im5O5OtHx8W23sQIcQn0i4sCCh9aLhuXrhbfbh9olz6q9qfl3_MRj2ukq_08nzo1MLsfaUKGW_hTWvaSQqSUz_zgv-7Wa8PFEQo-SXBwYtQj4UJH59V6ZQ',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false, 
					visible: false
				}
			},
			background: models.BackgroundType.Default,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport ;
	}}
/>
</Grid>
</PageContainer>     
  )
}

export default dashboardPowerBi