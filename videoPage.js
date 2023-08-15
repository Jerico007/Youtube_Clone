let apiKey = "AIzaSyAZdnIKGBcCPitlE2NMYX1fqURJ5wFOgEQ";

//Extracting videoId from the current string
let curr_location = window.location.href;
let arr = curr_location.split("=");
let video_id = arr[1];

// console.log(video_id);

let mainContainer = document.getElementsByClassName("container")[0];

function addVideoDetailsIntoUI(videoDetails, channelDetails) {
  // console.log(videoDetails);
  //Creating the videoContainer
  let videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");

  //Add the child elements into the videoContainer
  videoContainer.innerHTML = `
    <div id="video-player">
     ${videoDetails.player.embedHtml}
    </div>
    <div class="video-title">
      <p>
       ${videoDetails.snippet.title}
      </p>
    </div>
    <div class="video-statistics">
      <div class="view-count">${videoDetails.statistics.viewCount} views. Oct 8 2021</div>
      <div class="like-dislike">
        <p>
          <span class="material-symbols-outlined"> thumb_up </span> ${videoDetails.statistics.likeCount}k
        </p>
        <p>
          <span class="material-symbols-outlined"> thumb_down </span> 625
        </p>
      </div>
      <div class="video-share">
        <p>
          <i class="fa-solid fa-share" style="color: #f5f5f5"></i> SHARE
        </p>
      </div>
    </div>
    <div class="description-container">
      <div class="channel">
        <div class="channel-logo">
          <div class="logo"></div>
          <div class="channel-name">
            <p class="youtuber-name">${videoDetails.snippet.channelTitle}</p>
            <p class="subscribers-count">${channelDetails.statistics.subscriberCount}M subscribers</p>
          </div>
        </div>
        <button type="button" id="subscribe-btn">SUBSCRIBE</button>
      </div>
      <div class="description-content">
        ${videoDetails.snippet.description}
      </div>
    </div>`;

  mainContainer.appendChild(videoContainer);
}

async function fetchChannelDetails(channelId) {
  let url = `https://youtube.googleapis.com/youtube/v3/channels/?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;

  let response = await fetch(url, { method: "GET" });

  let result = await response.json();
  return result;
}

async function fetchVideoDetails(video_id) {
  let url = `https://youtube.googleapis.com/youtube/v3/videos/?part=snippet,statistics,player,contentDetails&id=${video_id}&key=${apiKey}`;
  let response = await fetch(url, { method: "GET" });

  let result = await response.json();

  //Fetching the channelDetails by sending it's Id(ChannelId);
  let channelDetail = await fetchChannelDetails(
    result.items[0].snippet.channelId
  );
  // console.log(channelDetail);
  addVideoDetailsIntoUI(result.items[0], channelDetail.items[0]);
}

fetchVideoDetails(video_id);
