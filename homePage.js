const container = document.getElementsByClassName("container")[0];

function addDataToUI(videoData) {
  container.innerHTML = "";
  videoData.forEach((value) => {
    // console.log(value);
    //Calling fetchChannelDetails to get channel logo view counts and date of upload
    let channelDetails = fetchChannelDetails(value.snippet.channelId);
    channelDetails.then((channel_data) => {
      // console.log(channel_data);
      let obj = value.snippet;
      let video_div = document.createElement("div");
      video_div.classList.add("video");
      video_div.innerHTML = `
        <a href="youtube_videoPage.html?video_id=${value.id.videoId}"><img
          src="${obj.thumbnails.high.url}"
          class="thumbnail"
        /></a>
      <div class="video-details">
         <img class="channel-logo" src="${
           channel_data.items[0].snippet.thumbnails.default.url
         }" alt="">
        <div class="channel-details">
         <p>${obj.title}</p>
         <b>${obj.channelTitle}</b>

         <div class="views">
          <p>${formatNumber(
            channel_data.items[0].statistics.viewCount
          )} views.</p>
          <p> ${new Date(
            channel_data.items[0].snippet.publishedAt
          ).toLocaleDateString()}</p>
         </div>
        </div
      </div>`;
      container.appendChild(video_div);
    });
  });
}

//Default Search feture when the user enter the screen first time
let defaultSearch = "Crew 2 Racing game";
defaultSearch = searchString(defaultSearch);
defaultSearch.then((data) => {
  addDataToUI(data);
}).catch((data)=>{
  console.log(data);
});

//Adding the search functionality when user search something..
let searchButton = document.getElementById("search");
searchButton.addEventListener("click", () => {
  let str = document.getElementsByTagName("input")[0];
  if (str.value === "") {
    return;
  }
  let str_value = str.value.trim();
  let res = searchString(str_value);
  res.then((data) => {
    addDataToUI(data);
  });
});


//Adding evenListener to hamburger to show/hide navigations
let ham = document.getElementsByClassName("hamburger")[0];

let toggled = true;
ham.addEventListener("click", ()=>{
 if(toggled)
 {
    document.getElementsByClassName("navigations")[0].style.display = "none";
    document.getElementsByClassName("container")[0].style.gridTemplateColumns = "repeat(4 , 1fr)";
    toggled = false;
  }  
  else{
    
    document.getElementsByClassName("navigations")[0].style.display = "flex";
    document.getElementsByClassName("container")[0].style.gridTemplateColumns = "repeat(3 , 1fr)";
    
    toggled = true;
 }
  
})