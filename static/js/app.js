let useModelData = {};
let searchSpotifyData = {};
let decadeValue = null;
let songName = null;
let artistName = null;
let cleanFeatureData = [];



// defining a dummy json output when we search a song or click for a decade
let calledFeatures = {
  "danceability": 0.614,
  "energy": 0.809,
  "key": 9,
  "loudness": -4.749,
  "mode": 1,
  "speechiness": 0.0738,
  "acousticness": 0.0105,
  "instrumentalness": 0.000353,
  "liveness": 0.148,
  "valence": 0.354,
  "tempo": 112.023,
  "type": "audio_features",
  "id": "2oap3QptGISyIvwKpnJJId",
  "uri": "spotify:track:2oap3QptGISyIvwKpnJJId",
  "track_href": "https://api.spotify.com/v1/tracks/2oap3QptGISyIvwKpnJJId",
  "analysis_url": "https://api.spotify.com/v1/audio-analysis/2oap3QptGISyIvwKpnJJId",
  "duration_ms": 176774,
  "time_signature": 4
};

let decadeRawData = {
  "danceability": 1.6,
  "energy": 2.809,
  "key": 1,
  "loudness": -1.749,
  "mode": 2,
  "speechiness": 0.0453,
  "acousticness": 0.0305,
  "instrumentalness": 0.0043,
  "liveness": 0.2,
  "valence": 0.1,
  "tempo": 112,
  "type": "audio_features",
  "id": "2oap3QptGISyIvwKpnJJId",
  "uri": "spotify:track:2oap3QptGISyIvwKpnJJId",
  "track_href": "https://api.spotify.com/v1/tracks/2oap3QptGISyIvwKpnJJId",
  "analysis_url": "https://api.spotify.com/v1/audio-analysis/2oap3QptGISyIvwKpnJJId",
  "duration_ms": 176774,
  "time_signature": 4
}

// starting out by pre-determing the song features to be measured on the radar chart
let songFeatures = [
  'danceability',
  'energy',
  'loudness',
  'speechiness',
  'acousticness',
  'liveness'
]

let decadeFeatures = [
  'danceability',
  'energy',
  'loudness',
  'speechiness',
  'acousticness',
  'instrumentalness',
  'liveness',
  'valence',
  'tempo',
  'duration_ms'
]


// function to clean data, assuming it will be aiight
function cleanData(featureData){
  let cleanFeatureData = [];
  for (let k in songFeatures) {
    for (let j in featureData){
      if (j == songFeatures[k]) {
        cleanFeatureData.push(featureData[j])
      };
    };
  };
  return cleanFeatureData
};

// creating dummy listening event for when a user searches for a song
let songInput = document.querySelector('#search-song');
let artistInput = document.querySelector('#search-artist');
let buttonSubmit = document.querySelector('#submit');
let decadeInput = document.querySelector('#decade');

//put on button instead of search
// call in the pre-created bars into the event listener
buttonSubmit.addEventListener("click", (event) => {
  let selectSong = songInput.value;
  let selectArtist = artistInput.value;
  let selectDecade = decadeInput.value;

  if (!selectSong || !selectArtist) {
    console.log('missing value')
    return
  }

  else {
    let songUrl = `/search_spotify/${selectSong}/${selectArtist}`

    d3.json(songUrl).then(function(data){
      // console.log("NEWCONSOLE",data);
      songData = cleanData(data)
      radarChart.data.datasets[0].data = songData;
      let realSongName = data['song_name']
      let realArtistName = data['artist']
      // console.log(realArtistName, realSongName);
      d3.select("#song-info").text(`"${realSongName}" by ${realArtistName}: ${selectDecade}`);
      updatePredictions(realSongName, realArtistName, selectDecade);
      radarChart.update();
    });
  }
    
});
    

// adding dummy dropdown listener event


