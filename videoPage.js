//Extracting videoId from the current string
let curr_location = window.location.href;
let arr = curr_location.split("=");
let video_id = arr[1];

// console.log(video_id);

let mainContainer = document.getElementsByClassName("container")[0];

async function addPlaylistContentInUI(val, playListContainer) {
  let channelDetail = await fetchChannelDetails(val.snippet.channelId);
  //Fetching the channelDetail to add view count and date in the playlist thumbnail
  // console.log(channelDetail);
  let playlistItem = document.createElement("div");
  playlistItem.classList.add("playlist-item");
  playlistItem.innerHTML = `
  <a href="youtube_videoPage.html?video_id=${val.id.videoId}"><img
    class="playlist-thumbnail"
    src="${val.snippet.thumbnails.high.url}"
    alt=""
  /></a>
  <div class="playlist-details">
    <div class="playlist-title">
      <p>${val.snippet.title}</p>
    </div>
    <div class="playlist-author"><p>${val.snippet.channelTitle}</p></div>
    <div class="playlist-views"><p>${formatNumber(
      channelDetail.items[0].statistics.viewCount
    )} views. ${new Date(
    channelDetail.items[0].snippet.publishedAt
  ).toLocaleDateString()}</p></div>
  </div>`;
  playListContainer.appendChild(playlistItem);
}

//Default search
let playlist = searchString("Forza Horizon 5");
let str = document.getElementsByTagName("input")[0];

let searchButton = document.getElementById("search");
searchButton.addEventListener("click", () => {
  if (str.value === "") {
    return;
  }
  let str_value = str.value.trim();
  playlist = searchString(str_value);
  let playListContainer =
    document.getElementsByClassName("playlist-container")[0];
  mainContainer.removeChild(playListContainer);
  addPlaylistDetailsIntoUI(playlist);
});

function addPlaylistDetailsIntoUI(playlist) {
  let playListContainer = document.createElement("div");
  playListContainer.classList.add("playlist-container");

  playListContainer.innerHTML = ` <div class="playlist-button-container">
    <button type="button">All</button>
    <button type="button">Recommendations</button>
  </div>`;

  playlist.then((data) => {
    //Traversing each searched data
    data.forEach((val) => {
      // console.log(val);
      addPlaylistContentInUI(val, playListContainer);
    });
  });

  mainContainer.appendChild(playListContainer);
}


//Function to add a unique commentos in each line
function addCommentors(commentContainer , data) {
//  console.log(data);
  data.forEach((val)=>{
    let commentors = document.createElement("div");
    commentors.classList.add("comment-commentors");
    commentors.innerHTML=`
    <div class="commentor-logo">
    <img
      src="${val.snippet.topLevelComment.snippet.authorProfileImageUrl}"
      alt=""
    />
  </div>
  <div class="commentor-details">
    <div class="details-row-1">
      <div class="commentor-name">${val.snippet.topLevelComment.snippet.authorDisplayName}</div>
      <div class="commented-on">
        <p>${new Date(val.snippet.topLevelComment.snippet.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div class="details-row-2">
      <p class="comment">${val.snippet.topLevelComment.snippet.textDisplay}</p>
    </div>
    <div class="details-row-3">
      <p>
        <span class="material-symbols-outlined"> thumb_up </span> ${val.snippet.topLevelComment.snippet.likeCount}
      </p>
      <p>
        <span class="material-symbols-outlined"> thumb_down </span>
      </p>
      <span>REPLY</span>
    </div>`
    commentContainer.appendChild(commentors);
  })

  
}

function addCommentsIntoUI() {
  let videoContainer = document.getElementsByClassName("video-container")[0];
  //Fetching the comment details through video_id
  let commentDetails =  fetchCommentDetails(video_id);
  // console.log(commentDetails);
  let commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");
  commentContainer.innerHTML =`
        <div class="comment-counts">
        <div class="comment-counter">
          <p>100 comments</p>
        </div>
        <div class="comment-sort">
          <img src="Youtube/Group.png" alt="" />
          <p>SORT BY</p>
        </div>
       </div>
       <div class="comment-adder">
        <img src="Youtube/User-Avatar.png" alt="" />
        <input type="text" placeholder="Add a public comment..." />
       </div>
       `
       //Catching the resovled data
      commentDetails.then((data)=>{
        addCommentors(commentContainer, data.items);
      })
      videoContainer.appendChild(commentContainer);
}

function addVideoDetailsIntoUI(videoDetails, channelDetails) {
  // console.log(videoDetails);
  // console.log(channelDetails);
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
      <div class="view-count"><p>${formatNumber(
        videoDetails.statistics.viewCount
      )} views. ${new Date(
    videoDetails.snippet.publishedAt
  ).toDateString()}</p></div>
      <div class="like-dislike">
        <p>
          <span class="material-symbols-outlined"> thumb_up </span> ${formatNumber(
            videoDetails.statistics.likeCount
          )}
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
      <div class="video-save">
         <img src="Youtube/Button-Btn-3.png">
      </div>
      <div class="video-other">
         <img src="Youtube/Button-Btn-4.png">
      </div>
    </div>
    <div class="description-container">
      <div class="channel">
        <div class="channel-logo">
          <img class="logo" src="${
            channelDetails.snippet.thumbnails.default.url
          }">
          <div class="channel-name">
            <p class="youtuber-name">${videoDetails.snippet.channelTitle}</p>
            <p class="subscribers-count">${formatNumber(
              channelDetails.statistics.subscriberCount
            )} subscribers</p>
          </div>
        </div>
        <button type="button" id="subscribe-btn">SUBSCRIBE</button>
      </div>
      <div class="description-content">
        ${videoDetails.snippet.description}
      </div>
    </div>
 </div>`;

  mainContainer.appendChild(videoContainer);
  
   addCommentsIntoUI();

  addPlaylistDetailsIntoUI(playlist);
}

let detail = fetchVideoDetails(video_id);
detail.then((data) => {
  //  addVideoDetailsIntoUI(videoDetails,channelDetails);
  addVideoDetailsIntoUI(data[0].items[0], data[1].items[0]);
});