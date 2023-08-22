let apiKey = "AIzaSyCglIWZCwKPRtt3AV579jIXWG7rnEZepuc";


//Format number
function formatNumber(num, precision = 2) {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;

    return formatted;
  }

  return num;
}

//Used to search the video
async function searchString(value) {
  let url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&type=video&maxResults=50&q=${value}&key=${apiKey}`;

  let response = await fetch(url, { method: "GET" });

  let result = await response.json();

  console.log(result);
  return result.items;
}

//Fetching channelDetails
async function fetchChannelDetails(channelId) {
  let url = `https://youtube.googleapis.com/youtube/v3/channels/?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;

  let response = await fetch(url, { method: "GET" });

  let result = await response.json();
  return result;
}

//Fetching CommentDetails
async function fetchCommentDetails(video_id) {
  let url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&video_id=${video_id}&maxResults=100&key=${apiKey}`;
  let response = await fetch(url , {method : "GET"});
  let result = await response.json();
  return result;
}



//Fetching videoDetails
async function fetchVideoDetails(video_id) {
  let details = [];
  let url = `https://youtube.googleapis.com/youtube/v3/videos/?part=snippet,statistics,player,topicDetails,contentDetails&id=${video_id}&key=${apiKey}`;
  let response = await fetch(url, { method: "GET" });

  let result = await response.json();
  // console.log(result);
  //Fetching the channelDetails by sending it's Id(ChannelId);
  let channelDetail = await fetchChannelDetails(
    result.items[0].snippet.channelId
  );
  // console.log(channelDetail);
  details.push(result);
  details.push(channelDetail);
  return details;
}