decadeInput.addEventListener('change', (e) => {
  songInput = document.querySelector('#search-song');
  artistInput = document.querySelector('#search-artist');
  decadeInput = document.querySelector('#decade');
  
  decadeValue = decadeInput.value
  song=songInput.value
  artist = artistInput.value

  // d3.select("#song-info").text(`"${song}" by ${artist}: ${decadeValue}`);
  // change_gauge(song, artist, decadeValue);
  decadeRawData = groupedDecades[decadeValue];
  let decadeData = cleanData(decadeRawData);
  radarChart.data.datasets[1].data = decadeData;
  radarChart.update();
});

// creating element that selects radar chart
let canvasElement = document.getElementById('radar-compare');

function setSelectedIndex(s, i){
  s.options[i-1].selected = true;
  return;
}

// function createChart(initialDecade){
//   const data = {
//     labels: songFeatures,
//     datasets: [{
//       label: 'songs',
//       data: [1,2,3,4,5,6],
//       fill: true,
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgb(255, 99, 132)',
//       pointBackgroundColor: 'rgb(255, 99, 132)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgb(255, 99, 132)'
//     }, {
//       label: `${initialDecade}`,
//       data: [5,3,2,1,2,3],
//       fill: true,
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       borderColor: 'rgb(54, 162, 235)',
//       pointBackgroundColor: 'rgb(54, 162, 235)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgb(54, 162, 235)'
//     }]
//   };
  
//   let config = {
//     type: 'radar',
//     data: data,
//     options: {
//       elements: {
//         line: {
//           borderWidth: 3
//         }
//       }
//     },
//   };
  //var radarChart = new Chart(canvasElement, config);
//   let radarChart = new Chart(canvasElement, config);
//   return radarChart
// };


function updatePredictions(song, artist, decadeValue) {
  let modelURL = `/use_model/${song}/${artist}/${decadeValue}`;
  d3.json(modelURL).then(function(data){
      let billboardPred = data['Billboard'];
      let nonchartingPred = data['Noncharting'];
      let dataValues = [billboardPred, nonchartingPred];
      d3.select("#billboard-pred").text(`Billboard Top 100: ${billboardPred}%`);
      d3.select("#noncharting-pred").text(`Non-charting: ${nonchartingPred}%`);
      d3.select("#song-info").text(`"${song}" by ${artist}: ${decadeValue}`);
      change_gauge(gaugeChart, "Gauge", dataValues);
    });
}

// creating dummy song data as i expect the output to be like 
// let song_data = [];
// for (let k in songFeatures) {
//   for (let j in calledFeatures){
//     if (j == songFeatures[k]) {
//       song_data.push(calledFeatures[j])
//     };
//   };
// };
// console.log(song_data)

// //creating dummy decade data as i expect the output to be like 
// let decadeData = []
// for (let k in songFeatures) {
//   for (let v in decadeRawData){
//     if (v == songFeatures[k]) {
//       decadeData.push(decadeRawData[v])
//     };
//   };
// };


function createRadar(songData, decadeData) {
  let data = {
    labels: songFeatures,
    datasets: [{
      label: 'Song',
      data: songData,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, 
      {
      label: 'Decade',
      data: decadeData,
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  }

  let config = {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
  };
  canvasElement = document.getElementById('radar-compare');
  radarChart = new Chart(canvasElement, config);
}
// radarChart.update();

//initializing charts right off the bat so it is there when page loads
function init() {
  let initialDecade = "1970s";
  console.log(initialDecade);
  let initialSong = "Changes"
  let initialArtist = "David Bowie"
  
  if (!initialSong || !initialArtist) {
    console.log('missing value')
    return
  }

  else {
    let songUrl = `/search_spotify/${initialSong}/${initialArtist}`

    d3.json(songUrl).then(function(data){
      songData = cleanData(data)

      // radarChart.data.datasets[0].data = songData;
      let realSongName = data['song_name']
      let realArtistName = data['artist']
      // console.log(realArtistName, realSongName);
      d3.select("#song-info").text(`"${realSongName}" by ${realArtistName}: ${initialDecade}`);
      updatePredictions(realSongName, realArtistName, initialDecade);
      change_gauge(gaugeChart, "Gauge", songData);

      let initialDecadeRawData = groupedDecades[initialDecade];
      let initialDecadeData = cleanData(initialDecadeRawData);
      createRadar(songData,initialDecadeData);
    });
  }
}

init();