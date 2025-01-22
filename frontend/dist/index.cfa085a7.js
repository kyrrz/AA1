const o="http://localhost:3000/api";async function t(){try{let t=await axios.get(`${o}/devs`);console.log("Devs:",t.data)}catch(o){console.error("Error fetching devs:",o)}}(async function(){try{let t=await axios.get(`${o}/games`);console.log("Games:",t.data)}catch(o){console.error("Error fetching games:",o)}})(),t();
//# sourceMappingURL=index.cfa085a7.js.map
