let useModelData = {};
let searchSpotifyData = {};
let decadeValue = null;
let songName = null;
let artistName = null;
let cleanFeatureData = [];

// starting out by pre-determing the song features to be measured on the radar chart
let songFeatures = [
  'danceability',
  'energy',
  'loudness',
  'speechiness',
  'acousticness',
  'liveness'
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

// Store values from HTML elements for listening events
let songInput = document.querySelector('#search-song');
let artistInput = document.querySelector('#search-artist');
let buttonSubmit = document.querySelector('#submit');
let decadeInput = document.querySelector('#decade');


// Add event listener to Search button that collects values from input boxes and updates charts/predictions
buttonSubmit.addEventListener("click", (event) => {
  let selectSong = songInput.value;
  let selectArtist = artistInput.value;
  let selectDecade = decadeInput.value;

  // Check that both values have been entered
  if (!selectSong || !selectArtist) {
    window.alert("Please enter a song and artist!");
    return
  }

  // Runs when both values entered in input boxes to update charts/predictions
  else {
    let songUrl = `/search_spotify/${selectSong}/${selectArtist}`

    d3.json(songUrl).then(function(data){
      songData = cleanData(data)
      radarChart.data.datasets[0].data = songData;
      let realSongName = data['song_name']
      let realArtistName = data['artist']
      d3.select("#song-info").text(`"${realSongName}" by ${realArtistName}: ${selectDecade}`);
      updatePredictions(realSongName, realArtistName, selectDecade);
      radarChart.update();
    });
  }
});

// Add event listener to decade dropdown element
decadeInput.addEventListener('change', (e) => {
  songInput = document.querySelector('#search-song');
  artistInput = document.querySelector('#search-artist');
  decadeInput = document.querySelector('#decade');
  
  decadeValue = decadeInput.value
  song=songInput.value
  artist = artistInput.value

  decadeRawData = groupedDecades[decadeValue];
  let decadeData = cleanData(decadeRawData);
  radarChart.data.datasets[1].data = decadeData;
  radarChart.update();
});

// creating element that selects radar chart
let canvasElement = document.getElementById('radar-compare');

// Updates predictions panel and gauge chart
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

// Initialize Radar chart
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

      let realSongName = data['song_name']
      let realArtistName = data['artist']

      d3.select("#song-info").text(`"${realSongName}" by ${realArtistName}: ${initialDecade}`);
      updatePredictions(realSongName, realArtistName, initialDecade);
      change_gauge(gaugeChart, "Gauge", songData);

      let initialDecadeRawData = groupedDecades[initialDecade];
      let initialDecadeData = cleanData(initialDecadeRawData);
      createRadar(songData,initialDecadeData);
    });
  }
}

// Initialize charts
init();